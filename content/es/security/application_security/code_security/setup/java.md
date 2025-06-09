---
aliases:
- /es/security_platform/application_security/getting_started/java
- /es/security/application_security/getting_started/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: Documentación
  text: Lista de vulnerabilidades a nivel de código compatibles
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con Datadog Code Security
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: Blog
  text: Encontrar vulnerabilidades en tu código con Datadog Code Security
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: Blog
  text: Datadog Code Security logra una precisión del 100% en la prueba de referencia
    OWASP mediante el uso de un enfoque IAST
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Solucionar problemas de Application Security
title: Activar Code Security para Java
type: lenguaje de código múltiple
---

Puedes detectar vulnerabilidades a nivel de código y monitorizar la seguridad de las aplicaciones en aplicaciones Java que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

Sigue estos pasos para activar Code Security en tu servicio:

1. [Actualiza tu Datadog Agent][6] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo de Datadog al menos a la versión mínima necesaria para activar Code Security. Para ver más detalles, consulta la página [Compatibilidad de bibliotecas][3].
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
[2]: /es/security/application_security/code_security/setup/compatibility/java/
[3]: /es/security/application_security/code_security/setup/compatibility/java/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /es/help
[6]: /es/agent/versions/upgrade_between_agent_minor_versions/