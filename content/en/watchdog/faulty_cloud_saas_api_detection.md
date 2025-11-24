---
title: Automatic Faulty Cloud & SaaS API Detection
description: "Detect third-party provider issues within minutes using Watchdog's monitoring of external APIs like AWS, Stripe, OpenAI, and other cloud services."
further_reading:
- link: "https://www.datadoghq.com/blog/watchdog-outage-detection/"
  tag: "Blog"
  text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_deployment_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Service Deployment Detections"
site_support_id: watchdog_faulty_service_deployment
---

## Overview

Automatic Faulty Cloud & SaaS API Detection detects third-party providers (payment gateways, cloud providers, and so on) having issues within minutes, reducing mean time to detection (MTTD). Watchdog uses APM telemetry to continuously monitor for elevated error rates in requests to external providers—such as AWS, OpenAI, Slack, Stripe, and more—to detect service degradation as soon as it occurs. This proactive detection gives you a head start in identifying and mitigating issues before they escalate, significantly reducing time spent on root cause analysis and improving response times.

When Watchdog identifies that an external provider you are using is faulty, it flags the services impacted by the problem and the extent of the disruption. This allows you to differentiate between external and internal issues. Datadog also provides direct links to the provider's status page and support channels, so you can reach out to them as needed.

{{< img src="watchdog/external_provider_outage.png" alt="Faulty SaaS API vendor detection" >}}

Whenever Watchdog detects a provider degradation, it creates an event in the [Event Explorer][1]. You can set up a monitor to get automatically notified on such events:

1. Go to the [New Monitor][2] page.
2. Choose **Watchdog**.
3. Select `Third Party` in the alert category.

## Supported providers
Watchdog monitors the status of the following external providers' APIs: 

| External Provider | API monitored |  
|----------|--------------------| 
| Adyen | `*.adyenpayments.com` |
| Amplitude | `api.amplitude.com` |
| Anthropic | `api.anthropic.com` |
| Atlassian | `*.atlassian.net`, `*.atlassian.com` |
| Auth0 | `*.auth0.com` |
| Azure DevOps | `dev.azure.com` |
| Braintree | `api.braintreegateway.com` |
| Cloudflare | `api.cloudflare.com` |
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

The following AWS services are monitored (.*amazonaws.com):
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

[1]: https://app.datadoghq.com/event/explorer
[2]: https://app.datadoghq.com/monitors/create
