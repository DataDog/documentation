---
title: Rechercher des hôtes
type: apicontent
order: 13.1
external_redirect: /api/#rechercher-des-hôtes
---

## Rechercher des hôtes
Cet endpoint permet de rechercher les hôtes selon leur nom, alias ou tag. Les hôtes actifs au cours des trois dernières heures sont inclus. Les résultats sont paginés avec un maximum de 100 résultats par recherche.

##### ARGUMENTS

* **`filter`** [*facultatif*, *défaut* = **None**] :
    chaîne de requête pour filtrer les résultats de la recherche.
* **`sort_field`** [*facultatif*, *défaut* = **cpu**] :
    triez les hôtes selon un champ donné.
    Options : **status**, **apps**, **cpu**, **iowait** ou **load**
* **`sort_dir`** [*facultatif*, *défaut* = **desc**] :
    le sens du tri.
    Options : **asc** ou **desc**
* **`start`** [*facultatif*, *défaut* = **0**] :
    résultat des hôtes à partir desquels commencer la recherche.
* **`count`** [*facultatif*, *défaut* = **100**] :
     nombre d'hôtes à renvoyer, max. 100.
