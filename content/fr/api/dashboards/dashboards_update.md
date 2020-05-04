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
    * **`layout`** [*obligatoire* pour les widgets de dashboard dont le layout_type est `free` uniquement]. La structure de la disposition respecte le format suivant :
        - **`x`** [*obligatoire*] La position du widget sur l'axe des abscisses (X). Doit être un entier non négatif.
        - **`y`** [*obligatoire*] La position du widget sur l'axe des ordonnées (Y). Doit être un entier non négatif.
        - **`width`** [*obligatoire*] La largeur du widget. Doit être un entier non négatif.
        - **`height`** [*obligatoire*] La hauteur du widget. Doit être un entier non négatif.
* **`layout_type`** [*obligatoire*] :
  Type de disposition du dashboard. Valeurs possibles : `ordered` (timeboard précédent) ou `free` (disposition du screenboard précédent)
* **`description`** [*facultatif*, *valeur par défaut*=**Aucune**] :
  Description du dashboard.
* **`is_read_only`** [*facultatif*, *défaut*=**False**] :
  Définit si ce dashboard est en lecture seule. Si `True`, seul l'auteur et les administrateurs peuvent effectuer des modifications.
* **`notify_list`** [*facultatif*, *valeur par défaut*=**Aucune**] :
  Liste des handles des utilisateurs à notifier lorsque des changements sont apportés à ce dashboard.
* **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    Liste des template variables pour ce dashboard. Les définitions de template variables respectent le format suivant :
    * **`name`** [*obligatoire*] :
      Nom de la variable.
    * **`default`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        la valeur par défaut de la template variable lors du chargement du dashboard.
    * **`prefix`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        Préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.
* **`template_variable_presets`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    Tableau de vues enregistrées comportant des template variables. Les définitions de vues enregistrées respectent le format suivant :
    * **`name`** [*obligatoire*] :
        Le nom de la vue enregistrée.
    * **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        Tableau de template variables qui ne sont pas définies sur leur valeur par défaut. Les définitions de template variables respectent le format suivant :
      * **`name`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        Le nom de la variable.
      * **`value`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        La valeur de la template variable au sein de la vue enregistrée.

[1]: /fr/dashboards/widgets