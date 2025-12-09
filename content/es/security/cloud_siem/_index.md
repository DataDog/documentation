---
aliases:
- /es/security_monitoring/
- /es/security_platform/cloud_siem/security_home/
- /es/security_platform/cloud_siem/
- /es/security/cloud_siem/security_home/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: Blog
  text: Supervisa, clasifica y asigna problemas con Datadog Case Management
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatizar la protección de identidades, la contención de amenazas y la inteligencia
    sobre amenazas con los flujos de trabajo SOAR de Datadog
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Mejora el control, la gestión y la transparencia en todos tus equipos con
    Datadog Audit Trail
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: Blog
  text: Emulación de amenazas de AWS y validación de la detección con Stratus Red
    Team y Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Crear una cobertura de seguridad suficiente para tu entorno en la nube
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorizar logs de DNS para análisis de red y seguridad
- link: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/
  tag: Blog
  text: Monitorizar Akamai Zero Trust y Application Security con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: Blog
  text: Cómo se aprovechan los atacantes de los servicios de Microsoft 365
- link: https://www.datadoghq.com/blog/monitor-security-metrics/
  tag: Blog
  text: Monitorizar la postura de seguridad de tu organización con Datadog
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: Blog
  text: Identificar comportamientos de riesgo en entornos de la nube
- link: https://www.datadoghq.com/blog/detect-phishing-activity-amazon-ses/
  tag: Blog
  text: 'Monitorización de Amazon SES: Detectar campañas de phishing en la nube'
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: Blog
  text: Crea, prueba y escala detecciones como código con Datadog Cloud SIEM
title: Cloud SIEM
---

{{< learning-center-callout header="'Unete a una sesión web de capacitación" hide_image="true" btn_title="Inscríbete" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Descubre cómo Datadog Cloud SIEM y Cloud Security aumentan el nivel de detección e investigación de amenazas de tu organización en entornos dinámicos a escala de la nube.
{{< /learning-center-callout >}}

## Información general

Datadog Cloud SIEM (Información de seguridad y Event Management) es un sistema de análisis y correlación de datos de seguridad. Permite a todo el equipo de operaciones de seguridad ver, detectar, investigar y responder a los problemas de seguridad. Aprovechando la plataforma escalable de Datadog, Cloud SIEM ingiere telemetría tanto de sistemas en la nube como de sistemas on-premises mediante el Datadog Agent e integraciones basadas en la API.

Una respuesta de seguridad eficaz requiere velocidad, contexto, conocimiento y automatización. Cloud SIEM analiza continuamente los datos entrantes para detectar amenazas, generar señales de seguridad procesables y correlacionarlas a través de múltiples fuentes. Esto permite a tu equipo investigar incidentes y responder con rapidez.

Para mantener a tu equipo al tanto de los últimos ataques, Datadog también cuenta con un equipo de investigadores de amenazas que analizan petabytes de telemetría a través de sistemas en la nube y on-premises para identificar amenazas emergentes y comportamientos de atacantes. Consulta [Datadog Security Labs][1] para leer artículos sobre sus investigaciones recientes.

### Seguridad y observabilidad

Cloud SIEM integra la telemetría en la nube y on-premises directamente en los flujos de trabajo de seguridad para acelerar la investigación y la respuesta. Y con una plataforma compartida que une los equipos de DevOps y seguridad, las organizaciones pueden acabar con los silos y responder a las amenazas de forma colaborativa y eficiente.

### Control flexible de los costes de los datos de seguridad

A medida que tu organización crece, es fundamental controlar el coste de ingesta de los logs de seguridad sin comprometer la visibilidad. Cloud SIEM está integrado con Datadog Log Management para que puedas elegir la capacidad de retención y consulta adecuada para tus logs de seguridad. Esta flexibilidad te ayuda a equilibrar la rentabilidad con tus necesidades de detección de amenazas. 

Almacena logs utilizando una de las opciones disponibles:
- [Indexación estándar][6] para logs que deben consultarse frecuentemente con el mayor número de cálculos.
- [Logs flexibles][7] para logs que deben conservarse a largo plazo, pero que a veces deben consultarse con urgencia.
- [Archivos de logs][8] para logs que se consultan con poca frecuencia y deben almacenarse a largo plazo.

### Incorporación guiada de datos de seguridad

Los [paquetes de contenido][9] de Cloud SIEM son un conjunto de integraciones de Datadog diseñados para los equipos de seguridad. Cada paquete de contenido contiene instrucciones sobre cómo configurar la integración y qué incluye, como reglas de detección, dashboards predefinidos interactivos, parseos y flujos de trabajo SOAR. Los paquetes de contenido resaltan información práctica específica de cada integración para ayudarte a investigar los problemas de seguridad.

### Monitorización del estado del paquete de contenido

Una vez activado un paquete de contenido, te informa del estado de la integración y te ofrece pasos para solucionar problemas si algo va mal, para que puedas volver a estar operativo lo antes posible.

### Búsqueda y análisis de logs

Crea búsquedas en el Log Explorer utilizando facetas o haciendo clic en los campos directamente en los logs. O utiliza Bits AI y la búsqueda en lenguaje natural para encontrar eventos de seguridad importantes. Con las funciones integradas de búsqueda por grupos y tablas, así como el análisis de patrones y las visualizaciones, los equipos de seguridad pueden obtener información sobre seguridad a partir de sus datos. Consulta [Log Explorer][11] y [Sintaxis de búsqueda de logs][10] para obtener más información.

## Para empezar

Si aún no tienes una cuenta en Datadog, regístrate para obtener una [prueba gratuita][2]. Después de acceder a tu cuenta de Datadog:

1. Navega hasta [Cloud SIEM][3].
1. Haz clic en **Enable Cloud SIEM** (Habilitar Cloud SIEM).
1. Sigue los pasos de incorporación.

Consulta la [Guía de introducción][4] para obtener instrucciones de configuración más detalladas.

## Página de información general de Cloud SIEM

Navega hasta la [página de información general de Cloud SIEM][3]. Utiliza esta página para ver las perspectivas clave de seguridad y actuar sobre flujos de trabajo comunes para analistas de seguridad, ingenieros de seguridad y detección, y gerentes del Centro de Operaciones de Seguridad (SOC). Desde la página de información general, puedes:
- Acceder a señales importantes, casos abiertos y entidades de alto riesgo.
- Completar las tareas de incorporación y revisar el estado del paquete de contenido.
- Ver e investigar las principales señales por geografía o proveedor de servicios de Internet (ISP).
- Analizar señales y reglas mediante tácticas de MITRE ATT&CK.
- Seguimiento del rendimiento de la detección (tiempo medio hasta la detección (MTTD), tasas de falsos positivos).
- Leer las últimas investigaciones y notas de la versión de [Security Labs][1].

Haz clic en **Customize Page** (Personalizar página) para reordenar u ocultar los módulos de modo que puedas ver lo que es importante para ti.

Obtén más información sobre cada una de las secciones de página de información general de Cloud SIEM.

### Cobertura de seguridad

{{< img src="security/security_monitoring/landing/01_security_coverage.png" alt="Secciones de cobertura de código que muestra 11 paquetes de contenido y 1 paquete de contenido roto y un gráfico de barras de los logs analizados por Cloud SIEM" style="width:100%;" >}}

Está atento a cualquier problema de tratamiento de datos o laguna en la cobertura.

#### Paquetes de contenido e integraciones habilitados

Ve los paquetes de contenido y las integraciones habilitados en las categorías críticas para proporcionar una cobertura de seguridad completa. Pasa el ratón por encima de cada sección de la barra horizontal para ver qué paquetes de contenido están activados en cada categoría.

#### Paquete de contenido y KPIs de estado del log

Comprueba si algún paquete de contenido o integración se encuentra en estado de advertencia o roto para poder resolver las brechas de cobertura. Haz clic en un cuadro de estado para ver los paquetes de contenido afectados.

#### Logs analizados

Consulta las tendencias de registro en tus principales fuentes de log e identifica cualquier pico o caída inusual. Haz clic en la leyenda de la parte inferior para explorar las tendencias por fuente.

### Señales y casos importantes

{{< img src="security/security_monitoring/landing/02_important_signals_cases.png" alt="" style="width:100%;" >}}

Ve los acontecimientos importantes que ocurren en tu entorno, como:

#### Señales abiertas recientes agrupadas por regla

Ve las señales agrupadas por nombre de regla y ordenadas por gravedad para obtener una visión general de las señales más importantes de tu entorno. Haz clic en una señal o en un conjunto de gravedad para ver más detalles en una vista filtrada en el Signal Explorer.

#### Casos de seguridad abiertos recientemente

Utiliza [Case Management][5] para realizar un seguimiento de las señales que requieren un análisis más detallado. Ve los casos de seguridad activos en tu entorno y haz clic en una incidencia para ver más detalles.

### Información sobre riesgos

{{< img src="security/security_monitoring/landing/03_risk_insights.png" alt="" style="width:100%;" >}}

Revisa las entidades de riesgo de tu entorno.

#### Entidades de mayor riesgo

Ve las entidades con las puntuaciones de riesgo más altas. Haz clic en una entidad para ver más detalles y tomar acción.

#### Desglose por tipo de entidad

Ve los tipos de entidades más comunes en tu entorno. Haz clic en una parte del gráfico circular para filtrar la lista de entidades por tipo.

#### Desglose de la puntuación de riesgo de las entidades

Ver entidades por gravedad. Haz clic en un cuadro de gravedad para ver una lista de entidades con esa gravedad.

### Mapa de amenazas

{{< img src="security/security_monitoring/landing/04_threat_map.png" alt="" style="width:100%;" >}}

Obtén información sobre dónde se generan las señales en tu entorno.

#### Principales IPs por distribución de países

Ve qué IPs están generando más señales con un desglose de señales importantes y menos importantes. Utiliza también el mapa para ver una lista de señales por país.

#### Señales por país

Ve el desglose proporcional de dónde se originan las señales. Haz clic en una parte del gráfico circular para filtrar por país y estado o provincia, e identificar las señales procedentes de lugares inesperados.

#### Señales por proveedor de ISP

Revisa qué ISPs están enviando señales. Haz clic en una parte del gráfico circular para desglosarlo por proveedor y ubicación.

### Información general de seguridad

{{< img src="security/security_monitoring/landing/05_security_overview.png" alt="" style="width:100%;" >}}

Información general superficial de todas las señales.

#### Distribución de señales

En la parte izquierda de la sección, ve las señales agrupadas por gravedad y tendencia a lo largo de la ventana temporal seleccionada.
En la parte derecha, puedes ver un desglose de la actividad de las señales por gravedad, fuente y resolución. Haz clic en un nodo del diagrama de Sankey para ver las señales en Signal Explorer filtradas según las características específicas de ese nodo.

#### Tiempo medio de respuesta a las señales

Ve los KPIs de la rapidez de respuesta de tu equipo. Haz clic en un cuadro de gravedad para ver las señales configuradas en `under review` o `archive` y filtradas según la gravedad seleccionada.

### Cobertura de MITRE ATT&CK

{{< img src="security/security_monitoring/landing/06_mitre_coverage.png" alt="" style="width:100%;" >}}

Cobertura de reglas de detección y actividad de señales mediante tácticas y técnicas de MITRE ATT&CK.

#### Técnicas con al menos 1 regla

Ve cuántas técnicas están cubiertas por las reglas de detección activadas en tu entorno.

#### KPIs de densidad de reglas

Ve cuántas técnicas tienen una densidad alta, media o baja, o no tienen ninguna regla. Haz clic en un cuadro para ver un mapa de MITRE filtrado.

#### Señales por vista táctica

Ve qué tácticas de MITRE ATT&CK están generando señales. Haz clic en una parte del gráfico circular para ver el Signal Explorer filtrado por esa táctica. Haz clic en el menú desplegable y selecciona **Rules count** (Conteo de reglas) para ver qué tácticas tienen más reglas asignadas. Cuando se visualiza por recuento de reglas, al hacer clic en una parte del gráfico circular se crea una vista del Explorer de la regla de detección filtrada por esa táctica.

#### Señales por vista técnica

Ve qué técnicas de MITRE ATT&CK están generando señales. Haz clic en una parte del gráfico circular para ver el Signal Explorer filtrado por técnicas. Haz clic en el menú desplegable y selecciona **Rules count** (Conteo de reglas) para ver qué técnicas tienen más reglas asignadas. Cuando se visualiza por recuento de reglas, al hacer clic en una parte del gráfico circular se puede ver el Explorer de la regla de detección filtrado por esa técnicas.

### Rendimiento de las reglas de detección

{{< img src="security/security_monitoring/landing/07_detection_rule_performance.png" alt="" style="width:100%;" >}}

Obtén una comprensión más profunda del rendimiento de las reglas de detección. Esta sección funciona mejor si realiza el triaje de señales en Cloud SIEM.

#### KPIs de MTTD para Cloud SIEM

Ve el tiempo medio de detección (MTTD) de todas las señales. Los cuadros de abajo muestran el MTTD para señales críticas, altas y medias. Haz clic en un cuadro para ver las señales con esa gravedad en Signal Explorer.

#### Actividad de las señales

Ve las tendencias de la señal en la ventana de tiempo seleccionada. Selecciona las casillas de verificación de gravedad en la parte inferior del gráfico de barras para ampliar el alcance por gravedad, lo que puede ser útil para identificar picos o caídas inusuales.

#### Reglas por cambio de señal importante (1 semana)

Ve qué reglas han aumentado la actividad de señales importantes en comparación con la semana anterior. Haz clic en el nombre de una regla para ver las señales en Signal Explorer filtradas por ese nombre de regla.

#### Señales por cambio de gravedad (1 semana)

Ve cómo han cambiado las gravedades de todas las señales en comparación con la semana anterior. Haz clic en una gravedad para ver las señales con esa gravedad en Signal Explorer.

#### Señales importantes por motivo de archivo

Ve cuántas señales se archivaron por motivo de archivo. Haz clic en un motivo para ver el Signal Explorer filtrado por ese motivo de archivo.

#### Reglas archivadas con verdadero positivo (malicioso)

Ve qué reglas se han archivado en `True Positive: Malicious`. Haz clic en una regla para ver las señales en Signal Explorer.

#### Reglas archivadas con verdadero positivo (benigno)

Ve qué reglas se han archivado en `True Positive: Benign`. Haz clic en una regla para ver las señales en Signal Explorer.

#### Reglas por tasa de falsos positivos

Ve qué reglas son las más ruidosas calculando el porcentaje de señales que se marcan como falsos positivos de todas las señales generadas por una regla. Haz clic en una regla para ver las señales correspondientes en Signal Explorer.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://securitylabs.datadoghq.com/
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://app.datadoghq.com/security/home?
[4]: /es/getting_started/security/cloud_siem/
[5]: /es/security/cloud_siem/investigate_security_signals/#case-management
[6]: /es/logs/log_configuration/indexes
[7]: /es/logs/log_configuration/flex_logs/
[8]: /es/logs/log_configuration/archives/
[9]: /es/security/cloud_siem/content_packs/
[10]: /es/logs/explorer/search_syntax/
[11]: /es/logs/explorer/