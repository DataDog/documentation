---
title: Terms and Concepts
disable_toc: false
further_reading:
- link: "/security/application_security/how-it-works"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/application_security"
  tag: "Documentation"
  text: "App and API Protection"
- link: "https://www.datadoghq.com/blog/datadog-threat-intelligence/"
  tag: "Blog"
  text: "Accelerate security investigations with Datadog Threat Intelligence"
---

Datadog App and API Protection monitors threats and provides protection against application-level attacks that aim to exploit code-level vulnerabilities. It leverages runtime code execution context, trace and error data, and user attribution.

## General App and API Protection terms

attack attempt
: Which security rule was triggered by the trace.

Datadog library
: _also_ tracer, tracing library
: A programming language-specific library embedded in web applications. Datadog App and API Protection uses the library to monitor and protect. APM uses the same library to instrument code for tracing telemetry.

detection rule
: A conditional logic definition that is applied to ingested data and cloud configurations. When at least one case defined in a rule is matched over a given period of time, Datadog generates a _security signal_.
: See [Detection rules][10].

passlist (formerly exclusion filter)
: A mechanism for discarding security traces flagged through the Datadog App and API Protection library and the In-App WAF rules. Passlist is applied as requests are ingested into Datadog (intake). Passlist helps manage false positives and intake costs.
: See [Exclusion filters][11] in the app.

In-App WAF rules (formerly event rules)
: A set of rules executed in the Datadog libraries to catch security activity. These include Web Application Firewall (WAF) patterns that monitor for attempts to exploit known vulnerabilities.
: See [In-App WAF rules][12].

Remote Configuration
: A Datadog platform mechanism that enables the Agent configuration to be updated remotely. Used by Datadog App and API Protection to update In-App WAF rules, activate the product, and block attackers.
: See [How Remote Configuration Works][8].

service
: A single web application, microservice, API, or function. Usually serves a business function.

signal
: A detection of an application attack that impacts your services. Signals identify meaningful threats for you to review, and should be triaged with a high priority.
: See [Signals Explorer][13] in the app.

severity
: An indicator of how quickly an attack attempt should be triaged and addressed. Based on a combination of factors, including the attack's potential impact and risk. Values are Critical, High, Medium, Low, Info.

security trace
: A distributed trace for which security activity has been flagged by In-App WAF rules. The underlying trace is shared with APM, allowing deeper and faster investigations.

suspicious request
: A distributed trace for which security activity has been flagged by In-App WAF rules. The underlying trace is shared with APM, allowing deeper and faster investigations.

user attribution
: A mechanism that maps suspicious requests to known users in your systems.
: See [Tracking User Activity][14].

vulnerability
: Passive risk within an application. From [OWASP][1]: "A vulnerability is a hole or a weakness in the application, which can be a design flaw or an implementation bug, that allows an attacker to cause harm to the stakeholders of an application. Stakeholders include the application owner, application users, and other entities that rely on the application."

trace qualification
: The process by which Datadog helps understand the impact of traces, labeling
them as `Harmful Safe or Unknown`.
: See [Trace Qualification][15].

threat intelligence
: A set of rules executed in the Datadog libraries to detect threats. These include Web Application Firewall (WAF) patterns that monitor for attempts to exploit known vulnerabilities.
: See [Threat Intelligence][16]

suspicious attackers
: A precursor to Flagged IPs. Suspicious IPs have met a minimum threshold of attack traffic to be classified as suspicious, but not the threshold for Flagged. Thresholds are not user-configurable.
: See [Attackers Explorer][17]

flagged attackers
: IPs that send large amounts of attack traffic. We recommend reviewing and blocking Flagged IPs. Thresholds are not user-configurable.
: See [Attackers Explorer][17]

attacker fingerprint
: Identifiers computed from request characteristics to track an attacker across multiple requests.
: See [Attacker Fingerprint][18]

attacker cluster
: A set of attributes identifying an attacker across a distributed attack.
: See [Attacker Clustering][19]

## Attacks and known vulnerabilities terms

Open Web App and API Protection Project (OWASP)
: A nonprofit foundation with several projects to enhance web application security. OWASP is best known for the [OWASP Top 10][2], a broad consensus about the most critical security risks to web applications.

Cross-Site Scripting (XSS)
: A type of injection attack in which malicious scripts are injected into otherwise benign and trusted websites.
: See [XSS on OWASP][3].

Structured Query Language Injection (SQLi, SQL Injection)
: A type of injection attack in which a SQL query is executed via the input data from the client to the application. SQL commands are injected into data-plane input in order to affect the execution of predefined SQL commands. A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system, and in some cases issue commands to the operating system.
: **Related**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - Similar to SQLi but for the Cassandra Query Language and NoSQL.
: See [SQL Injection on OWASP][4].

Server-Side Request Forgery (SSRF)
: A vulnerability where a web application fetches a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL).
: See [Server-Side Request Forgery on OWASP][5].

Local File Inclusion (LFI)
: A vulnerability that allows an attacker to include a file locally present on the server during the processing of the request. In most cases this allows the attacker to read sensitive information stored in files on the server. In more severe cases exploitation can lead to cross-site scripting or remote code execution.
: See [Testing for LFI on OWASP][6].

Remote File Inclusion (RFI)
: A vulnerability similar to Local File Inclusion, but allows an attacker to include a remote file during the processing of the request. The files used in Remote File Inclusion attacks most commonly contain malicious code for PHP, JSP, or similar technologies.

Remote Code Execution (RCE)
: A vulnerability that allows an attacker to remotely execute code on a machine.

Object-Graph Navigation Language Injection (OGNLi)
: A vulnerability that allows an attacker to execute their own OGNL expression in a Java application, most commonly leading to remote code execution.
: See [OGNLi in OWASP Top 10][7].



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /remote_configuration
[10]: /security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /security/application_security/policies/inapp_waf_rules/
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /security/application_security/how-it-works/add-user-info/
[15]: /security/application_security/how-it-works/trace_qualification/
[16]: /security/application_security/how-it-works/threat-intelligence/
[17]: /security/application_security/security_signals/attacker-explorer/
[18]: /security/application_security/security_signals/attacker_fingerprint/
[19]: /security/application_security/security_signals/attacker_clustering/
