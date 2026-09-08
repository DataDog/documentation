---
title: AWS Lambda
description: Learn more about the AWS Lambda pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_lambda.png" alt="The AWS Lambda pack" style="width:25%;" >}}

AWS Lambda logs capture invocations, errors, and cold starts.

What this pack does:

- Parses REPORT lines for key metrics
- Drops START and END lines
- Tags cold starts and timeouts
