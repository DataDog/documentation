---
aliases:
- /security_platform/application_security/getting_started/php
- /security/application_security/getting_started/php
- /security/application_security/enabling/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-php
  tag: Código fuente
  text: Código fuente de la biblioteca de rastreo PHP de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para PHP
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones PHP que se ejecutan en entornos basados ​​en host o en contenedores, como Docker, Kubernetes, AWS ECS y AWS EKS.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Primeros pasos

1. **Instala la última versión de la biblioteca PHP de Datadog** descargando y ejecutando el instalador:
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   Para verificar que las versiones del lenguaje y del marco del servicio son compatibles con las funciones de ASM, consulta [Compatibilidad][1].

2. **Habilita la biblioteca en tu código** reiniciando PHP-FPM o Apache. En un entorno de contenedores, si previamente instalaste la biblioteca sin habilitar ASM, puedes habilitarla opcionalmente después al configurar la siguiente variable de entorno:
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

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/enabling/compatibility/php