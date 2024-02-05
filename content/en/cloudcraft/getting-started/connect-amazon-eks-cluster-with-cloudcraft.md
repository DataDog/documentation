---
title: Connect an Amazon EKS cluster with Cloudcraft
kind: documentation
---

By scanning your Amazon EKS clusters, Cloudcraft allows you to visualize workloads and pods deployed inside to generate professional-looking system architecture diagrams.

By using the existing [role-based access control (RBAC) authorization method provided by Kubernetes][1] and authorizing [our existing read-only IAM entity role][2], Cloudcraft requires no special software or agent to look inside your clusters.

You can find more information on RBAC configuration and IAM entities in the link below:

- [Managing users or IAM roles for your cluster][3]

<section class="alert alert-info">
  <p>The ability to scan Amazon EKS clusters and AWS accounts is only available to Cloudcraft Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">our pricing page</a> for more information.</p>
</section>

## Prerequisites

Before connecting your Amazon EKS clusters with Cloudcraft, you need to connect your AWS account and generate diagrams that include your clusters.

Linked below, you will find documentation to help you connect your AWS account and familiarize yourself with Cloudcraft.

- [Connect your AWS account with Cloudcraft][4]
- [Create your first live AWS diagram][5]

<p>You will also want to <a referrerpolicy="no-referrer" rel="noreferrer external help" href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html">install and configure <code>kubectl</code></a>, a tool that lets you control Kubernetes clusters through the command line. AWS requires version 1.21 or higher, but we recommend using the latest version to avoid issues.</p>

## Authorizing the Cloudcraft IAM role for view-only

Start by opening a blueprint with an existing Amazon EKS cluster or using the **Auto Layout** feature to generate a new blueprint.

With your AWS environment mapped into a blueprint, select the Amazon EKS cluster that you wish to scan, and click the **Enable cluster scanning** button that appears in the component toolbar.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an AWS EKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

The next screen will provide step-by-step instructions, so open a terminal window and proceed.

As the Amazon EKS cluster creator or user with admin access, open the aws-auth ConfigMap file with `kubectl`.

```
kubectl edit -n kube-system configmap/aws-auth
```

With the `aws-auth.yaml` file open in your favorite text editor, add the role details to the *mapRoles* section of the file, just after under the *data* section.

```
data:
  mapRoles: |
    - rolearn: <arn-for-the-readonly-cloudcraft-iam-role>
      groups:
        - cloudcraft-view-only
```

If the section does not exist, add it. Once done, save the file and exit.

<section class="alert alert-info">
  <p><em>groups</em> refer to groups within your cluster to which you mapped the role to. The <a referrerpolicy="no-referrer" rel="noreferrer external help" href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings">Default Roles and Role Bindings</a> page in the Kubernetes documentation website should give you more information.</p>
</section>

<section class="alert alert-danger">
  <p>Typos and syntax errors can affect the permissions of all IAM users and roles updated within the ConfigMap file. We recommend adding a YAML linter to your favorite text editor to prevent issues.</p>
</section>

## Granting view-only access to the Cloudcraft IAM role

Our IAM role is now allowed to have view-only access, but that alone is not enough, you still need to bind the IAM role to a Kubernetes role with a [ClusterRoleBinding][6].

A ClusterRoleBinding grants permissions defined in a role to a user or set of users in all namespaces in a cluster. Kubernetes defines some default user-facing roles, and we will use the predefined "view" role that allows view-only access to see most objects in a namespace.

Enter the multi-line command below to create the ClusterRoleBinding and grant view-only permission to users in the *cloudcraft-view-only* group.

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

Head back to Cloudcraft and click the **Test cluster access** button at the bottom of the **Enable Kubernetes Cluster Scanning** screen.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Cloudcraft interface showing Kubernetes cluster role configuration with a 'Test Cluster Access' button highlighted by an arrow." responsive="true" style="width:100%;">}}

That is it! Assuming the test passed, Cloudcraft should be able to visualize workloads and pods for this cluster.

If you want to scan other clusters, repeat the process as many times as needed.

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
[2]: https://help.cloudcraft.co/article/108-how-cloudcraft-connects-to-aws
[3]: https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html
[4]: https://help.cloudcraft.co/article/87-connect-aws-account-with-cloudcraft
[5]: https://help.cloudcraft.co/article/99-create-your-first-cloudcraft-diagram
[6]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
