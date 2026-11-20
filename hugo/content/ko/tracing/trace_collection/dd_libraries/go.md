---
aliases:
- /ko/tracing/go/
- /ko/tracing/languages/go
- /ko/agent/apm/go/
- /ko/tracing/setup/go
- /ko/tracing/setup_overview/go
- /ko/tracing/setup_overview/setup/go
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: 소스 코드
  text: SDK 소스 코드
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: 외부 사이트
  text: SDK API 설명서
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: 외부 사이트
  text: v2용 SDK API 설명서
- link: https://github.com/DataDog/orchestrion
  tag: 소스 코드
  text: Orchestrion 소스 코드
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
title: Go 애플리케이션 추적하기
type: multi-code-lang
---
## 호환성 요구 사항 {#compatibility-requirements}

Go Tracer에는 Go `1.18+` 및 Datadog Agent `>= 5.21.1`이 필요합니다. Datadog의 Go 버전 및 프레임워크 지원(레거시 및 유지 관리 버전 포함) 전체 목록은 [호환성 요구 사항][1] 페이지를 참조하세요

{{% tracing-go-v2 %}}

## 시작하기 {#getting-started}

시작하기 전에 먼저 [Agent를 설치하고 구성][5]했는지 확인하세요.

Go 애플리케이션을 계측하는 방법은 다음과 같은 2가지입니다.

1. **컴파일 시간 계측**:
   - 트레이싱 계측의 최대 커버리지를 보장합니다.
   - 소스 코드를 수정할 필요가 없어 CI/CD 수준에서 통합하는 데 이상적입니다.
1. **수동 계측**:

   dd-trace-go를 Datadog의 통합 패키지와 함께 사용하여 사용자가 선택한 라이브러리에 관한 스팬을 자동으로 생성합니다. 이 옵션의 특징:
   - 애플리케이션의 어느 부분을 추적할지 사용자에게 전적인 통제권을 부여합니다.
   - 애플리케이션의 소스 코드를 수정해야 합니다.

아래에서 각 기본 설정에 해당하는 섹션의 지침을 참조하세요.

{{< tabs >}}

{{% tab "컴파일 시간 계측" %}}

### 개요 {#overview}

[Orchestrion][6]은 컴파일 중에 Go 애플리케이션에 자동으로 계측을 추가하여 코드를 변경할 필요가 없습니다. 이렇게 하면 포괄적인 트레이싱 커버리지가 제공되고 독점 보안 기능이 활성화됩니다.

- 포괄적인 트레이싱 커버리지:
   - Go 표준 라이브러리를 포함해 코드 및 모든 종속성 계측
   - 컴파일 중에 코드를 계측하여 간과된 수동 계측으로 인한 트레이싱 커버리지 빈틈 방지
- 독점적 [App and API Protection][7] **Exploit Prevention** 기능. [Exploit Prevention][15]은 Runtime Application Self-Protection(RASP) 구현이며 Local File Inclusion(LFI)과 같은 RASP 방법을 포함합니다.

### 요구 사항 {#requirements}

- 최신 Go 런타임 릴리스 두 개를 지원합니다([Go의 공식 릴리스 정책][8]과 일치).
- 애플리케이션을 [go 모듈][10]을 사용하여 관리해야 합니다. 모듈 벤더링이 지원됩니다.


### Orchestrion 설치 {#install-orchestrion}

Orchestrion을 설치하고 설정하는 방법:

1. Orchestrion 설치:
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info"> <code>$(go env GOBIN)</code> 또는 <code>$(go env GOPATH)/bin</code> 이 <code>$PATH</code>에 있어야 합니다.</div>

1. 프로젝트의 `go.mod`에 Orchestrion 등록:
   ```sh
   orchestrion pin
   ```
   사용 가능한 사용자 지정 옵션에 관한 자세한 정보는 `orchestrion pin -help` 출력을 참조하세요.
1. 버전 관리 시스템에 변경 사항 커밋(단, `orchestrion`을 CI/CD 파이프라인에 직접 통합하는 경우는 예외):
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
   ```

   이제 `orchestrion`에서 다른 모든 종속성과 마찬가지로 `go.mod` 파일을 사용하여 종속성을 관리할 수 있습니다.

### 사용량 {#usage}

다음 중 한 가지 방법을 사용하여 빌드 프로세스에서 Orchestrion 활성화:

#### 평소 사용하는 `go` 명령 앞에 `orchestrion` 추가: {#prepend-orchestrion-to-your-usual-go-commands}
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### `go` 명령에 `-toolexec="orchestrion toolexec"` 인수 추가: {#add-the-toolexecorchestrion-toolexec-argument-to-your-go-commands}
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### `$GOFLAGS` 환경 변수를 수정하여 Orchestrion을 주입하고, 평소처럼 `go` 명령 사용: {#modify-the-goflags-environment-variable-to-inject-orchestrion-and-use-go-commands-normally}
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

### 트레이스 사용자 지정 {#trace-customization}

#### Unified Service Tagging 설정 {#setting-up-unified-service-tagging}

`orchestrion`으로 계측한 애플리케이션은 Unified Service Tagging(UST)을 지원합니다. 애플리케이션의 **런타임** 환경에서 해당하는 환경 변수를 설정하여 트레이스에 UST 태그를 설정할 수 있습니다.

| Unified Tag | 환경  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

자세한 내용은 [Unified Service Tagging 설명서][14]를 참조하세요.

#### 트레이서 구성 {#tracer-configuration}

구성 지침은 [라이브러리 구성][16]을 참조하세요.

#### 사용자 지정 트레이스 스팬 생성 {#create-custom-trace-spans}

사용자 지정 트레이스 스팬은 `//dd:span` 지시문 코멘트로 어노테이션된 모든 함수에 대하여 자동으로 생성할 수 있습니다.

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
  // ... implementation details ...
}
{{</code-block>}}

이것은 함수 리터럴 표현식에도 사용할 수 있습니다.

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### 작업 이름 {#operation-name}

작업의 이름(`span.name`)은 다음 우선순위를 사용하여 자동으로 결정됩니다.
1. 지시문 인수로 지정된 명시적 `span.name:customOperationName` 태그
2. 함수의 선언된 이름(이것은 함수 리터럴 표현식(익명)에는 해당하지 않음)
3. 지시문 인수 목록에 제공된 첫 번째 태그의 값

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This function will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This function will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

#### 오류 결과 {#error-results}

어노테이션된 함수가 `error` 결과를 반환하는 경우, 해당 함수가 반환한 모든 오류가 자동으로 상응하는 트레이스 스팬에 연결됩니다.

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### 일부 코드의 계측 방지 {#prevent-instrumentation-of-some-code}

`//orchestrion:ignore` 지시문을 사용하여 `orchestrion`이 어노테이션된 코드에서 _아무런_ 수정도 수행하지 못하도록 방지할 수 있습니다.

이렇게 하면 호출자 측 계측이 특정 위치에 적용되지 않도록 방지할 수 있습니다.

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// Caller-side instrumentation normally happens within this function...
func normal() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as it is opted out by the orchestrion:ignore directive:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// Caller-side instrumentation will NOT happen in the following function
// as it is annotated with orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as the surrounding context is excluded by an
  // orchestrion:ignore directive:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

`orchestrion`이 수행하는 계측 중 일부는 피호출자 측(또는 라이브러리 측)에서 수행되는데, 이는 통합이 종속성 자체 내에 직접 추가된다는 의미입니다. 이런 경우에는 해당 통합에서 로컬로 옵트아웃할 수 없습니다.

#### SDK 사용 {#use-the-sdk}

Orchestrion으로 빌드한 애플리케이션에서 [SDK][4]를 사용할 수 있습니다. 이것은 Orchestrion으로 아직 지원되지 않는 프레임워크를 계측하는 데 유용합니다. 단, 이렇게 하면 Orchestrion 지원이 확장됨에 따라 향후 트레이스 스팬이 중복될 가능성이 있다는 점을 유의해야 합니다. `orchestrion` 종속성을 업데이트할 때 [릴리스 노트][11]를 검토하여 새 기능에 관한 최신 정보를 접하고 필요에 따라 수동 계측을 조정하세요.

#### Continuous Profiler 사용 {#use-the-continuous-profiler}

Orchestrion으로 빌드한 애플리케이션에는 [Continuous Profiler][12] 계측이 포함되어 있습니다.
프로파일러를 활성화하려면 런타임에 `DD_PROFILING_ENABLED=true` 환경 변수를 설정하세요.

#### 통합 제거 {#remove-integrations}

`orchestrion.tool.go` 파일에서 가져오기를 수정하여 통합을 제거할 수 있습니다.
`orchestrion`을 실행하기 전에 자체적으로 `orchestrion.tool.go` 파일을 생성할 수도 있습니다.
이 작업은 통합을 원하지 않는 경우,
또는 프로그램이 사용하지 않는 통합의 전이 종속성 수를 줄이고자 하는 경우에 할 수 있습니다.
기본적으로 Orchestrion은 `github.com/DataDog/dd-trace-go/orchestrion/all/v2`를 가져오며,
이것은 Orchestrion 통합이 있는 모든 라이브러리를 가져옵니다.
이 가져오기 대신 사용하려는 통합만 가져오기를 사용할 수 있습니다.
지원되는 통합 목록은 [SDK 소스 코드][17]를 참조하세요.

**참고**: 특정 통합을 가져오기로 하는 경우, 새 통합을 추가하고자 할 때마다 `orchestrion.tool.go`를 수동으로 업데이트해야 합니다.

### Docker를 사용해 빌드하기 {#building-with-docker}

적합한 Docker 이미지를 생성하는 방법에 관한 자세한 내용은 [Go의 APM을 위한 Dockerfile 생성][18]을 참조하세요.

### 문제 해결 {#troubleshooting}

`orchestrion`이 관리하는 빌드 문제를 해결하려면 [Go 컴파일 시간 계측 문제 해결][13]을 참조하세요.

[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /ko/security/application_security/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /ko/profiler
[13]: /ko/tracing/troubleshooting/go_compile_time/
[14]: /ko/getting_started/tagging/unified_service_tagging/
[15]: /ko/security/application_security/exploit-prevention/
[16]: /ko/tracing/trace_collection/library_config/go/#traces
[17]: https://github.com/DataDog/dd-trace-go/blob/main/orchestrion/all/orchestrion.tool.go
[18]: /ko/tracing/guide/orchestrion_dockerfile/

{{% /tab %}}

{{% tab "수동 계측" %}}

### 애플리케이션에 SDK 추가 {#add-the-sdk-to-your-application}

먼저, [라이브러리 구성][3] 설명서를 따라 코드에 SDK를 가져오고 시작합니다. 구성 지침 및 API 사용에 관한 상세한 정보는 [API 설명서][6](또는 [API 설명서 v1][4])를 참조하세요.

### 스팬을 생성하기 위해 Go 통합 활성화 {#activate-go-integrations-to-create-spans}

스팬을 생성하려면 [Go 통합][1]을 활성화합니다. Datadog에는 일련의 플러그형 패키지가 있어서 일련의 라이브러리 및 프레임워크를 계측하기 위한 즉시 사용 가능한 지원을 제공합니다. 이러한 패키지 목록은 [호환성 요구 사항][1] 페이지에서 확인할 수 있습니다. 이러한 패키지를 애플리케이션에 가져온 다음 각 통합과 함께 목록으로 나열된 구성 지침을 따르세요.

[1]: /ko/tracing/compatibility_requirements/go
[3]: /ko/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/compatibility_requirements/go
[5]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent