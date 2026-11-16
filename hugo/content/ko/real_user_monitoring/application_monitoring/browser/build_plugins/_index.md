---
algolia:
  tags:
  - build plugins
  - webpack
  - vite
  - esbuild
  - rollup
  - rspack
  - bundler
description: Datadog 빌드 플러그인을 JavaScript 번들러와 통합하여 빌드 시점에 소스 맵 업로드, 개인정보 보호 허용 목록
  생성 및 기타 RUM 작업을 자동화하세요.
further_reading:
- link: https://github.com/DataDog/build-plugins
  tag: 소스 코드
  text: Datadog Build Plugins GitHub 리포지토리
- link: /real_user_monitoring/application_monitoring/browser/setup/client
  tag: 설명서
  text: RUM Browser 클라이언트 측 설정
title: 빌드 플러그인
---
## 개요 {#overview}

Datadog 빌드 플러그인은 JavaScript 번들러와 통합되어 빌드 프로세스 중에 일반적인 RUM 작업을 자동화합니다. webpack, Vite, esbuild, Rollup 및 Rspack에서 사용할 수 있습니다.

빌드 플러그인은 RUM Browser SDK를 보완합니다. [Browser Monitoring 설정][1]에 설명된 대로 SDK를 여전히 설정해야 합니다.

## 설치 {#installation}

다음의 번들러용 Datadog 빌드 플러그인 패키지를 설치하세요.

{{< tabs >}}
{{% tab "Webpack" %}}

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "Rollup" %}}

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

## 구성 {#configuration}

다음 공통 설정 옵션은 모든 플러그인에 적용됩니다.

| 파라미터 | 유형 | 필수 여부 | 기본값 | 설명 |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | 문자열 | 예 (소스 맵만 해당) | 없음 | Datadog API key입니다. `DATADOG_API_KEY` 환경 변수로도 설정할 수 있습니다. |
| `auth.site` | 문자열 | 아니요 | `datadoghq.com` | Datadog 사이트입니다. `DATADOG_SITE` 또는 `DD_SITE` 환경 변수로도 설정할 수 있습니다. |
| `logLevel` | 문자열 | 아니요 | `warn` | 로그 상세 수준입니다. `debug`, `info`, `warn`, `error` 또는 `none` 중 하나입니다. |

다음 예시는 전체 구성 구조를 보여줍니다.

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads by debug ID (see Source Maps plugin page)
  sourcemaps: { /* ... */ },
  // Source map uploads by service and version (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

`sourcemaps`와 `errorTracking.sourcemaps`는 동시에 사용할 수 없습니다. 선택한 일치 방식에 따라 하나만 설정하세요. 자세한 내용은 [소스 맵][2]을 참조하세요.

## 사용 가능한 플러그인 {#available-plugins}

{{< whatsnext desc="다음의 개별 빌드 플러그인을 구성하세요." >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>소스 맵</u>: 빌드 중에 소스 맵을 Datadog에 자동으로 업로드하여 난독화가 해제된 스택 추적을 사용할 수 있게 합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/privacy" >}}<u>Privacy Plugin</u>: 빌드 시점에 안전한 문자열의 허용 목록을 생성하여 민감한 데이터를 마스킹하면서 action 이름과 Session Replay 텍스트를 유용하게 유지합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>Source Code Context</u>: Error Tracking 스택 추적에 소스 코드를 인라인으로 표시합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[2]: /ko/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/