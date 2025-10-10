---
title: WAF Integrations
disable_toc: false
aliases:
  - /security/application_security/threats/waf-integration
further_reading:
- link: "https://www.datadoghq.com/blog/aws-waf-datadog/"
  tag: "Blog"
  text: "Monitor AWS WAF activity with Datadog"
---

Protecting web applications and APIs requires a multi-layered approach that combines in-app monitoring and perimeter defenses. These complementary strategies enable you to have a *defense-in-depth* App and API Protection approach that leverages AWS Web Application Firewall (WAF) as the first line of defense, followed by Exploit Prevention for blocking attacks that slip by the WAF.

For details on how Exploit Prevention differs from In-App WAF, see [Exploit Prevention vs. In-App WAF][5].

### In-app monitoring: deep visibility with distributed tracing

At the application level, Datadog AAP leverages distributed tracing to monitor microservices in real time. The AAP approach provides detailed, context-rich insights into the behavior of requests as they traverse various services. These insights detect sophisticated threats such as:

- SQL Injection (SQLi) and Local File Inclusion (LFI) attempts.
- Application logic abuse, such as bypassing business rules or exploiting edge cases.
- Misuse of exposed endpoints.

### Perimeter defense: blocking threats at the edge with AWS WAF

At the perimeter, AWS Web Application Firewall (WAF) acts as the first line of defense, filtering traffic before it reaches the application. These solutions are essential for blocking:

- Large-scale botnet attacks or Distributed Denial of Service (DDoS) attacks.
- Malicious bots attempting credential stuffing or scraping.

### The importance of contextual, adaptive protection

Depending on the nature of the threat, protection controls should be applied at the appropriate layer: either in-app or at the perimeter. For example:

- Perimeter protection use case: Blocking malicious IPs or volumetric attacks that can be mitigated efficiently at the network edge.
- In-app protection use case: Detecting and blocking vulnerability exploits, abuse of business logic, or subtle anomalies in API usage.

This layered approach ensures threats are neutralized as early as possible without sacrificing the precision needed to protect legitimate traffic.


## AWS WAF integration with AAP

There are two main use cases supported with this [integration][1]:

1. Gain visibility of AWS WAF actions in Datadog AAP. For example:
   1. Metrics such as total requests allowed vs. blocked by the AWS WAF.
   2. Drill down and view individual AWS WAF logs (requires you to [ingest AWS WAF logs into Datadog][2]).
   3. How AWS WAF inspected the request: rules that were applied and the decision made (allow, block, or count). 
   
   <div class="alert alert-info">AAP converts AWS WAF logs into AAP Traces, enabling you to view application activity (traces) and AWS WAF activity (logs converted to AAP traces) in the AAP Trace Explorer.</div>

   <!-- {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="AWS WAF integration details in Datadog UI" style="width:100%;" >}} -->
   
2. Leverage AWS WAF to block attackers:
   1. Connect your AWS WAF IP set(s) with Datadog AAP. You can use an existing set or create a new one. Datadog will add blocked IP addresses to this IP set. You can block attackers from AAP [Signals][3] or [Traces][4] explorers.
           
   <!-- {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="AAP denylist blocked IPs" style="width:100%;" >}} -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security?query=@workflow.rule.type:%22Application%20Security%22&product=appsec
[4]: https://app.datadoghq.com/security/appsec/traces
[5]: /security/application_security/#exploit-prevention-vs-in-app-waf
