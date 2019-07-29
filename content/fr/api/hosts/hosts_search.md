---
title: Rechercher des hosts
type: apicontent
order: 14.1
external_redirect: /api/#rechercher-des-hosts
---

## Rechercher des hosts
Cet endpoint permet de rechercher les hosts selon leur nom, alias ou tag. Les hosts actifs au cours des trois dernières heures sont inclus. Les résultats sont paginés avec un maximum de 100 résultats par recherche.

##### ARGUMENTS

* **`filter`** [*facultatif*, *défaut*=**None**] :
    chaîne de requête pour filtrer les résultats de la recherche.
* **`sort_field`** [*facultatif*, *défaut*=**cpu**] :
    trie les hosts selon un champ donné.
    Valeurs autorisées : **status**, **apps**, **cpu**, **iowait** ou **load**.
* **`sort_dir`** [*facultatif*, *défaut*=**desc**] :
    l'ordre de tri.
    Valeurs autorisées : **asc** ou **desc**.
* **`start`** [*facultatif*, *défaut*=**0**] :
    résultat des hosts à partir desquels commencer la recherche.
* **`count`** [*facultatif*, *défaut*=**100**] :
     nombre de hosts à renvoyer, max. 100.
