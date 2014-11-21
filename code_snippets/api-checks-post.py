from dogapi import dog_http_api as api
from dogapi.constants import CheckStatus

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

check = 'app.ok'
host = 'app1'
status = CheckStatus.OK

api.service_check(check, host, status, message='Response: 200 OK')
