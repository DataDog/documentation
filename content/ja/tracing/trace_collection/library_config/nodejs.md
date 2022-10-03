---
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: GitHub
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: tracing/glossary/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: NodeJS トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

トレーサーの設定は、以下の環境変数で構成することができます。

### タグ付け

`DD_ENV`
: アプリケーションの環境を設定します (例: `prod`、`pre-prod`、`stage`)。デフォルトは、Datadog Agent で構成された環境です。

`DD_SERVICE`
: このプログラムで使用するサービス名。デフォルトは `package.json` の名前フィールドの値です。

`DD_VERSION`
: アプリケーションのバージョン番号。デフォルトは `package.json` のバージョンフィールドの値です。

`DD_TAGS`
: すべてのスパンおよびランタイムメトリクスに適用されるグローバルタグを設定します。環境変数として渡される場合、形式は `key:value,key:value` となります。プログラムで設定する場合は、`tracer.init({ tags: { foo: 'bar' } })` のような形式になります。

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめについては、[統合サービスタグ付け][1]のドキュメントをご参照ください。

### インスツルメンテーション

`DD_TRACE_ENABLED`
: **デフォルト**: `true`<br>
トレーサーを有効にするかどうか。

`DD_TRACE_DEBUG`
: **デフォルト**: `false`<br>
トレーサーでデバッグロギングを有効化します。

`DD_TRACE_AGENT_URL`
: **デフォルト**: `http://localhost:8126`<br>
トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。`datadog.yaml` ファイルの `apm_config.receiver_socket` または 　`DD_APM_RECEIVER_SOCKET` 環境変数と組み合わせて、Unix ドメインソケットをサポートします。

`DD_TRACE_AGENT_HOSTNAME`
: **デフォルト**: `localhost`<br>
トレーサーが送信する Agent のアドレス。

`DD_TRACE_AGENT_PORT`
: **デフォルト**: `8126`<br>
トレーサーが送信する Trace Agent のポート。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8125`<br>
メトリクスの送信先となる DogStatsD Agent のポート。

`DD_LOGS_INJECTION`
: **デフォルト**: `false`<br>
対応するログライブラリのログにトレース ID の自動挿入を有効にします。

`DD_TRACE_SAMPLE_RATE`
: `0` と `1` の間の浮動小数点数で、サンプリングするスパンのパーセンテージを指定します。デフォルトは、Datadog Agent から返されるレートです。

`DD_TRACE_RATE_LIMIT`
: `0` と `1` の間の浮動小数点数で、サンプリングするスパンの割合を指定します。`DD_TRACE_SAMPLE_RATE` が設定されている場合、デフォルトは `100` です。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TRACE_SAMPLING_RULES` 
: オブジェクトの JSON 配列。各オブジェクトは "sample_rate" を持つ必要があり、"name" と "service" フィールドは任意です。"sample_rate" の値は 0.0 から 1.0 の間である必要があります (この値を含む)。ルールは、トレースのサンプルレートを決定するために構成された順序で適用されます。省略した場合、トレーサーは Agent に従い、すべてのトレースでサンプルレートを動的に調整します。

`DD_RUNTIME_METRICS_ENABLED`
: **デフォルト**:  `false`<br>
ランタイムメトリクスのキャプチャを有効にするかどうか。Agent 上でポート `8125` (または `DD_DOGSTATSD_PORT` で構成) を UDP 用に開いておく必要があります。

`DD_SERVICE_MAPPING`
: **例**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
各プラグインのサービス名を指定します。カンマで区切られた `plugin:service-name` のペアを、スペースを含めても含めなくても指定することができます。

`DD_TRACE_DISABLED_PLUGINS`
: トレーサーが初期化された際に自動で無効となるインテグレーション名のカンマ区切り文字列。`DD_TRACE_DISABLED_PLUGINS=express,dns` などの環境変数のみとなります。

`DD_TRACE_LOG_LEVEL`
: **デフォルト**: `debug`<br>
デバッグログが有効な場合に、トレーサーが使用する最小のログレベルを表す文字列で、例えば `error` や `debug` などです。


プログラムによるコンフィギュレーション API を含むその他のオプションについては、[API ドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/#tracer-settings