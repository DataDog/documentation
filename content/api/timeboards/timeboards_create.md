---
title: Create a Timeboard
type: apicontent
order: 10.1
---
#### Create a Timeboard

##### Arguments

* `title` [*required*]:  
    The name of the dashboard.
* `description` [*optional*, *default*=**None**]:  
    A description of the dashboard's content.
* `graphs` [*optional*, *default*=**None**]:  
    A list of graph definitions. Graph definitions follow this form:
    * `title` [*required*]:  
        The name of the graph.
    * `definition` [*optional*, *default*=**None**]:  
        The graph definition. Example:  
        `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* `template_variables` [*optional*, *default*=**None**]:  
    A list of template variables for using Dashboard templating. Template variable definitions follow this form:
    * `name` [*required*]:  
        The name of the variable.
    * `prefix` [*optional*, *default*=**None**]:  
        The tag prefix associated with the variable. Only tags with this prefix will appear in the variable dropdown.
    * `default` [*optional*, *default*=**None**]:  
        The default value for the template variable on dashboard load.