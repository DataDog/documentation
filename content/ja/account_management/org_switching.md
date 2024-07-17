---
further_reading:
- link: account_management/multi_organization/
  tag: Documentation
  text: Managing Multiple-Organization Accounts
title: オーガニゼーションの切り替え
---

複数の Datadog 組織に所属している場合、ナビゲーションバーの左下にある組織スイッチャーを使用すると、組織を切り替えることができます。**Personal Settings** の [**Organizations** ページ][1]から、すべての組織を表示し、切り替えることもできます。

{{< img src="account_management/org_switching_062024.png" alt="組織の切り替えを行う 2 つの方法" style="width:90%;" >}}

For security purposes, you must have a valid session for each org you switch to. In cases where you don't have an active session, you are asked to authenticate with a username and password or SAML.

1. **Mixed auth approaches**: In cases where you have both SAML and username and password authentication, you must log in with the type required by the organization (username and password or SAML) as opposed to logging into one and getting access to all.

2. **SAML 限定**: 組織が [SAML 限定][2]として設定されている場合、ユーザーは SAML で認証する必要があります。組織を切り替えるたびに再認証を行う必要があります。IdP はセッションを永続化するため、通常はリダイレクトされます。

## Resetting passwords for multi-org users

A password is shared across organizations for each multi-org user. If you reset your password, the reset affects all the organizations you belong to.

**Note**: You cannot use the same password twice.

## Troubleshooting

If you encounter a problem and cannot log in, try the following:

1. Re-enter or reset your password, even if you haven't needed to in the past.

2. Check with another team member to see if they can log in with their username and password. If yes, see step 1. If not, see step 3.

3. Confirm with an admin member of your team if this account requires a username and password, SAML, or Google OAuth to ensure you're using the correct approach.

上記のトラブルシューティングで問題が解決しない場合は、[Datadog のサポートチーム][3]に連絡して、本来の動作とこれまでに試した内容をお知らせください。

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/personal-settings/organizations
[2]: /ja/account_management/saml/#saml-strict
[3]: /ja/help/