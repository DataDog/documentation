---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: API ドキュメント
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: Python トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

**ddtrace-run** を使用する場合、次の[環境変数 (オプション)][2] を利用できます。

`DD_TRACE_DEBUG`
: **デフォルト**: `false`<br>
トレーサーでデバッグロギングを有効化します。

`DD_PATCH_MODULES`
: このアプリケーションの実行のためにパッチされたモジュールをオーバーライドします。次のような形式になります。 `DD_PATCH_MODULES=module:patch,module:patch...`

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][1]のドキュメントをご参照ください。

`DD_ENV`
: アプリケーションの環境 (例: `prod`、`pre-prod`、`staging`) を設定します。詳細については、[環境の設定方法][3]を参照してください。バージョン 0.38 以降で利用可能。

`DD_SERVICE`
: このアプリケーションで使用するサービス名。値は、Web フレームワークのインテグレーション (例: Pylons、Flask、Django) 用のミドルウェアを設定する際にパススルーされます。Web インテグレーションを行わずにトレースする場合は、コード内でサービス名を設定する ([Django ドキュメントで例をご確認ください][4]) ことをお勧めします。バージョン 0.38 以降で利用可能。

`DD_PROPAGATION_STYLE_INJECT`
: **デフォルト**: `Datadog`<br>
トレーシングヘッダを注入するときに使用する伝搬スタイル。例えば、`DD_PROPAGATION_STYLE_INJECT=Datadog,B3` を使用すると、 Datadog と B3 形式のヘッダを注入することができます。

`DD_PROPAGATION_STYLE_EXTRACT`
: **デフォルト**: `DD_PROPAGATION_STYLE_INJECT` の値 (`Datadog`)<br>
トレーシングヘッダを抽出する際に使用する伝搬スタイル。複数の値が与えられた場合、最初に見つかったヘッダのマッチングを使用します。マッチングの順番は静的なもので、与えられた値の順番とは関係ありません。例えば、 `DD_PROPAGATION_STYLE_EXTRACT=B3,Datadog` は `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3` と同じ挙動となります。

`DD_SERVICE_MAPPING`
: サービス名のマッピングを定義し、トレース内におけるサービスの名前変更を許可します (例: `postgres:postgresql,defaultdb:postgresql`)。バージョン 0.47 以降で利用可能。

`DD_VERSION`
: アプリケーションのバージョン (例: `1.2.3`、`6c44da20`、 `2020.02.13`) を設定します。バージョン 0.38 以降で利用可能。

`DD_TRACE_SAMPLE_RATE`
: トレースボリュームコントロールを有効にします

`DD_TRACE_RATE_LIMIT`
: 1 秒あたり、Python プロセスごとにサンプリングするスパンの最大数。`DD_TRACE_SAMPLE_RATE` が設定されている場合、デフォルトは `100` です。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TAGS`
: すべてのスパンとプロファイルに追加されるデフォルトタグのリスト (例: `layer:api,team:intake`)。バージョン 0.38 以降で利用可能。

`DD_TRACE_HEADER_TAGS`
: **デフォルト**: `null`<br>
ルートスパンでタグとして報告されるヘッダー名のカンマ区切りのリスト。例えば、`DD_TRACE_HEADER_TAGS="User-Agent:http.user_agent,Referer:http.referer,Content-Type:http.content_type,Etag:http.etag"` のようにします。

`DD_TRACE_ENABLED`
: **デフォルト**: `true`<br>
Web フレームワークとライブラリインスツルメンテーションを有効にします。`false` の場合、アプリケーションコードはトレースを生成しません。

`DD_AGENT_HOST`
: **デフォルト**: `localhost`<br>
デフォルトのトレーサーがトレースの送信を試みるトレースエージェントホストの宛先アドレスをオーバーライドします。

`DD_AGENT_PORT`
: **デフォルト**: `8126`<br>
デフォルトのトレーサーがトレースを送信する宛先ポートをオーバーライドします。

`DD_TRACE_AGENT_URL`
: トレーサが送信する Trace Agent の URL です。設定された場合、これはホスト名とポートよりも優先されます。`datadog.yaml` ファイル内の `apm_config.receiver_socket` 構成、または Datadog Agent に設定された `DD_APM_RECEIVER_SOCKET` 環境変数との組み合わせで Unix Domain Sockets (UDS) をサポートします。例えば、HTTP の URL には `DD_TRACE_AGENT_URL=http://localhost:8126`、UDS の URL には `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` を指定します。

`DD_DOGSTATSD_URL`
: Datadog Agent for DogStatsD メトリクスへの接続に使用する URL。設定した場合、これはホスト名とポートよりも優先されます。`datadog.yaml` ファイル内の `dogstatsd_socket` 構成、または Datadog Agent に設定された `DD_DOGSTATSD_SOCKET` 環境変数との組み合わせで Unix Domain Sockets (UDS) をサポートします。例えば、UDP の URL には `DD_DOGSTATSD_URL=udp://localhost:8126`、UDS の URL には `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` を指定します。

`DD_DOGSTATSD_HOST`
: **デフォルト**: `localhost`<br>
デフォルトのトレーサーが DogStatsD のメトリクスを送信しようとするトレース Agent ホストのアドレスをオーバーライドします。`DD_DOGSTATSD_HOST` をオーバーライドするには、 `DD_AGENT_HOST` を使用します。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8126`<br>
デフォルトのトレーサーが DogStatsD のメトリクスを送信するポートをオーバーライドします。

`DD_LOGS_INJECTION`
: **デフォルト**: `false`<br>
[ログとトレースの挿入を接続する][5]を有効にします。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /ja/tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/python/