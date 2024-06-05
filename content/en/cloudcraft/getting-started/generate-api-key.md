---
title: Generate an API Key
kind: documentation
---

Cloudcraft offers a developer API that provides programmatic access and remote rendering of your architecture diagrams. The API also provides fully automated visualization of AWS and Azure accounts that are linked with your Cloudcraft account, either as ready to use images or as JSON data.

Authentication is required to use this API. This guide describes how to create an API key through the web interface.

<div class="alert alert-info">The ability to use Cloudcraft's developer API is only available to Pro subscribers. See <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</div>

## Prerequisites

This guide assumes that you have:

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].

## Create an API key

To create an API key for automation, go to **User** > **API keys** and click **Create API key**.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="Screenshot of Cloudcraft's user interface for managing API keys with a focus on the 'Create API key' button." responsive="true" style="width:75%;">}}

The key's name should describe its purpose, for example, "Automation Key," and have proper permissions. Select the permission that best fits this key, but try to follow the [principle of least privilege][3]. The same principle applies when giving teams access to this key.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="Screenshot of Cloudcraft's API key creation interface with fields for naming and setting permissions." responsive="true" style="width:100%;">}}

When you're done, click **Save key** and a new API key will be created. Make sure to write down the key in a secure location so you can use it later.

If you have any questions or issues with this process, [contact Cloudcraft's support team via the in-app beacon][4].

[1]: /cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[4]: https://app.cloudcraft.co/support
