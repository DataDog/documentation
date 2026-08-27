---
aliases:
- /ko/continuous_integration/setup_tests/javascript
- /ko/continuous_integration/tests/javascript
- /ko/continuous_integration/tests/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 설명서
  text: 컨테이너 내 테스트를 위한 환경 변수 전달
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /tests/test_impact_analysis/javascript
  tag: 설명서
  text: Test Impact Analysis로 테스트 작업 속도 높이기
- link: /tests/troubleshooting/
  tag: 설명서
  text: Test Optimization 문제 해결
title: JavaScript 및 TypeScript 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

{{< tabs >}}
{{% tab "dd-trace v6" %}}

| 테스트 프레임워크 | 버전 | 참고 사항 |
|---|---|---|
| Jest | >= 28.0.0 | 테스트 환경으로 `jsdom`(`jest-environment-jsdom` 패키지 내) 및 `node`(`jest-environment-node` 패키지 내)만 지원됩니다. `jest-electron-runner`의 `@jest-runner/electron/environment`와 같은 사용자 지정 환경은 지원되지 않습니다.<br><br>[`testRunner`](https://jestjs.io/docs/configuration#testrunner-string)로 [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus)만 지원됩니다.<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) 는 `dd-trace>=6.1.0`부터 지원됩니다. |
| Mocha | >= 8.0.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 12.0.0 |
| Playwright | >= 1.38.0 |
| Vitest | >= 1.6.0 | [`test.concurrent`](https://vitest.dev/api/#test-concurrent)는 `dd-trace>=6.1.0`부터 지원됩니다. |

`dd-trace` v6에는 Node.js 22 이상이 필요합니다.

{{% /tab %}}
{{% tab "dd-trace v5" %}}

| 테스트 프레임워크 | 버전 | 참고 사항 |
|---|---|---|
| Jest | >= 24.8.0 | 테스트 환경으로 `jsdom`(`jest-environment-jsdom` 패키지 내) 및 `node`(`jest-environment-node` 패키지 내)만 지원됩니다. `jest-electron-runner`의 `@jest-runner/electron/environment`와 같은 사용자 지정 환경은 지원되지 않습니다.<br><br>[`testRunner`](https://jestjs.io/docs/configuration#testrunner-string)로 [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus)만 지원됩니다.<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) 는 `dd-trace>=5.112.0`부터 지원됩니다. |
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.6.0 | `dd-trace>=5.18.0`부터 지원됩니다. [`test.concurrent`](https://vitest.dev/api/#test-concurrent)는 `dd-trace>=5.112.0`부터 지원됩니다. |

{{% /tab %}}
{{< /tabs >}}

계측은 런타임에 작동하므로 TypeScript, Webpack 또는 Babel과 같은 모든 트랜스파일러가 기본적으로 지원됩니다.

## 보고 메서드 구성 {#configuring-reporting-method}

테스트 결과를 Datadog에 보고하려면 Datadog JavaScript 라이브러리를 구성해야 합니다.

{{< tabs >}}
{{% tab "자동 계측을 지원하는 CI 공급자" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>참고</strong>: Cypress 테스트에는 자동 계측이 지원되지 않습니다. Cypress 테스트를 계측하려면 아래에 설명된 수동 계측 단계를 따르세요.
</div>

{{% /tab %}}

{{% tab "기타 클라우드 CI 공급자" %}}
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "온프레미스 CI 공급자" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## JavaScript 트레이서 설치 {#installing-the-javascript-tracer}

[JavaScript 트레이서][3]를 설치하려면 다음을 실행하세요.

```bash
yarn add --dev dd-trace
```

자세한 내용은 [JavaScript 트레이서 설치 설명서][4]를 참조하세요.

## 테스트 계측 {#instrument-your-tests}

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
`NODE_OPTIONS` 환경 변수를 `-r dd-trace/ci/init`으로 설정합니다. 평소와 같이 테스트를 실행하고, 필요시 `DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름을 지정합니다.

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**참고**: `NODE_OPTIONS`에 값을 설정하는 경우 이 값이 `-r dd-trace/ci/init`을 덮어쓰지 않는지 확인하세요. 이 작업은 `${NODE_OPTIONS:-}` 절을 사용하여 수행할 수 있습니다.

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests}

현재 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Node.js 사용자 지정 계측 설명서의 [태그 추가][1] 섹션을 참조하세요.


### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests}

태그와 같이 현재 활성 스팬을 사용하여 테스트에 사용자 지정 측정값을 추가할 수 있습니다.

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][2]를 참조하세요.

### Mocha ECMAScript 모듈(ESM) {#mocha-ecmascript-modules-esm}
[Mocha >=9.0.0][3]은 ESM 우선 접근 방식을 사용하여 테스트 파일을 로드합니다. 테스트에 대한 완전한 가시성을 확보하려면 `NODE_OPTIONS`를 `-r dd-trace/ci/init --import dd-trace/register.js`로 설정하세요. 자세한 내용은 [`dd-trace-js` ESM 지원][4]을 참조하세요.


[1]: /ko/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ko/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
`NODE_OPTIONS` 환경 변수를 `-r dd-trace/ci/init`으로 설정합니다. 평소와 같이 테스트를 실행하고, 필요시 `DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름을 지정합니다.

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**참고**: `NODE_OPTIONS`에 값을 설정하는 경우 이 값이 `-r dd-trace/ci/init`을 덮어쓰지 않는지 확인하세요. 이 작업은 `${NODE_OPTIONS:-}` 절을 사용하여 수행할 수 있습니다.

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests-1}

현재 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('team_owner', 'my_team')
  // ...
})

test('landing page', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('test.cpu.usage', 'high')
  // ...
})
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Node.js 사용자 지정 계측 설명서의 [태그 추가][1] 섹션을 참조하세요.

### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests-1}

현재 활성 스팬을 사용하여 테스트에 사용자 지정 측정값을 추가할 수도 있습니다.

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('memory_allocations', 16)
  // ...
})
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][2]를 참조하세요.

### Playwright - RUM 통합 {#playwright-rum-integration}

테스트 중인 브라우저 애플리케이션이 [브라우저 모니터링][3]을 사용하여 계측되는 경우, Playwright 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다. 자세한 내용은 [RUM 가이드를 사용하여 브라우저 테스트 계측][4]을 참조하세요.

### 테스트 실패 스크린샷 업로드 {#upload-test-failure-screenshots}

활성화되면 Test Optimization은 테스트가 실패할 때 Playwright가 캡처하는 스크린샷을 업로드합니다. Test Optimization 테스트 세부 정보 사이드 패널의 {{< ui >}}Media{{< /ui >}} 탭에서 스크린샷을 조회하세요. 이를 실패 시점의 브라우저 상태를 검사하는 데 사용할 수 있습니다.

{{< img src="continuous_integration/tests/setup/playwright-failure-screenshot-media-tab.png" alt="Test Optimization 테스트 세부 정보 사이드 패널의 Media 탭에 표시된 Playwright 실패 스크린샷입니다." style="width:100%;" >}}

v5 릴리스 라인에서는 [`dd-trace` v5.116.0 이상][5]을 사용하고, v6 릴리스 라인에서는 [`dd-trace` v6.5.0 이상][6]을 사용하세요.

스크린샷 업로드를 활성화하려면 `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 환경 변수를 `1`로 설정하세요. Playwright 구성에서 `use` 아래의 [`screenshot`][7]을 다음 값 중 하나로 설정합니다.

- `'on'`: 각 테스트 후 스크린샷을 캡처합니다.
- `'only-on-failure'`: 각 테스트 실패 후 스크린샷을 캡처합니다.
- `'on-first-failure'`: 각 테스트의 첫 번째 실패 후 스크린샷을 캡처합니다.

**참고**: `'on'`을 사용하는 경우, Test Optimization은 실패한 테스트의 스크린샷만 업로드합니다.

[1]: /ko/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ko/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[4]: /ko/continuous_integration/guides/rum_integration/
[5]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.116.0
[6]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.5.0
[7]: https://playwright.dev/docs/api/class-testoptions#test-options-screenshot
{{% /tab %}}

{{% tab "Cucumber" %}}
`NODE_OPTIONS` 환경 변수를 `-r dd-trace/ci/init`으로 설정합니다. 평소와 같이 테스트를 실행하고, 필요시 `DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름을 지정합니다.

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**참고**: `NODE_OPTIONS`에 값을 설정하는 경우 이 값이 `-r dd-trace/ci/init`을 덮어쓰지 않는지 확인하세요. 이 작업은 `${NODE_OPTIONS:-}` 절을 사용하여 수행할 수 있습니다.

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests-2}

현재 활성 스팬을 가져와 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Node.js 사용자 지정 계측 설명서의 [태그 추가][1] 섹션을 참조하세요.


### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests-2}

현재 활성 스팬을 가져와 테스트에 사용자 지정 측정값을 추가할 수도 있습니다.

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][2]를 참조하세요.

[1]: /ko/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ko/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress 버전 10 이상 {#cypress-version-10-or-later}

Cypress API 설명서를 사용하여 `cypress>=10`에 대한 [플러그인 사용 방법을 알아보세요][1].

`cypress.config.js` 파일에서 다음을 설정합니다.

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

`supportFile`의 **최상위 수준**에 다음 줄을 추가합니다.

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

다른 Cypress 플러그인을 사용하는 경우, `cypress.config.js` 파일에 다음이 포함되어야 합니다.

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // your previous code is before this line
      return require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

#### Cypress `after:run` 이벤트 {#cypress-afterrun-event}
Datadog이 작동하려면 [`after:run`][2] Cypress 이벤트가 필요하며, Cypress는 해당 이벤트에 대해 여러 핸들러를 허용하지 않습니다. `after:run`에 대한 핸들러를 이미 정의한 경우, `'dd-trace/ci/cypress/after-run'`을 가져와 Datadog 핸들러를 수동으로 추가하세요.

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:run', (details) => {
        // other 'after:run' handlers
        // important that this function call is returned
        return require('dd-trace/ci/cypress/after-run')(details)
      })
    }
  }
})
{{< /code-block >}}

#### Cypress `after:spec` 이벤트 {#cypress-afterspec-event}
Datadog이 작동하려면 [`after:spec`][3] Cypress 이벤트가 필요하며, Cypress는 해당 이벤트에 대해 여러 핸들러를 허용하지 않습니다. `after:spec`에 대한 핸들러를 이미 정의한 경우, `'dd-trace/ci/cypress/after-spec'`을 가져와 Datadog 핸들러를 수동으로 추가하세요.

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:spec', (...args) => {
        // other 'after:spec' handlers
        // Important that this function call is returned
        // Important that all the arguments are passed
        return require('dd-trace/ci/cypress/after-spec')(...args)
      })
    }
  }
})
{{< /code-block >}}

평소와 같이 테스트를 실행하고, 필요시 `DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름을 지정합니다.

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests-3}

팀 소유자와 같은 추가 정보를 테스트에 추가하려면 테스트 또는 후크에서 `cy.task('dd:addTags', { yourTags: 'here' })`를 사용하세요.

예를 들면 다음과 같습니다.

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each': 'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui'
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Node.js 사용자 지정 계측 설명서의 [태그 추가][4] 섹션을 참조하세요.

### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests-3}

메모리 할당과 같은 사용자 지정 측정값을 테스트에 추가하려면 테스트 또는 후크에서 `cy.task('dd:addTags', { yourNumericalTags: 1 })`를 사용하세요.

예를 들면 다음과 같습니다.

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][5]를 참조하세요.

### Cypress - RUM 통합 {#cypress-rum-integration}

테스트 중인 브라우저 애플리케이션이 [브라우저 모니터링][6]을 사용하여 계측되는 경우, Cypress 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다. 자세한 내용은 [RUM 가이드를 사용하여 브라우저 테스트 계측][7]을 참조하세요.

### 테스트 실패 스크린샷 업로드 {#upload-test-failure-screenshots-1}

활성화되면 Test Optimization은 테스트가 실패할 때 Cypress가 캡처하는 스크린샷을 업로드합니다. 이 스크린샷은 Test Optimization 테스트 세부 정보 사이드 패널의 {{< ui >}}Media{{< /ui >}} 탭에 나타납니다. 이를 실패 시점의 브라우저 상태를 검사하는 데 사용할 수 있습니다.

{{< img src="continuous_integration/tests/setup/cypress-failure-screenshot-media-tab.png" alt="Test Optimization 테스트 세부 정보 사이드 패널의 Media 탭에 표시된 Cypress 실패 스크린샷입니다." style="width:100%;" >}}

v5 릴리스 라인에서는 [`dd-trace` v5.112.0 이상][8]을 사용하고, v6 릴리스 라인에서는 [`dd-trace` v6.1.0 이상][9]을 사용하세요.

스크린샷 업로드를 활성화하려면 `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` 환경 변수를 `1`로 설정하세요. Cypress 구성에서 [`screenshotOnRunFailure`][10]가 `true`(기본값)로 설정되어 있는지 확인하세요.

[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: /ko/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[5]: /ko/tests/guides/add_custom_measures/?tab=javascripttypescript
[6]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[7]: /ko/continuous_integration/guides/rum_integration/
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.112.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.1.0
[10]: https://docs.cypress.io/app/references/configuration#Screenshots
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-danger">
  <strong>참고</strong>: <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest는 ESM 우선 접근 방식을 사용</a>하므로 구성이 다른 테스트 프레임워크와 다릅니다.
</div>

Vitest 계측을 위해 `dd-trace` 메이저 버전에서 지원하는 Node.js 버전을 사용하세요.
- `dd-trace` v5에는 Node.js 18.19 이상 또는 Node.js 20.6 이상이 필요합니다.
- `dd-trace` v6에는 Node.js 22 이상이 필요합니다.

`NODE_OPTIONS` 환경 변수를 `--import dd-trace/register.js -r dd-trace/ci/init`으로 설정합니다. 평소와 같이 테스트를 실행하고, 필요시 `DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름을 지정합니다.

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**참고**: `NODE_OPTIONS`에 값을 설정하는 경우 이 값이 `--import dd-trace/register.js -r dd-trace/ci/init`을 덮어쓰지 않는지 확인하세요. 이 작업은 `${NODE_OPTIONS:-}` 절을 사용하여 수행할 수 있습니다.

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### 테스트에 사용자 지정 태그 또는 측정값 추가 {#adding-custom-tags-or-measures-to-tests}

현재 활성 스팬을 사용하여 테스트에 사용자 지정 태그를 추가할 수 있습니다.

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('team_owner', 'my_team')

  expect(1 + 2).toBe(3)
})
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 내용은 Node.js 사용자 지정 계측 설명서의 [태그 추가][1] 섹션을 참조하세요.

현재 활성 스팬을 사용하여 테스트에 사용자 지정 측정값을 추가할 수도 있습니다.

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('memory_allocations', 16)

  expect(1 + 2).toBe(3)
})
```

사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][2]를 참조하세요.

[1]: /ko/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /ko/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{< /tabs >}}

### "Cannot find module 'dd-trace/ci/init'" 오류 해결 방법 {#how-to-fix-cannot-find-module-dd-traceciinit-errors}

`dd-trace`를 사용할 때 다음과 같은 오류 메시지가 표시될 수 있습니다.

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

이는 `NODE_OPTIONS`를 잘못 사용했기 때문일 수 있습니다.

예를 들어, GitHub Action이 다음과 같은 경우

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    # Invalid NODE_OPTIONS
    env:
      NODE_OPTIONS: -r dd-trace/ci/init
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

**참고:** `NODE_OPTIONS`가 `npm install`을 포함한 모든 노드 프로세스에 의해 해석되므로 이는 작동하지 않습니다. 설치되기 전에 `dd-trace/ci/init`을 가져오려고 하면 이 단계가 실패합니다.

GitHub Action은 대신 다음과 같아야 합니다.

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
        env:
          NODE_OPTIONS: -r dd-trace/ci/init
```

다음 모범 사례를 따르세요.

* `NODE_OPTIONS` 환경 변수가 테스트를 실행하는 프로세스에만 설정되어 있는지 확인하세요.
* 특히 파이프라인 또는 작업 정의의 전역 환경 변수 설정에서 `NODE_OPTIONS`를 정의하지 마세요.


#### Yarn 2 이상 사용 {#using-yarn-2-or-later}

`yarn>=2` 및 `.pnp.cjs` 파일을 사용하는 경우에도 동일한 오류가 발생할 수 있습니다.

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

`NODE_OPTIONS`를 다음으로 설정하여 오류를 해결할 수 있습니다.

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## 코드 커버리지 보고 {#reporting-code-coverage}

테스트가 [Istanbul][5]로 계측되면 Datadog Tracer(v3.20.0 이상)는 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에 이를 보고합니다.

테스트 세션의 **Coverage** 탭에서 테스트 커버리지 변화를 확인할 수 있습니다.

자세한 내용은 [Code Coverage][6]를 참조하세요.

## 구성 설정 {#configuration-settings}

다음은 SDK와 함께 사용할 수 있는 가장 중요한 구성 설정의 목록입니다.

`test_session.name`
: `integration-tests`, `unit-tests` 또는 `smoke-tests` 등 테스트 그룹을 식별하는 데 사용하세요.<br/>
**환경 변수**: `DD_TEST_SESSION_NAME`<br/>
**기본값**: `dd-trace` v6의 경우 `jest`, `mocha`, `playwright test` 또는 `cucumber-js`와 같은 프레임워크 호출입니다. `dd-trace` v5의 경우 CI 작업 이름과 테스트 명령의 조합입니다.<br/>
**예시**: `unit-tests`, `integration-tests`, `smoke-tests`

`service`
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**환경 변수**: `DD_SERVICE`<br/>
**기본값**: (테스트 프레임워크 이름)<br/>
**예시**: `my-ui`

`env`
: 테스트가 실행되는 환경의 이름입니다.<br/>
**환경 변수**: `DD_ENV`<br/>
**기본값**: `none`<br/>
**예시**: `local`, `ci`

`url`
: `http://hostname:port` 형식의 트레이스 수집용 Datadog Agent URL입니다.<br/>
**환경 변수**: `DD_TRACE_AGENT_URL`<br/>
**기본값**: `http://localhost:8126`

`service` 및 `env` 예약 태그에 대한 자세한 내용은 [Unified Service Tagging][7]을 참조하세요. 다른 모든 [Datadog Tracer 구성][8] 옵션도 사용할 수 있습니다.

## Git 메타데이터 수집 {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 수동 테스트 API {#manual-testing-api}

<div class="alert alert-danger">
  <strong>참고</strong>: 수동 테스트 API는 <code>dd-trace</code> 버전 <code>5.23.0</code> 및 <code>4.47.0</code>부터 사용할 수 있습니다.
</div>

Jest, Mocha, Cypress, Playwright, Cucumber 또는 Vitest를 사용하는 경우 **수동 테스트 API를 사용하지 마세요**. Test Optimization이 자동으로 이를 계측하고 테스트 결과를 Datadog으로 전송하기 때문입니다. 수동 테스트 API는 이미 지원되는 테스트 프레임워크와는 **호환되지 않습니다**.

지원되지 않는 테스트 프레임워크를 사용하거나 다른 테스트 메커니즘이 있는 경우에만 수동 테스트 API를 사용하세요.

수동 테스트 API는 Node.js의 `node:diagnostics_channel` 모듈을 활용하며 게시할 수 있는 채널을 기반으로 합니다.

```javascript
const { channel } = require('node:diagnostics_channel')

const { describe, test, beforeEach, afterEach, assert } = require('my-custom-test-framework')

const testStartCh = channel('dd-trace:ci:manual:test:start')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')
const testSuite = __filename

describe('can run tests', () => {
  beforeEach((testName) => {
    testStartCh.publish({ testName, testSuite })
  })
  afterEach((status, error) => {
    testFinishCh.publish({ status, error })
  })
  test('first test will pass', () => {
    assert.equal(1, 1)
  })
})
```

### 테스트 시작 채널 {#test-start-channel}

테스트가 시작됨을 게시하려면 ID `dd-trace:ci:manual:test:start`로 이 채널을 가져오세요. 이 작업을 수행하기 좋은 위치는 `beforeEach` 후크 또는 이와 유사한 위치입니다.

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... code for your testing framework goes here
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// code for your testing framework continues here ...
```

게시할 페이로드에는 곧 시작될 테스트를 식별하는 문자열인 `testName` 및 `testSuite` 속성이 있습니다.

### 테스트 완료 채널 {#test-finish-channel}

테스트가 종료됨을 게시하려면 ID `dd-trace:ci:manual:test:finish`로 이 채널을 가져오세요. 이 작업을 수행하기 좋은 위치는 `afterEach` 후크 또는 이와 유사한 위치입니다.

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... code for your testing framework goes here
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// code for your testing framework continues here ...
```

게시할 페이로드에는 `status` 및 `error` 속성이 있습니다.

* `status`는 다음 세 가지 값 중 하나를 사용하는 문자열입니다.
  테스트 통과 시 * `'pass'`
  테스트 실패 시 * `'fail'`
  테스트를 건너뛰면 * `'skip'`

* `error` 는 테스트가 실패한 이유를 포함하는 `Error` 객체입니다.

### 태그 채널 추가 {#add-tags-channel}

테스트에 사용자 지정 태그가 필요함을 게시하려면 ID `dd-trace:ci:manual:test:addTags`로 이 채널을 가져오세요. 이 작업은 테스트 함수 내에서 수행할 수 있습니다.

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... code for your testing framework goes here
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// code for your testing framework continues here ...
```

게시할 페이로드는 테스트에 추가되는 태그 또는 측정값의 딕셔너리 `<string, string|number>`입니다.


### 테스트 실행 {#run-the-tests}

테스트 시작 및 종료 채널이 코드에 있으면 다음 환경 변수를 포함하여 평소와 같이 테스트 프레임워크를 실행합니다.

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## 알려진 제한 사항 {#known-limitations}

### 브라우저 테스트 {#browser-tests}
브라우저 테스트는 `mocha`, `jest`, `cucumber`, `cypress`, `playwright`로 실행되고 `vitest`는 `dd-trace-js`로 계측되지만 브라우저 세션 자체에 대한 가시성은 기본적으로 제공되지 않습니다(예: 네트워크 호출, 사용자 액션, 페이지 로드 등).

브라우저 프로세스에 대한 가시성을 원한다면 [RUM 및 Session Replay][9] 사용을 고려하세요. Cypress 또는 Playwright를 사용할 때 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다. 자세한 내용은 [RUM 가이드를 사용하여 브라우저 테스트 계측][10]을 참조하세요.

### Cypress 대화형 모드 {#cypress-interactive-mode}

Cypress 대화형 모드(`cypress open`을 실행하여 진입 가능)는 [`before:run`][11]과 같은 일부 Cypress 이벤트가 발생하지 않기 때문에 Test Optimization에서 지원되지 않습니다. 그래도 시도하려면 `experimentalInteractiveRunEvents: true`를 [Cypress 구성 파일][12]에 전달하세요.

### Cypress 테스트 격리가 필요한 재시도 {#retries-require-cypress-test-isolation}

Cypress [테스트 격리][13]가 활성화되어 있어야(기본값)
재시도 기반 Test Optimization 기능이 작동합니다. `testIsolation`이 Cypress 구성에서
`false`로 설정된 경우, `dd-trace`가
[조기 불안정성 탐지][22], [자동 테스트 재시도][23] 및
[해결 시도][24] 등 모든 테스트 재시도를 비활성화합니다. 이러한 기능은 각 테스트를 제자리에서 다시 실행하는데 이를 위해서는 격리가 필요하기 때문입니다.

격리가 비활성화되면 트레이서가 경고 `Test isolation is
disabled, retries will not be enabled`를 기록하고, 어떤 테스트 실행에도
`@test.test_management.is_attempt_to_fix` 태그가 지정되지 않습니다. 트레이서가 전역
`testIsolation` 값을 읽기 때문에 스위트별 `describe` 재정의로 인해 재시도가 다시 활성화되지 않습니다.

### Jest의 `--forceExit` {#jests-forceexit}
Jest의 [--forceExit][15] 옵션은 데이터 손실을 유발할 수 있습니다. Datadog은 테스트가 완료된 직후 데이터를 전송하려고 시도하지만 프로세스를 갑자기 종료하면 일부 요청이 실패할 수 있습니다. `--forceExit` 사용 시 주의하세요.

### Mocha의 `--exit` {#mochas-exit}
Mocha의 [--exit][16] 옵션은 데이터 손실을 유발할 수 있습니다. Datadog은 테스트가 완료된 직후 데이터를 전송하려고 시도하지만 프로세스를 갑자기 종료하면 일부 요청이 실패할 수 있습니다. `--exit` 사용 시 주의하세요.

### Vitest의 브라우저 모드 {#vitests-browser-mode}
Vitest의 [브라우저 모드][17]는 지원되지 않습니다.

### Vitest의 테스트 기간 오버헤드 {#vitests-test-duration-overhead}

기본적으로 Vitest의 [`isolate`][21] 옵션은 `true`이므로 각 테스트 파일이 자체 포크 또는 스레드에서 실행됩니다. Vitest는 ESM 우선 접근 방식을 사용하며 계측을 위해 [import-in-the-middle][20]에 의존합니다. 이로 인해 스위트가 시작될 때마다 설정 비용이 발생합니다. 격리 기능을 사용하면 파일마다 해당 설정 비용이 반복적으로 발생합니다. 설정 시간이 벽시계 시간을 압도할 수 있기 때문에 작고 빠른 스위트가 많을 때 그 영향이 가장 큽니다.

오버헤드를 줄이려면 Vitest 구성 파일에서 `isolate: false`를 설정하거나 테스트 명령에 `--no-isolate`를 전달하세요.

더 낮은 워커 시작 오버헤드로 Vitest 격리를 활성 상태로 유지하려면 `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true`를 설정하세요. 이 옵션은 `dd-trace` v5(`5.111.0`부터) 및 v6(`6.0.0`부터)에서 사용할 수 있습니다. 이 옵션은 Vitest `3.2.6` 이상 버전에서 격리된 Vitest 워커-풀 실행에 적용되며, 지원되지 않는 구성의 경우 일반 워커 계측으로 폴백됩니다.

이 모드는 Vitest 워커에서 `dd-trace`를 초기화하지 않으므로 다음 기능이 지원되지 않습니다.

- 사용자 지정 테스트 태그
- 사용자 지정 스팬
- 테스트 코드의 로그 상관관계
- 실패한 테스트 재실행

## 모범 사례 {#best-practices}

테스트 프레임워크와 Test Optimization을 최대한 활용하려면 다음 모범 사례를 따르세요.

### 파라미터화된 테스트 {#parameterized-tests}

가능하다면 테스트 프레임워크가 파라미터화된 테스트를 위해 제공하는 도구를 활용하세요. 예를 들어, `jest`의 경우 다음과 같습니다.

다음을 피하세요.
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

대신 [`test.each`][18]를 사용하세요.

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

`mocha`의 경우 [`mocha-each`][19]를 사용하세요.

{{< code-block lang="javascript" >}}
const forEach = require('mocha-each');
forEach([
  [1,2,3],
  [3,4,7]
])
.it('adds %i and %i then returns %i', (a,b,expected) => {
  expect(a+b).to.equal(expected)
});
{{< /code-block >}}

이 접근 방식을 사용하면 테스트 프레임워크와 Test Optimization이 모두 테스트를 구분할 수 있습니다.

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우 기본값은 다음과 같습니다.

- `dd-trace` v6의 경우 `jest`, `mocha`, `playwright test` 또는 `cucumber-js`와 같은 프레임워크 호출
- `dd-trace` v5의 경우 CI 작업 이름과 테스트 실행에 사용된 명령의 조합(예: `my-ci-job yarn test`)

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ko/tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /ko/tests/code_coverage/?tab=javascripttypescript
[7]: /ko/getting_started/tagging/unified_service_tagging
[8]: /ko/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: /ko/real_user_monitoring/application_monitoring/browser/
[10]: /ko/continuous_integration/guides/rum_integration/
[11]: https://docs.cypress.io/api/plugins/before-run-api
[12]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[13]: https://docs.cypress.io/app/core-concepts/test-isolation
[15]: https://jestjs.io/docs/cli#--forceexit
[16]: https://mochajs.org/running/cli/#--exit
[17]: https://vitest.dev/guide/browser/
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
[20]: https://github.com/nodejs/import-in-the-middle
[21]: https://vitest.dev/config/isolate
[22]: /ko/tests/flaky_tests/early_flake_detection/
[23]: /ko/tests/flaky_tests/auto_test_retries/
[24]: /ko/tests/flaky_management/#confirm-fixes-for-flaky-tests