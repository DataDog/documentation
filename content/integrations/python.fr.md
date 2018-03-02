---
categories:
- languages
ddtype: crawler
description: Instrument custom metrics from your Python applications with Datadogpy.
doc_link: https://docs.datadoghq.com/integrations/python/
git_integration_title: python
has_logo: true
integration_title: Python
is_public: true
kind: integration
manifest_version: '1.0'
name: python
public_title: Datadog-Python Integration
short_description: Instrument custom metrics from your Python applications with Datadogpy.
version: '1.0'
---

## Overview
The Python integration enables you to monitor any custom metric by instrumenting a few lines of code. For instance, you can have a metric that returns the number of page views or the time of any function call. For additional information about the Python integration, please refer to [the guide on submitting metrics](/guides/metrics). For advanced usage, please refer to [the documentation in the repository](https://github.com/DataDog/datadogpy). You can also review [the API docs](/api) for details on how to use the API with Python.

## Setup
### Installation

1.  To install from pip:

    ```
    pip install datadog
    ```

2.  Start instrumenting your code:

```python

from datadog import initialize

options = {
    'api_key':'api_key',
    'app_key':'app_key'
}

initialize(**options)


from datadog import api

title = "Something big happened!"
text = 'And let me tell you all about it here!'
tags = ['version:1', 'application:web']

api.Event.create(title=title, text=text, tags=tags)



from datadog import statsd

statsd.increment('whatever')
statsd.gauge('foo', 42)


from datadog import ThreadStats
stats = ThreadStats()
stats.start()
stats.increment('home.page.hits')
```

### Configuration

There is nothing that you need to do in the Datadog application to configure Python.

### Validation

Go to the [Metrics explorer page](https://app.datadoghq.com/metric/explorer) and see that it just works!

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
