---
code_lang: java
code_lang_weight: 0
title: Requisitos de compatibilidad Java
type: lenguaje de código múltiple
---

## Funciones de protección de las aplicaciones y las API

Las siguientes funciones de protección de las aplicaciones y las API son compatibles con la biblioteca Java para la versión de rastreador especificada:

| Función de protección de las aplicaciones y las API  | Versión mínima de rastreador Java  |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| Seguridad de la API | 1.31.0 |
| Threat Protection| 1.9.0 |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.11.0 |
| Análisis de la composición del software (SCA) | 1.1.4 |
| Code Security  | 1.15.0|
| Seguimiento automático de los eventos de actividades de usuarios | 1.20.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para Java es v1.31.0.

**Nota**: Threat Protection requiere habilitar la [configuración remota][2], que se incluye en la versión mínima de rastreador indicada.

### Tipos de despliegue compatibles
| Tipo              | Compatibilidad con Threat Detection | Análisis de composición de software |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure App Service | {{< X >}}                | {{< X >}}                     |

**Nota**: Azure App Service es compatible **sólo con aplicaciones web**. La protección de las aplicaciones y las API no es compatible con las funciones de Azure.

## Compatibilidad con lenguajes y marcos de trabajo

### Versiones compatibles de Java 
El rastreador Java es compatible con la instrumentación automática para los tiempos de ejecución Oracle JDK y OpenJDK de máquinas virtuales Java.

| Versiones de máquinas virtuales Java | Sistemas operativos                                                               | Nivel de compatibilidad                       | Versión del rastreador |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| v8 a v17      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)               | Compatibles                | Último         |


Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.






### Compatibilidad con marcos web

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de protección de las aplicaciones y las API
- **El Análisis de la composición del software** es compatible con todos los marcos de trabajo.
- Si **Code Security** no es compatible con tu marco de trabajo, aún así detectará las siguientes vulnerabilidades: Cifrado débil, Hashing débil, Cookie insegura, Cookie sin marca HttpOnly y Cookie sin marca SameSite.



| Marco de trabajo                  | Versiones   | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? |¿Code Security? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0 o posterior       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| gRPC                    | v1.5 o posterior       |  {{< X >}} | {{< tooltip text="N/A" tooltip="Blocking not yet available for gRPC" >}} |  {{< X >}} |
| Java Servlet | v2.3 o posterior, v3.0 o posterior |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | v4.0 o posterior       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | v5.0 o posterior       |            |            |  {{< X >}} |
| Tomcat                  | v 5.5 o posterior       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4-3.9.x  |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como por ejemplo Websphere, Weblogic y JBoss. Además, los marcos de trabajo como Spring Boot (versión 3) funcionan de forma inherente, ya que suelen utilizar un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

<div class="alert alert-info">Si no encuentras el marco de trabajo que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con marcos de red

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos de red.

**El rastreo de redes proporciona:**

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de protección de las aplicaciones y las API
- **Software Composition Analysis** es compatible con todos los marcos de trabajo.
- Si **Code Security** no es compatible con tu marco de trabajo, aún así detectará las siguientes vulnerabilidades: Cifrado débil, Hashing débil, Cookie insegura, Cookie sin marcador HttpOnly y Cookie sin marcador SameSite.


| Marco de trabajo                | Versiones    | ¿Es compatible Threat Detection? | ¿Es compatible Threat Protection? | ¿Code Security? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Cliente HTTP Apache       | v4.0 o posterior        |  {{< X >}} |  |  |
| gRPC                     | v1.5 o posterior        |  {{< X >}} |  |  |
| HttpURLConnection        | todos         |  {{< X >}} |  |  |
| Clientes Jax RS           | v2.0 o posterior        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Jersey Server            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Netty HTTP Server        |  v3.8 o posterior           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | v3.1 o posterior            |  {{< X >}} |  |  |

<div class="alert alert-info">Si no encuentras el marco de trabajo que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos de trabajo/controladores de bases de datos.

El **rastreo del almacén de datos proporciona:**

- Temporización de la solicitud a la respuesta
- Información de consulta (por ejemplo, una cadena de consulta desinfectada)
- Captura de errores y trazas de stack tecnológico

##### Notas sobre la función de protección de las aplicaciones y las API
- **Software Composition Analysis** es compatible con todos los marcos de trabajo de trabajo.
- **Threat Protection** también funciona en la capa de la solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso para las que no aparecen en la siguiente tabla.
- Si tu marco de trabajo no aparece como compatible más abajo, **Code Security** no detectará vulnerabilidades de inyección SQL, pero sí detectará el resto de los tipos de vulnerabilidades presentadas [aquí][3].

| Base de datos                | Versiones | ¿Es compatible Threat Detection? |  ¿Code Security? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | v4.0 o posterior     |  {{< X >}} |   |
| Couchbase               | v2.0 o posterior     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | v3.0-4.0 o posterior |  {{< X >}} |   |

`dd-java-agent` también es compatible con controladores JDBC frecuentes para Threat Detection, tales como:

- Apache Derby
- Firebird SQL
- Motor de base de datos H2
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

<div class="alert alert-info">Si no encuentras el marco de trabajo que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco de trabajo         | Versión mínima de marco de trabajo |
|-------------------|---------------------------|
| Spring Security   | v5.5 o posterior                      |


[1]: /es/tracing/trace_collection/compatibility/java/
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /es/security/code_security/software_composition_analysis/