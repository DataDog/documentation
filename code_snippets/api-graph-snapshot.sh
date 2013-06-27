curl -G -H "Content-type: application/json" \
    -d "metric_query=system.load.1{*}" \
    -d "start=1346272158" \
    -d "end=1346274158" \
    -d "api_key=9775a026f1ca7d1c6c5af9d94d9595a4" \
    -d "application_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff" \
    'https://app.datadoghq.com/api/v1/graph/snapshot'