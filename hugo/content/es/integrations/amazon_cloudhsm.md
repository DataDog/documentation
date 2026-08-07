---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md
description: Recopila tus logs de auditoría de HSM en tu organización de Datadog.
has_logo: true
integration_id: amazon-cloudhsm
integration_title: AWS CloudHSM
is_public: true
name: amazon_cloudhsm
public_title: Integración de Datadog y AWS CloudHSM
short_description: Recopila tus logs de auditoría de HSM en tu organización de Datadog.
---

## Información general

Cuando un HSM de tu cuenta recibe un comando de las herramientas de línea de comandos o de librerías de software de AWS CloudHSM, registra su ejecución del comando en forma de log de auditoría. Los logs de auditoría del HSM incluyen todos los comandos de gestión iniciados por el cliente, incluidos los que crean y eliminan el HSM, los que entran y salen del HSM, y los que gestionan usuarios y claves. Estos logs proporcionan un registro fiable de las acciones que han cambiado el estado del HSM.

Datadog se integra con AWS CloudHSM a través de una función de Lambda que envía logs de CloudHSM logs a la solución Log Management de Datadog.

## Configuración

### Recopilación de logs

#### Activar logs

Los logs de auditoría están habilitados por defecto para CloudHSM.

#### Enviar tus logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][1] en tu cuenta de AWS.
2. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Selecciona el activador **CloudWatch Logs** en la Trigger Configuration (Configuración del activador).
4. Selecciona el grupo de logs de CloudWatch que contiene tus logs de CloudHSM.
5. Introduce un nombre para el filtro.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer][2] para empezar a explorar tus logs.

Para más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog][3].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: /es/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[4]: /es/help/
