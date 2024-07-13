---
description: APM 데이터로 생성할 수 있고 유용한 메트릭에 대해 알아보기
further_reading:
- link: tracing/trace_pipeline/
  tag: 설명서
  text: 트레이스 수집을 사용자 지정하고 중요 트레이스 보유하기
- link: tracing/trace_collection/
  tag: 설명서
  text: 에이전트에서 서비스를 계측하고 트레이스 데이터 수집을 설정하기
- link: monitors/
  tag: 설명서
  text: 중요할 때 팀에게 알림을 보낼 수 있도록 모니터 생성 및 관리
kind: 설명서
title: APM 메트릭
---

## 메트릭 추적

[애플리케이션 추적 메트릭][1]은 트레이스 수집과 애플리케이션 계측을 활성화하면 수집됩니다. 이 메트릭은 대시보드와 모니터에서 확인할 수 있습니다.
이 메트릭은 **요청** 수, **오류** 수, **대기 시간** 측정값을 캡처합니다. 이는 [트레이스 수집 샘플링][2] 구성과 관계없이 100% 애플리케이션 트래픽으로 계산됩니다.

기본적으로 이 메트릭은 계측된 애플리케이션에서 에이전트로 전송된 트레이스를 기반으로 Datadog 에이전트에서 계산됩니다.

수집된 스팬과 트레이스는 15분간 보관됩니다. 보유 필터가 보관하는 인덱싱된 스팬과 트레이스의 경우 Datadog에 15일간 저장됩니다. 그러나 수집된 데이터에서 커스텀 메트릭을 생성하면 메트릭이 15개월간 보유됩니다.

## 런타임 메트릭

지원되는 추적 라이브러리에서 [런타임 메트릭 수집][3]을 활성화하면 애플리케이션 성능과 관련한 인사이트를 얻을 수 있습니다. 이 메트릭은 구성된 DogStatsD 포트를 통해 Datadog 에이전트로 전송됩니다.


## 다음 단계

{{< whatsnext desc="내 설정 사용:" >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}대시보드를 생성해 APM 메트릭 추적 및 상관 관계 수립{{< /nextlink >}}
    {{< nextlink href="monitors/create/types/apm/" >}}예상치 못한 상황이 발생했을 때 알림을 보내는 APM 모니터 생성{{< /nextlink >}}
{{< /whatsnext >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/metrics/metrics_namespace/
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ko/tracing/metrics/runtime_metrics/