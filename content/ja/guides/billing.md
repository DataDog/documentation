---
last_modified: 2017/02/11
translation_status: complete
language: ja
title: 課金に関するFAQ
---

<!-- #### Welcome to Datadog! We occasionally receive questions regarding the specifics
of our pricing; the basic plans and the most frequently seen questions can be
found below.

## Plan Overview

There are three plans within Datadog:


1. **Free** is only for 5 hosts or less. Free has a single day of data retention. The
    good news is that switching from the Free plan to Pro will not affect your
    setup, so anything you've begun monitoring would not be affected by that status
    change.
1. **Pro** is for 6-499 hosts and comes with 13 months of data retention.
    Pro includes metric alerts and email support.
1. **Enterprise** is for
    1,000+ hosts or any number of hosts but needing custom adjustments to what is
    offered in the Pro plan. Enterprise includes phone support and pricing is based on three factors:
    1. Data retention requirements and number of custom metrics (base plan includes 1 year retention,
and 100 custom metrics)
    1. Size of your environment in servers
    1. Payment terms (month to month or annual prepaid) -->

### Datadogへようこそ!

基本的な料金プランの説明と使用料に関するFAQを以下に紹介します。

#### 料金プランの概要

Datadogのモニタリングサービスには３種類の料金プランがあります:

1. **Free プラン(無償)** は、5台以下のホスト構成のユーザに対し適用します。Freeプランでは、モニタリングデータの保管期間は1日になります。Free プランからPro プランへの変更においては、Free プランで使っていた設定は全て引き継がれます。従って、既にモニタリングしているシステムがあっても、プラン変更によって影響を受けることはありません。

2. **Pro プラン** は、1-1000台のホスト構成のユーザに対して適用します。Pro プランでは、モニタリングデータの保管期間は13ヵ月になります。 Pro プランには、メトリクスアラートとemailのサポートが含まれてます。

3. **Enterprise プラン** は、1000台以上のホスト構成のユーザ、又は、Pro プランのサービス内容に対して特別な調整が必要なユーザを対して適応します。大企業向けやMSP向けの特殊な機能は、このプランでしか提供されていません。

   - Enterprise プランの価格設定の基準は、次の項目になります:
   1. データの保管期間の要件と、想定されるメトリクスの数(基本プランには、保管期間 13ヵ月とカスタム メトリクス 100個/host のが含まれます)
   2. 監視対象下にあるいホストの総数
   3. 支払い条件 (月払い、年払い、など)


<!-- Custom metrics are supported in every plan. A custom metric is any metric that is not automatically collected by any of [Datadog’s integrations](https://www.datadoghq.com/product/integrations/)—for example custom checks or API-level metrics from your application. Each host may submit up to 100 custom metrics at no additional cost.

Docker Containers are also supported in every plan. Each host may submit metrics from 10 containers an hour at no additional cost. Additional containers will be billed at $0.002 per container per hour. In addition, Enterprise customers can purchase prepaid containers at $1 per container per month.
 -->

カスタムメトリックはすべてのプランでサポートされています。 カスタムメトリックとは、アプリケーションのカスタムチェックやAPIレベルのメトリックなど、[Datadogが提供するインテグレーション](https://www.datadoghq.com/product/integrations/)によって収集されるもの以外のメトリックです。 各ホストには、追加コストなしで最大100個のカスタムメトリックを送信することができる容認枠が付いています。

全ての料金プランでDocker コンテナもサポートしています。 各ホストは、10個のコンテナからのメトリックを追加コストなしで送信することができます。 10個目移行のコンテナは1コンテナ/時間あたり$0.002で請求されます。 更に、エンタープライズ プランを選択している場合は、1コンテナ/月あたり$1.00を前払いし、事前にコンテナ枠を購入することもできます。　


<!-- Pro and Enterprise data retention is for one year at full resolution (maximum
is one point per second). For greater data retention needs, please reach out to <a href="mailto:sales@datadoghq.com">
sales@datadoghq.com</a>. -->

Pro プランとEnterprise プランのデータ保管期間はフル解像度(1ポイント/秒）で、13ヵ月です。一般的なプランとして提供しているデータ保管期間より長い期間をご希望の場合は、サポートチームまでご連絡ください。[sales@datadoghq.com](mailto:sales@datadoghq.com)


<!-- **Each invoice is determined by the high watermark of concurrently running hosts for that month.**

This is per active host in Datadog, whether or not it's running the agent. -->

**その月の請求書を計算するための基礎ホスト数は、Datatogのバックエンドが特定時間にメトリクスデータを受信していたホスト数の最大値によって算出されます。**

ホスト数は、Datadog Agent を実行しているかどうかにかかわらず、Datadog側でアクティブなホストとして把握されている台数となります。


<!-- ####Frequently Asked Questions

**Do you support hourly pricing?**
{:#do-you-support-hourly-pricing}

Yes. Our standard hourly rate for Datadog Pro is $0.03 per host per hour. You
can choose to pay for all of your monitored hosts hourly, or commit to a subset
of hosts upfront on a monthly or annual plan and pay any additional hosts on an
hourly basis, billed at the end of each month. This works out to be much less
expensive for extra hosts that may come up for a short period, but a bit more
than monthly/annual rates if you ran on an hourly rate all the time.
 -->

#### FAQ　(よくあるお問い合わせ)

**時間課金でサービス使用料を計算し、請求を受けることはできますか？**
{:#do-you-support-hourly-pricing}

はい。 Datadog のPro プランでは、1host/時間あたり$0.03で、サービス使用料を計算することができます。この時間計算方式を監視対象全ホストに適応することができます。それとは別に、毎月確実に発生するホスト数分を通常の料金計算方式と固定指定し、そのホスト台数を超過した部分に対してのみ1時間ベースで支払いを発生させることができます。

時間計算方式は、ライフサイクルの短いホストを追加で同時に起動してる場合には、出費を押さえる効果がありますが、1ヵ月に70％以上の稼働のあるホストでは、結果として割高な料金になります。


<!-- ##### Do non-reporting or inactive hosts count?
{:#do-non-reporting-or-inactive-hosts-count}

Non-reporting hosts (status '???') do not count towards billing. It might take
some time (up to 24 hours) for the hosts with the inactive status '???' to drop
out of the infrastructure view.
 -->

**Datadog側で、データを受信できないホストとか、非アクティブなホストは、請求基準の総数に入りますか?**
{:#do-non-reporting-or-inactive-hosts-count}

データを受信できないホスト(`Status` 欄が '???')は、請求基準には含まれません。尚、Dashboaradの`Infrastructure` ページの`Status` 欄に'???'が表示されているホストは、掲載されなくなるまでに最長で24時間を必要とします。

<!--
A transient server that you monitored in Datadog for a short period of time
will clear out of the infrastructure view after 24 hours of not reporting any
data. We will still however retain the historical data (for a paid account),
and you can graph it on a dashboard if you know the specific host by name (or
by its tags).
-->

つかの間の稼働を前提にしているホストの監視にDatadog を使った場合、そのホストからデータポイントを受信できなくなった後、最長24時間で`Infrastructure` ページに表示されなくなります。Free プラン以外では、ダッシュボードにホスト名が表示されなくなった後も、既存データはバックエンドで保管しています。`Infrastructure` ページに載っていないホストでも、対象ホスト名やタグ情報が分かれば、転送済みのデータを基にダッシュボード上のグラフにそのホストの情報を表示することができます。


<!-- ##### How will an AWS integration impact my monthly billing?
{:#how-will-an-aws-integration-impact-my-monthly-billing}

We bill for all hosts running the **Agent** as well as for all **EC2 instances**
picked up by the AWS integration. You will not get billed twice if
you are running the Agent on an EC2 instance picked up by the AWS
integration.

Other AWS resources (e.g. ELB, EBS, RDS, Dynamo) are not currently
part of monthly billing. Note that this may change in the future.

If you would like to control which AWS metrics you are collecting,
select 'limit metric collection for all accounts' in the <a href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services"> AWS Integration tile</a> and customize accordingly.

If you would like to control which AWS metrics you are collecting,
select 'limit metric collection for all accounts' in the
[AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services) and customize accordingly.
 -->

**AWS Ingegrationを利用する場合、毎月の請求額はどのように変化しますか?**
{:#how-will-an-aws-integration-impact-my-monthly-billing}

Datadogからの請求は、**Datadog Agent** を実行しているホストとAWS Integrationで検知できた全 **EC2インスタンス** を対象にしています。
AWS Integrationによって検知されたEC2インスタンスで Datadog Agent が稼働しているものは、二重で課金対象として計算されることはありません。

その他のAWSリソース (例: ELB, EBS, RDS, Dynamo) は、現時点では請求の対象外です。
尚、この無償での提供は、将来変更される可能性があります。

もし、AWS Integration によ検知されるホストやメトリクスを制限したい場合は、ダッシュボードからIntegrationsタブを選択し、[AWS Integration タイル](https://app.datadoghq.com/account/settings#integrations/amazon_web_services)を選択した後、ホップアップ表示の内で設定をしてください。


<!-- ##### How will a VMware integration impact my monthly billing?

The base pricing is $15 per virtual machine per month. See above for more general information. -->

**VMware Ingegrationを利用する場合、毎月の請求額はどのように変化しますか?**
{: #how-will-a-vmware-integration-impact-my-monthly-billing}

VMwareの仮想マシンごとに月額$18で請求が発生します。詳細は、上記の基本プランの項目を参照してください。


<!-- ##### How do I see what I'll get charged for this current month?
{:#how-do-i-see-what-ill-get-charged-for-this-current-month}

There is not currently a way to see what the upcoming bill looks like; as an
admin you can [review past invoices here](https://app.datadoghq.com/account/billing_history).
 -->

**今月の請求額を知る方法はありますか?**
{: #how-do-i-see-what-ill-get-charged-for-this-current-month}

現状、ユーザが今月末の請求金額を知る方法は準備できていません。しかしながら、Datadogの管理者権限がある場合は、[過去の請求書の状況](https://app.datadoghq.com/account/billing_history)に関しては見ることができます。


<!-- ##### Can I set a specific email address to receive invoices at?
{:#can-i-set-a-specific-email-address-to-receive-invoices-at}

You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com)
<a href="https://app.datadoghq.com/account/billing">here</a>.
 -->

**請求書を受信するために、アカウント登録とは別のメールアドレスを設定することはできますか？**
{: #can-i-set-a-specific-email-address-to-receive-invoices-at}

請求書の受信用に別のメールアドレスを設定することは可能です。更にそのメールアドレスが、チームメンバーとしてDatadogに登録されてなくても大丈夫です。(例: invoices@yourcompany.com)

ダッシュボードの[`ユーザ名` タブ -> `billing`](https://app.datadoghq.com/account/billing)から設定ができます。
