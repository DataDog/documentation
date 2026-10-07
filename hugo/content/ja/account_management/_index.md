---
aliases:
- /ja/guides/billing
- /ja/account_management/settings
cascade:
  algolia:
    rank: 70
description: Datadog アカウントと組織を管理する
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: ブログ
  text: 大規模環境での Datadog 組織管理のベストプラクティス
title: アカウント管理
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog for Government プラットフォームでは、SAML か、またはユーザー名/メールアドレスとパスワードを使用した基本認証のみがサポートされています。SAML 認証を構成する前に、セットアッププロセス中にアクセスを維持できるよう、少なくとも 1 つのユーザー名またはメールアドレスとパスワードのアカウントを作成しておいてください。Datadog では、パスワードベースのアカウントに多要素認証 (MFA) を有効にすることが推奨されています。

トライアルアカウントに SAML を有効にする必要がある場合は、<a href="https://docs.datadoghq.com/getting_started/support/">Datadog サポート</a>にお問い合わせください。</div>

{{< /site-region >}}

## 個人設定 {#personal-settings}

Datadog の個人設定ページでは、組織内の他のユーザーへの表示方法の制御、組織の切り替えまたは退会、通知設定の管理を行うことができます。

### プロフィール {#profile}

あなたのプロフィールは、組織内の他のユーザーが Datadog であなたを認識する手段です。{{< ui >}}Personal Settings{{< /ui >}} のページ内の[プロファイルタブ][11]から、名前、メールアドレス、役職を設定または更新してください。

写真を更新するためには、[Gravatar][1] でアカウントを作成し、自分のメールアドレスと関連付けます。

Google 認証を使用して Datadog にログインする場合、メールアドレスは Google アカウントで提供されます。Datadog では**ありません**。Google でメールアドレスを変更するには、[Google のドキュメント][2]を参照してください。

### 設定 {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
{{< ui >}}Personal Settings{{< /ui >}} ページ内の [設定タブ][3]から、タイムゾーン、ビジュアルアクセシビリティの環境設定、メールサブスクリプションを管理することができます。

#### メールサブスクリプション {#email-subscriptions}

メールサブスクリプションでは、以下のレポートにアクセスできます。
{{< site-region region="us3,us5,gov,gov2,ap1,ap2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではメールダイジェストを利用できません。</div>
{{< /site-region >}}

* 1 日のダイジェスト
* 週のダイジェスト

メールダイジェストが自分に関連しているかどうかわからない場合は、各メールサブスクリプションの横にある {{< ui >}}Example{{< /ui >}} リンクをクリックしてサンプルとして表示できます。すべてのメールサブスクリプションを解除するには、{{< ui >}}Unsubscribe From All{{< /ui >}} ボタンを使用してください。
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
{{< ui >}}Personal Settings{{< /ui >}} ページ内の [**設定**タブ][3]から、タイムゾーン、ビジュアルアクセシビリティの環境設定を管理することができます。
{{% /site-region %}}

#### 時間フォーマット {#time-format}

Datadog での時間表示を 12 時間形式にするか、それとも 24 時間形式にするかを選択します (「2:30 pm」か「14:30」かなど)。新しいアカウントでは、デフォルトで 12 時間形式になります。グラフや特定の表形式のデータは常に 24 時間形式で表示されます。

#### ビジュアルアクセシビリティ {#visual-accessibility}

ビジュアルアクセシビリティの設定には、色覚異常、視力低下、明るい色に対する感受性に対応するための 5 種類の設定があります。アクセシビリティの色設定を選択すると、Datadog はクラシックカラーパレットを使用するすべてのグラフを、あなたの視覚的ニーズに合わせたアクセシビリティの色セットに変換します。

**注**: 視覚アクセシビリティ設定はブラウザにローカルに保存されます。異なるブラウザを使用したり、キャッシュをクリアしたりすると、設定はデフォルトの設定に戻ります。

### 組織 {#organizations}

{{< ui >}}Personal Settings{{< /ui >}} の[組織タブ][12]には、自分が関連付けられているすべての組織が一覧表示されます。このページから、または左側のナビゲーションのアカウントメニューにカーソルを合わせることにより、これらの組織を切り替えることができます。

**注**: 組織を退出すると、組織の管理者が招待するまで参加し直すことはできません。

既存の組織に参加するには、管理者に招待してもらう必要があります。招待されると、件名が「\<組織名>に参加するよう招待されました」というメールが送信されます。メール内の {{< ui >}}Join Account{{< /ui >}} ボタンをクリックしてください。

組織の管理者の方は、以下ののドキュメントをご参考になさってください。

* [組織内のユーザーの管理][4]
* [SAML でのシングルサインオンの構成][5]
* [組織名の変更][6]
* [複数の組織のアカウントの管理][7]
* [Datadog プランを変更して使用状況と請求履歴を表示する][8]
* [組織のトポロジ―を選択する (シングル組織対複数組織)][15]

### セキュリティ {#security}

#### アプリケーションキー {#application-keys}

{{< ui >}}Personal Settings{{< /ui >}} の[アプリケーションキー]タブ[13]では、アプリケーションキーを管理できます。キーをコピーするには、右側に {{< ui >}}Copy Key{{< /ui >}} アイコンが表示されるまで上にカーソルを合わせ、クリックします。特定のキーをクリックすると、その名前を編集したり、作成日時を確認したり、キーの所有者のプロフィールを表示したり、コピーしたり、取り消したりできます。

#### アプリ {#apps}

{{< ui >}}Personal Settings{{< /ui >}} の[アプリ]タブ[14]では、組織のメンバーによってインストールまたは作成されたアプリを管理できます。検索文字列でアプリをフィルタリングしたり、チェックボックスを使用して有効または無効のアプリのみを表示することができます。

アプリにカーソルを合わせると、アプリ一覧の右側に有効または無効にするオプションが表示されます。

#### メール認証 {#email-verification}
アカウントのセキュリティを強化し、追加の管理機能にアクセスするために、メールアドレスを確認してください。確認済みのユーザーは、アカウントのセキュリティをより高い管理権限で管理でき、所属するすべての組織を閲覧できます。

- **Google ログインユーザー**は、初回ログイン時に自動的に確認されます。
- **パスワードベースのユーザー**は、初めてパスワードを設定する際にメールを確認します。
- **SAML ユーザー**は、Datadog を通じて手動でメールを確認する必要があります。

確認されたら、次の機能にアクセスできます。
- **アクティブな Web セッションすべてからログアウトする**機能。これにより、資格情報が漏洩した場合のセキュリティが確保されます。
- **現在の組織階層外で、組織を表示および切り替える**機能。

未確認のユーザーも Datadog にアクセスできますが、階層内の組織の表示に制限され、アクティブなセッションを取り消すことはできません。

#### メールを確認する {#verify-your-email}

メールを確認するには、次のようにします。
1. 自分の {{< ui >}}Profile Settings{{< /ui >}} に移動します。
2. {{< ui >}}Verify Account{{< /ui >}} をクリックします。
3. 登録済みのメールに送信された**確認コード**を入力します。
4. {{< ui >}}Submit{{< /ui >}}をクリックすると、確認プロセスが完了します。

#### アクティブな Web セッションすべてからログアウトする {#log-out-of-all-active-web-sessions}

アクティブな Web セッションすべてからログアウトするには、次のようにします。
アクティブな Web セッションすべてからログアウトすると、使用中のデバイスを含むすべての現在のセッションからログアウトされます。


アクティブなセッションすべてからログアウトするには、次のようにします。
1. {{< ui >}}Personal Settings{{< /ui >}} に移動します。
2. {{< ui >}}Log Out of All Web Sessions{{< /ui >}} をクリックします。
3. アクションを確認します。

確認後、すべてのデバイスからログアウトされます。再度ログインする必要があります。

## 外観 {#appearance}

サイドバーにあるアバターの上にマウスを置くか、`Ctrl+Opt+D` / `Ctrl+Alt+D`を押すと、Datadog がダークモードで表示されます。

コンピュータの外観設定に適応するには、{{< ui >}}System{{< /ui >}} オプションを選択します。これにより、Datadog の外観が OS レベルで設定したテーマに自動的に一致するようになります。

## GitHub への接続 {#connecting-to-github}

[GitHub 統合][9]をインストールして Datadog でイベントを作成した場合は、個人の GitHub アカウントを Datadog ユーザーアカウントにリンクしてください。アカウントをリンクすることで、Datadog の GitHub イベントに投稿したコメントは、自動的に GitHub の対応するイシューまたはプルリクエストに投稿されます。

## 組織のアカウントを無効にする {#disabling-your-organizations-account}

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
[15]: /ja/getting_started/organization_topology/