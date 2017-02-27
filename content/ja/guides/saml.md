---
last_modified: 2017/02/27
translation_status: complete
language: ja
title: SAML によるシングル サイン オン
title_org: Single Sign On With SAML
kind: guide
listorder: 14
---

<!-- This guide assumes that you already have a SAML Identity Provider up and running. -->

このガイドでは、すでにSAML ID プロバイダが稼動していることを前提としています。

<!-- ## SAML

Configuring [SAML (Security Assertion Markup Language)](http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) for your Datadog account will let you and all your teammates log in to Datadog using the credentials stored in your organization’s Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider. -->

## SAML

Datadog アカウント用に [SAML (Security Assertion Markup Language)](http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)を設定すると、組織の Active Directory や LDAP 、または SAML ID プロバイダを使用して構成されたその他のアイデンティティ ストアに保存されている認証情報を使用して、すべてのチームメイトが Datadog にログインできるようになります。


<!-- ## Configure SAML
{: #configuresaml}
If you are a Datadog Admin, there is a “Configure SAML” option in the drop down menu that is accessed by clicking on your username in the upper right corner of the Datadog web page.

![](/static/images/saml_configure.png)
-->

## SAML を設定する
{: #configuresaml}

Datadog アカウントの管理者の場合、Webページの右上隅にあるユーザ名をクリックし、ドロップダウン メニューに “Configure SAML” のオプションがあります。

![](/static/images/saml_configure.png)


<!-- That brings you to the "SAML Single Sign On Configuration" page where you can:

1.  Upload the IdP Metadata from your SAML Identity provider by clicking the "Choose File" button.

    ![](/static/images/saml_choose_file.png)

    After you've chosen the file, click "Upload File".

2. Datadog’s [Service Provider metadata can be found here](https://app.datadoghq.com/account/saml/metadata.xml). You can use this SP Metadata to configure your IdP to recognize Datadog as a Service Provider.
3. After you upload the IdP Metadata and configure your IdP, you will need up enable SAML in Datadog by clicking the Enable button.
![][5]
Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in by using the Single Sign On URL that is shown in the Status box at the top of the SAML Configuration page.
![][6]
The Single Sign On URL will also be displayed on the Team page. Loading this URL will initiate a SAML authentication against your IdP. Please note that the URL will not be displayed until SAML is enabled for your account. -->

ここをクリックすることにより、 "SAML Single Sign On Configuration" ページが表示されます。

1. "Choose File" ボタンをクリックして、 SAML ID プロバイダから取得した IdP メタデータをアップロードします。

    ![](/static/images/saml_choose_file.png)

    ファイルを選択したら、 "Upload File" をクリックします。

2. Datadog の[サービスプロバイダ メタデータ](https://app.datadoghq.com/account/saml/metadata.xml) は、[このリンク](https://app.datadoghq.com/account/saml/metadata.xml)で確認することができます。このサービスプロバイダ メタデータを使用して、IdP が、 Datadog をサービスプロバイダとして認識するように設定することができます。
3. IdP メタデータをアップロードして IdP を設定したら、Enable ボタンをクリックして Datadog で SAML を有効にします。
![][5]
SAML が Datadog で設定され、 IdP が Datadog からの要求を受け入れるように設定されると、ユーザは SAML 設定ページの上部にあるステータス ボックスに表示されるシングル サイン オン URL を使用してログインができるようになります。
![][6]
シングル サイン オン URL は、チームページにも表示されます。この URL をブラウザーで読み込むことにより、IdP に対して SAML 認証が開始されます。 SAML がアカウントで有効になるまで、この URL は表示されませんのでご注意ください。


<!-- ## Datadog Service Provider Details
{: #ddspdetails}

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog will specify `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the Format of the **NameIDPolicy** in Assertion Requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions will be accepted.
* Datadog’s SP Metadata can be found at [https://app.datadoghq.com/account/saml/metadata.xml][7]. -->

## Datadog サービス プロバイダの詳細
{: #ddspdetails}

* Datadog は、 **SAML2** の **HTTP-POST** バインディングをサポートしています:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST` です。
* Datadog は、アサーション リクエスト内の **NameIDPolicy** 項目に `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。
* アサーションは、署名されている必要があります。
* アサーションは暗号化できますが、暗号化されていないアサーションでも受け入れられます。
* Datadog のサービスプロバイダ メタデータは、["https://app.datadoghq.com/account/saml/metadata.xml"][7]にあります。


<!-- ##  Setting Attributes
{: #settingattributes}

* Attributes may be included with the Assertion. Datadog looks for 3 Attributes in the AttributeStatement:
1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user’s Datadog username. The username is usually the user’s email address.
2. **sn**: This is optional, and should be set to the user’s surname.
3. **givenName**: This is optional, and should be set to the user’s first, or given name.
* Datadog expects that Attributes use the NameFormat
`urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. The name used for each attribute will depend on the NameFormat that your IdP uses.
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:
1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the Name of the Attribute
2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the Name of the Attribute
3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the Name of the Attribute
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:
1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the Name of the Attribute
2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the Name of the Attribute
3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the Name of the Attribute
* If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute will be used for the username. If **eduPersonPrincipalName** is not included in the AttributeStatement, the username will be taken from the NameID in the Subject. The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
* If **sn** and **givenName** are provided, they will be used to update the user’s name in their Datadog profile. -->

## アトリビュートの設定
{: #settingattributes}

* アサーションにアトリビュートが含まれる場合があります。 Datadog は AttributeStatement 内の3つの属性を見ています:

  1. **eduPersonPrincipalName**: 指定すると、eduPersonPrincipalName は、ユーザの Datadog ユーザー名に対応する必要があります。通常、ユーザ名はユーザの電子メール アドレスになります。
  2. **sn**: このアトリビュートはオプションです。 ユーザの姓を設定する必要があります。
  3. **givenName**: このアトリビュートはオプションです。 ユーザの名を設定する必要があります。

* Datadog では、アトリビュートが NameFormat を採用していることを予想しています (`urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`)。 各アトリビュートに使用される名前は、IdP が使用する NameFormat に依存しています。

* IdP が NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`　を使用するように設定されている場合:

  1. **eduPersonPrincipalName**: IdP は、このアトリビュートに `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` を設定する必要があります。
  2. **sn**: IdPは、このアトリビュートに `urn:oid:2.5.4.4`を設定する必要があります。
  3. **givenName**: IdP は、このアトリビュートに `urn:oid:2.5.4.42`を設定する必要があります。

* IdP が NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように設定されている場合:

  1. **eduPersonPrincipalName**: IdPは、このアトリビュートに `urn:mace:dir:attribute-def:eduPersonPrincipalName` を設定する必要があります。
  2. **sn**: IdPは、このアトリビュートに `urn:mace:dir:attribute-def:sn` を設定する必要があります。
  3. **givenName**: IdPは、このアトリビュートに `urn:mace:dir:attribute-def:givenName` を設定する必要があります。

* AttributeStatement に **eduPersonPrincipalName** が存在する場合、このアトリビュートの値がユーザー名に使用されます。もしも、 AttributeStatement に **eduPersonPrincipalName** がない場合、ユーザ名は Subject の NameID から取得されます。 NameID は、`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` フォーマットを採用している必要があります。

* **sn** と **givenName** が提供されている場合、それらは Datadog プロファイル設定内で、そのユーザの名前を更新するために使用されます。


<!-- ## Specific SAML IdP

For more information about configuring specific IdP's, refer to the following Knowledge Base articles:

* [Google](https://help.datadoghq.com/hc/en-us/articles/208139913-How-do-I-configure-Google-as-a-SAML-IdP-)
* [Microsoft Active Directory Federation Services](https://help.datadoghq.com/hc/en-us/articles/207425226-How-do-I-setup-Microsoft-Active-Directory-Federation-Services-as-a-SAML-IdP-)
* [NoPassword](https://help.datadoghq.com/hc/en-us/articles/211023623-How-do-I-configure-NoPassword-as-a-SAML-IdP-)
* [Okta](https://help.datadoghq.com/hc/en-us/articles/210132743-How-do-I-configure-Okta-as-a-SAML-IdP-) -->

## 代表的な SAML IdP

以下の代表的な IdP の設定方法については、下記のリストのリンク先にある「サポート技術情報」(Knowledge Base)を参照してください。

* [Google](https://help.datadoghq.com/hc/en-us/articles/208139913-How-do-I-configure-Google-as-a-SAML-IdP-)
* [Microsoft Active Directory Federation Services](https://help.datadoghq.com/hc/en-us/articles/207425226-How-do-I-setup-Microsoft-Active-Directory-Federation-Services-as-a -SAML-IdP-)
* [NoPassword](https://help.datadoghq.com/hc/en-us/articles/211023623-How-do-I-configure-NoPassword-as-a-SAML-IdP-)
* [Okta](https://help.datadoghq.com/hc/en-us/articles/210132743-How-do-I-configure-Okta-as-a-SAML-IdP-)


<!-- ## Additional Features
{: #additionalfeatures}
The following features can be enabled through the SAML Configuration dialog. -->

## その他の機能
{: #additionalfeatures}

SAML の設定ダイアログを使って以下の機能を有効にすることができます。


<!-- ### Just in Time Provisioning (JIT Provisioning)
Normally users must be invited to Datadog, even for organizations with SAML enabled. If a user that has not been invited to Datadog logs in via an Org's IdP, the SAML assertion will be validated, but they will be redirected to a SAML Error page.

Some organizations might not want to have to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact support.

It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog. -->

### ジャスト イン タイム プロビジョニング（JIT プロビジョニング）

SAML が有効に設定できている組織であっても、一般的にユーザは、先ずは Datadog のユーザとして招待さ、Datadogのユーザアカウントを作成する必要があります。 Datadog にユーザ アカウントができていない場合、組織の IdP を使用してログインしようとすると、 SAML アサーションが動作し、 SAML のエラーページにリダイレクトされます。

JIT プロビジョニングを設定した組織では、事前に全てのユーザを Datadog に招待しておかなくてもよくなります。このプロビジョニングを有効にすることで、 Datadog にアカウントが無いユーザが、組織の IdP 経由でログインを試みた場合、自動でユーザ アカウントを Datadog 用に生成する機能になります。

これらのSAMLの挙動の変更に関しては、サポートにお問い合わせください。尚、この機能を設定した場合、特定のユーザが Datadog にアクセスしないようにするには、 Datadog にアサーションを送信しないように 組織 IdP を設定する必要があります。


<!-- ### IdP Initiated Login

The normal workflow is that when the Datadog url is loaded, the browser is redirected to the customer IdP, user types in credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

In the normal setup, we won't know which org the assertion came from and this will result in an error page with a message saying that SAML Response is missing "InResponseTo" attribute.

After enabling the feature (and waiting for caches to clear) the customer will need to get a new version of the SP Metadata, which will have a different, org-specific AssertionConsumerService endpoint to send assertions to. -->

### IdP Initiated Login

通常のワークフローでは、Datadog URL がブラウザにロードされると、組織 IdP にリダイレクトされます。ここで、ユーザが認証情報を入力すると、組織 IdP により、 Datadog に 再度リダイレクトされます。 一部の IdP には、最初に AuthnRequest (IdP Initiated Login) を取得することなく、Datadog にアサーションを直接送信する機能があります。

通常の設定では、アサーションがどの組織から来たのか分からないため、 SAML レスポンスに "InResponseTo" 属性がないというエラーメッセージを表示します。

この機能を利用するためには、設定を有効した後、(キャッシュをクリアするのを待って) 、新しいバージョンの サービスプロバイダ メタデータを取得する必要があります。このメタデータには、アサーションを送信する際の、その組織固有の AssertionConsumerService エンドポイントの情報が含まれています。


   [4]: https://app.datadoghq.com/account/saml/metadata.xml
   [5]: /static/images/saml_enable.png
   [6]: /static/images/saml_enabled.png
   [7]: https://app.datadoghq.com/account/saml/metadata.xml