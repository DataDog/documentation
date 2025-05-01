---
{}
---
| Resource Type | Permissions |
| ------------- | ----------- |
| aws:acm:acm | acm:DescribeCertificate,<br/>acm:ListCertificates |
| aws:cloudfront:distribution | cloudfront:GetDistribution,<br/>cloudfront:ListDistributions |
| aws:cloudtrail:trail | cloudtrail:DescribeTrails,<br/>cloudtrail:GetEventSelectors,<br/>cloudtrail:GetTrailStatus |
| aws:docdb:cluster | rds:DescribeDBClusters |
| aws:dynamodb:table | dynamodb:DescribeContinuousBackups,<br/>dynamodb:DescribeTable,<br/>dynamodb:DescribeTimeToLive,<br/>dynamodb:ListTables |
| aws:ec2:snapshot | ec2:DescribeSnapshotAttribute,<br/>ec2:DescribeSnapshots |
| aws:ec2:volume | ec2:DescribeVolumes |
| aws:ec2:image | ec2:DescribeImageAttribute,<br/>ec2:DescribeImages |
| aws:ec2:instance | ec2:DescribeInstances |
| aws:ec2:networkacl | ec2:DescribeNetworkAcls |
| aws:ec2:networkinterface | ec2:DescribeNetworkInterfaces |
| aws:ec2:securitygroup | ec2:DescribeSecurityGroups |
| aws:ec2:vpcendpoint | ec2:DescribeVpcEndpoints |
| aws:ec2:vpc | ec2:DescribeVpcs |
| aws:ec2:vpcnatgateway | ec2:DescribeNatGateways |
| aws:ecs:cluster | ecs:DescribeClusters,<br/>ecs:ListClusters |
| aws:eks:cluster | eks:DescribeCluster,<br/>eks:ListClusters |
| aws:elasticache:cluster | elasticache:DescribeCacheClusters |
| aws:elasticloadbalancing:loadbalancer | elasticloadbalancing:DescribeInstanceHealth,<br/>elasticloadbalancing:DescribeLoadBalancerAttributes,<br/>elasticloadbalancing:DescribeLoadBalancerPolicies,<br/>elasticloadbalancing:DescribeLoadBalancers |
| aws:elasticloadbalancingv2:loadbalancer | elasticloadbalancing:DescribeListeners,<br/>elasticloadbalancing:DescribeLoadBalancerAttributes,<br/>elasticloadbalancing:DescribeLoadBalancers |
| aws:elasticsearchservice:domain | es:DescribeElasticsearchDomains,<br/>es:ListDomainNames |
| aws:iam:account | iam:GetAccountPasswordPolicy,<br/>iam:GetAccountSummary |
| aws:iam:server-certificate | iam:ListServerCertificates |
| aws:iam:policy | iam:GetPolicyVersion,<br/>iam:ListPolicies |
| aws:iam:role | iam:GetAccountAuthorizationDetails |
| aws:iam:user | iam:GetLoginProfile,<br/>iam:GetUser,<br/>iam:ListAttachedUserPolicies,<br/>iam:ListGroupsForUser,<br/>iam:ListMFADevices,<br/>iam:ListSSHPublicKeys,<br/>iam:ListUsers,<br/>iam:ListVirtualMFADevices |
| aws:kms:key | kms:DescribeKey,<br/>kms:GetKeyRotationStatus,<br/>kms:ListKeys |
| aws:lambda:function | lambda:GetPolicy,<br/>lambda:ListFunctionUrlConfigs,<br/>lambda:ListFunctions,<br/>lambda:ListProvisionedConcurrencyConfigs |
| aws:mq:broker | mq:DescribeBroker,<br/>mq:ListBrokers |
| aws:rds:instance | rds:DescribeDBInstances |
| aws:rds:snapshot | rds:DescribeDBSnapshotAttributes,<br/>rds:DescribeDBSnapshots |
| aws:redshift:cluster | redshift:DescribeClusterParameters,<br/>redshift:DescribeClusters,<br/>redshift:DescribeEndpointAccess,<br/>redshift:DescribeLoggingStatus |
| aws:s3:bucket | s3:GetBucketAcl,<br/>s3:GetEncryptionConfiguration,<br/>s3:GetLifecycleConfiguration,<br/>s3:GetBucketLogging,<br/>s3:GetBucketMetadataTableConfiguration,<br/>s3:GetBucketNotification,<br/>s3:GetBucketPolicy,<br/>s3:GetBucketPolicyStatus,<br/>s3:GetReplicationConfiguration,<br/>s3:GetBucketVersioning,<br/>s3:GetBucketWebsite,<br/>s3:GetBucketPublicAccessBlock,<br/>s3:GetInventoryConfiguration,<br/>s3:ListAllMyBuckets |
| aws:s3control:accountpublicaccessblock | s3:GetBucketPublicAccessBlock |
| aws:sns:topic | sns:GetTopicAttributes,<br/>sns:ListTopics |
| aws:sqs:queue | sqs:GetQueueAttributes,<br/>sqs:ListQueues |
