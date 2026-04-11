import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { SAVVY_SIGNUP_URL, WHATSAPP_URL } from '../../../config';

// ─── API interfaces ──────────────────────────────────────────────────────────

interface ApiFeatureMeta {
  key: string;
  name: string;
  category: 'module' | 'limit' | string;
  menu_section: string | null;
  sort_order: number;
}

interface ApiPlanFeature {
  feature_id: string;
  enabled: boolean;
  limit_value: number | null;
  features?: ApiFeatureMeta;
}

interface ApiPlan {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tier: number;
  price: number;
  currency: string;
  is_active: boolean;
  features?: ApiPlanFeature[];
}

// Row in the comparison table
interface ComparisonRow {
  key: string;
  name: string;
  category: string;
  sort_order: number;
  enabledCount: number; // how many plans have this feature enabled
}

// Cell value for a plan/feature intersection
interface FeatureCell {
  enabled: boolean;
  limitText: string | null;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent, ButtonComponent],
  templateUrl: './pricing.component.html',
})
export class PricingComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly signupUrl = SAVVY_SIGNUP_URL;
  readonly whatsappUrl = WHATSAPP_URL;
  isAnnual = signal(false);

  plans = signal<ApiPlan[]>([]);
  loading = signal(true);
  loadError = signal(false);
  showAllFeatures = signal(false);

  readonly INITIAL_FEATURES_SHOWN = 10;
  readonly ANNUAL_DISCOUNT = 0.20;

  private readonly API_URL = 'https://api.savvypos.com/subscription/plans/public';

  // ── Comparison table data ─────────────────────────────────────────────────

  allFeatureRows = computed<ComparisonRow[]>(() => {
    const plans = this.plans();
    const seen = new Map<string, ComparisonRow>();

    // Collect all unique features across plans
    for (const plan of plans) {
      for (const pf of (plan.features ?? [])) {
        const f = pf.features;
        if (f && !seen.has(f.key)) {
          seen.set(f.key, { key: f.key, name: f.name, category: f.category, sort_order: f.sort_order, enabledCount: 0 });
        }
      }
    }

    // Count how many plans have each feature enabled
    for (const row of seen.values()) {
      row.enabledCount = plans.filter(p =>
        (p.features ?? []).some(pf => pf.features?.key === row.key && pf.enabled)
      ).length;
    }

    // Sort:
    //  1. limit features (numbers) before module features (checkmarks)
    //  2. within each category: most coverage first
    //  3. within same coverage count: alphabetical
    const categoryOrder = (cat: string) => cat === 'limit' ? 0 : 1;
    return Array.from(seen.values()).sort((a, b) => {
      const catDiff = categoryOrder(a.category) - categoryOrder(b.category);
      if (catDiff !== 0) return catDiff;
      if (b.enabledCount !== a.enabledCount) return b.enabledCount - a.enabledCount;
      return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    });
  });

  visibleRows = computed<ComparisonRow[]>(() => {
    const rows = this.allFeatureRows();
    return this.showAllFeatures() ? rows : rows.slice(0, this.INITIAL_FEATURES_SHOWN);
  });

  hiddenCount = computed(() => Math.max(0, this.allFeatureRows().length - this.INITIAL_FEATURES_SHOWN));

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.http.get<ApiPlan[]>(this.API_URL).subscribe({
      next: (plans) => {
        this.plans.set(plans.sort((a, b) => a.tier - b.tier));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(true);
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Plans with a public price (not enterprise-grade contact plans) */
  isContactPlan(plan: ApiPlan): boolean {
    return plan.price <= 0;
  }

  formatPrice(price: number, currency = 'COP'): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency, minimumFractionDigits: 0,
    }).format(price);
  }

  displayPrice(plan: ApiPlan): string {
    const base = plan.price;
    const discounted = this.isAnnual() ? base * (1 - this.ANNUAL_DISCOUNT) : base;
    return this.formatPrice(discounted, plan.currency);
  }

  displayMonthlyIfAnnual(plan: ApiPlan): string {
    // Shows the per-month price when billing annually
    return this.formatPrice(plan.price * (1 - this.ANNUAL_DISCOUNT), plan.currency);
  }

  isHighlighted(plan: ApiPlan): boolean {
    // Tier 3 (Pro) is the highlighted plan by convention
    return plan.tier === 3;
  }

  /** Feature cell value for the comparison table */
  getCell(plan: ApiPlan, featureKey: string): FeatureCell {
    const pf = (plan.features ?? []).find(f => f.features?.key === featureKey);
    if (!pf) return { enabled: false, limitText: null };

    if (pf.features?.category === 'limit') {
      const limitText = pf.limit_value === -1
        ? '∞'
        : pf.limit_value != null
          ? String(pf.limit_value)
          : null;
      return { enabled: pf.enabled, limitText };
    }

    return { enabled: pf.enabled, limitText: null };
  }

  /** Count of enabled module features for a plan */
  enabledModuleCount(plan: ApiPlan): number {
    return (plan.features ?? []).filter(f => f.enabled && f.features?.category === 'module').length;
  }
}
