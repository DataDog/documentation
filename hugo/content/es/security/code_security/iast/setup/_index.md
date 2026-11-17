---
aliases:
- /es/security/application_security/enabling/single_step/code_security/
- /es/security/application_security/enabling/tracing_libraries/code_security/
- /es/security/application_security/code_security/setup/
disable_toc: false
title: Configure el Análisis de código en tiempo de ejecución (IAST)
---
## Requisitos previos {#prerequisites}
Antes de configurar Runtime Code Analysis (IAST), asegúrese de que se cumplan los siguientes requisitos previos:

1. **Instalación del Datadog Agent:** El Datadog Agent está instalado y configurado para el sistema operativo o contenedor, la nube o el entorno virtual de su aplicación.
2. **SDK compatible:** El Datadog SDK utilizado por su aplicación o servicio admite las capacidades de Runtime Code Analysis (IAST) para el lenguaje de su aplicación o servicio. Para obtener más detalles, consulte la sección **Requisitos de compatibilidad** a continuación.

<div class="alert alert-info">El Datadog Agent y el SDK son los únicos requisitos para IAST. El rastreo de APM y Infrastructure Monitoring no son necesarios; IAST reporta hallazgos independientemente de ambos. Para deshabilitar APM o Infrastructure Monitoring, consulte <a href="#disable-apm-and-infrastructure-monitoring">Deshabilitar APM e Infrastructure Monitoring</a>. 
<br>
Incluso si APM está deshabilitado, se siguen generando costos de ingesta de APM al ingerir datos, como rastreos y spans de seguridad, para admitir IAST.</div>

## Uso de Datadog SDKs {#using-datadog-sdks}

Seleccione el lenguaje de su aplicación para obtener detalles sobre cómo habilitar Runtime Code Analysis (IAST) para su lenguaje y tipos de infraestructura.


{{% collapse-content title="Java" level="h3" %}}

Puede detectar vulnerabilidades a nivel de código y hacer un seguimiento de la seguridad de las aplicaciones Java que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Siga estos pasos para habilitar Runtime Code Analysis (IAST) en su servicio:

1. [Actualice su Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualice su Datadog SDK al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más detalles, consulte los **Requisitos de compatibilidad** a continuación.
3. Agregue la variable de entorno `DD_IAST_ENABLED=true` a la configuración de su aplicación.

   Desde la línea de comandos:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos de herramientas de orquestación, dependiendo de dónde se ejecute su aplicación.

   **Nota**: Los sistemas de archivos de solo lectura no son compatibles. La aplicación debe tener acceso a un directorio `/tmp` que se pueda escribir.


#### CLI de Docker {#docker-cli}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando `docker run`:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes}

Actualice su archivo de configuración de implementación para APM y agregue la variable de entorno IAST:

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

#### Amazon ECS {#amazon-ecs}

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### Rastreo de APM deshabilitado {#apm-tracing-disabled}

Para deshabilitar el rastreo de APM mientras mantiene habilitado IAST, debe establecer la variable de rastreo de APM en false.

{{< tabs >}}
{{% tab "Uso de propiedades del sistema" %}}

Inicie su aplicación Java con el Datadog Agent e IAST habilitados mediante propiedades del sistema:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```
{{% /tab %}}

{{% tab "Uso de variables de entorno" %}}

Establezca las variables de entorno requeridas:

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```
{{% /tab %}}
{{< /tabs >}}


[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/security/code_security/iast/setup/
[3]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/


{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h3" %}}

Puede detectar vulnerabilidades a nivel de código y hacer un seguimiento de la seguridad de las aplicaciones .NET que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Siga estos pasos para habilitar Runtime Code Analysis (IAST) en su servicio:

1. [Actualice su Datadog Agent][3] al menos a la versión 7.41.1.
2. Actualice su Datadog SDK al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más detalles, consulte los **Requisitos de compatibilidad** a continuación.
3. Agregue la variable de entorno `DD_IAST_ENABLED=true` a la configuración de su aplicación. Por ejemplo, en Windows autohospedado, ejecute el siguiente fragmento de PowerShell como parte de su script de inicio de la aplicación:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

O uno de los siguientes métodos, dependiendo de dónde se ejecute su aplicación:

#### Windows autohospedado {#windows-self-hosted}

En una consola de Windows:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```

#### IIS {#iis}

Ejecute el siguiente comando de PowerShell como administrador para configurar las variables de entorno necesarias en el registro `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` y reinicie IIS.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```

#### Linux {#linux}

Agregue lo siguiente a la configuración de su aplicación:

```
DD_IAST_ENABLED=true
```

#### CLI de Docker {#docker-cli-1}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando docker run:

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```

#### Dockerfile {#dockerfile-1}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```
ENV DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-1}

Actualice su archivo de configuración de implementación para APM y agregue la variable de entorno de Runtime Code Analysis (IAST):

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

#### AWS ECS {#aws-ecs}

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### AWS Fargate {#aws-fargate}

Agregue la siguiente línea al Dockerfile de su contenedor:

```
ENV DD_IAST_ENABLED=true
```

#### Rastreo de APM deshabilitado {#apm-tracing-disabled-1}

Para deshabilitar el rastreo de APM mientras mantiene habilitado IAST, debe establecer la variable de rastreo de APM en false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```


Para ver Runtime Code Analysis (IAST) en acción, explore su servicio y encuentre vulnerabilidades a nivel de código en [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video que muestra Code Vulnerabilities" video="true" >}}

Si necesita asistencia adicional, comuníquese con [soporte de Datadog][5].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /es/security/code_security/iast/setup/
[3]: /es/agent/versions/upgrade_between_agent_minor_versions/
[4]: /es/security/code_security/iast/setup/
[5]: /es/help

{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h3" %}}

Puede detectar vulnerabilidades a nivel de código y hacer un seguimiento de la seguridad de las aplicaciones Node.js que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Siga estos pasos para habilitar Runtime Code Analysis (IAST) en su servicio:

1. [Actualice su Datadog Agent][4] al menos a la versión 7.41.1.
2. Actualice su Datadog SDK al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más detalles, consulte los **Requisitos de compatibilidad** a continuación.
3. Agregue la variable de entorno `DD_IAST_ENABLED=true` a la configuración de su aplicación.

   Si inicializa el Datadog SDK en la línea de comandos mediante la opción `--require` de Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   Luego, use variables de entorno para habilitar Runtime Code Analysis (IAST):
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   La forma de hacerlo varía según dónde se ejecute su servicio:

#### CLI de Docker {#docker-cli-2}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando `docker run`:

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile-2}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```Dockerfile
ENV DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-2}

Actualice la configuración del contenedor en su archivo YAML para APM y agregue la variable de entorno AppSec:

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

#### Amazon ECS {#amazon-ecs-1}

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### Rastreo de APM deshabilitado {#apm-tracing-disabled-2}

Para deshabilitar el rastreo de APM mientras mantiene habilitado IAST, debe establecer la variable de rastreo de APM en false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /es/security/code_security/iast/setup/nodejs/
[3]: /es/security/code_security/iast/setup/
[4]: /es/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /es/help

{{% /collapse-content %}}

{{% collapse-content title="Python" level="h3" %}}

Puede detectar vulnerabilidades a nivel de código y hacer un seguimiento de la seguridad de las aplicaciones Python que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Siga estos pasos para habilitar Runtime Code Analysis (IAST) en su servicio:

1. [Actualice su Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualice su Datadog SDK al menos a la versión mínima necesaria para activar Runtime Code Analysis (IAST). Para obtener más detalles, consulte los **Requisitos de compatibilidad** a continuación.
3. Agregue la variable de entorno `DD_IAST_ENABLED=true` a la configuración de su aplicación.

   Desde la línea de comandos:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute su aplicación:


#### CLI de Docker {#docker-cli-3}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando `docker run`:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile-3}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-3}

Actualice su archivo de configuración de implementación para APM y agregue la variable de entorno IAST:

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

#### Amazon ECS {#amazon-ecs-2}

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### Rastreo de APM deshabilitado {#apm-tracing-disabled-3}

Para deshabilitar el rastreo de APM mientras mantiene habilitado IAST, debe establecer la variable de rastreo de APM en false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

#### Nota de compatibilidad con bibliotecas de terceros {#third-party-library-compatibility-note}

Runtime Code Analysis (IAST) modifica el código Python en tiempo de ejecución. Esto podría causar conflictos con otras bibliotecas de Python de terceros que realizan transformaciones de código similares, particularmente con las siguientes, aunque la lista no se limita a ellas:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

Además, Runtime Code Analysis (IAST) no propaga correctamente los rangos de contaminación sobre código nativo (compilado). Por lo tanto, si su base de código depende en gran medida de módulos escritos en C o C++,
que utilizan la API de CPython, o de sistemas de lenguaje intermedio como Cython, los resultados podrían ser menos precisos de lo esperado.


[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /es/security/code_security/iast/setup/python
[3]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/

{{% /collapse-content %}}

### Finalizando la configuración {#finishing-setup}

1. Reinicie su servicio.
2. Para ver Runtime Code Analysis (IAST) en acción, explore su servicio y encuentre vulnerabilidades de IAST en el [Runtime Code (IAST) Vulnerability Explorer][4].

Si necesita asistencia adicional, comuníquese con [soporte de Datadog][5].

[1]: /es/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/code-security/iast
[5]: /es/help

## Deshabilitar APM e Infrastructure Monitoring {#disable-apm-and-infrastructure-monitoring}

Para ejecutar IAST sin rastreos de APM o métricas de infraestructura, deshabilítelos con las variables de entorno a continuación.

### Deshabilitar el rastreo de APM {#disable-apm-tracing}

Para deshabilitar el rastreo de APM en el trazador mientras mantiene IAST habilitado, configure `DD_APM_TRACING_ENABLED=false`:

{{< code-block lang="bash" >}}
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

### Deshabilitar el monitoreo de infraestructura {#disable-infrastructure-monitoring}

Para deshabilitar la recopilación de métricas de infraestructura en el Datadog Agent, configure `DD_INFRASTRUCTURE_MODE=none` en la configuración de su Datadog Agent:

{{< code-block lang="bash" >}}
DD_INFRASTRUCTURE_MODE=none
{{< /code-block >}}

## Requisitos de compatibilidad {#compatibility-requirements}

Las siguientes capacidades de Code Security son compatibles con el SDK de cada lenguaje:

| Capacidad de Code Security                      | Java    | .NET     | Node.js    | Python      | Go             | Ruby          | PHP           |
|-----------------------------------------------|---------|----------|------------|-------------|----------------|---------------|---------------|
| Runtime Software Composition Analysis (SCA)   | 1.1.4   | 2.16.0   | 4.0.0      | 1.5.0       | 1.49.0         | 1.11.0        | 0.90.0        |
| Runtime Code Analysis (IAST)                  | 1.15.0  | 2.42.0   | 4.18.0     | 3.18.0      | no se admite  | no se admite | no se admite |

**Nota**: Las capacidades de **Static Software Composition Analysis (SCA)** y **Static Code Analysis (SAST)** no requieren el SDK de Datadog. Por lo tanto, los requisitos enumerados a continuación no se aplican a estas dos capacidades de Code Security.

Seleccione el lenguaje de su aplicación para obtener detalles sobre la compatibilidad con los frameworks y las funciones disponibles.

{{% collapse-content title="Java" level="h3" %}}

### Capacidades de Code Security {#code-security-capabilities}

Las siguientes capacidades de Code Security son compatibles con la biblioteca de Java para la versión del trazador especificada:

| Capacidad de Code Security                    | Versión mínima del trazador de Java |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.1.4                       |
| Runtime Code Analysis (IAST)                | 1.15.0                      |

La versión mínima del trazador para obtener todas las capacidades de Code Security admitidas para Java es 1.15.0.

#### Tipos de implementación admitidos {#supported-deployment-types}
| Tipo              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Versión preliminar (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**Nota**: Azure App Service es compatible **únicamente con aplicaciones web**. Code Security no es compatible con Azure Functions.

### Compatibilidad con lenguajes y marcos {#language-and-framework-compatibility}

#### Versiones de Java compatibles {#supported-java-versions}
Java Tracer admite la instrumentación automática para los siguientes entornos de ejecución de JVM de Oracle JDK y OpenJDK.

| Versiones de JVM | Sistemas operativos                                                                     | Nivel de soporte                       | Versión del trazador |
| -------------| ------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 a 21      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)      | Soportado                           | Más reciente         |


Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.

Las versiones 22 y posteriores son compatibles en versión preliminar.

#### Compatibilidad con marcos web {#web-framework-compatibility}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes}
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los frameworks
- Si **Runtime Code Analysis (IAST)** no es compatible con su framework, continúa detectando vulnerabilidades de Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag y Cookie without SameSite Flag.

| Framework                   | Versiones         | Runtime Code Analysis (IAST)      |
| --------------------------- | ---------------- | --------------------------------- |
| Grizzly                     | 2.0+             | <i class="icon-check-bold"></i>   |
| Glassfish                   |                  | <i class="icon-check-bold"></i>   |
| Java Servlet                | 2.3+, 3.0+       | <i class="icon-check-bold"></i>   |
| Jetty                       | 7.0-9.x, 10.x    | <i class="icon-check-bold"></i>   |
| Spring Boot                 | 1.5              | <i class="icon-check-bold"></i>   |
| Spring Web (MVC)            | 4.0+             | <i class="icon-check-bold"></i>   |
| Spring WebFlux              | 5.0+             | <i class="icon-check-bold"></i>   |
| Tomcat                      | 5.5+             | <i class="icon-check-bold"></i>   |
| Vert.x                      | 3.4-3.9.x        | <i class="icon-check-bold"></i>   |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como Websphere, Weblogic y JBoss. Además, marcos de trabajo como Spring Boot (versión 3) funcionan de forma inherente porque generalmente utilizan un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

<div class="alert alert-info">Si no encuentra su framework preferido en la lista, háganoslo saber. Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

#### Compatibilidad de frameworks de red {#networking-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos de trabajo de red.

##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los frameworks
- Si **Runtime Code Analysis (IAST)** no es compatible con su framework, continúa detectando vulnerabilidades de Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing y X-Content-Type-Options Header Missing.

| Framework                              | Versiones    | Runtime Code Analysis (IAST)                   |
| -------------------------------------- | ----------- | ---------------------------------------------- |
| Apache HTTP Client                     | 4.0+        |                                                |
| gRPC                                   | 1.5+        |                                                |
| HttpURLConnection                      | todas         |                                                |
| Jax RS Clients                         | 2.0+        |  <i class="icon-check-bold"></i>               |
| Jersey Server                          | 1.9-2.29    |  <i class="icon-check-bold"></i>               |
| Netty HTTP Server                      |  3.8+       |                                                |
| RESTEasy                               |  3.0.x      |                                                |
| Spring SessionAwareMessageListener     | 3.1+        |                                                |

<div class="alert alert-info">Si no ve su marco de trabajo preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

#### Compatibilidad con almacenes de datos {#data-store-compatibility}

`dd-java-agent` incluye soporte para el rastreo automático de los siguientes marcos de trabajo/controladores de base de datos.

**El rastreo de Datastore proporciona:**

- Tiempo transcurrido entre la solicitud y la respuesta
- Información de consulta (por ejemplo, una cadena de consulta saneada)
- Captura de errores y seguimientos de pila

##### Notas sobre la capacidad de Code Security {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos de trabajo
- Si su marco de trabajo no es compatible con los que aparecen a continuación, **Runtime Code Analysis (IAST)** no detectará vulnerabilidades de inyección SQL, pero seguirá detectando los demás tipos de vulnerabilidad enumerados [aquí][3].

| Base de datos                | Versiones | Runtime Code Analysis (IAST)     |
| ----------------------- | -------- | -------------------------------- |
| Aerospike               | 4.0+     |                                  |
| Couchbase               | 2.0+     |                                  |
| JDBC                    | N/A      | <i class="icon-check-bold"></i>  |
| MongoDB                 | 3.0-4.0+ |                                  |

<div class="alert alert-info">Si no ve su marco de trabajo preferido en la lista, avísenos. Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>


[1]: /es/tracing/trace_collection/compatibility/java/
[2]: /es/remote_configuration
[3]: /es/security/code_security/software_composition_analysis/

{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h3" %}}

### Compatibilidad con las capacidades de Code Security {#code-security-capabilities-support}

Las siguientes capacidades de Code Security son compatibles con la biblioteca .NET para la versión del rastreador especificada:

| Capacidad de Code Security                    | Versión mínima del tracer de .NET |
| ------------------------------------------- | --------------------------- |
| Runtime Software Composition Analysis (SCA) | 2.16.0                      |
| Runtime Code Analysis (IAST)                | 2.42.0                      |

La versión mínima del tracer para obtener todas las capacidades de Code Security compatibles con .NET es 2.42.0.

#### Tipos de implementación admitidos {#supported-deployment-types-1}
| Tipo              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Vista previa (2.42.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**Nota**: Azure App Service es compatible **solo con aplicaciones web**. Las capacidades de Code Security no son compatibles con Azure Functions.

### Compatibilidad con lenguajes y marcos de trabajo {#language-and-framework-compatibility-1}

#### Versiones de .NET compatibles {#supported-net-versions}

Todas las versiones enumeradas en esta sección están disponibles de forma general (GA).

Runtime Code Analysis (IAST) es compatible con los siguientes runtimes de .NET y .NET Core:

| Versión de .NET  | Fin de vida útil de Microsoft | Versión del paquete    |
| ------------- | --------------------- | ------------------ |
| .NET 10       | _2028-11-14_   | más reciente (>= 3.31.0) |
| .NET 9        | _2026-11-10_   | más reciente (>= 3.6.0)  |
| .NET 8        | _2026-11-10_   | más reciente (>= 2.42.0) |
| .NET 7        | 2024-05-14          | más reciente (>= 2.42.0) |
| .NET 6        | 2024-11-12     | más reciente (>= 2.42.0) |
| .NET 5        | 2022-05-10          | más reciente (>= 2.42.0) |
| .NET Core 3.1 | 2022-12-13     | más reciente (>= 2.42.0) |

Runtime Code Analysis (IAST) es compatible con las siguientes versiones de .NET Framework:

| Versión de .NET Framework  | Fin de vida útil de Microsoft | Versión del paquete     |
| ----------------------- | --------------------- | ------------------- |
| 4.8                     |                       | más reciente              |
| 4.7.2                   |                       | más reciente              |
| 4.7                     |                       | más reciente              |
| 4.6.2                   |                       | más reciente              |
| 4.6.1                   | 2022-04-26        | más reciente              |

Estos son compatibles con las siguientes arquitecturas:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- Windows (msvc) x86, x86-64

Para obtener más información sobre los entornos de ejecución y sistemas operativos que admite el rastreador de .NET, consulte [Requisitos de compatibilidad de .NET y .NET Core][45] y [Requisitos de compatibilidad de .NET Framework][46].

#### Compatibilidad con marcos de trabajo web {#web-framework-compatibility-1}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-3}

- **Runtime Software Composition Analysis (SCA)** es compatible con todos los marcos de trabajo.
- Si su marco de trabajo no aparece en la lista a continuación, **Runtime Code Analysis (IAST)** continúa detectando vulnerabilidades de cookies inseguras.

| Marco de trabajo               | Runtime Code Analysis (IAST)     |
| ----------------------- | -------------------------------- |
| ASP.NET Core (incluidas las API mínimas) | <i class="icon-check-bold"></i>  |
| ASP.NET MVC             | <i class="icon-check-bold"></i>  |
| ASP.NET Web API 2       | <i class="icon-check-bold"></i>  |

<div class="alert alert-info">Si no ve su marco de trabajo preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con marcos de trabajo de red {#networking-framework-compatibility-1}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-4}

- **Software Composition Analysis (SCA) en tiempo de ejecución**  es compatible con todos los frameworks

| Framework | Análisis de código en tiempo de ejecución (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">Si no ve su framework preferido en la lista, ¡háganoslo saber! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

#### Compatibilidad con almacenes de datos {#data-store-compatibility-1}

**El rastreo de Datastore proporciona:**

- información de consulta (por ejemplo, una cadena de consulta saneada)
- captura de errores y seguimientos de pila

##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-5}

- **Software Composition Analysis (SCA) en tiempo de ejecución** es compatible con todos los frameworks.

| Framework        | Análisis de código en tiempo de ejecución (IAST)    |
|------------------|---------------------------------|
| OracleDB         | <i class="icon-check-bold"></i> |
| ADO.NET          | <i class="icon-check-bold"></i> |
| SQL Server       | <i class="icon-check-bold"></i> |
| MySQL            | <i class="icon-check-bold"></i> |
| SQLite           | <i class="icon-check-bold"></i> |

[1]: /es/tracing/trace_collection/compatibility/dotnet-core/
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /es/remote_configuration#enabling-remote-configuration
[45]: /es/tracing/trace_collection/compatibility/dotnet-core/
[46]: /es/tracing/trace_collection/compatibility/dotnet-framework/


{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h3" %}}

### Capacidades de Code Security {#code-security-capabilities-1}

Las siguientes capacidades de Code Security son compatibles con la biblioteca de Node.js para la versión del tracer especificada:

| Capacidad de Code Security                      | Versión mínima del tracer de Node.js                     |
|---------------------------------------------- | -------------------------------------------------- |
| Software Composition Analysis (SCA) en tiempo de ejecución   | 4.0.0                                              |
| Análisis de código en tiempo de ejecución (IAST)                  | 4.18.0 para Node.js 16+, o 5.0.0 para Node.js 18+   |

La versión mínima del tracer para obtener todas las capacidades de Code Security compatibles es 4.30.0 para Node.js 16+ y 5.0.0 para Node.js 18+.

#### Tipos de implementación admitidos {#supported-deployment-types-2}
| Tipo         | Software Composition Analysis (SCA) en tiempo de ejecución   | Análisis de código en tiempo de ejecución (IAST)                               |
|------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Docker       | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Kubernetes   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Amazon ECS   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| AWS Fargate  | <i class="icon-check-bold"></i>               | Preview (4.18.0 para Node.js 16+, o 5.0.0 para Node.js 18+) |
| AWS Lambda   | <i class="icon-check-bold"></i>               | no admitido                                              |

### Compatibilidad de lenguaje y framework {#language-and-framework-compatibility-2}

#### Compatibilidad con versiones de Node.js {#nodejs-version-support}

Cuando el proyecto Node.js deja de dar soporte a una línea de versión principal LTS (cuando llega al fin de su vida útil), el soporte para la misma se elimina en la siguiente versión principal de `dd-trace`.
La última línea de versiones principales de la biblioteca `dd-trace` que ofrece compatibilidad con esa versión de Node.js al final de su vida útil continúa admitiéndola durante al menos un año más en modo de mantenimiento.

Algunos problemas no pueden resolverse en `dd-trace` y, en su lugar, deben resolverse en Node.js. Cuando esto sucede y la versión de Node.js en cuestión ha llegado al fin de su vida útil (EOL), no es posible resolver el problema sin cambiar a otra versión que no sea EOL.
Datadog no realiza nuevos lanzamientos de `dd-trace` para proporcionar soporte específico para líneas de versión principal de Node.js que no sean LTS (versiones con números impares).

Para obtener el mejor nivel de soporte, ejecute siempre la versión LTS más reciente de Node.js y la versión principal más reciente de `dd-trace`. Independientemente de la línea de versión de Node.js que utilice, emplee también la versión más reciente de Node.js de esa línea para asegurarse de contar con las correcciones de seguridad más recientes.

Para obtener más información sobre las versiones de Node.js, consulte la [documentación oficial de Node.js][4].

#### Compatibilidad con sistemas operativos {#operating-system-support}

Los siguientes sistemas operativos son compatibles oficialmente con `dd-trace`. Es probable que cualquier sistema operativo que no aparezca en la lista también funcione, pero con algunas funciones faltantes, por ejemplo, capacidades de seguridad de aplicaciones, generación de perfiles y métricas de tiempo de ejecución. En términos generales, los sistemas operativos que reciben mantenimiento activo en el momento del lanzamiento inicial de una versión principal son compatibles.

| Sistema operativo | Arquitecturas | Versiones mínimas                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |

#### Compatibilidad con frameworks web {#web-framework-compatibility-2}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-6}
- **Software Composition Analysis (SCA) en tiempo de ejecución** es compatible con todos los frameworks
- Si su framework no aparece en la lista a continuación, **el análisis de código en tiempo de ejecución (IAST)** sigue detectando las vulnerabilidades Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing y X-Content-Type-Options Header Missing.

| Framework | Versiones | Análisis de código en tiempo de ejecución (IAST)     |
|-----------|----------|----------------------------------|
| express   | >=4      | <i class="icon-check-bold"></i>  |
| fastify   | >=2      | <i class="icon-check-bold"></i>  |
| nextjs    | >=11.1   |                                  |

<div class="alert alert-info">Si desea que se añada compatibilidad para alguna de las capacidades no admitidas o para su framework de Node.js, ¡háganoslo saber! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con frameworks de red {#networking-framework-compatibility-2}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-7}

- **Software Composition Analysis (SCA) en tiempo de ejecución**  es compatible con todos los frameworks

| Framework | Análisis de código en tiempo de ejecución (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">Si no ve su framework preferido en la lista, ¡háganoslo saber! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

### Compatibilidad con almacenes de datos {#data-store-compatibility-2}

El rastreo de Datastore proporciona:

- Información de consulta (por ejemplo, una cadena de consulta saneada)
- Captura de errores y seguimientos de pila

##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-8}

- **Software Composition Analysis (SCA) en tiempo de ejecución**  es compatible con todos los frameworks


| Framework                | Versiones  | Análisis de código en tiempo de ejecución (IAST)           |
|--------------------------|-----------|--------------------------------------- |
| [@apollo/server][43]     | `>=4`     |                                        |
| [apollo-server-core][44] | `>=3`     |                                        |
| [cassandra-driver][28]   | `>=3`     |                                        |
| [couchbase][29]          | `^2.4.2`  |                                        |
| [elasticsearch][30]      | `>=10`    |                                        |
| [ioredis][31]            | `>=2`     |                                        |
| [knex][32]               | `>=0.8`   |                                        |
| [mariadb][5]             | `>=3`     |                                        |
| [memcached][33]          | `>=2.2`   |                                        |
| [mongodb-core][34]       | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql][35]              | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql2][36]             | `>=1`     | <i class="icon-check-bold"></i>        |
| [oracledb][37]           | `>=5`     |                                        |
| [pg][38]                 | `>=4`     | <i class="icon-check-bold"></i>        |
| [redis][39]              | `>=0.12`  |                                        |
| [sharedb][40]            | `>=1`     |                                        |
| [tedious][41]            | `>=1`     |                                        |
| [sequelize][42]          | `>=4`     | <i class="icon-check-bold"></i>        |

[1]: /es/tracing/trace_collection/compatibility/nodejs/
[2]: /es/remote_configuration#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
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

{{% collapse-content title="Python" level="h3" %}}

### Soporte de capacidades de Code Security {#code-security-capabilities-support-1}

Las siguientes capacidades de Code Security son compatibles con la biblioteca de Python para la versión especificada del rastreador:

| Capacidad de Code Security                    | Versión mínima del rastreador de Python |
| ------------------------------------------- |-------------------------------|
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | 3.18.0                        |

#### Tipos de implementación admitidos {#supported-deployment-types-3}
| Tipo        | Runtime Code Analysis (IAST)      |
|------------ |---------------------------------- |
| Docker      | <i class="icon-check-bold"></i>   |
| Kubernetes  | <i class="icon-check-bold"></i>   |
| Amazon ECS  | <i class="icon-check-bold"></i>   |
| AWS Fargate | Vista previa (2.9.3)                   |
| AWS Lambda  |                                   |


### Compatibilidad de lenguaje y framework {#language-and-framework-compatibility-3}

#### Versiones de Python compatibles {#supported-python-versions}

La biblioteca Python Application Security Client sigue una [política de versiones][3] que especifica el nivel de soporte para las diferentes versiones de la biblioteca y el tiempo de ejecución de Python.

Se admiten dos ramas de lanzamiento:

{{< partial name="trace_collection/python/supported_versions.html" >}}

Y la biblioteca admite los siguientes tiempos de ejecución:

| SO      | CPU                   | Tiempo de ejecución   | Versión del tiempo de ejecución | Versiones de ddtrace compatibles   |
|---------|-----------------------|-----------|-----------------|------------------------------|
| Linux   | x86-64, AArch64       | CPython   | 3.9+            | >=4, <5                      |
| macOS   | Intel, Apple Silicon  | CPython   | 3.9+            | >=4, <5                      |
| Linux   | x86-64, i686, AArch64 | CPython   | 3.8+            | >=3, <4                      |
| macOS   | Intel, Apple Silicon  | CPython   | 3.8+            | >=3, <4                      |

#### Compatibilidad con frameworks web {#web-framework-compatibility-3}
##### Notas sobre las capacidades de Code Security {#code-security-capability-notes-9}

- **Runtime Software Composition Analysis (SCA)** es compatible con todos los frameworks

#### Frameworks compatibles {#supported-frameworks}

| Framework   | Versiones | Runtime Code Analysis (IAST)    |
|-------------|----------|---------------------------------|
| Django      | 2.2      | <i class="icon-check-bold"></i> |
| FastAPI     | 0.86     | <i class="icon-check-bold"></i> |
| Flask       | 1.1      | <i class="icon-check-bold"></i> |

<div class="alert alert-info">Si no encuentra su framework preferido en la lista, ¡avísenos! Complete <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviar los detalles</a>.</div>

#### Compatibilidad con almacenes de datos {#data-store-compatibility-3}

El rastreo de Datastore proporciona:

- información de consulta (por ejemplo, una cadena de consulta saneada)
- captura de errores y seguimientos de pila

##### Notas sobre la capacidad de Code Security {#code-security-capability-notes-10}

- **Runtime Software Composition Analysis (SCA)** es compatible con todos los frameworks.

La biblioteca de Python es compatible con las [especificaciones de API de base de datos][4] y es compatible con todas las bases de datos SQL genéricas. Esto incluye bases de datos como SQLite, Mysql, Postgres y MariaDB.

[1]: /es/tracing/trace_collection/compatibility/python/
[2]: /es/remote_configuration#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/


{{% /collapse-content %}}