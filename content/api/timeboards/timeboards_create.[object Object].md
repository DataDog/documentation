---
title: Créer un Timeboard
type: apicontent
order: 20.1
external_redirect: /api/#create-a-timeboard
---

## Créer un Timeboard
##### Arguments

* **`title`** [*obligatoire*]:  
    Le nom du dashboard.
* **`description`** [*optionnel*, *defaut*=**None**]:  
    Une description du contenu du dashboard.
* **`graphs`** [*optionnel*, *defaut*=**None**]:  
    Une liste de définitions de graphe. Les définitions de graphe suivent cette forme:
    * **`title`** [*obligatoire*]:  
        Le nom du graphe.
    * **`definition`** [*optionnel*, *defaut*=**None**]:  
        La définition du graphe. Exemple:  
        `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*optionnel*, *defaut*=**None**]:  
    Liste des template variables utilisable dans le templating Dashboard. Les Templates variables suivent cette forme:
    * **`name`** [*obligatoire*]:
        Le nom de la variable.
    * **`prefix`** [*optionnel*, *defaut*=**None**]:  
        Le préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.
    * **`default`** [*optionnel*, *defaut*=**None**]:  
        La valeur par défaut de la Template variable lors du chargement du dasboard.