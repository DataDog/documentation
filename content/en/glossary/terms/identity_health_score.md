---
title: identity health score
synonyms:
  - identity score
  - identity security score
core_product:
  - security
---

For [Cloud Security Management Identity Risks (CSM Identity Risks)][1], the identity health score represents the percentage of your IAM resources that are configured securely.

**Formula**: `(# of detections passed, weighed by severity) / (total # of detections run, weighed by severity)`

In the following example, there are 3 IAM resources (R1, R2, R3) with high and low detections. CSM Identity Risks assigns a weighting of 3 to a resource for having no high risk detections, and 1 for having no low risk detections.

| Resource | Detections failed | Maximum possible identity health | Earned identity health |
|----------|-------------------|----------------------------------|------------------------|
| R1       | 1 High, 1 Low     | 3 + 1                            | 0                      |
| R2       | 1 Low             | 3 + 1                            | 3                      |
| R3       | 0                 | 3 + 1                            | 4                      |
| Total    |                   | 12                               | 7                      |

The identity health score = `Earned identity health / Maximum possible identity health`. That is, `7 / 12 = 58%`.

This example is a simplification of an environment. In reality, not all identity detections apply to all resources. Thus, the maximum possible identity health depends on the identity detections that are run on the resource.

[1]: /security/identity_risks/