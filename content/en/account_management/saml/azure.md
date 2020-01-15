---
title: Configuring Azure AD as a SAML IdP
kind: documentation
aliases:
  - /account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
disable_toc: true
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

Below is a step by step guide to configure Azure AD as a SAML IdP within Datadog:
**Note**: an Azure AD Premium Subscription is required to set this up

#### Configuration

1. Navigate to `https://portal.azure.com/`.

2. When logged into Azure, go to the *Azure Active Directory* tab on the left hand menu.

3. Select the **Enterprise applications** service.

4. Click on the **New application** button.

5. Select the **Non-gallery application**.

    {{< img src="account_management/saml/non_gallery_application.png" alt="Non Gallery application"  style="width:20%;">}}

6. Name it (e.g **DatadogSSO_test**).

7. Click on **Add**.

8. Once your application is successfully added, go in **Configure single sign-on (required)**.

9. Select the **SAML-based Sign-on** as Single Sign-on Mode.

    {{< img src="account_management/saml/saml_based_sign_on.png" alt="Saml Based Sign on"  style="width:70%;">}}

10. Navigate to the [Datadog SAML page][1], find the **Service Provider Entity ID** & **Assertion Consumer Service** URL on the right hand of the page.  Copy and paste those values in the **Identifier** and **Reply URL** text forms respectively:
    In Datadog:

    {{< img src="account_management/saml/Step10Redo.png" alt="Step10Redo"  style="width:70%;">}}

    In the Azure portal:

    {{< img src="account_management/saml/set_values_azure.png" alt="Set value azure"  style="width:70%;">}}

11. Set `user.mail` as the value for **User Identifier**:

    {{< img src="account_management/saml/user_identifier.png" alt="User Identifier"  style="width:70%;">}}

12. Enter your **Notification Email** at the bottom of the page. When the active signing certificate approaches its expiration date, notifications are sent to this email address with instructions on how to update the certificate:

    {{< img src="account_management/saml/notification_email.png" alt="Notification email"  style="width:70%;">}}

13. Click at the bottom of the page on Step 5, **Configure DatadogSSO_test**.

14. Scroll down to Step 3 of the *Configure DatadogSSO_test* for single sign on section, and download the **SAML XML Metadata** file.

15. Go to the top of your **SSO Configuration section** and click **Save**.

16. Navigate back to [Datadog SAML page][1] and upload the **SAML XML Metadata** file downloaded in Step 14:

    {{< img src="account_management/saml/SAML_Configuration___Datadog10.png" alt="SAML_Configuration___Datadog10"  style="width:70%;">}}

17. Make sure to press the **Upload File** button after having chosen the XML file to upload.

18. And that's it! It should now say *SAML is ready* and that valid IdP metadata is installed.

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

19. Begin to log in to Datadog via Azure AD by pressing **Enable**:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

#### Optional

If you are using an SSO via a Datadog button or link, you need to add a Sign-on URL. To do this, navigate back to the SSO Configuration section of the Azure Application (Step 8) and check off **Show advanced URL settings**:

Then paste the Single Sign-on URL that is displayed in the [Datadog SAML page][1].

{{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:60%;">}}

#### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/saml/saml_setup
