---
title: Récupérer les détails d'un monitor
type: apicontent
order: 27.02
external_redirect: /api/#recuperer-les-details-d-un-monitor
---

## Récupérer les détails d'un monitor

**ARGUMENTS**:

* **`group_states`** [*facultatif*, *défaut*=**None**] :
    Si cet argument est défini, les données renvoyées comprennent d'éventuelles informations supplémentaires concernant les états des groupes spécifiés, notamment le timestamp de la dernière notification, le timestamp de la dernière résolution et les détails du dernier déclenchement du monitor. L'argument doit inclure une liste de chaînes de caractères indiquant, le cas échéant, les états de groupe à inclure. Choisissez une ou plusieurs des valeurs suivantes : **all**, **alert**, **warn** ou **no data**. Exemple : alert,warn.
