---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Python Integration
integration_title: Python
kind: integration
doclevel: basic
---

The Python integration enables you to monitor any custom metric by instrumenting a few lines of code. For instance, you can have a metric that returns the number of page views or the time of any function call. For additional information about the Python integration, please refer to the guide on submitting metrics. For advanced usage, please refer to the documentation in the repository

1. Install the library with pip or easy_install:

        easy_install  dogstatsd-python

2. Start instrumenting your code:

        # Import the module.
        from statsd import statsd
        # Increment a counter.
        statsd.increment('page.views')

3. Go to the Metrics explorer page and see that it just works!
