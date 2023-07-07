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

In the following table, there are five IAM resources (R1-R5) with high, medium, and low risk detections. CSM Identity Risks assigns a weighting of 3 for having no high risk detections, 2 for having no medium risk detections, and 1 for having no low risk detections.

| Resource | Detections failed       | Maximum possible identity health | Earned identity health              |
|----------|-------------------------|----------------------------------|-------------------------------------|
| R1       | 1 High, 1 Medium        | 3 + 2 + 1                        | 1 (for passing Low)                 |
| R2       | 1 Medium                | 3 + 2 + 1                        | 3 + 1 (for passing High and Low)    |
| R3       | 1 High, 1 Medium, 1 Low | 3 + 2 + 1                        | 0 (for passing none)                |
| R4       | 1 Low                   | 3 + 2 + 1                        | 3 + 2 (for passing High and Medium) |
| R5       | 0                       | 3 + 2 + 1                        | 3 + 2 + 1 (for passing all)         |
| Total    |                         | 30                               | 16                                  |

In this example, the identity health score = `Earned identity health / Maximum possible identity health`, or to put it another way, `16 / 30 = 53.3%`.

**Notes**: 

- The numbers in the table are for example purposes only.
- In an actual environment, not all identity risk detections apply to all resources. As a result, the maximum possible identity health depends on the CIEM detections that are run on the resource.