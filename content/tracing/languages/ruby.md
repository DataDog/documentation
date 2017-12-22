---
title: Tracing Ruby Applications
kind: Documentation
aliases:
- /tracing/ruby/
---

## Installation

To begin tracing applications written in Ruby, first [install and configure the Datadog Agent](/tracing#installing-the-agent).

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

For more examples, see the [RubyDoc Gem documentation](http://www.rubydoc.info/gems/ddtrace/).

## Compatibility

The ddtrace library includes support for the following web frameworks:

*  [Ruby on Rails](http://rubyonrails.org/).
*  [Sinatra](http://www.sinatrarb.com/).

To learn how to instrument these frameworks, reference [the RubyDoc documentation](http://www.rubydoc.info/gems/ddtrace)

It also includes support for the following libraries:

* [Elasticsearch](https://www.elastic.co/products/elasticsearch)
* [Net/HTTP](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)
* [Redis](https://redis.io/)

For information on tracing these libraries, see [the RubyDoc documentation](http://www.rubydoc.info/gems/ddtrace#Other_libraries)

## Further Reading

{{< whatsnext >}}
    {{< nextlink href="https://github.com/DataDog/dd-trace-rb" tag="Github" >}}Tracing Ruby integration source code{{< /nextlink >}}
    {{< nextlink href="http://www.rubydoc.info/gems/ddtrace/" tag="Documentation" >}} RubyDoc Gem page{{< /nextlink >}}
{{< /whatsnext >}}
