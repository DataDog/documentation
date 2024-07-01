---
title: Connect an Azure AKS Cluster with Cloudcraft
---

By scanning your Azure AKS clusters, Cloudcraft allows you to generate system architecture diagrams to help visualize your deployed workloads and pods.

Cloudcraft uses Azure's Kubernetes Service Cluster User Role, and requires no special software or agent to look inside your clusters.

<div class="alert alert-info">The ability to scan Azure AKS clusters and Azure accounts is only available to Cloudcraft Pro subscribers. Refer to <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</div>

## Prerequisites

Before connecting your Azure AKS clusters with Cloudcraft, you must connect your Azure account and generate diagrams that include your clusters. For more information, see [Connect your Azure account with Cloudcraft][1].

## Authorizing the Cloudcraft IAM user for view-only access

Start by opening a blueprint with an existing Azure AKS cluster, or using the **Auto Layout** feature to generate a new blueprint.

With your Azure environment mapped into a blueprint, select the Azure AKS cluster that you wish to scan, and click the **Enable cluster scanning** button that appears in the component toolbar.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Interactive Cloudcraft diagram showing an Azure AKS cluster with enable cluster scanning button highlighted." responsive="true" style="width:100%;">}}

The next screen provides step-by-step instructions to complete in Azure.

1. Click the first link to open your Azure Subscriptions page, then click **Access control (IAM)** on the left sidebar.
2. Click **Add** and select **Add role assignment**.
3.  Search for and select **Azure Kubernetes Service Cluster User Role**, then click **Next**.
4. Click **Select members**.
5. Search for the IAM user that you want to grant access to your Azure AKS cluster—usually named cloudcraft—and click **Select**.
6. Click **Review + assign** twice to complete the process.

## Testing access to the cluster

To test that Cloudcraft can access to the cluster, click **Test cluster access** at the bottom of the **Enable Kubernetes Cluster Scanning** screen.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="Screenshot of Cloudcraft Enable Kubernetes Cluster Scanning interface with instructions and Test Cluster Access button." responsive="true" style="width:100%;">}}

[1]: /cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
