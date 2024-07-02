---
"aliases":
- /integrations/azure_hdinsight
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure HDInsight metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_hd_insight/"
"draft": false
"git_integration_title": "azure_hd_insight"
"has_logo": true
"integration_id": "azure-hdinsight"
"integration_title": "Microsoft Azure HDInsight"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_hd_insight"
"public_title": "Datadog-Microsoft Azure HDInsight Integration"
"short_description": "Track key Azure HDInsight metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure HDInsight is a cloud service that makes it easy, fast, and cost-effective to process massive amounts of data.

Use the Datadog Azure integration to collect metrics from Azure HDInsight.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_hd_insight" >}}


### イベント

The Azure HDInsight integration does not include any events.

### サービスチェック

The Azure HDInsight integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/help/

