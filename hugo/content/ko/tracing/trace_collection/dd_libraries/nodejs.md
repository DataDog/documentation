---
aliases:
- /ko/tracing/nodejs/
- /ko/tracing/languages/nodejs/
- /ko/tracing/languages/javascript/
- /ko/tracing/setup/javascript/
- /ko/agent/apm/nodejs/
- /ko/tracing/setup/nodejs
- /ko/tracing/setup_overview/nodejs
- /ko/tracing/setup_overview/setup/nodejs
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: 소스 코드
  text: 소스 코드
- link: https://datadog.github.io/dd-trace-js
  tag: 설명서
  text: API 설명서
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: tracing/
  tag: 설명서
  text: 고급 사용
title: Node.js 애플리케이션 트레이싱
type: multi-code-lang
---
## 호환성 요구 사항 {#compatibility-requirements}

최신 Node.js Tracer는 Node.js 버전 `>=18`을 지원합니다. Datadog의 Node.js 버전 및 프레임워크 지원(레거시 및 유지 관리 버전 포함) 전체 목록은 [호환성 요구 사항][1] 페이지를 참조하세요.

## 시작하기 {#getting-started}

시작하기 전에 [Agent 설치 및 구성][13]을 이미 완료했는지 확인하세요. 그런 다음 계측을 위해 Datadog SDK를 Node.js 애플리케이션에 추가하려면 다음 단계를 완료하세요.

### Datadog SDK 설치 {#install-the-datadog-sdk}

Node.js 18+용 npm을 사용하여 Datadog SDK를 설치하려면 다음을 실행하세요.

  ```shell
  npm install dd-trace
  ```
지원이 종료된 Node.js 버전 16용 Datadog SDK(`dd-trace` 버전 4.x)를 설치하려면 다음을 실행하세요.
  ```shell
  npm install dd-trace@latest-node16
  ```
Datadog의 배포 태그 및 Node.js 런타임 버전 지원에 대한 자세한 내용은 [호환성 요구 사항][1] 페이지를 참조하세요.
라이브러리의 이전 주요 버전(0.x, 1.x, 2.x, 3.x 또는 4.x)에서 다른 주요 버전으로 업그레이드하는 경우, 이전 버전과 호환되지 않는 변경 사항이 있는지 확인하려면 [마이그레이션 가이드][5]를 읽어보세요.

<div class="alert alert-info">Serverless 환경에서 또는 Single-Step Instrumentation을 사용하는 경우에는 라이브러리가 이미 사전 설치되어 있으므로 종속성으로 추가할 필요가 없습니다. 대신 로컬에서 트레이싱을 사용하려면 개발 종속성으로 추가하세요.
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># instead of `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">복사</button>
    </div>
  </div>
</div>

### Datadog 공개 API 설치(선택 사항) {#install-the-datadog-public-api-optional}

이 단계는 Serverless 환경에서 또는 Single-Step Instrumentation을 사용하여 사용자 지정 계측을 수행하는 경우에만 필요합니다. 그 외의 사용자 지정 계측 사용 사례에서는 선택 사항입니다. Datadog 공개 API를 사용해야 하는 경우에 대한 자세한 내용은 [Datadog API를 사용한 사용자 지정 계측][14]을 참조하세요.

  ```shell
  npm install dd-trace-api
  ```

그런 다음 사용자 지정 계측을 수행하는 모든 코드에서 `dd-trace` 대신 `dd-trace-api`를 가져올 수 있습니다.

### 트레이서 가져오기 및 초기화 {#import-and-initialize-the-tracer}

코드에서 또는 명령줄 인수를 사용하여 트레이서를 가져오고 초기화합니다. Node.js SDK는 다른 모듈보다 **먼저** 가져오고 초기화해야 합니다.

<div class="alert alert-info"><strong>Next.js</strong> 및 <strong>Nest.js</strong>와 같은 프레임워크에서는 환경 변수를 제공하거나 Node.js 플래그를 더 추가해야 합니다. 자세한 내용은 <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">복잡한 프레임워크 사용</a>을 참조하세요.</div>

설정을 완료한 후에도 웹 요청의 URL 경로 누락, 연결이 끊기거나 누락된 스팬 등 완전한 트레이스가 수집되지 않는 경우, **SDK를 올바르게 가져오고 초기화했는지 확인하세요**. SDK를 가장 먼저 초기화해야 하는 이유는 자동 계측에 필요한 모든 라이브러리에 SDK가 올바르게 패치를 적용할 수 있기 때문입니다.

TypeScript, Webpack, Babel 등의 트랜스파일러를 사용하는 경우에는 외부 파일에서 SDK를 가져오고 초기화한 다음, 애플리케이션을 빌드할 때 해당 파일 전체를 가져오세요.

#### 명령줄 인수를 사용하여 SDK 추가 {#add-the-sdk-with-command-line-arguments}

Node.js의 `--require` 옵션을 사용하면 SDK를 한 번에 로드하고 초기화할 수 있습니다.

```sh
node --require dd-trace/init app.js
```

위 방식에서는 SDK의 모든 구성을 환경 변수로 구성해야 합니다. 프로그래밍 방식의 구성을 사용해야 하는 경우에는 전용 파일에서 `dd-trace`를 초기화하고 대신 해당 파일을 요구하세요.

```sh
node --require ./dd-trace.js app.js
```

파일에는 다음 내용이 포함되어야 합니다.

```js
// ./dd-trace.js
require('dd-trace').init({
  // programmatic config
})
```

CLI 인수를 제어할 수 없는 경우에는 환경 변수를 대신 사용할 수 있습니다.

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> 는 기본적으로 <code>true</code> 로 설정되어 있으므로 일부 계측은 초기화 전에 가져오기 시점에 수행됩니다. 계측을 완전히 비활성화하려면 다음 중 하나를 수행할 수 있습니다.
  <ul>
    <li>모듈을 조건부로 가져오기</li>
    <li>설정 <code>DD_TRACE_ENABLED=false</code> (예를 들어 정적 또는 최상위 ESM import로 인해 조건부 로딩이 불가능한 경우)</li>
  <ul>
</div>

#### ESM 애플리케이션 전용: 로더 가져오기 {#esm-applications-only-import-the-loader}

ECMAScript Modules(ESM) 애플리케이션에는 _추가적인_ 명령줄 인수가 필요합니다. SDK를 어떤 방식으로 가져오고 초기화하든 관계없이 다음 인수를 추가하세요.

- **Node.js < v20.6:** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6:** `--import dd-trace/register.js`

예를 들어 Node.js 22에서 위의 첫 번째 방법을 사용해 SDK를 초기화하는 경우에는 다음과 같이 시작합니다.

```sh
node --import dd-trace/register.js app.js
```

이 방법은 `--require dd-trace/init` 명령줄 인수와 함께 사용할 수도 있습니다.

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Node.js v20.6 이상에서는 두 명령줄 인수를 결합한 축약형도 사용할 수 있습니다.

```sh
node --import dd-trace/initialize.mjs app.js
```

### 번들링 {#bundling}

`dd-trace`는 Node.js 애플리케이션이 모듈을 로드할 때 수행하는 `require()` 호출을 가로채는 방식으로 동작합니다. 여기에는 파일 시스템에 액세스하기 위한 `fs` 모듈과 같은 Node.js 내장 모듈과 NPM 레지스트리에서 설치되는 `pg` 데이터베이스 모듈과 같은 모듈이 포함됩니다.

번들러는 애플리케이션이 디스크의 파일에 대해 수행하는 모든 `require()` 호출을 추적합니다. 그런 다음 `require()` 호출을 사용자 지정 코드로 대체하고, 생성된 모든 JavaScript를 하나의 "번들된" 파일로 결합합니다. `require('fs')`와 같은 내장 모듈이 로드되는 경우에는 해당 호출이 생성된 번들에서도 그대로 유지될 수 있습니다.

이 시점부터 `dd-trace`와 같은 APM 도구는 제대로 작동하지 않게 됩니다. 내장 모듈에 대한 호출은 계속 가로챌 수 있지만, 타사 라이브러리에 대한 호출은 가로채지 못합니다. 즉, 번들러로 `dd-trace` 애플리케이션을 번들링하면 디스크 액세스 관련 정보(`fs`를 통해)와 아웃바운드 HTTP 요청 정보(`http`를 통해)는 수집할 수 있지만, 타사 라이브러리 호출은 누락될 가능성이 높습니다. 예를 들면 다음과 같습니다.
- `express` 프레임워크에 대한 수신 요청 경로 정보 추출
- `mysql` 데이터베이스 클라이언트에서 실행된 쿼리 표시

일반적인 해결 방법은 APM이 계측해야 하는 모든 타사 모듈을 번들러의 "외부" 모듈로 처리하는 것입니다. 이 설정을 사용하면 계측 대상 모듈은 디스크에 그대로 남아 `require()`를 통해 계속 로드되고, 계측 대상이 아닌 모듈만 번들링됩니다. 그러나 이렇게 하면 빌드 결과물에 불필요한 파일이 많이 포함되며, 번들링의 목적이 점차 퇴색하게 됩니다.

Datadog은 사용자 지정 구축된 번들러 플러그인을 사용할 것을 권장합니다. 이러한 플러그인은 번들러의 동작 방식을 제어하고, 중간 코드를 삽입하며, "변환된" `require()` 호출을 가로챌 수 있습니다. 그 결과 더 많은 패키지가 번들된 JavaScript 파일에 포함됩니다.

**참고**: 일부 애플리케이션은 모듈의 100%를 번들링할 수 있지만, 네이티브 모듈은 여전히 번들 외부에 남아 있어야 합니다.

#### esbuild로 번들링 {#bundling-with-esbuild}

이 라이브러리는 esbuild 플러그인 형태로 실험적인 esbuild 지원을 제공하며, 최소 Node.js v16.17 또는 v18.7이 필요합니다. 플러그인을 사용하려면 `dd-trace@3+`가 설치되어 있는지 확인한 다음, 번들을 빌드할 때 `dd-trace/esbuild` 모듈을 요구하세요.

다음은 esbuild와 함께 `dd-trace`를 사용하는 예입니다.

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16'],
  external: [
    // required if you use native metrics
    '@datadog/native-metrics',

    // required if you use profiling
    '@datadog/pprof',

    // required if you use Datadog security features
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-iast-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Next.js로 번들링 {#bundling-with-nextjs}

Next.js 또는 애플리케이션 번들링에 webpack을 사용하는 다른 프레임워크를 사용하는 경우,
`next.config.js` 구성 파일에 webpack 예제와 유사한 선언을 추가하세요.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... non-relevant parts omitted, substitute your own config ...

  // this custom webpack config is required for Datadog tracing to work
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const externals = [
      // required if you use native metrics
      '@datadog/native-metrics',

      // required if you use profiling
      '@datadog/pprof',

      // required if you use Datadog security features
      '@datadog/native-appsec',
      '@datadog/native-iast-taint-tracking',
      '@datadog/native-iast-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### 지원되지 않는 Datadog 기능 {#unsupported-datadog-features}

다음 기능은 Node.js tracer에서 기본적으로 비활성화되어 있습니다. 이 기능들은 번들링을 지원하지 않으며 애플리케이션이 번들링된 경우 사용할 수 없습니다.

- APM: Dynamic Instrumentation

#### 번들링 관련 일반 참고 사항 {#general-bundling-remarks}

**참고**: SDK는 네이티브 모듈(컴파일된 C++ 코드, 일반적으로 `.node` 파일 확장자 사용)을 사용하므로, `external` 목록에 항목을 추가해야 합니다. 현재 Node.js tracer에서 사용하는 네이티브 모듈은 `@datadog` 접두사가 붙은 패키지에 포함되어 있습니다. 또한 번들된 애플리케이션과 함께 `node_modules/` 디렉터리를 배포해야 합니다. `node_modules/` 디렉터리 전체를 배포할 필요는 없습니다. 해당 디렉터리에는 번들에 포함되어야 하는 불필요한 패키지가 많이 들어 있기 때문입니다.

필요한 네이티브 모듈(및 해당 종속성)만 포함된 더 작은 `node_modules/` 디렉터리를 생성하려면, 먼저 필요한 패키지 버전을 확인한 후 임시 디렉터리를 생성하여 이를 설치하고, 그 결과 생성된 `node_modules/` 디렉터리를 복사하면 됩니다. 예를 들면 다음과 같습니다.

```sh
cd path/to/project
npm ls @datadog/native-metrics
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/native-metrics@2.0.0
$ npm ls @datadog/pprof
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/pprof@5.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-metrics@2.0.0 @datadog/pprof@5.0.0
cp -R ./node_modules path/to/bundle
```

**참고**: Next.js의 경우 `path/to/bundle`는 일반적으로 애플리케이션의 `.next/standalone` 디렉터리입니다.

이 단계가 완료되면 애플리케이션 코드와 대부분의 종속성으로 구성된 번들과 네이티브 모듈 및 해당 종속성을 포함하는 `node_modules/` 디렉터리를 함께 배포할 수 있습니다.

## 구성 {#configuration}

필요한 경우 Unified Service Tagging 구성을 포함하여, SDK가 애플리케이션 성능 텔레메트리 데이터를 원하는 방식으로 전송하도록 구성하세요. 자세한 내용은 [라이브러리 구성][4]을 참조하세요.

초기화 옵션 목록은 [트레이서 설정][3]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ko/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /ko/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /ko/tracing/trace_collection/library_injection_local/
[13]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[14]: /ko/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js