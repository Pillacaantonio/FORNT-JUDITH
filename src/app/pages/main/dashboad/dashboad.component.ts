import { Component, OnInit,inject ,OnDestroy,ElementRef,ViewChild, signal} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem, SidebarService } from './side-bar.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouteAnimation } from '../animations/route.animation';
//import {RouteAnimation} from "../../shared/animations/route-animation";

@Component({
  selector: 'app-dashboad',
  imports: [  
     RouterLink,
   RouterOutlet,
    NgClass
  ],
  templateUrl: './dashboad.component.html',
   standalone:true,
   animations:[
    RouteAnimation
   ]

})
export default class DashboadComponent implements OnInit,OnDestroy {
// ViewChild para obtener referencia al aside
  @ViewChild('sidebarRef', {static: true}) sidebarRef!: ElementRef;

  // Signals locales del componente
  private readonly _isMobileMenuOpen = signal<boolean>(false);
  authService = inject(AuthService);
  private sidebarService = inject(SidebarService)
  //sharedService = inject(SharedService);
  public router = inject(Router)

  //Computed signals que acceden al servicio
    readonly menuSections = this.sidebarService.menuSections;
   readonly isCollapsed = this.sidebarService.isCollapsed;
    readonly currentActiveMenuItem = this.sidebarService.currentActiveMenuItem;

  siderBarOpen = signal(false);

  // Listener para el click fuera del sidebar
  private clickOutsideListener!: (event: Event) => void;
 

  ngOnInit(): void {
    // Crear el listener para clicks fuera del sidebar
    this.clickOutsideListener = (event: Event) => {
      this.handleClickOutside(event);
    };

    // Agregar el listener al documento
    document.addEventListener('click', this.clickOutsideListener);
  }

  ngOnDestroy(): void {
    // Remover el listener cuando el componente se destruye
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }

  private handleClickOutside(event: Event): void {
    // Solo cerrar si el sidebar está abierto
    if (!this.siderBarOpen()) {
      return;
    }

    const target = event.target as HTMLElement;

    // Verificar si el click fue dentro del aside o en el botón que lo abre
    const isClickInsideSidebar = this.sidebarRef?.nativeElement?.contains(target);
    const isClickOnMenuButton = target.closest('button[data-sidebar-toggle]');

    // Si el click no fue dentro del sidebar ni en el botón de menú, cerrar el sidebar
    if (!isClickInsideSidebar && !isClickOnMenuButton) {
      this.siderBarOpen.set(false);
    }
  }

  // Actions
  onMenuItemClick(menuItem: MenuItem): void {
    this.sidebarService.navigateToMenuItem(menuItem);
    // Cerrar menú móvil al hacer clic en un item
    if (this._isMobileMenuOpen()) {
      this._isMobileMenuOpen.set(false);
    }
    // También cerrar el sidebar en móvil
    this.siderBarOpen.set(false);
  }

  // Método para toggle del sidebar
  toggleSidebar(): void {
    this.siderBarOpen.set(!this.siderBarOpen());
  }

  getMenuItemClasses(item: MenuItem): string {
    return this.sidebarService.getMenuItemClasses(item);
  }

  getIconContainerClasses(item: MenuItem): string {
    return this.sidebarService.getIconContainerClasses(item);
  }

  getTextClasses(item: MenuItem): string {
    const baseClasses = 'ml-1 duration-300 opacity-100 pointer-events-none ease-soft';
    const isCollapsed = this.isCollapsed();
    return isCollapsed ? `${baseClasses} xl:hidden` : baseClasses;
  }
 

  getAnimationState() {
    return this.router.url;
  }
}
