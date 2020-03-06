---
title: User Attempted Login with Leaked Password
kind: documentation
type: security_rules
parent: gsuite
security: threat-intel
source: gsuite
meta_image: /images/integrations_logos/gsuite.png
---
## **Goal:**
Detect when an a user attempts to login with a password which is known to be compromise.

## **Strategy:**
Monitor Google Activity API for the following login audit event 

* [Leaked password][1]

## **Triage & Response:**
1. Determine who the user was whose password was leaked.
2. Contact the user and ensure they rotate the password on Google and any other accounts where they may have reused this password. Ensure the user is aware of strong password guidelines.[1]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login#account_disabled_password_leak
