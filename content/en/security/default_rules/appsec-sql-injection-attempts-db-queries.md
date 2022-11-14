---
aliases:
- 1ex-nf2-1pk
- /security_monitoring/default_rules/1ex-nf2-1pk
- /security_monitoring/default_rules/appsec-sql-injection-attempts-db-queries
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: SQL injection attempts on routes performing SQL queries
type: security_rules
---

### Goal
Detect SQL injection attempts on web services executing SQL queries. Such security activity generally indicates that an attacker is trying to exploit potential SQL injection vulnerability or steal sensitive data.

### Strategy
Monitor application security events to detect SQL injection attempts (`@appsec.type:sql_injection`) on distributed traces where SQL queries are executed (`@_dd.appsec.enrichment.has_sql:true`).

The signal severity is determined based on the underlying service behavior:

* `HIGH` Substantial rate of SQL injection attempts on services executing SQL queries, and resulting in 5xx HTTP errors.
* `MEDIUM` High rate of SQL injection attempts on services executing SQL queries.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.
2. Review the 5xx errors and the other application security events detected to assess the impact on the services.
3. Investigate if the parameters are ending up in the SQL query without sanitization. If they do, fix the code.
