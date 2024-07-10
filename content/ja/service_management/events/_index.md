---
aliases:
- /ja/guides/eventcorrelation/
- /ja/guides/markdown/
- /ja/events
further_reading:
- link: '#post-an-event'
  tag: Documentation
  text: Datadog イベント API
- link: /service_management/events/guides/recommended_event_tags/
  tag: Documentation
  text: イベントへのタグ付けのベストプラクティス
- link: https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/
  tag: ブログ
  text: 機密データスキャナーでイベントの機密データを特定し、編集する
- link: https://app.datadoghq.com/event/configuration/quick-start
  tag: App
  text: クイックスタートガイド
is_beta: true
title: イベント管理
---

{{< site-region region="us3,us5,gov" >}}
<div class="alert alert-warning">Event Management はこのサイトではサポートされていません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSeYkh0jFy_wMCLGKZ5019H0DpFvq0fILvyJEt_gRyeGgvRymA/viewform" btn_hidden="false" header="ベータ版に参加しよう">}}
イベント管理のベータ版に参加して、Datadog とサードパーティのアラートとの相関付けを行い、イベントを実用的なインサイトに変え、調査を一元化し、重大な問題をチームとしてより迅速に管理しましょう。詳しくは、 <a href="https://www.datadoghq.com/blog/dash-2022-new-feature-roundup/#event-management">発表</a>をご覧ください。
{{< /callout >}}

## 概要

あらゆるソースからイベントを取り込み、リッチ化・正規化して、関連付け (公開ベータ版を参照) を行い、実用的なインサイトを得ることができます。Datadogは、モニター、Watchdog、エラー追跡を含むさまざまな製品から自動的にイベントを作成します。Agent とインストールされたインテグレーションから生成されたイベントも追跡できます。また、イベント管理では、サードパーティのアラートイベント、変更リクエスト、デプロイ、構成変更など、さまざまなソースからイベントを取り込むことができます。

[Kubernetes][1]、[Docker][2]、[Jenkins][3]、[Chef][4]、[Puppet][5]、[Amazon ECS][6] または [Autoscaling][7]、[Sentry][8]、[Nagios][9] など 100 以上の Datadog インテグレーションがイベント収集をサポートしています。

## コンポーネント

{{< whatsnext desc="イベント管理の機能:">}}
    {{< nextlink href="/service_management/events/ingest/" >}}<u>イベントの取り込み</u> - Datadog にイベントを送信する方法について{{< /nextlink >}}
    {{< nextlink href="/service_management/events/explorer/" >}}<u>イベントエクスプローラー</u> - Datadog に集まるイベントの集約と表示{{< /nextlink >}}
    {{< nextlink href="/service_management/events/usage/" >}}<u>イベントの利用</u> - イベントの分析、調査、監視 {{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/kubernetes/#event-collection
[2]: /ja/agent/docker/#events
[3]: /ja/integrations/jenkins/#events
[4]: /ja/integrations/chef/#report-handler
[5]: /ja/integrations/puppet/#events
[6]: /ja/integrations/amazon_ecs/#events
[7]: /ja/integrations/amazon_auto_scaling/#events
[8]: /ja/integrations/sentry/
[9]: /ja/integrations/nagios/#events