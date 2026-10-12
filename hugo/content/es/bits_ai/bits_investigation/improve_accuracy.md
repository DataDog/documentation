---
description: Aprenda las mejores prácticas para configurar Bits Investigation y obtener
  investigaciones más precisas.
further_reading:
- link: /bits_ai/bits_investigation/knowledge_sources/
  tag: Documentación
  text: Fuentes de conocimiento
- link: /bits_ai/bits_investigation/configure/
  tag: Documentación
  text: Integrations y configuraciones
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: Documentación
  text: Chatear con Bits Investigation
title: Mejore la precisión de Bits Investigation
---
## Descripción general {#overview}

Bits Investigation razona a través de su telemetría, integraciones, código fuente y memorias, investigando toda la información disponible en ese momento.

Sin embargo, no hay dos organizaciones que compartan la misma arquitectura técnica, etiquetado, rutas de escalamiento o conocimiento tribal, por lo que obtener los mejores resultados significa adaptar Bits Investigation para su organización.

Esta guía cubre las prácticas con mayor impacto en la precisión:
- [Fortalezca sus fuentes de conocimiento](#strengthen-your-knowledge-sources)
- [Habilite la investigación automática en sus monitores críticos](#enable-auto-investigate-on-your-critical-monitors)
- [Conecte herramientas y documentación externas](#connect-external-tools-and-documentation)
- [Pruebe sus cambios con Bits Chat](#test-your-changes-with-bits-chat)

## Fortalezca sus fuentes de conocimiento {#strengthen-your-knowledge-sources}

Bits Investigation lee de cuatro lugares durante una investigación: `bits.md`, mensajes de seguimiento y runbooks, y comentarios anteriores. Cuanto más específico sea cada uno, más precisas serán las investigaciones futuras. Comience usando Bits Investigation y observando sus resultados. Esto le da una dirección sobre dónde enfocar su ajuste.

### Escriba reglas específicas {#write-specific-rules}

Bits Investigation lee [`bits.md`][1] en cada investigación. Escriba reglas específicas, no descripciones generales: una descripción repite lo que Bits ya puede inferir de la telemetría, mientras que una regla resuelve algo que no puede inferir por sí solo, como una discrepancia de nombres entre herramientas.

| Bueno | Necesita mejorar |
|------|--------------------|
| "Las alertas del equipo de facturación etiquetan el servicio como `billing-svc`, pero APM y los registros usan `billing_service`." Trátelos como el mismo servicio.\" | \"Checkout es nuestro servicio de pagos.\" |

Priorice estas entradas:
- **Asignación de nombres entre sistemas**: El mismo servicio, entorno o equipo a menudo tiene nombres diferentes en los monitores, APM, registros y cualquier sistema de tickets conectado. Escriba la asignación una vez.
- **Ruido conocido**: Patrones que parecen incidentes pero son rutinarios, como un trabajo de reindexación semanal o una prueba de carga. Documéntelos, junto con cuándo contarían realmente como un problema real.
- **Reglas de alcance permanentes**: Las alertas que no especifican un entorno o región son ambiguas. Defina los valores predeterminados que Bits debe asumir.

Para ver un archivo de muestra completo, consulte [Knowledge sources][1].

### Haga que sus monitores sean autosuficientes {#make-your-monitors-self-sufficient}

Bits lee el mensaje de seguimiento en el momento de la investigación. Configure los monitores para que Bits pueda investigarlos solo con el mensaje, sin que usted tenga que completar el contexto manualmente después.

Agregue al mensaje de seguimiento:
- El tablero, la consulta de registro o el notebook que verificaría primero (las URL simples funcionan, no se necesita formato).
- Un notebook en lugar de un enlace simple si necesita más de uno o dos enlaces; los notebooks admiten markdown junto con consultas activas de Datadog.
- Servicios o dependencias descendentes que suelen verse afectados.

También defina el contexto o agrupe la consulta del monitor por `service`. Esto es lo que permite a Bits pivotar hacia APM, registros, RUM y [Catalog][2] para el servicio correcto. Sin la etiqueta `service`, Bits recurre a señales más débiles como el nombre del monitor.

Revise los mensajes de seguimiento periódicamente. Un enlace de runbook obsoleto es peor que no tener enlace, ya que dirige a Bits al tablero incorrecto o a un servicio fuera de servicio.

### Envíe comentarios sobre las investigaciones {#give-feedback-on-investigations}

Al final de una investigación, dígale a Bits si la conclusión fue correcta. Confirme lo que es correcto, no solo lo que está mal; los comentarios positivos siguen convirtiéndose en una memoria que Bits reutiliza. Cuando Bits se equivoca, nombre la causa raíz real, los servicios o métricas involucrados, y enlace la telemetría que lo demuestra. "Eso está mal" no le da a Bits nada que cambiar.

Tanto los comentarios positivos como las correcciones se convierten en **memorias**, que Bits reutiliza selectivamente en investigaciones futuras similares. Revíselas o elimínelas de la columna {{< ui >}}Memories{{< /ui >}} en la página [Monitor Management][8], y verifique periódicamente que las correcciones anteriores sigan siendo válidas (los servicios cambian de nombre, las causas se solucionan).

## Habilite la investigación automática en sus monitores críticos {#enable-auto-investigate-on-your-critical-monitors}

En la página [Supported Monitors][8], establezca el contexto {{< ui >}}Auto-Investigate{{< /ui >}} para los monitores en los que valga la pena realizar una investigación y en los que tenga la capacidad para mantenerlo preciso:

- Filtre por [`priority:p1`][9] (o `p2`) para los monitores con mayor probabilidad de representar un incidente real.
- Filtre por [`notification:*`][10] para los monitores que ya envían alertas a una persona o canal.

[Habilite {{< ui >}}Auto-Investigate{{< /ui >}}][13] en esta lista filtrada. Activarlo para cada monitor dispersa las investigaciones entre alertas ruidosas de baja prioridad y diluye la señal que realmente le importa. También significa que no puede gestionar de manera realista las reglas `bits.md`, los runbooks y los comentarios para todos ellos.

## Conecte herramientas y documentación externas {#connect-external-tools-and-documentation}

Bits Investigation solo puede razonar sobre la telemetría y la documentación a las que puede acceder. Conectar estas fuentes le da más información con la cual trabajar:

- **Confluence**: [Conecte su cuenta de Confluence][3] y vincule las páginas relevantes en los mensajes de seguimiento. Bits extrae enlaces de telemetría y pasos de solución de problemas de la página. Habilite el rastreo de cuentas para permitir que [Bits Chat][4] busque directamente en su espacio de Confluence, no solo en las páginas vinculadas.
- **Código fuente**: Conecte [GitHub][5] y [etiquete su telemetría de APM con información de Git][6] para que Bits pueda vincular una regresión al commit o despliegue que la causó. Esto también permite que Bits Code retome la investigación y proponga una solución.
- **Otras herramientas de observabilidad**: Conecte Grafana, Dynatrace, Splunk, Sentry o ServiceNow si la telemetría reside allí. Consulte [Intégrese con plataformas de observabilidad y SCM de terceros][7].

Para configurar Slack, Microsoft Teams u otros destinos para los hallazgos de la investigación, consulte [Enviar hallazgos de investigación a plataformas de ITSM y colaboración][12].

## Pruebe sus cambios con Bits Chat {#test-your-changes-with-bits-chat}

Después de realizar un cambio en `bits.md`, un mensaje de seguimiento o una habilidad, utilice [Bits Chat][4] para confirmar que se aplica antes de descubrirlo durante una investigación real. El chat utiliza las mismas fuentes de conocimiento, por lo que puede verificar su cambio sin esperar a que se ejecute una investigación completa. También puede pedirle directamente a Bits Chat sugerencias sobre cómo mejorar `bits.md`, un runbook o una habilidad.

| Objetivo | Ejemplo de prompt |
|------|-----------------|
| Verificar una `bits.md` regla de nomenclatura | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| Verificar un patrón de ruido | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| Verificar un runbook o página de Confluence | `What does our documentation say about diagnosing <service> issues?` |
| Verificar una habilidad | Haga una pregunta que debería activarla y vea si la respuesta sigue el procedimiento |
| Verificar una corrección anterior | Haga una pregunta relacionada (p. ej., `What's your read on memory pressure on <service>?`) y vea si hace referencia a su corrección |

Si la respuesta no refleja lo que escribió, verifique si la entrada `bits.md` es una regla o solo una descripción, si la integración está conectada con los permisos correctos o si un enlace está desactualizado. Corrija la brecha específica y vuelva a realizar la prueba con el mismo prompt.

Para detectar brechas que aún no ha pensado en corregir, pregunte después de una investigación real: `What information would have made this investigation faster or more accurate?`

Después de que el chat refleje el cambio, vuelva a ejecutar una investigación conocida para confirmar que la conclusión en sí misma mejora. El chat y las investigaciones no siempre utilizan el conocimiento de la misma manera.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_investigation/knowledge_sources/
[2]: /es/internal_developer_portal/catalog/
[3]: https://app.datadoghq.com/integrations/confluence
[4]: /es/bits_ai/bits_investigation/chat_bits_investigation/
[5]: /es/integrations/github/
[6]: /es/source_code/service-mapping
[7]: /es/bits_ai/bits_investigation/configure/#integrate-with-third-party-observability-and-scm-platforms
[8]: https://app.datadoghq.com/bits-ai/monitors/supported
[9]: https://app.datadoghq.com/bits-ai/monitors/supported?q=priority%3Ap1&auto_only=false
[10]: https://app.datadoghq.com/bits-ai/monitors/supported?q=notification%3A%2A&auto_only=false
[12]: /es/bits_ai/bits_investigation/configure/#send-investigation-findings-to-itsm-and-collaboration-platforms
[13]: /es/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations