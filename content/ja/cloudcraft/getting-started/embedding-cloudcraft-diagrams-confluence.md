---
title: Embedding Cloudcraft Diagrams with the Confluence App
---

In this article, we'll walk you through the process of seamlessly integrating your current Cloudcraft diagrams into a Confluence page by using Cloudcraft's Confluence app.

This process allows you to grant access to diagrams for authorized users without requiring them to have individual Cloudcraft subscriptions, while also granting you a centralized and up-to-date version of your infrastructure documentation.

## Installing the app

To install Cloudcraft's Confluence application, log in to Confluence as an admin, navigate to [the Cloudcraft marketplace listing][1], and then click **Get it now**.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/marketplace-listing.png" alt="Cloudcraft's app on the Atlassian Marketplace." responsive="true" style="width:100%;">}}

## Using the app

With a Confluence page open, type **/cloudcraft**, and then click the application command that appears.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="The Cloudcraft integration tool for embedding diagrams in a Confluence document." responsive="true" style="width:100%;">}}

Next, click **Sign in** to log in to your Cloudcraft account.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="The Cloudcraft login page for the Confluence integration with options to sign in with Datadog, Google, or email." responsive="true" style="width:100%;">}}

Once you're logged in, the diagram picker appears. Select the diagram you want to embed from the list.

<div class="alert alert-info">You can also search, filter, and sort diagrams in the diagram picker.</div>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="The Cloudcraft Confluence app showing options to insert cloud architecture blueprints into a Confluence page with labeled diagrams for staging and production environments." responsive="true" style="width:100%;">}}

After selecting a diagram, a preview of the embedded diagram appears in your Confluence page. At this point, you can also select from the window size menu to resize the width of the diagram, or click the pencil icon to reopen the diagram picker.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt="An isometric view of a cloud infrastructure layout in Cloudcraft featuring EC2 instances, load balancers, and RDS databases embedded in a Confluence page." responsive="true" style="width:100%;">}}

When publishing or previewing the Confluence page, your Cloudcraft diagram will be fully embedded on the page.

Embedded diagrams are only viewable by Confluence user accounts, and are not visible when accessing the public URL of a Confluence page.

[1]: https://marketplace.atlassian.com/apps/1233281/cloudcraft-aws-and-azure-cloud-diagrams-for-confluence?hosting=cloud&tab=overview