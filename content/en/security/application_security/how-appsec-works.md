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
- link: "/security/application_security/getting_started/"
  tag: "Documentation"
  text: "Get started with Application Security Management"
---

## Overview

Datadog Application Security Management (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, and into any bad actors targeting your systems.

In addition, ASM detects the risks built into your applications, for example through vulnerable libraries and dependencies the application uses at runtime.

Datadog APM records information, called traces, about each application request. Datadog ASM uses the same tracing libraries as APM to monitor your traffic and flags attack attempts based on suspicious requests that match known attack patterns. Security signals are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for your review instead of assessing each individual attack attempt. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. Because ASM is embedded in the application, it has access to trace data, making it more effective at pinpointing and classifying threats. Datadog ASM leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal-to-noise ratio, lowering false positives.

### Identify services exposed to application attacks

Datadog ASM [Threat Monitoring and Protection][22] uses the information APM is already collecting, and flags traces containing attack attempts. Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Service Catalog][1], [Service Page][2], [Traces][3]).

Because APM collects a sample of your application traffic, enabling ASM in the tracing library is necessary to effectively monitor and protect your services.

Datadog Threat Monitoring and Detection identifies bad actors by collecting client IP addresses and manually-added user tags on all requests.

<div class="alert alert-info"><strong>Beta: 1-Click Enablement</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can <a href="/security/application_security/getting_started/">enable ASM</a> from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

### Identify vulnerable services

<div class="alert alert-info">Risk Management vulnerability detection is in beta.</a></div>

Datadog ASM [Risk Management][21] uses various known vulnerability data sources related to open source software libraries, plus information provided by the Datadog security research team, to match the libraries your application depends on at runtime with their potential vulnerabilities, and to make remediation recommendations.

## Compatibility

For Datadog ASM to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][4]. ASM uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog ASM are specific to runtime language. Check to see if your language is supported in the [ASM prerequisites][5].

### Serverless monitoring

<div class="alert alert-info">Serverless threat monitoring is in private beta. Request to join the early preview with <a href="https://docs.google.com/forms/d/e/1FAIpQLScB3uSccf9lSAh7GcA8NZ8SsmUGQ5mi09DnDgZmqXcbiYfMzA/viewform">this form</a>.</div>
 
Datadog ASM supports functions deployed on AWS Lambda. Detection is done by using the [Lambda extension][6]. 

Full threat monitoring capabilities are available for Lambda functions. You can detect attackers targeting your functions, trace their attack path with deep code-level insights, and then remediate the threat.


## Performance

Datadog ASM uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. When APM is enabled, the Datadog Library generates distributed traces. Datadog ASM flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data sampling and retention

In the tracing library, Datadog ASM collects all traces that include security data. A default [retention filter][7] ensures the retention of all security-related traces in the Datadog platform.

Data for suspicious requests is kept for 90 days. The underlying trace data is kept for 15 days.

## Data privacy

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][8], and use [exclusion filters][9].


**Note:** Datadog ASM does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][8].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][10] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][11], a security signal is generated in Datadog.

<div class="alert alert-info"><strong>Beta: Automatic Threat Patterns Updates</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, the threat patterns being used to monitor your service is automatically updated whenever Datadog publishes updates.</div>

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Built-in protection

<div class="alert alert-info"><strong>Beta: IP and user blocking</strong><br>
If your service is running with <a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can block attackers from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

Datadog ASM offers built-in protection capabilities to slow down attacks and attackers. 

IP and user blocking actions are implemented through the [tracing libraries][9], not introducing any new dependencies in your stack.
Blocks are saved in the Datadog platform, automatically and securely fetched by the [Datadog Agent][13], deployed in your infrastructure, and applied to your application. For details, read [How Remote Configuration Works][23].

You can block attackers that are flagged in ASM Security Signals temporarily or permanently. In the Signals Explorer, click into a signal to see what users and IP addresses are generating the signal, and optionally block them.

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="A security signal panel in Datadog ASM, allowing to block the attackers' IPs" width="75%">}}


From there, all ASM-protected services block incoming requests performed by the blocked IP or user, for the specified duration. All blocked traces are tagged with `security_response.block_ip` and displayed in the [Trace Explorer][14]. Services where ASM is disabled aren't protected.

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as ASM blocks requests originating from blocked IPs" width="75%" >}}

For more information, read [Threat Monitoring and Protection][22].


## Threat monitoring coverage

Datadog ASM categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns. For example, no correlation with the service's business-logic is found after correlating with the execution context provided by the trace.
* **Contextualized attacks** correlate the attack attempts performed on the service with a matching business-logic. For example, SQL injection patterns on a service performing SQL statements.
* A **Vulnerability is triggered** when an attack attempt gives evidence that a vulnerability has been successfully exploited, after matching known attack patterns.

Datadog ASM includes over 100 attack patterns that help protect against [many different kinds of attacks][15], including the following vulnerabilities:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Sever-side Request Forgery (SSRF)

## Built-in vulnerability detection

<div class="alert alert-info">Risk Management through vulnerability detection is in beta.</a></div>

Datadog ASM offers built-in detection capabilities that warn you about the vulnerabilities detected in your open source dependencies. Details of that information are shown in the [Vulnerability Explorer][20], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

For more information, read [Risk Management][21].

## How Datadog ASM protects against Log4Shell

Datadog ASM identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][16], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/service_catalog/#security-view
[2]: /tracing/services/service_page/#security
[3]: /tracing/trace_explorer/trace_view/?tab=security#more-information
[4]: /tracing/trace_collection/
[5]: /security/application_security/getting_started/#prerequisites
[6]: /serverless/installation/java/?tab=serverlessframework
[7]: /tracing/trace_pipeline/trace_retention/
[8]: /tracing/configure_data_security/?tab=http
[9]: /security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[10]: https://owasp.org/www-project-modsecurity-core-rule-set/
[11]: /security/default_rules/#cat-application-security
[12]: /tracing/
[13]: /agent/guide/how_remote_config_works/
[14]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[15]: https://app.datadoghq.com/security/appsec/event-rules
[16]: /security/cloud_siem/
[17]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[18]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[19]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
[20]: https://app.datadoghq.com/security/appsec/vm
[21]: /security/application_security/risk_management/
[22]: /security/application_security/threats/
[23]: /agent/guide/how_remote_config_works/
