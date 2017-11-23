---
title: How do I setup Microsoft Active Directory Federation Services as a SAML IdP?
kind: faq
customnav: accountmanagementnav
further_reading:
- link: "/account_management/saml"
  tag: "Documentation"
  text: Configure SAML for your Datadog account
- link: "/account_management/multi_account"
  tag: "Documentation"
  text: Configuring Teams & Organizations with Multiple Accounts
---

The Datadog SAML integration for SSO provides an easy pathway for linking an Org to an external user management system so that credentials can be kept and managed in a central system.

This article is meant to be used as an add-on to the main guide on this integration which is available by clicking the link below and focuses on some extra steps that may be required when connecting Datadog to ADFS.

[Single Sign On With SAML (main doc)](/account_management/saml)

**The following steps should be followed when configure this with ADFS.**

Open the ADFS management console. This can be done from Server Manager as shown below:

{{< img src="account_management/faq/1ef6IBS.png" alt="1ef6IBS" responsive="true" popup="true">}}

Click the button on the right for Add a Relying Party Trust.
{{< img src="account_management/faq/O85HjIi.png" alt="O85HjIi" responsive="true" popup="true">}}

This will open a wizard for the trust with a welcome screen describing the feature. Review the description and click Start to begin.
{{< img src="account_management/faq/KWe4h6W.png" alt="KWe4h6W" responsive="true" popup="true">}}

Import the Datadog SAML Metadata file available [here](https://app.datadoghq.com/account/saml/metadata.xml).

The file requires a login to access it, making it easiest to download then import by file instead of directly via the URL as shown in the import options below. (As a warning: when downloading the file, if you open and/or rename the file, that may end up changing the filetype which can cause xml parsing issues at the next step.)
{{< img src="account_management/faq/UAjeUVL.png" alt="UAjeUVL" responsive="true" popup="true">}}

Click Browse to select the downloaded metadata file then Next.
{{< img src="account_management/faq/LWZCPG6.png" alt="LWZCPG6" responsive="true" popup="true">}}

Provide a display name for the Trust, "Datadog" or something similar is recommended and click Next.
{{< img src="account_management/faq/IQDM19N.png" alt="IQDM19N" responsive="true" popup="true">}}

Multi-factor Authentication is not supported at this time. Leave the selection default and click Next.
{{< img src="account_management/faq/AhM25jW.png" alt="AhM25jW" responsive="true" popup="true">}}

Permit access to all users and click Next.

Note: Access can be controlled through Datadog by inviting only specific users to your Org from within the app here - https://app.datadoghq.com/account/team
{{< img src="account_management/faq/Rd13Ofm.png" alt="Rd13Ofm" responsive="true" popup="true">}}

Review the trust to ensure the appropriate endpoint is configured and click Next.
{{< img src="account_management/faq/xex71aV.png" alt="xex71aV" responsive="true" popup="true">}}

Finish by clicking Close. This will save the trust definition and open the claims window where you can add a couple of recommended Claim Rules.
{{< img src="account_management/faq/5NkUanW.png" alt="5NkUanW" responsive="true" popup="true">}}

We recommend two Claim Rules for brokering the SAML assertions. They can be added by first clicking the Add Rule button.
{{< img src="account_management/faq/QkNaDCD.png" alt="QkNaDCD" responsive="true" popup="true">}}

This first rule is an LDAP Attributes rule that ensures the required information is passed between the two systems. Configure the rule as shown below and click OK to save. (Make sure to use three separate fields for "E-Mail-Addresses, Given-Name, and Surname" or else some relevant info may be left as "None" later on.)
{{< img src="account_management/faq/cogaUQT.png" alt="cogaUQT" responsive="true" popup="true">}}

The second rule is a Transform rule. Datadog will specify urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress for the Format of the NameIDPolicy in Assertion Requests where ADFS natively expects these in Name ID format so we need to transform the format from email to Name ID.

Select Transform an Incoming Claim from the dropdown and click Next to continue.
{{< img src="account_management/faq/JS5FNbR.png" alt="JS5FNbR" responsive="true" popup="true">}}

Input the configuration as shown below and click Finish.
{{< img src="account_management/faq/OT9i0K5.png" alt="OT9i0K5" responsive="true" popup="true">}}

Save the new claim rules by clicking OK.
{{< img src="account_management/faq/CeCyDmc.png" alt="CeCyDmc" responsive="true" popup="true">}}

Finally, download and import the ADFS identity provider metadata from the ADFS server into the SAML configuration in your Datadog Org here - https://app.datadoghq.com/saml/saml_setup

This file can be downloaded from the following URL (replace hostname with the public dns hostname of your server) - `https://hostname/FederationMetadata/2007-06/FederationMetadata.xml`

Import into your Datadog Org from the SAML config page as shown below:
{{< img src="account_management/faq/KJxaVYe.png" alt="KJxaVYe" responsive="true" popup="true">}}

That's it! Once SAML is configured, users can login by using the link provided in the SAML configuration page.

Keep in mind that users will still need to be invited and activated before they’re able to login. Be sure to invite new users by using the email address corresponding to their Active Directory user record otherwise they may be denied as shown below.
{{< img src="account_management/faq/6TsPUla.png" alt="6TsPUla" responsive="true" popup="true">}}

While in most setups this will be the user's user@domain login Microsoft does not enforce this. You can confirm the email address used within the user record as shown below.
{{< img src="account_management/faq/0R81SaK.png" alt="0R81SaK" responsive="true" popup="true">}}

For any questions or help with this integration please reach out to us using any one of our [many help options](/help)

{{< partial name="whats-next/whats-next.html" >}}