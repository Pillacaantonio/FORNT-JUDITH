import {Injectable, signal, computed, effect} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface SidebarConfig {
  theme: 'light' | 'dark';
  isCollapsed: boolean;
  showBadges: boolean;
  animationEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // Signals para el estado del sidebar
  private readonly _activeMenuItem = signal<string>('dashboard');
  private readonly _sidebarConfig = signal<SidebarConfig>({
    theme: 'light',
    isCollapsed: false,
    showBadges: true,
    animationEnabled: true
  });

  private readonly _menuSections = signal<MenuSection[]>([
    {
      items: [
        {
          id: 'panel',
          label: 'Panel',
          icon: 'ri-dashboard-line',
          route: '/main/panel'
        },
        {
          id: 'listado',
          label: 'listado de Cotizaciones',
          icon: 'ri-bar-chart-horizontal-line',
          route: '/main/listado'
        },
        {
          id: 'cotizacion',
          label: 'cotizacion',
          icon: 'ri-bar-chart-box-ai-line',
          route: '/main/cotizacion'
        },
        // {
        //   id: 'avance',
        //   label: 'Avance',
        //   icon: 'ri-line-chart-line',
        //   route: '/docente/avance'
        // }
      ]
    },
    {
      //title: 'ADMINISTRACIÓN',
      items: [
        // {
        //   id: 'alumnos',
        //   label: 'Alumnos',
        //   icon: 'ri-group-3-line',
        //   route: '/docente/alumnos'
        // },
        // {
        //   id: 'lecturas',
        //   label: 'Lecturas',
        //   icon: 'ri-file-copy-2-line',
        //   route: '/docente/lecturas'
        // }
      ]
    }
  ]);

  // Computed signals para valores derivados
  readonly activeMenuItem = this._activeMenuItem.asReadonly();
  readonly menuSections = this._menuSections.asReadonly();

  // Computed para obtener el item activo actual
  readonly currentActiveMenuItem = computed(() => {
    const activeId = this._activeMenuItem();
    return this.getMenuItemById(activeId);
  });

  // Computed para el tema actual
  readonly isDarkTheme = computed(() => this._sidebarConfig().theme === 'dark');
  readonly isCollapsed = computed(() => this._sidebarConfig().isCollapsed);

  // Computed para las clases CSS del sidebar
  readonly sidebarClasses = computed(() => {
    const config = this._sidebarConfig();
    const baseClasses = 'max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 p-0 antialiased shadow-none transition-transform duration-200 xl:left-0';
    const collapsedClasses = config.isCollapsed ? '-translate-x-full xl:translate-x-0' : 'xl:translate-x-0';
    const themeClasses = config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white xl:bg-gray-50';

    return `${baseClasses} ${collapsedClasses} ${themeClasses}`;
  });

  constructor(private router: Router) {
    this.initializeRouteListener()
  }

  setActiveMenuItem(itemId: string): void {
    this._activeMenuItem.set(itemId);
  }


  // Navigation
  navigateToMenuItem(menuItem: MenuItem): void {
    this.setActiveMenuItem(menuItem.id);
    this.router.navigate([menuItem.route]);
  }

  // Helper methods
  getMenuItemById(itemId: string): MenuItem | null {
    for (const section of this._menuSections()) {
      const item = section.items.find(item => item.id === itemId);
      if (item) return item;
    }
    return null;
  }

  isMenuItemActive(itemId: string): boolean {
    return this._activeMenuItem() === itemId;
  }

  getMenuItemClasses(item: MenuItem): string {
    const baseClasses = 'py-2.5 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer';
    const activeClasses = 'shadow-soft-xl bg-white font-semibold text-slate-700 rounded-lg';
    const inactiveClasses = 'hover:bg-gray-100 hover:rounded-lg';
    const isActive = this.isMenuItemActive(item.id);

    return isActive
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  }

  getIconContainerClasses(item: MenuItem): string {
    const baseClasses = 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 transition-all duration-300';
    const activeClasses = 'bg-gradient-to-tl from-purple-700 to-pink-500 text-white';
    const inactiveClasses = 'bg-white text-slate-700';
    const isActive = this.isMenuItemActive(item.id);

    return isActive
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  }


  // Private methods
  private initializeRouteListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveMenuFromRoute(event.url);
      });
  }

  private setActiveMenuFromRoute(url: string): void {
    for (const section of this._menuSections()) {
      for (const item of section.items) {
        if (url.includes(item.route) || (url === '/' && item.id === 'dashboard')) {
          this.setActiveMenuItem(item.id);
          return;
        }
      }
    }
  }

}
