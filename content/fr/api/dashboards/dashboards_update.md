---
title: Mettre à jour un dashboard
type: apicontent
order: 8.2
external_redirect: '/api/#mettre-a-jour-un-dashboard'
---
## Mettre à jour un dashboard

**ARGUMENTS**:

* **`title`** [*obligatoire*] :
    Titre du dashboard.
* **`widgets`** [*obligatoire*] :
    Liste des widgets à afficher sur le dashboard. Les définitions de widget respectent le format suivant :
    * **`definition`** [*obligatoire*] :
        [Définition du widget.][1]
    * **`id`** [*facultatif*, *défaut*=**entier généré automatiquement**] :
        ID du widget.
* **`layout_type`** [*obligatoire*] :
  Type de disposition du dashboard. Valeurs possibles : `ordered` (timeboard précédent) ou `free` (disposition du screenboard précédent)
* **`description`** [*facultatif*, *défaut*=**None**] :
  Description du dashboard.
* **`is_read_only`** [*facultatif*, *défaut*=**False**] :
  Définit si ce dashboard est en lecture seule. Si `True`, seul l'auteur et les administrateurs peuvent effectuer des modifications.
* **`notify_list`** [*facultatif*, *défaut*=**None**] :
  Liste de handles des utilisateurs à notifier lorsque des changements sont effectués sur ce dashboard.
* **`template_variables`** [*facultatif*, *défaut*=**None**] :
    Liste des template variables pour ce dashboard. Les définitions de template variables respectent le format suivant :
    * **`name`** [*obligatoire*] :
      Le nom de la variable.
    * **`default`** [*facultatif*, *défaut*=**None**] :
        La valeur par défaut de la template variable lors du chargement du dashboard.
    * **`prefix`** [*facultatif*, *défaut*=**None**] :
        Le préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.

[1]: /fr/graphing/widgets