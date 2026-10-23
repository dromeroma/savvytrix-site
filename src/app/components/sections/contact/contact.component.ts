import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { WHATSAPP_URL } from '../../../config';
import { CtaService } from '../../../services/cta.service';

/**
 * Formulario de cotización. Envía a /api/contacto (worker → correo con Email Routing).
 * Si el correo no sale, abre WhatsApp con los mismos datos: nunca se pierde un cliente.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionWrapperComponent, FormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  /** Opción de "¿Qué necesitas?" preseleccionada (páginas por nicho). */
  readonly preset = input('');
  /** Plan elegido en la sección Planes (se muestra y se envía con la solicitud). */
  readonly cta = inject(CtaService);

  readonly needs = [
    'Página web para mi negocio',
    'Tienda en línea',
    'Aparecer en Google en mi ciudad',
    'Sistema de ventas (SavvyPOS)',
    'Software o sistema a la medida',
    'Auditoría gratis de mi negocio en Google',
    'Algo más sencillo / otro',
  ];

  form = { name: '', phone: '', business: '', need: this.needs[0], message: '', website: '' };
  readonly sending = signal(false);

  ngOnInit(): void {
    if (this.preset() && this.needs.includes(this.preset())) this.form.need = this.preset();
  }

  readonly sent = signal(false);
  readonly error = signal('');

  private waText(): string {
    const f = this.form;
    return [
      'Hola, quiero cotizar con Savvytrix.',
      `Nombre: ${f.name}`,
      this.cta.plan() ? `Plan: ${this.cta.plan()}` : '',
      f.business ? `Negocio y ciudad: ${f.business}` : '',
      `Necesito: ${f.need}`,
      f.message ? `Detalle: ${f.message}` : '',
    ].filter(Boolean).join('\n');
  }

  get waUrl(): string {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(this.waText())}`;
  }

  async submit(): Promise<void> {
    if (this.sending()) return;
    const f = this.form;
    if (!f.name.trim() || f.phone.replace(/\D/g, '').length < 7) {
      this.error.set('Escribe tu nombre y un teléfono o WhatsApp válido.');
      return;
    }
    this.error.set('');
    this.sending.set(true);
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, plan: this.cta.plan(), source: location.pathname }),
      });
      if (!r.ok) throw new Error(String(r.status));
      this.sent.set(true);
    } catch {
      // Respaldo: el mensaje sale por WhatsApp con los datos ya escritos.
      window.open(this.waUrl, '_blank', 'noopener');
      this.sent.set(true);
    } finally {
      this.sending.set(false);
      document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
