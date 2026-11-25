---
aliases:
- /ko/network_monitoring/devices/netflow/
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: 아키텍처 센터
  text: 하이브리드 멀티클라우드 네트워크 관측 가능성 참조 아키텍처
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: Network Device Monitoring을 통해 프로필 사용
- link: /network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
  tag: 설명서
  text: NetFlow용 동적 테스트 설정
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: 블로그
  text: Datadog으로 NetFlow 트래픽 데이터 모니터링
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
- link: https://www.datadoghq.com/blog/understanding-netflow-duplication/
  tag: 블로그
  text: 'NetFlow 중복 이해: 중복이 발생하는 이유와 중복 제거 방법'
title: NetFlow Monitoring
---
## 개요 {#overview}

Network Device Monitoring의 NetFlow 뷰는 흐름 데이터를 내보내는 장치(예: 라우터, 방화벽 또는 스위치)에서 수집된 네트워크 트래픽 흐름에 대한 가시성을 제공합니다. 트래픽 양을 분석하고, 주요 통신자를 식별하며, 데이터가 네트워크를 통해 어떻게 이동하는지 이해할 수 있습니다.

NetFlow 뷰는 장치 및 인터페이스별로 집계된 트래픽 메트릭을 표시합니다. 이를 사용하여 가장 많은 대역폭을 소비하거나, 가장 많은 패킷을 생성하거나, 트래픽 급증에 기여하는 장치 또는 인터페이스를 식별할 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="트래픽 양, 장치 상태, 흐름 등을 위한 접을 수 있는 범례가 포함된 NetFlow Monitoring 페이지입니다." style="width:100%;" >}}

## 사이드 탐색 메뉴 {#side-navigation}

왼쪽 탐색을 사용하여 추가 NetFlow 뷰를 탐색하세요.

- {{< ui >}}Traffic Volume{{< /ui >}}: 장치 및 인터페이스별 전체 흐름 메트릭입니다.
- {{< ui >}}Device Health{{< /ui >}}: 모니터링된 장치의 상태 및 사용률입니다.
- {{< ui >}}Flows{{< /ui >}}: 개별 흐름 레코드의 세부 정보입니다.
- {{< ui >}}Conversations{{< /ui >}}: 집계된 소스–목적지 쌍입니다.
- {{< ui >}}Autonomous Systems{{< /ui >}}: 자율 시스템 번호(ASN)별로 그룹화된 흐름 데이터입니다.
- {{< ui >}}Geo IP{{< /ui >}}: 지리적 출처/목적지별로 그룹화된 흐름 데이터입니다.
- {{< ui >}}Source Ports / Destination Ports / Protocols / Flags{{< /ui >}}: 패킷 메타데이터별 트래픽 내역입니다.

## 설치 {#installation}

Network Device Monitoring과 NetFlow Monitoring을 사용하려면 [Agent][1] 버전 7.45 이상을 사용하고 있는지 확인하세요.

**참고:** [Network Device Monitoring을 통한 메트릭 수집][2]을 구성하는 것은 NetFlow 데이터 전송을 위한 필수 요건은 아니지만 강력히 권장됩니다. 이 추가 데이터는 장치 이름, 모델, 벤더, 인바운드 및 아웃바운드 인터페이스 이름 등의 정보를 사용하여 흐름 레코드를 보강하는 데 활용될 수 있습니다.

## 구성 {#configuration}

NetFlow, jFlow, sFlow 또는 IPFIX 트래픽을 Agent NetFlow 서버로 전송하도록 장치를 구성하려면, 해당 장치가 Datadog Agent가 설치된 IP 주소로 트래픽을 전송하도록 설정되어 있어야 하며, 특히 `flow_type`과 `port`를 사용하세요.

1. NetFlow를 활성화하려면 [`datadog.yaml`][3] Agent 설정 파일을 편집합니다.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. 변경 사항을 저장한 후 [Agent를 재시작][4]합니다.

   **참고**: [방화벽 규칙][9]이 구성된 포트에서 수신 UDP 트래픽을 허용하는지 확인하세요.

## 집계 {#aggregation}

Datadog Agent는 NetFlow로 수신된 데이터를 자동으로 집계하여 대부분의 정보를 유지하면서 플랫폼으로 전송되는 레코드 수를 제한합니다. 기본적으로 `source`, `destination address`, `port`, `protocol`와 같은 동일한 식별자를 가진 흐름 레코딩은 5분 간격으로 집계됩니다. 또한, Datadog Agent는 임시 포트를 감지하고 이를 제거할 수 있습니다. 결과적으로 `port:*`와 함께 흐름이 표시될 수 있습니다.

## 보강 {#enrichment}

귀하의 NetFlow 데이터는 Datadog 백엔드에 의해 처리되며, 귀하의 장치와 인터페이스에서 사용할 수 있는 메타데이터로 보강됩니다. 보강은 NetFlow 익스포터 IP와 인터페이스 인덱스를 기반으로 합니다. 재사용된 프라이빗 IP 간의 충돌 가능성을 해소하기 위해, 각 Agent 구성 파일에 대해 다른 `namespace`을 구성할 수 있습니다(설정 `network_devices.namespace` 사용).

NetFlow 익스포터 IP가 장치 IP 중 하나이지만 SNMP 통합에 구성된 IP가 아닌 경우 Datadog은 익스포터 IP가 속한 장치를 찾고 일치 항목이 고유한 경우에 한해 이 정보로 NetFlow 데이터를 보강합니다.

### IP 보강 {#ip-enrichment}

Datadog은 다음과 같은 유형의 IP 보강을 지원합니다.

#### 커스텀 IP 보강 {#custom-ip-enrichment}

또한, 특정 IP 주소에서 실행 중인 서비스를 분류하기 위해, IP와 CIDR을 커스텀 태그에 매핑하는 커스텀 보강을 추가할 수 있습니다. 커스텀 IP 보강을 통해 네트워크 엔지니어와 그 팀은 사람이 읽기 쉬운 이름으로 NetFlow 데이터를 해석하고 쿼리할 수 있습니다.

[{{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}NetFlow{{< /ui >}} > {{< ui >}}IP Enrichment{{< /ui >}}][10]로 이동한 다음 {{< ui >}}\+ Add Enrichment{{< /ui >}}을 클릭하여 매핑 CSV 파일을 업로드합니다.

단일 매핑을 수동으로 추가하려면 {{< ui >}}\+ Add Enrichment{{< /ui >}} 옆의 아래쪽 화살표를 클릭하고 {{< ui >}}Single Entry{{< /ui >}}를 선택합니다.

IP 주소로 오가는 흐름의 애플리케이션 이름을 설정하려면 매핑에 `application_name` 태그를 추가합니다(예: `application_name:client_device`). 커스텀 IP 매핑은 다른 모든 애플리케이션 이름 소스보다 우선합니다. 전체 순서는 [애플리케이션 이름 할당](#application-name-assignment) 섹션을 참조하세요.

#### 역방향 DNS 프라이빗 IP 보강 {#reverse-dns-private-ip-enrichment}

역방향 DNS 프라이빗 IP 보강은 NetFlow 레코드에 호스트 이름을 추가합니다. 이를 활성화하면 Agent가 프라이빗 주소 범위 내의 소스 및 목적지 IP 주소에 대해 역방향 DNS 조회를 수행하고 해당 호스트 이름을 흐름 레코드에 추가합니다.

역방향 DNS 보강은 기본적으로 비활성화되어 있습니다. 활성화하려면 [`datadog.yaml`][3] 파일의 `network_devices.netflow` 아래에 `reverse_dns_enrichment_enabled: true`를 설정한 다음 [Agent를 다시 시작][4]하세요. 전체 구성 예시는 [구성](#configuration) 섹션을 참조하세요.

호스트 이름별로 흐름을 필터링하려면 다음 단계를 따르세요.

1. [NetFlow 페이지][5]로 이동합니다.
2. {{< ui >}}\+ Filter{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Source Reverse DNS Hostname{{< /ui >}} 또는 {{< ui >}}Destination Reverse DNS Hostname{{< /ui >}}를 선택합니다.

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="역 DNS 목적지 및 소스 패싯을 표시하도록 향상된 필터 메뉴" width="100%" >}}

**참고**: 역 DNS 항목은 캐시되며 DNS 쿼리를 최소화하고 DNS 서버의 부하를 줄이기 위해 속도 제한의 적용을 받습니다. 기본 캐싱 및 속도 제한 수정 등 더 많은 구성 옵션은 [예시 Agent 구성 파일][7]의 `reverse_dns_enrichment` 섹션을 참조하세요.

#### 클라우드 공급자 IP 보강 {#cloud-provider-ip-enrichment}

Datadog은 IPv4 주소용 퍼블릭 클라우드 공급자 서비스 및 리전으로 IP를 강화하므로 특정 서비스 및 리전의 흐름 레코드를 필터링할 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="클라우드 공급자 이름, 리전 및 서비스를 표시하는 NetFlow 필터 메뉴" width="100%" >}}

### 포트 보강 {#port-enrichment}

Datadog은 다음과 같은 유형의 포트 보강을 지원합니다.

#### 기본 포트 보강 {#default-port-enrichment}

Datadog은 IANA(인터넷 할당 번호 관리 기관) 데이터를 사용하여 NetFlow의 포트를 보강하고, 잘 알려진 포트 매핑(예: Postgres의 5432 및 HTTPS의 443)을 확인합니다.

#### 커스텀 포트 보강 {#custom-port-enrichment}

포트와 프로토콜을 특정 애플리케이션에 매핑하기 위해 커스텀 보강을 추가할 수 있습니다(예: 특정 포트에서 실행되는 커스텀 서비스의 경우). 커스텀 포트 보강을 통해 네트워크 엔지니어와 팀은 사람이 읽기 쉬운 이름을 사용하여 NetFlow 데이터를 해석하고 쿼리할 수 있습니다.

[{{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}NetFlow{{< /ui >}} > {{< ui >}}Port Enrichment{{< /ui >}}][13]으로 이동한 다음 {{< ui >}}\+ Add Enrichment{{< /ui >}}를 클릭하여 커스텀 보강이 포함된 CSV 파일을 업로드합니다.

### 심층 패킷 검사 {#deep-packet-inspection}

**참고**: 심층 패킷 검사를 사용하려면 Agent 버전 7.86.0 이상이 필요합니다.

심층 패킷 검사(DPI)를 사용하면 Datadog이 포트 번호에서 애플리케이션을 추론하는 대신, 네트워크 장치가 트래픽을 검사하여 각 흐름에 대한 애플리케이션을 식별합니다. Datadog은 패킷 페이로드를 검사하지 않습니다. Agent는 NetFlow v9 또는 IPFIX 레코드에서 장치가 분류한(Cisco NBAR2 또는 Palo Alto Networks App-ID 사용) 애플리케이션을 읽습니다.

DPI를 사용하면 IP 주소나 포트를 애플리케이션에 수동으로 매핑할 필요가 없습니다. DPI를 사용하려면 Datadog Agent와 네트워크 장치를 모두 구성해야 합니다.

#### Agent 구성 {#configure-the-agent}

[`datadog.yaml`][3] 파일에서 DPI 지원 장치로부터 흐름을 수신하는 각 리스너에 `enable_dpi: true`을 설정합니다. DPI는 `netflow9` 및 `ipfix` 리스너에서만 지원됩니다. DPI는 `netflow5` 또는 `sflow5` 리스너에서 지원되지 않습니다.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9
        port: 2055
        enable_dpi: true
      - flow_type: ipfix
        port: 4739
        enable_dpi: true
```

변경 사항을 저장한 후 [Agent를 재시작][4]합니다.

#### Cisco NBAR2 구성 {#configure-cisco-nbar2}

Cisco NBAR2(Next Generation Network-Based Application Recognition)는 NetFlow v9 및 IPFIX에서 지원됩니다. Cisco 장치에서 NBAR2 애플리케이션 데이터를 내보내려면 다음 단계를 따르세요.

1. 분류하려는 각 인터페이스에서 NBAR2 프로토콜 검색을 활성화합니다.

   ```text
   configure terminal
   interface <INTERFACE>
    ip nbar protocol-discovery
   exit
   ```

2. 흐름 레코드에 `match application name` 필드를 추가합니다. 그러면 장치가 각 흐름과 함께 애플리케이션 ID를 내보냅니다.

   ```text
   configure terminal
   flow record <RECORD_NAME>
    match application name
   exit
   ```

3. 흐름 익스포터에 애플리케이션 표 옵션을 추가합니다. 장치는 각 애플리케이션 ID를 애플리케이션 이름 및 설명에 매핑하는 표를 주기적으로 보냅니다.

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-table timeout 60
   exit
   ```

   제한 시간 값은 초 단위입니다.

4. (선택 사항) 흐름에 애플리케이션 세부 정보를 더 추가하려면 흐름 익스포터에 애플리케이션 속성 옵션을 추가합니다:

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-attributes
   exit
   ```

   그러면 Datadog이 애플리케이션 카테고리, 하위 카테고리, 그룹, 트래픽 클래스, 비즈니스 관련성, 애플리케이션 세트, 애플리케이션 제품군, 그리고 해당 애플리케이션이 P2P, 터널링 또는 암호화를 사용하는지 여부를 사용하여 흐름을 보강합니다.

**참고**:

- 애플리케이션 ID는 장치의 NBAR 프로토콜 팩 및 엔진 버전에 따라 다르므로 익스포터마다 고유합니다. Agent는 각 익스포터에 대해 별도의 애플리케이션 표를 유지합니다.
- Agent는 익스포터가 마지막으로 전송한 시점부터 1시간 동안 각 애플리케이션 표 항목을 유지합니다. 익스포터의 모든 흐름에서 애플리케이션 이름을 유지하려면 `option application-table` 제한 시간을 3,600초 미만으로 설정하세요.

#### Palo Alto Networks App-ID 구성 {#configure-palo-alto-networks-app-id}

Palo Alto Networks App-ID는 NetFlow v9에서 지원됩니다. Palo Alto Networks 방화벽은 각 흐름 레코드에 애플리케이션 이름을 전송하므로 애플리케이션 표가 필요하지 않습니다.

App-ID 데이터를 내보내려면 방화벽의 NetFlow 서버 프로필에서 {{< ui >}}PAN-OS Field Types{{< /ui >}} 옵션을 활성화하세요. 자세한 내용은 Palo Alto Networks [NetFlow Monitoring 설명서][12]를 참조하세요.

### 애플리케이션 이름 할당 {#application-name-assignment}

Datadog은 흐름의 각 엔드포인트(소스 및 목적지, 또는 개시자 및 응답자)에 애플리케이션 이름을 할당합니다. 각 이름은 이 목록에서 일치하는 항목이 있는 첫 번째 소스에서 가져옵니다.

1. [커스텀 IP 보강](#custom-ip-enrichment) 매핑
2. [커스텀 포트 보강](#custom-port-enrichment) 매핑
3. [심층 패킷 검사(DPI)](#deep-packet-inspection), 응답자 전용(연결을 수신하는 엔드포인트, 일반적으로 서버)
4. [역방향 DNS](#reverse-dns-private-ip-enrichment) 호스트 이름
5. GeoIP 자율 시스템(AS) 도메인
6. [기본 포트 보강](#default-port-enrichment)(IANA 포트 매핑)
7. `unknown`, 다른 소스가 일치하지 않는 경우

DPI는 응답자에게만 적용됩니다. 개시자의 경우 Datadog이 목록에서 다음으로 일치하는 소스를 사용합니다. 개시자와 응답자에 대한 자세한 내용은 [대화 스티칭](#conversation-stitching) 섹션을 참조하세요.

Datadog은 동일한 순서를 사용하여 전체 흐름에 `application_name` 하나를 할당합니다. 각 단계에서 Datadog은 개시자보다 응답자를 먼저 확인합니다.

## IP 세부 정보 {#ip-details}

**대화** 보기에서 목적지 IP의 공용 IP 주소를 볼 수 있습니다. IP 위에 마우스를 올리면 IP에 대한 풍부한 메타데이터와 {{< ui >}}View Related Network Connections{{< /ui >}}로 이동하는 링크가 표시되며, 여기에서 연결 상태를 더 자세히 확인할 수 있습니다.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="IP 주소 위에 마우스를 올리면 IP 세부 정보와 관련 네트워크 연결 보기를 표시합니다." width="100%" >}}

## 애플리케이션 {#applications}

[NetFlow 페이지][5]의 {{< ui >}}Applications{{< /ui >}} 섹션은 네트워크에서 가장 많은 트래픽을 생성하는 애플리케이션을 보여줍니다. 이를 사용하여 대역폭 사용량을 늘리거나 성능 문제 또는 혼잡을 일으키는 애플리케이션을 식별하세요.

{{< img src="network_device_monitoring/netflow/netflow_top_applications.png" alt="Top Applications 원형 차트와 비트 전송률, 패킷 전송률, 총 바이트 수가 표시된 애플리케이션 표를 보여주는 NetFlow 페이지의 Applications 섹션" width="100%" >}}

애플리케이션별로 NetFlow 데이터를 필터링하려면 {{< ui >}}Bidirectional{{< /ui >}} 뷰에서 {{< ui >}}Initiator Application{{< /ui >}} 및 {{< ui >}}Responder Application{{< /ui >}} 필터를 사용하거나 {{< ui >}}Unidirectional{{< /ui >}} 뷰에서 {{< ui >}}Source Application{{< /ui >}} 및 {{< ui >}}Destination Application{{< /ui >}} 필터를 사용하세요.

단일 장치를 통과하는 트래픽에 대한 상위 애플리케이션을 보려면 장치 페이지를 열고 {{< ui >}}Traffic{{< /ui >}} 탭을 선택하세요.

Datadog은 여러 보강 소스를 통해 애플리케이션 이름을 할당한 다음, 애플리케이션 이름별로 흐름을 그룹화하여 {{< ui >}}Applications{{< /ui >}} 섹션을 구성합니다. 소스 목록과 Datadog이 이를 확인하는 순서는 [애플리케이션 이름 할당](#application-name-assignment) 섹션을 참조하세요.

`unknown`으로 레이블이 지정된 흐름 수를 줄이려면 지원되는 Cisco 및 Palo Alto Networks 장치에서 [심층 패킷 검사](#deep-packet-inspection)를 설정하거나 [커스텀 IP](#custom-ip-enrichment) 및 [커스텀 포트](#custom-port-enrichment) 보강을 추가하세요.

## 흐름 다이어그램 {#flow-diagram}

{{< ui >}}Flows{{< /ui >}} 메뉴를 클릭하고 목록에서 흐름 위에 마우스를 올리면 관련 네트워크 연결의 Source IP, Ingress Interface Name, Device name, Destination IP에 대한 추가 정보를 조회하여 NetFlow Monitoring의 흐름을 시각화할 수 있습니다.

{{< img src="network_device_monitoring/netflow/flows.png" alt="NetFlow를 전송하는 장치에서 집계된 흐름 위에 마우스를 올려 관련 네트워크 연결에 접근하세요." width="100%" >}}

## NetFlow용 Network Path {#network-path-for-netflow}

NetFlow용 동적 테스트는 NetFlow 트래픽을 수집하는 Agent에서 NetFlow 레코드에 확인된 목적지 IP까지 Network Path 테스트를 자동으로 실행할 수 있습니다. NetFlow용 동적 테스트를 사용하여 NetFlow 목적지에 홉별 경로 및 지연 시간 컨텍스트를 추가하세요.

NetFlow용 동적 테스트는 실험적 기능이며 Agent `v7.81+`가 필요합니다. NetFlow용 동적 테스트를 설정하려면 [Network Path 설정][11]을 참조하세요.

## NetFlow 모니터 {#netflow-monitor}

어느 보기에서든 {{< ui >}}Create Monitor{{< /ui >}} 아이콘을 클릭하여 [NetFlow 모니터][6]를 생성합니다. 모니터를 생성할 때 장치 관점에서 소스 IP 또는 목적지 IP와 관련된 다음 필드를 고려하세요. 이 필드는 네트워크 트래픽 패턴에 대한 통찰력을 제공하고 성능 및 보안을 최적화하는 데 도움이 됩니다.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="모니터 생성 링크가 강조 표시된 NetFlow Monitoring의 흐름 뷰." width="100%" >}}

### 인터페이스 정보 {#interface-information}

다음 필드는 수신 및 송신 인터페이스에 대한 세부 정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 송신 인터페이스 별칭 | 송신 인터페이스의 별칭입니다. |
| 송신 인터페이스 인덱스 | 송신 인터페이스의 인덱스입니다. |
| 송신 인터페이스 이름 | 송신 인터페이스의 이름입니다. |
| 수신 인터페이스 별칭 | 수신 인터페이스의 별칭입니다. |
| 수신 인터페이스 인덱스 | 수신 인터페이스의 인덱스입니다. |
| 수신 인터페이스 이름 | 수신 인터페이스의 이름입니다. |

### 장치 정보 {#device-information}

다음 필드는 NetFlow 레코드를 생성하는 장치와 관련된 세부 정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 장치 IP | 보강을 위해 NDM의 장치에 매핑되는 IP 주소입니다. |
| 익스포터 IP | NetFlow 패킷이 시작되는 IP 주소입니다. |
| 장치 모델 | 장치의 모델입니다. |
| 장치 이름 | 장치의 이름입니다. |
| 장치 네임스페이스 | 장치의 네임스페이스입니다. |
| 장치 공급업체 | 장치의 공급업체입니다. |

### 흐름 세부 정보 {#flow-details}

다음 필드는 네트워크 플로우의 특성을 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 방향 | 흐름이 인바운드인지 아웃바운드인지를 나타냅니다. |
| 시작 시간 | 소스 IP 주소와 목적지 IP 주소 사이의 첫 번째 네트워크 패킷의 타임스탬프입니다. |
| 종료 시간 | 소스 IP 주소와 목적지 IP 주소 사이의 마지막 네트워크 패킷의 타임스탬프입니다. |
| Ether Type | Ethernet 프레임 캡슐화 유형(IPv4 또는 IPv6)입니다. |
| 흐름 유형 | NetFlow 데이터 형식의 유형(IPFIX, sFlow5, NetFlow5, NetFlow9, Unknown). |
| IP 프로토콜 | 통신에 사용되는 프로토콜(예: ICMP, TCP, UDP). |
| 다음 홉 IP | 네트워크 경로에 있는 다음 홉의 IP 주소. |
| TCP Flag | 흐름 전체 기간 동안 관찰된 모든 TCP 플래그의 집합입니다. |
| 바이트 | 전송된 총 바이트 수. |
| 패킷 | 전송된 총 패킷 수. |

필드 외에도 기본 패싯을 사용하여 NetFlow 목적지 및 소스 IP 주소를 기반으로 트래픽 패턴 분석을 시작할 수도 있습니다.

### NetFlow 목적지 IP 패싯 {#netflow-destination-ip-facets}

| 패싯 이름 | 패싯 설명 |
|---|---|
| Destination AS Domain | 목적지 IP가 속한 Autonomous System(AS)과 연결된 도메인입니다. |
| Destination AS Name | 목적지 IP가 속한 Autonomous System(AS)의 이름입니다. |
| Destination AS Number | 목적지 IP가 속한 Autonomous System(AS)에 할당된 번호입니다. |
| Destination AS Route | 목적지 IP가 속한 Autonomous System(AS)과 관련된 경로 정보입니다. |
| Destination AS Type | 목적지 IP가 속한 Autonomous System(AS) 유형(예: transit, customer, peer)입니다. |
| Destination Application Name | 목적지 IP와 연결된 애플리케이션의 이름입니다. |
| Destination City Name | 목적지 IP와 연결된 도시의 이름입니다. |
| Destination Cloud Provider Name | 목적지 IP와 연결된 클라우드 제공업체의 이름입니다. |
| Destination Cloud Provider Region | 목적지 IP와 연결된 클라우드 제공업체의 리전입니다. |
| Destination Cloud Provider Service | 목적지 IP와 연결된 클라우드 제공업체가 제공하는 서비스입니다. |
| Destination Continent Code | 목적지 IP와 연결된 대륙을 나타내는 코드입니다. |
| Destination Continent Name | 목적지 IP와 연결된 대륙의 이름입니다. |
| Destination Country ISO Code | 목적지 IP와 연결된 국가를 나타내는 ISO 코드입니다. |
| Destination Country Name | 목적지 IP와 연결된 국가의 이름입니다. |
| Destination IP | 목적지 IP 주소입니다. |
| Destination Latitude | 목적지 IP와 연결된 위도 좌표입니다. |
| Destination Longitude | 목적지 IP와 연결된 경도 좌표입니다. |
| Destination MAC | 목적지 IP와 연결된 Media Access Control(MAC) 주소입니다. |
| Destination Mask | 목적지 IP와 연결된 서브넷 마스크입니다. |
| Destination Port | 목적지 포트 번호입니다. |
| Destination Reverse DNS Hostname | 목적지 IP와 연결된 Reverse DNS 호스트 이름입니다. |
| Destination Subdivision ISO Code | 목적지 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드입니다. |
| Destination Subdivision Name | 목적지 IP와 연결된 하위 구역(예: 시/도)의 이름입니다. |
| Destination Timezone | 목적지 IP와 연결된 시간대입니다. |

### NetFlow 소스 IP 패싯 {#netflow-source-ip-facets}

| 패싯 이름 | 패싯 설명 |
|---|---|
| Source AS Domain | 소스 IP가 속한 Autonomous System(AS)과 연결된 도메인입니다. |
| Source AS Name | 소스 IP가 속한 Autonomous System(AS)의 이름입니다. |
| Source AS Number | 소스 IP가 속한 Autonomous System(AS)에 할당된 번호입니다. |
| Source AS Route | 소스 IP가 속한 Autonomous System(AS)과 관련된 경로 정보입니다. |
| Source AS Type | 소스 IP가 속한 Autonomous System(AS) 유형(예: transit, customer, peer)입니다. |
| Source Application Name | 소스 IP와 연결된 애플리케이션의 이름입니다. |
| Source City Name | 소스 IP와 연결된 도시의 이름입니다. |
| Source Cloud Provider Name | 소스 IP와 연결된 클라우드 제공업체의 이름입니다. |
| Source Cloud Provider Region | 소스 IP와 연결된 클라우드 제공업체의 리전입니다. |
| Source Cloud Provider Service | 소스 IP와 연결된 클라우드 제공업체가 제공하는 서비스입니다. |
| Source Continent Code | 소스 IP와 연결된 대륙을 나타내는 코드입니다. |
| Source Continent Name | 소스 IP와 연결된 대륙의 이름입니다. |
| Source Country ISO Code | 소스 IP와 연결된 국가를 나타내는 ISO 코드입니다. |
| Source Country Name | 소스 IP와 연결된 국가의 이름입니다. |
| Source IP | 소스 IP 주소입니다. |
| Source Latitude | 소스 IP와 연결된 위도 좌표입니다. |
| Source Longitude | 소스 IP와 연결된 경도 좌표입니다. |
| Source MAC | 소스 IP와 연결된 Media Access Control(MAC) 주소입니다. |
| Source Mask | 소스 IP와 연결된 서브넷 마스크입니다. |
| Source Port | 소스 포트 번호입니다. |
| Source Reverse DNS Hostname | 소스 IP와 연결된 리버스 DNS 호스트 이름입니다. |
| Source Subdivision ISO Code | 소스 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드입니다. |
| Source Subdivision Name | 소스 IP와 연결된 하위 구역(예: 시/도)의 이름입니다. |
| Source Timezone | 소스 IP와 연결된 시간대입니다. |

## 대화 스티칭 {#conversation-stitching}

기본적으로 NetFlow는 두 엔드포인트(A → B 및 B → A) 간의 각 트래픽 방향에 대해 분리된 단일 방향 흐름을 기록합니다. 대화 스티칭은 이를 단일 양방향 레코드로 결합하여 두 엔드포인트(A ↔ B) 간에 교환된 총 트래픽에 대한 완전한 보기를 제공합니다.

대화 스티칭을 사용하면 다음을 수행할 수 있습니다.

- 두 엔드포인트 간에 교환된 총 트래픽을 별도의 방향 흐름이 아닌 하나의 대화로 보기
- 소스 및 목적지 위젯이 정확한 역할을 반영하도록 실제 개시자와 응답자를 식별합니다.
- 서버가 주요 소스로 잘못 표시되는 노이즈를 제거합니다.

스티칭된(양방향) 보기와 스티칭되지 않은(단방향) 보기 사이를 전환하려면 엔드포인트 기반 NetFlow 보기로 이동하여 시간 선택기 아래의 {{< ui >}}Bidirectional{{< /ui >}} 토글을 사용하세요.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="NetFlow 보기에서 대화 스티칭 전환 버튼" width="100%" >}}

## 샘플링 비율 {#sampling-rate}

NetFlow의 샘플링 비율은 기본적으로 바이트 및 패킷 계산에 반영됩니다. 표시된 바이트 및 패킷 값은 샘플링 비율이 적용되어 계산됩니다.
또한, 대시보드 및 노트북에서 **바이트(조정)(@adjusted_bytes)** 및 **패킷(조정)(@adjusted_packets)**을 쿼리하여 시각화할 수 있습니다.

장치에서 보낸 원시 바이트/패킷(샘플링)을 시각화하려면 대시보드 및 노트북에서 **바이트(샘플링)(@bytes)** 및 **패킷(샘플링)(@packets)**을 쿼리하여 시각화할 수 있습니다.

## 보존 {#retention}

NetFlow 데이터는 기본적으로 30일 동안 보존되며 15일, 30일, 60일, 90일 보존 옵션이 있습니다.

<div class="alert alert-warning">NetFlow 데이터를 장기간 보관하려면 계정 담당자에게 문의하세요.</div>

## 플러시 간격당 흐름 볼륨 제한 {#limit-flow-volume-per-flush-interval}

NetFlow 볼륨 및 관련 비용을 제어하려면, Agent를 구성하여 플러시 간격당 제출되는 흐름 레코드 수를 제한하세요. 플러시 간격은 흐름이 Datadog으로 전달되기 전에 집계되는 기간입니다.

이 제한이 활성화되면, Agent는 구성된 최대값까지 **바이트 수 기준으로 상위 흐름**만 유지하고, 해당 플러시 간격 동안 낮은 볼륨의 흐름은 삭제합니다.

### 구성 {#configuration-1}

**참고**: Agent 버전 `7.75.1` 이상이 필요합니다.

다음 내용을 `datadog.yaml`에서 구성하세요.

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

이 구성으로 Agent는 플러시 간격(기본값 5분)당 최대 10,000개의 NetFlow 레코드를 제출합니다. Agent는 데이터 양이 가장 많은 흐름을 우선적으로 처리하고, 나머지는 드롭합니다.

### 일일 볼륨 추정 {#estimating-daily-volume}

대략적인 일일 최대 흐름 수는 다음과 같습니다.

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

예를 들어, 플러시당 `10,000`개의 흐름과 5분 플러시 간격을 사용할 경우:

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### 예상 동작 {#expected-behavior}

- **상위 통신자 우선 처리:** 이는 대량 트래픽에 집중하는 워크플로에 가장 적합합니다(예: 대역폭 사용량을 높이는 요인 및 트래픽이 과도한 링크).
- **저용량 흐름에 대한 가시성 축소:** 트래픽이 적은 소스/목적지 쌍은 한도에 도달하면 나타나지 않을 수 있습니다.
- **Agent별 동작:** 한도는 각 Agent에 독립적으로 적용됩니다. 여러 Agent가 동일한 대화에 대한 트래픽을 감지하는 경우, 잘림 전에 전역적으로 집계되지 않습니다.

### 잘림 모니터링 {#monitoring-truncation}

흐름 제한이 활성화되면 Agent는 유지되는 데이터와 드롭되는 데이터의 양을 이해하는 데 사용할 수 있는 메트릭을 제공합니다.

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

이 메트릭을 사용하여 선택한 한도를 검증하고, 잘림이 자주 발생하는 경우(한도나 플러시 간격을 조정해야 할 수 있음을 나타냄)를 감지하세요.

## 문제 해결 {#troubleshooting}

### NetFlow 패킷 드롭 {#netflow-packet-drops}
NetFlow 패킷 드롭은 초당 NetFlow 패킷 수가 많을 때(일반적으로 50,000개 초과) 발생할 수 있습니다. 다음 단계는 NetFlow 패킷 드롭을 식별하고 완화하는 데 도움이 될 수 있습니다.

#### 패킷 드롭 식별 {#identifying-packet-drops}

드롭된 UDP 패킷이 있는지 확인하려면 `netstat -s` 명령을 사용하세요.

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. UDP 대기열 길이 늘리기(Linux 전용)

  시스템의 UDP 대기열 길이를 조정하면 NetFlow 패킷의 더 높은 볼륨을 수용하는 데 도움이 될 수 있습니다. 다음 명령을 실행하여 UDP 수신 버퍼 크기를 25MB로 늘리세요.

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. 구성 유지(Linux 전용)

  이러한 변경 사항을 영구적으로 적용하려면 `/etc/sysctl.conf` 파일에 다음 줄을 추가하세요.

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/network_monitoring/devices/snmp_metrics/
[3]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /ko/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: /ko/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip
[11]: /ko/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
[12]: https://docs.paloaltonetworks.com/ngfw/administration/monitoring/netflow-monitoring/netflow-templates
[13]: https://app.datadoghq.com/devices/settings/enrichment/port