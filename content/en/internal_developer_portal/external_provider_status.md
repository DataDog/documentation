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

The [External Provider Status page][1] provides real-time visibility into the operational status of major external dependencies. This centralized dashboard helps you stay ahead of performance degradation on third-party providers such as payment gateways, cloud services, and APIs, enabling faster incident response and reduced mean time to detection (MTTD).

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_page.png" alt="External Provider Status page showing operational status of third-party dependencies" >}}


## Key capabilities
External Provider Status monitors third-party service performance by analyzing actual service impact rather than relying on status page updates. This approach detects issues through telemetry data from your applications, providing earlier and more accurate detection of external provider problems.

- **Real-time status**: Live monitoring of external provider operational health in one unique place
- **Service dependencies**: Maps external providers to your internal services (requires APM)
- **Historical data**: 90-day performance trends and incident history
- **Alerting**: Configurable notifications for external provider degradations

## Setting up notifications

To receive notifications for external provider degradations:

1. Click on the `Notify Me` button at the top right corner of the page. 
2. Define the notification conditions
    - Select the providers to be alerted on
    - Decide if you want to be alerted for any degradation from the selected providers, or only if their performance degradation impacts your services.
3. Configure your notification preferences
4. Name the notification rule

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_notifications.png" alt="Setting up notifications for external provider status changes" >}}

## Supported providers

External Provider Status monitors the following third-party providers:


| External Provider | API monitored |  
|----------|--------------------|
| Amplitude | api.amplitude.com |
| Atlassian | *.atlassian.net |
| Auth0 | *.auth0.com |
| Binance | api.binance.com     |
| Braintree | api.braintreegateway.com |
| Coreweave | *.coreweave.com |
| Cloudflare | api.cloudflare.com |
| Confluent | api.confluent.cloud & api.telemetry.confluent.cloud |
| Databricks | *.cloud.databricks.com |
| Envoy | api.envoy.com |
| Facebook | graph.facebook.com |
| GitHub | api.github.com |
| Hubspot | api.hubspot.com |
| Intercom | api.intercom.io |
| Mapbox | api.mapbox.com |
| Mixpanel | api.mixpanel.com |
| OpenAI | *.openai.com|
| PagerDuty | api.pagerduty.com |
| Palo Alto Networks | api.urlcloud.paloaltonetworks.com |
| Render | api.render.com |
| SendGrid | *.sendgrid.com |
| ServiceNow | *.service-now.com |
| Slack | *.slack.com |
| Snowflake | *.snowflakecomputing.com |
| SoundCloud | api.soundcloud.com |
| Splunk | *.splunkcloud.com |
| Square | connect.squareup.com |
| Stripe | api.stripe.com |
| Towerdata | api.towerdata.com |
| Twilio | api.twilio.com |
| Twitter | api.twitter.com |
| Zendesk | *.zendesk.com |
| Zoom    | api.zoom.us |

The following AWS services are monitored (.*amazonaws.com):
- CloudWatch
- DynamoDB
- ELB
- ES
- Firehose
- Kinesis
- KMS
- Lambda
- RDS
- S3
- SNS
- SQS
- STS

in the following regions:
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


