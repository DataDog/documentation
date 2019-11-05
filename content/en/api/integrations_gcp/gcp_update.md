---
title: Update GCP integration
type: apicontent
order: 18.4
external_redirect: /api/#update-gcp-integration
---

## Update GCP integration

Update endpoint for GCP allowing you to enable or disable automute for a given Datadog-GCP integration, as well as modify host_filters.

**ARGUMENTS**:

* **`project_id`** [*required*]:

    Your Google Cloud project ID found in your JSON service account key.

* **`client_email`** [*required*]:

    Your email found in your JSON service account key.

* **`automute`** [*optional*, *default*=**false**]:

    Silence monitors for expected GCE instance shutdowns.

* **`host_filters`** [*optional*]:

    Limit the GCE instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.