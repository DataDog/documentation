---
app_id: containerd
app_uuid: 206cf95f-1d2a-4ad5-b027-0de15431833b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: containerd.cpu.user
      metadata_path: metadata.csv
      prefix: containerd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10082
    source_type_name: Containerd
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
- https://github.com/DataDog/integrations-core/blob/master/containerd/README.md
display_on_public_website: true
draft: false
git_integration_title: containerd
integration_id: containerd
integration_title: Containerd
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: containerd
public_title: Containerd
short_description: Seguimiento de tus métricas de Containerd con Datadog
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento de tus métricas de Containerd con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Containerd
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el tiempo de ejecución del contenedor Containerd.

## Configuración

### Instalación

El check de Containerd es un check central del [Datadog Agent ][1]. Debes configurar Containerd tanto en `datadog.yaml` como en `containerd.d/conf.yaml`.

En `datadog.yaml`, configura tu `cri_socket_path` para que el Agent realice consultas a Containerd. En `containerd.d/conf.yaml`, configura los parámetros de la instancia del check (como `filters`) para eventos.

#### Instalación en contenedores

Si utilizas el Agent en un contenedor, al configurar la variable de entorno `DD_CRI_SOCKET_PATH` en el socket Containerd se habilita automáticamente la integración Containerd con la configuración predeterminada.

Por ejemplo, para instalar la integración en Kubernetes, edita tu DaemonSet para instalar el socket Containerd del nodo host en el contenedor del Agent y configura la variable de entorno `DD_CRI_SOCKET_PATH` en la ruta de instalación del DaemonSet:

{{< tabs >}}
{{% tab "Contenedor Linux" %}}

##### Contenedor Linux

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
              value: /var/run/containerd/containerd.sock
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
            - hostPath:
                path: /var/run
              name: var-run
```

**Nota:** El directorio `/var/run` debe instalarse desde el host para ejecutar la integración sin problemas.

{{% /tab %}}
{{% tab "Contenedor Windows" %}}

##### Contenedor Windows

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
              value: \\\\.\\pipe\\containerd-containerd
          volumes:
            - hostPath:
                path: \\\\.\\pipe\\containerd-containerd
              name: containerdsocket
          volumeMounts:
            - name: containerdsocket
              mountPath: \\\\.\\pipe\\containerd-containerd
```

{{% /tab %}}
{{< /tabs >}}

### Configuración

1. Edita el archivo `containerd.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de Containerd. Consulta el [containerd.d/conf.yaml de ejemplo][2] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando `status` del Agent][4] y busca `containerd` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "containerd" >}}


Esta integración funciona en Linux y en Windows, pero algunas métricas dependen del sistema operativo. Para ver la lista de métricas dependientes del sistema operativo, consulta`metadata.csv`.

### Eventos

El check de Containerd puede recopilar eventos. Utiliza `filters` para seleccionar los eventos correspondientes. Para obtener más información, consulta el [`containerd.d/conf.yaml` de ejemplo][2].

### Checks de servicio
{{< get-service-checks-from-git "containerd" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/es/help/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent