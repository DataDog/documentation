---
code_lang: ruby
code_lang_weight: 30
title: Requisitos de compatibilidad de Ruby
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la biblioteca Ruby para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador Ruby |
| -------------------------------- | ----------------------------|
| Detección de amenazas  | 1.9.0  |
| Protección frente a amenazas | 1.11.0 |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.15.0 |
| Análisis de la composición del software (SCA) | 1.11.0 |
| Seguridad del código        | No compatible |
| Rastreo automático de los eventos de actividad de los usuarios | 1.14.0 |
| Seguridad de la API | 1.15.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para Ruby es v1.15.0.

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                |                               |
| Kubernetes  | {{< X >}}                |                               |
| Amazon ECS  | {{< X >}}                |                               |
| AWS Fargate | {{< X >}}                |                               |
| AWS Lambda  |                          |                               |

## Compatibilidad con lenguajes y marcos


**Intérpretes Ruby compatibles**
La biblioteca Ruby de Datadog es compatible con el último gem para los siguientes intérpretes Ruby:

- [MRI][2] versiones 2.1 a 3.1

Son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, aarch64
- Alpine Linux (musl) x86-64, aarch64
- macOS (Darwin) x86-64, arm64

### Servidores web compatibles
- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- La **Seguridad del código** no es compatible

| Marco                | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
| ------------------------ | ----------- | --------------- |
| Rack          |  {{< X >}} |  {{< X >}} |
| Rails         |  {{< X >}} |  {{< X >}} |
| Sinatra       |  {{< X >}} |  {{< X >}} |
| Grape         |  {{< X >}} |  {{< X >}} |
| Unicorn       |  {{< X >}} |  {{< X >}} |
| Passenger     |  {{< X >}} |  {{< X >}} |

| Servidor web del marco    | Versión mínima de marco   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (también depende de la versión de Ruby ) |
| Sinatra                 | 1.4                         |

### Compatibilidad de marcos de red

**El rastreo de redes proporciona:**

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de seguridad de las aplicaciones
- La **Seguridad del código** no es compatible

| Marco         | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| Rack         | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>


### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- Detección de ataques SQL
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- La **Seguridad del código** no es compatible
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.

| Marco         | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| MongoDB        | {{< X >}} |   {{< X >}}    |
| Active Record        | {{< X >}} |   {{< X >}}    |
| MySQL2        | {{< X >}} |   {{< X >}}    |
| Presto        | {{< X >}} |   {{< X >}}    |
| Resque        | {{< X >}} |   {{< X >}}    |
| Sequel        | {{< X >}} |   {{< X >}}    |
| Elasticsearch     | {{< X >}} |   {{< X >}}    |

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         | Versión mínima de marco   |
|-------------------| --------------------------- |
| Devise            | 3.2.1

[1]: /es/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/