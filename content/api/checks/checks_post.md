---
title: Post a check run
type: apicontent
order: 6.1
external_redirect: /api/#post-a-check-run
---

## Post a check run

##### ARGUMENTS

* **`check`** *[required]*:  
    The text for the message

* **`host_name`** *[required]*:  
    The name of the host submitting the check

* **`status`** *[optional]*:   
    An integer for the status of the check:
    * 0 : OK
    * 1 : Warning
    * 2 : CRITICAL
    * 3 : UNKNOWN
  

* **`timestamp`** *[optional]*:  
    POSIX timestamp of the event.

* **`message`** *[optional]*:  
    A description of why this status occurred  

* **`tags`** *[optional]*:  
    A list of key:val tags for this check

