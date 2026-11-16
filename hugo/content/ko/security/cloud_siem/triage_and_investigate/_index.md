---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: 블로그
  text: 클라우드 환경에서의 위험한 행동을 식별합니다.
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: 학습 센터
  text: Cloud SIEM을 사용한 위협 탐지 및 조사
title: 분류 및 조사
---
## 개요 {#overview}

Cloud SIEM은 Security 신호가 생성된 후 Security 조사를 간소화할 수 있는 통합 도구를 제공합니다. 이 도구들은 Security 신호가 트리거될 때 다음의 조사 워크플로를 안내합니다:

- 위협 평가
- 범위 파악
- 영향 결정

[Investigate Security Signals][1]로 시작하여 신호 탐색기를 사용하여 신호를 분류하고 조사하십시오. 심각도, 엔터티 또는 기간별로 필터링하여 무엇이 탐지를 트리거했는지 신속하게 평가하고 즉각적인 주의가 필요한 신호를 결정하십시오.

보다 엔터티 중심적인 접근 방식을 위해 [Entity Risks][2]는 SIEM 신호, Cloud Security 결과 및 ID 위험을 통합하여 사용자나 자산을 나타내는 통합 엔터티 프로필을 생성하고, 여기에 독자적인 위험 점수 모델을 적용합니다.

행위자가 귀하의 생태계 전반에서 어떻게 이동하는지 폭넓게 이해하려면 [Investigator][3] 그래픽 인터페이스를 사용하여 시간 경과에 따른 엔터티와 활동 간의 연결을 매핑하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/investigate_security_signals/
[2]: /ko/security/cloud_siem/entities_and_risk_scoring
[3]: /ko/security/cloud_siem/investigator