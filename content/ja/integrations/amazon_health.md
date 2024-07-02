---
"categories":
- "aws"
- "cloud"
- "log collection"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "AWS のサービス健全性イベントをほぼリアルタイムに監視。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_health"
"draft": false
"git_integration_title": "amazon_health"
"has_logo": true
"integration_id": "amazon-health"
"integration_title": "AWS Health"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_health"
"public_title": "Datadog-AWS Health Integration"
"short_description": "Monitor AWS service health."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Health provides ongoing visibility into the state of your AWS resources, services, and accounts. Enable this integration to see AWS Health service events in Datadog:

{{< img src="integrations/amazon_health/awshealthevent.png" alt="AWS Health Event" popup="true">}}

**Note**: This integration only works for AWS customers with a Business or Enterprise support plan.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. Add the following permissions to your [Datadog IAM policy][2] in order to collect AWS Health data. For more information, see the [Health policies][3] on the AWS website.

    | AWS Permission                    | Description                                      |
    | --------------------------------- | ------------------------------------------------ |
    | `health:DescribeEvents`           | Used to list all health events                   |
    | `health:DescribeEventDetails`     | Gets detailed information on health events       |
    | `health:DescribeAffectedEntities` | Gets the affected AWS entities for health events |

2. Install the [Datadog - AWS Health integration][4].

## 収集データ

### メトリクス

The AWS Health integration does not include any metrics.

### イベント

The AWS Health integration includes events found in the AWS Personal Health Dashboard. Examples include open issues, scheduled maintenances, and account notifications.

### サービスチェック

The AWS Health integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/health/latest/ug/controlling-access.html
[4]: https://app.datadoghq.com/integrations/amazon-health
[5]: https://docs.datadoghq.com/help/

