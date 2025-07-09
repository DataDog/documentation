---
aliases:
- /es/network_monitoring/performance/overview_page
description: La página de información general de Cloud Network Monitoring (CNM) en
  la interfaz de usuario de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
title: Página de información general
---

## Información general

En la [página de información general de CNM][3], se brinda una vista global de tu red, desde el tráfico de red costoso hasta el estado del DNS y los elementos más activos del servicio. Utiliza la página de información general para filtrar el tráfico de red por entorno o equipo con etiquetas (tags), ajustar el marco temporal de los datos de red e investigar el tráfico más caro. 

{{< img src="/network_performance_monitoring/overview_page/cnm_overview_page_2.png" alt="La página de información general de la red en Datadog" style="width:110%;">}}

## Tráfico de red externo

Utiliza la sección **External Network Traffic** (Tráfico de red externo) para obtener una vista global del tráfico de red costoso. El tráfico de salida de tu red es una fuente común de costes, por lo que determinar qué endpoints externos reciben la mayor cantidad de tráfico es útil para asegurarte de que el volumen de tráfico se mantenga dentro de un rango esperado. Por ejemplo, en **Top AWS gateway users** (Usuarios principales de la gateway de AWS), se muestran los endpoints principales que se comunican con una AWS Internet Gateway o una AWS NAT Gateway. En **AWS PrivateLink eligible traffic** (Tráfico apto para AWS PrivateLink), se muestra el tráfico que puede aprovechar AWS PrivateLink para reducir el coste general del tráfico.  

Para profundizar en cualquiera de estas áreas, haz clic en el botón **View in Analytics** (Ver en Análisis) en la parte inferior derecha de cada sección de la página de información general. Se abrirá la página Analytics (Análisis) con la consulta rellenada previamente para que puedas seguir investigando los datos.

{{< img src="/network_performance_monitoring/overview_page/external_network_traffic.png" alt="La sección de tráfico de red externo de la página de información general con la opción View in Analytics (Ver en Análisis) resaltada" style="width:90%;">}}

## Elementos más activos de aplicaciones y dependencias

En **Application and Dependency Top Talkers** (Elementos más activos de aplicaciones y dependencias), puedes seleccionar un endpoint específico en tu red y ver las principales fuentes de tráfico ascendente y descendente del endpoint. Selecciona **See all Dependencies** (Ver todas las dependencias) para ver las dependencias más altas de tráfico tanto ascendente como descendente del endpoint y alternar entre la vista de gráficos de ([series temporales][1]) y la vista de [lista de principales][2] del marco temporal seleccionado.

{{< img src="/network_performance_monitoring/overview_page/application_dependency_top_talkers.png" alt="La sección Application and Dependency Top Talkers (Elementos más activos de aplicaciones y dependencias) de la página de información general" style="width:90%;">}}

## Estado del DNS

En la sección **DNS Health** (Estado del DNS), se brinda una vista global de las llamadas principales al DNS por dominio o cliente consultado, o ambos. Mira los dominios más consultados, los clientes principales que realizan consultas al DNS o una combinación de ambos, y comprueba los iconos de cambio para ver si se han producido cambios inesperados en el marco temporal seleccionado. 

También puedes ver las llamadas principales de los errores comunes del DNS, como NXDOMAIN, tiempos de espera y SERVFAIL. Busca las combinaciones principales de consulta de cliente a DNS que resultan en cualquier tipo de error típico, y mira cómo ha cambiado esa tasa de error a lo largo del marco temporal seleccionado. Esto ayuda a identificar errores inusuales del DNS que pueden requerir investigación, en especial al solucionar problemas si surge un incidente.

{{< img src="/network_performance_monitoring/overview_page/dns_health.png" alt="La sección DNS Health (Estado del DNS) de la página de información general" style="width:90%;">}}

## Identificar las fuentes de tráfico principales

En la sección **Identify Top Traffic Sources** (Identificar las fuentes de tráfico principales), se muestra el tráfico en diferentes fuentes, como zona de disponibilidad, equipo, proveedor de nube o región, dependiendo de cómo etiquetes tus datos. Ver el tráfico de la zona de disponibilidad (AZ), por ejemplo, puede ayudar a iniciar una investigación sobre la reducción de costes en la nube, ya que el tráfico entre zonas de disponibilidad es un gasto común. Haz clic en el botón **View in Analytics** (Ver en Análisis) e investiga más para descubrir qué servicios constituyen la mayor parte del tráfico entre zonas de disponibilidad. Puedes utilizar esta sección para explorar de forma similar el tráfico entre equipos, entre proveedores de nube o entre regiones.

{{< img src="/network_performance_monitoring/overview_page/top_traffic_sources.png" alt="La sección Identify Top Traffic Sources (Identificar las fuentes de tráfico principales) de la página de información general" style="width:90%;">}}

## Para leer más
{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/dashboards/widgets/timeseries/
[2]: /es/dashboards/widgets/top_list/
[3]: https://app.datadoghq.com/network/overview