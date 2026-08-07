---
title: Check Point
description: Learn more about the Check Point pack.
---

## Overview

{{< img src="observability_pipelines/packs/checkpoint.png" alt="The Check Point pack" style="width:25%;" >}}

Processes Check Point logs in CEF format, with or without syslog prefix.

What this pack does:

- Parses and renames fields
- Generates metrics by severity and by event name
- Drops `Accept` traffic; samples low-severity events

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
