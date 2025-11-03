---
code_lang: java
code_lang_weight: 0
title: Requisitos de compatibilidad Java
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería Java para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador Java  |
| -------------------------------- | ----------------------------|
| Detección de amenazas | 1.8.0  |
| Seguridad de la API | 1.31.0 |
| Protección frente a amenazas| 1.9.0 |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.11.0 |
| Análisis de la composición del software (SCA) | 1.1.4 |
| Seguridad del código  | 1.15.0|
| Rastreo automático de los eventos de actividad de los usuarios | 1.20.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para Java es v1.31.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima de rastreador indicada.

### Tipos de despliegue compatibles
| Tipo              | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure App Service | {{< X >}}                | {{< X >}}                     |

**Nota**: Azure App Service es compatible **sólo con aplicaciones web**. La seguridad de las aplicaciones no es compatible con funciones Azure.

## Compatibilidad con lenguajes y marcos

### Versiones compatibles de Java
El rastreador Java es compatible con la instrumentación automática para los tiempos de ejecución Oracle JDK y OpenJDK de máquinas virtuales Java.

| Versiones de máquinas virtuales Java | Sistemas operativos                                                               | Nivel de compatibilidad                       | Versión del rastreador |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 a 21      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)               | Compatible                | Último         |


Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.

Las versiones 22 y posteriores son compatibles como en Vista previa.

### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si la **Seguridad del código** no es compatible con tu marco, aún así detectará las siguientes vulnerabilidades: Cifrado débil, Hashing débil, Cookie insegura, Cookie sin marca HttpOnly y Cookie sin marca SameSite.



| Marco                  | Versiones   | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |¿Seguridad del código? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0 o posterior       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Java Servlet | 2.3 o posterior, 3.0 o posterior |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0 o posterior       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0 o posterior       |            |            |  {{< X >}} |
| Tomcat                  | 5.5 o posterior       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4+, 4+   |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como por ejemplo Websphere, Weblogic y JBoss. Además, los marcos como Spring Boot (versión 3) funcionan de forma inherente, ya que suelen utilizar un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad de marcos de red

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos de red.

**El rastreo de redes proporciona:**

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si la **Seguridad del código** no es compatible con tu marco, aún así detectará las siguientes vulnerabilidades: Cifrado débil, Hashing débil, Cookie insegura, Cookie sin marca HttpOnly y Cookie sin marca SameSite.


| Marco                | Versiones    | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Cliente HTTP Apache       | 4.0 o posterior        |  {{< X >}} |  |  |
| gRPC                     | 1.5 o posterior        |  {{< X >}} |  |  |
| HttpURLConnection        | todos         |  {{< X >}} |  |  |
| Clientes de Jax RS           | 2.0 o posterior        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Servidor Jersey            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Servidor HTTP Netty        |  3.8 o posterior           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | 3.1 o posterior            |  {{< X >}} |  |  |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos/controladores de bases de datos.

**El rastreo de almacenes de datos proporciona:**

- Temporización de la solicitud a la respuesta
- Información de consulta (por ejemplo, una cadena de consulta desinfectada)
- Captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.
- Si tu marco no aparece como compatible más abajo, la **Seguridad del código** no detectará vulnerabilidades de inyección SQL, pero sí detectará el resto de los tipos de vulnerabilidades presentadas [aquí][3].

| Base de datos                | Versiones | ¿Es compatible la detección de amenazas? |  ¿Seguridad del código? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0 o posterior     |  {{< X >}} |   |
| Couchbase               | 2.0 o posterior     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | 3.0-4.0 o posterior |  {{< X >}} |   |

`dd-java-agent` también es compatible con controladores JDBC comunes para la detección de amenazas, tales como:

- Derby Apache
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

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         | Versión mínima de marco |
|-------------------|---------------------------|
| Spring Security   | 5.5 o posterior                      |


[1]: /es/tracing/trace_collection/compatibility/java/
[2]: /es/tracing/guide/remote_config/
[3]: /es/security/code_security/software_composition_analysis/
