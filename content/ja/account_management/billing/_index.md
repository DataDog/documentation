---
kind: documentation
title: 課金
---

## 概要

課金サイクルは、いつサインアップしたかに関係なく月初から始まります。最初の月は、実際のサインアップ日に基づいて日割り計算されます。

Datadog は、ホストとカスタムメトリクスの数を毎時間測定します。ホストの課金対象数は、この下位 99% の時間の最大数として月末に計算されます。上位 1% を除外することで、使用量の短期急上昇が課金額に影響しないようにしています。カスタムメトリクスの課金対象数は、その月のカスタムメトリクスの時間平均として計算されます。Datadog で[使用量][1]を確認できます。請求ページは Datadog の管理者権限を有するユーザーのみアクセス可能です。

### ホスト

ホストとは、Datadog で監視する実際のまたはバーチャルの OS インスタンスで、サーバー、VM、ノード（Kubernetes の場合）、または App Service Plan インスタンス（Azure App Service の場合）などがあります。Datadog Agent がインストールされているすべてのインスタンスのほか、Datadog インテグレーションを使用して監視されているすべての AWS EC2、GCP、Azure、vSphere VM がホストになり得ます。Agent がインストールされている EC2 または VM は、1 つのインスタンスとしてカウントされます (二重課金されません)。

報告を行っていないホスト ([インフラストラクチャーリスト][2]でステータスが `???`) は、課金の対象になりません。そのようなホストが[インフラストラクチャーリスト][2]から除外されるまで、最大 2 時間かかることがあります。Datadog は、これらのホスト (有料アカウント) の履歴データを保持します。ホスト名またはタグがわかれば、メトリクスをダッシュボードでグラフ化できます。

### コンテナ

ホストごとに 1 つのコンテナ Agent を使用してコンテナを監視することをお勧めします。この Agent は、コンテナとホストの両方のメトリクスを収集します。Agent をコンテナに直接インストールした場合は、各コンテナが課金対象のホストとしてカウントされます。詳細については、[Agent のインストールに関するドキュメント][3]を参照してください。

### サーバーレス

請求は、アカウントの 1 か月間の 1 時間あたりの平均関数の数に基づきます。Datadog では、1 回以上実行された、Datadog アカウントで監視されている関数の数を 1 時間ごとに記録します。月末に、記録された関数の時間当たり平均数が算出され、請求に反映されます。Pro プランと Enterprise プランには、請求対象関数ごとに 5 つのカスタムメトリクスが含まれています。

サーバーレス APM の請求は、ある月の APM 取り込みスパンに接続された AWS Lambda の呼び出しの合計に基づきます。また、月末に Datadog APM サービスに送信された[インデックス化スパン][4]の合計がバンドル数量を超えた場合、請求されます。サーバーレス利用時に請求対象となる [APM ホスト][4]はありません。

詳細については、[サーバーレス請求ページ][5]および[Datadog 料金ページ][6]を参照してください。

### IoT

Datadog は、IoT デバイスの数を毎時間測定します。IoT デバイスの課金対象数は、この下位 99 % の時間の最大数として月末に計算されます。上位 1% を除外することで、使用量の短期的な急上昇が課金額に影響しないようにしています。

IoT のご請求に関する詳細については、[Datadog 料金ページ][7]をご参照ください。

## 請求書

お支払い方法には 2 つの選択肢があります。
- クレジットカード
- 請求 (ACH、電信送金、または小切手)

### クレジットカード

クレジットカード払いの場合は、[管理者][8]に [Billing History][9] で前月の領収書が発行されます。請求書のコピーについては、[Datadog の請求担当][10]にメールでお問い合わせください。

詳細については、[クレジットカード請求][11]を参照してください。

### 請求

小切手、ACH、または電信送金でお支払いの場合、請求書は毎月 10 営業日近くに請求先のメールアドレスにメールで送信されます。追加のコピーが必要な場合は、[Datadog の請求担当][10]にメールを送信してください。支払い先の詳細は請求書に記載されています。

### 支払い方法の管理

[**Payment Method**][12] セクションには、支払い方法の詳細が記載されています。

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="プランページの支払い方法" style="width:80%;" >}}

**Edit Payment** は、支払い方法を管理するためのオプションを提供します。カードの編集や削除、カードから請求書、またはその逆への支払い方法の変更を依頼することができます。

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="プランページの支払い設定" style="width:80%;" >}}

### 請求先情報の管理

請求先情報は、[**Billing Contact Details**][12] セクションで確認することができます。

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="プランページの請求先情報" style="width:80%;" >}}

**Edit Details** を通じて、請求先住所の追加、編集、削除を行うことができます。また、請求書を受け取るための特定のメールアドレスを設定することもできます。

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="プランページでの請求先情報の編集" style="width:80%;" >}}

**注**: このメールアドレスは、Datadog 内のチームメンバーでなくてもかまいません。たとえば、`invoices@yourcompany.com` を使用できます。

## お問い合わせ

| ご質問等                                                                                                                                                                               | お問い合わせ                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| 異議申し立てとクレジットリクエスト<br>使用量<br>支払い方法の変更<br>お支払いに関する問題<br>一般的なアカウントに関する問題<br>ご連絡先の更新<br>アカウントの明細<br>請求および配送情報の更新 | success@datadoghq.com        |
| 請求書のコピー<br>時間に余裕のない請求リクエスト<br>請求の内訳<br>ポータルへの招待                                                                                                        | billing@datadoghq.com        |
| 送金                                                                                                                                                                                | remittances@datadoghq.com    |
| 注文書のコピー                                                                                                                                                                             | purchaseorders@datadoghq.com |

## その他の参考資料

{{< whatsnext desc="課金に関するトピック:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}料金{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}使用料の詳細{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}使用量のメトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}クレジットカード{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}カスタムメトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}コンテナ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}ログ管理{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (分散型トレーシング & 継続的プロファイリング){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}サーバーレス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}RUM とセッションリプレイ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Alibaba インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}使用属性{{< /nextlink >}}
{{< /whatsnext >}}


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ja/infrastructure/
[3]: /ja/agent/
[4]: https://docs.datadoghq.com/ja/account_management/billing/pricing/#apm
[5]: https://docs.datadoghq.com/ja/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /ja/account_management/rbac/#datadog-default-roles
[9]: https://app.datadoghq.com/account/billing_history
[10]: mailto:billing@datadoghq.com
[11]: /ja/account_management/billing/credit_card/
[12]: https://app.datadoghq.com/billing/plan