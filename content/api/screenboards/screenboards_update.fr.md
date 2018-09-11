---
title: Mettre à jour un Screenboard
type: apicontent
order: 18.2
external_redirect: /api/#update-a-screenboard
---

## Mettre à jour un Screenboard

Remplacer une configuration de Screenboard dans Datadog.

**Note**: Vous devez envoyer la configuration originale de Screenboard avec vos mises à jour sinon les widgets originaux sont effacés.

**ARGUMENTS**:

* **`board_title`** [*obligatoire*]:  
    Le nom du dashboard.
* **`description`** [*optionnel*, *défaut*=**None**]:  
    Une description du contenu du dashboard.
* **`widgets`** [*obligatoire*]:  
    [Liste des définitions de widget][1].
* **`template_variables`** [*optionnel*, *défaut*=**None**]:  
    Liste des template variables utilisable dans le templating Dashboard.
* **`width`** [*optionnel*, *défaut*=**None**]:  
    Largeur du Screenboard en pixels
* **`height`** [*optionnel*, *défaut*=**None**]:  
    Hauteur du Screenboard en pixels.
* **`read_only`** [*optionnel*, *défaut*=**False**]:  
    Si le Screenboard est en lecture seule ou non.

[1]: /graphing/dashboards/widgets
