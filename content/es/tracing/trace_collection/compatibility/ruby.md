---
aliases:
- /es/tracing/compatibility_requirements/ruby
- /es/tracing/setup_overview/compatibility_requirements/ruby
code_lang: Ruby
code_lang_weight: 20
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/Compatibility.md
further_reading:
- link: tracing/trace_collection/dd_libraries/ruby
  tag: Documentación
  text: Instrumentar tu aplicación
title: Requisitos de compatibilidad de Ruby
type: multi-code-lang
---
<div class="alert alert-info">Esta documentación es para <code>Datadog</code> gem v2.x. Si buscas documentación sobre <code>ddtrace</code> gem v1.x, consulta la documentación de <a href="https://docs.datadoghq.com/tracing/trace_collection/compatibility/ruby_v1/">Requisitos de compatibilidad de Ruby</a> heredado.</div>

## Compatibilidad

La biblioteca de Datadog Trace de Ruby es de código abierto. Consulta el repositorio GitHub de [dd-trace-rb][1] para obtener más información.

### Intérpretes compatibles de Ruby 

| Tipo  | Documentación              | Versión   | Tipo de soporte técnico              | Compatibilidad con versiones de Gem |
|-------|----------------------------|-----------|---------------------------|---------------------|
| MRI   | https://www.ruby-lang.org/ | 3.3       | [última](#support-latest) | Última              |
|       |                            | 3.2       | [última](#support-latest) | Última              |
|       |                            | 3.1       | [última](#support-latest) | Última              |
|       |                            | 3.0       | [última](#support-latest) | Última              |
|       |                            | 2.7       | [última](#support-latest) | Última              |
|       |                            | 2.6       | [última](#support-latest) | Última              |
|       |                            | 2.5       | [última](#support-latest) | Última              |
|       |                            | 2.4       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.3       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.2       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.1       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.0       | [EOL](#support-eol)       | < 0.50.0            |
|       |                            | 1.9       | [EOL](#support-eol)       | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3       | [última](#support-latest) | Última              |
|       |                            | 9.2.21.0+ | [última](#support-latest) | Última              |

### Servidores web compatibles

| Tipo      | Documentación                     | Versión      | Tipo de soporte técnico              |
|-----------|-----------------------------------|--------------|---------------------------|
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | [última](#support-latest) |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | [última](#support-latest) |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | [última](#support-latest) |

### Marcos de rastreo compatibles

| Tipo        | Documentación                                   | Versión | Tipo de soporte técnico        | Compatibilidad con versiones de gem |
|-------------|-------------------------------------------------|---------|---------------------|---------------------|
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+  | [EOL](#support-eol) | < 2.0.0             |

### Sistemas operativos compatibles

| SO            | Tipo de soporte técnico                            | Paquete versión |
|---------------|-----------------------------------------|-----------------|
| Linux x86_64  | [última](#support-latest)               | Última          |
| Linux aarch64 | [última](#support-latest)               | Última          |
| macOS         | Solo entornos de desarrolladores                    | Última          |
| MS Windows    | [No implementada](#support-unimplemented) | Última          |

¿Necesitas soporte de linux para una arquitectura de CPU que no aparece en la lista? [Ponte en contacto con nuestro equipo de atención al cliente para solicitudes especiales][49].

### Versiones compatibles de Datadog Agent 

| Versión de Datadog Agent | Tipo de soporte técnico              | Paquete versión |
|-----------------------|---------------------------|-----------------|
| [7.x][53]             | [última](#support-latest) | Última          |
| [6.x][53]             | [Última](#support-latest) | Última          |
| [5.x][54]             | [Última](#support-latest) | Última          |

## Integraciones

Para consultar la lista de integraciones disponibles y sus opciones de configuración, consulta lo siguiente:

| Nombre                       | Clave                        | Versiones compatibles: MRI                     | Versiones compatibles: JRuby                   | Cómo configurar | Gem Source                                                                   |
|----------------------------|----------------------------|---------------------------------------------|---------------------------------------------|------------------|------------------------------------------------------------------------------|
| Action Cable               | `action_cable`             | `>= 5.0`                                    | `>= 5.0`                                    | [Enlace][2]        | [Enlace](https://github.com/rails/rails/tree/master/actioncable)               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                                    | `>= 5.0`                                    | [Enlace][3]        | [Enlace](https://github.com/rails/rails/tree/master/actionmailer)              |
| Action Pack                | `action_pack`              | `>= 4.0`                                    | `>= 4.0`                                    | [Enlace][4]        | [Enlace](https://github.com/rails/rails/tree/master/actionpack)                |
| Action View                | `action_view`              | `>= 4.0`                                    | `>= 4.0`                                    | [Enlace][5]        | [Enlace](https://github.com/rails/rails/tree/master/actionview)                |
| Active Job                 | `active_job`               | `>= 4.2`                                    | `>= 4.2`                                    | [Enlace][6]        | [Enlace](https://github.com/rails/rails/tree/master/activejob)                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                                    | `>= 0.9`                                    | [Enlace][7]        | [Enlace](https://github.com/rails-api/active_model_serializers)                |
| Active Record              | `active_record`            | `>= 4.0`                                    | `>= 4.0`                                    | [Enlace][8]        | [Enlace](https://github.com/rails/rails/tree/master/activerecord)              |
| Active Support             | `active_support`           | `>= 4.0`                                    | `>= 4.0`                                    | [Enlace][9]        | [Enlace](https://github.com/rails/rails/tree/master/activesupport)             |
| AWS                        | `aws`                      | `>= 2.0`                                    | `>= 2.0`                                    | [Enlace][10]       | [Enlace](https://github.com/AWS/AWS-sdk-Ruby)                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                                    | `>= 0.9`                                    | [Enlace][11]       | [Enlace](https://github.com/ruby-concurrency/concurrent-ruby)                  |
| Dalli                      | `dalli`                    | `>= 2.0`                                    | `>= 2.0`                                    | [Enlace][12]       | [Enlace](https://github.com/petergoldstein/dalli)                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                                    | `>= 4.1`                                    | [Enlace][13]       | [Enlace](https://github.com/collectiveidea/delayed_job)                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                                    | `>= 1.0`                                    | [Enlace][14]       | [Enlace](https://github.com/elastic/elasticsearch-Ruby)                        |
| Ethon                      | `ethon`                    | `>= 0.11`                                   | `>= 0.11`                                   | [Enlace][15]       | [Enlace](https://github.com/typhoeus/ethon)                                    |
| Excon                      | `excon`                    | `>= 0.50`                                   | `>= 0.50`                                   | [Enlace][16]       | [Enlace](https://github.com/excon/excon)                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                                   | `>= 0.14`                                   | [Enlace][17]       | [Enlace](https://github.com/lostisland/faraday)                                |
| Grape                      | `grape`                    | `>= 1.0`                                    | `>= 1.0`                                    | [Enlace][18]       | [Enlace](https://github.com/ruby-grape/grape)                                  |
| GraphQL                    | `graphql`                  | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | [Enlace][19]       | [Enlace](https://github.com/rmosolgo/graphql-ruby)                             |
| gRPC                       | `grpc`                     | `>= 1.7`                                    | *gem no disponible*                         | [Enlace][20]       | [Enlace](https://github.com/grpc/grpc/tree/master/src/rubyc)                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`                               | `>= 1`, `< 2`                               | [Enlace][21]       | [Enlace](https://github.com/hanami/hanami)                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                                    | `>= 2.0`                                    | [Enlace][22]       | [Enlace](https://github.com/httprb/http)                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                                    | `>= 2.2`                                    | [Enlace][23]       | [Enlace](https://github.com/nahi/httpclient)                                   |
| httpx                      | `httpx`                    | `>= 0.11`                                   | `>= 0.11`                                   | [Enlace][24]       | [Enlace](https://gitlab.com/honeyryderchuck/httpx)                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`                                 | `>= 0.7.10`                                 | [Enlace][25]       | [Enlace](https://github.com/zendesk/ruby-kafka)                                |
| Makara (a través de Active Record) | `makara`                   | `>= 0.3.5`                                  | `>= 0.3.5`                                  | [Enlace][8]        | [Enlace](https://github.com/instacart/makara)                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                                    | `>= 2.1`                                    | [Enlace][26]       | [Enlace](https://github.com/mongodb/mongo-ruby-driver)                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`                                 | *gem no disponible*                         | [Enlace][27]       | [Enlace](https://github.com/brianmario/mysql2)                                 |
| Net/HTTP                   | `http`                     | *(Cualquier Ruby compatible)*                      | *(Cualquier Ruby compatible)*                      | [Enlace][28]       | [Enlace](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html) |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`                                  | `>= 1.0.0`                                  | [Enlace][29]       | [Enlace](https://github.com/opensearch-project/opensearch-ruby)                |
| Postgres                   | `pg`                       | `>= 0.18.4`                                 | *gem no disponible*                         | [Enlace][30]       | [Enlace](https://github.com/ged/ruby-pg)                                       |
| Presto                     | `presto`                   | `>= 0.5.14`                                 | `>= 0.5.14`                                 | [Enlace][31]       | [Enlace](https://github.com/treasure-data/presto-client-ruby)                  |
| Que                        | `que`                      | `>= 1.0.0.beta2`                            | `>= 1.0.0.beta2`                            | [Enlace][33]       | [Enlace](https://github.com/que-rb/que)                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`                                  | `>= 1.3.5`                                  | [Enlace][34]       | [Enlace](https://github.com/zendesk/racecar)                                   |
| Rack                       | `rack`                     | `>= 1.1`                                    | `>= 1.1`                                    | [Enlace][35]       | [Enlace](https://github.com/rack/rack)                                         |
| Rails                      | `rails`                    | `>= 4.0`                                    | `>= 4.0`                                    | [Enlace][36]       | [Enlace](https://github.com/rails/rails)                                       |
| Rake                       | `rake`                     | `>= 12.0`                                   | `>= 12.0`                                   | [Enlace][37]       | [Enlace](https://github.com/ruby/rake)                                         |
| Redis                      | `redis`                    | `>= 3.2`                                    | `>= 3.2`                                    | [Enlace][38]       | [Enlace](https://github.com/redis/redis-rb)                                    |
| Resque                     | `resque`                   | `>= 1.0`                                    | `>= 1.0`                                    | [Enlace][39]       | [Enlace](https://github.com/resque/resque)                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                                    | `>= 1.8`                                    | [Enlace][40]       | [Enlace](https://github.com/rest-client/rest-client)                           |
| Roda                       | `roda`                     | `>= 2.1, <4`                                | `>= 2.1, <4`                                | [Enlace][41]       | [Enlace](https://github.com/jeremyevans/roda)                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                                   | `>= 3.41`                                   | [Enlace][42]       | [Enlace](https://github.com/jeremyevans/sequel)                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                                    | `>= 3.2`                                    | [Enlace][43]       | [Enlace](https://github.com/phstc/shoryuken)                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`                                  | `>= 3.5.4`                                  | [Enlace][44]       | [Enlace](https://github.com/mperham/sidekiq)                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                                    | `>= 1.4`                                    | [Enlace][45]       | [Enlace](https://github.com/sinatra/sinatra)                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`                                 | `>= 2.12.0`                                 | [Enlace][46]       | [Enlace](https://github.com/jondot/sneakers)                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`                                 | `>= 5.15.0`                                 | [Enlace][47]       | [Enlace](https://github.com/stripe/stripe-ruby)                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                                    | `>= 2.0`                                    | [Enlace][48]       | [Enlace](https://github.com/brandonhilkert/sucker_punch)                       |

### Política de soporte técnico

Datadog para Ruby se basa en dependencias definidas en versiones específicas del sistema operativo host, el tiempo de ejecución de Ruby,
ciertas bibliotecas de Ruby y el Datadog Agent/API. Cuando estas versiones dejan de tener soporte técnico de sus encargados de mantenimiento, Datadog para Ruby también limita su soporte técnico a estas.

#### Niveles de soporte técnico

| **Nivel**                                             | **Asistencia prestada**                                                                                                                      |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte técnico</span>     | Posiblemente funcional, pero no probado ni compatible. [Ponte en contacto con nuestro equipo de atención al cliente para solicitudes especiales][49].                           |
| <span id="support-unimplemented">No implementado</span> | Sin implementación. [Ponte en contacto con nuestro equipo de atención al cliente para solicitudes especiales][49].                                                          |
| <span id="support-prerelease">Prelanzamiento</span>      | Implementación inicial. Puede que aún no contenga todas las funciones. La asistencia para nuevas funciones y la corrección de errores y de seguridad se ofrecen en la medida de lo posible. |
| <span id="support-latest">Última</span>               | Implementación completa de todas las funciones. Soporte completo para nuevas funciones, correcciones de errores y de seguridad.                                                 |
| <span id="support-maintenance">Mantenimiento</span>     | Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte técnico solo para correcciones críticas de errores y de seguridad.                  |
| <span id="support-eol">Final de servicio (EOL)</span>       | Sin soporte. La versión puede seguir utilizándose, pero no se proporcionarán correcciones de errores.                                                               |

#### Control de versiones de paquete

Prácticas de Datadog para Ruby [control de versiones semántico][50].

Como esto se refiere a la reducción de soporte de tiempo de ejecución, implica:

- **Las actualizaciones de versiones principales** (por ejemplo, de `1.0.0` a `2.0.0`) pueden cambiar la compatibilidad con cualquier tiempo de ejecución.
  de [Beta](#support-prerelease)/[Última](#support-latest)
  a [Mantenimiento](#support-maintenance)/[EOL](#support-eol).
- **Las actualizaciones de versiones secundarias** (por ejemplo, de `1.0.0` a `1.1.0`) pueden cambiar la compatibilidad con cualquier tiempo de ejecución.
  de [Beta](#support-prerelease)/[Última](#support-latest) a [Mantenimiento](#support-maintenance).
- **Las actualizaciones de versiones de parches** (por ejemplo, de `1.0.0` a `1.0.1`) no modificarán la compatibilidad con ningún tiempo de ejecución.

#### Soporte técnico de versiones de la biblioteca

Datadog para Ruby proporcionará soporte de GA para la última versión principal y soporte de mantenimiento para la versión principal anterior
de la biblioteca. Este soporte se proporcionará a través de la última versión secundaria o de parche de la versión principal.
Por ejemplo, si 1.21.0 es la última versión de la biblioteca con soporte de mantenimiento, las correcciones de errores se proporcionarán a través de una
nueva versión 1.21.0 (o 1.20.1). Estas correcciones no se trasladarán como parches a versiones secundarias anteriores de 1.x.

| Versión principal de Gem | Tipo de soporte técnico                        |
|-------------------|-------------------------------------|
| 2.x               | [Última](#support-latest)           |
| 1.x               | [Mantenimiento](#support-maintenance) |
| 0.x               | [EOL](#support-eol)                 |

#### Recursos de soporte adicionales

- [Atención al cliente de Datadog][49]
- [Documentación de configuración de Datadog para Ruby][51]
- [Repositorio GitHub de Datadog para Ruby][52]

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

[49]: https://www.datadoghq.com/support

[50]: https://semver.org

[51]: https://docs.datadoghq.com/es/tracing/setup_overview/setup/ruby

[52]: https://github.com/DataDog/dd-trace-rb

[53]: https://docs.datadoghq.com/es/agent/basic_agent_usage/?tab=agentv6v7

[54]: https://docs.datadoghq.com/es/agent/basic_agent_usage/?tab=agentv5