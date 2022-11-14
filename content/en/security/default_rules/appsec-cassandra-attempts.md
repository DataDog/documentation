---
aliases:
- zih-1e3-b12
- /security_monitoring/default_rules/zih-1e3-b12
- /security_monitoring/default_rules/appsec-cassandra-attempts
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: CQL injections attempted on route performing Cassandra queries
type: security_rules
---

### Goal

Detect CQL injections attempts on web services accessing to data from Cassandra databases. Such security activity generally indicates that an attacker is trying to exploit a potential CQL injection vulnerability or steal sensitive data.  

### Strategy
Monitor application security events to detect SQL (`@appsec.type:sql_injection`) & CQL (`@appsec.rule_id:dog-000-001`) injection attempts on distributed traces where external CQL queries are performed (`@_dd.appsec.enrichment.has_cassandra:true`).  
Also, look at SQL injection triggers because CQL syntax is similar enough to SQL syntax that the SQL patterns catch CQL injection payloads.

The signal severity is determined based on the underlying service behavior:

* `HIGH` Substantial rate of SQL/CQL injection attempts on services executing CQL queries, and resulting in 5xx HTTP errors.
* `MEDIUM` High rate of SQL/CQL injection attempts on services executing CQL queries.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them from reaching deeper parts of your production systems.
2. Review the 5xx errors and the other application security events detected to assess the impact on the services.
3. Investigate if the parameters are ending up in the CQL query without sanitization. If they do, fix the code.
