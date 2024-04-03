---
title: "Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering"
kind: documentation
---

## Overview

Cloudcraft is a powerful tool for creating diagrams of your cloud infrastructure. The new live experience makes it easier than ever to create accurate and up-to-date diagrams of your cloud infrastructure.

With the ability to filter resources by type and tags, you can quickly create targeted diagrams that focus on specific components you care about. This not only improves diagram performance and readability but also allows you to craft more meaningful visualizations of your infrastructure.

In this guide, you'll learn how to enable the new live experience and use it to create beautiful and informative diagrams tailored to your needs.

## Prerequisites

Before you begin, you must connect your AWS or Azure account to Cloudcraft. For more information, see:

- [Connect your AWS account with Cloudcraft][1]
- [Connect your Azure account with Cloudcraft][2]

## Enable new live experience

To enable the new live experience, toggle the **New Live Experience** switch at the top of the **Live** tab in Cloudcraft.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/enable-new-experience.png" alt="Screenshot highlighting the switch to enable the new live experience beta feature in the Cloudcraft interface with a red arrow pointing to the switch." responsive="true" style="width:100%;">}}

If you're a new user, you may already have the new live experience enabled by default.

## Select account and region

Click the dropdown under the **Account** section and select the account you want to scan. If you only added one AWS or Azure account to Cloudcraft, it's automatically selected for you.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-account.png" alt="Screenshot highlighting the dropdown to select an account to want to scan in the Cloudcraft interface with a red arrow pointing to the dropdown." responsive="true" style="width:100%;">}}

Under **Region**, select the regions you want to scan. By default, `Global` and your default region are selected, but you can click the **More** button to select or search for additional regions.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-region.png" alt="Screenshot highlighting the regions to scan in the Cloudcraft interface with red arrows pointing to the regions and the More button." responsive="true" style="width:100%;">}}

After selecting, regions are scanned automatically and the number of resources found is displayed right next to the region name. You can click the **Sync** button above the **Region** section to trigger a manual scan of all selected regions.

## Filter resources

You can filter resources by type and tags.

Tags are automatically detected from your AWS account and displayed in the **Custom tags**, **AWS tags**, **Terraform tags**, and **Kubernetes tags** sections.

- **Custom tags** are tags that you added to resources in AWS or Azure.
- **AWS tags** are tags that are automatically added to resources by AWS.
- **Kubernetes tags** are tags that are automatically added to resources by Kubernetes.

To filter resources by type, click the **Resource** section and select the resource type you want to filter by. By default, all resource types are selected and displayed in order of the number of resources found.

The same goes for tags. Click the **Custom tags**, **AWS tags**, or **Kubernetes tags** section and select the tags you want to filter by. By default, all tags are selected and displayed in order of the number of resources found, with `Untagged` always at the bottom.

Say you want to create a diagram showing only EC2 instances and RDS databases. Click the **Resource** section, deselect all resource types, and select only `EC2` and `RDS`.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources.mp4" alt="A 9 seconds video showing a Cloudcraft user selecting EC2 and RDS instances from the Resource section." video="true">}}

Click **Apply layout** to create a diagram showing only the selected resources.

Say you want to create a diagram showing only EC2 instances and RDS databases without the `Environment` tag. Click the **Resource** section, deselect all resource types, and select only `EC2` and `RDS`. Then click the **Custom tags** section, click the **Environment** tag, and leave only the `Untagged` option selected.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources-and-tags.mp4" alt="A 15 seconds video showing a Cloudcraft user selecting EC2 and RDS instances and untagged resources from the Resource and Custom tags sections." video="true">}}

Click **Apply layout** to create a diagram showing only the selected resources without the `Environment` tag.

[1]: https://docs.datadoghq.com/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: https://docs.datadoghq.com/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
