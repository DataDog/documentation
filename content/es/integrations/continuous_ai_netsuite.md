---
algolia:
  subcategory: Integraciones de Marketplace
app_id: continuous-ai-netsuite
app_uuid: e458cb71-5229-4385-bfb1-0089221ff276
assets:
  dashboards:
    Netsuite Continuous AI Overview: assets/dashboards/netsuite_continuous_ai_overview.json
    Netsuite System, Script, Audit Logs: assets/dashboards/netsuite_continuous_ai_suiteql.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26840441
    source_type_name: Continuous AI NetSuite
author:
  homepage: https://www.continuous-ai.com
  name: Continuous AI
  sales_email: sales@continuous-ai.com
  support_email: support@continuous-ai.com
  vendor_id: continuous-ai
categories:
- recopilación de logs
- marketplace
- gestión de costes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: continuous_ai_netsuite
integration_id: continuous-ai-netsuite
integration_title: NetSuite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/continuous_ai_netsuite_eula.pdf
manifest_version: 2.0.0
name: continuous_ai_netsuite
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: netsuite
  short_description: Cuota de suscripción fija para cualquier cantidad de datos de
    logs de NetSuite.
  unit_price: 299
public_title: NetSuite
short_description: Monitorización de tu rendimiento y registro de NetSuite SuiteScript
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Categoría::Marketplace
  - Category::Cost Management
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Monitorización de tu rendimiento y registro de NetSuite SuiteScript
  media:
  - caption: Información general del dashboard de NetSuite
    image_url: images/dashboard_overview.png
    media_type: imagen
  - caption: 'Dashboard de información general de NetSuite: análisis del rendimiento'
    image_url: images/dashboard_perf.png
    media_type: imagen
  - caption: 'Dashboard de información general de NetSuite: rastreo de scripts'
    image_url: images/dashboard_exec.png
    media_type: imagen
  - caption: 'Dashboard de información general de NetSuite: logs sin formato'
    image_url: images/dashboard_raw.png
    media_type: imagen
  - caption: Logs de sistema de NetSuite
    image_url: images/dashboard_suiteql1.png
    media_type: imagen
  - caption: Detalles de logs de sistema de NetSuite
    image_url: images/dashboard_suiteql2.png
    media_type: imagen
  - caption: Logs de auditoría y script de inicio de sesión de NetSuite
    image_url: images/dashboard_suiteql3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: NetSuite
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

NetSuite es un conjunto de software ERP basado en la nube que proporciona a las empresas una plataforma unificada para la gestión financiera, la gestión de las relaciones con los clientes y el comercio electrónico. Esta integración recopila e informa métricas y logs de NetSuite para funcionalidades estándar y personalizadas, incluyendo:

+ SuiteScripts estándar y personalizados
+ Suitelets y Restlets
+ Logs de script
+ Rendimiento y tiempos de ejecución de scripts
+ Errores y cambios importantes
+ Actividad de los usuarios

El seguimiento de estos datos de telemetría en Datadog te ayuda a realizar un seguimiento del rendimiento y a detectar problemas en las ejecuciones de scripts de NetSuite.

### Dashboards

Esta integración proporciona el **Dashboard de Continuous AI NetSuite** predefinido. El dashboard muestra los datos de NetSuite enviados a Datadog a lo largo del tiempo, e incluye variables de entorno para limitar una búsqueda a cuentas, filiales o departamentos específicos de NetSuite.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Continuous AI a través de los siguientes canales:

- Soporte: [support@continuous-ai.com][2]
- Ventas: [sales@continuous-ai.com][4]

### Requisitos

¿Tienes necesidades específicas que te gustaría comentar? ¡Estamos aquí para ayudar! Ponte en contacto con [sales@continuous-ai.com][4].

---

Nos preocupamos por tus comentarios. Continuous AI.

[1]: https://docs.datadoghq.com/es/getting_started/agent/
[2]: mailto:support@continuous-ai.com 
[3]: https://system.netsuite.com/pages/customerlogin.jsp?country=US
[4]: mailto:sales@continuous-ai.com
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/#agent-configuration-directory
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/continuous-ai-netsuite" target="_blank">adquiere esta aplicación en el Marketplace</a>.