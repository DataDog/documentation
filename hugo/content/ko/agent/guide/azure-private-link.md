---
description: Azure Private Link를 구성하여 공용 인터넷을 사용하지 않고 Datadog에 텔레메트리를 안전하게 전송하세요(엔드포인트
  설정 및 DNS 구성 포함).
title: Azure Private Link를 통해 Datadog에 연결하기
---
[Azure Private Link][1]를 사용하면 공용 인터넷을 사용하지 않고 Datadog에 텔레메트리를 보낼 수 있습니다.

Datadog 데이터 수집의 일부 서비스를 [Azure Private Link 서비스][2]로 노출합니다.

Azure Private Link를 구성하여 각 Datadog 수집 서비스에 비공개 IP 주소를 노출할 수 있습니다. 이 IP 주소는 트래픽을 Datadog 백엔드로 라우팅합니다. 그런 다음 Azure [Private DNS Zone][3]을 구성하여 사용하는 각 엔드포인트의 제품에 해당하는 DNS 이름을 재정의할 수 있습니다.

## 설정 {#setup}

### 엔드포인트 연결 {#connect-an-endpoint}

1. Azure 포털에서 {{< ui >}}Private Link{{< /ui >}}로 이동합니다.
2. 왼쪽 탐색 메뉴에서 {{< ui >}}Private endpoints{{< /ui >}}를 선택합니다.
3. {{< ui >}}Create{{< /ui >}}를 선택합니다.
4. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} 페이지에서 다음을 구성합니다.
   - {{< ui >}}Project details{{< /ui >}}에서 프로덕션 리소스가 Private Link에 액세스할 {{< ui >}}Subscription{{< /ui >}} 및 {{< ui >}}Resource group{{< /ui >}}을 선택하세요.
   - {{< ui >}}Instance details{{< /ui >}}에서 {{< ui >}}Name{{< /ui >}}(예: `datadog-api-private-link`)을 입력하고 {{< ui >}}Region{{< /ui >}}을 선택하세요.

   {{< ui >}}Next: Resource{{< /ui >}}를 선택하여 계속 진행하세요.
5. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Resource{{< /ui >}} 페이지에서 다음을 구성합니다.
   - {{< ui >}}Connection method{{< /ui >}}에 대해 {{< ui >}}Connect to an Azure resource by resource ID or alias{{< /ui >}}를 선택하세요.
   - {{< ui >}}Resource ID or alias{{< /ui >}}에 사용할 Datadog 수집 서비스에 해당하는 Private Link 서비스 이름을 입력하세요. 이 서비스 이름은 [게시된 서비스 표](#published-services)에서 찾을 수 있습니다.
   - 필요시 {{< ui >}}Request message{{< /ui >}}에 Datadog 계정과 연결된 이메일 주소를 입력할 수 있습니다. 이를 통해 Datadog은 요청을 식별하고 필요한 경우 연락할 수 있습니다.

   {{< ui >}}Next: Virtual Network{{< /ui >}}를 선택하여 계속 진행하세요.
6. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Virtual Network{{< /ui >}} 페이지에서 다음을 구성합니다.
   - {{< ui >}}Networking{{< /ui >}}에서 엔드포인트를 배치할 {{< ui >}}Virtual network{{< /ui >}} 및 {{< ui >}}Subnet{{< /ui >}}을 선택하세요. 일반적으로 프라이빗 엔드포인트에 액세스해야 하는 컴퓨팅 리소스와 동일한 네트워크에 배치합니다.
   - {{< ui >}}Private DNS integration{{< /ui >}} 아래에서 {{< ui >}}No{{< /ui >}}를 선택하세요.

   {{< ui >}}Next: Tags{{< /ui >}}를 선택하여 계속 진행하세요.
7. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Tags{{< /ui >}} 페이지에서 필요시 태그를 설정할 수 있습니다. {{< ui >}}Next{{< /ui >}}를 선택합니다.
8. {{< ui >}}Review + create{{< /ui >}} 페이지에서 구성 설정을 검토합니다. 그런 다음 {{< ui >}}Create{{< /ui >}}를 선택합니다.
9. 프라이빗 엔드포인트가 생성되면 목록에서 해당 엔드포인트를 찾습니다. 이 엔드포인트의 {{< ui >}}Private IP{{< /ui >}}를 기록해 둡니다. 다음 섹션에서 사용합니다. Connection Status 필드는 Pending이어야 합니다.
10. 다음으로 Datadog의 수동 승인이 필요합니다. Datadog 지원팀에 문의하여 프라이빗 링크 엔드포인트 승인을 요청하고 엔드포인트 이름을 함께 전달하세요.
11. Datadog 지원팀에서 엔드포인트가 생성되었음을 확인한 후 정상적으로 작동하는지 확인합니다. Azure 포털에서 {{< ui >}}Home{{< /ui >}} > {{< ui >}}Private Endpoints{{< /ui >}}로 이동합니다. 엔드포인트 이름을 클릭하고 Connection Status가 {{< ui >}}Approved{{< /ui >}}로 표시되는지 확인합니다. 
12. {{< ui >}}Monitoring{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}로 이동합니다. `Bytes In` 및 `Bytes Out` 메트릭이 0이 아닌지 확인합니다. 이 메트릭은 Datadog Azure 통합에서 `azure.network_privateendpoints.pe_bytes_[in/out]`으로 수집되어야 합니다.

### 프라이빗 DNS 영역 생성 {#create-a-private-dns-zone}
1. Azure 포털에서 {{< ui >}}Private DNS zones{{< /ui >}}로 이동합니다.
2. {{< ui >}}Create{{< /ui >}}를 선택합니다.
3. {{< ui >}}Create Private DNS zone{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} 페이지에서 다음을 구성합니다.
   - {{< ui >}}Project details{{< /ui >}}에서 프로덕션 리소스가 프라이빗 엔드포인트에 액세스할 {{< ui >}}Subscription{{< /ui >}} 및 {{< ui >}}Resource group{{< /ui >}}을 선택하세요.
   - {{< ui >}}Instance details{{< /ui >}}의 {{< ui >}}Name{{< /ui >}}에 사용할 Datadog 수집 서비스에 해당하는 _프라이빗 DNS 이름_을 입력하세요. 이 서비스 이름은 [게시된 서비스 표](#published-services)에서 찾을 수 있습니다.

   {{< ui >}}Review create{{< /ui >}}를 선택하세요.
4. 구성 설정을 검토합니다. 그런 다음 {{< ui >}}Create{{< /ui >}}를 선택합니다.
5. 프라이빗 DNS 영역이 생성된 후 목록에서 해당 영역을 선택합니다.
6. 패널이 열리면 {{< ui >}}\+ Record set{{< /ui >}}을 선택합니다.
7. {{< ui >}}Add record set{{< /ui >}} 패널에서 다음을 구성합니다.
   - {{< ui >}}Name{{< /ui >}}에 `@`을 입력하세요.
   - {{< ui >}}Type{{< /ui >}}에 대해 {{< ui >}}A - Address record{{< /ui >}}를 선택하세요.
   - {{< ui >}}IP address{{< /ui >}}에 이전 섹션 마지막에 기록한 IP 주소를 입력하세요.

   {{< ui >}}OK{{< /ui >}}를 선택하여 완료하세요.
### 메트릭 및 트레이스에 필요한 추가 단계 {#additional-required-steps-for-metrics-and-traces}
두 Datadog 수집 서비스는 `agent.`{{< region-param key="dd_site" code="true" >}} 도메인의 하위 도메인입니다. 이 때문에 프라이빗 DNS 영역은 다른 수집 서비스와 약간 다릅니다.

위 섹션에 설명된 대로 `agent.`{{< region-param key="dd_site" code="true" >}}에 대한 비공개 DNS 영역을 생성하세요. 그런 다음 아래 세 개의 레코드를 추가하세요.

| DNS 이름 | 리소스 레코드 유형 | IPv4 주소 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | 메트릭 엔드포인트의 IP 주소 |
| `*`      | A                    | 메트릭 엔드포인트의 IP 주소 |
| `trace`  | A                    | 트레이스 엔드포인트의 IP 주소 |

**참고**: 이 영역에는 메트릭 엔드포인트 IP 주소를 가리키는 와일드카드(`*`) 레코드가 필요합니다. Datadog Agent가 텔레메트리를 전송할 때 버전이 포함된 엔드포인트를 사용하기 때문입니다(`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).


## 게시된 서비스 {#published-services}

| Datadog 수집 서비스 | Private Link 서비스 이름 | 비공개 DNS 이름 |
| --- | --- | --- |
| 로그(Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| 로그(Datadog Exporter를 사용하는 OTel Collector) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| 로그(User HTTP Intake) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| 메트릭 | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| 프로세스 | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| 프로파일링 | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| 트레이스 | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone