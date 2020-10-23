---
title: Compatibility Requirements
kind: documentation
description:
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Add the tracing library to your application"
aliases:
  - /tracing/compatibility
---

Choose your language to see the compatibility requirements and supported integrations for Datadog APM.

{{< programming-lang-wrapper langs="java,python,ruby,c++,go,nodeJS,.NET,.NET Core,PHP" >}}

{{< programming-lang lang="java" >}}

The Java Datadog Trace library is open source - view the [Github repository][1] for more information.

Datadog officially supports the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java.

Beta integrations are disabled by default but can be enabled individually:

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Web Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

**Web Framework tracing provides:**

- timing HTTP request to response
- tags for the HTTP request (status code, method, etc)
- error and stacktrace capturing
- linking work created within a web request and Distributed Tracing

| Server                  | Versions   | Support Type    | Instrumentation Names (used for configuration) |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Akka-Http Server        | 10.0+      | Fully Supported | `akka-http`, `akka-http-server`                |
| Finatra Web             | 2.9+       | Fully Supported | `finatra`                                      |
| Grizzly                 | 2.0+       | [Beta][2]       | `grizzly`                                      |
| Grizzly-HTTP            | 2.3.20+    | [Beta][2]       | `grizzly-filterchain`                          |
| Java Servlet Compatible | 2.3+, 3.0+ | Fully Supported | `servlet`, `servlet-2`, `servlet-3`            |
| Jax-RS Annotations      | JSR311-API | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty (non-Servlet)     | 8+         | [Beta][2]       | `jetty`, `jetty-8`                             |
| Netty HTTP Server       | 3.8+       | Fully Supported | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1` |
| Play                    | 2.3-2.8    | Fully Supported | `play`, `play-action`                          |
| Ratpack                 | 1.5+       | Fully Supported | `ratpack`                                      |
| Spark Java              | 2.3+       | [Beta][2]       | `sparkjava` (requires `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | Fully Supported | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | Fully Supported | `spring-webflux`                               |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Tomcat, Jetty, Websphere, Weblogic, and JBoss.
Also, frameworks like Spring Boot inherently work because it usually uses a supported embedded application server (Tomcat/Jetty/Netty).

Don't see your desired web frameworks? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Networking Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- timing request to response
- tags for the request (e.g. response code)
- error and stacktrace capturing
- distributed tracing


| Framework                | Versions    | Support Type    | Instrumentation Names (used for configuration) |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        | Fully Supported | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client | 4.0+        | Fully Supported | `httpasyncclient`, `apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+, 2.2+ | Fully Supported | `aws-sdk`                                      |
| Commons HTTP Client      | 2.0+        | Fully Supported | `commons-http-client`                          |
| Google HTTP Client       | 1.19.0+     | Fully Supported | `google-http-client`                           |
| Grizzly HTTP Client      | 1.9+        | [Beta][3]         | `grizzly-client`                               |
| gRPC                     | 1.5+        | Fully Supported | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection        | all         | Fully Supported | `httpurlconnection`, `urlconnection`           |
| Kafka-Clients            | 0.11+       | Fully Supported | `kafka`                                        |
| Kafka-Streams            | 0.11+       | Fully Supported | `kafka`, `kafka-streams`                       |
| Java RMI                 | all         | Fully Supported | `rmi`, `rmi-client`, `rmi-server`              |
| Jax RS Clients           | 2.0+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| Jersey Client            | 1.9+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                      | 1 and 2     | Fully Supported | `jms`, `jms-1`, `jms-2`                        |
| Netty HTTP Client        | 4.0+        | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`              |
| Ning HTTP Client         | 1.9.0+      | [Beta][3]         | `ning`                                         |
| OkHTTP                   | 2.2+        | Fully Supported | `okhttp`, `okhttp-2`,`okhttp-3`                |
| Play WSClient            | 1.0+        | Fully Supported | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | Fully Supported | `amqp`, `rabbitmq`                             |
| Spring SessionAwareMessageListener              | 3.1+        | Fully Supported | `spring-jms-3.1`                             |
| Spring WebClient         | 5.0+        | Fully Supported | `spring-webflux`, `spring-webflux-client`      |

**Note**: Datadog's Kafka integration works with Kafka version `0.11+`, which supports the Header API. This API is used to inject and extract trace context. If you are running a mixed version environment, the Kafka broker can incorrectly report the newer version of Kafka. This causes an issue when the tracer tries to inject headers that are not supported by the local producer. Additionally, older consumers are unable to consume the message because of the presence of headers. To prevent these issues, if you are running a mixed version Kafka environment with versions older than 0.11, disable context propagation with the environment variable: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

Don't see your desired networking framework? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Data Store Compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- timing request to response
- query info (e.g. a sanitized query string)
- error and stacktrace capturing

| Database                | Versions | Support Type    | Instrumentation Names (used for configuration)                                           |
| ----------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| Couchbase               | 2.0+     | Fully Supported | `couchbase`                                                                              |
| Cassandra               | 3.X      | Fully Supported | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0-6.x  | Fully Supported | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (pick one) |
| Elasticsearch Rest      | 5.0-6.x  | Fully Supported | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
| JDBC                    | N/A      | Fully Supported | `jdbc`, `jdbc-datasource`                                                                |
| Jedis                   | 1.4+     | Fully Supported | `jedis`, `redis`                                                                         |
| Lettuce                 | 4.0+     | Fully Supported | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                             |
| MongoDB                 | 3.0+     | Fully Supported | `mongo`                                                                                  |
| RediScala               | 1.5+     | Fully Supported | `rediscala`, `redis`                                                                     |
| SpyMemcached            | 2.12+    | Fully Supported | `spymemcached`                                                                           |

`dd-java-agent` is also compatible with common JDBC drivers including:

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

Don't see your desired datastores? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Other Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework         | Versions | Support Type    | Instrumentation Names (used for configuration) |
| ----------------- | -------- | --------------- | ---------------------------------------------- |
| Dropwizard Views  | 0.7+     | Fully Supported | `dropwizard`, `dropwizard-view`                |
| Hibernate         | 3.5+     | Fully Supported | `hibernate`, `hibernate-core`                  |
| Hystrix           | 1.4+     | Fully Supported | `hystrix`                                      |
| JSP Rendering     | 2.3+     | Fully Supported | `jsp`, `jsp-render`, `jsp-compile`             |
| Slf4J MDC         | 1+       | Fully Supported | `mdc` (see also configuration for `dd.logs.injection`) |
| Project Reactor   | 3.1+     | Fully Supported | `reactor-core`                                 |
| Spring Data       | 1.8+     | Fully Supported | `spring-data`                                  |
| Spring Scheduling | 3.1+     | Fully Supported | `spring-scheduling`                            |
| Twilio SDK        | 0+       | Fully Supported | `twilio-sdk`                                   |

Don’t see your desired frameworks? Datadog is continually adding additional support. To request a framework, contact our awesome [support team][2].

To improve visibility into applications using unsupported frameworks, consider:

- [Adding custom instrumentation][4].
- [Submitting a pull request][5] with instrumentation for inclusion in a future release.
- Contacting [Datadog support][2] and submitting a feature request.

### Disabling Integrations

Most integrations are enabled by default. The following setting can change the default to disabled.

- System Property: `-Ddd.integrations.enabled=false`
- Environment Variable: `DD_INTEGRATIONS_ENABLED=false`

Integrations can be enabled or disabled individually (overriding the default above).

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(See above for each integration's name.)



[1]: https://github.com/DataDog/dd-trace-java
[2]: /help/
[3]: http://bytebuddy.net
[4]: /tracing/manual_instrumentation/java
[5]: https://github.com/DataDog/documentation#outside-contributors


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

The Python Datadog Trace library is open source. View the [Github repository][1] for more information.

Python versions `2.7+` and `3.5+` are supported in the latest version of the tracer. Python `3.4` is supported in versions `0.35.x` and below of the Python tracer.

## Integrations

To request support for additional libraries, contact our awesome [support team][2].

### Web Framework Compatibility

The `ddtrace` library includes support for a number of web frameworks, including:

| Framework                 | Supported Version | Library Documentation                                              |
| ------------------------- | ----------------- | ------------------------------------------------------------------ |
| [aiohttp][3]             | >= 1.2            | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiohttp |
| [Bottle][4]              | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#bottle  |
| [Django][5]              | >= 1.8            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [djangorestframework][5] | >= 3.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#django  |
| [Falcon][6]              | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#falcon  |
| [Flask][7]               | >= 0.10           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask   |
| [Molten][8]              | >= 0.7.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#molten  |
| [Pylons][9]              | >= 0.9.6          | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylons  |
| [Pyramid][10]             | >= 1.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pyramid |
| [Tornado][11]             | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#tornado |


### Datastore Compatibility

The `ddtrace` library includes support for the following data stores:

| Datastore                          | Supported Version | Library Documentation                                                                         |
| ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| [Cassandra][12]                    | >= 3.5            | https://ddtrace.readthedocs.io/en/stable/integrations.html#cassandra                           |
| [Elasticsearch][13]                | >= 1.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#elasticsearch                       |
| [Flask Cache][14]                  | >= 0.12           | https://ddtrace.readthedocs.io/en/stable/integrations.html#flask-cache                         |
| [Memcached][15] [pylibmc][16]      | >= 1.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pylibmc                             |
| [Memcached][15] [pymemcache][17]   | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymemcache                          |
| [MongoDB][18] [Mongoengine][19]    | >= 0.11           | https://ddtrace.readthedocs.io/en/stable/integrations.html#mongoengine                         |
| [MongoDB][18] [Pymongo][20]        | >= 3.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#pymongo                             |
| [MySQL][21] [MySQL-python][22]     | >= 1.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] [mysqlclient][23]      | >= 1.3            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.mysqldb      |
| [MySQL][21] mysql-connector        | >= 2.1            | https://ddtrace.readthedocs.io/en/stable/integrations.html#mysql-connector                     |
| [Postgres][24] [aiopg][25]         | >= 0.12.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiopg                               |
| [Postgres][24] [psycopg][26]       | >= 2.4            | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg      |
| [Redis][27]                        | >= 2.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#redis                               |
| [Redis][27] [redis-py-cluster][28] | >= 1.3.5          | https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.rediscluster |
| [SQLAlchemy][29]                   | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlalchemy                          |
| [SQLite3][30]                      | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#sqlite                              |
| [Vertica][31]                      | >= 0.6            | https://ddtrace.readthedocs.io/en/stable/integrations.html#vertica                             |


### Library Compatibility

The `ddtrace` library includes support for the following libraries:

| Library           | Supported Version | Library Documentation                                                    |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| [asyncio][32]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#asyncio     |
| [gevent][33]      | >= 1.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#gevent      |
| [aiobotocore][34] | >= 0.2.3          | https://ddtrace.readthedocs.io/en/stable/integrations.html#aiobotocore |
| [Boto2][34]       | >= 2.29.0         | https://ddtrace.readthedocs.io/en/stable/integrations.html#boto2       |
| [Botocore][34]    | >= 1.4.51         | https://ddtrace.readthedocs.io/en/stable/integrations.html#botocore    |
| [Celery][35]      | >= 4.0.2          | https://ddtrace.readthedocs.io/en/stable/integrations.html#celery      |
| [Futures][36]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#futures     |
| [Grpc][37]        | >= 1.8.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#grpc        |
| [httplib][38]     | Fully Supported   | https://ddtrace.readthedocs.io/en/stable/integrations.html#httplib     |
| [Jinja2][39]      | >= 2.7            | https://ddtrace.readthedocs.io/en/stable/integrations.html#jinja2      |
| [Kombu][40]       | >= 4.0            | https://ddtrace.readthedocs.io/en/stable/integrations.html#kombu       |
| [Mako][41]        | >= 0.1.0          | https://ddtrace.readthedocs.io/en/stable/integrations.html#mako        |
| [Requests][42]    | >= 2.08           | https://ddtrace.readthedocs.io/en/stable/integrations.html#requests    |


[1]: https://github.com/DataDog/dd-trace-py
[2]: /help
[3]: http://asgi.readthedocs.io/
[4]: https://aiohttp.readthedocs.io
[5]: https://bottlepy.org
[6]: https://www.djangoproject.com
[7]: https://falconframework.org
[8]: http://flask.pocoo.org
[9]: https://moltenframework.com
[10]: http://pylonsproject.org
[11]: https://trypyramid.com
[12]: http://www.tornadoweb.org
[13]: https://cassandra.apache.org
[14]: https://www.elastic.co/products/elasticsearch
[15]: https://pythonhosted.org/Flask-Cache
[16]: https://memcached.org
[17]: http://sendapatch.se/projects/pylibmc
[18]: https://pymemcache.readthedocs.io
[19]: https://www.mongodb.com/what-is-mongodb
[20]: http://mongoengine.org
[21]: https://api.mongodb.com/python/current
[22]: https://www.mysql.com
[23]: https://pypi.org/project/MySQL-python
[24]: https://pypi.org/project/mysqlclient
[25]: https://www.postgresql.org
[26]: https://aiopg.readthedocs.io
[27]: http://initd.org/psycopg
[28]: https://redis.io
[29]: https://redis-py-cluster.readthedocs.io
[30]: https://www.sqlalchemy.org
[31]: https://www.sqlite.org
[32]: https://www.vertica.com
[33]: https://docs.python.org/3/library/asyncio.html
[34]: http://www.gevent.org
[35]: http://docs.pythonboto.org/en/latest
[36]: http://www.celeryproject.org
[37]: https://docs.python.org/3/library/concurrent.futures.html
[38]: https://grpc.io
[39]: https://docs.python.org/2/library/httplib.html
[40]: http://jinja.pocoo.org
[41]: https://kombu.readthedocs.io/en/latest
[42]: https://www.makotemplates.org


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

The Ruby Datadog Trace library is open source - view the [Github repository][1] for more information.

**Supported Ruby interpreters**:

| Type  | Documentation              | Version | Support type                         | Gem version support |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 2.7     | Full                                 | Latest              |
|       |                            | 2.6     | Full                                 | Latest              |
|       |                            | 2.5     | Full                                 | Latest              |
|       |                            | 2.4     | Full                                 | Latest              |
|       |                            | 2.3     | Full                                 | Latest              |
|       |                            | 2.2     | Full                                 | Latest              |
|       |                            | 2.1     | Full                                 | Latest              |
|       |                            | 2.0     | Full                                 | Latest              |
|       |                            | 1.9.3   | Maintenance (until August 6th, 2020) | < 0.27.0            |
|       |                            | 1.9.1   | Maintenance (until August 6th, 2020) | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | Full                                | Latest              |

**Supported web servers**:

| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

**Supported tracing frameworks**:

| Type        | Documentation                                   | Version               | Gem version support |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (w/ Ruby 2.1+) | >= 0.16.0           |

*Full* support indicates Datadog supports all tracer features.

*Deprecated* indicates Datadog support will transition to *Maintenance* in a future release.

*Maintenance* indicates Datadog will only patch critical bugfixes.

*EOL* indicates Datadog is no longer providing support.

## Integration instrumentation

Many popular libraries and frameworks are supported out-of-the-box, which can be auto-instrumented. Although they are not activated automatically, they can be easily activated and configured by using the `Datadog.configure` API:

```ruby
Datadog.configure do |c|
  # Activates and configures an integration
  c.use :integration_name, options
end
```

`options` is a `Hash` of integration-specific configuration settings.

For a list of available integrations, and their configuration options, please refer to the following:

| Name                     | Key                        | Versions Supported: MRI  | Versions Supported: JRuby | How to configure                    | Gem source                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Link][2]*              | *[Link][3]*             |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[Link][4]*              | *[Link][5]*             |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Link][6]*              |  *[Link][7]*            |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[Link][8]*              | *[Link][9]*             |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[Link][10]*             | *[Link][11]*            |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[Link][12]*             | *[Link][13]*            |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Link][14]*             | *[Link][15]*            |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Link][16]*             | *[Link][17]*            |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Link][18]*             | *[Link][19]*            |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Link][20]*             | *[Link][21]*            |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Link][22]*             | *[Link][23]*            |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Link][24]*             | *[Link][25]*            |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Link][26]*             | *[Link][27]*            |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Link][28]*             | *[Link][29]*            |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Link][30]*             | *[Link][31]*            |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Link][32]*             | *[Link][33]*            |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *gem not available*       | *[Link][34]*             | *[Link][35]*            |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Link][36]*             | *[Link][37]*            |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Link][38]*             | *[Link][39]*            |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Link][40]*             | *[Link][41]*            |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *gem not available*       | *[Link][42]*             | *[Link][43]*            |
| Net/HTTP                 | `http`                     | *(Any supported Ruby)*   | *(Any supported Ruby)*    | *[Link][44]*             | *[Link][45]*            |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Link][46]*             | *[Link][47]*            |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Link][48]*             | *[Link][49]*            |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Link][50]*             | *[Link][51]*            |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[Link][52]*             | *[Link][53]*            |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Link][54]*             | *[Link][55]*            |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[Link][56]*             | *[Link][57]*            |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | `>= 1.0, < 2.0`           | *[Link][58]*             | *[Link][59]*            |
| Rest Client              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Link][60]*             | *[Link][61]*            |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Link][62]*             | *[Link][63]*            |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Link][64]*             | *[Link][65]*            |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Link][66]*             | *[Link][67]*            |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Link][68]*             | *[Link][69]*            |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Link][70]*             | *[Link][71]*            |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Link][72]*             | *[Link][73]*            |


[1]: https://github.com/DataDog/dd-trace-rb
[2]: /tracing/setup/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /tracing/setup/ruby/#action-view
[5]: https://github.com/rails/rails/tree/master/actionview
[6]: /tracing/setup/ruby/#active-model-serializers
[7]: https://github.com/rails-api/active_model_serializers
[8]: /tracing/setup/ruby/#action-pack
[9]: https://github.com/rails/rails/tree/master/actionpack
[10]: /tracing/setup/ruby/#active-record
[11]: https://github.com/rails/rails/tree/master/activerecord
[12]: /tracing/setup/ruby/#active-support
[13]: https://github.com/rails/rails/tree/master/activesupport
[14]: /tracing/setup/ruby/#aws
[15]: https://github.com/aws/aws-sdk-ruby
[16]: /tracing/setup/ruby/#concurrent-ruby
[17]: https://github.com/ruby-concurrency/concurrent-ruby
[18]: /tracing/setup/ruby/#dalli
[19]: https://github.com/petergoldstein/dalli
[20]: /tracing/setup/ruby/#delayedjob
[21]: https://github.com/collectiveidea/delayed_job
[22]: /tracing/setup/ruby/#elasticsearch
[23]: https://github.com/elastic/elasticsearch-ruby
[24]: /tracing/setup/ruby/#ethon
[25]: https://github.com/typhoeus/ethon
[26]: /tracing/setup/ruby/#excon
[27]: https://github.com/excon/excon
[28]: /tracing/setup/ruby/#faraday
[29]: https://github.com/lostisland/faraday
[30]: /tracing/setup/ruby/#grape
[31]: https://github.com/ruby-grape/grape
[32]: /tracing/setup/ruby/#graphql
[33]: https://github.com/rmosolgo/graphql-ruby
[34]: /tracing/setup/ruby/#grpc
[35]: https://github.com/grpc/grpc/tree/master/src/rubyc
[36]: https://github.com/httprb/http
[37]: /tracing/setup/ruby/#http-rb
[38]: https://github.com/zendesk/ruby-kafka
[39]: /tracing/setup/ruby/#kafka
[40]: /tracing/setup/ruby/#mongodb
[41]: https://github.com/mongodb/mongo-ruby-driver
[42]: /tracing/setup/ruby/#mysql2
[43]: https://github.com/brianmario/mysql2
[44]: /tracing/setup/ruby/#nethttp
[45]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[46]: /tracing/setup/ruby/#presto
[47]: https://github.com/treasure-data/presto-client-ruby
[48]: /tracing/setup/ruby/#racecar
[49]: https://github.com/zendesk/racecar
[50]: /tracing/setup/ruby/#rack
[51]: https://github.com/rack/rack
[52]: /tracing/setup/ruby/#rails
[53]: https://github.com/rails/rails
[54]: /tracing/setup/ruby/#rake
[55]: https://github.com/ruby/rake
[56]: /tracing/setup/ruby/#redis
[57]: https://github.com/redis/redis-rb
[58]: /tracing/setup/ruby/#resque
[59]: https://github.com/resque/resque
[60]: /tracing/setup/ruby/#rest-client
[61]: https://github.com/rest-client/rest-client
[62]: /tracing/setup/ruby/#sequel
[63]: https://github.com/jeremyevans/sequel
[64]: /tracing/setup/ruby/#shoryuken
[65]: https://github.com/phstc/shoryuken
[66]: /tracing/setup/ruby/#sidekiq
[67]: https://github.com/mperham/sidekiq
[68]: /tracing/setup/ruby/#sinatra
[69]: https://github.com/sinatra/sinatra
[70]: https://github.com/jondot/sneakers
[71]: /tracing/setup/ruby/#sneakers
[72]: /tracing/setup/ruby/#sucker-punch
[73]: https://github.com/brandonhilkert/sucker_punch



{{< /programming-lang >}}

{{< programming-lang lang="c++" >}}

The C++ Datadog Trace library is open source - view the [Github repository][1] for more information.

This library requires C++14 to build, but if you use [dynamic loading][2], then OpenTracing requires [C++11 or later][3].

Supported platforms include Linux and Mac. To request Windows support, [contact Datadog support][4].


[1]: https://github.com/DataDog/dd-opentracing-cpp
[2]: /tracing/setup/cpp/#dynamic-loading
[3]: https://github.com/opentracing/opentracing-cpp/#cc98
[4]: /help/

{{< /programming-lang >}}


{{< programming-lang lang="go" >}}

The Go Datadog Trace library is open source - view the [Github repository][1] for more information.

To begin tracing your Go applications, your environment must first meet the following requirements:

* Running the Datadog Agent `>= 5.21.1`
* Using Go `1.12+`

### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

**Note**: The [integrations documentation][2] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][3]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][4]               |
| [Gorilla Mux][5] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][6]                |
| [gRPC][7]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][8]     |
| [gRPC v1.2][7]   | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][9] |
| [chi][10]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][11] |
| [echo][12]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][13]              |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][14]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][15]                |
| [Elasticsearch][16]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][17]                   |
| [Cassandra][18]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][19]                       |
| [GraphQL][20]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][21]          |
| [HTTP][22]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][23]                          |
| [HTTP router][24]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][25]          |
| [Redis (go-redis)][26]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][27]                    |
| [Redis (redigo)][28]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][29]                   |
| [Redis (new redigo)][30]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][31]                   |
| [SQL][32]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][33]                      |
| [SQLx][34]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][35]                      |
| [MongoDB][36]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][37] |
| [MongoDB (mgo)[73]      | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][38]                    |
| [BuntDB][39]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][40]                    |
| [LevelDB][41]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][42]          |
| [miekg/dns][43]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][44]                         |
| [Kafka (confluent)][45] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][46]   |
| [Kafka (sarama)][47]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][48]                    |
| [Google API][49]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][50]             |
| [go-restful][51]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][52]               |
| [Twirp][53]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][54]                    |
| [Vault][55]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][56]                   |
| [Consul][57]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][58]                  |
| [Gorm][59]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][60]                       |
| [Kubernetes][61]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][62]       |
| [Memcache][63]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][64]      |


Packages must be imported, i.e.:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[3]: https://gin-gonic.com
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[5]: http://www.gorillatoolkit.org/pkg/mux
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[7]: https://github.com/grpc/grpc-go
[8]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[9]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[10]: https://github.com/go-chi/chi
[11]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[12]: https://github.com/labstack/echo
[13]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[14]: https://aws.amazon.com/sdk-for-go
[15]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[16]: https://github.com/olivere/elastic
[17]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[18]: https://github.com/gocql/gocql
[19]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[20]: https://github.com/graph-gophers/graphql-go
[21]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[22]: https://golang.org/pkg/net/http
[23]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[24]: https://github.com/julienschmidt/httprouter
[25]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[26]: https://github.com/go-redis/redis
[27]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[28]: https://github.com/garyburd/redigo
[29]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[30]: https://github.com/gomodule/redigo
[31]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[32]: https://golang.org/pkg/database/sql
[33]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[34]: https://github.com/jmoiron/sqlx
[35]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[36]: https://github.com/mongodb/mongo-go-driver
[37]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[38]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[39]: https://github.com/tidwall/buntdb
[40]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[41]: https://github.com/syndtr/goleveldb
[42]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[43]: https://github.com/miekg/dns
[44]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[45]: https://github.com/confluentinc/confluent-kafka-go
[46]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[47]: https://github.com/Shopify/sarama
[48]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[49]: https://github.com/googleapis/google-api-go-client
[50]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[51]: https://github.com/emicklei/go-restful
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[53]: https://github.com/twitchtv/twirp
[54]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[55]: https://github.com/hashicorp/vault
[56]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[57]: https://github.com/hashicorp/consul
[58]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[59]: https://github.com/jinzhu/gorm
[60]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[61]: https://github.com/kubernetes/client-go
[62]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes
[63]: https://github.com/bradfitz/gomemcache/memcache
[64]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache


{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

The NodeJS Datadog Trace library is open source - view the [Github repository][1] for more information.

Node `>=8` is supported by this library. Only even versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported.

## Supported Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][2].

For details about how to how to toggle and configure plugins, check out the [API documentation][3].

### Web Framework Compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][4]           | `>=2`    | Fully supported |                                            |
| [express][5]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][6]   |
| [fastify][7]           | `>=1`    | Fully supported |                                            |
| [graphql][8]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][9]              | `>=1.13` | Fully supported |                                            |
| [hapi][10]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][11]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][12] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][13] CLI requires static patching using [@datadog/cli][14]. |
| [paperplane][15]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][16]     |
| [restify][17]           | `>=3`    | Fully supported |                                            |

### Native Module Compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][18]   | Fully supported     |       |
| [fs][19]    | Fully supported     |       |
| [http][20]  | Fully supported     |       |
| [https][21] | Fully supported     |       |
| [http2][22] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][23]   | Fully supported     |       |

### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][24] | `>=3`    | Fully supported |                                                  |
| [couchbase][25]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][26]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][27]          | `>=2`    | Fully supported |                                                  |
| [knex][28]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][29]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][30]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][31]            | `>=2`    | Fully supported |                                                  |
| [mysql2][32]           | `>=1`    | Fully supported |                                                  |
| [pg][33]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][34]            | `>=0.12` | Fully supported |                                                  |
| [tedious][35]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker Compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][36] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][37]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][38]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][39]         | `>=2`    | Fully supported |                                                        |
| [kafka-node][40]           |          | Coming Soon     |                                                        |
| [rhea][41]                 | `>=1`    | Fully supported |                                                        |

### SDK Compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][42]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise Library Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][43]   | `>=2`     | Fully supported |
| [promise][44]    | `>=7`     | Fully supported |
| [promise-js][45] | `>=0.0.3` | Fully supported |
| [q][46]          | `>=1`     | Fully supported |
| [when][47]       | `>=3`     | Fully supported |

### Logger Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][48]     | `>=1`     | Fully supported |
| [paperplane][49] | `>=2.3.2` | Fully supported |
| [pino][50]       | `>=2`     | Fully supported |
| [winston][51]    | `>=1`     | Fully supported |


[1]: https://github.com/DataDog/dd-trace-js
[2]: /help/
[3]: https://datadog.github.io/dd-trace-js/#integrations
[4]: https://github.com/senchalabs/connect
[5]: https://expressjs.com
[6]: https://expressjs.com/en/resources/frameworks.html
[7]: https://www.fastify.io
[8]: https://github.com/graphql/graphql-js
[9]: https://grpc.io/
[10]: https://hapijs.com
[11]: https://koajs.com
[12]: https://github.com/apigee/microgateway-core
[13]: https://github.com/apigee-internal/microgateway
[14]: https://www.npmjs.com/package/@datadog/cli
[15]: https://github.com/articulate/paperplane
[16]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[17]: http://restify.com
[18]: https://nodejs.org/api/dns.html
[19]: https://nodejs.org/api/fs.html
[20]: https://nodejs.org/api/http.html
[21]: https://nodejs.org/api/https.html
[22]: https://nodejs.org/api/http2.html
[23]: https://nodejs.org/api/net.html
[24]: https://github.com/datastax/nodejs-driver
[25]: https://github.com/couchbase/couchnode
[26]: https://github.com/elastic/elasticsearch-js
[27]: https://github.com/luin/ioredis
[28]: https://knexjs.org
[29]: https://github.com/3rd-Eden/memcached
[30]: http://mongodb.github.io/node-mongodb-native/core
[31]: https://github.com/mysqljs/mysql
[32]: https://github.com/sidorares/node-mysql2
[33]: https://node-postgres.com
[34]: https://github.com/NodeRedis/node_redis
[35]: http://tediousjs.github.io/tedious
[36]: https://github.com/googleapis/nodejs-pubsub
[37]: https://github.com/noodlefrenzy/node-amqp10
[38]: https://github.com/squaremo/amqp.node
[39]: https://github.com/coopernurse/node-pool
[40]: https://github.com/SOHU-Co/kafka-node
[41]: https://github.com/amqp/rhea
[42]: https://github.com/aws/aws-sdk-js
[43]: https://github.com/petkaantonov/bluebird
[44]: https://github.com/then/promise
[45]: https://github.com/kevincennis/promise
[46]: https://github.com/kriskowal/q
[47]: https://github.com/cujojs/when
[48]: https://github.com/trentm/node-bunyan
[49]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[50]: http://getpino.io
[51]: https://github.com/winstonjs/winston


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

The .NET Datadog Trace library is open source - view the [Github repository][1] for more information.

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. It also supports [.NET Core][2].

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library            | NuGet package                  | Integration Name     |
| ------------------------------- | ------------------------------ | -------------------- |
| ASP.NET (including Web Forms)   | built-in                       | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+    | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+ | `AspNetWebApi2`      |
| WCF (server)                    | built-in                       | `Wcf`                |
| ADO.NET                         | built-in                       | `AdoNet`             |
| HttpClient / HttpMessageHandler | built-in                       | `HttpMessageHandler` |
| WebClient / WebRequest          | built-in                       | `WebRequest`         |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+ | `StackExchangeRedis` |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+   | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+     | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+   | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                  | `AdoNet`             |

**Update:** Starting with .NET Tracer version `1.12.0`, the ASP.NET integration is enabled automatically. The NuGet packages `Datadog.Trace.AspNet` or `Datadog.Trace.ClrProfiler.Managed` are no longer required. Remove them from your application when you update the .NET Tracer.

**Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. To request a framework, contact our awesome [support team][3].


[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-core/
[3]: /help/



{{< /programming-lang >}}

{{< programming-lang lang=".NET Core" >}}

The .NET Datadog Trace library is open source - view the [Github repository][1] for more information.

The .NET Tracer supports automatic instrumentation on .NET Core 2.1 and 3.1. It also supports [.NET Framework][2].

The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][3] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1.  Older versions of .NET Core on Linux/x64 have JIT compiler bugs that can cause applications to throw exceptions when using automatic instrumentation. If your application is running on .NET Core 2.0, 2.1.0-2.1.11, or 2.2.0-2.2.5, we strongly recommend you update your .NET Core runtime. If you cannot update, you may need to set the environment variable `DD_CLR_DISABLE_OPTIMIZATIONS=true` to work around the issue. See [DataDog/dd-trace-dotnet/issues/302][4] for more details.

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library            | NuGet package                                                           | Integration Name     |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+ | `AspNetCore`         |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

**Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][5] for help.


[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[5]: /help/


{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

The PHP Datadog Trace library is open source - view the [Github repository][1] for more information.

PHP APM supports the following PHP versions:

| Version    | Support type                          |
|:-----------|:--------------------------------------|
| 8.0.0 RC 1 | Experimental Support (as of `0.49.0`) |
| 7.4.x      | Fully Supported                       |
| 7.3.x      | Fully Supported                       |
| 7.2.x      | Fully Supported                       |
| 7.1.x      | Fully Supported                       |
| 7.0.x      | Fully Supported                       |
| 5.6.x      | Fully Supported                       |
| 5.5.x      | Fully Supported (as of `0.49.0`)      |
| 5.4.x      | Fully Supported                       |

PHP APM supports the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |


### Integrations

#### Web Framework Compatibility

By default, Datadog **supports all PHP web frameworks** out of the box, which allows you to see traces for spans of supported libraries—for example: database and HTTP clients.

The following table enumerates some of the frameworks and versions Datadog successfully traces.

**Web frameworks**:

| Module         | Versions      | Support Type               |
|:---------------|:--------------|:---------------------------|
| CakePHP        | 2.x           | All supported PHP versions |
| CodeIgniter    | 2.x, 3.x      | PHP 7+                     |
| Laravel        | 4.2, 5.x, 6.x | All supported PHP versions |
| Lumen          | 5.2+          | All supported PHP versions |
| Slim           | 3.x           | All supported PHP versions |
| Symfony        | 3.3, 3.4, 4.x | All supported PHP versions |
| WordPress      | 4.x, 5.x      | PHP 7+                     |
| Zend Framework | 1.12          | All supported PHP versions |
| Yii            | 1.1, 2.0      | All supported PHP versions |
| Drupal         |               | All supported PHP versions |
| Magento        | 2             | All supported PHP versions |
| Phalcon        | 1.3, 3.4      | All supported PHP versions |
| Slim           | 2.x           | All supported PHP versions |
| Neos Flow      | 1.1           | All supported PHP versions |
| FuelPHP        | 1.1           | PHP 7+                     |

Note that even if you don't see your web framework in this list, it is supported out of the box with the latest release of the tracer.

Datadog is continuously adding more support for in-depth tracing for PHP web-frameworks.  To request support for additional span metadata and framework internals, contact our awesome [support team][2].

#### CLI Library Compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Support Type    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | Fully Supported |
| Laravel Artisan | 5.x      | Fully Supported |
| Symfony Console |          | _Coming Soon_   |

To request support for additional CLI libraries, contact our awesome [support team][2].

#### Datastore Compatibility

| Module                                                                  | Versions                   | Support Type    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (using PDO or MySQLi)                                        | *(Any Supported PHP)*      | Fully Supported |
| Elasticsearch                                                           | 1.x                        | Fully Supported |
| Eloquent                                                                | Laravel supported versions | Fully Supported |
| Memcached                                                               | *(Any Supported PHP)*      | Fully Supported |
| MongoDB - via [mongo][3] extension                                      | 1.4.x                      | Fully Supported |
| MongoDB - via [mongodb][4] extension                                    | *(Any Supported PHP)*      | _Coming Soon_   |
| MySQLi                                                                  | *(Any Supported PHP)*      | Fully Supported |
| PDO (MySQL, PostgreSQL, MariaDB)                                        | *(Any Supported PHP)*      | Fully Supported |
| PhpRedis                                                                | 3, 4, 5                    | Fully Supported |
| Predis                                                                  | 1.1                        | Fully Supported |
| AWS Couchbase                                                           | AWS PHP SDK 3              | _Coming Soon_   |
| AWS DynamoDB                                                            | AWS PHP SDK 3              | _Coming Soon_   |
| AWS ElastiCache                                                         | AWS PHP SDK 3              | _Coming Soon_   |
| Doctrine ORM                                                            | 2                          | _Coming Soon_   |
| ODBC                                                                    | *(Any Supported PHP)*      | _Coming Soon_   |
| Solarium                                                                | 4.2                        | _Coming Soon_   |

To request support for additional datastores, contact our awesome [support team][2].

#### Library Compatibility

| Module     | Versions              | Support Type    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Any Supported PHP)* | Fully Supported |
| Guzzle     | 5.x                   | Fully Supported |
| Guzzle     | 6.x                   | Fully Supported |
| Beanstalkd |                       | _Coming Soon_   |
| ReactPHP   |                       | _Coming Soon_   |

To request support for additional libraries, contact our awesome [support team][2].

#### Deep call stacks on PHP 5

The call stack is limited on PHP 5. See the [deep call stack troubleshooting page][5] for more details.

### Generators

Instrumenting [generators][6] is not supported on PHP 5 and PHP 7.

[1]: https://github.com/DataDog/dd-trace-php
[2]: /help
[3]: https://pecl.php.net/package/mongo
[4]: https://pecl.php.net/package/mongodb
[5]: /tracing/troubleshooting/php_5_deep_call_stacks
[6]: https://www.php.net/manual/en/language.generators.overview.php


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

