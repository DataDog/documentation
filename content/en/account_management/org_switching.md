---
title: Switching Between Organizations
kind: documentation
further_reading:
- link: "account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
---

If you belong to multiple Datadog organizations, the org switcher at the bottom left of the nav bar allows you to toggle between organizations. You can also view all organizations and switch between them from the [**Organizations** page][1] in **Personal Settings**.

{{< img src="account_management/org_switching_062024.png" alt="Two ways of switching organizations" style="width:90%;" >}}

For security purposes, you must have a valid session for each org you switch to. In cases where you don't have an active session, you are asked to authenticate with a username and password or SAML.

1. **Mixed auth approaches**: In cases where you have both SAML and username and password authentication, you must log in with the type required by the organization (username and password or SAML) as opposed to logging into one and getting access to all.

2. **SAML Strict**: If your org is set for [SAML Strict][2], you must authenticate with SAML. You are required to re-authenticate each time you switch organizations. Since IdPs persist sessions, this is often a redirect.

## Resetting passwords for multi-org users

A password is shared across organizations for each multi-org user. If you reset your password, the reset affects all the organizations you belong to.

**Note**: You cannot use the same password twice.

## Troubleshooting

If you encounter a problem and cannot log in, try the following:

1. Re-enter or reset your password, even if you haven't needed to in the past.

2. Check with another team member to see if they can log in with their username and password. If yes, see step 1. If not, see step 3.

3. Confirm with an admin member of your team if this account requires a username and password, SAML, or Google OAuth to ensure you're using the correct approach.

If the above troubleshooting steps fail, contact the [Datadog support team][3] and let them know the expected behavior and what you've tried so far.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/personal-settings/organizations
[2]: /account_management/saml/#saml-strict
[3]: /help/
