---
aliases:
- /ko/network_performance_monitoring/network_table
- /ko/network_performance_monitoring/dns_monitoring
description: DNS 서버 문제 진단 및 디버그
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: 블로그
  text: Datadog으로 DNS 모니터링하기
- link: https://www.datadoghq.com/blog/monitor-coredns-with-datadog/
  tag: 블로그
  text: Datadog으로 CoreDNS 모니터링하기
- link: /network_monitoring/performance/network_analytics
  tag: 설명서
  text: 각 소스와 대상 사이에 있는 네트워크 데이터를 탐색합니다.
- link: https://www.datadoghq.com/blog/dns-resolution-datadog/
  tag: 블로그
  text: DNS 확인을 사용하여 클라우드 및 외부 엔드포인트 모니터링
title: DNS 모니터링
---

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview.png" alt="Datadog의 DNS 모니터링 페이지" >}}

<div class="alert alert-info">
DNS 모니터링을 활성하기 위해 에이전트 버전 7.33 이상으로 업그레이드합니다.
</div>

DNS 모니터링은 서버 측 및 클라이언트 측 DNS 문제를 식별하는 데 도움이 되는 DNS 서버 성능 개요를 제공합니다. 이 페이지는 플로우 수준 DNS 메트릭을 수집하고 표시하여 다음을 식별할 수 있습니다:

* DNS 요청을 하는 포드 또는 서비스와 해당 요청을 받는 서버입니다.
* 가장 많은 요청을 하거나 가장 높은 비율로 요청을 하는 엔드포인트입니다.
* 요청에 대한 DNS 서버의 응답 시간이 점진적으로 또는 갑자기 증가한 경우입니다.
* 오류 발생률이 높은 DNS 서버 및 오류 유형입니다.
* 어떤 도메인이 해결되고 있는지 확인합니다.

## 설정

DNS 모니터링을 사용하기 전에 [네트워크 성능 모니터링 설정][1]을(를) 완료하세요. 또한 최신 버전의 에이전트를 사용하고 있는지 확인하세요 (Linux OS의 경우 에이전트 v7.23 이상, Windows Server의 경우 v7.28 이상). 설치가 완료되면 네트워크 성능 모니터링 제품에서 **DNS** 탭에 액세스할 수 있습니다.

대신 네트워크 장치 모니터링을 찾으시나요? [NDM 설정 지침][2]을 참조하세요.

## 쿼리

페이지 상단의 검색창을 사용하여 클라이언트(DNS 요청 실행)와 DNS 서버(DNS 요청에 응답) 간의 종속성을 쿼리합니다. 대상 포트의 범위가 DNS 포트 53으로 자동 지정되어 모든 종속성 결과가 해당 형식(클라이언트 → DNS 서버)과 매칭됩니다.

특정 클라이언트로 검색 범위를 좁히려면 검색창에서 클라이언트 태그를 사용하여 DNS 트래픽을 집계 및 필터링하세요. 기본 보기에서 클라이언트는 가장 일반적인 태그로 그룹화됩니다. 따라서 테이블의 각 행은 일부 DNS 서버에 DNS 요청을 하는 서비스를 나타냅니다.

{{< img src="network_performance_monitoring/dns_monitoring/dns_client_search.png" alt="검색창에 'client_service:ad-server' 입력, 클라이언트 보기에 'pod_name' 입력, 서버 보기에 'network.dns_query' 입력한 DNS 모니터링 페이지" style="width:100%;">}}

특정 DNS 서버로 검색 범위를 좁히려면 서버 태그를 사용하여 검색창을 필터링합니다. **그룹별(Group by)** 드롭다운 메뉴에서 다음 옵션 중 하나를 선택하여 서버 디스플레이를 설정합니다.

* `dns_server`: DNS 요청을 수신하는 서버입니다. 이 태그의 값은 `pod_name` 또는 `task_name`와 동일합니다. 태그를 사용할 수 없는 경우 `host_name`이 사용됩니다
* `host`: DNS 서버의 호스트 이름입니다.
* `service`: DNS 서버에서 실행하는 서비스입니다.
* `IP`: DNS 서버의 IP입니다.
* `dns_query`: (에이전트 7.33 이상 버전 필요) 쿼리된 도메인입니다.

다음 예시는 프로덕션 환경의 가용성 영역에 있는 포드에서 DNS 요청을 수신하는 호스트까지의 모든 흐름을 보여 줍니다:

{{< img src="network_performance_monitoring/dns_monitoring/dns_query_example.png" alt="'검색 필드에 client_availability_zone:us-central1-b' 및 'client_env: prod'를 입력하고, 클라이언트 보기의 드롭다운 메뉴에서 'pod_name'를 선택하고, 서버 보기의 드롭다운 메뉴에서 호스트를 선택하여 쿼리합니다." style="width:100%;">}}

### 권장 쿼리

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns.png" alt="쿼리 설명 표시 DNS 모니터링 페이지의 권장 쿼리" style="width:100%;">}}

[네트워크 분석][4] 페이지와 비슷한 DNS 페이지 상단의 권장 쿼리 3개입니다. 해당 쿼리는 대개 DNS 서비스 상태를 점검하고 상위 수준 DNS 메트릭을 확인하는 데 사용되는 정적 쿼리 입니다. 본 권장 쿼리에서 시작하여 DNS 설정에 대한 추가 통찰을 얻고 DNS 문제를 해결하세요.

권장 쿼리에 마우스를 올리면 쿼리 결과값에 대한 간략한 설명을 확인할 수 있습니다. 쿼리를 눌러 해당 쿼리를 실행하고 **쿼리 삭제**를 눌러 제거합니다. 아울러, 각 권장 쿼리는 고유한 권장 그래프 세트를 갖추고 있으며 해당 권장 쿼리를 삭제하면 그래프는 기본 설정값으로 초기화됩니다. 

## 메트릭

DNS 메트릭은 그래프와 관련 테이블을 통해 표시됩니다.

**참고**: 데이터는 30초마다 수집되고 5분 버킷으로 집계되며 14일 동안 보존됩니다.

다음 DNS 메트릭을 사용할 수 있습니다:

| 메트릭                   | 설명                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **DNS 요청**         | 클라이언트에서 보낸 DNS 요청 수입니다.                                                                         |
| **DNS 요청 / 초** | 클라이언트가 수행한 DNS 요청 비율입니다.                                                                             |
| **DNS 응답 시간**    | 클라이언트의 요청에 대한 DNS 서버의 평균 응답 시간입니다.                                                |
| **타임아웃**             | 클라이언트의 시간 초과된 DNS 요청의 개수(전체 DNS 응답에 대한 백분율로 표시됨). <br  /><br />**참고**: 해당 시간 초과는 NPM 내부에서 계산한 메트릭 값이며, NPM 외부에서 보고된 DNS 시간 초과 데이터와 일치하지 않을 수도 있습니다. 아울러, DNS 클라이언트 또는 서버가 보고하는 DNS 시간 초과 데이터와도 다릅니다.                |
| **오류**               | DNS 오류 코드를 생성한 클라이언트의 요청 수입니다(모든 DNS 응답의 백분율로 표시됨).   |
| **SERVFAIL**             | SERVFAIL (DNS 서버 응답 실패) 코드를 생성한 클라이언트의 요청 수입니다(모든 DNS 응답의 백분율로 표시됨).   |
| **NXDOMAIN**             | NXDOMAIN(도메인 이름이 존재하지 않음) 코드를 생성한 클라이언트의 요청 수입니다(모든 DNS 응답의 백분율로 표시됨).   |
| **기타**                | NXDOMAIN 또는 SERVFAIL이 아닌 오류 코드를 생성한 클라이언트의 요청 수입니다(모든 DNS 응답의 백분율로 표시됨).   |
| **실패**             | 클라이언트의 DNS 요청에 대한 총 시간 초과 및 오류 수입니다(모든 DNS 응답의 백분율로 표시됨). |

## 테이블

네트워크 테이블은 쿼리에 의해 정의된 각 _client_ 및 _server_ 종속성을 기준으로 위의 메트릭을 분류합니다.

테이블 오른쪽 상단에 있는 **Customize** 버튼을 사용하여 테이블의 열을 설정합니다.

**필터 트래픽** [옵션][3]을 사용하여 보기에 있는 트래픽 범위를 좁힙니다.

## 사이드패널

사이드패널은 상황별 텔레메트리 기능을 제공하여 DNS 서버 종속성을 신속하게 디버그할 수 있도록 도와줍니다. 플로우, 로그, 트레이스 및 프로세스 탭을 사용하여 DNS 서버의 수신 요청 수, 응답 시간 또는 실패율이 높은 원인이 무엇인지 확인할 수 있습니다:

* 기본 인프라스트럭처의 리소스를 소비하는 무거운 프로세스
* 클라이언트 측 코드의 애플리케이션 오류
* 특정 포트 또는 IP에서 발생하는 높은 요청 수

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel.png" alt="DNS 모니터링 사이드패널" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/network_monitoring/performance/
[2]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2
[3]: /ko/network_monitoring/performance/network_analytics#table
[4]: /ko/network_monitoring/performance/network_analytics/#recommended-queries