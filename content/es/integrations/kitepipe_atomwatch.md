---
algolia:
  subcategory: Integraciones de Marketplace
app_id: kitepipe-atomwatch
app_uuid: c9c6ace5-9793-48da-a4be-7bbd4c3e9b06
assets:
  dashboards:
    AtomWatch Boomi Cluster Monitoring: assets/dashboards/boomi_cluster_monitoring2.json
    AtomWatch Boomi Compute Monitoring: assets/dashboards/boomi_compute_monitoring2.json
    AtomWatch Boomi Workload Monitoring: assets/dashboards/boomi_workload_monitoring2.json
    AtomWatch Overview: assets/dashboards/atomwatch_overview.json
    Boomi JMX Monitoring - Forked: assets/dashboards/jmx_forked.json
    Boomi JMX Monitoring - Management JVM: assets/dashboards/jmx_management_jvm.json
    Boomi JMX Monitoring - Non-Forked: assets/dashboards/jmx_nonforked.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: kitepipe.atomwatch.integration_completed
      metadata_path: metadata.csv
      prefix: kitepipe.atomwatch.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10355
    source_type_name: AtomWatch
  monitors:
    API Gateway node CPU usage is high: assets/monitors/api_gw_node_cpu.json
    API Gateway node Disk usage is high: assets/monitors/api_gw_node_disk.json
    API Gateway node memory usage is high: assets/monitors/api_gw_node_ram.json
    AtomWatch is down: assets/monitores/atomwatch_down.json
    Boomi "View File" is missing: assets/monitors/cluster_view_file_missing.json
    Boomi "view file" is too old: assets/monitors/cluster_view_file_too_old.json
    Boomi "view file" reports a problem: assets/monitors/cluster_view_file_problem.json
    Boomi API calls from more than one node: assets/monitors/multiple_node_api_calls.json
    Boomi Molecule node is at high CPU usage: assets/monitors/molecule_node_cpu.json
    Boomi Molecule node is running out of disk space: assets/monitors/molecule_node_disk.json
    Boomi runtime is reported as offline: assets/monitors/boomi_online_status.json
    Cannot call the Boomi Platform API: assets/monitors/failed_boomi_platform_api_call.json
    Execution duration is anomalous: assets/monitors/execution_duration_anomaly.json
    JVM Runtime low memory: assets/monitors/jmx_low_mem.json
    JVM Runtime out of memory: assets/monitors/jmx_out_of_mem.json
    Molecule node memory usage is high: assets/monitors/molecule_node_ram.json
author:
  homepage: https://www.kitepipe.com
  name: Kitepipe
  sales_email: AtomWatch.Sales@kitepipe.com
  support_email: AtomWatch.Support@kitepipe.com
  vendor_id: kitepipe
categories:
- alertas
- aws
- event management
- recopilación de logs
- marketplace
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: kitepipe_atomwatch
integration_id: kitepipe-atomwatch
integration_title: Kitepipe AtomWatch
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: kitepipe_atomwatch
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.kitepipe.atomwatch
  product_id: atomwatch
  short_description: Precio unitario por Boomi Atom o Molecule Node
  tag: billing_key
  unit_label: Boomi Atom or Molecule Node
  unit_price: 200
public_title: Kitepipe AtomWatch
short_description: Monitoriza los procesos y la infraestructura de Boomi
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Alerting
  - Category::AWS
  - Category::Event Management
  - Category::Log Collection
  - Category::Marketplace
  - Category::Notifications
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza los procesos y la infraestructura de Boomi
  media:
  - caption: Los informes mejorados del proceso te permiten retroceder más de 30 días
      y filtrar por más campos, con comodines.
    image_url: images/enhanced_process_reporting.png
    media_type: imagen
  - caption: Consulta procesos de larga duración de un vistazo y recibe alertas con
      detección de anomalías.
    image_url: images/execution_duration_anomalies.png
    media_type: imagen
  - caption: Amplia monitorización de infraestructuras, incluidas la CPU, RAM, disco,
      red.
    image_url: images/infrastructure_monitoring.png
    media_type: imagen
  - caption: Monitorización del clúster que supera las recomendaciones publicadas
      de Boomi.
    image_url: images/cluster_monitoring.png
    media_type: imagen
  - caption: Toplists y gráficos de procesos de Boomi con errores.
    image_url: images/error_monitoring.png
    media_type: imagen
  - caption: Compatible con la monitorización de JMX.
    image_url: images/jmx_monitoring.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://atomwatch.refined.site/space/CS/11108353
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/
  support: README.md#Support
  title: Kitepipe AtomWatch
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

AtomWatch de Kitepipe es una integración basada en el Agent que recopila métricas de procesos, nodos del clúster e infraestructuras relacionadas de Boomi para informar a clientes de Datadog y de Boomi sobre el estado de la integración.

AtomWatch versión 1.2 contiene 7 dashboards, 17 métricas personalizadas y 16 monitores que informan sobre las estadísticas de ejecución de Boomi, el estado del clúster, la monitorización de JMX y el estado de la infraestructura. Estas métricas están disponibles para los clientes de Datadog y de Boomi para el análisis de tendencias de tiempo extendido (sobre el estándar de 30 días de la disponibilidad de informes de procesos de Boomi).

Los clientes de Datadog que adquieran AtomWatch deben gestionar el Boomi Java Runtime en una configuración de Atom o de Molecule. Kitepipe incluye una sesión de configuración de una hora con la prueba gratuita inicial de 14 días.

### Acerca de Kitepipe

Kitepipe es un socio de implementación de Boomi Platinum y es el principal equipo de desarrollo de integración de Boomi en América del Norte. Kitepipe se fundó en 2011 en respuesta a la necesidad de un equipo de servicios centrado en Boomi que pudiera cumplir todas las promesas de esta potente plataforma de integración. 

En la actualidad, el equipo de Kitepipe de desarrolladores on-shore certificados de Boomi ayuda a docenas de clientes de Boomi a conseguir rápidamente el valor de negocios con la plataforma líder de la industria para la integración de Boomi.

El servicio AtomWatch de Datadog es una nueva oferta de Kitepipe centrada en servicios gestionados por Boomi en AWS. Kitepipe es el líder en una serie de áreas de integración, verticales y dominios, incluidas migraciones a AWS de procesos de Boomi, Boomi gestionado en AWS, soluciones verticales de Biotech creadas en Boomi, NetSuite, SAP, Coupa, Workday y HRIS, Data Mart/BI y más endpoints.

### Recopilación de logs

Esta integración realiza llamadas de API a Boomi Platform en tu nombre, recupera registros de ejecución y los envía a Datadog como logs. También monitoriza opcionalmente ejecuciones en progreso y telemetría de JVM a través de JMX, envía esta información a Datadog como logs. Puedes ver qué procesos de Boomi se están ejecutando en cuál JVM, junto con métricas asociadas, como el uso de memoria, la recolección de basura, el count de conversaciones y más.

### Eventos

Esta integración recupera registros de AuditLog de la API Boomi y los envía a Datadog como eventos. Los eventos son visibles en forma filtrada en el dashboard de monitorización de la carga de trabajo de Boomi o en el [Explorer de eventos][1]. Puedes crear tus propios monitores para inspeccionar los registros de AuditLog sin filtrar.

### Métricas

Esta integración envía métricas. Puedes explorar una lista de métricas en la pestaña **Data Collected** (Datos recopilados). 

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con AtomWatch a través del siguiente canal:

- Correo electrónico: [AtomWatch.Support@kitepipe.com][11]

El horario de asistencia de Kitepipe para AtomWatch es de 9 de la mañana a 3 de la tarde en las zonas horarias de EE. UU. y Canadá. Las solicitudes de solución de problemas de AtomWatch se responderán en un plazo de 24 a 48 horas desde la recepción de la notificación en el alias de correo electrónico de AtomWatch.

Para obtener los mejores resultados de respuesta, incluye el nombre del cliente, la configuración de Boomi y una breve descripción del evento o la cuestión que se debe solucionar. Kitepipe pone a tu disposición programas de asistencia mejorados previa solicitud.

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Documentación de AtomWatch][9]
- [Monitoriza tus integraciones de Boomi con la oferta de Kitepipe en Datadog Marketplace][12]
- [Activación de JMX en Boomi][13]

[1]: https://app.datadoghq.com/event/explorer
[2]: https://help.boomi.com/bundle/atomsphere_platform/page/int-Adding_API_tokens.html
[3]: https://help.boomi.com/bundle/integration/page/t-atm-Attaching_a_role_to_an_Environment.html
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: https://help.boomi.com/bundle/integration/page/r-atm-Startup_Properties_panel.html
[7]: https://help.boomi.com/bundle/integration/page/r-atm-Cluster_Status_panel.html
[8]: https://help.boomi.com/bundle/api_management/page/api-API_Gateway_settings.html
[9]: https://atomwatch.kitepipe.com/space/CS/11108353
[10]: https://www.kitepipe.com/
[11]: mailto:AtomWatch.Support@kitepipe.com
[12]: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/
[13]: https://help.boomi.com/docs/Atomsphere/Integration/Integration%20management/t-atm-Enabling_remote_JMX_on_an_Atom_1a1625d0-330d-43c6-a765-42502d7768ec

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/kitepipe-atomwatch" target="_blank">adquiere esta aplicación en el Marketplace</a>.