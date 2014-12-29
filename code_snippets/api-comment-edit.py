from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Edit a comment.
api.Comment.update(2603645287324504065, message='I think differently now.')
