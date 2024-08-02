---
aliases:
- /security_platform/application_security/getting_started/python
- /security/application_security/getting_started/python
- /security/application_security/enabling/python
code_lang: Python
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Código fuente de la biblioteca Python de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Python
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Python que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Para empezar

1. **Actualiza el paquete de la biblioteca Python de Datadog** al menos a la versión 1.2.2 (o a la versión 1.5.0 para las funciones de detección del análisis de composición de software). Ejecuta lo siguiente:
   ```shell
   pip install --upgrade ddtrace
   ```

   Para verificar que las versiones del lenguaje y del marco del servicio son compatibles con las funciones de ASM, consulta [Compatibilidad][1].

2. **Habilita ASM al iniciar la aplicación Python**.

   ```bash
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

    También puedes utilizar uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:
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

   Actualiza el contenedor del archivo YAML de configuración para APM y añade la variable de entorno `DD_APPSEC_ENABLED`:

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

   Inicializa ASM en tu código o establece la variable de entorno `DD_APPSEC_ENABLED` en `true` en tu invocación de servicio:
   ```shell
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   {{% /tab %}}
   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/enabling/compatibility/python