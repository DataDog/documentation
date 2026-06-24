---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentación
  text: Entender la puntuación de severidad de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Detectar y remediar vulnerabilidades con Cloud Security
- link: /security/security_inbox/
  tag: Documentación
  text: Revisar los hallazgos priorizados en la Bandeja de Entrada de Seguridad
title: Motor de Priorización en Tiempo de Ejecución
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="¡Únase a Vista Previa!">}}
El Motor de Priorización en Tiempo de Ejecución está en Vista Previa para Vulnerabilidades de Cloud Security. Utilice este formulario para solicitar acceso.
{{< /callout >}}

Los escáneres de seguridad muestran miles de hallazgos por entorno. La mayoría de los equipos optan por clasificar según la severidad CVSS, pero las puntuaciones estáticas señalan muchos hallazgos que nunca se explotan en la práctica como críticos. El riesgo real depende del contexto en vivo: ¿está el código vulnerable en ejecución, existe un exploit disponible y el recurso afectado accede a datos sensibles o participa en un flujo de trabajo crítico para el negocio?

El Motor de Priorización en Tiempo de Ejecución de Datadog combina el comportamiento en tiempo de ejecución, la explotabilidad, la exposición y el contexto empresarial de los datos de Observabilidad y Seguridad para identificar el 5% de los hallazgos que representan un riesgo real y explotable, para que pueda enfocarse solo en lo que importa.

## Cómo funciona {#how-it-works}

El Motor de Priorización en Tiempo de Ejecución está diseñado para ser explicable. Para cada hallazgo, Datadog evalúa cinco dimensiones de riesgo utilizando el contexto de producción y muestra por qué se priorizó el hallazgo.

| Dimensión | Pregunta que responde | Ejemplos de señales |
|---|---|---|
| **Alcanzabilidad** | ¿Está el componente vulnerable realmente en ejecución? | Imagen afectada observada en ejecución en una carga de trabajo de producción. Paquete vulnerable observado ejecutándose en tiempo de ejecución. |
| **Exposición** | ¿Pueden los atacantes acceder a él? | Recurso accesible públicamente desde el análisis de red estática. Evidencia en tiempo de ejecución de exposición a ataques activos. |
| **Explotabilidad** | ¿Es probable que los atacantes lo exploten? | Existe código de explotación pública. Hallazgo explotado activamente en la naturaleza (listado en [CISA KEV][1]). Alta probabilidad de explotación ([EPSS][2]). |
| **Criticidad empresarial** | ¿Tendría un compromiso un alto impacto? | El recurso apoya una función empresarial crítica ([Joya de la Corona](#crown-jewels)). Se ejecuta con privilegios elevados y procesa datos sensibles. |
| **Accionabilidad** | ¿Puede el equipo adecuado corregirlo? | Propietario del servicio identificado. Solución o mitigación disponible. |

El Motor de Priorización en Tiempo de Ejecución prioriza un hallazgo cuando estas señales indican un riesgo real y explotable en su entorno. Los hallazgos que no cumplen con los criterios de priorización permanecen visibles, pero se mueven fuera de la cola de triaje activo.

## Joyas de la Corona {#crown-jewels}

[Las Joyas de la Corona][8] son los recursos que respaldan las funciones empresariales más críticas (servicios, servidores, bases de datos, contenedores, etc.). Datadog las infiere automáticamente a partir de datos de observabilidad como el flujo de traza de APM, dependencias de servicio (fan-in), SLOs, tráfico, incidentes y más.

Las Joyas de la Corona se actualizan continuamente a medida que cambia su entorno. También puede agregar sus propias Joyas de la Corona manualmente en Datadog Cloud Security.

## Propiedad {#ownership}

[La Propiedad][7] identifica al equipo o propietario del servicio responsable de corregir un hallazgo de seguridad. Datadog infiere la propiedad a partir de metadatos de observabilidad como etiquetas de servicio, etiquetas de equipo, metadatos de implementación, configuración de guardia, enlaces de control de versiones, entradas del catálogo de servicios y más.

Cuando se conoce la propiedad, el motor puede dirigir los hallazgos al equipo correcto en lugar de dejar que los equipos de seguridad persigan manualmente a los propietarios de la remediación.


## Comience {#get-started}

1. Despliegue la versión 7.79 o posterior del Agente de Datadog con Cloud Security habilitado. Vea [Configuración de Cloud Security][3].
2. Habilite [Runtime Package Tracking][4] en el Agente de Datadog para mostrar la señal de *paquete en uso* en los hallazgos de vulnerabilidad.
3. Abra el [Resumen de Cloud Security][5] en Datadog. Los hallazgos priorizados se muestran en la parte superior de cada embudo y en la [Bandeja de Entrada de Seguridad][6].


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /es/security/cloud_security_management/setup/
[4]: /es/security/cloud_security_management/setup/agent/
[5]: https://app.datadoghq.com/security/csm
[6]: /es/security/security_inbox/
[7]: /es/security/cloud_security_management/guide/frontier_group/ownership_agent/
[8]: /es/security/cloud_security_management/crown_jewels/