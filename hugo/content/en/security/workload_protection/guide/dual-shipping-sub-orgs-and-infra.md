---
title: How to Safely Dual Ship Workload Protection to Multiple Organizations
disable_toc: false
further_reading:
- link: "/agent/configuration/dual-shipping/"
  tag: "Documentation"
  text: "Dual Shipping"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
- link: "/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure Monitoring"
---

## Overview

This guide explains why and how to dual ship Workload Protection data to two Datadog organizations—for example, a primary organization used by platform teams and a second organization used only by security teams.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Why dual ship Workload Protection data?

[Dual shipping][1] sends the same Workload Protection runtime events from a single Datadog Agent to two organizations. This is useful when different teams need access to different data in Datadog. For example, a security team needs Workload Protection signals, findings, and investigation workflows, while platform or application teams in the primary organization should not see security data.

In each destination organization, enable Workload Protection so Datadog can analyze the incoming runtime events and generate signals and findings.

## Infrastructure Monitoring requirement

<div class="alert alert-warning">
Datadog does not recommend running Workload Protection on an organization or sub-organization that does not have Infrastructure Monitoring enabled.
</div>

Workload Protection relies on [Infrastructure Monitoring][2] to deliver a complete experience:

- Backend rules enrich Agent events with **infrastructure context** (cloud provider, host, Kubernetes cluster, container, and image), which powers detection, findings, and investigation workflows.
- **Host and container tags** scope policy deployment and rule filters across your environment.
- The [Coverage][3] page and investigation workflows pivot to infrastructure views to identify unprotected hosts and reconstruct attack stories.

Without Infrastructure Monitoring, the Workload Protection experience is incomplete.

## Dual shipping and sub-organizations

To configure dual shipping, see the following documentation:

- [Dual Shipping][1]: Agent configuration for Workload Protection runtime events, infrastructure metrics, and other telemetry types. See the [Workload Protection][1] section for `runtime_security_config.endpoints` settings.
- [Managing Multiple-Organization Accounts][4]: How sub-organizations work, including data isolation between organizations and usage tracking from a parent organization.

<div class="alert alert-warning">
Dual shipping can impact billing if you send data to multiple Datadog organizations. For more information, contact <a href="/help/">Datadog Support</a>.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/dual-shipping/
[2]: /infrastructure/
[3]: /security/workload_protection/inventory/
[4]: /account_management/multi_organization/
