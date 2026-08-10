---
aliases:
- /ja/tracing/cpp/
- /ja/tracing/languages/cpp/
- /ja/agent/apm/cpp/
- /ja/tracing/setup/cpp
- /ja/tracing/setup_overview/cpp
- /ja/tracing/setup_overview/setup/cpp
- /ja/tracing/trace_collection/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: ソースコード
  text: ソースコード
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: /tracing/
  tag: ドキュメント
  text: 高度な使用方法
title: C++ アプリケーションのトレース
type: multi-code-lang
---

<div class="alert alert-danger">
<strong>注:</strong> C++ は自動インスツルメンテーションのインテグレーションを提供していませんが、<a href="/tracing/setup/envoy/">Envoy</a> や <a href="/tracing/setup/nginx/">Nginx</a> などの Proxy トレースで使用されています。
</div>

## 互換性要件
C++ トレーシングライブラリのビルドには、C++17 ツールチェーンが必要です。Datadog のトレーシングライブラリの互換性要件とプロセッサアーキテクチャのサポートについては、[互換性要件][3]ページを参照してください。

## はじめに
作業を始める前に、[Agent のインストールと構成][6]が済んでいることを確認してください。

## アプリケーションをインスツルメントする

以下は `dd-trace-cpp` のテストに使用できるアプリケーションの例です。
このアプリケーションはデフォルトの設定でトレーサーインスタンスを作成し、2 スパンのトレースを生成します。このトレースは `my-service` というサービス名の下で報告されます。

```cpp
// tracer_example.cpp
#include <datadog/span_config.h>
#include <datadog/tracer.h>
#include <datadog/tracer_config.h>

#include <iostream>
#include <string>

namespace dd = datadog::tracing;

int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  const auto validated_config = dd::finalize_config(config);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};
  // いくつかのスパンを作成します。
  {
    auto span_a = tracer.create_span();
    span_a.set_name("A");
    span_a.set_tag("tag", "123");
    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

{{< tabs >}}

{{% tab "CPM" %}}

[CPM.cmake][1] はクロスプラットフォームの CMake スクリプトで、CMake に依存関係管理機能を追加します。

````CMake
# CMakeLists.txt に

CPMAddPackage("gh:DataDog/dd-trace-cpp#1.0.0")

# `tracer_example` ターゲットを追加します
add_executable(tracer_example tracer_example.cpp)

# `dd-trace-cpp` に対して静的にリンクします
# 注: `dd-trace-cpp` に対して動的にリンクするには `dd_trace::shared` ターゲットを使用してください
target_link_libraries(tracer_example dd_trace::static)
````

以下のコマンドを使用してサンプルをビルドします。

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
CMake を使用して C++ プロジェクトに `dd-trace-cpp` ライブラリをインテグレーションするには、以下の手順に従ってください。
````CMake
include(FetchContent)

FetchContent_Declare(
  dd-trace-cpp
  GIT_REPOSITORY https://github.com/DataDog/dd-trace-cpp
  GIT_TAG        v1.0.0
  GIT_SHALLOW    ON
  GIT_PROGRESS   ON
)

FetchContent_MakeAvailable(dd-trace-cpp)

# `tracer_example` ターゲットを追加します
add_executable(tracer_example tracer_example.cpp)

# `dd-trace-cpp` に対して静的にリンクします
# 注: `dd-trace-cpp` に対して動的にリンクするには `dd_trace_cpp_shared` ターゲットを使用してください
target_link_libraries(tracer_example dd_trace::static)
````

以下のコマンドを使用してサンプルをビルドします。

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "手動" %}}

手動で `dd-trace-cpp` ライブラリをダウンロードしてインストールするには、以下の bash スクリプトを実行してください。
```bash
# "jq" コマンドが必要です。これはパッケージマネージャーを
# 通じてインストールできます。
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# GitHub から最新のリリースバージョン番号を取得します。
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# dd-trace-cpp ライブラリをダウンロードしてインストールします。
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# 正しいバージョンの dd-trace-cpp をダウンロードしてインストールします。
# プロジェクトの構成、ビルド、インストールを行います。
cmake -B build .
cmake --build build -j
cmake --install build
```

デフォルトでは、`cmake --install` は共有ライブラリとパブリックヘッダーを適切なシステムディレクトリ (例えば `/usr/local/[...]`) に配置します。
特定の場所にインストールするには、代わりに `cmake --install build --prefix <INSTALL_DIR>` を使用してください。

### 動的リンク
`libdd_trace_cpp.so` にリンクし、共有ライブラリが `LD_LIBRARY_PATH` にあることを確認します。

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /ja/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /ja/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /ja/tracing/trace_collection/library_config/cpp/
[6]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent