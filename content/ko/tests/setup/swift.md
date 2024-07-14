---
aliases:
- /ko/continuous_integration/setup_tests/swift
- /ko/continuous_integration/tests/swift
- /ko/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/intelligent_test_runner/swift
  tag: 설명서
  text: Intelligent Test Runner로 테스트 작업 속도 향상시키기
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
kind: documentation
title: Swift 테스트
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
선택한 Datadog 사이트({{< region-param key="dd_site_name" >}})는 지원되지 않습니다.
</div>
{{< /site-region >}}

## 호환성

지원되는 언어:

| 언어 | 버전 | 참고 |
|---|---|---|
| Swift | >= 5.2 | If you are using Swift Concurrency를 사용하는 경우, 비동기 작업의 정확한 스팬 표현을 위해 Xcode >= 13.2가 필요합니다. |
| Objective-C | >= 2.0 | |

지원되는 플랫폼:

| 플랫폼 | 버전 |
|---|---|
| iOS | >= 11.0 |
| macOS | >= 10.13 |
| tvOS | >= 11.0 |

## Swift 테스팅 SDK 설치

테스팅 프레임워크를 설치할 수 있는 세 가지 방법이 있습니다.

{{< tabs >}}
{{% tab "Swift 패키지 관리자" %}}

### Xcode 프로젝트 사용

1. 프로젝트를 `dd-sdk-swift-testing` 패키지에 추가합니다. [`https://github.com/DataDog/dd-sdk-swift-testing`][1]에 위치합니다.

{{< img src="continuous_integration/swift_package.png" alt="Swift 패키지" >}}


2. 패키지에서 `DatadogSDKTesting`라이브러리와 테스트 대상을 연결합니다.

{{< img src="continuous_integration/swift_link2.png" alt="Swift 연결 SPM" >}}

3. UITests를 실행하는 경우, 이 라이브러리와 테스트를 실행하는 앱을 연결합니다.

### Swift 패키지 프로젝트 사용

1. 예를 들어, 패키지 종속성 어레이에 `dd-sdk-swift-testing`를 추가합니다. 예:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.2.0")
{{< /code-block >}}

2. 대상 종속성 테스팅에 테스팅 프레임워크를 추가하려면 다음 줄을 테스트 대상 종속성 어레이에 추가합니다.
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}

3. UITest를 실행하는 경우, 또한 테스트를 실행하는 애플리케이션에 종속성에 추가합니다.


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. `DatadogSDKTesting` 종속성을 `Podfile` 테스트 대상에 추가합니다.

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

2. UITest를 실행하는 경우, 종속성을 테스트를 실행하는 앱에 추가합니다.

{{% /tab %}}
{{% tab "Framework linking" %}}

1. [릴리스][1] 페이지에서 `DatadogSDKTesting.zip`을 다운로드하고 압축 해제합니다.

2. 결과 XCFramework를 사용해 테스트 대상을 복사하고 연결합니다.

{{< img src="continuous_integration/swift_link.png" alt="Swift 연결 XCFramework" >}}

3. UITest를 실행하는 경우, 이 라이브러리와 테스트를 실행하는 앱을 연결할 수 있습니다..

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub를 사용하는 경우 GitHub 마켓플레이스에서 [Swift 테스트 작업][1]을 사용하여 자동으로 설정 테스트를 실행할 수 있습니다. 기본적으로 이 페이지에 설명된 설정의 나머지 부분(작업 자체의 설정 제외)은 건너뛸 수 있지만 설정 환경 변수를 사용하여 추가 기능을 비활성화하거나 구성할 수 있습니다.

연결과 같은 다른 방법과 비교할 때 Swift 테스트 액션 옵션은 유연성이 떨어질 수 있습니다. 설정하고 실행하기는 어렵지만 코드를 변경할 필요가 없습니다..

[1]: https://github.com/marketplace/actions/swift-test-action-for-datadog
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-warning"><strong>참고</strong>: 이 프레임워크는 테스트용으로만 유용하며 테스트를 실행할 때만 애플리케이션과 연결해야 합니다. 프레임워크를 사용자에게 배포하지 마세요.. </div>

## 테스트 계측하기

### Datadog 구성

#### Xcode Project 사용

테스트 계측을 사용하려면 다음 환경 변수를 테스트 대상이나 `Info.plist` 파일에 [아래 설명](#using-infoplist-for-configuration)과 같이 추가하세요. 테스트 계획을 사용한다면 **반드시** `Expand variables based on`이나 `Target for Variable Expansion`에서 주요 대상을 선택해야 합니다.

{{< img src="continuous_integration/swift_env.png" alt="Swift 환경" >}}

<div class="alert alert-warning">환경 변수의 변수 확장에 주 대상이 있어야 하며, 선택하지 않으면 변수가 유효하지 않습니다. </div>

UITests의 경우 프레임워크에서 자동으로 이러한 값을 애플리케이션에 삽입하기 때문에 테스트 대상에서만 환경 변수를 설정하면 됩니다.

#### Swift Package Project 사용

테스트 계측을 사용하려면 다음 환경 변수를 테스트 명령줄 실행을 통해 설정해야 합니다. 또는 테스트 실행 전에 환경에서 설정하거나 명령 앞에 추가할 수도 있습니다.

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


다음 변수 모두를 테스트 대상에서 설정합니다.

`DD_TEST_RUNNER`
: 테스트 계측을 활성화하거나 비활성화합니다. 테스트 프로세스 외부(예: CI 빌드)에 정의된 환경 변수를 사용하여 테스트 계측을 활성화 또는 비활성화할 수 있도록 이 값을 `$(DD_TEST_RUNNER)`로 설정합니다.<br/>
**기본값**: `false`<br/>
**권장**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: 테스트 결과를 업로드할 때 사용하는 [Datadog API 키][2].<br/>
**기본값**: `(empty)`

`DD_APPLICATION_KEY`
: 테스트 결과를 업로드할 때 사용되는 [Datadog 애플리케이션 키][5].<br/>
**기본값**: `(empty)`

`DD_SERVICE`
: 테스트 중인 서비스나 라이브러리의 이름.<br/>
**기본값**: 리포지토리 이름<br/>
**예시**: `my-ios-app`

`DD_ENV`
: 테스트가 실행 중인 환경 이름. 런타임에서 환경 변수를 사용하여 이를 설정할 수 있도록 값을 `$(DD_ENV)`로 설정합니다.<br/>
**기본값**: `none`<br/>
**권장**: `$(DD_ENV)`<br/>
**예시**: `ci`, `local`


`SRCROOT`
: 프로젝트 위치 경로. Xcode를 사용하는 경우, 값을 자동으로 설정하는 `$(SRCROOT)` 값을 사용합니다.<br/>
**기본값**: `(empty)`<br/>
**권장**: `$(SRCROOT)`<br/>
**예시**: `/Users/ci/source/MyApp`

`service` 및 `env` 예약 태그 에 대한 자세한 내용은 [통합 서비스 태깅 ][8]을 참조하세요.

또한 선택한 사이트 ({{< region-param key="dd_site_name" >}})를 사용하도록 Datadog 사이트를 설정합니다.

`DD_SITE` (필수)
: 결과를 업로드하는 [Datadog 사이트][3].<br/>
**기본값**: `datadoghq.com`<br/>
**선택한 사이트**: {{< region-param key="dd_site" code="true" >}}

## Git 메타데이터 수집하기

{{% ci-git-metadata %}}

### 테스트 실행

설치가 완료된 후에는 일반적인 방법(예: `xcodebuild test` 명령 사용)으로 테스트를 실행합니다. 테스트, 네트워크 요청, 애플리케이션 충돌이 자동으로 계측됩니다. CI에서 테스트를 실행할 때는 환경 변수를 전달합니다. 다음 예를 참고하세요. 

<pre>
<code>
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
</code>
</pre>

### UI 테스트

UITests의 경우, 테스트 대상과 UITests에서 실행되는 애플리케이션 둘 다 프레임워크에 연결되어야 합니다. 환경 변수는 프레임워크가 자동으로 애플리케이션에 해당 값을 주입하므로 테스트 대상에서만 설정하면 됩니다.

### RUM 통합

테스트 중이 애플리케이션이 RUM을 사용하여 계측되는 경우 UI 테스트 결과와 생성된 RUM 세션이 자동으로 연결됩니다. RUM에 관한 자세한 내용은 [RUM iOS 통합][4] 가이드를 참고하세요. iOS RUM 버전 >=1.10이 필요합니다.


## 추가적인 설정(선택 사항)

다음 설정을 참고하세요.
 - `Boolean` 변수는 `1`, `0`, `true`, `false`, `YES`, `NO` 중에서 사용할 수 있습니다. 
 - `String` 목록 변수는 `,`나 `;`으로 구분된 구성 요소 목록을 허용합니다.

### 자동 계측 사용

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: `stdout`에 작성된 메시지(예: `print()`)를 캡처하고 로그로 보고합니다. 이는 청구 요금에 영향을 줄 수 있습니다. (부울)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: `stderr`에 작성된 메시지(예: `NSLog()`, UITest 단계)를 캡처하고 로그로 보고합니다. 이는 청구 요금에 영향을 줄 수 있습니다(부울).

### 자동 계측 사용 해제

이 프레임워크를 사용해 지원하는 모든 라이브러리에서 자동 계측을 사용할 수 있지만, 일부 사용하고 싶지 않은 경우도 있을 수 있습니다. 이때 다음 환경 변수를 설정해 (또는 `Info.plist` 파일에서 [아래 설명](#using-infoplist-for-configuration)에 따라) 특정 라이브러리에서 자동 계측을 사용 해제할 수 있습니다.

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: 모든 네트워크 계측 사용 중지 (부울)

`DD_DISABLE_RUM_INTEGRATION`
: RUM 세션과의 통합 사용 중지 (부울)

`DD_DISABLE_SOURCE_LOCATION`
: 테스트 소스 코드 위치와 Codeowners 사용 중지 (부울)

`DD_DISABLE_CRASH_HANDLER`
: 충돌 처리 및 보고 사용 중지. (부울)
<div class="alert alert-warning"><strong>중요</strong>: 충돌 보고를 사용 중지하면 충돌한 테스트가 전혀 보고 되지 않고, 실패로 나타나지 않습니다. 충돌 처리를 사용하지 않아야 할 테스트가 있는 경우, 별도 대상으로 실행해 다른 테스트에서 사용 중지되지 않도록 합니다.</div>

### 네트워크 자동 계측

네트워크 자동 계측에 대해 다음 추가 설정을 구성할 수 있습니다:

`DD_DISABLE_HEADERS_INJECTION`
: 추적 헤더의 모든 삽입 사용 중지(부울)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: 기록하려는 특정 추가 헤더(문자열 목록)

`DD_EXCLUDED_URLS`
: 기록하거나 헤더를 삽입하지 않으려는 URL(문자열 목록)

`DD_ENABLE_RECORD_PAYLOAD`
: 요청 및 응답에 있는 페이로드의 하위 집합(1024 바이트) 보고 사용(부울)

`DD_MAX_PAYLOAD_SIZE`
: 페이로드에서 보고하는 최대 크기 설정. 기본값 `1024`(정수)

`DD_DISABLE_NETWORK_CALL_STACK`
: 네트워크 스팬에서 호출 스택 정보 사용 중지(부울)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: 호출 스택 정보에 메서드 이름뿐만 아니라 정확한 파일 및 줄 정보 표시. 테스트 성능에 영향을 줄 수 있음(부울)

### 인프라스트럭처 테스트 상관 관계

자체 인프라스트럭처(macOS 또는 시뮬레이터 테스트)에서 테스트를 실행하는 경우, Datadog Agent를 설치하고 다음을 설정해 테스트와 인프라스트럭처 메트릭을 상호 연결할 수 있습니다.

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: 테스트를 실행하는 컴퓨터의 호스트 이름 보고(부울)

또한 Swift나 Objective-C에서 모듈 `DatadogSDKTesting`를 가져오고 클래스 `DDInstrumentationControl`을 사용해 일부 테스트에서 특정 자동 계측을 사용하거나 사용 중지하도록 할 수 있습니다.

## 커스텀 태그

### 환경 변수

`DD_TAGS` 환경 변수(또는 [아래 설명](#using-infoplist-for-configuration)에 따라 `Info.plist` 파일에서)를 사용할 수 있습니다. 띄어쓰기로 구분된 `key:tag` 쌍이 포함되어 있어야 합니다. 다음 예를 참고하세요.
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

값 중 하나가 `$` 문자로 시작하는 경우 같은 이름의 환경 변수(존재하는 경우)로 대체됩니다. 다음 예를 참고하세요.
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

또한 `$` 문자를 사용하면 환경 변수가 지원되지 않는 문자(`a-z`, `A-Z`, `_`)가 포함되어 있을 경우 값 시작 부분에서 환경 변수를 대체할 수 있습니다. 다음 예를 참고하세요.
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**참고**: OpenTelemetry는 Swift에서만 지원됩니다.

Datadog Swift 테스트 프레임워크는 내부적으로 [OpenTelemetry][6]를 추적 기술로 사용합니다. `DDInstrumentationControl.openTelemetryTracer`를 사용해 OpenTelemetry 트레이서에 액세스할 수 있고, OpenTelemetry API를 사용할 수 있습니다. 태그나 속성을 추가하려면 다음 예를 참고하세요.

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

테스트 대상이 `opentelemetry-swift`와 명시적으로 연결되어 있어야 합니다.

### 코드 커버리지 보고하기

코드 커버리지를 사용할 수 있는 경우, Datadog SDK(v2.2.7+)는 이를 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에 보고합니다.

Xcode에서는 Test Scheme에서 코드 커버리지 보고를 활성화할 수 있습니다.

테스트 세션의 **Coverage** 탭에서 테스트 커버리지 내역을 확인할 수 있습니다.

## Info.plist를 사용해 설정

환경 변수를 설정하는 대신 테스트 번들(앱 번들 아님)의 `Info.plist` 파일에 모든 설정 값을 추가해 제공할 수 있습니다. 환경 변수와 `Info.plist` 파일의 설정이 동일할 경우, 환경 변수가 우선합니다.

## CI 공급자 환경 변수

{{< tabs >}}
{{% tab "Jenkins" %}}

| 환경 변수 | 값                  |
| -------------------- | ---------------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`       |
| `WORKSPACE`          | `$(WORKSPACE)`         |
| `BUILD_TAG`          | `$(BUILD_TAG)`         |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)`      |
| `BUILD_URL`          | `$(BUILD_URL)`         |
| `JOB_NAME`           | `$(JOB_NAME)`          |
| `DD_CUSTOM_TRACE_ID` | `$(DD_CUSTOM_TRACE_ID)`|

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수 | 값           |
| -------------------- | --------------- |
| `GIT_COMMIT`         | `$(GIT_COMMIT)` |
| `GIT_URL`            | `$(GIT_URL)`    |
| `GIT_URL_1`          | `$(GIT_URL_1)`  |
| `GIT_BRANCH`         | `$(GIT_BRANCH)` |

{{% /tab %}}
{{% tab "CircleCI" %}}

| 환경 변수       | 값                         |
| -------------------------- | ----------------------------- |
| `CIRCLECI`                 | `$(CIRCLECI)`                 |
| `CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
| `CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
| `CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
| `CIRCLE_WORKFLOW_ID`       | `$(CIRCLE_WORKFLOW_ID)`       |
| `CIRCLE_PROJECT_REPONAME`  | `$(CIRCLE_PROJECT_REPONAME)`  |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수    | 값                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "GitLab CI" %}}

| 환경 변수 | 값                |
| -------------------- | -------------------- |
| `GITLAB_CI`          | `$(GITLAB_CI)`       |
| `CI_PROJECT_DIR`     | `$(CI_PROJECT_DIR)`  |
| `CI_JOB_STAGE`       | `$(CI_JOB_STAGE)`    |
| `CI_JOB_NAME`        | `$(CI_JOB_NAME)`     |
| `CI_JOB_URL`         | `$(CI_JOB_URL)`      |
| `CI_PIPELINE_ID`     | `$(CI_PIPELINE_ID)`  |
| `CI_PIPELINE_IID`    | `$(CI_PIPELINE_IID)` |
| `CI_PIPELINE_URL`    | `$(CI_PIPELINE_URL)` |
| `CI_PROJECT_PATH`    | `$(CI_PROJECT_PATH)` |
| `CI_PROJECT_URL`     | `$(CI_PROJECT_URL)`  |


물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수 | 값                  |
| -------------------- | ---------------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`     |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)` |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`  |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`     |
| `CI_COMMIT_MESSAGE`  | `$(CI_COMMIT_MESSAGE)` |
| `CI_COMMIT_AUTHOR`  | `$(CI_COMMIT_AUTHOR)` |
| `CI_COMMIT_TIMESTAMP`  | `$(CI_COMMIT_TIMESTAMP)` |

{{% /tab %}}
{{% tab "Travis" %}}

| 환경 변수       | 값                         |
| -------------------------- | ----------------------------- |
| `TRAVIS`                   | `$(TRAVIS)`                   |
| `TRAVIS_BUILD_DIR`         | `$(TRAVIS_BUILD_DIR)`         |
| `TRAVIS_BUILD_ID`          | `$(TRAVIS_BUILD_ID)`          |
| `TRAVIS_BUILD_NUMBER`      | `$(TRAVIS_BUILD_NUMBER)`      |
| `TRAVIS_BUILD_WEB_URL`     | `$(TRAVIS_BUILD_WEB_URL)`     |
| `TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`         | `$(TRAVIS_REPO_SLUG)`         |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수         | 값                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| 환경 변수 | 값                   |
| -------------------- | ----------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)`  |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`      |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)`  |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`    |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`         |
| `GITHUB_SERVER_URL`  | `$(GITHUB_SERVER_URL)`  |
| `GITHUB_RUN_ATTEMPT` | `$(GITHUB_RUN_ATTEMPT)` |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수 | 값                  |
| -------------------- | ---------------------- |
| `GITHUB_REF`         | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF`    | `$(GITHUB_HEAD_REF)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |

{{% /tab %}}
{{% tab "Buildkite" %}}

| 환경 변수            | 값                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`                     | `$(BUILDKITE)`                     |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG`       | `$(BUILDKITE_PIPELINE_SLUG)`       |
| `BUILDKITE_JOB_ID`              | `$(BUILDKITE_JOB_ID)`              |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수           | 값                             |
| ------------------------------ | --------------------------------- |
| `BUILDKITE_COMMIT`             | `$(BUILDKITE_COMMIT)`             |
| `BUILDKITE_REPO`               | `$(BUILDKITE_REPO)`               |
| `BUILDKITE_BRANCH`             | `$(BUILDKITE_BRANCH)`             |
| `BUILDKITE_TAG`                | `$(BUILDKITE_TAG)`                |
| `BUILDKITE_MESSAGE`            | `$(BUILDKITE_MESSAGE)`            |
| `BUILDKITE_BUILD_AUTHOR`       | `$(BUILDKITE_BUILD_AUTHOR)`       |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| 환경 변수       | 값                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수       | 값                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`         |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)` |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`         |
| `BITBUCKET_TAG`            | `$(BITBUCKET_TAG)`            |

{{% /tab %}}
{{% tab "AppVeyor" %}}

| 환경 변수     | 값                       |
| ------------------------ | --------------------------- |
| `APPVEYOR`               | `$(APPVEYOR)`               |
| `APPVEYOR_BUILD_FOLDER`  | `$(APPVEYOR_BUILD_FOLDER)`  |
| `APPVEYOR_BUILD_ID`      | `$(APPVEYOR_BUILD_ID)`      |
| `APPVEYOR_BUILD_NUMBER`  | `$(APPVEYOR_BUILD_NUMBER)`  |
| `APPVEYOR_REPO_TAG_NAME` | `$(APPVEYOR_REPO_TAG_NAME)` |
| `APPVEYOR_REPO_NAME`     | `$(APPVEYOR_REPO_NAME)`     |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수                     | 값                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| 환경 변수             | 값                               |
| -------------------------------- | ----------------------------------- |
| `TF_BUILD`                       | `$(TF_BUILD)`                       |
| `BUILD_SOURCESDIRECTORY`         | `$(BUILD_SOURCESDIRECTORY)`         |
| `BUILD_BUILDID`                  | `$(BUILD_BUILDID)`                  |
| `BUILD_DEFINITIONNAME`           | `$(BUILD_DEFINITIONNAME)`           |
| `SYSTEM_TEAMPROJECTID`           | `$(SYSTEM_TEAMPROJECTID)`           |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID`                   | `$(SYSTEM_JOBID)`                   |
| `SYSTEM_TASKINSTANCEID`          | `$(SYSTEM_TASKINSTANCEID)`          |
| `SYSTEM_JOBDISPLAYNAME`          | `$(SYSTEM_JOBDISPLAYNAME)`          |
| `SYSTEM_STAGEDISPLAYNAME`          | `$(SYSTEM_STAGEDISPLAYNAME)`          |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수                     | 값                                       |
| ---------------------------------------- | ------------------------------------------- |
| `BUILD_SOURCEVERSION`                    | `$(BUILD_SOURCEVERSION)`                    |
| `BUILD_REPOSITORY_URI`                   | `$(BUILD_REPOSITORY_URI)`                   |
| `BUILD_SOURCEBRANCH`                     | `$(BUILD_SOURCEBRANCH)`                     |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`      | `$(SYSTEM_PULLREQUEST_SOURCECOMMITID)`      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`        | `$(SYSTEM_PULLREQUEST_SOURCEBRANCH)`        |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI` | `$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI)` |
| `BUILD_SOURCEVERSIONMESSAGE`             | `$(BUILD_SOURCEVERSIONMESSAGE)`             |
| `BUILD_REQUESTEDFORID`                   | `$(BUILD_REQUESTEDFORID)`                   |
| `BUILD_REQUESTEDFOREMAIL`                | `$(BUILD_REQUESTEDFOREMAIL)`                |

{{% /tab %}}
{{% tab "Bitrise" %}}

| 환경 변수   | 값                     |
| ---------------------- | ------------------------- |
| `BITRISE_SOURCE_DIR`   | `$(BITRISE_SOURCE_DIR)`   |
| `BITRISE_TRIGGERED_WORKFLOW_ID`  | `$(BITRISE_TRIGGERED_WORKFLOW_ID)`  |
| `BITRISE_BUILD_SLUG`   | `$(BITRISE_BUILD_SLUG)`   |
| `BITRISE_BUILD_NUMBER` | `$(BITRISE_BUILD_NUMBER)` |
| `BITRISE_BUILD_URL`    | `$(BITRISE_BUILD_URL)`    |

물리적 디바이스 테스트를 위한 추가 Git 설정:

| 환경 변수               | 값                                 |
| ---------------------------------- | ------------------------------------- |
| `GIT_REPOSITORY_URL`               | `$(GIT_REPOSITORY_URL)`               |
| `BITRISE_GIT_COMMIT`               | `$(BITRISE_GIT_COMMIT)`               |
| `BITRISE_GIT_BRANCH`               | `$(BITRISE_GIT_BRANCH)`               |
| `BITRISE_GIT_TAG`                  | `$(BITRISE_GIT_TAG)`                  |
| `GIT_CLONE_COMMIT_HASH`            | `$(GIT_CLONE_COMMIT_HASH)`            |
| `BITRISE_GIT_MESSAGE`              | `$(BITRISE_GIT_MESSAGE)`              |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT` | `$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT)` |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`    | `$(GIT_CLONE_COMMIT_MESSAGE_BODY)`    |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`     | `$(GIT_CLONE_COMMIT_AUTHOR_NAME)`     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`    | `$(GIT_CLONE_COMMIT_AUTHOR_EMAIL)`    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`   | `$(GIT_CLONE_COMMIT_COMMITER_NAME)`   |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`  | `$(GIT_CLONE_COMMIT_COMMITER_EMAIL)`  |

{{% /tab %}}
{{% tab "Xcode Cloud" %}}

| 환경 변수    | 값                   |
| ----------------------- | ----------------------- |
| `DD_GIT_REPOSITORY_URL` | 리포지토리 URL      |
| `CI_WORKSPACE`          | `$(CI_WORKSPACE)`       |
| `CI_COMMIT`             | `$(CI_COMMIT)`          |
| `CI_BUILD_ID`           | `$(CI_BUILD_ID)`        |
| `CI_BUILD_NUMBER`       | `$(CI_BUILD_NUMBER)`    |
| `CI_WORKFLOW`           | `$(CI_WORKFLOW)`        |
| `CI_TAG`                | `$(CI_TAG)`             |
| `CI_BRANCH`             | `$(CI_BRANCH)`          |
| `CI_GIT_REF`            | `$(CI_GIT_REF)`         |

{{% /tab %}}
{{< /tabs >}}

## 수동 테스트 API

Swift 프로젝트와 함께 XCTests를 사용하는 경우 `DatadogSDKTesting` 프레임워크에서 자동으로 이를 계측하고 결과를 Datadog 백엔드로 전송합니다. XCTests를 사용하지 않는다면 대신 Swift/Objective-C 수동 테스팅 API를 사용해 결과를 백엔드로 보고할 수 있습니다.

이 API는 *테스트 모듈*, *테스트 스위트*, *테스트* 이 세 개의 개념을 기반으로 작동합니다.

### 테스트 모듈

테스트 모듈은 테스트가 포함된 라이브러리 또는 번들의 로드를 나타냅니다.

테스트 모듈을 시작하려면 `DDTestModule.start()`를 호출하고 테스트하려는 모듈이나 번들의 이름을 전달합니다.

테스트가 모두 완료되면 `module.end()`를 호출해 라이브러리가 나머지 테스트 결과를 모두 백엔드로 보내도록 합니다.

### 테스트 스위트

테스트 스위트는 일반적인 기능을 공유하는 테스트 세트로 이뤄져 있습니다. 일반적인 초기화 및 해제 기능을 공유하고 일부 변수를 공유하는 경우도 있습니다.

`module.suiteStart()`를 호출하고 테스트 스위트의 이름을 전달하여 테스트 모듈에서 테스트 스위트를 생성합니다.

스위트 내의 관련 테스트가 모두 실행을 마치면 `suite.end()`를 호출합니다.

### 테스트

스위트 내에서 실행되는 각 테스트는 `pass`, `fail`, `skip` 중 하나의 상태로 종료되어야 합니다. 테스트는 선택적으로 속성 및 오류 정보와 같은 추가 정보를 가질 수 있습니다.

`suite.testStart()`를 호출하고 테스트 이름을 전달하여 스위트에서 테스트를 생성합니다. 테스트가 끝나면 미리 정의된 상태 중 하나를 설정해야 합니다.

### API 인터페이스

{{< code-block lang="swift" >}}
클래스 DDTestModule {
    // 모듈을 시작합니다.
    // - 파라미터:
    // - 번들 이름: 테스트할 모듈 또는 번들의 이름입니다.
    // - startTime: 부수적인. 모듈이 시작된 시간입니다.
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestModule
    //
    // 모듈을 종료합니다.
    // - 파라미터:
    // - endTime: 부수적인. 모듈이 종료된 시간입니다.
    func end(endTime: Date? = nil)
    // 테스트 모듈에 태그를 설정하다/어트리뷰트를 테스트 모듈에 추가합니다. 태그 을 얼마든지 추가할 수 있습니다.
    // - 파라미터:
    // - 키: 테스트 모듈의 태그를 설정하다. 같은 이름의 태그를 설정하다 가 이미 존재하는 경우
    // 그 값은 새 값으로 대체됩니다.
    // - 값: 값은 태그를 설정하다. 숫자나 문자열일 수 있습니다.
    함수 setTag(키: 문자열, 값: 임의)
    //
    // 이 모듈에서 스위트(suite) 을 시작합니다.
    // - 파라미터:
    // - name: 스위트(suite) 의 이름.
    // - startTime: 부수적인. 스위트(suite) 이 시작된 시간.
    func suiteStart(name: String, startTime: Date? = nil) -> DDTestSuite
}
    //
public class DDTestSuite : NSObject {
    // 테스트를 종료합니다 스위트(suite).
    // - 파라미터:
    // - endTime: 부수적인. 스위트(suite) 이 종료된 시간입니다.
    func end(endTime: Date? = nil)
    // 테스트에 태그를 설정하다/속성을 테스트에 추가합니다 스위트(suite). 태그 을 얼마든지 추가할 수 있습니다.
    // - 파라미터:
    // - 키: 테스트의 이름 태그를 설정하다. 같은 이름의 태그를 설정하다 가 이미 존재하는 경우
    // 그 값은 새 값으로 대체됩니다.
    // - 값: 값은 태그를 설정하다. 숫자나 문자열일 수 있습니다.
    함수 setTag(키: 문자열, 값: 임의)
    //
    // 이 안에서 테스트를 시작합니다 스위트(suite).
    // - 파라미터:
    // - name: 테스트 이름.
    // - startTime: 부수적인. 테스트가 시작된 시간입니다.
    func testStart(name: String, startTime: Date? = nil) -> DDTest
}
    //
public class DDTest : NSObject {
    // 테스트에 태그를 설정하다/속성을 테스트에 추가합니다. 태그 을 얼마든지 추가할 수 있습니다.
    // - 파라미터:
    // - 키: 테스트의 이름 태그를 설정하다. 같은 이름의 태그를 설정하다 가 이미 존재하는 경우
    // 그 값은 새 값으로 대체됩니다.
    // - 값: 값은 태그를 설정하다. 숫자나 문자열일 수 있습니다.
    함수 setTag(키: 문자열, 값: 임의)
    //
    // 테스트에 오류 정보를 추가합니다. 테스트는 하나의 errorInfo만 보고할 수 있습니다.
    // - 파라미터:
    // - 유형: 보고할 오류 유형입니다.
    // - 메시지: 오류와 관련된 메시지입니다.
    // - 콜스택: 부수적인. 오류와 연관된 콜스택입니다.
    함수 setErrorInfo(유형: 문자열, 메시지: 문자열, 콜스택: 문자열? = nil)
    //
    // 테스트를 종료합니다.
    // - 파라미터:
    // - 상태: 이 테스트에 대해 보고된 상태입니다.
    // - endTime: 부수적인. 테스트가 종료된 시간입니다.
    func end(status: DDTestStatus, endTime: Date? = nil)
}
    //
// 테스트가 보고할 수 있는 상태입니다:
enum DDTestStatus {
  // 테스트가 통과했습니다.
  case pass
  //
  //테스트가 실패했습니다.
  case fail
  //
  //테스트가 건너뛰었습니다.
  case skip
}
{{< /code-block >}}

### 코드 예시

다음은 API를 사용한 간단한 코드 예시입니다.

{{< code-block lang="swift" >}}
import DatadogSDKTesting
let module = DDTestModule.start(bundleName: "ManualModule")
let suite1 = module.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = module.suiteStart(name: "ManualSuite 2")
..
..
module.end()
{{< /code-block >}}

항상 끝에 `module.end()`를 호출해 테스트 정보가 Datadog로 전송될 수 있도록 하세요.

## 모범 사례

테스팅 프레임워크와 CI Visibility를 최대한 활용하려면 다음 사례를 참고하세요.

### 빌드 시 심볼 파일 생성

Xcode에서 `DWARF with dSYM File`(또는 `-Xswiftc -debug-info-format=dwarfswift`)을 사용해 코드 빌드

테스트 프레임워크에서는 크래시 기호화, 테스트 소스 위치 보고, 코드 소유자 보고 등 일부 기능에 기호 파일을 사용합니다. 디버그 기호가 바이너리에 포함될 때 때 자동으로 기호 파일을 생성하지만 로드하는 데 시간이 다소 걸릴 수 있습니다.

### macOS에서 UI 테스트 시 샌드백스 사용 해제

일부 Xcode 버전에서는 UI Test 번들이 기본적으로 샌드박스와 함께 빌드됩니다. 샌드박스와 함께 제공되는 설정으로 인해 일부 시스템 명령에서 테스트 프레임워크가 `xcrun`를 사용하여 실행되지 않으므로 이를 비활성화해야 합니다.

UI Test 러너 번들에 Entitlements를 추가한 후 `App Sandbox = NO`를 추가하여 샌드박스를 비활성화합니다. 또 `.entitlement` 파일을 생성하여 Signing Build Settings에 추가할 수도 있습니다. 이 파일에는 다음 내용이 포함되어야 합니다.

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/getting_started/site/
[4]: /ko/continuous_integration/guides/rum_swift_integration
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /ko/continuous_integration/intelligent_test_runner/
[8]: /ko/getting_started/tagging/unified_service_tagging