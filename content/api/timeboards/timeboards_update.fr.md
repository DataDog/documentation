---
title: Mettre à jour un timeboard
type: apicontent
order: 21.2
external_redirect: '/api/#mettre-a-jour-un-timeboard'
---
## Mettre à jour un timeboard

##### Arguments

* **`title`** [*obligatoire*] :
    Le nom du dashboard.
* **`description`** [*obligatoire*] :
    La description du contenu du dashboard.
* **`graphs`** [*obligatoire*] :
    La liste des définitions de graphique. Les définitions de graphique respectent le format suivant :
    * **`title`** [*obligatoire*] :
        Le nom du graphique.
    * **`definition`** [*obligatoire*] :
    La définition du graphique. Lisez le [guide sur les graphiques][1] pour en savoir plus sur les graphiques. Exemple :
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*facultatif*, *défaut*=**None**] : 
    La liste des template variables utilisables dans le dashboard de création de modèles. Les définitions de template variables respectent le format suivant :
    * **`name`** [*obligatoire*] :
     Le nom de la variable.

    * **`prefix`** [*facultatif*, *défaut*=**None**] :
    Le préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.

    * **`default`** [*facultatif*, *défaut*=**None**] :
    La valeur par défaut de la template variable lors du chargement du dashboard.

[1]: /fr/graphing