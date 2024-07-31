---
aliases:
- /security_platform/application_security/getting_started/go
- /security/application_security/getting_started/go
- /security/application_security/enabling/go
code_lang: ir
code_lang_weight: 20
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente de la biblioteca Go de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para Go
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Go que se ejecutan en Docker, Kubernetes y Amazon ECS.

{{% appsec-getstarted %}}
- Tu servicio es [compatible][2].

## Habilitación de la detección de amenazas
### Primeros pasos

1. **Añade a las dependencias go.mod de tu programa** la última versión de la biblioteca Go de Datadog (versión 1.53.0 o posterior):

   ```console
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1
   ```

2. Datadog ofrece una serie de paquetes conectables que proporcionan asistencia inmediata para la instrumentación de una serie de bibliotecas Go y marcos.
   En la página de [requisitos de compatibilidad][1] encontrarás una lista de estos paquetes. Importa estos paquetes en tu aplicación y sigue las instrucciones de configuración que aparecen junto a cada integración.

3. **Vuelve a compilar tu programa** con ASM habilitado:
   ```console
   $ go build -v -tags appsec my-program
   ```

   **Notas**:
   - La etiqueta (tag) `appsec` de la compilación de Go no es necesaria si CGO está habilitado con `CGO_ENABLED=1`.
   - Datadog WAF necesita las siguientes bibliotecas compartidas en Linux: `libc.so.6` y `libpthread.so.0`.
   - Cuando se utiliza la etiqueta `appsec` de la compilación y CGO está deshabilitado, el binario producido permanece vinculado dinámicamente a estas bibliotecas.
   - La etiqueta `datadog.no_waf` de la compilación de Go se puede utilizar para deshabilitar ASM en el momento de la compilación en cualquier situación en la que los requisitos anteriores sean un obstáculo.

4. **Vuelve a desplegar el servicio Go y habilita ASM** estableciendo la variable de entorno `DD_APPSEC_ENABLED` en `true`:
   ```console
   $ env DD_APPSEC_ENABLED=true ./my-program
   ```

   O uno de los siguientes métodos, dependiendo de dónde se ejecute la aplicación:

   {{< tabs >}}
{{% tab "CLI Docker" %}}

Añade el siguiente valor de variable de entorno a tu línea de comandos Docker:

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno al Dockerfile del contenedor de tu aplicación:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el archivo de configuración de despliegue de tu aplicación para APM y añade la variable de entorno de ASM:

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

Actualiza el archivo JSON de definición de tarea de ECS de tu aplicación añadiendo esto en la sección de entorno:

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

{{% appsec-getstarted-2 %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/enabling/compatibility/go/#web-framework-compatibility
[2]: /es/security/application_security/enabling/compatibility/go