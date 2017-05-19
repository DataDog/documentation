---
title: Datadog-Ruby Integration
integration_title: Ruby
kind: integration
newhlevel: true
---

# Overview

The Ruby integration allows you to monitor custom metrics by simply adding a few lines of code to your Ruby application. For example, you can have a metric that returns the number of page views or the time of any function call. Please refer to the documentation in the repositories listed below. You can also review [the API docs](/api) for details on how to use the API with Ruby.

Datadog offers two libraries to assist you with the implementation of Ruby application metrics:

* [dogstatsd-ruby](https://github.com/DataDog/dogstatsd-ruby) A client for DogStatsD, an extension of the StatsD metric server for Datadog.
* [dogapi-rb](https://github.com/DataDog/dogapi-rb) The Ruby client is a library suitable for inclusion in existing Ruby projects or for development of standalone scripts. It provides an abstraction on top of Datadog's raw HTTP interface for reporting events and metrics.

# Installation

1.  To install the Ruby client for the Datadog API:

        gem install dogapi

    To install the dogstatsd-ruby client for DogStatsD:

        gem install dogstatsd-ruby

2.  Start instrumenting your code using the Datadog API:

        # Load the Datadog API module.
        require 'rubygems'
        require 'dogapi'

        api_key = "abcdef123456"
        application_key = "fedcba654321"

        # Note that submitting events does not require the application key.
        dog = Dogapi::Client.new(api_key, application_key)

        # Send a new event.
        dog.emit_event(Dogapi::Event.new('Testing done, FTW'), :host => "my_host")

    Start instrumenting your code using the DogStatsD client:

        # Load the dogstats module.
        require 'datadog/statsd'

        # Create a stats instance.
        statsd = Datadog::Statsd.new('localhost', 8125)

        # Increment a counter.
        statsd.increment('page.views')

        # Record a gauge 50% of the time.
        statsd.gauge('users.online', 123, :sample_rate=>0.5)

# Configuration

There is nothing that you need to do in the Datadog application to configure Ruby.

# Validation

Go to the [Metrics explorer page](https://app.datadoghq.com/metric/explorer) and see that it just works!
