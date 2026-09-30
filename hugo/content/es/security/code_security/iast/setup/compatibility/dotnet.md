---
code_lang: dotnet
code_lang_weight: 10
title: Requisitos de compatibilidad de .NET
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería .NET para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador .NET |
| -------------------------------- | ----------------------------|
| Detección de amenazas | 2.23.0|
| Protección frente a amenazas  | 2.26.0|
| Personalizar la respuesta a las solicitudes bloqueadas | 2.27.0 |
| Análisis de la composición del software (SCA) |  2.16.0  |
| Seguridad del código  | 2.42.0  |
| Rastreo automático de los eventos de actividad de los usuarios | 2.32.0 |
| Seguridad de la API | 2.42.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para .NET es v2.42.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][3], que se incluye en la versión mínima de rastreador indicada.

### Tipos de despliegue compatibles
| Tipo              | Compatibilidad con la detección de amenazas | Software Composition Analysis            |
|-------------------|--------------------------|------------------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                                |
| Kubernetes        | {{< X >}}                | {{< X >}}                                |
| Amazon ECS        | {{< X >}}                | {{< X >}}                                |
| AWS Fargate       | {{< X >}}                | {{< X >}}                                |
| AWS Lambda        | {{< X >}}                |                                          |
| Azure App Service | {{< X >}}                | {{< X >}}                                |

**Nota**: Azure App Service es compatible **sólo con aplicaciones web**. La seguridad de las aplicaciones no es compatible con funciones Azure.

## Compatibilidad con lenguajes y marcos

### Versiones de .NET compatibles

| Versión de .NET Framework  | Fin de vida de Microsoft | Nivel de compatibilidad                       | Versión del paquete             |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- |
| 4.8                     |                       | GA   | última                      |
| 4.7.2                   |                       | GA | última                      |
| 4.7                     |                       | GA | última                      |
| 4.6.2                   |                       | GA | última                      |
| 4.6.1                   | 04/26/2022            | GA   | última |


Son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- macOS (Darwin) x86-64, ARM64
- Windows (msvc) x86, x86-64



### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si tu marco no se encuentra en la siguiente lista, la **Seguridad del código** seguirá detectando vulnerabilidades relacionadas con cookies inseguras.


| Marco                  | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| API Web ASP.NET 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- Detección de ataques SQL
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.

| Marco         | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Eventos de inicio de sesión de usuarios (aplicaciones que utilizan SignInManager integrado)
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         |
|-------------------|
| anterior a .Net Core 2.1   |

[1]: /es/tracing/trace_collection/compatibility/dotnet-core/
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /es/agent/remote_config/#enabling-remote-configuration
