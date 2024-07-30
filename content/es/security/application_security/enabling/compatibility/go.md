---
code_lang: go
code_lang_weight: 20
title: Requisitos de compatibilidad de Go
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la biblioteca Go para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones                   | Versión mínima de rastreador Go |
| -------------------------------- | ----------------------------|
| Detección de amenazas| 1.47.0  |
| Seguridad de la API | 1.59.0 |
| Protección frente a amenazas |  1.50.0   |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.53.0 |
| Análisis de la composición del software (SCA) | 1.49.0 |
| Seguridad del código  | No compatible |
| Seguimiento automático de los eventos de actividades de usuarios | No compatible |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para Go es v1.59.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][1], que se incluye en la versión mínima de rastreador indicada.

### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Análisis de la composición del software |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

## Compatibilidad con lenguajes y marcos

### Versiones de Go compatibles

La biblioteca de rastreo Go de Datadog es de código abierto. Para obtener más información, consulta el [repositorio de GitHub][2].

La biblioteca de rastreo Go de Datadog tiene una [política de compatibilidad de versiones][3] definida para las versiones de Go. Las dos últimas versiones de Go son totalmente compatibles, mientras que la tercera versión más reciente se considera en [mantenimiento][4]. Las versiones anteriores pueden funcionar, pero no se proporciona compatibilidad por defecto. Para solicitudes especiales, [ponte en contacto con el servicio de asistencia][5]. 

Debes estar ejecutando el Datadog Agent v5.21.1 o posterior

A partir de la versión 1.53.0 del rastreador, las funciones de seguridad de las aplicaciones no requieren [CGO][15].

## Integraciones

El rastreador Go incluye la compatibilidad para los siguientes marcos, almacenes de datos y bibliotecas.

Los paquetes de Go que se presentan en esta página son relevantes para las funciones de seguridad de las aplicaciones. También puedes encontrar más integraciones de rastreo en la [página de compatibilidad del rastreo de APM][16].

**Nota**: La [documentación de integraciones Go][6] proporciona una visión detallada de los paquetes compatibles y sus API, junto con ejemplos de uso.

<div class="alert alert-info">Si no encuentras la biblioteca que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con marcos web

| Marco         | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | {{< X >}}  | {{< X >}} |
| [Gin] [7]          | {{< X >}} | {{< X >}} |
| [Gorilla Mux][8] | {{< X >}} | {{< X >}} |
| [gRPC][11]          | {{< X >}} | {{< X >}} |
| [echo v4][9]     | {{< X >}}  | {{< X >}} |
| [echo v3][10]     | {{< X >}} | {{< X >}} |
| [chi][12] | {{< X >}} | {{< X >}} |
| [graphql-go][17] | {{< X >}} | {{< X >}} |
| [gqlgen][18] | {{< X >}} | {{< X >}} |


### Compatibilidad de marcos de red

| Marco             | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
|-----------------------|-----------------------------|------------------------------|
| [cliente gRPC][11]     | {{< X >}}                   | {{< X >}} |
| [cliente net/http][13] | {{< X >}}                   | {{< X >}} |

### Compatibilidad con almacenes de datos

| Marco         | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | {{< X >}} |   {{< X >}}    |

[1]: /es/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[15]: https://github.com/golang/go/wiki/cgo
[16]: /es/tracing/compatibility_requirements/go
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql