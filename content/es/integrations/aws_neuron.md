---
app_id: aws-neuron
app_uuid: fff4d15b-0953-41c9-8139-ef0a8d718d93
assets:
  dashboards:
    AWS Neuron Overview: assets/dashboards/aws_neuron_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws_neuron.neuron_runtime.memory_used_bytes
      metadata_path: metadata.csv
      prefix: aws_neuron.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21046822
    source_type_name: AWS Neuron
  monitors:
    Execution errors: assets/monitors/execution_errors.json
    Execution latency: assets/monitors/execution_latency.json
    Neuron Runtime vCPU usage: assets/monitors/neuron_runtime_vcpu.json
  saved_views:
    AWS Neuron Error Logs Overview: assets/saved_views/error_logs_overview.json
    AWS Neuron Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- aws
- nube
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aws_neuron/README.md
display_on_public_website: true
draft: false
git_integration_title: aws_neuron
integration_id: aws-neuron
integration_title: Monitorización AWS Inferentia y AWS Trainium
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: aws_neuron
public_title: Monitorización AWS Inferentia y AWS Trainium
short_description: Monitoriza el rendimiento y el uso de las instancias de AWS Inferentia/Trainium
  y el SDK Neuron.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - SO compatible::Linux
  - SO compatible::Windows
  - SO compatible::macOS
  - Categoría::IA/ML
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Oferta::Integración
  - Tipo de datos consultados::Métricas
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitoriza el rendimiento y el uso de las instancias de AWS Inferentia/Trainium
    y el SDK Neuron.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Monitorización AWS Inferentia y AWS Trainium
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [AWS Neuron][1] a través del Datadog Agent. Habilita la monitorización de los dispositivos Inferentia y Trainium y ofrece información sobre el rendimiento de tu modelo de Machine Learning.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en una instancia EC2. Para entornos en contenedores, consulta las [plantillas de la integración Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check AWS Neuron está incluido en el paquete del [Datadog Agent][3].

También necesitas instalar el paquete de [herramientas AWS Neuron][4].

No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Métricas

1. Asegúrate de que se está utilizando el [monitor de Neuron][5] para exponer el endpoint de Prometheus.

2. Edita el archivo `aws_neuron.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][6], para empezar a recopilar los datos de rendimiento de tu AWS Neuron. Para conocer todas las opciones de configuración disponibles, consulta el [aws_neuron.d/conf.yaml de ejemplo][7].

3. [Reinicia el Agent][8].

#### Logs

La integración AWS Neuron puede recopilar logs de los contenedores Neuron y reenviarlos a Datadog.

{{< tabs >}}
{{% tab "Host" %}}

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `aws_neuron.d/conf.yaml`. A continuación podrás ver un ejemplo:

   ```yaml
   logs:
     - type: docker
       source: aws_neuron
       service: aws_neuron
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][1].

A continuación, configura las Integraciones de logs como anotaciones de pod. Esto también se puede configurar con un archivo, un configmap o un almacén de valores clave. Para obtener más información, consulta la sección [Recopilación de logs de Kubernetes][2].

[1]: https://docs.datadoghq.com/es/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `aws_neuron` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "aws-neuron" >}}


### Eventos

La integración AWS Neuron no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "aws-neuron" >}}


## Solucionar problemas

En entornos en contenedores, asegúrate de que el Agent tiene acceso de red a los endpoints especificados en el archivo `aws_neuron.d/conf.yaml`.

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].



[1]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/index.html
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/index.html
[5]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/neuron-sys-tools/neuron-monitor-user-guide.html#using-neuron-monitor-prometheus-py
[6]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/aws_neuron/datadog_checks/aws_neuron/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/help/