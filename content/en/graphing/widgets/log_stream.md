---
title: Log Stream Widget
kind: documentation
description: Display a filtered log stream in your Datadog dashboards.
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

The Log Stream displays a log flow matching the defined query:

{{< img src="graphing/widgets/log_stream/log_stream.png" alt="Log stream" responsive="true">}}

## Setup
### Configuration

{{< img src="graphing/widgets/log_stream/log_stream_setup.png" alt="Log stream setup" responsive="true" style="width:80%;">}}

Enter a [Log query][1] to filter the log stream. 

### Options
#### Columns

Display value of your [facets][2] and [measures][3] with columns.

#### Global time

On Screenboard only, choose whether or not your widget has a custom timeframe or the global timeframe of the Screenboard.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/?tab=measures#setup
