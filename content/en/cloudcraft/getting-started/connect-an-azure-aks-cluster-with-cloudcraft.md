---
title: Connect an Azure AKS cluster with Cloudcraft
kind: guide
---

By scanning your Azure AKS clusters, Cloudcraft allows you to visualize workloads and pods deployed inside to generate professional-looking system architecture diagrams.

Through the use of Azure's Kubernetes Service Cluster User Role, Cloudcraft requires no special software or agent to look inside your clusters.

<section class="alert alert-info">
  <p>The ability to scan Azure AKS clusters and Azure accounts is only available to Cloudcraft Pro subscribers. Refer to <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</p>
</section>

## Prerequisites

Before connecting your Azure AKS clusters with Cloudcraft, you need to connect your Azure account and generate diagrams that include your clusters.

Linked below, you will find documentation to help you connect your Azure account and familiarize yourself with Cloudcraft.

- [Connect your Azure account with Cloudcraft][1]

## Authorizing the Cloudcraft IAM user for view-only access

Start by opening a blueprint with an existing Azure AKS cluster, or using the **Auto Layout** feature to generate a new blueprint.

With your Azure environment mapped into a blueprint, select the Azure AKS cluster that you wish to scan, and click the **Enable cluster scanning** button that appears in the component toolbar.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an AWS EKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

The next screen will provide step-by-step instructions, so click the first link to open your Azure Subscriptions page, and then click **Access control (IAM)** on the left sidebar.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/iam-page.png" alt="Screenshot of Microsoft Azure Access Control (IAM) page with highlighted link for checking access permissions." responsive="true" style="width:100%;">}}

Click the **Add** at the top of the next page and select **Add role assignment**.

In the next page, search for and select **Azure Kubernetes Service Cluster User Role**, clicking **Next** when you're done.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/add-role-assignment.png" alt="Screenshot of Azure Kubernetes Service Cluster User Role selection interface with a highlighted Next button." responsive="true" style="width:100%;">}}

Leave everything as it's and click **Select members**. Search for the IAM user that you want to grant access to your Azure AKS cluster—usually named cloudcraft—and click **Select**.

With that out of the way, click **Review + assign** twice.

## Testing access to the cluster

Head back to Cloudcraft and click the **Test cluster access** button at the bottom of the **Enable Kubernetes Cluster Scanning** screen.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="Screenshot of Cloudcraft Enable Kubernetes Cluster Scanning interface with instructions and Test Cluster Access button." responsive="true" style="width:100%;">}}

That's it! Assuming the test passed, Cloudcraft should be able to visualize workloads and pods for your Azure AKS clusters.

[1]: https://help.cloudcraft.co/article/103-connect-azure-account-with-cloudcraft
