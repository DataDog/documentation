---
title: Background for Public Accessibility
kind: guide
further_reading:
- link: "/security/cspm"
  tag: "Documentation"
  text: "Cloud Security Posture Management"
- link: "/security/default_rules/#cat-cloud-security-management"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
---

Datadog uses a graph processing framework to map relationships between cloud resources to determine whether they are accessible from the internet. This guide outlines the logic used to classify resources as publicly accessible within the graph framework. 

For more information on network reachability, see the AWS documentation and the AWS Network Reachability Analyser. Currently, the `Is Publicly Accessible` facet is only available for AWS resources.

## Resource Dependency Graph

This graph shows how related resources are used to determine whether other resources are publicly accessible. For example, a Cloudtrail Trail stored in a public S3 bucket is itself publicly accessible. If a resource is publicly accessible because of another resource, we will show this relation in the CSPM Resource relationships graph.

Use this graph as a reference for how resources are correlated to determine public accessibility. Note: not all resources with the Publicly Accessible attribute are shown in this graph:

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility" width="75%">}}

## Public Accessibility Logic by Resource

The following section details on a resource-by-resource basis the logic behind public accessibility determination for a resource. 
**Note:** not all resources are able to be classified as publicly accessible or not publicly accessible through only their resource configuration. Such resources are not included here.


### Amazon S3 Bucket

An [S3 Bucket][1] (`aws_s3_bucket`) is considered publicly accessible if:

* _ACL-determined access:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The bucket’s `public_access_block_configuration` AND the bucket account’s public access block (`aws_s3_account_public_access_block`) both have `ignore_public_acls` set to `false` |An ACL (Access Control List) defines the AWS accounts and groups that are granted access to this bucket. With `ignore_public_acls` set to `false`, the bucket's configuration permits the use of an ACL that allows public access.  |
|The bucket’s grant list contains a uri value of `http://acs.amazonaws.com/groups/global/AllUsers` or `/AuthenticatedUsers` |`AllUsers` gives anyone in the world access. `AuthenticatedUsers` gives any AWS authenticated user in the world access. |

**OR**

* _Bucket Policy-determined access:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The bucket’s `public_access_block_configuration` AND the bucket account’s public access block (`aws_s3_account_public_access_block`) both have `ignore_public_acls` set to `false` |An ACL (Access Control List) defines the AWS accounts and groups that are granted access to this bucket. With `ignore_public_acls` set to `false`, the bucket's configuration permits the use of an ACL that allows public access.  |
|The bucket’s policy statement allows the `s3:GetObject` permission unconditionally, with resource and principal set to `"*"` |This defines a public policy on the bucket, meaning that cross-account access is allowed. `"*"` is a wildcard, meaning access is given to any resource and principal. |

See [Blocking public access to your Amazon S3 storage][2] for more information.

### Amazon Cloudtrail Trail

A [Cloudtrail Trail][3] (`aws_cloudtrail_trail`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The trail’s `s3_bucket_name` is set to an S3 bucket that is considered publicly accessible. |Cloudtrail Trails are log files that are delivered to S3 Buckets. If the trail is stored in a public S3 bucket, then that trail is publicly accessible. |

### Amazon VPC Subnet

A [Subnet][4] (`aws_subnet`) is considered public if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It is connected to one or more [Route Tables][5] that are connected to an [Internet Gateway][6] and that route to a destination CIDR block of `"0.0.0.0/0"` or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an Internet gateway, meaning resources in the subnet can access the public Internet.|
|It is connected to one or more [Network ACLs][7] that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"` or an IPv6 CIDR block of `"::/0"`.| Network ACLs control traffic that can leave or enter the subnet at the subnet level. When a network ACL rule allows ingress traffic from the Internet and allows egress traffic to ephemeral ports, it allows resources in the subnet to be exposed to the Internet if they are assigned a public IP and their security group allows it|

See [Subnets for your VPC][8] for the AWS definition of a public subnet.

### Amazon Redshift Cluster

A [Redshift Cluster][9] (`aws_redshift_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|If it has publicly_accessible set to true in its configuration|See [Managing clusters in a VPC][10] |
|It is in a public [VPC][11] |A “public VPC” is a VPC with at least one public subnet, connected to one or more Network ACLs that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"` or an IPv6 CIDR block of `"::/0"`.|
|It is associated with a [Security Group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"` or an IPv6 CIDR range of `"::/0"`. |A Security Group controls inbound traffic to a VPC. With an open CIDR range, all ip addresses are able to gain access. |
|It is connected to one or more [Route Tables][5] that are connected to an [Internet Gateway][6] and that route to a destination CIDR block of `"0.0.0.0/0"` or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an Internet gateway, meaning resources in the subnet can access the public Internet.|

See [Make a private Amazon Redshift Cluster publicly accessible][13] for more information about Redshift Clusters and public accessibility.

### Amazon RDS DB Instance

An [RDS DB Instance][14] (`aws_rds_instance`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has `publicly_accessible` set to `true` in its connectivity configuration.|This setting makes the DB publicly accessible, meaning its DNS endpoint will resolve to the private IP address within its VPC, and a public IP address from outside the VPC. However, access to the cluster will still be controlled by a related security group. |
|It is in a public [Subnet][4]|-|
|It is associated with a [Security Group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"` or an IPv6 CIDR range of `"::/0"`. |A Security Group controls inbound traffic to a VPC. With an open CIDR range, all ip addresses are able to gain access. |

See [Fix connectivity to an RDS DB instance that uses a VPC's subnet][15] for more information about public access to an RDS DB Instance.

### Amazon RDS DB Snapshot

An [RDS DB Snapshot][16] (`aws_rds_db_snapshot`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has an attribute set to `"restore"` with an attribute value set to `"all"`.|If you set DB snapshot visibility to Public, all AWS accounts can restore a DB instance from your manual DB snapshot and have access to your data.|

See [Sharing a DB snapshot][17] for more information.

### Amazon EC2 Instance

An [EC2 Instance][18] (`aws_ec2_instance`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has one or more [public IP addresses][18]|A public IP address allows your instance to be reached from the internet.|
|It is in a public [Subnet][4]|-|
|It is associated with a [Security Group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"` or an IPv6 CIDR range of `"::/0"`. |A Security Group controls inbound traffic to a VPC. With an open CIDR range, all ip addresses are able to gain access. |

See [Authorize inbound traffic for your Linux instances][19] for more information about EC2 Instances and public access.

### Amazon Elastic Load Balancer

An ELB (`aws_elbv2_load_balancer`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has its [scheme][21] set to `internet-facing`|The scheme determines whether the load balancer is an internal load balancer or an internet-facing load balancer.|
|It is associated with a [Security Group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"` or an IPv6 CIDR range of `"::/0"`. |A Security Group controls inbound traffic to a VPC. With an open CIDR range, all ip addresses are able to gain access. |

See [Internet-facing Classic Load Balancers][20] for more information.

### Amazon Elasticsearch Domain

An [Elasticsearch Domain][22] (`aws_elasticsearch_domain`) is considered publicly accessible if: 

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has an endpoint that matches the regex pattern `^search-.*\.es\.amazonaws\.com$`|This is the form taken by [endpoints][23] for domains that are publicly accessible.|

See [Launching your Amazon OpenSearch Service domains within a VPC][24] for more information about making your Elasticsearch domain no longer publicly accessible.

### Amazon Machine Images (AMI)

A [Machine Image][25] (`aws_ami`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It is customer-owned, which means it does not have an aliased owner (either `amazon` or `aws-marketplace` in the account field)|Public AMIs owned by verified providers (either Amazon or verified partners) have an aliased owner, which appears as `amazon` or `aws-marketplace` in the account field. See [Find a shared AMI][26] in the AWS docs.|
|Its image is set to `public`, meaning that the launch permissions for the image are public.|By modifying the `launchPermission` property of an AMI, you can make the AMI public (which grants launch permissions to all AWS accounts), or share it with only the AWS accounts that you specify.|

See [Make an AMI public][27] for an explanation of how to make an AMI public or private. 

### Amazon EBS snapshots

An [EBS snapshot][28] (`aws_ebs_snapshot`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has a `create_volume_permission` set to `all`|Each snapshot contains all of the information that is needed to restore the snapshot’s data to a new EBS volume. If anyone can create a volume from the snapshot, that information is publicly accessible.|

See [Share an Amazon EBS snapshot][29] for information about public EBS snapshots and how to make them private.

### Amazon EKS clusters

An [EKS cluster][30] (`aws_eks_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|`endpoint_public_access` is set to `true` in the cluster’s configuration.|This setting makes the cluster publicly accessible when combined with an open public CIDR. |
|The cluster’s `public_access_cidrs` contains an open CIDR block (`"0.0.0.0/0"`).|You can limit the CIDR blocks that can access the public endpoint of the EKS cluster. An open CIDR block means anyone on the internet can access the endpoint.|

See [Amazon EKS cluster endpoint access control][31] for more information on public EKS clusters.

### Amazon SQS Queue

An [SQS Queue][32] (`aws_sqs_queue`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The queue has a policy that allows any principal (principal set to `"*"`) to perform actions unconditionally (`statement_has_condition` set to `false`).|This setting makes the queue accessible to everyone in the world or to any authenticated AWS user.|

See [Amazon SQS security best practices][33] for more information about public SQS queues.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#BasicsBucket
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#RouteTables
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
[8]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
[9]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#working-with-clusters-overview
[10]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html
[11]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html
[12]: https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html
[13]: https://repost.aws/knowledge-center/redshift-cluster-private-public
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[15]: https://repost.aws/knowledge-center/rds-connectivity-instance-subnet-vpc
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html
[18]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#concepts-public-addresses
[19]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html
[20]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-internet-facing-load-balancers.html
[21]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
[22]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html
[23]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html#vpc-architecture
[24]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html
[25]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[26]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/usingsharedamis-finding.html#usingsharedamis-finding-cli
[27]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-intro.html
[28]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html
[29]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-modifying-snapshot-permissions.html
[30]: https://docs.aws.amazon.com/eks/latest/userguide/clusters.html
[31]: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
[32]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
[33]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-security-best-practices.html
