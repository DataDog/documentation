---
last_modified: 2015/10/14
translation_status: Translated
language: ja
title: 課金に関するFAQ
kind: documentation
sidebar:
  nav:
    - header: ガイド
    - text: Datadog Agent 入門
      href: "/ja/guides/basic_agent_usage/"
    - text: Datadog が提供するサービスの概要
      href: "/ja/overview/"
    - text: Datadog へのメトリクスの送信
      href: "/ja/guides/metrics/"
    - text: Datadog Agent によるログの解析方法
      href: "/ja/guides/logs/"
    - text: Agent Check の書き方
      href: "/ja/guides/agent_checks/"
    - text: サービスチェックの設定方法
      href: "/ja/guides/services_checks/"
    - text: Chef を使ったDatadog Agent のインストール
      href: "/ja/guides/chef/"
    - text: Azure WindowsへDatadog Agentのインストール
      href: "/ja/guides/azure/"
    - text: アラート設定方法
      href: "/ja/guides/alerting/"
    - text: ダッシュボード・テンプレートの作成
      href: "/ja/guides/templating/"
    - text: SAML によるシングルサインオン　
      href: "/ja/guides/saml/"
    - text: メール経由でのイベント情報送信　
      href: "/ja/guides/eventsemail"
    - header: レファレンス
    - text: API
      href: "/ja/api/"
    - text: Libraries
      href: "/ja/libraries/"
    - text: Graphing
      href: "/ja/graphing/"
    - text: Host Names
      href: "/ja/hostnames/"
    - text: Integrations
      href: "/ja/integrations/"
    - text: DogStatsD
      href: "/ja/guides/dogstatsd/"
    - text: 課金に関するFAQ
      href: "/ja/guides/billing/"
    - text: FAQ
      href: "/ja/faq/"
---

<!-- #### Welcome to Datadog! We occasionally receive questions regarding the specifics
of our pricing; the basic plans and the most frequently seen questions can be
found below.

#### <u>Basic Plan</u>

There are three plans within Datadog:


1. **Free** is only for 5 hosts or less. Free has a single day of data retention. The
    good news is that switching from the Free plan to Pro will not affect your
    setup, so anything you've begun monitoring would not be affected by that status
    change.
1. **Pro** is for 6-499 hosts and comes with 13 months of data retention.
    Pro includes metric alerts and email support.
1. **Enterprise** is for
    500+ hosts or any number of hosts but needing custom adjustments to what is
    offered in the Pro plan. Enterprise includes phone support and pricing is based on three factors:
    1. Data retention requirements and number of custom metrics (base plan includes 13 months retention,
and 100 custom metrics)
    1. Size of your environment in servers
    1. Payment terms (month to month or annual prepaid) -->

### Datadogへようこそ!

#### 基本的な料金プランの説明と使用料に関するFAQを以下に紹介します。

---

#### <u>基本プラン</u>

Datadogのモニタリングサービスには３種類の料金プランがあります:

1. **Free プラン(無償)** は、5台以下のホスト構成のユーザに対し適用します。Freeプランでは、モニタリングデータの保管期間は1日になります。Free プランからPro プランへの変更においては、Free プランで使っていた設定は全て引き継がれます。従って、既にモニタリングしているシステムがあっても、プラン変更によって影響を受けることはありません。

2. **Pro プラン** は、1-500台のホスト構成のユーザに対して適用します。Pro プランでは、モニタリングデータの保管期間は1年になります。 Pro プランには、メトリクスアラートとemailのサポートが含まれてます。

3. **Enterprise プラン** は、500台以上のホスト構成のユーザ、又は、Pro プランのサービス内容に対して特別な調整が必要なユーザに対して適応します。

   - Enterprise プランの価格設定の基準は、次の項目になります:
   1. データの保管期間と、カスタムメトリクスの数　(基本プランには、13ヶ月のデータ保管期間と100種類のカスタムメトリクスの追加送信枠が含まれます)
   2. 運用環境下よりメトリクスを転送するホストの総数
   3. 支払い条件 (月払い、年払い、など)


<!-- For all plans, custom metrics and events are supported but limited to 100
metrics per host. Custom metrics refer to any metrics that are not part of our
regular integration suite, for example using custom checks or API-level metrics
in your application stack. To clarify, integrations that can potentially emit
an unlimited number of metrics to us can also count as custom metrics (e.g:
JMX / WMI / Nagios / Cacti).
 -->

カスタムメトリクスとイベントは、全てのプランで使うことができます。
しかし、カスタムメトリクスは、ホスト当たり100個が上限になります。
カスタムメトリクスとは、"regular integration suite" が一般的に収集するメトリクス以外のメトリクスを言います。
例えば、アプリケーションスタックで実施するカスタムチェックやAPIレベルのメトリクスが該当します。
更に明確化が必要なポイントとして、JMX、 WMI、 Nagios、 Cactiなどの無限のメトリクスをDatadogバックエンドに送信する可能性のあるIntegration は、カスタムメトリクスに分類されます。


<!-- For all plans, Docker Containers are supported and 10 free containers per host per hour will be provided.  Additional containers will be billed at $0.002 per container per hour.  In addition, Enterprise customers can purchase prepaid containers at $1 per container per month. -->

全ての料金プランで、Dockerホスト毎に1時間あたり10個のコンテナーを、単一エージェントの基本料で監視することができます。11個目以降のコンテナーに関しては、$0.002/時間の追加料金で監視することができます。また、エンタープライズの料金プランでは、追加コンテナーを$1/月で前払い購入することもできます。


<!-- Pro and Enterprise data retention is for one year at full resolution (maximum
is one point per second). For greater data retention needs, please reach out to <a href="mailto:sales@datadoghq.com">
sales@datadoghq.com</a>. -->

Pro プランとEnterprise プランのデータ保管期間はフル解像度(1ポイント/秒）で、1年です。一般的なプランとして提供しているデータ保管期間の仕様より大きなデータの保管をご希望の場合は、サポートチームまでご連絡ください。[sales@datadoghq.com](mailto:sales@datadoghq.com)


<!-- ##### Each invoice is determined by the high watermark of concurrently running hosts for that month.

This is per active host in Datadog, whether or not it's running the agent. -->

##### * 請求書は、その月に同時にデータを転送してきているホストの最大数によって算出されます。

ホスト台数は、Datadog Agent を実行しているかどうかにかかわらず、Datadogでアクティブなホストとして登録されている台数となります。


<!-- ####<u>Frequently Asked Questions</u> -->
---

#### <u>FAQ　(よくあるお問い合わせ)</u>

<!--
#####Do you support hourly pricing?

We do support hourly pricing at $0.03 per hour per host or a hybrid
of monthly and hourly. Here is how that hybrid works:

> You tell us how many hosts you will run each month and we will bill you for that baseline number of
> hosts at $15 per host (you can change this number at the beginning of each
> month if you like). Then for any hosts beyond the committed number previously
> determined, our billing system will charge you $0.03 per host per hour. This
> works out to be much less expensive for extra hosts that may come up for a
> short period, but a little bit more than monthly rates if you ran on an hourly
> rate all the time (~$23/host/month).  The metering samples how many hosts are
> reporting data once every hour, thus the minimum increment for an hourly server
> is one hour. If that number exceeds your monthly commit, we just charge overage
> for the excess hosts.
 -->

#### 時間課金で請求を発行することは、できますか？

$0.03/ホストの使用料を基に、時間課金で請求書を発行することができます。又、月極の課金形態と時間課金形態の併用も可能です。併用での支払いがどのように機能するかは、次を参照してください:

> まず、月々に請求の基本となる成約ホスト数を申請していただきます。
> ここで申請されたホスト数に対しては、1台あたり$15/月で請求します。
> 尚、この基本となる台数は、月初に変更することができます。
> この成約台数を超えた場合につき1台あたり$0.03/hrを請求します。
> 短期間しか使用しないホストが並列で起動するようなケースでは、この併用払いの方法を採用することで使用料を押さえることができます。
> しかしながら、$0.03を1ヵ月の使用料に置き換えると$23/台と、通常の1台分より割高になります。
> 課金の方法は、当該時間帯に何台のホストがデータを転送してきているかを集計します。
> 従って、１台のホストの課金の最低単位は1時間になります。
<!-- > If that number exceeds your monthly commit, we just charge overage
for the excess hosts. -->


<!-- ##### Do non-reporting or inactive hosts count?

Non-reporting hosts (status '???') do not count towards billing. It might take
some time (up to 24 hours) for the hosts with the inactive status '???' to drop
out of the infrastructure view.
 -->

#### データを受信できないホストとか、非Activeなホストは、請求基準の総数に入りますか?

データを受信できないホスト(`Status↓` 欄が '???')は、請求基準には含まれません。Dashboaradの`Infrastructure` ビューで、`Status↓` 欄に '???'が表示されているホストに対しては、ビューに掲載されなくなるまでに少々時間(最長24時間)がかかります。

<!-- <p>
A transient server that you monitored in Datadog for a short period of time
will clear out of the infrastructure view after 24 hours of not reporting any
data. We will still however retain the historical data (for a paid account),
and you can graph it on a dashboard if you know the specific host by name (or
by its tags).
</p> -->

仮サーバ等、一時的なホストの監視にDatadogを使った場合、そのホストからデータを受信できなくなった後、およそ24時間後に`Infrastructure` ビューに表示されなくなります。有償プランでは、ダッシュボードにホスト名が表示されなくなった後も、Datadogに転送されてきたデータは保管されています。対象のホスト名やタグが分かれば、転送済みデータを基にダッシュボード上にグラフを表示することができます。


<!-- ##### How will an AWS integration impact my monthly billing?

We bill for all hosts running the **Agent** as well as for all **EC2 instances**
picked up by the AWS integration. You will not get billed twice if
you are running the Agent on an EC2 instance picked up by the AWS
integration.

Other AWS resources (e.g. ELB, EBS, RDS, Dynamo) are not currently
part of monthly billing. Note that this may change in the future.

If you would like to control which AWS metrics you are collecting,
select 'limit metric collection for all accounts' in the <a href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services"> AWS Integration tile</a> and customize accordingly.
 -->

#### AWS Ingegrationを利用する場合、毎月の請求額はどのように変化しますか?

Datadogからの請求は、**Datadog Agent** を実行しているホストとAWS Integrationでピックアップされた全て **EC2インスタンス** が対象になります。
AWS IntegrationによってピックアップされたEC2インスタンスでDatadog Agentが稼働しているものは、二重で課金されることは有りません。

その他のAWSリソース (例: ELB, EBS, RDS, Dynamo) は、現時点では請求の対象外です。
無償での提供は、将来変更される可能性があります。

もし、AWS Integrationが転送するメトリクスを制限したい場合は、ダッシュボードからIntegrationsタブを選択し、[AWS Integration タイル](https://app.datadoghq.com/account/settings#integrations/amazon_web_services)を選択した後、ホップアップ表示の'limit metric collection for all accounts'を選択して、カスタマイズの設定をしてください。


<!-- ##### How will a VMware integration impact my monthly billing?

The base pricing is $15 per virtual machine per month. See above for more general information. -->

#### VMware Ingegrationを利用する場合、毎月の請求額はどのように変化しますか?

VMwareの仮想マシンごとに月額$15で請求が発生します。詳細は、上記の基本プランの項目を参照してください。


<!-- ##### How will Docker and other container integrations impact my monthly billing?

The base pricing of $15 per host includes 10 containers. Additional containers cost $1 per container. -->

#### Dockerや他のコンテナ技術を使った場合の請求書への影響は?

基本価格の$15には、10コンテナまでの監視が含まれています。同一ホスト上の11台目以降のコンテナに関しては、$1/container/monthの費用が発生します。


<!-- ##### How do I see what I'll get charged for this current month?

There is not currently a way to see what the upcoming bill looks like; as an
admin you can check out past invoices
<a href="https://app.datadoghq.com/account/billing_history">here</a>.
 -->

#### 今月の請求額を知る方法はありますか?

ユーザの皆様が、今月末の請求書の金額を知る方法は準備できていません。しかしながら、Datadogの管理者権限が有れば、[過去の請求書の状況](https://app.datadoghq.com/account/billing_history)を見ることができます。


<!-- ##### Can I set a specific email address to receive invoices at?

You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com)
<a href="https://app.datadoghq.com/account/billing">here</a>.
 -->

#### 請求書を受信するために、アカウント登録とは別のメールアドレスを設定することはできますか？

請求書の受信用に別のメールアドレスを設定することは可能です。更にそのメールアドレスが、チームメンバーとしてDatadogに登録されてなくても大丈夫です。(例: invoices@yourcompany.com)

ダッシュボードの[`ユーザ名` タブ -> `billing`](https://app.datadoghq.com/account/billing)から設定ができます。
