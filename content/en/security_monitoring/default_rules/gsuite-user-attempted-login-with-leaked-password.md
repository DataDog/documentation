---
title: User Attempted Login with Leaked Password
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/gsuite/
src_img: /images/integrations_logos/gsuite.png
security: threat-intel
source: gsuite
scope: gsuite

aliases:
- dc3-7b8-f07
---

## Overview

### Goal
Detect when a user attempts to log in with a password which is known to be compromised.

### Strategy
This rule allows you to monitor this Google Activity API call to detect if an attacker is trying to login with a leaked password: 

* [Leaked password][1]

### Triage & Response
1. Determine which user in your organization owns the compromised password.
2. Contact the user and ensure they rotate the password on Google and any other accounts where they may have reused this password. Ensure the user is aware of strong password guidelines.

[1]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login#account_disabled_password_leak
