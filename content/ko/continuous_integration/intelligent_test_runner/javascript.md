---
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
kind: 설명서
title: JavaScript와 TypeScript를 위한 Intelligent Test Runner
---

## 호환성

Intelligent Test Runner는 다음 버전 및 테스트 프레임워크에서만 지원됩니다:

* `jest>=24.8.0`
  * `dd-trace>=3.16.0` 또는 `dd-trace>=2.29.0` 이상.
  * `jest-circus/runner`는 `testRunner`로만 지원됩니다.
  * `jsdom` 및 `node`만 테스트 환경으로 지원됩니다.
* `mocha>=5.2.0`
  * `dd-trace>=3.16.0` 또는 `dd-trace>=2.29.0` 이상.
  * [`nyc`][1]과 함께 mocha를 실행하여 코드 적용 범위를 활성화합니다.
* `cucumber-js>=7.0.0`
  * `dd-trace>=3.16.0` 또는  `dd-trace>=2.29.0` 이상.
  * [`nyc`][1]와 함께 cucumber-js를 실행하여 코드 적용 범위를 활성화합니다.
* `cypress>=6.7.0`
  * `dd-trace>=4.2.0`,`dd-trace>=3.23.0` 또는 `dd-trace>=2.36.0` 이상.
  * 코드 적용 범위로 웹 애플리케이션 계측: [Cypress 설정](#cypress-setup) 참조

## 설정

Intelligent Test Runner를 설정하기 전에 [Javascript 및 Typescript에 대한 Test Visibility][2]를 설정합니다. Agent를 통해 데이터를 보고하는 경우 6.40+/v7.40+를 사용합니다.

Intelligent Test Runner를 활성화하려면 다음 환경 변수를 설정합니다:

`DD_APPLICATION_KEY` (필수)
: 건너뛸 테스트를 쿼리하는 데 사용되는 [Datadog 애플리케이션 키][3].<br/>
**기본값**: `(empty)`

이러한 환경 변수를 설정한 후에는 평소와 같이 테스트를 실행합니다:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_APPLICATION_KEY=$APP_KEY yarn test
{{< /code-block >}}

### Cypress 설정

Intelligent Test Runner for Cypress를 실행하려면 웹 애플리케이션에 코드 적용 범위를 계측해야 합니다. 코드 적용 범위 활성화에 대한 자세한 내용은 [Cypress 설명서][4]에서 확인할 수 있습니다. 코드 적용 범위가 올바르게 활성화되었는지 확인하려면 Cypress를 통해 웹 앱으로 이동하여 글로벌 변수 `window.__coverage__`를 확인합니다. 이것은 `dd-trace`가 Intelligent Test Runner의 코드 적용 범위를 수집하는 데 사용하는 것입니다.


#### UI 활성화
환경 변수를 설정하는 것 외에도, 사용자 또는 "Intelligent Test Runner Activation" 권한이 있는 조직의 사용자가 [테스트 서비스 설정][5] 페이지에서 Intelligent Test Runner를 활성화해야 합니다.

{{< img src="continuous_integration/itr_overview.png" alt="Datadog의 CI 섹션에 있는 테스트 서비스 설정에서 Intelligent test runner 활성화.">}}

#### 스위트 건너뛰기
Javascript를 위한 Intelligent test runner는 개별 테스트가 아닌 전체 _테스트 스위트_(테스트 파일)를 건너뜁니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: /ko/continuous_integration/tests/javascript
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[5]: https://app.datadoghq.com/ci/settings/test-service