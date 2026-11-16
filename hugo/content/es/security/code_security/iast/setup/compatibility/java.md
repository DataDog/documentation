---
code_lang: java
code_lang_weight: 0
title: Requisitos de compatibilidad de Java
type: multi-code-lang
---
## Funcionalidades de Application Security {#application-security-capabilities}

Las siguientes funcionalidades de seguridad de aplicaciones son compatibles con la biblioteca de Java para la versión del tracer especificada:

| Funcionalidad de seguridad de aplicaciones  | Versión mínima del tracer de Java |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| API Security | 1.31.0 |
| Threat Protection| 1.9.0 |
| Personalice la respuesta a las solicitudes bloqueadas | 1.11.0 |
| Software Composition Analysis (SCA) | 1.1.4 |
| Code Security  | 1.15.0|
| Rastreo automático de eventos de actividad del usuario | 1.20.0 |

La versión mínima del tracer para obtener todas las funcionalidades de seguridad de aplicaciones admitidas para Java es 1.31.0.

**Nota**: Threat Protection requiere habilitar [Remote Configuration][2], que se incluye en la versión mínima del tracer indicada.

### Tipos de implementación admitidos {#supported-deployment-types}
| Tipo              | Compatibilidad con Threat Detection | Software Composition Analysis |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure App Service | {{< X >}}                | {{< X >}}                     |

**Nota**: Azure App Service es compatible **únicamente con aplicaciones web**. Application Security no es compatible con Azure Functions.

## Compatibilidad de lenguaje y framework {#language-and-framework-compatibility}

### Versiones de Java compatibles {#supported-java-versions}
Java Tracer admite la instrumentación automática para los siguientes entornos de ejecución JVM de Oracle JDK y OpenJDK.

| Versiones de JVM | Sistemas operativos                                                               | Nivel de soporte                       | Versión del trazador |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 a 21      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)               | Admitido                | Más reciente         |


Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.

Las versiones 22 y superiores son compatibles en versión preliminar.

**Compatibilidad con Kotlin**: Kotlin es compatible a través del trazador de Java. Debido a que Kotlin se compila en bytecode de JVM, se ejecuta en los mismos runtimes de JVM enumerados anteriormente, sin necesidad de configuración adicional más allá de la configuración estándar de Java.

### Compatibilidad con marcos web {#web-framework-compatibility}

**Las integraciones de frameworks web proporcionan:**

- Detalles de la solicitud HTTP de la fuente del atacante
- Etiquetas para la solicitud HTTP (código de estado, método, etc.)
- Distributed Tracing para ver los flujos de ataque a través de sus aplicaciones

##### Notas sobre las funcionalidades de Application Security {#application-security-capability-notes}
- **Software Composition Analysis** es compatible con todos los frameworks
- Si **Code Security** no es compatible con su framework, aún detectará vulnerabilidades de Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag y Cookie without SameSite Flag.



| Framework                  | Versiones   | ¿Compatible con Threat Detection? | ¿Compatible con Threat Protection? |¿Code Security? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Java Servlet | 2.3+, 3.0+ |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |  {{< X >}} |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4+, 4+   |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como Websphere, Weblogic y JBoss. Además, marcos de trabajo como Spring Boot (versión 3) funcionan de forma inherente porque generalmente utilizan un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

<div class="alert alert-info">Si no encuentra su framework preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad del marco de trabajo de red {#networking-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos de trabajo de red.

**El rastreo de red proporciona:**

- Trazado distribuido a través de sus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre las funcionalidades de Application Security {#application-security-capability-notes-1}
- **Software Composition Analysis** es compatible con todos los marcos de trabajo
- Si **Code Security** no es compatible con su framework, aún detectará vulnerabilidades de Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag y Cookie without SameSite Flag.


| Framework                | Versiones    | ¿Compatible con Threat Detection? | ¿Compatible con Threat Protection? | ¿Code Security? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        |  {{< X >}} |  |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |  |
| HttpURLConnection        | todos       |  {{< X >}} |  |  |
| Jax RS Clients           | 2.0+        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Jersey Server            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Netty HTTP Server        |  3.8+           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |  |

<div class="alert alert-info">Si no encuentra su framework preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con almacenes de datos {#data-store-compatibility}

`dd-java-agent` incluye soporte para el rastreo automático de los siguientes marcos de trabajo/controladores de base de datos.

**El rastreo de Datastore proporciona:**

- Tiempo transcurrido entre la solicitud y la respuesta
- Información de consulta (por ejemplo, una cadena de consulta saneada)
- Captura de errores y seguimientos de pila

##### Notas sobre las funcionalidades de Application Security {#application-security-capability-notes-2}
- **Software Composition Analysis** es compatible con todos los frameworks
- **Threat Protection** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos de forma predeterminada, incluso aquellas que no aparecen en la tabla a continuación.
- Si su framework no figura entre los compatibles a continuación, **Code Security** no detectará vulnerabilidades de inyección SQL, pero seguirá detectando los demás tipos de vulnerabilidades enumerados [aquí][3].

| Base de datos                | Versiones | ¿Compatible con Threat Detection? |  ¿Code Security? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0+     |  {{< X >}} |   |
| Couchbase               | 2.0+     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | 3.0-4.0+ |  {{< X >}} |   |

`dd-java-agent` también es compatible con controladores JDBC comunes para Threat Detection, tales como:

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

<div class="alert alert-info">Si no encuentra su framework preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con marcos de autenticación de usuario {#user-authentication-frameworks-compatibility}

**Las integraciones con marcos de autenticación de usuario proporcionan:**

- Eventos de inicio de sesión de usuario, incluidos los ID de usuario
- Monitoreo de eventos de inicio de sesión de usuarios para la detección de Account Takeover

| Marco         | Versión mínima del marco |
|-------------------|---------------------------|
| Spring Security   | 5.5+                      |


[1]: /es/tracing/trace_collection/compatibility/java/
[2]: /es/tracing/guide/remote_config/
[3]: /es/security/code_security/software_composition_analysis/