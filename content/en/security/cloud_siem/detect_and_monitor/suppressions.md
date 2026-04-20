---
title: Suppressions
disable_toc: false
---

{{< include-markdown "security/suppressions" >}}

## API schema note — deprecated `filters` field

Detection rule payloads accept a legacy `filters` array field for excluding matching events. **This field is deprecated for `log_detection`, `signal_correlation`, and `workload_security` rules.** Do not emit it on new rules.

Use one of the following instead:

- **Suppression rules** (recommended) — a separately managed resource at `POST /api/v2/security_monitoring/configuration/suppressions`. Scope to one or more rules, filter by a Datadog query, and optionally set `start_date` and `expiration_date` bounds. Suppressions live and evolve independently of the rule that generates the signal, so a noisy rule can be silenced without re-shipping it.
- **Tighten `queries[].query`** — use when the exclusion is intrinsic to the rule and you want it to travel with the rule payload.

For the suppression API reference, see the [Security Monitoring API documentation][1].

[1]: /api/latest/security-monitoring/#create-a-suppression-rule
