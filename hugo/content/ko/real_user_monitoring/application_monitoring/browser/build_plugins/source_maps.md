---
algolia:
  tags:
  - source maps
  - build plugins
  - error tracking
description: 빌드 시 JavaScript 소스 맵을 Datadog에 자동으로 업로드하여 Error Tracking 및 RUM에서 난독화된
  스택 트레이스를 해제합니다.
further_reading:
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: 설명서
  text: JavaScript 소스 맵 업로드 (수동 방법)
- link: /real_user_monitoring/error_tracking
  tag: 설명서
  text: Error Tracking
- link: https://github.com/DataDog/build-plugins
  tag: 소스 코드
  text: Datadog Build Plugins GitHub 리포지토리
title: 소스 맵
---
## 개요 {#overview}

소스 맵 빌드 플러그인은 빌드 중에 JavaScript 소스 맵을 Datadog에 자동으로 업로드하여 [Error Tracking][1] 및 [RUM][2]에서 난독화가 해제된 스택 트레이스를 제공합니다. 이는 `datadog-ci sourcemaps upload`를 수동으로 실행하거나 소스 맵 업로드를 위해 CI/CD 파이프라인을 구성할 필요가 없도록 합니다.

이 플러그인은 빌드 프로세스에 연결되어 빌드 출력에서 해당 `.map` 소스 맵 파일이 있는 모든 `.js` 파일을 검색하고 git 메타데이터와 함께 Datadog에 업로드합니다. 디버그 ID 또는 서비스 및 버전을 통해 소스 맵을 이벤트와 연결할 수 있습니다.

## 전제 조건 {#prerequisites}

- `auth.apiKey` 또는 `DATADOG_API_KEY` 환경 변수로 설정된 Datadog API 키.
- 번들러 구성에서 소스 맵이 활성화되어 있어야 합니다. 이 플러그인은 소스 맵을 업로드하지만 생성하지는 않습니다. 번들러별 소스 맵 생성 설정은 [JavaScript 소스 맵 업로드][3]를 참조하세요.
- 디버그 ID 업로드의 경우, 빌드 플러그인에서 디버그 ID 인젝션을 활성화하세요.
- 서비스 및 버전 업로드의 경우, 플러그인 구성과 일치하는 `service` 및 `version` 파라미터로 RUM SDK를 초기화하세요.
- Datadog 빌드 플러그인이 설치되고 번들러에 등록되었습니다. 설치 지침은 [빌드 플러그인][4]을 참조하세요.

## 구성 {#configuration}

다음 환경 변수는 구성 값을 재정의합니다.

- `DATADOG_SITE` 또는 `DD_SITE`: 수집 URL에 대해 `auth.site`를 재정의합니다.
- `DATADOG_SOURCEMAP_INTAKE_URL`: 전체 수집 URL을 직접 재정의합니다.

디버그 ID 또는 서비스 및 버전 중 하나의 소스 맵 업로드 일치 방식을 선택하세요. 이러한 업로드 방법은 상호 배타적입니다.

{{< tabs >}}
{{% tab "디버그 ID(권장)" %}}

디버그 ID는 번들 URL, 서비스 또는 버전에 의존하지 않고 각 JavaScript 번들을 소스 맵과 연결합니다. 새 구성에는 이 방법을 사용하세요.

Debug ID 지원을 위해서는 [Datadog Build Plugin 버전 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) 이상이 필요합니다.

`sourcemaps`에서 다음 옵션을 구성합니다.

| 파라미터 | 유형 | 필수 | 기본값 | 설명 |
|-----------|------|----------|---------|-------------|
| `debugId` | 불리언 | 예 | 없음 | 각 JavaScript 번들에 디버그 ID를 주입하려면 `true`로 설정합니다. |
| `upload` | 불리언 | 예, 업로드하는 경우 | `false` | 빌드 중 소스 맵을 업로드하려면 `true`로 설정합니다. 생략하면 플러그인은 디버그 ID만 주입합니다. |
| `bailOnError` | 불리언 | 아니요 | `false` | `true`인 경우, 소스 맵 업로드 오류가 발생하면 빌드가 실패합니다. |
| `dryRun` | 불리언 | 아니요 | `false` | `true`인 경우, 플러그인은 Datadog으로 데이터를 보내지 않고 업로드 프로세스를 실행합니다. 구성을 확인하려면 이 옵션을 사용하세요. |
| `maxConcurrency` | 숫자 | 아니요 | `20` | 동시 소스 맵 업로드의 최대 개수입니다. |

빌드 중에 디버그 ID를 주입하고 소스 맵을 업로드하려면 `debugId`와 `upload`를 `true`로 설정합니다.

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "서비스 및 버전" %}}

서비스 및 버전 일치를 사용하여 소스 맵을 업로드하려면 `errorTracking.sourcemaps` 객체를 구성합니다.

| 파라미터 | 유형 | 필수 | 기본값 | 설명 |
|-----------|------|----------|---------|-------------|
| `service` | 문자열 | 예 | 없음 | 서비스 이름입니다. RUM SDK `service` 초기화 파라미터와 일치해야 합니다. |
| `releaseVersion` | 문자열 | 예, `metadata.version`이 설정된 경우 제외 | 없음 | 릴리스 버전입니다. RUM SDK `version` 초기화 파라미터와 일치해야 합니다. |
| `minifiedPathPrefix` | 문자열 | 예 | 없음 | 최소화된 JavaScript 파일이 제공되는 URL 또는 루트 상대 경로 접두사입니다. 예: `https://example.com/static/` 또는 `/static/`. |
| `bailOnError` | 불리언 | 아니요 | `false` | `true`인 경우, 소스 맵 업로드 오류가 발생하면 빌드가 실패합니다. |
| `dryRun` | 불리언 | 아니요 | `false` | `true`인 경우, 플러그인은 Datadog으로 데이터를 보내지 않고 업로드 프로세스를 실행합니다. 구성을 확인하려면 이 옵션을 사용하세요. |
| `maxConcurrency` | 숫자 | 아니요 | `20` | 동시 소스 맵 업로드의 최대 개수입니다. |

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

Error Tracking 스택 트레이스에 인라인 소스 코드를 함께 표시하려면 서비스 및 버전 소스 맵 업로드를 [소스 코드 컨텍스트][5] 플러그인과 함께 사용하세요.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">이 예시들은 webpack을 사용합니다. 구성 객체는 지원되는 모든 번들러에서 동일하며, 가져오기 및 플러그인 함수 이름만 다릅니다. 사용 중인 번들러의 설치 지침은 <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">빌드 플러그인</a>을 참조하세요.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/error_tracking
[2]: /ko/real_user_monitoring/
[3]: /ko/real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /ko/real_user_monitoring/application_monitoring/browser/build_plugins/
[5]: /ko/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context