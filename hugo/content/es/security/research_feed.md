---
description: Comprenda el Datadog Security Research Feed, incluidos los criterios
  para vulnerabilidades y amenazas emergentes, y utilice Bits Chat para investigar
  cómo afectan a su entorno.
title: Security Research Feed
---
El Datadog Security Research Feed proporciona contenido relacionado con la seguridad continuamente actualizado para ayudar a las organizaciones a mantenerse al tanto de las amenazas y vulnerabilidades emergentes. Gestionado por los equipos de Security Research y Detection Engineering de Datadog, el feed ofrece información oportuna sobre novedades críticas de seguridad, entre ellas:

- **Vulnerabilidades y amenazas emergentes**: Actualizaciones sobre vulnerabilidades recién descubiertas y campañas de ataque activas que podrían afectar su infraestructura. Estas actualizaciones ayudan a los equipos de seguridad a evaluar la cobertura de detección, identificar los sistemas afectados y determinar el impacto potencial.
- **Nuevo contenido de detección**: Las últimas detecciones publicadas por el equipo de Detection Engineering de Datadog, incluidas nuevas tácticas, técnicas y procedimientos (TTPs) y paquetes de detección compatibles.
- **Actualizaciones de productos**: Mejoras en las capacidades de seguridad de Datadog que aumentan su capacidad para monitorear y proteger su entorno.

{{< img src="security/security_research_feed.png" alt="El Security Research Feed que muestra actualizaciones de seguridad, incluidas publicaciones de blog, actualizaciones de productos, vulnerabilidades emergentes y nuevas detecciones" width="100%">}}

## Cómo funciona {#how-it-works}

Los equipos de Security Research y Detection Engineering monitorean continuamente el panorama de amenazas y publican actualizaciones tan pronto como surgen nuevas amenazas. Esto garantiza que los profesionales de seguridad tengan acceso a:

- Análisis de expertos sobre las últimas tendencias de seguridad.
- Información contextual para evaluar el impacto de una vulnerabilidad o amenaza.
- Orientación sobre la implementación de estrategias eficaces de detección y respuesta.

## Criterios para vulnerabilidades emergentes {#criteria-for-emerging-vulnerabilities}

Una vulnerabilidad emergente es una debilidad de seguridad en una tecnología que amenaza significativamente las operaciones comerciales y se define por uno o más de los siguientes criterios:

- **Impacto generalizado**: La vulnerabilidad afecta a un gran número de sistemas u organizaciones, creando una amplia superficie de ataque.
- **Alta gravedad**: Su explotabilidad y daño potencial la convierten en una preocupación de seguridad inmediata.
- **Visibilidad significativa**: El problema se discute ampliamente en las comunidades de seguridad y en los medios de comunicación generalistas, lo que aumenta la conciencia y la urgencia.

## Criterios para amenazas emergentes {#criteria-for-emerging-threats}

Una amenaza emergente es una campaña de ataque nueva o en evolución o un ataque a la cadena de suministro que ha interrumpido o representa una amenaza significativa para las operaciones comerciales. Se define por uno o más de los siguientes criterios:

- **Impacto generalizado**: La amenaza ya ha afectado a un gran número de sistemas u organizaciones, ya sea a través de ataques oportunistas amplios o campañas dirigidas.
- **Amenaza inminente**: La amenaza ya ha causado impacto o se espera que aumente, con ataques a corto plazo que probablemente afecten a muchas organizaciones.
- **Visibilidad significativa**: El problema se discute ampliamente en las comunidades de seguridad y en los medios de comunicación generalistas, lo que aumenta el conocimiento del problema y la urgencia de abordarlo.

## Investigue vulnerabilidades y amenazas emergentes con Bits Chat {#investigate-emerging-vulnerabilities-and-threats-with-bits-chat}

**Requisitos**: El permiso **Bits Chat Access**.

El Security Research Feed puede usar [Bits Chat][1] para investigar cómo una vulnerabilidad emergente o una amenaza emergente afecta su entorno. Bits Chat lee el artículo y verifica las fuentes de datos que enumera, como hallazgos de vulnerabilidades, señales de seguridad, servicios de APM e imágenes de contenedores, en busca de recursos afectados. Bits Chat luego resume qué recursos están afectados y sugiere pasos de remediación para ellos.

El botón {{< ui >}}Investigate with Bits{{< /ui >}} solo está disponible para artículos de Emerging Vulnerability y Emerging Threat.

Para investigar un artículo con Bits Chat:

1. En el Security Research Feed, abra un artículo de Emerging Vulnerability o Emerging Threat.
2. En la sección {{< ui >}}Impact Assessment{{< /ui >}} del panel lateral, haga clic en {{< ui >}}Investigate with Bits{{< /ui >}}. Bits Chat abre una nueva conversación con el artículo adjunto como contexto. Durante la investigación, el botón muestra {{< ui >}}Bits is investigating…{{< /ui >}}.
3. Revise la respuesta de Bits Chat. La respuesta incluye una tabla de cobertura que enumera cada fuente de datos que Bits Chat verificó, lo que consultó y el resultado.

{{< img src="security/research_feed_investigate_with_bits.png" alt="Un artículo del Security Research Feed sobre una vulnerabilidad emergente de PHP abierto en el panel lateral, con el botón Investigate with Bits en la sección Impact Assessment" width="100%">}}

<div class="alert alert-info">Bits Chat basa sus resultados únicamente en los datos de Datadog. Los recursos que Datadog no monitorea, como los hosts sin el Datadog Agent o los servicios sin APM, no aparecen en los resultados. Revise los resultados antes de actuar sobre ellos.</div>

Después de investigar un artículo, el panel lateral muestra dos botones:

- {{< ui >}}View existing investigation{{< /ui >}}: Vuelve a abrir la conversación anterior de Bits Chat para el artículo.
- {{< ui >}}Start a new investigation{{< /ui >}}: Inicia una nueva conversación de Bits Chat para el artículo.

Las investigaciones se ejecutan en Bits Chat y consumen [AI Credits][2].

### Pregunte a Bits Chat sobre un artículo de Security Research Feed {#ask-bits-chat-about-a-security-research-feed-article}

Cuando un artículo de Security Research Feed está abierto, Bits Chat adjunta el artículo como contexto automáticamente. Para preguntar a Bits Chat sobre el artículo, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> mientras el artículo esté abierto en el panel lateral. Esto funciona para todos los tipos de artículos.

[1]: /es/bits_ai/bits_chat/
[2]: /es/account_management/billing/ai_credits/