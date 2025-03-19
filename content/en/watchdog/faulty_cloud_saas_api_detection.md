---
title: Automatic Faulty Cloud & SaaS API Detection
further_reading:
- link: "https://www.datadoghq.com/blog/watchdog-outage-detection/"
  tag: "Blog"
  text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_deployment_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Service Deployment Detections"
---
{{< site-region region="us3,us5,eu,ap1,gov" >}}
<div class="alert alert-warning">Watchdog Faulty Service Deployment Detections are not available for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Automatic Faulty Cloud & SaaS API Detection detects third-party providers (payment gateways, cloud providers, and so on) having issues within minutes, reducing mean time to detection (MTTD). Watchdog uses APM telemetry to continuously monitor for elevated error rates in requests to external providers—such as AWS, OpenAI, Slack, Stripe, and more—to detect service degradation as soon as it occurs. This proactive detection gives you a head start in identifying and mitigating issues before they escalate, significantly reducing time spent on root cause analysis and improving response times.

When Watchdog identifies that an external provider you are using is faulty, it flags the services impacted by the problem and the extent of the disruption. This allows you to differentiate between external and internal issues. Datadog also provides direct links to the provider's status page and support channels, so you can reach out to them as needed.

{{< img src="watchdog/external_provider_outage.png" alt="Faulty SaaS API vendor detection" >}}

Whenever a faulty deployment is detected, Watchdog creates an event in the [Event Explorer][1]. You can set up a monitor to get automatically notified on such events:

1. Go to the [New Monitor][2] page.
2. Choose **Watchdog**.
3. Select `Third Party` in the alert category.


## Supported providers
Watchdog monitors the status of the following external providers' APIs: 

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
| Envoy | api.envoy.com |
| Facebook | graph.facebook.com |
| GitHub | api.github.com |
| Google | developers.google.com |
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

[1]: https://app.datadoghq.com/event/explorer
[2]: https://app.datadoghq.com/monitors/create
