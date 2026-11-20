---
description: 신서틱 테스트 재시도가 관련 모니터 상태에 어떤 영향을 미치는지 알아봅니다.
further_reading:
- link: /synthetics/guide/synthetic-test-monitors/
  tag: 설명서
  text: 신서틱 테스트 모니터에 대해 알아보기
- link: /continuous_testing/explorer/search_runs/
  tag: 설명서
  text: 신서틱 테스트 실행에 관해 알아보기
title: 신서틱(Synthetic) 테스트 재시도가 모니터 상태를 결정하는 방법 이해하기
---

## 개요

알림 피로도를 줄이기 위해 테스트 실행이 실패하면 신서틱 테스트를 다시 시도할 수 있습니다. 실패 시 테스트를 다시 시도하도록 설정한 경우 이를 _빠른 재시도_라고 합니다.

빠른 재시도를 통해, Datadog은 테스트의 모니터를 알림으로 전환하고 알림을 전송하기 전 신서틱 테스트를 여러 번 실행합니다. 신서틱 테스트와 관련된 모니터에 관한 자세한 내용은 [신서틱 테스트 모니터 사용][3]을 참조하세요.

{{< img src="synthetics/guide/synthetics_test_retries/fast_retries.png" alt="빠른 재시도로 실패한 테스트 실행" style="width:100%;">}}


## 그룹 평가

빠른 재시도 결과는 로컬 그룹 평가에 사용되지만, 전체 그룹 평가에는 최종 재시도 결과만 고려됩니다. 기존 실행 및 중간 재시도는 평가에서 삭제됩니다.

로컬 그룹 평가
: 위치 상태 평가.

전체 그룹 평가
: 테스트 상태 평가.

최대 재시도 횟수에 도달한 후에도 여전히 실패하는 실행은 최종 결과로 간주되며, 해당 최종 결과는 전체 그룹 평가에 반영됩니다.

## 다른 테스트 실행과 겹치는 재시도

본 예제에서는 신서틱 테스트는 3분마다 실행되도록 예약되어 있고, 2분 딜레이 후 최대 2회까지 재시도하도록 설정되어 있습니다.  

평가는 전체 그룹 평가에서 최종 재시도만 고려합니다.

모든 재시도가 실패한 경우

{{< img src="synthetics/guide/synthetics_test_retries/diagram_1.png" alt="두 번 재시도했으나 모든 재시도에서 실패한 테스트 실행, 로컬 그룹 및 전체 그룹에서 평가됨" style="width:100%;">}}

또는 재시도에 성공한 경우

{{< img src="synthetics/guide/synthetics_test_retries/diagram_2.png" alt="두 번 재시도했고 세 번째 재시도에서 성공한 테스트 실행, 로컬 그룹 및 전체 그룹에서 평가됨" style="width:100%;">}}

**참고:** `minFailureDuration` 및 `minLocationsFailed` 파라미터에 설정한 바에 따라 다른 동작이 표시될 수도 있습니다.

## 타임스탬프

본 시스템은 최종 결과의 타임스탬프를 테스트가 본래 예약된 시간이 아니라 해당 테스트를 다시 시도한 시간으로 채웁니다. 결과는 테스트가 시작될 때의 타임스탬프로 간주됩니다. 테스트 실행 시간으로 인해 평가에 활용할 수 있는 결과가 나오기까지 약간의 딜레이가 있을 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /ko/synthetics/guide/synthetic-test-monitors/