---
categories:
  - cloud
  - azure
  - log collection
ddtype: crawler
dependencies: []
description: 受送信バイト数、ディスク操作数、CPU 使用率など、セット別メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_vm_scale_set/'
draft: false
git_integration_title: azure_vm_scale_set
has_logo: true
integration_id: azure-vm-scale-set
integration_title: Microsoft Azure VM Scale Set
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Datadog-Microsoft Azure VM Scale Set インテグレーション
short_description: 受送信バイト数、ディスク操作数、CPU 使用率など、セット別バイトを追跡。
version: '1.0'
---
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="Azure VM Scale Set ダッシュボード" popup="true">}}

## 概要

仮想マシンスケールセットは、同一の VM をセットでデプロイ、管理、オートスケーリングするために使用される Azure のコンピューティングリソースです。

Azure Virtual Machine Scale Set からメトリクスを取得すると、以下のことができます。

- Virtual Machine Scale Set のパフォーマンスを視覚化。
- Virtual Machine Scale Set のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

インテグレーションメトリクスは、[Microsoft Azure インテグレーション][1]に含まれています。Datadog Agent 経由でメトリクスを収集する場合は、[Agent のデプロイ方法][2]の手順に従ってください。

### ログの収集

特定の Windows イベントからログを収集するには、チャンネルを `conf.d/win32_event_log.d/conf.yaml` ファイルに手動で、または Datadog Agent Manager を使用して追加します。たとえば、以下のとおりです。

```yaml
logs:
  - type: windows_event
    channel_path: '<チャンネル_1>'
    source: '<チャンネル_1>'
    service: myservice
    sourcecategory: windowsevent
   - type: windows_event
    channel_path: '<チャンネル_2>'
    source: '<チャンネル_2>'
    service: myservice
    sourcecategory: windowsevent
```

詳細については、[Win 32 イベントログ][3]インテグレーションの情報を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### イベント

Azure Virtual Machine Scale Set インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Virtual Machine Scale Set インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/integrations/azure/#deploy-agents
[3]: https://docs.datadoghq.com/ja/integrations/win32_event_log/#log-collection
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/