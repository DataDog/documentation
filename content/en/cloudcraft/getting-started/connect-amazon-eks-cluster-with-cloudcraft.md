---
title: Connect an Amazon EKS Cluster with Cloudcraft
---

By scanning your Amazon EKS clusters, Cloudcraft allows you to generate system architecture diagrams to help visualize your deployed workloads and pods.

Cloudcraft uses the [role-based access control (RBAC) authorization method provided by Kubernetes][1] to authorize [Cloudcraft's existing read-only IAM entity role][2]. That means Cloudcraft requires no special software or agent.

To learn more about RBAC configuration and IAM entities, see [Managing users or IAM roles for your cluster][3].

<div class="alert alert-info">The ability to scan Amazon EKS clusters and AWS accounts is only available to Cloudcraft Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">our pricing page</a> for more information.</div>

## Prerequisites

Before connecting your Amazon EKS clusters with Cloudcraft, you must connect your AWS account and generate diagrams that include your clusters.

To connect your AWS account and familiarize yourself with Cloudcraft, see the following articles:
- [Connect your AWS account with Cloudcraft][4]
- [Create your first live AWS diagram][5]

You should also [install and configure `kubectl`][7], a tool that allows you to control Kubernetes clusters through the command line. Cloudcraft recommends using the latest version to avoid issues.

## Authorizing the Cloudcraft IAM role for view-only

Start by opening a blueprint with an existing Amazon EKS cluster or using the **Auto Layout** feature to generate a new blueprint.

With your AWS environment mapped into a blueprint, select the Amazon EKS cluster that you wish to scan, and click the **Enable cluster scanning** button that appears in the component toolbar.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an AWS EKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

The next screen provides step-by-step commands to run in Terminal.

As the Amazon EKS cluster creator or user with admin access, open the aws-auth ConfigMap file with `kubectl`.

```
kubectl edit -n kube-system configmap/aws-auth
```

With the `aws-auth.yaml` file open in a text editor, add the role details to the *mapRoles* section of the file, just after under the *data* section.

```
data:
  mapRoles: |
    - rolearn: <arn-for-the-readonly-cloudcraft-iam-role>
      groups:
        - cloudcraft-view-only
```

If the section does not exist, add it. Once done, save the file and exit.

<div class="alert alert-info">`groups` refer to groups in your cluster to which the role is mapped. For more information, see [Default Roles and Role Bindings][8] in the Kubernetes documentation.</div>

<div class="alert alert-danger">Typos and syntax errors can affect the permissions of all IAM users and roles updated in the ConfigMap file. To prevent this from occuring, Cloudcraft recommends adding a YAML linter to your text editor.</div>

## Granting view-only access to the Cloudcraft IAM role

Next, use [ClusterRoleBinding][6] to bind the IAM role to a Kubernetes role.

A ClusterRoleBinding grants permissions defined in a role to a user or set of users in all namespaces in a cluster. Kubernetes defines some default user-facing roles. For Cloudcraft, use the predefined "view" role that allows view-only access to most objects in a namespace.

Enter the following multi-line command to create the ClusterRoleBinding and grant view-only permission to users in the **cloudcraft-view-only** group.

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
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

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
[2]: /cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html
[4]: /cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[5]: /cloudcraft/getting-started/create-your-first-cloudcraft-diagram/
[6]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[7]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[8]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
