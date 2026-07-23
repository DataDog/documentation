---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-zoho-crm
app_uuid: cdfd2c18-10a3-49a4-b7d8-1347afa2d158
assets:
  dashboards:
    'Zoho CRM: Campaigns, Tasks, Calls and Meetings': assets/dashboards/crest_data_systems_zoho_crm_campaigns_tasks.json
    'Zoho CRM: Cases and Solutions': assets/dashboards/crest_data_systems_zoho_crm_cases_solutions.json
    'Zoho CRM: Deals': assets/dashboards/crest_data_systems_zoho_crm_deals.json
    'Zoho CRM: Leads, Accounts and Contacts': assets/dashboards/crest_data_systems_zoho_crm_leads_contacts_accounts.json
    'Zoho CRM: Overview': assets/dashboards/crest_data_systems_zoho_crm_overview.json
    'Zoho CRM: Products, Vendors and Price Books': assets/dashboards/crest_data_systems_zoho_crm_products.json
    'Zoho CRM: Purchase Orders, Sales Orders, Invoices and Quotes': assets/dashboards/crest_data_systems_purchase_and_sales_orders.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.zoho.crm.active_users
      metadata_path: metadata.csv
      prefix: cds.zoho.crm
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38198692
    source_type_name: crest_data_systems_zoho_crm
  monitors:
    Leads Converted Today: assets/monitors/crest_data_systems_leads_converted.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- colaboración
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_zoho_crm
integration_id: crest-data-systems-zoho-crm
integration_title: Zoho CRM
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_zoho_crm
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.zoho_crm
  product_id: zoho-crm
  short_description: Por usuarios activos de Zoho CRM por organización y mes
  tag: cds_zoho_crm_user_id
  unit_label: Cliente activo de Zoho CRM
  unit_price: 2.0
public_title: Zoho CRM
short_description: Monitoriza módulos de Zoho CRM para realizar un seguimiento eficaz
  de las ventas, las interacciones con los clientes y las operaciones comerciales.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Events
  - Tipo de datos enviados::Métricas
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza módulos de Zoho CRM para realizar un seguimiento eficaz
    de las ventas, las interacciones con los clientes y las operaciones comerciales.
  media:
  - caption: 'Zoho CRM: información general'
    image_url: images/crest_data_systems_zoho_crm_overview.png
    media_type: imagen
  - caption: 'Zoho CRM: leads, cuentas y contactos'
    image_url: images/crest_data_systems_zoho_crm_leads.png
    media_type: imagen
  - caption: 'Zoho CRM: ofertas'
    image_url: images/crest_data_systems_zoho_crm_deals.png
    media_type: imagen
  - caption: 'Zoho CRM: campañas, tareas, llamadas y reuniones'
    image_url: images/crest_data_systems_zoho_crm_campaigns.png
    media_type: imagen
  - caption: 'Zoho CRM: casos y soluciones'
    image_url: images/crest_data_systems_zoho_crm_cases.png
    media_type: imagen
  - caption: 'Zoho CRM: pedidos de compra, pedidos de venta, facturas y presupuestos'
    image_url: images/crest_data_systems_zoho_crm_purchase_order.png
    media_type: imagen
  - caption: 'Zoho CRM: productos, proveedores y libros de precios'
    image_url: images/crest_data_systems_zoho_crm_products.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Zoho CRM
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Zoho CRM es una potente plataforma de gestión de relaciones con los clientes que agiliza las ventas, el marketing y los procesos de compromiso con el cliente. Mediante la integración con Datadog, las empresas pueden monitorizar tu entorno de Zoho CRM en tiempo real, obteniendo información sobre el rendimiento de las ventas, las interacciones con los clientes, el estado de los proyectos y la eficiencia operativa para impulsar la toma de decisiones basada en datos.

La integración recopila los siguientes datos:

- **Métricas**: usuarios activos de Zoho CRM

- **Log**: Leads, Contactos, Cuentas, Ofertas, Campañas, Llamadas, Tareas, Reuniones, Casos, Soluciones, Órdenes de Compra, Órdenes de Venta, Facturas, Cotizaciones, Productos, Proveedores y Libros de precios

- **Eventos**: autenticación y validación de la configuración 


### Dashboards
Esta integración incluye 7 dashboards predefinidos:

- **Zoho CRM: información general**:  proporciona información superficial de todas las actividades de CRM, incluyendo el rendimiento de las ventas y las interacciones con los clientes.
- **Zoho CRM: leads, contactos y cuentas**: realiza un seguimiento de la generación de leads, los detalles de los clientes y las cuentas empresariales para mejorar la gestión de las relaciones y las conversiones. 
- **Zoho CRM: ofertas**: monitoriza el pipeline de ventas, etapas de oferta y predicciones de ganancias para optimizar el rendimiento de las ventas.
- **Zoho CRM: campañas, tareas, llamadas y reuniones**: analiza las campañas de marketing, el progreso de las tareas, los logs de llamada y las reuniones para mejorar la productividad y el compromiso. 
- **Zoho CRM: casos y soluciones**: ayuda a gestionar los problemas y las soluciones de los clientes, garantizando una asistencia eficaz y la resolución de servicio. 
- **Zoho CRM: productos, proveedores y libros de precios**: proporciona información sobre el inventario, las relaciones con los proveedores y las estrategias de precios para ventas y adquisiciones eficientes. 
- **Zoho CRM: órdenes de compra, órdenes de venta, facturas y cotizaciones**: rastrea las cotizaciones proporcionadas, el procesamiento de órdenes y los detalles de precios para agilizar las operaciones comerciales.

## Ayuda

Para solicitar asistencia o características, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][6]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][7]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ de integraciones de Datadog Marketplace de Crest Data][10]

### Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/help/
[6]: mailto:datadog.integrations@crestdata.ai
[7]: mailto:datadog-sales@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/ZohoCRM.pdf
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://docs.datadoghq.com/es/agent/?tab=Linux
[12]: https://api-console.zoho.com/
[13]: https://www.zoho.com/crm/developer/docs/api/v7/multi-dc.html


---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio de Datadog Technology. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-zoho-crm" target="_blank">adquiere esta aplicación en el Marketplace</a>.