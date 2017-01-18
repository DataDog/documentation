---
last_modified: 2015/03/31
translation_status: complete
language: ja
title: インテグレーション(Integration)
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
    - text: 課金に関するFAQ
      href: "/ja/guides/billing/"
    - text: FAQ
      href: "/ja/faq"
---

DatadogのIntegrationに関するドキュメントへようこそ。（注:随時追加中）

Integrationをインストール/設定するための細かい手順については、<a href="https://app.datadoghq.com/account/settings">Integrationタブ</a>から目的のタイルを選択した際に表示されるポップアップを参照してください。

下記で紹介するリンク先のヘージでは、Integrationの概要, 設定方法, トラブルシューティングを紹介しています。

**(注:随時、追加/更新中)**

<ul class="intlist list-group row">
  <% $ja_integration_items.each do |i| %>
    <li class="list-group-item col-lg-2 col-md-3 col-sm-4 col-xs-6"><%= link_to i[:integration_title], i.path %></li>
<% end %>
</ul>
