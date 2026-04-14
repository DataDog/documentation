---
description: 네트워크 트래픽 경로 조사
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: 설명서
  text: Network Path의 List View에 대해 자세히 알아보기
- link: /network_monitoring/network_path/path_view
  tag: 설명서
  text: Network Path의 Path View에 대해 자세히 알아보기
- link: /network_monitoring/network_path/setup
  tag: 설명서
  text: Network Path 설정
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: 블로그
  text:  Datadog Network Path를 통해 엔드투엔드 네트워크 가시성을 확보하세요.
is_beta: true
title: 네트워크 경로
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog Cloud Network Monitoring용 Network Path는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">Datadog Cloud Network Monitoring용 Network Path는 제한적으로 제공됩니다. 사용하려면 Datadog 담당자에게 문의해 주세요.</div>

## 개요

Network Path는 네트워크 트래픽이 출발지에서 목적지까지 이어지는 경로를 나타냅니다. 이를 통해 네트워크 관리자는 내부 문제인지 ISP(인터넷 서비스 공급자)의 문제인지, 잘못된 라우팅과 같은 기타 문제인지 네트워크 오류 원인을 정확하게 식별할 수 있습니다. 각 행은 `source` 및 `destination` 패싯 패널에 표시된 대로 소스에서 대상까지의 경로를 나타냅니다.

**참고**: Network Path 기능을 사용하려면 [Cloud Network Monitoring][2]을 활성화해야 합니다.

{{< img src="network_performance_monitoring/network_path/network_path_default_view_3.png" alt="소스에서 대상까지의 경로를 보여주는 Network Path 기본 뷰" >}}

## 작동 방식

Datadog은 소스에서 대상까지의 각 홉에서 패킷의 경로와 대기 시간을 보여주기 위해 호스트 수준에서 `traceroute`를 수행합니다. 각 호스트는 자체적으로 `traceroute`를 실행하며 표시된 경로는 이 목록을 시각적으로 표현한 것입니다. 네트워크 경로는 TCP 또는 UDP 패킷을 실행 중인 애플리케이션에 자동으로 보냅니다.

다음 다이어그램은 소스(호스트)에서 대상까지의 일반적인 네트워크 경로 플로우를 보여줍니다.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Network Path 작동 방식을 보여주는 다이어그램" >}}

**참고**: 기본적으로 Datadog은 5분마다 `traceroute`를 실행합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /ko/network_monitoring/cloud_network_monitoring/