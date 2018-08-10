---
title: I'm receiving a 202 but not seeing data
kind: faq
---

We do very minimal error checking on the API front-end, as we queue all data for asynchronous processing (the goal being to always, always accept your data in production situations and decouple our systems from yours).

Thus it is possible you could receive a 202 'success' response but not see your data in Datadog. The cause of this is most likely:

* Problems with the timestamp (either not in seconds or in the past, etc.)
* Using the application key instead of API key
* Events are succeeding, but because success events are low priority, they don't show up in the event stream until it is switched to priority 'all'

To check your timestamp is correct run:
```
date -u && curl -s --head https://app.datadoghq.com 2>&1 | grep date
```

This outputs the current system's date, and then make a request to our endpoint and grab the date on our end. If these are more than a few minutes apart, you may want to look at the time settings on your server.

There are also certain fields which are not mandatory for submission, but do require a valid input. For example, in submitting an event the priority field must be one of the four given options. Any other text results in a 202 'success' but no event showing up. Having an invalid source_type_name doesn't prevent the event from showing up, but that field is dropped upon submission.

