---
title: Datadog-AWS Route 53 Integration
integration_title: AWS Route 53
kind: integration
newhlevel: true
git_integration_title: amazon_route53
---

# Overview

AWS Route 53 provides DNS and traffic management along with availability and performance monitoring via health checks. You can view the health check information in Datadog to provide context around other metrics and events in your environments. Here's an example dashboard of Route 53's health check status graph:

![](/static/images/route53_graph.png)

For information about the rest of the AWS services, see the [AWS tile][1]

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

Configure Route 53 on AWS and ensure that the policy you created has the **route53:List*** action allowed. Here is an example policy to give access to Route 53 health checks.

    {
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "route53:List*"
          ],
          "Resource": [
            "*"
          ]
        }
      ]
    }
{:.language-json}


# Configuration

In the Amazon Web Services integration tile, ensure that Route53 is checked under metric collection.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

[1]: /integrations/aws
