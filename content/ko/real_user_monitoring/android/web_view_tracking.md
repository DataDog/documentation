---
beta: true
description: 하이브리드 Android 애플리케이션에서 웹 보기를 모니터링합니다.
further_reading:
- link: /real_user_monitoring/android/
  tag: 설명서
  text: Android 모니터링
- link: /real_user_monitoring/browser/
  tag: 설명서
  text: 브라우저 모니터링
kind: 설명서
title: Android 웹 보기 추적
---

## 개요

실제 사용자 모니터링을 통해 웹 보기를 모니터링하고 하이브리드 Android 및 Android TV 애플리케이션에서 사각지대를 제거할 수 있습니다.

다음을 수행할 수 있습니다:

- 모바일 애플리케이션의 웹 및 네이티브 구성 요소에서 사용자 활동 추적
- 지연 시간의 근본 원인을 모바일 애플리케이션의 웹 페이지 또는 기본 구성 요소로 범위를 좁히세요.
- 모바일 디바이스에서 웹 페이지를 로드하는 데 어려움을 겪는 사용자 지원

## 설정

### 전제 조건

먼저 모바일 Android 및 Android TV 애플리케이션에서 렌더링할 웹 페이지를 RUM 브라우저 SDK와 함께 설정하세요. 자세한 내용은 [RUM 브라우저 모니터링][1]을 참조하세요.

### 기존 SDK 설정 업데이트

1. 웹 페이지로부터 RUM 이벤트를 전달하려면 [최신 버전][2]의 RUM Android SDK를 다운로드하고 [전용 가이드][3]에 따라 RUM 기능을 설정합니다.
2. 웹 페이지에서 로그 이벤트를 전달하려면 [전용 안내서][5]에 따라 로그 Android SDK의 [최신 버전][4]을 다운로드하고 로그를 설정합니다.
3. `dd-sdk-android-webview` 라이브러리를 모듈 수준 `build.gradle` 파일에서 종속성으로 선언하여 Gradle 종속성을 추가합니다:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. 다음 코드 스니펫을 사용하여 웹 보기에 대한 추적을 활성화합니다:

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

## 웹 보기 액세스

웹 보기는 [RUM 탐색기][6]에 연결된 `service` 및 `source` 속성과 함께 나타납니다. `service` 속성은 웹 보기가 생성된 웹 구성 요소를 나타내고, `source` 속성은 Android와 같은 모바일 애플리케이션의 플랫폼을 나타냅니다.

안드로이드 및 안드로이드 TV 프로그램을 필터링하고 세션을 클릭합니다. 세션에서 이벤트 목록이 있는 사이드 패널이 나타납니다.

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="RUM 탐색기의 세션에서 캡처한 웹뷰 이벤트" style="width:100%;">}}

**Open View waterfall**을 클릭하여 보기의 **Performance** 탭에서 리소스 폭포수 시각화로 이동합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[3]: /ko/real_user_monitoring/android/?tab=kotlin#setup
[4]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[5]: /ko/logs/log_collection/android/?tab=kotlin#setup
[6]: https://app.datadoghq.com/rum/explorer