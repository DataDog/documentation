---
further_reading:
- link: /security/threat_intelligence/
  tag: documentación
  text: Información sobre amenazas
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: documentación
  text: Aporta tu propia información sobre amenazas
title: Explorer de IOC
---

## Información general

Los Indicadores de compromiso (IOC) son pruebas de que tus sistemas han tenido una vulneración de seguridad. Con el [Explorer de IOC][1], puedes ver más detalles sobre los compromisos y ver las señales y logs relacionados.

{{< img src="security/security_monitoring/ioc_explorer_1.png" alt="El Explorer de IOC, en el que se muestra una dirección IP que se ha marcado como un indicador de compromiso" style="width:100%;" >}}

## Requisitos previos

Para ver los datos en el Explorer de IOC, todos los siguientes deben ser ciertos:
- Tu organización debe suscribirse a Cloud SIEM.
- El indicador de compromiso debe estar en una fuente de amenazas que estuviera disponible en Datadog en el momento de la adquisición de logs.
  - Para obtener más información sobre las fuentes de inteligencia sobre amenazas de las que el Explorer de IOC muestra contenido, consulta [Fuentes de información sobre amenazas][2].
- Se debe adquirir un log que tenga una entidad coincidente en la información sobre amenazas.
- El período de tiempo del Explorer se fija en los últimos 30 días. El log debe corresponder a ese periodo de tiempo.

## Utilizar el Explorer de IOC

Para acceder al Explorer de IOC en Datadog, ve a **Security** (Seguridad) > **Cloud SIEM** > **Investigate** (Investigar) > [**IOC Explorer**][1] (Explorador de IOC).

### Consulta y filtrado de indicadores de compromiso

Puedes escribir consultas personalizadas o aplicar filtros para determinar qué indicadores de compromiso puedes ver en el Explorer. Puedes consultar o filtrar por:
- Puntuación de gravedad
- [Tipo de entidad][3]
- [Source (fuente) de información sobre amenazas][2]
- [Categoría de información sobre amenazas][4]

Además, puedes hacer clic en el título de una columna en el Explorer para ordenarla por los valores de esa columna.

### Obtén más contexto sobre un indicador de compromiso

Haz clic en un indicador de compromiso para abrir un panel lateral que contiene información adicional sobre él:
- Todas las categorías asignadas al indicador y las fuentes de información sobre amenazas en las que apareció
- Todas las calificaciones asignadas al indicador y las fuentes de información sobre amenazas asociadas a esas calificaciones.
- Desglose de la puntuación de gravedad del indicador
- El entorno asociado al indicador, incluidas las sources (fuentes) y servicios relacionados
- Elementos relacionados en los que puede influir el indicador
- Coincidencias de señales, que puedes ver en el Explorer de señales
- Logs relacionados, que puedes consultar en el Explorer de logs

## Comprender la puntuación de gravedad

Es importante tener un contexto adecuado para la puntuación de gravedad de un indicador, para poder priorizar adecuadamente las investigaciones. Por ejemplo, las [direcciones IP][5] pueden ser volátiles y, en consecuencia, requerir reevaluaciones frecuentes.

En el panel lateral del Explorer de IOC, puedes ver los factores que contribuyen a la puntuación de gravedad. La puntuación de gravedad parte de una puntuación base en función de la clasificación y aumenta o disminuye según factores adicionales:
- **Clasificación**: La puntuación base asociada a la categoría e intención del indicador.
- **Corroboración**: Si el indicador aparece en múltiples fuentes inteligentes de amenazas.
- **Persistencia**: Cuánto tiempo llevan las fuentes de información sobre amenazas informando sobre el indicador.
- **Tipo de alojamiento**: Se utiliza para los tipos de IP y de entidad de dominio; evalúa si el tipo de infraestructura de alojamiento se utiliza habitualmente para ataques
- **Actividad de la señal**: Si el indicador se ha observado en señales

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /es/security/threat_intelligence/#threat-intelligence-sources
[3]: /es/security/threat_intelligence/#entity-types
[4]: /es/security/threat_intelligence/#threat-intelligence-categories
[5]: /es/security/threat_intelligence/#ip-addresses-dynamic-and-transient