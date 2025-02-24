---
aliases:
- /es/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
title: Configurar SCA en tus servicios en ejecución
---
SCA puede detectar las vulnerabilidades que afectan a las bibliotecas de código abierto que se ejecutan en tus servicios basándose en la telemetría de las aplicaciones Datadog.

Antes de configurar la detección en tiempo de ejecución, asegúrate de que se cumplen los siguientes requisitos previos:

1. **Biblioteca de rastreo compatible:** La biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de Software Composition Analysis para el lenguaje de tu aplicación o servicio.
2. **Instalación del Datadog Agent:** El Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
3. **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio, y las trazas (traces) web (`type:web`) son recibidas por Datadog.
4. **Biblioteca de rastreo compatible:** La biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de Software Composition Analysis para el lenguaje de tu aplicación o servicio. Para ver más detalles, consulta la página [Compatibilidad de bibliotecas][5] de cada producto ASM.

## Tipos de activación de Software Composition Analysis

### Inicio rápido para la activación del servicio en la aplicación

1. Ve a la [Guía de inicio rápido][2]:
   1. Expande **Enable Vulnerability Detection** (Habilitar la detección de vulnerabilidades).
   2. Selecciona **Vulnerabilidades de código abierto**.
   3. Selecciona **Iniciar activación**.
   4. Selecciona los servicios en los que quieres identificar vulnerabilidades de biblioteca y luego haz clic en **Next** (Siguiente).
   5. Selecciona **Activar para los servicios seleccionados**.

### Página de configuración para activar el servicio en la aplicación

También puedes activar Software Composition Analysis a través de la página [Configuración][3].

1. Ve a la página [Configuración][3] y selecciona **Empezar** en **Software Composition Analysis (SCA)**.
2. Para el análisis estático en el código fuente, selecciona **Seleccionar repositorios**.
3. Selecciona **Añadir cuenta de Github** y sigue las [instrucciones][4] para crear una nueva aplicación GitHub.
4. Una vez configurada la cuenta de GitHub, selecciona **Seleccionar repositorios** y activa **Software Composition Analysis (SCA)**.
5. Para el análisis en tiempo de ejecución de servicios en ejecución, haz clic en **Select Services** (Seleccionar servicios).
6. Selecciona los servicios en los que quieres identificar vulnerabilidades de biblioteca y luego haz clic en **Next** (Siguiente).
7. Selecciona **Activar para los servicios seleccionados**.

### Configuración de la biblioteca de rastreo de Datadog

Añade una variable de entorno o un nuevo argumento para configurar tu biblioteca de rastreo de Datadog.

Siguiendo estos pasos, podrás configurar con éxito Software Composition Analysis en tu aplicación, para garantizar una exhaustiva monitorización e identificación de vulnerabilidades en las bibliotecas de código abierto utilizadas por tus aplicaciones o servicios.

Puedes utilizar Datadog Software Composition Analysis (SCA) para monitorizar bibliotecas de código abierto en tus aplicaciones.

SCA se configura definiendo la marca `-Ddd.appsec.sca.enabled` o la variable de entorno `DD_APPSEC_SCA_ENABLED` a `true` en los lenguajes compatibles:

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

Este tema explica cómo configurar SCA utilizando un ejemplo de Java.

**Ejemplo: de habilitación de Software Composition Analysis en Java**

1. **Actualiza la [biblioteca Java de Datadog][1]** al menos a la versión 0.94.0 (o a la versión 1.1.4 para las funciones de detección del análisis de composición de software):

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
   Para verificar que las versiones del lenguaje y del marco del servicio son compatibles con las funciones de ASM, consulta [Compatibilidad][2].

1. **Ejecuta tu aplicación Java con SCA activado.** Desde la línea de comandos:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   **Nota:** Los sistemas de archivos de sólo lectura no son compatibles en este momento. La aplicación debe tener acceso a un directorio `/tmp` en el que se pueda escribir.

{{< tabs >}}
{{% tab "Docker CLI" %}}

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza tu archivo de configuración del despliegue de APM y añade la variable de entorno SCA:

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

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

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

Define la marca `-Ddd.appsec.sca.enabled` o la variable de entorno `DD_APPSEC_SCA_ENABLED` como `true` en la invocación de tu servicio:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

{{< /tabs >}}


[1]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/java
[2]: https://app.datadoghq.com/security/configuration/asm/onboarding
[3]: https://app.datadoghq.com/security/configuration/asm/setup
[4]: /es/integrations/github/
[5]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/