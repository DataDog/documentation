---
title: Connect your Azure Account with Cloudcraft
---

This article walks you through connecting your Azure account to Cloudcraft.

## Requirements

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].
- An Azure account with permission to create IAM roles.

## Manage Azure accounts

### Add account

1. In Cloudcraft, navigate to {{< ui >}}User{{< /ui >}} > {{< ui >}}Azure accounts{{< /ui >}}.
2. At the bottom of the modal, click {{< ui >}}Add Azure Account{{< /ui >}}.
3. The next page provides step-by-step instructions. Click {{< ui >}}Select "App registrations" in the left sidebar{{< /ui >}} to register a new application to interface with Cloudcraft in Azure.
4. On the {{< ui >}}App registrations{{< /ui >}} page in {{< ui >}}Azure Active Directory{{< /ui >}}, click {{< ui >}}New registration{{< /ui >}}.
5. Enter the following information:
    - {{< ui >}}Name{{< /ui >}}: Cloudcraft
    - {{< ui >}}Supported account types{{< /ui >}}: Accounts in this organizational directory only (Single tenant)
    - {{< ui >}}Redirect URI{{< /ui >}}: Leave this field blank.
6. Click {{< ui >}}Register{{< /ui >}}.
7. On the details page of your application, copy the {{< ui >}}Application ID{{< /ui >}} and {{< ui >}}Directory ID{{< /ui >}}.
8. In Cloudcraft, paste the  {{< ui >}}Application ID{{< /ui >}} and {{< ui >}}Directory ID{{< /ui >}}, then click {{< ui >}}Next{{< /ui >}}..

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Step-by-step instructions for adding an Azure account to Cloudcraft with highlighted Application and Directory ID fields." responsive="true" style="width:100%;">}}

#### Create a client secret

Next, create a client secret to allow the Cloudcraft application to securely identify itself to Azure's authentication services.

**Note**: You can choose your own expiration period for the client secret. Be aware that when the secret expires, you won't be able to scan your Azure account until you register a new secret and update the account in Cloudcraft.

1. On your application page in Azure, under the {{< ui >}}Manage{{< /ui >}} section in the left sidebar, click {{< ui >}}Certificates & secrets{{< /ui >}}.
2. In the {{< ui >}}Certificates & secrets{{< /ui >}} section, {{< ui >}}New client secret{{< /ui >}}.
3. Enter the following information:
    - {{< ui >}}Description{{< /ui >}}: Cloudcraft
    - {{< ui >}}Expires{{< /ui >}}: 730 days (24 months)
4. Click {{< ui >}}Add{{< /ui >}}.
5. Copy the {{< ui >}}Value{{< /ui >}} of your newly created secret.
6. In Cloudcraft, paste the client secret in the {{< ui >}}Client secret{{< /ui >}} field and click {{< ui >}}Next{{< /ui >}}.

#### Create an IAM user for Cloudcraft

Finally, create an IAM user to allow the Cloudcraft application to read your Azure environment.

1. In Cloudcraft, click {{< ui >}}Open your Azure Subscriptions page{{< /ui >}} link to open the {{< ui >}}Subscriptions{{< /ui >}} page in Azure.
2. Select the subscription you want to use with Cloudcraft.
3. On subscription page, select {{< ui >}}Access control (IAM){{< /ui >}} in the left sidebar.
4. Click {{< ui >}}Add{{< /ui >}} and select {{< ui >}}Add role assignment{{< /ui >}}.  A new page with a list of roles appears.
5. Select {{< ui >}}Reader{{< /ui >}} and click {{< ui >}}Next{{< /ui >}}.
6. On the next page, leave {{< ui >}}User, group or service principal{{< /ui >}} selected and click {{< ui >}}Select members{{< /ui >}}. Search for **Cloudcraft** and select it.
7. Click {{< ui >}}Review + assign{{< /ui >}}.
8. In Cloudcraft, click {{< ui >}}Next{{< /ui >}}.

#### Add subscriptions

Before saving the account, you can optionally configure team access.

1. Click {{< ui >}}Team access{{< /ui >}} and select the teams to share access to the Azure account with. The account will be private and only accessible to you if you skip that step.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="Cloudcraft interface showing team sharing options with a dropdown menu for selecting teams to share Azure account access." responsive="true" style="width:100%;">}}

2. Click {{< ui >}}Save Account{{< /ui >}}.

Your Azure account is now ready to use with Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Screenshot of Cloudcraft interface for managing Azure accounts with an account added." responsive="true" style="width:100%;">}}

## Edit account

To edit an account, click the gray pencil icon to the left of the account you want to edit. You can change details of the account, such as the name, ARN, and team access.

When you are done, click {{< ui >}}Save Account{{< /ui >}}.

## Remove account

To remove an account, click the trash can icon to the right of the account you want to remove, then click {{< ui >}}Remove{{< /ui >}}.

[1]: /cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
