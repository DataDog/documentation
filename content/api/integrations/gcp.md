---
title: Google Cloud Platform
type: apicontent
order: 14.2
external_redirect: /api/#google-cloud-platform
---

## Google Cloud Platform

Configure your Datadog-Google Cloud Platform integration directly through Datadog API. [Read more about Datadog-Google Cloud Platform integration][1]

##### ARGUMENTS

All following fields values are provided by the json file created in the [GCP Console for service accounts][2], [consult the Google Cloud service account documentation][3].

* `type` [*required*]: Should be `service_account`.

* `project_id` [*required*]: Your Google Cloud project ID.

* `private_key_id` [*required*]: Your private key ID found in your JSON service account key.

* `private_key` [*required*]: Your private key name found in your JSON service account key.

* `client_email` [*required*]: Your email found in your JSON service account key.

* `client_id` [*required*]: Your ID found in your JSON service account key.

* `auth_uri` [*required*]: Should be `https://accounts.google.com/o/oauth2/auth`.

* `token_uri` [*required*]: Should be `https://accounts.google.com/o/oauth2/token`.

* `auth_provider_x509_cert_url` [*required*]: Should be `https://www.googleapis.com/oauth2/v1/certs`.

* `client_x509_cert_url` [*required*]: Should be `https://www.googleapis.com/robot/v1/metadata/x509/<CLIENT_EMAIL>` where `<CLIENT_EMAIL>` is the email found in your JSON service account key.

* `host_filters` [*optional*]: Limit the GCE instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.

[1]: /integrations/google_cloud_platform/
[2]: https://console.cloud.google.com/iam-admin/serviceaccounts
[3]: https://cloud.google.com/iam/docs/creating-managing-service-account-keys