---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
- link: /logs/log_collection/javascript/
  tag: 설명서
  text: 로그를 위한 Datadog Browser SDK에 대해 자세히 알아보기
title: RUM 브라우저 모니터링
---

## 개요

Datadog 실제 사용자 모니터링(RUM)은 애플리케이션의 프론트엔트 성능에 대한 심도 깊은 인사이트를 제공합니다. 실제 사용자 데이터를 모니터링하여 웹 경험을 최적화하고 탁월한 사용자 경험을 제공하세요. 신서틱(Synthetic) 테스트, 백엔드 메트릭, 트레이스와 로그를 한곳에서 연계하여 스택 전반의 성능 문제를 식별하고 트러블슈팅할 수 있습니다.

Datadog는 현재 수준의 사용자 경험을 이해하고, 개선 영역을 식별하고, 각 변경 및/또는 배포 성공을 측정합니다. 이 정보를 통해 사용자가 영향을 받기 전에 예기치 못한 프런트엔드 문제를 파악하고 해결하여 최상의 경험을 제공할 수 있도록 합니다.

Datadog RUM 브라우저 SDK를 통해 또한 다음을 수행할 수 있습니다.

- 애플리케이션 페이지뷰와 성능을 모니터링하여 성능 문제를 조사합니다.
- 리소스 및 요청(이미지, CSS 파일, 자바스크립트(Javascript) 자산 및 글꼴 파일 등)에 대한 완전한 엔드투엔드 가시성을 확보하세요.
- 모든 관련 컨텍스트를 포함해 관심 있는 이벤트를 자동으로 수집하고 모니터링하며 자동으로 추적되지 않는 오류를 수동으로 수집합니다.
- 사용자 여정 동안 수행된 사용자 상호 작용을 추적하여 개인정보 보호 요건을 충족하는 동시에 사용자 행동에 대한 인사이트를 확보할 수 있습니다.
- 불편한 신호를 보이는 사용자 감지
- 코드 라인으로 오류 원인을 추적하여 해결

{{< img src="real_user_monitoring/browser/rum-browser-overview.png" alt="RUM 성능 요약 대시보드" style="width:100%;">}}

## 시작하기

RUM 브라우저 SDK를 시작하려면 다음 단계에 따라 [자바스크립트(Javascript) RUM 애플리케이션을 생성하세요][1].

여기에서 RUM 브라우저 SDK가 수집하는 [데이터 및 컨텍스트]를 수정하여 구체적인 요구 사항을 지원할 수 있습니다. [고급 설정][3]에서 기본 설정을 재정의하는 방법을 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/setup/#setup
[2]: /ko/real_user_monitoring/browser/data_collected/
[3]: /ko/real_user_monitoring/browser/advanced_configuration/