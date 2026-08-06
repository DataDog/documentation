---
title: AWS Elastic Load Balancer Logs
description: Learn more about the AWS Elastic Load Balancer Logs pack.
further_reading:
- link: "https://www.datadoghq.com/blog/monitoring-load-balancer-logs"
  tag: "Blog"
  text: "Monitor your application and network load balancer logs"
---

## Overview

{{< img src="observability_pipelines/packs/aws_elb.png" alt="The AWS Elastic Load Balancer Logs pack" style="width:25%;" >}}

AWS ELBs captures HTTP and HTTPS requests from Classic Load Balancers.

What this pack does:

- Parses ELB access logs into structured fields
- Extracts latency, status, and traffic metrics
- Cleans and normalizes request data

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
