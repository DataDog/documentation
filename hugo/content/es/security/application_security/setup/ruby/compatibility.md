---
aliases:
- /es/security/application_security/threats/setup/compatibility/ruby
title: Requisitos de compatibilidad de Ruby
---

## Funciones de App and API Protection

La biblioteca Ruby admite las siguientes funciones de App and API Protection para la versión del rastreador especificada:

| Función de App and API Protection                  | Versión mínima de rastreador Ruby |
| -------------------------------------------------- | --------------------------- |
| Threat Detection                                   | 1.9.0                       |
| Threat Protection                                  | 1.11.0                      |
| Personalizar la respuesta a las solicitudes bloqueadas             | 1.15.0                      |
| Rastreo automático de los eventos de actividad de los usuarios             | 1.14.0                      |
| Seguridad de la API                                       | 2.17.0                      |

La versión mínima de rastreador para contar con todas las funciones de App and API Protection para Ruby es v2.17.0.

### Tipos de despliegue compatibles

| Tipo              | Compatibilidad con Threat Detection |
|------------------ | ------------------------ |
| Docker            | {{< X >}}                |
| Kubernetes        | {{< X >}}                |
| Amazon ECS        | {{< X >}}                |
| AWS Fargate       | {{< X >}}                |
| AWS Lambda        |                          |
| Google Cloud Run  |                          |

## Compatibilidad con lenguajes y frameworks

### Intérpretes compatibles de Ruby 

La biblioteca de rastreo Ruby de Datadog es de código abierto. Para obtener más información, consulta el [repositorio de GitHub][2].

- Versiones de MRI 2.5 a 3.5
- Versiones de JRuby 9.2.21.0 o posterior y 9.4

Son compatibles con las siguientes arquitecturas:

- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

Debes ejecutar el Datadog Agent v7.41.1 o posterior para obtener las funciones de App and API Protection.

## Integraciones

El rastreador Ruby incluye soporte para los siguientes marcos, ORM y bibliotecas:

### Marcos web y API

- Rails
- Sinatra
- Grape

### ORM

- ActiveRecord

### Clientes HTTP

- Faraday
- Excon
- RestClient

### Otro

- GraphQL
- Rack