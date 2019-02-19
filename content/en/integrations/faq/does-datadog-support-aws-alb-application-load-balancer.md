---
title: Does Datadog support AWS ALB (Application Load Balancer)?
kind: faq
---

Yes! Our AWS integration was updated in August 2016 to support the new Application Load Balancer metrics published by AWS CloudWatch.

In July 2017, we added a dedicated namespace aws.applicationelb for these metrics. We used to report both classic ELBs and Application Load Balancers (ALBs) under the same namespace (aws.elb), but there are now 2 separate namespaces:

Classic ELBs have their metrics reported in Datadog under the namespace "aws.elb".

Application Load Balancers (ALBs) have their metrics reported in Datadog under the namespace "aws.applicationelb".

For instance, "aws.applicationelb.active_connection_count" is the Datadog metric name corresponding to the Cloudwatch metric ([ALB only][1]) named "ActiveConnectionCount".

{{< img src="integrations/faq/alb_metrics.png" alt="alb_metrics" responsive="true" >}}

Note that former ALB metrics that were reporting under the aws.elb namespace may still be present in this namespace as deprecated metrics.

[1]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/elb-metricscollected.html
