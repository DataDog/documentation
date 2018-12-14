---
title: Créer un screenboard
type: apicontent
order: 18.1
external_redirect: /api/#creer-un-screenboard
---

## Créer un screenboard
##### Arguments
* **`board_title`** [*obligatoire*] :
    Le nom du dashboard.
* **`description`** [*facultatif*, *défaut* = **None**] :
    La description du contenu du dashboard.
* **`widgets`** [*obligatoire*] :
    [La liste des définitions de widget][1].
* **`template_variables`** [*facultatif*, *défaut* = **None**] :
    La liste des template variables utilisable dans le dashboard de création de modèles.
* **`width`** [*facultatif*, *défaut* = **None**] :
    Largeur du screenboard en pixels.
* **`height`** [*facultatif*, *défaut* = **None**] :
    Hauteur du screenboard en pixels.
* **`read_only`** [*facultatif*, *défaut* = **False**] :
    Indique si le screenboard est en lecture seule ou non.

[1]: /graphing/dashboards/widgets
