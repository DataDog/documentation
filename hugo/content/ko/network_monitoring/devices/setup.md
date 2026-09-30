---
aliases:
- /ko/network_monitoring/devices/getting_started/
description: 라우터, 스위치, 서버, 방화벽 등 네트워크에 연결된 기기를 사용하여 시작하세요.
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: 문서
  text: 지원되는 NDM 기기
- link: network_monitoring/devices/data/
  tag: 문서
  text: 수집된 NDM 데이터
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
title: 설정
---
## 개요 {#overview}

Network Device Monitoring은 온프레미스 라우터, 스위치 및 방화벽의 상태와 성능에 대한 통찰력을 제공합니다. Datadog Agent가 네트워크에 접근할 수 있는 호스트에 설치된 후, Datadog Agent는 자동으로 네트워크 기기를 감지하고 즉시 메트릭을 수집할 수 있습니다.

이 가이드는 호스트에서 Network Device Monitoring을 구성하고, 기기 태그를 보강하며, 기기 프로필을 설정 및 조회하고, NetFlow Monitoring에서 데이터를 조회하며, 제공된 대시보드와 기기 토폴로지 맵에서 데이터를 검증하는 방법을 다룹니다.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="Network Device Monitoring 랜딩 페이지로, 그래프와 인터페이스를 보여줍니다." style="width:100%;" >}}

## 작동 방식 {#how-it-works}

다음 다이어그램은 Syslog, SNMP 트랩 및 NetFlow 정보 간의 데이터 흐름을 보여줍니다. 기기들은 다이어그램에 표시된 포트를 통해 Datadog Agent에 관련 정보를 전송합니다(포트는 Agent의 구성에서 필요에 따라 변경할 수 있습니다). API 기반 통합의 경우, Datadog Agent는 공급업체별 `https` API 통합 지침에 따라 온프레미스 또는 클라우드에서 네트워크 기기 공급업체의 소프트웨어 컨트롤러 또는 관리자와 연결됩니다. NDM으로 구성되고 온프레미스 또는 클라우드에 배포된 Datadog Agent는 네트워크에서 수집된 모든 기기 및 네트워크 데이터를 통합하여 포트 `443`에서 HTTPS를 통해 Datadog에 전송합니다. 이는 메트릭, 로그, 트레이스, 모니터링, 대시보드의 통합된 전체 스택 가시성을 제공합니다.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Syslog, 트랩 및 NetFlow 수집 흐름을 보여주는 NDM 다이어그램." style="width:90%;" >}}

## 다음 단계 {#next-steps}

아래 지침에 따라 Datadog을 구성하여 네트워크 기기를 모니터링하세요.

## 전제 조건 {#prerequisites}

### Agent 설치 {#install-the-agent}

[Agent 설치 페이지][1]로 이동하여 호스트(일반적으로 모니터링 대상 기기가 **아닌** 서버)에 [Datadog Agent][2]를 설치하세요.</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="Agent 구성 페이지, Ubuntu 설치가 강조되어 있습니다." style="width:100%;" >}}

## 설정 {#setup}

### 고가용성 지원 {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> 선택한 <a href="/getting_started/site">Datadog 사이트</a>에 대해 Datadog Agent의 고가용성 지원은 제공되지 않습니다.{{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Network Device Monitoring에서 Datadog Agent의 고가용성(HA) 지원을 통해 활성 Agent와 대기 Agent를 지정할 수 있으며, 활성 Agent에 문제가 발생할 경우 자동으로 장애 조치가 이루어집니다. 이 설정은 Agent를 단일 실패 지점으로부터 제거하여, OS 업데이트 및 Agent 업그레이드와 같은 예기치 않은 인시던트나 계획된 유지보수 중에도 지속적인 모니터링을 유지합니다.

NDM에서 활성 및 대기 Agent를 HA 쌍으로 구성할 수 있습니다. 활성 Agent가 다운되면 대기 Agent가 90초 이내에 인계받아 새로운 활성 Agent가 됩니다. 또한, 선호하는 활성 Agent를 지정할 수 있으며, NDM은 해당 Agent가 다시 사용 가능해지면 자동으로 복귀합니다. 이 기능은 예정된 유지보수 전에 선제적인 Agent 전환을 가능하게 합니다.

자세한 내용은 [Datadog Agent의 고가용성 지원][20]을 참조하세요.

### 구성 {#configuration}

네트워크 기기를 모니터링하려면 다음 방법 중 하나를 사용하여 SNMP 모니터링을 활성화하세요.

[개별 기기][3]
: 개별 기기에서 SNMP 모니터링을 구성하세요.

[Autodiscovery][4]
: Autodiscovery를 사용하여 SNMP 모니터링을 구성하세요.

[Ping][5]
: SNMP 검사를 구성하여 기기에 ICMP 핑을 전송하세요.

[Syslog][22]
: 기기가 Syslog 메시지를 전송하도록 구성하세요.

[VPN 모니터링][21]
: VPN 모니터링을 구성하여 기기의 VPN 터널을 모니터링하세요.

### 네트워크 기기에 태그 {#enrich-network-devices-with-tags} 추가

NDM이 기기에 구성된 후, 다음 방법을 사용하여 네트워크 기기 태그를 추가하여 더욱 보강할 수 있습니다.

[Datadog Agent][2]
: Agent는 [개별 기기][3]를 구성하거나 [Autodiscovery][4]를 통해 기기 태그를 수집할 수 있습니다.

[기기 프로필][6]
: 앱 내에서 기기 프로필을 직접 생성하여 특정 메트릭 및 태그를 수집하고 사용자 정의하도록 Agent를 구성합니다.

[ServiceNow 통합][7]
: ServiceNow의 CMDB(구성 관리 데이터베이스)에서 정의된 데이터로 Datadog Network Device Monitoring으로 모니터링되는 네트워크 기기를 동적으로 보강합니다.

[Network Device Monitoring API](#use-the-network-api)
: 네트워크 기기에 태그를 프로그래밍 방식으로 추가하기 위해 Network Device Monitoring API를 활용합니다.

### 메트릭 및 태그를 사용자 정의하세요 {#customize-metrics-and-tags}

[지원되는 기기][9] 페이지에서 기본 제공 기기 프로필을 확인한 후, 기기의 메트릭 및 태그를 사용자 정의하세요. 메트릭을 편집하거나 추가하고 싶다면 다음 옵션을 사용할 수 있습니다.

[기기 프로필][10]
: Datadog Agent 파일에서 기기 프로필을 사용하여 메트릭 및 태그를 직접 편집하세요.`yaml`

[GUI 기반 프로필 작성][6]
: Datadog Network Monitoring의 GUI 기반 기기 온보딩 경험을 활용하여 기기에 사용자 정의 메트릭 및 태그를 추가하세요.

### NetFlow Monitoring {#netflow-monitoring}

[NetFlow Monitoring][11]을 구성하여 NetFlow 지원 기기의 흐름 레코드를 시각화하고 모니터링하세요.

{{< img src="network_device_monitoring/netflow/home.png" alt="상위 소스, 목적지, 프로토콜, 소스 포트, 목적지 포트 및 기기 트렌드에 대한 탭이 포함된 NetFlow Monitoring 페이지" style="width:100%;" >}}

## 데이터를 검증하세요{#validate-your-data}

- [네트워크 기기][12] 페이지에서 전체 네트워크 인프라 모니터링을 시작하세요.
- Datadog의 기본 제공 대시보드에서 수집된 메트릭을 확인하세요.
  - [모니터링된 모든 기기의 개요][13]
  - [네트워크 기기의 인터페이스 성능][14]
- [기기 토폴로지 맵][15]을 사용하여 기기의 문제를 식별하고 해결하세요.

## 네트워크 API를 사용하세요{#use-the-network-api}

- [네트워크 API][8]를 사용하여 네트워크 기기에 대한 다음 정보를 추출하세요.
  * [기기의 인터페이스 목록을 가져옵니다.][16]
  - [기기의 태그 목록을 가져옵니다.][17]
  - [기기의 태그 목록을 업데이트합니다.][18]

## 문제 해결 {#troubleshooting}

- NDM 문제 해결에 대한 자세한 정보는 Network Device Monitoring [문제 해결][19] 페이지를 참조하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent
[3]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /ko/network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /ko/network_monitoring/devices/ping
[6]: /ko/network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/ko/integrations/servicenow/#network-device-tagging
[8]: /ko/api/latest/network-device-monitoring/
[9]: /ko/network_monitoring/devices/supported_devices
[10]: /ko/network_monitoring/devices/profiles
[11]: /ko/network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /ko/network_monitoring/devices/device_topology_map
[16]: /ko/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /ko/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /ko/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /ko/network_monitoring/devices/troubleshooting
[20]: /ko/integrations/guide/high_availability
[21]: /ko/network_monitoring/devices/vpn_monitoring
[22]: /ko/network_monitoring/devices/syslog