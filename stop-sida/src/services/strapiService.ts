// Service pour communiquer avec l'API Strapi
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

// Types pour les modèles de contenu
export interface Actualite {
  titre: string;
  description: string;
  contenu: string;
  date_publication: string;
  categorie: string;
  statut: string;
  slug: string;
  auteur?: string;
  tags?: string[];
  image?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        alternativeText?: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Rapport {
  titre: string;
  description: string;
  annee: number;
  categorie: string;
  statut: string;
  slug: string;
  auteur?: string;
  mots_cles?: string[];
  fichier?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        size: number;
        ext: string;
      };
    };
  };
  date_publication: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Partenaire {
  nom: string;
  acronyme?: string;
  description: string;
  categorie: string;
  site_web?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  date_collaboration?: string;
  statut: string;
  slug: string;
  ordre_affichage: number;
  logo?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        alternativeText?: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MembreEquipe {
  nom: string;
  prenom: string;
  poste: string;
  biographie?: string;
  email?: string;
  telephone?: string;
  departement: string;
  date_entree?: string;
  statut: string;
  ordre_affichage: number;
  reseaux_sociaux?: any;
  competences?: string[];
  photo?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        alternativeText?: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Evenement {
  titre: string;
  description: string;
  contenu: string;
  date_debut: string;
  date_fin?: string;
  lieu?: string;
  adresse?: string;
  categorie: string;
  statut: string;
  public_cible?: string;
  capacite_max?: number;
  inscription_requise: boolean;
  contact_inscription?: string;
  slug: string;
  organisateur?: string;
  partenaires?: string;
  image?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        alternativeText?: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Fonctions utilitaires
const getImageUrl = (image: any): string => {
  if (!image?.data?.attributes?.url) return '';
  const url = image.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

const getFileUrl = (file: any): string => {
  if (!file?.data?.attributes?.url) return '';
  const url = file.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

// Service principal
class StrapiService {
  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${STRAPI_URL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erreur Strapi: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Actualités
  async getActualites(params?: {
    page?: number;
    pageSize?: number;
    categorie?: string;
    statut?: string;
  }): Promise<StrapiResponse<Actualite>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.categorie) searchParams.append('filters[categorie][$eq]', params.categorie);
    if (params?.statut) searchParams.append('filters[statut][$eq]', params.statut);
    
    searchParams.append('sort[0]', 'date_publication:desc');
    searchParams.append('populate', 'image');
    searchParams.append('filters[publishedAt][$notNull]', 'true');

    return this.fetchAPI<Actualite>(`/actualites?${searchParams}`);
  }

  async getActualite(slug: string): Promise<StrapiItem<Actualite>> {
    const response = await this.fetchAPI<Actualite>(
      `/actualites?filters[slug][$eq]=${slug}&populate=image`
    );
    
    if (!response.data.length) {
      throw new Error('Actualité non trouvée');
    }
    
    return response.data[0];
  }

  // Rapports
  async getRapports(params?: {
    page?: number;
    pageSize?: number;
    categorie?: string;
    annee?: number;
  }): Promise<StrapiResponse<Rapport>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.categorie) searchParams.append('filters[categorie][$eq]', params.categorie);
    if (params?.annee) searchParams.append('filters[annee][$eq]', params.annee.toString());
    
    searchParams.append('sort[0]', 'annee:desc');
    searchParams.append('populate', 'fichier');
    searchParams.append('filters[publishedAt][$notNull]', 'true');

    return this.fetchAPI<Rapport>(`/rapports?${searchParams}`);
  }

  async getRapport(slug: string): Promise<StrapiItem<Rapport>> {
    const response = await this.fetchAPI<Rapport>(
      `/rapports?filters[slug][$eq]=${slug}&populate=fichier`
    );
    
    if (!response.data.length) {
      throw new Error('Rapport non trouvé');
    }
    
    return response.data[0];
  }

  // Partenaires
  async getPartenaires(params?: {
    categorie?: string;
    statut?: string;
  }): Promise<StrapiResponse<Partenaire>> {
    const searchParams = new URLSearchParams();
    
    if (params?.categorie) searchParams.append('filters[categorie][$eq]', params.categorie);
    if (params?.statut) searchParams.append('filters[statut][$eq]', params.statut);
    
    searchParams.append('sort[0]', 'ordre_affichage:asc');
    searchParams.append('populate', 'logo');
    searchParams.append('filters[publishedAt][$notNull]', 'true');

    return this.fetchAPI<Partenaire>(`/partenaires?${searchParams}`);
  }

  // Membres de l'équipe
  async getMembresEquipe(params?: {
    departement?: string;
    statut?: string;
  }): Promise<StrapiResponse<MembreEquipe>> {
    const searchParams = new URLSearchParams();
    
    if (params?.departement) searchParams.append('filters[departement][$eq]', params.departement);
    if (params?.statut) searchParams.append('filters[statut][$eq]', params.statut);
    
    searchParams.append('sort[0]', 'ordre_affichage:asc');
    searchParams.append('populate', 'photo');
    searchParams.append('filters[publishedAt][$notNull]', 'true');

    return this.fetchAPI<MembreEquipe>(`/membre-equipes?${searchParams}`);
  }

  // Événements
  async getEvenements(params?: {
    page?: number;
    pageSize?: number;
    categorie?: string;
    statut?: string;
    dateDebut?: string;
  }): Promise<StrapiResponse<Evenement>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.categorie) searchParams.append('filters[categorie][$eq]', params.categorie);
    if (params?.statut) searchParams.append('filters[statut][$eq]', params.statut);
    if (params?.dateDebut) searchParams.append('filters[date_debut][$gte]', params.dateDebut);
    
    searchParams.append('sort[0]', 'date_debut:asc');
    searchParams.append('populate', 'image');
    searchParams.append('filters[publishedAt][$notNull]', 'true');

    return this.fetchAPI<Evenement>(`/evenements?${searchParams}`);
  }

  async getEvenement(slug: string): Promise<StrapiItem<Evenement>> {
    const response = await this.fetchAPI<Evenement>(
      `/evenements?filters[slug][$eq]=${slug}&populate=image`
    );
    
    if (!response.data.length) {
      throw new Error('Événement non trouvé');
    }
    
    return response.data[0];
  }
}

// Fonctions utilitaires pour transformer les données
export const transformActualite = (item: StrapiItem<Actualite>) => ({
  id: item.id,
  titre: item.attributes.titre,
  description: item.attributes.description,
  contenu: item.attributes.contenu,
  date_publication: item.attributes.date_publication,
  categorie: item.attributes.categorie,
  statut: item.attributes.statut,
  slug: item.attributes.slug,
  auteur: item.attributes.auteur,
  tags: item.attributes.tags,
  image: getImageUrl(item.attributes.image),
  createdAt: item.attributes.createdAt,
  updatedAt: item.attributes.updatedAt,
  publishedAt: item.attributes.publishedAt,
});

export const transformRapport = (item: StrapiItem<Rapport>) => ({
  id: item.id,
  titre: item.attributes.titre,
  description: item.attributes.description,
  annee: item.attributes.annee,
  categorie: item.attributes.categorie,
  statut: item.attributes.statut,
  slug: item.attributes.slug,
  auteur: item.attributes.auteur,
  mots_cles: item.attributes.mots_cles,
  fichier: getFileUrl(item.attributes.fichier),
  nom_fichier: item.attributes.fichier?.data?.attributes?.name,
  taille_fichier: item.attributes.fichier?.data?.attributes?.size,
  date_publication: item.attributes.date_publication,
  createdAt: item.attributes.createdAt,
  updatedAt: item.attributes.updatedAt,
  publishedAt: item.attributes.publishedAt,
});

export const transformPartenaire = (item: StrapiItem<Partenaire>) => ({
  id: item.id,
  nom: item.attributes.nom,
  acronyme: item.attributes.acronyme,
  description: item.attributes.description,
  categorie: item.attributes.categorie,
  site_web: item.attributes.site_web,
  email: item.attributes.email,
  telephone: item.attributes.telephone,
  adresse: item.attributes.adresse,
  date_collaboration: item.attributes.date_collaboration,
  statut: item.attributes.statut,
  slug: item.attributes.slug,
  ordre_affichage: item.attributes.ordre_affichage,
  logo: getImageUrl(item.attributes.logo),
  createdAt: item.attributes.createdAt,
  updatedAt: item.attributes.updatedAt,
  publishedAt: item.attributes.publishedAt,
});

export const transformMembreEquipe = (item: StrapiItem<MembreEquipe>) => ({
  id: item.id,
  nom: item.attributes.nom,
  prenom: item.attributes.prenom,
  poste: item.attributes.poste,
  biographie: item.attributes.biographie,
  email: item.attributes.email,
  telephone: item.attributes.telephone,
  departement: item.attributes.departement,
  date_entree: item.attributes.date_entree,
  statut: item.attributes.statut,
  ordre_affichage: item.attributes.ordre_affichage,
  reseaux_sociaux: item.attributes.reseaux_sociaux,
  competences: item.attributes.competences,
  photo: getImageUrl(item.attributes.photo),
  createdAt: item.attributes.createdAt,
  updatedAt: item.attributes.updatedAt,
  publishedAt: item.attributes.publishedAt,
});

export const transformEvenement = (item: StrapiItem<Evenement>) => ({
  id: item.id,
  titre: item.attributes.titre,
  description: item.attributes.description,
  contenu: item.attributes.contenu,
  date_debut: item.attributes.date_debut,
  date_fin: item.attributes.date_fin,
  lieu: item.attributes.lieu,
  adresse: item.attributes.adresse,
  categorie: item.attributes.categorie,
  statut: item.attributes.statut,
  public_cible: item.attributes.public_cible,
  capacite_max: item.attributes.capacite_max,
  inscription_requise: item.attributes.inscription_requise,
  contact_inscription: item.attributes.contact_inscription,
  slug: item.attributes.slug,
  organisateur: item.attributes.organisateur,
  partenaires: item.attributes.partenaires,
  image: getImageUrl(item.attributes.image),
  createdAt: item.attributes.createdAt,
  updatedAt: item.attributes.updatedAt,
  publishedAt: item.attributes.publishedAt,
});

export const strapiService = new StrapiService(); 