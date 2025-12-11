---
app_id: meraki
categories:
- red
- recopilación de logs
- seguridad
- snmp
custom_kind: integración
description: Monitoriza tu entorno de Cisco Meraki con Network Device Monitoring,
  logs y Cloud SIEM
further_reading:
- link: https://docs.datadoghq.com/network_monitoring/devices/
  tag: documentación
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: blog
  text: Monitorizar Cisco Meraki con Datadog
media: []
supported_os:
- linux
- windows
- macos
title: Cisco Meraki
---
## Información general

Esta integración proporciona una visibilidad completa de tu entorno de Cisco Meraki mediante la recopilación de métricas para [Network Device Monitoring](https://app.datadoghq.com/devices), logs de eventos de red y logs de eventos de seguridad para [Cloud SIEM](https://app.datadoghq.com/security/siem/home).

**Network Device Monitoring**

[Network Device Monitoring](https://app.datadoghq.com/devices) ayuda a garantizar que el estado general de la infraestructura de red sea el adecuado mediante la identificación de posibles cuellos de botella y errores de configuración de los dispositivos.

Esta integración recopila métricas para los siguientes dispositivos:

- _MR (Wireless Access Points):_ rastrea métricas como el recuento de clientes, el estado de la conexión y el rendimiento.
- _MS (Switches):_ monitoriza las métricas de rendimiento del conmutador, como el estado del puerto, el tráfico y las tasas de error.
- _MX (Security Appliances):_ recopila métricas sobre el estado de la VPN, las reglas del firewall y el rendimiento general del dispositivo.

Esta integración extrae dinámicamente etiquetas (tags) de dispositivos y metadatos de entornos de Meraki para explorar fácilmente grupos de dispositivos, localizaciones o tipos de dispositivos específicos.

**Security Event Logs**

Los [logs de eventos de seguridad](https://developer.cisco.com/meraki/api/get-network-appliance-security-events/) alertan sobre eventos como detecciones de intrusiones, violaciones de reglas de firewall y detecciones de amenazas de malware para ayudar a identificar y responder a posibles amenazas de seguridad.

Crea tus propias reglas o aprovecha las [reglas predefinidas de Cloud SIEM](https://app.datadoghq.com/logs/pipelines?search=meraki) para la detección de amenazas en tiempo real y la respuesta a incidents (incidentes).

**Network Event Logs**

Los [logs de eventos de red](https://developer.cisco.com/meraki/api/get-network-events/) ayudan a los administradores de red a analizar los eventos históricos de la red y a solucionar los problemas de forma eficiente.

Estos logs rastrean los siguientes temas:

- _Cambios de configuración:_ rastrea los cambios en las configuraciones de red para garantizar el cumplimiento y solucionar problemas de conexión.
- _Asociaciones de clientes:_ monitoriza las asociaciones de clientes con puntos de acceso inalámbricos para obtener información sobre la conectividad del usuario.
- _Eventos de estado de la red:_ identifica y aborda problemas que afectan el estado de la red, como la alta pérdida de paquetes en conmutadores específicos.

<br />

Además de los monitores recomendados incluidos con esta integración, se pueden configurar monitores adicionales para notificar a los administradores sobre eventos críticos, lo que permite una gestión proactiva de la red.

Para recopilar métricas de tu Meraki Cloud Controller, configura la [integración de SNMP](https://docs.datadoghq.com/integrations/snmp/) con el perfil de Meraki.

## Configuración

### Instalación

1. En la aplicación, abre el [ícono de integración de Meraki](https://app.datadoghq.com/integrations/meraki).
1. Haz clic en **+ Add Account** (+ Añadir cuenta).
1. Elige un nombre para tu cuenta de Meraki.
1. Añade una clave de la API de Meraki. Busca instrucciones sobre cómo generar una clave de la API de Meraki en la [API del Dashboard de Cisco Meraki](https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API).

### Generar la clave de API Meraki

1. Ve al dashboard de Meraki.
1. Habilita el acceso a la API en Organization > Settings > Dashboard API access (Organización > Parámetros > Acceso a la API del dashboard).
1. Ve a la página Mi perfil en el dashboard de Meraki para generar la clave.

### Recopilación de métricas

Para configurar la recopilación de métricas de NDM, se requiere una clave de API Meraki.

#### Filtros de etiquetas de dispositivos

Los filtros de etiquetas de dispositivos te permiten especificar qué dispositivos monitorizar
en NDM. Puedes especificar varias etiquetas (tags) separándolas
con una coma. Si no se especifican etiquetas (tags), se
monitorean todos los dispositivos.

### Recopilación de logs

Para configurar la recopilación de logs de eventos de red y logs de eventos de seguridad, se requiere una clave de API Meraki.

Para obtener más información, consulta la [API del dashboard de Cisco Meraki](https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access).

## Datos recopilados

### Métricas

Configura la [integración de SNMP](https://docs.datadoghq.com/integrations/snmp/) con el perfil de Meraki para recopilar métricas (con el prefijo `snmp.` en la siguiente tabla) de tus dispositivos de Meraki. Como alternativa, crea un [perfil personalizado](https://docs.datadoghq.com/network_monitoring/devices/guide/build-ndm-profile/) para recopilar métricas adicionales. Ten en cuenta que las métricas con el prefijo `meraki.` se recopilan a través de la integración de Meraki de Datadog, activada mediante las instrucciones anteriores.

| | |
| --- | --- |
| **meraki.avgLatencyMs** <br>(gauge) | La latencia media de la red en milisegundos.<br>_Se muestra en milisegundos_ |
| **meraki.clientCount** <br>(count) | El count de clientes por red.<br>_Se muestra como unidad_ |
| **meraki.devStatus** <br>(count) | El estado del dispositivo.<br>_Se muestra como unidad_ |
| **meraki.latencyMs** <br>(gauge) | La latencia de un enlace ascendente en milisegundos. Solo se admite para dispositivos MX.<br>_Se muestra como milisegundo_. |
| **meraki.lossPercent** <br>(gauge) | Porcentaje de pérdida de un enlace ascendente en una red. Solo se admite para dispositivos MX.<br>_Se muestra como porcentaje_. |
| **meraki.powerModuleStatus** <br>(count) | El estado del módulo de alimentación de un dispositivo.<br>_Se muestra como unidad_ |
| **meraki.uplinkStatus** <br>(count) | Estado de un enlace ascendente en un dispositivo. Esto es solo para dispositivos de las series MX, MG, Z en la organización.<br>_Se muestra como unidad_. |
| **meraki.utilization** <br>(count) | La utilización del canal de un AP en una red.<br>_Se muestra como porcentaje_ |
| **meraki.utilization.non_wifi** <br>(count) | La utilización del canal no wifi de un AP en una red.<br>_Se muestra como porcentaje_ |
| **meraki.utilization.wifi** <br>(count) | La utilización del canal wifi de un AP en una red.<br>_Se muestra como porcentaje_ |
| **meraki.port.status** <br>(count) | El estado de un puerto en un conmutador de Meraki.<br>_Se muestra como unidad_ |
| **meraki.devPerformanceScore** <br>(gauge) | La puntuación de rendimiento del dispositivo.<br>_Se muestra como unidad_ |
| **snmp.devStatus** <br>(gauge) | El estado de la connection (conexión) del dispositivo al Meraki Cloud Controller<br>_Se muestra como unidad_. |
| **snmp.devClientCount** <br>(gauge) | El número de clientes asociados actualmente al dispositivo<br>_Se muestra como unidad_ |
| **meraki.interface.sent** <br>(gauge) | Número de bytes enviados por cada enlace ascendente de una red.<br>_Se muestra como byte_ |
| **meraki.interface.received** <br>(gauge) | El número de bytes recibidos por cada enlace ascendente de una red.<br>_Se muestra como byte_ |
| **meraki.vpn.receivedInKb** <br>(gauge) | El número de kilobytes recibidos por cada enlace ascendente de una red.<br>_Se muestra como kilobyte_ |
| **meraki.vpn.sentInKb** <br>(gauge) | El número de kilobytes enviados por cada enlace ascendente de una red.<br>_Se muestra como kilobyte_ |
| **meraki.vpn.avgLossPercentage** <br>(gauge) | Porcentaje medio de pérdida de un enlace ascendente en una red.<br>_Se muestra como porcentaje_ |
| **meraki.vpn.minLossPercentage** <br>(gauge) | Porcentaje mínimo de pérdida de un enlace ascendente en una red.<br>_Se muestra como porcentaje_ |
| **meraki.vpn.maxLossPercentage** <br>(gauge) | Porcentaje máximo de pérdida de un enlace ascendente en una red.<br>_Se muestra como porcentaje_ |
| **meraki.vpn.avgJitter** <br>(gauge) | La fluctuación media de un enlace ascendente en una red.<br>_Se muestra en milisegundos_ |
| **meraki.vpn.minJitter** <br>(gauge) | La fluctuación mínima de un enlace ascendente en una red.<br>_Se muestra en milisegundos_ |
| **meraki.vpn.maxJitter** <br>(gauge) | La fluctuación máxima de un enlace ascendente en una red.<br>_Se muestra en milisegundos_ |
| **meraki.vpn.avgMos** <br>(gauge) | El mos medio de un enlace ascendente en una red.<br>_Se muestra como unidad_ |
| **meraki.vpn.minMos** <br>(gauge) | El mos mínimo de un enlace ascendente en una red.<br>_Se muestra como unidad_ |
| **meraki.vpn.maxMos** <br>(gauge) | El mos máximo de un enlace ascendente en una red.<br>_Se muestra como unidad_ |
| **meraki.vpn.status** <br>(count) | El estado de la VPN.<br>_Se muestra como unidad_ |
| **meraki.vpn.avgLatencyMs** <br>(gauge) | La latencia media de la red VPN en milisegundos.<br>_Se muestra en milisegundos_ |
| **meraki.vpn.maxLatencyMs** <br>(gauge) | La latencia máxima de la red VPN en milisegundos.<br>_Se muestra como milisegundo_ |
| **meraki.vpn.minLatencyMs** <br>(gauge) | La latencia mínima de la red de VPN en milisegundos.<br>_Se muestra como milisegundo_ |

### Eventos

La integración de Meraki no incluye eventos.

### Checks de servicio

La integración de Meraki no incluye checks de servicio.

## Solucionar problemas

A veces, Datadog tiene problemas para acceder a Meraki desde sus servidores. Añade las direcciones IP de Datadog a tu lista de direcciones IP permitidas para garantizar que el rastreo funcione como se espera.

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Network Device Monitoring](https://docs.datadoghq.com/network_monitoring/devices/)
- [Monitoriza Cisco Meraki con Datadog](https://www.datadoghq.com/blog/monitor-meraki/)