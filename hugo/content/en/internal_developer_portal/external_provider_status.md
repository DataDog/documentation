---
title: External Provider Status
site_support_id: idp
description: Monitor real-time operational status of third-party services such as payment gateways, cloud platforms, and APIs to detect provider disruptions early.
further_reading:
- link: "https://www.datadoghq.com/blog/watchdog-outage-detection/"
  tag: "Blog"
  text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_cloud_saas_api_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Cloud & SaaS API Detection"
- link: "integrations/statuspage/"
  tag: "Documentation"
  text: "Statuspage integration"
- link: "https://updog.ai"
  tag: "External Site"
  text: "Updog.ai: Real-time status of popular SaaS providers"
---

## Overview

The [External Provider Status page][1] provides real-time visibility into the operational status of third-party services such as payment gateways, cloud platforms, and APIs. Use this page to identify performance issues early, reduce mean time to detection (MTTD), and minimize the impact of provider disruptions.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_page.png" alt="External Provider Status page with a tile for each provider showing its status, performance graph, and calling services." >}}

## Key capabilities
External Provider Status detects provider degradations from live telemetry instead of waiting for providers to update their status pages. It analyzes requests that Datadog customers' applications send to each provider, which surfaces problems earlier and more accurately. Incidents that providers report on their own status pages appear alongside these detections, so you can compare both views in one place.

External Provider Status shows:

- **Real-time status**: Monitor external provider health in a single view.
- **Error and latency degradations**: Detect abnormal error rates and abnormal latency in provider APIs.
- **Impacted endpoints**: See which provider API endpoints are affected by a degradation.
- **Provider-reported incidents**: View incidents that providers declare on their public status pages.
- **Custom providers**: Track any provider that publishes an Atlassian Statuspage.
- **Service dependencies**: Map external providers to internal services (requires APM).
- **Historical data**: View 90-day performance trends and incident history.
- **Alerting**: Receive notifications when provider degradations occur.

## Provider status

Each provider tile shows a status badge:

| Badge | Meaning |
|-------|---------|
| {{< ui >}}OPERATIONAL{{< /ui >}} | Datadog does not detect a degradation, and the provider does not report an ongoing incident. |
| {{< ui >}}DEGRADED{{< /ui >}} | Datadog detects a degradation from live traffic to the provider. |
| {{< ui >}}REPORTED INCIDENTS{{< /ui >}} | The provider reports an ongoing incident on its status page. |

The tile also shows when the provider last degraded, a graph of recent performance, and the services in your organization that call the provider (requires APM). Use the {{< ui >}}Team{{< /ui >}} filter to show only providers used by a team's services.

Click a tile to open the provider details. The details panel includes a link to the provider's status page, the services that depend on the provider, the 90-day history, and the list of degradations and reported incidents.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_degradations.png" alt="Provider details panel with a 90-day history bar and a degradation that has a nested reported incident." >}}

## Understanding degradations

A degradation is an abnormal change in the behavior of a provider's API, detected from live traffic across Datadog customers calling the provider. Each degradation in the {{< ui >}}Degradations & Reported Incidents{{< /ui >}} list shows:

- **Degradation type**:
  - {{< ui >}}High Error Rate{{< /ui >}}: The provider's API returns an abnormal rate of errors.
  - {{< ui >}}High Latency{{< /ui >}}: The provider's API responds abnormally slowly.
  - {{< ui >}}High Error Rate & Latency{{< /ui >}}: The provider's API shows abnormal errors and abnormal latency at the same time.
- **Impacted endpoints**: When Datadog can identify the affected API endpoints, the degradation shows the number of impacted endpoints, such as {{< ui >}}12 Impacted Endpoints{{< /ui >}}. Click it to see the full list of endpoints.
- **Region**: The affected provider region, when applicable, such as `us1`.
- **Duration and time range**: How long the degradation lasted, and when it started and ended.
- **Status**: Whether the degradation is {{< ui >}}Ongoing{{< /ui >}} or {{< ui >}}Resolved{{< /ui >}}.

## Provider-reported incidents

External Provider Status also displays incidents that providers declare on their public status pages. All out-of-the-box providers include reported incidents.

The {{< ui >}}Degradations & Reported Incidents{{< /ui >}} list contains two types of events:

- **Degradations**: Detected by Datadog from live traffic. These events show the {{< ui >}}DEGRADED{{< /ui >}} label.
- **Reported incidents**: Declared by the provider on its status page. These events include the incident title and a link to the incident on the provider's status page.

When a reported incident overlaps in time with a degradation that Datadog detects, the reported incident appears nested under that degradation.

Use the {{< ui >}}Type{{< /ui >}} filter to show all events, only degradations, or only reported incidents. In the 90-day history bar, days with a reported incident and no detected degradation appear as {{< ui >}}Operational + Reported Incident{{< /ui >}}.

## Add a custom provider

To monitor a provider that External Provider Status does not support out of the box, add it as a custom provider using its public Atlassian Statuspage.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_custom_provider.png" alt="Add a Custom Provider modal with fields for the Atlassian Statuspage URL and display name." >}}

1. On the [External Provider Status page][1], click {{< ui >}}Add Custom Provider{{< /ui >}} in the upper right corner.
2. In {{< ui >}}Atlassian Statuspage URL{{< /ui >}}, enter the URL of the provider's public status page, such as `https://status.example.com`.
3. In {{< ui >}}Display Name{{< /ui >}}, enter the name to display for the provider.
4. Click {{< ui >}}Create Custom Provider{{< /ui >}}. The new provider tile appears in the list.

Adding a custom provider requires the `manage_integrations` permission. External Provider Status uses the [Statuspage integration][2] to connect custom providers, and updates the integration settings when you add one.

Custom providers support public Atlassian Statuspage pages only. A custom provider tile shows the current status, the 90-day history, and the incidents reported on the provider's status page. Datadog does not detect degradations from live traffic for custom providers.

## Configure notifications

To receive notifications for external provider degradations:

1. Click {{< ui >}}Notify Me{{< /ui >}} in the upper right corner.
2. Under {{< ui >}}Set scope{{< /ui >}}, choose the provider to monitor, or keep {{< ui >}}Any Provider{{< /ui >}}. To receive notifications only when the degradation affects your services, select {{< ui >}}Notify only if provider has an impact on services{{< /ui >}}.
3. Under {{< ui >}}Choose Recipients{{< /ui >}}, select who receives the notifications.
4. Under {{< ui >}}Name notification rule{{< /ui >}}, name the rule.
5. Click {{< ui >}}Create{{< /ui >}}.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_notifications.png" alt="Create New Notification Rule modal with Set scope, Choose Recipients, and Name notification rule steps." >}}

Notification rules trigger on degradations that Datadog detects. You cannot scope a rule to a specific degradation type, to reported incidents, or to custom providers.

To view and edit your existing rules, click {{< ui >}}Manage Notifications{{< /ui >}} in the upper right corner. The button shows the number of existing rules.

## Supported providers

External Provider Status monitors the following third-party providers. If your provider is not listed and has a public Atlassian Statuspage, try [adding it as a custom provider](#add-a-custom-provider).


| External Provider | API monitored |  
|----------|--------------------| 
| Adyen | `*.adyenpayments.com` |
| Amplitude | `api.amplitude.com` |
| Anthropic | `api.anthropic.com` |
| Atlassian | `*.atlassian.net`, `*.atlassian.com` |
| Auth0 | `*.auth0.com` |
| Azure DevOps | `dev.azure.com` |
| Braintree | `api.braintreegateway.com` |
| Cloudflare | `*.cloudflare.com` |
| Databricks | `*.cloud.databricks.com` |
| Datadog (US1) | `api.datadoghq.com` |
| Facebook | `graph.facebook.com` |
| GitHub | `api.github.com` |
| GitLab | `*.gitlab.com` |
| Google Gemini | `generativelanguage.googleapis.com` |
| Google Maps | `maps.googleapis.com` |
| HubSpot | `api.hubspot.com`, `api.hubapi.com` |
| Intercom | `api.intercom.io` |
| LaunchDarkly | `app.launchdarkly.com` |
| Mapbox | `api.mapbox.com` |
| Mixpanel | `api.mixpanel.com` |
| Okta | `*.okta.com` |
| OpenAI | `*.openai.com` |
| PagerDuty | `api.pagerduty.com` |
| PayPal | `*.paypal.com` |
| Salesforce | `*.salesforce.com` |
| SendGrid | `*.sendgrid.com` |
| ServiceNow | `*.service-now.com` |
| Slack | `*.slack.com` |
| Snowflake | `*.snowflakecomputing.com` |
| Splunk | `*.splunkcloud.com` |
| Square | `connect.squareup.com` |
| Stripe | `api.stripe.com` |
| Twilio | `api.twilio.com` |
| X | `api.twitter.com` |
| Zendesk | `*.zendesk.com` |
| Zoom | `api.zoom.us` |

### AWS services

External Provider Status monitors the following AWS services through endpoints matching `*.amazonaws.com`:
- CloudWatch
- DynamoDB
- ELB
- ES
- Firehose
- Kinesis
- KMS
- Lambda
- S3
- SNS
- SQS
- STS

These services are monitored in the following regions:
| AMER          | EMEA         | APAC           |
| --------------| -------------|----------------|
| us-east-2     | af-south-1   | ap-east-1      |
| us-east-1     | eu-central-1 | ap-south-2     | 
| us-west-1     | eu-west-1    | ap-southeast-3 | 
| us-west-2     | eu-west-2    | ap-southeast-4 |
| ca-central-1  | eu-south-1   | ap-south-1     |
| ca-west-1     | eu-west-3    | ap-northeast-3 |
| us-gov-east-1 | eu-south-2   | ap-northeast-2 |
| us-gov-west-1 | eu-north-1   | ap-southeast-1 |
| sa-east-1     | eu-central-2 | ap-southeast-2 |
|               | me-south-1   | ap-northeast-1 | 
|               | me-central-1 |                |
|               | il-central-1 |                |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/watchdog/external-provider-status
[2]: /integrations/statuspage/


