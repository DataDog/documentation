---
disable_toc: false
further_reading:
- link: logs/guide/manage-sensitive-logs-data-access/
  tag: Documentación
  text: Administre el acceso a registros de datos confidenciales
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
- link: /account_management/delete_data/
  tag: Documentación
  text: Eliminar datos
title: Eliminar registros con datos confidenciales
---
## Descripción general {#overview}

Eliminar registros que contienen datos confidenciales reduce el riesgo de exponer esos datos. Esta guía proporciona información sobre cómo:

- Verifique si es necesario eliminar los registros con datos confidenciales porque se encuentran dentro del período de retención.
- Haga que los registros con datos confidenciales no se puedan consultar.
- Redacte datos confidenciales con el Sensitive Data Scanner.
- Elimine registros con Logs Data Deletion.

## Verifique su período de retención de registros {#check-your-log-retention-period}

Datadog elimina automáticamente los registros que exceden el período de retención más largo para su organización.

Para verificar o cambiar su período de retención de registros:

1. Navegue a la página [Log Indexes][1].
1. Consulte el período de retención de registros para cada índice en la columna {{< ui >}}Retention{{< /ui >}}.
1. Si desea que los registros caduquen más rápido, haga clic en el icono {{< ui >}}Edit{{< /ui >}} en el lado derecho del índice.
1. Actualice el menú desplegable **Set Index Retention** a un nuevo período de retención.

## Haga que los registros con datos confidenciales no se puedan consultar {#make-logs-with-sensitive-data-un-queryable}

Si los registros dentro del período de retención contienen datos confidenciales, puede hacer que no se puedan consultar hasta que caduquen. Los registros que no se pueden consultar no aparecen en Log Explorer, Dashboards ni en Live Tail. Siga estas [instrucciones][2] para hacer que los registros con datos confidenciales no se puedan consultar en Datadog.

## Eliminar un índice completo {#delete-an-entire-index}

Para eliminar un índice completo:

1. Navegue a la página [Log Indexes][1].
1. Haga clic en el icono {{< ui >}}Delete{{< /ui >}} en el lado derecho del índice que desea eliminar.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}} para eliminar el índice.

## Redacte datos confidenciales con Sensitive Data Scanner {#redact-sensitive-data-with-sensitive-data-scanner}

Utilice [Sensitive Data Scanner][5] para limitar el riesgo de almacenar datos confidenciales en Datadog. Sensitive Data Scanner es un servicio de coincidencia de patrones basado en flujos que se utiliza para identificar, etiquetar y, opcionalmente, redactar o aplicar hash a datos confidenciales. Los equipos de Security y cumplimiento pueden implementar Sensitive Data Scanner para evitar fugas de datos confidenciales y limitar los riesgos de incumplimiento.

## Eliminar registros de su organización {#delete-logs-from-your-organization}

Para eliminar permanentemente los registros indexados que contienen datos confidenciales, utilice [Logs Data Deletion][3]. Logs Data Deletion le permite consultar registros dentro de un marco temporal y eliminarlos de su organización sin contactar al soporte de Datadog.

Antes de eliminar registros, confirme lo siguiente:

- Ha dejado de enviar a Datadog los registros que contienen datos confidenciales.
- Logs Data Deletion está [habilitado para su organización][6]. Solo un administrador de la organización puede habilitarlo.
- Tiene un rol con el permiso {{< ui >}}Logs Delete Data{{< /ui >}}.

<div class="alert alert-danger">Las eliminaciones son permanentes después de 10 días. Revise cada solicitud de eliminación antes de confirmarla.</div>

**Nota**: Logs Data Deletion no elimina los datos derivados de los registros eliminados, como las métricas generadas.

Para conocer el procedimiento completo, incluyendo cómo cancelar y auditar eliminaciones, consulte [Delete Data][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /es/logs/guide/manage-sensitive-logs-data-access/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /es/account_management/delete_data/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
[6]: /es/account_management/delete_data/#enable-deletion-feature