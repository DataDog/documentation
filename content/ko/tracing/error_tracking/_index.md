---
algolia:
  tags:
  - 오류 추적
description: 백엔드 서비스에서 수집된 오류를 검색하고 관리하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: 블로그
  text: 서비스 텔레메트리, 오류 추적, SLO 등을 한곳에서 확인하세요.
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: 트레이스 탐색기에 대해 알아보기
- link: /tracing/error_tracking/explorer
  tag: 설명서
  text: 오류 추적 탐색기에 대해 알아보기
- link: /monitors/types/error_tracking/
  tag: 설명서
  text: 오류 추적 모니터 만들기
title: 백엔드 서비스 오류 추적
---

## 개요

{{< img src="error_tracking/error-tracking-overview-2.png" alt="오류 추적 탐색기의 이슈 상세 정보" style="width:100%;" >}}

{{% error-tracking-description %}}

## 설정

오류 추적은 APM에서 지원하는 모든 언어에 사용할 수 있으며 다른 SDK를 사용할 필요가 없습니다.

(선택 사항) 스택 트레이스에서 코드 스니펫을 확인하려면 [GitHub 통합][4]을 설정하세요.

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="스택 트레이스의 인라인 코드 스니펫" style="width:70%;" >}}

리포지토리 설정을 시작하려면 [소스 코드 통합 문서][6]를 참조하세요.

## 스팬(span) 속성을 사용하여 오류 스팬 추적

Datadog 트레이서는 백엔드 서비스 소스 코드의 통합 및 수동 계측을 통해 오류를 수집합니다. 오류 추적은 오류가 서비스 항목 스팬에 있는지 여부에 관계없이 서비스 수준에서 발생하는 경우 트레이스 내에서 오류 스팬을 처리합니다. 이 스팬에는 추적할 `error.stack`, `error.message`, `error.type` [스팬 속성][1]도 포함되어야 합니다.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="오류가 있는 플레임 그래프" style="width:100%;" >}}

오류 추적은 오류 유형, 오류 메시지 및 스택 트레이스를 형성하는 프레임을 사용하여 처리할 각 오류 스팬의 지문을 계산합니다. 동일한 지문이 있는 오류는 그룹화되며 동일한 이슈에 속합니다. 자세한 내용은 [트레이스 탐색기 문서][2]를 참조하세요.

## 트러블슈팅 또는 디버깅을 시작하기 위한 이슈 검토

오류 추적은 [오류 추적 탐색기][5]를 통해 백엔드 서비스에서 수집한 오류를 이슈로 자동 분류합니다. 주요 기능을 살펴보려면 [오류 추적 탐색기 설명서][3]를 참조하세요.

애플리케이션 성능 모니터링(APM) 분포에서 생성된 이슈에는 영향을 받은 스팬, 가장 관련된 최신 스택 트레이스, 스팬 속성, 호스트 태그, 컨테이너 태그 및 메트릭이 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/visualization/trace/?tab=spantags#more-information
[2]: /ko/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /ko/tracing/error_tracking/explorer
[4]: /ko/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /ko/integrations/guide/source-code-integration