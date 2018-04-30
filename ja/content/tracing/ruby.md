---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Tracing Ruby Applications
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

### Installation

To begin tracing applications written in Ruby, first [install and configure the Datadog Agent](/tracing).

Next, install the ddtrace gem:

~~~
gem install ddtrace
~~~

Finally, import the tracer and instrument your code!

### Example

~~~
require 'ddtrace'

tracer.trace("web.request") do |span|
  span.service = "my_service"
  span.app_type = "web"
  span.set_tag("my_tag", "my_value")
end
~~~

For more examples, see the [RubyDoc Gem documentation](http://www.rubydoc.info/gems/ddtrace/#Advanced_usage).

### Compatibility

The ddtrace library includes support for the [Ruby on Rails](http://rubyonrails.org/) and [Sinatra](http://www.sinatrarb.com/) web frameworks.

To learn how to instrument these frameworks, please reference [the RubyDoc documentation](http://www.rubydoc.info/gems/ddtrace#Web_Frameworks)

It also includes support for the following libraries:

- [Elasticsearch](https://www.elastic.co/products/elasticsearch)
- [Net/HTTP](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)
- [Redis](https://redis.io/)

For information on tracing these libraries, see [the RubyDoc documentation](http://www.rubydoc.info/gems/ddtrace#Other_libraries)

### Additional Information

The Ruby integration [source code can be found on Github](https://github.com/DataDog/dd-trace-rb).

You can find additional documentation on [the RubyDoc Gem page](http://www.rubydoc.info/gems/ddtrace/).
