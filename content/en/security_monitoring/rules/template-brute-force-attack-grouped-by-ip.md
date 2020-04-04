---
title: TEMPLATE - Brute Force Attack Grouped By IP
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_/
src_img: /images/integrations_logos/amazon_.png
security: attack
tactic: TA0006-credential-access
technique: T1110-brute-force

---

## Overview

### **Goal:**
Detect Account Take Over (ATO) through brute force attempts

### **Strategy:**
To determine a successful attempt: Detect a high amount of failed logins and at least one successful login for a given IP address. This will generate a HIGH severity signal.
To determine an attempt: Detect a high amount of failed logins for a given IP address. This will generate an INFO severity signal.

### **Triage & Response:**
1. Inspect the logs to see if this was a valid login attempt
2. See if 2FA was authenticated
3. If the user was compromised, rotate user credentials.