---
title: Amazon CloudFront
description: Learn more about the AWS CloudFront pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_cloudfront.png" alt="The Amazon CloudFront pack" style="width:25%;" >}}

AWS CloudFront logs show requests, cache use, and edge activity.

What this pack does:

- Deduplicates repeated request logs
- Samples high-volume cache hits
- Drops health checks, static, and bot logs