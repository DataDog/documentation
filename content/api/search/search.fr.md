---
title: Recherche
type: apicontent
order: 19
external_redirect: /api/#search
---
## Recherche
Cet endpoint vous permet de rechercher des entités sur les 24 dernières heures dans Datadog. Les entités disponibles actuellement sont:

* `hosts`
* `metrics`

##### ARGUMENTS
* `q` [*obligatoire*]:  
    Le contenu de la requête

##### LANGUAGE DE REQUETE

Les requêtes de recherche ont un nombre de facettes limitées. Les facettes disponibles sont:

* `hosts`
* `metrics`

Facetter votre recherche limite vos résultats aux seules correspondances du type spécifié. Les requêtes sans facettes renvoient des résultats pour tous les types possibles.

Les requêtes sans facette sont de la forme:

`query_string`

Les requêtes avec facettes sont de la forme:

`facet:query_string`