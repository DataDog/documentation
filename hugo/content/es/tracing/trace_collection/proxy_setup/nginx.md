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
type: lenguaje de código múltiple
---

Datadog APM es compatible con NGINX en dos configuraciones:
- NGINX funcionaba como proxy con el rastreo proporcionado por el módulo de Datadog.
- NGINX como controlador Ingress para Kubernetes.

## NGINX con el módulo de Datadog
Datadog proporciona un módulo NGINX para el rastreo distribuido.

### Instalación del módulo
Para instalar el módulo NGINX de Datadog, sigue las siguientes instrucciones:
1. Descarga la versión adecuada del [último lanzamiento de Nginx-Datadog en GitHub][1]
2. Elige el archivo .tar correspondiente a la versión de NGINX y a la arquitectura de CPU específicas.

Cada versión incluye dos archivos .tar por cada combinación de la versión de NGINX y la arquitectura de CPU.
El archivo .tar principal contiene un único archivo, `ngx_http_datadog_module.so`, que es el módulo NGINX de Datadog. El segundo contiene símbolos de depuración y es opcional.

Para simplificar el proceso, el siguiente script sólo descarga el módulo de la última versión:

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

NGINX_VERSION="1.26.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extrae el archivo `ngx_http_datadog_module.so` del tarball descargado mediante `tar` y colócalo en el directorio de módulos de NGINX, situado normalmente en `/usr/lib/nginx/modules`.

### Configuración de NGINX con el módulo de Datadog 
En la sección superior de configuración de NGINX, carga el módulo de Datadog.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

La configuración por defecto se conecta a un Datadog Agent local y produce trazas
para todas las localizaciones de NGINX. Especifica una configuración personalizada utilizando las directivas exclusivas
`datadog_*` descritas en la [documentación de la API][4] del módulo de Datadog.

Por ejemplo, la siguiente configuración de NGINX define el nombre del servicio como
`usage-internal-nginx` y la frecuencia de muestreo en 10%.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servidores, localizaciones...
}
```

## Controlador Ingress-NGINX para Kubernetes

Datadog ofrece soporte para monitorizar el controlador Ingress-NGINX en Kubernetes.
Elige entre los siguientes métodos de instrumentación en función de la versión y los requisitos de tu controlador:

- [v1.10.0+ con las características de Datadog](#controller-v1100-using-datadogs-features).
- [v1.10.0+ con OpenTelemetry](#controller-v1100-using-opentelemetry).
- [v1.9.0 y anteriores](#controller-v190-and-older).

### Controlador v1.10.0+ con las características de Datadog

Este método de instrumentación utiliza [nginx-datadog][6] y aprovecha el mecanismo [init-container][7] de Kubernetes
para instalar el módulo dentro de la instancia del controlador Ingress-NGINX.

Para instrumentar Ingress-NGINX **v1.10.0+** mediante el módulo de Datadog, sigue estos pasos:

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Verificar la versión de Ingress-NGINX**<br>
Comprueba la versión de tu controlador Ingress-NGINX y asegúrate de que dispones de la versión init-container de Datadog correspondiente.
La versión init-container ([datadog/ingress-nginx-injection][1]) debe coincidir exactamente con la versión de tu controlador para evitar problemas de inicio.
Por ejemplo, si estás ejecutando Ingress-NGINX v1.11.3, necesitas [datadog/ingress-nginx-injection:v1.11.3][2].

**2. Modificar la especificación del pod del controlador**<br>
Actualiza la especificación del pod del controlador para incluir la variable init-container y configurar la variable de entorno del host del Datadog Agent:

{{< highlight yaml "hl_lines=4-10 13 16-19" >}}
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
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
{{< /highlight >}}

**Nota**: Para ver una forma alternativa de acceder al Datadog Agent, consulta la [guía de instalación de Kubernetes][1].

**3. Configurar Ingress-NGINX** <br>
Crea o modifica `ConfigMap` para cargar el módulo de Datadog:

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

**4. Aplicar el ConfigMap** <br>
Aplica el `ConfigMap` actualizado para asegurarte de que el módulo de Datadog se cargue correctamente.

Esta configuración asegura que el módulo de Datadog esté cargado y listo para rastrear las solicitudes entrantes.

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Verificar la versión de Ingress-NGINX**<br>
Comprueba la versión de tu controlador Ingress-NGINX y asegúrate de que dispones de la versión init-container de Datadog correspondiente.
La versión init-container ([datadog/ingress-nginx-injection][1]) debe coincidir exactamente con la versión de tu controlador para evitar problemas de inicio.
Por ejemplo, si estás ejecutando Ingress-NGINX v1.11.3, necesitas [datadog/ingress-nginx-injection:v1.11.3][2].

**2. Anular los valores de la tabla de Helm**<br>
Para personalizar la tabla de Helm de Ingress-NGINX y cargar el módulo de Datadog necesario, crea un archivo YAML o modifica uno existente con la siguiente configuración:

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
        # La etiqueta debe coincidir con la versión del controlador ingress-nginx
        # Por ejemplo, esto inyectará el módulo de Datadog para ingress v1.10.0
        # Comprueba <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags>
        # para obtener la lista de todas las versiones admitidas.
        tag: "v1.10.0"
        distroless: false
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. Desplegar**<br>
Instala o actualiza la versión de Helm mediante el marcador `-f` para aplicar los valores personalizados creados en el paso anterior.
```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### Controlador v1.10.0+ con OpenTelemetry

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Preparar el Datadog Agent** <br>
Asegúrate de que tu Datadog Agent tenga [habilitada la ingesta de OTLP gRPC][1] para actuar como un recopilador de OpenTelemetry.

**2. Configurar el controlador Ingress** <br>
Para empezar, verifica que la especificación del pod de tu controlador Ingress tenga la variable de entorno `HOST_IP` configurada. Si no es así, añade la siguiente entrada al bloque `env` dentro de la especificación del pod:

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

A continuación, habilita la instrumentación de OpenTelemetry para el controlador. Crea o edita un ConfigMap con los siguientes detalles:

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Por defecto
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Preparar el Datadog Agent** <br>
Asegúrate de que tu Datadog Agent tenga [habilitada la ingesta de OTLP gRPC][1] para actuar como un recopilador de OpenTelemetry.

**2. Anular los valores de la tabla de Helm**<br>
Para personalizar la tabla de Helm de Ingress-NGINX y cargar el módulo de Datadog necesario, crea un archivo YAML o modifica uno existente con la siguiente configuración:

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
Instala o actualiza la versión de Helm mediante el marcador `-f` para aplicar los valores personalizados creados en el paso anterior.
```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### Controlador v1.9.0 y anteriores
Para habilitar el rastreo en Datadog, crea o edita un ConfigMap para configurar`enable-opentracing: "true"` y el `datadog-collector-host` al que se deben enviar trazas.
El nombre del ConfigMap lo cita explícitamente el argumento de línea de comandos del contenedor del controlador Ingress-NGINX. Por defecto es `--configmap=<POD_NAMESPACE>/nginx-configuration`.
Si `ingress-nginx` se ha instalado utilizando el chart Helm, el nombre del ConfigMap seguirá el patrón `<RELEASE_NAME>-nginx-ingress-controller`.

El controlador Ingress gestiona los archivos `nginx.conf` y `/etc/nginx/opentracing.json`. El rastreo está habilitado para todos los bloques de `location`.

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
  # Por defecto
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
{{< /highlight >}}

Además, asegúrate de que la especificación del pod de tu controlador tiene definida la variable de entorno `HOST_IP`. Añade esta entrada al bloque `env:` que contiene las variables de entorno `POD_NAME` y `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Para definir un nombre de servicio diferente por cada Ingress, utilizando anotaciones:

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Lo anterior anula el nombre de servicio `nginx-ingress-controller.ingress-nginx` por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/