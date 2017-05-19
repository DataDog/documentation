---
last_modified: 2017/01/10
translation_status: complete
language: ja
title: Datadogでメトリクスの監視を始めよう！
kind: documentation
sidebar:
  nav:
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
    - text: FAQ
      href: "/ja/faq"
    - text: 課金に関するFAQ
      href: "/ja/guides/billing/"
---

<!-- ### 1. Get the Datadog [Agent][1] running!
{: .big_number.alert.alert-warning}

### 2. Dive into [Metrics][2]!
{: .big_number.alert.alert-success}

### 3. [Graph them!][3]
{: .big_number.alert.alert-info}
 -->

### 1. Datadog [Agent][1] のインストールと起動 !
{: .big_number.alert.alert-warning}

### 2. [メトリクス][102]の収集と送信!
{: .big_number.alert.alert-success}

### 3. メトリクスの[可視化][103]、そして[アラート設定][111]!
{: .big_number.alert.alert-info}


<!-- **Not sure where to look?** Our documentation is split into guides and references. Guides explain how to
accomplish a particular task with Datadog, while the references are more general (as you might expect).
It might be a good idea to start with the [Datadog Overview][4], which explains Datadog's
capabilities at a high level. -->

**・どこから始めればよいか迷っている場合は?**

このドキュメントは、次の二つの目的に基づいてコンテンツを分類しています。

- **ガイド**部分では、Agentのインストールや、アラートの設定など、特定の課題を実現していく方法について解説します。
- **レファレンス**部分では、より資料情報に近い、基礎的な情報を提供していきます。

先ずは、["Datadogが提供するサービスの概要"][104]を一読することをお勧めします。このドキュメントでは、Datadog内で利用できる各種監視機能の概要を素早く把握することができます。

<!-- **If you have questions, we're here to help.** You can get in touch with
our support team by mentioning [@support-datadog][5] in a comment on Datadog itself, or by
[email][6], on [IRC][7], or on our [customer service site][8].-->

**・何か分からないことがあった場合は?**

Datadogサイト内のメッセージを入力するスペースで、[@support-datadog][5]に続きお問い合わせに関するメッセージを記述することで、サポートチームに問い合わせ依頼を送信することができます。更に、[email][106]、[IRC][107]、ZenDeskの[お問い合わせ][8]ページらでも、問い合わせることができます。

<!-- **Find a mistake in this documentation?** [Let us know on GitHub][9]
and we'll take care of it. -->

**・ドキュメントに不具合があった場合は?**

GitHubの[issues][9]でお知らせください。メッセージ欄の内容を基にドキュメントを修正し、改善に努めます。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /guides/dogstatsd/
[3]: /graphing/
[4]: /overview/
[5]: https://app.datadoghq.com/event/stream
[6]: /help/#email
[7]: /help/#irc
[8]: https://help.datadoghq.com/hc/en-us/requests/new
[9]: https://github.com/DataDog/documentation/issues
[102]: /ja/guides/dogstatsd/
[103]: /ja/graphing/
[104]: /ja/guides/overview/
[106]: /ja/help/#email
[107]: /ja/help/#irc
[111]: /ja/guides/monitoring/