---
app_id: robust-intelligence-ai-firewall
app_uuid: 1d208134-9005-4a79-bbc1-445950d1a5c7
assets:
  dashboards:
    ai_firewall_results: assets/dashboards/robust_intelligence_ai_firewall_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: robust_intelligence_ai_firewall.firewall_requests.count
      metadata_path: metadata.csv
      prefix: robust_intelligence_ai_firewall.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10418
    source_type_name: Firewall de IA de Robust Intelligence
author:
  homepage: https://www.robustintelligence.com/
  name: Robust Intelligence
  sales_email: contact@robustintelligence.com
  support_email: help@robustintelligence.com
categories:
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: robust_intelligence_ai_firewall
integration_id: robust-intelligence-ai-firewall
integration_title: Firewall de IA de Robust Intelligence
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: robust_intelligence_ai_firewall
public_title: Firewall de IA de Robust Intelligence
short_description: Monitorizar los resultados del Firewall de IA con Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitorizar los resultados del Firewall de IA con Datadog
  media:
  - caption: Firewall de IA de Robust Intelligence
    image_url: images/ai-firewall.png
    media_type: imagen
  - caption: Dashboard de resultados del Firewall de IA de Robust Intelligence
    image_url: images/firewall-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Firewall de IA de Robust Intelligence
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

El [Firewall de IA de Robust Intelligence][1] es una capa protectora para los modelos de IA.

El Firewall de IA inspecciona las solicitudes entrantes de los usuarios para bloquear cargas maliciosas, incluidas las que intentan inyectar, extraer o detectar información personal. El Firewall de IA analiza los resultados del modelo LLM para garantizar que no contengan información falsa, datos confidenciales ni contenido dañino. Las respuestas que no cumplen las normas de tu organización se bloquean en la aplicación.

Esta integración monitoriza los resultados del Firewall de IA a través del Datadog Agent. Proporciona a los usuarios la posibilidad de observar los problemas de seguridad de su IA, incluyendo métricas para los puntos de datos permitidos, los puntos de datos bloqueados y la comprensión de por qué se bloqueó cada punto de datos.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para Agent v7.21+/v6.21+, sigue las instrucciones que se indican a continuación para instalar el check del Firewall de IA de Robust Intelligence en tu host. Consulta [Usar integraciones de la comunidad][3] para realizar la instalación con Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-robust-intelligence-ai-firewall==1.0.0
   ```

2. Configura tu integración similar a las [integraciones][2] centrales. Consulta la sección de Configuración a continuación para conocer los pasos específicos de esta integración.

### Configuración

1. Edita el archivo `robust_intelligence_ai_firewall.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar los datos de rendimiento de tu Firewall de IA de Robust Intelligence.
    ```yaml
    init_config:

    instances:
        ## @param metrics_endpoint - string - required
        ## The URL to Robust Intelligence AI Firewall 
        ## internal metrics per loaded plugin in Prometheus
        ## format.
        #
      - openmetrics_endpoint: http://localhost:8080/metrics
    ```
   Consulta el archivo [robust_intelligence_ai_firewall.d/conf.yaml de ejemplo][4] para ver todas las opciones disponibles de configuración.

2. Para configurar la integración para que el Firewall de IA se ejecute en un entorno en contenedores, añade la siguiente anotación a los pods:
   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
         {
           "robust_intelligence_ai_firewall": {
             "init_config": {},
             "instances": [
               {
                 "openmetrics_endpoint": "http://%%host%%:8080/metrics"
               }
             ]
           }
         }
       # (...)
   ```

3. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `robust_intelligence_ai_firewall` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "robust-intelligence-ai-firewall" >}}


### Checks de servicio

El firewall de IA de Robust Intelligence no incluye ningún check de servicio.

### Eventos

El firewall de IA de Robust Intelligence no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Robust Intelligence][8].


[1]: https://www.robustintelligence.com/platform/ai-firewall
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/datadog_checks/robust_intelligence_ai_firewall/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/metadata.csv
[8]: mailto:help@robustintelligence.com