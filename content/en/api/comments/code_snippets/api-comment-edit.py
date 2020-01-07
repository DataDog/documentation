from datadog import initialize, api
from time import sleep

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Edit a comment.
newcomment = api.Comment.create(
    message='Should we use COBOL or Fortran or Widgets?'
)

sleep(1)

api.Comment.update(
    newcomment['comment']['id'],
    message='I think differently now!'
)
