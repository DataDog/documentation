---
categories:
- cloud
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Ingest AWS Security Hub events as log.
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: AWS Security Hub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_security_hub
public_title: Datadog-AWS Security Hub Integration
short_description: Ingest AWS Security Hub events as logs.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Security Hub provides you with a comprehensive view of your security state in AWS and helps you check your environment against security industry standards and best practices.

This integration enables you to see all your AWS Security Hub logs in Datadog.

**Note**: You can also send your Datadog security signals to Security Hub for orchestration of additional events in your AWS environment. Follow the instructions on the [securityhub-eventbridge-example][1] repository to set this up.

## セットアップ

Datadog uses Amazon EventBridge to forward Security Hub events as logs to Datadog.

1. Go to [Amazon EventBridge][2].
2. In the Create a new rule pane, click **Create rule**.
3. In the Name and description pane, type a name for your rule in the Name field and if you want, type a description for your rule in the Description field.
4. In the Define pattern pane, select **Event pattern**, and then select **Pre-defined pattern by service** to build an event pattern.
5. From the Service provider list, select **AWS**.
6. From the Service name list, select **SecurityHub**.
7. From the Event type list, select **All Events**.
8. In the Select event bus pane, select **AWS default event bus**.
9. In the Select targets pane, from the Target list, select **Lambda function**.
10. Select the [Datadog forwarder][3] to send logs to Datadog.
11. Click **Create**.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://github.com/DataDog/securityhub-eventbridge-example
[2]: https://aws.amazon.com/eventbridge/
[3]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/forwarder/
[4]: https://docs.datadoghq.com/ja/help/