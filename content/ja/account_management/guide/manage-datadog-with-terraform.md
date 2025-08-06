---
further_reading:
- link: /account_management/plan_and_usage/
  tag: ドキュメント
  text: プランと使用状況の設定
- link: https://www.datadoghq.com/blog/datadog-teams/
  tag: ブログ
  text: Datadog Teams を使用して組織全体のコラボレーションを効率化する
title: Terraform で Datadog を管理する
---

## 概要

Terraform を使用して Datadog API と対話し、Datadog 組織、子組織、ユーザー、認証情報、権限などを管理できます。このガイドでは Terraform で Datadog を管理するためのユースケース例を、Terraform レジストリの一般的に使用される Datadog リソースおよびデータ ソースへのリンクとともに紹介します。

既存リソースを[インポート][29]して Terraform 構成に取り込むことで、将来 Terraform 経由で管理できるようになります。また、既存リソースを Terraform の[データ ソース][30]として参照することもできます。

## セットアップ

まだ設定していない場合は、[Datadog Terraform プロバイダー][8]を構成して Datadog API と連携できるようにしてください。

## ユーザー、ロール、チーム、およびサービス アカウント

以下のリソースおよびデータ ソースを使用すると、最小権限のセキュリティ原則に従い、Datadog 組織内で操作を行うユーザー、チーム、サービス アカウントに対して必要な権限のみを付与できます。

### ユーザー

アカウントの[ユーザー][10]を作成し、利用可能なデフォルトまたは[カスタム ロール][9]のいずれかを割り当てます。また、[AuthN マッピング][20]リソースを使用して、SAML 属性に基づいてユーザーに自動的にロールを割り当てることもできます。既存のユーザー、ロール、AuthN マッピングを Terraform 構成にインポートすることも可能です。

[ユーザー データ ソース][21]を使用して、Terraform 構成内の既存ユーザーに関する情報を取得し、Datadog チーム メンバーシップ リソースなどの他のリソースで利用できます。

### ロール

Datadog はユーザー権限向けに 3 つのマネージド ロールを提供しますが、[ロール リソース][18]を使用してカスタム ロールを作成・管理することも可能です。

[ロール データ ソース][22]を使用して、既存ロールに関する情報を取得し、Datadog ユーザー リソースなどの他のリソースで利用できます。

### チーム

[Datadog チーム][11]リソースを使用して、特定のリソースをユーザー グループに関連付け、そのリソースを優先して Datadog のエクスペリエンスをフィルタリングします。[チーム メンバーシップ][12] リソースでチーム メンバーシップを管理し、[チーム権限設定][17]リソースでチームを管理できるユーザーを制御します。

[チーム データ ソース][23]および[チーム メンバーシップ データ ソース][24]を使用して、既存のチームおよびチーム メンバーシップに関する情報をそれぞれ取得し、他のリソースで利用できます。

詳細は[チーム ページ][13]を参照してください。

### サービス アカウント

[サービス アカウント][14] リソースは、チーム間で共有される[サービス アカウント アプリケーション キー][15]やその他リソースの所有者として使用できる、非対話型アカウントを提供します。

既存のサービス アカウントに関する情報を取得して他のリソースで利用する場合は、[サービス アカウント データ ソース][25]を使用します。

詳細は[サービス アカウント][16]を参照してください。

## 資格情報

### API キーとアプリケーション キー

[API キー][6]は Datadog アカウントへのデータ送信を、[アプリケーション キー][7]は Datadog アカウント内でのリソース作成を許可します。既存の資格情報をインポートすることも可能です。

既に Terraform で管理している資格情報の情報を取得するには、[API キー データ ソース][26]と[アプリケーション キー データ ソース][27]を使用します。

## 組織

組織レベルのリソースを使用すると、単一アカウント環境とマルチアカウント環境の両方で組織設定を管理できます。

### 組織設定

[組織設定][4]リソースを使用して、アカウントのアクセス権やウィジェット共有機能を構成します。たとえば、IdP エンドポイントや login URL、SAML ストリクト モードの有効化などを管理できます。詳細は [SAML によるシングル サインオン][5]を参照してください。

既存の組織設定を Terraform 構成にインポートすることも可能です。

### 子組織

<div class="alert alert-info">Multi-organization Account 機能はデフォルトでは無効です。有効化するには <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog サポート</a>へお問い合わせください。</div>

隔離された環境を維持する必要がある場合は、親組織の下に[子組織][1]を作成できます。親アカウントから関連サブアカウントの使用状況を追跡でき、複数組織にアクセス権を持つユーザーはワンクリックで組織を切り替えられます。

詳細は[複数組織アカウントの管理][3]を参照してください。

**注**: 子組織は親組織の SAML 設定を継承しません。

## 制限ポリシー

制限ポリシーは特定の**リソース**に関連付けられ、ロール、チーム、ユーザーに付与されるアクセス レベルを定義します。[制限ポリシー][19] リソースを使用して制限ポリシーを作成・管理するか、既存の制限ポリシーを Terraform 構成にインポートしてください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[2]: /ja/help/
[3]: /ja/account_management/multi_organization/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/organization_settings
[5]: /ja/account_management/saml/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[8]: /ja/integrations/terraform/
[9]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_membership
[13]: /ja/account_management/teams/
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account_application_key
[16]: /ja/account_management/org_settings/service_accounts
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_permission_setting
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/authn_mapping
[21]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/user
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/role
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team_memberships
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/service_account
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/api_key
[27]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/application_key
[28]: https://www.terraform.io/
[29]: https://developer.hashicorp.com/terraform/cli/import
[30]: https://developer.hashicorp.com/terraform/language/data-sources