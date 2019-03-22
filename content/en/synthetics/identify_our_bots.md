---
title: Identify our bots
kind: documentation
beta: true
description: Identify incoming Synthetics requests
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_test"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_test"
  tag: "Documentation"
  text: "Configure an API Test"

---

<div class="alert alert-warning">Synthetics is only available in the US. Browser tests are available in beta: to request access complete the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics Request form</a>.</div>

## Overview

Some parts of your system might not be available to robots without the right identification. Datadog provides you with a variety of ways to identify the robots and make sure they can perform the actions you expect them to do.

## Solutions

1. You can use the [**headers we set for APM integration**][1]. It will work for all the tests (both browser and API).

2. You can use the **shared headers** to set any header to any value for all your API tests at once.

3. You can locally add **cookies, headers or basic auth** to your API tests.

4. You can use our **IP ranges** provided by this URL https://ip-ranges.datadoghq.com/, in the section "synthetics".
[1]: ../apm/#how-are-traces-linked-to-checks
