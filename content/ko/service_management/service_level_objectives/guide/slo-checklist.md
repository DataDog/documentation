---
aliases:
- /ko/monitors/guide/slo-checklist/
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: 블로그
  text: Datadog을 사용하여 SLO의 상태 및 오류 예산 추적
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: 학습 센터
  text: 서비스 수준 목표(Service Level Objectives)에 대한 소개
- link: /service_management/service_level_objectives/guide/slo_types_comparison/
  tag: 설명서
  text: Datadog SLO 유형 비교
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: 블로그
  text: Datadog으로 SLO를 관리한 모범 사례
title: SLO 체크리스트
---


## 시작하기

1. [SLO Manage page][1]로 이동합니다.

2. 사용자의 관점에서 생각해 보세요:

    * 사용자가 애플리케이션과 어떻게 상호 작용하고 있습니까?
    * 사용자가 애플리케이션을 통해 어떤 과정을 경험합니까?
    * 이러한 과정이 인프라스트럭처의 어떤 부분과 상호 작용합니까?
    * 사용자가 귀사의 시스템에서 무엇을 기대하고 있으며, 어떤 목표를 달성하기 원합니까?

## 관련 있는 SLI를 선택하세요.

### 1 단계

#### 응답/요청

|  SLI 유형 |  설명                                                   |
| ------------ | -------------------------------------------------------------- |
| 이용 가능 여부 | 서버가 요청에 성공적으로 응답할 수 있습니까?          |
| 레이턴시      | 서버가 요청에 응답하는 데 얼마나 걸렸습니까? |
| 처리량   | 얼마나 많은 요청을 처리할 수 있습니까?                              |

#### 저장

|  SLI 유형 |  설명                                 |
| ------------ | -------------------------------------------- |
| 이용 가능 여부 | 주문형 방식으로 데이터에 액세스할 수 있습니까?          |
| 레이턴시      | 데이터를 읽거나 쓰는 데 얼마나 걸립니까? |
| 내구성   | 데이터가 필요할 때 데이터가 남아 있습니까?   |

#### 전체 과정

| SLI 유형 |   설명                                                      |
| ----------- | ------------------------------------------------------------------ |
| 정확성 | 올바른 데이터가 반환되었습니까?                                       |
| 신선도    | 새로운 데이터나 처리된 결과가 나타나기까지 얼마나 걸립니까? |

### 2 단계 

#### SLO 유형 선택 모범 사례

- 가능하면 메트릭 기반 SLO를 사용하세요. 오류 예산에서 SLO를 위반하기 전에 발생한 불량 이벤트 수를 반영하는 SLO를 설정하는 것이 가장 좋습니다. 또한 이벤트 수에 따라 SLO 계산에 볼륨 가중치가 적용됩니다.
- 대신 가동 시간을 추적하고 시간 기반 SLI 계산을 사용하는 SLO를 원한다면 시간 슬라이스 SLO를 사용하세요. 모니터 기반 SLO와 달리 시간 슬라이스 SLO는 SLO에 대한 기본 모니터를 유지 관리할 필요가 없습니다.
- 마지막으로, 비계량 모니터 또는 여러 모니터에 기반한 SLO를 포함해, 타임슬라이스 SLO가 적용되지 않는 사용 사례의 경우 모니터 기반 SLO를 고려하세요.

SLO 유형에 대한 자세한 비교는 [SLO 유형 비교][8] 지침을 참조하세요.

**시간 기반 또는 카운트 기반 SLI 계산이 필요하신가요?**

Datadog에서는 다음 SLO 유형을 사용할 수 있습니다.

**메트릭 기반 SLO**

_예: 99%의 요청이 30일 창에서 250ms 미만으로 완료되어야 합니다._

- 카운트 기반 SLI 계산
- SLI는 양호한 이벤트의 합계를 전체 이벤트의 합계로 나눈 값으로 계산합니다.

**모니터-기반 SLO**

_예: 어느 30일 창에서든 사용자 요청 대기 시간의 99%는 250 ms 미만이어야 합니다._

- 시간 기반 SLI 계산
- 기본 모니터의 업타임을 기준으로 계산한 SLI
- 단일 모니터, 다중 모니터(최대 20개) 또는 그룹이 있는 단일 멀티 알림 모니터를 선택할 수 있습니다.

새 모니터를 생성해야 하는 경우 [모니터 생성][2] 페이지로 이동합니다.

**타임 슬라이스 SLO**

_예: 어느 30일 창에서든 사용자 요청 대기 시간의 99%는 250 ms 미만이어야 합니다._

- 시간 기반 SLI 계산
- 메트릭 쿼리를 사용해 커스텀 업타임 정의를 기준으로 계산한 SLI

## SLI 구현

1. [커스텀 메트릭][3] (예: 카운터)
2. [통합 메트릭][4] (예: 로드밸런서, http 요청)
3. [Datadog APM][5] (예: 오류, 서비스와 리소스의 지연시간)
4. [Datadog 로그][6] (예: 특정 발생 횟수에 대한 로그에서 생성된 메트릭)

## 목표 및 시간 창 설정하기

1. 목표 선택: `99%`, `99.5%`, `99.9%`, `99.95%`, 또는 필요에 맞는 목표값을 선택하세요.
2. 시간대 선택: 현재 시점 기준 `7`, `30`, 또는 `90 days`

## SLO의 이름과 설명을 입력하고 태그를 추가하세요.

1. SLO의 이름을 입력하세요.
2. 설명 추가: SLO가 추적하는 내용과 최종 사용자 경험에 있어 왜 중요한지를 설명합니다.  대시보드에 참조 링크를 추가할 수도 있습니다.
3. 태그 추가: `team` 및 `service`에 따라 태그를 추가하는 것이 일반적입니다.

## 확인 및 검색

[태그를 사용하여 SLO 목록 보기에서 SLO를 검색하세요][7].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: https://app.datadoghq.com/monitors/create/metric
[3]: /ko/metrics
[4]: /ko/integrations
[5]: /ko/tracing/trace_pipeline/generate_metrics/
[6]: /ko/logs/logs_to_metrics/
[7]: /ko/service_management/service_level_objectives/#searching-and-viewing-slos
[8]: /ko/service_management/service_level_objectives/guide/slo_types_comparison