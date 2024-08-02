---
aliases:
- /security_platform/application_security/getting_started/java
- /security/application_security/getting_started/java
- /security/application_security/enabling/java/
code_lang: java
code_lang_weight: 0
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente de la biblioteca Java de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Java
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Java que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Para empezar

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

2. **Ejecuta tu aplicación Java con ASM habilitado.** Desde la línea de comandos:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   **Nota:** Los sistemas de archivos de solo lectura no son compatibles actualmente. La aplicación debe tener acceso a un directorio `/tmp` en el que se pueda escribir.

   {{< tabs >}}
{{% pestaña "CLI Docker" %}}

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:


```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza tu archivo de configuración de despliegue para APM y añade la variable de entorno de ASM:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Establece el indicador `-Ddd.appsec.enabled` o la variable de entorno `DD_APPSEC_ENABLED` en `true` en tu invocación de servicio:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}


Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/security/application_security/enabling/compatibility/java
[3]: /es/security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/