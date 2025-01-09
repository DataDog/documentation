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
  name: 클라우드 SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: 클라우드 보안 관리
  url: /security/cloud_security_management/
- icon: app-sec
  name: 애플리케이션 보안 관리
  url: /security/application_security/
title: 탐지 규칙
---

{{< product-availability >}}

탐지 규칙은 수집된 로그와 클라우드 구성 모두에 적용되는 조건 논리를 정의합니다. 주어진 시간 내에 규칙에 정의된 사례 최소 1개와 일치하는 경우 보안 신호가 생성됩니다. [Signals Explorer][16]에서 이와 같은 신호를 확인할 수 있습니다.

## 기본 탐지 규칙

Datadog에는 [기본 탐지 규칙][1] 기능이 있어 공격 기술과 잠재적 구성 오류를 잡아낼 수 있습니다. 새로운 탐지 규칙이 릴리즈되면 자동으로 각 계정에 적용되기 때문에 내 구성에 따라 Application Security Management 라이브러리와 에이전트에서 가져올 수 있습니다.

기본 규칙은 다음 보안 제품에서 사용할 수 있습니다.

- [Cloud SIEM][2]에서는 로그 탐지를 사용해 수집된 로그를 실시간으로 분석합니다.
- 클라우드 보안 관리(CSM):
    - [CSM Misconfigurations][4]에서는 클라우드 구성과 인프라스트럭처 구성 탐지 규칙을 사용해 클라우드 환경 상태를 스캔합니다.
    - [CSM Threats][5]에서는 Datadog 에이전트와 탐지 규칙을 사용해 적극적으로 시스템 활동을 모니터링하고 평가합니다.
    - [CSM Identity Risks][14]에서는 탐지 규칙을 사용해 클라우드 인프라스트럭처에 있는 IAM 기반 위험을 탐지합니다.
- [Application Security Management][6](ASM)에서는 Datadog [APM][7], [Datadog 에이전트][8], 탐지 규칙을 활용해 애플리케이션 환경의 위협을 탐지합니다.

## 베타 탐지 규칙

Datadog의 보안 연구팀에서 새 OOTB 보안 탐지 규칙을 지속적으로 추가하고 있습니다. 이는 새 통합이나 기능을 릴리즈할 때 탐지가 잘 되도록 하기 위함입니다. 다만 대규모 대상에 적용할 수 있는 일반 규칙을 만드는 데는 사례를 관찰하는 시간이 필요합니다. 이 시간 동안 Datadog 보안 연구팀에서 표준에 맞지 않는 탐지 규칙을 재정비하거나 삭제할 수 있습니다.

## 커스텀 탐지 규칙

내 환경이나 워크로드에 맞게 규칙을 사용자 지정해야 할 경우가 있습니다. 예를 들어 ASM을 사용할 경우, 내 사업이 운영되는 위치가 아닌 곳에서 일어나는 사용자 활동을 탐지하는 규칙이 필요할 수 있습니다.

[커스텀 규칙을 생성](#create-detection-rules)하려면 기본 규칙을 복제해 편집하거나, 내 규칙을 처음부터 만들 수 있습니다.

## 탐지 규칙 검색 및 필터링

Datadog의 기본 및 커스텀 탐지 규칙을 보려면 [**보안 설정**][15] 페이지로 이동하세요. 규칙은 각 제품(애플리케이션 보안, 클라우드 보안 관리, 클라우드 SIEM)별로 별도의 페이지에 나열되어 있습니다.

검색 상자와 패싯에서 값을 이용해 규칙을 검색하고 필터링할 수 있습니다. 예를 들어 원하는 규칙 유형만 표시하려면 규칙 유형 위에 마우스 커서를 올리고 `only`를 선택하세요. 또 들어오는 문제를 조사하고 심사하고자 할 때 `source`와 `severity`와 같은 패싯별로 필터링할 수 있습니다.

{{< img src="security/default_detection_rules.png" alt="기본값 및 커스텀 Cloud SIEM 탐지 규칙을 보여주는 구성 페이지" width="100%">}}

## 탐지 규칙 생성

커스텀 탐지 규칙을 생성하려면 Detection Rules 페이지 우측 상단 모서리에 있는 **New Rule** 버튼을 클릭하세요. 또는 [기존의 기본 규칙 또는 커스텀 규칙을 복제](#clone-a-rule)하여 템플릿으로 사용할 수도 있습니다.

자세한 지침을 보려면 다음을 참고하세요.

- [Cloud SIEM][3]
- [ASM][11]
- [CSM Misconfigurations][12]
- [CSM Threats][13]

## 탐지 규칙 관리

### 규칙 활성화 또는 비활성화하기

규칙을 활성화 또는 비활성화하려면 규칙 이름 오른쪽으로 스위치를 토글하세요.

규칙을 대량으로 활성화하거나 비활성화할 수도 있습니다.

1. **Select Rules**를 클릭합니다.
1. 활성화하거나 비활성화하고자 하는 규칙을 선택하세요.
1. **Edit Rules** 드롭다운 메뉴를 클릭하세요.
1. **Enable Rules** 또는 **Disable Rules**를 선택하세요.

### 규칙 편집

기본 탐지 규칙 기능에서는 제거 쿼리만 추가하고 편집할 수 있습니다. 쿼리를 업데이트하거나, 트리거를 조정하거나, 알림을 관리하려면 [기본 규칙을 복제](#clone-a-rule)하고 이를 템플릿으로 사용해 커스텀 규칙을 만들 수 있습니다. 그 후 [기본 규칙](#enable-or-disable-rules)을 비활성화하면 됩니다.

- 기본 규칙을 편집하려면 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Edit default rule**을 선택하세요.
- 커스텀 규칙을 편집하려면 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Edit rule**을 선택하세요.

### 규칙 복제

규칙을 복제하려면 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Clone rule**을 선택하세요.

기존 규칙을 복제하여 설정을 약간만 수정해 다른 영역을 탐지에 포함시키고 싶을 때는 규칙 복제 기능이 유용합니다. 예를 들어 로그 탐지 규칙을 복제해 **Threshold**에서 **Anomaly**로 수정하면, 동일한 쿼리와 트리거를 사용해 위협 탐지에 새로운 차원을 추가할 수 있습니다. 

### 규칙 삭제

커스텀 규칙을 삭제하려면 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Delete rule**를 선택하세요.

**참고**: 커스텀 규칙만 삭제할 수 있습니다. 기본 규칙을 삭제하려면 [비활성화](#enable-or-disable-rules)해야 합니다.

### 편집 권한 제한하기

기본적으로 사용자 모두가 탐지 규칙에 액세스할 수 있습니다. 세부 액세스 컨트롤을 사용해 단일 규칙을 편집하는 [역할][10]을 제한하려면 다음을 따르세요.

1. 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Permissions**을 선택하세요.
1. **Restrict Access**를 클릭하세요. 이 대화 상자는 조직 구성원이 기본적으로 **Viewer** 액세스를 갖고 있는지를 업데이트하고 보여줍니다.
1. 드롭다운 메뉴를 사용해 역할, 팀, 사용자를 하나 이상을 선택해 보안 규칙을 편집할 수 있습니다.
1. **추가**를 클릭합니다.
1. **저장**을 클릭합니다.

**참고**: 규칙에 편집 액세스를 유지하려면 저장하기 전에 구성원에게 역할이 최소 한 개가 있어야 합니다.

규칙 액세스를 복원하려면 다음을 따르세요.

1. 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Permissions**을 선택하세요.
1. **Restore Full Access**를 클릭하세요.
1. **저장**을 클릭합니다.

### 생성된 신호 보기

[Signals Explorer][16]에서 규칙 보안 신호를 보려면 세로 점 세 개 메뉴를 클릭하고 **View generated signals**를 선택하세요. 규칙별로 여러 소스에서 신호의 상호 관련성을 파악하거나 규칙 감사를 완료하고자 할 때 유용합니다.

### 규칙을 JSON으로 내보내기

규칙 사본을 JSON으로 내보내려면 규칙에서 세로 점 세 개 메뉴를 클릭하고 **Export as JSON**을 선택하세요.

## 사용되지 않는 규칙

모든 탐지 규칙은 정규 감사를 통해 신호 충실도가 높게 유지됩니다. 더 이상 사용되지 않는 규칙은 향상된 규칙으로 대체됩니다.

사용되지 않는 규칙은 다음 프로세스를 통해 결정됩니다.

1. 규칙에 사용되지 않는 날짜 경고가 있습니다. UI의 다음 위치에서 이 경고가 표시됩니다.
    - 신호 사이드 패널의 **Rule Details > Playbook** 섹션
    - Misconfiguration 사이드 패널(CSM Misconfigurations에서만)
    - 특정 규칙의 경우 [규칙 편집기][15]
2. 규칙이 더 이상 사용되지 않는 경우, 15개월이 지나면 규칙이 삭제됩니다. 이는 신호 보존 기간이 15개월이기 때문입니다. 이 기간 동안 UI에서 [규칙을 복제](#clone-a-rule)하면 규칙을 재활성화할 수 있습니다.
3. 규칙이 삭제된 후에는 복제하여 재활성화할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/
[2]: /ko/security/cloud_siem/
[3]: /ko/security/cloud_siem/log_detection_rules/
[4]: /ko/security/cloud_security_management/misconfigurations/
[5]: /ko/security/threats/
[6]: /ko/security/application_security/
[7]: /ko/tracing/
[8]: /ko/agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /ko/account_management/rbac/
[11]: /ko/security/application_security/threats/custom_rules/
[12]: /ko/security/cloud_security_management/misconfigurations/custom_rules
[13]: /ko/security/threats/workload_security_rules?tab=host#create-custom-rules
[14]: /ko/security/cloud_security_management/identity_risks/
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security