---
description: Enriquezca los eventos de Workload Protection Agent con inteligencia
  de amenazas seleccionada por Datadog, o importe su propia base de datos.
disable_toc: false
further_reading:
- link: /security/threat_intelligence/
  tag: Documentación
  text: Threat Intelligence en Datadog
- link: /security/detection_rules/
  tag: Documentación
  text: Reglas de detección
title: Inteligencia de amenazas
---
Workload Protection enriquece los [eventos del Agent][1] con [Threat Intelligence][2] curada por Datadog. Este enriquecimiento añade contexto de reputación a las entidades observadas en sus hosts y contenedores, como direcciones IP y hashes de archivos, para ayudarle a evaluar si un evento es parte de una campaña maliciosa conocida.

Para obtener conceptos generales, fuentes, categorías, intenciones e información sobre el ciclo de vida que se aplican a todos los productos de seguridad de Datadog, consulte [Threat Intelligence][2]. Esta página cubre los detalles específicos de Workload Protection.

## Tipos de entidades para Workload Protection {#entity-types-for-workload-protection}

Workload Protection admite los siguientes [tipos de entidades][3]:

- Direcciones IP
- Dominios
- Hashes de archivo: `SHA1`, `SHA256` y `ssdeep`

`ssdeep` Los hashes admiten la coincidencia difusa, lo que ayuda a identificar archivos que son similares, pero no idénticos, a un archivo malicioso conocido.

## Categorías admitidas para Workload Protection {#supported-categories-for-workload-protection}

Workload Protection admite las siguientes categorías de Threat Intelligence:

- `malware`
- `exploitation`
- `cryptomining`
- `supply_chain_attack_infrastructure`
- `custom`

Para obtener definiciones de categorías e intenciones que se aplican a todos los productos de seguridad de Datadog, consulte [Threat Intelligence categories][5].

## Uso de Threat Intelligence en reglas de detección {#using-threat-intelligence-in-detection-rules}

Las [reglas de detección][4] en Workload Protection pueden hacer referencia a claves de Threat Intelligence, como categoría (`@threat_intel.results.category`) e intención (`@threat_intel.results.intention`) en la consulta de búsqueda o en las condiciones de la regla. Por ejemplo, una regla puede activarse cuando un archivo ejecutado en un Workload Protection coincide con el hash de una muestra de malware conocida, categorizada como `malware` con la intención `malicious`.

<div class="alert alert-info">Las fuentes y categorías de inteligencia de amenazas no son configurables.</div>

## Facetas de inteligencia de amenazas{#threat-intelligence-facets}

Las [fuentes, categorías e intenciones de Threat Intelligence][6] están disponibles como facetas y filtros. Puede ver los enriquecimientos de Threat Intelligence en los eventos coincidentes en el [Agent Events Explorer][1] y en las [security signals][7] resultantes.

## Threat Intelligence on security signals {#threat-intelligence-on-security-signals}

Cuando un evento del Agent coincide con un indicador de Threat Intelligence, Workload Protection genera una security signal que muestra la entidad coincidente junto con su fuente, categoría e intención.

{{< img src="security/workload_protection/detect_and_monitor/threat_intelligence_signal.png" alt="Una security signal de Workload Protection que muestra detalles del Threat Intelligence enrichment." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/workload_protection/investigate_and_triage/agent_events
[2]: /es/security/threat_intelligence/
[3]: /es/security/threat_intelligence/#entity-types
[4]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /es/security/threat_intelligence/#threat-intelligence-categories
[6]: /es/security/threat_intelligence/#threat-intelligence-facets
[7]: /es/security/workload_protection/investigate_and_triage/security_signals
[8]: /es/security/workload_protection/investigate_and_triage/security_signals/investigate#correlated-events