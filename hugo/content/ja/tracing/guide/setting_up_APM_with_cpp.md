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

以下のコマンドで `dd-trace-cpp` ライブラリをダウンロードしてインストールします。

```shell
wget https://github.com/DataDog/dd-trace-cpp/archive/v0.2.0.tar.gz -O dd-trace-cpp.tar.gz
```

GitHub からレート制限のメッセージが表示された場合は、数分待ってからもう一度コマンドを実行してください。

`tar` ファイルをダウンロードした後、解凍します。

```bash
tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
```

最後に、以下のコマンドでライブラリをビルドしてインストールします。

```bash
cd dd-trace-cpp
cmake -B build .
cmake --build build -j
cmake --install build
```

## 簡単なアプリの作成

新しいファイルを `tracer_example.cpp` という名前で作成し、以下のコードを入力します。

```cpp
#<datadog/tracer.h> を含めます
#<iostream> を含めます
#<string> を含めます

int main(int argc, char* argv[]) {
  datadog::tracing::TracerConfig tracer_config;
  tracer_config.service = "compiled-in example";

  const auto validated_config = dd::finalize_config(tracer_options);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};

  // いくつかのスパンを作成します。
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

次に、コンパイルして `libdd_trace_cpp` に対してリンクします。

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

その後、サービスは Datadog のサービスカタログに表示されます。

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="APM Services ページ" >}}

サービスをクリックすると、トレースが表示されます。

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="APM トレース UI" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/cpp/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu