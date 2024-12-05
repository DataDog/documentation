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

1. In Cloudcraft, navigate to **User** > **Azure accounts**.
2. At the bottom of the modal, click **Add Azure Account**.
3. The next page provides step-by-step instructions. Click **Select "App registrations" in the left sidebar** to register a new application to interface with Cloudcraft in Azure.
4. On the **App registrations** page in **Azure Active Directory**, click **New registration**.
5. Enter the following information:
    - **Name**: Cloudcraft
    - **Supported account types**: Accounts in this organizational directory only (Single tenant)
    - **Redirect URI**: Leave this field blank.
6. Click **Register**.
7. On the details page of your application, copy the **Application ID** and **Directory ID**.
8. In Cloudcraft, paste the  **Application ID** and **Directory ID**, then click **Next**..

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Step-by-step instructions for adding an Azure account to Cloudcraft with highlighted Application and Directory ID fields." responsive="true" style="width:100%;">}}

#### Create a client secret

Next, create a client secret to allow the Cloudcraft application to securely identify itself to Azure's authentication services.

**Note**: You can choose your own expiration period for the client secret. Be aware that when the secret expires, you won’t be able to scan your Azure account until you register a new secret and update the account in Cloudcraft.

1. On your application page in Azure, under the **Manage** section in the left sidebar, click **Certificates & secrets**.
2. In the **Certificates & secrets** section, **New client secret**.
3. Enter the following information:
    - **Description**: Cloudcraft
    - **Expires**: 730 days (24 months)
4. Click **Add**.
5. Copy the **Value** of your newly created secret.
6. In Cloudcraft, paste the client secret in the **Client secret** field and click **Next**.

#### Create an IAM user for Cloudcraft

Finally, create an IAM user to allow the Cloudcraft application to read your Azure environment.

1. In Cloudcraft, click **Open your Azure Subscriptions page** link to open the **Subscriptions** page in Azure.
2. Select the subscription you want to use with Cloudcraft.
3. On subscription page, select **Access control (IAM)** in the left sidebar.
4. Click **Add** and select **Add role assignment**.  A new page with a list of roles appears.
5. Select **Reader** and click **Next**.
6. On the next page, leave **User, group or service principal** selected and click **Select members**. Search for **Cloudcraft** and select it.
7. Click **Review + assign**.
8. In Cloudcraft, click **Next**.

#### Add subscriptions

Before saving the account, you can optionally configure team access.

1. Click **Team access** and select the teams to share access to the Azure account with. The account will be private and only accessible to you if you skip that step.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="Cloudcraft interface showing team sharing options with a dropdown menu for selecting teams to share Azure account access." responsive="true" style="width:100%;">}}

2. Click **Save Account**.

Your Azure account is now ready to use with Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Screenshot of Cloudcraft interface for managing Azure accounts with an account added." responsive="true" style="width:100%;">}}

## Edit account

To edit an account, click the gray pencil icon to the left of the account you want to edit. You can change details of the account, such as the name, ARN, and team access.

When you are done, click **Save Account**.

## Remove account

To remove an account, click the trash can icon to the right of the account you want to remove, then click **Remove**.

[1]: /cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
