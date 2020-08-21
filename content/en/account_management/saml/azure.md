---
title: Azure Active Directory SAML IdP
kind: documentation
aliases:
  - /account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

Below is a step by step guide to configure Azure AD as a SAML IdP within Datadog. **Note**: an Azure AD premium subscription is required.

## Configuration
### Azure

1. Open the [Azure portal][1] and sign in as a global administrator or co-admin.

2. Navigate to _Azure Active Directory_ -> _Enterprise applications_ -> _New application_.

3. Select **Non-gallery application** in the **Add your own app** section.

4. Enter the name of your application in the **Name** textbox and click **Add**.

5. Once your application is added, go to **Single sign-on** from the application's left-side navigation menu.

6. Select the **SAML-based Sign-on** in the **Single Sign-on Mode** drop-down.

7. Retrieve your `Service Provider Entity ID` and `Assertion Consumer Service URL` from the [Datadog SAML page][2]. The default values are:

    |                                |                                                                            |
    |--------------------------------|----------------------------------------------------------------------------|
    | Service Provider Entity ID     | `https://app.{{< region-param key="dd_site" >}}/account/saml/metadata.xml` |
    | Assertion Consumer Service URL | `https://app.{{< region-param key="dd_site" >}}/account/saml/assertion`    |

8. In Azure, add the values retrieved above:

    `Service Provider Entity ID` to **Identifier**<br>
    `Assertion Consumer Service URL` to **Reply URL**

9. Set the **User Identifier** to `user.mail`.

10. Enter your **Notification Email** at the bottom of the page. When the active signing certificate approaches its expiration date, notifications are sent to this email address with instructions on how to update the certificate.

11. Go to the **SAML Signing Certificate** section and download the **SAML XML Metadata** file.

12. Go to the top of your **SSO Configuration section** and click **Save**.

### Datadog

1. Go to the [Datadog SAML page][2].

2. Choose and upload the **SAML XML Metadata** downloaded from Azure.

3. You should see the messages **SAML is ready** and **Valid IdP metadata installed**:

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

4. Click **Enable** to start using Azure AD single sign-on with SAML:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

## Advanced URL

If you are using SSO with a Datadog button or link, a sign-on URL is required:

1. Retrieve your Single Sign-on URL from the [Datadog SAML page][2]:

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:70%;">}}

2. In Azure, navigate to the SSO Configuration section of your Azure Application, check **Show advanced URL settings**, and add your single sign-on URL.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://portal.azure.com
[2]: https://app.datadoghq.com/saml/saml_setup
