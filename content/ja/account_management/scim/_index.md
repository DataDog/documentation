---
title: User Provisioning with SCIM
further_reading:
    - link: /account_management/scim/azure/
      tag: Documentation
      text: Configure SCIM with Azure Active Directory
    - link: account_management/scim/okta
      tag: Documentation
      text: Configure SCIM with Okta
algolia:
  tags: [scim, identity provider, IdP]
---

<div class="alert alert-info">
SCIM is only available for the Enterprise plan.
</div>

## 概要

SCIM (System for Cross-domain Identity Management) は、ユーザープロビジョニングの自動化を可能にするオープンスタンダードです。SCIM を使用すると、組織のアイデンティティプロバイダー (IdP) と同期して、Datadog 組織のユーザーを自動的にプロビジョニングおよびデプロビジョニングすることができます。

### サポートされる機能

- Create users in Datadog (Email verification is required for first login, see [email verification][1])
- アクセスが不要になったユーザーを Datadog から削除する
- Keep user attributes synchronized between the identity provider and Datadog
- Datadog へのシングルサインオン (推奨)

Datadog では、Azure Active Directory (Azure AD) と Okta アイデンティティプロバイダーを使用した SCIM がサポートされています。SCIM を構成するには、お使いの IdP のドキュメントを参照してください。
- [Azure AD][2]
- [Okta][3]

### 前提条件

Datadog の SCIM は、Enterprise プランに含まれる高度な機能です。

このドキュメントは、組織がアイデンティティプロバイダーを使用してユーザーアイデンティティを管理していることを前提としています。

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][4].

SAML と SCIM を併用する場合、Datadog は、アクセスの不一致を避けるために、SAML のジャストインタイム (JIT) プロビジョニングを無効にすることを強く推奨します。SCIM だけでユーザープロビジョニングを管理します。

## SCIM でサービスアカウントを使用する

To enable SCIM, you must use an [application key][5] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

SCIM を有効化するためにユーザーに紐付けられているアプリケーションキーを使用し、そのユーザーが組織を離れた場合、そのユーザーの Datadog アカウントはデプロビジョニングされます。ユーザー固有のアプリケーションキーは失効し、SCIM インテグレーションは永久に切断され、組織内のユーザーは Datadog にアクセスできなくなります。

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][6] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

## Email verification

SCIM で新規ユーザーを作成すると、そのユーザーにメールが送信されます。初めてアクセスする場合は、メールで共有された招待リンクからログインする必要があります。リンクは 2 日間有効です。有効期限が切れた場合は、[ユーザー設定ページ][7]に移動し、ユーザーを選択して招待リンクを再送信してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/scim/#email-verification
[2]: /account_management/scim/azure
[3]: /account_management/scim/okta
[4]: /account_management/scim/#using-a-service-account-with-scim
[5]: /account_management/api-app-keys
[6]: /account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
