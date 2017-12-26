---
title: How do I configure Azure AD as a SAML IdP?
kind: faq
further_reading:
- link: "/account_management/saml"
  tag: "Documentation"
  text: Configure SAML for your Datadog account
- link: "/account_management/multi_organization"
  tag: "Documentation"
  text: Configuring Teams & Organizations with Multiple Accounts
---

Below is a step by step guide to configure Azure AD as a SAML IdP within Datadog:  
**Note**: an Azure AD Premium Subscription is required to set this up

1. Navigate to `manage.windowsazure.com`

2. Go to the Active Directory sub menu

3. Select the active directory you wish to use for SSO

4. Go the "Applications" section along the top nav bar

5. Press "Add" at the bottom of the screen
    {{< img src="account_management/faq/Step5redo.png" alt="Step5redo" responsive="true" popup="true">}}

6. Select "Add an application from the gallery"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure.png" alt="Active_Directory_-_Microsoft_Azure" responsive="true" popup="true">}}
    

7. Select "Custom" -> "Add an unlisted application my organization is using" -> Enter a name like "DatadogSSOApp" as the application name. Then press the check button when complete
    **NOTE**: if you don't see the "Add an unlisted application my organization is using" option, it means that you don't have the Premium subscription for Azure AD. Upgrade to Azure AD Premium and then refresh the page
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure2.png" alt="Active_Directory_-_Microsoft_Azure2" responsive="true" popup="true">}}

8. Once the Application has been created, select "Configure single sign-on"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure3.png" alt="Active_Directory_-_Microsoft_Azure3" responsive="true" popup="true">}}

9. Select "Microsoft Azure AD Single Sign-On"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure4.png" alt="Active_Directory_-_Microsoft_Azure4" responsive="true" popup="true">}}

10. Navigate to https://app.datadoghq.com/saml/saml_setup, find the Service Provider Entity ID & Assertion Consumer Service URL on the right hand of the page.  Copy and paste those values in the "Identifier" and "Reply URL" text forms respectively
    {{< img src="account_management/faq/Step10Redo.png" alt="Step10Redo" responsive="true" popup="true">}}
    {{< img src="account_management/faq/Step10Redo2.png" alt="Step10Redo2" responsive="true" popup="true">}}

11. On the next page Download Metadata (XML), check the box confirming you have configured SSO and press next. Use this file in step 17

12. Enter in an email address at which you would like to be notified about maintenance issues

13. Once you are back to the applications main page, navigate to "Attributes"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure6.png" alt="Active_Directory_-_Microsoft_Azure6" responsive="true" popup="true">}}

14. In "SAML Token Attributes", hover over the line where "TYPE" is "user attribute (nameid)" (usually the first one) and click on the pencil icon to edit
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure7.png" alt="Active_Directory_-_Microsoft_Azure7" responsive="true" popup="true">}}

15. Change the attribute value to "user.mail" and press the check button
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure14.png" alt="Active_Directory_-_Microsoft_Azure14" responsive="true" popup="true">}}

16. Press "Apply Changes" at the bottom of the screen
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure9.png" alt="Active_Directory_-_Microsoft_Azure9" responsive="true" popup="true">}}

17. Navigate back to https://app.datadoghq.com/saml/saml_setup and upload the xml file downloaded in step 11:
    {{< img src="account_management/faq/SAML_Configuration___Datadog10.png" alt="SAML_Configuration___Datadog10" responsive="true" popup="true">}}

18. Make sure to press "Upload File" after choosing the XML file

19. And that's it! It should now say SAML is ready and that Valid IdP metadata installed. Begin to log in to Datadog via Azure AD by pressing "Enable".  
  {{< img src="account_management/faq/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" responsive="true" popup="true">}}
  {{< img src="account_management/faq/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" responsive="true" popup="true">}}

**Optional**

If you are using a SSO via a Datadog button or link, you need to add a Sign-on URL. To do this, navigate back to the configure SSO Configuration section of the Azure Application, go to step 2, check off "Show advanced settings (optional)" and paste the Single Sign-on URL that is displayed in the configure SAML page in Datadog. (You'll have to click through the Azure wizard again to save the changes)
{{< img src="account_management/faq/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" responsive="true" popup="true">}}
{{< img src="account_management/faq/OptionalStepRedo.png" alt="OptionalStepRedo" responsive="true" popup="true">}}

{{< partial name="whats-next/whats-next.html" >}}