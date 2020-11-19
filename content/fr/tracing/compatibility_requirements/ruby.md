---
title: Exigences de compatibilité Ruby
dependencies:
  - 'https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md'
kind: documentation
description: Exigences de compatibilité pour le traceur Ruby.
further_reading:
  - link: tracing/setup/ruby
    tag: Documentation
    text: Instrumenter votre application
---
## Compatibilité

La bibliothèque de tracing Datadog Ruby est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

**Interpréteurs Ruby pris en charge** :

| Type  | Documentation              | Version | Type de prise en charge                         | Version du gem prise en charge |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 2.7     | Complète                                 | Dernière              |
|       |                            | 2.6     | Complète                                 | Dernière              |
|       |                            | 2.5     | Complète                                 | Dernière              |
|       |                            | 2.4     | Complète                                 | Dernière              |
|       |                            | 2.3     | Complète                                 | Dernière              |
|       |                            | 2.2     | Complète                                 | Dernière              |
|       |                            | 2.1     | Complète                                 | Dernière              |
|       |                            | 2.0     | Complète                                 | Dernière              |
|       |                            | 1.9.3   | Maintenance (jusqu'au 6 août 2020) | < 0.27.0            |
|       |                            | 1.9.1   | Maintenance (jusqu'au 6 août 2020) | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | Complète                                | Dernière              |

**Serveurs Web pris en charge** :

| Type      | Documentation                     | Version      | Type de prise en charge |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+/3.6+ | Complète         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+/5.1+  | Complète         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Complète         |

**Frameworks de tracing pris en charge** :

| Type        | Documentation                                   | Version               | Version du gem prise en charge |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (avec Ruby 2.1+) | >= 0.16.0           |

*Complète* indique que Datadog prend en charge toutes les fonctionnalités du traceur.

*Obsolète* indique que la prise en charge par Datadog passera à *Maintenance* dans une prochaine version.

*Maintenance* indique que Datadog corrigera uniquement les bugs critiques.

*Fin de vie* indique que le service n'est plus pris en charge par Datadog.

## Instrumenter des intégrations

Un vaste nombre de bibliothèques et de frameworks sont pris en charge par défaut, ce qui signifie qu'ils peuvent être instrumentés automatiquement. Ces instrumentations ne sont pas activées par défaut, mais elles peuvent facilement être activées et configurées avec l'API `Datadog.configure` :

```ruby
Datadog.configure do |c|
  # Activer et configurer une intégration
  c.use :integration_name, options
end
```

Où `options` est un `hash` des paramètres de configuration spécifiques à l'intégration.

Vous trouverez ci-dessous la liste des intégrations disponibles ainsi que leurs options de configuration :

| Nom                     | Clé                        | Versions prises en charge : MRI  | Versions prises en charge : JRuby | Configuration                    | Source Gem                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Lien][2]*              | *[Lien][3]*             |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[Lien][4]*              | *[Lien][5]*             |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Lien][6]*              |  *[Lien][7]*            |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[Lien][8]*              | *[Lien][9]*             |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[Lien][10]*             | *[Lien][11]*            |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[Lien][12]*             | *[Lien][13]*            |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Lien][14]*             | *[Lien][15]*            |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Lien][16]*             | *[Lien][17]*            |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Lien][18]*             | *[Lien][19]*            |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Lien][20]*             | *[Lien][21]*            |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Lien][22]*             | *[Lien][23]*            |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Lien][24]*             | *[Lien][25]*            |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Lien][26]*             | *[Lien][27]*            |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Lien][28]*             | *[Lien][29]*            |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Lien][30]*             | *[Lien][31]*            |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Lien][32]*             | *[Lien][33]*            |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *Gem non disponible*       | *[Lien][34]*             | *[Lien][35]*            |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Lien][36]*             | *[Lien][37]*            |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Lien][38]*             | *[Lien][39]*            |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Lien][40]*             | *[Lien][41]*            |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *Gem non disponible*       | *[Lien][42]*             | *[Lien][43]*            |
| Net/HTTP                 | `http`                     | *(Toute version de Ruby prise en charge)*   | *(Toute version de Ruby prise en charge)*    | *[Lien][44]*             | *[Lien][45]*            |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Lien][46]*             | *[Lien][47]*            |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Lien][48]*             | *[Lien][49]*            |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Lien][50]*             | *[Lien][51]*            |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[Lien][52]*             | *[Lien][53]*            |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Lien][54]*             | *[Lien][55]*            |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[Lien][56]*             | *[Lien][57]*            |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | `>= 1.0, < 2.0`           | *[Lien][58]*             | *[Lien][59]*            |
| Client Rest              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Lien][60]*             | *[Lien][61]*            |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Lien][62]*             | *[Lien][63]*            |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Lien][64]*             | *[Lien][65]*            |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Lien][66]*             | *[Lien][67]*            |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Lien][68]*             | *[Lien][69]*            |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Lien][70]*             | *[Lien][71]*            |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Lien][72]*             | *[Lien][73]*            |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /fr/tracing/setup/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /fr/tracing/setup/ruby/#action-view
[5]: https://github.com/rails/rails/tree/master/actionview
[6]: /fr/tracing/setup/ruby/#active-model-serializers
[7]: https://github.com/rails-api/active_model_serializers
[8]: /fr/tracing/setup/ruby/#action-pack
[9]: https://github.com/rails/rails/tree/master/actionpack
[10]: /fr/tracing/setup/ruby/#active-record
[11]: https://github.com/rails/rails/tree/master/activerecord
[12]: /fr/tracing/setup/ruby/#active-support
[13]: https://github.com/rails/rails/tree/master/activesupport
[14]: /fr/tracing/setup/ruby/#aws
[15]: https://github.com/aws/aws-sdk-ruby
[16]: /fr/tracing/setup/ruby/#concurrent-ruby
[17]: https://github.com/ruby-concurrency/concurrent-ruby
[18]: /fr/tracing/setup/ruby/#dalli
[19]: https://github.com/petergoldstein/dalli
[20]: /fr/tracing/setup/ruby/#delayedjob
[21]: https://github.com/collectiveidea/delayed_job
[22]: /fr/tracing/setup/ruby/#elasticsearch
[23]: https://github.com/elastic/elasticsearch-ruby
[24]: /fr/tracing/setup/ruby/#ethon
[25]: https://github.com/typhoeus/ethon
[26]: /fr/tracing/setup/ruby/#excon
[27]: https://github.com/excon/excon
[28]: /fr/tracing/setup/ruby/#faraday
[29]: https://github.com/lostisland/faraday
[30]: /fr/tracing/setup/ruby/#grape
[31]: https://github.com/ruby-grape/grape
[32]: /fr/tracing/setup/ruby/#graphql
[33]: https://github.com/rmosolgo/graphql-ruby
[34]: /fr/tracing/setup/ruby/#grpc
[35]: https://github.com/grpc/grpc/tree/master/src/rubyc
[36]: https://github.com/httprb/http
[37]: /fr/tracing/setup/ruby/#http-rb
[38]: https://github.com/zendesk/ruby-kafka
[39]: /fr/tracing/setup/ruby/#kafka
[40]: /fr/tracing/setup/ruby/#mongodb
[41]: https://github.com/mongodb/mongo-ruby-driver
[42]: /fr/tracing/setup/ruby/#mysql2
[43]: https://github.com/brianmario/mysql2
[44]: /fr/tracing/setup/ruby/#nethttp
[45]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[46]: /fr/tracing/setup/ruby/#presto
[47]: https://github.com/treasure-data/presto-client-ruby
[48]: /fr/tracing/setup/ruby/#racecar
[49]: https://github.com/zendesk/racecar
[50]: /fr/tracing/setup/ruby/#rack
[51]: https://github.com/rack/rack
[52]: /fr/tracing/setup/ruby/#rails
[53]: https://github.com/rails/rails
[54]: /fr/tracing/setup/ruby/#rake
[55]: https://github.com/ruby/rake
[56]: /fr/tracing/setup/ruby/#redis
[57]: https://github.com/redis/redis-rb
[58]: /fr/tracing/setup/ruby/#resque
[59]: https://github.com/resque/resque
[60]: /fr/tracing/setup/ruby/#rest-client
[61]: https://github.com/rest-client/rest-client
[62]: /fr/tracing/setup/ruby/#sequel
[63]: https://github.com/jeremyevans/sequel
[64]: /fr/tracing/setup/ruby/#shoryuken
[65]: https://github.com/phstc/shoryuken
[66]: /fr/tracing/setup/ruby/#sidekiq
[67]: https://github.com/mperham/sidekiq
[68]: /fr/tracing/setup/ruby/#sinatra
[69]: https://github.com/sinatra/sinatra
[70]: https://github.com/jondot/sneakers
[71]: /fr/tracing/setup/ruby/#sneakers
[72]: /fr/tracing/setup/ruby/#sucker-punch
[73]: https://github.com/brandonhilkert/sucker_punch