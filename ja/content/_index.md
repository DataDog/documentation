---
last_modified: 2017/08/03
translation_status: complete
language: ja
title: Datadogでメトリクスの監視を始めよう！
kind: documentation
sidebar:
  nav:
    - header: レファレンス
    - text: APIレファレンス
      href: "api/"
    - text: トレース (APM)
      href: "tracing/"
    - text: 各種ライブラリー
      href: "libraries/"
    - text: グラフの描き方
      href: "graphing/"
    - text: ホスト名について
      href: "infrastructure/"
    - text: インテグレーション
      href: "integrations/"
    - text: DogStatsDの解説
      href: "guides/dogstatsd/"
    - text: FAQ よくあるご質問
      href: "faq/"
    - text: 課金に関するFAQ
      href: "guides/billing/"
aliases:
    - /ja/guides/

---
<!--
 <h1 id="pagetitle">Get Started with Datadog </h1>
 <h3 class="big_number alert alert-warning linked-header" id="get-the-datadog-agent1-running">
 <a class="header-link" href="#get-the-datadog-agent1-running"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>1. Get the Datadog <a href="https://app.datadoghq.com/account/settings#agent">Agent</a> running!</h3>
 <h3 class="big_number alert alert-success linked-header" id="dive-into-metrics2">
 <a class="header-link" href="#dive-into-metrics2"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>2. Dive into <a href="/guides/metrics/">Metrics</a>!</h3>
 <h3 class="big_number alert alert-info linked-header" id="graph-them3">
 <a class="header-link" href="#graph-them3"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>3. <a href="/graphing/">Graph them!</a>
 </h3>
-->

<h1 id="pagetitle">Datadogでメトリクスの監視を始めよう！ </h1>
<h3 class="big_number alert alert-warning linked-header" id="get-the-datadog-agent1-running">
<a class="header-link" href="#get-the-datadog-agent1-running"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>1. Datadog <a href="https://app.datadoghq.com/account/settings#agent">Agent</a> のインストールと起動 !</h3>
<h3 class="big_number alert alert-success linked-header" id="dive-into-metrics2">
<a class="header-link" href="#dive-into-metrics2"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>2. メトリクスを <a href="guides/metrics/">使いこなそう </a>!</h3>
<h3 class="big_number alert alert-info linked-header" id="graph-them3">
<a class="header-link" href="#graph-them3"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a>3. <a href="graphing/">メトリクスの可視化</a>、そして<a href="guides/monitors/">アラート設定 !</a>
</h3>

<!--
<p><strong>Not sure where to look?</strong> Our documentation is split into guides and references. Guides explain how to
    accomplish a particular task with Datadog, while the references are more general (as you might expect).
    It might be a good idea to start with the <a href="/overview/">Datadog Overview</a>, which explains Datadog's
capabilities at a high level.</p>
-->

<p><strong>どこから始めればよいか迷っている場合は?</strong>
<br> Datadogのドキュメントは大きな分類としてガイドとリファレンスの二つに分かれています。<strong>ガイド</strong>では、Agentのインストールやアラートの設定など、Datadogにおける特定のタスクについて解説しています。<strong>レファレンス</strong>では、より一般的な情報を提供しています。まずは、<a href="guides/overview/">Datadog の概要</a> を一読されることをお勧めします。ここでは、Datadogに何ができるのかを俯瞰できるように説明しています。</p>

<!--
<p><strong>If you have questions, we're here to help.</strong> You can get in touch with
    our support team by mentioning @support-datadog in a comment on Datadog itself, or by
    <a href="/help/#email">email</a>, on <a href="/help/#slack">Slack</a>, or on our <a href="https://help.datadoghq.com/hc/en-us/requests/new">customer service site</a>.</p>
-->

<p><strong>何か分からないことがあった場合は?</strong>
<br> DatadogのGUI ( <a href="https://app.datadoghq.com/">https://app.datadoghq.com/</a> ) 内のEventsやTimeBoardなどのコメントを入力するスペースで @support-datadog をメンションしたうえでお問い合わせに関するメッセージを記述することで、Datadogのサポートチームに問い合わせ依頼を日本語または英語で送信することができます。また、
    <a href="/help/#email">eメール(日本語ok)</a>、<a href="/help/#slack">Slack(日本語チャネル有り)</a>、 あるいは<a href="https://help.datadoghq.com/hc/en-us/requests/new">Datadog カスタマーサービスサイト(英語)</a>でもお問い合わせが可能です。</p>

<!--
<p><strong>Find a mistake in this documentation?</strong> <a href="https://github.com/DataDog/documentation/issues">Let us know on GitHub</a>
and we'll take care of it.</p>
-->

<p><strong>ドキュメントに不具合があった場合は?</strong>
<br>GitHubの <a href="https://github.com/DataDog/documentation/issues">issues</a>
でお知らせ下さい。メッセージ欄の内容を基にドキュメントを修正し、改善に努めます。</p>

<!--
[1]: https://app.datadoghq.com/account/settings#agent
[2]: /guides/metrics/
[3]: /graphing/
[4]: /overview/
[5]: https://app.datadoghq.com/event/stream
[6]: /help/#email
[7]: /help/#irc
[8]: https://help.datadoghq.com/hc/en-us/requests/new
[9]: https://github.com/DataDog/documentation/issues
[102]: /ja/guides/metrics/
[103]: /ja/graphing/
[104]: /ja/guides/overview/
[106]: /ja/help/#email
[107]: /ja/help/#irc
[111]: /ja/guides/monitoring/
-->
