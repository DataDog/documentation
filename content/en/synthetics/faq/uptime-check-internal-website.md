---
title: Create an API Test for private website
kind: faq
beta: true
further_reading:
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
---

<div class="alert alert-warning">Synthetics is in beta for the Datadog US Site. To request access, complete the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics request form</a>.</div>

Monitor your internal staging/intranet environment by appending authentication credentials in the **Advanced options** of your API test to satisfy security concerns.

{{< img src="synthetics/faq/advanced_options.png" alt="Advanced options" responsive="true" style="width:80%;">}}

**Note**: Secrets are fully encrypted all along to the request.


