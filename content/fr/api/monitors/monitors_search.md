---
title: Rechercher des monitors
type: apicontent
order: 26.13
external_redirect: '/api/#rechercher-des-monitors'
---
## Rechercher des monitors

Recherchez et filtrez les informations de vos monitors.

**ARGUMENTS**:

* **`query`** [*facultatif*] :

    Après avoir saisi une requête de recherche dans votre [page Manager Monitor][1], utilisez la valeur du paramètre de requête dans l'URL de la page comme valeur de ce paramètre. Consultez la page de [documentation relative à la gestion des monitors][2] pour en savoir plus.

    La requête peut contenir autant d'attributs de monitor que nécessaire (séparés par des espaces). Exemple : `query="type:metric status:alert"`.

* **`page`** [*facultatif*, *défaut*=**0**] :

    Page à partir de laquelle commencer la pagination.

* **`per_page`** [*facultatif*, *défaut*=**30**] :

     Nombre de monitors à renvoyer par page.

* **`sort`** [*facultatif*, *défaut*=**null**] :

    Une chaîne séparée par des virgules pour les champs pris en charge de l'ordre de tri (p. ex., name,asc) :

    * `name`
    * `status`
    * `tags`

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/manage_monitor/#find-the-monitors