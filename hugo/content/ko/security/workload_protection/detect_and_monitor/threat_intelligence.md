---
description: Datadog이 선별한 위협 인텔리전스로 Workload Protection Agent 이벤트를 보강하거나 자체 데이터베이스를
  가져오세요.
disable_toc: false
further_reading:
- link: /security/threat_intelligence/
  tag: 설명서
  text: Datadog의 위협 인텔리전스
- link: /security/detection_rules/
  tag: 설명서
  text: 탐지 규칙
title: 위협 인텔리전스
---
Workload Protection은 Datadog이 선별한 [위협 인텔리전스][2]로 [Agent 이벤트][1]를 보강합니다. 이 보강 작업은 IP 주소 및 파일 해시와 같이 호스트와 컨테이너에서 관찰된 엔터티에 평판 컨텍스트를 추가하여 이벤트가 알려진 악성 캠페인의 일부인지 평가하는 데 도움을 줍니다.

모든 Datadog 보안 제품에 적용되는 일반적인 개념, 소스, 카테고리, 의도 및 수명 주기 정보는 [위협 인텔리전스][2]를 참조하세요. 이 페이지에서는 Workload Protection과 관련된 세부 정보를 다룹니다.

## Workload Protection을 위한 엔터티 유형 {#entity-types-for-workload-protection}

Workload Protection은 다음 [엔터티 유형][3]을 지원합니다.

- IP 주소
- 도메인
- 파일 해시: `SHA1`, `SHA256` 및 `ssdeep`

`ssdeep` 해시는 퍼지 매칭을 지원하며, 이는 알려진 악성 파일과 동일하지는 않지만 유사한 파일을 식별하는 데 도움이 됩니다.

## Workload Protection에서 지원하는 카테고리 {#supported-categories-for-workload-protection}

Workload Protection은 다음의 위협 인텔리전스 카테고리를 지원합니다.

- `malware`
- `exploitation`
- `cryptomining`
- `supply_chain_attack_infrastructure`
- `custom`

Datadog 보안 제품 전반에 적용되는 카테고리 정의 및 인텐트는 [위협 인텔리전스 카테고리][5]를 참조하세요.

## 탐지 규칙에서 위협 인텔리전스 사용하기 {#using-threat-intelligence-in-detection-rules}

Workload Protection의 [탐지 규칙][4]은 검색 쿼리나 규칙 조건에서 카테고리(`@threat_intel.results.category`) 및 인텐트(`@threat_intel.results.intention`)와 같은 위협 인텔리전스 키를 참조할 수 있습니다. 예를 들어, 워크로드에서 실행된 파일이 `malware`로 분류되고 의도가 `malicious`인 알려진 악성 코드 샘플의 해시와 일치할 때 규칙이 트리거될 수 있습니다.

<div class="alert alert-info">위협 인텔리전스 소스 및 카테고리는 구성할 수 없습니다.</div>

## 위협 인텔리전스 패싯 {#threat-intelligence-facets}

위협 인텔리전스 [소스, 카테고리 및 인텐트][6]를 패싯 및 필터로 사용할 수 있습니다. [Agent Events Explorer][1]의 일치하는 이벤트와 결과로 생성된 [보안 신호][7]에서 위협 인텔리전스 보강 정보를 확인할 수 있습니다.

## 보안 신호에 대한 위협 인텔리전스 {#threat-intelligence-on-security-signals}

Agent 이벤트가 위협 인텔리전스 지표와 일치하면 Workload Protection은 일치하는 엔터티를 소스, 범주 및 인텐트와 함께 표시하는 보안 신호를 생성합니다.

{{< img src="security/workload_protection/detect_and_monitor/threat_intelligence_signal.png" alt="위협 인텔리전스 보강 세부 정보를 표시하는 Workload Protection 보안 신호" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/workload_protection/investigate_and_triage/agent_events
[2]: /ko/security/threat_intelligence/
[3]: /ko/security/threat_intelligence/#entity-types
[4]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /ko/security/threat_intelligence/#threat-intelligence-categories
[6]: /ko/security/threat_intelligence/#threat-intelligence-facets
[7]: /ko/security/workload_protection/investigate_and_triage/security_signals
[8]: /ko/security/workload_protection/investigate_and_triage/security_signals/investigate#correlated-events