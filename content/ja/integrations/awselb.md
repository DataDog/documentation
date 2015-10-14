---
title: Datadog-AWS ELB Integration
integration_title: AWS ELB
kind: integration
---

Elastic Load Balancing (ELB) is an AWS service used to dispatch incoming web traffic from your applications across your Amazon EC2 backend instances, which may be in different availability zones. ELB helps ensure a smooth user experience and provide increased fault tolerance, handling traffic peaks and failed EC2 instances without interruption.

To start collecting ELB metrics, the only thing you need to do is to set up our integration with AWS CloudWatch by following [these instructions](http://docs.datadoghq.com/integrations/aws/).


![DynamoDB default dashboard](/static/images/elb.png)


If you want to learn more about the key ELB performance metrics and how to monitor them, have a look to [this series of posts](https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics/).
