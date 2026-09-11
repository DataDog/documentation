---
aliases:
- /es/security/cloud_siem/entities_and_risk_scoring
further_reading:
- link: https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/
  tag: Blog
  text: Acelerar las investigaciones con información de Datadog Cloud SIEM basada
    en riesgos y análisis de entidades AWS
title: Información sobre riesgos
---

## Información general

[Risk Insights de Cloud SIEM][4] consolida múltiples fuentes de datos, como amenazas SIEM e información de Cloud Security, en un perfil que representa una única entidad de seguridad, como un usuario de IAM.

Con la información sobre riesgos, puedes:

- Explorar entidades, filtrándolas por atributos como la [gravedad de la puntuación de riesgo](#risk-scoring) y los riesgos de configuración.
- Visualizar todos los datos relevantes para una entidad, como señales, configuraciones erróneas y riesgos de identidad.
- Clasificar elementos relevantes en bloque.
- Adoptar medidas paliativas como la creación de una eliminación global o de un caso para una entidad.

## Requisitos previos

- Para la cobertura de Risk Insights, GitHub, [Azure][6], [GCP][5] o [AWS][1] deben estar configurados para Cloud SIEM.
- (Opcional) Para ver la información asociada de Cloud Security en el panel de entidades, [Cloud Security debe estar configurado][2].


## Explorar información sobre riesgos

### Consultar y filtrar entidades

En el [Explorador de información sobre riesgos][4], puedes ver todas las entidades que tienen asociada una puntuación de riesgo distinta de cero.

{{< img src="security/entities/entities-explorer3.png" alt="Una lista de entidades y su puntuación de riesgos en el Risk Insights Explorer" style="width:100%;" >}}

### Crear rápidamente el contexto de una entidad

Haz clic en una entidad en el [Explorador][4] para abrir el panel lateral de la entidad.

{{< img src="security/entities/entity-side-panel3.png" alt="El panel lateral para una entidad" style="width:90%;" >}}

La sección **Qué ha pasado** del panel resume el recuento de señales, configuraciones erróneas y riesgos de identidad, y su contribución a la puntuación de riesgo, así como cualquier riesgo potencial de configuración.

La sección **Qué contribuye a la puntuación** muestra la lista de señales activadas, configuraciones erróneas relevantes y riesgos de identidad.

### Clasificación y mitigación de amenazas en bloque

La sección **Siguientes pasos** del panel lateral de la entidad incluye los pasos de mitigación disponibles para señales SIEM, configuraciones erróneas y riesgos de identidad.

{{< img src="security/entities/entities-next-steps2.png" alt="Pasos siguientes disponibles para una entidad, como se muestra en el panel lateral de la entidad" style="width:80%;" >}}

## Puntuación de riesgo

La puntuación de riesgo de una entidad se aproxima al nivel de riesgo de la entidad en los últimos 14 días de actividad.

La puntuación de riesgo se calcula a partir de las características de las señales asociadas de la entidad, como el nivel de gravedad de la señal y cuántas veces se activó.

### Impacto de la puntuación de la señal

Cada señal tiene un impacto de puntuación. Puedes ver el impacto de la puntuación de una señal en el panel de entidades.

**Nota**: El impacto de la puntuación de una señal dura 2 semanas, tras las cuales la puntuación baja a `0`.

| Gravedad de la señal | Número de puntos |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` y `Info`| `0`              |

### Umbral de gravedad de la entidad

El umbral de gravedad de una entidad se calcula sumando el impacto de la puntuación de todas las señales asociadas a la entidad.

| Umbral de gravedad de la entidad | Suma del impacto de la puntuación de todas las señales relacionadas  |
|-----------------------------| -------------------------------------------------|
| `Critical`                  | Mayor o igual que `100`.                   |
| `High`                      | Mayor o igual que `50` y menor que `100`.|
| `Medium`                    | Mayor o igual que `25` y menor que `50`. |
| `Low`                       | Mayor o igual que `10` y menor que `25`. |
| `Info`                      | Menos de `10`.                                   |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/es/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/siem/risk-insights
[5]: /es/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
[6]: /es/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/