---
app_id: cri
app_uuid: 81805522-0f55-45a4-95f6-23dd9ea46361
assets:
  dashboards:
    cri: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cri.cpu.usage
      metadata_path: metadata.csv
      prefix: cri.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10043
    source_type_name: CRI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cri/README.md
display_on_public_website: true
draft: false
git_integration_title: cri
integration_id: cri
integration_title: CRI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cri
public_title: CRI
short_description: Seguimiento de todas tus métricas de CRI con Datadog
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento de todas tus métricas de CRI con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza la interfaz de tiempo de ejecución de un contenedor

## Configuración

### Instalación

El CRI es un check central del [Datadog Agent][1] que debe configurarse en `datadog.yaml` con `cri.d/conf.yaml`.

En `datadog.yaml`, configura tu `cri_socket_path` para que el Agent realice consultas a tu CRI actual (también puedes configurar tiempos de espera predeterminados). En `cri.d/conf.yaml`, configura los parámetros de la instancia del check como `collect_disk`, si tu CRI (como `containerd`) informa de métricas del uso del disco.

Si utilizas el Agent en un contenedor, configura la variable de entorno `DD_CRI_SOCKET_PATH` para habilitar automáticamente el check `CRI` con la configuración predeterminada.

#### Instalación en contenedores

Si utilizas el Agent en un contenedor, al configurar la variable de entorno `DD_CRI_SOCKET_PATH` en el socket CRI se habilita automáticamente la integración `CRI` con la configuración predeterminada.

Por ejemplo, para instalar la integración en Kubernetes, edita tu DaemonSet para instalar el socket CRI del nodo host en el contenedor del Agent y configura la variable de entorno `DD_CRI_SOCKET_PATH` en la ruta de instalación del DaemonSet:

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: /var/run/crio/crio.sock
          volumeMounts:
            - name: crisocket
              mountPath: /var/run/crio/crio.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/crio/crio.sock
              name: crisocket
            - hostPath:
                path: /var/run
              name: var-run
```

**Nota:** El directorio `/var/run` debe instalarse desde el host para ejecutar la integración sin problemas.

### Configuración

1. Edita el archivo `cri.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu CRI. Para conocer todas las opciones de configuración disponibles, consulta el [cri.d/conf.yaml de ejemplo][2].

2. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `cri` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cri" >}}


### Checks de servicio

El CRI no incluye checks de servicio.

### Eventos

El CRI no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.default
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[5]: https://docs.datadoghq.com/es/help/