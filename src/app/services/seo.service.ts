import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseUrl = 'https://validador.dev.br';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  public init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const seoData = data['seo'];
      if (seoData) {
        this.updateMetaTags(seoData);
      }
    });
  }

  private updateMetaTags(seoData: any) {
    if (seoData.title) {
      this.titleService.setTitle(seoData.title);
      this.metaService.updateTag({ property: 'og:title', content: seoData.title });
    }
    
    if (seoData.description) {
      this.metaService.updateTag({ name: 'description', content: seoData.description });
      this.metaService.updateTag({ property: 'og:description', content: seoData.description });
    }

    if (seoData.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: seoData.keywords });
    }

    this.updateCanonicalUrl();
  }

  private updateCanonicalUrl() {
    const canonicalUrl = `${this.baseUrl}${this.router.url.split('?')[0]}`;
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    
    if (link) {
      link.setAttribute('href', canonicalUrl);
    } else {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      this.doc.head.appendChild(link);
    }
  }
}
