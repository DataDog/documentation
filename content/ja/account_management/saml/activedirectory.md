---
title: Microsoft Active Directory フェデレーションサービスを SAML IdP として構成する方法
kind: documentation
aliases:
  - /ja/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
Datadog の SSO 用 SAML インテグレーションは、オーガニゼーションを外部のユーザー管理システムにリンクして、一元的なシステムで資格情報を簡単に維持および管理するための手段を提供します。

この記事は、このインテグレーションのメインガイド (下のリンクをクリック) の追加ガイドです。Datadog を ADFS に接続する際に必要になる追加手順を中心に説明します。

[SAML を使用したシングルサインオン (メインガイド)][1]

**ADFS でシングルサインオンを構成する場合は、以下の手順に従ってください。**

ADFS マネジメントコンソールを開きます。これは、下に示すように、サーバーマネージャーから行うことができます。

{{< img src="account_management/saml/1ef6IBS.png" alt="1ef6IBS"  style="width:60%;">}}

右側にある「証明書利用者信頼の追加」ボタンをクリックします。

{{< img src="account_management/saml/O85HjIi.png" alt="O85HjIi"  style="width:60%;">}}

これで、信頼の追加ウィザードのようこそ画面が開き、機能の説明が表示されます。説明を確認し、「開始」をクリックして構成を開始します。

{{< img src="account_management/saml/KWe4h6W.png" alt="KWe4h6W"  style="width:60%;">}}

[Datadog SAML メタデータファイル][2]をインポートします。

ファイルにアクセスするにはログインする必要があります。下に示されているインポートオプションのうち、URL から直接インポートするより、ファイルをダウンロードしてインポートする方が簡単なので、この方法を使用します。(警告: ファイルをダウンロードする際、ファイルを開いたり名前を変更したりすると、ファイルの種類を変更することになり、次の手順で xml パースエラーが発生する可能性があります。)

{{< img src="account_management/saml/UAjeUVL.png" alt="UAjeUVL"  style="width:60%;">}}

「参照」をクリックしてダウンロードしたメタデータファイルを選択し、「次へ」をクリックします。

{{< img src="account_management/saml/LWZCPG6.png" alt="LWZCPG6"  style="width:60%;">}}

信頼の表示名 (「Datadog」などの名前をお勧めします) を指定し、「次へ」をクリックします。

{{< img src="account_management/saml/IQDM19N.png" alt="IQDM19N"  style="width:60%;">}}

現時点で、多要素認証はサポートされていません。選択をデフォルトのままにして、「次へ」をクリックします。

{{< img src="account_management/saml/AhM25jW.png" alt="AhM25jW"  style="width:60%;">}}

すべてのユーザーにアクセスを許可し、「次へ」をクリックします。

注: アクセス許可の制御は、Datadog で[アプリケーションのチームページ][3]から特定のユーザーのみをオーガニゼーションに招待することで行います。

{{< img src="account_management/saml/Rd13Ofm.png" alt="Rd13Ofm"  style="width:60%;">}}

この信頼で適切なエンドポイントが構成されていることを確認したら、「次へ」をクリックします。

{{< img src="account_management/saml/xex71aV.png" alt="xex71aV"  style="width:60%;">}}

「閉じる」をクリックして終了します。これで、信頼の定義が保存され、要求規則の編集ウィンドウが開きます。ここで、推奨される 2 つの要求規則を追加します。

{{< img src="account_management/saml/5NkUanW.png" alt="5NkUanW"  style="width:60%;">}}

SAML アサーションを仲介するための 2 つの要求規則を追加することをお勧めします。これらの規則を追加するには、まず「規則の追加」ボタンをクリックします。

{{< img src="account_management/saml/QkNaDCD.png" alt="QkNaDCD"  style="width:60%;">}}

最初の規則は、必要な情報が 2 つのシステム間で渡されるようにするための LDAP 属性規則です。下に示すように規則を構成し、「OK」をクリックして保存します。(E-Mail-Addresses、Given-Name、Surname の 3 つのフィールドを必ず使用してください。使用しない場合、後で関連情報が「なし」の状態になる可能性があります。)

{{< img src="account_management/saml/cogaUQT.png" alt="cogaUQT"  style="width:60%;">}}

2 番目の規則は、変換規則です。Datadog は、アサーションリクエストの NameIDPolicy の形式として、`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定していますが、ADFS はネイティブで Name ID 形式を想定しています。そのため、形式を電子メールから Name ID に変換する必要があります。

ドロップダウンから「入力方向の要求を変換」を選択し、「**次へ**」をクリックして続行します。

{{< img src="account_management/saml/JS5FNbR.png" alt="JS5FNbR"  style="width:60%;">}}

下に示すように構成を入力し、「**完了**」をクリックします。

{{< img src="account_management/saml/OT9i0K5.png" alt="OT9i0K5"  style="width:60%;">}}

「OK」をクリックして新しい要求規則を保存します。

{{< img src="account_management/saml/CeCyDmc.png" alt="CeCyDmc"  style="width:60%;">}}

最後に、[Datadog オーガニゼーションの Saml ページ][4]で、ADFS IdP メタデータを ADFS サーバーからダウンロードして SAML 構成にインポートします。

このファイルは、URL `https://hostname/FederationMetadata/2007-06/FederationMetadata.xml` からダウンロードできます (hostname は、ご使用のサーバーの公開 DNS ホスト名に置き換えてください)。

下に示すように、SAML 構成ページから Datadog オーガニゼーションにインポートします。

{{< img src="account_management/saml/KJxaVYe.png" alt="KJxaVYe"  style="width:60%;">}}

これで完了です。SAML が構成されると、ユーザーは SAML 構成ページにあるリンクを使用してログインできます。

ユーザーがログインできるようになるには、そのユーザーを招待して有効にする必要があることに注意してください。新しいユーザーを招待する際は、そのユーザーの Active Directory ユーザーレコードに対応する電子メールアドレスを使用してください。そうでない場合、ユーザーは次のように拒否されます。

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla"  style="width:60%;">}}

ほとんどの設定では、ユーザーの user@domain が Microsoft ログインアカウントですが、そのように制限されているわけではありません。ユーザーレコード内で使用される電子メールアドレスは、以下のように確認できます。

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK"  style="width:60%;">}}

この件に関する疑問や質問は、[Datadog のサポートチーム][5]までお問い合わせください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/
[2]: https://app.datadoghq.com/account/saml/metadata.xml
[3]: https://app.datadoghq.com/account/team
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: /ja/help/