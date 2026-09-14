---
aliases:
- /ja/tracing/error_tracking/executional_context
- /ja/tracing/error_tracking/execution_replay/
description: Error Tracking の Exception Replay について学びます。
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: ブログ
  text: Datadog Exception Replay で本番環境のデバッグを簡素化
- link: /tracing/live_debugger
  tag: ドキュメント
  text: Datadog Live Debugger について学ぶ
- link: /error_tracking/monitors
  tag: ドキュメント
  text: Error Tracking モニターについて学ぶ
- link: /tracing/error_tracking
  tag: ドキュメント
  text: APM バックエンドサービスの Error Tracking について学ぶ
is_beta: true
title: Error Tracking の Exception Replay
---
<div class="alert alert-info">
Exception Replay は、Python、Java、.NET、PHP で一般提供されており、デフォルトで有効になっています
<a href="#requirements--setup">(サポートされている場合)</a>。
</div>

## 概要 {#overview}

Exception Replay は、例外発生時の実行コンテキストとローカル変数の値をキャプチャして、問題を迅速に診断、
再現、解決できるようにします。スタックトレースや変数スナップショットなどの例外発生時の状況を記録し、
このデータを問題のその他の詳細とともに Error Tracking に直接表示します。

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Error Tracking エクスプローラーの Exception Replay" style="width:90%" >}}

Exception Replay は本番環境用に作成されています。スナップショットはレート制限されており、機密データは自動的に
[削除されます](#sensitive-data-redaction)。有効にすると、アプリケーションで例外を待機し、
スタックトレースとローカル変数のスナップショットをキャプチャしてから、Datadog に転送します。

<div class="alert alert-info">
<b>どの製品で使用できるか:</b>
Exception Replay は <b>APM ベースの例外</b>でのみ使用可能で、ログや RUM からのエラーはサポートしていません。
</div>

## 要件とセットアップ {#requirements-setup}

Exception Replay は Python、Java、.NET、PHP をサポートしており、APM ベースの例外のみをキャプチャします。Exception Replay には、
[Datadog Agent][12] と [APMインスツルメンテーション済みアプリケーション][1]が必要です。環境全体、
アプリ内の個別のサービス、または環境変数を使用した特定のサービスに対して有効にできます。

有効化の方法は、トレーサーのバージョンと [Remote Configuration][2] が利用可能かどうかによって異なります。詳細は、以下の表を
参照してください。

| | 環境別<br>(一括) | サービス別<br>(アプリ内) | サービス別<br>(環境変数) |
|---|---|---|---|
| **有効化方法** | デフォルトで有効 | 設定ページ | 環境変数 |
| **Agent バージョン** | v7.49.0 以上 | v7.49.0 以上 | v7.49.0 以上 |
| **最小トレーサーバージョン** | [Python][8] 3.15.0 以上<br>[Java][9] 1.54.0 以上<br>[.NET][10] 3.29.0 以上<br>[PHP][11] 1.19.0 以上| [Python][8] 3.10.0 以上<br>[Java][9] 1.48.0 以上<br>[.NET][10] 3.29.0 以上<br>[PHP][11] 1.19.0 以上| [Python][8] 1.16.0 以上<br>[Java][9] 1.47.0 以上<br>[.NET][10] 2.53.0 以上<br>[PHP][11] 1.12.1 以上|
| **Remote Configuration が必要か** | はい | はい | いいえ |

アプリ内で Exception Replay を有効にするには、Error Tracking の Exception Replay の [{{< ui >}}Settings{{< /ui >}}](設定) ページに移動し、
目的の環境またはサービスを選択して、[{{< ui >}}Enabled{{< /ui >}}](有効) に切り替えます。

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="設定ページからの Exception Replay の有効化" style="width:90%" >}}

アプリ内での有効化が利用できない場合は、次のように環境変数を設定してください。

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

これはアプリ内構成を上書きするためにも使用することができます。両方とも設定されている場合は、この設定が優先されます。

### Exception Replay スナップショット用のログインデックスを作成する {#create-a-logs-index-for-exception-replay-snapshots}

Exception Replay スナップショット専用のログインデックスを作成し、目的の保持期間とサンプリングなしで構成します。

- `source:dd_debugger` に一致するようにフィルターを設定します。
- このインデックスが、このタグに一致するほかのインデックスよりも優先されるようにします (最初に一致したものが優先されます)。

<div class="alert alert-info">
<b>ログインデックスを作成する理由:</b>
Exception Replay スナップショットは、元の APM スパンへのリンクが付加されたログとして出力されるためです。
</div>

### ソースコードをリンクする {#link-your-source-code}

Datadog ソースコードインテグレーションを有効にすると、Error Tracking スタックトレース内で直接コードプレビューを確認できます
。Exception Replay スナップショットがキャプチャされたら、コードプレビュー内の変数名にカーソルを合わせて、
キャプチャされた値を確認できます。

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="ソースコードインテグレーションを使用した Exception Replay" style="width:90%" >}}

## 機密データの削除 {#sensitive-data-redaction}

Exception Replay は、スナップショットが利用可能になる前に、機密データが確実に保護されるように、
モードまたは識別子に基づく自動削除を実施します。

### モードに基づく削除 {#mode-based-redaction}

Exception Replay には、次の 2 つの編集モードがあります。

- {{< ui >}}Strict Mode{{< /ui >}}: 数値とブール値を除くすべての値を削除します。
- {{< ui >}}Targeted Mode{{< /ui >}}: クレジットカード番号、API キー、IP、その他の PII などの、既知の機密パターンを削除します。また、高エントロピーのシークレットスキャナーを実行します。これは、スナップショット内で `[REDACTED:HIGH_ENTROPY]` として表示される、シークレットである可能性が高い項目を自動で削除します。

これらの削除モードは無効にすることはできず、切り替えのみが可能です。対象のモードは、
`staging` や `preprod` のような一般的なプリプロダクション環境で自動的に適用されます。

### 識別子に基づく編集 {#identifier-based-redaction}

[一般的な機密識別子][3] (例: `password`、`accessToken`、および類似の用語) に関連付けられた変数値は、
スナップショットがホストから送信される前にスクラブされます。言語固有の追加の削除ルールが各トレーサーに組み込まれています
(たとえば、Python トレーサーは、デフォルトの機密識別子のリストを保持しています)。

削除動作は、以下を使用して拡張できます。

- カスタム識別子に基づく削除
- クラス/型に基づく削除ルール
- Sensitive Data Scanner のルール

設定の詳細については、[Dynamic Instrumentation の機密データスクラブ手順][4]および [Sensitive Data Scanner][5] のドキュメントを
参照してください。

<div class="alert alert-info">
<b>DI の手順を参照する理由:</b>
Exception Replay は <a href="/tracing/dynamic_instrumentation/">DI (Dynamic Instrumentation)</a> を基に作成されているため、
その機密データのスクラブ設定方法をこの場合も参照できます。
</div>

## トラブルシューティング {#troubleshooting}

### 変数値が見つからない {#missing-variable-values}

Exception Replay のスナップショットは、**インスタンスごと、例外タイプごとに、1 時間あたり 1 つのスナップショット**にレート制限されています。一部のランタイムでは、
特定の例外が **2 回発生した**後にのみスナップショットがキャプチャされます。

### スナップショットが表示されないその他の理由 {#additional-reasons-a-snapshot-may-not-appear}

- Exception Replay が有効になっていない
- スナップショットが選択した時間枠外で発生した
- サードパーティパッケージが除外されている (これらを含めるには `DD_THIRD_PARTY_DETECTION_EXCLUDES` を使用してください)
- [ログインデックス][6]の保持設定または先行するインデックスの[除外フィルター][7]が原因で、`source:dd_debugger` がログに含まれていない
- Exception Replay は FedRAMP リージョンでは使用できない
- Java: JDK 18 以下では、`-parameters` フラグを指定してコンパイルされたクラスはサポートされない場合があります。Spring 6 以上、Spring Boot 3 以上、および Scala では、このフラグがデフォルトで使用されます。

Error Tracking エクスプローラーでクエリ `@error.debug_info_captured:true` を使用して、Exception Replay スナップショットのあるエラーを
検出してください。

### GovCloud (Java) での BatchUploader の WARN メッセージ{#batchuploader-warn-messages-on-govcloud-java}

GovCloud サイト (`app.ddog-gov.com`) では、Java トレーサーが `com.datadog.debugger.uploader.BatchUploader` から HTTP 403 および `This traffic is not permitted on your account` に類似したテキストを含む定期的な WARN メッセージをログに記録する場合があります。これは、Exception Replay、Dynamic Instrumentation、および Code Origin for Spans がサポートされていないサイトでデバッガー関連のアップロードが試行された場合に予期される動作です。コア APM 機能 (トレース、メトリクス、プロファイリング、ログインジェクション) には影響しません。

このようなログメッセージを停止するには、Java アプリケーション Pod で以下の環境変数を設定し、ワークロードを再起動してください。

```bash
DD_EXCEPTION_REPLAY_ENABLED=false
DD_DYNAMIC_INSTRUMENTATION_ENABLED=false
DD_CODE_ORIGIN_FOR_SPANS_ENABLED=false
```

または、次の JVM システムプロパティを使用してください。

```bash
-Ddd.exception.replay.enabled=false
-Ddd.dynamic.instrumentation.enabled=false
-Ddd.code.origin.for.spans.enabled=false
```

修正を確認するには、トレーサーの起動 JSON (`DATADOG TRACER CONFIGURATION`) をチェックし、`debugger_exception_enabled`、`debugger_enabled`、および `debugger_span_origin_enabled`がすべて `false` であることを確認してください。WARN メッセージはおよそ 5 分に 1 回の頻度にレート制限されています。そのため、再起動後にメッセージが停止したことを確認する際は、少なくともその程度の時間を空けてからにしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[2]: /ja/tracing/guide/remote_config
[3]: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py
[4]: /ja/dynamic_instrumentation/sensitive-data-scrubbing/
[5]: /ja/security/sensitive_data_scanner/
[6]: https://app.datadoghq.com/logs/pipelines/indexes
[7]: /ja/logs/log_configuration/indexes/#exclusion-filters
[8]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[10]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[11]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[12]: /ja/agent/