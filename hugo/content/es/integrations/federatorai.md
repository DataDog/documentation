---
app_id: federatorai
categories:
- contenedores
- kubernetes
- ia/ml
- orquestación
custom_kind: integración
description: Integración con ProphetStor Federator.ai para optimizar el rendimiento
  de la aplicación
media: []
supported_os:
- linux
title: Federator.ai
---
## Información general

[ProphetStor Federator.ai](https://prophetstor.com/federator_ai/) es una solución basada en IA diseñada para mejorar la gestión de recursos informáticos para Kubernetes y clústeres de máquinas virtuales (VM). Gracias a su capacidad de observación holística de las operaciones informáticas, incluida la capacitación multitenant en Large Language Model (LLM), los recursos para aplicaciones de misión crítica, espacios de nombres, nodos y clústeres pueden asignarse de forma eficiente y los KPI pueden alcanzarse eficazmente con un desperdicio mínimo de recursos.

Al usar algoritmos avanzados de machine learning para predecir las cargas de trabajo de las aplicaciones, Federator.ai ofrece:

- Predicción de las cargas de trabajo basada en IA para aplicaciones en contenedores en clústeres Kubernetes, así como en máquinas virtuales en clústeres VMware, Amazon Web Services (AWS) Elastic Compute Cloud (EC2), Azure Virtual Machine y Google Compute Engine.
- Recomendaciones de recursos basadas en la predicción de la carga de trabajo, la aplicación, Kubernetes y otras métricas relacionadas
- Aprovisionamiento automático de CPU/memoria para controladores/espacios de nombres de aplicaciones Kubernetes genéricas
- Escalado automático de contenedores de aplicaciones Kubernetes, grupos de consumidores Kafka y servicios upstream NGINX Ingress
- Recomendaciones y análisis de costos de varias nubes basadas en predicciones de la carga de trabajo para clústeres de Kubernetes y VM
- Costo real y ahorro potencial basados en recomendaciones para clústeres, aplicaciones Kubernetes, máquinas virtuales y espacios de nombres de Kubernetes
- Capacidad de observación de la formación LLM de múltiples inquilinos y optimizaciones de recursos procesables sin comprometer el rendimiento

[ProphetStor Federator.ai](https://prophetstor.com/federator_ai/) proporciona capacidad de observación de stack tecnológico completo a través de sus API integradas con Datadog Agents, desde cargas de trabajo a nivel de la aplicación, incluida la capacitación en LLM, hasta el consumo de recursos a nivel del clúster. Esta integración fomenta un bucle dinámico entre la monitorización en directo y el análisis predictivo, lo que mejora continuamente la gestión de recursos, optimiza los costos y garantiza el funcionamiento eficiente de las aplicaciones. Puedes rastrear y predecir fácilmente el uso de recursos de los contenedores Kubernetes, los espacios de nombres y los nodos de clúster para hacer las recomendaciones adecuadas y evitar un costoso aprovisionamiento excesivo o un aprovisionamiento inferior que afecte al rendimiento. Con una fácil integración con el pipeline de Continuous Integration Continuous Delivery, Federator.ai permite la optimización continua de los contenedores siempre que se desplieguen en un clúster Kubernetes. Utilizando las predicciones de carga de trabajo de las aplicaciones, Federator.ai autoescala los contenedores de aplicaciones en el momento adecuado y optimiza el rendimiento con el número correcto de réplicas de contenedores a través de Kubernetes HPA o [Datadog Watermark pod Autoscaling (WPA)](https://github.com/DataDog/watermarkpodautoscaler).

Para obtener información adicional sobre Federator.ai, consulta los vídeos [ProphetStor Federator.ai Feature Demo](https://youtu.be/AeSH8yGGA3Q) y [ProphetStor Federator.ai for Datadog](https://youtu.be/qX_HF_zZ4BA).

**Información general sobre el clúster de ProphetStor Federator.ai**

![Información general del clúster de ProphetStor Federator.ai](https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png)

- Predicciones y recomendaciones sobre el uso de recursos del clúster

  - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del clúster.

- Predicciones y recomendaciones sobre el uso de recursos de los nodos del clúster

  - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del nodo.

- Uso de memoria actual/previsto del nodo (diario)

  - En esta gráfica se muestra el uso de memoria diario previsto por Federator.ai y el uso de memoria de los nodos.

- Uso de memoria actual/previsto del nodo (semanal)

  - En esta gráfica se muestra el uso de memoria semanal previsto por Federator.ai y el uso de memoria de los nodos.

- Uso de memoria actual/previsto del nodo (mensual)

  - En esta gráfica se muestra el uso de memoria mensual previsto por Federator.ai y el uso de memoria de los nodos.

- Uso de CPU actual/previsto del nodo (diario)

  - En esta gráfica se muestra el uso de CPU diario previsto por Federator.ai y el uso de CPU de los nodos.

- Uso de CPU actual/previsto del nodo (semanal)

  - En esta gráfica se muestra el uso de CPU semanal previsto por Federator.ai y el uso de CPU de los nodos.

- Uso de CPU actual/previsto del nodo (mensual)

  - En esta gráfica se muestra el uso de CPU mensual previsto por Federator.ai y el uso de CPU de los nodos.

**Información general sobre la aplicación de ProphetStor Federator.ai**

![Dashboard de información general de aplicaciones](https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png)

- Predicción de la carga de trabajo para las próximas 24 horas

  - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en las próximas 24 horas.

- Predicción de la carga de trabajo para los próximos 7 días

  - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en los próximos 7 días.

- Predicción de la carga de trabajo para los próximos 30 días

  - En esta tabla se muestra el valor máximo, mínimo y promedio de la predicción de la carga de trabajo de la memoria de la CPU y el uso de recursos de memoria de la CPU recomendado por Federator.ai para la planificación de recursos del controlador en los próximos 30 días.

- Uso de CPU actual/previsto (diario)

  - En esta gráfica se muestra el uso de CPU diario previsto por Federator.ai y el uso de CPU de los controladores.

- Uso de CPU actual/previsto (semanal)

  - En esta gráfica se muestra el uso de CPU semanal previsto por Federator.ai y el uso de CPU de los controladores.

- Uso de CPU actual/previsto (mensual)

  - En esta gráfica se muestra el uso de CPU mensual previsto por Federator.ai y el uso de CPU de los controladores.

- Uso de memoria actual/previsto (diario)

  - En esta gráfica se muestra el uso de memoria diario previsto por Federator.ai y el uso de memoria de los controladores.

- Uso de memoria actual/previsto (semanal)

  - En esta gráfica se muestra el uso de memoria semanal previsto por Federator.ai y el uso de memoria de los controladores.

- Uso de memoria actual/previsto (mensual)

  - En esta gráfica se muestra el uso de memoria mensual previsto por Federator.ai y el uso de memoria de los controladores.

- Réplicas actuales/deseadas/recomendadas

  - En esta gráfica se muestran las réplicas recomendadas por Federator.ai y las réplicas deseadas y actuales de los controladores.

- Uso/solicitud/límite de memoria frente al límite de memoria recomendado

  - En esta gráfica se muestra el límite de memoria recomendado por Federator.ai y el uso de memoria solicitado, limitado y actual de los controladores.

- Uso/solicitud/límite de CPU frente al límite de CPU recomendado

  - En esta gráfica se muestra el límite de CPU recomendado por Federator.ai y el uso de CPU solicitado, limitado y actual de los controladores.

- Uso de CPU/utilización límite

  - En esta gráfica se muestra la utilización de CPU del controlador y se puede ver si la utilización de CPU está por encima o por debajo del límite.

**Información general sobre Kafka de ProphetStor Federator.ai**

![Información general del dashboard](https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png)

- Réplicas recomendadas frente a réplicas actuales/deseadas

  - En esta gráfica de series temporales se muestran las réplicas recomendadas por Federator.ai y las réplicas deseadas y actuales en el sistema.

- Producción frente a consumo frente a predicción de la producción

  - En esta gráfica de series temporales se muestra la tasa de producción de mensajes de Kafka, la tasa de consumo y la tasa de producción prevista por Federator.ai.

- Retraso del consumidor de Kafka

  - En esta gráfica de series temporales se muestra la suma de los retrasos del consumidor de todas las particiones.

- Latencia de la cola del consumidor (ms)

  - En esta gráfica de series temporales se muestra la latencia promedio de un mensaje en la cola de mensajes antes de que lo reciba un consumidor.

- Uso de memoria de despliegue

  - En esta gráfica de series temporales se muestra el uso de memoria de los consumidores.

- Uso de CPU de despliegue

  - En esta gráfica de series temporales se muestra el uso de CPU de los consumidores.

**Información general sobre el análisis de costos de varias nubes de ProphetStor Federator.ai**

![Información general del análisis de costos de múltiples nubes](https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png)

- Costo y configuración actual del clúster

  - En estas tablas se muestran el costo actual y la configuración del entorno de los clústeres.

- Clúster recomendado - AWS y configuración de clúster recomendada - AWS

  - En estas tablas se muestra la configuración de las instancias de AWS recomendadas por Federator.ai y el costo de las instancias de AWS recomendadas.

- Clúster recomendado - Azure y configuración de clúster recomendada - Azure

  - En estas tablas se muestra la configuración de las instancias de Azure recomendadas por Federator.ai y el costo de las instancias de Azure recomendadas.

- Clúster recomendado - GCP y configuración de clúster recomendada - GCP

  - En estas tablas se muestra la configuración de las instancias de GCP recomendadas por Federator.ai y el costo de las instancias de GCP recomendadas.

- Espacio de nombres con el costo más alto ($/día)

  - En esta gráfica se muestra el costo diario más alto de los espacios de nombres en el clúster actual.

- Espacio de nombres con el costo previsto más alto ($/mes)

  - En esta gráfica se muestra el costo mensual previsto más alto de los espacios de nombres en el clúster actual.

## Configuración

- Sigue las siguientes instrucciones para descargar y configurar Federator.ai.

### Instalación

1. Inicia sesión en tu clúster de OpenShift/Kubernetes

1. Instala Federator.ai para OpenShift/Kubernetes con el siguiente comando:

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

1. Verifica que los pods de Federator.ai funcionen correctamente.

   ```shell
   $ kubectl get pod -n federatorai
   ```

1. Inicia sesión en la GUI de Federator.ai. La URL y las credenciales de inicio de sesión se pueden encontrar en el resultado del Paso 2.

### Configuración

1. Inicia sesión en Datadog con tu cuenta y obtén una [clave de la API y clave de la aplicación](https://docs.datadoghq.com/account_management/api-app-keys/) para utilizar la API de Datadog.

1. Configura Federator.ai para la fuente de datos de métricas por clúster.

   - Inicia la GUI de Federator.ai->Configuration ->Clusters ->Click "Add Cluster" (Configuración ->Clústeres ->Añadir clúster)
   - Ingresa la clave de API y de aplicación

   ¡[Añadir ventana de clúster](https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png)

1. Consulta la [Guía de instalación y configuración de Federator.ai](https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf) y la [Guía del usuario](https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf) para obtener más detalles.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **federatorai.integration.status** <br>(gauge) | estado de la integración para mostrar el estado de mantenimiento de Federator.ai.|
| **federatorai.recommendation** <br>(gauge) | réplicas de despliegue/statefulset recomendadas.|
| **federatorai.prediction.kafka** <br>(gauge) | Predicción de la carga de trabajo para las métricas de Kafka.|
| **federatorai.kafka.broker_offset_rate** <br>(gauge) | El delta de las series temporales de kafka.broker_offset en un minuto.|
| **federatorai.kafka.consumer_offset_rate** <br>(gauge) | El delta de las series temporales de kafka.consumer_offset en un minuto.|
| **federatorai.prediction.node** <br>(gauge) | Predicción de la carga de trabajo de un nodo Kubernetes.|
| **federatorai.prediction.node.avg** <br>(gauge) | El valor medio de las predicciones de carga de trabajo para un nodo de Kubernetes en una ventana de predicción.|
| **federatorai.prediction.node.min** <br>(gauge) | El valor mínimo de las predicciones de carga de trabajo para un nodo de Kubernetes en una ventana de predicción.|
| **federatorai.prediction.node.max** <br>(gauge) | El valor máximo de las predicciones de carga de trabajo para un nodo de Kubernetes en una ventana de predicción.|
| **federatorai.prediction.controller** <br>(gauge) | Predicción de la carga de trabajo para un controlador específico|
| **federatorai.prediction.controller.avg** <br>(gauge) | El valor medio de las predicciones de carga de trabajo para un controlador específico en una ventana de predicción.|
| **federatorai.prediction.controller.min** <br>(gauge) | El valor mínimo de las predicciones de carga de trabajo para un controlador específico en una ventana de predicción.|
| **federatorai.prediction.controller.max** <br>(gauge) | El valor máximo de las predicciones de carga de trabajo para un controlador específico en una ventana de predicción.|
| **federatorai.prediction.nginx_ingress_controller_request_rate** <br>(gauge) | Predicción de la carga de trabajo de la tasa de solicitud para el servicio ascendente de entrada a NGINX|
| **federatorai.resource_planning.node** <br>(gauge) | Predicciones de carga de trabajo para la planificación de recursos de un nodo de Kubernetes.|
| **federatorai.resource_planning.controller** <br>(gauge) | Predicciones de carga de trabajo para la planificación de recursos de un controlador de Kubernetes.|
| **federatorai.recommendation.instance** <br>(gauge) | Costo de una instancia de nube recomendada.|
| **federatorai.cost_analysis.instance.cost** <br>(gauge) | Análisis de costos de una instancia en la nube.|
| **federatorai.cost_analysis.namespace.cost** <br>(gauge) | Análisis de costos de un espacio de nombres en un clúster de Kubernetes |
| **federatorai.prediction.namespace.cost** <br>(gauge) | Predicción de costos de un espacio de nombres en un clúster de Kubernetes |
| **federatorai.kubernetes.cpu.usage.total.controller** <br>(gauge) | Número de núcleos (en milicore) utilizados por el controlador de Kubernetes.|
| **federatorai.kubernetes.memory.usage.controller** <br>(gauge) | El uso de memoria (en bytes) del controlador de Kubernetes.|
| **federatorai.kubernetes.cpu.usage.total.node** <br>(gauge) | Número de núcleos (en milicore) utilizados por el nodo de Kubernetes.|
| **federatorai.kubernetes.memory.usage.node** <br>(gauge) | El uso de memoria (en bytes) del nodo de Kubernetes.|
| **federatorai.cost_analysis.resource_alloc_cost.cluster** <br>(gauge) | El costo por hora/por 6 horas/por día basado en la asignación de recursos de un clúster de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.resource_alloc_cost.node** <br>(gauge) | El costo por hora/por 6 horas/por día basado en la asignación de recursos de un nodo de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.resource_alloc_cost.namespace** <br>(gauge) | El costo por hora/por 6 horas/por día basado en la asignación de recursos de un espacio de nombres de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.resource_usage_cost.cluster** <br>(gauge) | El costo por hora/por 6 horas/por día basado en el uso de recursos de un clúster de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.resource_usage_cost.node** <br>(gauge) | El costo por hora/por 6 horas/por día basado en el uso de recursos de un nodo de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.resource_usage_cost.namespace** <br>(gauge) | El costo por hora/por 6 horas/por día basado en el uso de recursos de un espacio de nombres de Kubernetes para el análisis de costos diarios/semanales/mensuales.|
| **federatorai.cost_analysis.cost_per_day.cluster** <br>(gauge) | El costo de las 24 horas completas basado en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_per_day.node** <br>(gauge) | El costo de las 24 horas completas basado en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_per_day.namespace** <br>(gauge) | El costo de las 24 horas completas basado en la asignación de recursos de un espacio de nombres de Kubernetes |
| **federatorai.cost_analysis.cost_per_week.cluster** <br>(gauge) | El costo de los 7 días completos basado en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_per_week.node** <br>(gauge) | El costo de los 7 días completos basado en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_per_week.namespace** <br>(gauge) | El costo de los 7 días completos basado en la asignación de recursos de un espacio de nombres de Kubernetes |
| **federatorai.cost_analysis.cost_per_month.cluster** <br>(gauge) | El costo de los 30 días completos basado en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_per_month.node** <br>(gauge) | El costo de los 30 días completos basado en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_per_month.namespace** <br>(gauge) | El costo de los 30 días completos basado en la asignación de recursos de un espacio de nombres de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_day.cluster** <br>(gauge) | La rentabilidad para las 24 horas completas basada en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_day.node** <br>(gauge) | La rentabilidad para las 24 horas completas basada en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_day.namespace** <br>(gauge) | La rentabilidad para las 24 horas completas basada en la asignación de recursos de un espacio de nombres de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_week.cluster** <br>(gauge) | La rentabilidad para los 7 días completos basada en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_week.node** <br>(gauge) | La rentabilidad para los 7 días completos basada en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_week.namespace** <br>(gauge) | La rentabilidad para los 7 días completos basada en la asignación de recursos de un espacio de nombres de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_month.cluster** <br>(gauge) | La rentabilidad para los 30 días completos basada en la asignación de recursos de un clúster de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_month.node** <br>(gauge) | La rentabilidad para los 30 días completos basada en la asignación de recursos de un nodo de Kubernetes |
| **federatorai.cost_analysis.cost_efficiency_per_month.namespace** <br>(gauge) | La rentabilidad para los 30 días completos basada en la asignación de recursos de un espacio de nombres de Kubernetes|
| **federatorai.recommendation.cost_analysis.cost_per_day.cluster** <br>(gauge) | El costo estimado de las 24 horas completas basado en la recomendación de Federator.ai para un clúster de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_day.node** <br>(gauge) | El costo estimado de las 24 horas completas basado en la recomendación de Federator.ai para un nodo de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_day.namespace** <br>(gauge) | El costo estimado de las 24 horas completas basado en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_week.cluster** <br>(gauge) | El costo estimado de los 7 días completos basado en la recomendación de Federator.ai para un clúster de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_week.node** <br>(gauge) | El costo estimado de los 7 días completos basado en la recomendación de Federator.ai para un nodo de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_week.namespace** <br>(gauge) | El costo estimado de los 7 días completos basado en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_month.cluster** <br>(gauge) | El costo estimado de los 30 días completos basado en la recomendación de Federator.ai para un clúster de Kubernetes|
| **federatorai.recommendation.cost_analysis.cost_per_month.node** <br>(gauge) | El costo estimado de los 30 días completos basado en la recomendación de Federator.ai para un nodo de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_per_month.namespace** <br>(gauge) | El costo estimado de los 30 días completos basado en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_day.cluster** <br>(gauge) | La rentabilidad para las 24 horas completas basada en la recomendación de Federator.ai para un clúster de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_day.namespace** <br>(gauge) | La rentabilidad para las 24 horas completas basada en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_week.cluster** <br>(gauge) | La rentabilidad para los 7 días completos basada en la recomendación de Federator.ai para un clúster de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_week.namespace** <br>(gauge) | La rentabilidad para los 7 días completos basada en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_month.cluster** <br>(gauge) | La rentabilidad para los 30 días completos basada en la recomendación de Federator.ai para un clúster de Kubernetes |
| **federatorai.recommendation.cost_analysis.cost_efficiency_per_month.namespace** <br>(gauge) | La rentabilidad para los 30 días completos basada en la recomendación de Federator.ai para un espacio de nombres de Kubernetes |

### Checks de servicio

Federator.ai no incluye checks de servicio.

### Eventos

Federator.ai no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Lee [Federator.ai - Guía de instalación y configuración](https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf) o ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).