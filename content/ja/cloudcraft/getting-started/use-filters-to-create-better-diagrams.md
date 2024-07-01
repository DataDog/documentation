---
title: Using Filters to Create Better Diagrams
---

The number of components rendered at once for large environment diagrams can introduce performance and readability issues, making for a poor experience.

To avoid these issues, Cloudcraft recommends that you use the **Filtered layout** feature to apply filters, or exclude services when placing live components.

Building smaller diagrams makes managing them much easier. It also gives viewers more control over how they ingest information.

<div class="alert alert-info">If you are using Cloudcraft's New Live Experience, see this documentation: <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering</a>.</div>

## Search patterns

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Search patterns being used in Cloudcraft." responsive="true" style="width:100%;">}}

The search box on the **Live** tab allows you to enter patterns that affect your scan result.

The patterns the application supports include:

- Matching component's name or ID. For example, `i-052g93wu49qed3hxw`.
- Matching component's type. For example, `type=ec2`.
- Matching component's IP address. For example, `172.31.42.142`.
- Matching tagged components. For example, `environment=prod` or `environment`.
- Matching components inside a VPC, security group, or subnet. For example, `vpc-088c40abeb9ce0c1d`.

You can also use operators:

- AND (`type=ec2 AND env=prod`).
- OR (`type=ec2 OR type=rds`)
- NOT (`NOT platform=linux`)
- (...) (`type=rds AND (env=staging OR env=prod)`).

Combine these two features, and you can build powerful filters, allowing you to scope your diagram to one or more applications.

## Excluding services

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="AWS services being excluded from a Cloudcraft diagram." responsive="true" style="width:100%;">}}

Search patterns may be overkill if you only want to exclude a few services, so Cloudcraft offers an easier way to accomplish this task.

After scanning your AWS account, click **Auto Layout** on the **Live** tab to view a two-column list with services from your AWS environment.

You can move services from the **Included services** to the **Excluded services** column—or vice versa—by clicking them.

## Using search patterns and applying filters

Let us put some of these concepts into practice.

Imagine you're creating an architecture diagram but only want to show EC2 instances and EBS volumes tagged with `service=wirecraft`. You also want to ignore any EC2 instances in the "Stopped" state.

You already scanned your AWS environment, and Cloudcraft shows a list of components from your account in your inventory. What's next?

1. On the **Live** tab, type the search pattern that corresponds to your query in the search box. In this example, the pattern is `service=wirecraft AND (type=ec2 running OR type=ebs)`. Notice that the button **Auto Layout** now says **Filtered Layout**.
2.  Click **Filtered Layout**.
3. Click **Layout**. The components in the diagram now match the pattern in Step 1.

Other alternatives include:

- Running the same query on another AWS region. Before you click **Layout**, select **Include existing components** from the **Options** dropdown. Doing so would perform a filtered layout on all the components for the secondary region currently in your inventory and all the components already on the diagram.
- Combining **Filtered layout** with the **Blueprint link** feature to break down larger environments into multiple diagrams that link to each other. You can also have an overview diagram that provides a quick glance of your whole cloud architecture with no performance penalties.

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="A 53 seconds video showing a Cloudcraft user creating a filtered diagram." video="true">}}

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support
