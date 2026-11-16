---
aliases:
- /ko/continuous_integration/setup_tests/ruby
- /ko/continuous_integration/tests/ruby
- /ko/continuous_integration/tests/setup/ruby
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 설명서
  text: 컨테이너 내 테스트를 위한 환경 변수 전달
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /tests/test_parallelization/
  tag: 설명서
  text: 테스트 병렬화 설정
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: Ruby 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

지원되는 언어:

| 언어 | 버전 |
| -------- | ------- |
| Ruby     | >= 2.7  |

지원되는 테스트 프레임워크:

| 테스트 프레임워크 | 버전  |
| -------------- | -------- |
| RSpec          | >= 3.0.0 |
| Minitest       | >= 5.0.0 |
| Cucumber       | >= 3.0   |

지원되는 테스트 러너:

| 테스트 러너    | 버전   |
| -------------- | --------- |
| Knapsack Pro   | >= 7.2.0  |
| parallel_tests | >= 4.0.0  |
| ci-queue       | >= 0.53.0 |

## 보고 메서드 구성 {#configuring-reporting-method}

테스트 결과를 Datadog에 보고하려면 `datadog-ci` gem을 설정해야 합니다.

{{< tabs >}}
{{% tab "자동 계측을 지원하는 CI 공급자" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "클라우드 CI 공급자(Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "온프레미스 CI 공급자(Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## 수동 계측 {#manual-instrumentation}

<div class="alert alert-info">
이 섹션은 CI 공급자가 자동 계측을 지원하지 않는 경우에만 <strong>필요합니다</strong>. 위의 <a href="#configuring-reporting-method">보고 메서드 설정</a> 섹션에서 <strong>자동 계측을 지원하는 CI 공급자</strong>를 선택했다면, 이 섹션을 건너뛰고 <a href="#configuration-settings">구성 설정</a>으로 진행하세요.
</div>

CI 공급자가 자동 계측을 지원하지 않는 경우(예: {{< ui >}}Cloud CI provider (Agentless){{< /ui >}} 또는 {{< ui >}}On-Premises CI Provider (Datadog Agent){{< /ui >}}를 선택한 경우), 다음 단계에 따라 라이브러리를 설치하고 테스트를 수동으로 계측하세요.

1. Gemfile에 [Ruby Test Optimization gem][10]을 추가하세요.

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. [보고 메서드 설정](#configuring-reporting-method)

3. 테스트를 실행하는 명령에 `RUBYOPT` 환경 변수를 설정하세요.

   ```bash
   RUBYOPT="-rbundler/setup -rdatadog/ci/auto_instrument" bundle exec rake test
   ```

   **참고**: `RUBYOPT` 환경 변수를 설정하지 않으려면 테스트 명령 앞에 `bundle exec ddcirb exec`를 추가하세요.

   ```bash
   bundle exec ddcirb exec rake test
   ```

## 구성 설정 {#configuration-settings}

Test Optimization 라이브러리를 설정하려면 테스트 프로세스를 시작하기 전에 다음 환경 변수를 설정하세요. 병렬 테스트 실행기의 경우, 모든 작업자가 상속받을 수 있도록 상위 프로세스에서 설정하세요.

`DD_CIVISIBILITY_ENABLED=true` (필수)
: Test Optimization을 활성화합니다.<br/>
**기본**: `false`

`DD_ENV`(선택 사항)
: 테스트가 실행되는 환경의 이름입니다.<br/>
**기본**: `(empty)`<br/>
**예시**: `local`, `ci`

`DD_SERVICE`(선택 사항)
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**기본값**: 리포지토리 이름<br/>
**예시**: `my-ruby-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true`(Agentless 모드 사용 시 필수)
: 테스트 결과를 Datadog으로 직접 전송하기 위해 Agentless 모드를 활성화합니다.<br/>
**기본값**: `false`

`DD_API_KEY`(Agentless 모드 사용 시 필수)
: 테스트 결과 업로드를 인증하는 데 사용되는 Datadog API 키입니다. 이 변수는 Agentless 모드를 활성화하지 않습니다.<br/>
**기본값**: `(empty)`

`DD_SITE`(Agentless 모드 사용 시 선택 사항)
: 테스트 결과를 업로드할 [Datadog 사이트][11]입니다. US1 이외의 사이트를 사용할 때 이 구성을 설정하세요.<br/>
**기본값**: `datadoghq.com`

`DD_TRACE_AGENT_URL`(Datadog Agent를 사용할 때만)
: `http://hostname:port` 형식의 트레이스 수집용 Datadog Agent URL입니다.<br/>
**기본값**: `http://127.0.0.1:8126`

`DD_TEST_SESSION_NAME`(선택 사항)
: `unit-tests`, `integration-tests` 또는 `smoke-tests`와 같은 테스트 그룹을 식별합니다.<br/>
**기본값**: CI 작업 이름 및 테스트 명령, 또는 CI 작업 이름을 사용할 수 없는 경우 테스트 명령입니다.<br/>
**예**: `unit-tests`, `integration-tests`, `smoke-tests`

다른 모든 [Datadog 트레이서 설정][5] 옵션도 사용할 수 있습니다.

추가 Test Optimization 기능에는 각 페이지에 설명된 자체 구성 옵션이 있습니다.

## 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests}

현재 활성 테스트를 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Ruby 사용자 지정 계측 설명서의 [태그 추가][2] 섹션을 참조하세요.

## 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests}

태그처럼 현재 활성 테스트를 사용하여 테스트에 사용자 지정 측정값을 추가할 수 있습니다.

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][3]를 참조하세요.

## 추가 계측 사용 {#using-additional-instrumentation}

다음 플레임 그래프에서 확인할 수 있는 바와 같이, 데이터베이스 작업이나 기타 외부 호출을 수행하는 데 소요된 시간을 포함하여 테스트에 대한 풍부한 추적 정보를 확보하는 것이 유용할 수 있습니다.

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Redis가 계측된 테스트 트레이스" >}}

`test_helper/spec_helper`에 다음 줄을 추가하여 자동 APM 계측을 활성화할 수 있습니다.

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**참고**: CI 모드에서 해당 트레이스는 Test Optimization에 제출되며 Datadog APM에는 표시되지 **않습니다**.

사용 가능한 계측 메서드의 전체 목록은 [추적 문서][6]를 참조하세요.

## Git 메타데이터 수집 {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 지원되지 않는 테스트 프레임워크에 라이브러리의 공개 API 사용 {#using-librarys-public-api-for-unsupported-test-frameworks}

RSpec, Minitest 또는 Cucumber를 사용하는 경우 **수동 테스트 API를 사용하지 마세요**. Test Optimization이 자동으로 이를 계측하고 테스트 결과를 Datadog으로 전송하기 때문입니다. 수동 테스트 API는 이미 지원되는 테스트 프레임워크와는 **호환되지 않습니다**.

지원되지 않는 테스팅 프레임워크를 사용하거나 다른 테스팅 메커니즘이 있는 경우에만 수동 테스팅 API를 사용하세요.
전체 공개 API 문서는 [YARD 사이트][8]에서 확인할 수 있습니다.

### 도메인 모델 {#domain-model}

API는 테스트 세션, 테스트 모듈, 테스트 스위트 및 테스트란 네 개의 개념을 기반으로 합니다.

#### 테스트 세션 {#test-session}

테스트 세션은 테스트 명령 실행을 나타냅니다.

테스트 세션을 시작하려면 `Datadog::CI.start_test_session`을(를) 호출하고 Datadog 서비스와 태그(예: 사용 중인 테스트 프레임워크
등)를 전달하세요.

모든 테스트가 완료되면 세션을 닫고 세션 트레이스를 백엔드로 전송하는 `Datadog::CI::TestSession#finish`를
호출하세요.

#### 테스트 모듈 {#test-module}

테스트 모듈은 세션 내에서 더 작은 작업 단위를 나타냅니다.
지원되는 테스트 프레임워크의 경우, 테스트 모듈은 항상 테스트 세션과 동일합니다.
이 사용 사례에서는 구성 요소화된 애플리케이션의 패키지가 될 수 있습니다.

테스트 모듈을 시작하려면 `Datadog::CI.start_test_module`을 호출하고 모듈 이름을 전달하세요.

모듈 실행이 완료되면 `Datadog::CI::TestModule#finish`를 호출하세요.

#### 테스트 모음 {#test-suite}

테스트 모음은 유사한 기능을 테스트하는 일련의 테스트로 구성됩니다.
단일 테스트 모음은 일반적으로 테스트가 정의된 단일 파일에 해당합니다.

`Datadog::CI#start_test_suite`를 호출하고 테스트 모음 이름을 전달하여 테스트 모음을 생성하세요.

테스트 모음 내의 관련 테스트가 모두 실행을 마치면 `Datadog::CI::TestSuite#finish`를 호출하세요.

#### 테스트 {#test}

테스트는 테스트 모음의 일부로 실행되는 단일 테스트 케이스를 나타냅니다.
일반적으로 테스트 로직을 포함하는 메서드에 해당합니다.

`Datadog::CI#start_test` 또는 `Datadog::CI.trace_test`를 호출하고 테스트 이름과 테스트 모음 이름을 전달하여 테스트 모음에 테스트를 생성하세요. 테스트 모음 이름은 이전 단계에서 시작된 테스트 모음 이름과 동일해야 합니다.

테스트 실행이 완료되면 `Datadog::CI::Test#finish`를 호출하세요.

### 코드 예시 {#code-example}

다음은 API를 사용한 코드 예시입니다.

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## 모범 사례 {#best-practices}

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

-   `unit-tests`
-   `integration-tests`
-   `smoke-tests`
-   `flaky-tests`
-   `ui-tests`
-   `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우, 기본값은 CI 작업 이름과 테스트 명령입니다. CI 작업 이름을 사용할 수 없는 경우 테스트 명령이 사용됩니다.

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

#### `DD_TEST_SESSION_NAME` 사용 시점 {#when-to-use-dd-test-session-name}

Datadog은 테스트 세션 간의 대응 관계를 설정하기 위해 일련의 파라미터를 검사합니다. 테스트를 실행하는 데 사용된 테스트 명령이 그중 하나입니다. 테스트 명령에 실행할 파일 목록과 같이 실행할 때마다 변경되는 문자열이 포함되어 있는 경우, Datadog은 해당 세션들이 서로 관련이 없는 것으로 간주합니다. 예:

-   `bundle exec rspec my_spec.rb my_other_spec.rb`

테스트 명령이 실행마다 달라지는 경우 Datadog은 `DD_TEST_SESSION_NAME` 사용을 권장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /ko/tests/guides/add_custom_measures/?tab=ruby
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /ko/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
[10]: https://github.com/DataDog/datadog-ci-rb
[11]: /ko/getting_started/site/