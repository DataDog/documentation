---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_whylabs
app_id: crest-data-systems-whylabs
categories:
- marketplace
- recopilación de logs
- ia/ml
custom_kind: integración
description: Recopilación de datos de recursos, incluyendo información de anomalías,
  entradas/salidas, columnas, segmentos y métricas de rendimiento del modelo
integration_version: 1.0.0
media:
- caption: Información general de WhyLabs
  image_url: images/crest_data_systems_whylabs_overview.png
  media_type: imagen
- caption: WhyLabs - Modelos
  image_url: images/crest_data_systems_whylabs_models.png
  media_type: imagen
- caption: WhyLabs - Conjuntos de datos
  image_url: images/crest_data_systems_whylabs_datasets.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: WhyLabs
---
## Información general

[WhyLabs**](https://whylabs.ai/) es una plataforma creada para ayudar a las organizaciones a monitorizar, gestionar y optimizar las aplicaciones de inteligencia artificial (IA). Proporciona un conjunto de herramientas para garantizar que los modelos de machine learning (ML) sigan siendo fiables, transparentes y justos durante todo su ciclo de vida. La plataforma aprovecha las técnicas de monitorización y observabilidad para realizar un seguimiento del rendimiento de los modelos, identificar problemas como desviaciones o anomalías de los datos y ayudar a los equipos a mantener predicciones de alta calidad.

Esta integración ingiere datos de WhyLabs como logs, métricas y eventos en Datadog:

### Métricas

| | |
| --- | --- |
| **cds.whylabs.dataset_metric.classification_accuracy** <br>(gauge) | Puntuación de la precisión de la clasificación|
| **cds.whylabs.dataset_metric.classification_auc** <br>(gauge) | Puntuación de la AUC macro de la clasificación|
| **cds.whylabs.dataset_metric.classification_f1** <br>(gauge) | Puntuación F1 de la clasificación|
| **cds.whylabs.dataset_metric.classification_fpr** <br>(gauge) | Puntuación FPR de la clasificación|
| **cds.whylabs.dataset_metric.classification_precision** <br>(gauge) | Puntuación de la precisión de la clasificación|
| **cds.whylabs.dataset_metric.classification_prediction_count** <br>(gauge) | Recuento de las predicciones de la clasificación|
| **cds.whylabs.dataset_metric.classification_recall** <br>(gauge) | Puntuación del retiro de la clasificación|
| **cds.whylabs.dataset_metric.regression_mae** <br>(gauge) | Puntuación del error absoluto medio de regresión |
| **cds.whylabs.dataset_metric.regression_mse** <br>(gauge) | Puntuación del error cuadrático medio de regresión|
| **cds.whylabs.dataset_metric.regression_prediction_count** <br>(gauge) | Recuento de las predicciones de la regresión|
| **cds.whylabs.dataset_metric.regression_rmse** <br>(gauge) | Puntuación del error cuadrático medio de la raíz regresión|

### Logs

- Recursos
- Esquema de entidad
- Anomalías
- Segmentos

### Eventos

La configuración de la integración de Datadog se valida para garantizar que todos los parámetros necesarios están correctamente configurados antes de continuar, seguido de un seguimiento de los eventos de autenticación durante la ingesta de datos para garantizar un acceso seguro y una verificación de usuario adecuada tras la validación de la configuración.

### Dashboards

Esta integración incluye **tres dashboards predefinidos**:

1. **Información general de WhyLabs**: Proporciona una visión completa de la plataforma, que te permite monitorizar y gestionar modelos de machine learning y conjuntos de datos. Destaca áreas clave como recursos, anomalías, segmentos, entradas, salidas y columnas.
1. **WhyLabs - Modelos**: Se centra en elementos esenciales como el resumen del modelo, las anomalías detectadas, los segmentos, los monitores activos, las entradas y las salidas. Ofrece una visión detallada del rendimiento y el comportamiento del modelo en producción.
1. **WhyLabs - Conjuntos de datos**: Muestra información general del tipo de datos del conjunto de datos, haciendo hincapié en áreas clave como el resumen del modelo, las anomalías, los segmentos, los monitores activos, las columnas y el estado de discreción.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Preguntas frecuentes sobre integraciones Crest Data en Datadog Marketplace](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-whylabs" target="_blank">Haz clic aquí</a> para adquirirla.