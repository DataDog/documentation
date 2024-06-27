---
aliases:
- /ko/developers/faq/how-can-i-submit-a-custom-status-check
- /ko/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
- /ko/guides/services_checks/
- /ko/monitors/guide/visualize-your-service-check-in-the-datadog-ui
kind: 설명서
title: 서비스 검사
---

## 개요

서비스 검사를 통해 서비스 상태를 특성화하여 Datadog 내에서 모니터링할 수 있습니다. 서비스 검사는 특정 서비스의 작동 또는 중지 상태를 모니터링합니다. 모니터링 에이전트가 지정된 횟수만큼 연속적으로 해당 서비스에 연결하지 못할 때마다 알림을 받습니다. 예를 들어, Redis 호스트의 모니터링 에이전트가 Redis에 연결하여 메트릭을 수집하려는 시도가 세 번 연속 실패할 때마다 경고를 받을 수 있습니다.


클러스터 수준의 서비스 검사는 일부 오류를 견딜 수 있는 분산 또는 중복되는 시스템을 모니터링하는 또 다른 효과적인 방법을 제공합니다. 개별 호스트가 여러 서비스를 실행하는 아키텍처에 이러한 알림을 사용하면 해당 서비스를 실행하는 호스트가 계속 사용할 수 있고 호스트 수준 상태 확인을 통과하더라도 서비스의 성능 저하를 파악할 수 있습니다.


중요하고 중복되지 않는 서비스가 손실되거나, 광범위한 노드 손실로 인해 클러스터가 실패하기 직전인 경우 모니터링 및 알림을 설정할 수 있습니다. 다른 중요한 알림은 요청 처리량 감소 또는 요청 대기 시간 증가가 될 수 있습니다. 

통합에 기본적으로 서비스 검사 기능이  없거나 작동 또는 작동 중지 상태를 모니터링하려는 내부 서비스를 위해 서비스 검사 설정이 필요 할 수 있습니다. 


서비스 검사를 사용하려면 먼저 설정이 필요합니다:

{{< whatsnext >}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}커스텀 에이전트 검사를 제출합니다.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}DogStatsD로 서비스 검사를 제출합니다.{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Datadog API로 서비스 검사를 제출합니다.{{< /nextlink >}}
{{< /whatsnext >}}

서비스 검사에서 데이터를 전송하면, 검사 요약을 확인하고 대시보드, 모니터 및 알림을 설정합니다:

## Datadog에서 서비스 검사 시각화하기

서비스 검사는 3개의 Datadog 섹션에서 시각화하고 사용할 수 있습니다:

- [검사 요약][1]
- [스크린보드][2]
- [서비스 검사 모니터][3]

### 검사 요약

[점검 요약][1] 페이지에는 지난 날 인프라 전반에 걸쳐 보고된 모든 점검이 나열됩니다. 점검과 관련된 상태 및 태그에 대한 통찰력을 얻으려면 점검을 선택하세요.

{{< img src="developers/service_checks/check_summary.png" alt="검사 요약" >}}

### 스크린보드

스크린보드에서 **검사 상태** 위젯을 사용하여 서비스 검사를 시각화할 수 있습니다:

{{< img src="developers/service_checks/check_status_widget.png" alt="검사 상태 위젯" >}}

**검사 상태** 위젯 아이콘을 클릭하면, 다음과 같은 팝업이 나타납니다:

{{< img src="developers/service_checks/check_widget_config.png" alt="검사 위젯 설정" >}}

이 형식에서 다음을 수행할 수 있습니다:

- **검사 이름**: 서비스 검사 이름을 선택합니다.
- **타임프레임 보고**: 상태를 집계하려는 타임 프레임을 선택합니다.
- **범위 지정**: 단일 태그 값 또는 태그 키로 보고되는 단일 검사 또는 검사 상태 클러스터를 선택합니다.
- **위젯 제목**: 위젯 제목을 설정합니다.

## 서비스 검사 모니터

메트릭처럼 시간 경과에 따른 서비스 점검을 그래프로 표시할 수 없더라도 [서비스 점검 모니터][3]를 사용하여 모니터링할 수 있습니다.

{{< img src="developers/service_checks/service_check_monitor.png" alt="검사 모니터" >}}

이 형식에서 다음을 수행할 수 있습니다:

- **서비스 검사 선택**: 모니터링 할 검사 상태 이름을 선택합니다.
- **모니터 범위 선택**: 모니터의 컨텍스트를 선택합니다 (태그 포함/제외).
- **알림 조건 설정**: 단순 검사 알림 또는 클러스터 알림 중에서 선택합니다.
- **알림 및 자동화 설정**: 이 모니터가 누구에게 알릴지 선택하고 전송된 알림을 편집합니다([Datadog 알림][4]에 대해 자세히 알아보기).
- **권한 및 감사 알림 정의**: 모니터에 대한 액세스 권한을 편집하고 감사 알림을 설정합니다.

서비스 점검 생성에 대한 자세한 내용은 [서비스 점검 모니터][5]를 참조하세요.

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors/create/custom
[4]: /ko/monitors/notify/
[5]: /ko/monitors/types/service_check/