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

The detailed smarkdown yntax can be found <a href="http://daringfireball.net/projects/markdown/syntax#lin">here</a>.
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

Datadogイベントテキストはマークダウンをサポートします。 このガイドは、Markdownを使用してDatadogイベントのフォーマットを整えるのに役立ちます。

詳しいsmarkdown yntaxはここで見つけることができます。 markdownにHTMLを埋め込むことは、Datadogではサポートされていません。

イベントテキストでMarkdownを使用するには、テキストブロックを%%% \ nで開始し、テキストブロックを\ n %%%で終了する必要があります

以下の例：

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

注意：Markdownブロックにリンクを埋め込む場合は、URLが正しくエンコードされていることを確認してください。

たとえば、次のURL： "http://catchpoint.com/session_id:123456"

"http://catchpoint.com/session_id%3A123456"にコード化する必要があります。
