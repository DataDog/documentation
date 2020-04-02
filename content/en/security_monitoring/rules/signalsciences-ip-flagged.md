---
title: Signal Sciences Flagged an IP
kind: documentation
type: security_rules
disable_edit: true
src_img: /images/integrations_logos/sigsci.png
source: signal_sciences

---

## Overview

### **Goal:**
Detect when an IP is flagged by Signal Sciences.

### **Strategy:**
Monitor Signal Sciences events submitted through the Signal Sciences [integration][1] to detect when an IP is flagged. 

### **Triage & Response:**
1. Determine whether the attack is a false positive.
2. Determine whether the attack was successful.
3. Triage the vulnerability, if the attack exploited a vulnerability in the application.

[1]: https://app.datadoghq.com/account/settings#integrations/sigsci
