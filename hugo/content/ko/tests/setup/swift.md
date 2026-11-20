---
aliases:
- /ko/continuous_integration/setup_tests/swift
- /ko/continuous_integration/tests/swift
- /ko/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /tests
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /tests/test_impact_analysis/swift
  tag: 설명서
  text: Test Impact Analysis로 테스트 작업 속도 높이기
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: Swift 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

지원되는 언어:

| 언어    | 버전 |
| ----------- | ------- |
| Swift       | >= 6.2  |
| Objective-C | >= 2.0  |
| Xcode       | >= 26.0 |

지원 플랫폼:

| 플랫폼     | 버전  |
| ------------ | -------- |
| iOS / iPadOS | >= 15.0  |
| macOS        | >= 11.0  |
| tvOS         | >= 15.0  |
| macCatalyst  | >= 13.0  |

지원되는 테스트 프레임워크:

| 프레임워크     | SDK 버전  | 지원 수준                                     |
| ------------- | ------------ | ------------------------------------------------- |
| XCTest        | 모든 버전 | 전체 지원                                      |
| Swift Testing | >= 2.7.0     | 2.7.1부터 전체 지원; 2.7.0에서는 관찰만 가능 |

## Swift 테스트 SDK 설치 {#installing-the-swift-testing-sdk}

테스트 프레임워크를 설치하는 방법은 세 가지가 있습니다.

{{< tabs >}}
{{% tab "Swift Package Manager(SPM)" %}}

### Xcode 프로젝트 사용 {#using-xcode-project}

1. `dd-sdk-swift-testing` 패키지를 프로젝트에 추가합니다. [`https://github.com/DataDog/dd-sdk-swift-testing`][1]에 위치해 있습니다.

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. 패키지의 `DatadogSDKTesting` 라이브러리를 테스트 타겟에 연결합니다.

{{< img src="continuous_integration/swift_link2.png" alt="Swift SPM 연결" >}}

3. UI 테스트를 실행하고 RUM을 사용하지 않는 경우, 테스트를 실행하는 애플리케이션에도 종속성을 추가하세요.

### Swift Package 프로젝트 사용 {#using-swift-package-project}

1. 패키지 종속성 배열에 `dd-sdk-swift-testing`을 추가합니다. 예:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.5.3")
{{< /code-block >}}

2. 테스트 프레임워크를 테스트 타겟의 종속성에 추가하려면 테스트 타겟의 종속성 배열에 다음 줄을 추가하세요.
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "CocoaPods" %}}

1. `Podfile`의 테스트 타겟에 `DatadogSDKTesting` 종속성을 추가하세요.

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "프레임워크 연결" %}}

1. [릴리스][1] 페이지에서 `DatadogSDKTesting.zip`을 다운로드하고 압축을 푸세요.

2. 결과 XCFramework를 테스트 타겟에 복사하고 연결하세요.

{{< img src="continuous_integration/swift_link.png" alt="Swift XCFramework 연결" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">이 프레임워크는 테스트에만 사용되며 테스트를 실행할 때만 애플리케이션과 연결해야 합니다. 프레임워크를 사용자에게 배포하지 마세요. </div>

## 테스트 계측 {#instrumenting-your-tests}

### Swift Testing 프레임워크 {#swift-testing-framework}

Datadog SDK는 버전 2.7.0부터 Swift Testing 프레임워크를 지원하며(관찰만 지원), 버전 2.7.1 이상부터는 모든 고급 기능을 완전히 지원합니다.

#### Swift Testing 관찰 설정 {#setting-up-swift-testing-observation}

Swift Testing 테스트에 대한 관찰을 활성화하려면 다음 단계를 따르세요.

1. 테스트 소스 파일에 `DatadogSDKTesting`을 가져옵니다.

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import Testing
{{< /code-block >}}

2. 테스트 스위트 또는 독립형 테스트 함수에 `.datadogTesting` 특성을 추가합니다.

{{< code-block lang="swift" >}}
@Suite(.datadogTesting)
struct MyTestSuite {
    @Test func myTest() {
        // ...
    }
}

// For standalone test functions:
@Test(.datadogTesting) func myStandaloneTest() {
    // ...
}
{{< /code-block >}}

### SDK 구성 {#configuring-sdk}

#### Xcode 프로젝트 사용 {#using-xcode-project-1}

테스트 계측을 활성화하려면 테스트 타겟에 다음 환경 변수를 추가하거나, [아래에 설명](#using-infoplist-for-configuration)된 대로 `Info.plist` 파일에 추가하세요. 테스트 플랜을 사용하는 경우 {{< ui >}}Expand variables based on{{< /ui >}} 또는 {{< ui >}}Target for Variable Expansion{{< /ui >}}에서 기본 타겟을 **반드시** 선택해야 합니다.

{{< img src="continuous_integration/swift_env.png" alt="Swift 환경" >}}

<div class="alert alert-danger">환경 변수의 변수 확장에 기본 타겟이 포함되어 있어야 하며, 선택하지 않으면 변수가 유효하지 않습니다. </div>

UI 테스트의 경우 프레임워크에서 자동으로 이러한 값을 애플리케이션에 주입하기 때문에 테스트 대상에서만 환경 변수를 설정하면 됩니다.

#### Swift Package 프로젝트 사용 {#using-swift-package-project-1}

테스트 계측을 활성화하려면 테스트 실행 명령에 다음 환경 변수를 설정해야 합니다. 또는 테스트를 실행하기 전에 환경에서 설정하거나 명령 앞에 추가할 수 있습니다.

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


다음 변수 모두를 테스트 대상에서 설정합니다.

`DD_TEST_RUNNER`
: 테스트 계측을 활성화하거나 비활성화합니다. 테스트 프로세스 외부(예: CI 빌드)에서 정의된 환경 변수로 테스트 계측을 활성화 및 비활성화할 수 있도록 이 값을 `$(DD_TEST_RUNNER)`로 설정하세요.<br/>
**기본**: `false`<br/>
**권장**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`(필수)
: 테스트 결과 업로드를 인증하는 데 사용되는 [Datadog API 키][2]입니다.<br/>
**기본**: `(empty)`

`DD_TEST_SESSION_NAME`(선택 사항)
: `unit-tests`, `integration-tests` 또는 `smoke-tests`와 같은 테스트 그룹을 식별합니다.<br/>
**기본값**: CI 작업 이름 및 테스트 명령, 또는 CI 작업 이름을 사용할 수 없는 경우 테스트 명령입니다.<br/>
**예시**: `unit-tests`, `integration-tests`, `smoke-tests`

`DD_SERVICE`(선택 사항)
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**기본값**: 리포지토리 이름<br/>
**예시**: `my-ios-app`

`DD_ENV`(선택 사항)
: 테스트가 실행되는 환경의 이름입니다.<br/>
**기본값**: CI 공급자가 탐지되면 `ci`이고, 그렇지 않으면 `none`입니다.<br/>
**권장**: `$(DD_ENV)`<br/>
**예시**: `local`, `ci`

`SRCROOT`
: 프로젝트 위치 경로입니다. Xcode를 사용하는 경우, Xcode에서 자동으로 설정되는 `$(SRCROOT)`를 값으로 사용하세요.<br/>
**기본값**: `(empty)`<br/>
**권장**: `$(SRCROOT)`<br/>
**예시**: `/Users/ci/source/MyApp`

`service` 및 `env` 예약 태그에 대한 자세한 내용은 [Unified Service Tagging][8]을 참조하세요.

사이트에 맞게 `DD_SITE`를 구성하세요({{< region-param key="dd_site_name" >}}):

`DD_SITE`(선택 사항)
: 결과를 업로드할 [Datadog 사이트][3]입니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}

## Git 메타데이터 수집 {#collecting-git-metadata}

{{% ci-git-metadata %}}

### 테스트 실행 {#running-tests}

설치 후, 예를 들어 `xcodebuild test` 명령을 사용하는 등 평소와 같이 테스트를 실행하세요. 테스트, 네트워크 요청 및 애플리케이션 충돌이 자동으로 계측됩니다. CI에서 테스트를 실행할 때 다음 예와 같이 환경 변수를 전달하세요.

<pre>
<code>
DD_TEST_RUNNER=1 DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=arm64" \
  test
</code>
</pre>

### UI 테스트 {#ui-tests}

### RUM 통합 {#rum-integration}

테스트 중인 애플리케이션이 RUM을 사용하여 계측된 경우, UI 테스트 결과와 생성된 RUM 세션이 자동으로 연결됩니다. [RUM iOS 통합][4] 가이드에서 RUM에 대해 자세히 알아보세요. iOS RUM 버전 1.10 이상이 필요합니다.

프레임워크에서 자동으로 이러한 값을 애플리케이션에 주입하기 때문에 테스트 대상에서만 환경 변수를 설정하면 됩니다.

### Test Optimization SDK {#test-optimisation-sdk}

RUM을 사용하지 않는 경우, 애플리케이션 타겟을 Test SDK와 연결할 수 있습니다. SDK는 애플리케이션에 자동 계측을 추가하고, 네트워크 요청 및 로그를 수집하여 테스트 트레이스에 첨부합니다.

프레임워크에서 자동으로 이러한 값을 애플리케이션에 주입하기 때문에 테스트 대상에서만 환경 변수를 설정하면 됩니다.

## 추가 구성(선택 사항) {#additional-optional-configuration}

다음 설정을 참고하세요.
 - `Boolean` 변수는 : `1`, `0`, `true`, `false`, `YES` 또는 `NO` 중 하나를 사용할 수 있습니다.
 - `String` 목록 변수는 `,` 또는 `;`로 구분된 요소 목록을 허용합니다.

### 자동 계측 활성화 {#enabling-auto-instrumentation}

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: `stdout`(예: `print()`)에 기록된 메시지를 캡처하여 로그로 보고합니다. 이로 인해 청구 금액에 영향을 줄 수 있습니다. (불리언)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: `stderr`(예: `NSLog()`, UITest 단계)에 기록된 메시지를 캡처하여 로그로 보고합니다. 이로 인해 청구 금액에 영향을 줄 수 있습니다. (불리언)

### 자동 계측 비활성화 {#disabling-auto-instrumentation}

프레임워크는 지원되는 모든 라이브러리의 자동 계측을 활성화하지만, 경우에 따라서는 원치 않을 수도 있습니다. 다음 환경 변수를 설정하거나, [아래에 설명](#using-infoplist-for-configuration)된 대로 `Info.plist` 파일에 추가하여 특정 라이브러리의 자동 계측을 비활성화할 수 있습니다.

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: 모든 네트워크 계측을 비활성화합니다(불리언)

`DD_DISABLE_RUM_INTEGRATION`
: RUM 세션과의 통합을 비활성화합니다(불리언)

`DD_DISABLE_SOURCE_LOCATION`
: 테스트 소스 코드 위치 및 Codeowners를 비활성화합니다(불리언)

`DD_DISABLE_CRASH_HANDLER`
: 크래시 처리 및 보고를 비활성화합니다. (불리언)
<div class="alert alert-danger">크래시 보고를 비활성화하면, 크래시가 발생한 테스트는 전혀 보고되지 않으며 테스트 실패로 나타나지 않습니다. 테스트 중 일부에 대해 크래시 처리를 비활성화해야 하는 경우, 다른 테스트에 영향을 주지 않도록 별도의 타겟으로 실행하세요.</div>

### 네트워크 자동 계측 {#network-auto-instrumentation}

네트워크 자동 계측에 대해 다음 추가 설정을 구성할 수 있습니다:

`DD_DISABLE_HEADERS_INJECTION`
: 모든 트레이싱 헤더 주입을 비활성화합니다(불리언)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: 기록하려는 특정 추가 헤더(문자열 목록)

`DD_EXCLUDED_URLS`
: 기록하거나 헤더를 주입하지 않으려는 URL(문자열 목록)

`DD_ENABLE_RECORD_PAYLOAD`
: 요청 및 응답에서 페이로드의 하위 집합(1,024바이트) 보고를 활성화합니다(불리언)

`DD_MAX_PAYLOAD_SIZE`
: 페이로드에서 보고되는 최대 크기를 설정합니다. 기본값 `1024`(정수)

`DD_DISABLE_NETWORK_CALL_STACK`
: 네트워크 스팬의 호출 스택 정보를 비활성화합니다(불리언)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: 메서드 이름뿐만 아니라 정확한 파일 및 라인 정보까지 포함하여 호출 스택 정보를 표시합니다. 테스트의 성능에 영향을 줄 수 있습니다(불리언)

### 인프라 테스트 상관 관계 {#infrastructure-test-correlation}

자체 인프라(macOS 또는 시뮬레이터 테스트)에서 테스트를 실행하는 경우, Datadog Agent를 설치하고 다음을 설정해 테스트와 인프라 메트릭을 상호 연결할 수 있습니다.

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: 테스트를 시작하는 머신의 호스트 이름을 보고합니다(불리언)

또한 Swift나 Objective-C에서 모듈 `DatadogSDKTesting`을 가져오고 클래스 `DDInstrumentationControl`을 사용해 일부 테스트에서 특정 자동 계측을 비활성화하거나 활성화할 수 있습니다.

## 사용자 지정 태그 {#custom-tags}

### 환경 변수 {#environment-variables}

`DD_TAGS` 환경 변수를 사용할 수 있습니다(또는 `Info.plist` 파일에서 [아래 설명된 대로](#using-infoplist-for-configuration) 사용할 수 있습니다). 공백으로 구분된 `key:tag` 쌍을 포함해야 합니다. 예:
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

값 중 하나가 `$` 문자로 시작하는 경우, 해당 값은 동일한 이름의 환경 변수(있는 경우)로 대체됩니다. 예:
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

`$` 문자를 사용하면 값에 환경 변수에서 지원하지 않는 문자(`a-z`, `A-Z` 또는 `_`)가 포함된 경우에도 값의 시작 부분에 있는 환경 변수를 대체할 수 있습니다. 예:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### 테스트 메서드 내부 {#inside-a-test-method}

테스트 메서드 내에 사용자 지정 태그를 추가할 수 있습니다. 정적 속성 `DDTest.current`는 테스트 메서드의 범위 내에서 호출될 경우 현재 테스트 인스턴스를 반환합니다.

{{< code-block lang="swift" >}}
// Somewhere inside the test method
DDTest.current?.setTag(key: "key1", value: "value1")
// test continues normally
// ...
{{< /code-block >}}

### OpenTelemetry {#opentelemetry}

**참고**: OpenTelemetry는 Swift에서만 지원됩니다.

Datadog Swift 테스트 프레임워크는 내부적으로 [OpenTelemetry][6]를 트레이싱 기술로 사용합니다. `DDInstrumentationControl.openTelemetryTracer`을(를) 사용하여 OpenTelemetry 트레이서에 접근하고 모든 OpenTelemetry API를 사용할 수 있습니다. 예를 들어, 태그나 속성을 추가하려면 다음과 같이 합니다.

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

테스트 대상은 `opentelemetry-swift`와 명시적으로 링크되어야 합니다.

### 코드 적용 범위 보고 {#reporting-code-coverage}

코드 적용 범위를 사용할 수 있는 경우, Datadog SDK(v2.2.7+)는 이를 테스트 세션의 `test.code_coverage.lines_pct` 태그에 보고합니다.

Xcode에서는 프로젝트 설정에 따라 Test Plan 또는 Test Scheme에서 코드 적용 범위 수집을 설정할 수 있습니다.

테스트 세션의 {{< ui >}}Coverage{{< /ui >}} 탭에서 테스트 적용 범위 변화를 확인할 수 있습니다.

## Info.plist를 사용한 구성 {#using-infoplist-for-configuration}

환경 변수를 설정하는 대신, 모든 구성 값을 Test 번들(App 번들이 아님)의 `Info.plist` 파일에 추가하여 제공할 수 있습니다. 동일한 설정이 환경 변수와 `Info.plist` 파일 모두에 지정된 경우, 환경 변수가 우선적으로 적용됩니다.

## CI 공급자 환경 변수 {#ci-provider-environment-variables}

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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


물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

물리적 장치 테스트를 위한 추가 Git 설정:

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

## 모범 사례 {#best-practices}

테스팅 프레임워크와 Test Optimization을 최대한 활용하려면 다음 모범 사례를 따르세요.

### 빌드 시 심볼 파일 생성 {#generate-symbols-file-when-building}

Xcode에서 `DWARF with dSYM File`을 사용하여 코드를 빌드합니다(`swift`로 빌드하는 경우 `-Xswiftc -debug-info-format=dwarf` 사용).

테스트 프레임워크는 크래시 심볼화, 테스트 소스 위치 보고, 코드 소유자 보고 등의 기능에 심볼 파일을 사용합니다. 바이너리에 디버그 심볼이 포함되어 있으면 심볼 파일이 자동으로 생성되지만, 로드하는 데 시간이 더 걸릴 수 있습니다.

### macOS에서 UI 테스트 시 샌드박스 사용 해제 {#disable-sandbox-for-ui-tests-on-macos}

일부 Xcode 버전에서는 UI 테스트 번들이 기본적으로 샌드박스와 함께 빌드됩니다. 샌드박스와 함께 제공되는 설정은 테스트 프레임워크가 `xcrun`을 사용하는 일부 시스템 명령에 의해 실행되는 것을 방지하므로, 샌드박스를 비활성화해야 합니다.

UI 테스트 러너 번들에 Entitlements를 추가한 다음 `App Sandbox = NO`를 추가하여 샌드박스를 비활성화하세요. `.entitlement` 파일을 생성하여 서명 빌드 설정(Signing Build Settings)에 추가할 수도 있습니다. 이 파일에는 다음 내용이 포함되어야 합니다.

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우, 기본값은 CI 작업 이름과 테스트 명령입니다. CI 작업 이름을 사용할 수 없는 경우 테스트 명령이 사용됩니다.

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

#### `DD_TEST_SESSION_NAME` 사용 시점 {#when-to-use-dd-test-session-name}

Datadog은 테스트 세션 간의 대응 관계를 설정하기 위해 일련의 파라미터를 검사합니다. 테스트를 실행하는 데 사용된 테스트 명령이 그중 하나입니다. 테스트 명령에 임시 폴더와 같이 실행할 때마다 변경되는 문자열이 포함되어 있으면 Datadog은 해당 세션들이 서로 관련이 없다고 간주합니다. 예:

- `swift test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

테스트 명령이 실행마다 달라지는 경우 Datadog은 `DD_TEST_SESSION_NAME` 사용을 권장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/getting_started/site/
[4]: /ko/tests/swift_tests/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /ko/tests/test_impact_analysis/
[8]: /ko/getting_started/tagging/unified_service_tagging