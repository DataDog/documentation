---
title: Datadog モバイルアプリ
kind: ドキュメント
further_reading:
  - link: /monitors/
    tag: ドキュメント
    text: アラート設定
  - link: /dashboards/
    tag: ドキュメント
    text: ダッシュボード
---
Datadog Mobile アプリを使用すると、Datadog からのアラートをモバイルデバイスで表示できます。Slack、メール、Pagerduty、またはその他のページャーアプリを介してアラートを受け取った場合、モバイルデバイスでモニターグラフとダッシュボードを開いて問題を調査できます。

## インストール

iOS デバイスの場合は [Apple App Store][1] から、Android デバイスの場合は [Google Play ストア][2]からアプリをダウンロードします。

### ログイン

US と EU のどちらのリージョンでも、標準認証、Google 認証、または [SAML][3] を使用してログインできます。

#### SAML の有効化

SAML ログインでは、Datadog を使用して SAML プロバイダーをセットアップおよび認証する必要があります。SAML でログインする前に、

1. まず、ブラウザで [Datadog アカウントプロファイルページ][4]にログインし、ログインする組織の **Link mobile device** ボタンをクリックします。QR コードがポップアップします。
    {{< img src="mobile/link-device.png" alt="モニターページ">}}
2. デフォルトのスマホカメラアプリを使用して QR コードをスキャンし、提案されたリンクをタップして Datadog アプリを開きます。組織 UDID がログイン画面に自動的に挿入されます。
3. 必要に応じて、SAML ID を手動で入力できます。Datadog Mobile アプリを開いて **login with SAML** をクリックし、SAML ID を手動で入力します。
4. 通常の SAML ログインフローを使用してログインします。ログイン時に **Authorize** をクリックすると、このモバイルデバイスがアカウントにリンクされます。セキュリティ上の理由から、このフローは月に 1 回実行する必要があります。

**注**: モバイルアプリは現在、IdP によって開始されるログイン (SAML ID プロバイダーからの認証) をサポートしていません。詳細について、または SAML 認証に問題がある場合は、[Datadog サポート][5]にお問い合わせください。

## モニター

{{< img src="mobile/monitors_doc2.png" alt="モニターページ">}}

モニターページでは、Datadog 組織でアクセスできるすべてのモニターを表示、検索できます。タグ付け戦略に基づいて、フィールド名とビルド固有の検索クエリで指定できます。検索の詳細については、[モニター検索の管理セクション][6]を参照してください。たとえば、アラートが発生している SRE チームに関連するメトリクスモニターでフィルタリングするには、クエリ `"status:Alert type:Metric team:sre"` を使用します。個々のアラートをクリックして詳細を表示します。これは、タイプとアラート時間でフィルタリングできます。また、アラートをミュートにすることもできます。最新の 10 件の検索が保存されるため、以前のクエリにすばやくアクセスできます。

**注:** モニターと通知の設定または編集は、[Datadog ウェブアプリ][7]で行う必要があります。ウェブアプリで設定されたすべてのモニターがモバイルアプリで表示されます。詳細については、[モニターの作成][8]を参照してください。

## ダッシュボード

{{< img src="mobile/dashboards_doc.png" alt="ダッシュボードページ">}}

ダッシュボードページでは、Datadog 組織でアクセスできるすべてのダッシュボードを表示、検索し、Datadog Web アプリで設定したものと同じテンプレート変数を使用してそれらをフィルタリングできます。個々のダッシュボードをクリックして表示します。

**注:** ダッシュボードを設定または編集するには、[Datadog ブラウザアプリにログイン][9]する必要があります。詳細については、[ダッシュボード][5]を参照してください。

## アカウント

組織を切り替えるか、アカウントページからログアウトします。

## トラブルシューティング

トラブルシューティングのヘルプについては、[Datadog のサポートチームにお問い合わせください][10]。また、[Datadog 公開 Slack][11] [#mobile-app][12] チャンネルでメッセージをお送りいただくことも可能です。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /ja/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /ja/dashboards/
[6]: /ja/monitors/manage_monitor/#search
[7]: https://app.datadoghq.com/monitors
[8]: /ja/monitors/monitor_types/
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /ja/help/
[11]: https://chat.datadoghq.com/
[12]: https://datadoghq.slack.com/archives/C0114D5EHNG