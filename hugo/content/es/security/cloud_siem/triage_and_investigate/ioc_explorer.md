---
further_reading:
- link: /security/threat_intelligence/
  tag: documentación
  text: Inteligencia de amenazas
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: documentación
  text: Traiga su propia inteligencia de amenazas
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: Blog
  text: Integre la inteligencia de amenazas de Recorded Future con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones impulsadas por IA, inteligencia
    de amenazas mejorada y operaciones de seguridad escalables'
- link: /security/cloud_siem/ingest_and_enrich/muted_indicators/
  tag: documentación
  text: Indicadores silenciados
title: IOC Explorer
---
## Descripción general {#overview}

Los indicadores de compromiso (IOC) son datos de reputación asociados con entidades como direcciones IP, hashes de archivos y dominios que ayudan a los equipos de respuesta a tomar decisiones informadas sobre ataques y posibles vulneraciones. El [IOC Explorer][1] es una superficie de investigación en la que puede buscar y filtrar para analizar, ordenar y priorizar vulneraciones. También puede visualizar coincidencias relacionadas en Signals Explorer y Logs Explorer para investigar posibles vulneraciones con más detalle.

{{< img src="security/security_monitoring/ioc_explorer_2.png" alt="El IOC Explorer, que muestra una dirección IP marcada como indicador de compromiso" style="width:100%;" >}}

## Requisitos previos {#prerequisites}

Para visualizar datos en IOC Explorer, deben cumplirse todas las siguientes condiciones:
- Su organización debe estar suscrita a Cloud SIEM.
- El indicador de compromiso debe estar en una fuente de amenazas que estuviera disponible para Datadog en el momento de la adquisición del registro.
  - Para obtener más información sobre las fuentes de inteligencia de amenazas cuyo contenido muestra IOC Explorer, consulte [Fuentes de inteligencia de amenazas][2].
- El marco temporal de Explorer está fijado en los últimos 30 días. El registro debe ser de dentro de ese marco temporal. Si su organización comenzó a usar la plataforma recientemente, Explorer muestra los datos desde que comenzó a usarla.

## Utilice IOC Explorer {#use-the-ioc-explorer}

Para acceder a IOC Explorer en Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][1].

### Consulte y filtre indicadores de compromiso {#query-and-filter-indicators-of-compromise}

Puede escribir consultas personalizadas o aplicar filtros para determinar qué indicadores de compromiso puede visualizar en el explorador. Puede consultar o filtrar por:
- Puntuación de gravedad
- Nombre de la señal
- [Fuente de inteligencia de amenazas][2]
- Etiqueta, incluidos los resultados del motor de puntuación
- Indicador
- [Tipo de indicador][3]
- [Categoría de inteligencia de amenazas][4]
- Tipo de sistema autónomo (AS)
- [Campos OCSF coincidentes](#understand-ocsf-matching)
- [Estado de silencio](#mute-benign-indicators)

Además, puede hacer clic en un encabezado de columna en Explorer para ordenar por los valores de esa columna.

### Comprender la coincidencia de OCSF {#understand-ocsf-matching}

Puede activar o desactivar el interruptor {{< ui >}}OCSF Matching{{< /ui >}} para tener más control sobre cómo Datadog identifica las coincidencias de IOC.
- Ponga el interruptor en **on** si desea **coincidencias de mayor confianza** vinculadas a atributos de seguridad normalizados.
  
  Cuando el interruptor está activado, las coincidencias de IOC solo aparecen en Explorer si los valores aparecen en campos OCSF asignados, como los de la IP de origen, la IP de destino o la IP del cliente. Esto ayuda a garantizar que la coincidencia refleje el significado estructurado de los datos, en lugar de solo la presencia del IOC en algún lugar del registro sin procesar.
- Ponga el interruptor en **off** si desea una **búsqueda de amenazas más amplia** en toda la carga útil del evento.
  
  Cuando el interruptor está desactivado, las coincidencias de IOC aparecen en Explorer si los IOC aparecen en cualquier parte del evento, incluido texto no estructurado como el cuerpo de un mensaje u otros campos de formato libre.

#### Ejemplo {#example}

Alice le envía a Bob un correo electrónico cuyo cuerpo de mensaje menciona `192.0.2.100`, una dirección IP que es un IOC.
- Si el interruptor OCSF Matching está en **on**, Datadog solo detecta coincidencias con IOC en campos OCSF asignados relevantes, como los campos normalizados de dirección IP de origen o destino del evento de correo electrónico. Debido a que `192.0.2.100` aparece solo en el cuerpo del mensaje y no en un campo OCSF asignado, no aparece en IOC Explorer.
- Si el interruptor OCSF Matching está en **off**, Datadog detecta la coincidencia con `192.0.2.100` porque busca en toda la carga útil del evento, incluido texto no estructurado como el cuerpo del mensaje. El IOC aparece en IOC Explorer.

### Obtenga más contexto sobre un indicador de compromiso {#get-more-context-on-an-indicator-of-compromise}

En IOC Explorer, haga clic en un indicador de compromiso para visualizar información adicional que puede utilizar para priorizar sus esfuerzos de remediación:
- Cualquier categoría asignada al indicador y las fuentes de inteligencia de amenazas en las que apareció
- Cualquier calificación asignada al indicador y las fuentes de inteligencia de amenazas asociadas con esas calificaciones
- Un desglose de la puntuación de gravedad del indicador
- El entorno asociado con el indicador, incluidas las fuentes y servicios relacionados
- Elementos relacionados en los que el indicador puede tener un impacto
- Enlaces a superficies de investigación relacionadas:
  - Coincidencias de señales, que puede visualizar en [Signals Explorer][6]
  - Registros relacionados, que puede visualizar en [Log Explorer][7]

### Silenciar indicadores benignos {#mute-benign-indicators}

Si un indicador es benigno para su organización, como la dirección IP de salida de su VPN corporativa, haga clic en {{< ui >}}Mute This IoC{{< /ui >}} en su panel lateral, o seleccione varios indicadores y siléncielos de forma masiva. Los indicadores silenciados permanecen en Explorer y sus calificaciones de inteligencia de amenazas cambian a benignas para su organización. La columna {{< ui >}}Custom mute{{< /ui >}} y la faceta {{< ui >}}Muted{{< /ui >}} muestran qué indicadores silenció su organización, y el botón {{< ui >}}Muted Indicators{{< /ui >}} enumera todos los silenciamientos activos. Para obtener más detalles, consulte [Indicadores silenciados][8].

## Comprender la puntuación de gravedad {#understand-severity-scoring}

Es importante tener el contexto adecuado para la puntuación de gravedad de un indicador para que pueda priorizar correctamente las investigaciones. Por ejemplo, las [direcciones IP][5] pueden ser volátiles y, como resultado, requieren reevaluaciones frecuentes.

En el panel lateral de IOC Explorer, puede visualizar los factores que contribuyen a la puntuación de gravedad. La puntuación de gravedad comienza con una puntuación base basada en la clasificación y aumenta o disminuye según factores adicionales:
- **Clasificación**: la puntuación base asociada con la categoría y la intención del indicador
- **Corroboración**: si el indicador aparece en múltiples fuentes de inteligencia de amenazas
- **Persistencia**: cuánto tiempo han estado informando las fuentes de inteligencia de amenazas sobre el indicador
- **Tipo de alojamiento**: se utiliza para tipos de entidades de IP y dominio; evalúa si el tipo de infraestructura de alojamiento se utiliza comúnmente para ataques
- **Actividad de señal**: si el indicador se ha observado en Signals

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /es/security/threat_intelligence/#threat-intelligence-sources
[3]: /es/security/threat_intelligence/#entity-types
[4]: /es/security/threat_intelligence/#threat-intelligence-categories
[5]: /es/security/threat_intelligence/#ip-addresses-dynamic-and-transient
[6]: /es/security/cloud_siem/triage_and_investigate/investigate_security_signals/#signals-explorer
[7]: /es/logs/explorer/
[8]: /es/security/cloud_siem/ingest_and_enrich/muted_indicators/