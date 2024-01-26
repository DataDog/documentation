---
title: How to use filters to create better diagrams
kind: guide
---

While we are constantly improving the platform across the board, the number of components rendered at once for large environment diagrams can introduce performance and readability issues, making for a poor experience.

To ensure you do not face these problems, we recommend using the **Filtered layout** feature by applying filters or excluding services when placing live components.

As a bonus, building smaller diagrams makes managing them much more manageable, gives viewers more control over how they ingest information and does not overwhelm them.

## Search patterns

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Screenshot of search patterns being used in Cloudcraft." responsive="true" style="width:100%;">}}

The search box under the **Live** tab allows you to enter patterns that affect your scan result.

The patterns the application supports include:

- Matching component's name or ID. E.g., `i-052g93wu49qed3hxw`.
- Matching component's type. E.g., `type=ec2`.
- Matching component's IP address. E.g., `172.31.42.142`.
- Matching tagged components. E.g., `environment=prod` or `environment`.
- Matching components inside a VPC, security group, or subnet. E.g., `vpc-088c40abeb9ce0c1d`.

You can also use operators:

- AND. E.g., `type=ec2 AND env=prod`.
- OR. E.g., `type=ec2 OR type=rds`
- NOT. E.g, `NOT platform=linux`
- (...). E.g, `type=rds AND (env=staging OR env=prod)`.

Combine these two features, and you can build powerful filters, allowing you to scope your diagram to one or more applications.

## Excluding services

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="Screenshot of AWS services being excluded from a Cloudcraft diagram." responsive="true" style="width:100%;">}}

Search patterns may be overkill if you only want to exclude a few services, so we offer an easier way to accomplish this task.

After scanning your AWS account and clicking **Auto Layout** under the **Live** tab, you will see a two-column list with services from your AWS environment.

You can move services from the **Included services** to the **Excluded services** column—or vice versa—by clicking them.

## Using search patterns and applying filters

Let us put some of these concepts into practice.

Imagine you were creating an architecture diagram but only wanted to show EC2 instances and EBS volumes tagged with `service=wirecraft`. You also wanted to ignore any EC2 instances in the "Stopped" state.

You already scanned your AWS environment, and Cloudcraft shows a list of components from your account in your inventory. What is next?

<dl>
  <dt>1</dt>
  <dd>Type the search pattern that correspond to your query in the search box under the <strong>Live</strong> tab. For our example, the pattern is <code>service=wirecraft AND (type=ec2 running OR type=ebs)</code>.</dd>

  <dt>2</dt>
  <dd>Notice that the button that said <strong>Auto Layout</strong> now says <strong>Filtered Layout</strong>. Click the new button.</dd>

  <dt>3</dt>
  <dd>We will not modify other settings in the new prompt for this example since the pattern already other services. Click <strong>Layout</strong> on the button right corner.</dd>

  <dt>4</dt>
  <dd>Check the components in the diagram and <em>voilà</em>, you will see that they match the pattern entered in our first step.</dd>
</dl>

You could run the same query on another AWS region, and before hitting **Layout**, select **Include existing components** from the **Options** dropdown. Doing so would perform a filtered layout on all the components for the secondary region currently in your inventory and all the components already on the diagram.

Here is a quick video showing this idea in action:

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="A 53 seconds video showing a Cloudcraft user creating a filtered diagram." video="true">}}

You could also combine **Filtered layout** with the **Blueprint link** feature to break down larger environments into multiple diagrams that link to each other. You could even have an overview diagram that provides a quick glance of your whole cloud architecture with no performance penalties.

These examples are just the tip of the iceberg, though. If you want to learn about more ways Cloudcraft can help empower your team, you can [book an online demo with a member of our team over here][1].

If you have any questions, [reach out to our support team][2], and they will be happy to help.

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support
