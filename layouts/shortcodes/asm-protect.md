
If your service is running [an Agent with Remote Configuration enabled and a tracing library version that supports it][108], you can block attacks and attackers from the Datadog UI without additional configuration of the Agent or tracing libraries.

ASM Protect goes beyond Threat Detection and enables you to take blocking action to slow down attacks and attackers. Unlike perimeter WAFs that apply a broad range of rules to inspect traffic, ASM uses the full context of your application---its databases, frameworks, and programming language---to narrowly apply the most efficient set of inspection rules. 

ASM leverages the same [tracing libraries][107] as Application Performance Monitoring (APM) to protect your applications against:

- **Attacks**: ASM's In-App WAF inspects all incoming traffic and uses pattern-matching to detect and block malicious traffic (security traces).
- **Attackers**: IP addresses and authenticated users that are launching attacks against your applications are detected from the insights collected by the libraries and flagged in Security Signals.

Security traces are blocked in real time by the Datadog tracing libraries. Blocks are saved in Datadog, automatically and securely fetched by the Datadog Agent, deployed in your infrastructure, and applied to your services. For details, read [How Remote Configuration Works][108]. 

To start leveraging Protection capabilities---In-App WAF, IP blocking, User blocking and more---read [Protection][109]. 


[107]: /tracing/trace_collection/dd_libraries/
[108]: /agent/guide/how_remote_config_works/
[109]: /security/application_security/threats/protection
