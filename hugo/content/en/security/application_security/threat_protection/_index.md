---
title: Threat Protection
description: Detect, investigate, and block application and API attacks in real time with Threat Protection in App and API Protection.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-exploit-prevention/"
  tag: "Blog"
  text: "Protect your applications from zero-day attacks with Datadog Exploit Prevention"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

Use Threat Protection in [App and API Protection][1] (AAP) to detect attacks against your applications and APIs, perform investigations, and block malicious traffic in real time.

To get started, [set up AAP][2] on your services so they report security traces. AAP then detects threats from your live application traffic and lets you respond to them.

## How Threat Protection works

Threat Protection brings together several capabilities, all built on live application traffic data. With Threat Protection, you can:

- Detect and investigate threats with [Security Signals][3]. Datadog creates a security signal when it detects a threat from a detection rule, so you can triage, filter, and investigate attacks in the Signals Explorer.
- Block attacks and attackers with [Policies][4]. Block malicious IP addresses and users in real time from the Datadog UI, manually or through automated rules.
- Stop exploit attempts in code with [Exploit Prevention][5]. Detect and block attempts to exploit vulnerabilities, including zero-day attacks, from within the running application.
- Extend protection to the perimeter with [WAF Integrations][6]. Combine in-app protection with edge defenses such as AWS WAF for a defense-in-depth approach.
- Defend user accounts with [Account Takeover Protection][7]. Detect and mitigate account takeover attacks, such as credential stuffing, and disable compromised users.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/
[2]: /security/application_security/setup/
[3]: /security/application_security/threat_protection/security_signals/
[4]: /security/application_security/threat_protection/policies/
[5]: /security/application_security/threat_protection/exploit-prevention/
[6]: /security/application_security/threat_protection/waf-integration/
[7]: /security/application_security/threat_protection/account_takeover_protection/
