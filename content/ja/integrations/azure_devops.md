---
categories:
- azure
- コラボレーション
- developer tools
- 問題追跡
- プロビジョニング
- ソースコントロール
dependencies: []
description: 主要な Azure DevOps メトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_devops
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で Azure Pipelines を監視する
- link: https://www.datadoghq.com/blog/azure-pipeline-testing-with-datadog-synthetic-monitoring/
  tag: ブログ
  text: Azure Pipelines で Datadog Synthetic テストを実行する
- link: https://www.datadoghq.com/blog/monitor-azure-devops/
  tag: ブログ
  text: Datadog を使用して Azure DevOps のワークフローとパイプラインを監視する
git_integration_title: azure_devops
has_logo: true
integration_id: azuredevops
integration_title: Microsoft Azure DevOps
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_devops
public_title: Datadog-Microsoft Azure DevOps インテグレーション
short_description: 主要な Azure DevOps メトリクスを追跡します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[Azure DevOps][1] は、組織が製品をより迅速に作成・開発するために使用する機能を提供します。Datadog を Azure DevOps にインテグレーションすることで、次のことが可能になります。

- プルリクエストを追跡し、さまざまなプロジェクトにマージします。
- リリースを監視し、スタックの他のデータとの関連でイベントを作成します。
- 完了したビルドと作業項目の期間を追跡します。
- 作業項目と更新を追跡します。

## 計画と使用

### インフラストラクチャーリスト

Datadog で、[Azure DevOps インテグレーションタイル][2]のインストールボタンをクリックします。

### ブラウザトラブルシューティング

サービスフックを使用して、Azure DevOps サービスからのイベントに応じて Datadog でイベントとメトリクスを作成します。

{{< img src="integrations/azure_devops/configure-service-hook.mp4" alt="サービスフックの構成" video="true" >}}

1. Azure で、プロジェクトのサービスフックページに移動します。
2. **Create subscription** をクリックします。
3. Datadog サービスを選択します。
4. トリガーする Visual Studio イベントを構成します。
5. [Datadog API キー][3]を必須フィールドに入力します。
6. Datadog 組織のサイトを追加: {{< region-param key="dd_site_name" code="true" >}}
7. サービスフックサブスクリプションをテストし、ウィザードを終了します。**注**: テストは、API キーまたは Datadog オーガニゼーションサイトは検証しません。
8. Datadog に送信するイベントタイプごとにステップ 4〜7 を繰り返します。すべてのイベントタイプが受け入れられます。

サービスフックを構成したら、Datadog に移動して、Azure DevOps のイベントとメトリクスを確認します。

Azure 側の他の参照先: [Datadog で Azure DevOps Services と TFS のサービスフックを作成する][4]

#### プログラマティック

Azure ドキュメントに従い[プログラムでサービスフックサブスクリプションを作成][5]し、Datadog のエンドポイントを使用します。

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

### Datadog モニターを Azure Pipelines のゲートとして使用する

Datadog のモニターをゲートとして使用し、Azure Pipelines でのリリースデプロイメントを制御することもできます。このオプションを使用すると、Datadog で異常な状態が検出された場合、問題のあるデプロイを自動的に停止できます。

1. [Datadog Monitors as Deployment Gates][7] 拡張機能を Azure DevOps 組織に追加します。

    {{< img src="integrations/azure_devops/extension-service-connection.mp4" alt="拡張サービス接続" video="true" >}}

2. Azure DevOps で、プロジェクト設定の下の **Service Connections** に移動し、**New Service Connection** を選択します。
3. リストから Datadog を選択し、**Next** を押します。
4. 指定されたフィールドに、使用するアカウントの Datadog API キーとアプリケーションキーを追加し、名前と説明を入力して、Azure DevOps でこの Datadog アカウントを識別します。**Save** をクリックします。複数の Datadog アカウントからモニターを照会する必要がある場合は、他のサービス接続を追加できます。
5. **Azure Pipelines** に移動して、デプロイを構成します。ステージ間でデプロイ前後の条件を追加するオプションが表示されるので、Datadog モニターを追加する場所を選択し、**Gates** のトグルスイッチを有効にします。
6. **Add** をクリックし、**Query Datadog monitors** オプションを選択します。
7. Datadog サービス接続を選択し、使用するモニター ID と重大度しきい値を入力します。重大度しきい値は、タスクが失敗したモニターの状態（`Alert` または `Warning`）です。

    {{< img src="integrations/azure_devops/datadog-monitor-gate.mp4" alt="Datadog モニターゲート" video="true" >}}

8. ステップ 5〜7 を繰り返して、デプロイパイプラインの必要に応じてゲートを追加します。

**注**: 各ステージの単一の健全性状態の一部としてパイプラインのゲートの複数の状況を監視するには、[複合条件モニター][8]を使用します。

ソースコードを表示するには、[Azure Devops Monitor Gate Extension リポジトリ][9]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_devops" >}}


### ヘルプ

Azure DevOps インテグレーションは、以下の[サービスフックイベントタイプ][11]をサポートします。

- ビルドとリリース
- 作業項目
- コード


### ヘルプ

Azure DevOps インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

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

#### サービスフックサブスクリプションのテストで、成功メッセージが返されましたが、イベントが Datadog に到達しないのはなぜですか？
サービスフックサブスクリプションテストは、Azure DevOps が Datadog へイベントを送信できるかどうかのみをチェックします。API キーまたは Datadog オーガニゼーションサイト (US または EU) は検証されません。API キーおよびサイトが正しいことをご確認ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?toc=%2Fazure%2Fdevops%2Fget-started%2Ftoc.json&view=azure-devops
[2]: https://app.datadoghq.com/integrations/azuredevops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[7]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[8]: /ja/monitors/monitor_types/composite/
[9]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[11]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[12]: https://docs.datadoghq.com/ja/help/