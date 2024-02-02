---
title: Generate an API key
kind: documentation
---

Cloudcraft offers a developer API that provides programmatic access to and remote rendering of your architecture diagrams. The API also provides fully automated visualization of AWS and Azure accounts that are linked with your Cloudcraft account, either as ready to use images or as JSON data.

Authentication is required to use this API. This simple guide describes how to create an API key through the web interface.

<section class="alert alert-info">
  <p> The ability to use Cloudcraft's developer API is only available to Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</p>
</section>

## Prerequisites

This guide assumes that you have:

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].

## Create an API key

To create an API key for automation, start by navigating to **User** → **API keys** and then click **Create API key**.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="Screenshot of Cloudcraft's user interface for managing API keys with a focus on the 'Create API Key' button." responsive="true" style="width:100%;">}}

You'll want to give the API key a name that describes what it's for, for example, "Automation Key," and define the permissions you want to grant to the key. You may also share the key with a team.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="Screenshot of Cloudcraft's API key creation interface with fields for naming and setting permissions." responsive="true" style="width:100%;">}}

When you're done, click **Save key** and a new API key will be created. Make sure to write down the key in a secure location so you can use it later.

If you have any questions or issues with this process, [contact Cloudcraft's support team][3]; they will be happy to help.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://app.cloudcraft.co/support
