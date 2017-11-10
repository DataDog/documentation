---
title: Create A Comment
type: apicontent
order: 15.1
---

## Create A Comment
Comments are essentially special forms of events that appear in the stream. They can start a new discussion thread or optionally, reply in another thread.

##### ARGUMENTS
* `message` *[required]*:  
    The comment text.

* `handle` *[optional]*:  
    Default: `application key owner`  
    The handle of the user making the comment.

* `related_event_id` *[optional]*:  
    Default: `None`  
    The id of another comment or event to reply to


