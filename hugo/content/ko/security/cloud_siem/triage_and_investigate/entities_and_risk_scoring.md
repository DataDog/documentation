---
aliases:
- /ko/security/cloud_siem/entities_and_risk_scoring
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: 설명서
  text: 엔터티 팩을 사용하여 사용자 ID를 Cloud SIEM에 동기화
- link: https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/
  tag: 블로그
  text: Datadog Cloud SIEM Risk-based Insights 및 AWS Entity Analytics를 사용하여 조사 가속화
- link: https://www.datadoghq.com/blog/ai-powered-threat-analysis
  tag: 블로그
  text: '클라우드 보안 조사에서의 AI: UEBA와 더 나은 텔레메트리의 역할'
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
title: 엔터티 위험
---
## 개요 {#overview}

[Cloud SIEM의 엔터티 위험][4]은 SIEM 위협 및 Cloud Security 인사이트와 같은 여러 데이터 소스를 IAM 사용자와 같은 단일 보안 엔터티를 나타내는 프로필로 통합합니다.

<div class="alert alert-info">엔터티 위험의 이전 명칭은 Risk Insights입니다.</div>

엔터티 위험을 사용하면 다음 작업을 수행할 수 있습니다.

- 엔터티 공급자, 엔터티 유형, 엔터티 이름, [위험 점수 심각도](#risk-scoring), 위험 점수 및 구성 위험과 같은 속성으로 엔터티를 필터링하고 탐색합니다.
- 시그널, 잘못된 구성, ID 위험 등 엔터티와 관련된 모든 데이터를 확인합니다.
- 위험을 사용자 ID별로 그룹화하여 사용자마다 하나의 행에 활동에 사용하는 모든 계정의 총위험을 표시합니다.
- 위험도가 높은 엔터티나 사용자가 나타날 때 대응할 수 있도록 알림을 구성합니다.
- 관련 항목을 일괄 분류합니다.
- 전역 억제 규칙을 생성하거나 엔터티에 대한 케이스를 생성하는 등의 완화 조치를 취합니다.

## 전제 조건 {#prerequisites}

- 엔터티 위험을 사용하려면 활성화된 Open Cybersecurity Schema Framework(OCSF) 파이프라인을 통해 Cloud SIEM으로 로그를 전송하도록 다음 지원 로그 소스 중 하나 이상을 구성합니다.
  - **ID 및 리소스 엔터티를 제공하는 소스**(사용자, 서비스 ID, 수임 역할, 컴퓨팅 인스턴스, 스토리지 컨테이너 등): AWS, Azure, GCP, GitHub, Microsoft 365, Okta
  - **이메일 주소로 식별되는 사용자 엔터티를 제공하는 소스**: 1Password, Cisco Duo, Cloudflare, CrowdStrike, Google Workspace, JumpCloud, LastPass, Salesforce, Slack, Zscaler Internet Access(ZIA)
- 지원되는 많은 소스는 추가 구성이 필요 없는 [기본 제공 OCSF 파이프라인][8]을 사용합니다. 지원되는 소스에서 엔터티가 생성되지 않는 경우, 해당 소스의 기본 제공 OCSF 파이프라인이 활성화되어 있는지 확인합니다. OCSF 지원 이전의 파이프라인 및 사용자 지정 파이프라인에는 필요한 OCSF 처리가 포함되지 않을 수 있습니다.
- Datadog은 [Content Packs][10] 페이지에서 ID 공급자(Okta, Google Workspace 또는 Microsoft Entra ID)에 대한 [엔터티 팩][9]을 구성할 것을 권장합니다. 사용자 ID가 동기화되면 엔터티 위험은 각 사용자의 계정을 하나의 사용자 ID로 통합하고 위험 점수를 합산합니다. 사용자 ID 알림도 사용할 수 있게 됩니다. 엔터티 팩이 없으면 엔터티별로만 위험 점수가 산정되고 경보가 생성됩니다. [사용자 ID별로 그룹화된 위험](#risk-grouped-by-user-identity)을 참조하세요.
- (필요시) 엔터티 패널에서 관련 Cloud Security 인사이트를 확인하려면 [Cloud Security를 구성해야 합니다][2].


## 엔터티 위험 탐색 {#explore-entity-risks}

### 엔터티 쿼리 및 필터링 {#query-and-filter-entities}

[Entity Risks][4] 페이지에서 위험 점수가 0보다 큰 모든 엔터티를 확인할 수 있습니다.

{{< img src="security/entities/entities-explorer4.png" alt="위험 및 위험 점수 목록과 사용자 ID 행 하나를 확장하여 하위 엔터티를 표시한 Entity Risks 페이지" style="width:100%;" >}}

### 사용자 ID별로 그룹화된 위험 {#risk-grouped-by-user-identity}

페더레이션 환경에서 한 사람은 일반적으로 여러 이메일 별칭, IAM 사용자, 수임 역할, 코드 리포지토리 계정 등 여러 개별 엔터티를 통해 활동합니다. 이러한 엔터티를 개별적으로 조회하면 해당 사용자의 전체 위험 수준을 파악할 수 없습니다.

ID 공급자에 대해 [엔터티 팩][9]을 구성하면 Cloud SIEM이 해당 공급자로부터 사용자 ID를 동기화합니다. 그런 다음 각 사용자 ID에 속하는 엔터티를 식별합니다. 동일한 사용자에 속하는 것으로 확인된 엔터티는 해당 사용자의 이름이 표시된 하나의 사용자 ID 행 아래에 그룹화됩니다. 해당 행의 위험 점수는 그 아래에 있는 엔터티의 위험 점수를 모두 합산한 값입니다. ID 공급자가 연결되면 그룹화가 자동으로 적용됩니다.

사용자 ID를 조사하려면 다음 단계를 따르세요.

1. [Entity Risks][4]에서 확장 화살표와 연결된 엔터티 수가 표시된 행을 찾습니다.
1. 화살표를 클릭하여 행을 확장하고 해당 사용자 ID에 속하는 것으로 확인된 각 엔터티의 위험 점수, 유형, 소스 및 시그널 수를 확인합니다.
1. 엔터티를 클릭하여 사이드 패널을 열고 [엔터티의 컨텍스트 빠르게 파악](#quickly-build-context-on-an-entity)에 설명된 대로 조사를 계속합니다.

<div class="alert alert-info">엔터티 위험은 사용자 ID에 명확하게 연결되는 엔터티만 그룹화합니다. 하나의 사용자 ID에 연결할 수 없는 엔터티는 개별 행으로 계속 표시되므로 동일한 사용자가 여러 행에 나타날 수 있습니다.</div>

### 엔터티의 컨텍스트 빠르게 파악 {#quickly-build-context-on-an-entity}

[Entity Risks][4]에서 엔터티를 클릭하여 엔터티 사이드 패널을 엽니다.

{{< img src="security/entities/entity-side-panel4.png" alt="What Happened 요약과 Risk Contributors 목록이 표시된 엔터티 사이드 패널" style="width:90%;" >}}

패널의 {{< ui >}}What Happened{{< /ui >}} 섹션은 시그널, 잘못된 구성 및 ID 위험의 수와 이러한 항목이 위험 점수에 미친 영향, 잠재적인 구성 위험을 요약합니다.

{{< ui >}}Risk Contributors{{< /ui >}} 섹션에는 발생한 시그널, 관련된 잘못된 구성 및 ID 위험 목록이 표시됩니다.

{{< ui >}}What Happened{{< /ui >}} 및 {{< ui >}}Risk Contributors{{< /ui >}} 섹션에는 엔터티의 위험 점수에 영향을 미치는 시그널, 잘못된 구성 및 ID 위험만 포함됩니다. 위험 점수에 영향을 미치지 않는 시그널을 포함하여 엔터티와 관련된 모든 시그널을 확인하려면 {{< ui >}}View All Related Signals{{< /ui >}}를 클릭하고, 잘못된 구성과 ID 위험을 확인하려면 {{< ui >}}View in Vulnerability Explorer{{< /ui >}}를 클릭합니다.

### 위협 일괄 분류 및 완화 {#triage-and-mitigate-threats-in-bulk}

엔터티 사이드 패널의 {{< ui >}}Risk Contributors{{< /ui >}} 섹션에는 수행 가능한 완화 조치가 표시됩니다. 조치할 항목을 선택한 다음 인라인 액션을 사용하여 분류 상태를 설정하거나, 항목을 할당하거나, 보안 케이스를 생성하거나, 인시던트를 선언하거나, 억제 규칙을 생성합니다.

## 엔터티 위험 알림 구성 {#configure-notifications-for-entity-risks}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">알림 규칙은 {{< region-param key="dd_site_name" >}} 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

Datadog이 지정한 기준에 부합하는 새로운 위협을 탐지하는 즉시 알림을 전송하도록 구성할 수 있습니다.

1. {{< ui >}}Create a new Entity Risk notification{{< /ui >}} 페이지로 이동합니다. 다음 두 가지 방법 중 하나를 사용할 수 있습니다.
   - Datadog에서 [Entity Risks][4] 페이지로 이동한 다음 {{< ui >}}Create Notification Rule{{< /ui >}}을 클릭합니다.
   - Datadog에서 {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}로 이동합니다. {{< ui >}}Products{{< /ui >}}의 {{< ui >}}Cloud SIEM{{< /ui >}} 섹션에서 [{{< ui >}}Entity Risks{{< /ui >}}][7]를 클릭한 다음 {{< ui >}}Notification rules{{< /ui >}}에서 {{< ui >}}New notification rule{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Group risk by{{< /ui >}}에서 규칙의 측정 대상을 선택합니다.
   - {{< ui >}}Individual entity{{< /ui >}}: 규칙이 각 엔터티의 개별 위험 점수를 평가합니다.
   - {{< ui >}}User identity{{< /ui >}}: 규칙이 해당 사용자에 속하는 것으로 확인된 모든 엔터티의 점수를 합산한 사용자 ID의 집계 위험 점수를 평가합니다. 이 옵션은 엔터티 팩을 구성하고 사용자 ID 동기화가 시작되면 사용할 수 있습니다. [집계된 사용자 ID 위험에 대한 알림](#notify-on-rolled-up-user-identity-risk)을 참조하세요.
   <div class="alert alert-warning">규칙을 생성한 후에는 규칙의 그룹화를 변경할 수 없습니다. 다른 그룹화를 사용하려면 새 규칙을 생성합니다.</div>
1. {{< ui >}}Define entity attributes{{< /ui >}}에서 Datadog이 엔터티에서 탐지할 경우 알림을 트리거할 속성을 지정합니다. {{< ui >}}Entities matching{{< /ui >}} 옆에 엔터티 속성과 값을 입력하기 시작합니다. 입력하는 동안 미리 보기 표에 기준과 일치하는 엔터티가 동적으로 표시됩니다.
   <div class="alert alert-info">이 단계는 필요시 수행할 수 있으며, 속성을 입력하지 않으면 기본적으로 모든 엔터티에 대한 경보가 전송됩니다.</div>
1. {{< ui >}}Set notification conditions{{< /ui >}}에서 엔터티 심각도 또는 위험 점수 값을 기준으로 트리거 조건을 설정합니다.
   - {{< ui >}}Entity severity{{< /ui >}}: 엔터티가 특정 심각도 수준에 도달하면 알림이 트리거됩니다. 연산자를 선택한 다음 심각도 수준을 선택합니다. 각 심각도 수준에 해당하는 위험 점수는 [엔터티 심각도 임계값](#entity-severity-thresholds)을 참조하세요.
   - {{< ui >}}Risk score value{{< /ui >}}: 엔터티의 위험 점수가 지정된 임계값을 초과하면 알림이 트리거됩니다. 알림을 트리거할 임계값을 지정합니다.
1. {{< ui >}}Configure notification{{< /ui >}}에서 알림 이름을 입력하고 사용자 지정 메시지 본문을 추가한 다음 수신자를 지정합니다.
   - 필요시 재알림을 활성화하고, 엔터티가 지정한 기준을 계속 충족할 경우 Datadog이 수신자에게 다시 알림을 전송하기까지의 기간을 지정할 수 있습니다.
1. 설정을 확인하려면 {{< ui >}}Test Notification{{< /ui >}}을 클릭하여 구성된 수신자에게 테스트 알림을 전송합니다.
1. {{< ui >}}Save Notification{{< /ui >}}을 클릭합니다.

### 집계된 사용자 ID 위험에 대한 알림 {#notify-on-rolled-up-user-identity-risk}

{{< ui >}}User identity{{< /ui >}}로 그룹화된 규칙은 한 사용자의 모든 엔터티에 걸친 총위험 점수가 임계값을 초과하면 알림을 전송합니다. 이를 통해 개별 엔터티의 위험 점수는 각각의 임계값을 초과하지 않더라도 여러 엔터티에 분산된 위험을 파악할 수 있습니다.

사용자 ID별로 그룹화된 규칙은 다음과 같은 점에서 개별 엔터티 규칙과 다릅니다.

- **일치하는 속성은 사용자 속성입니다.** 엔터티 속성 대신 사용자 인벤토리에 표시되는 식별된 사용자 ID의 속성을 쿼리합니다. 예를 들어, ID 공급자, 사용자 유형, 부서, 직함 또는 사무실 위치별로 쿼리할 수 있습니다. 미리 보기 표에는 기준에 부합하는 사용자 ID와 해당 ID의 집계 위험 점수가 표시됩니다.
- **조건은 집계 점수를 평가합니다.** 개별 엔터티 규칙과 마찬가지로 엔터티 심각도 수준이나 위험 점수 값을 기준으로 알림을 트리거할 수 있으며, 동일한 [엔터티 심각도 임계값](#entity-severity-thresholds)이 적용됩니다. 두 경우 모두 조건은 단일 엔터티의 점수가 아닌 사용자 ID의 집계 위험 점수를 기준으로 평가됩니다.
- **임계값 초과 시 알림이 트리거됩니다.** Datadog은 사용자 ID의 위험 점수가 임계값을 초과하는 시점에 알림을 전송하며, 임계값 초과 상태가 유지되는 동안에는 평가할 때마다 알림을 전송하지 않습니다. 규칙을 생성할 때 사용자 ID의 위험 점수가 이미 임계값을 초과했다면 Datadog은 알림을 한 번 전송합니다. 사용자 ID의 위험 점수가 임계값을 초과한 상태로 유지되는 동안 알림을 다시 받으려면 재알림 기능을 사용합니다.
- **메시지 콘텐츠는 사람 중심입니다.** 템플릿 변수에는 사용자 ID의 표시 이름, ID 공급자, 집계 위험 점수, 위험 점수에 기여하는 엔터티 수, 위험 점수에 가장 크게 기여하는 엔터티와 해당 점수가 포함됩니다.
- **알림은 사용자 인벤토리로 연결됩니다.** 알림의 기본 링크를 클릭하면 사용자 인벤토리에서 해당 사용자 ID의 사이드 패널이 열립니다.

사용자 ID별로 그룹화된 규칙과 개별 엔터티별로 그룹화된 규칙을 함께 사용할 수 있으며, 규칙 목록에는 각 규칙의 그룹화 방식이 표시됩니다. 두 유형 모두 조직당 알림 규칙 100개라는 동일한 한도에 포함됩니다.

## 위험 점수 산정 {#risk-scoring}

엔터티의 위험 점수는 지난 14일간의 활동을 기준으로 엔터티의 위험 수준을 근사치로 나타냅니다. Datadog은 시그널의 심각도 수준과 발생 횟수 등 엔터티와 관련된 시그널의 특성을 바탕으로 위험 점수를 계산합니다.

### 시그널 점수 영향 확인 및 사용자 지정 {#view-and-customize-signal-score-impacts}

각 시그널의 심각도에 따라 위험 점수에 미치는 영향이 결정됩니다. Datadog은 시그널의 각 심각도 수준에 기본 점수를 할당합니다. 조직의 기본 점수 영향과 잘못된 구성 및 ID 위험의 점수 영향을 확인하거나 재정의하려면 [엔터티 위험 설정 페이지][7]로 이동합니다.

점수에 미치는 영향을 변경하면 Datadog은 변경 사항을 모든 기존 엔터티 위험 점수에 즉시 소급 적용합니다. 업데이트된 점수를 바탕으로 변경 사항이 향후 엔터티 위험 알림에 미치는 영향을 평가하여 불필요한 알림을 줄이고 유의미한 시그널을 늘릴 수 있습니다.

<div class="alert alert-info">시그널이 점수에 미치는 영향은 14일 동안 지속되며, 이후 점수는 <code>0</code>으로 감소합니다.</div>

| 시그널 심각도 | 점수 |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` 및 `Info`| `0`              |

### 엔터티 심각도 임계값 {#entity-severity-thresholds}

엔터티의 심각도 임계값은 해당 엔터티와 관련된 모든 시그널이 위험 점수에 미치는 영향을 합산하여 계산합니다. 동일한 임계값이 사용자 ID에도 적용됩니다. 사용자 ID의 심각도는 해당 ID에 속하는 것으로 확인된 모든 엔터티의 위험 점수를 합산한 집계 위험 점수를 기준으로 결정됩니다.

| 심각도 임계값          | 위험 점수                                         |
|-----------------------------|----------------------------------------------------|
| `Critical`                  | `100` 이상                    |
| `High`                      | `50` 이상 `100` 미만 |
| `Medium`                    | `25` 이상 `50` 미만  |
| `Low`                       | `10` 이상 `25` 미만  |
| `Info`                      | `10` 미만                                    |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://docs.datadoghq.com/ko/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/siem/entity-risks
[7]: https://app.datadoghq.com/security/configuration/siem/entity-risks
[8]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/#supported-out-of-the-box-ocsf-pipelines
[9]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs
[10]: /ko/security/cloud_siem/ingest_and_enrich/content_packs