---
title: Tracing Ruby Applications
kind: Documentation
aliases:
- /tracing/ruby/
- /tracing/languages/ruby/
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb"
  tag: "Github"
  text: Source code
- link: "http://gems.datadoghq.com/trace/docs/"
  tag: "Rubydoc"
  text: Gem documentation
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Installation

To begin tracing applications written in Ruby, first [install and configure the Datadog Agent](/tracing/setup).

Next, install the ddtrace gem:

```ruby
gem install ddtrace
```

Finally, import the tracer and instrument your code!

## Example

```ruby
require 'ddtrace'

tracer.trace("web.request") do |span|
  span.service = "my_service"
  span.app_type = "web"
  span.set_tag("my_tag", "my_value")
end
```

For more examples, see the [RubyDoc Gem documentation](http://gems.datadoghq.com/trace/docs/).

## Compatibility

### Framework Compatibility

The ddtrace library includes support for the following web frameworks:

___

{{% table responsive="true" %}}
| Framework     | Framework Documentation    | Datadog Instrumentation Documentation               |
|---------------|----------------------------|-----------------------------------------------------|
| Ruby on Rails | http://rubyonrails.org/    | http://www.rubydoc.info/gems/ddtrace/#Ruby_on_Rails |
| Sinatra       | http://www.sinatrarb.com/  | http://www.rubydoc.info/gems/ddtrace/#Sinatra       |
| Grape         | http://www.ruby-grape.org/ | http://www.rubydoc.info/gems/ddtrace#Grape          |
{{% /table %}}

### Library Compatibility

It also includes support for the following libraries:

___



{{% table responsive="true" %}}
| Library       | Library Documentation                                                | Datadog Instrumentation Documentation               |
|---------------|----------------------------------------------------------------------|-----------------------------------------------------|
| Rack          | https://rack.github.io/                                              | www.rubydoc.info/gems/ddtrace#Rack                  |
| ActiveRecord  | https://github.com/rails/rails/tree/master/activerecord              | http://www.rubydoc.info/gems/ddtrace#Active_Record  |
| Elasticsearch | https://www.elastic.co/products/elasticsearch                        | http://www.rubydoc.info/gems/ddtrace#Elastic_Search |
| MongoDB       | http://api.mongodb.com/ruby/current/                                 | http://www.rubydoc.info/gems/ddtrace#MongoDB        |
| Faraday       | https://github.com/lostisland/faraday                                | http://www.rubydoc.info/gems/ddtrace#Faraday        |
| AWS           | https://aws.amazon.com/sdk-for-ruby/                                 | http://www.rubydoc.info/gems/ddtrace#AWS            |
| Dalli         | https://github.com/petergoldstein/dalli                              | http://www.rubydoc.info/gems/ddtrace#Dalli          |
| Sidekiq       | https://sidekiq.org/                                                 | http://www.rubydoc.info/gems/ddtrace#Sidekiq        |
| Resque        | https://github.com/resque/resque                                     | http://www.rubydoc.info/gems/ddtrace#Resque         |
| SuckerPunch   | https://github.com/brandonhilkert/sucker_punch                       | http://www.rubydoc.info/gems/ddtrace#Sucker_Punch   |
| Net/HTTP      | https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html | http://www.rubydoc.info/gems/ddtrace#Net_HTTP       |
| Redis         | https://github.com/redis/redis-rb                                    | http://www.rubydoc.info/gems/ddtrace#Redis          |
{{% /table %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}