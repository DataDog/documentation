---
title: AWS Root Account Activity
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.3
source: cloudtrail
scope: amazon
meta_image: /images/integrations_logos/amazon_web_services.png
aliases:
- 5ee-d08-7fa
---

## Overview

### Goal
Detect AWS root user activity. 

### Strategy
Monitor CloudTrail and detect when any `@userIdentity.type` has a value of `Root`, but is not invoked by an AWS service.

### Triage & Response
1. Reach out to the user to determine if the login was legitimate. 
2. If the login wasn't legitimate, rotate the credentials, enable 2FA, and open an investigation. 

For best practices, check out the [AWS Root Account Best Practices][1] documentation.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
