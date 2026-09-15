---
aliases:
- /es/security_platform/application_security/getting_started/go
- /es/security/application_security/getting_started/go
- /es/security/application_security/threats/setup/threat_detection/go
- /es/security/application_security/threats_detection/go
further_reading:
- link: /security/application_security/setup/go/sdk
  tag: Documentación
  text: SDK de protección de aplicaciones y API para Go
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Adición de información de usuario a las trazas
- link: https://github.com/DataDog/dd-trace-go
  tag: Código fuente
  text: Código fuente del rastreador
- link: https://github.com/DataDog/orchestrion
  tag: Código fuente
  text: Código fuente de Orchestrion
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Introducción a la protección de aplicaciones y API para Go
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Requisito previo {#prerequisite}

- El [Datadog Agent][16] está instalado y configurado para el sistema operativo o contenedor, la nube o el entorno virtual de su aplicación. 
- Su marco de trabajo de servicio y sus herramientas son [compatibles][2] con [Application and API Protection][1] de Datadog.
- Su entorno de implementación es [compatible][5].
- Tiene instalada una de las dos versiones más recientes de [Go][4] (siguiendo la [Política de lanzamiento oficial][5]).

## Comience {#get-started}

1. Instale [Orchestrion][10]:
   ```console
   $ go install github.com/DataDog/orchestrion@latest
   ```

2. Registre Orchestrion como un módulo de Go en el directorio de su proyecto:
   ```console
   $ orchestrion pin
   ```

3. Datadog proporciona una serie de paquetes conectables que ofrecen soporte nativo para instrumentar una serie de bibliotecas y marcos de trabajo de Go. Puede encontrar una lista de estos paquetes en [Requisitos de compatibilidad][1]. Importe estos paquetes en su aplicación y siga las instrucciones de configuración que aparecen junto a cada integración.

4. Recompile su programa con Orchestrion usando la compilación `appsec`:
   ```console
   $ orchestrion go build -tags=appsec my-program
   ```
   Para obtener más opciones sobre cómo usar Orchestrion, consulte [Uso de Orchestrion][7].

Nota: Si está compilando sin [CGO][9] en Linux, consulte [Compilación de aplicaciones Go con CGO deshabilitado][6].

5. Vuelva a desplegar su servicio Go y habilite la Protección de aplicaciones y API configurando la variable de entorno `DD_APPSEC_ENABLED` en `true`:

{{< tabs >}}
{{% tab "Variable de entorno" %}}

```console
$ env DD_APPSEC_ENABLED=true ./my-program
```

{{% /tab %}}
{{% tab "CLI de Docker" %}}

Agregue el siguiente valor de variable de entorno a su línea de comandos de Docker:

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

Para obtener más información sobre cómo crear una imagen de Docker adecuada, consulte <a href="/security/application_security/setup/go/dockerfile">Creación de un Dockerfile para la Protección de aplicaciones y API para Go</a>.

{{% /tab %}}
{{% tab "Dockerfile" %}}

Agregue el siguiente valor de variable de entorno al Dockerfile del contenedor de su aplicación:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

Para obtener más información sobre cómo crear una imagen de Docker adecuada, consulte <a href="/security/application_security/setup/go/dockerfile">Creación de un Dockerfile para la Protección de aplicaciones y API para Go</a>.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualice el archivo de configuración de despliegue de su aplicación para APM y agregue la siguiente variable de entorno:

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

Para obtener más información sobre cómo crear una imagen de Docker adecuada, consulte <a href="/security/application_security/setup/go/dockerfile">Creación de un Dockerfile para la Protección de aplicaciones y API para Go</a>.

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualice el archivo JSON de definición de tarea de ECS de su aplicación usando esta sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

Para obtener más información sobre cómo crear una imagen de Docker adecuada, consulte <a href="/security/application_security/setup/go/dockerfile">Creación de un Dockerfile para la Protección de aplicaciones y API para Go</a>.

{{% /tab %}}

{{< /tabs >}}

### Verifique su configuración {#verify-your-setup}

Para verificar que la Protección de aplicaciones y API esté funcionando correctamente:
   
Para ver la detección de amenazas de la Protección de aplicaciones y API en acción, envíe patrones de ataque conocidos a su aplicación. Por ejemplo, active la regla [Security Scanner Detected][15] ejecutando un archivo que contenga el siguiente script de curl:

```bash
for ((i=1;i<=250;i++));
do
  # Target existing service’s routes
  curl https://your-application-url/existing-route -A Arachni/v1.0;
  # Target non existing service’s routes
  curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

Unos minutos después de habilitar su aplicación y probarla, **la información sobre amenazas aparece en el [Application Trace and Signals Explorer][14] en Datadog**.

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra Signals explorer y detalles, y Vulnerabilities explorer y detalles." video="true" >}}

### Compilación sin CGO {#building-without-cgo}

Si está compilando su aplicación Go sin [CGO][9], aún puede habilitar App and API Protection siguiendo estos pasos:

1. Agregue la etiqueta de compilación `appsec` al compilar su aplicación:
   ```console
   $ CGO_ENABLED=0 orchestrion go build -tags appsec my-program
   ```

  <div class="alert alert-danger">Deshabilitar CGO generalmente garantiza un binario vinculado estáticamente. Este no será el caso aquí.</div>

2. Instale `libc.so.6`, `libpthread.so.0` y `libdl.so.2` en su sistema, ya que estas bibliotecas son requeridas por el WAF de Datadog:
   Esta instalación se puede realizar instalando el paquete `glibc` en su sistema con su administrador de paquetes. Consulte [Creación de un Dockerfile para la protección de aplicaciones y API de Go][3].

3. Vuelva a desplegar su servicio Go con la variable de entorno `DD_APPSEC_ENABLED=true` configurada, como se describió anteriormente.

### Compilación con Bazel {#building-with-bazel}

Si está utilizando Bazel y [rules_go][12] para compilar su aplicación Go, [Orchestrion][7] no es compatible con Bazel.
En su lugar, puede utilizar el [Datadog Go SDK][11] para instrumentar su aplicación manualmente.

App and API Protection depende de [purego][13] para admitir sus enlaces de C++ al WAF de Datadog, lo cual requiere atención especial dentro del `repositories.bzl` generado por Gazelle. Bajo la regla `go_repository` para `com_github_ebitengine_purego`,
Agregue el atributo `build_directives` con la directiva `gazelle:build_tags cgo`. Por ejemplo:

```starlark
    go_repository(
        name = "com_github_ebitengine_purego",
        build_directives = [
            "gazelle:build_tags cgo",
        ]
        build_file_proto_mode = "disable",
        importpath = "github.com/ebitengine/purego",
        sum = "<your-checksum>",
        version = "v0.8.3",
    )
```

## Uso de App and API Protection sin traza de APM {#using-app-and-api-protection-without-apm-tracing}

Si desea utilizar App and API Protection sin la funcionalidad de traza de APM, puede desplegar con la traza deshabilitada:

1. Configure su SDK con la variable de entorno `DD_APM_TRACING_ENABLED=false` además de la variable de entorno `DD_APPSEC_ENABLED=true`. Esta configuración reduce la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos de App and API Protection.

Para obtener más detalles, consulte [Standalone App and API Protection][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/go/?tab=v2#web-framework-compatibility
[2]: /es/security/application_security/setup/compatibility/go/
[3]: /es/security/application_security/setup/go/dockerfile
[4]: https://go.dev/
[5]: https://go.dev/doc/devel/release#policy
[6]: /es/security/application_security/setup/go#building-without-cgo
[7]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation#usage
[8]: /es/security/application_security/guide/standalone_application_security/
[9]: https://go.dev/wiki/cgo
[10]: https://datadoghq.dev/orchestrion
[11]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[12]: https://github.com/bazel-contrib/rules_go
[13]: https://github.com/ebitengine/purego
[14]: https://app.datadoghq.com/security/appsec
[15]: /es/security/default_rules/security-scan-detected/
[16]: https://app.datadoghq.com/account/settings#agent