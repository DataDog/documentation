---
title: identity health score
synonyms:
  - identity score
  - identity security score
core_product:
  - security
---

The identity health score represents the percentage of your IAM resources that are configured securely.

**Formula**: `(# of CIEM detections passed, weighed by severity) / (total # of CIEM detections run, weighed by severity)`

In the following table, 

For example, if you have five IAM resources (R1-R5) and CSM Identity Risks 


 with CIEM having 3 detections D1 (High - 3), D2 (Medium - 2), D3 (Low - 1) in the following manner:

| Resource | Detections failed | Maximum possible identity health          | Earned identity health        |
|----------|-------------------|-------------------------------------------|-------------------------------|
| R1       | D1, D2            | 3 + 2 + 1 (3 for D1, 2 for D2, 1 for D3)  | 1 (for passing D3)            |
| R2       | D2                | 3 + 2 + 1 (3 for D1, 2 for D2, 1 for D3)  | 3 + 1 (for passing D1 and D3) |
| R3       | D1, D2, D3        | 3 + 2 + 1 (3 for D1, 2 for D2, 1 for D3)  | 0 (for passing none)          |
| R4       | D4                | 3 + 2 + 1  (3 for D1, 2 for D2, 1 for D3) | 3 + 2 (for passing D1 and D2) |
| R5       | -                 | 3 + 2 + 1 (3 for D1, 2 for D2, 1 for D3)  | 3 + 2 + 1 (for passing all)   |
| Total    |                   | 30                                        | 16                            |

In this example, the identity health score = `Earned identity health / Maximum possible identity health (16 / 30 = 53.3%)`.

**Note**: In an actual environment, not all identity risk detections apply to all resources. As a result, the "Maximum possible identity health" depends on the CIEM detections that are run on the resource.

As Datadog adds more CIEM detections or customers change the number of IAM resources, the scores will change. Such changes reflect a change either in Datadog’s coverage or in the customers’ posture.