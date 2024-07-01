---
"categories":
- aws
- cloud
- data stores
- log collection
- network
- security
"custom_kind": "integration"
"dependencies": []
"description": "Ingest Amazon Security Lake logs."
"doc_link": ""
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/aws-reinvent-2022-recap/"
  "tag": Blog
  "text": "Highlights from AWS re:Invent 2022"
"git_integration_title": "amazon_security_lake"
"has_logo": true
"integration_id": "amazon-security-lake"
"integration_title": "Amazon Security Lake"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_security_lake"
"public_title": "Datadog-Amazon Security Lake Integration"
"short_description": "Ingest Amazon Security Lake logs."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Security Lake is a security data lake for aggregating and managing security log and event data.

This integration ingests security logs stored in Amazon Security Lake into Datadog for further investigation and real-time threat detection. To learn more about Amazon Security Lake, visit the [Amazon Security Lake user guide][1] in AWS.

## Setup

### Prerequisites

1. Amazon Security Lake must be configured for your AWS account or AWS organization. See the [Amazon Security Lake user guide][1] for more details.
2. You must have a Datadog account that is using both [Datadog Log Management][2] and [Datadog Cloud SIEM][3].
3. If you haven't already, set up the [Amazon Web Services integration][4] for the AWS account where Amazon Security Lake is storing data.

**Note:** If you only want to integrate this AWS Account to use the Amazon Security Lake integration, you can disable metric collection in the [AWS integration page][5] so that Datadog doesn't monitor your AWS infrastructure and you are not billed for [Infrastructure Monitoring][6].

### Log collection
1. Add the following IAM policy to your existing `DatadogIntegrationRole` IAM role so that Datadog can ingest new log files added to your security lake.
{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DatadogSecurityLakeAccess",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::aws-security-data-lake-*"
      }
  ]
}
{{< /code-block >}}

2. In the AWS console for Amazon Security Lake, create a subscriber for Datadog and fill in the form. For more information on an Amazon Security Lake subscriber, read the [Amazon Security Lake user guide][1].
   - Enter `Datadog` for Subscriber name.
   - Select `All log and event sources` or `Specific log and event sources` to send to Datadog.
   - Select `S3` as the Data access method.

{{< site-region region="us,us3,us5,eu,gov" >}}
3. In the same form, fill in the Subscriber Credentials.
   - For **Account ID**, enter `464622532012`.
   - For **External ID**, open a new tab and go to the [AWS Integration page][7] in Datadog for your AWS Account. The **AWS External ID** is on the **Account Details** tab. Copy and paste it into the form on AWS.
   - For **Subscriber role**, enter `DatadogSecurityLakeRole`. **Note:** This role will not actually be used by Datadog since the `DatadogIntegrationRole` will have the permissions needed from step 1.
   - For **API destination role**, enter `DatadogSecurityLakeAPIDestinationRole`.
   - For **Subscription endpoint**, this value depends on the [Datadog site][8] you are using: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Note:** If the endpoint above doesn't reflect your region, toggle the **Datadog site** dropdown menu to the right of this documentation page to switch regions.
   - For **HTTPS key name**, enter `DD-API-KEY`.
   - For **HTTPS key value**, open a new tab and go to the [API Keys page][9] in Datadog to find or create a Datadog API key. Copy and paste it into the form on AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="ap1" >}}
3. In the same form, fill in the Subscriber Credentials.
   - For **Account ID**, enter `417141415827`.
   - For **External ID**, open a new tab and go to the [AWS Integration page][7] in Datadog for your AWS Account. The **AWS External ID** is on the **Account Details** tab. Copy and paste it into the form on AWS.
   - For **Subscriber role**, enter `DatadogSecurityLakeRole`. **Note:** This role will not actually be used by Datadog since the `DatadogIntegrationRole` will have the permissions needed from step 1.
   - For **API destination role**, enter `DatadogSecurityLakeAPIDestinationRole`.
   - For **Subscription endpoint**, this value depends on the [Datadog site][8] you are using: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Note:** If the endpoint above doesn't reflect your region, toggle the **Datadog site** dropdown menu to the right of this documentation page to switch regions.
   - For **HTTPS key name**, enter `DD-API-KEY`.
   - For **HTTPS key value**, open a new tab and go to the [API Keys page][9] in Datadog to find or create a Datadog API key. Copy and paste it into the form on AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

4. Click **Create** to complete the subscriber creation.
5. Wait several minutes, then start exploring your logs from Amazon Security Lake in [Datadog's log explorer][7].

To learn more about how you can use this integration for real-time threat detection, check out the [blog][8].

## Data Collected

### Metrics

The Amazon Security Lake integration does not include any metrics.

### Events

The Amazon Security Lake integration does not include any events.

### Service Checks

The Amazon Security Lake integration does not include any service checks.

## Troubleshooting

### Permissions

Review the [troubleshooting guide][9] to make sure your AWS account has correctly set up the IAM role for Datadog.

### Creating subscribers

Review the [Amazon Security Lake user guide][1] on creating a subscriber for troubleshooting guidance.

Need additional help? Contact [Datadog support][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/security-lake/latest/userguide/
[2]: https://www.datadoghq.com/product/log-management/
[3]: https://www.datadoghq.com/product/cloud-security-management/cloud-siem/
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/
[5]: https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline
[8]: https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog
[9]: https://docs.datadoghq.com/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[10]: https://docs.datadoghq.com/help/

