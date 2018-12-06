---
title: Search hosts
type: apicontent
order: 13.1
external_redirect: /api/#search-hosts
---

## Search hosts
Cet endpoit permet de rechercher les hôtes par nom, alias ou tag. Les hôtes actifs au cours des 3 dernières heures sont inclus. Les résultats sont paginés avec un maximum de 100 résultats à chaque fois.

##### ARGUMENTS

* **`filter`** [*facultatif*, *défaut*=**None**]:  
    Texte de requête pour filtrer les résultats de la recherche.
* **`sort_field`** [*facultatif*, *défaut*=**cpu*]:  
    Trier les hôtes pour un champ donné.
    Options: **status**, **apps**, **cpu**, **iowait**, **load**
* **`sort_dir`** [*facultatif*, *défaut*=**desc**]:
    Sens du tri.
    Options: **asc**, **desc**
* **`start`** [*facultatif*, *défaut*=**0**]:
    Résultat des hôtes depuis lesquels commencer la recherche.
* **`count`** [*facultatif*, *défaut*=**100**]:
     Nombre de hôtes à retourner. Max 100.
