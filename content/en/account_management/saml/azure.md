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

Follow these steps to configure Azure AD as a SAML identity provider (IdP) within Datadog. **Note**: An Azure AD subscription is required. If you don't have a subscription, sign up for a [free account][1].

## Configuration
### Azure

1. Open the [Azure portal][2] and sign in as a global administrator or co-admin.

2. Navigate to _Azure Active Directory_ -> _Enterprise applications_ -> _New application_.

3. Scroll down to the **Add from the gallery** section, type **Datadog** in the search box.
   
4. Select **Datadog** from the results panel.

5. Enter the name of your application in the **Name** textbox and click **Add**.

6. Once your application is added, go to **Single sign-on** from the application's left-side navigation menu.

7. On the **Select a single sign-on method** page, click on **SAML**. 

8. Retrieve your `Service Provider Entity ID` and `Assertion Consumer Service URL` from the [Datadog SAML page][3]. The default values are:

    |                                |                                                                                                                |
    |--------------------------------|----------------------------------------------------------------------------------------------------------------|
    | Service Provider Entity ID     | `https://{{< region-param key="dd_full_site" >}}/account/saml/metadata.xml` |
    | Assertion Consumer Service URL | `https://{{< region-param key="dd_full_site" >}}/account/saml/assertion`    |

9.  In Azure, add the values retrieved above and click save:

    `Service Provider Entity ID` to **Identifier**<br>
    `Assertion Consumer Service URL` to **Reply URL**

10. Set the **User Identifier** to `user.mail` and click save.

11. Go to **SAML Signing Certificate** section and check that your **Notification Email** is correct. When the active signing certificate approaches its expiration date, notifications are sent to this email address with instructions on how to update the certificate.

12. In the same **SAML Signing Certificate** section, find **Federation Metadata XML** and select Download to download the certificate and save it.

### Datadog

1. Go to the [Datadog SAML page][3].

2. Choose and upload the **SAML XML Metadata** file downloaded from Azure.

3. You should see the messages **SAML is ready** and **Valid IdP metadata installed**:

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

4. Click **Enable** to start using Azure AD single sign-on with SAML:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

## Advanced URL

If you are using SSO with a Datadog button or link, a sign-on URL is required:

1. Retrieve your Single Sign-on URL from the [Datadog SAML page][3]:

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:70%;">}}

2. In Azure, navigate to the SSO Configuration section of your Azure Application, check **Show advanced URL settings**, and add your single sign-on URL.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://azure.microsoft.com/free/
[2]: https://portal.azure.com
[3]: https://app.datadoghq.com/saml/saml_setup
