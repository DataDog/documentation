---
further_reading:
- link: /tracing/trace_collection/dd_libraries/cpp/
  tag: ドキュメント
  text: C++ によるトレースアプリケーションの詳細
title: C++ による APM の設定
---

## 概要

このガイドは、[C++ APM ドキュメント][1]の内容を拡張したものです。C++ による簡単な APM アプリを、トラブルシューティングの目的で VM にセットアップする方法について、手順を追って説明します。

## ボックスをセットアップする

### 基本の環境

最初に、新しい `ubuntu/jammy64` Vagrant ボックスをスピンアップし、それに対して `ssh` を実行します。

```bash
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

次に、[UI の指示][2]に従って Agent をインストールします。

### C++ の準備

`g++` と `cmake` をインストールします。

```shell
sudo apt-get update
sudo apt-get -y install g++ cmake
```

この 2 行を実行すると、最新バージョンの C++ を入手できます。

```cpp
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
```

GitHub からレート制限のメッセージが表示された場合は、数分間待ってからもう一度コマンドを実行してください。アップデートが完了したら、正しく実行されたことを C++ のバージョンをチェックして確認します。

```shell
echo $DD_OPENTRACING_CPP_VERSION
```

次に、`dd-opentracing-cpp` ライブラリをダウンロードしてインストールします。

```shell
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
```

`tar` ファイルをダウンロードしたら、ライブラリ用に新しいディレクトリと `.build` ファイルを作成します。

```shell
mkdir -p dd-opentracing-cpp/.build
```

続いて、ファイルを解凍します。

```bash
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
```

ライブラリのコンテンツリストがコンソールに表示されます。

```shell
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx.conf
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx_integration_test.sh
```

次に、`.build` ディレクトリに移動します。

```shell
cd dd-opentracing-cpp/.build
```

最後に、依存関係をインストールします。

```bash
sudo ../scripts/install_dependencies.sh
cmake ..
make
sudo make install
```

## 簡単なアプリの作成

新しいファイルを `tracer_example.cpp` という名前で作成し、以下のコードを入力します。

```cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // スパンを作成する。
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

これで、親スパンである `span_a` と、子スパンである `span_b` の 2 つのスパンが生成され、タグ付けされます。

次に、`libdd_opentracing` と `libopentracing` に対してリンクを作成します。

```shell
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
```

最後に、アプリを実行します。

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

## トレースの送信

これでアプリが作成されたので、トレースの送信を開始して、トレース Agent の動作を確認できます。

最初に、トレース Agent のログを追跡します。

```shell
tail -f /var/log/datadog/trace-agent.log
```

次に、新しいタブを開いて、サンプルアプリを数回実行します。

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

トレース Agent タブに、次のように表示されます。

```text
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:v1.0.1] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```

その後、そのサービスは Datadog のサービスカタログに表示されます。

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="APM Services ページ" >}}

サービスをクリックすると、トレースが表示されます。

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="APM トレース UI" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/cpp/#compile-against-dd-opentracing-cpp
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu