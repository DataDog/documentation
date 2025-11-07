---
title: Datadog for Intune
description: "Deploy and configure the Datadog for Intune mobile app within your organization using Microsoft Intune admin center and Azure settings."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
---

This guide provides step-by-step instructions to configure and deploy the Datadog for Intune mobile app within your organization.

## Prerequisites
Before you begin, ensure the following requirements are met:

- You have admin permissions in **Intune, Azure, and Datadog**
- Users must download and install the **Datadog for Intune** app from their mobile app store or Microsoft Partner store.

For those looking to create a custom configuration using the mobile app bundle ID, see the links below:

| Platform   | Store Link                                                                                            | BundleID                    |
|------------|-------------------------------------------------------------------------------------------------------|-----------------------------|
| iOS/iPadOS | [Datadog Intune on the App Store](https://apps.apple.com/app/datadog-intune/id1673106321)             | com.datadog.flagship-intune |
| Android    | [Datadog Intune on Google Play](https://play.google.com/store/apps/details?id=com.datadog.app.intune) | com.datadog.app.intune      |

## Initial Setup for Datadog for Intune
To get started, an Intune and Azure admin needs to configure the required settings. These are the **minimum** necessary steps to ensure Datadog for Intune functions correctly. Additional policies, such as those for configuration or conditional access, can be set up later.

### Step 1: Add Datadog for Intune to Microsoft Intune admin center
1. Open your [Microsoft Intune admin center][1], navigate to the **Apps** tab, and click **Add** under the appropriate **App type** (iOS/iPadOS or Android):
   - For iOS/iPadOS: Select **"iOS store app"**, then search for "Datadog Intune."
   - For Android: Select **"Android store app"**, then copy the required details from the [Google Play store page][2].
2. Assign the app to the relevant users and/or groups.

For additional guidance on adding an application to Intune, read Microsoft's [Intune Quickstart Guide][3].

### Step 2: Apply an app protection policy
To enable users to register and sign in securely, an **App Protection Policy** must be applied. This ensures access to the app is protected by Microsoft Intune security settings.

1. In the [admin center][1], go to the **Apps** tab and select **App Protection Policies**.
2. Create a policy for the appropriate platform (iOS and Android require separate policies).
3. Click **Select custom apps** and add **Datadog Intune** to the policy. If you can't see it, ensure you have completed [step 1](#step-1-add-datadog-for-intune-to-microsoft-intune-admin-center).
4. Configure your **security settings** and assign the policy to targeted users or groups.
5. Click **Save**.

**Note:** It may take some time for the new App Protection Policy to be applied to all devices. You can verify the setup by following [Microsoft's guidance][5].

### Step 3: Grant admin consent for your organization
In this step, switch from the Intune admin center to the Azure portal for Microsoft Entra-ID.

Admin consent is required before users can register successfully. Follow these steps:

1. Open [Microsoft Entra-ID][7] (formerly Azure Active Directory) and go to **Enterprise Applications**.
2. Search for **"Datadog"**:
   - If it isn't listed, click **Add**, then search for "Datadog" in the Microsoft Entra Gallery.
3. Select **Permissions**, then click **Grant admin consent for \<your organization name\>**.

For additional support with application management settings, see the [Microsoft documentation][8].

**Note:** If your organization has multiple "Datadog" applications configured, the one managing web and mobile app access has the Application ID **0e6423ac-38ea-4d77-8389-69ec289b5090**.

#### Datadog for Intune required permissions
Permissions are automatically added when configuring the application:

| Name                                    | Claim Value                              | Permission                                      | Type      |
|-----------------------------------------|------------------------------------------|-------------------------------------------------|-----------|
| Microsoft Graph                         | `User.Read`                              | Sign in and read user profile                   | Delegated |
| Microsoft Mobile Application Management | `DeviceManagementManagedApps.ReadWrite`  | Read and Write the User's App Management device | Delegated |

**Notes:**
- The mobile app only uses these two permissions. When granting consent you may see more permissions, because the mobile app shares the same Microsoft Entra application as the web app and the [Microsoft Teams Integration](https://docs.datadoghq.com/integrations/microsoft_teams). If you're not using it, you can revoke those permissions from the **Permissions** tab on the page in [step 3](#step-3-grant-admin-consent-for-your-organization).
- While `DeviceManagementManagedApps.Read` exists, it is an MS Graph API permission, and the mobile app requires a MAM permission. `DeviceManagementManagedApps.ReadWrite` is the only MAM permission available, but the mobile app only reads and doesn't write anything. For more information on how to grant `DeviceManagementManagedApps.ReadWrite` permission, follow these [steps][15].

## Deploying Datadog Intune to mobile devices
When deploying to Android devices, users need to install the following:

- The [Microsoft Company Portal app][9]
- [Datadog - Intune][10]

For iOS devices, only [Datadog - Intune][11] is required, but the [Company Portal app][12] can be optionally installed.

On both platforms, the **Microsoft Authenticator app** can assist with sign-in if installed.

## Troubleshooting

### Device registration
If users encounter issues while registering their devices for Datadog Intune, administrators should verify the following configurations:

- The **admin consent** has been granted on Microsoft Entra-ID.
- An **App Protection Policy** is assigned to the user.
  - **Note**: It may take some time for policy updates to reach devices.
- If a dedicated **App Configuration Policy** exists, ensure it contains the correct keys and values.

If registration issues persist, contact us at [support@datadoghq.com][14] with the Intune Diagnostics attached. To collect diagnostics:

1. On the login screen, tap **View Intune Diagnostics.**
2. Select **Get Started** and then **Share Logs.**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://intune.microsoft.com/
[2]: https://play.google.com/store/apps/details?id=com.datadog.app.intune
[3]: https://learn.microsoft.com/en-us/mem/intune/apps/quickstart-add-assign-app
[4]: https://docs.microsoft.com/en-us/mem/intune/apps/app-protection-policy-delivery
[5]: https://docs.microsoft.com/en-us/mem/intune/apps/app-protection-policies-validate
[6]: https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience
[7]: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview
[8]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/
[9]: https://play.google.com/store/apps/details?id=com.microsoft.windowsintune.companyportal
[10]: https://play.google.com/store/apps/details?id=com.datadog.app.intune
[11]: https://apps.apple.com/app/datadog-intune/id1673106321
[12]: https://apps.apple.com/app/intune-company-portal/id719171358
[13]: https://docs.datadoghq.com/mobile/enterprise_configuration/
[14]: mailto:support@datadoghq.com
[15]: https://learn.microsoft.com/en-us/entra/msal/dotnet/how-to/create-config-for-mam-conditional-access#setup-client-apps:~:text=Grant%20Admin%20consent.-,Setup%20Client%20Apps,-In%20Microsoft%20Entra
