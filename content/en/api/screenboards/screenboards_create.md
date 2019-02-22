---
title: Create a Screenboard
type: apicontent
order: 20.1
external_redirect: /api/#create-a-screenboard
---

## Create a Screenboard
##### Arguments
* **`board_title`** [*required*]:  
    The name of the dashboard.    
* **`description`** [*optional*, *default*=**None**]:  
    A description of the dashboard's content.
* **`widgets`** [*required*]:  
    A list of widget definitions. To get a widget definition, use the *JSON tab* in the widget configuration UI.
* **`template_variables`** [*optional*, *default*=**None**]:  
    A list of template variables for using Dashboard templating.
* **`read_only`** [*optional*, *default*=**False**]:  
    The read-only status of the screenboard.
