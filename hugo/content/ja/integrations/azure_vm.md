---
app_id: azure-vm
app_uuid: 2bcae6e7-13df-45c2-8085-ae9fc5ba0b09
assets:
  dashboards:
    azure_vm: assets/dashboards/azure_vm.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.vm.percentage_cpu
      - azure.vm.processor_total_pct_user_time
      metadata_path: metadata.csv
      prefix: azure.vm
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 139
    source_type_name: Azure VM
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- configuration & deployment
- os & system
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_vm
integration_id: azure-vm
integration_title: Azure VM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_vm
public_title: Azure VM
short_description: Microsoft Azure VM は、Linux と Windows の仮想マシンを数分で作成できるサービスです
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::クラウド
  - Category::構成 & デプロイ
  - Category::OS とシステム
  - Offering::Integration
  configuration: README.md#Setup
  description: Microsoft Azure VM は、Linux と Windows の仮想マシンを数分で作成できるサービスです
  media:
  - caption: Azure VM 概要ダッシュボード
    image_url: images/1_azure_vm_overview_dashboard.png
    media_type: image
  - caption: Azure VM ヘルスモニターテンプレート
    image_url: images/2_azure_vm_health_monitor_template.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: ドキュメント
    url: https://docs.datadoghq.com/integrations/azure
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog
  - resource_type: blog
    url: https://www.datadoghq.com/blog/dash-2024-new-feature-roundup-infrastructure
  support: README.md#Support
  title: Azure VM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure 仮想マシンでは、オンデマンドでスケーリングできる仮想化環境を柔軟に実行できます。

Azure VM からメトリクスを取得すると、以下のことができます。

- VM のパフォーマンスを視覚化。
- VM のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

**ARM** でデプロイされた仮想マシンの場合は、診断をオンにし、収集する仮想マシンのメトリクスを選択する必要があります。手順については、[診断の有効化][2] を参照してください。

### モニターの自動ミュート

Datadog は、[Azure Resource Health API][3] を通じて利用可能な健全性ステータスに基づき、Azure VM のシャットダウンまたは停止に関連するモニターを（シャットダウンが手動でトリガーされたものでも Azure 自動スケーリングによるものでも）事前にミュートすることができます。予期される Azure VM のシャットダウンに対してモニターをミュートにすることで、不必要なアラートによるノイズを軽減できます。

**Show automatically muted hosts** を有効にして、[Manage Downtime][4] ページのリストに記載されている仮想マシンを自動ミュートします。自動ミュートが機能するためには、Azure インテグレーションがインストールされている必要があります。

Azure VM がシャットダウンまたは停止したモニターをミュートにするには、Azure インテグレーションタイルで **Azure automuting** チェックボックスをオンにします。

自動ミュートされるメトリクスモニターを作成するには、必ず `host` タグに基づいてトリガーします。モニターグループで `host` タグを含まないメトリクスモニターは、自動ミュートされません。

{{< img src="integrations/azure_vm/azure_vm_automute2.png" alt="host タグを含むクエリにアラートを発生するモニター" >}}

**注:** Datadog Agent を実行している場合、Azure VM の `host` タグは GUID です。目で見てわかりやすい名前も含めるには、通知の返信にメッセージのテンプレート変数 `{{host.name_tag}}` を使用します。

## 収集データ

<div class="alert alert-danger"><code>azure.vm.status</code> メトリクスは非推奨となり、新しく作成された Datadog 組織には入力されなくなりました。既存のユーザーについては、このメトリクスは 2023 年 6 月 1 日に無効化されました。

ご不明な点は、<a href="https://docs.datadoghq.com/help/" target="_blank">Datadog サポート</a>までお問い合わせください。</div>

### メトリクス
{{< get-metrics-from-git "azure-vm" >}}


### イベント

Azure Virtual Machine インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Virtual Machine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [Microsoft Azure VM の監視方法][7]
- [Azure メトリクスの収集方法][8]
- [Datadog を使用した Azure VM の監視][9]
- [Datadog で SQL ワークロードの Azure 移行を戦略化する][10]

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors/downtimes
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[8]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[9]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[10]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/