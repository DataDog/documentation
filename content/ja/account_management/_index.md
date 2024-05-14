---
aliases:
- /ja/guides/billing
- /ja/account_management/settings
cascade:
  algolia:
    rank: 70
description: Datadog アカウントと組織を管理する
kind: documentation
title: アカウントの管理
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

## 個人設定

Datadog の個人設定ページでは、組織内の他のユーザーへの表示方法の制御、組織の切り替えまたは退会、通知設定の管理を行うことができます。

### プロファイル

自分の情報が Datadog 内で組織の他のメンバーにどのように表示されるかはプロファイルによって決まります。**Personal Settings** ページ内の [Profile タブ][11]から自分の名前、メールアドレス、肩書きを設定または更新します。

写真を更新するためには、[Gravatar][1] でアカウントを作成し、自分のメールアドレスと関連付けます。

Google 認証を使用して Datadog にログインする場合、メールアドレスは Google アカウントで提供されます。Datadog では**ありません**。Google でメールアドレスを変更するには、[Google のドキュメント][2]を参照してください。

### 設定

{{% site-region region="us,us3,us5,eu,ap1" %}}
**Personal Settings** ページ内の [Preferences タブ][3]から、タイムゾーン、ビジュアルアクセシビリティの環境設定、メールサブスクリプションを管理することができます。

#### メールサブスクリプション

メールサブスクリプションでは、以下のレポートにアクセスできます。

* 1 日のダイジェスト
* 週間ダイジェスト

メールダイジェストが自分に関連しているかどうかわからない場合は、各メールサブスクリプションの横にある **Example** リンクをクリックして例を表示することができます。**Unsubscribe From All** ボタンを使用して、すべてのメールサブスクリプションから退会することもできます。
{{% /site-region %}}


{{% site-region region="gov" %}}
**Personal Settings** ページ内の [**Preferences** タブ][3]から、タイムゾーンおよびビジュアルアクセシビリティの環境設定を管理することができます。
{{% /site-region %}}

#### ビジュアルアクセシビリティ

ビジュアルアクセシビリティの環境設定には、 色覚障害、視力低下、明るい色への過敏性に対応するための 5 つの設定があります。アクセシブルカラー設定を選択すると、Datadog は、クラシックカラーパレットを使用するすべてのグラフを、視覚的ニーズに合わせたアクセシブルカラーに変換します。

**注**: ビジュアルアクセシビリティの環境設定は、ブラウザにローカルに保存されます。別のブラウザを使用するか、キャッシュをクリアすると、環境設定はデフォルト設定になります。

### 組織を更新する

**Personal Settings** の [Organizations タブ][12]には、自分が関連付けられているすべての組織が一覧表示されます。このページから組織を切り替えることができます。なお、組織の切り替えは左側のナビゲーションのアカウントメニューにカーソルを合わせることでも行えます。

**注**: 組織を退出すると、組織の管理者が招待するまで参加し直すことはできません。

既存の組織に参加するには、管理者から招待される必要があります。招待された後、"You've been invited to join <Organization Name>" という件名のメールが届きます。メールの **Join Account** ボタンをクリックします。

組織の管理者の方は、以下ののドキュメントをご参考になさってください。

* [組織内のユーザーの管理][4]
* [SAML でのシングルサインオンの構成][5]
* [組織名の変更][6]
* [複数の組織のアカウントの管理][7]
* [Datadog プランを変更して使用状況と請求履歴を表示する][8]

### セキュリティ

#### アプリケーションキー

**Personal Settings** の [Application Keys タブ][13]では、アプリケーションキーを管理できます。キーをコピーするには、**Copy Key** アイコンが右側に表示されるまでキーにカーソルを合わせてクリックします。特定のキーをクリックして、その名前を編集したり、作成された日時を表示したり、キーの所有者のプロファイルを表示したり、コピーしたり、取り消したりすることもできます。

#### Apps

**Personal Settings** の [Apps タブ][14]では、組織のメンバーがインストールまたは作成したアプリを管理できます。検索文字列を使用してアプリをフィルタリングしたり、チェックボックスを使用して有効または無効のアプリのみを表示するように選択できます。

アプリにカーソルを合わせると、アプリ一覧の右側に有効または無効にするオプションが表示されます。

## 外観

Datadog をダークモードで表示するには、サイドバーにあるアバターの上にマウスを置くか、`Ctrl+Opt+D` / `Ctrl+Alt+D` を押します。

コンピューターの表示設定をそのまま使う場合は、*System* オプションを選択します。これにより、OS の側で設定したテーマが Datadog の表示にも使用されます。

## GitHub への接続

[GitHub インテグレーション][9]をインストールして Datadog でイベントを作成するには、自分の GitHub アカウントを Datadog ユーザーアカウントにリンクする必要があります。アカウントをリンクすることで、Datadog で GitHub イベントに投稿したコメントは自動的に GitHub の対応する問題またはプルリクエストに投稿し直されます。

## 組織のアカウントを無効にする

Datadog の組織アカウントを無効にするには、[Datadog サポート][10]にお問い合わせください。

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/personal-settings/preferences
[4]: /ja/account_management/users/
[5]: /ja/account_management/saml/
[6]: /ja/account_management/org_settings/#change-your-organization-name
[7]: /ja/account_management/multi_organization/
[8]: /ja/account_management/org_settings/
[9]: /ja/integrations/github/
[10]: /ja/help/
[11]: https://app.datadoghq.com/personal-settings/profile
[12]: https://app.datadoghq.com/personal-settings/organizations
[13]: https://app.datadoghq.com/personal-settings/application-keys
[14]: https://app.datadoghq.com/personal-settings/apps