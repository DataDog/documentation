---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Ingiere eventos de AWS Security Hub como logs.
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: AWS Security Hub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_security_hub
public_title: Integración de Datadog y AWS Security Hub
short_description: Ingiere eventos de AWS Security Hub como logs.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Security Hub te proporciona una visión completa de tu estado de seguridad en AWS y ayuda a comprobar tu entorno con respecto a las normas y prácticas recomendadas del sector de la seguridad.

Esta integración te permite ver todos tus logs de AWS Security Hub en Datadog.

**Nota**: También puedes enviar tus señales de seguridad de Datadog a Security Hub para la orquestación de eventos adicionales en tu entorno de AWS. Sigue las instrucciones del repositorio [securityhub-eventbridge-example][1] para configurarlo.

## Configuración

Datadog utiliza Amazon EventBridge para reenviar eventos de Security Hub como logs a Datadog.

1. Ve a [Amazon EventBridge][2].
2. En el panel Create a new rule (Crear una nueva regla), haz clic en **Create rule** (Crear regla).
3. En el panel Name and description (Nombre y descripción), escribe un nombre para tu regla en el campo Name (Nombre) y, si lo deseas, escribe una descripción para tu regla en el campo Description (Descripción).
4. En el panel Define pattern (Definir patrón), selecciona **Event pattern** (Patrón de eventos) y, a continuación, selecciona **Pre-defined pattern by service** (Patrón predefinido por servicio) para crear un patrón de eventos.
5. En la lista de Service provider (Proveedor de servicio), selecciona **AWS**.
6. En la lista Service name (Nombre de servicio), selecciona **SecurityHub**.
7. En la lista Event type (Tipo de evento), selecciona **All Events** (Todos los eventos).
8. En el panel Select event bus (Seleccionar bus de evento), selecciona **AWS default event bus** (Bus de evento de AWS predeterminado).
9. En el panel Select targets (Seleccionar destinos), en la lista Targets (Destinos), selecciona **Lambda function** (Función de Lambda).
10. Selecciona el [Datadog Forwarder ][3] para enviar logs a Datadog.
11. Haz clic en **Create** (Crear).

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://github.com/DataDog/securityhub-eventbridge-example
[2]: https://aws.amazon.com/eventbridge/
[3]: https://docs.datadoghq.com/es/serverless/libraries_integrations/forwarder/
[4]: https://docs.datadoghq.com/es/help/