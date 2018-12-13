---
title: Update a Timeboard
type: apicontent
order: 21.2
external_redirect: /api/#update-a-timeboard
---

## Update a Timeboard

##### Arguments

* **`title`** [*required*]:  
    The name of the dashboard.
* **`description`** [*required*]:  
    A description of the dashboard's contents.
* **`graphs`** [*required*]:  
    A list of graph definitions. Graph definitions follow this form:
    * **`title`** [*required*]:  
        The name of the graph.
    * **`definition`** [*required*]:  
    The graph definition. Read the [Graph Guide][1] for more on graphs. Example:  
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*optional*, *default*=**None**]:  
    A list of template variables for using Dashboard templating. Template variable definitions follow this form:
    * **`name`** [*required*]:  
     The name of the variable.

    * **`prefix`** [*optional*, *default*=**None**]:  
    The tag prefix associated with the variable. Only tags with this prefix appear in the variable dropdown.

    * **`default`** [*optional*, *default*=**None**]:  
    The default value for the template variable on dashboard load.

[1]: /graphing
