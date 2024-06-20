---
title: How Datadog Determines if Resources are Publicly Accessible
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Start tracking misconfigurations with CSM Misconfigurations"
- link: "/security/default_rules/#cat-cloud-security-management"
  tag: "Documentation"
  text: "Out-of-the-box Detection Rules"
---

Datadog uses a graph processing framework to map relationships between cloud resources to determine whether they are accessible from the internet. This guide outlines the logic used to classify resources as publicly accessible within the graph framework.

For more information on network reachability, see the [AWS documentation][34] and the [AWS Network Reachability Analyser][35]. Currently, the `Is Publicly Accessible` facet is only available for AWS resources.

## Resource dependency graph

The following diagrams show how related resources are used to determine whether other resources are publicly accessible. For example, an AWS CloudTrail Trail stored in a public Amazon S3 bucket is itself publicly accessible. If a resource is publicly accessible because of another resource, the relationship is shown in the Cloud Security Management Misconfigurations resource relationships graph.


**Note**: Not all resources with the Publicly Accessible attribute are shown in these diagrams.

### AWS

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for AWS" width="100%">}}

### Azure

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for Azure" width="70%">}}

### Google Cloud

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="A graph diagram showing the relationships between resources that are used to determine public accessibility for Google Cloud" width="50%">}}

## AWS public accessibility logic by resource

### Amazon S3 bucket

An [S3 bucket][1] (`aws_s3_bucket`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The bucket policy allows the `s3:GetObject` permission unconditionally, with resource and principal set to `"*"`. |This defines a public policy on the bucket, meaning that unauthenticated access is allowed. `"*"` is a wildcard, meaning access is given to any resource and principal. |
| None of the bucket's `public_access_block_configuration` and the AWS account's public access block (`aws_s3_account_public_access_block`) have `restrict_public_buckets` set to `true`. | None of the buckets or accounts explicitly block public access, meaning that the public bucket policy takes effect. |

See [Blocking public access to your Amazon S3 storage][2] for more information.

### AWS CloudTrail trail

A [CloudTrail trail][3] (`aws_cloudtrail_trail`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The trail's `s3_bucket_name` is set to an S3 bucket that is considered publicly accessible. |CloudTrail Trails are log files that are delivered to S3 buckets. If the trail is stored in a public S3 bucket, then that trail is publicly accessible. |

### Amazon VPC subnet

A [subnet][4] (`aws_subnet`) is considered public if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It's connected to one or more [route tables][5] that are connected to an [Internet gateway][6] and that route to a destination CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an internet gateway, meaning resources in the subnet can access the public internet.|
|It's connected to one or more [network ACLs][7] that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| Network ACLs control traffic that can leave or enter the subnet at the subnet level. When a network ACL rule allows ingress traffic from the Internet and allows egress traffic to ephemeral ports, it allows resources in the subnet to be exposed to the Internet if they are assigned a public IP and their security group allows it.|

See [Subnets for your VPC][8] for the AWS definition of a public subnet.

### Amazon Redshift cluster

A [Redshift cluster][9] (`aws_redshift_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|If it has `publicly_accessible` set to `true` in its configuration.|See [Managing clusters in a VPC][10]. |
|It's in a public [VPC][11]. |A public VPC is a VPC with at least one public subnet, connected to one or more network ACLs that have at least one ingress and at least one egress entry that have a CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.|
|It's associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |
|It's connected to one or more [route tables][5] that are connected to an [Internet gateway][6], and that route to a destination CIDR block of `"0.0.0.0/0"`, or an IPv6 CIDR block of `"::/0"`.| The route table attached to this subnet routes egress traffic through an Internet gateway, meaning resources in the subnet can access the public Internet.|

See [Make a private Amazon Redshift Cluster publicly accessible][13] for more information about Redshift Clusters and public accessibility.

### Amazon RDS DB instance

An [RDS DB instance][14] (`aws_rds_instance`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|It has `publicly_accessible` set to `true` in its connectivity configuration.|This setting makes the DB publicly accessible, meaning its DNS endpoint will resolve to the private IP address within its VPC, and a public IP address from outside the VPC. However, access to the cluster will still be controlled by a related security group. |
|It's in a public [subnet][4].|-|
|It's associated with a [security group][12] that has rules allowing access from a CIDR range of `"0.0.0.0/0"`, or an IPv6 CIDR range of `"::/0"`. |A security group controls inbound traffic to a VPC. With an open CIDR range, all IP addresses are able to gain access. |

See [Fix connectivity to an RDS DB instance that uses a VPC's subnet][15] for more information about public access to an RDS DB Instance.

### Amazon RDS DB snapshot

An [RDS DB snapshot][16] (`aws_rds_db_snapshot`) is considered publicly accessible if:

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

### Amazon EC2 instance

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

### Amazon SQS queue

An [SQS queue][32] (`aws_sqs_queue`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The queue has a policy that allows any principal (principal set to `"*"`) to perform actions unconditionally (`statement_has_condition` set to `false`).|This setting makes the queue accessible to everyone in the world or to any authenticated AWS user.|

See [Amazon SQS security best practices][33] for more information about public SQS queues.

### AWS Lambda function

A [Lambda function][58] (`aws_lambda_function`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|The function has a policy that allows any principal (`principal_policy` or `principal_aws`) set to `"*"`. |This setting makes the function accessible to everyone in the world or to any authenticated AWS user.|

See [Best practices for working with AWS Lambda functions][59] for more information about public Lambda functions.

## Azure public accessibility logic by resource

### Azure Network Security Group (NSG)

An Azure NSG (`azure_security_group`) grants public access if:

| Criteria | Explanation |
|----------|-------------|
|The security group has rules with protocol `tcp`, `udp` or `*`. | These are the protocol values that are relevant for determining public access for Azure resources. |
|The security group has `inbound` rules with access set to `Allow`. | These values indicates that the rule is allowing inbound traffic. |
|The security group has rules with source_address_prefix equal to `*`, `0.0.0.0`, `/0`, `::/0`, `internet`, or `any`. | These CIDR prefixes allow access to the internet. |
|The rules which match the above properties combine with any other `Deny` rules of higher priority to open at least one port to the Internet. | See [Security rules][39] to learn how Azure combines security group rules to calculate access. |

For details on how Azure NSGs allow and deny Internet access for a resource, see [Network Security Groups][40].

### Azure Virtual Machine Instance

A Virtual Machine Instance (`azure_virtual_machine_instance`) is considered publicly accessible if:

* _Attached to Network Security Group allowing public access:_

| Criteria | Explanation |
|----------|-------------|
|The virtual machine instance has a public IP address attached to one of its network interfaces. | A public IP is required for Internet access to a virtual machine instance. |
|The virtual machine instance has a network security group granting public access attached to one of its network interfaces. | To learn more about how a network can grant public access, see [Azure Network Security Group (NSG)](#azure-network-security-group-nsg). |

***OR***

* _Has Public IP with SKU "Basic":_

| Criteria | Explanation |
|----------|-------------|
|The virtual machine instance has a public IP address with SKU Basic attached to its network interface. | A public IP address with SKU basic is open by default (see [Public IP addresses][41]). |
|The virtual machine instance has no attached network security groups. | If no network security groups are attached, then there are no rules blocking access through the open public IP address. |

To learn more about Azure Virtual Machine Instances and public access, see [Associate a public IP address to a virtual machine][42].

### Azure Storage blob container

A Storage blob container (`azure_storage_blob_container`) is considered publicly accessible if:

| Criteria | Explanation |
|----------|-------------|
|The storage blob container's storage account has no `allow_blob_public_access` attribute, or has the attribute set to `true`. | This means that the account allows public Internet access to Azure Blob Storage. To learn more about configuring anonymous read access with Azure Storage Accounts, see [Configure anonymous read access for containers and blobs][45].|
|The storage blob container's `public_access` attribute is set to `blob` or `container`. | This means that the account allows public Internet access to Azure Blob Storage. |
|The storage blob container is part of a storage account that does not explicitly block public access. | When a Storage Account doesn't explicitly block public access, Storage Blob Containers inside it can be made public. |

To learn more about disallowing blob public access on Azure Storage accounts, see [Choose to allow or disallow blob public access on Azure Storage accounts][46].

### Azure Kubernetes Service (AKS) cluster

An [AKS cluster][60] (`azure_aks_cluster`) is considered publicly accessible if:

| **Criteria** | **Explanation** |
|--------------|-----------------|
|`enable_private_cluster` is set to `false` in the cluster's configuration.|This setting makes the cluster publicly accessible when combined with an open public CIDR. |
|The cluster's `authorized_ip_ranges` contains an open CIDR block (`"0.0.0.0/0"`) or is unset.|An open CIDR block means anyone on the internet can access the endpoint.|

See [AKS best practices][61] for more information on public AKS clusters.

## Google Cloud Public accessibility logic by resource

### Google Cloud Compute firewall

A Compute Firewall (`gcp_compute_firewall`) grants public access if:

| Criteria | Explanation |
|----------|-------------|
|The firewall has one or more rules whose protocol is TCP or all and which have `0.0.0.0/0` or `::/0` in their `source_ranges`. | These CIDR prefixes allow access from the Internet, and are the protocol values that are relevant for determining public access. |
|The firewall's direction is `ingress`. | This means that the firewall is relevant for inbound access from the Internet. |

For more information about using Compute firewalls, [Choose to allow or disallow blob public access on Azure Storage accounts][47].

### Google Cloud Compute instance

A Compute instance (`gcp_compute_instance`) is considered publicly accessible if:

| Criteria | Explanation |
|----------|-------------|
|The compute instance has a public IP address, meaning at least one of its network interfaces has a public IP address defined in its access configurations, | To learn more about adding an external IP to a compute instance, see [Reserve a static external IP address][48]. |
|The compute instance has associated firewall rules that combine to open some range of ports to the internet. The firewall rules can be associated with the instance by:<br><p><ul><li>Having no `target_tags` or `target_service_accounts`, meaning the rule applies to the whole network.</li><li>Having `target_service_accounts` associated with one of the compute instance's `service_accounts`.</li><li>Having some `target_tags` that match the compute instance's network tags.</li></ul></p>The rules should grant public access (see [Google Cloud Compute Firewall](#google-cloud-compute-firewall)). | To learn how compute firewall rules are used to restrict port ranges for a compute instance, see [Firewall rule components][49]. |

Learn more about how compute firewall rules are used to restrict port ranges for a compute instance [here][50].

### Google Cloud BigQuery dataset

A BigQuery dataset (`gcp_bigquery_dataset`) is considered publicly accessible if:

| Criteria | Explanation |
|----------|-------------|
|The dataset has an IAM policy attached that has a `member` value of either `AllUsers` or `AllAuthenticatedUsers`. | These members allow anyone on the internet to access the database. See [IAM overview][51] for more information. |
|The dataset has an IAM policy attached that binds it to one of the following roles: `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer`, or `roles/bigquery.user`. | These roles allow the person who accesses the resource to perform dangerous operations on the database. See the [role reference][52] for more information. |

Learn more about [BigQuery datasets][53].

### Google Cloud Storage bucket

A Storage Bucket (`gcp_storage_bucket`) is considered publicly accessible if:

| Criteria | Explanation |
|----------|-------------|
|The bucket has an IAM policy attached that has a `member` value of either `AllUsers` or `AllAuthenticatedUsers`. | These members allow anyone on the Internet to access the database. See more [here][54]. |
|The bucket has `public_access_prevention` set to `inherited` in its `iam_configuration`. | This setting block public access if set to `enforced`. For more information about the public access prevention setting, see [Public access prevention][55]. |
|The bucket has an IAM policy attached that binds it to one of the following roles: <ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|These roles allow the person who accesses the resource to perform dangerous operations on the bucket. See the [role reference][56] for more information.|

Explore more information about making storage buckets public [here][57].

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
[39]: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview#security-rules
[40]: https://azure.microsoft.com/en-us/blog/network-security-groups/
[41]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses
[42]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/associate-public-ip-address-vm?tabs=azure-portal
[43]: https://learn.microsoft.com/en-us/rest/api/compute/disks/create-or-update?view=rest-compute-2023-04-02&tabs=HTTP
[44]: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-private-links-for-import-export-portal
[45]: https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal
[46]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[47]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[48]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
[49]: https://cloud.google.com/firewall/docs/firewalls#firewall_rule_components
[50]: https://cloud.google.com/compute/docs/instances
[51]: https://cloud.google.com/iam/docs/overview
[52]: https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles
[53]: https://cloud.google.com/bigquery?hl=en
[54]: https://cloud.google.com/iam/docs/overview
[55]: https://cloud.google.com/storage/docs/public-access-prevention
[56]: https://cloud.google.com/iam/docs/understanding-roles#cloud-storage-roles
[57]: https://cloud.google.com/storage/docs/access-control/making-data-public
[58]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[59]: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
[60]: https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes
[61]: https://learn.microsoft.com/en-us/azure/aks/best-practices
