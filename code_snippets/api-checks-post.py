from datadog import initialize, api
from datadog.api.constants import CheckStatus

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

check = 'app.ok'
host = 'app1'
status = CheckStatus.OK

api.ServiceCheck.check(check=check, host_name=host, status=status, message='Response: 200 OK')
