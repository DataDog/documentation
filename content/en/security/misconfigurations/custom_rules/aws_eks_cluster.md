---
dependencies: []
disable_edit: true
---
# aws_eks_cluster

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `arn`<br>
**Description**: The Amazon Resource Name (ARN) of the cluster.<br>
## `certificate_authority`
**Type**: `STRUCT`<br>
**Provider name**: `certificateAuthority`<br>
**Description**: The <code>certificate-authority-data</code> for your cluster.<br>
   - `data`<br>
    **Type**: `STRING`<br>
    **Provider name**: `data`<br>
    **Description**: The Base64-encoded certificate data required to communicate with your cluster. Add this to the <code>certificate-authority-data</code> section of the <code>kubeconfig</code> file for your cluster.<br>
## `client_request_token`
**Type**: `STRING`<br>
**Provider name**: `clientRequestToken`<br>
**Description**: Unique, case-sensitive identifier that you provide to ensure the idempotency of the request.<br>
## `connector_config`
**Type**: `STRUCT`<br>
**Provider name**: `connectorConfig`<br>
**Description**: The configuration used to connect to a cluster for registration.<br>
   - `activation_code`<br>
    **Type**: `STRING`<br>
    **Provider name**: `activationCode`<br>
    **Description**: A unique code associated with the cluster for registration purposes.<br>
   - `activation_expiry`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `activationExpiry`<br>
    **Description**: The expiration time of the connected cluster. The cluster's YAML file must be applied through the native provider.<br>
   - `activation_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `activationId`<br>
    **Description**: A unique ID associated with the cluster for registration purposes.<br>
   - `provider`<br>
    **Type**: `STRING`<br>
    **Provider name**: `provider`<br>
    **Description**: The cluster's cloud service provider.<br>
   - `role_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `roleArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the role to communicate with services from the connected Kubernetes cluster.<br>
## `created_at`
**Type**: `TIMESTAMP`<br>
**Provider name**: `createdAt`<br>
**Description**: The Unix epoch timestamp in seconds for when the cluster was created.<br>
## `encryption_config`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `encryptionConfig`<br>
**Description**: The encryption configuration for the cluster.<br>
   - `provider`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `provider`<br>
    **Description**: Key Management Service (KMS) key. Either the ARN or the alias can be used.<br>
       - `key_arn`<br>
        **Type**: `STRING`<br>
        **Provider name**: `keyArn`<br>
        **Description**: Amazon Resource Name (ARN) or alias of the KMS key. The KMS key must be symmetric, created in the same region as the cluster, and if the KMS key was created in a different account, the user must have access to the KMS key. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html">Allowing Users in Other Accounts to Use a KMS key</a> in the <i>Key Management Service Developer Guide</i>.<br>
   - `resources`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `resources`<br>
    **Description**: Specifies the resources to be encrypted. The only supported value is "secrets".<br>
## `endpoint`
**Type**: `STRING`<br>
**Provider name**: `endpoint`<br>
**Description**: The endpoint for your Kubernetes API server.<br>
## `identity`
**Type**: `STRUCT`<br>
**Provider name**: `identity`<br>
**Description**: The identity provider information for the cluster.<br>
   - `oidc`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `oidc`<br>
    **Description**: An object representing the <a href="https://openid.net/connect/">OpenID Connect</a> identity provider information.<br>
       - `issuer`<br>
        **Type**: `STRING`<br>
        **Provider name**: `issuer`<br>
        **Description**: The issuer URL for the OIDC identity provider.<br>
## `kubernetes_network_config`
**Type**: `STRUCT`<br>
**Provider name**: `kubernetesNetworkConfig`<br>
**Description**: The Kubernetes network configuration for the cluster.<br>
   - `ip_family`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ipFamily`<br>
    **Description**: The IP family used to assign Kubernetes Pod and Service IP addresses. The IP family is always <code>ipv4</code>, unless you have a <code>1.21</code> or later cluster running version 1.10.0 or later of the Amazon VPC CNI add-on and specified <code>ipv6</code> when you created the cluster.<br>
   - `service_ipv4_cidr`<br>
    **Type**: `STRING`<br>
    **Provider name**: `serviceIpv4Cidr`<br>
    **Description**: The CIDR block that Kubernetes Pod and Service IP addresses are assigned from. Kubernetes assigns addresses from an IPv4 CIDR block assigned to a subnet that the node is in. If you didn't specify a CIDR block when you created the cluster, then Kubernetes assigns addresses from either the 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. If this was specified, then it was specified when the cluster was created and it can't be changed.<br>
   - `service_ipv6_cidr`<br>
    **Type**: `STRING`<br>
    **Provider name**: `serviceIpv6Cidr`<br>
    **Description**: The CIDR block that Kubernetes Pod and Service IP addresses are assigned from if you created a 1.21 or later cluster with version 1.10.0 or later of the Amazon VPC CNI add-on and specified <code>ipv6</code> for <b>ipFamily</b> when you created the cluster. Kubernetes assigns addresses from the unique local address range (fc00::/7).<br>
## `logging`
**Type**: `STRUCT`<br>
**Provider name**: `logging`<br>
**Description**: The logging configuration for your cluster.<br>
   - `cluster_logging`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `clusterLogging`<br>
    **Description**: The cluster control plane logging configuration for your cluster.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `enabled`<br>
        **Description**: If a log type is enabled, that log type exports its control plane logs to CloudWatch Logs. If a log type isn't enabled, that log type doesn't export its control plane logs. Each individual log type can be enabled or disabled independently.<br>
       - `types`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `types`<br>
        **Description**: The available cluster control plane log types.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The name of the cluster.<br>
## `platform_version`
**Type**: `STRING`<br>
**Provider name**: `platformVersion`<br>
**Description**: The platform version of your Amazon EKS cluster. For more information, see <a href="https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html">Platform Versions</a> in the <i> <i>Amazon EKS User Guide</i> </i>.<br>
## `resources_vpc_config`
**Type**: `STRUCT`<br>
**Provider name**: `resourcesVpcConfig`<br>
**Description**: The VPC configuration used by the cluster control plane. Amazon EKS VPC resources have specific requirements to work properly with Kubernetes. For more information, see <a href="https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html">Cluster VPC Considerations</a> and <a href="https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html">Cluster Security Group Considerations</a> in the <i>Amazon EKS User Guide</i>.<br>
   - `cluster_security_group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `clusterSecurityGroupId`<br>
    **Description**: The cluster security group that was created by Amazon EKS for the cluster. Managed node groups use this security group for control-plane-to-data-plane communication.<br>
   - `endpoint_private_access`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `endpointPrivateAccess`<br>
    **Description**: This parameter indicates whether the Amazon EKS private API server endpoint is enabled. If the Amazon EKS private API server endpoint is enabled, Kubernetes API requests that originate from within your cluster's VPC use the private VPC endpoint instead of traversing the internet. If this value is disabled and you have nodes or Fargate pods in the cluster, then ensure that <code>publicAccessCidrs</code> includes the necessary CIDR blocks for communication with the nodes or Fargate pods. For more information, see <a href="https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html">Amazon EKS cluster endpoint access control</a> in the <i> <i>Amazon EKS User Guide</i> </i>.<br>
   - `endpoint_public_access`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `endpointPublicAccess`<br>
    **Description**: This parameter indicates whether the Amazon EKS public API server endpoint is enabled. If the Amazon EKS public API server endpoint is disabled, your cluster's Kubernetes API server can only receive requests that originate from within the cluster VPC.<br>
   - `public_access_cidrs`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `publicAccessCidrs`<br>
    **Description**: The CIDR blocks that are allowed access to your cluster's public Kubernetes API server endpoint. Communication to the endpoint from addresses outside of the listed CIDR blocks is denied. The default value is <code>0.0.0.0/0</code>. If you've disabled private endpoint access and you have nodes or Fargate pods in the cluster, then ensure that the necessary CIDR blocks are listed. For more information, see <a href="https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html">Amazon EKS cluster endpoint access control</a> in the <i> <i>Amazon EKS User Guide</i> </i>.<br>
   - `security_group_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `securityGroupIds`<br>
    **Description**: The security groups associated with the cross-account elastic network interfaces that are used to allow communication between your nodes and the Kubernetes control plane.<br>
   - `subnet_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `subnetIds`<br>
    **Description**: The subnets associated with your cluster.<br>
   - `vpc_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `vpcId`<br>
    **Description**: The VPC associated with your cluster.<br>
## `role_arn`
**Type**: `STRING`<br>
**Provider name**: `roleArn`<br>
**Description**: The Amazon Resource Name (ARN) of the IAM role that provides permissions for the Kubernetes control plane to make calls to Amazon Web Services API operations on your behalf.<br>
## `status`
**Type**: `STRING`<br>
**Provider name**: `status`<br>
**Description**: The current status of the cluster.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `version`
**Type**: `STRING`<br>
**Provider name**: `version`<br>
**Description**: The Kubernetes server version for the cluster.<br>
