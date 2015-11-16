---
last_modified: 2015/03/31
translation_status: translated
language: ja
title: サンプルコード
kind: documentation
---
<!-- In this section you will find examples of configurations from across the entire product. Each example may include screenshots, code, output, and/or data. If there is something missing you would like to see, let us know. -->

このセクションでは、各種設定例をサービス全般に渡って紹介しています。
各設定例には、スクリーンショット、コード、出力結果、およびデータ等が含まれています。
ここに紹介しているサンプルコード以外で、是非掲載してほしい設定項目がある場合は、@support宛てにご要望ください。

<ul>
<% tag_set($ja_example_items).sort().each do |tag| %>
<li><a href="/ja/examples/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags($ja_example_items)[tag] %>)</li>
<% end %>
</ul>
