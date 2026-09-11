---
aliases:
- /es/security_platform/application_security/getting_started/go
- /es/security/application_security/getting_started/go
- /es/security/application_security/enabling/tracing_libraries/threat_detection/go/
code_lang: go
code_lang_weight: 20
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Añadir información del usuario a traces (trazas)
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente de la biblioteca Go de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas predefinidas de protección de aplicaciones y API
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
title: Activar la protección de aplicaciones y API para Go
type: lenguaje de código múltiple
---

Puedes monitorizar la seguridad de las aplicaciones Go que se ejecutan en Docker, Kubernetes y Amazon ECS.

{{% appsec-getstarted-standalone %}}
- Tu servicio es [compatible][2].

## Activar la protección de aplicaciones y API
### Para empezar

1. **Añade a las dependencias go.mod de tu programa** la última versión de la biblioteca Go de Datadog (versión 1.53.0 o posterior):

   ```shell
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1 # v1
   # $ go get -v -u github.com/DataDog/dd-trace-go/v2/ddtrace/tracer # v2
   ```

2. Datadog ofrece una serie de paquetes conectables que proporcionan asistencia inmediata para la instrumentación de una serie de bibliotecas Go y marcos.
   En la página de [requisitos de compatibilidad][1] encontrarás una lista de estos paquetes. Importa estos paquetes en tu aplicación y sigue las instrucciones de configuración que aparecen junto a cada integración.

3. **Vuelve a compilar tu programa** con la protección de aplicaciones y API activada:
   ```console
   $ go build -v -tags appsec my-program
   ```

   **Notas**:
   - La etiqueta (tag) `appsec` de la compilación de Go no es necesaria si CGO está habilitado con `CGO_ENABLED=1`.
   - Datadog WAF necesita las siguientes bibliotecas compartidas en Linux: `libc.so.6` y `libpthread.so.0`.
   - Cuando se utiliza la etiqueta `appsec` de la compilación y CGO está deshabilitado, el binario producido permanece vinculado dinámicamente a estas bibliotecas.
   - La etiqueta (tag) `datadog.no_waf` de creación Go se puede utilizar para desactivar la protección de aplicaciones y API en el momento de la creación en cualquier situación en la que los requisitos anteriores sean un obstáculo.

4. **Vuelve a desplegar tu servicio Go y activa la protección de aplicaciones y API** configurando las variables de entorno:
   ```console
   $ env DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false ./my-program
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Añade los siguientes valores de variables de entorno a tu línea de comandos Docker:

```console
$ docker run -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade los siguientes valores de variables de entorno al archivo Docker de tu contenedor de aplicaciones:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el archivo de configuración de despliegue de tu aplicación para APM y añade las variables de entorno de protección de aplicaciones y API:

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
{{% tab "Amazon ECS" %}}

Actualiza el archivo JSON de definición de tareas ECS de tu aplicación, añadiendo esto en la sección de entorno:

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

{{% appsec-getstarted-2 %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/go/#web-framework-compatibility
[2]: /es/security/application_security/setup/compatibility/go/