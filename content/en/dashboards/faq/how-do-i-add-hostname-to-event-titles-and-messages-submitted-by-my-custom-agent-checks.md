---
title: How do I add hostname to event titles and messages submitted by my custom Agent checks?
kind: faq
aliases:
    - /graphing/faq/how-do-i-add-hostname-to-event-titles-and-messages-submitted-by-my-custom-agent-checks
---

When you submit events to your Datadog account from a [custom Agent check][1], they get a host tag associated with them by default. But it can sometimes be useful to include the hostname as part of the event title or content. This can be achieved by importing `get_hostname` from `datadog_agent` in your custom Agent check's code, as in this example:

```python

import time
from datadog_checks.base import AgentCheck
from datadog_agent import get_hostname


class TestCheck(AgentCheck):
    def check(self, instance):
        hostname = get_hostname()
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'test',
            'msg_title': 'a test event occurred on host %s' % (hostname,),
            'msg_text': 'test message content for host %s' % (hostname,),
            'aggregation_key': "test1234"
        })
```

Such an Agent check would create the following event in your event stream:
{{< img src="dashboards/faq/event_example.png" alt="event_example"  >}}

In this example, the host tag would have been applied even without referencing `get_hostname()`, but that reference added the hostname to the event title and content.

[1]: /agent/agent_checks
