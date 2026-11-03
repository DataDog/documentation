---
aliases:
- /es/tracing/proxies/nginx
- /es/tracing/nginx/
- /es/tracing/setup/nginx/
- /es/tracing/proxies
- /es/tracing/setup_overview/nginx/
- /es/tracing/setup_overview/proxy_setup/
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://www.nginx.com/
  tag: Sitio externo
  text: Sitio web de NGINX
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: Sitio externo
  text: OpenTelemetry para el controlador Ingress-NGINX
title: Instrumentación de NGINX
type: multi-code-lang
---
Datadog APM es compatible con NGINX en las siguientes configuraciones:
- NGINX operado como proxy con rastreo proporcionado por el módulo de Datadog.
- NGINX como controlador de Ingress para Kubernetes.
- [OpenResty](#openresty-with-datadog-module), que está construido sobre NGINX, con rastreo proporcionado por una compilación específica de OpenResty del módulo de Datadog.

## NGINX con el módulo de Datadog {#nginx-with-datadog-module}
Datadog proporciona un módulo de NGINX para rastreo distribuido.

### Instalación del módulo {#module-installation}
Para instalar el módulo de Datadog para NGINX, siga estas instrucciones:
1. Descargue la versión adecuada desde el [último lanzamiento de nginx-datadog en GitHub][1]
2. Elija el archivo tar correspondiente a la versión específica de NGINX y a la arquitectura de CPU.

Cada lanzamiento incluye dos archivos tar por combinación de versión de NGINX y arquitectura de CPU.
El archivo tar principal contiene un solo archivo, `ngx_http_datadog_module.so`, que es el módulo de Datadog para NGINX. El segundo contiene símbolos de depuración; es opcional.

Para mayor simplicidad, el siguiente script descarga solo el módulo para el último lanzamiento:

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64|arm64)
      echo "arm64"
      ;;
    x86_64|amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.29.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extraiga el archivo `ngx_http_datadog_module.so` del archivo tar descargado usando `tar` y colóquelo en el directorio de módulos de NGINX, ubicado normalmente en `/usr/lib/nginx/modules`.

### Configuración de NGINX con el módulo de Datadog {#nginx-configuration-with-datadog-module}
En la sección superior de la configuración de NGINX, cargue el módulo de Datadog.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

La configuración predeterminada se conecta a un Datadog Agent local y genera trazas
para todas las ubicaciones de NGINX. Especifique la configuración personalizada usando las directivas dedicadas
`datadog_*` descritas en la [documentación de la API][4] del módulo de Datadog.

Por ejemplo, la siguiente configuración de NGINX establece el nombre del servicio en
`usage-internal-nginx` y la tasa de muestreo en 10 %.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servers, locations...
}
```

## Controlador Ingress-NGINX para Kubernetes {#ingress-nginx-controller-for-kubernetes}

Datadog ofrece soporte para monitorear el controlador Ingress-NGINX en Kubernetes.
Elija entre los siguientes métodos de instrumentación según su versión de controlador y sus requisitos:

- [v1.10.0+ usando las funciones de Datadog](#controller-v1100-using-datadogs-features).
- [v1.10.0+ usando OpenTelemetry](#controller-v1100-using-opentelemetry).
- [v1.9.0 y versiones anteriores](#controller-v190-and-older).

### Controlador v1.10.0+ usando las funciones de Datadog {#controller-v1100-using-datadogs-features}

Este método de instrumentación utiliza [nginx-datadog][6] y aprovecha el mecanismo de [contenedor de inicialización][7] de Kubernetes
para instalar el módulo dentro de la instancia del Ingress-NGINX Controller.

Para instrumentar Ingress-NGINX **v1.10.0+** usando el módulo de Datadog, siga estos pasos:

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Verifique su versión de Ingress-NGINX**<br>
Verifique su versión de Ingress-NGINX Controller y asegúrese de tener disponible el contenedor de inicialización de Datadog correspondiente.
La versión del contenedor de inicialización ([datadog/ingress-nginx-injection][1]) debe coincidir exactamente con la versión de su controlador para evitar problemas de inicio.
Por ejemplo, si está ejecutando Ingress-NGINX v1.11.3, necesita [datadog/ingress-nginx-injection:v1.11.3][2].

<div class="alert alert-info">Las etiquetas de versión como <code>v1.11.3</code> son etiquetas dinámicas. El módulo subyacente de Datadog NGINX puede actualizarse mientras la etiqueta permanece igual. Para fijar una versión exacta, haga referencia a la imagen mediante su digest (por ejemplo, <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. Modifique la especificación del pod de su controlador**<br>
Actualice la especificación del pod del controlador para incluir el contenedor de inicialización y configure la variable de entorno del servidor del Datadog Agent:


{{< highlight yaml "hl_lines=4-10 13-16 19-22 25-26" >}}
    spec:
      template:
        spec:
          initContainers:
            - name: init-datadog
              image: datadog/ingress-nginx-injection:<MY_INGRESS_NGINX_VERSION>
              command: ['/datadog/init_module.sh', '/opt/datadog-modules']
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
          containers:
            - name: controller
              image: registry.k8s.io/ingress-nginx/controller:<MY_INGRESS_NGINX_VERSION>
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
          volumes:
            - ...
            - name: nginx-module
              emptyDir: {}
{{< /highlight >}}

**Nota**: Para obtener una forma alternativa de acceder al Datadog Agent, consulte la [guía de instalación de Kubernetes][1].

**3. Configure Ingress-NGINX** <br>
Cree o modifique el `ConfigMap` para cargar el módulo de Datadog:

{{< highlight yaml "hl_lines=5 7-8" >}}
    kind: ConfigMap
    apiVersion: v1
    ...
    data:
      enable-opentelemetry: "false"
      error-log-level: notice
      main-snippet: |
        load_module /opt/datadog-modules/ngx_http_datadog_module.so;
{{< /highlight >}}

**4. Aplique el ConfigMap** <br>
Aplique el `ConfigMap` actualizado para asegurarse de que el módulo de Datadog se cargue correctamente.

Esta configuración garantiza que el módulo de Datadog esté cargado y listo para rastrear las solicitudes entrantes.

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Verifique su versión de Ingress-NGINX**<br>
Verifique su versión de Ingress-NGINX Controller y asegúrese de tener disponible el contenedor de inicialización de Datadog correspondiente.
La versión del contenedor de inicialización ([datadog/ingress-nginx-injection][1]) debe coincidir exactamente con la versión de su controlador para evitar problemas de inicio.
Por ejemplo, si está ejecutando Ingress-NGINX v1.11.3, necesita [datadog/ingress-nginx-injection:v1.11.3][2].

<div class="alert alert-info">Las etiquetas de versión como <code>v1.11.3</code> son etiquetas dinámicas. El módulo subyacente de Datadog NGINX puede actualizarse mientras la etiqueta permanece igual. Para fijar una versión exacta, haga referencia a la imagen mediante su digest (por ejemplo, <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. Anulación de los valores del chart de Helm**<br>
Para personalizar el chart de Helm de Ingress-NGINX y cargar el módulo de Datadog requerido, cree un archivo YAML o modifique uno existente con la siguiente configuración:

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  config:
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags>
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. Desplegar**<br>
Instale o actualice el release de Helm usando la opción `-f` para aplicar los valores personalizados creados en el paso anterior.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### Controlador v1.10.0+ usando OpenTelemetry {#controller-v1100-using-opentelemetry}

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Prepare el Datadog Agent** <br>
Asegúrese de que su Datadog Agent tenga [habilitada la ingesta de OTLP por gRPC][1] para actuar como un OpenTelemetry Collector.

**2. Configure el controlador de Ingress** <br>
Para comenzar, verifique que la especificación del pod de su controlador de Ingress tenga establecida la variable de entorno `HOST_IP`. Si no es así, agregue la siguiente entrada al bloque `env` dentro de la especificación del pod:

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

A continuación, habilite la instrumentación de OpenTelemetry para el controlador. Cree o edite un ConfigMap con los siguientes detalles:

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Prepare el Datadog Agent** <br>
Asegúrese de que su Datadog Agent tenga [habilitada la ingesta de OTLP por gRPC][1] para actuar como un OpenTelemetry Collector.

**2. Anulación de los valores del chart de Helm**<br>
Para personalizar el chart de Helm de Ingress-NGINX y cargar el módulo de Datadog requerido, cree un archivo YAML o modifique uno existente con la siguiente configuración:

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  opentelemetry:
    enabled: true
  config:
    otel-service-name: "nginx"
    otel-sampler: AlwaysOn
    otel-sampler-ratio: 0.01
  extraEnvs:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317"
{{< /code-block >}}

**3. Desplegar**
Instale o actualice el release de Helm usando la opción `-f` para aplicar los valores personalizados creados en el paso anterior.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### Controlador v1.9.0 y versiones anteriores {#controller-v190-and-older}
Para habilitar el rastreo de Datadog, cree o edite un ConfigMap para establecer `enable-opentracing: "true"` y el `datadog-collector-host` al cual se deben enviar las trazas.
El argumento de la línea de comandos del contenedor de Ingress-NGINX Controller especifica explícitamente el nombre del ConfigMap, que de forma predeterminada es `--configmap=<POD_NAMESPACE>/nginx-configuration`.
Si `ingress-nginx` se instaló mediante el chart de Helm, el nombre del ConfigMap seguirá el patrón `<RELEASE_NAME>-nginx-ingress-controller`.

El Ingress controller gestiona tanto los archivos `nginx.conf` como `/etc/nginx/opentracing.json`. El rastreo está habilitado para todos los bloques `location`.

{{< highlight yaml "hl_lines=6-7 9-15" >}}
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
{{< /highlight >}}

Además, asegúrese de que la especificación del pod de su controlador tenga establecida la variable de entorno `HOST_IP`. Agregue esta entrada al bloque `env:` que contiene las variables de entorno `POD_NAME` y `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Para establecer un nombre de servicio diferente por Ingress mediante anotaciones:

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Lo anterior sustituye el nombre de servicio `nginx-ingress-controller.ingress-nginx` predeterminado.

## OpenResty con el módulo de Datadog {#openresty-with-datadog-module}

OpenResty está construido sobre NGINX, y cada versión `nginx-datadog` incluye una compilación independiente del módulo para OpenResty.

Para instalar el módulo de NGINX de Datadog para OpenResty:
1. Descargue la versión adecuada con el prefijo `openresty-` desde el [último `nginx-datadog` lanzamiento de GitHub][1].
2. Elija el archivo tarball que coincida con su versión de OpenResty y la arquitectura de su CPU. Utilice la versión de OpenResty de cuatro partes de `openresty -v` (por ejemplo, `1.31.1.1`), no la versión del núcleo de NGINX sobre la que está construida.
3. Extraiga `ngx_http_datadog_module.so` del archivo tarball y colóquelo en `/usr/local/openresty/nginx/modules`. Cree el directorio si no existe.
4. En la parte superior de `/usr/local/openresty/nginx/conf/nginx.conf`, cargue el módulo:

    ```nginx
    load_module modules/ngx_http_datadog_module.so;
    ```

Las directivas `datadog_*` descritas en la [documentación de la API][4] del módulo y las variables de entorno `DD_*` funcionan de la misma manera en OpenResty que en NGINX.

## Correlación de trazas con registros {#correlating-traces-to-logs}

Después de habilitar el rastreo de APM, puede conectar sus trazas con los registros de NGINX correspondientes. Esta correlación vincula cada traza y tramo con los eventos de registro específicos generados durante esa solicitud, lo que le permite alternar entre ellos para solucionar problemas.

### Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:
- Habilitado el rastreo de APM para NGINX siguiendo los pasos anteriores en esta guía.
- Configurado la recopilación de registros de Datadog para NGINX.

### Paso 1: Inyectar el ID de traza y el ID de tramo en los registros de NGINX {#step-1-inject-trace-and-span-ids-into-nginx-logs}

Modifique su directiva `log_format` para incluir el ID de traza y el ID de tramo. Las variables que utilice dependen de su método de instrumentación. Seleccione la pestaña correspondiente a continuación para ver las instrucciones que coinciden con su configuración.

{{< tabs >}}
{{% tab "Datadog NGINX Module" %}}

Si instaló el [módulo de NGINX de Datadog][100], utilice las variables `$datadog_trace_id` y `$datadog_span_id`. Este valor es `-` para las solicitudes que no están rastreadas.

Actualice su archivo de configuración de NGINX (por ejemplo, `/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_datadog '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for" '
                         'dd.trace_id="$datadog_trace_id"' 'dd.span_id="$datadog_span_id"';

  access_log /var/log/nginx/access.log main_datadog;
}
```
[100]: https://github.com/DataDog/nginx-datadog/releases/latest

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

Si está utilizando el [módulo de OpenTelemetry de NGINX][100], utilice las variables `$otel_trace_id` y `$otel_span_id`. Este valor es una cadena vacía para las solicitudes que no están rastreadas.

Actualice su archivo de configuración de NGINX (por ejemplo, `/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_opentelemetry '$remote_addr - $remote_user [$time_local] "$request" '
                               '$status $body_bytes_sent "$http_referer" '
                               '"$http_user_agent" "$http_x_forwarded_for" '
                               'dd.trace_id="$otel_trace_id"' 'dd.span_id="$otel_span_id"' ;

  access_log /var/log/nginx/access.log main_opentelemetry;
}
```
[100]: https://nginx.org/en/docs/ngx_otel_module.html
{{% /tab %}}
{{< /tabs >}}

Después de guardar sus cambios, recargue la configuración de NGINX. Por ejemplo:

```sh
sudo nginx -s reload
```

### Paso 2: Configurar la canalización de registros para parsear el ID de traza y el ID de tramo {#step-2-configure-the-log-pipeline-to-parse-the-trace-and-span-ids}

De forma predeterminada, los registros capturan `dd.trace_id` y `dd.span_id` en formato hexadecimal:

```
10.244.0.1 - - [12/Sep/2025:22:41:03 +0000] "GET /health HTTP/1.1" 200 87 0.002 "-" "kube-probe/1.32" "-" dd.trace_id="68c4a17f000000009aed12af2ccb1ead" dd.span_id="9aed12af2ccb1ead"
```

Para habilitar la correlación de registros y trazas en Datadog, configure una canalización de procesamiento de registros para convertir estos ID de hexadecimal a decimal. Siga los mismos pasos independientemente del método de instrumentación que utilice.

1. En Datadog, navegue a la página [{{< ui >}}Log Configuration{{< /ui >}}][9].
2. Pase el cursor sobre su canalización de NGINX activa y haga clic en el icono {{< ui >}}Clone{{< /ui >}} para crear una versión editable.
3. Haga clic en la canalización clonada.
4. Haga clic en {{< ui >}}Add Processor{{< /ui >}}.
5. Seleccione [Grok Parser][11] como el tipo de procesador.
6. Defina la siguiente regla de parseo para extraer el atributo de ID de traza de un evento de registro. Esta regla funciona tanto para el módulo de Datadog como para las salidas de OpenTelemetry:
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. Haga clic en {{< ui >}}Create{{< /ui >}}.
8. Haga clic en {{< ui >}}Add Processor{{< /ui >}} nuevamente.
9. Seleccione [remapeador de ID de traza][10] como el tipo de procesador. Este procesador asocia el ID analizado con su traza de APM correspondiente.
10. En el campo {{< ui >}}Set trace id attribute(s){{< /ui >}}, ingrese `dd.trace_id`.
11. Haga clic en {{< ui >}}Create{{< /ui >}}.
12. Haga clic en {{< ui >}}Add Processor{{< /ui >}} nuevamente.
13. Seleccione [Remapeador de ID de tramo][12] como el tipo de procesador. Este procesador asocia el ID analizado con su tramo de APM correspondiente.
14. En el campo {{< ui >}}Set span id attribute(s){{< /ui >}}, ingrese `dd.span_id`.
15. Haga clic en {{< ui >}}Create{{< /ui >}}.
16. Guarde y habilite su nueva canalización.

Una vez que la canalización esté activa, los nuevos registros de NGINX se correlacionarán automáticamente con sus trazas y tramos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[8]: /es/logs/guide/ease-troubleshooting-with-cross-product-correlation
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /es/logs/log_configuration/processors/trace_remapper/
[11]: /es/logs/log_configuration/processors/grok_parser/
[12]: /es/logs/log_configuration/processors/span_remapper/