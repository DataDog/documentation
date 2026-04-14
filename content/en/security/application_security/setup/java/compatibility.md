---
title: Java Compatibility Requirements
aliases:
  - /security/application_security/threats/setup/compatibility/java
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the Java library, for the specified tracer version:

| App and API Protection capability                   | Minimum Java tracer version |
| -------------------------------------------------- | --------------------------- |
| Threat Detection                                   | 0.94.0                      |
| Threat Protection                                  | 0.94.0                      |
| Customize response to blocked requests             | 0.94.0                      |
| Automatic user activity event tracking             | 0.94.0                      |
| API Security                                       | 0.94.0                      |

The minimum tracer version to get all supported App and API Protection capabilities for Java is 0.94.0.

**Note**: Threat Protection requires enabling [Remote Configuration][1], which is included in the listed minimum tracer version.



### Supported deployment types

Threat Detection is supported for the following deployment types:

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate
- AWS Lambda
- Google Cloud Run

## Language and framework compatibility

### Supported Java versions

The Datadog Java Tracing library is open source. View the [GitHub repository][2] for more information.

The Datadog Java Tracing Library supports Java 8 and newer versions. For optimal performance and feature support, we recommend using the latest LTS version of Java.

You must be running Datadog Agent v7.41.1+ for App and API Protection features.

## Integrations

The Java tracer includes support for the following frameworks, data stores, and libraries:

### Web frameworks
- Spring Boot
- Spring Web
- Spring WebFlux
- JAX-RS
- Play Framework
- Spark Java
- Vert.x
- gRPC

### Data stores
- JDBC
- MongoDB
- Redis
- Elasticsearch
- Cassandra
- Couchbase

### Message brokers
- Kafka
- RabbitMQ
- JMS

### Other
- OkHttp
- Apache HttpClient
- JSP
- Servlet
- GraphQL

For a complete list of supported integrations and their versions, see the [Java tracer documentation][3].

[1]: /agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-java
[3]: /tracing/trace_collection/compatibility_requirements/java
