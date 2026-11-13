---
code_lang: dotnet
code_lang_weight: 10
title: Requisitos de compatibilidad de .NET
type: multi-code-lang
---
## Compatibilidad con las capacidades de Application Security {#application-security-capabilities-support}

Las siguientes capacidades de seguridad de aplicaciones son compatibles con la biblioteca .NET, para la versión del tracer especificada:

| Capacidad de seguridad de aplicaciones  | Versión mínima del tracer de .NET |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| Personalización de la respuesta a las solicitudes bloqueadas | 2.27.0 |
| Software Composition Analysis (SCA) |  2.16.0  |
| Code Security  | 2.42.0  |
| Seguimiento automático de eventos de actividad del usuario | 2.32.0 |
| API Security | 2.42.0 |

La versión mínima del tracer para obtener todas las capacidades de seguridad de aplicaciones admitidas para .NET es 2.42.0.

**Nota**: Threat Protection requiere habilitar [Remote Configuration][3], que se incluye en la versión mínima del tracer indicada.

### Tipos de implementación admitidos {#supported-deployment-types}
| Tipo              | Compatibilidad con Threat Detection | Software Composition Analysis | Code Security |
|-------------------|--------------------------|-------------------------------|---------------|
| Docker            | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     | Preview (2.42.0) |
| AWS Lambda        | {{< X >}}                |                               |               |
| Azure App Service | {{< X >}}                | {{< X >}}                     | {{< X >}}     |

**Nota**: Azure App Service es compatible **solo con aplicaciones web**. Las capacidades de seguridad de aplicaciones no son compatibles con Azure Functions.

## Compatibilidad de lenguajes y frameworks {#language-and-framework-compatibility}

### Versiones de .NET compatibles {#supported-net-versions}

Todas las versiones enumeradas en esta sección están generalmente disponibles (GA).

Code Security admite los siguientes entornos de ejecución de .NET y .NET Core:

| Versión de .NET  | Fin de vida útil de Microsoft | Versión del paquete    |
| ------------- | --------------------- | ------------------ |
| .NET 10       | _2028-11-14_   | más reciente (>= 3.31.0) |
| .NET 9        | _2026-11-10_   | más reciente (>= 3.6.0)  |
| .NET 8        | _2026-11-10_   | más reciente (>= 2.42.0) |
| .NET 7        | 2024-05-14          | más reciente (>= 2.42.0) |
| .NET 6        | 2024-11-12     | más reciente (>= 2.42.0) |
| .NET 5        | 2022-05-10          | más reciente (>= 2.42.0) |
| .NET Core 3.1 | 2022-12-13     | más reciente (>= 2.42.0) |

Code Security admite las siguientes versiones de .NET Framework:

| Versión de .NET Framework | Fin de vida útil de Microsoft | Versión del paquete |
| ---------------------- | --------------------- | --------------- |
| 4.8                    |                       | más reciente          |
| 4.7.2                  |                       | más reciente          |
| 4.7                    |                       | más reciente          |
| 4.6.2                  |                       | más reciente          |
| 4.6.1                  | 2022-04-26        | más reciente          |

Estos son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- Windows (msvc) x86, x86-64

Para obtener más información sobre los entornos de ejecución y los sistemas operativos que admite el tracer de .NET, consulte [Requisitos de compatibilidad de .NET y .NET Core][1] y [Requisitos de compatibilidad de .NET Framework][2].

### Compatibilidad con marcos web {#web-framework-compatibility}

**Las integraciones con frameworks web proporcionan:**

- Detalles de la solicitud HTTP de la fuente del atacante
- etiquetas para la solicitud HTTP (código de estado, método, etc.)
- Distributed Tracing para ver los flujos de ataque a través de sus aplicaciones

##### Notas sobre las capacidades de seguridad de aplicaciones {#application-security-capability-notes}
- **Software Composition Analysis** es compatible con todos los frameworks.
- Si su framework no aparece en la lista a continuación, **Code Security** aún detecta vulnerabilidades de cookies inseguras.


| Framework                  | ¿Es compatible con Threat Detection? | ¿Es compatible con Threat Protection? | ¿Code Security? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET Core (incluidas las API mínimas) | {{< X >}} | {{< X >}} | {{< X >}} |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">Si no ve su framework preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con almacenes de datos {#data-store-compatibility}

**El rastreo de Datastore proporciona:**

- Detección de ataques SQL
- información de consulta (por ejemplo, una cadena de consulta saneada)
- captura de errores y seguimientos de pila

##### Notas sobre la capacidad de seguridad de la aplicación {#application-security-capability-notes-1}
- **Threat Protection** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos de forma predeterminada, incluso aquellas que no figuran en la tabla a continuación.

| Framework         | ¿Es compatible con Threat Detection?    | ¿Es compatible con Threat Protection? | ¿Code Security? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### Compatibilidad con frameworks de autenticación de usuarios {#user-authentication-frameworks-compatibility}

Las integraciones con **frameworks de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuario, incluidos los ID de usuario
- Eventos de registro de usuario (aplicaciones que usan SignInManager integrado)
- Monitoreo de la detección de Account Takeover en eventos de inicio de sesión de usuarios

| Framework         |
|-------------------|
| > .Net Core 2.1   |

[1]: /es/tracing/trace_collection/compatibility/dotnet-core/
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /es/remote_configuration#enabling-remote-configuration