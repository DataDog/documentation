---
description: Comprenda el Datadog Security Research Feed y los criterios para las
  vulnerabilidades y amenazas emergentes, y evalúe la exposición a ellas en su entorno,
  incluso con Bits Chat.
title: Security Research Feed
---
El Datadog Security Research Feed proporciona contenido relacionado con la seguridad que se actualiza continuamente para ayudar a las organizaciones a mantenerse al tanto de las amenazas y vulnerabilidades emergentes. Gestionado por los equipos de Security Research y Detection Engineering de Datadog, el feed ofrece información oportuna sobre desarrollos de seguridad críticos, que incluyen:

- **Vulnerabilidades y amenazas emergentes**: Actualizaciones sobre vulnerabilidades recién descubiertas y campañas de ataque activas que podrían afectar su infraestructura. Estas actualizaciones ayudan a los equipos de seguridad a evaluar la cobertura de detección, identificar los sistemas afectados y determinar el impacto potencial.
- **Nuevo contenido de detección**: Las detecciones más recientes publicadas por el equipo de Detection Engineering de Datadog, incluidas nuevas tácticas, técnicas y procedimientos (TTPs), y paquetes de detección compatibles.
- **Actualizaciones de productos**: Mejoras en las capacidades de seguridad de Datadog que mejoran su capacidad para monitorear y proteger su entorno.

{{< img src="security/security_research_feed.png" alt="El Security Research Feed muestra actualizaciones de seguridad, incluidas publicaciones de blog, actualizaciones de productos, vulnerabilidades emergentes y nuevas detecciones" width="100%">}}

<div class="alert alert-tip">Mientras un artículo del Security Research Feed esté abierto en el panel lateral, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> para preguntarle a Bits Chat sobre el artículo. Bits Chat adjunta automáticamente el artículo como contexto, sin importar el tipo de artículo. Las conversaciones de Bits Chat consumen <a href="/account_management/billing/ai_credits/">AI Credits</a> y requieren el permiso <strong>Bits Chat Access</strong>.</div>

## Cómo funciona {#how-it-works}

Los equipos de Security Research y Detection Engineering monitorean continuamente el panorama de amenazas y publican actualizaciones tan pronto como surgen nuevas amenazas. Esto garantiza que los profesionales de seguridad tengan acceso a:

- Análisis de expertos sobre las últimas tendencias de seguridad.
- Información contextual para evaluar el impacto de una vulnerabilidad o amenaza.
- Orientación sobre la implementación de estrategias efectivas de detección y respuesta.

## Criterios para vulnerabilidades emergentes {#criteria-for-emerging-vulnerabilities}

Una vulnerabilidad emergente es una debilidad de seguridad en una tecnología que amenaza significativamente las operaciones comerciales y se define por uno o más de los siguientes criterios:

- **Impacto generalizado**: La vulnerabilidad afecta a un gran número de sistemas u organizaciones, creando una amplia superficie de ataque.
- **Alta gravedad**: Su explotabilidad y daño potencial la convierten en una preocupación de seguridad inmediata.
- **Visibilidad significativa**: El problema se comenta ampliamente en las comunidades de seguridad y en los medios de comunicación generalistas, lo que aumenta el conocimiento del problema y la urgencia.

## Criterios para amenazas emergentes {#criteria-for-emerging-threats}

Una amenaza emergente es una campaña de ataque nueva o en evolución, o un ataque a la cadena de suministro, que ha interrumpido las operaciones comerciales o representa una amenaza significativa para ellas. Se define por uno o más de los siguientes criterios:

- **Impacto generalizado**: La amenaza ya ha afectado a un gran número de sistemas u organizaciones, ya sea a través de ataques amplios y oportunistas o de campañas dirigidas.
- **Amenaza inminente**: La amenaza ya ha tenido un impacto o se espera que se intensifique, con ataques a corto plazo que probablemente afecten a muchas organizaciones.
- **Visibilidad significativa**: El problema se comenta ampliamente en las comunidades de seguridad y en los medios de comunicación generalistas, lo que aumenta el conocimiento del problema y la urgencia.

## Evalúe la exposición a una vulnerabilidad o amenaza emergente {#assess-exposure-to-an-emerging-vulnerability-or-threat}

Los artículos sobre vulnerabilidades y amenazas emergentes del Security Research Feed combinan análisis, coincidencias en su entorno y guía de remediación para que pueda evaluar la exposición desde un solo lugar.

1. En {{< ui >}}Security{{< /ui >}} > {{< ui >}}Research Feed{{< /ui >}}, en el filtro {{< ui >}}Article type{{< /ui >}}, seleccione {{< ui >}}Emerging Vulns & Threats{{< /ui >}}. El feed muestra tanto vulnerabilidades emergentes como amenazas emergentes.
1. Abra el artículo sobre la vulnerabilidad o amenaza. Cada artículo incluye:
   - Una descripción de la vulnerabilidad o amenaza.
   - Una sección de {{< ui >}}Impact Assessment{{< /ui >}} con coincidencias en su entorno.
   - Guía de remediación.

   La mayoría de los artículos también incluyen pasos para encontrar los recursos afectados con Datadog.

### Investigue vulnerabilidades y amenazas emergentes con Bits Chat {#investigate-emerging-vulnerabilities-and-threats-with-bits-chat}

Bits Chat verifica cada fuente de datos que enumera un artículo sobre una vulnerabilidad o amenaza emergente para que pueda encontrar los recursos afectados sin tener que consultar cada fuente usted mismo.

Las fuentes de datos que verifica Bits incluyen hallazgos de vulnerabilidades, señales de seguridad, servicios de APM e imágenes de contenedores. Los resultados de Bits Chat incluyen solo datos en Datadog. Los recursos que Datadog no monitorea, como los hosts sin el Datadog Agent o los servicios sin APM, no aparecen en los resultados. 

Después de la investigación, Bits Chat resume los recursos afectados y sugiere pasos de remediación. Revise los resultados antes de actuar sobre ellos.

Las investigaciones se ejecutan en [Bits Chat][1] y consumen [AI Credits][2].

Debe tener el permiso **Bits Chat Access** para completar esta tarea.

1. Abra un artículo sobre una vulnerabilidad emergente o una amenaza emergente. Otros tipos de artículos no admiten investigaciones.
1. En la sección {{< ui >}}Impact Assessment{{< /ui >}}, haga clic en {{< ui >}}Investigate with Bits{{< /ui >}}. Bits Chat abre una nueva conversación con el artículo adjunto como contexto.
1. Revise la respuesta de Bits Chat. La respuesta incluye una tabla de cobertura que enumera cada fuente de datos que Bits Chat verificó, la consulta de Bits Chat para cada fuente de datos y el resultado.

{{< img src="security/research_feed_investigate_with_bits.png" alt="Un artículo de Security Research Feed sobre una vulnerabilidad emergente de PHP abierto en el panel lateral, con el botón Investigate with Bits en la sección Impact Assessment" width="100%">}}

[1]: /es/bits_ai/bits_chat/
[2]: /es/account_management/billing/ai_credits/