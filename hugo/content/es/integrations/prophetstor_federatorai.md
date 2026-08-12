---
algolia:
  subcategory: Integraciones del Marketplace
app_id: prophetstor-federatorai-license
app_uuid: 965e6142-3b99-4999-a7c6-09a00775e511
assets:
  integration:
    auto_install: false
    configuration:
      spec: ''
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10187
    source_type_name: Federator.ai.license
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor
  sales_email: dd_subscription@prophetstor.com
  support_email: support@prophetstor.com
  vendor_id: prophetstor
categories:
- contenedores
- kubernetes
- marketplace
- orquestación
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: prophetstor_federatorai
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: profetstor_federatorai
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: federatorai-license
  short_description: 2000 dólares al mes
  unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: 'Licencia de Federator.ai para optimizar las aplicaciones Kubernetes '
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Marketplace
  - Categoría::Orquestación
  - Categoría::IA/ML
  - Oferta::Licencia de software
  - Sistema operativo compatible::Linux
  configuration: README.md#Configuración
  description: Licencia de Federator.ai para optimizar las aplicaciones Kubernetes
  media:
  - caption: El dashboard con información general del clúster ProphetStor Federator.ai
      muestra predicciones sobre el uso de recursos, recomendaciones para clústeres
      y nodos Kubernetes, y el historial de uso.
    image_url: images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: imagen
  - caption: El dashboard con información general de la aplicación ProphetStor Federator.ai
      muestra el uso previsto de CPU y de memoria, así como recomendaciones para cada
      aplicación.
    image_url: images/Federator_ai_Datadog_Application_Overview.png
    media_type: imagen
  - caption: El dashboard con información general de Kafka de ProphetStor Federator.ai
      muestra información de uso y recomendaciones sobre el autoescalado de réplicas
      de consumidores de Kafka.
    image_url: images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: imagen
  - caption: El dashboard con información general del análisis de costes de ProphetStor
      Federator.ai muestra el coste del despliegue de un clúster Kubernetes, recomendaciones
      de configuración del clúster y el coste/ahorro estimado cuando se despliega
      en proveedores públicos de servicios en la nube.
    image_url: images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: imagen
  - caption: El dashboard de Federator.ai muestra la predicción de las cargas de trabajo
      y recomendaciones de recursos para clústeres y aplicaciones Kubernetes o de
      máquinas virtuales.
    image_url: images/Federator_ai_Dashboard.png
    media_type: imagen
  - caption: Federator.ai proporciona predicciones y recomendaciones de recursos para
      clústeres, nodos, espacios de nombres, aplicaciones y controladores
    image_url: images/Federator_ai_Workload_Prediction.png
    media_type: imagen
  - caption: Basándose en la carga de trabajo prevista de un clúster, Federator.ai
      recomienda la configuración de clúster más rentable para diferentes proveedores
      públicos de servicios en la nube.
    image_url: images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: imagen
  - caption: Federator.ai analiza y proyecta la tendencia de los costes para cada
      espacio de nombres.
    image_url: images/Federator_ai_Cost_Allocation.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: ProphetStor Federator.ai
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

[ProphetStor Federator.ai][1] es una solución basada en IA, diseñada para mejorar la gestión de recursos informáticos para clústeres Kubernetes y de máquinas virtuales. Gracias a su capacidad de observación holística de las operaciones TI, incluida la formación de modelos de lenguaje de gran tamaño (LLM) de múltiples inquilinos, los recursos para aplicaciones de misión crítica, los espacios de nombres, los nodos y los clústeres pueden asignarse de forma eficiente y los indicadores claves del desempeño (KPI) pueden alcanzarse eficazmente con un desperdicio mínimo de recursos.

* Predicción de las cargas de trabajo basada en IA para aplicaciones en contenedores en clústeres Kubernetes, así como en máquinas virtuales en clústeres VMware, Amazon Web Services (AWS) Elastic Compute Cloud (EC2), Azure Virtual Machine y Google Compute Engine.
* Recomendaciones inteligentes de recursos a partir de predicciones de las cargas de trabajo que tienen en cuenta las aplicaciones, elaboradas por motores de IA tras digerir la información de las métricas operativas.
* Aprovisionamiento automático de CPU/memoria para controladores/espacios de nombres de aplicaciones Kubernetes genéricas
* Escalado automático de contenedores de aplicaciones Kubernetes, grupos de consumidores Kafka y servicios upstream NGINX Ingress
* Análisis de costes y recomendaciones óptimos de MultiCloud basados en predicciones de las cargas de trabajo para clústeres Kubernetes y de máquinas virtuales
* Coste real y ahorro potencial basados en recomendaciones para clústeres, aplicaciones Kubernetes, máquinas virtuales y espacios de nombres de Kubernetes
* Capacidad de observación de la formación LLM de múltiples inquilinos y optimizaciones de recursos procesables sin comprometer el rendimiento

[ProphetStor Federator.ai][1] proporciona una capacidad de observación de stack tecnológico completo a través de sus API integradas con Datadog Agents, desde las cargas de trabajo a nivel de aplicación, incluida la formación LLM, hasta el consumo de recursos a nivel de clúster. Esta integración incentiva un bucle dinámico entre la monitorización en directo y el análisis predictivo, mejorando continuamente la gestión de recursos, optimizando los costes y garantizando un funcionamiento eficiente de las aplicaciones. Con una licencia de ProphetStor Federator.ai, puedes aplicar una solución basada en IA para realizar un seguimiento y predecir el uso de recursos de contenedores, espacios de nombres y nodos de clústeres Kubernetes a fin de hacer las recomendaciones correctas y evitar un costoso exceso de aprovisionamiento o una falta de aprovisionamiento que afecte al rendimiento. Utilizando las predicciones de las cargas de trabajo de las aplicaciones, Federator.ai autoescala los contenedores de aplicaciones en el momento adecuado y optimiza el rendimiento con el número correcto de réplicas de contenedores a través del Autoescalado horizontal de pods (HPA) de Kubernetes o el [Datadog Watermark Pod Autoscaling (WPA)][3].

Aparte de esta licencia de Federator.ai, está disponible una [integración Datadog][9] oficial con dashboards predefinidos y monitores recomendados. Para obtener información adicional sobre Federator.ai, puedes ver el vídeo [ProphetStor Federator.ai Feature Demo][2].

## Agent

Para recibir asistencia o enviar solicitudes, ponte en contacto con el [servicio de asistencia de ProphetStor](mailto:support@prophetstor.com).


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: https://app.datadoghq.com/integrations/federatorai

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">adquiere esta aplicación en el Marketplace</a>.