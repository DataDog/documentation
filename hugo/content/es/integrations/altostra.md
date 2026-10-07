---
app_id: altostra
app_uuid: c22d6f84-3404-4638-99bc-7cb19ab4508a
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: altostra.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10181
    source_type_name: Altostra
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Altostra
  sales_email: support@altostra.com
  support_email: support@altostra.com
categories:
- automatización
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_on_public_website: true
draft: false
git_integration_title: altostra
integration_id: altostra
integration_title: Altostra
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: altostra
public_title: Altostra
short_description: Envía automáticamente tus logs de aplicaciones en la nube desde
  Altostra a Datadog
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Automatización
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Envía automáticamente tus logs de aplicaciones en la nube desde Altostra
    a Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Altostra
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Altostra se integra con servicios de computación en la nube para proporcionar a tus equipos de desarrollo flujos de trabajo integrales.

La integración de Datadog Altostra te permite instrumentar automáticamente tus proyectos de Altostra durante el despliegue para enviar logs y métricas a tu cuenta de Datadog. Controla la configuración de la integración por entorno de despliegue.

## Configuración

### Instalación

La integración de Datadog Altostra está integrada. No requiere instalación.

### Configuración

La integración de Datadog está disponible en la consola web de Altostra en [integraciones][1] en la página de configuración de la cuenta.

1. Ve a la sección [Integraciones][1] en la configuración de tu cuenta de Altostra.
2. Haz clic en **Connect** (Conectar) para acceder a la integración de **Datadog**.
3. Introduce un **nombre de usuario** para la integración.
4. Introduce la **clave de API** de tu cuenta de Datadog.
5. Haz clic en **OK** para finalizar la configuración de la integración.
6. Ve a [entornos][2] y haz clic en el entorno para el que deseas configurar el envío de logs.
7. En _Configuration_ (Configuración), selecciona la integración que configuró en los pasos anteriores en la selección **Log shipping** (Envío de logs).
8. Haz clic en **Save Changes** (Guardar cambios).

### Validación

1. Despliega un proyecto de Altostra que contenga una función de Lambda en cualquier entorno que hayas configurado para el envío de logs a Datadog.
2. Invoca la función de Lambda.
3. Deberías ver los logs de la función de Lambda en la vista _Logs_ en Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: https://app.datadoghq.com/help