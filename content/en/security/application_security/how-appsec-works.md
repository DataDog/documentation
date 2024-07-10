---
title: How Application Security Management Works in Datadog
aliases:
  - /security_platform/guide/how-appsec-works/
  - /security_platform/application_security/how-appsec-works/
  - /security/guide/how-appsec-works/
further_reading:
- link: "/security/application_security/enabling/compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "/security/application_security/enabling/"
  tag: "Documentation"
  text: "Enable Application Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Application Security Management (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities or abuse the business logic of your application, and into any bad actors targeting your systems.

In addition, ASM detects the risks built into your applications, for example through vulnerable libraries and dependencies the application uses at runtime.

Datadog APM records information, called traces, about each application request. Datadog ASM uses the same tracing libraries as APM to monitor your traffic. ASM flags attack attempts based on security traces that match known attack patterns, or [tags business logic information][25]. Security signals are automatically created when Datadog detects application attacks or business logic abuse impacting your services. The signals identify meaningful threats for your review instead of assessing each individual attack attempt. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. Because ASM is embedded in the application, it has access to trace data, making it more effective at pinpointing and classifying threats. Datadog ASM leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal-to-noise ratio, lowering false positives.

### Identify services exposed to application attacks

Datadog ASM [Threat Management][1] uses the information APM is already collecting, and flags traces containing attack attempts. Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Service Catalog][2], [Service Page][3], [Traces][4]).

Because APM collects a sample of your application traffic, enabling ASM in the tracing library is necessary to effectively monitor and protect your services.

Datadog Threat Monitoring and Detection identifies bad actors by collecting client IP addresses and manually-added user tags on all requests.

<div class="alert alert-info"><strong>1-Click Enablement</strong><br>
If your service is running with <a href="/agent/remote_config/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can <a href="/security/application_security/enabling/">enable ASM</a> from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

### Identify vulnerable services

Datadog [Software Composition Analysis][5] uses various known vulnerability data sources related to open source software libraries, plus information provided by the Datadog security research team, to match the libraries your application depends on at runtime with their potential vulnerabilities, and to make remediation recommendations.

## Compatibility

For Datadog ASM to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][6]. ASM uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog ASM are specific to runtime language. Check to see if your language is supported in the [ASM prerequisites][7].

### Serverless monitoring

Datadog ASM for AWS Lambda provides deep visibility into attackers targeting your functions. With distributed tracing providing a context-rich picture of the attack, you can assess the impact and remediate the threat effectively.

Read [Enabling ASM for Serverless][8] for information on setting it up.

## Performance

Datadog ASM uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. When APM is enabled, the Datadog library generates distributed traces. Datadog ASM flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data sampling and retention

In the tracing library, Datadog ASM collects all traces that include security data. A default [retention filter][9] ensures the retention of all security-related traces in the Datadog platform.

Data for security traces is kept for 90 days. The underlying trace data is kept for 15 days.

## Data privacy

By default, ASM collects information from security traces to help you understand why the request was flagged as suspicious. Before sending the data, ASM scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag. This indicates that the request was suspicious, but that the request data could not be collected because of data security concerns.

Here are some examples of data that is flagged as sensitive by default:
* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

To configure the information redacted by ASM, refer to the [data security configuration][17]

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][12] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][13], a security signal is generated in Datadog.

**Automatic Threat Patterns Updates:** If your service is running with [an Agent with Remote Configuration enabled and a tracing library version that supports it][26] , the threat patterns being used to monitor your service are automatically updated whenever Datadog publishes updates.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Built-in protection

{{% asm-protect %}}


## Attack attempt qualification

Leveraging distributed tracing information, attacks attempts are qualified as safe, unknown, or harmful.
* Attack attempts qualified as safe cannot breach your application, for example, when a PHP injection attack targets a service written in Java.
* An unknown qualification is decided when there is not enough information to make a definitive judgement about the attack's probability of success.
* A harmful qualification is highlighted when there is evidence that a code level vulnerability has been found by the attacker.



## Threat monitoring coverage


Datadog ASM includes over 100 attack signatures that help protect against [many different kinds of attacks][14], including, but not limited to, the following categories:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Server-side Request Forgery (SSRF)

## Built-in vulnerability detection

Datadog ASM offers built-in detection capabilities that warn you about the vulnerabilities detected in your open source dependencies. Details of that information are shown in the [Vulnerability Explorer][15], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

For more information, read [Software Composition Analysis][5].

## API security

<div class="alert alert-info">API security is in private beta.</div>

Datadog Application Security Management (ASM) provides visibility into threats targeting your APIs. Use the [API Catalog][27] to monitor API health and performance metrics, where you can view attacks targeting your APIs. This view includes the attacker's IP and authentication information, as well as request headers showing details about how the attack was formed. Using both ASM and API management, you can maintain a comprehensive view of your API attack surface, and respond to mitigate threats.

## How Datadog ASM protects against Log4Shell

Datadog ASM identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][16], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/
[2]: /tracing/service_catalog/#security-view
[3]: /tracing/services/service_page/#security
[4]: /tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /security/application_security/software_composition_analysis/
[6]: /tracing/trace_collection/
[7]: /security/application_security/enabling/#prerequisites
[8]: /security/application_security/enabling/serverless/
[9]: /tracing/trace_pipeline/trace_retention/
[10]: /tracing/configure_data_security/?tab=http
[11]: /security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /security/cloud_siem/
[17]: /security/application_security/threats/library_configuration/#data-security-considerations
[25]: /security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /agent/remote_config/#enabling-remote-configuration
[27]: /tracing/api_catalog/
