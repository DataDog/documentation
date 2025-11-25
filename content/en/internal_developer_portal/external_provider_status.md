---
title: External Provider Status
further_reading:
- link: "https://www.datadoghq.com/blog/watchdog-outage-detection/"
  tag: "Blog"
  text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_cloud_saas_api_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Cloud & SaaS API Detection"
---

## Overview

The [External Provider Status page][1] provides real-time visibility into the operational status of third-party services such as payment gateways, cloud platforms, and APIs. Use this page to identify performance issues early, reduce mean time to detection (MTTD), and minimize the impact of provider disruptions.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_page.png" alt="External Provider Status page showing operational status of third-party dependencies" >}}


## Key capabilities
External Provider Status evaluates third-party service performance by monitoring service impact rather than relying on status page updates. It uses telemetry data from your applications for earlier and more accurate detection of external provider problems.

External Provider Status shows:

- **Real-time status**: Monitor external provider health in a single view.
- **Service dependencies**: Map external providers to internal services (requires APM).
- **Historical data**: View 90-day performance trends and incident history.
- **Alerting**: Receive notifications when provider degradations occur. 

## Configure notifications

To receive notifications for external provider degradations:

1. Click `Notify Me` in the upper right corner.
2. Define the notification conditions:
   - Choose which provider(s) to monitor. 
   - Choose when to be alerted for the selected provider(s):
     - Alert on any degradation.
     - Alert only when degradation impacts your services.
3. Set your notification preferences.
4. Name the notification rule.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_notifications.png" alt="Notification configuration modal for External Provider Status alerts" >}}

## Supported providers

External Provider Status monitors the following third-party providers:


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
| Facebook | `graph.facebook.com` |
| GitHub | `api.github.com` |
| GitLab | `*.gitlab.com` |
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


