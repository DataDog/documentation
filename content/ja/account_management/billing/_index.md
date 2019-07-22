---
title: 課金
kind: documentation
---
## 概要

課金サイクルは、いつサインアップしたかに関係なく月初から始まります。最初の月は、実際のサインアップ日に基づいて日割り計算されます。

Datadog は、ホスト、コンテナ、カスタムメトリクスの数を毎時間測定します。ホストとコンテナの課金対象数は、この下位 99 % の時間の最大数として月末に計算されます。上位 1% を除外することで、使用量の短期急上昇が課金額に影響しないようにしています。カスタムメトリクスの課金対象数は、その月のカスタムメトリクスの時間平均として計算されます。Datadog で[使用量][1]を確認できます。

### ホスト

ホストは、Datadog Agent がインストールされているすべてのインスタンスに、インテグレーションを使用して監視されているすべての AWS EC2、GCP、Azure、vSphere VM を加えた数として定義されます。Agent がインストールされている EC2 または VM は、1 つのインスタンスとしてカウントされます (二重課金されません)。

報告を行っていないホスト ([インフラストラクチャーリスト][2]でステータスが `???`) は、課金の対象になりません。そのようなホストが[インフラストラクチャーリスト][2]から除外されるまで、最大 24 時間かかることがあります。Datadog は、これらのホスト (有料アカウント) の履歴データを保持します。ホスト名またはタグがわかれば、メトリクスをダッシュボードでグラフ化できます。

### コンテナ

ホストごとに 1 つのコンテナ Agent を使用してコンテナを監視することをお勧めします。この Agent は、コンテナとホストの両方のメトリクスを収集します。Agent をコンテナに直接インストールした場合は、各コンテナが課金対象のホストとしてカウントされます。詳細については、[Agent のインストールに関するドキュメント][3]を参照してください。

## 請求

クレジットカード払いの場合は、[管理者][4]に [Billing History][5] で前月の領収書が発行されます。

小切手または振込払いの場合は、期日になると請求書が請求メールアドレスに送信されます。他の形式の請求書等が必要な場合は、[Datadog の課金窓口][6]までメールでお問い合わせください。

### 請求メール

[Plan][7] ページの **Manage Billing Emails** で、請求書を受け取るためのメールアドレスを設定できます。

{{< img src="account_management/billing/billing01.png" alt="Manage Billing Emails" responsive="true">}}

**注**: このメールアドレスは、Datadog 内のチームメンバーでなくてもかまいません。たとえば、`invoices@yourcompany.com` を使用できます。

## その他の参考資料

{{< whatsnext desc="課金に関するトピック:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}料金{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_details/" >}}使用量の詳細{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}クレジットカード{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}カスタムメトリクス{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}コンテナ{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}ログ管理{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}AWS インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Azure インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Google Cloud インテグレーション{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}vSphere インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ja/graphing/infrastructure
[3]: /ja/agent
[4]: /ja/account_management/team/#datadog-user-roles
[5]: https://app.datadoghq.com/account/billing_history
[6]: mailto:billing@datadoghq.com
[7]: https://app.datadoghq.com/account/billing