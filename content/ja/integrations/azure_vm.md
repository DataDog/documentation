---
categories:
  - cloud
  - azure
  - os & system
ddtype: crawler
dependencies: []
description: Azure VM のリソース使用状況、ネットワーク統計などを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_vm/'
draft: false
git_integration_title: azure_vm
has_logo: true
integration_id: azure-vm
integration_title: Microsoft Azure VM
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_vm
public_title: Datadog-Microsoft Azure VM インテグレーション
short_description: Azure VM のリソース使用状況、ネットワーク統計などを追跡。
version: '1.0'
---
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

### メトリクス
{{< get-metrics-from-git "azure_vm" >}}


### イベント

Azure Virtual Machine インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Virtual Machine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [Microsoft Azure VM の監視方法][7]
- [Azure メトリクスの収集方法][8]
- [Datadog を使用した Azure VM の監視][9]


[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors#downtime
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[8]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[9]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog