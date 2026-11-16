---
aliases:
- /ko/tracing/cpp/
- /ko/tracing/languages/cpp/
- /ko/agent/apm/cpp/
- /ko/tracing/setup/cpp
- /ko/tracing/setup_overview/cpp
- /ko/tracing/setup_overview/setup/cpp
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: 소스 코드
  text: 소스 코드
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
- link: /tracing/
  tag: 설명서
  text: 고급 사용
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: 학습 센터
  text: 애플리케이션용 APM SDK 구성 및 관리하기
title: C++ 애플리케이션 추적하기
type: multi-code-lang
---
<div class="alert alert-danger">
  <strong>참고:</strong> C++은 자동 계측을 위한 통합 기능을 제공하지 않지만, <a href="/tracing/setup/envoy/">Envoy</a> 및 <a href="/tracing/setup/nginx/">Nginx</a>와 같은 프록시 트레이싱에 사용됩니다.
</div>

## 호환성 요구 사항 {#compatibility-requirements}
C++ SDK를 빌드하려면 C++17 툴체인이 필요합니다. Datadog SDK 호환성 요구 사항 및 프로세서 아키텍처 지원에 대한 전체 목록은 [호환성 요구 사항][3] 페이지를 참조하세요.

## 시작 {#getting-started}
시작하기 전 이미 [Agent를 설치하고 설정했는지 확인하세요][6].

## 애플리케이션 계측{#instrument-your-application}

다음은 `dd-trace-cpp` 테스트에 사용할 수 있는 애플리케이션 예시입니다.
이 애플리케이션은 기본 설정으로 트레이서 인스턴스를 생성하고 두 개의 스팬으로 구성된 트레이스를 생성하며, 해당 트레이스는 서비스 이름 `my-service`로 보고됩니다.

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

[CPM.cmake][1]는 교차 플랫폼 CMake 스크립트로 CMake에 종속성 관리 기능을 추가합니다.

````CMake
# In a CMakeLists.txt 

CPMAddPackage("gh:DataDog/dd-trace-cpp#1.0.0")

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace::shared` target 
target_link_libraries(tracer_example dd_trace::static)
````

다음 명령을 사용해 예시 빌드:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
CMake를 사용하여 `dd-trace-cpp` 라이브러리를 C++ 프로젝트에 통합하려면 다음 단계를 따르세요.
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

다음 명령을 사용해 예시 빌드:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "수동" %}}

`dd-trace-cpp` 라이브러리를 수동으로 다운로드하고 설치하려면 다음 bash 스크립트를 실행합니다.

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

기본적으로 `cmake --install`은 공유 라이브러리와 공용 헤더를 적절한 시스템 디렉터리(예: `/usr/local/[...]`)에 배치합니다.
특정 위치에 설치하려면 대신 `cmake --install build --prefix <INSTALL_DIR>`을 사용하세요.

### 동적 연결 {#dynamic-linking}
`libdd-trace-cpp.so`에 링크하고 공유 라이브러리가 `LD_LIBRARY_PATH`에 있는지 확인하세요.

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd-trace-cpp
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## 구성 {#configuration}

필요한 경우 Unified Service Tagging 구성을 포함하여, SDK가 애플리케이션 성능 텔레메트리 데이터를 원하는 방식으로 전송하도록 구성하세요. 자세한 내용은 [라이브러리 구성][5]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /ko/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /ko/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /ko/tracing/trace_collection/library_config/cpp/
[6]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent