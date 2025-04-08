---
further_reading:
- link: https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/
  tag: Blog
  text: Acelerar las investigaciones con información de Datadog Cloud SIEM basada
    en riesgos y análisis de entidades AWS
title: Información sobre riesgos para entidades AWS
---

## Información general

La [información sobre riesgos para entidades de AWS Cloud SIEM][4] consolida múltiples fuentes de datos, como las amenazas SIEM y las informaciones de CSM en un perfil que representa una única entidad de seguridad, como un usuario IAM.

Con la información sobre riesgos, puedes:

- Explorar entidades, filtrándolas por atributos como la [gravedad de la puntuación de riesgo](#risk-scoring) y los riesgos de configuración.
- Visualizar todos los datos relevantes para una entidad, como señales, configuraciones erróneas y riesgos de identidad.
- Clasificar elementos relevantes en bloque.
- Adoptar medidas paliativas como la creación de una eliminación global o de un caso para una entidad.

## Requisitos previos

- Para la cobertura de la información sobre riesgos de AWS, [AWS debe estar configurado para Cloud SIEM][1].
- (Opcional) Para ver la información de Cloud Security Management (CSM) asociada al panel de entidades, [CSM debe estar configurado][2].


## Explorar información sobre riesgos

### Consultar y filtrar entidades

En el [Explorador de información sobre riesgos][4], puedes ver todas las entidades que tienen asociada una puntuación de riesgo distinta de cero.

{{< img src="security/entities/entities-explorer2.png" alt="Lista de las entidades y sus puntuaciones de riesgo en el Explorador de información sobre riesgos" style="width:100%;" >}}

### Crear rápidamente el contexto de una entidad

Haz clic en una entidad en el [Explorador][4] para abrir el panel lateral de la entidad.

{{< img src="security/entities/entity-side-panel2.png" alt="Panel lateral de una entidad" style="width:90%;" >}}

La sección **Qué ha pasado** del panel resume el recuento de señales, configuraciones erróneas y riesgos de identidad, y su contribución a la puntuación de riesgo, así como cualquier riesgo potencial de configuración.

La sección **Qué contribuye a la puntuación** muestra la lista de señales activadas, configuraciones erróneas relevantes y riesgos de identidad.

### Clasificación y mitigación de amenazas en bloque

La sección **Siguientes pasos** del panel lateral de la entidad incluye los pasos de mitigación disponibles para señales SIEM, configuraciones erróneas y riesgos de identidad.

{{< img src="security/entities/entities-next-steps2.png" alt="Pasos siguientes disponibles para una entidad, como se muestra en el panel lateral de la entidad" style="width:80%;" >}}

## Puntuación de riesgo

La puntuación de riesgo de una entidad se aproxima al nivel de riesgo de la entidad en los últimos 14 días de actividad.

La puntuación de riesgo se calcula a partir de las características de las señales asociadas de la entidad, como el nivel de gravedad de la señal y cuántas veces se activó.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/es/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/entities