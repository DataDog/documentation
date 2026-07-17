---
app_id: sofy
app_uuid: eea6fdbc-2f8d-4483-bbd3-767818b1c25a
assets:
  dashboards:
    Sofy Overview: assets/dashboards/sofy_sofy_overview.json
  integration:
    auto_install: true
    metrics:
      check: sofy.step.cpu_utilization
      metadata_path: metadata.csv
      prefix: sofy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10353
    source_type_name: Sofy
  oauth: assets/oauth_clients.json
author:
  homepage: https://sofy.ai
  name: Sofy
  sales_email: devops@sofy.ai
  support_email: devops@sofy.ai
  vendor_id: sofy
categories:
- pruebas
- móvil
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/README.md
display_on_public_website: true
draft: false
git_integration_title: sofy_sofy
integration_id: sofy
integration_title: Sofy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sofy_sofy
pricing: []
public_title: Sofy
short_description: Monitoriza las métricas del dispositivo durante la ejecución de
  casos de tests automatizados
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Testing
  - Category::Mobile
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza las métricas del dispositivo durante la ejecución de casos
    de tests automatizados
  media:
  - caption: Conecta Sofy con Datadog
    image_url: images/datadog_connect.png
    media_type: imagen
  - caption: Habilitar la aplicación para enviar métricas
    image_url: images/datadog_monitoring.png
    media_type: imagen
  - caption: Métricas del dispositivo de Sofy
    image_url: images/datadog_metrics.png
    media_type: imagen
  - caption: Ejecución de test de caso de test automatizado sin código
    image_url: images/datadog_testperform.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/sofy-mobile-tests/
  - resource_type: Documentación
    url: https://docs.sofy.ai
  support: README.md#Support
  title: Sofy
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Sofy es una plataforma sin código para crear tests automatizadas de aplicaciones móviles. Los usuarios pueden integrarla con sus pipelines de CI/CD para ejecutar tests en dispositivos reales y ver los resultados de sus tests funcionales, junto con métricas del rendimiento.

Esta integración proporciona una información más profunda de tu proceso de tests mediante la visualización de métricas y tendencias clave como el tiempo de carga, la red, la utilización de la memoria y la CPU. El dashboard predefinido proporciona la visibilidad en tiempo real de los resultados de tus tests de Sofy, lo que te permite monitorizar y analizar el rendimiento a lo largo del tiempo y tomar decisiones basadas en datos para mejorar la calidad general del software.

## Datos recopilados
### Métricas

Consulta [metadata.csv][1] para obtener la lista completa de métricas proporcionada por este check.


## Configuración
Para configurar la integración de Sofy:

1. Ve a tu [página de integraciones de Datadog][2] y haz clic en el ícono de Sofy.

2. Ve a la pestaña **Configuración** y haz clic en **Instalar integración** en la parte inferior.

3. Haz clic en **Conectar cuentas** para redirigir a la [pestaña de integración][3] en Parámetros de la cuenta in Sofy.

4. Log en [Sofy][4] y, a continuación, haz clic en el botón **Conectar** sobre el ícono de Datadog para iniciar el proceso de integración.

5. Sofy te pedirá que sigas una serie de pasos de OAuth para autorizar la integración con Datadog. Sigue estos pasos cuidadosamente, asegurándote de conceder los permisos necesarios para permitir a Sofy enviar datos a Datadog.

6. Una vez finalizada la integración, ve a la página del administrador de la aplicación seleccionándola en el menú de la izquierda. Desde allí, haz clic en la pestaña de monitorización en la parte derecha de la página. Activa la monitorización de Datadog para la aplicación seleccionada alternando el conmutador correspondiente.

7. Sofy comienza ahora a enviar datos a Datadog después de cada ejecución en la aplicación seleccionada, lo que te permite monitorizar y analizar los resultados en tiempo real.


## Desinstalación
* Asegúrate de que todas las claves de la API asociadas a esta integración se hayan desactivado buscando Sofy en la [página de gestión de claves de la API][5] en Datadog.

## Soporte
¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Sofy][6].

## Referencias adicionales
Más enlaces, artículos y documentación útiles:
* [Monitoriza tus tests móviles con la oferta de Sofy en Datadog Marketplace][7]
* [Documentación de Sofy][8]


[1]: https://github.com/DataDog/integrations-extras/blob/master/sofy_sofy/metadata.csv
[2]: https://app.datadoghq.com/integrations
[3]: https://portal.sofy.ai/app/user-settings?selectedTab=integration
[4]: https://portal.sofy.ai
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Sofy
[6]: https://support.sofy.ai/support/tickets/new
[7]: https://www.datadoghq.com/blog/sofy-mobile-tests/
[8]: https://docs.sofy.ai