---
app_id: federatorai
app_uuid: c9192d7c-101d-44b2-8ddf-c5fcbe5c5306
assets:
  dashboards:
    ProphetStor Federator.ai Application Overview: assets/dashboards/application-overview.json
    ProphetStor Federator.ai Cluster Overview: assets/dashboards/cluster-overview.json
    ProphetStor Federator.ai Cost Analysis Overview: assets/dashboards/cost-analysis-overview.json
    ProphetStor Federator.ai Cost Management - Cluster: assets/dashboards/cost-management-cluster-overview.json
    ProphetStor Federator.ai Cost Management - Namespace: assets/dashboards/cost-management-namespace-overview.json
    ProphetStor Federator.ai Cost Management - Node: assets/dashboards/cost-management-node-overview.json
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: federatorai.integration.status
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10104
    source_type_name: Federator.ai
  monitors:
    Node CPU Load prediction is high: assets/monitors/federatorai_node_cpu_prediction.json
    Node memory usage prediction is high: assets/monitors/federatorai_node_mem_prediction.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ProphetStor
  sales_email: support@prophetstor.com
  support_email: support@prophetstor.com
categories:
- contenedores
- kubernetes
- ia/ml
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md
display_on_public_website: true
draft: false
git_integration_title: federatorai
integration_id: federatorai
integration_title: Federator.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: federatorai
public_title: Federator.ai
short_description: Integración con ProphetStor Federator.ai para optimizar el rendimiento
  de la aplicación
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::IA/ML
  - Categoría::Orquestación
  - SO compatible::Linux
  - Oferta::Integración
  configuration: README.md#Setup
  description: Integración con ProphetStor Federator.ai para optimizar el rendimiento
    de la aplicación
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Federator.ai
---

<!--  FUENTE https://github.com/DataDog/integrations-extras -->


## Información general


[ProphetStor Federator.ai][1] es una solución basada en IA que se ha diseñado con el fin de mejorar la gestión de recursos informáticos para clústeres de Kubernetes y máquinas virtuales (VMs). Gracias a su capacidad de observación integral de las operaciones de TI, incluido el entrenamiento de modelos de lenguaje de gran tamaño (LLM) para varios inquilinos, se pueden asignar de manera eficiente recursos para aplicaciones, espacios de nombres, nodos y clústeres críticos, y se pueden lograr los KPIs de manera efectiva con un desperdicio mínimo de recursos.

Al usar algoritmos avanzados de machine learning para predecir las cargas de trabajo de las aplicaciones, Federator.ai ofrece:
* Predicción de la carga de trabajo basada en IA para aplicaciones en contenedores en clústeres de Kubernetes, así como VMs en clústeres de VMware, Amazon Web Services (AWS), Elastic Compute Cloud (EC2), Azure Virtual Machine y Google Compute Engine
* Recomendaciones de recursos basadas en la predicción de la carga de trabajo, la aplicación, Kubernetes y otras métricas relacionadas
* Suministración automática de CPU/memoria para controladores/espacios de nombres de aplicaciones genéricas de Kubernetes
* Escalado automático de contenedores de aplicaciones de Kubernetes, grupos de consumidores de Kafka y servicios ascendentes de NGINX Ingress
* Recomendaciones y análisis de costes de varias nubes basadas en predicciones de la carga de trabajo para clústeres de Kubernetes y VM
* Coste real y ahorros potenciales basados ​​en recomendaciones para clústeres, aplicaciones de Kubernetes, VMs y espacios de nombres de Kubernetes
* Observabilidad del entrenamiento de LLM para varios inquilinos y optimizaciones de recursos procesables sin comprometer el rendimiento

[ProphetStor Federator.ai][1] proporciona una observabilidad completa a través de sus APIs integradas con los Datadog Agents, desde cargas de trabajo a nivel de aplicación, incluido el entrenamiento de LLM, hasta el consumo de recursos a nivel de clúster. Esta integración fomenta un bucle dinámico entre la monitorización en vivo y el análisis predictivo, lo que mejora de manera continua la gestión de recursos, optimiza los costes y garantiza el funcionamiento eficiente de las aplicaciones. Puedes rastrear y predecir con facilidad los usos de recursos de los contenedores, espacios de nombres y nodos de clúster de Kubernetes para brindar las recomendaciones adecuadas a fin de evitar un costoso exceso de suministración o una suministración insuficiente que afecte el rendimiento. Con una sencilla integración con el pipeline de CI/CD, Federator.ai permite la optimización continua de los contenedores siempre que se desplieguen en un clúster de Kubernetes. Mediante predicciones de la carga de trabajo de la aplicación, Federator.ai escala de manera automática los contenedores de la aplicación en el momento adecuado y optimiza el rendimiento con la cantidad correcta de réplicas de contenedor a través del HPA de Kubernetes o [Datadog Watermark Pod Autoscaling (WPA)][2].

Para obtener información adicional sobre Federator.ai, consulta los vídeos de [Demostración de la función de ProphetStor Federator.ai][3] y [ProphetStor Federator.ai para Datadog][4].


**Información general sobre el clúster de ProphetStor Federator.ai**

![Información general sobre el clúster de ProphetStor Federator.ai][5]

* Predicciones y recomendaciones sobre el uso de recursos del clúster
   - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del clúster.

* Predicciones y recomendaciones sobre el uso de recursos de los nodos del clúster
   - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del nodo.

* Uso de memoria actual/previsto del nodo (diario)
   - En esta gráfica se muestra el uso de memoria diario previsto por Federator.ai y el uso de memoria de los nodos.

* Uso de memoria actual/previsto del nodo (semanal)
   - En esta gráfica se muestra el uso de memoria semanal previsto por Federator.ai y el uso de memoria de los nodos.

* Uso de memoria actual/previsto del nodo (mensual)
   - En esta gráfica se muestra el uso de memoria mensual previsto por Federator.ai y el uso de memoria de los nodos.

* Uso de CPU actual/previsto del nodo (diario)
   - En esta gráfica se muestra el uso de CPU diario previsto por Federator.ai y el uso de CPU de los nodos.

* Uso de CPU actual/previsto del nodo (semanal)
   - En esta gráfica se muestra el uso de CPU semanal previsto por Federator.ai y el uso de CPU de los nodos.

* Uso de CPU actual/previsto del nodo (mensual)
   - En esta gráfica se muestra el uso de CPU mensual previsto por Federator.ai y el uso de CPU de los nodos.


**Información general sobre la aplicación de ProphetStor Federator.ai**

![Dashboard de información general sobre la aplicación][6]

* Predicción de la carga de trabajo para las próximas 24 horas
   - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en las próximas 24 horas.

* Predicción de la carga de trabajo para los próximos 7 días
   - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en los próximos 7 días.

* Predicción de la carga de trabajo para los próximos 30 días
   - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en los próximos 30 días.

* Uso de CPU actual/previsto (diario)
   - En esta gráfica se muestra el uso de CPU diario previsto por Federator.ai y el uso de CPU de los controladores.

* Uso de CPU actual/previsto (semanal)
   - En esta gráfica se muestra el uso de CPU semanal previsto por Federator.ai y el uso de CPU de los controladores.

* Uso de CPU actual/previsto (mensual)
   - En esta gráfica se muestra el uso de CPU mensual previsto por Federator.ai y el uso de CPU de los controladores.

* Uso de memoria actual/previsto (diario)
   - En esta gráfica se muestra el uso de memoria diario previsto por Federator.ai y el uso de memoria de los controladores.

* Uso de memoria actual/previsto (semanal)
   - En esta gráfica se muestra el uso de memoria semanal previsto por Federator.ai y el uso de memoria de los controladores.

* Uso de memoria actual/previsto (mensual)
   - En esta gráfica se muestra el uso de memoria mensual previsto por Federator.ai y el uso de memoria de los controladores.

* Réplicas actuales/deseadas/recomendadas
   - En esta gráfica se muestran las réplicas recomendadas por Federator.ai y las réplicas deseadas y actuales de los controladores.

* Uso/solicitud/límite de memoria frente al límite de memoria recomendado
   - En esta gráfica se muestra el límite de memoria recomendado por Federator.ai y el uso de memoria solicitado, limitado y actual de los controladores.

* Uso/solicitud/límite de CPU frente al límite de CPU recomendado
   - En esta gráfica se muestra el límite de CPU recomendado por Federator.ai y el uso de CPU solicitado, limitado y actual de los controladores.

* Uso de CPU/utilización límite
   - En esta gráfica se muestra la utilización de CPU del controlador y se puede ver si la utilización de CPU está por encima o por debajo del límite.


**Información general sobre Kafka de ProphetStor Federator.ai**

![Dashboard de información general][7]

* Réplicas recomendadas frente a réplicas actuales/deseadas
   - En esta gráfica de series temporales se muestran las réplicas recomendadas por Federator.ai y las réplicas deseadas y actuales en el sistema.

* Producción frente a consumo frente a predicción de la producción
   - En esta gráfica de series temporales se muestra la tasa de producción de mensajes de Kafka, la tasa de consumo y la tasa de producción prevista por Federator.ai.

* Retraso del consumidor de Kafka
   - En esta gráfica de series temporales se muestra la suma de los retrasos del consumidor de todas las particiones.

* Latencia de la cola del consumidor (ms)
   - En esta gráfica de series temporales se muestra la latencia promedio de un mensaje en la cola de mensajes antes de que lo reciba un consumidor.

* Uso de memoria de despliegue
   - En esta gráfica de series temporales se muestra el uso de memoria de los consumidores.

* Uso de CPU de despliegue
   - En esta gráfica de series temporales se muestra el uso de CPU de los consumidores.


**Información general sobre el análisis de costes de varias nubes de ProphetStor Federator.ai**

![Información general sobre el análisis de costes de varias nubes][8]

* Coste y configuración actual del clúster
   - En estas tablas se muestran el costo actual y la configuración del entorno de los clústeres.

* Clúster recomendado - AWS y configuración de clúster recomendada - AWS
   - En estas tablas se muestra la configuración de las instancias de AWS recomendadas por Federator.ai y el coste de las instancias de AWS recomendadas.

* Clúster recomendado - Azure y configuración de clúster recomendada - Azure
   - En estas tablas se muestra la configuración de las instancias de Azure recomendadas por Federator.ai y el coste de las instancias de Azure recomendadas.

* Clúster recomendado - GCP y configuración de clúster recomendada - GCP
   - En estas tablas se muestra la configuración de las instancias de GCP recomendadas por Federator.ai y el coste de las instancias de GCP recomendadas.

* Espacio de nombres con el coste más alto ($/día)
   - En esta gráfica se muestra el coste diario más alto de los espacios de nombres en el clúster actual.

* Espacio de nombres con el coste previsto más alto ($/mes)
   - En esta gráfica se muestra el coste mensual previsto más alto de los espacios de nombres en el clúster actual.


## Configuración

* Sigue las siguientes instrucciones para descargar y configurar Federator.ai.

### Instalación

1. Inicia sesión en tu clúster de OpenShift/Kubernetes
2. Instala Federator.ai para OpenShift/Kubernetes con el siguiente comando:

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ...
   Please enter Federator.ai version tag [default: latest]:latest
   Please enter the path of Federator.ai directory [default: /opt]:

   Downloading v4.5.1-b1562 tgz file ...
   Done
   Do you want to use a private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]:

   Executing install.sh ...
   Checking environment version...
   ...Passed
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   Downloading Federator.ai alamedascaler sample files ...
   Done
   ========================================
   Which storage type you would like to use? ephemeral or persistent?
   [default: persistent]:
   Specify log storage size [e.g., 2 for 2GB, default: 2]:
   Specify AI engine storage size [e.g., 10 for 10GB, default: 10]:
   Specify InfluxDB storage size [e.g., 100 for 100GB, default: 100]:
   Specify storage class name: managed-nfs-storage
   Do you want to expose dashboard and REST API services for external access? [default: y]:

   ----------------------------------------
   install_namespace = federatorai
   storage_type = persistent
   log storage size = 2 GB
   AI engine storage size = 10 GB
   InfluxDB storage size = 100 GB
   storage class name = managed-nfs-storage
   expose service = y
   ----------------------------------------
   Is the above information correct [default: y]:
   Processing...

   (snipped)
   .........
   All federatorai pods are ready.

   ========================================
   You can now access GUI through https://<YOUR IP>:31012
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the target you would like to monitor.
   Review administration guide for further details. 
   ========================================
   ========================================
   You can now access Federatorai REST API through https://<YOUR IP>:31011
   The default login credential is admin/admin
   The REST API online document can be found in https://<YOUR IP>:31011/apis/v1/swagger/index.html
   ========================================

   Install Federator.ai v4.5.1-b1562 successfully

   Downloaded YAML files are located under /opt/federatorai/installation

   Downloaded files are located under /opt/federatorai/repo/v4.5.1-b1562
   ```

3. Verifica que los pods de Federator.ai funcionen correctamente.

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Inicia sesión en la GUI de Federator.ai. La URL y las credenciales de inicio de sesión se pueden encontrar en el resultado del Paso 2.


### Configuración

1. Inicia sesión en Datadog con tu cuenta y obtén una [clave de API y de aplicación][9] para usar la API de Datadog.

2. Configura Federator.ai para la fuente de datos de métricas por clúster.
    - Inicia la GUI de Federator.ai->Configuration ->Clusters ->Haz clic en «Add Cluster» (Configuración ->Clústeres ->Añadir clúster)
    - Ingresa la clave de API y de aplicación

    ![Ventana de Añadir clúster][10] 

3. Consulta la [Guía de instalación y configuración de Federator.ai][11] y la [Guía del usuario][12] para obtener más detalles. 


## Datos recopilados

### Métricas
{{< get-metrics-from-git "federatorai" >}}



### Checks de servicio

Federator.ai no incluye checks de servicio.

### Eventos

Federator.ai no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Lee la [Guía de instalación y configuración de Federator.ai][11] o ponte en contacto con el [servicio de asistencia de Datadog][14].

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/AeSH8yGGA3Q
[4]: https://youtu.be/qX_HF_zZ4BA
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png
[11]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[12]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://docs.datadoghq.com/es/help/