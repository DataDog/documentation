---
title: アカウントの管理
kind: documentation
description: Datadog アカウントと組織を管理する
aliases:
  - /ja/guides/billing
  - /ja/account_management/settings
---
## アカウント設定

Datadog の [account settings][1] ページでは、組織の他のメンバーに自分がどう表示されるかを制御できます。組織の切り替えや退出、通知の設定の管理ができます。

### プロファイル

自分の情報が Datadog 内で組織の他のメンバーにどのように表示されるかはプロファイルによって決まります。ここで自分の名前、メールアドレス、組織のロールを設定または更新します。

写真を更新するためには、[Gravatar][2] でアカウントを作成し、自分のメールアドレスと関連付けます。

Google 認証を使用して Datadog にログインする場合、メールアドレスは Google アカウントで提供されます。Datadog では**ありません**。Google でメールアドレスを変更するには、[Google のドキュメント][3]を参照してください。

### Organizations

account settings ページには、自分が関連付けられているすべての組織が一覧表示されます。このページから組織を切り替えることができます。なお、組織の切り替えは左側のナビゲーションのアカウントメニューにカーソルを合わせることでも行えます。

**注**: 組織を退出すると、組織の管理者が招待するまで参加し直すことはできません。

既存の組織に参加するには、管理者から招待される必要があります。招待されると、`You've been invited to join <組織名>` という件名のメールが届きます。メールの **Join Account** ボタンをクリックします。

組織の管理者の方は、以下ののドキュメントをご参考になさってください。

* [組織内のユーザーの管理][4]
* [SAML でのシングルサインオンの構成][5]
* [組織名の変更][6]
* [複数の組織のアカウントの管理][7]
* [Datadog プランを変更して使用状況と請求履歴を表示する][8]

### 設定

*account settings* ページの [*Preferences* タブ][9]で、自分のタイムゾーン、デスクトップ通知、メール講読を設定できます。メールのサブスクリプションで、次のレポートにアクセスできます。

* 1 日のダイジェスト
* 週間ダイジェスト
* 週間モニターレポート
* 週間 PagerDuty レポート
* 週間 Nagios レポート

## 外観

Datadog をダークモードで表示するには、サイドバーにあるアバターの上にマウスを置くか、`Ctrl+Opt+D` / `Ctrl+Alt+D` を押します。

コンピューターの表示設定をそのまま使う場合は、*System* オプションを選択します。これにより、OS の側で設定したテーマが Datadog の表示にも使用されます。

{{< img src="account_management/dark-mode-toggle.png" alt="ダークモード"  style="width:60%;">}}

## GitHub への接続

[GitHub インテグレーション][10]をインストールして Datadog でイベントを作成するには、自分の GitHub アカウントを Datadog ユーザーアカウントにリンクする必要があります。アカウントをリンクすることで、Datadog で GitHub イベントに投稿したコメントは自動的に GitHub の対応する問題またはプルリクエストに投稿し直されます。

## アカウントの削除

Datadog アカウントを完全に削除するには、[サポートチームにご連絡ください][11]。

[1]: https://app.datadoghq.com/account/profile
[2]: https://gravatar.com
[3]: https://support.google.com/accounts/answer/19870?hl=en
[4]: /ja/account_management/users/
[5]: /ja/account_management/saml/
[6]: /ja/account_management/org_settings/#change-your-organization-name
[7]: /ja/account_management/multi_organization/
[8]: /ja/account_management/org_settings/
[9]: https://app.datadoghq.com/account/preferences
[10]: /ja/integrations/github/
[11]: /ja/help/