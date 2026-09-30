---
aliases:
- /es/integrations/iam_access_analyzer
app_id: iam-access-analyzer
categories:
- seguridad
custom_kind: integración
description: AWS IAM Access Analyzer identifica los recursos de acceso público
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: AWS IAM Access Analyzer
---
## Información general

Utiliza AWS Identity and Access Management (IAM) Access Analyzer en toda tu cuenta de Amazon para analizar continuamente los permisos de IAM concedidos con cualquiera de las políticas de tu cuenta. Datadog se integra con Amazon IAM Access Analyzer mediante una función Lambda que envía sus conclusiones como logs a Datadog.

## Configuración

### Recopilación de logs

1. Si aún no lo has hecho, configura la función Lambda [Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Crea una nueva regla con el tipo `Rule with an event pattern` en Amazon EventBridge.

1. Para la configuración del evento source (fuente), selecciona `Other`. Para `Creation method`, selecciona `Custom pattern (JSON editor)`. Para `Event pattern`, copia y pega el siguiente JSON:

   ```json
   {
       "source": ["aws.access-analyzer"]
   }
   ```

1. Selecciona `AWS service` para utilizarlo como tipo de destino. Selecciona `Lambda function` como destino y selecciona Datadog Forwarder Lambda o introduce el ARN.

1. Guarda tu regla.

1. Una vez que el AWS Access Analyzer se ejecuta y produce resultados, los eventos se recogerán mediante Datadog Lambda Forwarder etiquetado con `source:access-analyzer`. Consulta el [Explorer de logs](https://app.datadoghq.com/logs?query=source%3Aaccess-analyzer) para empezar a explorar tus logs.

## Datos recopilados

### Métricas

Esta integración no incluye métricas.

### Checks de servicio

Esta integración no incluye ningún check de servicio.

### Logs

Esta integración puede configurarse para enviar logs.

### Eventos

Esta integración no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help).