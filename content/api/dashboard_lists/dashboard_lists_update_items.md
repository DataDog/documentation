---
title: Update Items of a Dashboard List
type: apicontent
order: 8.8
external_redirect: /api/#update-items-of-a-dashboard-list
---

## Update Items of a Dashboard List

Update dashboards of an existing dashboard list.

##### ARGUMENTS

*   **`dashboards`** [*required*]:
    The new list of dashboards for the dashboard list.
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
