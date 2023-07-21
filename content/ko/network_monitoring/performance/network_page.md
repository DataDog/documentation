---
aliases:
- /ko/network_performance_monitoring/network_table
- /ko/network_performance_monitoring/network_page
description: 스택 전반에서 각 소스와 대상 간의 네트워크 데이터를 탐색합니다.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: 네트워크 성능 모니터링
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: 블로그
  text: 향상된 쿼리 및 맵 환경을 통해 네트워크 조사 간소화
- link: /network_monitoring/devices
  tag: 설명서
  text: 네트워크 장치 모니터링
- link: /network_monitoring/performance/setup
  tag: 설명서
  text: Datadog 에이전트를 사용하여 네트워크 데이터를 수집합니다.
kind: 설명서
title: 네트워크 페이지
---

{{< img src="network_performance_monitoring/network_page/main_page_npm2.png" alt="메인 페이지" >}}

## 쿼리

특정 엔드포인트 간의 트래픽으로 검색 범위를 좁히려면 **태그를 사용하여** 네트워크 집계 연결을 집계하고 필터링하세요. 페이지 상단의 검색창을 사용하여 클라이언트 및 서버에 대한 태그를 선택할 수 있습니다. 클라이언트는 연결이 시작된 곳이고 서버는 연결이 종료된 곳입니다.

{{< img src="network_performance_monitoring/network_page/network_diagram2.png" alt="인바운드 및 아웃바운드 요청을 보여주는 네트워크 다이어그램" style="width:100%;">}}

다음 스크린샷은 `service` 태그별로 클라이언트와 서버를 집계하는 기본 보기를 보여줍니다. 따라서 표의 각 행은 1시간 동안 집계된 서비스 간 집계 연결을 나타냅니다.


{{< img src="network_performance_monitoring/network_page/context_npm2.png" alt="context" style="width:80%;">}}

다음 예는 `us-east-1` 지역의 서비스를 나타내는 IP 주소에서 가용 영역에 이르는 모든 집계 연결을 보여 줍니다:

{{< img src="network_performance_monitoring/network_page/flow_table_region_az2.png" alt="필터링된 연결 테이블 집계" style="width:80%;">}}

페이지 오른쪽 상단의 타임 셀렉터에서 집계할 트래픽에 따라 타임 프레임을 설정할 수 있습니다.

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="타임 프레임 NPM" style="width:30%;">}}

Datadog 통합 또는 통합 서비스 태깅의 태그를 사용하여 자동으로 집계 및 필터링할 수 있습니다. 다른 태그는 아래의 [커스텀 패싯](#custom-facets)을 참조하세요. "Auto-grouped traffic"을 선택하면 `service`, `kube_service`, `short_image`및 `container_name`과 같이 일반적으로 사용되는 여러 태그로 집계된 트래픽을 볼 수 있습니다.

`CIDR(network.client.ip, 10.0.0.0/8)` 또는 `CIDR(network.server.ip, 10.0.0.0/8)`를 사용하여 클라이언트 또는 서버가 CIDR과 일치하는 트래픽을 필터링할 수 있습니다

### 패싯 패널

패싯 패널을 사용하여 플로우에서 사용할 수 있는 모든 태그를 찾아보거나 찾고 있던 정확한 태그가 기억나지 않을 때 트래픽을 필터링할 수 있습니다. 패싯 패널은 검색창 쿼리에 있는 태그를 반영합니다. 상단의 **클라이언트** 및 **서버** 탭을 사용하여 패싯 패널 간에 전환합니다:

{{< img src="network_performance_monitoring/network_page/destination_panel2.png" alt="Destination 패널" style="width:20%;">}}

#### 커스텀 패싯

Datadog 네트워크 페이지의 태그를 기준으로 트래픽 데이터를 집계하고 필터링하세요. 태그 포함 목록은 기본적으로 제공되며, 검색창 드롭다운 메뉴에서 찾을 수 있습니다:

{{< img src="network_performance_monitoring/network_page/drop_down_npm.png" alt="드롭다운 메뉴" style="width:90%;">}}

나열된 태그에는 `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` 및 `port` 등이 포함됩니다. 메뉴에 없는 태그를 기준으로 트래픽을 집계하거나 필터링하려면 해당 태그를 커스텀 패싯으로 추가합니다:

1. 패싯 패널의 오른쪽 상단에 있는 `+` 버튼을 선택합니다.
2. 커스텀 패싯을 만들 관련 태그를 입력합니다.
3. `Create`를 클릭합니다.

커스텀 패싯이 생성되면 이 태그를 사용하여 네트워크 페이지 및 맵에서 트래픽을 필터링하고 집계할 수 있습니다. 모든 커스텀 패싯은 패싯 패널의 하단 `Custom` 섹션에서 확인할 수 있습니다.

### 와일드카드 검색
다중 문자 와일드카드 검색을 수행하려면 다음과 같이 `*` 기호를 사용합니다:

- `client_service:web*`는 웹으로 시작하는 모든 클라이언트 서비스와 일치합니다
- `client_service:*web`는 웹으로 끝나는 모든 클라이언트 서비스와 일치합니다
- `client_service:*web*`는 문자열 웹을 포함하는 모든 클라이언트 서비스와 일치합니다

와일드카드 검색은 이 구문을 사용하는 패싯 내에서 작동합니다. 이 쿼리는 문자열 "mongo"로 끝나는 모든 클라이언트 서비스를 반환합니다:

`client_service:*mongo`

자세한 내용은 [검색 구문][1] 설명서를 참조하세요.

### 그룹화

그룹을 사용하면 지정된 태그 값을 기준으로 데이터를 그룹화할 수 있습니다. 예를 들어 **host**와 같은 그룹을 선택하면 결과가 개별 호스트별로 그룹화됩니다. **Ungrouped traffic** 옵션을 사용하면 모든 데이터를 단일 그룹으로 볼 수도 있습니다. 또한 관심 그룹으로 태그가 지정되지 않은 대량의 데이터가 있을 수 있습니다. 이러한 경우 **Auto-grouped traffic**을 사용하여 사용 가능한 태그별로 데이터를 그룹화할 수 있습니다.

## 네트워크 데이터

{{< img src="network_performance_monitoring/network_page/network_data2.png" alt="네트워크 데이터" style="width:90%;" >}}

네트워크 메트릭은 그래프와 관련 테이블을 통해 표시됩니다. 전송 및 수신된 모든 메트릭이 소스의 관점에서 표시됩니다:

* **전송된 메트릭**: 소스의 관점에서 _source_에서 _destination_으로 전송된 어떤 것의 값을 측정합니다.
* **수신된 메트릭**: 소스의 관점에서 _destination_에서  _source_로 전달된 어떤 것의 값을 측정합니다.

패킷 트롭이 많은 경우 `sent_metric(source to destination)` 와 `received_metric(destination to source)`에 대해 표시되는 값이 다를 수 있습니다. `destination`이  많은 양의 바이트를 `source`에 보내는 경우, `destination`에서 시작된 집계 연결에는 해당 바이트가 포함되지만 `source`에서 시작된 집계 연결에는 해당 바이트가 수신된 것으로 표시되지 않습니다.

**참고:** 데이터는 30초마다 수집되고 5분 버킷으로 집계되며 14일 동안 보존됩니다.

### 메트릭

#### 네트워크 로드

다음 네트워크 로드 메트릭을 사용할 수 있습니다:

| 메트릭          |  설명                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **볼륨**      | 일정 기간 동안 보내거나 받은 바이트 수입니다. 바이트 (또는 크기 순) 단위로 양방향으로 측정됩니다.                           |
|  **처리량** | 일정 기간 동안 보내거나 받은 바이트의 속도입니다. 양방향으로 초당 바이트 단위로 측정됩니다.                                                  |

#### TCP

TCP는 패킷의 순서대로 전송을 보장하는 연결 지향 프로토콜입니다. 다음과 같은 TCP 메트릭을 사용할 수 있습니다: 모든 메트릭은 사용 가능한 경우 연결 측면의 `client` 관점에서 계측되고, 그렇지 않은 경우 서버의 관점에서 계측됩니다.

| 메트릭                      | 설명                                                                                                                              |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **TCP Retransmits**         | TCP 재전송은 전송을 보장하기 위해 재전송되는 감지된 오류를 나타냅니다. 클라이언트의 재전송 횟수로 측정됩니다. |
| **TCP Latency**             | TCP의 왕복 시간(TCP 프레임 전송에서 확인까지의 시간)을 평활화된 값으로 측정됩니다.                              |
| **TCP Jitter**              | TCP 평활화된 왕복 시간 변동으로 측정됩니다.                                                                                       |
| **Established Connections** | 설정된 상태의 TCP 연결 수입니다. 클라이언트로부터의 초당 연결 수로 측정됩니다.                               |
| **Closed Connections**      | 닫힌 상태의 TCP 연결 수입니다. 클라이언트로부터 초당 연결 수로 측정됩니다.                                     |

### 클라우드 서비스 자동 감지

S3 또는 Kinesis와 같은 관리형 클라우드 서비스를 사용하는 경우 내부 애플리케이션에서 해당 서비스에 대한 트래픽의 성능을 모니터링할 수 있습니다. 특정 AWS 또는 Google Cloud 종속성에 대한 보기 범위를 지정하여 지연 시간을 정확히 파악하고 데이터베이스 성능을 평가하며, 네트워크를 보다 완벽하게 시각화할 수 있습니다.

{{< img src="network_performance_monitoring/network_page/cloud-service-hero-docs2.png" alt="Cloud Service Map" >}}

예를 들어, 다음을 수행할 수 있습니다.

- [네트워크 맵][2]에서 내부 Kubernetes 클러스터에서 `server_service:aws.s3`으로의 데이터 흐름을 시각화합니다.
- [네트워크 페이지](#table)로 피벗하여 해당 서비스에 가장 많은 연결을 설정하는 포드를 분리합니다.
- *Integration Metrics* 탭 아래 특정 종속성에 대한 사이드 패널에서 직접 트래픽 성능과 상관 관계가 있는 S3 성능 메트릭을 분석하여 요청이 성공했는지 확인합니다.



NPM은 자동적으로 

- 네트워크 호출을 S3 (`s3_bucket`으로 분류 가능), RDS (`rds_instance_type`으로 분류 가능), Kinesis, ELB, Elasticache 및 기타 [AWS 서비스][3]에 매핑합니다.
- API 호출을 AppEngine, Google DNS, Gmail 및 기타 [Google Cloud 서비스][4]에 매핑합니다.

에이전트를 설치할 수 없는 다른 엔드포인트(예: 공용 API)를 모니터링하려면 네트워크 개요에서 대상을 [`domain` 태그](#domain-resolution)로 그룹화합니다. 또는 아래 섹션에서 클라우드 서비스 해결 방법을 참조하세요.

### 클라우드 서비스 향상된 해결책
AWS 또는 Azure용으로 향상된 해결책을 [설정][9]한 경우 NPM은 이러한 클라우드 제공업체에서 수집한 여러 리소스를 사용하여 네트워크 트래픽을 필터링하고 그룹화할 수 있습니다. 클라우드 제공업체 및 리소스에 따라 쿼리할 수 있는 태그 조합이 달라집니다. Datadog은 사용자 정의 태그와 더불어 아래에 정의된 태그를 적용합니다.

 #### Amazon Web Services
 {{< tabs >}}
 {{% tab "로드밸런서" %}}
 - name
 - loadbalancer
 - load_balancer_arn
 - dns_name (형식: loadbalancer/dns:)
 - region
 - account_id
 - scheme
 - AWS 로드 밸런서에 적용되는 커스텀 (사용자 정의) 태그
 {{< /tabs >}}

 {{% tab "NAT 게이트웨이" %}}
 - gateway_id
 - gateway_type
 - aws_nat_gateway_id
 - aws_nat_gateway_public_ip
 - aws_account
 - availability-zone
 - region
 - AWS NAT 게이트웨이에 적용되는 커스텀 (사용자) 태그
 {{< /tabs >}}

 {{% tab "VPC 인터넷 게이트웨이" %}}
 - gateway_id
 - gateway_type
 - aws_internet_gateway_id
 - aws_account
 - region
 - VPC 인터넷 게이트웨이에 적용되는 커스텀 (사용자) 태그
 {{< /tabs >}}

{{% tab "VPC 엔드포인트" %}}
 - gateway_id
 - gateway_type
 - aws_vpc_endpoint_id
 - VPC 인터넷 엔드포인트에 적용되는 커스텀 (사용자) 태그
 {{< /tabs >}}

 {{< /tabs >}}

#### Azure
##### 로드 밸런서 및 애플리케이션 게이트웨이
 - name
 - loadbalancer
 - cloud_provider
 - region
 - 타입
 - resource_group
 - tenant_name
 - subscription_name
 - subscription_id
 - sku_name
 - Azure 로드 밸런서 및 애플리케이션 게이트웨이에 적용되는 커스텀 (사용자 정의) 태그


### 도메인 확인

Agent 7.17+부터는 외부 및 내부 트래픽에 대해 사람이 읽을 수 있는 도메인 이름으로 IP를 확인합니다. 도메인을 사용하면 S3 버킷, 애플리케이션 로드 밸런서 및 API와 같이 Datadog Agent를 설치할 수 없는 클라우드 제공업체 엔드포인트를 모니터링할 수 있습니다. C&C 서버의 DGA 도메인과 같이 인식할 수 없는 도메인 이름은 네트워크 보안 위협으로 이어질 수 있습니다. `domain`**은 Datadog에서 태그로 인코딩되므로** 검색창 쿼리 및 패싯 패널에서 이를 사용하여 트래픽을 집계하고 필터링할 수 있습니다.

{{< img src="network_performance_monitoring/network_page/domain_aggregation2.png" alt="도메인 집계" >}}

**참고**: DNS 확인은 시스템 프로브가 루트 네트워크 네임스페이스에서 실행되는 호스트에서 지원됩니다. 일반적으로 호스트 네트워크를 사용하지 않고 컨테이너 내에서 시스템 프로브를 실행하는 경우가 많습니다.

### 네트워크 주소 변환 (NAT)

NAT은 쿠버네티스(Kubernetes) 및 다른 시스템에서 컨테이너 간 트래픽을 라우팅하는 데 사용하는 도구입니다. 특정 종속성(예: 서비스 대 서비스)을 조사할 때 pre-NAT IPs의 유무를 사용하여 자체 라우팅을 수행하는 쿠버네티스(Kubernetes) 네이티브 서비스와 라우팅을 위해 외부 클라이언트에 의존하는 서비스를 구분할 수 있습니다. 이 기능에는 현재 NAT 게이트웨이의 확인이 포함되어 있지 않습니다.

 pre-NAT 및 post-NAT IP를 보려면 표 설정에서 **Show pre-NAT IPs** 토글을 사용합니다. 이 설정을 해제하면 **Client IP** 및 **Server IP** 열에 표시되는 IP가 기본적으로 post-NAT IP가 됩니다. 하나의 post-NAT IP에 대해 여러 개의 pre-NAT IP가 있는 경우 가장 일반적인 상위 5개의 pre-NAT IP가 표시됩니다. `pre_nat.ip`는 제품의 다른 태그와 마찬가지로 트래픽을 집계하고 필터링하는 데 사용할 수 있습니다.

{{< img src="network_performance_monitoring/network_page/prenat_ip2.png" alt="pre-NAT IPs" >}}

### 네트워크 ID

NPM 사용자는 중복된 IP 공간을 갖도록 네트워크를 설정할 수 있습니다. 예를 들어, 주소 범위가 중복되고 로드 밸런서 또는 클라우드 게이트웨이를 통해서만 통신하는 여러 VPC(가상 프라이빗 클라우드)에 배포할 수 있습니다.

NPM은 트래픽 대상을 올바르게 분류하기 위해 태그로 표시되는 네트워크 ID 개념을 사용합니다. 네트워크 ID는 서로 통신할 수 있는 IP 주소 집합의 영숫자 식별자입니다. 서로 다른 네트워크 ID를 가진 여러 호스트에 대한 IP 주소 매핑이 감지되면 이 식별자를 사용하여 특정 호스트 네트워크 트래픽이 어디로 가고 어디에서 오는지를 확인합니다.

AWS 및 Google Cloud에서는 네트워크 ID가 자동으로 VPC ID로 설정됩니다. 다른 환경의 경우 아래와 같이 `datadog.yaml`에서 네트워크 ID를 수동으로 설정하거나 프로세스 및 핵심 Agent 컨테이너에 `DD_NETWORK_ID`를 추가하여 설정할 수 있습니다.

  ```yaml
  network:
     Id: <your-network-id>
  ```

### 저장된 페이지

트래픽 데이터의 보기를 구성하고 공유합니다. 저장된 보기를 통해 디버깅 속도를 높이고 협업을 강화할 수 있습니다. 예를 들어, 보기를 만들고, 일반적인 쿼리를 위해 나중에 사용할 수 있도록 저장하고, 해당 링크를 복사하여 팀원들과 네트워크 데이터를 공유할 수 있습니다.

{{< img src="network_performance_monitoring/network_page/npm_saved_views2.png" alt="저장된 보기" >}}

- 보기를 저장하려면: *+ Save* 버튼을 클릭하고 보기의 이름을 지정하여 현재 쿼리, 테이블 설정 및 그래프 메트릭 셀렉션을 기록합니다.
- 보기를 가져오려면: 왼쪽 상단의 *Views*를 클릭하여 저장된 보기를 확인하고 목록에서 보기를 선택합니다.
- 보기 이름을 변경하려면: 저장된 보기 목록에서 보기 위에 커서를 놓고 기어 아이콘을 클릭해 *Edit name*을 실행합니다.
- 보기를 공유하려면: 저장된 보기 목록에서 보기 위에 커서를 놓고 링크 아이콘을 클릭해 *Copy permalink*를 실행합니다.

자세한 내용은 [저장된 보기][5] 설명서를 참조하세요.


## 테이블

네트워크 테이블에는 쿼리가 정의한 각 _source_와  _destination_ 사이의 _볼륨_, _처리량_, _TCP 재전송_, _왕복 시간 (RTT)_, 그리고 _RTT 변동_ 메트릭에 대한 세부 정보가 표시됩니다.

{{< img src="network_performance_monitoring/network_page/network_table2.png" alt="데이터 테이블" >}}

테이블의 오른쪽 상단에 있는 `Customize`버튼을 사용하여 테이블의 열을 설정할 수 있습니다.

`Filter Traffic` 버튼으로 표시된 트래픽을 설정합니다.

{{< img src="network_performance_monitoring/network_page/filter_traffic_toggles_v2.png" alt="플로우 세부 정보" style="width:80%;">}}

기본적으로 외부 트래픽 (공용 IP에 대한) 및 Datadog Agent 트래픽이 표시됩니다. 보기 범위를 좁히려면 `Show Datadog Traffic`와 `Show External Traffic` 토글을 해제하도록 선택할 수 있습니다.

### 확인되지 않은 트래픽

확인되지 않은 클라이언트 및 서버 태그는 `N/A`와 같이 표시됩니다. 트래픽 클라이언트 또는 서버 엔드포인트는 다음과 같은 이유로 확인되지 않을 수 있습니다:

* 호스트, 컨테이너 클라이언트 또는 서버 IP는 트래픽 집계에 사용되는 클라이언트 또는 서버 태그로 태그가 지정되지 않습니다.
* 엔드포인트가 사용자의 개인 네트워크 외부에 있으므로 Datadog Agent에서 태그를 지정하지 않습니다.
* 엔드포인트는 Datadog Agent가 설치될 수 없는 방화벽, 서비스 메시 또는 다른 엔티티입니다.

데이터 테이블의 오른쪽 상단 모서리에 있는 **Show N/A (Unresolved Traffic)** 토글을 사용하여 해결되지 않은 (`N/A`) 클라이언트 또는 서버와의 집계 연결을 필터링합니다.

데이터 테이블에서 임의의 행을 선택하면 대상 **클라이언트** <=> **서버** 집계 연결과 관련된 관련 로그, 트레이스 및 프로세스가 표시됩니다.

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="집계 연결 세부 정보" style="width:80%;">}}

## 사이드패널

사이드패널은 네트워크 종속성을 디버깅하는 데 도움이 되는 상황별 텔레메트리를 제공합니다. 플로우, 로그, 트레이스 및 프로세스 탭을 사용하여 두 엔드포인트 간의 트래픽에서 높은 재전송 횟수 또는 지연 시간이 다음 원인인지 확인합니다:
- 특정 포트 또는 IP의 트래픽 볼륨 급증.
- 대상 엔드포인트의 CPU 또는 메모리를 많이 사용하는 프로세스.
- 클라이언트 엔드포인트의 코드에서 발생하는 애플리케이션 오류.

{{< img src="network_performance_monitoring/network_page/npm_sidepanel2.png" alt="플로우 세부 정보" style="width:80%;">}}

### 일반적인 태그

사이드패널의 상단에는 검사된 종속성의 가장 최근 연결에서 공유하는 일반적인 클라이언트 및 서버 태그가 표시됩니다. 일반 태그를 사용하여 결함이 있는 엔드포인트에 대한 추가 컨텍스트를 확보할 수 있습니다. 예를 들어, 특정 서비스에 대한 잠재적 통신 문제를 해결할 때 일반 대상 태그는 다음과 같은 내용을 표시합니다:
- 트래픽이 흐르는 컨테이너, 작업 또는 호스트와 같은 세부적인 컨텍스트.
- 서비스가 실행되는 가용 영역, 클라우드 공급자 계정 또는 배포와 같은 더 넓은 컨텍스트.

### 보안

**Security** 탭에서는 [Cloud Workload Security][6] 및 [Cloud Security Posture Management][7]에서 감지된 잠재적 네트워크 위협 및 결과를 강조 표시합니다. 이러한 신호는 Datadog이 [감지 또는 규정 준수 규칙][8]과 일치하는 네트워크 활동을 감지하거나 선택한 네트워크 플로우와 관련된 다른 위협 및 잘못된 설정이 있는 경우에 생성됩니다.

<div class="alert alert-warning">네트워크 위협 감지는 비공개 베타 버전입니다. 액세스를 요청하려면 이 <a href="https://forms.gle/zjfbxB7Cqjxj5R5h7">양식</a>을 작성하세요.</div>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/search_syntax/
[2]: /ko/network_monitoring/performance/network_map/
[3]: /ko/network_monitoring/performance/guide/aws_supported_services/
[4]: /ko/network_monitoring/performance/guide/gcp_supported_services/
[5]: /ko/logs/explorer/saved_views/
[6]: /ko/security/cloud_workload_security/
[7]: /ko/security/cspm/
[8]: /ko/security/detection_rules/
[9]: /ko/network_monitoring/performance/setup/#enhanced-resolution