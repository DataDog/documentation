---
aliases:
- /es/integrations/azure_cognitive_services
app_id: azure-cognitiveservices
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Cognitive Services.
media: []
title: Azure Cognitive Services
---
## Información general

Azure Cognitive Services son API, SDK y servicios disponibles para ayudar a los desarrolladores a crear aplicaciones inteligentes sin necesidad de tener habilidades o conocimientos directos de inteligencia artificial o ciencia de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Cognitive Services.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.cognitiveservices_accounts.action_feature_occurrences** <br>(count) | Número de veces que aparece cada función de acción.|
| **azure.cognitiveservices_accounts.action_features_per_event** <br>(gauge) | Número medio de funciones de acción por evento.|
| **azure.cognitiveservices_accounts.action_occurences** <br>(count) | Número de veces que aparece cada acción.|
| **azure.cognitiveservices_accounts.action_namespaces_per_event** <br>(gauge) | Número medio de espacios de nombres de acción por evento.|
| **azure.cognitiveservices_accounts.actions_per_event** <br>(gauge) | Número de acciones por evento.|
| **azure.cognitiveservices_accounts.audio_seconds_transcribed** <br>(count) | Número de segundos transcritos.|
| **azure.cognitiveservices_accounts.audio_seconds_translated** <br>(count) | Número de segundos traducidos.|
| **azure.cognitiveservices_accounts.baseline_estimator_overall_reward** <br>(gauge) | Estimador de referencia de la recompensa global.|
| **azure.cognitiveservices_accounts.baseline_estimator_slot_reward** <br>(gauge) | Estimador básico de recompensa por ranura.|
| **azure.cognitiveservices_accounts.baseline_random_estimator_overall_reward** <br>(gauge) | Estimador aleatorio de referencia de la recompensa global.|
| **azure.cognitiveservices_accounts.baseline_random_estimator_slot_reward** <br>(gauge) | Estimador aleatorio de base de recompensa por ranura.|
| **azure.cognitiveservices_accounts.baseline_random_event_count** <br>(count) | Estimación para el recuento de eventos aleatorios de referencia.|
| **azure.cognitiveservices_accounts.baseline_random_reward** <br>(count) | Estimación para la recompensa aleatoria de referencia.|
| **azure.cognitiveservices_accounts.blocked_calls** <br>(count) | Número de llamadas que han superado el límite de tarifa o cuota.|
| **azure.cognitiveservices_accounts.inference_count** <br>(count) | Recuento de inferencias del servicio de carnegie frontdoor.|
| **azure.cognitiveservices_accounts.characters_trained_deprecated** <br>(count) | Número total de caracteres entrenados.|
| **azure.cognitiveservices_accounts.characters_translated_deprecated** <br>(count) | Número total de caracteres en la solicitud de texto entrante.|
| **azure.cognitiveservices_accounts.client_errors** <br>(count) | Número de llamadas con error del lado del cliente (código de respuesta HTTP 4xx).|
| **azure.cognitiveservices_accounts.computer_vision_transactions** <br>(count) | Número de transacciones de visión por ordenador.|
| **azure.cognitiveservices_accounts.context_feature_occurrences** <br>(count) | Número de veces que aparece cada característica contextual.|
| **azure.cognitiveservices_accounts.context_features_per_event** <br>(gauge) | Número de características contextuales por evento.|
| **azure.cognitiveservices_accounts.context_namespaces_per_event** <br>(gauge) | Número de espacios de nombres de contexto por evento.|
| **azure.cognitiveservices_accounts.custom_vision_training_time** <br>(count) | Tiempo de entrenamiento de visión personalizado.<br>_Se muestra como segundo_ |
| **azure.cognitiveservices_accounts.custom_vision_transactions** <br>(count) | Número de transacciones de predicción de visión personalizada.|
| **azure.cognitiveservices_accounts.data_in** <br>(count) | Tamaño de los datos entrantes en bytes.<br>_Se muestra como byte_ |
| **azure.cognitiveservices_accounts.data_out** <br>(count) | Tamaño de los datos salientes en bytes.<br>_Se muestra como byte_ |
| **azure.cognitiveservices_accounts.document_characters_translated** <br>(count) | Número de caracteres de la solicitud de traducción del documento.|
| **azure.cognitiveservices_accounts.document_custom_characters_translated** <br>(count) | Número de caracteres de la solicitud de traducción del documento personalizado.|
| **azure.cognitiveservices_accounts.face_images_trained** <br>(count) | Número de imágenes entrenadas. 1000 imágenes entrenadas por transacción.|
| **azure.cognitiveservices_accounts.faces_stored** <br>(count) | Número de caras almacenadas, prorrateado diariamente. El número de caras almacenadas se comunica diariamente.|
| **azure.cognitiveservices_accounts.face_transactions** <br>(count) | Número de llamadas a la API realizadas al servicio de cara.|
| **azure.cognitiveservices_accounts.feature_cardinality_by_action** <br>(gauge) | Cardinalidad de características basada en acción.|
| **azure.cognitiveservices_accounts.feature_cardinality_by_context** <br>(gauge) | Cardinalidad de las características en función del contexto.|
| **azure.cognitiveservices_accounts.feature_cardinality_by_slot** <br>(gauge) | Cardinalidad de las características en función de la ranura.|
| **azure.cognitiveservices_accounts.generated_completion_tokens** <br>(count) | Número de tokens de finalización generados a partir de un modelo de OpenAI.|
| **azure.cognitiveservices_accounts.processed_fine_tuned_training_hours** <br>(count) | Número de horas de entrenamiento procesadas en un modelo de OpenAI ajustado.|
| **azure.cognitiveservices_accounts.processed_prompt_tokens** <br>(count) | Número de tokens de mensaje procesados en un modelo de OpenAI|
| **azure.cognitiveservices_accounts.images_stored** <br>(count) | Número de imágenes de visión personalizadas almacenadas.|
| **azure.cognitiveservices_accounts.latency** <br>(gauge) | Latencia en milisegundos.<br>_Se muestra como milisegundo_ |
| **azure.cognitiveservices_accounts.learned_events** <br>(count) | Número de eventos aprendidos.|
| **azure.cognitiveservices_accounts.luis_speech_requests** <br>(count) | Número de solicitudes LUIS de comprensión de voz a intención.|
| **azure.cognitiveservices_accounts.luis_text_requests** <br>(count) | Número de solicitudes de texto LUIS.|
| **azure.cognitiveservices_accounts.matched_rewards** <br>(count) | Número de recompensas igualadas.|
| **azure.cognitiveservices_accounts.non_activated_events** <br>(count) | Número de eventos omitidos.|
| **azure.cognitiveservices_accounts.slots** <br>(gauge) | Número de franjas horarias por evento.|
| **azure.cognitiveservices_accounts.number_of_speaker_profiles** <br>(count) | Número de perfiles de ponente inscritos. Prorrateado por hora.|
| **azure.cognitiveservices_accounts.observed_rewards** <br>(count) | Número de recompensas observadas.|
| **azure.cognitiveservices_accounts.online_estimator_overall_reward** <br>(gauge) | Estimador en línea de recompensa global.|
| **azure.cognitiveservices_accounts.online_estimator_slot_reward** <br>(gauge) | Estimador en línea de recompensa por ranura.|
| **azure.cognitiveservices_accounts.online_event_count** <br>(count) | Estimación del recuento de eventos en línea.|
| **azure.cognitiveservices_accounts.online_reward** <br>(count) | Estimación de la recompensa en línea.|
| **azure.cognitiveservices_accounts.processed_characters** <br>(count) | Número de caracteres procesados por el lector inmersivo.|
| **azure.cognitiveservices_accounts.processed_health_text_records** <br>(count) | Número de registros textuales de estado procesados.|
| **azure.cognitiveservices_accounts.processed_images** <br>(count) | Número de imágenes procesadas.|
| **azure.cognitiveservices_accounts.processed_pages** <br>(count) | Número de páginas procesadas.|
| **azure.cognitiveservices_accounts.processed_text_records** <br>(count) | Recuento de registros textuales.|
| **azure.cognitiveservices_accounts.qa_text_records** <br>(count) | Número de registros textuales procesados.|
| **azure.cognitiveservices_accounts.ratelimit** <br>(count) | Límite de velocidad actual de la clave ratelimit.|
| **azure.cognitiveservices_accounts.average_reward_per_event** <br>(gauge) | Recompensa media por evento.|
| **azure.cognitiveservices_accounts.server_errors** <br>(count) | Número de llamadas con error interno del servicio (código de respuesta HTTP 5xx).|
| **azure.cognitiveservices_accounts.slot_feature_occurrences** <br>(count) | Número de veces que aparece cada función de la ranura.|
| **azure.cognitiveservices_accounts.slot_features_per_event** <br>(gauge) | Número medio de funciones de ranura por evento.|
| **azure.cognitiveservices_accounts.slot_occurrences** <br>(count) | Número de veces que aparece cada ranura.|
| **azure.cognitiveservices_accounts.slot_namespaces_per_event** <br>(gauge) | Número medio de espacios de nombres de ranuras por evento.|
| **azure.cognitiveservices_accounts.slot_reward** <br>(gauge) | Recompensa por ranura.|
| **azure.cognitiveservices_accounts.speaker_recognition_transactions** <br>(count) | Número de transacciones de reconocimiento de oradores.|
| **azure.cognitiveservices_accounts.speech_model_hosting_hours** <br>(count) | Número de horas de alojamiento del modelo de voz.|
| **azure.cognitiveservices_accounts.speech_session_duration_deprecated** <br>(count) | Duración total de la sesión de voz en segundos.<br>_Se muestra como segundo_ |
| **azure.cognitiveservices_accounts.successful_calls** <br>(count) | Número de llamadas realizadas con éxito.|
| **azure.cognitiveservices_accounts.availability** <br>(gauge) | Porcentaje de disponibilidad con el siguiente cálculo: (llamadas totales - errores del servidor)/llamadas totales. Los errores del servidor incluyen cualquier respuesta HTTP mayor o igual a 500.<br>_Se muestra como porcentaje_. |
| **azure.cognitiveservices_accounts.synthesized_characters** <br>(count) | Número de caracteres.|
| **azure.cognitiveservices_accounts.text_characters_translated** <br>(count) | Número de caracteres de la solicitud de traducción de texto entrante.|
| **azure.cognitiveservices_accounts.text_custom_characters_translated** <br>(count) | Número de caracteres en la solicitud de traducción de texto personalizado entrante.|
| **azure.cognitiveservices_accounts.text_trained_characters** <br>(count) | Número de caracteres entrenados mediante traducción de texto.|
| **azure.cognitiveservices_accounts.processed_inference_tokens** <br>(count) | Número de tokens de inferencia procesados en un modelo de OpenAI.|
| **azure.cognitiveservices_accounts.total_calls** <br>(count) | Número total de llamadas.|
| **azure.cognitiveservices_accounts.total_errors** <br>(count) | Número total de llamadas con respuesta de error (código de respuesta HTTP 4xx o 5xx).|
| **azure.cognitiveservices_accounts.total_events** <br>(count) | Número de eventos.|
| **azure.cognitiveservices_accounts.total_token_calls** <br>(count) | Número total de llamadas de token.|
| **azure.cognitiveservices_accounts.total_transactions_deprecated** <br>(count) | Número total de transacciones.|
| **azure.cognitiveservices_accounts.user_baseline_event_count** <br>(count) | Estimación para el recuento de eventos de referencia definido por el usuario.|
| **azure.cognitiveservices_accounts.user_baseline_reward** <br>(count) | Estimación de la recompensa básica definida por el usuario.|
| **azure.cognitiveservices_accounts.voice_model_hosting_hours** <br>(count) | Número de horas.|
| **azure.cognitiveservices_accounts.voice_model_training_minutes** <br>(count) | Número de minutos.|
| **azure.cognitiveservices_accounts.count** <br>(gauge) | Recuento de cuentas de CognitiveServices.|

### Eventos

La integración Azure Cognitive Services no incluye eventos.

### Checks de servicio

La integración Azure Cognitive Services no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).