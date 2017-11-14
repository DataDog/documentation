---
title: Update User
type: apicontent
order: 16.4
---

## Update User
Can only be used with application keys belonging to administrators.

##### ARGUMENTS
* `handle` [*required*]:  
    The handle of the user.
* `name` [*optional*, *default*=**None**]:  
    The new name of the user.
* `email` [*optional*, *default*=**None**]:  
    The new email of the user.
* `disabled` [*optional*, *default*=**None**]:  
    The new disabled status of the user.
* `access_role` [*optional*, *default*=**st**]:  
    The access role of the user. Choose from:
    *  **st** (standard user), 
    *  **adm** (admin user),
    *  **ro** (read-only user).  