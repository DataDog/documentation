---
aliases:
- /es/security_platform/application_security/getting_started/php
- /es/security/application_security/getting_started/php
- /es/security/application_security/enabling/tracing_libraries/threat_detection/php/
- /es/security/application_security/threats/setup/threat_detection/php
- /es/security/application_security/threats_detection/php
- /es/security/application_security/setup/aws/fargate/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Añadir información del usuario a trazas
- link: https://github.com/DataDog/dd-trace-php
  tag: Código fuente
  text: Código fuente de la biblioteca de rastreo PHP de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Habilitar AAP para PHP
type: multi-code-lang
---

Puedes monitorizar aplicaciones App and API Protection para PHP que se ejecutan en entornos basados ​​en host o en contenedores, como Docker, Kubernetes, AWS ECS y AWS EKS.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Para empezar

1. **Instala la última versión de la biblioteca PHP de Datadog** descargando y ejecutando el instalador:
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   Para comprobar si el lenguaje y las versiones del marco de tu servicio son compatibles con las funciones de AAP, consulta [Compatibilidad][1].

2. **Habilita la biblioteca en tu código** reiniciando PHP-FPM o Apache. En un entorno contenedorizado, si previamente instalaste la biblioteca sin habilitar AAP, opcionalmente podrás habilitarla más tarde configurando la siguiente variable de entorno:
   {{< tabs >}}
{{% tab "CLI Docker" %}}

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

Actualiza el contenedor del archivo yaml de configuración para APM y añade la variable de entorno AppSec:

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
{{% tab "AWS ECS" %}}

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

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Uso de AAP sin el rastreo APM

Si quieres utilizar Application & API Protection sin la funcionalidad de rastreo APM, puedes desplegarla con el rastreo desactivado:

1. Configura tu biblioteca de rastreo con la variable de entorno `DD_APM_TRACING_ENABLED=false`, además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reduce la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos App and API Protection.

Para obtener más información, consulta [App and API Protection individual][standalone_billing_guide].
[guía_de_facturación_individual]: /security/application_security/guide/standalone_application_security/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/php/