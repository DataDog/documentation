---
description: Datadog アカウントの SAML に関する問題のトラブルシューティング
further_reading:
- link: https://www.samltool.com/online_tools.php
  tag: 開発ツール
  text: 開発者用 SAML ツールでアサーションを識別する
title: SAML トラブルシューティング
---

## 概要

このページでは、SAML (Security Assertion Markup Language) 認証時によく発生するエラーのトラブルシューティングを説明します。

## よくあるエラー

以下のリストにあるエラーメッセージに遭遇した場合、Datadog のマッピング構成または IDP (ID プロバイダー) の構成に問題がある可能性があります。

- `SAML is not enabled for this org`
- `Arf. Unknown User`
- `There are No Authn Mappings for this User`
- `Assertion could not be validated`
- `SAML NO HANDLE ERROR`
- `No active account for a user`

解決するには、具体的なエラーについて、以下のセクションを参照してください。

### SAML is not enabled for this org

アカウントで SAML がオフになっています。[ログイン方法][1]に移動します。SAML セクションで、**Enabled by Default** が **On** に設定されていることを確認します。

**注:** SAML の構成には、Datadog の Admin Role または Org Management (`org_management`) 権限が必須です。

### There are no authn mappings for this user

Datadog のマッピングコンフィギュレーションと IdP のコンフィギュレーションにミスマッチがあります。[ロールエラー](#roles-errors)を参照してください。

### Assertion could not be validated

Datadog で IdP 起動ログインを有効にした後、IdP コンフィギュレーションの [Assertion Consumer Service (ACS) URL][2] が正しくないことがあります。または、アサーションが未署名である可能性もあります。詳細については、[アサーションと属性][3]を参照してください。

### SAML no handle error

アサーションに必要な `eduPersonPrincipalName` 属性が欠けている可能性があります。コンフィギュレーションにこの属性が設定されていることを確認してください。詳細については、[アサーションと属性][3]を参照してください。

### No active account for a user

このエラーは、次のような場合に発生する可能性があります。
  - ジャストインタイム (JIT) プロビジョニングを有効にしても、ユーザーがログインしようとするとこのエラーが表示される場合は、JIT を有効にする前に、このユーザーに招待メールを送信していないかどうか確認してください。JIT は、すでに招待されているユーザーには適用されません。この問題を解決するには、ユーザーに招待メールを受け入れてもらいます。または、招待状の有効期限が切れている場合は、管理者が新しい招待状を送信してください。
  - JIT プロビジョニングが有効な Datadog 組織でユーザーが有効でなくなり、SAML で再ログインしようとして `There is no active account for error` が発生した場合、[User settings][4] でユーザーを再有効化してください。

## IdP metadata file errors

IdP メタデータファイルの更新に問題がある場合、アップロードしようとするメタデータファイルが有効であることを確認してください。

メタデータファイルの検証を行うには

1. OneLogin の [SAML 開発者ツール][5]などの SAML 検証ツールを選択します。
2. XML フィールドにメタデータを貼り付け、XSD (スキーマファイル) フィールドで **Metadata** を選択します。
3. **Validate XML With the XSD Schema** をクリックします。

## Roles errors

マッピングを有効にすると、Datadog アカウントに SAML でログインするユーザーは、現在のロールを永久に剥奪されます。Datadog は、IdP から渡された SAML アサーションの詳細に基づいて、新しいロールを割り当てます。

SAML でログインし、Datadog のロールに対応する値を持っていないユーザーは、すべてのロールが永久に剥奪されます。そのユーザーは、今後ログインすることができなくなります。

{{< img src="account_management/saml/unknown_user_error.png" alt="このユーザーには AuthNMappings がありません" style="width:80%;">}}

グループマッピングを設定してもロールが表示されない場合、Datadog アプリケーションのグループマッピングが IdP で異なって表示される可能性があります。確認するには

1. アカウントの IdP の SAML アサーションを取得します。[拡張機能][6]などのブラウザツールを使用して、SAML アサーションを取得します。たとえば、以下のようになります。

  ```xml
  <saml2:Attribute Name="member_of"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >name_of_your_group_goes_here</saml2:AttributeValue>
  </saml2:Attribute>
  ```

2. 自分のプロファイルに移動し、Datadog の左下にある **Organization Settings** を選択します。
3. [**SAML Group Mappings**][7] を選択します。
4. SAML アサーションで IdP が提供する属性を、[**SAML Group Mappings**][7] タブで設定された属性と比較します。

  {{< img src="account_management/saml/saml_mappings_example.png" alt="Datadog の SAML マッピング" style="width:80%;">}}

5. Datadog SAML Group Mappings の設定、または IdP の設定のいずれかに矛盾がある場合は解決してください。たとえば、`memberof` が Datadog の set 属性であり、SAML アサーションでは `member_Of` である場合、それに応じて解決します。

属性キーと値の間に一致がない、またはミスマッチがある場合、不一致が発生することがあります。たとえば、**SAML Group Mappings** で `memberOf` と `name_of_your_group_goes_here` というキーと値のペアがあった場合、このペアは IdP から送信されるアサーションに含まれていないため、問題に直面することになります。

ロールベースのエラーが原因でログインに問題がある場合、管理者に連絡して上記のトラブルシューティング手順を完了させてください。

**注**:

- 各 IdP は異なる種類の属性を提供し、属性の設定方法も異なります。例えば、Azure では[オブジェクト ID][8] を属性に使用していますが、Okta を使用している場合は [Okta 設定][9]で属性を設定する必要があります。詳しくは、IdP の属性に関するドキュメントを参照してください。

- **SAML Group Mappings** を無効にすると、IdP でグループメンバーシップが変更された場合でも、ユーザーは SAML でログインし、割り当てられた同じロールを持つことができるようになります。

## Identity provider (IdP) errors

Google、Active Directory、Azure、LastPass、Okta など、お使いの IdP からエラーが発生した場合は、こちらをご覧ください。

- Google の Admin Console で問題が発生した場合は、[SAML アプリのエラーメッセージ][10]を参照してください。
- Active Directory で問題が発生した場合は、[Azure Active Directory における SAML ベースのアプリケーションへのシングルサインオンをデバッグする][11]を参照してください。
- AuthO で問題が発生した場合は、[SAML コンフィギュレーションのトラブルシューティング][12]を参照してください。
- Azure で問題が発生した場合は、[ユーザーがサインインした後に、アプリのページにエラーメッセージが表示される][13]を参照してください。
- Google で問題が発生した場合は、[Datadog クラウドアプリケーション][14]を参照してください。
- LastPass で問題が発生した場合は、[Datadog アプリインテグレーション][15]を参照してください。
- Oktaで問題が発生した場合は、[アプリケーションにサインインしようとすると 404 エラーが発生する][16]を参照してください。
- SafeNet で問題が発生した場合は、[SafeNet Trusted Access for Datadog][17] を参照してください。

### ID プロバイダー証明書

アカウントにログインできない場合、IdP 証明書が期限切れでローテーションされ、一般的な SAML エラーが発生している可能性があります。

証明書の問題があるかどうかを絞り込むために、いくつかの質問をします。

- ログインできないアカウントはあなただけですか？複数のアカウントに問題がある場合、IdP ベースの証明書が期限切れまたはローテーションしている可能性があります。
- 最近、SAML コンフィギュレーションに何か変更がありましたか？
- ユーザーが複数の IdP を使用している場合、問題は複数の IdP にまたがっていますか？それとも 1 つの IdP にしかありませんか？
- 最近、[**SAML グループマッピング**](#roles-errors)を有効にしましたか？

解決するには、IdP の証明書が IdP の設定内で最新であることと、Datadog で IdP から最新のメタデータファイルをアップロードしていることを確認してください。

## サポート

それでも Datadog にログインできない場合は、[Datadog サポート][18]に連絡してください。

メッセージの中で、ログインプロセスの画面記録を提供し、以下の質問に対する回答も含めてください。

- ログインできないのはあなたのアカウントだけですか？それともすべてのユーザーがログインできませんか？
- どの組織に、どのようにログインしようとしているのですか？

Datadog のサポートに連絡する前に、管理者に連絡してください。また、ログインの問題を解決するために、ID プロバイダーに連絡する必要がある場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods/saml
[3]: https://docs.datadoghq.com/ja/account_management/saml/#assertions-and-attributes
[4]: https://app.datadoghq.com/organization-settings/users
[5]: https://www.samltool.com/validate_xml.php
[6]: https://www.samltool.com/saml_tools.php
[7]: https://app.datadoghq.com/organization-settings/mappings
[8]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[9]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[10]: https://support.google.com/a/answer/6301076
[11]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[12]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[13]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[14]: https://support.google.com/a/answer/7553768
[15]: https://support.logmeininc.com/lastpass/help/datadog-app-integration
[16]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[17]: https://resources.safenetid.com/help/Datadog/Index.htm
[18]: https://www.datadoghq.com/support/