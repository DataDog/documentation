---
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/legacy/Compatibility-v1.md
title: Requisitos de compatibilidad de Ruby (heredado)
---
<div class="alert alert-warning">Esta documentación es para <code>ddtrace</code> gem v1.x. Si estás utilizando <code>Datadog</code> gem v2.0 o posterior, consulta la documentación más reciente sobre los <a href="https://docs.datadoghq.com/tracing/trace_collection/compatibility/ruby/">Requisitos de compatibilidad de Ruby</a>.</div>

## Compatibilidad

La biblioteca de Datadog Trace de Ruby es de código abierto. Consulta el repositorio GitHub de [dd-trace-rb][1] para obtener más información.

### Intérpretes compatibles de Ruby 

| Tipo  | Documentación              | Versión | Tipo de soporte técnico                         | Compatibilidad con versiones de Gem |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.3     | Total                                 | Última              |
|       |                            | 3.2     | Total                                 | Última              |
|       |                            | 3.1     | Total                                 | Última              |
|       |                            | 3.0     | Total                                 | Última              |
|       |                            | 2.7     | Total                                 | Última              |
|       |                            | 2.6     | Total                                 | Última              |
|       |                            | 2.5     | Total                                 | Última              |
|       |                            | 2.4     | Total                                 | Última              |
|       |                            | 2.3     | Total                                 | Última              |
|       |                            | 2.2     | Total (excepto para la creación de perfiles)          | Última              |
|       |                            | 2.1     | Total (excepto para la creación de perfiles)          | Última              |
|       |                            | 2.0     | EOL desde el 7 de junio de 2021             | < 0.50.0            |
|       |                            | 1.9.3   | EOL desde el 6 de agosto de 2020           | < 0.27.0            |
|       |                            | 1.9.1   | EOL desde el 6 de agosto de 2020           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3     | Total                                 | Última              |
|       |                            | 9.2     | Total                                 | Última              |

### Servidores web compatibles

| Tipo      | Documentación                     | Versión      | Tipo de soporte técnico |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Completa         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Total         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Total         |

### Marcos de rastreo compatibles

| Tipo        | Documentación                                   | Versión               | Compatibilidad con versiones de gem |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+                | >= 0.16.0           |

La compatibilidad *total* indica que todas las funciones del rastreador están disponibles.

*Desusada* indica que el soporte pasará a *Mantenimiento* en una futura versión.

*Mantenimiento* indica que solo las correcciones de errores críticos tienen portabilidad hasta EOL.

*EOL* indica que ya no se ofrece soporte técnico.

### Compatibilidad con macOS de Apple

El uso de `ddtrace` en macOS es compatible con el desarrollo, pero no con las implementaciones de producción.

### Soporte de Microsoft Windows 

El uso de `ddtrace` en Microsoft Windows no tiene soporte técnico en la actualidad. Seguiremos aceptando contribuciones y problemas de la comunidad,
pero los consideraremos de baja prioridad.

## Integraciones

Para consultar una lista de integraciones disponibles y sus opciones de configuración, consulta lo siguiente:

| Nombre                       | Clave                        | Versiones compatibles: MRI  | Versiones compatibles: JRuby | Cómo configurar                    | Gem source                                                                     |
| -------------------------- | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable               | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | [Enlace][2]                           | [Enlace](https://github.com/rails/rails/tree/master/actioncable)               |
| Acción Mailer              | `action_mailer`            | `>= 5.0`                 | `>= 5.0`                  | [Enlace][3]                           | [Enlace](https://github.com/rails/rails/tree/master/actionmailer)              |
| Action Pack                | `action_pack`              | `>= 3.2`                 | `>= 3.2`                  | [Enlace][4]                           | [Enlace](https://github.com/rails/rails/tree/master/actionpack)                |
| Action View                | `action_view`              | `>= 3.2`                 | `>= 3.2`                  | [Enlace][5]                           | [Enlace](https://github.com/rails/rails/tree/master/actionview)                |
| Active Job                 | `active_job`               | `>= 4.2`                 | `>= 4.2`                  | [Enlace][6]                           | [Enlace](https://github.com/rails/rails/tree/master/activejob)                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | [Enlace][7]                           | [Enlace](https://github.com/rails-api/active_model_serializers)                |
| Active Record              | `active_record`            | `>= 3.2`                 | `>= 3.2`                  | [Enlace][8]                           | [Enlace](https://github.com/rails/rails/tree/master/activerecord)              |
| Active Support             | `active_support`           | `>= 3.2`                 | `>= 3.2`                  | [Enlace][9]                           | [Enlace](https://github.com/rails/rails/tree/master/activesupport)             |
| AWS                        | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | [Enlace][10]                          | [Enlace](https://github.com/AWS/AWS-sdk-Ruby)                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | [Enlace][11]                          | [Enlace](https://github.com/Ruby-moneda/actualidad-Ruby)                  |
| Dalli                      | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | [Enlace][12]                          | [Enlace](https://github.com/petergoldstein/dalli)                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | [Enlace][13]                          | [Enlace](https://github.com/collectiveidea/delayed_job)                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | [Enlace][14]                          | [Enlace](https://github.com/elastic/elasticsearch-Ruby)                        |
| Ethon                      | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | [Enlace][15]                          | [Enlace](https://github.com/typhoeus/ethon)                                    |
| Excon                      | `excon`                    | `>= 0.50`                | `>= 0.50`                 | [Enlace][16]                          | [Enlace](https://github.com/excon/excon)                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | [Enlace][17]                          | [Enlace](https://github.com/lostisland/faraday)                                |
| Grape                      | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | [Enlace][18]                          | [Enlace](https://github.com/ruby-grape/grape)                                  |
| GraphQL                    | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | [Enlace][19]                          | [Enlace](https://github.com/rmosolgo/graphql-Ruby)                             |
| gRPC                       | `grpc`                     | `>= 1.7`                 | *gem no disponible*       | [Enlace][20]                          | [Enlace](https://github.com/grpc/grpc/tree/master/src/rubyc)                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`            | `>= 1`, `< 2`             | [Enlace][21]                          | [Enlace](https://github.com/hanami/hanami)                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | [Enlace][22]                          | [Enlace](https://github.com/httprb/http)                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                 | `>= 2.2`                  | [Enlace][23]                          | [Enlace](https://github.com/nahi/httpclient)                                   |
| httpx                      | `httpx`                    | `>= 0.11`                | `>= 0.11`                 | [Enlace][24]                          | [Enlace](https://gitlab.com/honeyryderchuck/httpx)                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | [Enlace][25]                          | [Enlace](https://github.com/zendesk/Ruby-kafka)                                |
| Makara (a través de Active Record) | `makara`                   | `>= 0.3.5`               | `>= 0.3.5`                | [Enlace][8]                           | [Enlace](https://github.com/instacart/makara)                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | [Enlace][26]                          | [Enlace](https://github.com/mongodb/mongo-Ruby-driver)                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`              | *gem no disponible*       | [Enlace][27]                          | [Enlace](https://github.com/brianmario/mysql2)                                 |
| Net/HTTP                   | `http`                     | *(Cualquier Ruby compatible)*   | *(Cualquier Ruby compatible)*    | [Enlace][28]                          | [Enlace](https://Ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html) |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`               | `>= 1.0.0`                | [Enlace][29]                          | [Enlace](https://github.com/opensearch-project/opensearch-Ruby)                |
| Postgres                   | `pg`                       | `>= 0.18.4`              | *gem no disponible*       | [Enlace][30]                          | [Enlace](https://github.com/ged/Ruby-pg)                                       |
| Presto                     | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | [Enlace][31]                          | [Enlace](https://github.com/treasure-data/presto-client-Ruby)                  |
| Qless                      | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | [Enlace][32]                          | [Enlace](https://github.com/seomoz/qless)                                      |
| Que                        | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | [Enlace] [33]                          | [Enlace](https://github.com/que-rb/que)                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | [Enlace][34]                          | [Enlace](https://github.com/zendesk/racecar)                                   |
| Rack                       | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | [Enlace][35]                          | [Enlace](https://github.com/rack/rack)                                         |
| Rails                      | `rails`                    | `>= 3.2`                 | `>= 3.2`                  | [Enlace][36]                          | [Enlace](https://github.com/rails/rails)                                       |
| Rake                       | `rake`                     | `>= 12.0`                | `>= 12.0`                 | [Enlace][37]                          | [Enlace](https://github.com/Ruby/rake)                                         |
| Redis                      | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | [Enlace][38]                          | [Enlace](https://github.com/redis/redis-rb)                                    |
| Resque                     | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | [Enlace][39]                          | [Enlace](https://github.com/resque/resque)                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | [Enlace][40]                          | [Enlace](https://github.com/rest-client/rest-client)                           |
| Roda                       | `roda`                     | `>= 2.1, <4`             | `>= 2.1, <4`              | [Enlace][41]                          | [Enlace](https://github.com/jeremyevans/roda)                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | [Enlace][42]                          | [Enlace](https://github.com/jeremyevans/sequel)                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | [Enlace][43]                          | [Enlace](https://github.com/phstc/shoryuken)                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | [Enlace][44]                          | [Enlace](https://github.com/mperham/sidekiq)                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | [Enlace][45]                          | [Enlace](https://github.com/sinatra/sinatra)                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | [Enlace][46]                          | [Enlace](https://github.com/jondot/sneakers)                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`              | `>= 5.15.0`               | [Enlace][47]                          | [Enlace](https://github.com/stripe/stripe-Ruby)                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | [Enlace][48]                          | [Enlace](https://github.com/brandonhilkert/sucker_punch)                       |

### Integraciones de CI Visibility

Las siguientes son las integraciones disponibles de CI Visibility

| Nombre      | Clave        | Versiones compatibles: MRI | Versiones compatibles: JRuby | Cómo configurar    | Gem source                                          |
|-----------|------------|-------------------------|---------------------------|---------------------|-----------------------------------------------------|
| Cucumber  | `cucumber` | `>= 3.0`                | `>= 1.7.16`               | [Enlace][49]          | [Enlace](https://github.com/cucumber/cucumber-Ruby)   |
| RSpec     | `rspec`    | `>= 3.0.0`              | `>= 3.0.0`                | [Enlace][50]          | [Enlace](https://github.com/rspec/rspec)              |

[1]: https://github.com/DataDog/dd-trace-rb
[2]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#action-cable
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#action-mailer
[4]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#action-pack
[5]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#action-view
[6]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#active-job
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#active-model-serializers
[8]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#active-record
[9]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#active-support
[10]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#aws
[11]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#concurrent-ruby
[12]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#dalli
[13]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#delayedjob
[14]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#elasticsearch
[15]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#ethon
[16]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#excon
[17]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#faraday
[18]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#grape
[19]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#graphql
[20]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#grpc
[21]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#hanami
[22]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#httprb
[23]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#httpclient
[24]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#httpx
[25]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#kafka
[26]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#mongodb
[27]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#mysql2
[28]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#nethttp
[29]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#opensearch
[30]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#postgres
[31]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#presto
[32]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#qless
[33]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#que
[34]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#racecar
[35]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#rack
[36]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#rails
[37]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#rake
[38]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#redis
[39]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#resque
[40]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#rest-client
[41]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#roda
[42]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#sequel
[43]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#shoryuken
[44]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#sidekiq
[45]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#sinatra
[46]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#sneakers
[47]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#stripe
[48]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#sucker-punch
[49]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#cucumber
[50]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#rspec