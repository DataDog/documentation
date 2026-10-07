---
app_id: wayfinder
app_uuid: a68bad83-ba55-4350-a913-2f98bb667bad
assets:
  dashboards:
    Wayfinder: assets/dashboards/wayfinder_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: wayfinder.workqueue.depth
      metadata_path: metadata.csv
      prefix: wayfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10370
    source_type_name: wayfinder
  logs: {}
author:
  homepage: https://www.appvia.io/product/
  name: Appvia
  sales_email: info@appvia.io
  support_email: support@appvia.io
categories:
- rastreo
- herramientas de desarrollo
- kubernetes
- métricas
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/wayfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: wayfinder
integration_id: wayfinder
integration_title: Wayfinder
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: wayfinder
public_title: Wayfinder
short_description: Enviar métricas de Wayfinder a Datadog
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Developer Tools
  - Category::Kubernetes
  - Category::Metrics
  - Category::Orchestration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Enviar métricas de Wayfinder a Datadog
  media:
  - caption: Dashboard de Datadog de muestra de Wayfinder
    image_url: images/wayfinder-datadog-dash.png
    media_type: imagen
  - caption: Interfaz de usuario de Wayfinder
    image_url: images/wayfinder-ui.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Wayfinder
---

<!--  EXTRAÍDA DE https://github.com/DataDog/integrations-extras -->


## Información general

[Wayfinder][1] es una plataforma de gestión de infraestructura que permite el
autoservicio para los desarrolladores a través de una configuración centralizada. Este check monitoriza los componentes clave de gestión de Wayfinder
a través del Datadog Agent.

La integración recopila métricas clave del servidor de API de Wayfinder, el controlador,
y componentes de webhook. Estas métricas deberían resaltar los problemas en los
espacios de trabajo gestionados. 

## Configuración

Sigue las instrucciones a continuación para instalar la integración en el clúster de gestión de Wayfinder Kubernetes.

### Instalación

Para entornos en contenedores, la mejor manera de utilizar esta integración con el
Docker Agent es construir el Agent con la integración de Wayfinder instalada. 

### Requisitos previos:

Un política de red debe configurarse para permitir que el Datadog Agent se conecte a
componentes de Wayfinder. La siguiente política de red asume que Datadog está desplegado en
el espacio de nombres de Datadog y Wayfinder está desplegado en el espacio de nombres de Wayfinder.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: datadog-agent
  namespace: wayfinder
spec:
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: datadog
      podSelector:
        matchLabels:
          app: datadog-agent
    ports:
    - port: 9090
      protocol: TCP
  podSelector:
    matchExpressions:
    - key: name
      operator: In
      values:
      - wayfinder-controllers
      - wayfinder-apiserver
      - wayfinder-webhooks
  policyTypes:
  - Ingress
```

Para crear una versión actualizada del Agent:

1. Utiliza el siguiente archivo de Docker:

    ```dockerfile
    FROM gcr.io/datadoghq/agent:latest

    ARG INTEGRATION_VERSION=1.0.0

    RUN agent integration install -r -t datadog-wayfinder==${INTEGRATION_VERSION}
    ```

2. Crea la imagen y envíala a tu registro privado de Docker.

3. Actualiza la imagen de contenedor del Datadog Agent. Si estás utilizando un Helm chart,
   modifica la sección `agents.image` del archivo `values.yaml` para sustituir la
   imagen por defecto del Agent:

    ```yaml
    agents:
      enabled: true
      image:
        tag: <NEW_TAG>
        repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
    ```

4. Utiliza el nuevo archivo `values.yaml` para actualizar el Agent:

    ```shell
    helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
    ```

### Configuración

1. Edita el archivo `wayfinder/conf.yaml`, en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de Wayfinder.
   Consulta el [wayfinder/conf.yaml de muestra][4] para ver todas las opciones de configuración
   disponibles.

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `wayfinder` en la sección
Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "wayfinder" >}}


### Checks de servicio

Wayfinder no incluye checks de servicio.

### Eventos

Wayfinder no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[4]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/datadog_checks/wayfinder/data/conf.yaml.example
[5]:
    https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]:
    https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/metadata.csv
[8]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/assets/service_checks.json

[1]: https://www.appvia.io/product/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/