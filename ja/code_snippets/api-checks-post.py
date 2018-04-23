from datadog import initialize, api
from datadog.api.constants import CheckStatus

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

check = 'app.ok'
host = 'app1'
status = CheckStatus.OK # equals 0

api.ServiceCheck.check(check=check, host_name=host, status=status, message='Response: 200 OK')
