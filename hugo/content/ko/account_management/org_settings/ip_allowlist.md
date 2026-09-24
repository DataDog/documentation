---
description: 기업 보안을 위해 API 및 UI 액세스를 특정 IP 주소나 CIDR 범위로 제한하여 Datadog에 대한 네트워크 액세스를
  제어하세요.
title: IP Allowlist
---
{{< callout url="/help/" header="IP 허용 목록 시작하기" >}}
IP 허용 목록 기능은 Pro+ 또는 Enterprise 플랜을 사용하는 고객이 이용할 수 있습니다. 액세스를 요청하려면 지원팀에 문의하세요.
{{< /callout >}}

## 개요 {#overview}

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="4개의 IP 범위를 포함하는 IP 허용 목록 UI를 보여주는 스크린샷" >}}

IP 허용 목록은 Datadog의 데이터에 액세스하는 데 사용할 수 있는 네트워크를 제어합니다. 허용된 네트워크를 제한함으로써 데이터 유출 및 내부자 위협으로부터 리소스를 보호할 수 있습니다.

IP 허용 목록이 활성화되면 허용 목록에 있는 IP 주소나 CIDR 범위만 Datadog API 및 UI에 액세스할 수 있습니다. 

IP 허용 목록은 조직 전체 설정입니다. 이 설정은 [차단 및 허용된 리소스](#blocked-and-allowed-resources)에 나열된 모든 트래픽에 동일하게 적용되며 특정 토큰, API 키, 사용자 또는 엔드포인트로 범위를 지정할 수 없습니다.

### 차단 및 허용된 리소스 {#blocked-and-allowed-resources}

사용자의 IP가 IP 허용 목록에 포함되어 있지 않으면 해당 사용자는 다음 항목에 액세스하거나 사용할 수 없습니다.

- Datadog 웹 UI
- 문서화된 엔드포인트와 게시되지 않은 엔드포인트를 모두 포함하는 Datadog의 공용 [API][1]
- Datadog 모바일 앱(iOS, Android)
- OAuth를 통해 Datadog에 액세스하는 타사 통합 및 애플리케이션
- AI 에이전트 및 MCP 클라이언트의 원격 연결을 포함한 [Datadog MCP Server][9]

IP 허용 목록 기능은 다음 항목에 대한 액세스를 차단하지 않습니다.
- Agent가 메트릭, 트레이스, 로그 등의 데이터를 전송하는 데이터 수집 엔드포인트
- Agent가 데이터를 제출하기 전에 사용하는 [API 키 확인][2] 엔드포인트
- [Agent 플레어 제출][3]
- [공개 대시보드][4]

Agent에서 텔레메트리(메트릭, 트레이스, 로그)를 제출하는 애플리케이션 및 통합과 사용자가 제공한 API 키를 사용하는 애플리케이션 및 통합은 IP 허용 목록의 영향을 받지 않습니다. Datadog은 [Audit Trail][5]을 활용하여 타사 애플리케이션 및 통합의 IP 주소를 모니터링할 것을 권장합니다.

IP 허용 목록 기능이 활성화된 상태에서 모바일 앱 클라이언트가 Datadog에 연결할 수 있도록 하려면, 모바일 장치가 VPN을 통해 허용된 네트워크 범위에 연결하는 것이 좋습니다.

### 기능 {#functionality}

{{< ui >}}Org Management{{< /ui >}} 권한이 있는 사용자만 IP 허용 목록을 구성할 수 있습니다.

IP 허용 목록 API 또는 UI를 사용하여 다음을 수행할 수 있습니다.
- IP 허용 목록의 상태를 확인합니다. IP 허용 목록의 활성화 여부에 따라 조직이 IP 주소가 허용 목록에 포함되어 있는지를 기준으로 요청을 제한할지 여부가 결정됩니다.
- IP 허용 목록을 켜거나 끕니다.
- IP 허용 목록에 포함된 IP 주소(CIDR 범위)를 표시합니다.
- IP 주소(IPv4 또는 IPv6) 또는 CIDR 범위를 선택적 메모와 함께 IP 허용 목록에 추가합니다.
- IP 허용 목록에 이미 있는 IP 주소의 메모를 편집합니다.
- IP 허용 목록에서 단일 항목을 삭제합니다.
- 전체 IP 허용 목록을 새 항목으로 교체합니다(API를 통해서만 가능).

### 잠금 방지 {#lockout-prevention}

IP 허용 목록을 활성화하거나 수정할 때, 시스템은 사용자가 데이터에 계속 액세스할 수 있도록 다음과 같은 제약 조건을 적용합니다.
- IP 허용 목록의 항목 중 하나 이상이 현재 IP를 포함함
- 허용 목록에 하나 이상의 항목이 포함됨

## UI에서 IP 허용 목록 관리 {#managing-the-ip-allowlist-in-the-ui}

**참고:** IP 허용 목록 페이지는 Datadog 조직에서 해당 기능을 켠 경우에만 UI에 나타납니다.

[IP 허용 목록 UI][6]를 찾으려면 다음 단계를 따르세요.

1. 계정 메뉴에서 {{< ui >}}Organization Settings{{< /ui >}}로 이동합니다.
1. {{< ui >}}Security{{< /ui >}} 아래에서 {{< ui >}}IP Allowlist{{< /ui >}}를 선택합니다.

IP 허용 목록 표에는 IP 허용 목록에 포함된 CIDR 범위가 나열됩니다.

### IP 허용 목록 활성화 및 비활성화 {#enable-and-disable-the-ip-allowlist}

페이지 상단의 배너에 IP 허용 목록의 활성화 또는 비활성화 상태가 표시됩니다. 또한 사용자의 IP와 해당 IP가 허용 목록에 있는지 여부도 표시됩니다.

IP 허용 목록 상태를 전환하려면 {{< ui >}}Enable{{< /ui >}} 또는 {{< ui >}}Disable{{< /ui >}} 버튼을 클릭합니다.

### IP 주소 또는 CIDR 범위 추가 {#add-ip-addresses-or-cidr-ranges}

{{< img src="account_management/org_settings/add_ip_2.png" alt="'IP를 허용 목록에 추가'라는 제목의 대화 상자를 보여주는 스크린샷" >}}

1. 페이지 오른쪽 상단에 있는 {{< ui >}}Add IP{{< /ui >}} 버튼을 클릭합니다. 
1. 유효한 IP 주소 또는 CIDR 범위를 입력합니다.
1. 필요시, 예를 들어 특정 주소에 대한 액세스를 허용하는 이유를 기억하기 위해 메모를 추가할 수 있습니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

### IP 주소 또는 CIDR 범위 편집 {#edit-ip-addresses-or-cidr-ranges}

1. IP 허용 목록 표에서 편집하려는 행 위로 마우스를 가져갑니다. 
1. 연필({{< ui >}}Edit{{< /ui >}}) 아이콘을 클릭합니다. 
1. 설명용 {{< ui >}}Note{{< /ui >}} 텍스트를 변경합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

### IP 주소 또는 CIDR 범위 삭제 {#delete-ip-addresses-or-cidr-ranges}

1. IP 허용 목록 표에서 삭제하려는 행 위로 마우스를 가져갑니다. 
1. 휴지통({{< ui >}}Delete{{< /ui >}}) 아이콘을 클릭하고 삭제 여부를 확인하세요. 

## 프로그래밍 방식으로 IP 허용 목록 관리 {#managing-the-ip-allowlist-programmatically}

API를 통해 IP 허용 목록을 관리하려면 [IP 허용 목록 API 문서][7]를 참조하세요.

Terraform에서 IP 허용 목록을 관리하려면 [`ip_allowlist` 리소스][8]를 참조하세요.


[1]: /ko/api/latest/
[2]: /ko/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/ko/agent/troubleshooting/send_a_flare/
[4]: /ko/dashboards/sharing/
[5]: /ko/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /ko/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist
[9]: /ko/mcp_server/