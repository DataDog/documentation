---
aliases:
- /ko/continuous_integration/intelligent_test_runner/javascript/
- /ko/continuous_integration/intelligent_test_runner/setup/javascript/
- /ko/intelligent_test_runner/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: 문서
  text: 테스트 결과 및 성능 확인
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결
title: JavaScript 및 TypeScript를 위한 Test Impact Analysis
type: multi-code-lang
---
## 개요 {#overview}

JavaScript를 위한 Test Impact Analysis는 개별 테스트가 아닌 전체 _테스트 모음_(테스트 파일)을 건너뜁니다.


## 호환성 {#compatibility}

Test Impact Analysis는 다음 버전 및 테스트 프레임워크에서만 지원됩니다.

* `jest>=24.8.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`부터.
  * 지원되는 `testRunner`는 `jest-circus/runner`뿐입니다.
  * `jsdom` 및 `node`만 테스트 환경으로 지원됩니다.
* `mocha>=5.2.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`부터.
  * 코드 적용 범위를 활성화하려면 [`nyc`][1]와 함께 mocha를 실행합니다.
* `cucumber-js>=7.0.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`부터.
  * 코드 적용 범위를 활성화하려면 [`nyc`][1]와 함께 cucumber-js를 실행합니다.
* `cypress>=6.7.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`부터.
  * [코드 적용 범위][2]를 사용하여 웹 애플리케이션을 계측합니다.
* `vitest>=1.6.0`
  * `dd-trace>=6.21.0` 또는 `dd-trace>=5.132.0`부터.

## 설정 {#setup}

### Test Optimization {#test-optimization}

Test Impact Analysis를 설정하기 전에 [JavaScript 및 TypeScript를 위한 Test Optimization][3]을 설정합니다. 에이전트를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

{{% ci-itr-activation-instructions %}}

## Test Impact Analysis를 활성화한 상태로 테스트 실행 {#run-tests-with-test-impact-analysis-enabled}

{{< tabs >}}

{{% tab "온프레미스 CI 공급자(Datadog Agent)" %}}

설정이 완료되면 평소처럼 테스트를 실행합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

Vitest의 경우, ESM 로더를 포함하고 `vitest run`을 사용합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn vitest run
{{< /code-block >}}

{{% /tab %}}

{{% tab "클라우드 CI 공급자(Agentless)" %}}

설정이 완료되면 평소처럼 테스트를 실행합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

Vitest의 경우, ESM 로더를 포함하고 `vitest run`을 사용합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn vitest run
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress {#cypress}

Cypress용 Test Impact Analysis가 작동하려면 코드 적용 범위를 사용하여 웹 애플리케이션을 계측해야 합니다. 코드 적용 범위 활성화에 대한 자세한 내용은 [Cypress 문서][2]를 참조하세요.

코드 적용 범위가 성공적으로 활성화되었는지 검사하려면 Cypress로 웹 앱에 접속하여 `window.__coverage__` 전역 변수를 검사합니다. `dd-trace`는 이것을 사용하여 Test Impact Analysis를 위한 코드 적용 범위를 수집합니다.

### Vitest {#vitest}

`dd-trace`에서는 Test Impact Analysis에 필요한 테스트 모음별 코드 적용 범위를 자동으로 수집합니다. 추가 적용 범위 패키지나 `--coverage` 플래그는 필요하지 않습니다.

Test Impact Analysis는 Vitest 브라우저 모드, watch 모드 또는 타입 검사 전용 실행에서는 지원되지 않습니다. 또한 `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true`에 의해 활성화되는 실험 모드에서도 지원되지 않습니다.

## 일관성 없는 테스트 소요 시간 {#inconsistent-test-durations}

`jest`와 같은 일부 프레임워크에는 다른 테스트가 실행된 후 테스트 속도를 높이는 캐시 메커니즘이 있습니다([jest 캐시][4] 문서 참조). Test Impact Analysis가 몇 개의 테스트 파일을 제외한 나머지를 모두 건너뛰는 경우 이러한 테스트 모음은 평소보다 느리게 실행될 수 있습니다. 이는 캐시가 평소보다 덜 예열된 상태에서 실행되기 때문입니다. 그럼에도 불구하고 테스트 명령의 전체 실행 시간은 여전히 단축되어야 합니다.

## 특정 테스트에 대한 건너뛰기 비활성화 {#disabling-skipping-for-specific-tests}

Test Impact Analysis 동작을 재정의하여 특정 테스트를 건너뛰지 않도록 할 수 있습니다. 이러한 테스트를 건너뛸 수 없는 테스트라고 합니다.

### 테스트를 건너뛸 수 없도록 설정하는 이유 {#why-make-tests-unskippable}

Test Impact Analysis는 코드 적용 범위 데이터를 사용하여 테스트를 건너뛸지 여부를 결정합니다. 경우에 따라 이 데이터가 이러한 결정을 내리기에 충분하지 않을 수 있습니다.

예를 들면 다음과 같습니다.

* 텍스트 파일에서 데이터를 읽는 테스트
* 테스트 중인 코드 외부의 API와 상호 작용하는 테스트(예: 원격 REST API)

테스트를 건너뛸 수 없도록 지정하면 Test Impact Analysis가 적용 범위 데이터와 관계없이 해당 테스트를 실행하는 데 도움이 됩니다.

### 테스트를 건너뛸 수 없는 것으로 표시 {#marking-tests-as-unskippable}

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress/Vitest" %}}
다음 docblock을 사용하여 전체 테스트 파일을 건너뛸 수 없는 항목으로 표시할 수 있습니다. 개별 테스트를 건너뛸 수 없는 항목으로 표시할 수는 없습니다. docblock을 파일 맨 위, 코드 앞에 배치합니다. 그 앞에는 다른 주석만 올 수 있습니다. 이렇게 하면 Test Impact Analysis가 테스트 파일에 정의된 테스트를 건너뛰지 않습니다. 이는 jest의 [`testEnvironmentOptions`][1]와 유사합니다.

```javascript
// Other comments can appear above the docblock.

/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

다음 예시는 docblock이 코드 뒤에 나타나고 하나의 테스트만 건너뛸 수 없는 항목으로 표시하려고 시도하기 때문에 유효하지 않습니다.

```javascript
it('can sum', () => {
  expect(1 + 2).to.equal(3)
})

// THIS IS INVALID: The docblock cannot mark an individual test as unskippable.
/**
 * @datadog {"unskippable": true}
 */
it('can subtract', () => {
  expect(3 - 2).to.equal(1)
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
기능 파일에서 `@datadog:unskippable` [태그][1]를 사용하여 이 파일을 건너뛸 수 없는 항목으로 표시할 수 있습니다. 이렇게 하면 Test Impact Analysis가 기능 파일에 정의된 시나리오를 건너뛰지 않습니다.

```
@datadog:unskippable
Feature: Greetings
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"
```
[1]: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags
{{% /tab %}}
{{< /tabs >}}

### 건너뛰지 않아야 하는 테스트의 예시 {#examples-of-tests-that-should-be-unskippable}

이 섹션에서는 건너뛸 수 없는 것으로 표시해야 하는 테스트의 몇 가지 예를 보여줍니다.

#### 픽스처에 의존하는 테스트 {#tests-that-depend-on-fixtures}

```javascript
/**
 * We have a `payload.json` fixture file in `./fixtures/payload`
 * that is processed by `processPayload` and put into a snapshot.
 * Changes in `payload.json` do not affect the test code coverage but can
 * make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
import processPayload from './process-payload';
import payload from './fixtures/payload';

it('can process payload', () => {
    expect(processPayload(payload)).toMatchSnapshot();
});
```

#### 외부 서비스와 통신하는 테스트 {#tests-that-communicate-with-external-services}

```javascript
/**
 * We query an external service running outside the context of
 * the test.
 * Changes in this external service do not affect the test code coverage
 * but can make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
it('can query data', (done) => {
    fetch('https://www.external-service.com/path')
        .then((res) => res.json())
        .then((json) => {
            expect(json.data[0]).toEqual('value');
            done();
        });
});
```

```
# Same way as above we're requesting an external service

@datadog:unskippable
Feature: Process the payload
  Scenario: Server responds correctly
    When the server responds correctly
    Then I should have received "value"
```


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /ko/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache