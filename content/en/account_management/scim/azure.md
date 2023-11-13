---
title: Configure SCIM with Azure Active Directory
kind: documentation
---

See the following instructions to synchronize your Datadog users with Azure Active Directory using SCIM.

## Add Datadog to the Azure AD application gallery

1. In your Azure portal, go to **Azure Active Directory** -> **Enterprise Applications**
2. Click **New Application** -> **Create your own application**
3. Type "Datadog" in the search box
4. Select the Datadog application from the gallery
5. Enter a name
6. Click **Create**

**Note:** If you already have Datadog configured with Azure AD for SSO, go to **Enterprise Applications** and select your existing Datadog application.

## Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. In the **Provisioning Mode** menu, select **Automatic**
3. Open **Admin Credentials**
4. Complete the **Admin Credentials** section as follows:
    - **Tenant URL**: `https://app.datadoghq.com/api/v2/scim`
    - **Secret Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][2]. To maintain continuous access to your data, use a [service account][3] application key.

{{< img src="/account_management/scim/admin-credentials.png" alt="Azure AD Admin Credentials configuration screen">}}

5. Click **Test Connection**, and wait for the message confirming that the credentials are authorized to enable provisioning.
6. Click **Save**. The mapping section appears. See the following section to configure mapping.

## Attribute mapping

### User attributes

1. Expand the **Mappings** section
2. Click **Provision Azure Active Directory Users**
3. Set **Enabled** to **Yes**
4. Click the **Save** icon
5. Under **Target Object actions**, ensure Create, Update, and Delete actions are selected
6. Review the user attributes that are synchronized from Azure AD to Datadog in the attribute mapping section. Set the following mappings:
| Azure Active Directory Attribute | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

7. After you set your mappings, click **Save**.

### Group attributes

Group mapping is not supported.
