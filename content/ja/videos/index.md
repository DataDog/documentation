---
last_modified: 2017/02/14
translation_status: complete
language: ja
title: ビデオ
kind: Documentation
---

<!-- At Datadog, we want to make sure you have all the tools you need to use and understand our products. Some people learn better with text, some with pictures, some with video, and some prefer a mixture of everything. In this section we present the videos we have created. If there is a video you think we need to produce to help solve a common problem, suggest it via a <%= link_to "support ticket",  "http://help.datadoghq.com" %> or reach out on to us on Twitter via <%= link_to "@datadoghq",  "http://twitter.com/datadoghq" %>. -->

Datadogでは、ユーザが製品の使い方を素早く理解できるように、様々な種類のコンテンツを準備したいと考えています。一部の人に取っては文章を読む方が速く理解ることでしょう。又別の人は、写真やビデオやそれら全てのコンテツを使って学習する方が速く理解できるでしょう。

このセクションでは、各機能の概要を動画で素早く理解してもらうために製作したビデオを紹介しています。ここで紹介しているビデオ以外に、是非動画で観てみたい内容がある場合は、[@support-datadog宛](http://help.datadoghq.com)までご要望をお知らせください。又、Twitter の[@datadoghq](http://twitter.com/datadoghq)へ当てたメッセージで連絡を取ることも可能です。

<!-- The videos are organized by keyword. Click on any of the keywords below to find a relevant video. -->

ビデオはキーワード毎に整理されています。 関連する動画を見つけるには、以下のキーワードのいずれかをクリックしてください。

<ul>
<% tag_set($ja_video_items).sort().each do |tag| %>
<li><a href="/ja/videos/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags($ja_video_items)[tag] %>)</li>
<% end %>
</ul>
