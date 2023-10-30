---
title: How Datadog Determines if Resources are Publicly Accessible
kind: guide
further_reading:
- link: "/security/misconfigurations"
  tag: "Documentation"
  text: "Start tracking misconfigurations with CSM Misconfigurations"
- link: "/security/default_rules/#cat-cloud-security-management"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
---

Datadog uses a graph processing framework to map relationships between cloud resources to determine whether they are accessible from the internet. This guide outlines the logic used to classify resources as publicly accessible within the graph framework. 

For more information on network reachability, see the [AWS documentation][34] and the [AWS Network Reachability Analyser][35]. Currently, the `Is Publicly Accessible` facet is only available for AWS resources.

## Resource dependency graph

The following diagram shows how related resources are used to determine whether other resources are publicly accessible. For example, a CloudTrail Trail stored in a public S3 bucket is itself publicly accessible. If a resource is publicly accessible because of another resource, the relationship is shown in the Cloud Security Management Misconfigurations Resource relationships graph.

Use this diagram as a reference for how resources are correlated to determine public accessibility. 

**Note**: Not all resources with the Publicly Accessible attribute are shown in this diagram.

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility" width="100%">}}

## Public accessibility logic by resource

The following section details on a resource-by-resource basis the logic behind public accessibility determination for a resource.

**Note:** Not all resources are able to be classified as publicly accessible or not publicly accessible through only their resource configuration. Such resources are not included here.


### Amazon S3 Bucket

An [S3 Bucket][1] (`aws_s3_bucket`) is considered publicly accessible if:

* _ACL-determined access:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The bucket's `public_access_block_configuration` and the bucket account's public access block (`aws_s3_account_public_access_block`) both have `ignore_public_acls` set to `false`. |An Access Control List (ACL) defines the AWS accounts and groups that are granted access to this bucket. With `ignore_public_acls` set to `false`, the bucket's configuration permits the use of an ACL that allows public access.  |
|The bucket's grant list contains a URI value of `http://acs.amazonaws.com/groups/global/AllUsers` or `/AuthenticatedUsers`. |`AllUsers` gives anyone in the world access to the bucket. `AuthenticatedUsers` gives any AWS authenticated user in the world access to the bucket. |

***OR***

* _Bucket Policy-determined access:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The bucket's `public_access_block_configuration` and the bucket account's public access block (`aws_s3_account_public_access_block`) both have `ignore_public_acls` set to `false`. |An Access Control List (ACL) defines the AWS accounts and groups that are granted access to this bucket. With `ignore_public_acls` set to `false`, the bucket's configuration permits the use of an ACL that allows public access.  |
|The bucket's policy statement allows the `s3:GetObject` permission unconditionally, with resource and principal set to `"*"`. |This defines a public policy on the bucket, meaning that cross-account access is allowed. `"*"` is a wildcard, meaning access is given to any resource and principal. |

See [Blocking public access to your Amazon S3 storage][2] for more information.

### AWS CloudTrail Trail

A [CloudTrail Trail][3] (`aws_cloudtrail_trail`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The trail's `s3_bucket_name` is set to an S3 bucket that is considered publicly accessible. |CloudTrail Trails are log files that are delivered to S3 buckets. If the trail is stored in a public S3 bucket, then that trail is publicly accessible. |

### Amazon VPC Subnet

A [Subnet][4] (`aws_subnet`) is considered public if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It's connected to one or more [route tables][5] that are connected to an [Internet gateway][6] and that route to a destination CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an Internet gateway, meaning resources in the subnet can access the public Internet.|
|It's connected to one or more [network ACLs][7] that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| Network ACLs control traffic that can leave or enter the subnet at the subnet level. When a network ACL rule allows ingress traffic from the Internet and allows egress traffic to ephemeral ports, it allows resources in the subnet to be exposed to the Internet if they are assigned a public IP and their security group allows it.|

See [Subnets for your VPC][8] for the AWS definition of a public subnet.

### Amazon Redshift Cluster

A [Redshift Cluster][9] (`aws_redshift_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|If it has `publicly_accessible` set to `true` in its configuration.|See [Managing clusters in a VPC][10]. |
|It's in a public [VPC][11]. |A public VPC is a VPC with at least one public subnet, connected to one or more network ACLs that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.|
|It's associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |
|It's connected to one or more [route tables][5] that are connected to an [Internet gateway][6], and that route to a destination CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an Internet gateway, meaning resources in the subnet can access the public Internet.|

See [Make a private Amazon Redshift Cluster publicly accessible][13] for more information about Redshift Clusters and public accessibility.

### Amazon RDS DB Instance

An [RDS DB Instance][14] (`aws_rds_instance`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has `publicly_accessible` set to `true` in its connectivity configuration.|This setting makes the DB publicly accessible, meaning its DNS endpoint will resolve to the private IP address within its VPC, and a public IP address from outside the VPC. However, access to the cluster will still be controlled by a related security group. |
|It's in a public [subnet][4].|-|
|It's associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |

See [Fix connectivity to an RDS DB instance that uses a VPC's subnet][15] for more information about public access to an RDS DB Instance.

### Amazon RDS DB Snapshot

An [RDS DB Snapshot][16] (`aws_rds_db_snapshot`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has an attribute set to `"restore"` with an attribute value set to `"all"`.|If you set DB snapshot visibility to Public, all AWS accounts can restore a DB instance from your manual DB snapshot and have access to your data.|

See [Sharing a DB snapshot][17] for more information.

### Amazon Elastic Load Balancer

An ELB (`aws_elbv2_load_balancer`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The [scheme][21] is set to `internet-facing`.|The scheme determines whether the load balancer is an internal load balancer or an Internet-facing load balancer.|
|It is associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |

See [Create an Application Load Balancer][20] for more information about Internet-facing load balancers.

### Amazon EC2 Instance

An [EC2 Instance][18] (`aws_ec2_instance`) is considered publicly accessible if:

* _"Public subnet"-determined access:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has one or more [public IP addresses][18].|A public IP address allows your instance to be reached from the internet.|
|It's in a public [subnet][4].|-|
|It's associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |

***OR***

* _ELB-determined access through autoscaling group:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|A security group (for example, `SG1`) attached to the load balancer is publicly accessible and allows ingress traffic to some port `X`.|This opens the load balancer to incoming traffic from the Internet on a specific port.|
|The load balancer has a listener accepting traffic on port `X`|A [listener][37] is a process that checks for connection requests, using the protocol and port that you configure|
|The load balancer has a target group forwarding traffic to some port `Y`.|[Target groups][38] route requests to one or more registered targets, such as EC2 instances, on a protocol and port that you specify. |
|An autoscaling group is attached to the load balancer's target group.|-|
|The EC2 instance is part of the autoscaling group, and has a security group that has at least one rule that allows ingress traffic from port `Y`, either from `0.0.0.0/0`, from the CIDR of the VPC (for example, `10.0.0.0/8`), or from the security group of the load balancer (`SG1`).|This opens the EC2 instance to traffic coming from the load balancer. The security group must allow traffic from the load balancer, and thus must be open either to all IPs, all IPs in the VPC, or that specific security group.|

***OR***

* _ELB-determined access through target group alone:_

| **Criteria** | **Explanation** |
|--------------|-----------------|
|Criteria 1, 2 and 3 from above (_ELB-determined access through autoscaling group_) apply. |-|
|The EC2 instance is listed as a target of the target group, and has a security group that has at least one rule that allows ingress traffic from port `Y`, either from `0.0.0.0/0`, from the CIDR of the VPC (for example, `10.0.0.0/8`), or from the security group of the load balancer (`SG1`).|Because the instance is listed as a target of the target group, the load balancer can forward traffic to it through port `Y`. The security group allows traffic from the load balancer.|

See [Authorize inbound traffic for your Linux instances][19] for more information about EC2 Instances and public access. See [Example: VPC with servers in private subnets and NAT][36] for an example of EC2 instances that are exposed through a load balancer.

### Amazon Elasticsearch Domain

An [Elasticsearch Domain][22] (`aws_elasticsearch_domain`) is considered publicly accessible if: 

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has an endpoint that matches the regex pattern `^search-.*\.es\.amazonaws\.com$`.|This is the form taken by [endpoints][23] for domains that are publicly accessible.|

See [Launching your Amazon OpenSearch Service domains within a VPC][24] for more information about making your Elasticsearch domain no longer publicly accessible.

### Amazon Machine Images (AMI)

A [Machine Image][25] (`aws_ami`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It is customer-owned, which means it does not have an aliased owner (either `amazon` or `aws-marketplace` in the account field).|Public AMIs owned by verified providers (either Amazon or verified partners) have an aliased owner, which appears as `amazon` or `aws-marketplace` in the account field. See [Find a shared AMI][26] in the AWS docs.|
|Its image is set to `public`, meaning that the launch permissions for the image are public.|By modifying the `launchPermission` property of an AMI, you can make the AMI public (which grants launch permissions to all AWS accounts), or share it with only the AWS accounts that you specify.|

See [Make an AMI public][27] for an explanation of how to make an AMI public or private. 

### Amazon EBS snapshots

An [EBS snapshot][28] (`aws_ebs_snapshot`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|`create_volume_permission` is set to `all`.|Each snapshot contains all of the information that is needed to restore the snapshot's data to a new EBS volume. If anyone can create a volume from the snapshot, that information is publicly accessible.|

See [Share an Amazon EBS snapshot][29] for information about public EBS snapshots and how to make them private.

### Amazon EKS clusters

An [EKS cluster][30] (`aws_eks_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|`endpoint_public_access` is set to `true` in the cluster's configuration.|This setting makes the cluster publicly accessible when combined with an open public CIDR. |
|The cluster's `public_access_cidrs` contains an open CIDR block (`"0.0.0.0/0"`).|You can limit the CIDR blocks that can access the public endpoint of the EKS cluster. An open CIDR block means anyone on the internet can access the endpoint.|

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
[20]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
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
[34]: https://docs.aws.amazon.com/
[35]: https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html
[36]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html
[37]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html
[38]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html
