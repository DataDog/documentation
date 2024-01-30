---
title: Add Azure accounts via the Cloudcraft API
kind: guide
---

Cloudcraft doesn't offer a way to add multiple Azure accounts at once using the web interface, but you can do so via [our API][1]. This article shows you how.

<section class="alert alert-info">
  <p> The ability to add and scan Azure accounts, as well as to use Cloudcraft's developer API, is only available to Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</p>
</section>

## Getting started

This guide assumes that you have:

- A Cloudcraft user with the [Owner or Administrator role][2].
- An active [Cloudcraft Pro subscription][3].
- An Azure account with proper permissions.
- A Unix-like environment, such as Linux, macOS, or WSL on Windows with cURL installed.
- A basic understanding of the command-line interface.
- A basic understanding of how to use APIs.

Before adding an Azure account to Cloudcraft, make sure you have the **Application ID**, **Directory ID**, **Subscription ID**, and **Client secret** for your Azure account.

If you don't have these values, follow the instructions in the article below, but skip actually adding the account.

- [Connect your Azure account with Cloudcraft][4]

## Adding an Azure account

Time to add your Azure account to Cloudcraft! To accomplish that, we'll use cURL on the command-line, so make sure you have your terminal open and type the following.

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

Replace _AZURE_ACCOUNT_NAME_ with the name you want the account to have in Cloudcraft and the other values with the actual values. Replace _API_KEY_ with your API key.

Assuming you got a successful response, the account should now be added to Cloudcraft. You can repeat the previous step for adding additional Azure accounts to Cloudcraft.

If you have any questions or issues with this process, [contact Cloudcraft's support team][5]; they will be happy to help.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://help.cloudcraft.co/article/103-connect-azure-account-with-cloudcraft
[5]: https://app.cloudcraft.co/support
