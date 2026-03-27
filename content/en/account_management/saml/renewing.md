---
title: Renewing SAML Certificates
description: Learn how Datadog handles SAML certificate rotation and how to update your Identity Provider with the new certificate.
further_reading:
- link: "/account_management/saml/configuration/"
  tag: "Documentation"
  text: "Configuring Single Sign-On With SAML"
---

## Overview

When Datadog rotates its SAML certificate, you need to update the certificate stored in your Identity Provider (IdP). Until you do this, your IdP may stop sending SAML assertions after it detects the old certificate has expired. This can prevent users from logging in.

Datadog automatically renews SAML certificates and notifies you before a certificate expires.

## Renewing certificates

1. Sign in to Datadog as an organization administrator.
1. Download the [SAML metadata XML file][1].
1. In the metadata file, find the X.509 certificate value used for your SAML configuration (encryption, signing, or both, depending on how your IdP is set up).
1. In your IdP's SAML application for Datadog, replace the existing certificate with the new certificate from the metadata file.
1. Save the change.
1. Verify the SSO login:
    1. Initiate a SAML login flow from your IdP or from the Datadog login page.
    1. Confirm that users can sign in with SSO.

**Note**: If you manage multiple environments (for example, commercial and federal regions), repeat these steps for each Datadog SAML application in your IdP that uses a separate certificate.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/saml/metadata.xml
