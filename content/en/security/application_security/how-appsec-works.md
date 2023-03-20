---
title: How Application Security Management Works in Datadog
kind: documentation
aliases:
  - /security_platform/guide/how-appsec-works/
  - /security_platform/application_security/how-appsec-works/
further_reading:
- link: "/security/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "/security/application_security/enabling/"
  tag: "Documentation"
  text: "Enable Application Security Management"
---

## Overview

Datadog Application Security Management (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, and into any bad actors targeting your systems.

In addition, ASM detects the risks built into your applications, for example through vulnerable libraries and dependencies the application uses at runtime.

Datadog APM records information, called traces, about each application request. Datadog ASM uses the same tracing libraries as APM to monitor your traffic and flags attack attempts based on suspicious requests that match known attack patterns. Security signals are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for your review instead of assessing each individual attack attempt. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. Because ASM is embedded in the application, it has access to trace data, making it more effective at pinpointing and classifying threats. Datadog ASM leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal-to-noise ratio, lowering false positives.

### Identify services exposed to application attacks

Datadog ASM [Threat Monitoring and Protection][1] uses the information APM is already collecting, and flags traces containing attack attempts. Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Service Catalog][2], [Service Page][3], [Traces][4]).

Because APM collects a sample of your application traffic, enabling ASM in the tracing library is necessary to effectively monitor and protect your services.

Datadog Threat Monitoring and Detection identifies bad actors by collecting client IP addresses and manually-added user tags on all requests.

<div class="alert alert-info"><strong>Beta: 1-Click Enablement</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can <a href="/security/application_security/enabling/">enable ASM</a> from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

### Identify vulnerable services

<div class="alert alert-info">Risk Management vulnerability detection is in beta.</a></div>

Datadog ASM [Risk Management][5] uses various known vulnerability data sources related to open source software libraries, plus information provided by the Datadog security research team, to match the libraries your application depends on at runtime with their potential vulnerabilities, and to make remediation recommendations.

## Compatibility

For Datadog ASM to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][6]. ASM uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog ASM are specific to runtime language. Check to see if your language is supported in the [ASM prerequisites][7].

### Serverless monitoring

<div class="alert alert-info">ASM support for AWS Lambda is in beta. Threat detection is done by using Datadog's lambda extension.</div>
 
Datadog ASM for AWS Lambda provides deep visibility into attackers targeting your functions. With distributed tracing providing a context-rich picture of the attack, you can assess the impact and remediate the threat effectively. 

Read [Enabling ASM for Serverless][8] for information on setting it up.

## Performance

Datadog ASM uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. When APM is enabled, the Datadog library generates distributed traces. Datadog ASM flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data sampling and retention

In the tracing library, Datadog ASM collects all traces that include security data. A default [retention filter][9] ensures the retention of all security-related traces in the Datadog platform.

Data for suspicious requests is kept for 90 days. The underlying trace data is kept for 15 days.

## Data privacy

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][10], and use the [passlist][11].


**Note:** Datadog ASM does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][10].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][12] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][13], a security signal is generated in Datadog.

<div class="alert alert-info"><strong>Beta: Automatic Threat Patterns Updates</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, the threat patterns being used to monitor your service is automatically updated whenever Datadog publishes updates.</div>

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Built-in protection

{{% asm-protect %}}


## Threat monitoring coverage

Datadog ASM categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns. For example, no correlation with the service's business-logic is found after correlating with the execution context provided by the trace.
* **Contextualized attacks** correlate the attack attempts performed on the service with a matching business-logic. For example, SQL injection patterns on a service performing SQL statements.
* A **Vulnerability is triggered** when an attack attempt gives evidence that a vulnerability has been successfully exploited, after matching known attack patterns.

Datadog ASM includes over 100 attack patterns that help protect against [many different kinds of attacks][14], including the following vulnerabilities:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Sever-side Request Forgery (SSRF)

## Built-in vulnerability detection

<div class="alert alert-info">Risk Management through vulnerability detection is in beta.</a></div>

Datadog ASM offers built-in detection capabilities that warn you about the vulnerabilities detected in your open source dependencies. Details of that information are shown in the [Vulnerability Explorer][15], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

For more information, read [Risk Management][5].

## How Datadog ASM protects against Log4Shell

Datadog ASM identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][16], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/
[2]: /tracing/service_catalog/#security-view
[3]: /tracing/services/service_page/#security
[4]: /tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /security/application_security/risk_management/
[6]: /tracing/trace_collection/
[7]: /security/application_security/enabling/#prerequisites
[8]: /security/application_security/enabling/serverless/
[9]: /tracing/trace_pipeline/trace_retention/
[10]: /tracing/configure_data_security/?tab=http
[11]: /security/application_security/threats/setup_and_configure/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /security/default_rules/#cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /security/cloud_siem/
