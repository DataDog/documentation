from datadog import initialize, api
from datadog.api.constants import CheckStatus

options = {'api_key': '<DATADOG_API_KEY>',
           'app_key': '<DATADOG_APPLICATION_KEY>'}

initialize(**options)

check = 'app.ok'
host = 'app1'
status = CheckStatus.OK  # equals 0
tags = ['env:test']

api.ServiceCheck.check(check=check, host_name=host, status=status, message='Response: 200 OK', tags=tags)
