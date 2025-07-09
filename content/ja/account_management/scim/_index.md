---
algolia:
  tags:
  - scim
  - アイデンティティプロバイダー
  - IdP
further_reading:
- link: /account_management/scim/azure/
  tag: ドキュメント
  text: Azure Active Directory を使用した SCIM の構成
- link: account_management/scim/okta
  tag: ドキュメント
  text: Okta を使用した SCIM の構成
title: SCIM によるユーザープロビジョニング
---

<div class="alert alert-info">
SCIM は Infrastructure Pro プランおよび Infrastructure Enterprise プランで利用可能です。
</div> 


## 概要

SCIM (System for Cross-domain Identity Management) は、ユーザープロビジョニングの自動化を可能にするオープンスタンダードです。SCIM を使用すると、組織のアイデンティティプロバイダー (IdP) と同期して、Datadog 組織のユーザーを自動的にプロビジョニングおよびデプロビジョニングすることができます。

### サポートされる機能

- Datadog でユーザーを作成する (初回ログインにはメール認証が必要です。[メール認証][1]を参照)
- アクセスが不要になったユーザーを Datadog から削除する
- IdP (アイデンティティプロバイダー) と Datadog 間でユーザー属性を同期する 
- Datadog へのシングルサインオン (推奨)
- Managed Teams: IdP のグループから Datadog チームを作成し、Datadog チームのメンバーシップを IdP のグループメンバーシップと同期させます。 

Datadog では、Microsoft Entra ID と Okta アイデンティティプロバイダーを使用した SCIM がサポートされています。SCIM を構成するには、お使いの IdP のドキュメントを参照してください。
- [Microsoft Entra ID][2]
- [Okta][3]

### 前提条件

Datadog の SCIM は高度な機能であり、Infrastructure Pro プランと Infrastructure Enterprise プランに含まれています。

このドキュメントは、組織がアイデンティティプロバイダーを使用してユーザーアイデンティティを管理していることを前提としています。

Datadog では、SCIM の構成時にサービスアカウントのアプリケーションキーを使用して、アクセスの中断を回避することを強くお勧めします。詳細については、[SCIM でサービスアカウントを使用する][4]を参照してください。

SAML と SCIM を併用する場合、Datadog は、アクセスの不一致を避けるために、SAML のジャストインタイム (JIT) プロビジョニングを無効にすることを強く推奨します。SCIM だけでユーザープロビジョニングを管理します。

## SCIM でサービスアカウントを使用する

SCIM を有効にするには、[アプリケーションキー][5]を使用してアイデンティティプロバイダーと Datadog アカウント間の接続を保護する必要があります。各アプリケーションキーは、特定のユーザーまたはサービスアカウントが制御します。

SCIM を有効化するためにユーザーに紐付けられているアプリケーションキーを使用し、そのユーザーが組織を離れた場合、そのユーザーの Datadog アカウントはデプロビジョニングされます。ユーザー固有のアプリケーションキーは失効し、SCIM インテグレーションは永久に切断され、組織内のユーザーは Datadog にアクセスできなくなります。

データへのアクセスを失わないために、Datadog は SCIM 専用の[サービスアカウント][6]を作成することを強く推奨します。そのサービスアカウント内で、SCIM インテグレーションで使用するアプリケーションキーを作成します。

## メール認証

SCIM で新規ユーザーを作成すると、そのユーザーにメールが送信されます。初めてアクセスする場合は、メールで共有された招待リンクからログインする必要があります。リンクは 2 日間有効です。有効期限が切れた場合は、[ユーザー設定ページ][7]に移動し、ユーザーを選択して招待リンクを再送信してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/scim/#email-verification
[2]: /ja/account_management/scim/azure
[3]: /ja/account_management/scim/okta
[4]: /ja/account_management/scim/#using-a-service-account-with-scim
[5]: /ja/account_management/api-app-keys
[6]: /ja/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /ja/help/