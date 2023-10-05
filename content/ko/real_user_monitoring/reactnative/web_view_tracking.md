---
kind: 설명서
title: React Native 웹 보기 추적
---

## 개요

실제 사용자 모니터링(RUM)을 통해 웹 보기를 모니터링하고 하이브리드 React Native 애플리케이션의 사각지대를 제거할 수 있습니다.

다음을 수행할 수 있습니다:

-   모바일 애플리케이션의 웹 및 기본 컴포넌트에 대한 사용자 여정 추적
-   모바일 애플리케이션의 웹 페이지 또는 기본 컴포넌트에 대한 지연 시간 근본 원인 범위 지정
-   모바일 장치에서 웹 페이지를 로드하는 데 어려움을 겪는 사용자 지원

RUM은 [react-native-webview][3]를 사용하여 만들어진 웹 보기를 지원합니다.

## 설정

### 전제 조건

모바일 React Native 애플리케이션에서 렌더링할 웹 페이지에서 RUM Browser SDK를 설정합니다. 자세한 내용은 [RUM 브라우저 모니터링][1]을 참조하세요.

[공식 설치 문서][4]에 따라 애플리케이션에 `react-native-webview`를 추가하세요.

### 웹 보기 계측

`react-native-webview`대신 `@datadog/mobile-react-native-webview`에서 `WebView`를 가져옵니다.

```javascript
import { WebView } from '@datadog/mobile-react-native-webview';
// 또는
import WebView from '@datadog/mobile-react-native-webview';
```

`@datadog/mobile-react-native-webview`에서 `WebView` 컴포넌트가 `react-native-webview` 컴포넌트를 래핑하므로 `react-native-webview`의 모든 기능을 사용할 수 있습니다.

`WebView` 컴포넌트의 `allowedHosts` 프롭을 사용하여 웹 보기 내에서 Datadog이 추적할 호스트 목록을 제공하세요:

```javascript
<WebView
    source={{ uri: 'https://www.example.com' }}
    allowedHosts={['example.com']}
/>
```

## 웹 보기 액세스

웹 보기는 [RUM 탐색기][2]에서 연관된 `service` 및 `source` 속성과 함께 표시됩니다. `service` 속성은 웹 보기가 생성된 웹 컴포넌트를 나타내고, `source` 속성은 모바일 애플리케이션의 플랫폼(예: React Native)을 나타냅니다.

React Native 애플리케이션을 필터링하고 세션을 클릭합니다. 세션의 이벤트 목록이 있는 사이드 패널이 나타납니다.

{{< img src="real_user_monitoring/react_native/reactnative_webview_session.png" alt="webview 세션 예시" >}}

**Open View waterfall**을 클릭하여 세션에서 보기의 **Performance** 탭에 있는 리소스 폭포 시각화로 이동합니다.

[1]: /ko/real_user_monitoring/browser/#npm
[2]: https://app.datadoghq.com/rum/explorer?_gl=1*1ftt3v2*_gcl_aw*R0NMLjE2NzE1MzAwMzUuQ2owS0NRaUExNFdkQmhEOEFSSXNBTmFvMDdnVzZFSGZaVXQ0dGRFY3ZwcERPVkpFUTJEWEZHYVhSd0djQmNGdDRnZ0pra0xGbW5uUjFHQWFBcjlZRUFMd193Y0I.*_ga*MTkyMzQ5MTc1MC4xNjc4MjczMTI3*_ga_KN80RDFSQK*MTY3ODI3OTIzNC4yLjAuMTY3ODI3OTIzNC42MC4wLjA.
[3]: https://github.com/react-native-webview/react-native-webview
[4]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md