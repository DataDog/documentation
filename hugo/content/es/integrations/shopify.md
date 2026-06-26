---
app_id: shopify
app_uuid: 81c0f478-e722-454a-83d3-5e3f45e11ca8
assets:
  dashboards:
    Shopify - Customer Overview: assets/dashboards/shopify_customer_overview.json
    Shopify - Event Overview: assets/dashboards/shopify_event_overview.json
    Shopify - Order Overview: assets/dashboards/shopify_order_overview.json
    Shopify - Product Overview: assets/dashboards/shopify_product_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 622
    source_type_name: Shopify
  logs:
    source: shopify
  monitors:
    Order Cancellation Rate is High: assets/monitors/order_cancellation_rate.json
    Product Inventory is Out of Stock: assets/monitors/product_inventory_out_of_stock.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/shopify/README.md
description: Monitoriza métricas empresariales de Shopify.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/shopify/
draft: false
git_integration_title: shopify
has_logo: false
integration_id: shopify
integration_title: Shopify
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: shopify
public_title: Shopify
short_description: Obtén información sobre logs de eventos, productos, clientes y
  pedidos de Shopify.
supported_os: []
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre logs de eventos, productos, clientes y pedidos
    de Shopify.
  media:
  - caption: Shopify - Información general de eventos
    image_url: images/shopify_event_overview.png
    media_type: imagen
  - caption: Shopify - Información general del producto
    image_url: images/shopify_product_overview.png
    media_type: imagen
  - caption: Shopify - Información general del cliente
    image_url: images/shopify_customer_overview.png
    media_type: imagen
  - caption: Shopify - Información general de pedidos
    image_url: images/shopify_order_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Shopify
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

[Shopify][1] es una plataforma de comercio integral diseñada para ayudar a los particulares a crear, gestionar y desarrollar sus negocios. Proporciona herramientas para crear una tienda online, gestionar ventas, comercializar con clientes y aceptar pagos en localizaciones digitales y físicas.

La integración Shopify recopila logs de eventos, productos, clientes y pedidos, y los envía a Datadog para su análisis detallado.

Incluye dashboards que muestran y analizan logs, facilitando la monitorización y la comprensión de patrones.

## Configuración

### Generar credenciales API en Shopify
1. Inicia sesión en tu cuenta de administrador de [Shopify][2].
2. El nombre de la tienda Shopify es la parte `xxxx` de la URL de la tienda (`https://admin.shopify.com/store/xxxx`).
3. Ve a **Settings > Apps and sales channels** (Configuración > Aplicaciones y canales de venta).
4. Selecciona **Develop Apps** (Desarrollar aplicaciones) y haz clic en **Allow custom app development** (Permitir el desarrollo de aplicaciones personalizadas).
5. Haz clic en **Create a custom app** (Crear una aplicación personalizada), proporciona los datos necesarios y haz clic en **Create app** (Crear aplicación).
6. Haz clic en **Configure Admin API Scopes** (Configurar contextos de la API de administración) en la pestaña Información general.
7. En la sección **Admin API access scopes section** (Sección de administración de contextos de acceso a la API), selecciona el siguiente contexto:
    - **read_orders**
    - **read_products**
    - **read_customers**
    - **read_content**
    - **read_price_rules**
8. Haz clic en **Save** (Guardar) para aplicar los cambios.
9. Haz clic en **Install app** (Instalar aplicación) y obtén el **Token de acceso** de la sección **Admin API access token** (Administrar token de acceso a la API).

### Conectar tu cuenta de Shopify a Datadog
1. Añadir el nombre de tu tienda y el token de acceso
    |Parámetros | Descripción
    |--------------------|--------------------|
    |Nombre de la tienda | Nombre de la tienda de tu cuenta de administrador de Shopify. |
    |Token de acceso | Token de acceso para tu cuenta de administrador de Shopify. |
2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración Shopify recopila y reenvía logs de eventos, productos, clientes y pedidos a Datadog.

### Métricas

La integración Shopify no incluye métricas.

### Checks de servicio

La integración Shopify no incluye checks de servicios.

### Eventos

La integración Shopify no incluye eventos.

## Solucionar problemas

Esta integración no es gestionada por Shopify. Para obtener ayuda, ponte en contacto con el
[servicio de asistencia de Datadog][3].

[1]: https://www.shopify.com/
[2]: https://www.shopify.com/in/store-login
[3]: https://docs.datadoghq.com/es/help/