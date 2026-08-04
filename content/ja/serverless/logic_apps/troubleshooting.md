---
description: Azure Logic Apps のモニタリングで欠落しているトレースおよびログの原因を、診断設定、ログ転送、Datadog における APM
  スパン生成を確認して診断します。
title: Azure Logic Apps 用 Serverless Monitoring のトラブルシューティング
---
## トレースが表示されません {#i-cannot-see-any-traces}

以下の手順に従って、トレースが Datadog に表示されない原因を診断します。

### 1. 診断設定が構成されていることを確認する {#1-verify-that-diagnostic-settings-are-configured}

Logic App に必要な診断設定が構成されていることを確認します。

1. Azure ポータルで、Logic App を開きます
2. 左側のメニューで {{< ui >}}Diagnostic settings{{< /ui >}} に移動します
3. `datadog_log_forwarding_<ID>` という名前の診断設定が存在することを確認します

{{< img src="serverless/logic_apps/diagnostic_settings.png" alt="datadog_log_forwarding 設定を示す Azure Logic App の診断設定" style="width:100%;" >}}

この設定は、[Datadog Azure Automated Log Forwarding][1] サービスによって自動的に作成されます。設定が存在しない場合は、Azure Automated Log Forwarding サービスが正しくインストールされていることを確認します。

### 2. Logic Apps のログが Datadog に存在することを確認する {#2-verify-that-logic-apps-logs-are-in-datadog}

ログが Datadog に転送されていることを確認します。

1. Datadog で、[{{< ui >}}Logs > Live Tail{{< /ui >}}][2] に移動します
2. `@properties.resource.workflowId:*` を検索します
3. 必要に応じて、Logic App ワークフローを数回トリガーします

ログが表示されない場合:
- Azure Automated Log Forwarding サービスが適切に構成されていることを確認します

### 3. APM スパンが存在することを確認する {#3-verify-that-apm-spans-exist}

ログからトレースが生成されていることを確認します。

1. Datadog で、[{{< ui >}}APM > Traces{{< /ui >}}][3] に移動します
2. ページ右上隅の {{< ui >}}Live Search{{< /ui >}} を選択します
3. `operation_name:azure.logicapps` を検索します

ログは表示されるもののトレースが表示されない場合は、ログが処理されてトレースが生成されるまで数分待ちます。

## その他のトラブルシューティングのヒント {#additional-troubleshooting-tips}

### ログが Datadog に表示されない {#logs-are-not-appearing-in-datadog}

ログが Datadog に表示されない場合:

1. **Azure Automated Log Forwarding の設定を確認します**: Event Hubs 名前空間と Datadog の宛先が正しく構成されていることを確認します
2. **診断設定のログカテゴリを確認します**: 診断設定が `WorkflowRuntime` ログをキャプチャしていることを確認します

### トレースが断続的に欠落している {#traces-are-missing-intermittently}

トレースが断続的に表示される場合:

1. **保持フィルターを追加します**: クエリ `operation_name:azure.logicapps` を使用して [保持フィルター][4] を作成し、トレースが保持されるようにします
2. **保持率を設定します**: デバッグのために、保持率を 100% に設定します
3. **サンプリングを確認します**: サンプリング設定が原因でトレースがドロップされていないことを確認します

### タグがトレースに表示されない {#tags-are-not-appearing-on-traces}

`env` および `service` タグがトレースに表示されない場合:

1. **Azure でタグを確認します**: Azure ポータルで Logic App にタグが正しく設定されていることを確認します
2. **反映を待ちます**: タグの変更が新しい実行に反映されるまで 30 分かかる場合があります
3. **新しい実行をトリガーします**: タグを設定した後、ワークフローを再度呼び出します

## さらにサポートが必要ですか。{#need-more-help}

ここに記載されていないご質問や問題については、[Datadog サポート][5] までお問い合わせください。

[1]: /ja/logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[4]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /ja/help/