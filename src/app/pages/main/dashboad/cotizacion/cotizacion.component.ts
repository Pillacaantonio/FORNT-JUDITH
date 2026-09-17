import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({ selector: 'app-cotizacion', standalone: true, imports: [ReactiveFormsModule], templateUrl: './cotizacion.component.html', styleUrl: './cotizacion.component.css' })
export default class CotizacionComponent {
  private readonly fb = inject(FormBuilder); readonly fileName = signal('');
  readonly form = this.fb.nonNullable.group({ nombre: ['', Validators.required], telefono: ['', Validators.required], evento: [''], porciones: [''], detalles: ['', Validators.required] });
  onFile(event: Event): void { this.fileName.set((event.target as HTMLInputElement).files?.[0]?.name ?? ''); }
  send(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const v = this.form.getRawValue(); const text = `Hola, quiero una cotización.\nNombre: ${v.nombre}\nWhatsApp: ${v.telefono}\nEvento: ${v.evento || 'No especificado'}\nPorciones: ${v.porciones || 'No especificado'}\nIdea: ${v.detalles}`; window.open(`https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); }
}
