---
aliases:
- /es/security/threat_intel
description: Inteligencia de amenazas en Datadog
further_reading:
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: documentación
  text: Inteligencia de amenazas de AAP
- link: /security/cloud_siem/threat_intelligence/
  tag: documentación
  text: Inteligencia de amenazas de Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: Blog
  text: Cómo investigar el compromiso de credenciales en la nube con Bits Security
    Analyst
- link: https://www.datadoghq.com/blog/bits-threat-hunting/
  tag: Blog
  text: Automatice la búsqueda de amenazas con Datadog Cloud SIEM
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Inteligencia de amenazas
---
{{< product-availability >}}

## Descripción general {#overview}

La inteligencia de amenazas es información de reputación que ayuda a los equipos de respuesta a tomar decisiones informadas sobre ataques y violaciones de seguridad.

Datadog organiza indicadores de compromiso de inteligencia de amenazas comerciales, de código abierto e internos en categorías e intenciones. La inteligencia de amenazas se actualiza al menos una vez al día, por fuente. Estos datos se utilizan para enriquecer sus registros y trazas con información de reputación relevante.

## Traiga su propia inteligencia de amenazas {#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Traiga su propia inteligencia de amenazas no es compatible con {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

Datadog Security admite el enriquecimiento y la búsqueda de trazas con indicadores de compromiso de inteligencia de amenazas almacenados en tablas de referencia de Datadog. [Reference Tables][2] le permite combinar metadatos con información que ya está en Datadog.

La cantidad de tiempo que la inteligencia de amenazas persiste como un enriquecimiento disponible varía según la fuente:
- Fuentes basadas en OEM e integración: 24 horas
  - Datadog vuelve a adquirir inteligencia de amenazas de estos proveedores al menos una vez al día, y depende del proveedor para conservar la información de inteligencia de amenazas
- Traiga su propia inteligencia de amenazas: el tiempo que usted configure para que la inteligencia esté disponible

Para obtener más información, consulte la guía [Traiga su propia inteligencia de amenazas][3].

## Ciclo de vida de la inteligencia de amenazas {#threat-intelligence-lifecycle}

Datadog recopila inteligencia de amenazas en los siguientes tipos de entidades. Cada tipo de entidad tiene características únicas y un marco de tiempo útil. Este marco temporal, o ciclo de vida, requiere consideración al evaluar la importancia de una coincidencia de inteligencia de amenazas en sus datos.

### Hashes de archivo: Huellas digitales únicas {#file-hashes-unique-digital-fingerprints}

Los hashes de archivo funcionan como huellas digitales únicas para archivos específicos. Cuando un hash de archivo se marca como malware, significa que el contenido exacto del archivo es dañino. La inmutabilidad de un hash, que está vinculada al contenido de su archivo, asegura su identificación consistente. Como resultado, un hash de archivo etiquetado como malware conserva esta identificación, siempre que la identificación haya sido un verdadero positivo.

### Paquetes de aplicaciones: Riesgo de malware en la distribución {#application-packages-malware-risk-in-distribution}

A diferencia de los hashes de archivo inmutables, los paquetes de aplicaciones pueden variar en contenido y seguridad, incluso bajo el mismo número de versión. Los actores maliciosos pueden cargar paquetes dañinos que imitan a los legítimos, o pueden comprometer paquetes existentes introduciendo malware. El ciclo de vida de los paquetes maliciosos es frecuentemente duradero, pero no inmutable.

### Dominios: Firmas temporales {#domains-temporary-signatures}

A diferencia de los hashes de archivo, los dominios identificados como maliciosos están sujetos a cambios. Pueden someterse a procesos como remediación, reasignación o reutilización por parte de diversas entidades. Si bien el ciclo de vida de los dominios maliciosos o sospechosos es algo prolongado en comparación con las direcciones IP, sigue siendo temporal y variable.

### Direcciones IP: Dinámicas y transitorias {#ip-addresses-dynamic-and-transient}

Las direcciones IP representan el elemento más volátil en la inteligencia de amenazas, cambiando a menudo su reputación dentro de un ciclo de 24 horas. Dada su naturaleza dinámica, particularmente en redes residenciales y móviles donde pueden estar involucrados múltiples servidores, es crucial reevaluar regularmente su estado. No todos los servidores conectados a una dirección IP de baja reputación son inherentemente maliciosos, lo que subraya la necesidad de correlación.

## Mejores prácticas en inteligencia de amenazas {#best-practices-in-threat-intelligence}

Con la inteligencia de amenazas, la reputación es clave, pero debe sopesarse junto con otras evidencias. No se recomienda depender únicamente de la inteligencia de amenazas de IP y dominios para bloquear el tráfico, salvo en pocas excepciones. Es esencial un enfoque equilibrado y basado en evidencia.

La inteligencia de amenazas utilizada en [Reglas de detección][1] debe hacer referencia a las claves de Datadog, como la categoría (`@threat_intel.results.category`) y la intención (`@threat_intel.results.intention`). No se deben utilizar otras claves.

## Transparencia en la inteligencia de amenazas {#transparency-in-threat-intelligence}

Datadog garantiza la transparencia al proporcionar enlaces externos a fuentes de inteligencia de amenazas externas asociadas con una detección. La inteligencia de amenazas curada por Datadog se ingesta en la plataforma Datadog para su enriquecimiento y detección. Datadog no envía datos de clientes a fuentes de inteligencia de amenazas.

Las detecciones y enriquecimientos son accesibles en la interfaz de usuario y en el JSON de eventos.

## Facetas de inteligencia de amenazas {#threat-intelligence-facets}

Las fuentes, categorías e intenciones están disponibles como facetas y filtros en los exploradores de productos relevantes.

### Fuentes de inteligencia de amenazas {#threat-intelligence-sources}

| Fuente | Categoría | Casos de uso de la fuente | Productos principales |
|--------|------------|-----------|------------------|
| Investigación de amenazas de Datadog| escáneres, explotación de Redis, explotación de Docker, malware, fuerza bruta | Honeypots enfocados en amenazas específicas de software | AAP, CWS y Cloud SIEM |
| [Datadog AAP](https://docs.datadoghq.com/es/security/application_security/) | escáner | Lista de IPs que se han observado atacando a múltiples clientes de AAP | AAP |
| [Spur](https://spur.us/) | residential_proxy | Fraude y relleno de credenciales asociados con proxies | AAP y Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | Proxies asociados con comando de malware y control | Cloud SIEM y Workload Protection |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| malware | Malware en servidores | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | criptominería | Actividad de coinminer con pools de minería conocidos| Workload Protection y Cloud SIEM |
| Tor | tor | Violaciones de políticas para la actividad del usuario | App y API Protection, Cloud SIEM y Workload Protection |
| [Threatfox](https://threatfox.abuse.ch/) | malware | Identificar servidores que se comunican con infraestructura de malware conocida | Cloud SIEM y Workload Protection |


### Categorías de inteligencia de amenazas {#threat-intelligence-categories}

| Categoría | Intención | Tipos de entidad | Casos de uso del producto | Productos principales |
|----------|----------|--------------|----------|------------------|
| residential_proxy | sospechoso | direcciones IP | Reputación para relleno de credenciales y fraude | AAP y Cloud SIEM |
| botnet_proxy | sospechoso | direcciones IP | Reputación por ser parte de una botnet y contribuir a ataques distribuidos | AAP y Cloud SIEM |
| malware | malicioso | versiones de bibliotecas de aplicaciones, hashes de archivos | Paquetes maliciosos y comunicación con grupos de minería| CWS |
| scanner | sospechoso | direcciones IP | Reputación para escáneres | API Protection, Workload Protection y Cloud SIEM |
| hosting_proxy | sospechoso | direcciones IP | IP de centro de datos con reputación de abuso, como para ataques distribuidos de relleno de credenciales | AAP y Cloud SIEM |
| tor | sospechoso | direcciones IP | Violaciones de políticas corporativas para la actividad del usuario | API Protection, Workload Protection y Cloud SIEM |
| disposable_email | sospechoso | Dominio | Detectar el uso del producto desde direcciones de correo electrónico desechables | AAP |
| corp_vpn | benigno | direcciones IP | IP asociadas a VPN corporativas | AAP y Cloud SIEM |
| cryptomining | malicioso | direcciones IP | Direcciones IP asociadas con actividades de criptominería | AAP, CWS y Cloud SIEM |

### Intenciones de inteligencia de amenazas {#threat-intelligence-intents}

| Intención | Caso de uso |
|------------|----------------------------------------------|
| benigno | VPN corporativas y enriquecimientos informativos |
| sospechoso | Baja reputación |
| malicioso | Reputación maliciosa |


## Tipos de entidad {#entity-types}
| Tipo de entidad | Ejemplo | Casos de uso |
|-------------|---------|-----------------------------|
| Direcciones IP | 128.66.0.1 | Identificar direcciones IP asociadas con ataques, comando y control, y actividad de escaneo |
| dominios | example.com, subdomain.example.com | Dominios asociados con uso malicioso. A menudo se utiliza con malware como comando y control |
| versiones de paquetes de aplicaciones | (example_package, 1.0.0) | Identificar paquetes maliciosos descargados de PyPi |
| hashes de archivo [SHA1, SHA256, ssdeep (solo Workload Protection)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identificar un archivo distinto asociado con malware o compromiso |

<div class="alert alert-info">Las fuentes y categorías de inteligencia de amenazas no son configurables.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/detection_rules/
[2]: /es/integrations/guide/reference-tables
[3]: /es/security/guide/byoti_guide