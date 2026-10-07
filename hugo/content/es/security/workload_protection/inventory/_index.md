---
aliases:
- /es/security/workload_protection/inventory/coverage_map
- /es/security/workload_protection/inventory/hosts_and_containers
- /es/security/workload_protection/inventory/serverless
description: Evalúe la cobertura de Workload Protection en hosts, ECS Fargate y cargas
  de trabajo de EKS Fargate, incluyendo el estado de implementación de Agent, políticas
  y reglas.
disable_toc: false
further_reading:
- link: /security/detection_rules/#mitre-attck-map
  tag: Documentación
  text: Mapa de MITRE ATT&CK
- link: https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map
  tag: Nota de la versión
  text: Revise su cobertura de Workload Protection con el mapa de Cobertura
title: Cobertura
---
Workload Protection [Cobertura][1] proporciona una vista en tiempo real de la cobertura de seguridad en sus hosts, ECS Fargate y cargas de trabajo de EKS Fargate. Utilice Cobertura para evaluar la postura de protección, identificar brechas y actuar sobre cargas de trabajo desprotegidas o mal configuradas.

La cobertura refleja si las políticas y las reglas de Agent se cargaron correctamente. Para saber cómo llegan las políticas a sus Agent, consulte [Habilitar e implementar políticas][5].

Para identificar y abordar las brechas de cobertura, consulte [Revisar y mejorar la cobertura][6].

{{< img src="security/workload_protection/coverage_page/coverage_explorer.png" alt="Vista de explorador de la página de Cobertura que muestra los recursos en una tabla facetada" width="100%">}}

## Vistas {#views}

La cobertura tiene dos vistas. Utilice el interruptor en la parte superior de la página para cambiar entre ellas:

- {{< ui >}}Explorer{{< /ui >}}: Una tabla facetada de sus recursos. Busque y filtre recursos por las facetas {{< ui >}}Agent{{< /ui >}}, {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Policy{{< /ui >}}, {{< ui >}}Infrastructure{{< /ui >}} y {{< ui >}}Container{{< /ui >}}, luego abra un recurso para inspeccionar sus reglas de Agent y el estado de implementación de políticas.

- {{< ui >}}Map{{< /ui >}}: Un mapa visual donde cada recurso aparece como un hexágono coloreado según la gravedad de su estado de cobertura.

{{< img src="security/workload_protection/coverage_page/coverage_map.png" alt="Vista de mapa de la página de Cobertura que muestra los recursos como hexágonos coloreados según el estado de cobertura" width="100%">}}

En ambas vistas, usted puede:

- {{< ui >}}Group by{{< /ui >}} Proveedor de nube, SO, versión del Agent, gravedad o clúster de Kubernetes.
- Actualice la vista bajo demanda.

Un recurso aparece en Cobertura tan pronto como su Agent carga su conjunto de reglas. Cuando un recurso se desconecta, se elimina de Cobertura en un plazo de 15 minutos.

## Estados de cobertura {#coverage-statuses}

### Estado de cobertura del recurso {#resource-coverage-status}

El estado de cobertura de cada recurso se clasifica en una de dos categorías de gravedad, según las reglas cargadas en él:

| Gravedad | Significado |
|----------|---------|
| Aprobado | Todas las reglas se cargaron correctamente o se filtraron según lo esperado. |
| Error | Una o más reglas tienen errores que deben corregirse, o el recurso informó datos incompletos. |

En la vista de Mapa, los recursos se muestran como hexágonos coloreados según su gravedad. Haga clic en un hexágono para inspeccionar un recurso y ver sus políticas y reglas.

### Estados de la política {#policy-statuses}

Cada política cargada en un recurso tiene uno de los siguientes estados:

- {{< ui >}}Loaded{{< /ui >}}: Todas las reglas de la política se aprueban.
- {{< ui >}}Error{{< /ui >}}: Una o más reglas de la política tienen errores.

### Estados de la regla {#rule-statuses}

Cada regla informa uno de los siguientes estados:

- {{< ui >}}Loaded{{< /ui >}}: La regla se cargó correctamente.
- {{< ui >}}Filtered{{< /ui >}}: La regla no se aplicó intencionalmente (por ejemplo, la versión del Agent es demasiado baja o el tipo de evento está deshabilitado).
- {{< ui >}}Error{{< /ui >}}: No se pudo cargar la regla.

Cuando una regla está filtrada o presenta un error, un **veredicto** explica el motivo:

| Veredicto | Significado |
|---------|---------|
| `syntax_error` | La expresión de la regla no es válida. |
| `unknown` | El Agent no pudo cargar la regla. |
| `filtered_agent_version` | La versión del Agent es demasiado baja para esta regla. |
| `filtered_event_type_disabled` | El tipo de evento está deshabilitado en la configuración. |
| `filtered_rule_filter` | La regla fue excluida por un filtro de reglas. |

Para entender por qué falla una regla, seleccione el recurso para abrir su panel lateral. El panel lateral enumera las políticas y reglas del recurso. Para cada regla, muestra la expresión, el estado y el veredicto, así como el mensaje de error reportado por el Agent.

{{< img src="security/workload_protection/coverage_page/coverage_side_panel.png" alt="Panel lateral del recurso que muestra los estados de las políticas y reglas con sus veredictos" width="100%">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[5]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management#enable-and-deploy-policies
[6]: /es/security/workload_protection/inventory/review_improve_coverage