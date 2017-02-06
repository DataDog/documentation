#!/bin/bash

# Send the service.
curl -X PUT -H "Content-type: application/json" \
  -d "{
    \"service_name\": {
      \"app\": \"my-app\",
      \"app_type\": \"web\"
    }
  }" \
  http://localhost:7777/v0.3/services
