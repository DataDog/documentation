---
title: User-Agent Parser
processor_name: user-agent-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The user-agent parser processor takes a `useragent` attribute and extracts OS, browser, device, and other user data.

**Note**: If your logs contain encoded user-agents (for example, IIS logs), configure this Processor to **decode the URL** before parsing it.

## Use cases

| Use case | Example |
| :--- | :--- |
| Extract detailed user information from a User-Agent string. | For Apache logs, extract information such as the user's browser, device, and operating system. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

