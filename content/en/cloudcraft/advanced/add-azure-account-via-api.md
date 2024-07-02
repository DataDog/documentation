---
title: Add Azure accounts via the Cloudcraft API
---

Cloudcraft currently doesn't offer a way to add multiple Azure accounts at once using the web interface, but you can do so via [the API][1].

<div class="alert alert-info">The ability to add and scan Azure accounts, as well as to use Cloudcraft's developer API, is only available to Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</div>

## Prerequisites

Before you begin, make sure you have the following:

- A Cloudcraft user with the [Owner or Administrator role][2].
- An active [Cloudcraft Pro subscription][3].
- An Azure account with proper permissions.
- A Unix-like environment, such as Linux, macOS, or WSL on Windows with cURL installed.
- A basic understanding of the command-line interface.
- A basic understanding of how to use APIs.

You must also have the **Application ID**, **Directory ID**, **Subscription ID**, and **Client secret** for your Azure account. For help locating these values, see [Connect your Azure account with Cloudcraft][4].

## Adding an Azure account

To add your Azure account to Cloudcraft, open the command line and enter the following cURL command:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/azure/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AZURE_ACCOUNT_NAME","applicationId": "APPLICATION_ID","directoryId": "DIRECTORY_ID","subscriptionId": "SUBSCRIPTION_ID","clientSecret": "CLIENT_SECRET"}'
{{< /code-block >}}

Replace `_AZURE_ACCOUNT_NAME_` with the name you want the account to have in Cloudcraft and the other values with the actual values. Replace `_API_KEY_` with your API key.

After you successfully add the account, you can use the same command to add additional accounts to Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: /cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
