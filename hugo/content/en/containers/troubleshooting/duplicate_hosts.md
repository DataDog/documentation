---
title: Duplicate hosts with Kubernetes on AWS (EC2 or EKS)
description: Troubleshoot duplicate host issues when running Datadog Agent in Kubernetes environments on AWS EC2 or EKS
---

If you are running the Datadog Agent in a Kubernetes environment on AWS (fully self-managed on EC2, or using EKS) you may see a problem with duplicate hosts. One host is using a hostname coming from the Datadog Agent, while the other is the AWS `instance-id` collected by Datadog's AWS integration.

## Background

To perform hostname resolution, the Datadog Agent queries the local EC2 Instance Metadata Service (IMDS) to detect the EC2 `instance-id`. The Agent then submits this `instance-id` as a hostname alias. Datadog merges the data from the Agent and the data from the AWS integration into one host.

When the Datadog Agent cannot query the EC2 metadata endpoint, duplicate hostnames may arise.

## Diagnosis

Use the Agent flare command to generate a flare. Then look at `diagnose.log`. You may find a failure like the following:

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

You can alternatively [test the access to IMDSv2][2] manually by exec-ing into an Agent pod or container and then running a command like the following.

```shell
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"` && curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id
```

The AWS instance ID is returned in a successful response.

## Remediation

Update your configuration to allow access to the EC2 metadata endpoint.

If your hosts are using IMDSv2 and restricting access to IMDSv1, you also need to:
1. Use Agent `7.64.0` or above to default to IMDSv2. In prior versions, set the environment variable `DD_EC2_PREFER_IMDSV2` to `true`.
2. Increase the [IMDS hop limit][1] from `1` to `2` to allow access from containerized environments.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-retrieval-examples