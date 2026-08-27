---
title: AWS Step Functions のサーバーレスモニタリングのトラブルシューティング
---
## トレースが表示されません {#i-cannot-see-any-traces}

#### Step Function がすべてのログを送信するように構成されていることを検証する {#verify-that-your-step-function-is-configured-to-send-all-logs}
- AWS コンソールの Step Function で `DD_TRACE_ENABLED` タグが `true` に設定されていることを確認します。
- AWS コンソールで、Step Function のログタブを開きます。{{< ui >}}Log level{{< /ui >}} が `ALL` に設定され、{{< ui >}}Include execution data{{< /ui >}} が選択されていることを確認します。
- CloudWatch のロググループ (ログタブにもあります) に、同じリージョンの Datadog Lambda Forwarder へのサブスクリプションフィルターが設定されていることを確認します

#### ログが Datadog に正常に転送されることを検証する {#verify-that-logs-are-forwarded-successfully-to-datadog}
- Datadog Lambda Forwarder にエラーメッセージがないか確認します。API キーと Datadog サイトが正しく設定されていることを確認します。
- Datadog Lambda Forwarder で `DEBUG` ログを有効にするには、環境変数 `DD_LOG_LEVEL` を `debug` に設定します

#### ログが Live Search で検索でき、DD_TRACE_ENABLED タグが付与されていることを確認する {#verify-that-logs-are-searchable-on-live-search-and-have-dd-trace-enabled-tag}
Datadog で、[{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Log Stream{{< /ui >}}][2] に移動します。`source:stepfunction` を検索します。ステートマシンを数回トリガーする必要がある場合があります。Datadog Lambda Forwarder を古いバージョンからアップグレードする必要がある場合は、アップグレード後に Forwarder の `DD_FETCH_STEP_FUNCTIONS_TAGS` タグが `true` に設定されていることを確認します。アップグレードされた Forwarder に `DD_FETCH_STEP_FUNCTIONS_TAGS` タグがない場合、Forwarder が正しくアップグレードされていない可能性があります。

Forwarder とステートマシンのタグが前の手順で正しく設定されていれば、ログには `DD_TRACE_ENABLED:true` タグが付与されます。

#### Step Function が最新バージョンを使用していることを確認する {#verify-that-your-step-function-is-using-the-latest-version}
- AWS は Step Function API の更新をリリースしたり、より新しいバージョンの Step Function 定義を導入したりする場合があります。古いバージョンでは、予期しないログ形式や動作が発生する可能性があります。
- また、ログの転送方法に不整合が発生しないよう、Datadog Lambda Forwarder も最新バージョンを使用することを推奨します。

#### カスタムログパイプラインの使用には注意 {#caution-when-using-custom-log-pipelines}
- カスタムログパイプラインはログ処理に柔軟性を提供しますが、ログ形式を大きく変更すると、ログがパースされなくなったり認識されなくなったりするなどの問題が発生する可能性があります。
- Step Function のログ構造を JSON 形式が変わるほど大幅に変更することは避けてください。

## Lambda のトレースが Step Function のトレースにマージされない {#lambda-traces-are-not-merging-with-step-function-traces}
- Lambda のトレースと Step Function のトレースの両方が Datadog で確認できることを検証します。
- [トレースマージ][6] ガイドに従って、正しいレイヤーまたはトレーサーバージョンを使用していることを確認します。また、ステートマシンの定義で Lambda ステップが計測されていることを確認します。
- Step Function を一度実行し、Lambda ステップの `TaskScheduled` イベントログに [Step Function のコンテキストオブジェクト][4] のデータを含むペイロードがあるか確認してください。
- Lambda に `DD_TRACE_EXTRACTOR` 環境変数が設定されている場合、そのトレースはマージできません。

## `aws.stepfunctions` の root スパンは見えるが、ステップスパンが見えない {#i-can-see-the-awsstepfunctions-root-span-but-i-cannot-see-any-step-spans}
ステートマシンのログ記録で {{< ui >}}Include execution data{{< /ui >}} オプションを有効にします。このオプションを有効にすると、実行入力、ステート間で渡されるデータ、および実行出力がログに記録されます。Datadog バックエンドは、これらのログを使用してこれらのステップスパンを構築します。

## トレースが断続的に欠落している {#traces-are-missing-intermittently}
トレースを検索する際は、右上隅にある {{< ui >}}Live Search{{< /ui >}} オプションを選択します。Live Search でトレースが表示される場合は、[保持フィルター](https://docs.datadoghq.com/ja/tracing/trace_pipeline/trace_retention/#retention-filters)に "@trace_type:stepfunctions" を追加し、希望する保持率を設定します。デバッグのために、Datadog では保持率を 100% に設定することを推奨しています。デバッグ完了後、そのフィルターを無効にすることができます。

## トレースにいくつかのステップスパンがない {#some-step-spans-are-missing-in-the-traces}
- Lambda、DynamoDB、StepFunction、その他ほとんどの AWS サービスのアクションはサポートされています。
- `Wait`、`Choice`、`Success`、`Fail`、`Pass`、`Inline MapState`、および `Parallel` はサポートされていますが、[`Distributed MapState`][8] のサポートは限定的です。

## 履歴ログを検索する {#search-historic-logs}
履歴ログの検索を有効にするには、転送されたログに一時的なインデックスを追加します。Datadog で、Logs {{< ui >}}Indexes{{< /ui >}}[3] タブを開きます。右上の {{< ui >}}New Index{{< /ui >}} ボタンをクリックします。

名前を指定し、インデックスフィルターを `Source:stepfunction` に設定し、その他はデフォルト値のままにして保存します。

{{< img src="serverless/step_functions/log_index.png" alt="新しいログインデックス" style="width:80%;" >}}

組織が低い上限を持つ既存のすべてを網羅するインデックスを持っている場合、新しいインデックスを一番上に配置します。

**注**: ログのインデックス作成はトレースを取得するための必須要件ではなく、追加コストが発生する可能性があります。特定の問題をトラブルシューティングする場合は、一時的にログをインデックスに送信してデバッグし、その後インデックスを削除できます。詳細については、[インデックス][5] を参照してください。

## 実行内のログが不足している {#missing-logs-within-an-execution}
[除外フィルター][7] を使用して、特定の `execution_arn` を持つすべてのログの一定割合を除外できます。除外フィルターを使用しても、トレースには影響しません。

以下の例では、フィルターが `@execution_arn` の 90% のログを除外します。

{{< img src="serverless/step_functions/exclusion_filter.png" alt="Step Functions という名前の除外フィルター。'Define exclusion query' ボックスには 'source:stepfunction' が含まれています。'Set exclusion percentage' で、フィルターは @execution_arn の 90% を除外するように設定されています。" style="width:80%;" >}}

## Datadog Lambda Forwarder をカスタマイズしてデプロイする場合 {#customized-way-to-deploy-datadog-lambda-forwarder}
Datadog Lambda Forwarder を独自にカスタマイズしてデプロイしている場合、Step Functions のトレースを有効にするためのデバッグに役立つヒントを以下に示します。
- Forwarder で、環境変数 `DD_FETCH_STEP_FUNCTIONS_TAGS` を `true` に設定します。
- Datadog バックエンドで Step Functions トレースを生成するには、Datadog-Forwarder のレイヤーバージョンが 31 より上である必要があります。このバージョンでは、`DD_TRACE_ENABLED` を含むステートマシンタグを取得できます。
- v3.121.0 以降では、Forwarder レベルで `DD_STEP_FUNCTIONS_TRACE_ENABLED` タグを設定し、その Forwarder を使用するすべての Step Functions に対してトレーシングを有効にできます。
- Forwarder の IAM ロールには `tags:getResources` の権限が必要です。
- ステートマシンの CloudWatch ロググループに、Datadog Forwarder へのサブスクリプションフィルターを設定してください。
- ログが Datadog バックエンドに到達しているかを確認するには、{{< ui >}}Log Explorer{{< /ui >}} ページを開き、{{< ui >}}Live{{< /ui >}} の検索期間で `source:stepfunction` を検索します (Datadog のログ取り込みに送信されているすべてのログが表示されます)。ログが表示されない場合は、Forwarder に誤った API キーや無効な API キーなどのエラーログがないか確認します。`DEBUG` の環境変数 `DD_LOG_LEVEL` を追加すると、Forwarder の問題のデバッグに役立ちます。Step Functions のログが表示される場合は、そのログに `dd_trace_enable:true` タグが含まれていることを確認してください (すべてのタグは正規化されます)。数分以内に、そのログに関連付けられた Step Function トレースが表示されるはずです。


[1]: /ja/logs
[2]: /ja/logs/livetail
[3]: /ja/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: /ja/logs/log_configuration/indexes/
[6]: /ja/serverless/step_functions/merge-step-functions-lambda/?tab=serverlessframework#merge-step-functions-traces-with-downstream-lambda-traces
[7]: /ja/logs/log_configuration/indexes/#exclusion-filters
[8]: /ja/serverless/step_functions/distributed-maps