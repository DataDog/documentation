---
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: GitHub
  text: ソースコード
- link: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: GoDoc
  text: パッケージページ
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
kind: documentation
title: Go トレーシングライブラリの構成
type: multi-code-lang
---

[コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成し、Go インテグレーションをアクティブ化][6]した後、オプションで、必要に応じてトレーシングライブラリを構成してください。

Datadog では、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用して、サービスの `env`、`service`、`version` を設定することを推奨します。

これらの環境変数の構成方法に関する推奨事項は、[統合サービスタグ付け][1]のドキュメントをお読みください。これらの変数は、Go トレーサーのバージョン 1.24.0 以降で利用可能です。

トレーサーの API を通じて、`env`、`service`、`version` を指定することもできます。

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // トレーサーが停止すると、終了する前にトレーサー内のすべてのデータが Datadog Agent にフラッシュされます。
    // この行は主要な関数内に残すようにしてください。
    defer tracer.Stop()
}
```

Go トレーサーは、コンフィギュレーション用の追加の環境変数と関数をサポートしています。
[コンフィギュレーションドキュメント][2]で利用可能なすべてのオプションを参照してください。

`DD_VERSION`
: アプリケーションのバージョン (例: `1.2.3`、`6c44da20`、 `2020.02.13`) を設定します。

`DD_SERVICE`
: このアプリケーションで使用されるサービス名。

`DD_ENV`
: アプリケーションの環境を設定します。例: prod、pre-prod、staging

`DD_AGENT_HOST`
: **デフォルト**: `localhost` <br>
トレース送信のためのデフォルトのトレース Agent ホストアドレスをオーバーライドします。

`DD_TRACE_AGENT_PORT`
: **デフォルト**: `8126` <br>
Datadog トレース送信のためのデフォルトのトレース Agent ポートをオーバーライドします。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8125` <br>
DogStatsD メトリクス送信のためのデフォルトのトレース Agent ポートをオーバーライドします。

`DD_TRACE_SAMPLING_RULES`
: **デフォルト**: `nil`<br>
オブジェクトの JSON 配列。各オブジェクトは `"sample_rate"` を持たなければなりません。`"name"` と `"service"` フィールドは省略可能です。`"sample_rate"` の値は `0.0` と `1.0` の間でなければなりません (この値を含む)。ルールは、トレースのサンプルレートを決定するために設定された順序で適用されます。
詳しくは、[取り込みメカニズム][3]を参照してください。<br>
**例:**<br>
  - サンプルレートを 20% に設定: `'[{"sample_rate": 0.2}]'`
  - 'a' で始まるサービスとスパン名 'b' のサービスのサンプルレートを 10% に、それ以外のサービスのサンプルレートを 20% に設定: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`

`DD_TRACE_SAMPLE_RATE`
: インジェストレートコントロールを有効にします。

`DD_TRACE_RATE_LIMIT`
: 1 秒あたり、Go プロセスごとにサンプリングするスパンの最大数。DD_TRACE_SAMPLE_RATE が設定されている場合、デフォルトは 100 です。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TAGS`
: **デフォルト**: [] <br>
すべてのスパンとプロファイルに追加されるデフォルトタグのリスト。タグはカンマやスペースで区切ることができます。例えば、 `layer:api,team:intake` や `layer:api team:intake` などです。

`DD_TRACE_STARTUP_LOGS`
: **デフォルト**: `true` <br>
スタートアップコンフィグレーションと診断ログを有効にします。

`DD_TRACE_DEBUG`
: **デフォルト**: `false`<br>
トレーサーでデバッグロギングを有効化します。

`DD_TRACE_ENABLED`
: **デフォルト**: `true`<br>
Web フレームワークとライブラリインスツルメンテーションを有効にします。false の場合、アプリケーションコードはトレースを生成しません。

`DD_SERVICE_MAPPING`
: **デフォルト**: `null` <br>
構成により、サービス名を動的に変更することができます。サービス名はカンマやスペースで区切ることができ、例えば `mysql:mysql-service-name,postgres:postgres-service-name`、`mysql:mysql-service-name postgres:postgres-service-name` のようにすることができます。



## APM 環境名の構成

[APM 環境名][4]は、[Agent 内][5] またはトレーサーの [WithEnv][2] スタートオプションを使用して構成できます。

## B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][6]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。`Datadog` と `B3` の 2 つのスタイルがサポートされています。

- 環境変数 `DD_PROPAGATION_STYLE_INJECT=Datadog,B3` を用いて挿入スタイルを構成する
- 環境変数 `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3` を用いて抽出スタイルを構成する

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`Datadog` 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[3]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=go#pagetitle
[4]: /ja/tracing/advanced/setting_primary_tags_to_scope/#environment
[5]: /ja/getting_started/tracing/#environment-name
[6]: https://github.com/openzipkin/b3-propagation