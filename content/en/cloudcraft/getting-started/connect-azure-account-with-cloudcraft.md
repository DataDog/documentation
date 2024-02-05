---
title: Connect your Azure Account with Cloudcraft
kind: documentation
---

This article will walk you through connecting your Azure account to Cloudcraft.

## Requirements

- A Cloudcraft user with the [Owner or Administrator role][1].
- An active [Cloudcraft Pro subscription][2].
- An Azure account with permission to create IAM roles.

## Manage Azure accounts

Head to **User → Azure accounts** inside Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/manage-azure-accounts.png" alt="Screenshot of Cloudcraft's user interface for managing Azure accounts for live infrastructure visualization." responsive="true" style="width:100%;">}}

### Add account

Click the blue **Add Azure Account** button at the bottom of the **Manage Azure accounts** window.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/add-azure-account.png" alt="Cloudcraft interface showing the 'Add Azure Account' button for cloud infrastructure management." responsive="true" style="width:100%;">}}

#### Create an app for Cloudcraft

The next screen will provide step-by-step instructions to have your Azure account added. Click the blue **Select "App registrations" in the left sidebar** link to get started.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/app-registrations.png" alt="Step-by-step instructions for adding an Azure account to Cloudcraft highlighting the app registration process in Azure Active Directory." responsive="true" style="width:100%;">}}

The link will take you directly to the **App registrations** page in the **Azure Active Directory**, where you can register a new application to interface with Cloudcraft. Proceed by clicking the **New registration** button at the top.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/new-app-registration.png" alt="Screenshot highlighting the 'New Registration' button on Azure's application's App registrations page." responsive="true" style="width:100%;">}}

On the next prompt you will be asked for the name of your application and the supported account types. Fill these fields with the following:

- **Name:** Cloudcraft
- **Supported account types:** Accounts in this organizational directory only (Single tenant)

Leave the **Redirect URI** field empty, click the **Register** button at the bottom, and if everything worked as expected, you should be redirected to the details page for your application.

In the **Essentials** section of this page, look for the **Application ID** and **Directory ID**, copy them, and head back to Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-azure-ids.png" alt="Screenshot of Cloudcraft application details in Microsoft Azure portal." responsive="true" style="width:100%;">}}

Once back in Cloudcraft, paste the IDs you copied in the last step and click the blue **Next** button to continue.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Step-by-step instructions for adding an Azure account to Cloudcraft with highlighted Application and Directory ID fields." responsive="true" style="width:100%;">}}

#### Create a client secret

Now we need to create a client secret, which allow the Cloudcraft application to identify itself to Azure's authentication services securely. To do that, head back to your application page on Azure, and click the **Certificates & secrets** link in the left sidebar, under the **Manage** section.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/certificates-secrets-menu.png" alt="Screenshot showing the 'Certificates & secrets' section highlighted in Azure Active Directory management menu." responsive="true" style="width:100%;">}}

On the **Certificates & secrets** section, click the **New client secret** button at the bottom, under the **Client secrets** section. A small window will pop on your screen where you can configure the name of the secret and when it should expire.

Fill the fields with the following:

- **Description:** Cloudcraft
- **Expires:** 730 days (24 months)

Click the blue **Add** button to add the client secret.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/add-client-secret.png" alt="Screenshot of Azure's 'Add a client secret' dialog with fields for description and expiration set to 730 days." responsive="true" style="width:100%;">}}

Now look for the **Value** of your newly created secret, copy it, and head back to Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/client-secret-value.png" alt="Screenshot showing a generated new client secret value for Cloudcraft in the Azure portal with an expiration date of 12/31/2299." responsive="true" style="width:100%;">}}

Back in Cloudcraft, paste the client secret in the **Client secret** field and click the blue **Next** button.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/client-secret-cloudcraft.png" alt="Step-by-step guide for creating an Azure client secret for Cloudcraft application with highlighted instructions and textbox." responsive="true" style="width:100%;">}}

#### Create an IAM user for Cloudcraft

Almost there! Now we need to create an IAM user to allow the Cloudcraft application to read your Azure environment.

Click the blue **Open your Azure Subscriptions page** link, and once in your **Subscriptions** page, click on the subscription you want to use with Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-subscription-page.png" alt="Screenshot of an Azure cloud services interface showing a subscription labeled Cloudcraft Development with subscription management options." responsive="true" style="width:100%;">}}

When the new page opens, select **Access control (IAM)** in the left sidebar.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/application-overview-iam.png" alt="Screenshot of Cloudcraft Development subscription in Azure highlighting the Access control (IAM) option." responsive="true" style="width:100%;">}}

Now, click the blue **Add** button and select **Add role assignment**.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/add-role-assignment-button.png" alt="Screenshot showing the Azure portal Access Control (IAM) menu with the Add role assignment option highlighted." responsive="true" style="width:100%;">}}

A new page with a list of roles will appear. Select **Reader** and click **Next**.

On the next page, leave **User, group or service principal** selected and click **Select members**. Search for **Cloudcraft** and select it.

Click **Review + assign** when you are done and head back to Cloudcraft. Click the blue **Next** button.

#### Add subscriptions

Before saving this account, you can optionally configure team access. Click on the blue button beneath **Team access** and select the teams to share access to the Azure account with.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="Screenshot of Cloudcraft interface showing team sharing options with a dropdown menu for selecting teams to share Azure account access." responsive="true" style="width:100%;">}}

The account will be private and only accessible to you if you skip that step.

Now click the blue **Save Account** link at the bottom of the screen and that is it, your Azure account has been added to Cloudcraft and is ready to be used within the application.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Screenshot of Cloudcraft interface for managing Azure accounts with an account added." responsive="true" style="width:100%;">}}

If you have any questions or trouble with the process, [get in touch with our support team][3] and we will be happy to help.

## Edit account

Click the gray pencil icon to the left of the account you want to edit.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/edit-azure-account.png" alt="Screenshot of Cloudcraft interface for managing Azure cloud accounts highlighting the 'Edit account' icon." responsive="true" style="width:100%;">}}

In this screen you can change account details like name, client secret, team access, and more.

When you are done, click the blue **Save Account** link at the bottom of the screen.

## Remove account

Click the gray trash can icon to the right of the account you want to remove.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/remove-azure-account.png" alt="Screenshot of Cloudcraft interface for managing Azure cloud accounts highlighting the 'Delete account' icon." responsive="true" style="width:100%;">}}

Now click the red **Remove** button.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/confirm-account-removal.png" alt="Warning message for removing an Azure cloud account with the name Cloudcraft Development highlighted in the confirmation dialog." responsive="true" style="width:100%;">}}

## Common questions

**Is there is a limit of Azure accounts you can add?**

No, you can connect an unlimited number of Azure accounts to Cloudcraft.

**Can I choose another expiration period for the client secret?**

Yes, you can any value you or your organization prefers. Just keep in mind that when the secret expires, you won't be able to scan your Azure account anymore until you register a new secret and update the account in Cloudcraft.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://app.cloudcraft.co/app/support
