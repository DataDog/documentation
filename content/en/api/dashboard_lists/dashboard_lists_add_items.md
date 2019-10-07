---
title: Add Items to a Dashboard List
type: apicontent
order: 9.7
external_redirect: /api/#add-items-to-a-dashboard-list
---

## Add Items to a Dashboard List

Add dashboards to an existing dashboard list.

<div class="alert alert-info">
This endpoint has been updated to reflect the new Dashboard API changes. Documentation for old endpoint is available here:
    <ul>
        <li><a href="https://docs.datadoghq.com/graphing/guide/dashboard-lists-api-v1-doc#add-items-of-a-dashboard-list">Add Items to a Dashboard List (v1)</a></li>
    </ul>
</div>

**ARGUMENTS**:

*   **`dashboards`** [*required*]:
    A list of dashboards to add to the list.
    Dashboard definitions follow this form:
    *   **`type`** [*required*]:
        The type of the dashboard.
        The type must be one of:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required*]:
        The id of the dashboard.
