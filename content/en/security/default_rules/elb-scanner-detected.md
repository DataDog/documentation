---
aliases:
- 088-a06-67c
- /security_monitoring/default_rules/088-a06-67c
- /security_monitoring/default_rules/elb-scanner-detected
disable_edit: true
integration_id: elb
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: elb
security: attack
source: elb
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: AWS ELB HTTP requests from security scanner
type: security_rules
---

## Goal
Detect when a web application is being scanned. This will identify attacker IP addresses who are not trying to hide their attempt to attack your system. More advanced hackers will use an inconspicuous `@http.useragent`. 

## Strategy
Inspect the user agent in the HTTP headers to determine if an IP is scanning your application using an HTTP header from [darkqusar][1]'s [gist][2]. The detection does this using 2 cases:
* Case 1: The scanner is accessing several unique `@http.url_details.path`s and receiving `@http.status_code`s in the range of `200 TO 299`
* Case 2: The scanner is accessing several unique `@http.url_details.path`s and receiving `@http.status_code`s in the range of `400 TO 499`

## Triage and response
1. Determine if this IP: {{@network.client.ip}} is making authenticated requests to the application.
2. Check if these authentication requests are successful.
   * If they are successful, change the status of the signal to `UNDER REVIEW` and begin your company's incident response plan.
   * If they are not successful, `ARCHIVE` the signal.

**NOTE:** Your organization should tune out user agents that are valid and triggering this signal. To do this, see our [Fine-tune security signals to reduce noise][3] blog.

## Changelog
4 April 2022 - Update rule cases and signal message.

[1]: https://gist.github.com/darkquasar
[2]: https://gist.github.com/darkquasar/84fb2cec6cc1668795bd97c02302d380
[3]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/#fine-tune-security-signals-to-reduce-noise
