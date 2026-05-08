---
aliases:
- /es/security/application_security/threats/setup/compatibility/java
title: Requisitos de compatibilidad Java
---

## Funciones de protección de las aplicaciones y las API

Las siguientes funciones de protección de las aplicaciones y las API son compatibles con la biblioteca Java para la versión de rastreador especificada:

| Función de protección de las aplicaciones y las API                   | Versión mínima de rastreador Java  |
| -------------------------------------------------- | --------------------------- |
| Threat Detection                                   | 0.94.0                      |
| Threat Protection                                  | 0.94.0                      |
| Personalizar la respuesta a las solicitudes bloqueadas             | 0.94.0                      |
| Rastreo automático de los eventos de actividad de los usuarios             | 0.94.0                      |
| Seguridad de la API                                       | 0.94.0                      |

La versión mínima de rastreador para contar con todas las funciones de App and API Protection para Java es v1.31.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][1], que se incluye en la versión mínima de rastreador indicada.



### Tipos de despliegue compatibles

La detección de amenazas es compatible con los siguientes tipos de despliegues:

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate
- AWS Lambda
- Google Cloud Run

## Compatibilidad con lenguajes y frameworks

### Versiones compatibles de Java 

La biblioteca de rastreo Java de Datadog es de código abierto. Para obtener más información, consulta el [repositorio de GitHub][2].

La biblioteca de rastreo de Datadog es compatible con Java 8 y versiones posteriores. Para un rendimiento y compatibilidad óptimos, recomendamos utilizar la última versión LTS de Java.

Debes ejecutar el Datadog Agent v7.41.1 o posterior para las funciones de App and API Protection.

## Integraciones

El rastreador Java incluye compatibilidad con los siguientes marcos, almacenes de datos y bibliotecas:

### Marcos web
- Spring Boot
- Spring Web
- Spring WebFlux
- JAX-RS
- Play Framework
- Spark Java
- Vert.x
- gRPC

### Almacenes de datos
- JDBC
- MongoDB
- Redis
- Elasticsearch
- Cassandra
- Couchbase

### Corredores de mensajes
- Kafka
- RabbitMQ
- JMS

### Otro
- OkHttp
- Apache HttpClient
- JSP
- Servlet
- GraphQL

Para obtener una lista completa de las integraciones admitidas y sus versiones, consulta la [documentación del rastreador Java][3].

[1]: /es/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-java
[3]: /es/tracing/trace_collection/compatibility_requirements/java