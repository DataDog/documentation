---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3분
  text: 데이터베이스 서비스의 비정상 p99 대기 시간 알림
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 mins
  text: 서비스 대기 시간을 지난 주와 비교
- link: /tracing/guide/slowest_request_daily/
  tag: 3분
  text: 웹 서비스에서 가장 느린 엔드포인트에서 가장 느린 트레이스 디버깅
- link: /tracing/guide/
  tag: ''
  text: 모든 가이드
kind: 가이드
title: APM 메트릭을 추적 및 상호 연결하기 위해 대시보드 생성
---

_읽는 데 걸리는 시간 4분_

{{< img src="tracing/guide/apm_dashboard/dashboard_7_cropped.mp4" alt="대시보드 7" video="true" style="width:90%;">}}

Datadog APM을 이용하면 내 사업에 필요한 우선순위와 중요도가 높은 메트릭에 기반해 대시보드를 생성할 수 있습니다.
대시보드에 위젯을 만들어 기존 인프라스트럭처, 로그, 호스트 메모리 사용량과 같은 커스텀 메트릭을 계속 추적할 수 있고, 처리량, 대기 시간, 오류 비율을 기반으로 핵심 APM 메트릭을 추적해 상관 관계를 파악할 수 있습니다.
나아가 중요 고객의 사용자 경험이나 대량 트랜잭션의 대기 시간은 물론, 블랙 프라이데이와 같은 큰 이벤트를 앞두고 주요 웹 서버의 처리량을 추적할 수 있습니다.

이 가이드에서는 대시보드에 트레이스 메트릭을 추가하고 추가한 메트릭을 인프라스터럭처에 연결하는 방법과 Analytics 쿼리를 내보내는 방법을 설명합니다. 또 대시보드에 위젯을 추가할 수 있는 방법 세 가지를 알려줍니다.

* 기존 APM 그래프 복사_(1. 2. & 3 단계)_
* 수동으로 생성_(4. & 5. 단계)_
* Analytics 쿼리 내보내기_(7. 단계)_

1. **[Service Catalog][1]를 열고** `web-store`를 선택하세요.

2. **Total Requests Graph를 찾고** 우측 상단에 있는 `export` 버튼을 클릭한 후 `Export to Dashboard`를 선택하세요. **`New Timeboard`를 클릭**하세요.

    {{< img src="tracing/guide/apm_dashboard/dashboard_2_cropped.png" alt="대시보드 2" style="width:90%;">}}

3. 성공 메시지에서 **`View Dashboard`를 클릭**하세요.

   새 대시보드에서 `web-store` 서비스의 `Hit/error count on service` 그래프를 확인할 수 있습니다. 해당 서비스의 전체 처리량과 총 오류량을 볼 수 있습니다.

    {{< img src="tracing/guide/apm_dashboard/dashboard_3_cropped.png" alt="대시보드 3" style="width:90%;">}}

   **참고**: 연필 아이콘을 클릭해 그래프를 편집하고 사용 중인 메트릭 종류를 구체적으로 확인할 수 있습니다.

4. 대시보드 공간에 있는 **`Add graph` 자리표시자 타이틀을 클릭**하고 **`Timeseries`를 이 공간으로 드래그**합니다.

   이는 대시보드 위젯 편집 화면입니다. 사용할 수 있는 메트릭 모두 여기에서 가시화할 수 있습니다. 자세한 내용은 [시계열 위젯 설명서][2]를 참고하세요.

5. **`system.cpu.user` 상자를 클릭**하고 필요한 메트릭과 파라미터를 선택하세요. 다음 예를 참고하세요.

    | 파라미터 | 값                         | 설명                                                                                                          |
    | ------    | -----                         | -----                                                                                                                |
    | `metric`  | `trace.rack.requests.errors` | Ruby Rack 오류 요청 세트 총 개수                                                                       |
    | `from`    | `service:web-store`           | 이 예시의 주요 서비스는 Ruby 서비스이며 이 차트 정보는 모두 Ruby 서비스에서 온 것입니다. |
    | `sum by`  | `http.status_code`            | HTTP 상태 코드별로 차트를 분석한 것입니다.                                                                        |

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.mp4" video="true" alt="dashboard 4" style="width:90%;">}}

   이와 같은 분석뿐만 아니라 다양한 형태의 분석을 선택할 수 있습니다. `trace.`로 시작하는 메트릭에는 APM 정보가 포함되어 있으니 이 점에 유의하세요. 자세한 내용은 [APM 메트릭 설명서를 참고][3]하세요.

6. **다른 시계열을 자리표시자 타이틀에 드래그**하세요.

   이 예시에서는 메트릭 두 종류(`trace.*`와 `runtime.*`)가 그래프에 추가된 것을 볼 수 있습니다. 이 두 메트릭 종류를 조합해 요청과 코드 런타임 간의 상관 관계를 확인할 수 있습니다. 특히 스레드 개수 옆에 표시된 대기 시간을 통해 대기 시간이 급증한 것이 스레드 개수와 연관되어 있음을 알 수 있습니다.

    1. 먼저 `trace.rack.requests.errors` 메트릭을 위젯에 추가하세요.

        | 파라미터 | 값                                        | 설명                                                                                                          |
        | ------    | -----                                        | -----                                                                                                                |
        | `metric`  | `trace.rack.request.duration.by.service.99p` | 서비스 내 요청 99%의 대기 시간.                                                           |
        | `from`    | `service:web-store`                          | 이 예시의 주요 서비스는 Ruby 서비스이며 이 차트 정보는 모두 Ruby 서비스에서 온 것입니다. |

    2. 그런 다음 `Graph additional: Metrics`을 클릭해 다른 메트릭을 차트에 추가할 수 있습니다.

        | 파라미터 | 값                       | 설명                                                                                                          |
        | ------    | -----                       | -----                                                                                                                |
        | `metric`  | `runtime.ruby.thread_count` | Ruby 런타임 메트릭에서 가져온 스레드 개수                                                                    |
        | `from`    | `service:web-store`         | 이 예시의 주요 서비스는 Ruby 서비스이며 이 차트 정보는 모두 Ruby 서비스에서 온 것입니다. |

        {{< img src="tracing/guide/apm_dashboard/dashboard_5.mp4" alt="dashboard_5" video="true" style="width:90%;">}}

    이 설정으로 대기 시간이 급증하는 것이 Ruby 스레드 개수와 연관된 것인지 볼 수 있고, 대기 시간이 급증하는 원인을 파악해 빠르게 해결할 수 있습니다.

7. **[Analytics][4]**로 이동하세요.

   이 예시에서는 예시 애플리케이션에서 대기 시간을 쿼리하는 방법을 설명합니다. 플랫폼 판매자별로 분석하고 대기 시간이 가장 긴 판매자 상위 10순위를 볼 수 있습니다. Analytics 화면에서 그래프를 내보내 대시보드에서 볼 수 있습니다.

    {{< img src="tracing/guide/apm_dashboard/dashboard_6_cropped.mp4" video="true" alt="대시보드 6" style="width:90%;">}}

8. **내 대시보드로 돌아갑니다**.

   이제 기술적, 사업적 각도에서 예시 애플리케이션을 심도 있게 관찰할 수 있는 위젯이 여러 개 생겼습니다. 그러나 이는 기본에 불과하며 훨씬 더 많은 기능을 활용할 수 있습니다. 인프라스트럭처 메트릭을 추가하고, 여러 종류의 가시화 도구를 적용하며, 계산 값과 예측 값을 추가할 수 있습니다.

   또 대시보드에서 관련 이벤트를 탐색할 수 있습니다.

9. **`Search Events or Logs` 버튼을 클릭**하고 관련 이벤트 탐색기 검색을 추가하세요. **참고**: 이 예시에서는 Ansible을 사용했습니다. [이벤트 탐색기][6]는 사용자별로 다를 수 있으니 참고하세요.

    {{< img src="tracing/guide/apm_dashboard/dashboard_1_cropped.png" alt="대시보드 1" style="width:90%;">}}

   여기에서 대시보드 보기와 더불어 배포, 작업 완료, 또는 모니터 알림과 같은 최근 이벤트를 볼 수 있습니다(Datadog나 Ansible, Chef 등과 같은 외부 서비스). 이 이벤트를 대시보드에 있는 메트릭 설정과 연결해 상관 관계를 파악할 수 있습니다. 

   마지막으로 탬플릿 변수를 사용해 보세요. 템플릿 변수는 사용자가 위젯을 직접 편집하지 않고도 대시보드 상에서 위젯을 역동적으로 컨트롤할 수 있는 값 세트입니다. 자세한 내용은 [템플릿 변수][6] 설명서를 참고하세요.

10. 헤더에서 **Add Variable**을 클릭하세요. 변수로 제어할 태그를 선택하고 이름, 기본값, 또는 사용할 값을 구성하세요.

    이 예시에서는 템플릿 변수 `Region`을 추가해 주 운영 지역인 `us-east1`와 `europe-west-4`에서 어떻게 동작하는지 대시보드에서 살펴보겠습니다.

    {{< img src="tracing/guide/apm_dashboard/dashboard_add_template_variable_cropped.png" alt="변수 이름 및 변수 태그 추가를 위해 필드 옵션을 표시하는 변수 팝오버 추가" style="width:90%;">}}

    이제 이 템플릿 변수를 각 그래프에 추가할 수 있습니다.

    {{< img src="tracing/guide/apm_dashboard/dashboard_dynamic_template_variable.png" alt="역동적 템플릿 변수를 쿼리에 추가, 이 예시에서는 리전 템플릿 변수를 역동적으로 사용하는 '$RG'를 보여줌" style="width:90%;">}}

    템플릿 변수를 선택하면 대시보드에 적용할 수 있는 모든 값에 업데이트됩니다.

    사용할 수 있는 메트릭 전부를 사용해보고 Datadog의 대표적인 3대 가시성 도구의 혜택을 최대한으로 누리세요. 기본적으로 보이는 대시보드이지만 조직에 반드시 필요한, 강력한 원스탑 가시성 플랫폼입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/dashboards/widgets/timeseries/
[3]: /ko/tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces?viz=timeseries
[5]: /ko/events/
[6]: /ko/dashboards/template_variables/