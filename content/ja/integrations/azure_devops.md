---
categories:
  - azure
  - ソースコントロール
  - コラボレーション
  - 問題追跡
ddtype: crawler
dependencies: []
description: 主要な Azure DevOps メトリクスを追跡します。
doc_link: 'https://docs.datadoghq.com/integrations/azure_devops'
draft: false
git_integration_title: azure_devops
has_logo: true
integration_title: Microsoft Azure DevOps
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_devops
public_title: Datadog-Microsoft Azure DevOps インテグレーション
short_description: 主要な Azure DevOps メトリクスを追跡します。
version: '1.0'
---
## 概要

Datadog と Azure DevOps を統合して、次のことを行います。

- プルリクエストを追跡し、さまざまなプロジェクトにマージします。
- リリースを監視し、スタックの他のデータとの関連でイベントを作成します。
- 完了したビルドと作業項目の期間を追跡します。
- 作業項目と更新を追跡します。

## セットアップ

### インストール

Datadog で、[Azure DevOps インテグレーションタイル][1]のインストールボタンをクリックします。

### コンフィギュレーション

サービスフックを使用して、Azure DevOps サービスからのイベントに応じて Datadog でイベントとメトリクスを作成します。

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="サービスフックの構成" >}}

1. Azure で、プロジェクトのサービスフックページに移動します。
2. **Create subscription** をクリックします。
3. Datadog サービスを選択します。
4. トリガーする Visual Studio イベントを構成します。
5. [Datadog API キー][2]を必須フィールドに入力します。
6. Datadog 組織のサイトを追加: {{< region-param key="dd_site_name" code="true" >}}
7. サービスフックサブスクリプションをテストし、ウィザードを終了します。
8. Datadog に送信するイベントタイプごとにステップ 4〜7 を繰り返します。すべてのイベントタイプが受け入れられます。

サービスフックを構成したら、Datadog に移動して、Azure DevOps のイベントとメトリクスを確認します。

Azure 側の他の参照先: [Create a service hook for Azure DevOps Services and TFS with Datadog][3]

#### プログラマティック

[Azure ドキュメント][4]および Datadog のエンドポイントを使用して、プログラムでサービスフックサブスクリプションを作成します。

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

### Datadog モニターを Azure Pipelines のゲートとして使用する

Datadog モニターを、Azure Pipelines の[リリースデプロイをコントロール][5]するためのゲートとして使用することもできます。このオプションを使用すると、Datadog で異常な状態が検出された場合、問題のあるデプロイを自動的に停止できます。

1. [Datadog Monitors as Deployment Gates][6] 拡張機能を Azure DevOps 組織に追加します。

    {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="拡張サービス接続" >}}

2. Azure DevOps で、プロジェクト設定の下の **Service Connections** に移動し、**New Service Connection** を選択します。
3. リストから Datadog を選択し、**Next** を押します。
4. 指定されたフィールドに、使用するアカウントの Datadog API キーとアプリケーションキーを追加し、名前と説明を入力して、Azure DevOps でこの Datadog アカウントを識別します。**Save** をクリックします。複数の Datadog アカウントからモニターを照会する必要がある場合は、他のサービス接続を追加できます。
5. **Azure Pipelines** に移動して、デプロイの構成を開始します。ステージ間でデプロイ前後の条件を追加するオプションが表示されます。Datadog モニターを追加する場所を選択し、**Gates** のトグルスイッチを有効にします。
6. **Add** をクリックし、**Query Datadog monitors** オプションを選択します。
7. Datadog サービス接続を選択し、使用するモニター ID と重大度しきい値を入力します。重大度しきい値は、タスクが失敗したモニターの状態（`Alert` または `Warning`）です。

    {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Datadog モニターゲート" >}}

8. ステップ 5〜7 を繰り返して、デプロイパイプラインの必要に応じてゲートを追加します。

**注**: 各ステージの単一の健全性状態の一部としてパイプラインのゲートの複数の状況を監視するには、[複合条件モニター][7]を使用します。

ソースコードを表示するには、[Azure Devops Monitor Gate Extension リポジトリ][8]にアクセスします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_devops" >}}


### イベント

Azure DevOps インテグレーションは、以下の[サービスフックイベントタイプ][10]をサポートします。

- ビルドとリリース
- 作業項目
- コード


### サービスのチェック

Azure DevOps インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

### よくあるご質問

#### このインテグレーションに追加費用はかかりますか？
このインテグレーションで生成されるメトリクスとイベントには、追加費用は発生しません。

#### データはどのくらいの期間 Datadog で保持されますか？
このインテグレーションからのデータは、Datadog の他のタイプの時系列データと同様に 15 か月間保持されます。

#### イベントとメトリクスは、どのくらいの時間で Datadog に表示されますか？
合計レイテンシーには多くの変数がありますが、ほとんどの場合、イベントとメトリクスはインシデントが発生してから 30 秒以内に Datadog に表示されます。

#### Datadog の Azure DevOps イベントとメトリクスで何ができますか？
イベントとメトリクスは、ダッシュボードの構築、モニターのセットアップ、トラブルシューティングなど、Datadog の他のイベントおよびメトリクスと同様に使用できます。

#### ビルド期間と作業項目期間のメトリクスはどのように生成されますか？
ビルド期間は、ビルドが開始されてから完了するまでの時間差（秒単位）を取得することにより、_ビルド完了_イベントから生成されます。

作業項目期間は、`Done` への移行と作業項目が作成されたときの時間差（時間単位）を取得することにより、_作業項目更新_イベントから生成されます。

**注**: `Done` の作業項目が再度開かれた場合は、次回 `Done` に移行したときに別のデータポイントが生成されます。初期データポイントは変更されず、新しいデータポイントは、やはり作業項目が最初に作成された時点から測定されます。

[1]: https://app.datadoghq.com/account/settings#integrations/azuredevops
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[7]: /ja/monitors/monitor_types/composite/
[8]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[10]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[11]: https://docs.datadoghq.com/ja/help/