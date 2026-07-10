---
app_id: oom-kill
app_uuid: 7546b270-2efe-4a59-8f94-3447df2db801
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: oom_kill.oom_process.count
      metadata_path: metadata.csv
      prefix: oom_kill.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10293
    source_type_name: OOM Kill
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md
display_on_public_website: true
draft: false
git_integration_title: oom_kill
integration_id: oom-kill
integration_title: OOM Kill
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oom_kill
public_title: OOM Kill
short_description: Seguimiento del proceso OOM kills por el sistema o cgroup.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Sistema operativo y sistema
  - Categoría::Gestión de eventos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento del proceso OOM kills por el sistema o cgroup.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OOM Kill
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el proceso OOM (sin memoria) kill del kernel a través del Datadog Agent y el System Probe.

## Configuración

### Instalación

El check OOM Kill está incluido en el paquete del [Datadog Agent][1]. Se basa en un programa eBPF implementado en el System Probe.

El programa eBPF utilizado por el System Probe se compila en tiempo de ejecución y requiere que tengas acceso a los encabezados del kernel adecuados.

En distribuciones de tipo Debian, instala las cabeceras de kernel de la siguiente manera:
```sh
apt install -y linux-headers-$(uname -r)
```

En distribuciones de tipo RHEL, instala las cabeceras de kernel de la siguiente manera:
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Nota**: Para que funcione el check OOM Kill se requiere la versión 4.9 o posterior del kernel.
Además, las versiones de Windows y CentOS/RHEL anteriores a la 8 no son compatibles.

### Configuración

1. En el archivo `system-probe.yaml` situado en la raíz de tu directorio de configuración del Agent, añade la siguiente configuración:

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. Asegúrate de que el archivo `oom_kill.d/conf.yaml` está presente en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus métricas de OOM Kill. Consulta el [oom_kill.d/conf.yaml de ejemplo][2] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][3].

### Configuración con Docker

Además de montar `system-probe.yaml` y `oom_kill.d/conf.yaml` como se ha descrito anteriormente, haz la siguiente configuración:

1. Monta los siguientes volúmenes en el contenedor del Agent:

    ```
    -v /sys/kernel/debug:/sys/kernel/debug
    -v /lib/modules:/lib/modules
    -v /usr/src:/usr/src
    ```

2. Añade el siguiente permiso para habilitar las operaciones BPF:

    ```
    --privileged
    ```

    A partir de la versión 5.8 del kernel, el parámetro `--privileged` puede sustituirse por `--cap-add CAP_BPF`.

**Nota**: El modo `--privileged` no es compatible con Docker swarm.


### Configuración con Helm

Con [Datadog Helm chart][4], asegúrate de que los parámetros `datadog.systemProbe` y `datadog.systemProbe.enableOOMKill` están habilitados en el archivo `values.yaml`.

### Configuración con el Operator (v1.0.0 o posterior)

Establece el parámetro `features.oomKill.enabled` en el manifiesto del DatadogAgent:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
```

**Nota**: Cuando utilices COS (Contenedor Optimized OS), anula el volumen `src` en el Agent del nodo:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
  override:
    nodeAgent:
      volumes:
      - emptyDir: {}
        name: src
```

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `oom_kill` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oom-kill" >}}


### Checks de servicios

El check OOM Kill no incluye ningún check de servicio.

### Eventos

El check OOM Kill envía un evento para cada OOM Kill que incluye el ID y el nombre de proceso eliminado, así como el ID y el nombre de proceso desencadenante.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/helm-charts
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/es/help/