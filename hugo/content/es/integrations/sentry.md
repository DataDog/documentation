---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 56
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
- event management
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: Consulta las excepciones de Sentry en tu flujo (stream) de eventos
  de Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Configuración
  description: Consulta las excepciones de Sentry en tu flujo de eventos de Datadog.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/
  support: README.md#Solucionar problemas
  title: Sentry
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Sentry ha dejado obsoletas las integraciones de webhooks legacy y ahora recomienda utilizar **integraciones internas de Sentry** con webhooks para reenviar eventos a sistemas externos.

Para reenviar eventos a Datadog, debes configurar una integración de webhook directamente en Sentry. Esta configuración permite a Sentry enviar eventos a un endpoint público de tu elección compatible con tu organización.

Encontrarás más información e instrucciones de configuración en [la documentación oficial de Sentry][1].

Puedes encontrar la URL de admisión de Datadog (para logs o eventos) en la [documentación de la API Datadog][2] o en la configuración de la cuenta Datadog.

## Webhooks legacy

Si anteriormente configuraste la integración de webhooks legacy de Sentry, esta puede seguir funcionando por ahora. Sin embargo, **todas las nuevas configuraciones de webhooks deben utilizar las integraciones internas de Sentry** de ahora en adelante.

## Configuración

### Configuración

## Paso 1: Desplegar el Webhook Forwarder

Los webhooks de Sentry no pueden incluir cabeceras personalizadas. Debes desplegar un pequeño servicio en tu infraestructura que:

- Acepte POST de webhooks entrantes de Sentry
- Añada las cabeceras de autenticación necesarias
- Reenvíe la carga útil a tu destino

Para obtener más información, consulta la [documentación oficial de Sentry][1].

## Paso 2: Crear una integración interna en Sentry

1. Ve a **Configuración > Configuración del desarrollador > Integraciones internas**.

2. Haz clic en **Create New Internal Integration** (Crear nueva integración interna).

3. Rellena:

   - **Nombre**: Reenviador de alertas
   - **URL del webhook**: La URL pública de tu servicio desplegado
   - Activar una **acción de reglas de alerta**

4. Definir permisos:

   - **Problemas y eventos**: Leer
   - **Alertas**: Leer

5. Habilitar activadores de webhooks:

   - `issue`
   - `error`

6. Haz clic en **Save** (Guardar).

7. Opcionalmente, genera un token si tu proxy admite la autenticación basada en token.

## Paso 3: Crear una regla de alerta

1. Ve a **Configuración del proyecto > Alertas > Alertas de problemas**.

2. Crea una nueva regla de alerta:

   - **CUANDO**: Se crea un nuevo problema
   - (Opcional) Añadir filtros
   - **LUEGO**: Enviar una notificación utilizando tu integración interna
   - Definir la frecuencia y el intervalo de notificación, según sea necesario

3. Utiliza la opción **Enviar notificación de test** para verificar la configuración.

## Paso 4: Confirmar recepción

Una vez configurado:

- Monitoriza tu sistema de destino para buscar las alertas reenviadas.
- Confirma que la estructura y el contenido de la carga útil coinciden con las expectativas.
- Utiliza los logs de tu proxy para depurar problemas de entrega.

Si no aparecen las alertas:

- Asegúrate de que tu proxy es accesible desde la Internet pública.
- Comprueba que las cabeceras de autenticación se están añadiendo correctamente.
- Revisa los logs de webhooks de Sentry en **Configuración del desarrollador > Integraciones internas > Tu integración > Logs**.

## Soporte

Si tienes preguntas o problemas para configurar la integración de webhooks de Sentry, ponte en contacto directamente con el servicio de asistencia de Sentry:  
[https://support.sentry.io][3]

[1]: https://docs.sentry.io/organization/integrations/integration-platform/webhooks/
[2]: https://docs.datadoghq.com/es/api/latest/logs/#send-logs
[3]: https://support.sentry.io