---
title: AWS WAF
description: Learn more about the AWS WAF pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_waf.png" alt="The AWS WAF pack" style="width:25%;" >}}

AWS WAF captures AWS WAF logs from CloudWatch, S3, or Firehose.

What this pack does:

- Extracts metrics by action and terminating rule
- Optionally, drops and samples `ALLOW` logs
- Drops unused fields, null fields, and redacts credentials

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
