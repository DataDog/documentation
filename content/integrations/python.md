---
title: Datadog-Python Integration
integration_title: Python
kind: integration
newhlevel: true
---

# Overview
The Python integration enables you to monitor any custom metric by instrumenting a few lines of code. For instance, you can have a metric that returns the number of page views or the time of any function call. For additional information about the Python integration, please refer to [the guide to DogStatsD](/guides/dogstatsd). For advanced usage, please refer to [the documentation in the repository](https://github.com/DataDog/datadogpy). You can also review [the API docs](/api) for details on how to use the API with Python.

# Installation

1.  To install from pip:

        pip install datadog

2.  Start instrumenting your code:

        # Configure the module according to your needs
        from datadog import initialize

        options = {
            'api_key':'api_key',
            'app_key':'app_key'
        }

        initialize(**options)

        # Use Datadog REST API client
        from datadog import api

        title = "Something big happened!"
        text = 'And let me tell you all about it here!'
        tags = ['version:1', 'application:web']

        api.Event.create(title=title, text=text, tags=tags)


        # Use Statsd, a Python client for DogStatsd
        from datadog import statsd

        statsd.increment('whatever')
        statsd.gauge('foo', 42)

        # Or ThreadStats, an alternative tool to collect and flush metrics,using Datadog REST API
        from datadog import ThreadStats
        stats = ThreadStats()
        stats.start()
        stats.increment('home.page.hits')

# Configuration

There is nothing that you need to do in the Datadog application to configure Python.

# Validation

Go to the [Metrics explorer page](https://app.datadoghq.com/metric/explorer) and see that it just works!
