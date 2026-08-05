---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-snmp-trap-logs
app_uuid: 754df420-1cf8-4742-b98c-9d3a76f83c41
assets:
  dashboards:
    RapDev SNMP Trap Logs: assets/dashboards/rapdev_snmp_trap_logs_dashboard.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- network
- snmp
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snmp_trap_logs
integration_id: rapdev-snmp-trap-logs
integration_title: SNMP Trap Logs
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snmp_trap_logs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: snmp-trap-logs
  short_description: Tarifa plana de esta integración
  unit_price: 1000
public_title: SNMP Trap Logs
short_description: Convierte mensajes de trampas SNMP en logs de Datadog
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::Red
  - Categoría::SNMP
  - Sistema operativo compatible::Linux
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Convierte mensajes de trampas SNMP en logs de Datadog
  media:
  - caption: RapDev SNMP Trap Logs
    image_url: images/1.png
    media_type: imagen
  - caption: Mensajes de log de trampas SNMP
    image_url: images/2.png
    media_type: imagen
  - caption: Trampa SNMP analizada
    image_url: images/3.png
    media_type: imagen
  - caption: Dashboard de log de trampas SNMP
    image_url: images/4.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  support: README.md#Soporte
  title: SNMP Trap Logs
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->
## Información general
El paquete de RapDev SNMP Trap Logs permite convertir mensajes de trampas SNMP en logs de Datadog para miles de dispositivos SNMP diferentes. Hemos recopilado tantos archivos MIB como pudimos y los hemos convertido a un formato que permite la traducción de mensajes de trampas SNMP en mensajes de log legibles para humanos.

Este paquete cuenta con un script de instalación a fin de configurar Logstash como un receptor de trampas SNMP, con las configuraciones adecuadas y los archivos MIB para traducir tus mensajes, lo que te permite alertar sobre eventos de red en Datadog.

Para obtener una lista de todas las MIBs que se incluyen con este paquete, consulta el [archivo mib_yamls.txt][4].

## Ayuda

Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Correo electrónico: [support@rapdev.io][7]
- Chat: [rapdev.io][3]
- Teléfono: 855-857-0222

### Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar y diagnosticar problemas de rendimiento de la red con trampas SNMP][8]

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://docs.datadoghq.com/es/logs/guide/enrichment-tables
[2]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#log-message-remapper
[3]: https://www.rapdev.io/#Get-in-touch
[4]: https://files.rapdev.io/datadog/configs/mib_yamls.txt
[5]: mailto:sales@rapdev.io
[6]: https://mibs.observium.org
[7]: mailto:support@rapdev.io
[8]: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-trap-logs" target="_blank">adquiere esta aplicación en el Marketplace</a>.