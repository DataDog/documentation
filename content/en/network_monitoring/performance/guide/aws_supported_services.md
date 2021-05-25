---
title: NPM AWS Supported Services
kind: guide
npm_provider: aws
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: 'Blog'
    text: 'Network Performance Monitoring'
  - link: '/network_monitoring/devices'
    tag: 'Documentation'
    text: 'Network Device Monitoring'
---

Datadog Network Performance Monitoring (NPM) automatically detects S3, RDS, Kinesis, ELB, Elasticache, and other AWS services listed in the [aws-sdk-go repo][1]:

{{< get-npm-integrations "aws" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/aws/aws-sdk-go/blob/main/aws/endpoints/defaults.go
