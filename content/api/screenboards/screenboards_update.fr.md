---
title: Mettre à jour un screenboard
type: apicontent
order: 18.2
external_redirect: /api/#mettre-a-jour-un-screenboard
---

## Mettre à jour un screenboard

Remplacez une configuration de screenboard dans Datadog.

**Remarque** : vous devez envoyer toute la configuration d'origine du screenboard avec vos mises à jour, sans quoi les widgets d'origine seront effacés.

##### ARGUMENTS

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
