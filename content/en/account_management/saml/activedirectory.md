---
title: Microsoft Active Directory Federation Services SAML IdP
kind: documentation
aliases:
  - /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---
The Datadog SAML integration for SSO provides an easy pathway for linking an organization to an external user management system so that credentials can be kept and managed in a central system.

This article is meant to be used as an add-on to the main guide on this integration which is available by clicking the link below and focuses on some extra steps that may be required when connecting Datadog to ADFS.

[Single Sign On With SAML (main doc)][1]

**The following steps should be followed when configure this with ADFS.**

Open the ADFS management console. This can be done from Server Manager as shown below:

{{< img src="account_management/saml/1ef6IBS.png" alt="1ef6IBS" style="width:60%;">}}

Click the button on the right for Add a Relying Party Trust.

{{< img src="account_management/saml/O85HjIi.png" alt="O85HjIi" style="width:60%;">}}

This opens a wizard for the trust with a welcome screen describing the feature. Review the description and click Start to begin.

{{< img src="account_management/saml/KWe4h6W.png" alt="KWe4h6W" style="width:60%;">}}

Import the [Datadog SAML Metadata file][2].

The file requires a login to access it, making it easiest to download then import by file instead of directly through the URL as shown in the import options below. (As a warning: when downloading the file, if you open and/or rename the file, that may end up changing the file type which can cause xml parsing issues at the next step.)

{{< img src="account_management/saml/UAjeUVL.png" alt="UAjeUVL" style="width:60%;">}}

Click Browse to select the downloaded metadata file then Next.

{{< img src="account_management/saml/LWZCPG6.png" alt="LWZCPG6" style="width:60%;">}}

Provide a display name for the Trust, "Datadog" or something similar is recommended and click Next.

{{< img src="account_management/saml/IQDM19N.png" alt="IQDM19N" style="width:60%;">}}

Multi-factor Authentication is not supported at this time. Leave the selection default and click Next.

{{< img src="account_management/saml/AhM25jW.png" alt="AhM25jW" style="width:60%;">}}

Permit access to all users and click Next.

Note: Access can be controlled through Datadog by inviting only specific users to your Organization from [within the application Team page][3]

{{< img src="account_management/saml/Rd13Ofm.png" alt="Rd13Ofm" style="width:60%;">}}

Review the trust to ensure the appropriate endpoint is configured and click Next.

{{< img src="account_management/saml/xex71aV.png" alt="xex71aV" style="width:60%;">}}

Finish by clicking Close. This saves the trust definition and open the claims window where you may add a couple of recommended Claim Rules.

{{< img src="account_management/saml/5NkUanW.png" alt="5NkUanW" style="width:60%;">}}

Datadog recommends two Claim Rules for brokering the SAML assertions. They can be added by first clicking the Add Rule button.

{{< img src="account_management/saml/QkNaDCD.png" alt="QkNaDCD" style="width:60%;">}}

This first rule is an LDAP Attributes rule that ensures the required information is passed between the two systems. Configure the rule as shown below and click OK to save. (Make sure to use three separate fields for "E-Mail-Addresses, Given-Name, and Surname" or else some relevant info may be left as "None" later on.)

{{< img src="account_management/saml/cogaUQT.png" alt="cogaUQT" style="width:60%;">}}

The second rule is a Transform rule. Datadog specifies `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the format of the NameIDPolicy in assertion requests where ADFS natively expects these in Name ID format so you need to transform the format from email to Name ID.

Select Transform an Incoming Claim from the drop-down and click **Next** to continue.

{{< img src="account_management/saml/JS5FNbR.png" alt="JS5FNbR" style="width:60%;">}}

Input the configuration as shown below and click **Finish**.

{{< img src="account_management/saml/OT9i0K5.png" alt="OT9i0K5" style="width:60%;">}}

Save the new claim rules by clicking OK.

{{< img src="account_management/saml/CeCyDmc.png" alt="CeCyDmc" style="width:60%;">}}

Download and import the ADFS identity provider metadata from the ADFS server into the SAML configuration in your [Datadog Organization Saml page][4]

This file can be downloaded from the following URL (replace hostname with the public DNS hostname of your server) - `https://hostname/FederationMetadata/2007-06/FederationMetadata.xml`

Import into your Datadog Organization from the SAML configuration page as shown below:

{{< img src="account_management/saml/KJxaVYe.png" alt="KJxaVYe" style="width:60%;">}}

That's it! Once SAML is configured, users can login by using the link provided in the SAML configuration page.

Keep in mind that users still need to be invited and activated before they're able to login. Be sure to invite new users by using the email address corresponding to their Active Directory user record otherwise they may be denied as shown below.

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

In most setups a user's user@domain is their Microsoft login, but this is not enforced. You can confirm the email address used within the user record as shown below.

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

For any questions or help with this, reach out to [the Datadog support team][5]!

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/
[2]: https://app.datadoghq.com/account/saml/metadata.xml
[3]: https://app.datadoghq.com/account/team
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: /help/
