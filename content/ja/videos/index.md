---
last_modified: 2015/06/08
translation_status: translated
language: ja
title: ビデオ
kind:
---
<!-- In this section you will find videos we have created for every part of the product. If there is something missing you would like to see, let us know. -->

このセクションでは、Datadogがサービスの解説のために製作したビデオを紹介します。
ここで紹介しているビデオ以外で、是非観てみたい内容がある場合は、@support宛てにご要望ください。

<ul>
<% tag_set($ja_video_items).sort().each do |tag| %>
<li><a href="/ja/videos/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags($ja_video_items)[tag] %>)</li>
<% end %>
</ul>
