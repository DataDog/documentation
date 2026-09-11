---
app_id: fiddler
categories:
- events
- métricas
- ia/ml
custom_kind: integración
description: Obtener una visibilidad de tus sistemas de ML con la integración Fiddler
  Datadog
integration_version: 4.0.0
media:
- caption: Dashboard de Fiddler en Datadog
  image_url: images/fiddler-datadog.png
  media_type: imagen
- caption: Tabla de precisión del modelo
  image_url: images/accuracy-drift.png
  media_type: imagen
- caption: Análisis de modelos
  image_url: images/analytics.png
  media_type: imagen
- caption: Formulación de explicaciones contrafácticas
  image_url: images/counterfactual.png
  media_type: imagen
- caption: Gráficos de deriva de datos
  image_url: images/data-drift.png
  media_type: imagen
- caption: Explicaciones de los modelos
  image_url: images/explanation.png
  media_type: imagen
supported_os:
- linux
- windows
- macOS
title: Fiddler
---
## Información general

La plataforma de gestión del rendimiento de modelos de Fiddler monitoriza el rendimiento de los modelos de Machine Learning enviando alertas en tiempo real cuando las métricas de rendimiento de un modelo disminuyen, lo que permite a los usuarios analizar los datos de inferencia para comprender por qué se está degradando el rendimiento del modelo. Esta integración incluye métricas y un dashboard predefinido que muestra métricas de rendimiento como la precisión, el tráfico y la deriva.

## Configuración

El check de Fiddler no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que deberás instalarlo.

### Instalación

Para las versiones 7.21 o posterior/v6.21 o posterior del Agent, sigue las instrucciones a continuación para instalar el check de Fiddler en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalarlo con el Docker Agent o con versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-fiddler==4.0.0
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) basadas en el Agent.

### Configuración

1. Edita el archivo `fiddler.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Fiddler. Para ver todas las opciones de configuración disponibles, consulta el [`fiddler.d/conf.yaml` de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/fiddler/datadog_checks/fiddler/data/conf.yaml.example). Los parámetros `url`, `org` y `fiddler_api_key` se deben actualizar para el entorno Fiddler que quieres que la integración consulte. Fiddler también sugiere configurar el parámetro `minimum_collection_interval` en el archivo `conf.yaml` en `300` (5 minutos). Además, también se pueden configurar `bin_size`, `v1compat` y `enabled_metrics`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `fiddler` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fiddler.accuracy** <br>(gauge) | Precisión del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.histogram_drift** <br>(gauge) | Deriva del histograma del modelo[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.psi** <br>(gauge) | PSI del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.jsd** <br>(gauge) | JSD del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.feature_average** <br>(gauge) | Media de función del modelo\[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.output_average** <br>(gauge) | Media de salida del modelo[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.average** <br>(gauge) | Media de función del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.traffic_count** <br>(gauge) | Recuento del tráfico del modelo[deprecated\\]<br>_Se muestra como porcentaje_ |
| **fiddler.traffic** <br>(gauge) | Recuento del tráfico del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.fpr** <br>(gauge) | Tasa de falsos positivos del modelo<br>_Se muestra como porcentaje_. |
| **fiddler.tpr** <br>(gauge) | Tasa de verdaderos positivos del modelo\[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.auc** <br>(gauge) | AUC del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.f1_score** <br>(gauge) | Puntuación F1 del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.precision** <br>(gauge) | Precisión del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.recall** <br>(gauge) | Recuerdo del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.mape** <br>(gauge) | MAPE del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.wmape** <br>(gauge) | WMAPE del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.mae** <br>(gauge) | MAE del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.mse** <br>(gauge) | MSE del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.r2** <br>(gauge) | Métrica R-cuadrado del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.binary_cross_entropy** <br>(gauge) | Métrica binaria de entropía cruzada del modelo\[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.log_loss** <br>(gauge) | Métrica log-loss del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.expected_callibration_error** <br>(gauge) | Error de calibración esperado del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.data_count** <br>(gauge) | Métrica de recuento de datos del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.auroc** <br>(gauge) | Métrica AUROC del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.callibrated_threshold** <br>(gauge) | Métrica umbral calibrada del modelo\[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.calibrated_threshold** <br>(gauge) | Métrica umbral calibrada del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.g_mean** <br>(gauge) | Métrica de la media geométrica del modelo\[deprecated\]<br>_Se muestra como porcentaje_ |
| **fiddler.geometric_mean** <br>(gauge) | Métrica de la media geométrica del modelo<br>_Se muestra como porcentaje_ |
| **fiddler.sum** <br>(gauge) | SUMA de una característica del modelo<br>_Se muestra como porcentaje_. |
| **fiddler.expected_calibration_error** <br>(gauge) | Error de calibración esperado del modelo<br>_Se muestra como porcentaje_ |

### Checks de servicio

**fiddler.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Fiddler monitorizada. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Fiddler](https://fiddlerlabs.zendesk.com/hc/en-us).