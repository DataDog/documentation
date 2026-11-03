---
aliases:
- /ja/tracing/cpp/
- /ja/tracing/languages/cpp/
- /ja/agent/apm/cpp/
- /ja/tracing/setup/cpp
- /ja/tracing/setup_overview/cpp
- /ja/tracing/setup_overview/setup/cpp
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/cpp
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
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: ラーニングセンター
  text: アプリケーションの APM SDK を構成および管理します。
title: C++ アプリケーションのトレース
type: multi-code-lang
---
<div class="alert alert-danger">
  <strong>注:</strong> C++ は自動インスツルメンテーションのインテグレーションを提供しません。<a href="/tracing/setup/envoy/">Envoy</a> や <a href="/tracing/setup/nginx/">Nginx</a> などのプロキシのトレースに C++ を使用します。
</div>

## 互換性要件 {#compatibility-requirements}
C++ SDK をビルドするには、C++17 ツールチェーンが必要です。Datadog SDK の互換性要件とプロセッサアーキテクチャのサポートのリストについては、[互換性要件][3] ページを参照してください。

## はじめに {#getting-started}
作業を始める前に、[Agent のインストールと構成][6]が済んでいることを確認してください。

## アプリケーションをインスツルメンテーションしてください{#instrument-your-application}

テストに使用できるサンプルアプリケーションを以下に示します `dd-trace-cpp`。
このアプリケーションは、デフォルト設定でトレーサーインスタンスを作成し、2 つのスパンを持つトレースを生成します。これはサービス名 `my-service` の下でレポートされます。

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
  // Create some spans.
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
# In a CMakeLists.txt 

CPMAddPackage("gh:DataDog/dd-trace-cpp#1.0.0")

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace::shared` target 
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
CMake を使用して `dd-trace-cpp` ライブラリを C++ プロジェクトにインテグレーションするには、以下の手順に従ってください。
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

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace_cpp_shared` target 
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
# Requires the "jq" command, which can be installed via
# the package manager:
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# Gets the latest release version number from GitHub.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# Download and install dd-trace-cpp library.
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# Download and install the correct version of dd-trace-cpp.
# Configure the project, build it, and install it.
cmake -B build .
cmake --build build -j
cmake --install build
```

デフォルトでは、`cmake --install` は共有ライブラリとパブリックヘッダーを適切なシステムディレクトリ (例: `/usr/local/[...]`) に配置します。
特定の場所にインストールするには、代わりに `cmake --install build --prefix <INSTALL_DIR>` を使用してください。

### ダイナミックリンク {#dynamic-linking}
`libdd-trace-cpp.so` に対してリンクし、共有ライブラリが `LD_LIBRARY_PATH` にあることを確認してください。

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd-trace-cpp
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## 構成 {#configuration}

必要に応じて、Unified Service Tagging の設定など、アプリケーションパフォーマンスのテレメトリデータを送信するための SDK を構成します。詳細については、[ライブラリの構成][5] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /ja/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /ja/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /ja/tracing/trace_collection/library_config/cpp/
[6]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent