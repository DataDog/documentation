---
title: Create a comment
type: apicontent
order: 7.1
external_redirect: /api/#create-a-comment
---

## Create A Comment
Comments are essentially special forms of events that appear in the [event stream][1]. They can start a new discussion thread or optionally, reply in another thread.

**ARGUMENTS**:

* **`message`** [*required*]:
    The comment text.

* **`handle`** [*optional*, *default* = **application key owner**]:
    The handle of the user making the comment.

* **`related_event_id`** [*optional*, *default* = **None**]:
    The id of another comment or event to reply to.

[1]: /graphing/event_stream
