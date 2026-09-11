---
app_id: amazon_security_hub
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Ingiere eventos de AWS Security Hub como logs.
title: AWS Security Hub
---
## Información general

AWS Security Hub te proporciona una visión completa de tu estado de seguridad en AWS y ayuda a comprobar tu entorno con respecto a las normas y prácticas recomendadas del sector de la seguridad.

Esta integración te permite ver todos tus logs de AWS Security Hub en Datadog.

**Nota**: También puedes enviar tus señales de seguridad de Datadog a Security Hub para la orquestación de eventos adicionales en tu entorno de AWS. Sigue las instrucciones del repositorio [securityhub-eventbridge-example](https://github.com/DataDog/securityhub-eventbridge-example) para configurarlo.

## Configuración

Datadog utiliza Amazon EventBridge para reenviar eventos de Security Hub como logs a Datadog.

1. Ve a [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
1. En el panel Create a new rule (Crear una nueva regla), haz clic en **Create rule** (Crear regla).
1. En el panel Name and description (Nombre y descripción), escribe un nombre para tu regla en el campo Name (Nombre) y, si lo deseas, escribe una descripción para tu regla en el campo Description (Descripción).
1. En el panel Define pattern (Definir patrón), selecciona **Event pattern** (Patrón de eventos) y, a continuación, selecciona **Pre-defined pattern by service** (Patrón predefinido por servicio) para crear un patrón de eventos.
1. En la lista de Service provider (Proveedor de servicio), selecciona **AWS**.
1. En la lista Service name (Nombre de servicio), selecciona **SecurityHub**.
1. En la lista Event type (Tipo de evento), selecciona **All Events** (Todos los eventos).
1. En el panel Select event bus (Seleccionar bus de evento), selecciona **AWS default event bus** (Bus de evento de AWS predeterminado).
1. En el panel Select targets (Seleccionar destinos), en la lista Targets (Destinos), selecciona **Lambda function** (Función de Lambda).
1. Selecciona el [forwarder de Datadog](https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/) para enviar los logs a Datadog.
1. Haz clic en **Create** (Crear).

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).