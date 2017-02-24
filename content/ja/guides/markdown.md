---
last_modified: 2017/02/24
translation_status: complete
language: ja
title: Datadog のイベントで markdown を使い方法
kind: guide
listorder: 10
---

<!-- ### Overview
Datadog event text supports markdown. This guide help you better format Datadog events by using Markdown.

The detailed markdown syntax can be found <a href="http://daringfireball.net/projects/markdown/syntax#lin">here</a>.
Please note that embedding HTML in markdown is not supported with in Datadog.

To use Markdown in the event text, you need to begin the text block by `%%% \n` and end the text block with `\n %%%`

An example below:
<pre>
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
</pre> -->

### 概要

Datadog へ送信するイベントのテキストは、markdown 表記をサポートします。 このガイドは、markdown 表記を使用して、イベント内のテキストをフォーマットする方法を解説します。

markdown syntax の詳細については、[次を](http://daringfireball.net/projects/markdown/syntax#lin)参照してください。尚、 HTML 書式を markdown に埋め込む裏技は、Datadog ではサポートしていません。

イベント用のテキストで markdown を使用するには、そのテキストブロックを `%%% \n` `\n %%%` を囲む必要があります。

以下が、例です：

<pre>
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
</pre>


<!-- Note: if you are embedding a link in a Markdown block, make sure the URL is encoded properly.

For example, the following url: "http://catchpoint.com/session_id:123456"

Should be encoded to: "http://catchpoint.com/session_id%3A123456" -->

**注**: markdown ブロックにリンクを埋め込む場合は、正しくURLエンコーディングされていることを確認してください。

例えば、次のような "http://catchpoint.com/session_id:123456" `:` の入ったURLは、"http://catchpoint.com/session_id%3A123456" にコード化してください。
