---
title: Ajouter un item à une Dashboard List
type: apicontent
order: 8.7
external_redirect: /api/#add-items-to-a-dashboard-list
---

## Ajouter un item à une Dashboard List

Rajoute un ou plusieurs dashboards à une dashboard list.

##### ARGUMENTS

*   **`dashboards`** [*obligatoire*]:
    Une liste de dashboards à ajouter à la dashboard list.
    La définition du dashboard à cette forme:
    *   **`type`** [*obligatoire*]:  
        Le type du dashboard
        Le type doit être:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*obligatoire*]:  
        L'id du dashboard
