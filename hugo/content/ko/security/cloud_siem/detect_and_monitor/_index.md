---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM을 사용하여 코드로 탐지 빌드, 테스트 및 확장하기
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: 블로그
  text: Datadog Cloud SIEM MITRE ATT&CK Map을 사용하여 탐지 범위 강화를 위한 격차 식별하기
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에 대한 충분한 보안 적용 범위 구축
- link: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
  tag: 블로그
  text: Datadog Cloud SIEM으로 사용자 지정 탐지 규칙을 생성하기 위한 모범 사례
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: 학습 센터
  text: Cloud SIEM을 사용한 위협 탐지 및 조사
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: 학습 센터
  text: 사용자 지정 Cloud SIEM 탐지 규칙 작성
title: 탐지 및 모니터링
---
## 개요 {#overview}

Datadog 텔레메트리를 모니터링하고 [기본 제공 탐지 규칙](#out-of-the-box-detection-rules)을 사용하거나 [사용자 지정 규칙을 생성하여](#custom-detection-rules) 위협을 탐지하세요. 위협이 탐지되면 보안 신호가 생성됩니다. 또한 [억제](#suppressions)를 추가하여 탐지 규칙을 세부 조정하고 특정 조건에서는 보안 신호가 생성되지 않도록 할 수 있습니다. 이렇게 하면 생성되는 보안 신호의 정확성과 관련성을 높일 수 있습니다.

{{< img src="security/security_monitoring/detection_rules/detection_rule_side_panel.png" alt="신호가 발생하는 조건을 보여주는 탐지 규칙의 사이드 패널" style="width:100%;" >}}

## 탐지 규칙 {#detection-rules}

### 기본 제공 탐지 규칙 {#out-of-the-box-detection-rules}

Cloud SIEM은 광범위한 [OOTB 탐지 규칙][1] 목록을 제공합니다. Cloud SIEM 콘텐츠 팩을 활성화하고 구성하면 OOTB 탐지 규칙이 자동으로 로그, Audit Trail 이벤트 및 Event Management의 이벤트를 분석하기 시작합니다.

OOTB 탐지 규칙을 편집하고 다음 작업을 수행할 수 있습니다.

- 규칙 이름 변경
- 쿼리 확장. 원본 쿼리는 편집할 수 없지만 사용자 지정 쿼리를 추가할 수는 있습니다.
- {{< ui >}}Set conditions{{< /ui >}} 섹션에서 중증도 설정 변경
- 플레이북 수정

### 사용자 지정 탐지 규칙 {#custom-detection-rules}

기본 제공(OOTB) 탐지 규칙은 대부분의 위협 시나리오를 다루지만 특정 사용 사례에 맞춰 사용자 지정 탐지 규칙을 생성할 수도 있습니다. 사용자 지정 탐지 규칙의 경우 로그 검색 구문을 사용하여 로그 쿼리를 작성하고 결합함으로써 모니터링하려는 개별 서비스, 계정 또는 이벤트를 대상으로 지정할 수 있습니다. 또한 IP 주소의 지리적 위치나 HTTP 요청의 상태 코드와 같은 정보로 해당 쿼리를 강화할 수 있습니다.

쿼리와 일치하는 로그에 대해 위협 여부와 보안 신호 생성 여부를 결정하는 조건을 설정하고 위협의 중증도를 지정할 수 있습니다. 보안 신호는 위협에 대한 세부 정보를 제공하며, 보안 정책 및 수정 단계와 같은 정보를 포함하는 사용자 지정 가능한 플레이북도 제공합니다.

자세한 내용은 [사용자 지정 탐지 규칙][2]을 참조하세요.

### 규칙 지원 중단 {#rule-deprecation}

높은 정확도의 보안 신호 품질을 유지하기 위해 모든 기본 제공 탐지 규칙을 정기적으로 감사합니다. 지원이 중단된 규칙은 개선된 규칙으로 대체됩니다.

규칙 사용 중단 프로세스는 다음과 같습니다.

1. 규칙에 지원 중단 날짜가 포함된 경고가 표시됩니다. UI에서 경고는 다음 위치에 표시됩니다.
    - 신호 사이드 패널의 {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} 섹션
    - 해당 특정 규칙에 대한 [규칙 편집기][3]
2. 규칙의 지원이 중단된 후 삭제되기까지 15개월의 유예 기간이 있습니다. 이는 15개월의 신호 보존 기간 때문입니다. 이 기간 동안 UI에서 [규칙 복제][3]를 통해 규칙을 재활성화할 수 있습니다.
3. 규칙이 삭제된 후에는 복제하여 재활성화할 수 없습니다.

## 억제 {#suppressions}

보안 신호는 인프라에 대한 잠재적 위협을 알리지만 오탐이 발생할 수도 있습니다. 예를 들어, 애플리케이션 부하 테스트로 인해 요청이 갑자기 급증하면 많은 보안 신호가 발생할 수 있습니다. 이러한 시나리오에서 오탐을 줄이려면 탐지 규칙에 억제 쿼리를 정의하여 보안 신호가 생성되지 않도록 할 수 있습니다. 또한 억제 규칙을 생성하여 여러 탐지 규칙에 걸쳐 일반적인 억제 조건을 설정할 수 있습니다.

자세한 내용은 [억제][4]를 참조하세요.

## 동적 중증도 {#dynamic-severity}

보안 신호가 영향을 미치는 자산에 따라 중증도를 조정할 수 있습니다. 중증도 수준을 사용자 지정하고, 사용자 지정 태그를 적용하며, 변경 사항을 특정 규칙에만 적용할 수 있습니다.

자세한 내용은 [동적 중증도][6]를 참조하세요.

## MITRE ATT&CK 맵 {#mitre-attck-map}

탐지 규칙을 설정한 후 Cloud SIEM [MITRE ATT&CK Map][5]을 사용하여 MITRE ATT&CK 프레임워크에 따라 규칙을 탐색하고 시각화하여 공격자 기법을 파악하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/#cat-cloud-siem-log-detection
[2]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /ko/security/detection_rules/#clone-a-rule
[4]: /ko/security/cloud_siem/detect_and_monitor/suppressions
[5]: /ko/security/cloud_siem/detection_rules/mitre_attack_map/
[6]: /ko/security/cloud_siem/detect_and_monitor/dynamic_severity