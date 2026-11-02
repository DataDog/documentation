---
aliases:
- /ko/security/cloud_siem/detection_rules/attack_map
- /ko/security/cloud_siem/detection_rules/mitre_attack_map
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: 문서
  text: 사용자 지정 탐지 규칙 생성
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: 블로그
  text: Datadog Cloud SIEM MITRE ATT&CK 맵을 사용하여 탐지 적용 범위 강화를 위한 격차 식별하기
title: MITRE ATT&CK 맵
---
## 개요 {#overview}

<div class="alert alert-danger">MITRE ATT&CK Map은 <a href="https://attack.mitre.org/matrices/enterprise/">MITRE ATT&CK Enterprise</a></div>에 대해서만 다룹니다.

MITRE ATT&CK 프레임워크는 특정 위협 모델 및 방법론을 개발하는 데 사용되는 지식 기반입니다. Cloud SIEM MITRE ATT&CK 맵을 사용하여 Datadog의 기본 제공 규칙 및 사용자 지정 탐지 규칙을 기준으로 MITRE ATT&CK 프레임워크를 탐색하고 시각화할 수 있습니다. MITRE ATT&CK 맵은 탐지 규칙 밀도를 히트 맵으로 표시하여 공격자 기법을 파악할 수 있도록 합니다. 보안 팀은 히트 맵을 사용하여 조직이나 팀과 관련된 적용 범위의 격차를 평가하고 탐지 규칙 방어 개선의 우선순위를 지정할 수 있습니다.

## MITRE ATT&CK 맵에서 탐지 규칙 조회 {#view-detection-rules-in-the-mitre-attck-map}

MITRE ATT&CK 프레임워크를 기준으로 탐지 규칙을 조회하려면 다음 단계를 따르세요.
1. [탐지 규칙][1] 페이지로 이동합니다.
1. {{< ui >}}Rules List{{< /ui >}} 옆에 있는 {{< ui >}}MITRE ATT&CK Map{{< /ui >}} 버튼을 클릭합니다.
1.  페이지 왼쪽 하단에 있는 크기 조절 버튼을 전환하여 확장 보기와 축소 보기 간에 전환합니다.

맵의 기본 보기에는 활성 소스에 대한 Datadog 기본 제공 규칙 및 사용자 지정 규칙이 다양한 공격 기법별로 분류되어 모두 표시됩니다. 활성 소스는 Cloud SIEM 인덱스에서 발견 및 분석된 로그의 소스입니다.

**참고**: [Cloud SIEM Legacy][5]의 경우 [보안 필터][2]가 설정되지 않은 한 Cloud SIEM이 수집된 모든 로그를 분석합니다.

모든 소스에 대한 맵을 조회하려면 {{< ui >}}Visualize{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}All Sources{{< /ui >}}를 선택합니다. 이렇게 하면 로그에서 위협을 탐지하는 데 현재 사용되지 않는 규칙을 포함하여 모든 기본 제공 규칙이 표시됩니다.

규칙 밀도 버튼을 클릭하면 특정 수의 규칙에 대한 맵을 시각화할 수 있습니다. 예를 들어 {{< ui >}}High 7+{{< /ui >}}를 클릭하면 활성화된 규칙이 7개를 초과하는 타일만 맵에 표시됩니다.

### 공격자 기법 정보 및 관련 규칙 조회 {#view-an-attacker-techniques-information-and-related-rules}

기법과 해당 기법을 모니터링하는 규칙에 대한 자세한 정보를 조회하려면 다음 단계를 따르세요.

1. [MITRE ATT&CK 맵][3] 페이지에서 기법 타일을 클릭합니다.
1. 이 기법에 대한 사용자 지정 규칙을 만들려면 {{< ui >}}Create Custom Rule{{< /ui >}}을 클릭합니다. 사용자 지정 규칙 생성에 대한 자세한 내용은 [탐지 규칙][4]을 참조하세요. **참고**: 사용자 지정 규칙을 활성 소스 내에 표시하려면 탐지 규칙에 적절한 소스 태그가 정의되어 있어야 합니다.
1. {{< ui >}}Rules monitoring this Technique{{< /ui >}} 섹션에서 다음 작업을 수행할 수 있습니다.
	1. 검색 쿼리를 입력하여 특정 규칙으로 필터링합니다.
  1. 생성 날짜, 규칙 유형, 규칙 이름, 소스 또는 가장 높은 심각도별로 정렬합니다.
  1. {{< ui >}}Show deprecated rules{{< /ui >}}를 전환하여 이 기법에 대해 지원이 중단된 규칙을 확인합니다.

### 사용자 지정 규칙에 공격자 기법 및 전술 태그 추가 {#add-attacker-technique-and-tactic-tags-to-custom-rules}

사용자 지정 규칙은 규칙 편집기에서 올바른 MITRE 전술 및 기법 태그가 둘 다 지정된 경우에만 맵에 표시됩니다. 전술과 기법 역시 올바르게 쌍을 이루어야 합니다. 올바른 형식과 쌍을 사용하지 않으면 검색 창을 사용하여 규칙을 필터링할 때 해당 규칙이 맵에 표시되지 않습니다.

다음은 사용자 지정 규칙에 태그를 지정할 때 사용해야 하는 형식과 전술 및 기법 태그의 올바른 쌍에 대한 예시입니다.

- `tactic:<tactic number>-<tactic name>`
    - 예: `tactic:TA0001-Initial-Access`
- `technique:<technique number>-<technique name>`
    - 예: `technique:T1566-Phishing`

다음 서식 세부 정보를 참고하세요.
- 태그 접두사(`tactic` 또는 `technique`)는 **소문자여야 함**
- 기법 번호는 대소문자를 구분하지 않음
    - 예: `TA0001` 또는 `ta0001`
- 대시와 밑줄은 서로 바꿔 사용할 수 있음
    - 예: `technique:T1566-Phishing` 또는 `technique:T1566_Phishing`

**참고**: 전술 및 기법은 [MITRE ATT&CK 맵][3] 페이지에 명시된 MITRE ATT&CK 버전을 기반으로 해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules
[2]: /ko/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/
[3]: https://app.datadoghq.com/security/siem/rules?query=product=siem&sort=date&viz=attck-map
[4]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold
[5]: /ko/security/cloud_siem/guide/determine-cloud-siem-product/