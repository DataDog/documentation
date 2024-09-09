---
title: Duplicate hosts with Kubernetes on AWS (EC2 or EKS)
---

If you are running the Datadog Agent in a Kubernetes environment on AWS (fully self-managed on EC2, or using EKS) you may see a problem with duplicate hosts. One host is using a hostname coming from the Datadog Agent, while the other is the AWS `instance-id` collected by Datadog's AWS integration.

## Background

To perform hostname resolution, the Datadog Agent queries the local EC2 metadata endpoint to detect the EC2 `instance-id`. The Agent then submits this `instance-id` as a hostname alias. Datadog merges the data from the Agent and the data from the AWS integration into one host.

When the Datadog Agent cannot query the EC2 metadata endpoint, duplicate hostnames may arise.

## Diagnosis

Use the Agent flare command to generate a flare. Then look at `diagnose.log`. You may find a failure like the following:

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

## Remediation

Update your configuration to allow access to the EC2 metadata endpoint.

If you are using IMDSv2, you also need to:
1. Set the environment variable `DD_EC2_PREFER_IMDSV2` to `true`.
2. Increase the [hop limit][1] from `1` to `2`.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
