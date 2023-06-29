---
title: security posture score
synonyms:
  - posture score
  - compliance score
core_product:
  - security
  - cspm
---

The security posture score represents the percentage of your environment that satisfies all of your active Datadog OOTB [Cloud][1] and [Infrastructure][2] detection rules. 

Formula: `(# of evaluation:pass findings) / (total # of findings)`. 

Datadog then weighs this formula by severity: 

- Low severity detection rules have a weighting of "1". 
- Critical severity detection rules have a weighting of "5". 

This means critical severity detection rules impact scores five times more than low severity detection rules to put greater emphasis on the detection rules that pose greater security risk. The score is also normalized to treat all resource types and resource volumes the same (for example, 500 failing containers are weighted the same as three failing S3 buckets in the computed score). This normalization factor allows scores to be comparable across your cloud accounts, without the risk that they are heavily skewed if one account has more containers, or another has fewer storage buckets.

[1]: /security/default_rules/#cat-posture-management-cloud
[2]: /security/default_rules/#cat-posture-management-infra