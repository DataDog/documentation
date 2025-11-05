---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-cisco-class-based-qos
app_uuid: 97f3eada-2bd0-4100-94f7-fe7f20132442
assets:
  dashboards:
    RapDev Cisco QOS Dashboard: assets/dashboards/rapdev_cisco_classbased_qos_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.cisco_class_based_qos.devices_monitored
      metadata_path: metadata.csv
      prefix: rapdev.cisco_class_based_qos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10457427
    source_type_name: cisco_class_based_qos
  logs: {}
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: sales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- mercado
- la red
- snmp
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_cisco_class_based_qos
integration_id: rapdev-cisco-class-based-qos
integration_title: Calidad de servicio (QOS) Cisco
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_cisco_class_based_qos
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.cisco_class_based_qos
  product_id: cisco
  short_description: Precio unitario por dispositivo QOS
  tag: host_qos
  unit_label: Dispositivo QOS
  unit_price: 20
public_title: Calidad de servicio (QOS) Cisco
short_description: Monitorizar el tráfico de red utilizando la Calidad de servicio
  de clase Cisco
supported_os:
- linux
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Categoría::Marketplace
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Categoría::Red
  - Categoría::SNMP
  - Categoría::Métricas
  configuration: README.md#Configuración
  description: Monitorizar el tráfico de red utilizando la Calidad de servicio de
    clase Cisco
  media:
  - caption: Dashboard QOS - Modo ligero 1/3
    image_url: images/dashboard_light_1.jpg
    media_type: imagen
  - caption: Dashboard QOS - Modo ligero 2/3
    image_url: images/dashboard_light_2.jpg
    media_type: imagen
  - caption: Dashboard QOS - Modo ligero 3/3
    image_url: images/dashboard_light_3.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Calidad de servicio (QOS) Cisco
  uninstallation: README.md#Desinstalación
---

<!--  ECXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La Calidad de servicio (QoS) en Cisco Networks es un conjunto de tecnologías y prácticas diseñadas para gestionar el tráfico y garantizar que diferentes servicios de red cumplan los requisitos de rendimiento. La QoS de Cisco implica privilegiar determinados tipos de tráfico de red sobre otros para garantizar que las aplicaciones críticas como la voz y las vídeo conferencias reciban el ancho de banda y la baja latencia que necesitan para funcionar correctamente, especialmente en momentos de congestión de la red.

Los componentes clave de la QoS Cisco incluyen:
- Clasificación y marcado: Identificar los tipos de tráfico y marcarlos para una gestión diferencial. En este proceso se inspeccionan los paquetes y se asignan a distintas clases en función de las políticas.
- Colas: Gestionar la congestión del tráfico y garantizar la gestión prioritaria del tráfico de clase superior. Para ello se utilizan algoritmos como Priority Queuing, Weighted Fair Queuing (WFQ) y Class-Based Weighted Fair Queuing (CBWFQ).
- Gestión y prevención de congestiones: Uso de herramientas como Tail Drop o Random Early Detection (RED) para evitar la congestión de red, gestionando el flujo de tráfico y descartando paquetes de forma controlada.
- Modelado y vigilancia del tráfico: Regulación del flujo de tráfico para ajustarlo a los límites de ancho de banda definidos. El Traffic Shaping suaviza el flujo de tráfico, mientras que el Policing elimina el tráfico que excede la tasa especificada.
- Mecanismos de eficiencia de enlace: Técnicas como Link Fragmentation and Interleaving (LFI) y métodos de compresión para mejorar la eficiencia del enlace de red.

La integración sondea periódicamente el dispositivo Cisco en busca de los objetos MIB seleccionados. Los datos recopilados muestran estadísticas de rendimiento y de uso de las distintas políticas de QoS, lo que permite a los administradores de red analizar los patrones de tráfico, verificar la eficacia de la política de QoS y realizar los ajustes necesarios.

La integración de la Calidad de servicio de clase Cisco monitoriza las estadísticas de [vigilancia del tráfico basada en clases][2] en tus dispositivos Cisco habilitados para SNMP. La vigilancia basada en clases te permite controlar la tasa máxima de tráfico que se transmite o recibe en una interfaz. Puedes observar las distintas clases de tráfico de red que fluyen a través de su dispositivo, tanto antes como después de la política, así como el modo en que las distintas políticas afectan a este tráfico.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][8]  
- Ventas: [sales@rapdev.io][9]  
- Chat: [rapdev.io][10]  
- Teléfono: 855-857-0222

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_plcshp/configuration/xe-16/qos-plcshp-xe-16-book/qos-plcshp-class-plc.html
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://sourceforge.net/projects/net-snmp/
[6]: https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html
[7]: https://community.cisco.com/t5/networking-knowledge-base/configuration-template-for-snmpv3/ta-p/4666450
[8]: mailto:support@rapdev.io  
[9]: mailto:sales@rapdev.io  
[10]: https://www.rapdev.io/#Get-in-touch  
[11]: https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-cisco-class-based-qos" target="_blank">adquiere esta aplicación en el Marketplace</a>.