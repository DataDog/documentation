---
app_id: iam-access-analyzer
app_uuid: 13a88901-3d20-43b3-9a3c-3b20b2adf1cc
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: iam_access_analyzer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10081
    source_type_name: AWS IAM Access Analyzer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iam_access_analyzer/README.md
display_on_public_website: true
draft: false
git_integration_title: iam_access_analyzer
integration_id: iam-access-analyzer
integration_title: AWS IAM Access Analyzer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: iam_access_analyzer
public_title: AWS IAM Access Analyzer
short_description: AWS IAM Access Analyzer identifica los recursos de acceso público
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS IAM Access Analyzer identifica los recursos de acceso público
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS IAM Access Analyzer
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Utiliza AWS Identity and Access Management (IAM) Access Analyzer en toda tu cuenta de Amazon para analizar continuamente los permisos de IAM concedidos con cualquiera de las políticas de tu cuenta. Datadog se integra con Amazon IAM Access Analyzer mediante una función de Lambda que envía sus conclusiones como logs a Datadog.

## Configuración

### Recopilación de logs

1. Si aún no lo has hecho, configura la función de Lambda de [Datadog Forwarder][1].

2. Crea una nueva regla con el tipo `Rule with an event pattern` en Amazon EventBridge.

3. Para la configuración de la fuente de evento, selecciona `Other`. Para `Creation method`, selecciona `Custom pattern (JSON editor)`. Para `Event pattern`, copia y pega el siguiente JSON:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Selecciona `AWS service` como tipo de destino. Selecciona `Lambda function` como destino y selecciona el Datadog Lambda Forwarder o introduce el ARN.

5. Guarda tu regla.

6. Una vez que AWS Access Analyzer se ejecuta y produce resultados, los eventos serán recopilados por Datadog Lambda Forwarder, etiquetados con `source:access-analyzer`. Consulta el [Log Explorer][2] para empezar a explorar tus logs.

## Datos recopilados

### Métricas

Esta integración no incluye ninguna métrica.

### Checks de servicio

Esta integración no incluye ningún check de servicio.

### Logs

Esta integración puede configurarse para enviar logs.

### Eventos

Esta integración no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs?query=source%3Aaccess-analyzer
[3]: https://docs.datadoghq.com/es/help