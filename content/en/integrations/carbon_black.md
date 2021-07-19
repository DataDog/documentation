---
categories:
- log collection
- Security
ddtype: crawler
description: Collect your Carbon Black Defense Logs
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md"]
has_logo: true
integration_title: Carbon Black
is_public: true
kind: integration
name: carbon_black
public_title: Datadog-Carbon Black Integration
short_description: Collect your Carbon Black Defense Logs
version: '1.0'
integration_id: "carbonblack"
---

## Overview

Use the Datadog-Carbon Black integration to forward your Carbon Black EDR events and alerts as Datadog logs.


## Setup

### Installation

Datadog uses Carbon Black's event forwarder and Datadog's Lambda forwarder to collect Carbon Black events and alerts from your S3 bucket.

Carbon Black provides a Postman collection for the API that you use to create the Carbon Black event forwarder.

#### Configuration

- [Install Datadog's Lambda function][1]
- [Create a bucket in your AWS Management Console][2] to forward events to. 
- [Configure the S3 Bucket to allow the Carbon Black forwarder to write data][3]
- [Create an access level in the Carbon Black Cloud console][4]
- [Create an API key in the Carbon Black Cloud console][5]
- [Configure the API in Postman][6]
  - Update the current value of the following Postman enviroment variables `cb_url`, `cb_org_key`, `cb_custom_id`, `cb_custom_key` with the key created above 
- [Create a Carbon Black event forwarder][7]
  - Create two forwarders with different names for Carbon Black alerts(`"type": "alert"`) and endpoint events(`"type": "endpoint.event"`)
- [Setup the Datadog Lambda to trigger on the S3 bucket][8]


## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
[2]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-a-bucket
[3]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-bucket-to-write-events
[4]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-access-level
[5]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-api-key
[6]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-api-in-postman
[7]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-forwarder
[8]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
