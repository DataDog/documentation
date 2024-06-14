---
title: Create your first live AWS diagram
kind: guide
---

Cloudcraft allows you to import your AWS and Azure cloud environments as *live diagrams*. By reverse-engineering the architecture in your cloud account, Cloudcraft can auto-generate new diagrams or enhance existing ones, saving you hours or even days of work.

<div class="alert alert-info">If you are using Cloudcraft's new live experience, see <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering</a> instead.</div>

## Prerequisites

Before you begin, you must connect your cloud account to Cloudcraft.

- For AWS accounts, see [Connect your AWS account with Cloudcraft][1].
- For Azure accounts, see [Connect your Azure account with Cloudcraft][2].

## Your first live diagram

To scan and visualize your cloud architecture, you must first create a new blueprint. A blueprint contains your diagram, a budget, and all the documentation you attach to individual components.

In Cloudcraft, select the **AWS** or **Azure** tab and then the **Live** tab. For this document, we'll focus on AWS accounts. If you have an Azure account, the process is similar.

The **Live** tab is where you select your account, scan regions, generate layouts, and view all resources in your account.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="A live infrastructure diagram in Cloudcraft with the AWS and live tabs highlighted." responsive="true" style="width:100%;">}}

If you only added one AWS account to Cloudcraft, it's automatically selected for you, otherwise, select the account you want from the drop-down.

Select the region you want to scan. You can scan and add multiple regions into a single diagram; however, begin by selecting one region.

Below the **Scan now** button is a toggle that says **Live** or **Snapshot**, which tells the application which kind of diagram you want to create. If you select **Live**, the diagram continuously updates with information from your account. If you select **Snapshot**, a point-in-time image is created, which means the diagram will never update automatically.

This example uses the **Live** option. Enable the toggle for **Live**. The cog icon to the right of the option allows you to further customize how your diagram is updated, but leave it as is for now.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Interactive Cloudcraft interface with toggle set to live for live resource diagramming." responsive="true" style="width:100%;">}}

Click **Scan now** to scan your account for [supported AWS components][3] in your account. A **Scan complete** message appears once the scan is finished.

With the scan complete, the **Auto layout** button and all the supported components from your AWS account should appear. While you can start adding them manually right away, it's better to let the application lay them out for you automatically.

You can achieve this in two ways:

- Using the **Auto layout** feature.
- Using the **Filtered layout** feature.

The **Auto layout** feature is the simplest one, as it adds all components to the diagram and then displays their connections and relationships. You can also use **Auto layout** to include only EC2 instances and exclude everything else, for example.

The diagram type for this documentation is **Live**, which means if you remove an EC2 instance from your AWS account, for example, the change will be reflected in your diagram.

The **Filtered Layout** feature is a more advanced and powerful way to diagram your cloud architecture, as it allows you to create diagrams that match a pattern. For example, if you have many resources tagged with `environment=production` and `environment=staging` but only want components in production to be added to the diagram, you can filter by `environment=production` and only components tagged with this exact combination of value and key are included.

The power of filters is available even if you do not tag your resources in your cloud provider. For example, to create a diagram with only EC2 instances that are powered down, you could use the filter `ec2 !running`.

You can watch the video below to better understand the power of **Filtered layout**. In AWS, our sales team tags several resources related to a Cloudcraft demo with the key `Environment` and the value `Demo`. To view what they want to demonstrate and how each component connects to each other, they can use the filter `Environment=demo` in the search bar just below the **Live** tab.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example.mp4" alt="A 16 seconds video showing a user creating a filtered diagram in Cloudcraft." video="true">}}

The components tagged with `Environment=demo` are shown inside their respective VPCs, subnets, and security groups, even though these resources are not tagged in AWS. Even though it has the same tags, the WAF is outside of the VPC because the AWS API does not show any connection between the WAF and the other components.

How components connect to each other is very service dependent. Cloudcraft uses all available cloud APIs to discover relationships wherever possible

Going back a bit, select **Auto layout** under the **Live/Snapshot** toggle.

A new dialog box allows you to decide which AWS components to include in your diagram. The dialog also includes an **Options** drop-down menu where you can choose one of three possible options:

- Replace existing components.
- Include existing components.
- Leave existing components.

These options tell the application what to do if you are using **Auto layout** on a diagram that already has components on it.

- If you select **Replace existing components**, everything already in the diagram will be replaced with new components.
- If you select **Include existing components**, the application will perform an automatic layout on all the components in your inventory as well as all the components on the diagram.
- If you select **Leave existing components**, the components in the diagram will not be altered, but the application will perform an automatic layout for the new components.

Since we are creating a new diagram, choose **Replace existing components** from the menu. Select **Layout** to automatically add all of the components in your inventory to the diagram along with their connections.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Interactive AWS infrastructure diagram created with Cloudcraft featuring auto layout of components with visible connections on a grid background." responsive="true" style="width:100%;">}}

The diagram is completely editable, so you can use items from the **Design** tab to improve how it looks while also viewing real-time information about each component.

If you select a component the **Live feed** dialog should appear in the lower-left corner of your screen and displays live information about the component you selected.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="Interactive cloud infrastructure diagram with highlighted EC2 instance and live feed information dialog box displaying instance details and status." responsive="true" style="width:100%;">}}

[1]: /cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: /cloudcraft/faq/supported-aws-components/
