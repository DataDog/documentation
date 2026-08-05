---
aliases:
- /es/security_platform/application_security/getting_started/php
- /es/security/application_security/getting_started/php
- /es/security/application_security/enabling/tracing_libraries/threat_detection/php/
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
  text: Reglas predeterminadas de App & API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App & API Protection
title: Activar Application & API Protection para PHP
type: lenguaje de código múltiple
---

Puedes monitorizar la seguridad de las aplicaciones PHP que se ejecutan en entornos basados ​​en host o en contenedores, como Docker, Kubernetes, AWS ECS y AWS EKS.

{{% appsec-getstarted-standalone %}}

## Activar Application & API Protection
### Para empezar

1. **Instala la última versión de la biblioteca PHP de Datadog** descargando y ejecutando el instalador:
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   Para comprobar que las versiones del lenguaje y del marco de trabajo de tu servicio son compatibles con las funciones de Application & API Protection, consulta [Compatibilidad][1].

2. **Habilita la biblioteca en tu código** reiniciando PHP-FPM o Apache. En un entorno de contenedores, si previamente instalaste la biblioteca sin habilitar Application & API Protection, puedes habilitarla opcionalmente después al configurar las siguientes variables de entorno:
   {{< tabs >}}
{{% tab "CLI Docker" %}}

Actualiza tu contenedor de configuración para APM añadiendo los siguientes argumentos en tu comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade los siguientes valores de variable de entorno a tu archivo de contenedor de Docker:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el contenedor de tu archivo yaml de configuración para APM y añade las variables de entorno:

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
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Actualiza tu archivo JSON de definición de tareas de ECS, añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/php/