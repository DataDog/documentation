---
title: Using markdown in Datadog events
kind: guide
listorder: 10
---


### Overview
Datadog event text supports markdown. This guide help you better format Datadog events by using markdown.

The detailed syntax can be found <a href="http://daringfireball.net/projects/markdown/syntax#lin">here</a>.

To use markdown in the event text, you need to begin the text block by `%%% \n` and end the text block with `\n %%%`

An example below:
<pre>
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
</pre>
