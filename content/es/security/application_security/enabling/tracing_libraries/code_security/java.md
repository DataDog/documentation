---
aliases:
- /security_platform/application_security/getting_started/java
- /security/application_security/getting_started/java
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

## Habilitación de la seguridad del código

Si tu servicio ejecuta una [versión de biblioteca de rastreo compatible con la seguridad del código][3], habilita la capacidad configurando la variable de entorno `DD_IAST_ENABLED=true` y reiniciando tu servicio.

Para detectar vulnerabilidades a nivel de código en tu servicio:

1. [Actualiza tu Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo al menos a la versión mínima necesaria para activar la detección de vulnerabilidades de la seguridad del código. Para obtener más información, consulta [Funciones compatibles de ASM][3].
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación.

   Desde la línea de comandos:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   **Nota**: Los sistemas de archivos de solo lectura no son compatibles. La aplicación debe tener acceso a un directorio `/tmp` en el que se pueda escribir.


   {{< tabs >}}
{{% tab "CLI Docker" %}}

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

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

{{% /tab %}}
{{% tab "Amazon ECS" %}}

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

{{% /tab %}}

   {{< /tabs >}}

4. Reinicia tu servicio.
5. Para ver la seguridad del código en acción, examina el servicio y busca las vulnerabilidades a nivel de código en el [Explorador de vulnerabilidades][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Vídeo que muestra vulnerabilidades del código" video="true" >}}

Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /es/security/application_security/enabling/compatibility/java
[3]: /es/security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/