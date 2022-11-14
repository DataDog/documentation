---
aliases:
- hw9-hzr-a6q
- /security_monitoring/default_rules/hw9-hzr-a6q
- /security_monitoring/default_rules/appsec-log4j-vuln-trigger
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
security: attack
source: application-security
title: Log4shell vulnerability triggered (RCE) - CVE-2021-44228
type: security_rules
---

### Goal
Detect successful exploits of the Log4shell vulnerability (CVE-2021-44228). 

The vulnerability has [CVSS Score: 10.0 CRITICAL][1] and can lead to Remote Code Execution (RCE).

### Strategy
Monitor payloads matching known patterns for CVE-2021-44228 (event rule: #sqr-000-017 ) and lookup for HTTP requests to load a Java class. 

Generate an Application Security signal with `CRITICAL` severity.

### Response
Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.

### Remediation
Considering the targeted application uses a vulnerable version of log4j and the default settings are disabled:
- Update log4j to the latest patched version immediately (>= 2.15.0)
- Disable lookups by setting `formatMsgNoLookups=true`. Only available from log4j >= 2.10 versions
- Use a non-vulnerable or empty implementation of the class `org.apache.logging.log4j.core.lookup.JndiLookup`
- Investigate the logs and the external class that is being called in the attack to check if the attacker successfully executed arbitrary code or not.

[1]: https://nvd.nist.gov/vuln/detail/CVE-2021-44228
