---
title: Synthetic Monitoring Template Variables
aliases:
- /synthetics/notifications/template_variables_cdocs
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"
- link: "/synthetics/guide/how-synthetics-monitors-trigger-alerts/"
  tag: "Guide"
  text: "Understanding Synthetic Monitor Alerting"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix.

Select your test type to view the available template variables:

- **[Browser test template variables][1]**: Variables for browser tests, including browser-specific device info, step details, and extracted values.
- **[Mobile test template variables][2]**: Variables for mobile tests, including mobile platform info and application version details.
- **[Multistep API test template variables][3]**: Variables for multistep API tests, including step name and type fields.
- **[API test template variables][4]**: Variables for single-step API tests, with protocol-specific fields for HTTP, DNS, SSL, WebSocket, UDP, TCP, ICMP, and gRPC.

[1]: /synthetics/notifications/template_variables/browser/
[2]: /synthetics/notifications/template_variables/mobile/
[3]: /synthetics/notifications/template_variables/multistep/
[4]: /synthetics/notifications/template_variables/api/
