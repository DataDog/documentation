from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options))

# Start a new discussion.
# You can include a handle like this
api.Comment.create(handle='matt@example.com', message='Should we use COBOL or Fortran?')

# Or you can set it to None
# and the handle will default
# to the owner of the application key
api.Comment.create(message='Should we use COBOL or Fortran?')

# Reply to a discussion.
api.Comment.create(handle='joe@example.com', message='Smalltalk?', related_event_id=1234)
