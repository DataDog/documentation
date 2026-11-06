---
aliases:
- /es/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
title: Configure SCA en sus servicios en ejecución
---
## Requisitos previos {#prerequisites}
SCA puede detectar vulnerabilidades que afectan a las bibliotecas de código abierto que se ejecutan en sus servicios según la telemetría de aplicaciones de Datadog.

Antes de configurar la detección en tiempo de ejecución, asegúrese de que se cumplan los siguientes requisitos previos:

1. **Instalación del Datadog Agent:** El Datadog Agent está instalado y configurado para el sistema operativo o contenedor, la nube o el entorno virtual de su aplicación.
2. **Trazas enviadas a Datadog**: El Datadog SDK está configurado para su aplicación o servicio y envía trazas web (`type:web`) a Datadog.
3. **SDK compatible:** El Datadog SDK utilizado por su aplicación o servicio admite capacidades de Software Composition Analysis para el lenguaje de su aplicación o servicio. Para obtener más detalles, consulte la página [Library Compatibility][2].

<div class="alert alert-info">Runtime SCA no requiere una suscripción a APM. Todavía hay algo de ingesta de APM presente para admitir Runtime SCA (por ejemplo, trazas de seguridad), y se espera que aparezca en su factura.</div>

## Tipos de habilitación de Software Composition Analysis {#software-composition-analysis-enablement-types}

### Habilitación de servicios en la aplicación {#in-app-service-enablement}

Puede habilitar Software Composition Analysis (SCA) en tiempo de ejecución en la aplicación a través de [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}}][3].

1. Navegue a la página [Security Settings][3].
2. En {{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}}, haga clic en {{< ui >}}Manage Services{{< /ui >}}.
3. Verifique los servicios donde desea identificar vulnerabilidades en bibliotecas y seleccione {{< ui >}}Bulk Actions{{< /ui >}}.
4. Haga clic en {{< ui >}}Activate Runtime Software Composition Analysis (SCA){{< /ui >}}.

### Configuración del Datadog SDK {#datadog-sdk-configuration}

Agregue una variable de entorno o un nuevo argumento a la configuración de su Datadog SDK.

Al seguir estos pasos, configurará correctamente Software Composition Analysis para su aplicación, lo que garantiza un monitoreo integral y la identificación de vulnerabilidades en las bibliotecas de código abierto utilizadas por sus aplicaciones o servicios.

Puede utilizar Datadog Software Composition Analysis (SCA) para hacer un seguimiento de las bibliotecas de código abierto en sus aplicaciones.

SCA se configura estableciendo la bandera `-Ddd.appsec.sca.enabled` o la variable de entorno `DD_APPSEC_SCA_ENABLED` en `true` en los lenguajes compatibles:

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

Este tema explica cómo configurar SCA usando un ejemplo de Java.

**Ejemplo: habilitación de Software Composition Analysis en Java**

1. **Actualice su [biblioteca de Java de Datadog][1]** al menos a la versión 0.94.0 (al menos a la versión 1.1.4 para las funciones de detección de Software Composition Analysis):

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   Para verificar que las versiones del lenguaje y el marco de trabajo de su servicio sean compatibles, consulte [Compatibilidad][2].

1. **Ejecute su aplicación Java con SCA habilitado.** Desde la línea de comandos:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute su aplicación:

   **Nota:** Los sistemas de archivos de solo lectura no son compatibles en este momento. La aplicación debe tener acceso a un directorio `/tmp` que se pueda escribir.

   {{< tabs >}}
{{% tab "CLI de Docker" %}}

Actualice su contenedor de configuración para APM agregando el siguiente argumento en su comando `docker run`:


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Agregue el siguiente valor de variable de entorno al Dockerfile de su contenedor:

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualice su archivo de configuración de implementación para APM y agregue la variable de entorno SCA:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualice su archivo JSON de definición de tarea de ECS agregando esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Establezca la marca `-Ddd.appsec.sca.enabled` o la variable de entorno `DD_APPSEC_SCA_ENABLED` en `true` en la invocación de su servicio:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## Retención de datos {#data-retention}

Datadog almacena los hallazgos de acuerdo con nuestros [Periodos de retención de datos](https://docs.datadoghq.com/es/data_security/data_retention_periods/). Datadog no almacena ni conserva el código fuente del cliente.

[1]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/java
[2]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup