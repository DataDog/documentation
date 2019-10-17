---
categories:
  - cloud
  - azure
  - os & system
ddtype: クローラー
dependencies: []
description: Azure VM のリソース使用状況、ネットワーク統計などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_vm/'
git_integration_title: azure_vm
has_logo: true
integration_title: Microsoft Azure VM
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_vm
public_title: Datadog-Microsoft Azure VM インテグレーション
short_description: Azure VM のリソース使用状況、ネットワーク統計などを追跡
version: '1.0'
---
## 概要
Azure 仮想マシンでは、オンデマンドでスケーリングできる仮想化環境を柔軟に実行できます。

Azure VM からメトリクスを取得すると、以下のことができます。

* VM のパフォーマンスを視覚化できます。
* VM のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

**ARM** でデプロイされた仮想マシンの場合は、診断をオンにし、収集する仮想マシンのメトリクスを選択する必要があります。手順については、[診断の有効化][7] を参照してください。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_vm" >}}


### イベント
Azure Virtual Machine インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Virtual Machine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

* [Microsoft Azure VM の監視方法][4]  
* [Azure メトリクスの収集方法][5]  
* [Datadog を使用した Azure VM の監視][6]  

[1]: https://docs.datadoghq.com/ja/integrations/azure
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[3]: https://docs.datadoghq.com/ja/help
[4]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[5]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[6]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[7]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/#enable-diagnostics


{{< get-dependencies >}}