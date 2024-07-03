---
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
- link: /account_management/org_settings/cross_org_visibility
  tag: Documentation
  text: Cross-Organization Visibility
title: Managing Multiple-Organization Accounts
---

## 概要

1 つの親組織アカウントから複数の子組織を管理することができます。これは通常、お互いのデータにアクセスできない顧客を持つマネージドサービスプロバイダーが使用します。

複数組織アカウント機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][1]にご連絡ください。

## 機能

親組織と複数の子組織にユーザーを追加することができます。ユーザーは、[ユーザーアカウント設定メニュー][2]から組織を切り替えることができます。

親組織内の組織は、お互いのデータにアクセスできません。組織間のメトリクスクエリを有効にするには、[Cross-Organization Visibility][3] を参照してください。

親組織は、個々の子組織の利用状況を見ることができるため、利用傾向を追跡することができます。

アカウント設定 (許可リスト入りの IP アドレスなど) は、親オーガニゼーションから子オーガニゼーションへ継承されません。

## 子オーガニゼーション

### 作成

1. 機能を有効にしたら、[New Organization Page][4] を参照します。
2. 作成する子オーガニゼーションの名前を入力します。**子オーガニゼーション名は最大 32 文字です。**
3. オプションで、子組織に管理者ユーザーを招待することができます。
    - 1 つまたは複数のメールアドレスを入力します。
    - 招待されたユーザーには、[Datadog Admin ロール][5]が割り当てられます。組織を作成後、
組織の設定でさらにユーザーを招待することができます。
    - ユーザーがパスワードを持っていない場合、Datadog は、パスワードを設定し、新しい子組織に参加するためのリンクを持つ招待メールを送信します。
4. **作成**をクリックします。

新しい子組織は、親組織のプランを継承し、親組織の請求アカウントに追加されます。子組織の請求を更新する場合は、[営業担当者][6]にお問い合わせください。

### 内容

ベースラインのダッシュボードとモニターを使用して新しいサブ組織をオンボードするには、[Datadog API][7] と Terraform などのツールをプログラムで使用します。[Terraform を使用した Datadog の管理][8]を参照してください。さらに、スクリプトを使用して、既存のダッシュボードと[モニター][9]をコードとしてバックアップできます。

### カスタムサブドメイン

カスタムサブドメイン機能は、デフォルトでは有効になりません。有効にするには、[Datadog のサポートチーム][1]にご連絡ください。

複数のオーガニゼーションに属しているユーザーには、カスタムサブドメインを使用すると、アラートや通知のソースを特定するために便利です。そのようなユーザーをサブドメインに関連付けられているオーガニゼーションに即座に切り替えることもできます。

たとえば、URL `https://app.datadoghq.com/event/event?id=1` が組織 A のイベントに関連付けられています。組織 A と組織 B のメンバーであるユーザーが、組織 B のコンテキストで Datadog を表示している場合、上の URL は `404 Not Found error` を返します。その場合は、[ユーザーアカウント設定メニュー][2]を使用して組織 A に切り替えてから、URL に再度アクセスする必要があります。一方、カスタムサブドメインを使用し、`https://org-a.datadoghq.com/event/event?id=1` に移動すれば、自動的にユーザーのコンテキストが組織 A に切り替わり、正しいページを表示することができます。

**注**: カスタム Datadog サブドメインを持っている場合、Datadog ドキュメントからリンクを手動で（サブドメイン名を追加して）編集してください。たとえば、`https://**app**.datadoghq.com/account/settings` へリダイレクトするリンクは `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings` となります。

## SAML のセットアップ

SAML セットアップは、親オーガニゼーションから子オーガニゼーションへ継承 _されません_。各子オーガニゼーションで個別に SAML が構成される必要があります。

SAML をマルチオーガニゼーションに構成するには

1. Create a new organization.
2. SAML ユーザーを招待します。
3. SAML ユーザーとしてログインし、[SAML をセットアップ][10]します。

### SAML に厳しい親組織

状況によっては、新しく作成した子組織にアクセスできないことがあります。組織がユーザーに SAML を使用してログインすることを要求する場合、そのユーザーアカウントにはパスワードがないことがあります。子組織は親組織から SAML 設定を継承しないため、子組織にログインするには存在しないパスワードが必要になります。

SAML に厳しい親組織から作成された子組織に確実にログインするには、親組織で次の手順を実行します。
1. 左ナビゲーションの下部にあるアカウントメニューで **Organization Settings** をクリックするか、Personal Settings ページの上部にあるドロップダウンで **Organization Settings** を選択します。
2. 左ページのメニューで、**Users** を選択します。
3. ユーザープロファイルを選択します。
4. **Override Default Login Methods** トグルをオンに設定します。
5. **Select user's login methods** の下で、**Password** のチェックボックスにチェックを入れます。
6. アカウントにパスワードが設定されていることを確認します。パスワードの設定にお困りの場合は、[Datadog サポート][1]にお問い合わせください。

上記の手順で、メールアドレスとパスワードの組み合わせで親アカウントにログインできるようになります。子組織を作成した後、メールアドレスとパスワードを使ってログインすることも可能です。

すでに子組織を作成していてロックアウトされている場合は、手順に沿って操作することでログインできます。

## マルチオーガニゼーションの使用量

The parent-organization can view the total and billable usage of all their organizations (child and parent organizations) by hovering over their username on the bottom left corner and navigating to [**Plan & Usage** > **Usage & Cost**][11].

Usage ページには、親組織およびそのすべての子組織の使用量の集計が表示されます。Usage ページには、2 つのタブがあります。

* Overall
* Individual Organizations

### 全体使用量

このタブには、Month-to-Date Total Usage セクションと Overall Usage セクションが含まれています。

Month-to-Date Total Usage セクションには、親オーガニゼーションとそのすべての子オーガニゼーションで月内に使用したホスト、コンテナ、カスタムメトリクスなどのプラットフォーム各部について、当月の使用量概要が表示されます。

{{< img src="account_management/multi-org-v2.png" alt="当月使用量" >}}

ほとんどのアカウントは、デフォルトで「請求対象の」使用量を表示できます。これは、最終的な請求に寄与する使用量を示します。このビューでは、コミットメントと割り当てを超えるオンデマンドの使用量も分類されます。"All" ビューには、製品の試用版などの請求対象外の使用量を含む、すべての使用量が表示されます。

Overall Usage セクションには、すべてのオーガニゼーションの過去 6 か月の使用量の月間集計が表示されます。ここに表示される使用量は "請求対象" ではなく "すべて" であるため、トライアル期間など、最終的な請求書に反映される各種変更事項の調整は含まれていません。この情報は CSV ファイルとしてダウンロードできます。

{{< img src="account_management/multi-org-v2-trends.png" alt="全体使用量 長期的な傾向" >}}

製品固有のサブタブをクリックすると、Month-to-Date Total Usage セクションと Overall Usage セクションの両方をフィルタリングできます。"Log Management" サブタブでは、Logs Usage by Index テーブルを表示できます。このテーブルには、当月および先月のインデックス付きログ使用量が次のように表示されます。

* インデックス名
* Organization
* 保持期間（日数）
* ライブログとリハイドレートされたログの間で分類されたインデックス付きログ数
* インデックス付きログの全体的な使用量に対するインデックスの貢献率

このデータは CSV ファイルとしてダウンロードできます。

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="インデックス別の複数オーガニゼーションログの使用量" >}}

### Individual organization usage

**Individual Organizations** の使用量タブでは、子組織の使用量を絶対単位または総使用量に対する割合で表示することができます。

デフォルトのビューは "Billable" ビューで、最終的な請求に寄与する使用量が表示されます。このビューでは、トライアルオーガニゼーションなどの請求対象ではない子オーガニゼーションや、請求対象のより正確な要約を提供するその他の調整が削除されます。"All" ビューに切り替えると、親オーガニゼーションとすべての子オーガニゼーションの使用量を未調整かつ生の状態で確認することができます。どちらのビューも CSV ファイルとしてダウンロードできます。

To view the [Usage Details][12] of a child-organization, you can click on the child-organization's name.

## 使用属性

The parent-organization can view the usage of child-organizations by existing tag keys in the [Usage Attribution][13] page. Admins can hover over their username at the bottom left, then navigate to: [**Plan & Usage > Usage Attribution**][14].

親オーガニゼーションレベルで有効化されている場合、使用属性にはすべてのオーガニゼーションの使用量集計が表示されます。これは、子オーガニゼーションの使用量を特定のプロジェクトまたはチームの属性とするなど、グループ化する場合に便利です。

機能:

* 新規タグキーの変更及び追加（最大 3 つ）
* UI および .tsv ダウンロードとして月間使用量にアクセス（タブ区切り値）
* ほとんどの種類の日次使用量（.tsv ファイル）にアクセス

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="月次使用量属性レポート" style="width:100%;" >}}

使用属性は、子オーガニゼーションレベルで有効にすることも可能です。このレベルで有効にした場合、タグはその子オーガニゼーションのみに適用され、その子オーガニゼーションでのみ表示されます。子オーガニゼーションレベルで適用されたタグはロールアップされず、親オーガニゼーションでは表示されません。

使用属性は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/account_management/#managing-your-organizations
[3]: /ja/account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /ja/account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /ja/api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /ja/monitors/manage/
[10]: /ja/account_management/saml/
[11]: https://app.datadoghq.com/billing/usage?cost_summary
[12]: /ja/account_management/plan_and_usage/usage_details/
[13]: /ja/account_management/billing/usage_attribution/
[14]: https://app.datadoghq.com/billing/usage-attribution