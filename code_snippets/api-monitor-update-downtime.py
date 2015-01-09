import time
from dogapi import dog_http_api as api

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

# Update downtime
api.update_downtime(4336, 'env:staging', end=int(time.time()) + 60000, message="Doing some testing on staging.")
