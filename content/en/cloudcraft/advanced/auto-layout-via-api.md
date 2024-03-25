---
title: Automate Snapshots of Cloud Accounts via the Cloudcraft API
kind: guide
---

## Overview

Cloudcraft's **Auto Layout** feature, accessible through the web application, is a powerful tool for automatically generating diagrams of your AWS environment. This functionality can significantly streamline documentation processes and facilitate the onboarding of new team members.

This guide provides a step-by-step approach to utilizing this feature via common command-line utilities and the Cloudcraft developer API.

<div class="alert alert-info">The ability to add and scan AWS and Azure accounts, as well as to use Cloudcraft's developer API, is only available to Pro subscribers. Check out <a href="https://www.cloudcraft.co/pricing">Cloudcraft's pricing page</a> for more information.</div>

## Prerequisites

- An active [Cloudcraft Pro subscription][1].
- An API key with read-write permissions.
- The account ID of the AWS or Azure account you wish to scan.
- Access to a Unix-like environment (Linux, macOS, or Windows Subsystem for Linux).
- Familiarity with command-line operations.
- Basic knowledge of API usage.

## Take a snapshot of the account

Start by creating a snapshot of your AWS or Azure account using the [Snapshot AWS account][2] or [Snapshot Azure account][3] endpoints. This process mirrors the functionality of the **Scan Now** button in the Cloudcraft UI and outputs the snapshot in JSON format.

Execute the following command in your terminal:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY"
{{< /code-block >}}

Replace PROVIDER with the cloud provider, i.e., `azure` or `aws`, ACCOUNT_ID with the ID of your AWS or Azure account in Cloudcraft, REGION with your desired scan region, and API_KEY with your Cloudcraft API key.

After executing the command, you will see the JSON representation of your AWS account snapshot. To save this output directly to a file, use the following command:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY" > '/tmp/account-infra.json'
{{< /code-block >}}

You will find the snapshot saved as `account-infra.json` in your temporary directory.

## Generate a new blueprint

With the account snapshot in hand, proceed to create a new blueprint in your Cloudcraft account using the [Create blueprint][4] API endpoint. The saved snapshot data will serve as the payload for this request.

Execute the following command in your terminal:

{{< code-block lang="shell" >}}
curl \
  --request 'POST' \
  --url 'https://api.cloudcraft.co/blueprint' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer API_KEY" \
  --data '@/tmp/account-infra.json'
{{< /code-block >}}

Remember to replace API_KEY with your actual Cloudcraft API key.

Upon completion, a new blueprint reflecting your cloud infrastructure will be created in your Cloudcraft account, replicating the effect of manually using the **Scan Now** and **Auto Layout** buttons.

If you have any questions or trouble with the process, [get in touch with our support team][5] and we will be happy to help.

[1]: https://www.cloudcraft.co/pricing
[2]: /cloudcraft/api/aws-accounts/#snapshot-aws-account
[3]: /cloudcraft/api/azure-accounts/#snapshot-an-azure-account
[4]: /cloudcraft/api/blueprints/#create-a-blueprint
[5]: https://app.cloudcraft.co/app/support
