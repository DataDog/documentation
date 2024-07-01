---
"app_id": "google-eventarc"
"app_uuid": "a10c14f9-f630-439f-a181-c49a1ac79dc5"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "346"
    "source_type_name": Google Eventarc
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- google cloud
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_eventarc"
"integration_id": "google-eventarc"
"integration_title": "Google Eventarc"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_eventarc"
"public_title": "Google Eventarc"
"short_description": "Eventarc lets you import events from Google services, SaaS, and your own apps."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  "configuration": "README.md#Setup"
  "description": Eventarc lets you import events from Google services, SaaS, and your own apps.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/incident-response-eventarc-datadog/"
  "support": "README.md#Support"
  "title": Google Eventarc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Send your Datadog events to [Eventarc][1] for delivery to Google services, enabling you to initiate Eventarc-driven workflows with Datadog monitor notifications.

## Setup

1. Ensure that the main [GCP integration][2] is installed for each GCP Project that receives notifications.

2. [Create an Eventarc channel][3] in the Google Cloud Console.

3. Within the Datadog application, set your channel name and activation token in a monitor's [notification section][4] using the syntax as shown in the example below:

{{< img src="integrations/google_eventarc/eventarc_channel_notification.png" alt="The say what's happening section of a Datadog monitor configuration page with the title HDD Disk Size Above Capacity and a line in the notification body which sends the an eventarc channel with the following example: The alert notification will be sent to @eventarc-datadog-sandbox_us-central1_my-channel that will trigger Cloud Function: Bump Quota." >}}

### Validation

Once the integration is activated, the channel goes from **Pending** to **Active** in the Google Cloud Console.

### Automated actions

Set up new outbound notification channels for monitors to initiate automated actions with the GCP Eventarc integration. With automated actions, you can configure your GCP resources to:

  - Use Datadog monitors to kick off Eventarc workflows
  - Within Google, link Cloud Functions, BigQuery, etc. to Datadog monitors
  - Use the information within the alert event to execute auto-remediation pipelines and runbooks, run analytics queries, and more

The full list of resources you can target is available in the [GCP documentation][5].

## Data Collected

### Metrics

The Google Eventarc integration does not include any metrics.

### Events

The Google Eventarc integration does not include any events.

### Service Checks

The Google Eventarc integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further reading

Additional helpful documentation, links, and articles:

- [Automate incident response workflows with Eventarc and Datadog][7]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/monitors/notify/
[5]: https://cloud.google.com/eventarc/docs/targets
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/

