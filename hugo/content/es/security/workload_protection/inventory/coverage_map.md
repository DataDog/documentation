---
disable_toc: false
further_reading:
- link: security/detection_rules/#mitre-attck-map
  tag: Documentación
  text: Mapa de MITRE ATT&CK
- link: https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map
  tag: Nota de versiones
  text: Revisa tu cobertura de Workload Protection con el mapa de Cobertura
title: Cobertura
---

[Cobertura][1] de Workload Protection proporciona una visión en tiempo real de la cobertura de seguridad en todos tus hosts. Utiliza Cobertura para evaluar la postura de protección, identificar lagunas y tomar acciones inmediatas.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Aprovecha el mapa de Cobertura para obtener visibilidad en tiempo real del estado de protección de carga útil entre todos tus hosts y ver qué políticas se aplican eficazmente" width="100%">}}


## Funciones clave

* **Visibilidad en tiempo real**: Cobertura se actualiza cada cinco minutos para ofrecer un estado preciso y actual.
* **Filtrado granular**: busca por política, regla, versión, estado, táctica o técnica.
* **Desglose directo**: desglose desde un mapa general hasta una vista detallada de activos o políticas.
* **Alertas accionables**: destaca las cargas de trabajo en estado de advertencia o fallo para que puedas responder de forma oportuna.
* **Análisis de cobertura**: seguimiento del estado del despliegue de reglas, agents obsoletos y problemas de configuración.

## Beneficios clave

* Reduce los puntos ciegos al monitorizar las cargas de trabajo desprotegidas.
* Acorta los tiempos de detección y respuesta con procesos de corrección directa.
* Mantén el cumplimiento continuo y la alineación de las políticas.
* Integra los checks de postura con revisiones de Continuous Integration Continuous Delivery e infraestructura.

## Estado de las políticas

Los hosts se identifican con los siguientes colores:

- Verde: todas las reglas de las políticas aplicadas al host han sido aprobadas.
- Naranja: una o varias reglas de las políticas aplicadas al host contienen errores.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Aprovecha el mapa de Cobertura para obtener visibilidad en tiempo real del estado de protección de carga útil entre todos tus hosts y ver qué políticas se aplican eficazmente" width="100%">}}

Haz clic en un hexágono naranja para ver un host con reglas de política erróneas.

Las políticas se muestran con los siguientes estados:

- **Totalmente cargada:** todas las reglas de la política pasan.
- **Parcialmente cargada:** algunas de las reglas de la política fallan.
- **Completamente rechazada:** toda la política está fallando.

## Casos prácticos

He aquí algunas formas de utilizar Cobertura para mejorar la seguridad de tu carga de trabajo.

### Detección y corrección de problemas de despliegue de políticas
Desde la tarjeta de estado **Incomplete infrastructure coverage** (Cobertura incompleta de la infraestructura) de la página de Cobertura, puedes abordar los problemas de despliegue de las políticas:
1. En **Incomplete infrastructure coverage** (Cobertura de infraestructura incompleta), haz clic en **Warning** (Atención) y, a continuación, selecciona las políticas en **Security coverage needs attention** (La cobertura de seguridad necesita atención). En el mapa de Cobertura, los activos con problemas de despliegue de políticas se muestran como hexágonos naranjas.
2. Revisa la lista de políticas desplegadas. Las políticas se resaltan con estados como **Partially Loaded** (Parcialmente cargada), **Fully Rejected** (Completamente rechazada), etc.
3. En los detalles de la política, realiza una de las siguientes acciones:
   - [Edita una política][4].
   - Ve los errores de las reglas de una política y, a continuación, [edítalos][4] según sea necesario.
4. Vuelve a desplegar y confirma la corrección en el mapa de Cobertura.

### Identificar los activos sin Workload Protection

Desde la tarjeta de estado **Incomplete infrastructure coverage** (Cobertura incompleta de la infraestructura) de la página de Cobertura, puedes revisar los activos sin Workload Protection (WP) completa:

1. En **Improve infrastructure coverage** (Mejorar la cobertura de la infraestructura), haz clic en **NO WP**. **NO WP** muestra cuántos hosts están ejecutando el Datadog Agent sin Workload Protection activada.
2. Haz clic en **Inspect Hosts Without WP** (Inspeccionar hosts sin WP). Aparecerá Fleet Automation, que te permitirá [configurar Workload Protection][3].

### Identificar los activos que carecen de características clave

Desde la tarjeta de estado **Incomplete infrastructure coverage** (Cobertura incompleta de la infraestructura) de la página de Cobertura, puedes encontrar activos con lagunas de protección.

1. En **Improve infrastructure coverage** (Mejorar la cobertura de la infraestructura), haz clic en **INFO** para revisar el indicador `outdated_agent`. El indicador `outdated_agent` significa que se está ejecutando una versión obsoleta del Agent y es posible que no admita las últimas funciones de Workload Protection.
2. En **Improve infrastructure coverage** (Mejorar la cobertura de la infraestructura), haz clic en **NO AGENT**. **NO AGENT** muestra cuántos hosts no están ejecutando el Datadog Agent y, por tanto, no pueden ser evaluados por Workload Protection.
   1. Haz clic en **Inspect Hosts Without Agent** (Inspeccionar hosts sin Agent). Aparecerá la página Resource Catalog, que te permitirá dirigirte a los hosts sin agents.
3. Filtra por **Agent Version** (Versión del Agent) para detectar agents obsoletos que carezcan de actualizaciones de seguridad recientes.
4. Actualiza el Agent para garantizar una cobertura completa.

### Búsqueda de activos por técnicas y tácticas de MITRE ATT&CK

Desde la tarjeta de estado **Filter by tactics, techniques, and policy types** (Filtro por tipos de tácticas, técnicas y políticas) de la página de Cobertura, los filtros incorporados para **Tactics** (Tácticas), **Techniques** (Técnicas) y **Policies** (Políticas) muestran exactamente qué partes del framework de MITRE ATT&CK están cubiertas.

Para utilizar estos filtros con el fin de reforzar la alineación de la detección y la respuesta con los modelos de amenazas probados del framework ATT&CK de MITRE, haz lo siguiente:

1. Haz clic en **Tactics** (Tácticas) para filtrar las tácticas de alta prioridad (por ejemplo, `TA004-privilege-escalation`, `TA004-persistence`), para asegurarte de que están protegidas en todos los hosts.
2. Después de que el mapa se actualice para la táctica seleccionada, haz clic en **Techniques** (Técnicas) y selecciona una técnica para identificar lagunas en la cobertura de técnicas para sistemas críticos.
3. Haz clic en **Policies** (Políticas) y selecciona un tipo de política para ver la distribución de las políticas en la infraestructura filtrada.

Para obtener información sobre el mapa de MITRE ATT&CK disponible en SIEM o Workload Protection, consulta [Mapa de MITRE ATT&CK][2].

### Experimenta con nuevas reglas

Puedes utilizar Cobertura para testear e iterar sobre reglas de seguridad personalizadas:

1. Escribe y despliega una [nueva regla personalizada][4].
2. En **Coverage** (Cobertura), busca la regla por ID de regla, ID de política o nombre de host.
3. Confirma que el agent ha cargado la regla correctamente.
4. Si aparecen errores, revisa los detalles, corrige la regla y vuelve a desplegarla.

## Ciclo de triaje y corrección de la cobertura de la carga de trabajo

Como ejemplo de cómo utilizar la Cobertura para clasificar y corregir los problemas de cobertura, he aquí una secuencia que comienza por establecer una referencia, cerrar los puntos ciegos y asegurar los activos más críticos. A continuación, verifica los mecanismos de aplicación, restaura el estado de los agents y alinea la cobertura de detección con los comportamientos adversos conocidos. Por último, aplica actualizaciones de las reglas, confirma su eficacia y registra el estado para la referencia de auditoría e incidentes.

1. Realiza una vista completa del entorno para establecer el estado de la cobertura de referencia.
2. Concéntrate en los activos que parezcan totalmente cubiertos. Valida que tus políticas, reglas y agents funcionan según lo previsto antes de abordar las lagunas visibles. De este modo se descubren fallos silenciosos en sistemas de confianza que, de otro modo, se ignorarían.
3. Identifica todas las cargas de trabajo desprotegidas o parcialmente protegidas.
4. Da prioridad a los activos con mayor impacto y exposición empresarial.
5. Verifica el despliegue y la aplicación de las políticas en esos activos.
6. Comprueba si hay agents obsoletos o en mal estado en todas las cargas de trabajo restantes.
7. Asigna la cobertura de detección actual a MITRE ATT&CK para encontrar lagunas en tácticas y técnicas.
8. Despliega o actualiza las reglas de detección para corregir esas lagunas.
9. Vuelve a evaluar la cobertura para confirmar que los cambios de postura han surtido efecto.
10. Registra el estado final para su cumplimiento y futura comparación.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[2]: /es/security/detection_rules/#mitre-attck-map
[3]: /es/security/workload_protection/setup/
[4]: /es/security/workload_protection/workload_security_rules/custom_rules