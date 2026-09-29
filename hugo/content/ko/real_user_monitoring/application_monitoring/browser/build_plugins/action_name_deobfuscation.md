---
algolia:
  tags:
  - action names
  - build plugins
  - privacy
  - deobfuscation
description: 빌드 시 난독화된 값을 원래 텍스트로 매핑하는 개인정보 보호 사전을 생성하여 최소화된 빌드에서 읽을 수 있는 RUM 액션 이름을
  복원합니다.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: 설명서
  text: 사용자 액션 추적
- link: /data_security/real_user_monitoring
  tag: 설명서
  text: RUM 데이터 보안
- link: https://www.datadoghq.com/blog/rum-build-time-privacy-allowlist/
  tag: 블로그
  text: 빌드 시 허용목록을 사용하여 민감한 데이터 노출을 줄이기
- link: https://github.com/DataDog/build-plugins
  tag: 소스 코드
  text: Datadog Build Plugins GitHub 저장소
title: 액션 이름 난독화 해제
---
## 개요 {#overview}

[`enablePrivacyForActionName`][1] 초기화 파라미터를 활성화하면 개인정보 보호를 위해 액션 이름이 마스킹됩니다. 최소화된 빌드에서는 번들러가 RUM이 액션 이름을 생성하는 데 사용하는 DOM 요소 텍스트와 속성을 난독화하기 때문에 액션 이름을 읽을 수 없게 될 수도 있습니다.

Action Name Deobfuscation 빌드 플러그인은 빌드 시 소스 코드를 계측하여 난독화된 값을 원래 텍스트로 다시 매핑하는 개인정보 보호 사전을 생성함으로써 두 가지 문제를 모두 해결합니다. RUM SDK는 이 사전을 사용하여 읽을 수 있는 액션 이름을 복원합니다.

## 전제 조건 {#prerequisites}

- RUM SDK가 `trackUserInteractions: true`와 `enablePrivacyForActionName: true`를 사용하여 초기화되었습니다. [모든 액션 이름 마스킹][1]을 참조하세요.
- Datadog 빌드 플러그인이 설치되고 번들러에 등록되었습니다. 설치 지침은 [빌드 플러그인][2]을 참조하세요.

## 구성 {#configuration}

빌드 플러그인 옵션에서 `rum.privacy` 객체를 구성합니다.

| 파라미터 | 유형 | 필수 | 기본값 | 설명 |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | RegExp 또는 String 배열 | 아니요 | JS/TS 파일(.js, .ts, .jsx, .tsx, .mjs, .cjs 및 변형) | 액션 이름 난독화 해제를 위해 처리할 파일 패턴입니다. |
| `rum.privacy.exclude` | RegExp 또는 String 배열 | 아니요 | `node_modules`, `.preval.` 파일 | 건너뛸 파일 패턴입니다. |

## 예시 {#example}

기본 설정 사용 시(모든 JS/TS 파일을 처리하고 `node_modules` 제외):

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

사용자 지정 포함 및 제외 패턴 사용 시:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">이 예시들은 webpack을 사용합니다. 구성 객체는 지원되는 모든 번들러에서 동일합니다. 설치 지침은 <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">빌드 플러그인</a>을 참조하세요.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /ko/real_user_monitoring/application_monitoring/browser/build_plugins/