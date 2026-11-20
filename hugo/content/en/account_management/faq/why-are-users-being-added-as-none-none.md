---
title: Why are users being added as "none none"?
---

Sometimes when a user first signs into [Datadog with SAML / SSO][1], their name is displayed on the team page as "none none" in place of their username. This can be especially noticeable in (but is not limited to) cases where users are created through JIT provisioning. Seeing "none none" indicates a problem with the setup of their account's SAML assertion—specifically the "sn" and "givenName" attributes included in it. "sn" stands for "surname"—the user's last name; "givenName" would be the user's first name.

These attributes, which are configured for the user's respective assertion within the IdP, are responsible for setting the user's name in Datadog. If these attributes are incorrectly set in the assertion, or not set at all, "none none" can end up being the displayed username in Datadog.

## Solution

Confirm that you have correctly configured these assertion attributes within your IdP. Directions are detailed in the [SAML documentation][1] (see the **setting attributes** section).

If you've confirmed these are set but continue to experience trouble, [contact Datadog support][2].

[1]: /account_management/saml/
[2]: /help/
