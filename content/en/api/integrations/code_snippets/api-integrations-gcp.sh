#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>


# List GCP Accounts (service accounts only) in Datadog
curl -X GET "https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"


# Create a GCP Service Account in Datadog
curl -X POST -H "Content-type: application/json" \
-d '{
        "type": "service_account",
        "project_id": "<GCP_PROJECT_ID>",
        "private_key_id": "<PRIVATE_KEY_ID>",
        "private_key": "<PRIVATE_KEY>",
        "client_email": "<CLIENT_EMAIL>",
        "client_id": "<CLIENT_ID>",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<CLIENT_EMAIL>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"

# Update a GCP Service Account's host filters in Datadog
# project_id and client_email are required
curl -X POST -H "Content-type: application/json" \
-d '{
        "project_id": "<GCP_PROJECT_ID>",
        "client_email": "<CLIENT_EMAIL>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp/host_filters?api_key=${api_key}&application_key=${app_key}"

# Delete a GCP Service Account in Datadog
# project_id and client_email are required
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "project_id": "<GCP_PROJECT_ID>",
        "client_email": "<CLIENT_EMAIL>"
    }' \
"https://app.datadoghq.com/api/v1/integration/gcp?api_key=${api_key}&application_key=${app_key}"