---
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Azure 통합
- link: https://www.datadoghq.com/blog/azure-datadog-partnership
  tag: 블로그
  text: Datadog Azure 포털에서 기본 제공되는 Datadog Microsoft 파트너십
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: 블로그
  text: Datadog으로 단 몇 분만에 엔터프라이즈 규모 Azure 환경을 모니터링하기
title: Azure Native 통합 관리
---

<div class="alert alert-warning">
  본 지침은 Datadog 리소스를 사용하여 Azure Native 통합을 관리하는 방법을 설명합니다.
</div>

본 지침에서는 Datadog 리소스를 사용하여 Azure 포털에서 Azure와 Datadog 간의 통합을 관리하는 방법을 알아봅니다. Azure의 Datadog 리소스는 Datadog 조직과 Azure 환경 사이의 연결을 나타냅니다. Datadog 리소스를 설정하여 모니터링하려는 구독 수만큼 연결할 수 있습니다. 본 지침을 따르기 전 Azure에서 [Datadog 리소스를 생성][1] 하세요.

Datadog 리소스를 사용해 다음과 같은 연관 Azure 구독을 관리할 수 있습니다.
- Datadog 리소스의 범위를 확인 또는 수정하여 모니터링하려는 구독 포함하기
- Azure 메트릭 및 플랫폼 로그 수집 설정하기
- 메트릭 및 로그 전송 Azure 리소스 인증하기
- API 키 확인 및 Datadog 리소스 에이전트 배포용 키 기본값 설정
- Datadog VM 에이전트를 Azure VM에 배포하고 실행 에이전트의 세부 정보 확인
- Datadog.NET 확장 프로그램을 Azure 웹 앱에 배포하고 설치한 확장 프로그램의 세부 정보 확인
- 싱글 사인온 재설정
- Datadog 조직의 청구 플랜 변경(Azure 마켓플레이스만 해당)
- Azure 통합 활성화 또는 비활성화
- Datadog 리소스 삭제

본 페이지에서는 Azure Portal 사용 경험을 설명합니다. CLI를 사용하는 것을 선호한다면 [Datadog용 Azure CLI][2]를 참조하세요.

## 개요

왼쪽 사이드바에서 **개요**를 선택하면 Datadog 리소스에 대한 정보를 확인할 수 있습니다.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="왼쪽 탐색 바에 강조 표시된 Azure Portal 개요" responsive="true" style="width:100%;">}}

### 필수 항목

개요 페이지에는 리소스 그룹 이름, 위치(지역), 구독, 태그, Datadog 조직 링크, 상태, 요금제, 청구 기간 등의 Datadog 리소스 관련 필수 정보가 표시됩니다.

**참고**:  SSO가 활성화된 경우, Datadog 조직 링크는 SAML 링크입니다. Datadog 조직이 Azure 마켓플레이스에서 생성되었다면 본 링크를 처음 사용할 때 비밀번호를 설정하세요.

### 링크

개요 페이지에는 Datadog 대시보드, 로그, 호스트 맵을 볼 수 있는 링크가 있습니다.

### 리소스 요약

개요 페이지에서는 로그 및 메트릭을 Datadog으로 전송하는 리소스에 관한 요약 테이블을 확인할 수 있습니다. 본 테이블에는 다음 열이 포함됩니다.

| 열             | 설명                                                               |
|--------------------|---------------------------------------------------------------------------|
| 리소스 유형      | Azure 리소스 유형                                                   |
| 총 리소스    | 리소스 유형에 대한 모든 리소스 카운트                          |
| Datadog 전송 로그    | 통합 기능으로 Datadog에 로그를 전송하는 리소스 카운트입니다.    |
| Datadog 전송 메트릭 | 통합 기능으로 Datadog에 메트릭을 전송하는 리소스 카운트입니다. |

### 비활성화

Azure에서 Datadog으로 로그 및 메트릭 전송을 중단하려면 개요 페이지에서 **비활성화**를 선택한 다음 **확인**을 클릭합니다.

{{< img src="integrations/guide/azure_portal/disable.png" alt="Azure 포털의 Datadog 리소스 페이지입니다. 왼쪽 탐색 바에서 개요를 선택 후 비활성화 탭과 OK 버튼이 강조 표시된 상태입니다." responsive="true" style="width:100%;">}}

**참고**: Datadog 리소스를 비활성화하면 관련 구독의 메트릭 및 플랫폼 로그의 Datadog 전송이 중단됩니다. 에이전트 또는 확장 프로그램을 통해 Datadog에 직접 데이터를 전송하는 구독의 모든 리소스는 영향을 받지 않습니다.

### 활성화

Azure에서 Datadog에 로그 및 메트릭을 전송하려면 개요 페이지에서 **활성화**를 선택한 후 **확인**을 클릭합니다. 로그 및 메트릭의 기존 설정이 검색 및 사용 설정됩니다.

{{< img src="integrations/guide/azure_portal/enable.png" alt="Azure 포털의 Datadog 리소스 페이지입니다. 왼쪽 탐색 바에서 개요를 선택 후 활성화 탭과 OK 버튼이 강조 표시된 상태입니다." responsive="true" style="width:100%;">}}

### 삭제

Datadog 리소스를 삭제하려면 개요 페이지에서 **삭제**를 선택합니다. `yes`를 입력하여 삭제를 확인한 후 **삭제**를 클릭합니다.

{{< img src="integrations/guide/azure_portal/delete.png" alt="Azure 포털의 Datadog 리소스 페이지입니다. 왼쪽 탐색 바에서 개요를 선택 후 삭제 탭과 삭제 확인란이 강조 표시된 상태입니다." responsive="true" style="width:100%;">}}

Azure Marketplace를 통해 청구되는 Datadog 조직의 경우 다음과 같습니다.
- 삭제된 Datadog 리소스가 관련 Datadog 조직에 매핑된 유일한 Datadog 리소스인 경우, 더이상 Datadog에 로그 및 메트릭이 전송되지 않으며 Azure를 통한 Datadog의 요금 청구가 모두 중지됩니다. Datadog 지원 팀에서 다음 단계를 확인하기 위해 고객님의 계정을 통해 연락을 드립니다.
- 관련 Datadog 조직에 매핑된 Datadog 리소스가 추가로 존재하는 경우, Datadog 리소스를 삭제하면 연관된 Azure 구독의 로그 및 메트릭 전송만 중단됩니다.

Azure Marketplace를 통해 Datadog 조직에 요금을 청구하지 ** 않는** 경우 Datadog 리소스를 삭제하면 해당 Azure 구독의 통합만 삭제됩니다.

### 플랜 변경

개요 페이지에서 **플랜 변경**을 선택하여 Datadog 청구 플랜을 변경합니다.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="Azure 포털의 Datadog 리소스 페이지입니다. 왼쪽 탐색 바에서 개요를 선택 후 플랜 변경 탭이 강조 표시된 상태입니다." responsive="true" style="width:100%;">}}

포털은 비공개 혜택을 포함하여 테넌트에 대해 이용 가능한 모든 Datadog 요금제를 불러옵니다. 적합한 요금제를 선택하고 **플랜 변경**을 클릭합니다.

## Datadog 조직 설정

### 모니터링 중인 구독

왼쪽 사이드바에서 **모니터링 중인 구독**을 선택하여 Datadog 리소스의 범위를 확인 또는 수정합니다. 현재 모니터링 중인 구독의 목록이 표시됩니다. 해당 보기로 Datadog 리소스의 범위를 설정하여 원하는 수만큼 구독을 모니터링합니다. Datadog 리소스의 구독은 해당 범위에 반드시 포함되어야 합니다.

{{< img src="integrations/guide/azure_portal/azure-portal-multiple-subscriptions.png" alt="Datadog 조직 구성 섹션의, 모니터링 중인 구독이 선택되고 구독 두 개가 표시된 상태의 Azure 포털 Datadog 리소스" responsive="true" style="width:100%;">}}

   - 모니터링하려는 구독을 추가하려면 `+ Add Subscriptions`을 클릭합니다. 이용 가능한 구독 목록에는 `Owner` 역할이 할당된 구독만 포함됩니다. 모니터링하려는 구독을 선택하고 `Add`을 클릭합니다.
   - Datadog으로 모니터링 중인 구독을 삭제하려면, 삭제하고 싶은 구독을 선택하고 `Remove Subscriptions`을 클릭합니다. `Owner` 역할이 할당된 구독을 삭제할 수 있습니다.

**참고**: 범위 내 모든 구독에 동일한 설정(예: 호스트 필터 및 로그 수집 규칙)이 적용됩니다. 여러 구독에 다양한 설정을 적용하려면 다른 Datadog 리소스를 생성하세요.

### 메트릭 및 로그

왼쪽 사이드바에서 **메트릭 및 로그**를 선택하여 메트릭 및 로그의 설정 규칙을 변경합니다. 모든 규칙은 리소스가 추가되거나 태그가 변경될 시 전체 구독에 동적 적용됩니다.

메트릭 또는 로그 구성 설정의 변경 사항은 몇 분 이내에 적용됩니다.

#### 메트릭 수집
Datadog은 기본값으로 연결된 구독 내 모든 Azure 리소스의 메트릭을 자동 수집합니다.

옵션으로 리소스에 태깅된 Azure 태그를 사용하여 Azure VM 및 앱 서비스 플랜의 메트릭 수집을 제한합니다.

##### 메트릭 전송 태그 규칙

 * `include` 태그가 있는 가상 머신, 가상 머신 스케일 세트 및 앱 서비스 플랜은 Datadog으로 메트릭을 전송합니다.
 * `exclude` 태그가 있는 가상 머신, 가상 머신 스케일 세트 및 앱 서비스 플랜은 Datadog으로 메트릭을 전송하지 않습니다.
 * 포함 규칙과 제외 규칙이 충돌하는 경우 제외 규칙이 우선 적용됩니다.
 * 다른 리소스 유형에는 메트릭 수집을 제한하는 옵션이 없습니다.

#### 로그 수집

Datadog 리소스를 활용하여 Azure에서 Datadog으로 전송할 수 있는 로그에는 세 가지 유형이 있습니다.

1. [활동 로그](#activity-logs)
2. [리소스 로그](#resource-logs)
3. [Azure Active Directory 로그](#azure-active-directory-logs)

##### 활동 로그

구독 수준 로그로 [컨트롤 플레인][3]에서 리소스 작업에 대한 통찰을 제공해 드립니다. 서비스 상태 이벤트 업데이트도 포함되어 있습니다. 활동 로그로 쓰기 작업(`PUT`, `POST`, `DELETE`)의 대상, 사용자, 시기를 결정합니다.

구독 수준 로그를 Datadog으로 전송하려면 **구독 활동 로그 전송하기**를 선택합니다. 본 옵션을 선택하지 않으면 구독 수준 로그는 Datadog으로 전송되지 않습니다.

##### 리소스 로그

Azure 리소스 로그로 [데이터 플레인][3]에서 Azure 리소스의 실행 작업에 대한 통찰을 제공해 드립니다. 예를 들어, 키 볼트로부터 기밀 정보를 불러오거나 데이터베이스에 요청하는 것은 데이터 플레인 작업입니다. 리소스 로그의 내용은 Azure 서비스 및 리소스 유형에 따라 달라집니다.

Azure 리소스 로그를 Datadog으로 전송하려면 **정의한 모든 리소스에 대한 Azure 리소스 로그 전송하기**를 선택합니다. Azure 리소스 로그의 유형은 [Azure 모니터링 리소스 로그 카테고리][4]에 명시되어 있습니다. 본 옵션을 선택하면 연결된 구독에서 생성한 모든 신규 리소스를 포함하여 모든 리소스 로그를 Datadog으로 전송합니다.

옵션으로 Azure 리소스 태그를 사용하여 Datadog으로 로그를 전송하는 Azure 리소스 세트를 필터링할 수 있습니다.

###### 로그 전송 태그 규칙

* `include` 태그로 Datadog에 로그를 전송하는 Azure 리소스입니다.
* `exclude` 태그로 Datadog에 로그를 전송하지 않는 Azure 리소스입니다.
* 포함 규칙과 제외 규칙이 충돌하는 경우 제외 규칙이 우선 적용됩니다.

예를 들어, 아래 스크린샷은 Datadog으로 메트릭을 전송하는 가상 머신, 가상 머신 스케일 세트, `Datadog = True` 태그된 앱 서비스 플랜만을 보여줍니다. `Datadog = True` 태그된 리소스(모든 유형)는 Datadog으로 로그를 전송합니다.

{{< img src="integrations/guide/azure_portal/metrics-and-logs-tag-rules.png" alt="가상 머신, 가상 머신 스케일 세트, 앱 서비스 플랜의 메트릭 태그 규칙이 'Datadog=true'로 설정된 스크린샷입니다. 본 로그 섹션은 'Datadog=true' 태그 규칙으로 설정되어 있습니다." responsive="true" style="width:100%;">}}

##### Azure Active Directory 로그

Azure Active Directory(Azure AD)로그에는 로그인 활동 기록 및 특정 테넌트에 관한 Azure AD 변경 사항에 대한 감사 추적 기록이 포함되어 있습니다. Azure AD를 전송하려면:

1. Azure에서 Azure Active Directory로 이동한 후 왼쪽 탐색 바에서 **진단 설정**을 선택합니다.
2. **진단 설정 추가**를 클릭합니다.
3. Datadog으로 전송하려는 로그 카테고리를 선택합니다. Datadog은 모든 카테고리를 전송할 것을 권장합니다.
4. **대상 정보**에서 **파트너 솔루션으로 전송하기**를 선택합니다.
5. 구독을 선택합니다. **대상** 드롭다운 메뉴에서 Datadog 리소스를 선택합니다.

테넌트의 모든 Azure AD 로그는 선택한 Datadog 리소스에 연결된 Datadog 조직으로 전송됩니다. 동일한 Datadog 조직에 구독과 연결된 Datadog 리소스가 두 개 이상 존재하는 경우 어떤 Datadog 리소스를 선택하든 무관합니다. 각 Azure 테넌트에 대해 한 번만 설정하면 됩니다.

### 모니터링 중인 리소스

왼쪽 사이드바에서 **모니터링 중인 리소스**를 선택하면 Datadog으로 전송되는 로그, 메트릭, 리소스의 목록을 확인할 수 있습니다. 검색 기능으로 리소스 이름, 유형, 그룹, 목록, 위치, Datadog 전송 로그 또는 Datadog 전송 메트릭을 필터링할 수 있습니다.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="Datadog 조직 설정 하단에 모니터링 실행 중인 리소스가 강조 표시되어 있는 Azure 포털의 Datadog 리소스 페이지" responsive="true" style="width:100%;">}}

리소스가 Datadog으로 로그를 전송하는 경우 **Datadog 전송 로그** 열에 `Sending`가 표시됩니다. 그렇지 않은 경우, 해당 필드에는 로그가 전송되지 않는 이유가 표시됩니다. 가능한 이유는 다음과 같습니다.

| 이유                                    | 설명                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| 리소스가 로그 전송을 지원하지 않음     | 모니터링하는 로그 카테고리가 있는 리소스 유형만 Datadog으로 로그를 전송하도록 설정되었습니다.                           |
| 진단 설정 5개 한도 도달 | 각 Azure 리소스의 진단 설정 한도는 최대 5개입니다. 자세한 내용을 확인하려면 [진단 설정][5]을 참조하세요. |
| 오류                                     | 리소스가 로그를 Datadog으로 전송하도록 설정되어 있지만 오류가 발생하여 차단되었습니다.                                         |
| 로그 미설정                       | 적합한 리소스 태그가 있는 Azure 리소스만 Datadog에 로그를 전송하도록 설정되어 있습니다.                             |
| 지원되지 않는 지역                      | Azure 리소스가 Datadog에 로그 전송을 지원하지 않는 지역에 있습니다.                                         |
| Datadog 에이전트 미설정              | Datadog 에이전트가 설치되지 않은 가상 머신은 Datadog으로 로그를 전송하지 않습니다.                                        |

### Datadog 에이전트 확장 프로그램

{{< tabs >}}
{{% tab "VM Extension" %}}

구독의 가상 머신 목록을 보려면 왼쪽 사이드바에서 **가상 머신 에이전트**를 선택합니다. 본 페이지에서 가상 머신에 Datadog 에이전트를 확장 프로그램으로 설치할 수 있습니다.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="가상 머신 에이전트 선택 후 확장 프로그램 설치 옵션이 강조 표시된 Azure의 Datadog 리소스" responsive="true" style="width:90%;">}}

각 VM에 대해 다음 정보가 표시됩니다.

| 열               | 설명                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 리소스 이름        | VM 이름                                                                                                                                                  |
| 리소스 상태      | VM이 중지 또는 실행 중인지를 알 수 있습니다. Datadog 에이전트는 실행 중인 VM에만 설치할 수 있습니다. VM이 중지된 경우 Datadog 에이전트 설치가 비활성화됩니다. |
| 에이전트 버전        | Datadog 에이전트 버전 넘버                                                                                                                               |
| 에이전트 상태         | Datadog 에이전트가 VM에서 실행 중인지 여부를 알 수 있습니다.                                                                                                                |
| 활성화된 통합 | Datadog 에이전트에서 활성화된 통합이 수집하는 키 메트릭입니다.                                                                                  |
| 설치 방법       | Datadog 에이전트 설치에 사용되는 특정 툴(예: Chef, Azure VM 확장 프로그램)입니다.                                                                    |
| 로그 전송         | Datadog 에이전트가 로그를 Datadog으로 전송하는지 여부를 알 수 있습니다.                                                                                                          |

#### 설치

VM 확장 프로그램을 사용하여 Azure에 직접 Datadog 에이전트를 설치할 수 있습니다. Datadog 에이전트을 설치하려면 다음 단계를 따르세요.

1. 적절한 VM을 선택합니다.
2. **확장 프로그램 설치**를 클릭합니다. 
3. 포털은 에이전트 설치 확인 메시지를 기본 키로 표시합니다. **확인**을 선택하여 설치를 시작합니다. 에이전트가 설치 및 프로비저닝될 때까지 Azure는 상태를 `Installing`로 표시합니다. Datadog 에이전트 설치가 완료되면 상태가 `Installed`로 변경됩니다.

##### 삭제

Datadog 에이전트가 Azure VM 확장 프로그램과 함께 설치된 경우:

1. 적절한 VM을 선택합니다.
2. **에이전트 삭제**를 클릭합니다.

에이전트를 다른 방법으로 설치한 경우, Datadog 리소스를 사용하여 해당 에이전트를 배포하거나 삭제할 수 없지만 해당 에이전트에 대한 정보는 본 페이지에 계속 반영됩니다.

{{% /tab %}}
{{% tab "AKS Cluster Extension" %}}

Datadog AKS 클러스터 확장 프로그램으로 복잡한 타사 관리 툴을 사용하지 않고도 Azure AKS 내에서 Datadog 에이전트를 기본 배포할 수 있습니다.

#### 설치

AKS 클러스터 확장 프로그램을 사용하여 Datadog 에이전트를 설치하려면 다음 단계를 따릅니다.

1. 왼쪽 사이드바의 **모니터링 실행 중 리소스** 섹션에서 AKS 클러스터를 클릭합니다.
2. AKS 클러스터의 왼쪽 사이드바에서 **설정**의 **확장 프로그램 + 애플리케이션**을 선택합니다.
3. 검색을 클릭하고 `Datadog AKS Cluster Extension`을 선택합니다.
4. **생성**을 클릭하고 [Datadog 자격 증명][1] 및 [Datadog 사이트][2]를 사용하는 타일의 지침을 따릅니다.

#### 삭제

1. 왼쪽 사이드바의 **모니터링 실행 중 리소스** 섹션에서 AKS 클러스터를 클릭합니다.
2. AKS 클러스터의 왼쪽 사이드바에서 **설정**의 **확장 프로그램 + 애플리케이션**을 선택합니다.
3. Datadog AKS 클러스터 확장(**유형**: `Datadog.AKSExtension`)을 선택합니다.
4. **삭제**를 클릭합니다.

[1]: /ko/account_management/api-app-keys/
[2]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

### 앱 서비스 확장

왼쪽 사이드바에서 **앱 서비스 확장**을 선택하면 구독에 앱 서비스 목록이 표시됩니다. 해당 페이지에서 Azure 앱 서비스 에 Datadog 확장 프로그램을 설치해 애플리케이션 성능 모니터링(APM) 트레이싱 및 커스텀 메트릭을 사용 설정할 수 있습니다.

각 앱 서비스에 대해 다음 정보가 표시됩니다.

| 열            | 설명                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 리소스 이름     | 앱 이름                                                                                                                                                                 |
| 리소스 상태   | 앱 서비스가 중지 또는 실행 중인지를 알 수 있습니다. 설치를 시작하려면 앱 서비스가 반드시 실행 중이어야 합니다. 앱 서비스가 중지된 경우 Datadog 에이전트 설치가 비활성화됩니다. |
| 앱 서비스 플랜  | 앱 서비스용으로 설정된 특정 요금제                                                                                                                             |
| 확장 버전 | Datadog 확장 버전 넘버                                                                                                                                         |

#### 설치

[Datadog 확장 프로그램][6]을 설치하려면 해당 앱을 선택한 다음 **확장 프로그램 설치**를 클릭합니다. 포털에 확장 프로그램 설치 확인 메시지가 표시됩니다. **확인**을 선택하여 설치를 시작합니다. 앱이 재시작되고 다음 설정이 추가됩니다.

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`
- `DD_LOGS_INJECTION:true`

Azure는 에이전트가 설치 및 프로비저닝될 때까지 상태를 `Installing`로 표시합니다. Datadog 에이전트가 설치 완료되면 상태가 `Installed`로 변경됩니다.

**참고**: [지원 런타임][7]이 있는 앱에 확장 프로그램을 추가하는지 확인하세요. Datadog 리소스는 앱의 목록을 제한하거나 필터링하지 않습니다.

#### 삭제

Datadog 확장을 삭제하려면 해당 앱을 선택한 다음 **확장 프로그램 삭제**를 클릭합니다.

## 설정
### 싱글 사인온

왼쪽 사이드바에서 **싱글 사인온**을 선택하여 싱글 사인온을 재설정합니다.

Azure Active Directory로 싱글 사인온을 활성화하려면 **싱글 사인온 활성화**를 선택합니다. 포털이 Azure Active Directory에서 적절한 Datadog 애플리케이션을 검색합니다. 앱 이름은 통합 설정 시 선택한 엔터프라이즈 앱 이름입니다. 다음과 같이 Datadog 애플리케이션 이름을 선택합니다.

{{< img src="integrations/guide/azure_portal/sso.png" alt="Azure Active Directory로 싱글 사인온을 활성화한 Azure 포털" responsive="true" style="width:100%;">}}

### API 키

왼쪽 사이드바에서 **키**를 선택하면 Datadog 리소스에 대한 API 키 목록을 확인할 수 있습니다.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="한 개의 API 키가 표시된 Azure 포탈의 키 보기" responsive="true" style="width:100%;">}}

Azure 포털은 API 키의 읽기 전용 보기를 제공합니다. 키를 관리하려면 "Datadog 포털" 링크를 선택합니다. Datadog에서 변경한 다음 Azure 포털 보기를 새로 고침합니다.

Azure Datadog 통합을 사용하면 VM 또는 앱 서비스에 Datadog 에이전트를 설치할 수 있습니다. 기본 키를 선택하지 않은 경우 Datadog 에이전트 설치는 실패합니다.

### 클라우드 보안 관리 설정 오류

왼쪽 사이드바에서 `Cloud Security Posture Management`을 선택하여 [클라우드 보안 관리 설정 오류(CSM 설정 오류)][8]를 설정합니다.

'CSM 설정 오류'는 기본값으로 활성화되어 있지 않습니다. CSM 설정 오류를 활성화하려면 `Enable Datadog Cloud Security Posture Management`을 선택하고 **저장**을 클릭합니다. Datadog 리소스와 연결된 모든 구독에 Datadog CSM 설정 오류가 활성화됩니다.

비활성화하려면 확인란을 선택 취소하고 **저장**을 클릭합니다.

{{< img src="integrations/guide/azure_portal/enable-CSPM.png" alt="설정 탭에서 클라우드 보안 상태 관리가 선택된 Azure 포털 페이지" responsive="true" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/integrations/azure/?tab=link&site=us3#create-datadog-resource
[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings
[6]: /ko/serverless/azure_app_services
[7]: /ko/serverless/azure_app_services/#requirements
[8]: /ko/security/cloud_security_management/misconfigurations/