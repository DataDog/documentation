---
aliases:
- /es/security/threat_intel
description: Información sobre amenazas en Datadog
further_reading:
- link: /security/application_security/threats/threat-intelligence/
  tag: documentation
  text: Información sobre amenazas ASM
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Amenazas CSM
  url: /security/threats/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Información sobre amenazas
---

{{< product-availability >}}

## Información general
La información sobre amenazas es información sobre reputación que ayuda a los responsables a tomar decisiones informadas sobre ataques y riesgos.

Datadog clasifica los indicadores de información sobre amenazas comerciales, de código abierto y propias en categorías e intenciones. La información sobre amenazas se actualiza al menos una vez al día, por fuente. Estos datos se utilizan para enriquecer logs y trazas (traces) con información de reputación relevante.

## Ciclo de vida de la información sobre amenazas

Datadog recopila información sobre amenazas en los siguientes tipos de entidades. Cada tipo de entidad tiene características únicas y un marco temporal útil. Este marco temporal, o ciclo de vida, requiere consideración a la hora de evaluar la importancia de una coincidencia de información sobre amenazas en tus datos.

### Hashes de archivos: Huellas digitales únicas

Función de hashes de archivos como huellas digitales únicas de archivos específicos. Cuando el hash de un archivo se marca como malware, significa que el contenido exacto del archivo es dañino. La inmutabilidad de un hash, que esta vinculado al contenido de tu archivo, garantiza su identificación constante. Como resultado, un hash de archivo marcado como malware conserva esta identificación, siempre que la identificación haya sido un verdadero positivo.

### Paquetes de aplicaciones: Riesgo de malware en la distribución

A diferencia de los hashes de archivos inmutables, los paquetes de aplicaciones pueden variar en contenido y seguridad, incluso bajo el mismo número de versión. Los actores maliciosos pueden subir paquetes dañinos que imitan a los legítimos o pueden comprometer los paquetes existentes introduciendo malware. El ciclo de vida de los paquetes maliciosos suele ser largo, pero no inmutable.

### Dominios: Firmas temporales

A diferencia de los hashes de archivos, los dominios identificados como maliciosos están sujetos a cambios. Pueden sufrir procesos como remediación, reasignación o reutilización por parte de diversas entidades. Aunque el ciclo de vida de los dominios maliciosos o sospechosos es algo más prolongado que el de las direcciones IP, sigue siendo temporal y variable.

### Direcciones IP: Dinámicas y transitorias

Las direcciones IP representan el elemento más volátil de la información sobre amenazas, ya que a menudo cambian de reputación en un ciclo de 24 horas. Dada su naturaleza dinámica, especialmente en las direcciones residenciales y redes móviles en las que pueden estar implicados múltiples hosts, es crucial reevaluar regularmente su estado. No todos los hosts conectados a una dirección IP de baja reputación son intrínsecamente maliciosos, lo que subraya la necesidad de correlación.

## Prácticas recomendadas para la información sobre amenazas

Con la información sobre amenazas, la reputación es clave, pero debe examinarse junto con otras pruebas. No se recomienda confiar únicamente en la información de IP y de dominio para bloquear el tráfico, salvo en contadas excepciones. Es esencial un enfoque equilibrado y basado en pruebas.

La información sobre amenazas utilizada por las [reglas de detección][1] debe hacer referencia a las claves de Datadog, como categoría (`@threat_intel.results.category`) e intención (`@threat_intel.results.intention`). No deben utilizarse otras claves.

## Transparencia en la información sobre amenazas

Datadog garantiza la transparencia proporcionando enlaces externos a fuentes externas de información sobre amenazas asociadas a una detección. La información sobre amenazas clasificada por Datadog se ingiere en la plataforma Datadog para su enriquecimiento y para la detección. Datadog no envía datos de clientes a fuentes de información sobre amenazas.

Las detecciones y enriquecimientos son accesibles en la interfaz de usuario y el evento JSON.

## Facetas de la información sobre amenazas

Las fuentes, categorías e intenciones están disponibles como facetas y filtros en los exploradores de productos relevantes.

### Fuentes de información sobre amenazas

| Origen | Categoría | Casos de uso de fuentes | Productos primarios |
|--------|------------|-----------|------------------|
| Investigación de amenazas Datadog| analizadores, exploits | Honeypots centrados en amenazas específicas del software | ASM y CWS |
| [Spur](https://spur.us/) | residential_proxy | Proxies asociados al relleno de credenciales y el fraude | ASM y Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | Proxies asociados al mando y al control de malwares | Cloud SIEM |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| malware | Malware en hosts | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | malware | Actividad de coinminers con pools de minería conocidos| CWS |
| Tor | tor | Infracciones de políticas por actividad de usuario | AWS, Cloud SIEM y CWS |

### Categorías de información sobre amenazas

| Categoría | Intención | Tipos de entidades | Casos de uso de productos | Productos primarios |
|----------|----------|--------------|----------|------------------|
| residential_proxy | sospechoso | Direcciones IP | Reputación del relleno de credenciales y el fraude | ASM y Cloud SIEM |
| botnet_proxy | sospechoso | Direcciones IP | Reputación por formar parte de una red de bots y contribuir a ataques distribuidos | ASM y Cloud SIEM |
| malware | malicioso | versiones de librerías de aplicación, hashes de archivos | Paquetes maliciosos y comunicación con pools de minería| CWS |
| analizador | sospechoso | Direcciones IP | Reputación de los analizadores | ASM y Cloud SIEM |
| hosting_proxy | sospechoso | Direcciones IP | IP de centros de datos con reputación de abuso, como por ejemplo para ataques distribuidos de relleno de credenciales | ASM y Cloud SIEM |
| Tor | sospechoso | Direcciones IP  | Infracciones de políticas corporativas por actividad de usuario | ASM y Cloud SIEM |

### Información sobre amenazas
| Intención | Caso de uso |
|--------|----------|
| benigno | VPN corporativas y enriquecimiento informativo |
| sospechoso | Baja reputación |
| malicioso | Reputación maliciosa |


## Tipos de entidades
| Tipo de entidad | Ejemplo | Casos prácticos |
|-------------|---------|-----------------------------|
| Direcciones IP | 128.66.0.1 | Identificar direcciones IP asociadas a ataques, mando y control, y actividad de análisis |
| dominios | example.com, subdomain.example.com | Dominios asociados a usos maliciosos. A menudo utilizados con malware como mando y control. |
| versiones de paquetes de aplicaciones | (example_package, 1.0.0) | Identificar paquetes maliciosos descargados de PyPi |
| hashes de archivos [SHA1, SHA256]. | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identificar un archivo distinto asociado a un programa malicioso o comprometido |</br>

**Nota**: Las fuentes y categorías de información sobre amenazas no son configurables en este momento.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]:/es/security/detection_rules/
