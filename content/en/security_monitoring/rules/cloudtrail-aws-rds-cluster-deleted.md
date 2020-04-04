---
title: AWS RDS Cluster Deleted
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: attack
tactic: TA0040-impact
technique: T1485-data-destruction
source: cloudtrail
scope: amazon
meta_image: /images/integrations_logos/amazon_web_services.png
---

## Overview

### **Goal:**
Detect when an attacker is destroying a RDS Cluster.

### **Strategy:**
Monitor CloudTrail and detect when a RDS cluster is deleted via the following API call:

* [DeleteDBCluster][1]

### **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/cli/latest/reference/rds/delete-db-cluster.html
