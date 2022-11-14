---
aliases:
- nln-n8g-3mg
- /security_monitoring/default_rules/nln-n8g-3mg
- /security_monitoring/default_rules/appsec-spring4shell-attack-attempts
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
security: attack
source: application-security
title: Spring4shell RCE attempts - CVE-2022-22963
type: security_rules
---

### Goal
Detect attempts to exploit the spring4shell vulnerability (CVE-2022-22963). 

### Strategy
Monitor payload matching the known patterns for the Spring core RCE known as Spring4shell (event rule: #dog-000-004) triggering on Java applications `@language:jvm` and generate an Application Security signal with `Medium` severity.  
A backup condition that looks for existing rules (`@appsec.type:java_code_injection`) that trigger on the key that is used in the exploit (`@appsec.triggers.rule_matches.parameters.key_path:class.module.classLoader.*`).

### Response
Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.

### Remediation
If you are using Spring framework (v5.3.0 to 5.3.17, 5.2.0 to 5.2.19, and older versions) on JDK9+ and packaged it as WAR on Apache Tomcat, there is a high chance that you are vulnerable and need to do one of the following.

* Upgrade to Spring Framework v5.3.18 and v5.2.20
* If you are unable to upgrade, Datadog recommends applying Spring’s [workaround][1] to mitigate the risk of an exploit

[1]: https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement#suggested-workarounds
