---
title: C++ アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/cpp/
  - /ja/tracing/languages/cpp/
  - /ja/agent/apm/cpp/
  - /ja/tracing/setup/cpp
  - /ja/tracing/setup_overview/cpp
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Github
    text: ソースコード
  - link: /tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: /tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
---
**注**: C++ は OOTB インスツルメンテーションのインテグレーションを提供しません。[Envoy][1] や [Nginx][2] などの プロキシのトレースに C++ を使用します。C++ トレーサーの互換性要件については、[互換性要件][3]ページをご覧ください。

## はじめに

すでに Datadog アカウントをお持ちの場合は、ホストベースまたはコンテナベースのセットアップ向けのアプリ内ガイドで[詳細な手順][4]をご確認いただけます。

それ以外の場合、どの言語で作成されたアプリケーションをトレースする場合でも、最初に [Datadog Agent をインストールして構成][5]する必要があります。

[OpenTracing-cpp][6] に対してコンパイルする。

## インストール

Datadog トレースを使用するには、次の 2 つの方法があります。

* dd-opentracing-cpp に対してコンパイルし、Datadog ライブラリを含めてコードで構成する
* ダイナミックローディングを使用し、Datadog OpenTracing ライブラリを実行時に読み込んで JSON で構成する

### dd-opentracing-cpp に対してコンパイルする

```bash
# Gets the latest release version number from Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Download and install dd-opentracing-cpp library.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
mkdir -p dd-opentracing-cpp/.build
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
cd dd-opentracing-cpp/.build
# Download and install the correct version of opentracing-cpp, & other deps.
../scripts/install_dependencies.sh
cmake ..
make
make install
```

`<datadog/opentracing.h>` を含めてトレーサーを作成します。

```cpp
// tracer_example.cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // スパンをいくつか作成する。
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

`libdd_opentracing` と `libopentracing` に対してリンクを作成し、その両方を `LD_LIBRARY_PATH` に含めます。

```bash
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

### ダイナミックローディング

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
OPENTRACING_VERSION="v1.5.1"
# OpenTracing-cpp をダウンロードしてインストール
wget https://github.com/opentracing/opentracing-cpp/archive/${OPENTRACING_VERSION}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# dd-opentracing-cpp 共有プラグインをインストール。
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

`<opentracing/dynamic_load.h>` を含めて、`libdd_opentracing_plugin.so` からトレーサーを読み込みます。

```cpp
// tracer_example.cpp
#include <opentracing/dynamic_load.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  // トレーサーライブラリを読み込む。
  std::string error_message;
  auto handle_maybe = opentracing::DynamicallyLoadTracingLibrary(
      "/usr/local/lib/libdd_opentracing_plugin.so", error_message);
  if (!handle_maybe) {
    std::cerr << "Failed to load tracer library " << error_message << "\n";
    return 1;
  }

  // トレーサーのコンフィギュレーションを読み込む。
  std::string tracer_config = R"({
      "service": "dynamic-load example",
      "agent_host": "localhost",
      "agent_port": 8126
    })";

  // トレーサーをコンストラクトする。
  auto& tracer_factory = handle_maybe->tracer_factory();
  auto tracer_maybe = tracer_factory.MakeTracer(tracer_config.c_str(), error_message);
  if (!tracer_maybe) {
    std::cerr << "Failed to create tracer " << error_message << "\n";
    return 1;
  }
  auto& tracer = *tracer_maybe;

  // スパンをいくつか作成する。
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

`libopentracing` に対してリンクを作成し、`libopentracing.so` を `LD_LIBRARY_PATH` に含めます。

```bash
g++ -std=c++11 -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

**Note**: C++ 11 以降の OpenTracing が必要です。

## APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メインの [`datadog.yaml` コンフィギュレーションファイル][1]で `apm_non_local_traffic: true` を設定します

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

Unix ドメインソケットを使用して Agent を接続するには、代わりに `DD_TRACE_AGENT_URL` を使用する必要があります。この値は Agent の `DD_APM_RECEIVER_SOCKET` の値と一致する必要があります。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Services Extension][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

### 環境変数

| 変数 | バージョン | デフォルト | 注 |
|----------|---------|---------|------|
| `DD_AGENT_HOST` | v0.3.6 | `localhost` | トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。 |
| `DD_TRACE_AGENT_PORT` | v0.3.6 | `8126` | トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。 |
| `DD_TRACE_AGENT_URL` | v1.1.4 | | トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。この URL は http、https、unix のアドレススキームをサポートしています。 |
| `DD_ENV` | v1.0.0 | | 指定された場合、特定の値を持つ `env` タグを生成されたすべてのスパンに追加します。 |
| `DD_SERVICE` | v1.1.4 | | 指定された場合、デフォルトのサービス名を設定します。指定しない場合、TracerOptions または JSON コンフィギュレーション経由でサービス名を設定する必要があります。 |
| `DD_TRACE_ANALYTICS_ENABLED` | v1.1.3 | `false` | アプリケーションに対して App Analytics をグローバルに有効化します。 |
| `DD_TRACE_ANALYTICS_SAMPLE_RATE` | v1.1.3 | | App Analytics のサンプリングレートを設定します。設定時に `DD_TRACE_ANALYTICS_ENABLED` をオーバーライドします。`0.0`〜`1.0` の浮動小数点数となります。 |
| `DD_TRACE_SAMPLING_RULES` | v1.1.4 | `[{"sample_rate": 1.0}]` | JSON のオブジェクト配列です。各オブジェクトの "sample_rate" フィールドは必須となります。"name" および "service" フィールドは任意項目です。"sample_rate" の値は 0.0 ～ 1.0 (それぞれの値を含む) の間でなければなりません。構成された順に、トレースのサンプルレートを決定するためのルールが適用されます。 |
| `DD_VERSION` | v1.1.4 | | 指定された場合、特定の値を持つ `version` タグを生成されたすべてのスパンに追加します。 |
| `DD_TAGS` | v1.1.4 | | 指定された場合、生成されたすべてのスパンにタグを追加します。`key:value` ペアのカンマ区切りリストとなります。 |
| `DD_PROPAGATION_STYLE_INJECT` | v0.4.1 | `Datadog` | トレーシングヘッダーの挿入時に使用する伝搬のスタイルです。`Datadog`、`B3`、または `Datadog B3` となります。 |
| `DD_PROPAGATION_STYLE_EXTRACT` | v0.4.1 | `Datadog` | トレーシングヘッダーの抽出時に使用する伝搬のスタイルです。`Datadog`、`B3`、または `Datadog B3` となります。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/envoy/
[2]: /ja/tracing/setup/nginx/
[3]: /ja/tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/docs
[5]: /ja/tracing/send_traces/
[6]: https://github.com/opentracing/opentracing-cpp
