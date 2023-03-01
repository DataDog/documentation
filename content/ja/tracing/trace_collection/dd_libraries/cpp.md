---
aliases:
- /ja/tracing/cpp/
- /ja/tracing/languages/cpp/
- /ja/agent/apm/cpp/
- /ja/tracing/setup/cpp
- /ja/tracing/setup_overview/cpp
- /ja/tracing/setup_overview/setup/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: Github
  text: ソースコード
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: /tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: C++ アプリケーションのトレース
type: multi-code-lang
---
**注**: C++ は OOTB インスツルメンテーションのインテグレーションを提供しません。[Envoy][1] や [Nginx][2] などの プロキシのトレースに C++ を使用します。C++ トレーサーの互換性要件については、[互換性要件][3]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][4]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中にトレースの 100% の取り込み、およびトレース ID 挿入などの機能を有効にします。

## APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. トレースクライアントは、デフォルトでは `localhost:8126` にトレースを送信します。これが Agent の正しいホストとポートでない場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` 環境変数を設定してください。

Unix Domain Socket を使用して Agent に接続するには、代わりに `DD_TRACE_AGENT_URL` を使用します。Agent の `DD_APM_RECEIVER_SOCKET` の値と同じ値に設定します。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3] など、他の環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

## アプリケーションをインスツルメントする

Agent のインストールが完了したら、以下の 2 つの手順のいずれかで Datadog のトレーシングライブラリを C++ アプリケーションに追加します。

* dd-opentracing-cpp に対してコンパイルし、Datadog ライブラリを含めてコードで構成する
* ダイナミックローディングを使用し、Datadog OpenTracing ライブラリを実行時に読み込んで JSON で構成する

### dd-opentracing-cpp に対してコンパイルする

```bash
# GitHub から最新のリリースバージョン番号を取得します。
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# dd-opentracing-cpp ライブラリをダウンロードし、インストールします。
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
mkdir -p dd-opentracing-cpp/.build
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
cd dd-opentracing-cpp/.build
# 正しいバージョンの opentracing-cpp およびその他の deps をダウンロードし、インストールします。
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

### 動的な読み込み

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
OPENTRACING_VERSION="$(get_latest_release opentracing/opentracing-cpp)"
# Download and install OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/${OPENTRACING_VERSION}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# Install dd-opentracing-cpp shared plugin.
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

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/envoy/
[2]: /ja/tracing/setup/nginx/
[3]: /ja/tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /ja/tracing/trace_collection/library_config/cpp/