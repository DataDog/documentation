---
title: Ajouter des éléments à une liste de dashboards
type: apicontent
order: 9.7
external_redirect: /api/#ajouter-des-elements-a-une-liste-de-dashboards
---

## Ajouter des éléments à une liste de dashboards

Ajoutez des dashboards à une liste de dashboards existante.

<div class="alert alert-info">
Ce endpoint a été mis à jour afin de refléter les nouvelles modifications de l'API Dashboard. La documentation relative à l'ancien endpoint se trouve ici :
    <ul>
        <li><a href="https://docs.datadoghq.com/graphing/guide/dashboard-lists-api-v1-doc#add-items-of-a-dashboard-list">Ajouter des éléments à une liste de dashboards (v1)</a></li>
    </ul>
</div>

**ARGUMENTS**:

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
