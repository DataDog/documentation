---
aliases:
- /ko/network_performance_monitoring/guide/detecting_a_network_outage/
- /ko/network_monitoring/performance/guide/detecting_a_network_outage/
further_reading:
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: 지침
  text: Network Insights를 사용해 애플리케이션 가용성 감지
title: 네트워크 중단 감지
---
네트워크 중단은 인프라스트럭처, 애플리케이션 또는 컨테이너 문제로 오인되는 경우가 많기에 감지하기 어렵습니다. 지역 네트워크 성능이나 현재 사용 중인 타사 엔드포인트의 성능을 분명하게 파악하지 못하면 타사 또는 클라우드의 지역 네트워크 중단 문제를 감지하는 데 몇 시간이 걸릴 수 있으며, 이는 결과적으로 고객에게 영향을 미칠 수도 있습니다.

클라우드 네트워크 모니터링(CNM)을 사용하면 단 몇 분 안에 네트워크 중단을 감지할 수 있습니다. 프로세스 메트릭, 트레이스, 로그, 인프라스트럭처 메트릭을 활용해 네트워크 플로우 데이터를 분석하면 문제의 원인을 추측하는 대신 제거 프로세스(아래의 단계 참조)를 사용하여 네트워크 중단 여부를 판단할 수 있습니다.

## 기본 인프라스트럭처에 과부하가 걸리는 트래픽

CNM 메트릭을 사용하여 소스 엔드포인트가 상당한 양의 트래픽을 전송하거나, 대상 엔드포인트에 엄청난 양의 개방형 연결을 생성하는지 확인하세요. 결함 있는 종속성(예: 지연 시간이 높은 종속성)을 선택할 때, 측면 패널 그래프를 확인하여 트래픽 급증을 파악할 수 있습니다. 해당 트래픽 급증은 수신 애플리케이션이 모든 연결에 응답할 수 없을 정도로 과부하를 일으킵니다(TCP의 경우). 이로 인해 패킷 손실이 증가하고 TCP 지연 시간이 늘어납니다.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/cnm_metrics.png" alt="기본 인프라스트럭처에 과부하가 걸리는 트래픽">}}

## 기본 인프라스트럭처의 과도한 CPU 소비

반면에 클라이언트 또는 서버 엔드포인트 리소스의 과도한 점유는 두 엔드포인트 간의 통신 불량의 원인이 될 수 있습니다. 측면 패널 **Process** 탭에서 '소스 또는 대상 엔드포인트에서 실행 중인 프로세스'로 보기 범위를 확장하여, 기본 호스트 또는 컨테이너의 성능을 저하시켜 네트워크 호출 응답을 느리게 만들 수 있는 무거운 소프트웨어를 찾아보세요. 이 경우, 기본 호스트가 과도하게 실행되어 애플리케이션 지연 시간을 유발하는지 여부를 확인하는 것 외에도, 호스트가 과도하게 실행되는 이유도 알아야 합니다. 프로세스 메트릭을 명령별로 그룹화하면 CPU 및 메모리 리소스를 소비하는 특정 워크로드를 파악할 수 있으므로 세분화된 정보를 얻을 수 있습니다. 

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/cnm_processes_tab.png" alt="기본 인프라스트럭처의 과도한 CPU 소비">}}

## 코드의 애플리케이션 오류

네트워크 오류 및 지연 시간은 클라이언트 측 애플리케이션 오류로 인해 발생할 수도 있습니다. 예를 들어, 애플리케이션이 불필요하게 루프 연결을 생성한다면 해당 애플리케이션에 의존하는 엔드포인트에 과부하가 걸려 다운스트림 애플리케이션 및 네트워크 문제가 발생할 수 있습니다. 이러한 사례를를 확인하려면, [CNM > DNS][1]의 특정 서비스 **Traces** 탭이나 APM 트레이스의 특정 트레이스 **Network** 탭에서 애플리케이션 요청 오류를 찾아봅니다.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/traces_2.png" alt="코드의 어플리케이션 오류">}}

이러한 단계 중 어떠한 것도 문제의 근본 원인이 아니라면,  특정 지역, 가용 영역 또는 타사 도메인 엔드포인트와 관련된 종속성 오류 및 지연 시간으로 인해 네트워크 중단이 발생한 것입니다. 이러한 경우 관련 업체에 연락하여 문제를 보고 및 해결할 수 있습니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/dns