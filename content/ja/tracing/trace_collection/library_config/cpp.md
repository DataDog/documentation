---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: Github
  text: ソースコード
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
kind: documentation
title: C++ トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。
## 環境変数

`DD_AGENT_HOST` 
: **バージョン**: v0.3.6 <br>
**デフォルト**: `localhost` <br>
トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。

`DD_TRACE_AGENT_PORT` 
: **バージョン**: v0.3.6 <br>
**デフォルト**: `8126` <br>
トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。

`DD_TRACE_AGENT_URL` 
: **バージョン**: v1.1.4 <br>
トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。この URL は http、https、unix のアドレススキームをサポートしています。

`DD_ENV` 
: **バージョン**: v1.0.0 <br>
指定された場合、特定の値を持つ `env` タグを生成されたすべてのスパンに追加します。

`DD_SERVICE` 
: **バージョン**: v1.1.4 <br>
指定された場合、デフォルトのサービス名を設定します。指定しない場合、TracerOptions または JSON コンフィギュレーション経由でサービス名を設定する必要があります。

`DD_TRACE_ANALYTICS_ENABLED` 
: ***非推奨*** <br>
**デフォルト**: `false` <br>
アプリケーションに対して App Analytics をグローバルに有効化します。

`DD_TRACE_ANALYTICS_SAMPLE_RATE` 
: ****非推奨*** <br>
App Analytics のサンプリングレートを設定します。設定時に `DD_TRACE_ANALYTICS_ENABLED` をオーバーライドします。`0.0`〜`1.0` の浮動小数点数となります。

`DD_TRACE_SAMPLING_RULES` 
: **バージョン**: v1.1.4 <br>
**デフォルト**: `[{"sample_rate": 1.0}]` <br>
JSON のオブジェクト配列です。各オブジェクトの `sample_rate` フィールドは必須となります。`name` および `service` フィールドは任意項目です。`sample_rate` の値は 0.0 ～ 1.0 (それぞれの値を含む) の間でなければなりません。構成された順に、トレースのサンプルレートを決定するためのルールが適用されます。

`DD_SPAN_SAMPLING_RULES`
: **バージョン**: v1.3.3 <br>
**デフォルト**: `nil`<br>
オブジェクトの JSON 配列。ルールは、スパンのサンプルレートを決定するために構成された順序で適用されます。`sample_rate` の値は 0.0 から 1.0 の間でなければなりません (この値を含む)。
詳細は、[取り込みメカニズム][2]を参照してください。<br>
**例:**<br>
  - サービス名 `my-service` と演算子名 `http.request` のスパンサンプリングレートを 50% に設定し、1 秒間に最大 50 トレースします: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_VERSION` 
: **バージョン**: v1.1.4 <br>
指定された場合、特定の値を持つ `version` タグを生成されたすべてのスパンに追加します。

`DD_TAGS` 
: **バージョン**: v1.1.4 <br>
指定された場合、生成されたすべてのスパンにタグを追加します。`key:value` ペアのカンマ区切りリストとなります。

`DD_PROPAGATION_STYLE_INJECT` 
: **バージョン**: v0.4.1 <br>
**デフォルト**: `Datadog` <br>
トレーシングヘッダーの挿入時に使用する伝搬のスタイルです。`Datadog`、`B3`、または `Datadog B3` となります。

`DD_PROPAGATION_STYLE_EXTRACT` 
: **バージョン**: v0.4.1 <br>
**デフォルト**: `Datadog` <br>
トレーシングヘッダーの抽出時に使用する伝搬のスタイルです。`Datadog`、`B3`、または `Datadog B3` となります。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/