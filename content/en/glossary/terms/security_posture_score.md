---
title: security posture score
synonyms:
  - posture score
  - compliance score
core_product:
  - security
  - csm
---

{{< jqmath-vanilla >}}

For [Cloud Security Management Misconfigurations][3], the security posture score represents the percentage of your environment that satisfies all of your active Datadog out-of-the-box [Cloud][1] and [Infrastructure][2] compliance rules.

**Formula**:

$${({\text"Pcrictical"/\text"Pcritical + Fcritical"}^2) *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}$$

- P is the number of misconfigurations that evaluate to pass.
- F is the number of misconfigurations that evaluate to fail.

The formula uses a weighted ratio that considers the severity of the misconfiguration and the number of pass/fail misconfigurations for each severity. Only rules and misconfigurations that have the tag `scored:true` are included in the calculation.

You can improve your score by remediating misconfigurations, either by fixing the underlying issues or by muting the misconfiguration for the impacted resource. The posture score is updated every hour.

[1]: /security/default_rules/#cat-posture-management-cloud
[2]: /security/default_rules/#cat-posture-management-infra
[3]: /security/misconfigurations/