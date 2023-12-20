---
title: Quality Gates
kind: documentation
description: Learn how to use Quality Gates to enable your team to control what code makes it to production.
is_beta: true
further_reading:
- link: "/quality_gates/search"
  tag: "Documentation"
  text: "Learn how to search for Quality Gate rules"
- link: "/quality_gates/explorer"
  tag: "Documentation"
  text: "Learn about the Quality Gates Explorer"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn about Audit Trail"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

Quality Gates allows you to gate your workflows based on signals in Datadog. 
Use Quality Gates to:

* Create rules that can block your workflows by using data in Datadog.
* Give your teams control over what code makes it to production and what doesn't.
* Continually improve code quality with precise enforcement.

With Quality Gates, you have control over what is merged into the default branch and deployed. You can ensure that the code running in production meets high quality standards, reducing incidents and minimizing unwanted behaviors.

## Create rules

You can create rules to block code from being merged if it introduces new [flaky tests][1], code security violations, or issues that wouldn't normally fail your CI/CD pipelines and end up deployed to production.

To create Quality Gate rules, see the [Setup documentation][2]. 

## Search rules

To access Quality Gate rules, see the [Search and Manage documentation][5].

## Track changes in rules

You can view information about who created, modified, and deleted Quality Gates rules in [Audit Trail][3].

For more information, see the [Audit Trail documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/guides/flaky_test_management/
[2]: /quality_gates/setup/
[3]: /account_management/audit_trail/
[4]: /account_management/audit_trail/events/#ci-visibility-events
[5]: /quality_gates/search/