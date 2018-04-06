---
title: Tracer des applications Ruby
kind: Documentation
aliases:
  - /fr/tracing/ruby/
  - /fr/tracing/languages/ruby/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-rb'
    tag: Github
    text: Code source
  - link: 'http://gems.datadoghq.com/trace/docs/'
    tag: Rubydoc
    text: Documentation du Gem
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorez vos services, vos ressources et vos traces'
---
## Installation

Pour commencer à tracer les applications écrites en Ruby, commencez par [installer et configurer Datadog Agent](/tracing/setup) (consultez la documentation supplémentaire pour [le traçage des applications Docker](/tracing/setup/docker/)).

D'abord, installez le gem ddtrace:

```ruby
gem install ddtrace
```

Enfin, importez le traceur et instrumentez votre code!

## Exemple

```ruby
require 'ddtrace'

tracer.trace("web.request") do |span|
  span.service = "my_service"
  span.app_type = "web"
  span.set_tag("my_tag", "my_value")
end
```

Pour plus d'exemples, consultez la documentation du [Gem RubyDoc](http://gems.datadoghq.com/trace/docs/).

## Compatibilité

### Compatibilité de Framework

La bibliothèque ddtrace inclut le support pour le tracing automatique des frameworks web suivants:

___

{{% table responsive="true" %}}
| Framework     | Documentation du Framework    | Documentation de l'Instrumentation Datadog                |
|---------------|----------------------------|-----------------------------------------------------|
| Ruby on Rails | http://rubyonrails.org/    | http://www.rubydoc.info/gems/ddtrace/#Ruby_on_Rails |
| Sinatra       | http://www.sinatrarb.com/  | http://www.rubydoc.info/gems/ddtrace/#Sinatra       |
| Grape         | http://www.ruby-grape.org/ | http://www.rubydoc.info/gems/ddtrace#Grape          |
{{% /table %}}

### Compatibilité des bilbliothèques

Il inclut également le support pour les bibliothèques suivantes:

___



{{% table responsive="true" %}}
| Bibliothèque       |  Documentation de la Bibliothèque                                                | Documentation de l'instrumentation Datadog                |
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

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}