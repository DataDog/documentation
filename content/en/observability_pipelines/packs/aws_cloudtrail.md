---
title: AWS CloudTrail
description: Learn more about the AWS CloudTrail pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_cloudtrail.png" alt="The AWS CloudTrail pack" style="width:25%;" >}}

AWS CloudTrail records API calls and account activity across AWS services.

What this pack does:

- Samples high-frequency, read-only API calls
- Splits multi-record events into clean entries
- Scans for keys, credentials, and role IDs