---
title: Delete Items from a Dashboard List
type: apicontent
order: 8.9
external_redirect: /api/#delete-items-from-a-dashboard-list
---

## Delete Items from a Dashboard List

Delete dashboards from an existing dashboard list.

##### ARGUMENTS

*   **`dashboards`** [*required*]:
    A list of dashboards to remove from the list.
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
