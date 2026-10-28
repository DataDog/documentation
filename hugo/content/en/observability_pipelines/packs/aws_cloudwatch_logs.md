---
title: AWS CloudWatch Logs
description: Learn more about the AWS CloudWatch Logs pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_cloudwatch_logs.png" alt="The AWS CloudWatch Logs pack" style="width:25%;" >}}

AWS CloudWatch Logs captures log streams from Lambda, ECS, and more.

What this pack does:

- Parses CloudWatch log event streams
- Splits multi-record events into clean entries
- Removes CWL envelope fields
