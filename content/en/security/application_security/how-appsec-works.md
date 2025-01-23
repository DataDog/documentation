---
title: How Application Security Works in Datadog
aliases:
  - /security_platform/guide/how-appsec-works/
  - /security_platform/application_security/how-appsec-works/
  - /security/guide/how-appsec-works/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Application Security provides observability into application-level attacks that aim to exploit code-level vulnerabilities or abuse the business logic of your application, and into any bad actors targeting your systems.

Here's a quick summary:

- **Observability into attacks**: Provides insight into application-level attacks targeting code vulnerabilities or business logic.
- **Risk detection**: Identifies risks in applications, such as vulnerable libraries and dependencies.
- **Trace-based monitoring**: Utilizes the same tracing libraries as Datadog APM to monitor traffic and detect security threats.
- **Security signals**: Automatically generates security signals when attacks or business logic abuses are detected, focusing on meaningful threats rather than individual attempts.
- **Notification Options**: Offers notifications through Slack, email, or PagerDuty based on security signal settings.
- **Embedded security**: Integrated within the application, providing better threat identification and classification by accessing trace data.
- **Enhanced WAF functionality**: Functions like a Web Application Firewall (WAF) but with additional application context, improving accuracy and reducing false positives.

### Identify services exposed to application attacks

Datadog Application Security [Threat Management][1] uses the information APM is already collecting to flag traces containing attack attempts. While APM collects a sample of your application traffic, enabling Application Security in the tracing library is necessary to effectively monitor and protect your services.

Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Service Catalog][2], [Service Page][3], [Traces][4]).

Datadog Threat Monitoring and Detection identifies bad actors by collecting client IP addresses, login account info (for example, user account/ID), and manually-added user tags on all requests.

<div class="alert alert-info"><strong>1-Click Enablement</strong><br>
If your service is running with <a href="/agent/remote_config/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can <a href="https://app.datadoghq.com/security/configuration/asm/setup">enable Application Security</a> from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

### Identify vulnerabilities in open source libraries used by services

Datadog [Software Composition Analysis][5] uses various known vulnerability data sources related to open source software libraries, plus information provided by the Datadog security research team, to match the libraries your application depends on at runtime with their potential vulnerabilities, and to make remediation recommendations.

### Identify code-level vulnerabilities in services

Datadog [Code Security][28] identifies code-level vulnerabilities in services and provides actionable insights and recommended fixes. It uses an Interactive Application Security Testing (IAST) approach to find vulnerabilities within application code. IAST uses instrumentation embedded in code, similar to Application Performance Monitoring (APM), enabling Datadog to identify vulnerabilities using legitimate application traffic rather than relying on external tests that may require extra configuration or periodic scheduling. Datadog Code Security automatically provides the information teams need to locate a vulnerability in an application, from the affected filename down to the exact method and line number.

## Compatibility

For Datadog Application Security to be compatible with your Datadog configuration, you must have APM enabled and [sending traces to Datadog][6]. Application Security uses the same libraries used by APM, so you don't need to deploy and maintain another library. 

Steps to enable Datadog Application Security are specific to each runtime language. Check to see if your language is supported in the Application Security prerequisites for each product.

## Serverless monitoring

Datadog Application Security for AWS Lambda provides deep visibility into attackers targeting your functions. With distributed tracing providing a context-rich picture of the attack, you can assess the impact and remediate the threat effectively.

Read [Enabling Application Security for Serverless][8] for information on setting it up.

## Performance

Datadog Application Security uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. 

When APM is enabled, the Datadog library generates distributed traces. Datadog Application Security flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data sampling and retention

In the tracing library, Datadog Application Security collects all traces that include security data. A default [retention filter][9] ensures the retention of all security-related traces in the Datadog platform.

Data for security traces is kept for 90 days. The underlying trace data is kept for 15 days.

## Data privacy

By default, Application Security collects information from security traces to help you understand why the request was flagged as suspicious. Before sending the data, Application Security scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag. This indicates that the request was suspicious, but that the request data could not be collected because of data security concerns.

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

To configure the information redacted by Application Security, refer to the [data security configuration][17]

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


Datadog Application Security includes over 100 attack signatures that help protect against [many different kinds of attacks][14], including, but not limited to, the following categories:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Server-side Request Forgery (SSRF)

## Built-in vulnerability detection

Datadog Application Security offers built-in detection capabilities that warn you about the vulnerabilities detected in your application code and open source dependencies. Details of that information are shown in the [Vulnerability Explorer][15], identifying the severity, affected services, potentially vulnerable infrastructure, and remediation instructions to solve the surfaced risks.

For more information, read [Code Security][28] and [Software Composition Analysis][5].

## API security

<div class="alert alert-info">API security is in Preview.</div>

Datadog Application Security provides visibility into threats targeting your APIs. Use the [Endpoint list][27] in Service Catalog to monitor API health and performance metrics, where you can view attacks targeting your APIs. This view includes the attacker's IP and authentication information, as well as request headers showing details about how the attack was formed. Using both Application Security and API management, you can maintain a comprehensive view of your API attack surface, and respond to mitigate threats.

## How Datadog Application Security protects against Log4Shell

Datadog Application Security identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][16], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/
[2]: /tracing/service_catalog/#security-view
[3]: /tracing/services/service_page/#security
[4]: /tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /security/code_security/software_composition_analysis/
[6]: /tracing/trace_collection/
[8]: /security/application_security/serverless/
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
[27]: /service_catalog/endpoints/
[28]: /security/code_security/iast/
