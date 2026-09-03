---
description: JavaScript 소스 맵을 업로드하여 읽을 수 있는 스택 트레이스를 사용해 오류 추적을 강화하고 축소된 코드의 디버깅을
  개선합니다.
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: 설명서
  text: Error Tracking 시작하기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: 탐색기에서 Error Tracking 데이터 시각화
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: 소스 코드
  text: Sourcemaps 명령 레퍼런스
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: 학습 센터
  text: JavaScript 웹 애플리케이션용 RUM으로 오류 추적
title: JavaScript 소스 맵 업로드
---
## 개요 {#overview}

프런트 엔드 JavaScript 소스 코드가 축소된 경우, Datadog에 소스 맵을 업로드하여 다양한 스택 트레이스의 난독화를 해제하세요. 어떤 오류에 대해서든, 관련 스택 트레이스의 각 프레임에 대한 파일 경로, 라인 번호 및 코드 스니펫에 액세스할 수 있습니다. Datadog은 스택 프레임을 리포지토리의 소스 코드로 연결할 수도 있습니다.

<div class="alert alert-info"><ul><li><a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring(RUM)</a>이 수집한 오류, <a href="/logs/log_collection/javascript/">Browser Logs Collection</a>에서 가져온 로그만 축소를 해제할 수 있습니다.</li><li>소스 맵 업로드를 빌드 프로세스의 일부분으로 자동화하려면 <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">빌드 플러그인: 소스 맵</a>을 참조하세요.</li></ul></div>

## 코드 계측 {#instrument-your-code}

소스 코드를 축소할 때 JavaScript 번들러가 `sourcesContent` 속성의 관련된 소스 코드를 직접 포함하는 소스 맵을 생성하도록 구성하세요.

<div class="alert alert-danger">
각 소스 맵 크기에 관련 축소 파일 크기를 합한 값이 <b>500MB</b>를 초과하지 않아야 합니다.
</div>

일반적인 JavaScript 번들러에 대한 다음 구성을 참조하세요.

{{< tabs >}}
{{% tab "WebpackJS" %}}

이름이 [SourceMapDevToolPlugin][1]인 기본 제공 웹팩 플러그인을 사용하여 소스 맵을 생성할 수 있습니다.

`webpack.config.js` 파일의 구성 예시 참조:

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**참고**: TypeScript를 사용하는 경우, `tsconfig.json` 파일에서 `compilerOptions.sourceMap`을 `true`로 설정하세요.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel은 사용자가 빌드 명령 `parcel build <entry file>`을 실행할 때 기본적으로 소스 맵을 생성합니다.

{{% /tab %}}
{{% tab "Vite" %}}

`vite.config.js` 파일에서 `build.sourcemap` 옵션을 구성하여 소스 맵을 생성할 수 있습니다.

구성 예시 참조:

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // generates .js.map files
    minify: 'terser', // or 'esbuild'
  }
})
```

**참고**: TypeScript를 사용하는 경우, `tsconfig.json` 파일에서 `compilerOptions.sourceMap`을 `true`로 설정하세요.

{{% /tab %}}
{{< /tabs >}}

애플리케이션을 빌드하고 난 다음, 번들러가 디렉터리를 생성하며(일반적으로 이름이 `dist`임), 여기에 상응하는 소스 맵과 같은 위치에 있는 축소된 JavaScript 파일이 포함됩니다.

다음 예시 참조:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
만일 <code>javascript.364758.min.js</code> 및 <code>javascript.364758.js.map</code> 파일 크기의 합이 <b>500MB</b> 한도를 초과하면 번들러가 소스 코드를 여러 개의 더 작은 청크로 분할하도록 구성하여 크기를 줄이세요. 자세한 내용은 <a href="https://webpack.js.org/guides/code-splitting/">WebpackJS를 사용한 코드 분할</a>을 참조하세요.
</div>

## 소스 맵 업로드 {#upload-your-source-maps}

소스 맵을 업로드하는 가장 좋은 방법은 CI 파이프라인에 추가 단계를 하나 추가한 다음 [Datadog CLI][1]에서 전용 명령을 실행하는 것입니다. 이렇게 하면 `dist` 디렉터리 및 하위 디렉터리를 스캔하여 소스 맵과 관련 축소된 파일을 자동으로 업로드합니다.

{{< site-region region="us" >}}
1. `package.json` 파일에 `@datadog/datadog-ci`를 추가합니다(최신 버전을 사용 중이어야 함).
2. [전용 Datadog API 키][1]를 만든 다음 이를 이름이 `DATADOG_API_KEY`인 환경 변수 형식으로 내보냅니다.
3. 애플리케이션의 서비스마다 한 번씩 다음 명령 실행:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2" >}}
1. `package.json` 파일에 `@datadog/datadog-ci`를 추가합니다(최신 버전을 사용 중이어야 함).
2. [전용 Datadog API 키][1]를 만든 다음 이를 이름이 `DATADOG_API_KEY`인 환경 변수 형식으로 내보냅니다.
3. CLI가 파일을 {{<region-param key="dd_site_name">}} 사이트로 업로드할 때 다음 두 가지 환경 변수를 내보내도록 구성: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} 및 `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. 애플리케이션의 서비스마다 한 번씩 다음 명령 실행:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

CLI는 CI의 성능 오버헤드를 최소화하기 위해 단기간에(일반적으로 몇 초) 필요한 최대 개수의 소스 맵을 업로드하도록 최적화되어 있습니다.

**참고**: 소스 맵을 다시 업로드하더라도 버전이 변경되지 않은 경우 기존 것을 재정의하지 않습니다.

`--service` 및 `--release-version` 파라미터가 Error Tracking 이벤트, RUM 이벤트 및 브라우저 로그의 `service` 및 `version` 태그와 일치해야 합니다. 이러한 태그를 설정하는 방법에 대한 자세한 내용은 [브라우저 SDK 초기화 설명서][2] 또는 [브라우저 로그 수집 설명서][3]를 참조하세요.

<div class="alert alert-info">애플리케이션에 서비스를 여러 개 정의한 경우, 서비스 수만큼 CI 명령을 실행해야 합니다. 이는 애플리케이션 전체에 소스 맵이 한 세트라도 마찬가지입니다.</div>

Datadog은 예시 `dist` 디렉터리에 대하여 명령을 실행하면 사용자의 서버 또는 CDN이 `https://hostname.com/static/js/javascript.364758.min.js` 및 `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`에서 JavaScript 파일을 전송할 것으로 예상합니다.

확장자가 `.js.map`인 소스 맵만 스택 트레이스의 축소를 해제하는 데 올바로 작동합니다. `.mjs.map`과 같이 다른 확장자가 붙은 소스 맵은 수락은 되지만 스택 트레이스의 축소를 해제하지 않습니다.

<div class="alert alert-info">서로 다른 하위 도메인에서 동일한 JavaScript 소스 파일을 제공하는 경우, 관련 소스 맵을 한 번만 업로드하고 전체 URL 대신 절대 접두사 경로를 사용하여 해당 소스 맵이 여러 하위 도메인에 적용되도록 하세요. 예를 들어, <code>/static/js</code> 를 <code>https://hostname.com/static/js</code>대신 지정합니다.</div>

모든 업로드된 기호를 확인하고 소스 맵을 관리하려면 [RUM 디버그 기호 둘러보기][5] 페이지를 참조하세요.

### 스택 프레임을 소스 코드에 연결 {#link-stack-frames-to-your-source-code}

`datadog-ci sourcemaps upload`를 Git의 작업 중인 디렉터리 안에서 실행하면 Datadog이 리포지토리 메타데이터를 수집합니다. `datadog-ci` 명령이 리포지토리 URL, 현재 커밋 해시, 그리고 소스 맵과 관련되는 리포지토리의 파일 경로 목록을 수집합니다. Git 메타데이터 수집에 관한 자세한 내용은 [datadog-ci 설명서][4]를 참조하세요.

Datadog은 축소가 해제된 스택 프레임에 소스 코드에 대한 링크를 표시합니다.

## 간편한 문제 해결 {#troubleshoot-errors-with-ease}

파일 경로 및 라인 번호에 대한 액세스 권한이 없으면 축소된 스택 트레이스는 코드 베이스를 문제 해결하는 데 도움이 되지 않습니다. 또한 코드 스니펫이 축소되어(길이가 긴 변환된 코드가 한 줄 있다는 뜻), 문제 해결 프로세스가 더 어려워집니다.

다음 예시에 축소된 스택 트레이스를 표시했습니다.

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="축소된 스택 트레이스 Error Tracking" >}}

반면, 축소되지 않은 스택 트레이스를 사용하면 빠르고 원활한 문제 해결을 위해 필요한 모든 컨텍스트가 제공됩니다. Datadog은 소스 코드와 관련되는 스택 프레임에 대해 리포지토리로 직접 연결되는 링크도 생성합니다.

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="축소되지 않은 스택 트레이스 Error Tracking" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/ko/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum