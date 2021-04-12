---
aliases:
- n11-17q-3pj
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elasticache
security: compliance
source: elasticache
title: ElastiCache cluster is not using default ports
type: security_rules
---

## Description

Change your AWS ElastiCache cluster endpoint port to a non-default port.

## Rationale

Using the default port puts clusters at risk of exploits and attacks. Configure a custom port to add an extra layer of security to your clusters.

## Remediation

### Console

Follow the [Finding connection endpoints][1] console documentation to learn how to find and modify your cluster's endpoint port.

### CLI

1. Run `aws elasticache describe-cache-clusters` with your [ElastiCache cluster ID][2] to output the existing cluster configuration.

  {{< code-block lang="bash" filename="describe-cache-clusters.sh" >}}

  aws elasticache describe-cache-clusters
    --cache-cluster-id your-cc-id

  {{< /code-block >}}

2. Run `aws elasticache create-cache-cluster` with the cluster data returned in the previous step. Configure the new cache cluster with [a custom value][3] for the endpoint port. This returns new cluster metadata.

  {{< code-block lang="bash" filename="create-cache-cluster.sh" >}}

  aws elasticache create-cache-cluster
    --cache-cluster-id new-cc-id
    ...
    --port 10001

    {{< /code-block >}}

3. Once the cluster endpoint port is updated, remove the old ElastiCache cluster. Run `delete-cache-cluster` with the [original cluster ID][4].

  {{< code-block lang="bash" filename="delete-cache-cluster.sh" >}}

  aws elasticache delete-cache-cluster
    --cache-cluster-id your-cc-id

  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Endpoints.html#Endpoints.Find.Redis
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/describe-cache-clusters.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/create-cache-cluster.html#synopsis
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/delete-cache-cluster.html#synopsis
