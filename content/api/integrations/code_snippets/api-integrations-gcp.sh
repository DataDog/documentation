#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>


# List GCP Accounts (service accounts only) in Datadog
curl -X GET "https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"


# Create a GCP Service Account in Datadog
# all fields are provided by the json file created in the GCP Console for service accounts
# host_filters field is optional
curl -X POST -H "Content-type: application/json" \
-d '{
        "type": "service_account",
        "project_id": "test-def",
        "private_key_id": "12341234",
        "private_key": "-----BEGIN PRIVATE KEY-----\abcdefg\n-----END PRIVATE KEY-----\n",
        "client_email": "datadogintegration@test-def.iam.gserviceaccount.com",
        "client_id": "56789",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/datadogintegration%40test-def.iam.gserviceaccount.com",
        "host_filters": "account:prod,region:test"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"

# Update a GCP Service Account's host filters in Datadog
# project_id and client_email are required
curl -X POST -H "Content-type: application/json" \
-d '{
        "project_id": "test-def",
        "client_email": "datadogintegration@test-def.iam.gserviceaccount.com",
        "host_filters": "account:prod,region:test"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp/host_filters?api_key=${api_key}&application_key=${app_key}"

# Delete a GCP Service Account in Datadog
# project_id and client_email are required
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "project_id": "test-def",
        "client_email": "datadogintegration@test-def.iam.gserviceaccount.com"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"