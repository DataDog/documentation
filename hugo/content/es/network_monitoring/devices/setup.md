---
aliases:
- /es/network_monitoring/devices/getting_started/
description: Comience a utilizar sus dispositivos conectados a la red, como enrutadores,
  switches, servidores y firewalls.
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: doc
  text: Dispositivos NDM compatibles
- link: network_monitoring/devices/data/
  tag: Doc
  text: Datos recopilados de NDM
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Haga un seguimiento y un diagnóstico de problemas de rendimiento de la red
    con capturas SNMP
title: Configuración
---
## Descripción general {#overview}

Network Device Monitoring le ayuda a obtener información sobre el estado y el rendimiento de sus enrutadores, switches y firewalls locales. Después de instalar el Datadog Agent en un servidor que tiene acceso a la red, el Agent puede detectar automáticamente los dispositivos de red y recopilar métricas de inmediato.

Esta guía cubre la configuración de Network Device Monitoring en sus servidores, el enriquecimiento de etiquetas de dispositivos, la configuración y visualización de perfiles de dispositivos, la visualización de datos en NetFlow Monitoring y la validación de datos en los dashboards y el mapa de topología de dispositivos proporcionados.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="La página de inicio de Network Device Monitoring, que muestra gráficos e interfaces." style="width:100%;" >}}

## Cómo funciona {#how-it-works}

El siguiente diagrama ilustra el flujo de datos entre Syslog, SNMP traps e información de NetFlow. Los dispositivos envían la información relevante al Datadog Agent a través de los puertos como se muestra en el diagrama (los puertos se pueden cambiar si es necesario mediante la configuración en el Agent). Para las integraciones basadas en API, el Datadog Agent se conecta con los controladores o administradores de software del proveedor del dispositivo de red, ya sea de forma local o en la nube, según las `https` instrucciones de integración de API por proveedor. El Datadog Agent, configurado con NDM e implementado de forma local o en la nube, consolida todos los datos recopilados de los dispositivos y la red desde su red y los envía a Datadog a través de HTTPS en el puerto `443`. Esto proporciona una observabilidad unificada de pila completa de métricas, logs, trazas, monitores y dashboards.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Diagrama de NDM que muestra el flujo para la recopilación de Syslog, traps y Netflow." style="width:90%;" >}}

## Próximos pasos {#next-steps}

Siga las instrucciones a continuación para configurar Datadog para hacer un seguimiento de sus dispositivos de red.

## Requisitos previos {#prerequisites}

### Instale el Agent {#install-the-agent}

Navegue a la [página de instalación del Agent][1] e instale el [Datadog Agent][2] en su servidor (generalmente un servidor que **no** es el dispositivo monitoreado).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="La página de configuración del Agent, destacando la instalación en Ubuntu." style="width:100%;" >}}

## Configuración {#setup}

### Alta disponibilidad {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> El soporte de alta disponibilidad del Datadog Agent no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ("{{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

El soporte de alta disponibilidad (HA) del Datadog Agent en Network Device Monitoring le permite designar un Agent activo y un Agent en espera, lo que garantiza una conmutación por error automática si el Agent activo encuentra un problema. Esta configuración elimina al Agent como un punto único de falla, manteniendo el monitoreo continuo durante incidentes inesperados o mantenimiento planificado, como actualizaciones del SO y actualizaciones del Agent.

Puede configurar Agents activos y en espera para que funcionen como un par de alta disponibilidad (HA) en NDM. Si el Agent activo falla, el Agent en espera toma el control en un plazo de 90 segundos, convirtiéndose en el nuevo Agent activo. Además, puede designar un Agent activo preferido, lo que permite que NDM vuelva a él automáticamente una vez que esté disponible nuevamente. Esta función permite el cambio proactivo de Agent antes del mantenimiento programado.

Para obtener más información, consulte [High Availability support of the Datadog Agent][20].

### Configuración {#configuration}

Para comenzar a monitorear sus dispositivos de red, habilite el monitoreo SNMP usando uno de los siguientes métodos:

[Dispositivos individuales][3]
: Configure el monitoreo SNMP en sus dispositivos individuales.

[Autodiscovery][4]
: Configure el monitoreo SNMP usando Autodiscovery.

[Ping][5]
: Configure la verificación SNMP para enviar pings ICMP a sus dispositivos.

[Syslog][22]
: Configure sus dispositivos para enviar mensajes de Syslog.

[VPN Monitoring][21]
: Configure el monitoreo de VPN para comenzar a monitorear los túneles VPN de sus dispositivos.

### Enriquezca los dispositivos de red con etiquetas {#enrich-network-devices-with-tags}

Después de configurar NDM en sus dispositivos, puede enriquecerlos aún más agregando etiquetas de dispositivos de red usando los siguientes métodos:

[Datadog Agent][2]
: El Agent puede recopilar etiquetas de dispositivo al configurar [dispositivos individuales][3] o con [Autodiscovery][4].

[Perfiles de dispositivo][6]
: Configure el Agent para recopilar y personalizar métricas y etiquetas específicas creando perfiles de dispositivo directamente en la aplicación.

[Integración de ServiceNow][7]
: Enriquezca dinámicamente los dispositivos de red monitoreados por Datadog Network Device Monitoring con datos definidos en la CMDB (Base de datos de gestión de configuración) de ServiceNow.

Página del dispositivo
: En la página de un dispositivo, haga clic en {{< ui >}}Device Settings{{< /ui >}}, abra la pestaña {{< ui >}}Tags{{< /ui >}} y haga clic en {{< ui >}}Edit Tags{{< /ui >}} en la sección {{< ui >}}User{{< /ui >}}. Un dispositivo admite hasta 20 etiquetas de usuario de forma predeterminada. Para solicitar un límite mayor para su organización, [contacte a Soporte][23].

[Network Device Monitoring API](#use-the-network-api)
: Utilice la API de Network Device Monitoring para agregar etiquetas a sus dispositivos de red mediante programación.

### Personalice métricas y etiquetas {#customize-metrics-and-tags}

Personalice las métricas y etiquetas en sus dispositivos consultando la página [Dispositivos compatibles][9] para ver los perfiles de dispositivo predeterminados. Si desea editar o agregar más métricas, las siguientes opciones están disponibles:

[Perfiles de dispositivo][10]
: Edite directamente las métricas y etiquetas en el archivo `yaml` del Datadog Agent con perfiles de dispositivo.

[Creación de perfiles basada en GUI][6]
: Aproveche la experiencia de incorporación de dispositivos basada en la interfaz gráfica de usuario de Datadog Network Monitoring, donde puede agregar métricas y etiquetas personalizadas a sus dispositivos.

### NetFlow Monitoring {#netflow-monitoring}

Configure [NetFlow Monitoring][11] para visualizar y monitorear sus registros de flujo desde sus dispositivos habilitados para NetFlow.

{{< img src="network_device_monitoring/netflow/home.png" alt="La página de NetFlow Monitoring que contiene pestañas para los principales orígenes, destinos, protocolos, puertos de origen, puertos de destino y tendencias de dispositivos" style="width:100%;" >}}

## Valide sus datos {#validate-your-data}

- Comience a hacer un seguimiento de toda su infraestructura de red en la página [Dispositivos de red][12].
- Vea las métricas recopiladas en los tableros preconfigurados de Datadog:
  - [Descripción general de todos los dispositivos monitoreados][13]
  - [Rendimiento de las interfaces en sus dispositivos de red][14]
- Utilice el [Mapa de topología de dispositivos][15] de red para identificar y solucionar problemas con sus dispositivos.

## Utilice la API de red {#use-the-network-api}

- Utilice la [API de red][8] para extraer la siguiente información sobre sus dispositivos de red:
  * [Obtenga la lista de interfaces para sus dispositivos.][16]
  - [Obtenga la lista de etiquetas para sus dispositivos.][17]
  - [Actualice la lista de etiquetas para sus dispositivos.][18]

## Solución de problemas {#troubleshooting}

- Consulte la página de [Solución de problemas][19] de dispositivos de red para obtener más información sobre cómo solucionar sus problemas de NDM.


## Lecturas adicionales {#further-reading}

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
[23]: /es/help/