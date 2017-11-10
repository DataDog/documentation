---
title: Post A Check Run
type: apicontent
order: 7.1
---

## Post A Check Run

##### ARGUMENTS

* `check` *[required]*:  
    The text for the message

* `host_name`*[required]*:  
    The name of the host submitting the check

* `status` *[optional]*:   
    Default: `None`  
    An integer for the status of the check:
    * 0 : OK
    * 1 : Warning
    * 2 : CRITICAL
    * 3 : UNKNOWN
  

* `timestamp` *[optional]*:  
    Default: `None`  
    POSIX timestamp of the event.

* `message`*[optional]*:  
    Default: `None`  
    A description of why this status occurred  

* `tags` *[optional]*:  
    A list of key:val tags for this check