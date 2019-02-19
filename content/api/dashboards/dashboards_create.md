---
title: Create a Dashboard
type: apicontent
order: 8.1
external_redirect: /api/#create-a-dashboard
---

## Create a Dashboard
##### Arguments

* **`title`** [*required*]:  
    Title of the dashboard.
* **`widgets`** [*required*]:  
    List of widgets to display on the dashboard. Widget definitions follow this form:
    * **`definition`** [*required*]:  
        Definition of the widget.
    * **`id`** [*optional*, *default*=**auto-generated integer**]:  
        ID of the widget.
* **`layout_type`** [*required*]:  
  Layout type of the dashboard (for now, only `ordered` layout - previous timeboard layout - is supported).
* **`description`** [*optional*, *default*=**None**]:  
  Description of the dashboard.
* **`is_read_only`** [*optional*, *default*=**False**]:  
  Whether this dashboard is read-only. If `True`, only the author and admins can make changes to it.
* **`notify_list`** [*optional*, *default*=**None**]:  
  List of handles of users to notify when changes are made to this dashboard.
* **`template_variables`** [*optional*, *default*=**None**]:  
    List of template variables for this dashboard. Template variable definitions follow this form:
    * **`name`** [*required*]:  
        The name of the variable.
    * **`default`** [*optional*, *default*=**None**]:  
        The default value for the template variable on dashboard load.
    * **`prefix`** [*optional*, *default*=**None**]:  
        The tag prefix associated with the variable. Only tags with this prefix appear in the variable dropdown.
