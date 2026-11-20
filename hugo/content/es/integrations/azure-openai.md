---
aliases:
- /es/integrations/azure_openai
app_id: azure-openai
categories:
- azure
- ia/ml
- métricas
custom_kind: integración
description: Monitorizar, optimizar y evaluar tus aplicaciones LLM con Azure OpenAI
integration_version: 1.0.0
media: []
title: Azure OpenAI
---
## Información general

Monitoriza, soluciona problemas y evalúa tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos, mediante Azure OpenAI.

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas, monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Consulta el [video de vista de rastreo de LLM Observability](https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max) para ver un ejemplo de cómo puedes investigar una trace (traza).

Azure OpenAI permite el desarrollo de copilotos y aplicaciones de IA generativa utilizando la biblioteca de modelos de OpenAI. Utiliza la integración de Datadog para realizar un seguimiento del rendimiento y el uso de la API y los despliegues de Azure OpenAI.

## Configuración

### LLM Observability: visibilidad de extremo a extremo en tu aplicación de LLM mediante Azure OpenAI.

Puedes activar LLM Observability en diferentes entornos. Sigue la configuración adecuada en función de tu escenario:

#### Instalación para Python

##### Si no tienes el Datadog Agent:

1. Instala el paquete `ddtrace`:

```shell
  pip install ddtrace
```

2. Inicia tu aplicación con el siguiente comando, habilitando el modo Agentless:

```shell
  DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

##### Si ya tienes instalado el Datadog Agent:

1. Asegúrate de que el Agent se está ejecutando, y que APM y StatsD están activados. Por ejemplo, utiliza el siguiente comando con Docker:

```shell
docker run -d \
  --cgroupns host \
  --pid host \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  -p 127.0.0.1:8126:8126/tcp \
  -p 127.0.0.1:8125:8125/udp \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_ENABLED=true \
  gcr.io/datadoghq/agent:latest
```

2. Si aún no lo hiciste, instala el paquete `ddtrace`:

```shell
  pip install ddtrace
```

3. Inicia tu aplicación utilizando el comando `ddtrace-run` para habilitar automáticamente el rastreo:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

**Nota**: Si el Agent se ejecuta en un puerto o host personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` en consecuencia.

##### Si estás ejecutando LLM Observability en un entorno serverless (funciones de Azure):

Activa LLM Observability configurando las siguientes variables de entorno:

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) cuando la función de Azure termina de ejecutarse.

##### Rastreo automático de Azure OpenAI

La integración de Azure OpenAI se activa automáticamente cuando se configura LLM Observability. Esto captura la latencia, los errores, los mensajes de entrada y salida, así como el uso de tokens para las llamadas de Azure OpenAI.

Los siguientes métodos son rastreados tanto para operaciones síncronas como asíncronas de Azure OpenAI:

- `AzureOpenAI().completions.create()`
- `AsyncAzureOpenAI().completions.create()`
- `AzureOpenAI().chat.completions.create()`
- `AsyncAzureOpenAI().chat.completions.create()`

Estos métodos no requieren ninguna configuración adicional.

##### Validación

Comprueba si LLM Observability captura correctamente los tramos, verificando la creación exitosa de tramos en tus logs de aplicación. También puedes ejecutar el siguiente comando para comprobar el estado de la integración `ddtrace`:

```shell
ddtrace-run --info
```

Busca el siguiente mensaje para confirmar la configuración:

```shell
Agent error: None
```

##### Depuración

Si tienes problemas durante la configuración, activa el registro de depuración pasando el marcador `--debug`:

```shell
ddtrace-run --debug
```

Aquí se muestran todos los errores relacionados con la instrumentación o transmisión de datos, incluidos los problemas con las trazas de Azure OpenAI.

### Monitorización de infraestructura: métricas y visibilidad sobre tus recursos de Azure OpenAI

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

# Configuración de evaluaciones de LLM para la integración Azure OpenAI de Datadog

## Información general

_LLM Observability_  de Detadog te permite evaluar tu aplicación LLM utilizando tus modelos de Azure OpenAI. Sigue los pasos que se indican a continuación para configurar tu recurso Azure OpenAI y configurarlo para las evaluaciones.

## Requisitos previos

- Una **cuenta Azure** con acceso al servicio Azure OpenAI.
- Un **recurso Azure OpenAI** desplegado en tu portal Azure.
- Las **claves de API** necesarias para acceder a tus modelos OpenAI.
- Inicia sesión en el portal Azure

## Configuración

### Configura LLM Observability de Datadog

1. Ve a **Integraciones > Azure OpenAI**.
1. En la pestaña **Configure** (Configurar), haz clic en **Add New** (Añadir nueva).
1. Facilite los siguientes datos:

- **Nombre**
  1. Elige un nombre de cuenta de Datadog para identificar la cuenta de Azure OpenAi que se estás configurando.
- **Identificación de despliegue**
  1. Desde tu [Azure Open AI Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/azure-openai-in-ai-foundry) [Portal](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI), ve a **Model Deployments** (Despliegues de modelos).
  1. Copia y proporciona el **ID de despliegue** que configuraste al desplegar el modelo.
- **Nombre del recurso**
  1. Ve a [Todos los recursos](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI) y localiza tu recurso Azure OpenAI.
  1. Haz clic en el nombre del recurso para abrir tu page (página) de información general.
  1. Copia y proporciona el **nombre del recurso**.
- **Versión de API**
  1. Desde la **Page (página) de despliegue** en el Portal Azure, ve a la sección **Endpoint**.
  1. Pasa el ratón por encima de **Target URI** (URI del objetivo) y copia el valor después de `api-version=`.
- **Clave de API
  1. En el Portal Azure, ve a **Keys and Endpoint** (Claves y endpoint) en **Resource Management** (Gestión de recursos) en tu recurso Azure OpenAI.
  1. Copia y proporciona la **Clave 1** o la **Clave 2** como tu **Clave de API**.

4. Haz clic en la marca de verificación para guardar.

1. Ve a **LLM Observability > Settings** (LLM Observability > Parámetros) para crear y ejecutar evaluaciones para tu aplicación LLM instrumentada.

## Recursos adicionales

- [Documentación del servicio Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
- [Generación de un token de API](https://portal.azure.com/)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.cognitiveservices_accounts.active_tokens** <br>(gauge) | Total de tokens menos tokens almacenados en caché durante un periodo de tiempo. Se aplica a despliegues PTU y gestionados por PTU. Utiliza esta métrica para comprender tu utilización basada en TPS o TPM para PTU y compárala con tus puntos de referencia para TPS o TPM objetivo para sus escenarios.|
| **azure.cognitiveservices_accounts.azure_open_ai_requests** <br>(count) | Número de llamadas realizadas a la API Azure OpenAI durante un periodo de tiempo. Se aplica a los despliegues PTU, PTU-Managed y Pay-as-you-go.|
| **azure.cognitiveservices_accounts.blocked_volume** <br>(count) | Número de llamadas realizadas a la API Azure OpenAI y rechazadas por un filtro de contenido aplicado durante un periodo de tiempo. Puedes añadir un filtro o aplicar la división por las siguientes dimensiones: ModelDeploymentName, ModelName y TextType.|
| **azure.cognitiveservices_accounts.generated_completion_tokens** <br>(count) | Número de tokens de finalización generados a partir de un modelo OpenAI.|
| **azure.cognitiveservices_accounts.processed_fine_tuned_training_hours** <br>(count) | Número de horas de entrenamiento procesadas en un modelo de ajuste fino de OpenAI.|
| **azure.cognitiveservices_accounts.harmful_volume_detected** <br>(count) | Número de llamadas realizadas a la API de Azure OpenAI y detectadas como dañinas (tanto en el modelo de bloque como en el modo de anotación) por el filtro de contenido aplicado durante un periodo de tiempo.|
| **azure.cognitiveservices_accounts.processed_prompt_tokens** <br>(count) | Número de tokens de aviso procesados en un modelo OpenAI.|
| **azure.cognitiveservices_accounts.processed_inference_tokens** <br>(count) | Número de tokens de inferencia procesados en un modelo OpenAI.|
| **azure.cognitiveservices_accounts.prompt_token_cache_match_rate** <br>(gauge) | Porcentaje de los tokens que han llegado a la caché.<br>_Mostrado como porcentaje_ |
| **azure.cognitiveservices_accounts.provisioned_managed_utilization** <br>(gauge) | Porcentaje de utilización para un despliegue gestionado con provisión, calculado como (PTU consumidas / PTU desplegadas) x 100. Cuando la utilización es superior o igual al 100 %, las llamadas se limitan y se devuelve el código de error 429.<br>_Mostrado como porcentaje_ |
| **azure.cognitiveservices_accounts.provisioned_managed_utilization_v2** <br>(gauge) | Porcentaje de utilización para un despliegue gestionado con provisión, calculado como (PTU consumidas / PTU desplegadas) x 100. Cuando la utilización es superior o igual al 100 %, las llamadas se limitan y se devuelve el código de error 429.<br>_Mostrado como porcentaje_ |
| **azure.cognitiveservices_accounts.time_to_response** <br>(gauge) | Medida de latencia (capacidad de respuesta) recomendada para solicitudes de streaming. Se aplica a los despliegues gestionados por PTU y PTU. Calculado como el tiempo que tarda en aparecer la primera respuesta después de que un usuario envíe una solicitud, medido por la puerta de enlace de la API.<br>_Mostrado en milisegundos_. |
| **azure.cognitiveservices_accounts.total_volume_sent_for_safety_check** <br>(count) | Número de llamadas realizadas a la API Azure OpenAI y detectadas por un filtro de contenido aplicado durante un periodo de tiempo.|

### Checks de servicio

La integración de Azure OpenAI no incluye ningún check de servicio.

### Eventos

La integración de Azure OpenAI no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).