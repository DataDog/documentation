---
disable_toc: false
kind: documentation
title: 오류 추적
---

## 개요

{{< img src="error_tracking/error-tracking-overview.png" alt="오류 추적 탐색기에서 확인된 문제의 세부정보" style="width:100%;" >}}

{{% error-tracking-description %}}

오류의 원인에 따라 추가 기능을 사용할 수 있습니다. [지원되는 오류 소스](#supported-error-sources)를 참조하세요.

## 시작하기

- [오류 추적 탐색기][5] 문서에서 주요 오류 추적 기능에 대해 살펴보세요.
- 다음 섹션의 제품별 링크를 사용하여 특정 오류 소스에 대한 오류 추적을 설정하세요.

## 지원되는 오류 소스

오류 추적은 애플리케이션 성능 모니터링(APM), 로그 관리, 실제 사용자 모니터링에서 오류를 수집할 수 있습니다. 오류의 원인에 따라 추가 기능을 사용할 수 있습니다. 예를 들어 애플리케이션 성능 모니터링(APM) 트레이스에서 발생한 오류의 경우 [실행 재생][4] 기능이 프로덕션 변수 값을 자동으로 캡처합니다. 

자세한 내용은 제품별 오류 추적 문서를 참조하세요.

- [애플리케이션 성능 모니터링(APM)][1]
- [로그 관리][2]
- [실제 사용자 모니터링][3]

[1]: /ko/tracing/error_tracking#setup
[2]: /ko/logs/error_tracking#setup
[3]: /ko/real_user_monitoring/error_tracking#setup
[4]: /ko/tracing/error_tracking/execution_replay
[5]: /ko/error_tracking/explorer