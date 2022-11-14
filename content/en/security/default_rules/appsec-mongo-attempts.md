---
aliases:
- um5-ks6-4uq
- /security_monitoring/default_rules/um5-ks6-4uq
- /security_monitoring/default_rules/appsec-mongo-attempts
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: Mongo injections attempted on route performing Mongo queries
type: security_rules
---

### Goal

Detect MongoDB injection attempts on web services accessing data from Mongo databases. Such security activity generally indicates that an attacker is trying to exploit a potential MongoDB injection vulnerability or steal sensitive data.  

### Strategy
Monitor application security events to detect NoSQL (`@appsec.rule_id:(sqr-000-007 OR crs-942-290)`) injection attempts on distributed traces where external MongoDB queries are performed (`@_dd.appsec.enrichment.has_mongo:true`).  

The signal severity is determined based on the underlying service behavior:

* `HIGH` Substantial rate of MongoDB injection attempts on services executing MongoDB queries, and resulting in 5xx HTTP errors.
* `MEDIUM` High rate of SQL/CQL injection attempts on services executing MongoDB queries.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them from reaching deeper parts of your production systems.
2. Review the 5xx errors and the other application security events detected to assess the impact on the services.
3. Investigate if the parameters are ending up in the MongoDB query without sanitization. If they do, fix the code.
