---
title: Add Items to a Dashboard List
type: apicontent
order: 8.7
external_redirect: /api/#add-items-to-a-dashboard-list
---

## Add Items to a Dashboard List

Add dashboards to an existing dashboard list.

##### ARGUMENTS

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
