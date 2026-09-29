---
description: Identifique y solucione las brechas de cobertura de Workload Protection,
  resuelva problemas de implementación de Agent y reglas, y revise la cobertura de
  detección en todo su entorno.
disable_toc: false
title: Revise y mejore la cobertura
---
Utilice los procedimientos de esta página para reducir los puntos ciegos, verificar la alineación de las políticas y ayudar a Workload Protection a detectar y responder a las amenazas en todo su entorno. Puede incorporar estas comprobaciones en las revisiones de cumplimiento, CI/CD e infraestructura.

Para obtener información sobre las vistas y estados de Coverage, consulte [Coverage][1].

## Orden de revisión recomendada {#recommended-review-order}

Utilice este orden para revisar la cobertura en todo su entorno:

1. Revise el entorno completo para establecer una línea base. Valide que los recursos que parecen estar totalmente cubiertos tengan políticas, reglas y Agents en funcionamiento para descubrir fallas silenciosas antes de abordar las brechas visibles.
2. Identifique las cargas de trabajo sin protección o parcialmente protegidas, luego priorice los recursos con el mayor impacto empresarial y exposición.
3. Verifique la implementación de políticas y reglas en los recursos priorizados, y verifique si hay Agents obsoletos o en mal estado en todas las cargas de trabajo restantes.
4. Mapee la cobertura de detección a MITRE ATT&CK, luego implemente o actualice las reglas de detección para cerrar las brechas.
5. Reevalúe la cobertura para confirmar que sus cambios surtieron efecto.
6. Registre el estado final para cumplimiento, auditorías, referencia de incidente y comparaciones futuras.

## Coverage widget {#coverage-widget}

El widget en la parte superior de la Coverage page muestra el porcentaje de sus recursos protegidos con Workload Protection, junto con cualquier hallazgo. Utilice sus botones para investigar cargas de trabajo sin protección y Agents obsoletos o incompletos.

{{< img src="security/workload_protection/coverage_page/coverage_top_widgets.png" alt="Widgets superiores de la Coverage page que muestran la cobertura de recursos, el estado de carga de reglas, la adopción de Workload Protection y la implementación de Remote Config" width="100%">}}

## Encuentre cargas de trabajo sin protección {#find-workloads-without-protection}

- {{< ui >}}View without WP{{< /ui >}}: Hosts que ejecutan el Datadog Agent sin Workload Protection habilitado. Esto abre Fleet Automation, donde puede [configurar Workload Protection][3].
- {{< ui >}}View without Agents{{< /ui >}}: Hosts que no ejecutan el Datadog Agent, los cuales no pueden ser evaluados por Workload Protection. Esto abre el Infrastructure Catalog.

## Corrija los errores de implementación de políticas o reglas {#fix-policy-or-rule-deployment-errors}

Para encontrar y corregir recursos con errores de reglas:

1. En el explorador, filtre por gravedad {{< ui >}}Error{{< /ui >}}, o en el Map, seleccione un {{< ui >}}Error{{< /ui >}} hexágono.
2. Seleccione un recurso con fallas para abrir su panel lateral y revisar sus políticas. Las políticas con reglas fallidas muestran un estado de {{< ui >}}Error{{< /ui >}}.
3. Revise el veredicto de una regla fallida (por ejemplo, `syntax_error` o `unknown`) y el mensaje de error para comprender por qué falló.
4. [Edite la regla][4] según sea necesario.
5. Vuelva a implementar y confirme la corrección en Coverage.

## Encuentre Agents obsoletos o incompletos {#find-outdated-or-incomplete-agents}

- {{< ui >}}View outdated{{< /ui >}}: Recursos que ejecutan una versión del Agent anterior a la versión mínima admitida (`7.65.0`), la cual podría no ser compatible con las funciones más recientes de Workload Protection.
- {{< ui >}}View incomplete{{< /ui >}}: Recursos que reportan datos incompletos o no válidos.

Actualice o implemente el Datadog Agent, luego confirme que los recursos afectados reporten datos de cobertura completos.

## Revise la cobertura de detección {#review-detection-coverage}

Utilice las facetas del explorador bajo los grupos {{< ui >}}Rule{{< /ui >}} y {{< ui >}}Policy{{< /ui >}} para filtrar los recursos por contenido de detección aplicado. Filtre por tácticas y técnicas de MITRE ATT&CK para ver qué partes del marco están cubiertas en toda su infraestructura.

Para obtener información sobre el mapa de MITRE ATT&CK disponible en Cloud SIEM o Workload Protection, consulte [MITRE ATT&CK map][2].

## Confirme que las nuevas reglas estén cargadas {#confirm-that-new-rules-are-loaded}

Puede usar Coverage para probar e iterar en reglas de seguridad personalizadas:

1. Escriba e implemente una [nueva regla personalizada][4].
2. En Coverage, busque la regla por ID de regla, ID de política o nombre de host.
3. Confirme que el Agent haya cargado la regla correctamente.
4. Si aparecen errores, revise el veredicto, corrija la regla y vuelva a implementarla.

[1]: /es/security/workload_protection/inventory/
[2]: /es/security/detection_rules/#mitre-attck-map
[3]: /es/security/workload_protection/setup/
[4]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules