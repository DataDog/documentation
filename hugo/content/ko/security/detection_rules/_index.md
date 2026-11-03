---
aliases:
- /ko/security_monitoring/detection_rules/
- /ko/cloud_siem/detection_rules/
- /ko/security_platform/detection_rules/
- /ko/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: 설명서
  text: 기본 탐지 규칙 살펴보기
- link: /security/notifications/
  tag: 설명서
  text: 보안 알림에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: 블로그
  text: Datadog로 기능 남용 탐지하기
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: 블로그
  text: 불가능한 여행 탐지 규칙으로 의심스러운 로그인 활동 탐지하기
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
title: 탐지 규칙
---
{{< product-availability >}}

탐지 규칙은 모든 수집된 로그와 클라우드 구성에 적용되는 조건부 논리를 정의합니다. 규칙에 정의된 케이스 중 하나 이상이 지정된 기간 동안 일치하면 보안 신호가 생성됩니다. [Signals Explorer][1]에서 이러한 신호를 확인할 수 있습니다.

## 기본 탐지 규칙 {#out-of-the-box-detection-rules}

Datadog은 공격자 기법과 잠재적인 구성 오류를 표시하는 [기본 탐지 규칙][2]을 제공합니다. 새로운 탐지 규칙이 릴리스되면, 구성에 따라 계정, App and API Protection 라이브러리, 그리고 Agent로 자동으로 가져옵니다.

기본 규칙은 다음 보안 제품에서 사용할 수 있습니다.

- [Cloud SIEM][3]에서는 로그 탐지를 사용해 수집된 로그를 실시간으로 분석합니다.
- Cloud Security:
    - [Cloud Security Misconfigurations][4]에서는 클라우드 구성과 인프라 구성 탐지 규칙을 사용해 클라우드 환경 상태를 스캔합니다.
    - [Cloud Security Identity Risks][6]에서는 탐지 규칙을 사용해 클라우드 인프라에 있는 IAM 기반 위험을 탐지합니다.
- [Workload Protection][5]에서는 Datadog Agent와 탐지 규칙을 사용해 적극적으로 시스템 활동을 모니터링하고 평가합니다.
- [App and API Protection][7](AAP)에서는 Datadog [APM][8], [Datadog Agent][9], 탐지 규칙을 활용해 애플리케이션 환경의 위협을 탐지합니다.

## MITRE ATT&CK 맵 {#mitre-attck-map}

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK는 조직이 사이버 공격자의 운영 방식을 이해하도록 돕는 프레임워크입니다. 다음 항목을 매핑합니다.

- **전술(Tactics):** 공격의 '이유'입니다. 이는 초기 액세스 획득, 악성 코드 실행, 데이터 탈취와 같은 상위 수준의 목표를 의미합니다.
- **기법(Techniques):** 공격의 '방법'입니다. 이는 시스템에 침입하기 위해 피싱을 사용하거나 소프트웨어의 취약점을 악용하는 등 공격자가 전술을 달성하기 위해 취하는 구체적인 행동입니다.

MITRE ATT&CK는 전술과 기법을 매핑함으로써 보안 팀에게 위협을 소통하고 방어 태세를 더 잘 갖출 수 있는 공통 언어를 제공합니다.

MITRE ATT&CK 맵을 사용하려면 다음을 수행하세요.

1. [SIEM][16] 또는 [Workload Protection][17]에서 탐지 규칙을 엽니다.
2. {{< ui >}}MITRE ATT&CK map{{< /ui >}}을 선택합니다.
3. 필터 <i class="icon-filter"></i>에서 하나 이상의 제품을 선택합니다.
4. 맵에서 다음 사항을 검토합니다.
   - 커버리지 평가: 어떤 공격 기법이 잘 커버되고 어떤 기법이 모니터링이 부족한지 확인합니다.
   - 규칙 생성 우선순위 지정: 커버리지가 낮거나 없는 기법에 대한 탐지 규칙 생성에 집중합니다.
   - 규칙 관리 간소화: 최신 위협 인텔리전스와 일치하도록 탐지 규칙을 관리하고 업데이트합니다.
MITRE ATT&CK 맵은 SIEM 또는 Workload Protection에서 사용할 수 있지만, 필터에서 Application and API Protection을 선택할 수도 있습니다. Application and API Protection은 포괄적인 보안 커버리지를 위해 MITRE ATT&CK 맵에 포함되어 있습니다.

## 베타 탐지 규칙 {#beta-detection-rules}

Datadog의 Security Research 팀은 새로운 기본 보안 탐지 규칙을 지속적으로 추가합니다. 통합 또는 기타 새로운 기능의 릴리스와 함께 고품질 탐지를 제공하는 것이 목표이지만, 규칙을 일반적으로 적용하기 전에 대규모 탐지 성능을 관찰해야 하는 경우가 많습니다. 이를 통해 Datadog의 Security Research 팀은 당사 표준을 충족하지 않는 탐지 기회를 개선하거나 폐기할 시간을 확보할 수 있습니다.

## 사용자 지정 탐지 규칙 {#custom-detection-rules}

환경이나 워크로드에 따라 규칙을 사용자 지정해야 하는 상황이 있을 수 있습니다. 예를 들어 AAP를 사용하는 경우, 비즈니스가 운영되지 않는 지리적 위치에서 민감한 작업을 수행하는 사용자를 탐지하는 탐지 규칙을 사용자 지정할 수 있습니다.

[사용자 지정 탐지 규칙을 생성](#create-detection-rules)하려면 기본 규칙을 복제하여 편집하거나, 자신의 규칙을 처음부터 만들 수 있습니다.

## 탐지 규칙 검색 및 필터링 {#search-and-filter-detection-rules}

Datadog에서 기본 및 사용자 지정 탐지 규칙을 확인하려면 [{{< ui >}}Security Settings{{< /ui >}}][10] 페이지로 이동하세요. 규칙은 각 제품(App and API Protection, Cloud Security, Cloud SIEM)별로 별도의 페이지에 나열됩니다.

규칙을 검색하고 필터링하려면 검색 상자와 패싯을 사용하여 값별로 쿼리하세요. 예를 들어, 특정 규칙 유형에 대한 규칙만 표시하려면 규칙 유형 위로 마우스를 가져가서 `only`를 선택합니다. 들어오는 문제를 조사하고 분류할 때 `source` 및 `severity`와 같은 패싯별로 필터링할 수도 있습니다.

{{< img src="security/default_detection_rules.png" alt="구성 페이지에서 기본 및 사용자 지정 Cloud SIEM 탐지 규칙을 보여줍니다." width="100%">}}

## 탐지 규칙 생성 {#create-detection-rules}

사용자 지정 탐지 규칙을 생성하려면 탐지 규칙 페이지 오른쪽 상단 모서리에 있는 {{< ui >}}New Rule{{< /ui >}} 버튼을 클릭하세요. 또한 [기존의 기본 또는 사용자 지정 규칙을 복제](#clone-a-rule)하여 템플릿으로 사용할 수 있습니다.

자세한 지침을 보려면 다음을 참고하세요.

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security Misconfigurations][13]
- [Workload Protection][14]

## 탐지 규칙 관리 {#manage-detection-rules}

Datadog의 [SIEM][16] 또는 [Workload Protection][17] 페이지에서 탐지 규칙을 관리할 수 있습니다. 이 지침은 해당 페이지에서 이러한 작업을 수행하는 방법을 설명하지만, 탐지 규칙을 클릭하여 사이드 패널에서 열 때도 이러한 옵션을 사용할 수 있습니다.

### 규칙 활성화 또는 비활성화하기 {#enable-or-disable-rules}

규칙을 활성화 또는 비활성화하려면 규칙 이름 오른쪽으로 스위치를 토글하세요.

규칙을 일괄 활성화하거나 비활성화할 수도 있습니다.

1. {{< ui >}}Select Rules{{< /ui >}}를 클릭합니다.
1. 활성화하거나 비활성화하고자 하는 규칙을 선택합니다.
1. {{< ui >}}Bulk Actions{{< /ui >}} 드롭다운 메뉴를 클릭합니다.
1. {{< ui >}}Enable Rules{{< /ui >}} 또는 {{< ui >}}Disable Rules{{< /ui >}}를 선택합니다.

### 규칙 편집 {#edit-a-rule}

기본 및 사용자 지정 탐지 규칙은 편집할 수 있습니다. 원본 규칙을 직접 편집하는 대신 보존하고 싶다면 [규칙을 복제](#clone-a-rule)하고, 복제된 규칙을 변경한 다음 [원본 규칙을 비활성화](#enable-or-disable-rules)할 수 있습니다.

규칙을 편집하려면 규칙에서 세로 점 세 개 메뉴를 클릭한 후, 규칙 유형에 따라 {{< ui >}}Edit default rule{{< /ui >}} 또는 {{< ui >}}Edit rule{{< /ui >}}을 선택하세요.

### 규칙 복제 {#clone-a-rule}

규칙을 복제하려면 규칙에서 세로 점 세 개 메뉴를 클릭한 후, {{< ui >}}Clone rule{{< /ui >}}을 선택하세요.

기존 규칙을 복제하고 설정을 약간 수정하여 다른 탐지 영역을 다루려는 경우 규칙 복제가 유용합니다. 예를 들어, 로그 탐지 규칙을 복제하고 {{< ui >}}Threshold{{< /ui >}}에서 {{< ui >}}Anomaly{{< /ui >}}로 수정하여 동일한 쿼리와 트리거를 사용하여 위협 탐지에 새로운 차원을 추가할 수 있습니다.

### 규칙 삭제 {#delete-a-rule}

규칙을 삭제하려면 규칙에서 세로 점 세 개 메뉴를 클릭한 후, {{< ui >}}Delete rule{{< /ui >}}을 선택하세요.

규칙을 일괄 삭제할 수도 있습니다.

1. {{< ui >}}Select Rules{{< /ui >}}를 클릭합니다.
1. 삭제할 규칙을 선택합니다.
1. {{< ui >}}Bulk Actions{{< /ui >}} 드롭다운 메뉴를 클릭합니다.
1.  {{< ui >}}Delete Rules{{< /ui >}}를 선택합니다.

### 규칙의 버전 기록 보기 {#see-the-version-history-for-a-rule}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="GitHub OAuth 액세스 토큰 손상에 대한 버전 기록 표시" style="width:80%;" >}}

규칙 버전 기록을 사용하여 다음을 수행할 수 있습니다.
- 탐지 규칙의 이전 버전을 확인하고 시간 경과에 따른 변경 사항을 파악합니다.
- 협업 개선을 위해 누가 변경했는지 확인합니다.
- 버전 간 차이점을 비교하여 수정 사항과 변경의 영향을 분석합니다.

규칙의 버전 기록을 보려면 다음을 수행합니다.
1. [Security Settings][15] 페이지로 이동합니다. 왼쪽 탐색 패널에서 다음을 수행합니다.
    - AAP의 경우: {{< ui >}}App and API Protection{{< /ui >}}을 클릭한 후, {{< ui >}}Detection Rules{{< /ui >}}를 클릭합니다.
    - Cloud Security의 경우: {{< ui >}}Cloud Security{{< /ui >}}를 클릭한 후, {{< ui >}}Threat Detection Rules{{< /ui >}}를 클릭합니다.
    - Cloud SIEM의 경우: {{< ui >}}Cloud SIEM{{< /ui >}}을 클릭한 후, {{< ui >}}Detection Rules{{< /ui >}}를 클릭합니다.
1. 관심 있는 규칙을 클릭한 후, {{< ui >}}Edit rule{{< /ui >}}을 클릭합니다.
1. 규칙 편집기에서 {{< ui >}}Version History{{< /ui >}}를 클릭하여 과거 변경 사항을 확인합니다.
   - 특정 버전을 클릭하여 어떤 변경 사항이 있었는지 확인합니다.
   - {{< ui >}}Open Version Comparison{{< /ui >}}을 클릭하여 버전 간 변경 사항을 확인한 후, 비교하려는 두 버전을 선택합니다. 동일한 패널에서 비교하여 보려면 {{< ui >}}Unified{{< /ui >}}를 클릭합니다.
     - 빨간색으로 강조 표시된 데이터는 수정되거나 제거된 데이터를 나타냅니다.
     - 녹색으로 강조 표시된 데이터는 추가된 데이터를 나타냅니다.

### 편집 권한 제한하기 {#restrict-edit-permissions}

{{% security-products/detection-rules-granular-access %}}

### 생성된 신호 보기 {#view-generated-signals}

[Signals Explorer][1]에서 규칙에 대한 보안 신호를 확인하려면, 세로 점 3개 메뉴를 클릭한 후 {{< ui >}}View generated signals{{< /ui >}}를 선택하세요. 이는 규칙별로 여러 소스에 걸쳐 신호를 상관 분석하거나 규칙 감사를 완료할 때 유용합니다.

### 규칙 내보내기 {#export-a-rule}

규칙 사본을 내보내려면 먼저 규칙을 클릭하여 사이드 패널에서 엽니다. {{< ui >}}Export{{< /ui >}}를 클릭한 다음 {{< ui >}}Export rule to JSON{{< /ui >}} 또는 {{< ui >}}Export rule to Terraform{{< /ui >}}을 선택하세요.

규칙을 일괄 내보낼 수도 있습니다.

1. {{< ui >}}Select Rules{{< /ui >}}를 클릭합니다.
1. 내보내려는 규칙을 선택합니다.
1. {{< ui >}}Bulk Actions{{< /ui >}} 드롭다운 메뉴를 클릭합니다.
1. {{< ui >}}Export to JSON{{< /ui >}} 또는 {{< ui >}}Export to Terraform{{< /ui >}}을 선택합니다.

## 규칙 사용 중단 {#rule-deprecation}

높은 충실도의 신호 품질을 유지하기 위해 모든 탐지 규칙에 대해 정기적인 감사가 수행됩니다. 사용 중단된 규칙은 개선된 규칙으로 대체됩니다.

규칙 사용 중단 프로세스는 다음과 같습니다.

- 규칙에 사용 중단 날짜가 포함된 경고가 표시됩니다. UI에서 경고는 다음 위치에 표시됩니다.
    - 신호 사이드 패널의 {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} 섹션
    - Misconfigurations 사이드 패널(Cloud Security Misconfigurations만 해당)
    - 해당 특정 규칙에 대한 [규칙 편집기][10]
- 규칙이 사용 중단된 후, 규칙이 삭제되기까지 15개월의 기간이 있습니다. 이는 15개월의 신호 보존 기간 때문입니다. 이 기간 동안 UI에서 [규칙을 복제](#clone-a-rule)하여 규칙을 재활성화할 수 있습니다.
- 규칙이 삭제된 후에는 복제하여 재활성화할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /ko/security/default_rules/
[3]: /ko/security/cloud_siem/
[4]: /ko/security/cloud_security_management/misconfigurations/
[5]: /ko/security/workload_protection/
[6]: /ko/security/cloud_security_management/identity_risks/
[7]: /ko/security/application_security/
[8]: /ko/tracing/
[9]: /ko/agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[12]: /ko/security/application_security/policies/custom_rules/
[13]: /ko/security/cloud_security_management/misconfigurations/custom_rules
[14]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/siem/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules