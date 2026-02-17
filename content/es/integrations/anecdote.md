---
app_id: anecdote
categories:
- ia/ml
- métricas
- recopilación de logs
- gestión de eventos
custom_kind: integración
description: Monitoriza los errores informados por tus clientes mediante comentarios
  en tu dashboard de Datadog.
integration_version: 1.0.0
media:
- caption: Resumen de los errores informados por los clientes.
  image_url: images/1.png
  media_type: imagen
- caption: Prioriza la resolución de errores.
  image_url: images/2.png
  media_type: imagen
- caption: Metadatos sobre los comentarios de los clientes.
  image_url: images/4.png
  media_type: imagen
- caption: Alertas de comentarios en tiempo real.
  image_url: images/3.png
  media_type: imagen
supported_os:
- linux
- Windows
- macos
title: Anecdote
---
## Información general

Anecdote monitoriza continuamente los reseñas de los clientes procedentes de fuentes como las reseñas de las tiendas de aplicaciones y los tickets de asistencia al cliente. A través de esta integración, Anecdote envía cualquier comentario clasificado como error a Datadog, además de la metainformación disponible (versión, sistema operativo, etc.).

Por cada nuevo fallo informado, Anecdote envía un evento a Datadog para que puedas crear un caso o un incidente. Además, esta solución permite analizar la correlación de las señales de máquinas (como el uso de CPU) con las señales notificadas por los usuarios.
Utilizando los logs con datos de los comentarios de los clientes se puede acortar significativamente el tiempo medio de respuesta (MTTR) y detectar sistemáticamente problemas difíciles de replicar.

Anecdote monitoriza comentarios de clientes procedentes de más de 80 fuentes, entre ellas:

- Tickets de asistencia (Zendesk, Intercom, Freshdesk y otros)
- Reseñas públicas (App Store, Google Play y Trustpilot)
- Comentarios en las redes sociales Twitter, Reddit y Facebook
- Encuestas a clientes (SurveyMonkey, Typeform, Medallia y otros)

Al agregar y analizar los errores notificados por los usuarios en un dashboard unificado, los desarrolladores tienen una visión completa de los comentarios de los clientes, lo que les permite priorizar y abordar los problemas con mayor eficacia.

## Configuración

### Configuración

1. En Datadog, ve a **Integraciones** y busca Anecdote.

1. En la página de la integración Anecdote, haz clic en **Install** (Instalar) para instalar la integración.

1. Una vez finalizada la instalación, haz clic en **Connect Accounts** (Conectar cuentas) para conectar tus cuentas de Anecdote y Datadog.

1. Se te redirigirá a la página de inicio de sesión de Anecdote. Inicia sesión con tus credenciales de Anecdote.

1. Una vez que hayas iniciado sesión en Anecdote, ve a la sección Integraciones.

1. En la sección Integraciones, busca y selecciona la integración Datadog.

1. Introduce la región en la que se encuentra tu espacio de trabajo Datadog. Esto garantiza que la integración apunte al servidor Datadog correcto.

1. Se te redirigirá a Datadog para autenticar tu cuenta. Inicia sesión con tus credenciales de Datadog.

1. Luego de conectarte a Datadog, instala la aplicación Anecdote. Esto añade "Anecdote: Informes de errores" a tu lista de dashboards en Datadog.

1. En Anecdote, comprueba que la integración se ha conectado correctamente. Deberías ver un mensaje de confirmación o el estado de la integración.

1. Una vez verificada la integración, puedes empezar a utilizar Anecdote para enviar informes de errores directamente a Datadog y monitorizarlos en la página Dashboards.

### Validación

Para validar el estado de la conexión, puedes comprobar el dashboard de Anecdote en Datadog, que muestra informes de errores relacionados con tu aplicación.

## Desinstalación

- Conéctate a tu [cuenta Anecdote](https://app.anecdoteai.com).
- Ve a la sección Integraciones.
- Busca la integración Datadog y haz clic en el icono de suprimir para eliminar la integración.
- Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado, buscando el nombre de la integración en la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **anecdote.feedback.App_Store** <br>(count) | Cuenta el número total de entradas de comentarios del Apple Store.|
| **anecdote.feedback.Google_Play** <br>(count) | Cuenta el número total de entradas de comentarios de Google Play Store.|
| **anecdote.feedback.custom_csv** <br>(count) | Cuenta el número total de entradas de comentarios de fuentes CSV personalizadas.|
| **anecdote.feedback.custom_parquet** <br>(count) | Cuenta el número total de entradas de comentarios de fuentes de Parquet personalizadas.|
| **anecdote.feedback.Twitter** <br>(count) | Cuenta el número total de tweets con comentarios de Twitter.|
| **anecdote.feedback.Intercom** <br>(count) | Cuenta el número total de interacciones de clientes desde Intercom.|
| **anecdote.feedback.SendBird** <br>(count) | Cuenta el número total de mensajes de las plataformas SendBird.|
| **anecdote.feedback.gorgias** <br>(count) | Cuenta el número total de tickets de asistencia al cliente de Gorgias.|
| **anecdote.feedback.Zendesk_Support** <br>(count) | Cuenta el número total de tickets de asistencia de Zendesk Support.|
| **anecdote.feedback.Freshdesk** <br>(count) | Cuenta el número total de tickets de asistencia de Freshdesk.|
| **anecdote.feedback.Google_Maps** <br>(count) | Cuenta el número total de reseñas de Google Maps.|
| **anecdote.feedback.G2** <br>(count) | Cuenta el número total de reseñas de G2.|
| **anecdote.feedback.Trustpilot** <br>(count) | Cuenta el número total de reseñas de Trustpilot.|
| **anecdote.feedback.Reddit** <br>(count) | Cuenta el número total de menciones de Reddit.|
| **anecdote.feedback.hubspot** <br>(count) | Cuenta el número total de entradas de comentarios de clientes de HubSpot.|
| **anecdote.feedback.typeform** <br>(count) | Cuenta el número total de respuestas a encuestas de Typeform.|
| **anecdote.feedback.Delighted** <br>(count) | Cuenta el número total de entradas de comentarios de Delighted.|
| **anecdote.feedback.Discord** <br>(count) | Cuenta el número total de mensajes de Discord.|
| **anecdote.feedback.SurveyMonkey** <br>(count) | Cuenta el número total de respuestas de SurveyMonkey.|
| **anecdote.feedback.Steam** <br>(count) | Cuenta el número total de reseñas de Steam.|
| **anecdote.feedback.App_Store.bug** <br>(count) | Cuenta el número total de entradas de comentarios relacionados con errores de Apple Store.|
| **anecdote.feedback.Google_Play.bug** <br>(count) | Cuenta el número total de entradas de comentarios relacionados con errores de Google Play Store.|
| **anecdote.feedback.custom_csv.bug** <br>(count) | Cuenta el número total de entradas de comentarios relacionadas con errores desde fuentes CSV personalizadas.|
| **anecdote.feedback.custom_parquet.bug** <br>(count) | Cuenta el número total de entradas de comentarios relacionados con errores de fuentes de Parquet personalizadas.|
| **anecdote.feedback.Twitter.bug** <br>(count) | Cuenta el número total de tweets de Twitter relacionados con errores.|
| **anecdote.feedback.Intercom.bug** <br>(count) | Cuenta el número total de interacciones de clientes relacionadas con errores de Intercom.|
| **anecdote.feedback.SendBird.bug** <br>(count) | Cuenta el número total de mensajes relacionados con errores de plataformas SendBird.|
| **anecdote.feedback.gorgias.bug** <br>(count) | Cuenta el número total de tickets de asistencia al cliente de Gorgias relacionados con errores.|
| **anecdote.feedback.Zendesk_Support.bug** <br>(count) | Cuenta el número total de tickets de asistencia relacionados con errores de Zendesk Support.|
| **anecdote.feedback.Freshdesk.bug** <br>(count) | Cuenta el número total de tickets de asistencia relacionados con errores de Freshdesk.|

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Anecdote](mailto:hello@anec.app).