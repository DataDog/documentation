---
code_lang: dotnet
code_lang_weight: 10
title: Requisitos de compatibilidad de .NET
type: lenguaje de código múltiple
---

## Soporte de las capacidades de Code Security

Las siguientes capacidades de Code Security son compatibles con la librería .NET, para la versión del rastreador especificado:

| Capacidad de Code Security                      | Versión mínima de rastreador .NET |
| --------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA)   | 2.16.0                      |
| Runtime Code Analysis (IAST)                  | 2.42.0                      |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para .NET es v2.42.0.

### Tipos de despliegue compatibles
| Tipo              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                           |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                           |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                           |
| AWS Fargate       | {{< X >}}                                   | Vista previa (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | {{< X >}}                                   | {{< X >}}                           |

**Nota**: Azure App Service sólo es compatible con **aplicaciones web**. Las capacidades de Code Security no son compatibles con funciones de Azure.

## Compatibilidad con lenguajes y marcos

### Versiones de .NET compatibles

Para consultar la lista de plataformas y sistemas operativos compatibles, consulta [Compatibilidad de .NET Framework][2] y [Compatibilidad de .NET/.NET Core][1].

### Compatibilidad con web frameworks

- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la capacidad de Code Security
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos.
- Si tu marco no se encuentra en la siguiente lista, **Runtime Code Analysis (IAST)** detectará igualmente vulnerabilidades de Insecure Cookie.

| Marco                  | Runtime Code Analysis (IAST) |
| -------------------------- | ---------------------------- |
| ASP.NET MVC                | {{< X >}}                    |
| API Web ASP.NET 2          | {{< X >}}                    |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la capacidad de Code Security
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos.

| Marco         | Runtime Code Analysis (IAST) |
|-------------------|------------------------------|
| OracleDB          | {{< X >}}                    |
| ADO.NET           | {{< X >}}                    |
| SQL Server        | {{< X >}}                    |
| MySQL             | {{< X >}}                    |
| SQLite            | {{< X >}}                    |

[1]: /es/tracing/trace_collection/compatibility/dotnet-core/
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /es/remote_configuration#enabling-remote-configuration
