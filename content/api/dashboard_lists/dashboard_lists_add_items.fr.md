---
title: Ajouter des éléments à une liste de dashboards
type: apicontent
order: 8.7
external_redirect: /api/#ajouter-des-elements-a-une-liste-de-dashboards
---

## Ajouter des éléments à une liste de dashboards

Ajoutez des dashboards à une liste de dashboards existante.

##### ARGUMENTS

*   **`dashboards`** [*obligatoire*] :
    La liste des dashboards à ajouter à la liste.
    Les définitions de dashboard respectent le format suivant :
    *   **`type`** [*obligatoire*] :
        Le type du dashboard.
        Le type doit être correspondre à l'une des valeurs suivantes :

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*obligatoire*] :
        L'ID du dashboard.
