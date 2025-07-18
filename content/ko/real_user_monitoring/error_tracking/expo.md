---
description: Datadog에서 Expo 충돌 보고를 캡처합니다.
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: 블로그
  text: Datadog로 더 빠르게 Android 충돌 디버깅
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: 블로그
  text: Datadog를 통해 효과적으로 iOS 충돌 디버깅
- link: /real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: RUM 탐색기에서 오류 추적 데이터 시각화
kind: 설명서
title: Expo 충돌 보고 및 오류 추적
---
## 개요

Expo 충돌 보고 및 오류 추적을 활성화하고 실제 사용자 모니터링(RUM)을 사용해 종합적인 충돌 보고 및 오류 트렌드를 확보하세요.

이 기능을 사용하면 다음 기능에 액세스할 수 있습니다.

-   집계된 Expo 충돌 대시보드 및 속성
-   심볼화된 iOS 및 난독화 해제된 Android 충돌 보고서
-   Expo 오류 추적을 통한 트렌드 분석

스택 트레이스를 심볼화하고 Android 충돌의 난독화를 해제하려면 `expo-datadog` 설정 플러그인을 사용해 .dSYM, Proguard 매핑 파일과 소스 맵을 Datadog에 업로드하세요. 

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

[`expo-datadog` 패키지 및 설정 플러그인][2]을 사용하세요. 자세한 정보는 [Expo 및 Expo Go 설명서][3]를 참조하세요.

개발 종속성으로 `@datadog/datadog-ci`를 추가합니다. 이 패키지에는 소스 맵을 업로드하기 위한 스크립트가 포함되어 있습니다. NPM과 함께 설치할 수 있습니다:

```sh
npm install @datadog/datadog-ci --save-dev
```

또는 Yarn과 함께:

```sh
yarn add -D @datadog/datadog-ci
```

`eas secret:create`를 실행해 `DATADOG_API_KEY`를 Datadog API 키에 설정하세요.

### 파일 업로드 비활성화

 `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles` 또는 `androidSourcemaps` 파라미터를  `false`로 설정하여 일부 파일의 업로드를 비활성화합니다.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

**모든 파일 업로드**를 비활성화하려면 플러그인 목록에서 `expo-datadog`를 제거합니다.

### Datadog 사이트 설정

`eas secret:create`를 실행하여 `DATADOG_SITE`를 Datadog 사이트 호스트로 설정합니다. 예:  `datadoghq.eu` 기본적으로 `datadoghq.com`이 사용됩니다. 

### 플러그인 설정 옵션

| 파라미터                     | 기본값 | 설명                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | 네이티브 iOS 충돌 심볼화를 위해 dSYMS 파일 업로드를 활성화합니다.                                                  |
| `iosSourcemaps`               | `true`  | iOS 빌드에서 자바스크립트(Javascript) 소스 맵 업로드를 활성화합니다.                                                                     |
| `androidProguardMappingFiles` | `true`  | Proguard 매핑 파일 업로드를 활성화하여 네이티브 Android 충돌의 난독화를 해제합니다(난독화가 활성화된 경우에만 적용). |
| `androidSourcemaps`           | `true`  | Android 빌드에서 자바스크립트(Javascript) 소스 맵 업로드를 활성화합니다.                                                                 |

### Sentry 함께 사용

Datadog와 Sentry 설정 플러그인 모두는 정규식을 사용하고 "React Native 코드 및 이미지 번들" iOS 빌드 구문을 수정하여 소스맵에 전송합니다. 그러면 EAS 빌드가 `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context` 오류를 표시하며 실패할 수 있습니다.

양 플러그인을 사용하려면 `app.json` 파일에서 `expo-datadog` 플러그인을 먼저 추가하세요.

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

`expo-dev-client`를 사용하고 이미 `expo-datadog` 플러그인이 있는 경우 양 플러그인을 사용해 `sentry-expo`를 추가하고 `npx expo prebuild`를 실행하기 전 `project.pbxproj` 파일의 변경 사항을 되돌려야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /ko/real_user_monitoring/reactnative/expo/#usage