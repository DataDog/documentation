---
aliases:
- ypt-ydt-obj
- /security_monitoring/default_rules/ypt-ydt-obj
- /security_monitoring/default_rules/spring-rce-http-get-request-successful
disable_edit: true
integration_id: multi log sources
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: multi log sources
tactic: TA0003-persistence
technique: T1505-server-software-component
title: Spring RCE post-exploitation activity attempted
type: security_rules
---

## Goal
This rule detects attempted post-exploitation activity of [CVE-2022-22965][1] with an HTTP GET parameter.

## Strategy
This rule looks for `@http.url_details.path` = <RANDOM_FILE_NAME>.jsp, `@http.url_details.queryString.pwd` = `*`, and `@http.url_details.queryString.cmd` = <RANDOM_CMD_EXECUTION>. If found, it indicates web shell activity observed with successful Spring RCE exploitation. 

## Triage and response
Check your host to see if the {{@http.url_details.queryString.cmd}} command ran successfully. If so,
   * Refer to your company's Incident Response process since this is detection post-exploitation activity.
   * Refer to the vendor's [advisory][2] for remediation of this Remote Code Execution (RCE) vulnerability.

## Changelog
- 06 June 2022 - The severity has been lowered due to rule fidelity on just log telemetry.
- 31 March 2022 - Rule added in response to [CVE-2022-22965][1]

[1]: https://tanzu.vmware.com/security/cve-2022-22965
[2]: https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement
