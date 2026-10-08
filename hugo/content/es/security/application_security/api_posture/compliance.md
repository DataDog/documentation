---
description: Evalúe su postura de seguridad de API frente a marcos de Compliance estándar
  de la industria utilizando App and API Protection.
further_reading:
- link: security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: Documentación
  text: Marcos y puntos de referencia de Cloud Security Compliance.
- link: https://owasp.org/API-Security/editions/2023/en/0x00-header/
  tag: Externo
  text: OWASP API Security Top 10 2023
title: Compliance
---
## Descripción general {#overview}

API Posture Compliance le permite evaluar continuamente su postura de seguridad de API frente a marcos estándar de la industria. Asigna las reglas integradas de detección de seguridad de API de Datadog a los controles de los marcos de Compliance, y proporciona una puntuación de postura en tiempo real que muestra qué controles están aprobados o fallidos en sus servicios.

A diferencia de [Cloud Security Compliance][1], que evalúa las configuraciones erróneas de la infraestructura en la nube y los riesgos de identidad, API Posture Compliance se centra exclusivamente en **hallazgos de seguridad de API**: amenazas y vulnerabilidades detectadas en el tráfico que llega a las API de su aplicación.

{{< img src="security/application_security/api_posture/aap_compliance_framework_detail.png" alt="La página de detalles del marco OWASP API Security Top 10, que muestra una puntuación de postura, hallazgos fallidos y un desglose de gravedad de las reglas fallidas por requisito." style="width:100%;">}}

## Frameworks soportados {#supported-frameworks}

### OWASP API Security Top 10 (2023) {#owasp-api-security-top-10-2023}

El marco OWASP API Security Top 10 identifica los riesgos de seguridad más críticos para las API. Datadog asigna sus reglas de detección de seguridad de API a las diez categorías:

| Categoría | Nombre | Descripción |
|----------|------|-------------|
| API1:2023 | Autorización de nivel de objeto rota | Las API no verifican si un usuario está autorizado para acceder a objetos específicos, lo que permite a los atacantes leer o manipular datos que pertenecen a otros usuarios. |
| API2:2023 | Autenticación rota | Los mecanismos de autenticación defectuosos o ausentes permiten a los atacantes robar tokens, suplantar a los usuarios o eludir los controles de inicio de sesión por completo. |
| API3:2023 | Autorización de nivel de propiedad de objeto rota | Las API exponen propiedades de objetos confidenciales que los usuarios no deberían poder leer ni escribir, lo que permite ataques de asignación masiva o fuga de datos. |
| API4:2023 | Consumo de recursos sin restricciones | Las API no imponen límites en el tamaño o la tasa de solicitudes, lo que permite ataques de denegación de servicio o el abuso de recursos descendentes y costos de terceros. |
| API5:2023 | Autorización de nivel de función rota | Los controles de acceso inadecuados permiten a los usuarios no autorizados invocar funciones de API administrativas o privilegiadas que no están destinadas a su rol. |
| API6:2023 | Acceso sin restricciones a flujos de negocio confidenciales | Los flujos de negocio expuestos, como el pago o el inicio de sesión, pueden automatizarse y abusarse a gran escala sin límites de tasa adecuados o detección de anomalías. |
| API7:2023 | Server Side Request Forgery | Las API realizan solicitudes HTTP del lado del servidor a URL proporcionadas por atacantes, lo que potencialmente expone servicios internos, metadatos de la nube u otros puntos de conexión confidenciales. |
| API8:2023 | Configuración de seguridad incorrecta | Los valores predeterminados inseguros, los mensajes de error detallados, el almacenamiento en la nube abierto o la falta de refuerzo de seguridad dejan a las API expuestas a ataques oportunistas. |
| API9:2023 | Gestión de inventario inadecuada | Las versiones de API obsoletas, sin documentar o en la sombra permanecen accesibles sin supervisión, lo que amplía la superficie de ataque más allá de lo que se mantiene activamente. |
| API10:2023 | Consumo inseguro de API | Confiar en las respuestas de API de terceros sin la validación adecuada expone a la aplicación a ataques de inyección, datos inesperados o compromisos posteriores. |

## Cómo funciona {#how-it-works}

- **Reglas de detección**: Cada regla de detección de seguridad de Datadog API está etiquetada con los controles OWASP que cubre. Cuando una regla se activa y genera un hallazgo, el control asociado se marca como **fallido** para el servicio afectado.
- **Puntuación de postura**: La puntuación de postura refleja la proporción de controles que están completamente aprobados frente a aquellos con al menos un hallazgo fallido. La puntuación se calcula utilizando la misma metodología que las [puntuaciones de postura de Cloud Security][3].
- **Compliance Frameworks page**: La [Compliance Frameworks page][4] enumera todos los marcos disponibles para su contexto de seguridad de API. Para cada marco de trabajo, puede examinar los detalles a nivel de control, filtrar por gravedad y abrir un panel lateral de hallazgos para investigar eventos individuales de seguridad de API.

## Visualice su postura de Compliance {#view-your-compliance-posture}

Navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Compliance{{< /ui >}}][4] para abrir la página de Compliance Frameworks. Usted puede:
- Seleccione un marco de trabajo (por ejemplo, OWASP API Security Top 10) para ver el estado de aprobación/fallo por control.
- Haga clic en un control fallido para visualizar la lista de hallazgos de seguridad de API que causaron su fallo.
- Abra el panel lateral de un hallazgo para visualizar el punto de conexión afectado, la gravedad y los pasos de remediación recomendados.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
[2]: https://owasp.org/API-Security/editions/2023/en/0x00-header/
[3]: /es/glossary/#security-posture-score
[4]: https://app.datadoghq.com/security/compliance/home?context=aap