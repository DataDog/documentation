---
aliases: []
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Arc metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_arc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: Blog
  text: Monitor your Azure Arc hybrid infrastructure with Datadog
git_integration_title: azure_arc
has_logo: true
integration_id: azure-arc
integration_title: Microsoft Azure Arc
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_arc
public_title: Datadog-Microsoft Azure Arc Integration
short_description: Track key Azure Arc metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Arc is a bridge that extends the Azure platform to help you build applications and services with the flexibility 
to run across data centers, at the edge, and in multi-cloud environments.

Use the Azure Arc integration to:

- Collect connectivity status, tags, and other details about Azure Arc Servers and Kubernetes Clusters
- For Arc-managed servers that are also monitored with the Datadog Agent, propagate Azure Arc tags to the host in Datadog and its associated metrics and logs
- For Arc-managed servers that are also monitored through the AWS or GCP integration, propagate Azure Arc tags to the host in Datadog and its associated cloud metrics and logs
- Get immediate insights and summaries of the above data in the out-of-the-box dashboard for Azure Arc

You can also use the Datadog extension to configure and deploy the Datadog Agent onto Arc servers. For details on this option, read the [Datadog VM extension][1] page.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][2] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_arc" >}}


### イベント

The Azure Arc integration does not include any events.

### サービスチェック

The Azure Arc integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/