---
title: How App and API Protection Works in Datadog
aliases:
  - /security_platform/guide/how-appsec-works/
  - /security_platform/application_security/how-appsec-works/
  - /security/application_security/how-appsec-works/
  - /security/guide/how-appsec-works/
---

## Overview

Datadog App and API Protection (AAP) provides observability into application and API-level attacks that aim to exploit vulnerabilities and abuse app business logic, and observability into any bad actors targeting your systems. AAP performs actions such as the following:

- Detects and monitors application and API-level attacks
- Flags traces containing attack attempts using APM data
- Highlights exposed services in security views (Software Catalog, Service Page, Traces)
- Identifies bad actors by collecting client IPs and user info
- Provides automatic threat pattern updates and security signals
- Supports built-in protection and attack qualification
- Offers visibility into API threats and attack details
- Helps identify and respond to vulnerabilities like Log4Shell

### Identify services exposed to application attacks

Datadog App and API Protection Threat Management uses the information APM is already collecting to flag traces containing attack attempts. While APM collects a sample of your application traffic, enabling App and API Protection in the tracing library is necessary to effectively monitor and protect your services.

Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Software Catalog][2], [Service Page][3], [Traces][4]).

Datadog Threat Monitoring and Detection identifies bad actors by collecting client IP addresses, login account info (for example, user account/ID), and manually-added user tags on all requests.

<div class="alert alert-info"><strong>1-Click Enablement</strong><br>
If your service is running with <a href="/agent/remote_config/#enabling-remote-configuration">an Agent with Remote Configuration enabled and a tracing library version that supports it</a>, you can <a href="https://app.datadoghq.com/security/configuration/asm/setup">enable App and API Protection</a> from the Datadog UI without additional configuration of the Agent or tracing libraries.</div>

## Compatibility

App and API Protection uses the same libraries as APM, so you don't need to deploy and maintain another library. Steps to enable Datadog App and API Protection are specific to each runtime language. See the [App and API Protection setup guides][6] to check if your language is supported.

## Serverless monitoring

Datadog App and API Protection for AWS Lambda provides deep visibility into attackers targeting your functions. With distributed tracing providing a context-rich picture of the attack, you can assess the impact and remediate the threat effectively.

Read [Enabling App and API Protection for Serverless][8] for information on setting it up.

## Performance

Datadog App and API Protection uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. 

When APM is enabled, the Datadog library generates distributed traces. Datadog App and API Protection flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data sampling and retention

In the tracing library, Datadog App and API Protection collects all traces that include security data. A default [retention filter][9] ensures the retention of all security-related traces in the Datadog platform.

Data for security traces is kept for 90 days. The underlying trace data is kept for 15 days.

## Data privacy

By default, App and API Protection collects information from security traces to help you understand why the request was flagged as suspicious. Before sending the data, App and API Protection scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag. This indicates that the request was suspicious, but that the request data could not be collected because of data security concerns.

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

To configure the information redacted by App and API Protection, refer to the [data security configuration][17]

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


Datadog App and API Protection includes over 100 attack signatures that help protect against [many different kinds of attacks][14], including, but not limited to, the following categories:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Server-side Request Forgery (SSRF)

## API security

<div class="alert alert-info">API security is in Preview.</div>

Datadog App and API Protection provides visibility into threats targeting your APIs. Use the [Endpoints list][27] in Software Catalog to monitor API health and performance metrics, where you can view attacks targeting your APIs. This view includes the attacker's IP and authentication information, as well as request headers showing details about how the attack was formed. Using both App and API Protection and API management, you can maintain a comprehensive view of your API attack surface, and respond to mitigate threats.

## How Datadog App and API Protection protects against Log4Shell

Datadog App and API Protection identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][16], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

[1]: /security/workload_protection/
[2]: /tracing/software_catalog/#security-view
[3]: /tracing/services/service_page/#security
[4]: /tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /security/code_security/software_composition_analysis/
[6]: /security/application_security/setup/
[8]: /security/application_security/serverless/
[9]: /tracing/trace_pipeline/trace_retention/
[10]: /tracing/configure_data_security/?tab=http
[11]: /security/application_security/policies/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm/library
[16]: /security/cloud_siem/
[17]: /security/application_security/policies/library_configuration/#data-security-considerations
[26]: /agent/remote_config/#enabling-remote-configuration
[27]: /software_catalog/endpoints/
[28]: /security/code_security/iast/
[29]: /security/code_security/
