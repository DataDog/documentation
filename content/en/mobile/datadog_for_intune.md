---
title: Datadog for Intune
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
---
This guide outlines the steps required to configure and deploy the Datadog for Intune mobile-app in your organization.

## Prerequisites
- The setup requires admin permissions in Intune, Azure and Datadog
- When using Datadog for Intune, users need to download and install the Datadog for Intune from their mobile-app store or Microsoft Partner store.

If you’re looking for some information about the mobile-app bundle ID to create your own configuration:

| Platform   | Store Link                                                             |
|------------|------------------------------------------------------------------------|
| iOS/IPadOS | `https://apps.apple.com/app/datadog-intune/id1673106321`               |
| Android    | `https://play.google.com/store/apps/details?id=com.datadog.app.intune` |

## Initial Datadog for Intune Setup
To get started Intune and Azure admin will need to configure those required settings. Please keep in mind that those are the minimum requirements to have Datadog for Intune working but Admin can set up Configuration Policies and Conditional Access Policies later on.

### Step 1: Add Datadog for Intune apps to your Microsoft Intune Admin Center
1. Open your [admin center][1], select the **Apps** tab and click **Add** on the appropriate **App type** (iOS/iPadOS or Android)
    - For iOS/iPadOS, select “iOS store app” and then search for “Datadog Intune"
    - For Android, select “Android store app” and then copy the required content from the [Google Play store page][2]
2. Assign it to the people and/or groups that you’d like to target

If you need additional support on adding an application for Intune, check out Microsoft’s [Intune Quickstart Guide][3].

### Step 2: Add an App Protection Policy
To allow you members to register and sign in you must apply an app protection policy. This ensures that no one can access the mobile-app without the security settings provided by Microsoft Intune.

1. In your [admin center][1], select the **Apps** tab and click **App Protection Policies**.
2. Create a new policy for the appropriate platform; to address both iOS and Android you’ll need two distinct policies. Add Datadog Intune mobile-app to your policy.
3. Configure your **security settings**
4. Assign those policies to the people or group that you want to target and hit **save**.

Note: It can take [some time for a new App Protection Policy to reach individual devices][4]. To validate that your new policy is set up and working correctly, follow [this guidance from Microsoft’s Intune documentation][5].

### Step 3: Grant admin consent for your organization
On this next part you can leave your Intune admin center to go back on the azure portal for Microsoft Entra-ID.

Your members can only successfully register once [admin consent][6] has been granted.

1. Open [Microsoft Entra-ID][7] (previously named Azure Active Directory) and Navigate to the **Enterprise applications** tab.
2. Search for **"Datadog"**.
    - If “Datadog” isn’t already in the list, click Add and then search for “Datadog” in Microsoft Entra Gallery
3. Click **Permissions**
4. Click **Grant admin consent for <your organization name>**

For additional support for application management settings, you can refer to the [Microsoft documentation][8].

**Note:** If your organization has several applications named “Datadog” configured, the one managing web and mobile-app access has its ApplicationID being **f21cb7e8-00ab-4b0e-aa94-b1e2f674606d**

#### Datadog for Intune requested permissions
These should be added automatically using the appropriate application.

| Name                                    | Claim.value Link                        |
|-----------------------------------------|-----------------------------------------|
| Mirosoft Graph                          | `User.Read`                             |
| Microsoft Mobile Application Management | `DeviceManagementManagedApps.ReadWrite` |


## Deploying Datadog Intune apps to mobile devices
When deploying to Android devices, you need to download the [Microsoft Company Portal app][9] from the Play Store as well as [Datadog - Intune][10].

iOS only requires [Datadog - Intune][11], optionally the [company portal][12] is also supported.

On both platforms the Microsoft Authenticator app can assist with sign-in, if installed.

### Troubleshooting device registration
Members registering their device for Datadog - Intune may experience an error message or some loading issues. To address those issues, have an Intune and Azure administrator confirm the configurations on Microsoft side:

- Have you granted admin consent on Microsoft Entra ID?
- Be sure that an app protection policy has been assigned **to this member**.
    - It can take [some time for a new App Protection Policy to reach individual devices][4] if you’ve updated it recently
- If you have a dedicated app [configuration policy][13] be sure that it has the right keys and values

In case the device registration continues to fail, please reach out to us at [support@datadoghq.com](mailto:support@datadoghq.com) with the Intune Diagnostics attached. You can collect them from the login screen by tapping “View Intune Diagnostics”, “Get Started” and then “Share Logs”.

### Further Reading

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
