---
title: Create your first live AWS diagram
kind: guide
---

Cloudcraft allows you to easily import your AWS cloud environment as *live diagrams*. By reverse-engineering the architecture in your AWS account, Cloudcraft can autogenerate new diagrams or enhance existing ones, saving you hours or even days of work.

<section class="alert alert-info">
  <p>If you would like to get a full tour of Cloudcraft and all its features, you can <a href="https://www.cloudcraft.co/request-demo" title="Book an online demo of Cloudcraft">book an online demo with a member of our team</a>.</p>
</section>

## Your first live diagram

Start by creating a new blueprint, where we will be importing your cloud architecture.

<section class="alert alert-info">
  <p>A blueprint contains your diagram, a budget, and all the documentation you attach to individual components and the diagram itself.</p>
</section>

First things first, you need to connect your AWS account. Go ahead and do that by following the help article below:

- [Connect your AWS account with Cloudcraft][1]

Connected? Perfect!

Click on the **Live** tab, which is where you can choose the account you just added, scan AWS regions, generate automatic layouts, and view all resources in your AWS account.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Screenshot of a live AWS infrastructure diagram on Cloudcraft platform with design, live, and budget tabs visible. The Live tab is highlighted." responsive="true" style="width:100%;">}}

If you only added one AWS account to Cloudcraft, it will be automatically selected for you, otherwise, select the account you want from the dropdown.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-account.png" alt="Screenshot showing the selection of an AWS account in Cloudcraft interface with an arrow pointing to a dropdown menu." responsive="true" style="width:100%;">}}

Now, select the region you want to scan. You can scan and add multiple regions into a single diagram, but for now, just pick one.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-region.png" alt="Arrow pointing to the AWS region selection dropdown menu set to us-east-1 with a 'Scan now' button." responsive="true" style="width:100%;">}}

Perfect, we are almost there.

You will notice a toggle that says **Live** or **Snapshot** just below the yellow **Scan Now** button, which tells the application which kind of diagram you want to create. If you select **Live**, the diagram will constantly update itself with information from your AWS account, while selecting **Snapshot** will create a point-in-time image, which means the diagram will never update automatically.

For this help article we will focus on the **Live** version, so go ahead and select that option. The cog icon to the right of the option allows you to further customize how your diagram will be updated, but you can ignore it for now.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Interactive Cloudcraft interface with toggle set to Live for live AWS resource diagramming." responsive="true" style="width:100%;">}}

Click the yellow **Scan Now** button and Cloudcraft will start looking for [supported AWS components][2] in your account. You should see a **Scan complete** message when the application finishes.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/scan-complete.png" alt="Cloudcraft AWS account scan complete notification with search bar and orange progress indicator." responsive="true" style="width:100%;">}}

With the scan complete, the **Auto Layout** button and all the supported components from your AWS account should show up. While you can start adding them manually right away, it is better to let the application layout them automatically for you.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/component-inventory.png" alt="Screenshot of Cloudcraft's component inventory highlighting the Auto Layout button and all components" responsive="true" style="width:100%;">}}

There are two ways to do this:

- Using the **Auto Layout** feature.
- Using the **Filtered Layout** feature.

The **Auto Layout** feature is the simplest one. It will add all the AWS components you want to the diagram, and then display their connections and relationships. You can tell **Auto Layout** to include only EC2 instances and exclude everything else, for example, and that is exactly what it will do.

Since the diagram type for our example is **Live**, if you remove one of the EC2 instances from your AWS account, the change will be reflected in your diagram.

The **Filtered Layout** feature is a more advanced and powerful way to diagram your AWS architecture, as it allows you to create diagrams that match a pattern. For example, if you have many resources tagged with _environment=production_ and _environment=staging_, but only want components in production to be added to the diagram, you can search for _environment=production_ and only components tagged with this exact combination of value and key would be included.

You can use the power of filters even if you do not tag your components; to create a diagram with only EC2 instances that are powered down, for example, you could use the filter _ec2 !running_.

To understand the power of **Filtered Layout**, let us look at our VPN server as an example. In AWS, we tag anything related to the VPN with the key _service_ and the value _wirecraft_, so if we wanted to see everything related to the VPN and how each component connects to each other, we could use the filter _service=wirecraft_ in the search bar just below the **Live** tab, like this.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example.mp4" alt="A 16 seconds video showing a user creating a filtered diagram in Cloudcraft." video="true">}}

As you can see, the EC2 instance that is tagged with _service=wirecraft_ is shown inside the VPC and security group it is connected to, and the same goes for the EBS volume and internet gateway.

Even though it has the same tags, the S3 bucket is outside the VPC because the AWS API does not show any connection between the bucket and the other components, so neither does Cloudcraft.

How components connect to each other is very service dependent, but we try to use all available AWS APIs to discover relationships wherever possible.

For this help article we will focus on **Auto Layout**, but feel free to [reach out to our support team][3] if you want to learn more about **Filtered Layout**.

Moving on, click on the yellow **Auto Layout** button right below the **Live/Snapshot** toggle.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-button.png" alt="Screenshot of Cloudcraft's component inventory highlighting the Auto Layout button." responsive="true" style="width:100%;">}}

A new window will appear and allow you to decide which AWS components you want included in your diagram. For this help article we want to include everything, but feel free to play with the options here if you would like.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/place-live-components.png" alt="Screenshot of AWS components selection in Cloudcraft interface with options for EC2, Lambda, auto scaling, and others included in a live diagram." responsive="true" style="width:100%;">}}

This window also include an **Options** dropdown where you can choose one of three possible options.

- Replace existing components.
- Include existing components.
- Leave existing components.

These options tell the application what to do if you are using the **Auto Layout** on a diagram that already has components on it.

- If you select **Replace existing components**, everything already in the diagram will be replaced with new components.
- If you select **Include existing components**, the application will perform an automatic layout on all the components in your inventory as well as all the components on the diagram.
- If you select **Leave existing components**, the components in the diagram will not be altered, but the application will perform an automatic layout for the new components.

Since we are creating a new diagram, choose **Replace existing components** from the dropdown, and then click the yellow **Layout** button.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/layout-button.png" alt="Screenshot of Cloudcraft's user interface with a layout settings dialog box featuring an 'Exclude all' option and a highlighted 'Layout' button." responsive="true" style="width:100%;">}}

Once you click **Layout**, all the components in your inventory will be automatically added to your diagram and their connections shown.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Interactive AWS infrastructure diagram created with Cloudcraft featuring auto layout of components with visible connections on a grid background." responsive="true" style="width:100%;">}}

The diagram is completely editable, so you can use items from the **Design** tab to improve how your diagram look while also being fed real-time information about each component.

If you click in a component like an EC2 instance, for example, the **Live Feed** pop-up will appear in the bottom-left corner of your screen and show you information about the instance.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="Interactive cloud infrastructure diagram with highlighted EC2 instance and live feed information popup displaying instance details and status." responsive="true" style="width:100%;">}}

This is just the tip of the iceberg, though, as Cloudcraft allows you to go much further.

If you want to learn about more ways Cloudcraft can help empower your team and get started with the product as fast as possible, you can [book an online demo with a member of our team over here][4].

If you have any questions, [reach out to our support team][5], and they will be happy to help.

[1]: https://help.cloudcraft.co/article/87-connect-aws-account-with-cloudcraft
[2]: https://help.cloudcraft.co/article/55-supported-aws-components
[3]: https://app.cloudcraft.co/support
[4]: https://www.cloudcraft.co/request-demo
[5]: https://app.cloudcraft.co/support
