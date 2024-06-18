---
title: Enabling Cloud Security Management on Cloud Accounts
aliases:
  - /security/cloud_security_management/setup/csm_enterprise/cloud_accounts
  - /security/cloud_security_management/setup/csm_pro/cloud_accounts
---

Use the following instructions to enable [resource scanning](#enable-resource-scanning) for Misconfigurations and [CloudTrail logs forwarding](#set-up-cloudtrail-logs-forwarding) for Identity Risks (CIEM).

## Enable resource scanning

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

## Set up CloudTrail logs forwarding

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][18].

### Enable AWS CloudTrail logging

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket.

1. Click **Create trail** on the [CloudTrail dashboard][19].
2. Enter a name for your trail.
3. Create an S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create an AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. 
6. Click **Next**.
7. Review and click **Create trail**.

### Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][20] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][21].

[1]: /security/threats
[2]: /security/cloud_security_management/misconfigurations/
[3]: /security/cloud_security_management/identity_risks
[4]: /security/cloud_security_management/vulnerabilities
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /agent/remote_config
[7]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[8]: /security/cloud_security_management/setup
[9]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[11]: https://www.cisa.gov/sbom
[12]: /security/cloud_security_management
[14]: /agent
[15]: /security/cloud_security_management/troubleshooting
[16]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[17]: /containers/kubernetes/installation/?tab=helm
[18]: /integrations/amazon_web_services/
[19]: https://console.aws.amazon.com/cloudtrail/home
[20]: https://console.aws.amazon.com/lambda/home
[21]: https://app.datadoghq.com/logs?query=service%3Acloudtrail