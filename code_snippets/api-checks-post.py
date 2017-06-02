from datadog import initialize, api
from datadog.api.constants import CheckStatus

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

check = 'app.ok'
host = 'app1'
status = CheckStatus.OK # equals 0

api.ServiceCheck.check(check=check, host_name=host, status=status, message='Response: 200 OK')
