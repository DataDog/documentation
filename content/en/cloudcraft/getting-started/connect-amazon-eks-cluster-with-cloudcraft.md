---
title: Connect an Amazon EKS Cluster with Cloudcraft
---

By scanning your Amazon EKS clusters, Cloudcraft allows you to generate system architecture diagrams to help visualize your deployed workloads and pods.

Cloudcraft uses [access entries][1] to grant [Cloudcraft's existing read-only IAM entity role][2] access to the Kubernetes API. Cloudcraft does not require any special software or agent to be installed on your cluster.

<div class="alert alert-info">The ability to scan Amazon EKS clusters and AWS accounts is only available to Cloudcraft Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">our pricing page</a> for more information.</div>

## Prerequisites

Before connecting your Amazon EKS clusters with Cloudcraft, you must connect your AWS account and generate diagrams that include your clusters.

To connect your AWS account and familiarize yourself with Cloudcraft, see the following articles:
- [Connect your AWS account with Cloudcraft][3]
- [Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering][4]

[Install and configure `kubectl`][6], a tool that allows you to control Kubernetes clusters through the command line. Cloudcraft recommends using the latest version to avoid issues.

In addition, you'll want to [install and configure the AWS CLI][8] to manage your AWS services from the command line. As with `kubectl`, Cloudcraft recommends using the latest version.

Finally, in order to scan your cluster successfully, Cloudcraft requires clusters to have public access enabled and no IP filtering applied. The **Public Access Source Allow List** option in the networking configuration must remain set to its default value of 0.0.0.0/0.

## Create access entries

Start by opening a blueprint with an existing Amazon EKS cluster or creating a new blueprint to scan an account with Amazon EKS clusters.

With your AWS environment mapped into a blueprint, select the Amazon EKS cluster that you wish to scan, and click the **Enable cluster scanning** button that appears in the component toolbar.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an AWS EKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

The next screen provides step-by-step commands to run in your favorite terminal application.

As the Amazon EKS cluster creator or user with admin access, run the following command to map the Cloudcraft IAM role to the Kubernetes group `cloudcraft-view-only`:

```
aws eks create-access-entry \
  --cluster-name ${EKS_CLUSTER_NAME} \
  --principal-arn ${CLOUDCRAFT_IAM_ROLE_ARN} \
  --kubernetes-groups 'cloudcraft-view-only'
```

## Granting view-only access to the Cloudcraft IAM role

Next, use [ClusterRoleBinding][5] to bind the IAM role to a Kubernetes role.

A ClusterRoleBinding grants permissions defined in a role to a user or set of users in all namespaces in a cluster. Kubernetes defines some default user-facing roles. For Cloudcraft, use the predefined "view" role that allows view-only access to most objects in a namespace.

Enter the following multi-line command to create the ClusterRoleBinding and grant view-only permission to users in the **cloudcraft-view-only** group.

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cloudcraft-view-only
subjects:
  - kind: Group
    name: cloudcraft-view-only
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
EOF
```

## Testing access to the cluster

To test that Cloudcraft can access to the cluster, click **Test cluster access** at the bottom of the **Enable Kubernetes Cluster Scanning** screen.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Cloudcraft interface showing Kubernetes cluster role configuration with a 'Test Cluster Access' button highlighted by an arrow." responsive="true" style="width:100%;">}}

To scan other clusters, repeat the process as many times as needed.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html
[2]: /cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: /cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[4]: /cloudcraft/getting-started/crafting-better-diagrams/
[5]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[6]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[7]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
[8]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
