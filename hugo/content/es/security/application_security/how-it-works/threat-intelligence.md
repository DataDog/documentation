---
aliases:
- /es/security/application_security/threats/threat-intelligence
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsando la innovación en las operaciones de seguridad'
title: Inteligencia de amenazas
---
## Descripción general {#overview}

Este tema describe la [inteligencia de amenazas][1] para App and API Protection (AAP).

Datadog proporciona [conjuntos de datos][1] de inteligencia de amenazas integrados para AAP. Esto proporciona evidencia adicional al actuar sobre la actividad de seguridad y reduce los umbrales de detección para algunas detecciones de lógica de negocio. 

Además, AAP admite *traer su propia inteligencia de amenazas*. Esta funcionalidad enriquece las detecciones con inteligencia de amenazas específica del negocio. 

## Mejores prácticas {#best-practices}

Datadog recomienda los siguientes métodos para consumir inteligencia de amenazas:

1. Reducir los umbrales de las reglas de detección para amenazas de lógica de negocio, como el relleno de credenciales (credential stuffing). Los usuarios pueden clonar la regla predeterminada de [Credential Stuffing][6] y modificarla para satisfacer sus necesidades.
2. Usar la inteligencia de amenazas como un indicador de reputación con la actividad de seguridad.

Datadog recomienda _no hacer_ lo siguiente:
1. Bloquear trazas de inteligencia de amenazas sin la actividad de seguridad correspondiente. Las direcciones IP pueden tener muchos servidores detrás de ellas. La detección de un proxy residencial significa que la actividad asociada ha sido observada por un servidor detrás de esa IP. No garantiza que el servidor que ejecuta el malware o el proxy sea el mismo servidor que se comunica con sus servicios.
2. Bloquear en todas las categorías de inteligencia de amenazas, ya que esto incluye tráfico legítimo de VPN corporativas y bloquea tráfico no malicioso.

## Filtrar por inteligencia de amenazas en AAP {#filtering-on-threat-intelligence-in-aap}

Los usuarios pueden filtrar la inteligencia de amenazas en los exploradores de Signals y Traces usando facetas y la barra de búsqueda.

Para buscar todas las trazas marcadas por una fuente específica, use la siguiente consulta con el nombre de la fuente:

    @threat_intel.results.source.name:<SOURCE_NAME> 

Para consultar todas las trazas que contienen inteligencia de amenazas de cualquier fuente, use la siguiente consulta:

    @appsec.threat_intel:true 

## Traer su propia inteligencia de amenazas {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">La opción de traer su propia inteligencia de amenazas no es compatible en {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

AAP permite enriquecer y buscar trazas con indicadores de compromiso de inteligencia de amenazas almacenados en tablas de referencia de Datadog. [Reference Tables][2] le permiten combinar metadatos con información que ya está en Datadog.

Para obtener más información, consulte la guía [Bring Your Own Threat Intelligence][14].


## Inteligencia de amenazas en la interfaz de usuario {#threat-intelligence-in-the-user-interface}

Al ver las trazas en el Explorador de trazas de AAP, puede ver los datos de inteligencia de amenazas bajo el atributo `@appsec`. Los atributos `category` y `security_activity` están configurados.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Ejemplo del atributo appsec que contiene datos de inteligencia de amenazas">}} -->

En `@threat_intel.results` siempre puede ver los detalles completos de lo que coincidió y de qué fuente.

 <!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Ejemplo del atributo threat_intel que contiene datos de inteligencia de amenazas">}} -->

## Lecturas adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/threat_intelligence/#threat-intelligence-sources
[2]: /es/integrations/guide/reference-tables
[3]: /es/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20defaultRuleId%3Adef-000-yk4
[7]: /es/security/threat_intelligence#threat-intelligence-categories
[8]: /es/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /es/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /es/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /es/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /es/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: /es/security/guide/byoti_guide