---
title: Create your first live AWS diagram
---

Cloudcraft allows you to import your AWS cloud environment as *live diagrams*. By reverse-engineering the architecture in your AWS account, Cloudcraft can autogenerate new diagrams or enhance existing ones, saving you hours or even days of work.

<div class="alert alert-info">If you are using Cloudcraft's New Live Experience, see this documentation: <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering</a>.</div>

## Prerequisites

Before you begin, you must connect your AWS account to Cloudcraft. For more information, see [Connect your AWS account with Cloudcraft][1].

## Your first live diagram

To import your cloud architecture, you must first create a new blueprint. A blueprint contains your diagram, a budget, and all the documentation you attach to individual components and the diagram itself.

In Cloudcraft, navigate to the **Live** tab. This is where you choose your AWS account, scan AWS regions, generate automatic layouts, and view all resources in your AWS account.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="A live AWS infrastructure diagram in Cloudcraft with the Live tab highlighted." responsive="true" style="width:100%;">}}

If you only added one AWS account to Cloudcraft, it's automatically selected for you, otherwise, select the account you want from the dropdown.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-account.png" alt="Screenshot showing the selection of an AWS account in Cloudcraft interface with an arrow pointing to a dropdown menu." responsive="true" style="width:75%;">}}

Now, select the region you want to scan. You can scan and add multiple regions into a single diagram, but for now, just pick one.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-region.png" alt="Arrow pointing to the AWS region selection dropdown menu set to us-east-1 with a 'Scan now' button." responsive="true" style="width:75%;">}}

Below the **Scan Now** button is a toggle that says **Live** or **Snapshot**. This tells the application which kind of diagram you want to create. If you select **Live**, the diagram continuously updates with information from your AWS account. If you select **Snapshot**, a point-in-time image is created, which means the diagram will never update automatically.

This example uses the **Live** option. Enable the toggle for **Live**. The cog icon to the right of the option allows you to further customize how your diagram is updated, but you can ignore it for now.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Interactive Cloudcraft interface with toggle set to Live for live AWS resource diagramming." responsive="true" style="width:100%;">}}

Click **Scan Now** to scan your account for [supported AWS components][2] in your account. A **Scan complete** message appears when the scan is completed.

With the scan complete, the **Auto Layout** button and all the supported components from your AWS account should appear. While you can start adding them manually right away, it's better to let the application lay them out for you automatically.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/component-inventory.png" alt="Cloudcraft's component inventory highlighting the Auto Layout button and all components" responsive="true" style="width:50%;">}}

There are two ways to do this:

- Using the **Auto Layout** feature.
- Using the **Filtered Layout** feature.

The **Auto Layout** feature is the simplest one. It adds all the AWS components you want to the diagram, and then displays their connections and relationships. You can use **Auto Layout** to include only EC2 instances and exclude everything else.

The diagram type for this example is **Live**. If you remove one of the EC2 instances from your AWS account, the change will be reflected in your diagram.

The **Filtered Layout** feature is a more advanced and powerful way to diagram your AWS architecture, as it allows you to create diagrams that match a pattern. For example, if you have many resources tagged with _environment=production_ and _environment=staging_, but only want components in production to be added to the diagram, you can search for _environment=production_ and only components tagged with this exact combination of value and key would be included.

You can use the power of filters even if you do not tag your components. For example, to create a diagram with only EC2 instances that are powered down, you could use the _ec2 !running_ filter.

To understand the power of **Filtered Layout**, let's use VPN server as an example. In AWS, you tag anything related to the VPN with the key _service_ and the value _wirecraft_. To view everything related to the VPN and how each component is connected, you could use the filter _service=wirecraft_ in the search bar just below the **Live** tab.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example.mp4" alt="A 16 seconds video showing a user creating a filtered diagram in Cloudcraft." video="true">}}

The EC2 instance that is tagged with _service=wirecraft_ is shown inside the VPC and security group it is connected to. The same is true for the EBS volume and internet gateway.

Even though it has the same tags, the S3 bucket is outside of the VPC because the AWS API does not show any connection between the bucket and the other components.

How components connect to each other is very service dependent. Cloudcraft tries to use all available AWS APIs to discover relationships wherever possible.

Next, under the **Live/Snapshot** toggle, click **Auto Layout**.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-button.png" alt="Cloudcraft's component inventory highlighting the Auto Layout button." responsive="true" style="width:100%;">}}

A new modal appears which allows you to decide which AWS components to include in your diagram.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/place-live-components.png" alt="AWS components selection in Cloudcraft with options for EC2, Lambda, and auto scaling" responsive="true" style="width:100%;">}}

The modal also includes an **Options** dropdown menu where you can choose one of three possible options.

- Replace existing components
- Include existing components
- Leave existing components

These options tell the application what to do if you are using the **Auto Layout** on a diagram that already has components on it.

- If you select **Replace existing components**, everything already in the diagram will be replaced with new components.
- If you select **Include existing components**, the application will perform an automatic layout on all the components in your inventory as well as all the components on the diagram.
- If you select **Leave existing components**, the components in the diagram will not be altered, but the application will perform an automatic layout for the new components.

Since we're creating a new diagram, choose **Replace existing components** from the dropdown menu, and then click **Layout** to automatically add all of the components in your inventory to the diagram along with their connections.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Interactive AWS infrastructure diagram created with Cloudcraft featuring auto layout of components with visible connections on a grid background." responsive="true" style="width:100%;">}}

The diagram is completely editable, so you can use items from the **Design** tab to improve how your diagram looks while also viewing real-time information about each component.

If you click a component, for example, an EC2 instance, the **Live Feed** modal appears in the lower-left corner of your screen and displays information about the instance.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="Interactive cloud infrastructure diagram with highlighted EC2 instance and live feed information modal displaying instance details and status." responsive="true" style="width:100%;">}}

[1]: /cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /cloudcraft/faq/supported-aws-components/
[3]: https://app.cloudcraft.co/support
