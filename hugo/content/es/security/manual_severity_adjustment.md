---
further_reading:
- link: /security/automation_pipelines/modify_severity/
  tag: Documentación
  text: Reglas de modificador de gravedad
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Ajuste de gravedad
---
{{< product-availability >}}

Ajuste manualmente la gravedad de un hallazgo para reflejar el contexto empresarial de su organización, sin crear una [regla de modificador de gravedad][1].

## Productos compatibles {#supported-products}

Puede ajustar manualmente la gravedad de los hallazgos en los siguientes productos:

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## Permisos {#permissions}

Para ajustar la gravedad de los hallazgos, debe tener el permiso `security_monitoring_findings_write` o `appsec_vm_write`. Consulte [Access Control basado en roles][6] para obtener más información sobre los roles predeterminados de Datadog y los permisos de control de acceso basado en roles granulares.

## Ajustar la gravedad de un hallazgo {#adjust-the-severity-of-a-finding}

{{< img src="security/manual_severity_adjustment/finding_side_panel_button.png" alt="Panel lateral de un hallazgo con la opción Ajustar gravedad resaltada en el menú de desbordamiento" style="width:100%;" >}}

1. Abra un hallazgo.
2. Haga clic en {{< ui >}}Adjust Severity{{< /ui >}}. Se abre el cuadro de diálogo **Ajustar gravedad**.
3. Seleccione la nueva gravedad, por ejemplo, **Crítica**.
4. Ingrese una descripción opcional.
5. Haga clic en {{< ui >}}Adjust Severity{{< /ui >}}.

Para ajustar automáticamente la gravedad de los hallazgos que cumplen con ciertos criterios, consulte [Reglas de modificador de gravedad][1].

## Ajuste la gravedad de múltiples hallazgos {#adjust-the-severity-of-multiple-findings}

Para ajustar la gravedad de múltiples hallazgos a la vez:

1. En el explorador, seleccione hasta 50 hallazgos.
2. Haga clic en {{< ui >}}Severity{{< /ui >}}. Se abre el cuadro de diálogo **Ajustar gravedad**.
3. Seleccione la nueva gravedad, por ejemplo, **Crítica**.
4. Ingrese una descripción opcional.
5. Haga clic en {{< ui >}}Adjust Severity{{< /ui >}}.

## Identify modified findings {#identify-modified-findings}

Los hallazgos con una gravedad ajustada manualmente muestran un indicador visual en las listas del explorador y en el encabezado del panel lateral del hallazgo. Pase el cursor sobre el indicador para ver quién ajustó la gravedad y cualquier descripción que haya ingresado.

{{< img src="security/manual_severity_adjustment/severity_pill_popover.png" alt="Una píldora de gravedad que muestra un aumento de gravedad, con una ventana emergente que muestra quién ajustó la gravedad y la descripción ingresada" style="width:65%;" >}}

Para los hallazgos que tienen una puntuación CVSS (vulnerabilidad de imagen de contenedor, vulnerabilidad de servidor, vulnerabilidad de biblioteca y vulnerabilidad de código en tiempo de ejecución), la sección de gravedad del panel lateral también incluye un desglose que muestra:
- El nivel de gravedad original, la puntuación CVSS y el vector CVSS antes del ajuste.
- El nombre del usuario que realizó el ajuste y cualquier descripción ingresada.
- El nivel de gravedad resultante y la puntuación CVSS ajustada.

{{< img src="security/manual_severity_adjustment/severity_breakdown.png" alt="Un panel lateral de hallazgo que muestra el desglose de gravedad, con la gravedad original, la puntuación CVSS y el vector CVSS; el usuario que realizó el ajuste; y el nivel de gravedad resultante y la puntuación CVSS ajustada." style="width:100%;" >}}

## Vulnerability findings and CVSS scores {#vulnerability-findings-and-cvss-scores}

Para los hallazgos de vulnerabilidad que tienen una puntuación CVSS ajustada por Datadog, ajustar manualmente la gravedad también actualiza la puntuación ajustada almacenada en `@severity_details.user_adjusted`. La puntuación actualizada se establece aproximadamente en el punto medio del rango CVSS v3 de la gravedad objetivo:

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

El vector CVSS original nunca se modifica. No se genera ningún vector sintético para que coincida con la puntuación ajustada.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/automation_pipelines/modify_severity/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /es/account_management/rbac/permissions/#cloud-security-platform