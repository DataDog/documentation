---
aliases:
- /ja/tracing/error_tracking/executional_context
- /ja/tracing/error_tracking/execution_replay/
description: Error Tracking の Exception Replay について学習します。
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: ブログ
  text: Datadog Exception Replay で本番デバッグを簡素化
- link: /tracing/live_debugger
  tag: ドキュメント
  text: Datadog Live Debugger について学習します。
- link: /error_tracking/monitors
  tag: ドキュメント
  text: Error Tracking Monitors について学習します。
- link: /tracing/error_tracking
  tag: ドキュメント
  text: APM バックエンドサービスの Error Tracking について学習します。
is_beta: true
title: Error Tracking における Exception Replay
---
<div class="alert alert-info">
Exception Replay は、Python、Java、.NET、PHP で一般提供されており、サポートされている場合はデフォルトで有効になっています。
(<a href="#requirements--setup">サポートされている場合</a>)。
</div>

## 概要 {#overview}

Exception Replay は、例外が発生したときに実行コンテキストとローカル変数の値をキャプチャし、問題の診断、
問題の再現と解決を迅速化します。スタックトレースや変数のスナップショットを含む周囲の状態を記録し、
そのデータを Error Tracking 内の他の問題詳細と並べて直接表示します。

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

Exception Replay は本番環境での使用を想定して設計されています。スナップショットはレート制限されており、機密データは自動的に
[マスク](#sensitive-data-redaction)されます。有効にすると、アプリケーション内の例外を待機し、スナップショットをキャプチャします。
スタックトレースとローカル変数を Datadog に転送する前にキャプチャします。

<div class="alert alert-info">
<b>サポートされている製品は何ですか</b>
Exception Replay は <b>APM ベースの例外</b>でのみ利用可能で、Logs や RUM からのエラーはサポートしていません。
</div>

## 要件とセットアップ {#requirements-setup}

Exception Replay は Python、Java、.NET、PHP をサポートし、APM ベースの例外のみをキャプチャします。これには
[Datadog Agent][12] と [APM-instrumented application][1] が必要です。環境全体、
アプリ内の個別のサービス、または環境変数を使用した特定のサービスに対して有効にできます。

有効化の方法は、トレーサーのバージョンと [Remote Configuration][2] が利用可能かどうかによって異なります。詳細については、
以下の表を参照してください。

| | 環境別<br>(一括) | サービス別<br>(アプリ内) | サービス別<br>(環境変数) |
|---|---|---|---|
| **有効化方法** | デフォルトで有効 | 設定ページ | 環境変数 |
| **Agent バージョン** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **最小トレーサーバージョン** | [Python][8] ≥ 3.15.0<br>[Java][9] ≥ 1.54.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 3.10.0<br>[Java][9] ≥ 1.48.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.14.0 | [Python][8] ≥ 1.16.0<br>[Java][9] ≥ 1.47.0<br>[.NET][10] ≥ 2.53.0<br>[PHP][11] ≥ 1.12.1 |
| **Remote Configuration が必要か** | はい | はい | いいえ |

Exception Replay をアプリ内で有効にするには、Error Tracking の Exception Replay {{< ui >}}Settings{{< /ui >}} ページに移動し、
目的の環境またはサービスを選択して、{{< ui >}}Enabled{{< /ui >}} に切り替えます。

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="設定ページから Exception Replay を有効にする" style="width:90%" >}}

アプリ内での有効化が利用できない場合は、環境変数を設定します。

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

これはアプリ内の構成を上書きするためにも使用でき、両方が設定されている場合はこちらが優先されます。

### Exception Replay スナップショット用のログインデックスを作成 {#create-a-logs-index-for-exception-replay-snapshots}

Exception Replay スナップショット専用のログインデックスを作成し、目的の保持期間を設定して、サンプリングを無効にします。

- フィルターを `source:dd_debugger` に設定します。
- このインデックスが、このタグに一致する他のインデックスよりも優先されるようにします (最初に一致したものが優先されます)。

<div class="alert alert-info">
<b>ログインデックスを作成する理由</b>
Exception Replay スナップショットは、元の APM スパンへのリンクが付加されたログとして出力されます。
</div>

### ソースコードをリンクする {#link-your-source-code}

Datadog Source Code Integration を有効にすると、Error Tracking の
スタックトレース内で直接コードプレビューを確認できます。Exception Replay スナップショットがキャプチャされると、コードプレビュー内の変数名にカーソルを合わせて、
キャプチャされた値を確認できます。

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="ソースコード統合を使用した Exception Replay" style="width:90%" >}}

## 機密データのリダクション {#sensitive-data-redaction}

Exception Replay は、自動的なモードベースおよび識別子ベースのリダクションを適用し、スナップショットが利用可能になる前に機密データが保護されるようにします。
スナップショットが利用可能になります。

### モードベースのリダクション {#mode-based-redaction}

Exception Replay には 2 つのリダクションモードがあります。

- {{< ui >}}Strict Mode{{< /ui >}}: 数値とブール値を除くすべての値をリダクションします。
- {{< ui >}}Targeted Mode{{< /ui >}}: クレジットカード番号、API キー、IP アドレス、その他の個人情報 (PII) など、既知の機密パターンをリダクションします。また、高エントロピーのシークレットスキャナーを実行し、シークレットの可能性が高いものを自動的にリダクションします。これらはスナップショット内で `[REDACTED:HIGH_ENTROPY]` として表示されます。

これらのリダクションモードは無効にすることはできず、切り替えることのみ可能です。
また、Targeted Mode は、`staging` や `preprod` のような一般的な本番前環境で自動的に適用されます。

### 識別子ベースのリダクション {#identifier-based-redaction}

[一般的なセンシティブ識別子][3] に関連付けられた変数値 (例: `password`、`accessToken`、および類似の用語) は、
スナップショットがホストから離れる前にスクラブされます。言語固有の追加のリダクションルールが各トレーサーに組み込まれています。
(例: Python トレーサーはデフォルトのセンシティブ識別子のリストを保持しています)。

リダクション動作は以下を通じて拡張できます。

- カスタム識別子ベースのリダクション
- クラス/タイプベースのリダクションルール
- Sensitive Data Scanner ルール

[Dynamic Instrumentation センシティブデータスクラビングの手順][4] および [Sensitive Data Scanner][5] のドキュメントを参照してください。
構成の詳細については、以下を確認してください。

<div class="alert alert-info">
<b>DI の指示が必要な理由</b>
Exception Replay は <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a> に基づいて構築されているため、
そのセンシティブデータスクラビングの構成オプションもここで適用されます。
</div>

## トラブルシューティング{#troubleshooting}

### 変数値が欠落している {#missing-variable-values}

Exception Replay のスナップショットには、**インスタンスごと、例外タイプごとに 1 時間あたり 1 回**というレート制限が適用されます。一部の
ランタイムでは、特定の例外について、**2 回目の発生**後にのみスナップショットがキャプチャされます。

### スナップショットが表示されないその他の理由 {#additional-reasons-a-snapshot-may-not-appear}

- Exception Replay が有効になっていない
- スナップショットが選択した時間枠外で発生した
- サードパーティパッケージの除外 (これらを含めるには `DD_THIRD_PARTY_DETECTION_EXCLUDES` を使用)
- [Log Index][6] の保持設定または先行するインデックスの [Exclusion Filters][7] により `source:dd_debugger` が欠落しているログ
- Exception Replay は FedRAMP リージョンでは利用できません
- Java: JDK 18 以下では、`-parameters` フラグでコンパイルされたクラスはサポートされない場合があります。Spring 6+、Spring Boot 3+、および Scala は、このフラグをデフォルトで使用します。

Error Tracking Explorer でクエリ `@error.debug_info_captured:true` を使用して、Exception Replay のスナップショットを含むエラーを検索します
。

### GovCloud 上の BatchUploader の WARN メッセージ (Java) {#batchuploader-warn-messages-on-govcloud-java}

GovCloud サイト (`app.ddog-gov.com`) では、Java トレーサーが `com.datadog.debugger.uploader.BatchUploader` から HTTP 403 および `This traffic is not permitted on your account` に類似したテキストを含む WARN メッセージを定期的にログに出力する場合があります。これは、Exception Replay、Dynamic Instrumentation、および Code Origin for Spans がサポートされていないサイトで、デバッガー関連のアップロードが試行された場合の想定された動作です。APM のコア機能 (トレース、メトリクス、プロファイリング、ログインジェクション) には影響ありません。

これらのログメッセージを停止するには、Java アプリケーション Pod で以下の環境変数を設定し、ワークロードを再起動します。

```bash
DD_EXCEPTION_REPLAY_ENABLED=false
DD_DYNAMIC_INSTRUMENTATION_ENABLED=false
DD_CODE_ORIGIN_FOR_SPANS_ENABLED=false
```

または、JVM システムプロパティを使用します。

```bash
-Ddd.exception.replay.enabled=false
-Ddd.dynamic.instrumentation.enabled=false
-Ddd.code.origin.for.spans.enabled=false
```

修正を確認するには、トレーサーの起動 JSON (`DATADOG TRACER CONFIGURATION`) を確認し、`debugger_exception_enabled`、`debugger_enabled`、および `debugger_span_origin_enabled` がすべて `false` であることを確認します。WARN メッセージはレート制限により約 5 分に 1 回のみ出力されるため、再起動後、メッセージが停止したことを確認するまで少なくともその程度の時間待ちます。

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