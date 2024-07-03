---
further_reading:
- link: /tracing/trace_collection/dd_libraries/cpp/
  tag: Documentation
  text: Learn more about tracing applications with C++
title: Setting Up APM with C++
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

Download and install `dd-trace-cpp` library with:

```shell
wget https://github.com/DataDog/dd-trace-cpp/archive/v0.2.0.tar.gz -O dd-trace-cpp.tar.gz
```

If you get a rate limited message from GitHub, wait a few minutes and run the command again.

After downloading the `tar` file, unzip it:

```bash
tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
```

Finally, build and install the library:

```bash
cd dd-trace-cpp
cmake -B build .
cmake --build build -j
cmake --install build
```

## 簡単なアプリの作成

新しいファイルを `tracer_example.cpp` という名前で作成し、以下のコードを入力します。

```cpp
#include <datadog/tracer.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::tracing::TracerConfig tracer_config;
  tracer_config.service = "compiled-in example";

  const auto validated_config = dd::finalize_config(tracer_options);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};

  // Create some spans.
  {
    datadog::tracing::SpanConfig options;
    options.name = "A";
    options.tags.emplace("tag", "123");
    auto span_a = tracer.create_span(options);

    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

これで、親スパンである `span_a` と、子スパンである `span_b` の 2 つのスパンが生成され、タグ付けされます。

Then, compile and link against `libdd_trace_cpp` with:

```shell
g++ -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
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
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:0.2.0] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```

The service then shows up in the Service Catalog in Datadog.

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="APM Services ページ" >}}

サービスをクリックすると、トレースが表示されます。

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="APM トレース UI" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/cpp/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu