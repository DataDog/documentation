---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_square
app_id: crest-data-systems-square
categories:
- marketplace
- nube
custom_kind: integración
description: Monitorizar y visualizar eventos de Square
integration_version: 1.0.1
media:
- caption: 'Square: Eventos'
  image_url: images/cds_square_events.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Square
---
## Información general

[**Square**](https://squareup.com/) es una plataforma tecnológica empresarial que ofrece soluciones de hardware y software para el procesamiento de pagos, la gestión de inventarios, la captación de clientes y las ventas en línea, a empresas de todos los tamaños. Al aprovechar la API de **Eventos** de Square, esta integración proporciona visibilidad de las actividades empresariales y ofrece inteligencia procesable en forma de logs y eventos en Datadog.

Esta integración incluye un dashboard predefinido:

- **Square: Eventos**: Este dashboard proporciona información general de los logs de eventos de Square y fusiona las ocho áreas clave de de Square (monitorización, pagos, reembolsos, pedidos, inventario, clientes, facturas, reservas y pagos) en una vista unificada diseñada para ofrecer visibilidad e inteligencia procesable.

La integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para mejorar la monitorización y la seguridad:

1. Tendencia inusual de incumplimiento en los pagos observada en Square
1. Patrón inusual de actividades de reembolso observado en Square
1. Patrón inusual de actividades de disputa observado en Square
1. Patrón anormal de cancelación de órdenes observado en Square

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración relevante debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

Esta integración incluye un monitor:

1. Artículo agotado : Este monitor alerta cuando el recuento de un artículo del inventario llega a cero.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Preguntas frecuentes sobre integraciones Crest Data en Datadog Marketplace](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-square" target="_blank">Haz clic aquí</a> para adquirirla.