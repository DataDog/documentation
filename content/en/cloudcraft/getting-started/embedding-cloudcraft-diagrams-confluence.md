---
title: Embedding Cloudcraft diagrams with the Confluence app
kind: guide
---

In this article, we'll walk you through the process of seamlessly integrating your current Cloudcraft diagrams into a Confluence page by using Cloudcraft's Confluence app.

This process allows you to grant access to these diagrams for authorized users without requiring them to have individual Cloudcraft subscriptions, while also granting you a centralized and up-to-date version of your infrastructure documentation.

## Using the app

With a Confluence page open, type **/cloudcraft** into the page and then click the application command that appears.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="Screenshot of Cloudcraft integration tool for embedding diagrams in a Confluence document." responsive="true" style="width:100%;">}}

A Cloudcraft dialog will open. Click the **Sign in** button to log in to your Cloudcraft account.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="Screenshot of Cloudcraft login page for Confluence integration featuring options to sign in with Datadog, Google, or email." responsive="true" style="width:100%;">}}

Once you're logged in, the diagram picker will show up. Select the diagram you want to embed from the list.

<section class="alert alert-info">
  <p>You can also search, filter, and sort diagrams in the diagram picker.</p>
</section>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="Screenshot of the Cloudcraft Confluence app showing options to insert cloud architecture blueprints into a Confluence page with labeled diagrams for staging and production environments." responsive="true" style="width:100%;">}}

After selecting a diagram, a preview of the embedded diagram should appear in your Confluence page. At this point you can also select from the window size menu below to resize the width of the diagram, or click the pencil icon to re-open the diagram picker.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt="Screenshot of an isometric view of a cloud infrastructure layout in Cloudcraft featuring EC2 instances, load balancers, and RDS databases embedded in a Confluence page." responsive="true" style="width:100%;">}}

That's it! When publishing or previewing the Confluence page, your Cloudcraft diagram will be fully integrated in the page.

## Common questions

**Who can view embedded diagrams?**

Embedded diagrams are only viewable by Confluence user accounts. In other words, embedded diagrams won't be displayed when visiting the public URL of a Confluence page.
