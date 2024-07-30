---
aliases:
- /security_platform/application_security/getting_started/nodejs
- /security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente de la biblioteca Node.js de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Node.js
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Node.js que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la seguridad del código
Si tu servicio ejecuta una [versión de biblioteca de rastreo compatible con la detección de vulnerabilidades de la seguridad del código][3], habilita la capacidad configurando la variable de entorno `DD_IAST_ENABLED=true` y reiniciando tu servicio.


Para aprovechar las capacidades de detección de vulnerabilidades a nivel de código para tu servicio:

1. [Actualiza tu Datadog Agent][4] al menos a la versión 7.41.1.
2. Actualiza tu biblioteca de rastreo al menos a la versión mínima necesaria para activar la seguridad del código. Para obtener más información, consulta [Funciones compatibles de ASM][3].
3. Añade la variable de entorno `DD_IAST_ENABLED=true` a la configuración de tu aplicación.

   Si inicializas la biblioteca de APM en la línea de comandos utilizando la opción `--require` para Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   A continuación, utiliza variables de entorno para habilitar ASM:
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   La forma de hacerlo varía en función de dónde se ejecuta el servicio:
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
ENV DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

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
5. Para ver la seguridad del código en acción, examina el servicio y las vulnerabilidades a nivel de código aparecerán en el [Explorador de vulnerabilidades][5]. La columna `SOURCE` muestra el valor del código.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details.mp4" alt="Vídeo que muestra la pestaña Vulnerabilities (Vulnerabilidades), el código fuente y la inspección de la vulnerabilidad a nivel de código" video="true" >}}

Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][6].

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /es/security/application_security/enabling/compatibility/nodejs
[3]: /es/security/application_security/enabling/compatibility/nodejs#asm-capabilities-support
[4]: /es/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /es/help