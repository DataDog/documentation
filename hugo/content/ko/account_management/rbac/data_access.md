---
description: 액세스 제어를 위해 Restricted Dataset 정의
further_reading:
- link: /data_security/
  tag: 설명서
  text: 데이터 관련 리스크 줄이기
is_public: true
title: Data Access Control
---
## 개요 {#overview}

Datadog의 데이터에는 민감한 정보가 포함될 수 있으므로 주의해서 다루어야 합니다. 민감한 데이터를 Datadog으로 수집하는 경우, Data Access Control을 통해 Datadog 조직 내의 관리자와 액세스 관리자가 이 데이터에 대한 액세스를 제어할 수 있습니다. Data Access Control을 사용하여 쿼리로 민감한 데이터를 식별하고 특정 [팀][1] 또는 [역할][2]에만 액세스를 허용할 수 있습니다.

_Restricted Dataset_를 정의하면 해당 데이터 세트 경계 내의 모든 데이터에 대한 액세스가 제한됩니다. Restricted Dataset 외부의 데이터는 액세스가 제한되지 않으며 적절한 권한이 있는 사용자만 액세스할 수 있습니다. Data Access Control은 액세스 관리자가 데이터 세트에 포함된 민감한 데이터에 대해 허용된 사용자에게만 액세스 권한을 부여할 수 있는 직관적인 인터페이스를 제공합니다.

## 전제 조건 {#prerequisites}

### 액세스 제어 구성 {#configure-access-controls}

Data Access Control은 조직의 기존 Datadog Access Control 구성을 기반으로 작동합니다. Data Access Control을 구성하기 전에 먼저 [액세스 제어][3]를 설정하세요.

### 수신 데이터에 태그 지정 {#tag-incoming-data}

Data Access Control은 액세스 경계를 정의하는 데 사용할 수 있는 데이터의 태그와 속성에 의존합니다. 태그가 정의되어 있지 않은 경우, Data Access Control 구성을 시작하기 전에 [태그 시작하기][4]를 참고하세요.

## 데이터 액세스 구성 {#configure-data-access}

Data Access Control를 사용하면 지정된 팀 또는 역할의 사용자만 액세스할 수 있는 데이터를 지정하여 Restricted Dataset를 만들 수 있습니다.

Restricted Dataset를 모두 보려면 [조직 설정][6]으로 이동하여 왼쪽의 {{< ui >}}Access{{< /ui >}} 제목 아래에서 [Data Access Control][7]를 선택합니다.

### Datadog 사이트 {#datadog-site}

Datadog Admin 역할이 할당된 사용자 또는 조직 내에서 [`user_access_manage` 권한][5]을 지닌 역할의 사용자로 로그인합니다.

1. [조직 설정][6]으로 이동합니다.
1. 페이지 왼쪽에서 [Data Access Control][7]를 선택합니다.
1. {{< ui >}}New Restricted Dataset{{< /ui >}}를 클릭합니다.

Restricted Dataset를 만들려면 쿼리를 통해 제한할 데이터를 식별합니다.

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="Restricted Dataset 생성 대화 상자. service:hr 태그와 일치하는 RUM, APM, 로그 및 메트릭의 데이터를 선택합니다. Privileged access 팀에 대한 액세스 권한을 부여합니다.">}}

이름 데이터 세트
: 사용자가 데이터 세트에 어떤 데이터가 포함되어 있는지 알기 쉽게 나타내는 이름입니다.

이 데이터 세트에 포함할 데이터 선택
: 특정 사용자 세트로 제한할 데이터를 설명하는 경계 정의입니다. 경계는 액세스 관리자가 보호할 민감한 데이터의 범위를 정의할 수 있도록 제한 사항이 포함된 쿼리 문입니다. [지원되는 텔레메트리 유형][10]은 사용자 지정 메트릭, RUM 세션, APM 트레이스, 로그, 클라우드 비용, 오류 추적 이슈, Software Delivery 리포지토리 정보(CI Visibility pipelines) 및 Workload Protection Agent 이벤트입니다.

액세스 권한 부여
: Restricted Dataset에 바인딩된 콘텐츠에 액세스할 수 있는 하나 이상의 팀 또는 역할을 선택하세요. 이 그룹의 구성원이 아닌 사용자는 이 데이터에 액세스할 수 없습니다.

**참고:** Restricted Dataset 하나당 최대 50개의 주체(역할 또는 팀)를 연결할 수 있습니다.

Restricted Dataset 하나당 최대 10개의 키:값 쌍을 생성할 수 있습니다. 추가 쌍이 필요한 경우 추가 Restricted Dataset 정의를 고려하세요.

모든 필드를 완료하여 Restricted Dataset을 정의한 후 {{< ui >}}Create Restricted Dataset{{< /ui >}}를 클릭하여 조직에 적용합니다.

Enterprise 플랜에서는 최대 100개의 Restricted Dataset를 생성할 수 있으며, 그 외의 경우에는 최대 10개의 Restricted Dataset를 생성할 수 있습니다. [Strict Mode](#strict-mode)를 사용하는 Enterprise 고객은 최대 1,000개의 Restricted Dataset를 생성할 수 있습니다.

### 지원되는 텔레메트리 유형 {#supported-telemetry}

- Agent Observability 트레이스
- APM 트레이스
- 클라우드 비용
- Error Tracking 이슈
- 로그
- RUM 세션
- Software Delivery 리포지토리 정보(CI Visibility pipelines 내)
- Workload Protection Agent 이벤트

다음은 요청 시 미리 보기로 제공됩니다.
- 사용자 지정 메트릭
    - **참고:** 표준 및 OpenTelemetry(OTel) 메트릭은 지원되지 않습니다.

## 고급 구성 {#advanced-configuration}

### Strict Mode {#strict-mode}

기본적으로 Data Access Control은 _Standard Mode_에서 작동하며, 이는 Restricted Dataset 외부의 모든 데이터가 적절한 권한을 가진 사용자에게 계속 표시됨을 의미합니다. _Strict Mode_는 특정 텔레메트리 유형에 대해 이를 반전시킵니다. 이 모드가 활성화되면 사용자는 Restricted Dataset를 통해 명시적으로 액세스 권한을 부여받지 않는 한, 해당 텔레메트리 유형에 대한 데이터를 볼 수 없습니다.

Strict Mode는 다음과 같이 특히 민감한 데이터에 유용합니다.
- 텔레메트리 태깅이 일관되지 않아 Standard Mode 경계에서 민감한 레코드가 노출될 위험이 있는 경우
- 새로운 태그 값이 자주 추가되어 모든 새 값이 기존 Restricted Dataset와 일치한다고 보장할 수 없는 경우
- Compliance 상태에서 텔레메트리 유형에 대해 기본 거부 입장이 필요한 경우

Strict Mode는 텔레메트리 유형별로 구성됩니다. 텔레메트리 유형을 Strict Mode로 전환하려면 먼저 하나 이상의 Restricted Dataset가 있어야 합니다. 이는 의도치 않은 액세스 손실을 방지합니다. Strict Mode인 텔레메트리 유형에서 나중에 모든 Restricted Dataset가 삭제되면, 새 데이터 세트가 생성되거나 모드가 Standard로 다시 전환될 때까지 [Unrestricted User Group](#unrestricted-user-groups)만 액세스 권한을 유지합니다.

Restricted Dataset는 Standard Mode와 Strict Mode 간에 공유할 수 없습니다(각 데이터 세트는 하나의 모드에 속함).

**Strict Mode를 활성화하기 전**, 해당 텔레메트리 유형에 대해 이미 Restricted Dataset에 _포함되지 않은_ 데이터가 무엇인지 확인하세요. Strict Mode가 활성화되면 해당 데이터는 숨겨집니다. [Data Access Control][7] 페이지에서 기존 Restricted Dataset를 검토하여 적용 범위를 확인하세요.

텔레메트리 유형의 제한 모드를 변경하려면 [Data Access Control][7]로 이동하세요. 사용자는 제한 모드를 변경할 수 있는 [`user_access_manage` 권한][5]이 있어야 합니다.

### Unrestricted User Group {#unrestricted-user-groups}

높은 권한을 가진 관리자나 전체 조직의 데이터에 액세스할 수 있는 중앙 관측성 팀과 같은 일부 사용자는 Restricted Dataset에 관계없이 텔레메트리 유형에 대한 전체 가시성이 필요합니다. 이러한 사용자를 모든 Restricted Dataset에 개별적으로 추가하는 대신, 특정 텔레메트리 유형에 대해 해당 팀이나 역할에 _제한 없는 액세스_를 부여할 수 있습니다.

텔레메트리 유형에 대해 제한 없는 액세스를 가진 팀이나 역할은 Restricted Dataset 경계나 제한 모드에 관계없이 해당 텔레메트리 유형에 대한 모든 데이터를 볼 수 있습니다. 제한 없는 액세스는 개별 사용자가 아닌 팀이나 역할에 부여되며 텔레메트리 유형별로 구성됩니다. 예를 들어, 역할은 RUM에 대한 액세스에 영향을 주지 않으면서 로그에 대한 제한 없는 액세스를 가질 수 있습니다.

Unrestricted User Group은 지정된 관리자가 모든 Restricted Dataset에 추가되지 않고도 계속 작업할 수 있게 해주므로 Strict Mode와 특히 잘 맞습니다.

**참고:** 다른 액세스 권한 제어 방법([로그 제한 쿼리][11] 및 [권한][3] 등)은 Unrestricted User Group의 사용자에게도 계속 적용됩니다.

## 사용량 제약 {#usage-constraints}

Data Access Control를 켜면 Datadog에서 민감한 데이터에 대한 액세스를 제어하는 다른 기능을 비활성화하거나 제한합니다. 제한되는 기능은 아래에서 영향을 받는 기능 목록을 참조하세요.

### Real User Monitoring(RUM) {#real-user-monitoring-rum}

#### Session Replay: 보존 기간 연장 {#session-replay-extended-retention}
기본적으로 Session Replay 데이터는 30일 동안 보존됩니다. 보존 기간을 15개월로 연장하려면 개별 Session Replay에서 Extended Retention을 활성화할 수 있습니다. RUM에 대한 Restricted Dataset을 생성하면 Datadog은 Extended Retention 옵션을 비활성화합니다.

#### Session Replay: 재생 목록 {#session-replay-playlists}

재생 목록은 폴더와 같은 구조로 집계할 수 있는 Session Replay 모음입니다. RUM에 대한 제한된 데이터 세트를 만들면 Datadog은 Session Replay 재생 목록을 비활성화합니다.

### 로그 {#logs}
Data Access Control은 로그 제한 쿼리라고도 하는 기존 [로그 RBAC 권한][11] 기능과는 별개입니다. Datadog은 로그 데이터를 제한하기 위해 단일 솔루션을 사용할 것을 권장합니다. Data Access Control과 로그 제한 쿼리를 모두 사용하여 사용자 액세스를 제한하는 경우 두 가지 제한 사항이 모두 적용됩니다.

### Monitors {#monitors}
사용자는 활성 텔레메트리를 쿼리하고 이에 대해 경고하는 모니터를 만들 수 있습니다. 사용자는 액세스가 허용된 데이터만 직접 쿼리할 수 있지만, 모니터는 데이터에 대한 전체 액세스 권한을 가진 시스템 사용자로 작동합니다.

모니터를 통한 무단 데이터 액세스가 우려되는 경우 Datadog은 사용자가 만드는 모니터를 추적할 것을 권장합니다. 그런 다음 민감한 데이터를 읽는 모니터 생성에 대한 액세스를 제한하세요.

### Software Delivery 리포지토리 정보(CI Visibility pipelines) {#software-delivery-repository-info-ci-visibility-pipelines}

* **지원되는 텔레메트리**: CI Visibility pipelines만 지원됩니다. Test Optimization 테스트는 지원되지 않습니다.
* **CI 로그**: CI 로그는 Log Management 제품에 저장됩니다. CI 로그에 대한 액세스를 제한하려면 로그 데이터 세트를 만드세요.
* **지원되는 데이터 세트 태그**: 다음 태그만 지원됩니다.
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability {#agent-observability}

* **지원되는 텔레메트리**: Agent Observability 트레이스가 지원됩니다. 프로젝트 내 실험에 대한 실험 이벤트 데이터(스팬 및 평가 메트릭)도 `ml_app`으로 키가 지정된 제한된 데이터 세트에 의해 제한됩니다. 이벤트 데이터만 제한되며, 실험 목록 보기 및 메타데이터는 제한되지 않습니다. 데이터 세트, 주석 대기열 및 관리형 프롬프트는 지원되지 않습니다.
* **OpenTelemetry**: [OpenTelemetry 계측][13]을 사용할 때 Agent Observability로 전송된 일부 데이터는 APM 트레이스뿐만 아니라 메트릭 및 모니터에도 기록될 수 있습니다. Agent Observability에서 Restricted Dataset로 민감한 데이터를 보호하는 경우, 일치하는 데이터 경계를 가진 APM, 메트릭 또는 모니터에서도 Restricted Dataset를 구성하는 것을 고려하세요.


## 액세스할 태그 선택 {#select-tags-for-access}

각 Restricted Dataset는 메트릭과 같은 여러 유형의 데이터에 대한 액세스를 제어할 수 있습니다. 여러 유형의 텔레메트리 전반에 걸쳐 동일하거나 다른 태그를 자유롭게 사용할 수 있습니다. 각 텔레메트리 유형 내에서 액세스 전략을 정의하려면 _단일_ 태그 또는 속성을 사용해야 합니다.

이러한 제약 조건에 태그 또는 속성 조합이 너무 많은 경우, [태그 재검토][4]를 통해 액세스 전략을 반영하는 새 태그를 정의하는 것이 좋습니다.

### 지원되는 예 {#supported-example}

#### Restricted Dataset 1 {#restricted-dataset-1}
- 텔레메트리 유형: RUM
   - 필터: `@application.id:ABCD`

#### Restricted Dataset 2 {#restricted-dataset-2}
* 텔레메트리 유형: RUM
    * 필터: `@application.id:EFGH`
* 텔레메트리 유형: Custom Metrics
    * 필터: `env:prod`

### 지원되지 않는 예 {#not-supported-example}

#### Restricted Dataset 1: {#restricted-dataset-1-1}
* 텔레메트리 유형: RUM
    * 필터: `@application.id:ABCD`

#### Restricted Dataset 2: {#restricted-dataset-2-1}
* 텔레메트리 유형: RUM
    * 필터: `env:prod`

Restricted Dataset 1은 RUM 데이터의 태그로 `@application.id`를 사용하므로, 새 Restricted Dataset는 다른 태그로 변경할 수 없습니다. 대신 Restricted Dataset 2에서 `@application.id`를 사용하도록 재구성하거나, RUM 데이터가 포함된 모든 Restricted Dataset에서 다른 태그를 사용하도록 변경해 보세요.

### 지원되지 않는 예 {#not-supported-example-1}

#### Restricted Dataset 1: {#restricted-dataset-1-2}
* 텔레메트리 유형: RUM
    * 필터: `@application.id:ABCD`

#### Restricted Dataset 2: {#restricted-dataset-2-2}
* 텔레메트리 유형: RUM
    * 필터: `@application.id:IJKL` `env:prod`

이 예제는 Restricted Dataset 1에서 수행된 것과 같이 RUM에 대해 `@application.id` 태그를 올바르게 사용했습니다. 하지만 텔레메트리 유형별로 사용할 수 있는 태그는 하나로 제한됩니다. 대신 `application.id` _또는_ `env`를 사용하는 Restricted Dataset를 생성하거나, 이러한 속성을 더 적절하게 결합하는 다른 태그를 찾아보세요.

## 모범 사례 {#best-practices}

### 액세스 전략 {#access-strategy}

Data Access Control을 구성하기 전에 액세스 전략을 평가하는 것이 중요합니다. 액세스 전략을 고려할 때 [데이터 관련 리스크 줄이기][8]를 참고하세요. 데이터가 Datadog에 도달하기 전에 불필요하거나 민감한 데이터를 제거하거나 줄이면 추가 액세스 설정의 필요성이 줄어듭니다.

#### 알려진 민감한 데이터 보호 {#protecting-known-sensitive-data}

보호해야 할 데이터를 이미 식별했다면 이 특정 데이터를 중심으로 Data Access Control을 구성할 수 있습니다. 이렇게 하면 사용자가 민감하지 않은 데이터에 액세스할 수 있게 되어, 서로 협업하고 진행 중인 이슈나 인시던트를 파악할 수 있습니다.

예를 들어, Real User Monitoring(RUM)으로 계측하고 사용자의 민감한 입력을 캡처하는 단일 애플리케이션이 있는 경우, 해당 애플리케이션에만 Restricted Dataset를 만들 수 있습니다.
* {{< ui >}}Name dataset:{{< /ui >}} 제한된 RUM 데이터
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * 텔레메트리 유형: RUM
        * 필터: `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * RUM 데이터를 볼 수 있는 팀 또는 역할

이 설정 예시는 애플리케이션의 RUM 데이터를 보호하고 조직의 기존 사용자가 이 애플리케이션의 다른 데이터를 계속 사용할 수 있도록 합니다.

#### 특정 서비스에서 생성된 모든 데이터 보호 {#protecting-all-data-from-a-service}

대신 특정 서비스에서 생성된 데이터를 보호하려는 경우 `service:` 태그를 중심으로 Data Access Control 설정을 구축할 수 있습니다.

예를 들어, Real User Monitoring (RUM)으로 계측되고 사용자의 민감한 입력을 캡처하는 서비스 `NewService`가 있는 경우 해당 애플리케이션에만 Restricted Dataset를 만들 수 있습니다.

* {{< ui >}}Name Dataset:{{< /ui >}} 제한된 NewService 데이터
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * 텔레메트리 유형: RUM
        * 필터: `@service:NewService`
    * 텔레메트리 유형: Custom Metrics
        * 필터: `@service:NewService`
    * 텔레메트리 유형: APM
        * 필터: `@service:NewService`
    * 텔레메트리 유형: Logs
        * 필터: `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * 서비스를 소유한 팀

이 설정 예제는 `NewService`에서 지원되는 모든 데이터를 보호합니다.

### 팀 및 역할 {#teams-and-roles}

Data Access Control은 Datadog 역할 또는 팀을 통해 사용자에게 액세스 권한을 부여하는 것을 지원합니다. 액세스 권한을 부여할 때는 기존 액세스 제어 구성 및 액세스 전략을 고려하세요. 서비스 기반 접근 방식을 사용하고 있고, 이미 [카탈로그를 사용자 지정][9]하고 있다면 Data Access Control 구성에 팀을 포함하여 서비스 소유권 모델을 활용하세요.

**참고:** Data Access Control에 사용되는 팀은 `Anyone in the organization`이 아닌 팀 구성원 또는 관리자만 사용자를 추가하거나 제거할 수 있도록 설정해야 합니다.

## 액세스 실행 {#access-enforcement}

Data Access Control이 활성화된 Datadog 조직의 사용자는 Dashboard, Explorer 또는 API를 통해 액세스 권한이 있는 데이터에 대한 쿼리 결과만 볼 수 있습니다. Restricted Dataset는 권한이 없는 사용자에 대해 모든 Datadog 환경 및 진입점에서 Restricted Dataset에 정의된 데이터에 대한 액세스를 제거합니다.

### 데이터 탐색기 {#data-explorers}

제한이 활성화된 상태에서 Datadog을 탐색할 때 권한이 없는 사용자는 자산 이름(애플리케이션 또는 메트릭) 목록을 탐색할 수 있습니다. 그러나 데이터 세트에 제한된 쿼리 결과, 상위 태그 또는 패싯 세부 정보는 볼 수 없습니다. 예를 들어, 제한된 데이터로 메트릭을 쿼리하면 빈 그래프가 반환되어 쿼리가 어떤 데이터와도 일치하지 않는 것처럼 보입니다.

### Dashboards 및 Notebooks {#dashboards-and-notebooks}

RUM Explorer나 Metrics Explorer와 같은 데이터 탐색기에서 데이터를 탐색하는 것과 마찬가지로, Restricted Dataset가 활성화된 조직에서 Dashboards의 데이터를 볼 때는 사용자가 액세스할 수 있는 데이터만 표시됩니다. Dashboard는 다른 사용자가 액세스할 수 있는 공유 객체이므로, 액세스 권한이 다른 두 사용자가 동일한 Dashboard나 Notebooks를 동시에 보더라도 서로 다른 데이터를 볼 수 있습니다.

**참고**: [공유 Dashboard][12]를 조회할 수 있는 사람은 작성자의 권한에 따라 Dashboard에 표시된 모든 텔레메트리 데이터를 볼 수 있습니다. 민감하거나 기밀인 데이터가 노출되지 않도록 공유하기 전에 Dashboard 콘텐츠를 검토하세요.

### API {#apis}

제한이 활성화된 Datadog API를 통해 데이터를 쿼리할 때, 권한이 없는 사용자는 Restricted Datasets에 의해 제한된 쿼리 결과를 **볼 수 없습니다**.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/teams/
[2]: /ko/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /ko/account_management/rbac/
[4]: /ko/getting_started/tagging/
[5]: /ko/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /ko/data_security/
[9]: /ko/internal_developer_portal/catalog/set_up/
[10]: /ko/account_management/rbac/data_access/#supported-telemetry
[11]: /ko/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /ko/dashboards/sharing/shared_dashboards/
[13]: /ko/llm_observability/instrumentation/otel_instrumentation/