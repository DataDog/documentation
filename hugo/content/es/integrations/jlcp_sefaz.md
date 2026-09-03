---
algolia:
  subcategory: Integraciones del Marketplace
app_id: jlcp-sefaz
app_uuid: fc85f52c-08c0-48bc-9617-6950707c8f91
assets:
  dashboards:
    JLCPSefaz_CompactView: assets/dashboards/JLCPSefaz_CompactView.json
    JLCPSefaz_DetailedView: assets/dashboards/JLCPSefaz_DetailedView.json
    JLCPSefaz_Overview: assets/dashboards/JLCPSefaz_Overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - sefaz.can_connect
      - sefaz.response_time
      metadata_path: metadata.csv
      prefix: sefaz.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15205183
    source_type_name: JLCP Sefaz
  monitors:
    Authorizer Service is down: assets/monitors/metric_monitor.json
author:
  homepage: https://www.jlcp.com.br/
  name: JLCP
  sales_email: contato@jlcp.com.br
  support_email: contato@jlcp.com.br
  vendor_id: jlcp
categories:
- events
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jlcp_sefaz
integration_id: jlcp-sefaz
integration_title: Sefaz
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: jlcp_sefaz
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: jlcp-sefaz
  short_description: Monitorización en todos los estados de Brasil.
  unit_price: 100.0
public_title: Sefaz
short_description: Monitoriza los servicios SEFAZ en distintos estados de Brasil.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Alertas
  - Categoría::Marketplace
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitoriza los servicios SEFAZ en distintos estados de Brasil.
  media:
  - caption: 'JLCP: Información general de Sefaz'
    image_url: images/JLCPSefaz_Overview.png
    media_type: imagen
  - caption: 'JLCP: Vista compacta de Sefaz'
    image_url: images/JLCPSefaz_CompactView.png
    media_type: imagen
  - caption: 'JLCP: Vista detallada de Sefaz'
    image_url: images/JLCPSefaz_DetailedView.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Sefaz
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La integración JLCP Sefaz monitoriza la Secretaria de Estado da Fazenda (SEFAZ), que proporciona servicios de facturas electrónicas (NF-e) en diferentes estados de Brasil. La SEFAZ es responsable de la administración fiscal y de la emisión de documentos fiscales electrónicos, esenciales para el control fiscal y la legalidad de las transacciones comerciales en Brasil.

Esta integración captura datos de telemetría sobre el estado de disponibilidad de los servicios NF-e (como OK, ADVERTENCIA, CRÍTICO) y el tiempo de respuesta de cada servicio.

Los servicios monitorizados son:
- nfe_inutilizacao:  Desactivación de la numeración NF-e.
- nfe_consulta_protocolo: Consulta del protocolo NF-e.
- nfe_estado_servico: Consulta del estado del servicio NF-e.
- nfe_consulta_cadastro: Consulta del registro del contribuyente.
- nfe_recepcao_evento: Recepción de un evento NF-e.
- nfe_autorizacao: Autorización de emisión de NF-e.
- nfe_ret_autorizacao: Devolución de autorización NF-e.
- nfe_distribuicao_dfe: Distribución de documentos fiscales electrónicos.

##### Ventajas para los clientes

Esta integración te proporciona una visión completa y proactiva del estado de los servicios NF-e, que son esenciales para la emisión de facturas electrónicas en Brasil. Con esta integración, puedes identificar y resolver rápidamente los problemas de disponibilidad y rendimiento, garantizando la continuidad de las operaciones comerciales y el cumplimiento de los requisitos fiscales. La visibilidad detallada y el análisis del rendimiento proporcionados por la integración permiten la optimización de los procesos, la planificación de la capacidad de la infraestructura y la reducción de los tiempos de inactividad, lo que se traduce en una mayor eficiencia operativa y satisfacción del cliente.

## Compatibilidad

Para solicitar asistencia o funciones, ponte en contacto con JLCP Sefaz a través de [contato@jlcp.com.br][3]. Atendemos en los siguientes idiomas: inglés, español y portugués.

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: mailto:contato@jlcp.com.br

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/jlcp-sefaz" target="_blank">adquiere esta aplicación en el Marketplace</a>.