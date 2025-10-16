---
aliases:
- /es/security/application_security/enabling/single_step/code_security/
- /es/security/application_security/enabling/tracing_libraries/code_security/
- /es/security/application_security/code_security/setup/
disable_toc: false
title: Configurar Runtime Code Analysis (IAST)
---

## Requisitos previos
Antes de configurar Runtime Code Analysis (IAST), asegúrate de que se cumplen los siguientes requisitos previos:

1. **Instalación del Datadog Agent:** El Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
2. **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio, y las trazas (traces) web (`type:web`) son recibidas por Datadog.
3. **Biblioteca de rastreo compatible:** La librería de rastreo de Datadog utilizada por tu aplicación o servicio admite funcionalidades de Runtime Code Analysis (IAST) para el lenguaje de tu aplicación o servicio. Para ver más detalles, consulta la sección **Requisitos de compatibilidad** más abajo.

## Uso de librerías de rastreo de Datadog

Selecciona el lenguaje de tu aplicación para obtener información detallada sobre cómo activar Runtime Code Analysis (IAST) para tu lenguaje y tus tipos de infraestructura.


{{% collapse-content title="Java" level="h4" %}}

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones Java que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Sigue estos pasos para activar Runtime Code Analysis (IAST) en tu servicio:

1. [Actualiza tu Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más información, consulta **Requisitos de compatibilidad** más abajo.
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación.

   Desde la línea de comandos:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos de herramientas de orquestación, dependiendo de dónde se ejecuta tu aplicación.

   **Nota**: Los sistemas de archivos de solo lectura no son compatibles. La aplicación debe tener acceso a un directorio `/tmp` en el que se pueda escribir.


#### CLI Docker

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Archivo Docker

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

Actualiza tu archivo de configuración de despliegue para APM y añade la variable de entorno de IAST:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/security/code_security/iast/setup/
[3]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/


{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h4" %}}

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones .NET que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Sigue estos pasos para activar Runtime Code Analysis (IAST) en tu servicio:

1. [Actualiza tu Datadog Agent][3] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más información, consulta **Requisitos de compatibilidad** más abajo.
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación. Por ejemplo, en Windows autoalojado, ejecuta el siguiente fragmento de PowerShell como parte del script de inicio de la aplicación:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

O uno de los siguientes métodos, dependiendo de dónde se ejecuta tu aplicación:

#### Windows-autoalojado

En una consola Windows:

```sh
rem Configura variables de entorno
SET DD_IAST_ENABLED=true

rem Iniciar aplicación
dotnet.exe ejemplo.dll
```

#### IIS

Ejecuta el siguiente comando de PowerShell como administrador para configurar las variables de entorno necesarias en el registro `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` y reinicia IIS.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```

#### Linux

Añade lo siguiente a la configuración de tu aplicación:

```
DD_IAST_ENABLED=true
```

#### CLI Docker

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando docker run:

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```

#### Archivo Docker

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

Actualiza tu archivo de configuración de despliegue para APM y añade la variable de entorno de ASM:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### AWS ECS

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### AWS Fargate

Añade la siguiente línea a tu contenedor Dockerfile:

```
ENV DD_IAST_ENABLED=true
```

Para ver Runtime Code Analysis (IAST) en acción, navega por tu servicio y encuentra vulnerabilidades a nivel de código en el [Explorador de vulnerabilidades][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Vídeo que muestra vulnerabilidades del código" video="true" >}}

Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][5].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/code_security/iast/setup/
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/code_security/iast/setup/
[5]: /es/help

{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h4" %}}

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones Node.js que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Sigue estos pasos para activar Runtime Code Analysis (IAST) en tu servicio:

1. [Actualiza tu Datadog Agent][4] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más información, consulta **Requisitos de compatibilidad** más abajo.
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación.

   Si inicializas la librería de APM en la línea de comandos utilizando la opción `--require` para Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   A continuación, utiliza variables de entorno para habilitar ASM:
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   La forma de hacerlo varía en función de dónde se ejecuta el servicio:

#### CLI Docker

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Archivo Docker

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

Actualiza el contenedor del archivo yaml de configuración para APM y añade la variable de entorno AppSec:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

[1]: https://github.com/DataDog/dd-trace-js/blob/main/MIGRATING.md
[2]: /es/security/code_security/iast/setup/nodejs/
[3]: /es/security/code_security/iast/setup/
[4]: /es/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /es/help

{{% /collapse-content %}}

{{% collapse-content title="Python" level="h4" %}}

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones Python que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

NOTA: La detección de vulnerabilidades a nivel de código en Python está en fase de Vista previa.

Sigue estos pasos para activar Runtime Code Analysis (IAST) en tu servicio:

1. [Actualiza tu Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más información, consulta **Requisitos de compatibilidad** más abajo.
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación.

   Desde la línea de comandos:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:


#### CLI Docker

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Archivo Docker

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

Actualiza tu archivo de configuración de despliegue para APM y añade la variable de entorno de IAST:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### Nota sobre la compatibilidad de librerías de terceros

Runtime Code Analysis (IAST) modifica el código Python en tiempo de ejecución. Esto podría causar conflictos con otras bibliotecas de terceros Python que realizan transformaciones de código similares, en particular los siguientes, aunque sin limitarse a ellos:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

Además, Runtime Code Analysis (IAST) no propaga correctamente los rangos de taint sobre el código nativo (compilado). Por lo tanto, si tu código se basa en gran medida en módulos escritos en C o C++,
utilizando la API CPython, o en sistemas de lenguaje intermedio como Cython, los resultados podrían ser menos precisos de lo esperado.


[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /es/security/code_security/iast/setup/python
[3]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/

{{% /collapse-content %}}

### Configuración de acabado

1. Reinicia tu servicio.
2. Para ver Runtime Code Analysis (IAST) en acción, navega por tu servicio y encuentra vulnerabilidades a nivel de código en el [Explorador de vulnerabilidades][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Vídeo que muestra vulnerabilidades del código" video="true" >}}

Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][5].

[1]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help

## Requisitos de compatibilidad

Se admiten las siguientes funcionalidades de ASM, en relación con la librería de rastreo de cada lenguaje:

| Función de seguridad de las aplicaciones               | Java    | .NET     | Node.js        | Python        | Go              | Ruby          | PHP           |
|-----------------------------------------------|---------|----------|----------------|---------------|-----------------|---------------|---------------|
| Runtime Code Analysis (IAST)                  | 1.15.0  | 2.42.0   | v4.18.0         | Vista previa       | No compatible   | No compatible | No compatible |

Selecciona el lenguaje de tu aplicación para obtener más información sobre la compatibilidad de marcos y funciones.

{{% collapse-content title="Java" level="h4" %}}

### Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería Java para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador Java  |
| -------------------------------- | ----------------------------|
| Detección de amenazas | 1.8.0  |
| Seguridad de la API | 1.31.0 |
| Protección frente a amenazas| 1.9.0 |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.11.0 |
| Análisis de la composición del software (SCA) | 1.1.4 |
| Runtime Code Analysis (IAST)  | 1.15.0|
| Rastreo automático de los eventos de actividad de los usuarios | 1.20.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para Java es v1.31.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima de rastreador indicada.

#### Tipos de despliegue compatibles
| Tipo              | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------------|--------------------------|-------------------------------|
| Docker            | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Kubernetes        | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Amazon ECS        | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Fargate       | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Lambda        | <i class="icon-check-bold"></i>                |                               |
| Azure App Service | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |

**Nota**: Azure App Service es compatible **sólo con aplicaciones web**. La seguridad de las aplicaciones no es compatible con funciones Azure.

### Compatibilidad con lenguajes y marcos

#### Versiones compatibles de Java
El rastreador Java es compatible con la instrumentación automática para los tiempos de ejecución Oracle JDK y OpenJDK de máquinas virtuales Java.

| Versiones de máquinas virtuales Java | Sistemas operativos                                                               | Nivel de compatibilidad                       | Versión del rastreador |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| v8 a v17      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)               | Compatible                | Último         |


Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.

#### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si **Runtime Code Analysis (IAST)** no es compatible con tu marco de trabajo, sigue detectando las vulnerabilidades Cifrado débil, Hashing débil, Aleatoriedad débil, Cookie insegura, Cookie sin indicador HttpOnly y Cookie sin indicador SameSite.



| Marco                  | Versiones   | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0 o posterior       |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Glassfish               |            |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Java Servlet | 2.3 o posterior, 3.0 o posterior |   <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Jetty                   | 7.0-9.x, 10.x    |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Spring Boot             | 1.5        |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Spring Web (MVC)        | 4.0 o posterior       |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Spring WebFlux          | 5.0 o posterior       |            |            |  <i class="icon-check-bold"></i> |
| Tomcat                  | 5.5 o posterior       |   <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Vert.x                  | 3.4-3.9.x  |   <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como por ejemplo Websphere, Weblogic y JBoss. Además, los marcos como Spring Boot (versión 3) funcionan de forma inherente, ya que suelen utilizar un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

#### Compatibilidad de marcos de red

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos de red.

**El rastreo de redes proporciona:**

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si **Runtime Code Analysis (IAST)** no es compatible con tu marco, sigue detectando las vulnerabilidades Cifrado débil, Hashing débil, Cookie insegura, Cookie sin indicador HttpOnly, Cookie sin indicador SameSite, Falta encabezado HSTS y Falta encabezado X-Content-Type-Options.


| Marco                | Versiones    | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Cliente HTTP Apache       | 4.0 o posterior        |  <i class="icon-check-bold"></i> |  |  |
| gRPC                     | 1.5 o posterior        |  <i class="icon-check-bold"></i> |  |  |
| HttpURLConnection        | todos         |  <i class="icon-check-bold"></i> |  |  |
| Clientes de Jax RS           | 2.0 o posterior        |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>  |
| Servidor Jersey            | 1.9-2.29    |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i> |
| Servidor HTTP Netty        |  3.8 o posterior           |  <i class="icon-check-bold"></i> |    |  |
| RESTEasy                 |  3.0.x          |  <i class="icon-check-bold"></i> |    |  |
| Spring SessionAwareMessageListener     | 3.1 o posterior            |  <i class="icon-check-bold"></i> |  |  |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

#### Compatibilidad con almacenes de datos

`dd-java-agent` incluye compatibilidad para el rastreo automático de los siguientes marcos/controladores de bases de datos.

**El rastreo de almacenes de datos proporciona:**

- Temporización de la solicitud a la respuesta
- Información de consulta (por ejemplo, una cadena de consulta desinfectada)
- Captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.
- Si tu marco de trabajo no es compatible, **Runtime Code Analysis (IAST)** no detectará vulnerabilidades de inyección SQL, pero seguirá detectando el resto de tipos de vulnerabilidades mencionadas [aquí][3].

| Base de datos                | Versiones | ¿Es compatible la detección de amenazas? |  ¿Runtime Code Analysis (IAST)? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0 o posterior     |  <i class="icon-check-bold"></i> |   |
| Couchbase               | 2.0 o posterior     |  <i class="icon-check-bold"></i> |   |
| JDBC                    | N/A      |  <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i> |
| MongoDB                 | 3.0-4.0 o posterior |  <i class="icon-check-bold"></i> |   |

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

#### Compatibilidad con marcos de autenticación de usuarios

Las integraciones a los marcos de autenticación de usuarios proporcionan:

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         | Versión mínima de marco |
|-------------------|---------------------------|
| Spring Security   | 5.5 o posterior                      |


[1]: /es/tracing/trace_collection/compatibility/java/
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /es/security/application_security/vulnerability_management/#manage-code-level-vulnerabilities

{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h4" %}}

### Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería .NET para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador .NET |
| -------------------------------- | ----------------------------|
| Detección de amenazas | 2.23.0|
| Protección frente a amenazas  | 2.26.0|
| Personalizar la respuesta a las solicitudes bloqueadas | 2.27.0 |
| Análisis de la composición del software (SCA) |  2.16.0  |
| Runtime Code Analysis (IAST)  | 2.42.0  |
| Rastreo automático de los eventos de actividad de los usuarios | 2.32.0 |
| Seguridad de la API | 2.42.0 |

La versión mínima de rastreador para contar con todas las funciones de seguridad de las aplicaciones compatibles para .NET es v2.42.0.

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][3], que se incluye en la versión mínima de rastreador indicada.

#### Tipos de despliegue compatibles
| Tipo              | Compatibilidad con la detección de amenazas | Software Composition Analysis            |
|-------------------|--------------------------|------------------------------------------|
| Docker            | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                                |
| Kubernetes        | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                                |
| Amazon ECS        | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                                |
| AWS Fargate       | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                                |
| AWS Lambda        | <i class="icon-check-bold"></i>                |                                          |
| Azure App Service | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                                |

**Nota**: Azure App Service es compatible **sólo con aplicaciones web**. La seguridad de las aplicaciones no es compatible con funciones Azure.

### Compatibilidad con lenguajes y marcos

#### Versiones de .NET compatibles

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



#### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones

- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si tu marco de trabajo no se encuentra en la siguiente lista, **Runtime Code Analysis (IAST)** seguirá detectando vulnerabilidades de tipo Cookie insegura.


| Marco                  | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | <i class="icon-check-bold"></i>  |<i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| API Web ASP.NET 2 | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i>  |

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

#### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- Detección de ataques SQL
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.

| Marco         | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
|-------------------|-----------------|---------------------|---|
| OracleDB         | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |<i class="icon-check-bold"></i>    |
| ADO.NET         | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |<i class="icon-check-bold"></i>    |
| SQL Server         | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |<i class="icon-check-bold"></i>    |
| MySQL       | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |<i class="icon-check-bold"></i>    |
| SQLite         | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |<i class="icon-check-bold"></i>    |

#### Compatibilidad con marcos de autenticación de usuarios

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


{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h4" %}}

### Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería Node.js, para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones        | Versión mínima del rastreador Node.js                     |
|----------------------------------------|----------------------------------------------------|
| Detección de amenazas                       | 4.0.0                                              |
| Protección frente a amenazas                      | 4.0.0                                              |
| Personalizar la respuesta a las solicitudes bloqueadas | 4.1.0                                              |
| Análisis de la composición del software (SCA)    | 4.0.0                                              |
| Runtime Code Analysis (IAST)           | 4.18.0 para Node.js 16 o posterior, o 5.0.0 para Node.js 18 o posterior.   |
| Rastreo automático de los eventos de actividad de los usuarios | 4.4.0 para Node.js 16 o posterior                              |
| Seguridad de la API                           | 4.30.0 para Node.js 16 o posterior, o 5.6.0 para Node.js 18 o posterior.   |

La versión mínima del rastreador para obtener todas las funciones de seguridad de las aplicaciones compatibles con Node.js es la v4.30.0.


**Nota**:
- La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima del rastreador indicada.

#### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Kubernetes  | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Amazon ECS  | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Fargate | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Lambda  | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |

### Compatibilidad con lenguajes y marcos

#### Compatibilidad con versiones de Node.js

Cuando el proyecto Node.js deja de ser compatible con una versión principal de LTS (cuando llega al fin de su ciclo de vida), también deja de ser compatible con la siguiente versión principal de `dd-trace`.
La última versión principal de la librería `dd-trace` es compatible con esa versión EOL de Node.js durante al menos otro año en modo de mantenimiento.

Algunos problemas no pueden solucionarse en `dd-trace` y deben solucionarse en Node.js. Cuando esto ocurre y la versión de Node.js en cuestión es EOL, no es posible solucionar el problema sin pasar a otra versión que no sea EOL.
Datadog no ofrece nuevas versiones de `dd-trace` para ofrecer una compatibilidad específica para las líneas de versiones principales de Node.js que no son LTS (versiones impares).

Para obtener el mejor nivel de compatibilidad, ejecuta siempre la última versión LTS de Node.js y la última versión principal de `dd-trace`. Sea cual sea la versión de Node.js que utilices, utiliza también la última versión de Node.js en esa línea de versiones, para asegurarte de que dispones de las últimas correcciones de seguridad.

Para obtener más información sobre la versión de Node.js, consulta la [documentación oficial de Node.js][4].



#### Compatibilidad con sistemas operativos

Los siguientes sistemas operativos son oficialmente compatibles con `dd-trace`. Es probable que cualquier sistema operativo que no aparezca en la lista funcione, pero con algunas características ausentes, por ejemplo, las funciones de seguridad de las aplicaciones, la generación de perfiles y las métricas de tiempo de ejecución. En general, son compatibles los sistemas operativos que se mantienen de forma activa en el momento del lanzamiento inicial de una versión principal.


| Sistema operativo | Arquitecturas | Versiones mínimas                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |





#### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si tu marco no se encuentra en la siguiente lista, **Runtime Code Analysis (IAST)** sigue detectando vulnerabilidades de Cifrado débil, Hashing débil, Aleatoriedad débil, Cookie insegura, Cookie sin indicador HttpOnly, Cookie sin indicador SameSite, Falta encabezado HSTS y Falta encabezado X-Content-Type-Options.


| Marco | Versiones | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | igual o anterior a la v4      | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| nextjs    | igual o anterior a la v11.1   | <i class="icon-check-bold"></i>                   |                              |                                                    |


<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>


### Compatibilidad de marcos de red

El rastreo de redes proporciona:

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de seguridad de las aplicaciones

- **El Análisis de la composición del software** es compatible con todos los marcos.



| Marco | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| https     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |


<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos

El rastreo de almacenes de datos proporciona:

- Temporización de la solicitud a la respuesta
- Información de consulta (por ejemplo, una cadena de consulta desinfectada)
- Captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones

- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.


| Marco                | Versiones  | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Runtime Code Analysis (IAST)? |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `>=4`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [apollo-server-core][44] | `>=3`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [cassandra-driver][28]   | `>=3`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [couchbase][29]          | `^2.4.2`  | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [elasticsearch][30]      | `>=10`    | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [ioredis][31]            | `>=2`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [knex][32]               | `>=0.8`   | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [mariadb][5]             | `>=3`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [memcached][33]          | `>=2.2`   | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [mongodb-core][34]       | `>=2`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| [mysql][35]              | `>=2`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| [mysql2][36]             | `>=1`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| [oracledb][37]           | `>=5`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [pg][38]                 | `>=4`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |
| [redis][39]              | `>=0.12`  | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [sharedb][40]            | `>=1`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [tedioso][41]            | `>=1`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    |                                                    |
| [sequelize][42]          | `>=4`     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i>                    | <i class="icon-check-bold"></i>                                          |


### Compatibilidad de los marcos de autenticación de usuarios

Las integraciones a los marcos de autenticación de usuarios proporcionan:

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco       | Versión mínima de marco |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /es/tracing/trace_collection/compatibility/nodejs/
[2]: /es/agent/remote_config/#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: http://mongodb.github.io/node-mongodb-native/core
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core


{{% /collapse-content %}}

{{% collapse-content title="Python" level="h4" %}}

### Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería Python para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones  | Versión mínima de rastreador Python |
| -------------------------------- | ----------------------------|
| Detección de amenazas | 1.9.0   |
| Protección frente a amenazas | 1.10.0  |
| Personalizar la respuesta a las solicitudes bloqueadas | 1.19.0 |
| Análisis de la composición del software (SCA) | 1.5.0  |
| Runtime Code Analysis (IAST)         | Vista previa (2.9.3)  |
| Rastreo automático de los eventos de actividad de los usuarios | 1.17.0 |
| Seguridad de la API | 2.6.0 |

**Nota**: La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima de rastreador indicada.

#### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Kubernetes  | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| Amazon ECS  | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Fargate | <i class="icon-check-bold"></i>                | <i class="icon-check-bold"></i>                     |
| AWS Lambda  | <i class="icon-check-bold"></i>                |                               |


### Compatibilidad con lenguajes y marcos

#### Versiones compatibles de Python

La librería cliente de APM de Python sigue una [política de control de versiones][3] en la cual se especifica el nivel de compatibilidad para las diferentes versiones de la librería y el tiempo de ejecución de Python.

Se admiten dos ramificaciones de versiones:

| Versión    | Nivel de compatibilidad        |
|------------|----------------------|
| `<1`       | Mantenimiento           |
| `>=1.0,<2` | Disponibilidad general |

Y la librería es compatible con los siguientes tiempos de ejecución:

| Sistema operativo      | CPU                   | Tiempo de ejecución | Versión de tiempo de ejecución | Versiones de ddtrace compatibles |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                     |
| Windows | 64 bits, 32 bits          | CPython | 2.7, 3.5-3.11   | `<2`                     |


#### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones

- **El Análisis de la composición del software** es compatible con todos los marcos.

#### Marcos compatibles


| Marco                | Versiones    | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Django    | 1.8   |  <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i>  |
| Flask     | 0.10  |  <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i>  |

La compatibilidad de las cadenas de consulta no está disponible para Flask.

<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

#### Compatibilidad con almacenes de datos

El rastreo de almacenes de datos proporciona:

- temporización de solicitud a respuesta
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones

- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.
La librería Python es compatible con las [especificaciones de API de bases de datos][4] y admite todas las bases de datos SQL genéricas. Esto incluye bases de datos como SQLite, Mysql, Postgres y MariaDB.

#### Compatibilidad con marcos de autenticación de usuarios

Las integraciones a los marcos de autenticación de usuarios proporcionan:

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco         | Versiones de marcos   |
|-------------------| --------------------------- |
| Django            | 1.11, 2.2, 3.2, igual o anterior a 4.0

[1]: /es/tracing/trace_collection/compatibility/python/
[2]: /es/agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/


{{% /collapse-content %}}
