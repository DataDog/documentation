---
title: Signal Sciences Flagged an IP
kind: documentation
type: security_rules
parent: signal_sciences
source: signal_sciences
meta_image: /images/integrations_logos/signal_sciences.png
---

## Overview

### **Goal:**
Detect when an IP is flagged by Signal Sciences.

### **Strategy:**
Monitor Signal Sciences events submitted through the Signal Sciences [integration][1] to detect when an IP is flagged. 

### **Triage & Response:**
1. Determine whether the attack is a false positive.
2. Determine whether the attack was successful.
3. Triage the vulnerability, if the attack exploited a vulnerability in the application.[1]: https://app.datadoghq.com/account/settings#integrations/sigsci
