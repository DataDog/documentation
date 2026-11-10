---
aliases:
- /ko/network_monitoring/cloud_network_monitoring/overview_page
description: 네트워크 문제를 식별하고 실행 가능한 인사이트를 통해 해결하세요.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: 블로그
  text: Datadog CNM으로 클라우드 아키텍처와 앱 종속성 모니터링하기
- link: /network_monitoring/cloud_network_monitoring/network_analytics
  tag: 설명서
  text: Network Analytics에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: 블로그
  text: CNM Network Health로 네트워크 문제를 간편하게 탐지, 진단 및 해결하기
title: Network Health
---
<div class="alert alert-info">Network Health는 미리 보기로 제공되고 있습니다. Datadog 담당자에게 연락하여 등록하세요.
</div>

## 개요 {#overview}

Network Health는 네트워크의 가장 중요한 문제를 통합적으로 보여주며, DNS, TLS 인증서, 보안 그룹 및 네트워크 이상 현상 전반의 문제를 자동으로 탐지하고 우선 순위를 지정합니다. 명확한 수정 경로와 함께 실행 가능한 인사이트를 제공하여 연결 문제를 해결하고 인시던트의 영향을 줄이는 데 도움을 줍니다.

이 페이지에서는 Network Health 페이지의 각 섹션과 해당 섹션에 표시되는 문제 및 인사이트를 설명합니다.

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="접을 수 있는 메뉴가 열린 Network Health 페이지에서 Recommended Actions가 강조 표시된 모습" style="width:100%;">}}

## 사전 요구 사항 {#prerequisites}

- [Cloud Network Monitoring][1]이 활성화되어있습니다.
- [보안 그룹](#security-groups)을 조회하려면 AWS 통합에서 [리소스 수집][6]이 활성화되어 있어야 합니다.

## 권장 작업 {#recommended-actions}

{{< ui >}}Recommended Actions{{< /ui >}} 섹션은 네트워크에서 탐지된 가장 중요한 문제를 강조합니다 이러한 문제의 우선 순위는 다음 기준에 따라 지정됩니다.

1. **심각도**: 문제가 실제로 트래픽을 차단하고 있는지 여부
2. **영향**: 영향을 받는 서비스가 인프라에 얼마나 중요한지 여부

각 권장 작업에는 다음 정보가 표시됩니다

- 탐지된 특정 문제(예: 'TLS 인증서가 _N_일 전에 만료됨')
- 영향을 받는 클라이언트 서비스(요청을 보내는 서비스)
- 영향을 받는 서버 서비스(요청을 받는 서비스)

서비스 이름 위로 마우스를 가져가 APM으로 피벗하거나 {{< ui >}}Remediate{{< /ui >}}를 클릭하여 수정 단계와 [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3], [{{< ui >}}Declare an Incident{{< /ui >}}][4] 생성 옵션을 조회하세요.

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="영향을 받는 서비스의 수정 단계를 보여주는 권장 작업 사이드 패널" style="width:100%;">}}

## Watchdog Insights {#watchdog-insights}

{{< ui >}}Watchdog Insights{{< /ui >}} 섹션에는 Watchdog이 탐지한 비정상적인 네트워크 동작이 표시되며, TCP 재전송 급증에 중점을 둡니다. 기준선(일반적으로 이전 주)과 비교하여 재전송이 증가하면 종종 근본적인 네트워크 문제가 있음을 나타냅니다. 자세한 내용은 [Watchdog Insights][5] 설명서를 참조하세요.

Watchdog Insights를 사용하여 다음을 수행하세요.
- 잠재적인 문제를 조기에 탐지
- 이상 징후와 특정 근본 원인 연관시키기
- 사용자에게 영향을 미치기 전에 성능 저하 조사하기

Claude Code나 Cursor와 같은 AI 에이전트에서 Datadog MCP Server의 [`analyze_cloud_network_monitoring`][7] 도구를 사용하여 지연 시간, 패킷 손실 및 TCP 연결 상태를 조사할 수도 있습니다.

## TLS 인증서 {#tls-certificates}

만료되었거나 만료 예정인 TLS 인증서는 서비스 간 보안 연결을 차단하여 트래픽이 손실될 수 있습니다. {{< ui >}}TLS Certificates{{< /ui >}} 섹션에는 다음 항목이 나열됩니다.

- {{< ui >}}Expired certificates{{< /ui >}}: 유효하지 않으며 트래픽을 차단하는 인증서
- {{< ui >}}Expiring certificates{{< /ui >}}: 만료 예정인 인증서
- {{< ui >}}Impacted services{{< /ui >}}: 각 인증서 문제의 영향을 받는 클라이언트 및 서버 서비스(클라이언트 서비스는 Application Load Balancer와 같은 AWS 로드 밸런서일 수 있음)

만료된 인증서를 클릭하여 AWS에서 갱신하는 단계를 조회하거나 [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] 또는 [{{< ui >}}Declare an Incident{{< /ui >}}][4]를 생성하세요.

## DNS 실패 {#dns-failures}

DNS 구성 오류로 인해 트래픽이 잘못된 대상으로 라우팅되어 서비스 간 통신이 차단될 수 있습니다. 이러한 실패는 일반적으로 DNS 라우팅 구성 변경으로 인해 발생합니다.

{{< ui >}}DNS Failures{{< /ui >}} 섹션에는 다음 정보가 표시됩니다.

- {{< ui >}}Failure reason{{< /ui >}}: DNS 실패 원인
- {{< ui >}}Impacted DNS server{{< /ui >}}: 실패율이 높아진 DNS 서버
- {{< ui >}}Impacted services{{< /ui >}}: DNS 실패의 영향을 받는 클라이언트 및 서버 서비스

**실패 이유**:

NXDOMAIN  
: 도메인 이름이 존재하지 않습니다. 일반적으로 잘못된 구성이나 제거된 도메인으로 인해 발생합니다.

TIMEOUT 
: DNS 쿼리가 응답을 받기 전에 시간 초과되었습니다. 이는 네트워크 문제나 응답하지 않는 DNS 서버를 나타낼 수 있습니다.

SERVFAIL
: DNS 서버가 쿼리를 처리하지 못했습니다. 주로 서버 측 문제로 인해 발생합니다.

서비스 이름 위로 마우스를 가져가 APM으로 피벗하거나 권장 작업을 클릭하여 수정 단계와 [{{< ui >}}New workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] 또는 [{{< ui >}}Declare an Incident{{< /ui >}}][4] 생성 옵션을 조회하세요.

## 보안 그룹 {#security-groups}

보안 그룹은 허용 및 거부 규칙을 통해 클라우드 환경의 트래픽 흐름을 제어합니다. 보안 그룹은 기본적으로 트래픽을 거부하므로, 실수로 규칙을 삭제하거나 수정하면 서비스 간 정상적인 트래픽이 즉시 차단될 수 있습니다.

**참고**: 보안 그룹 모니터링은 AWS에서만 사용할 수 있으며, AWS 통합에서 [EC2 리소스 수집][6]을 활성화해야 합니다.

{{< ui >}}Security Groups{{< /ui >}} 섹션에서는 다음 항목을 식별합니다.
- 트래픽을 차단하는 보안 그룹 구성 오류
- 통신할 수 없는 특정 서비스
- 보안 그룹 규칙의 최근 변경 사항

**해결책**: 
1. 보안 그룹 문제를 클릭하여 사이드 패널을 엽니다.
2. {{< ui >}}View in AWS{{< /ui >}}를 선택하여 AWS 콘솔로 이동합니다.
3. 인바운드 및 아웃바운드 규칙을 검토하고 수정합니다.
4. 사이드 패널의 {{< ui >}}Infrastructure Change Tracking{{< /ui >}} 데이터를 사용하여 변경이 발생한 시점을 확인하고 필요한 경우 되돌립니다.

## 필터링 {#filtering}

페이지 상단의 필터를 사용하여 표시되는 문제의 범위를 좁히세요. 사용 가능한 필터는 다음과 같습니다.

- {{< ui >}}Service{{< /ui >}}: 특정 서비스에 영향을 미치는 문제 조회
- {{< ui >}}Team{{< /ui >}}: 특정 팀이 담당하는 문제 조회

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/cloud_network_monitoring/setup
[2]: /ko/actions/workflows/build/
[3]: /ko/incident_response/work_management/create_work_item
[4]: /ko/incident_response/incident_management/declare/
[5]: /ko/watchdog/insights
[6]: /ko/integrations/amazon-web-services/#resource-collection
[7]: /ko/mcp_server/tools/#analyze_cloud_network_monitoring