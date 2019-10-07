---
title: Set GCP integration automute
type: apicontent
order: 17.4
external_redirect: /api/#set-gcp-integration-automute
---

## Set GCP integration automute

Enable or disable automute for a given Datadog-GCP integration.

**ARGUMENTS**:

* **`project_id`** [*required*]:

    Your Google Cloud project ID found in your JSON service account key.

* **`client_email`** [*required*]:

    Your email found in your JSON service account key.

* **`automute`** [*optional*, *default*=**false**]:

    Silence monitors for expected GCE instance shutdowns.
