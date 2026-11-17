---
aliases:
- /ja/guides/multiaccountorg
- /ja/account_management/mult_account
- /ja/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /ja/account_management/multi_organisations
description: マネージドサービスプロバイダー向けに、個別請求、使用状況追跡、アクセス制御を備えた親アカウントから複数の子組織を管理します。
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: ブログ
  text: 大規模環境での Datadog 組織管理のベストプラクティス
- link: /account_management/saml/
  tag: ドキュメント
  text: Datadog アカウントのための SAML の構成
- link: /account_management/billing/usage_details
  tag: ドキュメント
  text: 使用量の詳細について
- link: /account_management/billing/usage_attribution
  tag: ドキュメント
  text: 使用属性のセットアップ
- link: /account_management/org_settings/cross_org_visibility
  tag: ドキュメント
  text: Cross-Organization Visibility
title: 複数組織アカウントの管理
---
## 概要{#overview}

1 つの親組織アカウントから複数の子組織を管理することが可能です。これは通常、互いのデータへのアクセス権を持つべきではない顧客を抱えるマネージドサービスプロバイダーによって使用されます。

複数組織アカウント機能は、デフォルトでは有効になっていません。有効にするには、[Datadog サポート][1]にお問い合わせください。

## 機能 {#capabilities}

ユーザーは、親組織および複数の子組織に追加できます。ユーザーは[ユーザーアカウント設定メニュー][2]から組織を切り替えます。

親組織内の組織は、互いのデータにアクセスできません。組織間メトリクスクエリを有効にするには、[組織間可視性][3]を参照してください。

親組織は、個々の子組織の利用状況を見ることができるため、利用傾向を追跡することができます。

アカウント設定 (許可リストに登録された IP アドレスなど) は、親組織から子組織へ継承されません。

## 子組織 {#child-organizations}

### 作成 {#create}

1. 機能を有効にしたら、[新規組織ページ][4]を参照してください。
2. 作成する子組織の名前を入力します。**子組織名は 32 文字を超えることはできません。**
3. オプションで、管理者ユーザーを子組織に招待します。
    - 1 つ以上のメールアドレスを入力します。
    - 招待されたユーザーには [Datadog 管理者ロール][5]が割り当てられます。組織の作成後に組織の設定で
ユーザーを追加招待できます。
    - ユーザーがパスワードを持っていない場合、Datadog は、パスワードを設定し、新しい子組織に参加するためのリンクを持つ招待メールを送信します。
4. {{< ui >}}Create{{< /ui >}} をクリックします。

新しい子組織は親組織のプランを継承し、親組織の請求アカウントに追加されます。子組織の請求情報を更新する場合は、[営業担当者にお問い合わせ][6]ください。

### コンテンツ {#content}

一連のベースラインダッシュボードおよびモニターを使用した新しい子組織のオンボーディングは、[Datadog API][7] や Terraform などのツールを使用してプログラムで実行できます。[Terraform による Datadog の管理][8]を参照してください。さらに、スクリプトを使用して、既存のダッシュボードや[モニター][9]をコードとしてバックアップすることもできます。

### カスタムサブドメイン {#custom-sub-domains}

カスタムサブドメイン機能は、デフォルトでは有効になっていません。有効にするには、[Datadog サポート][1]にお問い合わせください。

複数の組織のメンバーである場合、カスタムサブドメインはアラートや通知のソースを特定するのに役立ちます。また、サブドメインに関連付けられた組織に即座に切り替えることもできます。

たとえば、URL **https:{{< region-param key=dd_full_site >}}/event/event?id=1**は組織 A のイベントに関連付けられています。ユーザーが組織 A と組織 B の両方のメンバーでありながら、組織 B のコンテキスト内で Datadog を表示している場合、その URL は `404 Not Found error` を返します。ユーザーは [ユーザーアカウント設定メニュー][2] を使用して組織 A に切り替えてから、その URL に再度アクセスする必要があります。しかし、カスタムサブドメインを使用すれば、ユーザーは**https://org-a.{{< region-param key=dd_site >}}/event/event?id=1**に移動することで、自動的にユーザーのコンテキストを組織 A に切り替え、正しいページを表示できます。**注**: カスタム Datadog サブドメインをお持ちの場合は、Datadog ドキュメントのリンクをご自身のサブドメイン名で手動で編集してください。たとえば、**https:{{< region-param key=dd_full_site >}}/account/settings**にリダイレクトするリンクは、**https://<custom_sub-domain_name>.{{< region-param key=dd_site >}}/account/settings** になります。

## SAML のセットアップ {#set-up-saml}

SAML のセットアップは、親組織から子組織に_継承されません_。SAML は、各子組織に対して個別に構成する必要があります。

複数組織向けに SAML を構成するには、

1. 新しい組織を作成します。
2. SAML ユーザーを招待します。
3. SAML ユーザーとしてログインし、[SAML をセットアップ][10]します。

### SAML 厳格モードの親組織 {#saml-strict-parent-organizations}

状況によっては、新しく作成した子組織にアクセスできない場合があります。組織がユーザーに対して SAML を使用したログインを要求する場合、そのユーザーアカウントにはパスワードが存在しない可能性があります。子組織は親組織から SAML 設定を継承しないため、子組織へのログインには存在しないパスワードが必要になります。

SAML 厳格モードの親組織から作成された子組織に確実にログインするには、親組織で次の手順を実行します。
1. 左側のナビゲーション下部にあるアカウントメニューから {{< ui >}}Organization Settings{{< /ui >}} をクリックするか、[個人設定] ページ上部のヘッダー dropdown で {{< ui >}}Organization Settings{{< /ui >}} を選択します。
2. 左側のページメニューで、{{< ui >}}Users{{< /ui >}} を選択します。
3. ユーザープロファイルを選択します。
4. {{< ui >}}Override Default Login Methods{{< /ui >}} トグルをオンに設定します。
5. {{< ui >}}Select user's login methods{{< /ui >}} で、{{< ui >}}Password{{< /ui >}} チェックボックスを選択します。
6. アカウントにパスワードが設定されていることを確認します。パスワードの設定についてサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

上記の手順に従うことで、メールアドレスとパスワードの組み合わせを使用して親アカウントにログインできるようになります。子組織の作成後は、メールアドレスとパスワードを使用してその組織にログインすることもできます。

すでに子組織を作成していてロックアウトされている場合は、手順に沿って操作することでログインできます。

## 複数組織の使用状況 {#multi-org-usage}

親組織は、左下のユーザー名にカーソルを合わせて [**Plan & Usage** > **Usage & Cost**][11] に移動することで、すべての組織 (子組織および親組織) の合計使用状況および課金対象の使用状況を表示できます。

Usage ページには、親組織およびそのすべての子組織における使用状況の集計が表示されます。Usage ページには 2 つのタブがあります。

* {{< ui >}}Overall{{< /ui >}}
* {{< ui >}}Individual Organizations{{< /ui >}}

### 全体の使用状況 {#overall-usage}

このタブには、Month-to-Date Total Usage セクションと Overall Usage セクションが含まれています。

Month-to-Date Total Usage セクションには、親組織およびすべての子組織にわたって当月使用したホスト、コンテナ、カスタムメトリクス、その他プラットフォームのあらゆる部分における月初からの使用状況の概要が表示されます。

{{< img src="account_management/multi-org-v2.png" alt="月初からの使用状況" >}}

ほとんどのアカウントでは、デフォルトで「課金対象」の使用状況を表示できます。ここには、最終的な請求額に影響する使用状況が表示されます。この表示では、コミットメントや割り当てを超えたオンデマンド使用状況も内訳として表示されます。「すべて」表示では、製品トライアルなどの課金対象外の使用状況を含む、すべての使用状況を確認できます。

[Overall Usage] セクションには、過去 6 か月間にわたるすべての組織の月次集計使用状況が表示されます。ここに表示される使用状況は「課金対象」ではなく「すべて」の使用状況です。つまり、最終的な請求額の計算に使用されるトライアル期間やその他の請求変更は調整されません。この情報は CSV ファイルとしてダウンロードできます。

{{< img src="account_management/multi-org-v2-trends.png" alt="全体の使用状況の長期トレンド" >}}

Month-to-Date Total Usage セクションと Overall Usage セクションはどちらも、製品固有のサブタブをクリックして絞り込むことができます。Log Management サブタブでは Logs Usage by Index テーブルを表示できます。このテーブルには、当月および先月のインデックス化されたログ使用状況が以下別に表示されます。

* インデックス名
* 組織
* 保持期間 (日数)
* ライブログとリハイドレートログの内訳別に分類されたインデックス化ログ数
* 全体的なインデックス化ログの使用状況に対するインデックスの貢献割合

このデータは CSV ファイルとしてダウンロードできます。

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="複数組織のインデックス別ログ使用状況" >}}

### 個々の組織の使用状況 {#individual-organization-usage}

{{< ui >}}Individual Organizations{{< /ui >}} 使用状況タブでは、子組織の使用状況を絶対単位または合計使用状況に対する割合で表示できます。

デフォルトの表示は「課金対象」表示であり、最終的な請求額に影響する使用状況が表示されます。この表示では、トライアル組織などの課金対象外の子組織が除外され、請求額の要因をより正確に把握するための調整が行われます。「すべて」表示に切り替えると、親組織およびすべての子組織の未調整の生の使用状況を確認できます。どちらの表示も CSV ファイルとしてダウンロードできます。

子組織の[使用状況の詳細][12]を表示するには、子組織の名前をクリックします。

## 使用属性 {#usage-attribution}

親組織は、[使用属性][13]ページで既存のタグキーごとに子組織の使用状況を確認できます。管理者は左下のユーザー名にカーソルを合わせ、[**Plan & Usage > Usage Attribution**][14] に移動できます。

親組織レベルで有効にすると、使用属性にはすべての組織にわたって集計された使用状況が表示されます。これは、子組織の使用状況を特定のプロジェクト、チーム、その他のグループに割り当てたい場合に役立ちます。

機能:

* 新しいタグキーの変更および追加 (最大 3 つ)。
* UI および TSV (タブ区切り値) ファイルのダウンロードによる月間使用状況へのアクセス
* ほとんどの種類の日次使用量 (.tsv ファイル) にアクセス。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="月次使用属性レポート" style="width:100%;" >}}

使用属性は、子組織レベルで有効にすることもできます。このレベルで有効にすると、タグはその特定の子組織にのみ適用され、その子組織内でのみ表示できます。子組織レベルで適用されたタグはロールアップされず、親組織で表示することはできません。

使用属性は、Enterprise プランに含まれる高度な機能です。その他のプランについては、アカウント担当者または [success@datadoghq.com][6] にご連絡ください。

## 参考資料 {#further-reading}

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