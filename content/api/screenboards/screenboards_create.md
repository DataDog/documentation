---
title: Create a Screenboard
type: apicontent
order: 11.1
---

## Create a Screenboard
##### Arguments
* `board_title` [*required*]:  
    The name of the dashboard.    
* `description` [*optional*, *default*=**None**]:  
    A description of the dashboard's content.
* `widgets` [*required*]:  
    [A list of widget definitions](/graphing/dashboards/widgets/).
* `template_variables` [*optional*, *default*=**None**]:  
    A list of template variables for using Dashboard templating.
* `width` [*optional*, *default*=**None**]:  
    Screenboard width in pixels
* `height` [*optional*, *default*=**None**]:  
    Height in pixels.
* `read_only` [*optional*, *default*=**False**]:  
    The read-only status of the screenboard.