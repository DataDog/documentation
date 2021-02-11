---
title: 課金
kind: documentation
---
## 概要

課金サイクルは、いつサインアップしたかに関係なく月初から始まります。最初の月は、実際のサインアップ日に基づいて日割り計算されます。

Datadog は、ホストとカスタムメトリクスの数を毎時間測定します。ホストの課金対象数は、この下位 99 % の時間の最大数として月末に計算されます。上位 1% を除外することで、使用量の短期急上昇が課金額に影響しないようにしています。カスタムメトリクスの課金対象数は、その月のカスタムメトリクスの時間平均として計算されます。Datadog で[使用量][1]を確認できます。請求ページは Datadog の管理者権限を有するユーザーのみアクセス可能です。

### ホスト

ホストは、Datadog Agent がインストールされているすべてのインスタンスに、インテグレーションを使用して監視されているすべての AWS EC2、GCP、Azure、vSphere VM を加えた数として定義されます。Agent がインストールされている EC2 または VM は、1 つのインスタンスとしてカウントされます (二重課金されません)。

報告を行っていないホスト ([インフラストラクチャーリスト][2]でステータスが `???`) は、課金の対象になりません。そのようなホストが[インフラストラクチャーリスト][2]から除外されるまで、最大 2 時間かかることがあります。Datadog は、これらのホスト (有料アカウント) の履歴データを保持します。ホスト名またはタグがわかれば、メトリクスをダッシュボードでグラフ化できます。

### コンテナ

ホストごとに 1 つのコンテナ Agent を使用してコンテナを監視することをお勧めします。この Agent は、コンテナとホストの両方のメトリクスを収集します。Agent をコンテナに直接インストールした場合は、各コンテナが課金対象のホストとしてカウントされます。詳細については、[Agent のインストールに関するドキュメント][3]を参照してください。

### サーバーレス

請求は、アカウントの 1 か月間の 1 時間あたりの平均関数の数に基づきます。Datadog では、1 回以上実行された、Datadog アカウントで監視されている関数の数を 1 時間ごとに記録します。月末に、記録された関数の時間当たり平均数が算出され、請求に反映されます。

Pro および Enterprise プランには、請求対象の関数ごとに 150,000 件の Indexed Span と 5 個のカスタムメトリクスが含まれます。サーバーレス APM の請求は、Datadog APM サービスに送信された [Indexed Span][4] のうち、バンドルされた数量を超過した総数に基づき、月末に課金されます。サーバーレス使用時は、請求可能な [APM ホスト][4]はありません。

**注** Analyzed Span は、2020 年 10 月 20 日の Tracing Without Limits のローンチに伴い、Indexed Span と改名しました。

詳細については、[サーバーレス請求ページ][5]および[Datadog 料金ページ][6]を参照してください。

## 請求

クレジットカード払いの場合は、[管理者][7]に [Billing History][8] で前月の領収書が発行されます。

小切手または振込払いの場合は、期日になると請求書が請求メールアドレスに送信されます。他の形式の請求書等が必要な場合は、[Datadog の課金窓口][9]までメールでお問い合わせください。

### 請求メール

[Plan][10] ページの **Manage Billing Emails** で、請求書を受け取るためのメールアドレスを設定できます。

{{< img src="account_management/billing/billing01.png" alt="請求メールの管理" >}}

**注**: このメールアドレスは、Datadog 内のチームメンバーでなくてもかまいません。たとえば、`invoices@yourcompany.com` を使用できます。

## その他の参考資料

{{< whatsnext desc="請求に関するトピック:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}料金{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}使用料の詳細{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}使用量のメトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}クレジットカード{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}カスタムメトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}コンテナ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}ログ管理{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_distributed_tracing/" >}}APM と分散型トレース{{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}サーバーレス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}リアルユーザーモニタリングに関するよくあるご質問{{< /nextlink >}}
    {{< nextlink href="account_management/billing/profiler/" >}}継続的なプロファイリングに関するよくあるご質問{{< /nextlink >}}
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
[6]: https://www.datadoghq.com/pricing/#included_serverless_functions-d
[7]: /ja/account_management/users/default_roles/
[8]: https://app.datadoghq.com/account/billing_history
[9]: mailto:billing@datadoghq.com
[10]: https://app.datadoghq.com/account/billing