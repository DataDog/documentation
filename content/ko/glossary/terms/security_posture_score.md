---
core_product:
- 보안
- csm
synonyms:
- posture score
- compliance score
title: security posture score
---

{{< jqmath-vanilla >}}

[Cloud Security Management Misconfigurations][3]에 사용할 수 있는 보안 상태 점수는 기본적으로 사용 가능한 모든 활성 Datadog [클라우드][1] 및 [인프라스트럭처][2] 규정 준수 규칙을 충족하는 환경의 비율을 나타냅니다.

**수식**:

$${{({\text"Pcrictical"/\text"Pcritical + Fcritical"})^2 *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}}/{8+6+3+2+1}$$

- P는 pass로 평가된 잘못된 구성의 수입니다.
- F는 fail로 평가된 잘못된 구성의 수입니다.

이 수식은 잘못된 구성의 심각도와 각 심각도에 대한 잘못된 구성 pass/fail 수를 고려하는 가중치 비율을 사용합니다. `scored:true` 태그가 있는 규칙과 잘못된 구성만 계산에 포함됩니다.

특정 심각도에 대해 잘못된 구성이 없으면 해당 심각도는 계산에 포함되지 않습니다. 예를 들어 심각한 구성 오류가 없는 경우 분모는 6+3+2+1이 됩니다(중요한 경우 8 제외).

근본적인 문제를 해결하거나 영향을 받은 리소스에 대한 잘못된 구성을 해제함으로써 상태 점수를 높일 수 있습니다. 이는 매시간 업데이트됩니다.

[1]: /ko/security/default_rules/#cat-posture-management-cloud
[2]: /ko/security/default_rules/#cat-posture-management-infra
[3]: /ko/security/cloud_security_management/misconfigurations/