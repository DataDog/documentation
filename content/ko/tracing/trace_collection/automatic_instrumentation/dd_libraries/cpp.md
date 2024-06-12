---
aliases:
- /ko/tracing/cpp/
- /ko/tracing/languages/cpp/
- /ko/agent/apm/cpp/
- /ko/tracing/setup/cpp
- /ko/tracing/setup_overview/cpp
- /ko/tracing/setup_overview/setup/cpp
- /ko/tracing/trace_collection/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: 소스 코드
  text: 소스 코드
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /tracing/
  tag: 설명서
  text: 고급 사용
kind: documentation
title: C++ 애플리케이션 추적하기
type: multi-code-lang
---

<div class="alert alert-warning">
  <strong>참고:</strong> C++는 자동 계측을 위한 통합을 제공하지 않습니다. 하지만 <a href="/tracing/setup/envoy/">Envoy</a> 및 <a href="/tracing/setup/nginx/">Nginx</a> 등 프록시 추적에서 사용됩니다.
</div>

## 호환성 요구 사항
C++ 추적 라이브러리는 빌드에 C++17 툴체인을 필요로 합니다. Datadog의 추적 라이브러리 호환성 요건과 프로세서 아키텍처 지원 전체 목록을 보려면 [호환성 요건][3] 페이지를 방문하세요.

## 시작하기
시작하기 전 이미 [에이전트를 설치하고 설정했는지 확인하세요][6].

## 애플리케이션 계측

`dd-trace-cpp` 테스트에 사용할 수 있는 예시 애플리케이션입니다.
이 애플리케이션은 기본 설정을 사용해 트레이서 인스턴스를 생성하고 두 개의 스팬에서 트레이스를 생성합니다. 이는 서비스 이름 `my-service`에서 보고됩니다.

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
# CMakeLists.txt

CPMAddPackage("gh:DataDog/dd-trace-cpp#0.2.1")

# `tracer_example` 대상 추가
add_executable(tracer_example tracer_example.cpp)

# `dd-trace-cpp`에 대한 고정 연결
# `dd-trace-cpp`에 대한 동적 연결을 하려면  `dd_trace::shared` 대상을 사용합니다.
target_link_libraries(tracer_example dd_trace::static)
````

다음 명령을 사용해 예시 빌드:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
CMake를 사용해 `dd-trace-cpp` 라이브러리를 C++ 프로젝트에 통합하려면, 이 단계를 따르세요.
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

# `tracer_example` 대상 추가
add_executable(tracer_example tracer_example.cpp)

# `dd-trace-cpp`에 대한 고정 연결
# 참고: `dd-trace-cpp`에 대해 동적 연결을 하려면  `dd_trace_cpp_shared` 대상을 사용합니다.
target_link_libraries(tracer_example dd_trace::static)
````

다음 명령을 사용해 예시 빌드:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "수동" %}}

`dd-trace-cpp` 라이브러리를 수동으로 다운로드하고 설치하려면 다음 Bash 스크립트를 실행하세요.
```bash
# "jq" 명령이 필요하며 다음을 통해 설치할 수 있습니다.
# 패키지 관리자:
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# GitHub에서 최신 릴리스 버전 번호를 얻습니다.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# dd-trace-cpp 라이브러리를 다운로드하고 설치합니다.
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# 올바른 dd-trace-cpp 버전을 다운로드하고 설치합니다.
# 프로젝트를 설정하고, 빌드하고, 설치합니다.
cmake -B build .
cmake --build build -j
cmake --install build
```

기본적으로, `cmake --install`은 공유 라이브러리와 공개 헤더를 적절한 시스템 디렉터리에 둡니다(예: `/usr/local/[...]`).
특정 위치에 설치하려면 대신 `cmake --install build --prefix <INSTALL_DIR>`을 사용합니다.

### 동적 연결
`libdd_trace_cpp.so`에 대한 연결, 공유 라이브러리가 `LD_LIBRARY_PATH`에 있는지 확인합니다. 

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## 설정

필요한 경우 추적 라이브러리를 설정하여 필요한 대로 애플리케이션 성능 텔레메트리 데이터를 전송합니다. 여기에는 통합 서비스 태깅 설정이 포함됩니다. 자세한 정보는 [라이브러리 설정][5]을 읽어보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /ko/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /ko/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /ko/tracing/trace_collection/library_config/cpp/
[6]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent