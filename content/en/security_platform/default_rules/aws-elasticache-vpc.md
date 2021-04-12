---
aliases:
- rrv-fo1-7oh
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elasticache
security: compliance
source: elasticache
title: ElastiCache cluster is provisioned in a VPC
type: security_rules
---

## Description

Provision your AWS EC2-VPC ElastiCache cluster within the AWS ECS-VPC platform.

## Rationale

Using the EC2-Classic platform minimizes control over cache cluster security and traffic routing. Provisioning with AWS EC2-VPC enables better networking infrastructure, control over VPC security groups, and more.

## Remediation

### Console

Follow the [Getting started with Amazon VPC][1] docs to configure AWS EC2-VPC for your ElastiCache clusters.

### CLI

1. Run `create-vpc` to [create a new Virtual Private Cloud (VPC)][2] for your ElastiCache cluster.

  {{< code-block lang="bash" filename="create-vpc.sh" >}}
  aws ec2 create-vpc
      --cidr-block 10.0.0.0/16
  {{< /code-block >}}

2. Run `aws ec2 create-internet-gateway` to [create a new AWS Internet Gateway][3] for your new VPC.

3. Run `attach-internet-gateway` with the [VPC ID returned in step 1, and the internet gateway ID returned in step 2][4].

  {{< code-block lang="bash" filename="create-subnet.sh" >}}
  aws ec2 create-subnet
      --vpc-id vpc-ab12c345
      --cidr-block 10.0.1.0/24
  {{< /code-block >}}

4. Run `create-route-table` with [your VPC ID][5] created in step 1.

  {{< code-block lang="bash" filename="create-route-table.sh" >}}
  aws ec2 create-route-table
      --vpc-id vpc-ab12c345
  {{< /code-block >}}

5. Run `associated-route-table` with the [subnet ID returned in step 3, and the route table ID returned in step 4][6].

  {{< code-block lang="bash" filename="associate-route-table.sh" >}}
  aws ec2 associate-route-table
    --route-table-id rta-12345678
    --subnet-id subnet-ab123c45
  {{< /code-block >}}

6. Run `create-route` to [add a new route][7] to your new VPC route table.

  {{< code-block lang="bash" filename="create-route.sh" >}}
  aws ec2 create-route
    --route-table-id rta-12345678
    --destination-cidr-block 0.0.0.0/0
    --gateway-id gwi-123a4b56
  {{< /code-block >}}

7. Run `create-security-group` with your new VPC ID to [create a security group][8] for your new cluster.

  {{< code-block lang="bash" filename="create-security-group.sh" >}}
  aws ec2 create-security-group
    --group-name ECSecurityGroup
    --description "Redis CC Security Group"
    --vpc-id vpc-ab12c345
  {{< /code-block >}}

8. Run `authorize-security-group-ingress` to [add more inbound rules][9] to the security group created in step 7.

  {{< code-block lang="bash" filename="authorize-security-group-ingress.sh" >}}
  aws ec2 authorize-security-group-ingress
    --group-id se-a12345b0
    --protocol tcp
    --port 1234
    --cidr 10.0.0.0/16
  {{< /code-block >}}

9. Run `create-cache-cluster` to recreate your EC2-Classic cache cluster within your new AWS VPC. Use the newly created [ElastiCache cluster configuration attributes][10] returned in the steps above.

  {{< code-block lang="bash" filename="create-cache-cluster.sh" >}}
  aws elasticache create-cache-cluster
    --cache-cluster-id vpccachecluster
    --az-mode single-az
    --cache-node-type cache.m5.large
    --num-cache-nodes 1
    --engine redis
    --engine-version "2.6.13"
    --security-group-ids "se-a12345b0"
    --port 1234
    --auto-minor-version-upgrade
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html
[2]: https://docs.aws.amazon.com/cli/latest/reference/ec2/create-vpc.html#synopsis
[3]: https://docs.aws.amazon.com/cli/latest/reference/ec2/create-internet-gateway.html#synopsis
[4]: https://docs.aws.amazon.com/cli/latest/reference/ec2/attach-internet-gateway.html#synopsis
[5]: https://docs.aws.amazon.com/cli/latest/reference/ec2/create-route-table.html#synopsis
[6]: https://docs.aws.amazon.com/cli/latest/reference/ec2/associate-route-table.html#synopsis
[7]: https://docs.aws.amazon.com/cli/latest/reference/ec2/create-route.html#synopsis
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/create-security-group.html#synopsis
[9]: https://docs.aws.amazon.com/cli/latest/reference/ec2/authorize-security-group-ingress.html#synopsis
[10]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/create-cache-cluster.html#synopsis
