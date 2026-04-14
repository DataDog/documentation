---
title: Azure 비공개 링크를 통해 Datadog에 연결
---

{{% site-region region="us,us5,eu,gov,ap1" %}}
<div class="alert alert-danger">선택한 Datadog 사이트에서는 이 기능이 지원되지 않습니다.</div>
{{% /site-region %}}

{{% site-region region="us3" %}}
[Azure 비공개 링크][1]를 사용하면 공용 인터넷을 사용하지 않고 Datadog에 원격 분석을 보낼 수 있습니다.

Datadog 데이터 수집의 일부(서비스)를 [Azure 비공개 링크 서비스][2]로 노출합니다.

각 Datadog 수집 서비스에 대한 비공개 IP 주소를 노출하는 Azure Private Link를 설정할 수 있습니다. 그런 다음 Azure [비공개 DNS 영역][3]을 설정하여 소비되는 각 엔드포인트의 제품에 해당하는 DNS 이름을 재정의할 수 있습니다. 

## 설정

### 엔드포인트 연결

1. Azure 포털에서 **비공개 링크**로 이동합니다.
2. 왼쪽 탐색 메뉴에서 **비공개 엔드포인트**를 선택합니다.
3. **생성**을 선택합니다.
4. **비공개 엔드포인트 생성** > **기본** 페이지에서 다음을 설정하세요.
   - **프로젝트 세부 정보**에서 프로덕션 리소스가 비공개 링크에 액세스해야 하는 **구독** 및 **리소스 그룹**을 선택합니다.
   - **인스턴스 세부 정보**에서 **이름**(예: `datadog-api-private-link`)을 입력하고 **지역**을 선택합니다.

   **다음: 리소스**를 선택하여 계속합니다.
5. **비공개 엔드포인트 생성** > **리소스** 페이지에서 다음을 설정합니다.
   - **연결 방법**에서 **리소스 ID 또는 별칭으로 Azure 리소스에 연결**을 선택합니다.
   - **리소스 ID 또는 별칭**에 사용하려는 Datadog 수집 서비스에 해당하는 비공개 링크 서비스 이름을 입력합니다. 이 서비스 이름은 [게시된 표 서비스](#published-services)에서 찾을 수 있습니다.
   - 선택 사항으로 **요청 메시지**에 (Datadog 계정과 연결된) 이메일 주소를 입력할 수 있습니다. 이렇게 하면 Datadog 에서 요청을 식별하고 필요한 경우 연락을 드릴 수 있습니다.

   **다음: 가상 네트워크**를 선택하여 계속합니다.
6. **비공개 엔드포인트 만들기** > **가상 네트워크** 페이지에서 다음을 설정합니다.
   - **네트워킹**에서 엔드포인트가 위치할 **가상 네트워크** 및 **서브넷**을 선택합니다. 일반적으로 이 위치는 비공개 엔드포인트에 액세스해야 하는 컴퓨팅 리소스와 동일한 네트워크에 위치합니다.
   - **개인 DNS 통합**에서 **아니요**를 선택합니다.

   **다음 태그**를 선택해 계속합니다.
7. **비공개 엔드포인트 생성** > **태그** 페이지에서 선택적으로 태그를 설정할 수 있습니다. **다음**을 선택합니다.
8. **검토 + 생성** 페이지에서 설정 구성을 검토합니다. 그런 다음 **생성**을 선택합니다.
9. 비공개 엔드포인트가 생성되면 목록에서 찾아보세요. 다음 섹션에서 사용되므로 이 엔드포인트의 **개인 IP**를 기록해 두세요.

### 비공개 DNS 영역 생성
1. Azure 포털에서 **비공개 DNS 영역**으로 이동합니다.
2. **생성**을 선택합니다.
3. **비공개 DNS 영역 생성** > **기본** 페이지에서 다음을 설정합니다.
   - **프로젝트 세부정보**에서 프로덕션 리소스가 비공개 엔드포인트에 액세스할 수 있는 **구독** 및 **리소스 그룹**을 선택합니다.
   - **인스턴스 세부정보**의 **이름**에 사용하려는 Datadog 수집 서비스에 해당하는 _개인 DNS 이름_을 입력합니다. 이 서비스 이름은 [게시된 표 서비스](#published-services)에서 찾을 수 있습니다.

   **생성 검토**를 선택합니다.
4. 설정 구성을 검토합니다. 그런 다음 **생성**을 선택합니다.
5. 비공개 DNS 영역이 생성된 후 목록에서 해당 영역을 선택합니다.
6. 패널이 열리면 **+ 레코드 세트**를 선택합니다.
7. **레코드 세트 추가** 패널에서 다음을 설정합니다.
   - **이름**에 `*` 을 입력합니다.
   - **유형**에서 **A - 주소 레코드**를 선택합니다.
   - **IP 주소**에 이전 섹션 마지막에 기록한 IP 주소를 입력합니다.

   **확인**을 선택하여 마칩니다.

## 게시됨 서비스

| Datadog 수집 서비스 | 비공개 링크 서비스 이름 | 비공개 DNS 이름 |
| --- | --- | --- |
| 로그(에이전트) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| 로그(사용자 HTTP 수집) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| 메트릭 | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `metrics.agent.us3.datadoghq.com` |
| 컨테이너  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| 프로세스 | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| 프로파일링 | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| 트레이스 | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `trace.agent.us3.datadoghq.com` |
| 원격 설정 | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| 데이터베이스 모니터링 | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone
{{% /site-region %}}