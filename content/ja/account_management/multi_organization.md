---
title: マルチオーガニゼーションアカウントの管理
kind: documentation
aliases:
  - /ja/guides/multiaccountorg
  - /ja/account_management/mult_account
  - /ja/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
  - /ja/account_management/multi_organisations
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Datadog アカウントで SAML を設定
---
1 つの親オーガニゼーションアカウントから複数の子オーガニゼーションを管理できます。通常、これは、顧客どうしが互いのデータにアクセスできない、マネージドサービスプロバイダーによって使用されます。親オーガニゼーションや複数の子オーガニゼーションにユーザーを追加し、[ユーザーアカウント設定メニュー][1]で切り替えることができます。

アカウント設定 (ホワイトリスト済みの IP アドレスなど) は、親オーガニゼーションから子オーガニゼーションへ継承されません。

マルチオーガニゼーションアカウント機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][2]にご連絡ください。

2 分間のビデオをご覧ください。

{{< wistia tg9ufqbin9>}}
<br>

## 子オーガニゼーション

### 作成

1. 機能を有効にしたら、[New Account Page][3] にアクセスします。
2. 作成する子オーガニゼーションの名前を入力し、**Create** ボタンをクリックします。**子オーガニゼーション名は最大 32 文字です。**

新しい子オーガニゼーションは、親オーガニゼーションのプランを継承し、親オーガニゼーションの請求アカウントに追加されます。子オーガニゼーションの請求を更新する場合は、[営業担当者][5]にお問い合わせください。

### 内容

ベースラインのダッシュボードとモニターを使用して新しいサブオーガニゼーションをオンボードするには、[Datadog API][6] と Terraform などのツールをプログラムで使用します。『[Terraform を使用した Datadog の管理][7]』を参照してください。さらに、スクリプトを使用して、既存の[ダッシュボード][8]と[モニター][9]をコードとしてバックアップできます。

### カスタムサブドメイン

カスタムサブドメイン機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][2]にご連絡ください。

複数のオーガニゼーションに属しているユーザーには、カスタムサブドメインを使用すると、アラートや通知のソースを特定するために便利です。そのようなユーザーをサブドメインに関連付けられているオーガニゼーションに即座に切り替えることもできます。

たとえば、URL `https://app.datadoghq.com/event/event?id=1` がオーガニゼーション A のイベントに関連付けられています。オーガニゼーション A とオーガニゼーション B のメンバーであるユーザーが、現在オーガニゼーション B のコンテキストで Datadog を表示している場合、上の URL は `404 Not Found error` を返します。その場合は、[ユーザーアカウント設定メニュー][10]を使用してオーガニゼーション A に切り替えてから、URL に再度アクセスする必要があります。一方、カスタムサブドメインを使用し、`https://org-a.datadoghq.com/event/event?id=1` にアクセスすれば、自動的にユーザーのコンテキストがオーガニゼーション A に切り替わり、正しいページを表示することができます。

## SAML のセットアップ

マルチオーガニゼーション用に SAML を構成するには、以下の手順に従います。

1. 別のユーザー名/パスワードを使用して別のユーザーとして新しいオーガニゼーションを作成します。
2. SAML ユーザーを招待します。
3. SAML ユーザーとしてログインし、SAML を設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/#managing-your-organizations
[2]: /ja/help/
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/billing
[5]: mailto:success@datadoghq.com
[6]: /ja/api/
[7]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[8]: /ja/dashboards/screenboards/#backup-my-screenboard
[9]: /ja/monitors/manage_monitor/