---
title: Créer un Screenboard
type: apicontent
order: 17.1
external_redirect: /api/#create-a-screenboard
---

## Créer un Screenboard
##### Arguments
* **`board_title`** [*obligatoire*]:  
    Le nom du dashboard.
* **`description`** [*optionnel*, *defaut*=**None**]:  
    Une description du contenu du dashboard.
* **`widgets`** [*obligatoire*]:  
    [Liste des définitions de widget](/graphing/dashboards/widgets/).
* **`template_variables`** [*optionnel*, *defaut*=**None**]:  
    Liste des template variables utilisable dans le templating Dashboard.
* **`width`** [*optionnel*, *defaut*=**None**]:  
    Largeur du Screenboard en pixels.
* **`height`** [*optionnel*, *defaut*=**None**]:  
    Hauteur du Screenboard en pixels.
* **`read_only`** [*optionnel*, *defaut*=**False**]:  
    Si le Screenboard est en lecture seule ou non.