---
title: AWS Root Account Activity
kind: documentation
type: security_rules
parent: cloudtrail
security: compliance
source: cloudtrail
service: amazon
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---

## Overview

### **Goal:**
Detect when any account activity is detected by an AWS root user

### **Strategy:**
Monitor CloudTrail and detect when any `@userIdentity.type` is equal to `Root`, but is not invoked by an AWS service.

### **Triage & Response:**
1. Determine who used the root user credentials (username and password or access key).
2. If the activity was not legitimate, open an investigation, rotate the credentials, enable 2FA (if not already enabled), and see what activity occurred

**[Root Account Best Practices][1]**

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
