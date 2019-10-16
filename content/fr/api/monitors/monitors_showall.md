---
title: Récupérer tous les détails d'un monitor
type: apicontent
order: 26.05
external_redirect: /api/#recuperer-tous-les-details-d-un-monitor
---

## Récupérer tous les détails d'un monitor

**ARGUMENTS**:

* **`group_states`** [*facultatif*, *défaut*=**None**] :
    Si cet argument est défini, les données renvoyées comprennent d'éventuelles informations supplémentaires concernant les états des groupes spécifiés, notamment le timestamp de la dernière notification, le timestamp de la dernière résolution et les détails du dernier déclenchement du monitor. L'argument doit inclure une liste de chaînes de caractères indiquant, le cas échéant, les états de groupe à inclure. Choisissez une ou plusieurs des valeurs suivantes : « all », « alert », « warn » ou « no data ». Par exemple : « alert,warn ».
* **`name`** [*facultatif*, défaut=**None**] :
    Une chaîne de caractères permettant de filtrer les monitors en fonction de leur nom.
* **`tags`** [*facultatif*, *défaut*=**None**] :
    Une liste séparée par des virgules indiquant les tags, le cas échéant, à utiliser afin de filtrer la liste des monitors par contexte (par ex., `host:host0`). Pour obtenir plus d'informations, consultez le paramètre `tags` pour l'argument `query` approprié dans la section [Créer un monitor](#creer-un-monitor) ci-dessus.
* **`monitor_tags`** [*facultatif*, *défaut*=**None**] :
    Une liste séparée par des virgules indiquant le service ou les tags personnalisés, le cas échéant, à utiliser afin de filtrer la liste des monitors. Les tags créés dans l'interface utilisateur de Datadog ont automatiquement la clé de **service** ajoutée en préfixe (par ex., `service:my-app`)
* **`with_downtimes`** [*facultatif*, *défaut*=**true**] :
    Si cet argument est défini sur `true`, alors les données renvoyées comprennent les downtimes de chaque monitor.
* **`page`** [*facultatif*, *défaut*=**0**] :
    La page où la pagination démarre. Si cet argument n'est pas spécifié, la requête renvoie tous les monitors sans pagination.
* **`page_size`** [*facultatif*, *défaut*=**100**] :
    Le nombre de monitors à renvoyer par page. Si l'argument `page` n'est pas spécifié, tous les monitors sont renvoyés par défaut sans limite `page_size`. En revanche, si `page` est spécifié et `page_size` ne l'est pas, l'argument prend par défaut la valeur `100`.
