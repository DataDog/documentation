## Comments
Comments are how discussion happens on Datadog. You can create, edit, delete and reply to comments.

## Create A Comment
Comments are essentially special forms of events that appear in the stream. They can start a new discussion thread or optionally, reply in another thread.

ARGUMENTS

message [required]
The comment text.
handle [optional, default=application key owner]
The handle of the user making the comment.
related_event_id [optional, default=None]
The id of another comment or event to reply to

## Edit A Comment
ARGUMENTS

message [optional, default=original message]
The comment text.
handle [optional, default=application key owner]
The handle of the user making the comment.

## Delete A Comment
ARGUMENTS

This end point takes no JSON arguments.'