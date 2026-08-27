---
description: Datadog Azure Automated Log Forwarding サービスおよびオプションの APM 保持フィルターを使用して、Azure
  Logic Apps のトレースとログ転送を設定します。
further_reading:
- link: /integrations/azure/
  tag: ドキュメント
  text: Azure インテグレーション
- link: /logs/guide/azure-automated-log-forwarding/
  tag: ドキュメント
  text: Azure Automated Log Forwarding
title: Azure Logic Apps 用の Serverless Monitoring をインストールする
---
{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="プレビューに参加しましょう">}}
Azure Logic Apps 用の Serverless Monitoring はプレビュー版です。フォームに入力してアクセスをリクエストします。
{{< /callout >}}

Azure Logic Apps はフルマネージドサービスであり、Datadog Agent を Logic Apps に直接インストールすることはできません。ただし、Datadog は Azure 診断ログを通じて Logic Apps を監視できます。

## 前提条件 {#prerequisites}

- [Azure Automated Log Forwarding][1] サービスをインストールする必要があります

## セットアップ {#setup}

### 1. Datadog Azure Automated Log Forwarding をインストールする {#1-install-datadog-azure-automated-log-forwarding}

[Azure Automated Log Forwarding ガイド][1] の手順に従ってサービスをインストールし、対象のリソースログをフィルタリングするためのタグを設定します。インストールが完了すると、すべての新しい Logic Apps で、診断ログを Datadog に送信するようにログ転送が自動的に構成されます。

**注**: Azure Automated Log Forwarding サービスは、各 Logic App に `datadog_log_forwarding_<ID>` という名前の診断設定を作成します。この設定は、ワークフローの実行ログをキャプチャし、Datadog に転送します。

### 2. タグを構成する (オプションですが推奨) {#2-configure-tags-optional-but-recommended}

Logic Apps に `service` および `env` タグを追加して、Datadog でワークフローを整理およびフィルタリングします。

1. Azure ポータルで、Logic App を開きます
2. {{< ui >}}Tags{{< /ui >}} セクションに移動します。
3. 以下のタグを追加します。
   - `env`: 環境名 (例: `dev`、`staging`、または `prod`)
   - `service`: Logic App のサービス名

{{< img src="serverless/logic_apps/tags_configuration.png" alt="env タグと service タグを示す Azure Logic App のタグ構成" style="width:100%;" >}}

Datadog でトレースを表示するには `env` タグが必須であり、設定されていない場合はデフォルトで `dev` になります。`service` タグは、設定されていない場合、デフォルトで Logic App のワークフロー名になります。

### 3. ワークフローを呼び出す {#3-invoke-the-workflow}

ログ転送を構成した後、Logic App ワークフローを数回呼び出して実行データを生成します。

### 4. Datadog でトレースを確認する {#4-verify-traces-in-datadog}

Datadog APM の Live Search を使用して、トレースが受信されていることを確認します。

1. Datadog で [APM > Traces][4] に移動します
2. クエリ `operation_name:azure.logicapps` を使用して Logic Apps トレースをフィルタリングします。
3. Live Search はサンプリングなしですべてのスパンを返すため、実行完了後に実行結果が表示されるはずです。

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Datadog APM Live Search で azure.logicapps トレースが表示されています。" style="width:100%;" >}}

## 追加の構成 {#additional-configuration}

### APM スパンの保持フィルターを追加する (推奨) {#add-a-retention-filter-for-apm-spans-recommended}

デフォルトのライブ検索期間を超えて保持するトレースを制御するには、保持フィルターを追加します。

1. Datadog で {{< ui >}}Retention Filters{{< /ui >}} を検索します (Cmd+K を押して "retention filters" と入力します)。
2. {{< ui >}}Add Retention Filter{{< /ui >}} をクリックします。
3. フィルタークエリを `operation_name:azure.logicapps` に設定します。
4. サービスに対する追加のフィルターとして、`service:<SERVICE_NAME>` や `env:<ENV_NAME>` などを追加します。
5. ニーズに合わせて保持率を構成します。

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Datadog で保持フィルターを検索する。" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="operation_name:azure.logicapps クエリを使用して保持フィルターを構成する" style="width:100%;" >}}

保持フィルターにサービスおよび環境タグを追加すると、重要な環境とサービスのトレースのみを保持することでコストを削減できます。

詳細については、[トレースの保持][5] を参照してください。

### ログインデックスを追加する (推奨) {#add-a-log-index-recommended}

過去の Logic Apps ログの検索と分析を有効にするには、専用のログインデックスを作成します。

1. Datadog で {{< ui >}}Indexes{{< /ui >}} を検索します (Cmd+K を使用して "index" と入力します)。
2. {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}Indexes{{< /ui >}} に移動します。
3. {{< ui >}}New Index{{< /ui >}} をクリックします。
4. フィルターを `@properties.resource.workflowId:*` に設定します。
5. インデックス名と保持設定を構成します。

{{< img src="serverless/logic_apps/log_index_search.png" alt="Datadog でログインデックスを検索する。" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="workflowId フィルターを使用してログインデックスを構成する" style="width:100%;" >}}

{{% serverless/log_to_trace_indexing_note %}}

詳細については、[ログインデックス][6] を参照してください。

## Datadog で Logic App トレースを表示する {#see-your-logic-app-traces-in-datadog}

Logic App を呼び出した後:

1. Datadog で、[{{< ui >}}APM > Traces{{< /ui >}}][4] に移動します。
2. ページ右上隅の {{< ui >}}Live Search{{< /ui >}} を選択します。
3. `operation_name:azure.logicapps` を検索してトレースを見つけます。

トレースが表示されない場合は、[トラブルシューティング][7] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/guide/azure-automated-log-forwarding/
[3]: /ja/integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /ja/tracing/trace_pipeline/trace_retention/
[6]: /ja/logs/log_configuration/indexes/
[7]: /ja/serverless/logic_apps/troubleshooting