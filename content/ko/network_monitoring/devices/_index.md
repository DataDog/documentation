---
aliases:
- /ko/network_device_monitoring/devices/
description: 라우터, 스위치, 서버 및 방화벽과 같은 네트워크 연결 장치에 대한 가시성을 확보합니다.
disable_sidebar: true
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: 지식 센터
  text: SNMP 모니터링 개요
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링하기
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: 블로그
  text: Datadog으로 Cisco Meraki 모니터링하기
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: 블로그
  text: Datadog으로 데이터센터와 네트워크 장치 모니터링하기
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: 블로그
  text: 네트워크 장치 모니터링 소개하기
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩으로 네트워크 성능 문제 모니터링 및 진단
kind: 설명서
title: 네트워크 장치 모니터링
---

## 개요

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

네트워크 장치 모니터링은 라우터, 스위치 및 방화벽과 같은 온 프레미스 및 가상 네트워크 장치에 대한 가시성을 제공합니다. 모든 네트워크에서 장치를 자동으로 검색하여 대역폭 사용률, 전송된 바이트 수와 같은 메트릭을 빠르게 수집하고 장치의 가동/정지 여부를 확인할 수 있습니다.

## 시작하기

1. Datadog 에이전트를 설치합니다(일반적으로 모니터링되는 장치가 아닌 서버입니다).
2. [개별 장치 모니터링][1] 또는 [장치 자동탐지][2]를 사용하여 SNMP 통합을 설정합니다.
3. 네트워크 장치 탐색 페이지에서 전체 네트워크 인프라스트럭처 모니터링을 시작합니다.
4. DataDog의 기본 제공 대시보드에서 수집된 메트릭 보기:
    - [모니터링된 모든 장치의 개요][3]
    - [모든 인터페이스의 성능 전반][4]
5. [SNMP 메트릭][5]에 대한 사전 모니터링을 통해 문제가 발생하기 전에 미리 파악합니다.

## 지원되는 장치

### 일반 프로필

일반 프로필은 벤더 프로필에서 지원되지 않는 모든 장치에 대한 메트릭을 수집합니다. 메트릭에는 TCP, UDP, IP 및 대역폭 사용률, 전송/수신 볼륨 등의 인터페이스 메트릭이 포함됩니다.

### 벤더 프로필

전용 프로필에서 지원되는 벤더 장치는 다음과 같습니다. 벤더/장치 유형은 지원되지만 특정 모델은 지원되지 않는 경우 [FAQ 페이지][6]을 참조하세요.

-   Cisco Catalyst
-   Cisco ASA
-   Cisco CSR 1000v
-   Cisco ISR 4431
-   Cisco Nexus
-   Cisco ICM
-   Cisco UC 가상 머신
-   Arista
-   Aruba
-   체크포인트 방화벽
-   Chatsworth PDU
-   APC UPS
-   F5 Big IP
-   Fortinet FortiGate
-   HP iLO
-   HP Proliant
-   Dell iDRAC
-   EMC Isilon
-   Juniper EX Series
-   Juniper MX Series
-   Juniper SRX
-   Meraki Cloud
-   Meraki On-Prem
-   NetApp
-   Palo Alto

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /ko/network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /ko/monitors/types/metric/
[6]: /ko/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
