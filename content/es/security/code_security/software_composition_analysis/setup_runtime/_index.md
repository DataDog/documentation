---
aliases:
- /es/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
title: Configurar SCA en tus servicios en ejecución
---
SCA puede detectar vulnerabilidades que afectan a las bibliotecas de código abierto que se ejecutan en tus servicios, basándose en la telemetría de aplicaciones de Datadog.

Antes de configurar la detección en tiempo de ejecución, asegúrate de que se cumplen los siguientes requisitos previos:

1. **Instalación del Datadog Agent:** El Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, nube o entorno virtual.
2. **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio, y las trazas (traces) web (`type:web`) son recibidas por Datadog.
3. **Biblioteca de rastreo compatible:** La librería de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con las funciones de Software Composition Analysis para el lenguaje de tu aplicación o servicio. Para ver más detalles, consulta la página [Compatibilidad de librerías][2] de cada producto de AAP.

## Tipos de activación de Software Composition Analysis

### Activación del servicio en la aplicación

Puedes habilitar Software Composition Analysis (SCA) en tiempo de ejecución en la aplicación a través de [**Seguridad** > **Code Security**][3].

1. Ve a la página [Configuración de seguridad][3].
2. En **Activar la detección en tiempo de ejecución de vulnerabilidades de librería**, haz clic en **Manage Services** (Gestionar servicios).
3. Comprueba los servicios donde quieres identificar vulnerabilidades de librería y selecciona **Acciones en bloque**.
4. Haz clic en **Activate Runtime Software Composition Analysis (SCA)** (Activar Software Composition Analysis (SCA) en tiempo de ejecución).

### Configuración de la librería de rastreo de Datadog

Añade una variable de entorno o un nuevo argumento para configurar tu biblioteca de rastreo de Datadog.

Siguiendo estos pasos, podrás configurar con éxito Software Composition Analysis en tu aplicación, para garantizar una exhaustiva monitorización e identificación de vulnerabilidades en las bibliotecas de código abierto utilizadas por tus aplicaciones o servicios.

Puedes utilizar Datadog Software Composition Analysis (SCA) para monitorizar bibliotecas de código abierto en tus aplicaciones.

SCA se configura definiendo la marca `-Ddd.appsec.sca.enabled` o la variable de entorno `DD_APPSEC_SCA_ENABLED` en `true` en los lenguajes compatibles:

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

Este tema explica cómo configurar SCA utilizando un ejemplo de Java.

**Ejemplo: habilitación de Software Composition Analysis en Java**

1. **Actualiza la [biblioteca Java de Datadog][1]** al menos a la versión 0.94.0 (o a la versión 1.1.4 para las funciones de detección de Software Composition Analysis):

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
   Para comprobar que las versiones del lenguaje y del marco de trabajo de tu servicio son compatibles, consulta [Compatibilidad][2].

1. **Ejecuta tu aplicación Java con SCA activado.** Desde la línea de comandos:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   **Nota:** Los sistemas de archivos de sólo lectura no son compatibles en este momento. La aplicación debe tener acceso a un directorio `/tmp` en el que se pueda escribir.

{{< tabs >}}
{{% tab "CLI Docker" %}}

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

Actualiza tu archivo de configuración del despliegue para APM y añade la variable de entorno de SCA:

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
[2]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
