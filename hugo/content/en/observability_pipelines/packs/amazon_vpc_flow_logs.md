---
title: Amazon VPC Flow Logs
description: Learn more about the Amazon VPC Flow Logs pack.
---

## Overview

{{< img src="observability_pipelines/packs/aws_vpc_flow_logs.png" alt="The Amazon VPC Flow Logs pack" style="width:25%;" >}}

Amazon VPC Flow Logs capture network traffic between VPC resources.

What this pack does:

- Removes unused log metadata
- Drops idle and internal `ACCEPT OK` flows
- Keeps denied and rejected connections