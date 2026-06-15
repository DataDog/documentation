---
description: Browser RUM SDK를 통해 Capacitor로 빌드된 크로스 플랫폼 애플리케이션을 모니터링하는 방법을 알아봅니다.
further_reading:
- link: /real_user_monitoring/
  tag: 문서
  text: 실시간 사용자 모니터링에 대해 알아보기
title: Browser SDK를 사용하여 Capacitor 애플리케이션 모니터링
---

## 개요

[Capacitor][1]는 오픈 소스 네이티브 런타임으로, JavaScript, HTML, CSS를 사용하여 iOS, Android 및 프로그레시브 웹 애플리케이션에서 기본 실행되는 웹 네이티브 애플리케이션을 구축합니다.

Datadog Browser SDK를 설치 및 구성하여 Capacitor로 빌드한 애플리케이션 모니터링을 시작할 수 있습니다. 본 구성은 애플리케이션의 JavaScript 부분에 대한 가시성을 제공합니다(네이티브 애플리케이션 가시성 제외).

**참고**: **iOS** 타겟 실행을 위해 Capacitor로 래핑된 애플리케이션은 기본 스키마로 `capacitor://`를 사용하여 로컬 에셋을 제공합니다.

## 설치

다음에 따라 Datadog Browser SDK를 설치하여 Capacitor을 지원합니다.

1. CDN 동기, CDN 비동기 또는 npm의 단계에 따라 [RUM Browser Monitoring][3]을 설정 및 설치합니다.
2. RUM 초기화 구성에서 `sessionPersistence` 파라미터를 `"local-storage"`로 설정합니다.

   **참고**: 이 설정을 사용하면 Datadog이 브라우저 쿠키에 의존하지 않고 RUM 데이터를 수집할 수 있습니다.

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
   });
   ```

3. SDK를 올바르게 구성하면 데이터가 [RUM Explorer][3]에 채워집니다.

## 트러블슈팅

### 애플리케이션의 JavaScript 부분만 표시되고 네이티브 부분은 표시되지 않습니다

이는 예상 가능한 동작입니다. 플러그인 사용이나 사용자 지정 코드 사용과는 관계없이 Capacitor 애플리케이션의 네이티브 부분은 모니터링되지 않습니다. 보통 플러그인은 애플리케이션의 JavaScript 측에서 추적할 수 있는 응답 상태를 전달합니다. 그러나 플러그인이 충돌하거나 네이티브 코드 문제로 인해 전체 애플리케이션이 충돌하는 경우 Datadog에 보고되지 않습니다.

### 로컬 및 원격 에셋을 모두 대상으로 하는 하이브리드 Capacitor 애플리케이션을 추적할 수 없는 이유는 무엇인가요?

동일 출처 정책으로 인해 로컬(`capacitor://`)과 원격(`http(s)://`) 모두에서 페이지를 로드하는 애플리케이션을 동일한 세션으로 추적할 수 없습니다.

즉, Capacitor를 사용하여 랜딩 페이지를 임베드한 후 사용자를 인터넷에 호스팅된 웹사이트로 리디렉션하는 애플리케이션은 해당 사용자에 대한 세션 **두 개**가 생성되는 것을 확인할 수 있습니다.

- 애플리케이션의 (임베디드된) 랜딩 페이지 부분에 대한 세션 한 개
- 애플리케이션의 원격 부분에 대한 세션 한 개

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://capacitorjs.com/
[2]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[3]: /ko/real_user_monitoring/explorer/