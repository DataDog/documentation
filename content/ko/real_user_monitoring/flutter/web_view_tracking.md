---
description: 하이브리드 Flutter 애플리케이션에서 웹 보기를 모니터링합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: 웹 보기 추적
---

## 개요

실제 사용자 모니터링(RUM)을 통해 웹 보기를 모니터링하고 하이브리드 Flutter 애플리케이션의 사각지대를 제거할 수 있습니다.

다음을 수행할 수 있습니다:

- 모바일 애플리케이션의 웹 및 네이티브 구성 요소에서 사용자 활동 추적
- 모바일 애플리케이션의 웹 페이지 및 네이티브 구성 요소에 대한 지연 시간의 근본 원인 확인
- 모바일 디바이스에서 웹 페이지를 로드하는 데 어려움을 겪는 사용자 지원

## 설정

### 전제 조건

RUM Browser SDK로 모바일 Flutter 애플리케이션에서 렌더링하고 싶은 웹 페이지를 설정합니다. 자세한 내용은 [RUM 브라우저 모니터링][1]을 참조하세요.

### 웹 보기 계측

RUM Flutter SDK는 [`webview_flutter`][2] 패키지를 사용할 때 웹 보기 추적을 제어할 수 있는 API를 제공합니다. 웹 보기 추적을 추가하려면 `WebViewController`에서 `trackDatadogEvents` 확장 방식을 호출하여 허용 호스트 목록을 제공합니다.

예를 들면 다음과 같습니다.

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

안드로이드에서 작동하는지 추적하려면 `JavaScriptMode.unrestricted`이 필요합니다.

## 웹 보기 액세스

웹 보기는 [RUM 탐색기][3]에서 연관된 `service`및 `source`속성과 함께 이벤트 및 보기로 나타납니다. `service` 속성은 웹 보기가 생성되는 웹 구성 요소를 나타내며, `source` 속성은 Flutter와 같은 모바일 애플리케이션의 플랫폼을 나타냅니다.

Flutter 애플리케이션을 필터링하고 세션을 클릭합니다. 세션의 이벤트 목록이 있는 사이드 패널이 나타납니다.

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="RUM 탐색기의 세션에서 캡처한 Webview 이벤트" style="width:100%;">}}

**Open View waterfall**을 클릭하면 세션에서 보기의 **Performance** 탭에 있는 리소스 워터폴 시각화로 이동합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/#npm
[2]: https://pub.dev/packages/webview_flutter
[3]: https://app.datadoghq.com/rum/explorer