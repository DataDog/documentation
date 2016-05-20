---
last_modified: 2015/03/31
translation_status: complete
language: ja
title: Datadogでメトリクスの監視を始めよう！
kind: documentation
sidebar:
  nav:
#    - header: ガイド
#    - text: Datadog Agent 入門
#      href: "/ja/guides/basic_agent_usage/"
#    - text: Datadog が提供するサービスの概要
#      href: "/ja/overview/"
#    - text: Datadog へのメトリクスの送信
#      href: "/ja/guides/metrics/"
#    - text: Datadog Agent によるログの解析方法
#       href: "/ja/guides/logs/"
#    - text: Agent Checkの書き方
#      href: "/ja/guides/agent_checks/"
#    - text: サービスチェックの設定方法
#      href: "/ja/guides/services_checks/"
#    - text: Chef を使ったDatadog Agent のインストール
#      href: "/ja/guides/chef/"
#    - text: Azure WindowsへDatadog Agentのインストール
#      href: "/ja/guides/azure/"
#    - text: アラートの設定方法
#      href: "/ja/guides/alerting/"
#    - text: ダッシュボードテンプレートの作成
#      href: "/ja/guides/templating/"
#    - text: SAML によるシングルサインオン　
#      href: "/ja/guides/saml/"
#    - text: メールによるイベント情報の送信　
#      href: "/ja/guides/eventsemail"
    - header: レファレンス
    - text: APIレファレンス
      href: "/ja/api/"
    - text: APIライブラリー
      href: "/ja/libraries/"
    - text: グラフ表示入門
      href: "/ja/graphing/"
    - text: ホスト名について
      href: "/ja/hostnames/"
    - text: インテグレーション
      href: "/ja/integrations/"
    - text: DogStatsDの解説
      href: "/ja/guides/dogstatsd/"
    - text: 課金に関するFAQ
      href: "/ja/guides/billing/"
    - text: FAQ
      href: "/ja/faq"

---
<h3 class="big_number alert alert-warning">1. <a href="https://app.datadoghq.com/account/settings#agent">Datadog Agent</a> のインストールと起動 !</h3>
<h3 class="big_number alert alert-success">2. <a href="/ja/guides/metrics/">メトリクス</a>の取得と送信 !</h3>
<h3 class="big_number alert alert-info">3. 収集したメトリクスの<a href="/ja/graphing/">グラフ化</a> !</h3>

<!-- **Not sure where to look?** Our documentation is split into guides and references. Guides explain how to
accomplish a particular task with Datadog, while the references are more general (as you might expect).
It might be a good idea to start with the [Datadog Overview](/overview/), which explains Datadog's
capabilities at a high level. -->

**・どこから始めればよいか迷っている場合は?**

このドキュメントは、ガイドとレファレンスによって構成されています。ガイドでは、特定のタスクをDatadog上で構成することを目的としています。レファレンスでは、より基本的な情報を提供することを目的としています。まずは、Datadogが提供しているモニタリングサービスの機能を解説している["Datadogが提供するサービスの概要"](/ja/overview/)のページをお勧めします。

<!-- **If you have questions, we're here to help.** You can get in touch with
our support team by mentioning <a href="http://help.datadoghq.com/customer/portal/questions/913177--notification-in-datadog">@support-datadog</a> in a comment on Datadog itself, or by
[email](/help/#email), on [IRC](/help/#irc), or on our [customer service site](/help/#desk). -->

**・何か分からないことがあった場合は?**

弊社<a href="http://help.datadoghq.com/customer/portal/questions/913177--notification-in-datadog">@support-datadog</a>ページよりサポートチームにお問い合わせ下さい。又は、[email](/ja/help/#email)や[IRC](/ja/help/#irc)で、コンタクトいただくこともできます。詳しくは、[お問い合わせ](/ja/help/#desk)ページを参照してください。

<!-- **Find a mistake in this documentation?** [Let us know on GitHub](https://github.com/DataDog/documentation/issues)
and we'll take care of it. -->

**・ドキュメントに不具合があった場合?**

GitHubの[issues](https://github.com/DataDog/documentation/issues)でお知らせください。ご連絡をいただいた情報を基にドキュメントの修正と更なる改善に努めます。
