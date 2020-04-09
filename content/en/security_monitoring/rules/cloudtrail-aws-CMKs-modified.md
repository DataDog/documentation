---
title: AWS CMK Deleted or Scheduled for Deletion
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_/
src_img: /images/integrations_logos/amazon_.png
security: compliance
framework: cis
control: cis-3.7

aliases:
- 432-8db-b8b
---

## Overview

### Goal
Detect when a CMK is deleted or scheduled for deletion.

### Strategy
Monitor CloudTrail and detect when CMK rules are being deleted or scheduled for deletion via one of the following API calls:
* [DisableKey][1]
* [ScheduleKeyDeletion][2]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.
[1]: https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html
[2]: https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html
