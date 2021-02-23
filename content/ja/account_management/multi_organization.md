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
  - link: /account_management/billing/usage_details
    tag: Documentation
    text: 使用量の詳細について
  - link: /account_management/billing/usage_attribution
    tag: Documentation
    text: 使用属性のセットアップ
---
1 つの親オーガニゼーションアカウントから複数の子オーガニゼーションを管理できます。通常、これは、顧客どうしが互いのデータにアクセスできない、マネージドサービスプロバイダーによって使用されます。親オーガニゼーションや複数の子オーガニゼーションにユーザーを追加し、[ユーザーアカウント設定メニュー][1]で切り替えることができます。親オーガニゼーションは、個々の子オーガニゼーションの使用状況を表示できるため、そのトレンドを追跡できます。

アカウント設定 (許可リスト入りの IP アドレスなど) は、親オーガニゼーションから子オーガニゼーションへ継承されません。

マルチオーガニゼーションアカウント機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][2]にご連絡ください。

次は 2 分間の説明ビデオです。

{{< wistia tg9ufqbin9>}}
<br>

## 子オーガニゼーション

### 作成

1. 機能を有効にしたら、[New Account Page][3] にアクセスします。
2. 作成する子オーガニゼーションの名前を入力し、**Create** ボタンをクリックします。**子オーガニゼーション名は最大 32 文字です。**

新しい子オーガニゼーションは、親オーガニゼーションのプランを継承し、親オーガニゼーションの請求アカウントに追加されます。子オーガニゼーションの請求を更新する場合は、[営業担当者][4]にお問い合わせください。

### 内容

ベースラインのダッシュボードとモニターを使用して新しいサブオーガニゼーションをオンボードするには、[Datadog API][5] と Terraform などのツールをプログラムで使用します。『[Terraform を使用した Datadog の管理][6]』を参照してください。さらに、スクリプトを使用して、既存の[ダッシュボード][7]と[モニター][8]をコードとしてバックアップできます。

### カスタムサブドメイン

カスタムサブドメイン機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][2]にご連絡ください。

複数のオーガニゼーションに属しているユーザーには、カスタムサブドメインを使用すると、アラートや通知のソースを特定するために便利です。そのようなユーザーをサブドメインに関連付けられているオーガニゼーションに即座に切り替えることもできます。

たとえば、URL `https://app.datadoghq.com/event/event?id=1` がオーガニゼーション A のイベントに関連付けられています。オーガニゼーション A とオーガニゼーション B のメンバーであるユーザーが、現在オーガニゼーション B のコンテキストで Datadog を表示している場合、上の URL は `404 Not Found error` を返します。その場合は、[ユーザーアカウント設定メニュー][10]を使用してオーガニゼーション A に切り替えてから、URL に再度アクセスする必要があります。一方、カスタムサブドメインを使用し、`https://org-a.datadoghq.com/event/event?id=1` にアクセスすれば、自動的にユーザーのコンテキストがオーガニゼーション A に切り替わり、正しいページを表示することができます。

注: カスタムサブドメインを使用する場合、Datadog ドキュメントからリンクを手動で（サブドメイン名を追加して）編集する必要があります。たとえば、`https://**app**.datadoghq.com/account/settings` へリダイレクトするリンクは `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings` となります。

## SAML のセットアップ

SAML セットアップは、親オーガニゼーションから子オーガニゼーションへ継承 _されません_。各子オーガニゼーションで個別に SAML が構成される必要があります。

SAML をマルチオーガニゼーションに構成するには

1. 別のユーザー名/パスワードを使用して別のユーザーとして新しいオーガニゼーションを作成します。
2. SAML ユーザーを招待します。
3. SAML ユーザーとしてログインし、SAML を設定します。

## マルチオーガニゼーションの使用量

親オーガニゼーションは、左下にあるユーザー名にカーソルを置き、`Plan & Usage`--> `Multi-Org Usage` と移動することで、すべてのオーガニゼーション（親および子）の合計使用量と請求対象使用量を確認できます。

Multi-Org Usage タブには、親オーガニゼーションおよびそのすべての子オーガニゼーションの使用量の集計が表示されます。Multi-Org Usage タブには、2 つのサブタブがあります。

* 当月の使用量
* 長期的な傾向

### 今月累積の使用量

このビューには Overall Usage セクションと Individual Organization Usage セクションが含まれています。

Overall Usage セクションには、親オーガニゼーションとそのすべての子オーガニゼーションで月内に使用したホスト、コンテナ、カスタムメトリクスなどのプラットフォーム各部について、当月の使用量概要が表示されます。

{{< img src="account_management/managing-multiorgs-01.png" alt="当月使用量" >}}

Individual Organization Usage セクションには、オーガニゼーション別に製品の月内使用量の詳細が 2 つのビューで表示されます。"All" ビューは、親オーガニゼーションおよびすべての子オーガニゼーションの使用量の未調整データを製品別に表示するテーブルビューです。子オーガニゼーションの[使用量詳細][9]を確認するには、子オーガニゼーションの名前をクリックします。

{{< img src="account_management/managing-multiorgs-02.png" alt="当月使用量" >}}

請求対象となる使用量のみを確認する場合は、"Billable" ビューに切り替えられます。ここでは、請求に反映されるさまざまな項目の正確な概要を提供する調整のほか、トライアルなど請求対象外のオーガニゼーションが除外されて表示されます。

当月使用量および前月使用量は CSV ファイルとしてダウンロードできます。

### 長期トレンド

このタブには、すべてのオーガニゼーションの過去 6 か月の使用量の月間集計が表示されます。ここに表示される使用量は "請求対象" ではなく "すべて" であるため、トライアル期間など、最終的な請求書に反映される各種変更事項の調整は含まれていません。

この情報は CSV ファイルとしてダウンロードできます。

## 使用属性

親オーガニゼーションは、[Usage Attribution][10] ページで子オーガニゼーションの使用量を既存のタグキー別に確認できます。管理者が、左下にあるユーザー名にカーソルを置き、`Plan & Usage`--> `Usage Attribution` と移動して表示します。

親オーガニゼーションレベルで有効化されている場合、使用属性にはすべてのオーガニゼーションの使用量集計が表示されます。これは、子オーガニゼーションの使用量を特定のプロジェクトまたはチームの属性とするなど、グループ化する場合に便利です。

機能:

* 新規タグキーの変更及び追加（最大 3 つ）
* UI および .tsv ダウンロードとして月間使用量にアクセス（タブ区切り値）
* ほとんどの種類の日次使用量（.tsv ファイル）にアクセス

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="使用の要約表" >}}

使用属性は、子オーガニゼーションレベルで有効にすることも可能です。このレベルで有効にした場合、タグはその子オーガニゼーションのみに適用され、その子オーガニゼーションでのみ表示されます。子オーガニゼーションレベルで適用されたタグはロールアップされず、親オーガニゼーションでは表示されません。

注: 以下の使用タイプはこのツールではサポートされません。

* インデックス化されたログイベント
* 収集されたログ
* Indexed Span

**注:** Analyzed Span は、2020 年 10 月 20 日の Tracing Without Limits のローンチに伴い、Indexed Span と改名しました。

使用属性は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/#managing-your-organizations
[2]: /ja/help/
[3]: https://app.datadoghq.com/account/new_org
[4]: mailto:success@datadoghq.com
[5]: /ja/api/
[6]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[7]: /ja/dashboards/screenboards/#backup-my-screenboard
[8]: /ja/monitors/manage_monitor/
[9]: /ja/account_management/billing/usage_details/
[10]: /ja/account_management/billing/usage_attribution/