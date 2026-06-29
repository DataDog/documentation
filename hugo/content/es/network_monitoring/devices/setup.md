---
aliases:
- /es/network_monitoring/devices/getting_started/
description: Comience con sus dispositivos conectados a la red, como enrutadores,
  conmutadores, servidores y cortafuegos.
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: doc
  text: Dispositivos NDM compatibles
- link: network_monitoring/devices/data/
  tag: Doc
  text: Datos NDM recopilados
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Monitoree y diagnostique problemas de rendimiento de la red con Traps SNMP
title: Configuración
---
## Descripción general {#overview}

El Monitoreo de Dispositivos de Red le ayuda a obtener información sobre la salud y el rendimiento de sus enrutadores, conmutadores y cortafuegos locales. Después de que el Agente de Datadog esté instalado en un host que tenga acceso a la red, el Agente puede detectar automáticamente los dispositivos de red y recopilar métricas de inmediato.

Esta guía cubre la configuración de Network Device Monitoring en sus hosts, enriqueciendo las etiquetas de los dispositivos, configurando y visualizando perfiles de dispositivos, visualizando datos en NetFlow Monitoring y validando datos en los tableros y el Mapa de Topología de Dispositivos proporcionados.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="La página de inicio de Network Device Monitoring, mostrando gráficos e interfaces." style="width:100%;" >}}

## Cómo funciona {#how-it-works}

El siguiente diagrama ilustra el flujo de datos entre Syslog, traps SNMP e información de NetFlow. Los dispositivos envían la información relevante al Agente de Datadog a través de los puertos como se muestra en el diagrama (los puertos se pueden cambiar si es necesario mediante la configuración en el Agente). Para integraciones basadas en API, el Agente de Datadog se conecta con los controladores o administradores de software del proveedor de dispositivos de red en las instalaciones o en la nube según las instrucciones específicas `https` de integraciones API por proveedor. El Agente de Datadog, configurado con NDM y desplegado en las instalaciones o en la nube, consolida todos los datos de dispositivos y red recopilados de su red y los envía a Datadog a través de HTTPS en el puerto `443`. Esto proporciona una observabilidad unificada y de pila completa de métricas, registros, trazas, monitores y tableros.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Diagrama NDM mostrando el flujo para la recopilación de Syslog, traps y Netflow." style="width:90%;" >}}

## Próximos pasos {#next-steps}

Siga las instrucciones a continuación para configurar Datadog para monitorear sus dispositivos de red.

## Requisitos previos {#prerequisites}

### Instalar el Agente {#install-the-agent}

Navegue a la [página de instalación del Agente][1] e instale el [Agente de Datadog][2] en su host (generalmente un servidor que **no** es el dispositivo monitoreado).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="La página de configuración del Agente, destacando la instalación en Ubuntu." style="width:100%;" >}}

## Configuración {#setup}

### Alta Disponibilidad {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El soporte de Alta Disponibilidad del Agente de Datadog no está disponible para su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

El soporte de Alta Disponibilidad (HA) del Agente de Datadog en el Monitoreo de Dispositivos de Red le permite designar un Agente activo y un Agente en espera, asegurando un failover automático si el Agente activo encuentra un problema. Esta configuración elimina al Agente como un único punto de falla, manteniendo un monitoreo continuo durante incidentes inesperados o mantenimiento programado, como actualizaciones de sistema operativo y actualizaciones del Agente.

Puede configurar Agentes activos y en espera para funcionar como un par de HA en NDM. Si el Agente activo falla, el Agente en espera toma el control en 90 segundos, convirtiéndose en el nuevo Agente activo. Además, puede designar un Agente activo preferido, permitiendo que NDM vuelva automáticamente a él una vez que esté disponible nuevamente. Esta función permite el cambio proactivo de Agentes antes del mantenimiento programado.

Para más información, consulte el [soporte de Alta Disponibilidad del Agente de Datadog][20].

### Configuración {#configuration}

Para comenzar a monitorear sus dispositivos de red, habilite el monitoreo SNMP utilizando uno de los siguientes métodos:

[Dispositivos individuales][3]
: Configura el seguimiento SNMP en sus dispositivos individuales.

[Autodiscovery][4]
: Configura el seguimiento SNMP utilizando Autodiscovery.

[Ping][5]
: Configura la verificación SNMP para enviar pings ICMP a tus dispositivos.

[Syslog][22]
: Configura tus dispositivos para enviar mensajes Syslog.

[VPN Monitoring][21]
: Configura el seguimiento de VPN para comenzar a realizar el seguimiento de los túneles VPN de sus dispositivos.

### Enriquece los dispositivos de red con etiquetas {#enrich-network-devices-with-tags}

Después de que NDM esté configurado en tus dispositivos, puedes enriquecerlos aún más agregando etiquetas de dispositivos de red utilizando los siguientes métodos:

[Datadog Agent][2]
: El Agente puede recopilar etiquetas de dispositivos al configurar [dispositivos individuales][3] o con [Autodiscovery][4].

[Device profiles][6]
: Configura el Agente para recopilar y personalizar métricas y etiquetas específicas creando perfiles de dispositivos directamente en la aplicación.

[ServiceNow integration][7]
: Enriquece dinámicamente los dispositivos de red monitoreados por Datadog Network Device Monitoring con datos definidos en la CMDB (Base de Datos de Gestión de Configuración) de ServiceNow.

[Network Device Monitoring API](#use-the-network-api)
: Utiliza la Network Device Monitoring API para agregar etiquetas a tus dispositivos de red de manera programática.

### Personaliza métricas y etiquetas {#customize-metrics-and-tags}

Personaliza métricas y etiquetas en tus dispositivos consultando la página de [Dispositivos Soportados][9] para ver los perfiles de dispositivo listos para usar. Si deseas editar o agregar más métricas, las siguientes opciones están disponibles:

[Perfiles de dispositivo][10]
: Edita directamente métricas y etiquetas en el archivo del Datadog Agent `yaml` con perfiles de dispositivo.

[Autorización de perfil basada en GUI][6]
: Aprovecha la experiencia de incorporación de dispositivos basada en GUI de Datadog Network Monitoring, donde puedes agregar métricas y etiquetas personalizadas a tus dispositivos.

### NetFlow Monitoring {#netflow-monitoring}

Configura [NetFlow Monitoring][11] para visualizar y monitorear tus registros de flujo desde tus dispositivos habilitados para NetFlow.

{{< img src="network_device_monitoring/netflow/home.png" alt="La página de NetFlow Monitoring contiene pestañas para las principales fuentes, destinos, protocolos, puertos de origen, puertos de destino y tendencias de dispositivos." style="width:100%;" >}}

## Valida tus datos {#validate-your-data}

- Comienza a monitorear toda tu infraestructura de red en la página de [Dispositivos de Red][12].
- Consulta las métricas recopiladas en los paneles listos para usar de Datadog:
  - [Resumen de todos los dispositivos monitoreados][13]
  - [Rendimiento de las interfaces en tus dispositivos de red][14]
- Utiliza el [Mapa de Topología de Dispositivos de Red][15] para identificar y solucionar problemas con tus dispositivos.

## Utiliza la API de Red {#use-the-network-api}

- Utiliza la [API de Red][8] para extraer la siguiente información sobre tus dispositivos de red:
  * [Obtén la lista de interfaces para tus dispositivos.][16]
  - [Obtén la lista de etiquetas para tus dispositivos.][17]
  - [Actualiza la lista de etiquetas para tus dispositivos.][18]

## Solución de problemas {#troubleshooting}

- Consulte la página de [Solución de problemas][19] de Network Device Monitoring para obtener más información sobre cómo resolver los problemas de NDM.


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent
[3]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /es/network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /es/network_monitoring/devices/ping
[6]: /es/network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/es/integrations/servicenow/#network-device-tagging
[8]: /es/api/latest/network-device-monitoring/
[9]: /es/network_monitoring/devices/supported_devices
[10]: /es/network_monitoring/devices/profiles
[11]: /es/network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /es/network_monitoring/devices/device_topology_map
[16]: /es/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /es/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /es/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /es/network_monitoring/devices/troubleshooting
[20]: /es/integrations/guide/high_availability
[21]: /es/network_monitoring/devices/vpn_monitoring
[22]: /es/network_monitoring/devices/syslog