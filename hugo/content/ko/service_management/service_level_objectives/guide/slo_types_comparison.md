---
further_reading:
- link: /service_management/service_level_objectives/
  tag: 설명서
  text: 서비스 수준 목표(Service Level Objectives) 개요
- link: /service_management/service_level_objectives/metric/
  tag: 설명서
  text: 메트릭 기반 SLO
- link: /service_management/service_level_objectives/monitor/
  tag: 설명서
  text: 모니터 기반 SLO
- link: /service_management/service_level_objectives/time_slice/
  tag: 설명서
  text: 타임 슬라이스 SLO
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: 블로그
  text: Datadog으로 SLO를 관리한 모범 사례
title: SLO 유형 비교
---

## 개요

SLO를 생성할 때 다음 유형 중에서 선택할 수 있습니다:
- **메트릭 기반 SLO**: SLI 계산을 개수 기반으로 하고자 할 때 사용할 수 있으며, SLI는 총 이벤트 합계를 좋은 이벤트 합계로 나눠 계산됩니다.
- **모니터링-기반 SLO**: SLI 계산을 시간 기반으로 하고자 할 때 사용할 수 있으며, SLI는 모니터링 가동 시간을 기반으로 합니다. 모니터링-기반 SLO는 신규 또는 기존 Datadog 모니터링을 기반으로 해야 하며, 모든 조정은 기본 모니터링 을 통해 이루어져야 합니다(SLO 생성을 통해서는 할 수 없음).
- **타임 슬라이스 SLO**: 시간 기반 SLI 계산을 원할 때 사용할 수 있으며, SLI는 커스텀 가동 시간 정의(시스템이 정상 동작한 시간을 총 시간으로 나눈 값)를 기반으로 합니다. 타임 슬라이스 SLO에는 Datadog 모니터 , 다양한 메트릭 필터 및 임계값을 사용해 볼 수 있으며 SLO를 만드는 동안 다운타임을 즉시 탐색할 수 있습니다.

<div class="alert alert-info">메트릭 기반 및 시간 슬라이스 SLO에 지원되는 기록 기간은 계정의 메트릭 기간과 일치합니다(기본값은 15개월).</div>

## 비교 차트

|                                                                       | **메트릭 기반 SLO**                                                                                           | **모니터 기반 SLO**                                                                                                                                               | **타임 슬라이스 SLO**                                                                   |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **지원되는 데이터 유형**                                              | 카운트, 비율, 또는 분포 유형이 있는 메트릭                                                              | 메트릭 모니터 유형, 신서틱 모니터 및 서비스 점검                                                                                                        | 모든 메트릭 유형(게이지 메트릭 포함) |
| **SLO with Groups 기능**                                 | SLO는 모든 그룹을 기준으로 계산됩니다.<br><br>SLO 사이드 패널 및 SLO 위젯에서 모든 그룹을 볼 수 있습니다.                 | 단일 멀티 알림 모니터로 SLO를 지원합니다.<br><br> **옵션 1:** 모든 그룹을 기준으로 SLO 계산(SLO 사이드 패널 및 SLO 위젯에서 모든 그룹 보기 가능)<br>**옵션 2:** 최대 20개의 선택된 그룹을 기준으로 SLO 계산(SLO 사이드 패널 및 SLO 위젯에서 선택된 모든 그룹 보기 가능)                                                                                                                                | SLO는 모든 그룹을 기준으로 계산됩니다.<br><br>SLO 사이드 패널 및 SLO 위젯에서 모든 그룹을 볼 수 있습니다. |
| **SLO 사이드 패널** | 사용자 지정 기간을 설정하여 최대 15개월의 SLO 기록을 볼 수 있습니다.    | 사용자 지정 기간을 설정하여 최대 3개월의 SLO 기록을 볼 수 있습니다.                         | 사용자 지정 기간을 설정하여 최대 15개월의 SLO 기록을 볼 수 있습니다.                                         |
| **SLO 알림([Error Budget)][1] 또는 [Burn Rate][2] 알림)** **         | 사용 가능<br><br>그룹이 있는 경우 전체 SLO만 기준으로 알림 가능                                                                                                      | 메트릭 모니터 유형에 기반한 SLO에만 사용 가능(신서틱 모니터 또는 서비스 점검에는 사용 불가)<br><br>그룹이 있는 경우 전체 SLO에 대해서만 알림 가능                                                      | 사용 가능<br><br>그룹이 있는 경우 그룹 또는 전체 SLO를 기준으로 경고할 수 있습니다.   |
| [**SLO 상태 수정**][3]                                       | 수정 기간은 SLO 상태 계산에서 무시됩니다.                                                     | 수정 기간은 SLO 상태 계산에서 무시됩니다.                                                                                                          | 수정 기간은 SLO 상태 계산에서 가동 시간으로 계산됩니다. |
| **SLO 위젯([SLO 목록 위젯][10] 또는 [SLO 위젯][9]**)**            | SLO 위젯으로 최대 15개월의 과거 데이터를 볼 수 있습니다.                                                | SLO 위젯으로 최대 3개월의 과거 데이터를 볼 수 있습니다.                                                                                                      | SLO 위젯으로 최대 15개월의 과거 데이터를 볼 수 있습니다.  |
| **[SLO 데이터 소스][5](최대 15개월의 과거 데이터)**         | 사용 가능                                                                                                      | 사용 불가                                                                                                                                                       | 사용 가능                                             |
| **SLO 계산에서 누락된 데이터 처리하기**                      | 누락된 데이터는 SLO 상태 및 오류 예산 계산에서 무시됩니다.                                            | 누락된 데이터는 [기본 모니터 구성][6]에 따라 처리됩니다.                                                                                        | 누락된 데이터는 SLO 상태 및 오류 예산 계산에서 가동 시간으로 처리됩니다.        |
| **가동 시간 계산**                                               |  N/A                                                                                                           |  가동 시간 계산은 기본 모니터를 기준으로 합니다.<br><br> 그룹이 있으면, 전체 가동 시간의 경우 *모든* 그룹에 가동 시간이 있어야 합니다.| [가동 시간][7]은 롤링 시간 창이 아닌 개별 시간 청크를 기반으로 계산됩니다<br>.<br>그룹이 있으면, 전체 가동 시간의 경우 *모든* 그룹에 가동 시간이 있어야 합니다. |
| **SLO 관리 페이지의 [달력 보기][11]**                            | 사용 가능                                                                                                      | 사용 불가                                                                                                                                                       | 사용 가능                                                                            |
| **공개 [API][8] 및 Terraform 지원**                            | 사용 가능                                                                                                      | 사용 가능                                                                                                                                                           | 사용 가능                                                                            |

## SLO 유형 선택 모범 사례

- 가능하면 메트릭 기반 SLO를 사용하세요. 오류 예산에서 SLO를 위반하기 전에 발생한 불량 이벤트 수를 반영하도록 SLO를 설정하는 것이 가장 좋습니다. 또한 이벤트 수에 따라 SLO 계산에 볼륨 가중치가 적용됩니다.
- 대신 가동 시간을 추적하고 시간 기반 SLI 계산을 사용하는 SLO를 원한다면 시간 슬라이스 SLO를 사용하세요. 모니터 기반 SLO와 달리 시간 슬라이스 SLO는 SLO에 대한 기본 모니터를 유지 관리할 필요가 없습니다.
- 마지막으로, 메트릭 외 모니터 또는 여러 모니터에 기반한 SLO를 포함해, 시간 슬라이스 SLO가 적용되지 않는 사용 사례의 경우 모니터 기반 SLO를 고려하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/ko/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/monitor/#missing-data
[7]: /ko/service_management/service_level_objectives/time_slice/#uptime-calculations
[8]: https://docs.datadoghq.com/ko/api/latest/service-level-objectives/
[9]: https://docs.datadoghq.com/ko/dashboards/widgets/slo/
[10]: https://docs.datadoghq.com/ko/dashboards/widgets/slo_list/
[11]: https://docs.datadoghq.com/ko/service_management/service_level_objectives/#slo-calendar-view