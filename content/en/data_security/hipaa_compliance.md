---
title: HIPAA Compliance
kind: documentation
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/hipaa-compliant-log-management/"
  tag: "Blog"
  text: "HIPAA-compliant observability and security for health information systems"
- link: "data_security/logs"
  tag: "Documentation"
  text: "Data Security for Log Management"
---

## Overview

The Health Insurance Portability and Accountability Act (HIPAA) is a set of rules and regulations passed in 1996 that aims to protect and ensure the confidential handling of protected health information (PHI). It affects healthcare providers, health plans, and similar organizations known as "covered entities," as well as vendors working with these healthcare-related organizations known as "business associates."

Organizations use cloud-based solutions to manage patient data, which requires adherence to HIPAA regulations. Datadog provides HIPAA compliant observability and ensures compliance with regulatory requirements.

## HIPAA-compliant Log Management

Datadog will sign a Business Associate Agreement (BAA) with customers that transmit protected health information (ePHI) through Datadog's Log Management Service.

The following features are not available to customers who have signed Datadog's BAA:

* Users cannot request support through chat.
* You cannot [share][1] logs, security signals, or traces from the Datadog explorer.
* Security rules cannot include triggering group-by values in the notification title.
* Security rules cannot include message template variables.
* Security rules cannot notify through webhooks.

If you have any questions about how the Log Management Service satisfies the applicable requirements under HIPAA, contact your account manager. HIPAA-enabled customers do not need to use specific endpoints to submit logs to enforce specific encryptions. The encryptions are enabled on all log submission endpoints.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/#share-views
