---
code_lang: go
code_lang_weight: 20
title: Requisitos de compatibilidad de Go
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería Go para la versión de rastreador especificada:

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
| Tipo        | Compatibilidad con la detección de amenazas | Análisis de composición de software |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

## Compatibilidad con lenguajes y marcos

### Versiones de Go compatibles

La librería de rastreo Go de Datadog es de código abierto. Para obtener más información, consulta el [repositorio de GitHub][2].

La librería de rastreo Go de Datadog tiene una [política de compatibilidad de versiones][3] definida para las versiones de Go. Las dos últimas versiones de Go son totalmente compatibles, mientras que la tercera versión más reciente se considera en [mantenimiento][4]. Las versiones anteriores pueden funcionar, pero no se proporciona compatibilidad por defecto. Para solicitudes especiales, [ponte en contacto con el servicio de asistencia][5].

Debes estar ejecutando el Datadog Agent v5.21.1 o posterior

A partir de la versión 1.53.0 del rastreador, las funciones de seguridad de las aplicaciones no requieren [CGO][15].

## Integraciones

El rastreador Go incluye la compatibilidad para los siguientes marcos, almacenes de datos y bibliotecas.

Los paquetes de Go que se presentan en esta página son relevantes para las funciones de seguridad de las aplicaciones. También puedes encontrar más integraciones de rastreo en la [página de compatibilidad del rastreo de APM][16].

{{< tabs >}}
{{% tab "v1" %}}

**Nota**: La [documentación de integraciones Go][6] proporciona una visión detallada de los paquetes compatibles y sus API, junto con ejemplos de uso.

<div class="alert alert-info">Si no encuentras la librería que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con web frameworks

| Marco de trabajo         | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][7]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][8] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][11]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][9]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [echo v3][10]     | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [chi][12] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### Compatibilidad con marcos de red

| Marco de trabajo             | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? |
|-----------------------|-----------------------------|------------------------------|
| [cliente gRPC][11]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [cliente net/http][13] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### Compatibilidad con almacenes de datos

| Marco de trabajo         | ¿Es compatible Threat Detection?    | ¿Es compatible Threat Protection?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

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
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

{{% /tab %}}

{{% tab "v2" %}}

**Nota**: La [documentación de integraciones Go][19] proporciona una visión detallada de los paquetes compatibles y sus API, junto con ejemplos de uso.

<div class="alert alert-info">Si no encuentras la librería que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con web frameworks

| Marco de trabajo         | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? |
|-------------------|-----------------------------|------------------------------|
| [net/http][26]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][20]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][21] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][24]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][22]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [chi][25] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### Compatibilidad con marcos de red

| Marco de trabajo             | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? |
|-----------------------|-----------------------------|------------------------------|
| [cliente gRPC][24]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [cliente net/http][26] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### Compatibilidad con almacenes de datos

| Marco de trabajo         | ¿Es compatible Threat Detection?    | ¿Es compatible Threat Protection?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][27]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo/v2
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[26]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2

{{% /tab %}}
{{< /tabs >}}

[1]: /es/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[16]: /es/tracing/compatibility_requirements/go
