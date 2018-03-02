---
categories:
- languages
ddtype: crawler
description: Send custom metrics from your Ruby applications with Datadog client libraries.
doc_link: https://docs.datadoghq.com/integrations/ruby/
git_integration_title: ruby
has_logo: true
integration_title: Ruby
is_public: true
kind: integration
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby Integration
short_description: Send custom metrics from your Ruby applications with Datadog client
  libraries.
version: '1.0'
---

## Overview

The Ruby integration allows you to monitor custom metrics by simply adding a few lines of code to your Ruby application. For example, you can have a metric that returns the number of page views or the time of any function call. For additional information about the Ruby integration, please refer to [the guide on submitting metrics](/guides/metrics). For advanced usage, please refer to the documentation in the repositories listed below. You can also review [the API docs](/api) for details on how to use the API with Ruby.

Datadog offers two libraries to assist you with the implementation of Ruby application metrics:

* [dogstatsd-ruby](https://github.com/DataDog/dogstatsd-ruby) A client for DogStatsD, an extension of the StatsD metric server for Datadog.
* [dogapi-rb](https://github.com/DataDog/dogapi-rb) The Ruby client is a library suitable for inclusion in existing Ruby projects or for development of standalone scripts. It provides an abstraction on top of Datadog's raw HTTP interface for reporting events and metrics.

## Setup
### Installation

1.  To install the Ruby client for the Datadog API:

        gem install dogapi

    To install the dogstatsd-ruby client for DogStatsD:

        gem install dogstatsd-ruby

2.  Start instrumenting your code using the Datadog API:
```ruby

require 'rubygems'
require 'dogapi'

api_key = "abcdef123456"
application_key = "fedcba654321"


dog = Dogapi::Client.new(api_key, application_key)


dog.emit_event(Dogapi::Event.new('Testing done, FTW'), :host => "my_host")
```

Start instrumenting your code using the DogStatsD client:
```ruby

require 'datadog/statsd'


statsd = Datadog::Statsd.new('localhost', 8125)


statsd.increment('page.views')


statsd.gauge('users.online', 123, :sample_rate=>0.5)
```

### Configuration

There is nothing that you need to do in the Datadog application to configure Ruby.

### Validation

Go to the [Metrics explorer page](https://app.datadoghq.com/metric/explorer) and see that it just works!

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
