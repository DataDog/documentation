---
description: 시퀀스 탐지 방법의 작동 방식을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하다'
title: 시퀀스
---
## 개요 {#overview}

시퀀스 방법을 사용하면 초기 액세스, 권한 상승, 데이터 유출과 같이 관련된 이벤트의 순차적 패턴을 식별하여 다단계 공격을 탐지할 수 있습니다.

사용자, 호스트 또는 IP 주소와 같은 관련 엔티티에서 정의된 시간 프레임 내에 발생해야 하는 일련의 단계를 정의할 수 있습니다. 각 시퀀스는 여러 로그 또는 신호의 조건을 결합하여 개별 규칙으로는 놓칠 수 있는 연계된 활동을 식별할 수 있습니다.

시퀀스 규칙을 구성하는 방법에 대한 지침은 [규칙 생성][1]을 참조하세요.

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="단계의 미리 보기를 보여주는 시퀀스 편집기 페이지" style="width:100%;" >}}

## 시퀀스 방법의 작동 방식 {#how-the-sequence-method-works}

### 탐지 로직 {#detection-logic}

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="세 단계를 보여주는 시퀀스 편집기 페이지" style="width:100%;" >}}

시퀀스 탐지는 의심스러운 행동의 서로 다른 단계를 나타내도록 정의된 일련의 단계를 평가합니다. 각 단계는 다음에 해당합니다.

- 로그 쿼리의 임계값이나 신호 일치와 같은 조건
- 단계 간의 순서와 시간 제약을 정의하는 전환

모든 단계가 지정된 순서대로 설정된 시간 범위 내에 발생하면 규칙이 트리거됩니다.

### 엔티티 연결 {#linking-entities}

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="그룹화 필드가 강조 표시된 단계를 보여주는 시퀀스 편집기 페이지" style="width:100%;" >}}

단계 시퀀스는 사용자, 계정, IP 주소 및 기타 필드 간에 상관관계를 분석하고 `group by` 필드를 통해 연결된 엔티티를 자동으로 추적할 수 있습니다. 이를 통해 공격자의 경로를 다양한 ID와 시스템에 걸쳐 추적할 수 있습니다.

### 평가 윈도우 {#evaluation-window}

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="평가 윈도우가 강조 표시된 시퀀스 편집기 페이지" style="width:100%;" >}}

단계 간의 각 전환에는 규칙이 다음 단계가 발생할 때까지 대기하는 시간을 결정하는 구성 가능한 평가 윈도우가 있습니다. 예를 들어, `user login from an unusual location`이 발생한 후 20분 이내에 `privilege escalation`이 이어지면 규칙이 트리거될 수 있습니다. 이 경우 사용자가 표준 역할에서 관리자 역할로 변경되었을 수 있습니다.

## 구성 옵션 {#configuration-options}

[시퀀스 탐지 규칙을 생성][1]할 때 다음 옵션을 구성할 수 있습니다.

| 설정 | 설명 | 영향 |
|---------|-------------|--------|
| {{< ui >}}Data type{{< /ui >}}| 각 쿼리가 로그, 신호 또는 규칙을 평가할지 여부를 지정합니다. | 탐지를 위한 데이터 소스를 정의합니다. |
| {{< ui >}}Steps{{< /ui >}}| 쿼리 및 임계값을 포함하여 각 탐지 조건을 정의합니다. | 모니터링할 행동을 결정합니다. |
| {{< ui >}}Step transitions{{< /ui >}}| 단계 간의 순서 및 시간 관계를 정의합니다. | 시퀀스가 신호의 조건을 충족하는 시점을 제어합니다. |
| {{< ui >}}Evaluation window{{< /ui >}}| 한 단계가 발생한 후 다음 단계를 기다릴 시간(초)입니다. | 평가 윈도우가 길수록 탐지 범위는 넓어지지만 노이즈가 더 많이 발생할 수 있습니다. |
| {{< ui >}}Group by fields{{< /ui >}}| 단계 간의 활동을 연결하는 데 사용되는 필드입니다(예: `@usr.email`, `@ip`). | 쿼리 간에 엔티티가 어떻게 연결되는지 결정합니다. |

## 제한 {#limits}

- 시퀀스 탐지는 규칙당 최대 10단계와 총 24시간의 평가 윈도우를 지원합니다.
- 단계는 선형 시퀀스여야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=sequence