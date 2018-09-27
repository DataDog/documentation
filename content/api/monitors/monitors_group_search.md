---
title: Monitors group search
type: apicontent
order: 16.12
external_redirect: /api/#monitor-group-search
---

## Monitor group search

Search and filter your monitor groups via the API.

##### ARGUMENTS

* **`query`** [*optional*]: 
    
    Search query as you would enter it in the manage monitor page. [Consult the dedicated documentation to learn more][1]

* **`page`** [*optional*, *default* = **0**]: 
    
    Page to start paginating from.

* **`per_page`** [*optional*, *default*=**30**]:

    Number of monitors to return per page.

* **`sort`** [*optional*, *default*=**null**]:

    Comma separated string for sort order (e.g. `name,asc`) supported fields: 

        * `name`
        * `status`
        * `tags`

[1]: /monitors/manage_monitor/#find-the-monitors