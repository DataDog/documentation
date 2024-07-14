---
aliases:
- /ko/continuous_integration/intelligent_test_runner/javascript/
- /ko/continuous_integration/intelligent_test_runner/setup/javascript/
code_lang: 자바스크립트(Javascript)
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
kind: documentation
title: JavaScript와 TypeScript를 위한 Intelligent Test Runner
type: multi-code-lang
---

## 개요

자바스크립트(Javascript) 용 지능형 테스트 러너는 개별 테스트가 아닌 전체 _테스트 스위트_(테스트 파일)를 건너뜁니다.


## 호환성

Intelligent Test Runner는 다음 버전 및 테스트 프레임워크에서만 지원됩니다:

* `jest>=24.8.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0` 에서 확인하세요.
  * `testRunner`으로 `jest-circus/runner`만 지원됩니다.
  * `jsdom` 및 `node`만 테스트 환경으로 지원됩니다.
* `mocha>=5.2.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`에서 확인하세요.
  * `nyc`][1]로 mocha를 실행하여 코드 검사를 활성화합니다.
* `cucumber-js>=7.0.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`에서 확인하세요.
  * [`nyc`][1]와 함께 cucumber-js를 실행하여 코드 적용 범위를 활성화합니다.
* `cypress>=6.7.0`
  * `dd-trace>=4.17.0` 또는 `dd-trace>=3.38.0`에서 확인하세요.
  * [코드 지원 범위][2]를 사용하여 웹 애플리케이션을 계측할 수 있습니다.

## 설정

### 테스트 가시성

지능형 테스트 러너를 설정하기 전에 [ 자바스크립트(Javascript) 및 TypeScript에 대한 테스트 가시성][3]을 설정하세요. 에이전트 를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

{{% ci-itr-activation-instructions %}}

## 지능형 테스트 러너를 활성화하여 테스트 실행하기

{{< tabs >}}

{{% tab "온-프레미스 CI 공급자(Datadog Agent)" %}}

설정이 완료되면 평소처럼 테스트를 실행합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "클라우드 CI 공급자 (에이전트리스)" %}}

설정이 완료되면 평소처럼 테스트를 실행합니다.

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress

Cypress용 지능형 테스트 러너가 작동하려면 코드 지원 범위를 통해 웹 애플리케이션을 계측해야 합니다. 활성화에 대한 자세한 내용은 코드 검사, [Cypress 설명서][2]를 참조하세요.

코드 검사를 성공적으로 활성화했는지 확인하려면, Cypress를 사용하여 웹 앱으로 이동하고  `window.__coverage__` 글로벌 변수를 점검합니다. 해당 변수를 사용해 `dd-trace`은 지능형 테스트 러너를 위해 코드 지원 범위를 수집합니다.

## 일관성 없는 테스트 기간

`jest`와 같은 일부 프레임워크에는 다른 테스트가 실행된 후 테스트를 더 빠르게 만드는 캐시 메커니즘이 있습니다([jest cache][4] 문서 참조). 지능형 테스트 러너가 몇 개의 테스트 파일을 제외한 모든 테스트 파일을 건너뛰는 경우 이러한 스위트(suite)는 평소보다 느리게 실행될 수 있습니다. 이는 더 낮은 캐시로 실행되기 때문입니다. 이와 관계없이 테스트 명령의 총 실행 시간은 여전히 줄어들어야 합니다.

## 특정 테스트에 대한 건너뛰기 비활성화

지능형 테스트 러너의 동작을 재정의하여 특정 테스트가 건너뛰지 않도록 할 수 있습니다. 이러한 테스트를 건너뛸 수 없는 테스트라고 합니다.

### 테스트 건너뛸 수 없는 이유는 무엇인가요?

지능형 테스트 러너는 코드 검사 데이터를 사용하여 테스트를 건너뛰어야 하는지 여부를 결정합니다. 경우에 따라 이 데이터만으로는 결정을 내리는 데 충분하지 않을 수 있습니다.

예를 들면 다음과 같습니다:

* 텍스트 파일에서 데이터를 읽는 테스트
* 테스트 중인 코드 외부의 API와 상호 작용하는 테스트(예: 원격 REST API)

테스트를 건너뛸 수 없는 것으로 지정하면 지능형 테스트 러너가 커버리지 데이터에 관계없이 테스트를 실행합니다.

### 테스트를 건너뛸 수 없는 것으로 표시

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress" %}}
테스트 파일 상단에 있는 다음 문서 블록을 사용하여 스위트(suite) 을 건너뛸 수 없는 것으로 표시할 수 있습니다. 이렇게 하면 테스트 파일에 정의된 테스트가 지능형 테스트 실행기에 의해 건너뛰는 것을 방지할 수 있습니다. 이는 jest의 [`testEnvironmentOptions`][1]과 유사합니다.

```javascript
/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
피처 파일에 `@datadog:unskippable` [태그][1]를 사용하여 건너뛸 수 없는 것으로 표시할 수 있습니다. 이렇게 하면 지능형 테스트 러너가 피처 파일에 정의된 시나리오를 건너뛸 수 없습니다.

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

### 건너뛸 수 없는 테스트의 예

이 섹션에서는 건너뛸 수 없는 것으로 표시해야 하는 테스트의 몇 가지 예를 보여줍니다.

#### 고정 장치에 의존하는 테스트
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

#### 외부와 통신하는 테스트 서비스
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


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /ko/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache