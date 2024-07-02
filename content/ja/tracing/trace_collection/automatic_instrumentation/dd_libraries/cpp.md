---
title: Tracing C++ Applications
kind: documentation
aliases:
- /tracing/cpp/
- /tracing/languages/cpp/
- /agent/apm/cpp/
- /tracing/setup/cpp
- /tracing/setup_overview/cpp
- /tracing/setup_overview/setup/cpp
- /tracing/trace_collection/dd_libraries/cpp
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: "https://github.com/DataDog/dd-trace-cpp"
  tag: ソースコード
  text: Source code
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources and traces
- link: /tracing/
  tag: ドキュメント
  text: Advanced Usage
---

<div class="alert alert-warning">
  <strong>Note:</strong> C++ does not provide integrations for automatic instrumentation, but it's used by Proxy tracing such as <a href="/tracing/setup/envoy/">Envoy</a> and <a href="/tracing/setup/nginx/">Nginx</a>.
</div>

## Compatibility requirements
The C++ tracing library requires C++17 toolchain to build. For a full list of Datadog's tracing library compatiblity requirements and processor architecture support, visit the [Compatibility Requirements][3] page.

## Getting started
Before you begin, make sure you have already [installed and configured the Agent][6].

## Instrument your application

Here is an example application that can be used for testing `dd-trace-cpp`.
This application creates a tracer instance with the default settings and generates a trace with two spans, which is reported under the service name `my-service`.

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

[CPM.cmake][1] is a cross-platform CMake script that adds dependency management capabilities to CMake.

````CMake
# In a CMakeLists.txt

CPMAddPackage("gh:DataDog/dd-trace-cpp#0.2.1")

# Add `tracer_example` target
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp`
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace::shared` target
target_link_libraries(tracer_example dd_trace::static)
````

Build the example using the following commands:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
To integrate the `dd-trace-cpp` library into your C++ project using CMake, follow these steps:
````CMake
include(FetchContent)

FetchContent_Declare(
  dd-trace-cpp
  GIT_REPOSITORY https://github.com/DataDog/dd-trace-cpp
  GIT_TAG        v0.2.0
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

Build the example using the following commands:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "手動" %}}

To manually download and install the `dd-trace-cpp` library, run the following bash script:
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

By default, `cmake --install` places the shared library and public headers into the appropriate system directories (for example, `/usr/local/[...]`).
To install them in a specific location, use `cmake --install build --prefix <INSTALL_DIR>` instead.

### Dynamic Linking
Link against `libdd_trace_cpp.so`, making sure the shared library is in `LD_LIBRARY_PATH`.

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /tracing/trace_collection/library_config/cpp/
[6]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
