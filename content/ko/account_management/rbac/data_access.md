---
description: 액세스 제어를 위해 Restricted Dataset 정의
further_reading:
- link: /data_security/
  tag: 설명서
  text: 데이터 관련 리스크 줄이기
is_public: true
title: Data Access Control
---
{{< callout url="#" header="false" btn_hidden="true">}}
  Data Access Control가 제한됨
{{< /callout >}}

## 개요

Datadog 데이터에는 민감한 데이터가 포함될 수 있으므로 신중하게 처리해야 합니다. 민감한 데이터를 Datadog으로 수집하는 경우 Data Access Control를 통해 Datadog 조직 내의 관리자와 액세스 관리자가 이 데이터의 액세스를 규제할 수 있습니다. Data Access Control를 사용하여 쿼리로 민감한 데이터를 식별하고 특정 [팀][1] 또는 [역할][2]로만 액세스를 제한할 수 있습니다.

_Restricted Dataset_를 정의하면 해당 데이터 세트의 경계 내에 있는 모든 데이터가 제한됩니다. Restricted Dataset 외부의 데이터는 제한되지 않고 적절한 권한이 있는 사용자가 액세스할 수 있습니다. Data Access Control는 액세스 관리자가 데이터 세트 내에 포함된 민감한 데이터에 대해 허용된 사용자에게만 액세스 권한을 부여할 수 있는 직관적인 인터페이스를 제공합니다.

## 사전 필수 조건

### 액세스 제어 구성

Data Access Control는 조직의 기존 Datadog 액세스 제어 설정을 기반으로 합니다. Data Access Control를 설정하기 전에 먼저 [액세스 제어][3]를 구성하세요.

### 수신 데이터에 태그 지정

경계를 정의하는 데 사용하는 데이터의 태그와 속성을 이용해 데이터 액세스를 제어합니다. 아직 태그를 정의하지 않은 경우 Data Access Control를 설정하기 전에 [태그 시작하기][4]를 참고하세요.

## 데이터 액세스 구성

Data Access Control를 사용하면 지정된 팀 또는 역할의 사용자만 액세스할 수 있는 데이터를 지정하여 Restricted Dataset를 만들 수 있습니다.

Restricted Dataset를 모두 보려면 [조직 설정][6]으로 이동하여 왼쪽의 **Access** 제목 아래에서 [Data Access Controls][7]를 선택합니다.

### Datadog 사이트

Datadog 관리자 역할이 할당된 사용자 또는 조직 내에서 [`user_access_manage` 권한][5]을 지닌 역할의 사용자로 로그인합니다.

1. Organization Settings][6]로 이동합니다.
1. 페이지 왼쪽에서 [Data Access Controls][7]를 선택합니다.
1. **New Restricted Dataset**를 클릭합니다.

Restricted Dataset을 만들려면 쿼리를 통해 제한할 데이터를 식별합니다.

{{< img src="/account_management/rbac/restricted_dataset-2.png" alt="Create a Restricted Dataset dialog. Selects data in RUM, APM, Logs, and Metrics matching the tag service:hr. Grants access to a Privileged access team.">}}

Name Dataset
: A descriptive name to help users understand what data is contained in the dataset.

이 데이터 세트에 포함할 데이터 선택
: 특정 사용자 집합으로 제한할 데이터를 설명하는 경계를 정의합니다. 경계는 액세스 관리자가 보호할 민감한 데이터의 범위를 정의할 제한에 관한 쿼리문입니다. [지원되는 텔레메트리 유형][10]은 커스텀 메트릭, RUM 세션, APM 트레이스, 로그, 클라우드 비용, Error Tracking 이슈 및 CI Visibility 파이프라인입니다.

액세스 권한 부여
: Restricted Dataset에 연결된 콘텐츠에 액세스할 수 있는 팀 또는 역할을 하나 이상 선택합니다. 이 그룹의 구성원이 아닌 사용자는 이 데이터에 액세스할 수 없습니다.

Restricted Dataset당 최대 10개의 키:값 쌍을 만들 수 있습니다. 추가 쌍이 필요한 경우 Restricted Dataset를 추가로 정의할 수 있습니다.

모든 필드를 완료하여 데이터 세트을 정의한 후 **Restricted Dataset 생성**을 클릭하여 조직에 적용합니다.

Restricted Dataset은 최대 100개까지 만들 수 있습니다. 더 높은 한도가 필요한 경우 지원팀에 문의하세요.

### API
The Data Access Control API is under development and should be considered unstable. Future versions may be backward incompatible.

Terraform 지원은 Data Access Control가 일반적으로 제공된 후에 발표될 예정입니다.

### 지원되는 텔레메트리 유형{#supported-telemetry}

- APM 트레이스
- CI Visibility 파이프라인
- 클라우드 비용
- 커스텀 메트릭
    - **참고: **표준 메트릭은 지원되지 않습니다.
- Error Tracking 이슈
- 로그
- RUM 세션
- LLM Observability

## 사용량 제약

Data Access Control를 켜면 Datadog에서 민감한 데이터에 대한 액세스를 제어하는 다른 기능을 비활성화하거나 제한합니다. 제한되는 기능은 아래에서 영향을 받는 기능 목록을 참조하세요.

### Real User Monitoring(RUM)

#### Session Replay: 보존 기간 연장
기본적으로 Session Replay 데이터는 30일 동안 보존됩니다. 보존 기간을 15개월로 연장하려면 개별 세션 재생에서 연장 보존을 활성화하면 됩니다. Data Access Control 체험판으로 등록하면 Datadog에서 연장 보존 옵션이 비활성화됩니다. 연장된 데이터를 보관하는 데이터 저장소가 액세스 제한을 지원하지 않으므로 Data Access Control에서는 연장 보존이 작동하지 않습니다.

#### Session Replay: 재생 목록

재생 목록은 폴더와 같은 구조로 집계할 수 있는 세션 다시보기 모음입니다. 재생 목록을 사용하면 사용자가 의도치 않게 액세스 제어를 우회하도록 허용할 수 있습니다. 고객이 Data Access Control 체험판에 등록하면 Datadog Session Replay 재생 목록이 비활성화됩니다.

### 로그
Data Access Control는 기존의 [로그 RBAC 권한][11] 기능(로그 제한 쿼리라고도 함)과는 별개입니다. 로그 관리에서 Data Access Control를 사용하려면 먼저 Data Access Control에 대한 액세스 권한을 요청하세요. 그런 다음 로그 관리 권한에서 Data Access Control로 구성을 수동으로 마이그레이션합니다.


## 액세스할 태그 선택

각 Restricted Dataset는 메트릭과 같은 여러 유형의 데이터 액세스를 제어할 수 있습니다. 여러 유형의 텔레메트리에서 동일하거나 다른 태그를 자유롭게 사용할 수 있습니다. 각 텔레메트리 유형 내에서 _단일_ 태그 또는 속성을 사용하여 액세스 전략을 정의해야 합니다.

이러한 제약 조건에 태그 또는 속성 조합이 너무 많은 경우, [태그 재검토][4]를 통해 액세스 전략을 반영하는 새 태그를 정의하는 것이 좋습니다.

### 지원되는 예

#### Restricted Dataset 1
- Telemetry Type: RUM
   - 필터: `@application.id:ABCD`

#### Restricted Dataset 2
* 텔레메트리 유형: RUM
    * 필터: `@application.id:EFGH`
* 텔레메트리 유형: 메트릭
    * 필터: `env:prod`

### 지원되지 않는 예

#### Restricted Dataset 1:
* 텔레메트리 유형: RUM
    * 필터: `@application.id:ABCD`

#### Restricted Dataset 2:
* 텔레메트리 유형: RUM
    * 필터: `env:prod`

Restricted Dataset 1은 `@application.id`을 RUM 데이터의 태그로 사용하므로 새 Restricted Dataset을 다른 태그로 변경할 수 없습니다. 대신 Restricted Dataset 2가 `@application.id`를 사용하도록 재설정하거나 다른 태그를 사용하도록 모든 Restricted Dataset을 RUM 데이터로 변경하는 것을 고려하시기 바랍니다.

### 지원되지 않는 예

#### Restricted Dataset 1:
* 텔레메트리 유형: RUM
    * 필터: `@application.id:ABCD`

#### Restricted Dataset 2:
* 텔레메트리 유형: RUM
    * 필터: `@application.id:IJKL` `env:prod`

이 예제에서는 Restricted Dataset 1에서와 같이 RUM에 `@application.id` 태그를 올바르게 사용합니다. 그러나 태그는 텔레메트리 유형당 1개로 제한됩니다. 대신 `application.id` 또는 `env`를 사용하여 Restricted Dataset을 만들거나 이러한 속성을 더 잘 결합하는 다른 태그를 식별하는 것이 좋습니다.

## 모범 사례

### 액세스 전략

Data Access Control를 구성하기 전에 액세스 전략을 평가하는 것이 중요합니다. 액세스 전략을 고려할 때 [데이터 관련 위험을 줄이는 방법][8]를 검토해 보세요. 불필요하거나 민감한 데이터가 Datadog에 도달하기 전에 제거하거나 줄이면 추가 액세스 설정의 필요성을 줄일 수 있습니다.

#### 알려진 민감한 데이터 보호

어떤 데이터를 보호해야 하는지 이미 파악했다면 이 특정 데이터만을 중심으로 Data Access Control 설정을 구축할 수 있습니다. 이렇게 하면 사용자가 민감하지 않은 데이터를 일반적으로 사용할 수 있으므로 진행 중인 문제나 인시던트를 위해 협업하거나 해당 사안을 잘 이해하는 데 도움이 됩니다.

예를 들어, Real User Monitoring(RUM)으로 계측하고 사용자의 민감한 입력을 캡처하는 단일 애플리케이션이 있는 경우, 해당 애플리케이션에만 Restricted Dataset을 만들 수 있습니다.
* **이름 데이터 세트:** 제한된 RUM 데이터
* **이 데이터 세트에 포함할 데이터를 선택하세요.**
    * 텔레메트리 유형: RUM
        * 필터: `@application.id:<rum-app-id>`
* **액세스 권한 부여:**
    * Teams or roles of users who can see this RUM data

이 설정 예시는 애플리케이션의 RUM 데이터를 보호하고 조직의 기존 사용자가 이 애플리케이션의 다른 데이터를 계속 사용할 수 있도록 합니다.

#### 모든 데이터를 서비스로부터 보호

대신 특정 서비스로부터 데이터를 보호하려는 경우 `service:` 태그를 중심으로 Data Access Control 설정을 구축할 수 있습니다.

예를 들어, Real User Monitoring(RUM)으로 계측되고 사용자의 민감한 입력을 캡처하는 서비스(`NewService`)가 있는 경우 해당 애플리케이션에만 Restricted Dataset을 만들 수 있습니다.

* **이름 데이터 세트:** 제한된 NewService 데이터
* **이 데이터 세트에 포함할 데이터를 선택하세요.**
    * 텔레메트리 유형: RUM
        * 필터: `@service:NewService`
    * 텔레메트리 유형: 메트릭
        * 필터: `@service:NewService`
    * 텔레메트리 유형: APM
        * 필터: `@service:NewService`
    * 텔레메트리 유형: 로그
        * 필터: `@service:NewService`
* **액세스 권한 부여:**
    * 서비스를 소유한 팀

이 설정 예제는 `NewService`에서 지원되는 모든 데이터를 보호합니다.

### 팀 및 역할

Data Access Control을 사용하면 Datadog 역할 또는 팀을 통해 사용자에게 액세스 권한을 부여할 수 있습니다. 액세스 권한을 부여할 때는 기존 액세스 제어 설정과 액세스 전략을 고려해야 합니다. 서비스 기반 접근 방식을 추구하고 있고 이미 [Software Catalog][9]를 커스터마이징하고 있는 경우, Data Access Control 설정의 일부로 Teams를 사용해 서비스 소유권 모델을 활용할 수 있습니다.

**참고: Data Access Control에 사용되는 Teams는 `Anyone in the organization`이 아닌 팀 구성원 또는 관리자만 사용자를 추가하거나 제거할 수 있도록 설정해야 합니다.

## 액세스 실행

Data Access Control이 활성화된 Datadog 조직의 사용자는 대시보드, 탐색기, 또는 API를 통해서만 액세스 권한이 있는 데이터 쿼리 결과를 볼 수 있습니다. Restricted Dataset를 이용하면 Datadog 제품의 모든 경험 및 진입점에서 Restricted Dataset에 정의되어 허용되지 않는 사용자의 데이터 액세스를 제거합니다.

### 데이터 탐색기

제한이 활성화된 상태에서 Datadog을 탐색할 때 권한이 없는 사용자는 자산 이름(애플리케이션 또는 메트릭) 목록을 탐색할 수 있습니다. 그러나 데이터 세트에 제한된 쿼리 결과, 상위 태그 또는 패싯 세부 정보는 볼 수 없습니다. 예를 들어, 제한된 데이터로 메트릭을 쿼리하면 빈 그래프가 반환되어 쿼리가 어떤 데이터와도 일치하지 않는 것처럼 보입니다.

### 대시보드 및 노트북

RUM Explorer 또는 Metrics Explorer와 같은 데이터 탐색기에서 데이터를 탐색하는 것과 유사하게, Restricted Dataset을 사용하도록 설정한 조직의 대시보드에서 데이터를 확인하면, 사용자가 액세스할 수 있는 데이터만 표시합니다. 대시보드는 다른 사람이 액세스할 수 있는 공유 개체이므로 액세스 권한이 다른 두 사용자가 동시에 동일한 대시보드 또 노트북을 통해 서로 다른 데이터를 볼 수 있습니다.

### API

제한이 활성화된 Datadog API를 통해 데이터를 쿼리하는 경우, 권한이 없는 사용자는 Restricted Dataset에 제한된 쿼리 결과를 **볼 수 없습니다**.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/teams/
[2]: /ko/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /ko/account_management/rbac/
[4]: /ko/getting_started/tagging/
[5]: /ko/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /ko/data_security/
[9]: /ko/software_catalog/customize/
[10]: /ko/account_management/rbac/data_access/#supported-telemetry
[11]: /ko/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs