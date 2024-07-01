---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon EC2 Spot metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_ec2_spot/"
"draft": false
"git_integration_title": "amazon_ec2_spot"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon EC2 Spot"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_ec2_spot"
"public_title": "Datadog-Amazon EC2 Spot Integration"
"short_description": "Track key Amazon EC2 Spot metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon EC2 Spot Instances let you take advantage of unused EC2 capacity in the AWS cloud.

Enable this integration to see all your EC2 Spot [Fleet metrics][1] in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `EC2 Spot` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon EC2 Spot integration][4].

### Log collection

Use the [Datadog Agent][5] or another log shipper like [Rsyslog][6] to send your logs to Datadog.

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### Events

The Amazon EC2 Spot integration does not include any events.

### Service Checks

The Amazon EC2 Spot integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-ec2-spot
[5]: https://docs.datadoghq.com/agent/logs/
[6]: https://docs.datadoghq.com/integrations/rsyslog/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[8]: https://docs.datadoghq.com/help/

