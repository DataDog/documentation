---
description: Datadog 製品の請求サイクル、お支払い方法、使用量の計算、ホストのカウント方法、および詳細な料金情報について説明します。
title: 請求
---
## 概要 {#overview}

請求サイクルは、サインアップした時期に関係なく、毎月 1 日 (UTC) に開始します。初月は、実際のサインアップ日に基づいて日割り計算されます。

Datadog は、ホスト数と Custom Metrics の数を 1 時間ごとに計測します。使用量の下位 99% の最大カウント (ハイウォーターマーク) を使用して月末に請求対象ホスト数を計算します。Datadog は使用量の上位 1 % を除外し、使用量の急増が請求に与える影響を軽減します。Custom Metrics の課金対象数は、その月の Custom Metrics 平均時間数に基づきます。Datadog の [使用方法][1] を確認してください。請求ページには、Datadog Admin ロールを持つユーザーのみがアクセスできます。

### ホスト {#hosts}

ホストとは、Datadog で監視する対象の物理または仮想 OS インスタンスです。サーバー、VM、ノード (Kubernetes の場合)、App Service Plan インスタンス (Azure App Service の場合)、Heroku dyno (Heroku プラットフォームの場合) などが該当します。ホストには、Datadog Agent がインストールされたインスタンスのほか、Datadog インテグレーションで監視される Amazon EC2、Google Cloud、Azure、または vSphere の VM も含まれます。Agent がインストールされた EC2 や VM は、単一のインスタンスとしてカウントされます (二重課金はされません)。

レポートを送信しないホスト ([Infrastructure List][2] (インフラストラクチャーリスト) でステータスが `INACTIVE` であるホスト) は、課金対象としてカウントされません。これらのホストが [Infrastructure List][2] から除外されるまで、最大 2 時間かかる場合があります。Datadog は、これらのホストの履歴データを保持します (有料アカウント)。特定のホスト名やタグを指定することで、メトリクスをダッシュボードにグラフ化できます。

### コンテナ {#containers}

ホストごとに 1 つのコンテナ化された Agent で複数のコンテナを監視することをお勧めします。この Agent は、コンテナとホストの両方のメトリクスを収集します。各コンテナに Agent を直接インストールすることを選択した場合、課金の観点からは各コンテナが 1 つのホストとしてカウントされます。詳細については、[Agent のインストール][3]というドキュメントをご覧ください。

### Serverless {#serverless}

Datadog の請求は、お客様のアカウントにおける各月の 1 時間あたり平均関数数に基づいて行われます。Datadog は 1 時間ごとに、1 回以上実行され、Datadog アカウントで監視されている関数の数を記録します。月末に、Datadog は記録された 1 時間あたりの関数数の平均を計算して請求します。Pro プランおよび Enterprise プランには、課金対象の関数ごとに 5 つの Custom Metrics が含まれています。

Serverless APM の課金は、その月に APM に取り込まれたスパンに接続された AWS Lambda 呼び出し合計数に基づきます。また、Datadog APM サービスに送信された[インデックス化されたスパン][4]の総数が、バンドルされた数量を超えた分についても、月末に請求されます。Serverless を使用する場合、課金対象となる [APMホスト][4]はありません。

詳細については、[Serverless の課金ページ][5]および[Datadog の料金ページ][6]を参照してください。

### IoT {#iot}

Datadog では、IoT デバイスの数を 1 時間ごとに計測します。IoT デバイスの課金対象数は、月末に、その月の各時間における使用数の下位 99 パーセントの最大数 (ハイウォーターマーク) を使用して計算されます。上位 1 パーセントは除外されるため、使用量の急増が請求額に与える影響を抑えることができます。

IoT の課金に関する詳細については、[Datadog の料金ページ][7]を参照してください。

## プランの詳細 {#plan-details}

{{< ui >}}Payment Method{{< /ui >}}を管理し、{{< ui >}}Subscription Details{{< /ui >}}を表示するには、Datadog Admin ユーザーである必要があります。

または、Billing Read (`billing_read`) および Contract Read (`contract_read`) の [権限][8] を持つロールでも、このデータを表示できます。お支払い方法を管理するには、Billing Edit (`billing_edit`) も必要です。

### お支払い方法の管理 {#managing-your-payment-method}

[**Payment Method**][9] (支払い方法) セクションには、お支払い方法の詳細が記載されています。

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="プランページでの支払い方法" style="width:90%;" >}}

{{< ui >}}Edit Payment{{< /ui >}}には、お支払い方法を管理するオプションがあります。カードの編集や削除ができるほか、お支払い方法をカードから請求書へ、またはその逆へ変更するようリクエストすることも可能です。

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="プランページでの支払い設定" style="width:90%;" >}}

### 請求連絡先の管理 {#managing-your-billing-contact-details}

請求連絡先は、[**Billing Contact Details**][9] (請求連絡先の詳細) セクションで確認できます。

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="プランページでの請求連絡先" style="width:90%;" >}}

{{< ui >}}Edit Details{{< /ui >}}で請求先住所を追加、編集、または削除してください。請求書の送付先となるメールアドレスを指定することもできます。

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="プランページでの請求連絡先の編集" style="width:90%;" >}}

**注**: メールアドレスの所有者が Datadog のチームメンバーである必要はありません。たとえば、`invoices@example.com` を使用できます。

### サブスクリプションの詳細を表示する {#view-your-subscription-details}

[Subscription Details][9] (サブスクリプションの詳細) セクションには、すべてのコミット済み製品の数量、契約価格、およびオンデマンド価格が含まれています。

{{< img src="/account_management/billing/subscription_details.png" alt="[Subscription Details] (サブスクリプションの詳細) セクションが強調表示された [Account Plan & Usage] (アカウントのプランと使用量) ページ" style="width:90%;" >}}

**注**: Datadog Partner を通じて請求が直接管理されている場合、[Subscription Details] は使用できません。

## 支払い {#payment}

お支払い方法には 2 つの選択肢があります。
- クレジットカード
- 請求書払い (ACH、電信送金、または小切手)

### クレジットカード {#credit-card}

クレジットカードでお支払いの場合、[Administrators][10] (管理者) は [Billing History][11] (請求履歴) から過去の月の領収書を入手できます。請求書のコピーが必要な場合は、[Datadog 請求担当][13]までメールでお問い合わせください。

詳細については、[クレジットカード請求][12]を参照してください。

### 請求書払い {#invoicing}

小切手、ACH、または電信送金でお支払いの場合、請求書は毎月第 10 営業日頃に請求先メールアドレスへ送信されます。追加のコピーをリクエストするには、[Datadog 請求担当][13]までメールでお問い合わせください。支払いの送金先に関する詳細情報は、請求書に記載されています。

## お問い合わせ {#contact}

| ご質問やご懸念                                                                                                                                                                               | お問い合わせ                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| 異議申し立ておよびクレジットに関するリクエスト<br>使用量<br>お支払い方法の変更<br>お支払いに関する懸念事項<br>アカウント全般に関する懸念事項<br>連絡先の更新<br>アカウント明細書<br>請求先および配送先情報の更新 | success@datadoghq.com        |
| 請求書のコピー<br>時間的制約のある請求についてのリクエスト<br>請求の内訳<br>ポータルへの招待                                                                                                        | billing@datadoghq.com        |
| 送金                                                                                                                                                                                | remittances@datadoghq.com    |
| 発注書のコピー                                                                                                                                                                             | purchaseorders@datadoghq.com |

## 参考資料 {#further-reading}

{{< whatsnext desc="請求に関する個々のトピック:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}料金{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}使用量の詳細{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}使用量メトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}クレジットカード{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Log Management{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (分散型トレーシングおよび継続的プロファイラー){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}使用の帰属{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credits/" >}}AI クレジット{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credit_limits/" >}}AI クレジット制限事項{{< /nextlink >}}
{{< /whatsnext >}}



[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ja/infrastructure/
[3]: /ja/agent/
[4]: /ja/account_management/billing/pricing/#apm
[5]: /ja/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /ja/account_management/rbac/permissions/#billing-and-usage
[9]: https://app.datadoghq.com/billing/plan
[10]: /ja/account_management/rbac/#datadog-default-roles
[11]: https://app.datadoghq.com/account/billing_history
[12]: /ja/account_management/billing/credit_card/
[13]: mailto:billing@datadoghq.com