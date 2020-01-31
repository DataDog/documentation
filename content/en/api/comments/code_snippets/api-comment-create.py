from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Start a new discussion.
# Include a handle like this
api.Comment.create(
    handle='matt@example.com',
    message='Should we use COBOL or Fortran!'
)

# Or set it to None
# and the handle defaults
# to the owner of the application key
api.Comment.create(message='Should we use COBOL or Fortran?')

# Reply to a discussion.
api.Comment.create(
    handle='joe@example.com',
    message='Smalltalk?',
    related_event_id=1234
)
