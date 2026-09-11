---
algolia:
  tags:
  - usage attribution
  - cost attribution
aliases:
- /es/account_management/billing/advanced_usage_reporting/
- /es/account_management/billing/custom_usage_reporting/
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Configuración de plan y uso
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#identifying-areas-for-cost-optimization
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
title: Atribución de uso
---
## Descripción general {#overview}

Los administradores o usuarios con el permiso de lectura de uso pueden acceder a la pestaña de Atribución de uso desde la sección Plan y uso en Datadog. La página de Atribución de uso proporciona la siguiente información y funcionalidad:

- Enumera las claves de etiqueta existentes por las que se desglosa el uso y ofrece la capacidad de cambiar y agregar otras nuevas (hasta tres claves de etiqueta).
- Resume el uso al final de cada mes y visualiza el uso a lo largo del tiempo desglosado por etiquetas.
- Genera archivos CSV acumulados desde el inicio del mes y por hora.

Esta función no admite el uso de productos que no se pueden etiquetar durante la instrumentación. Por ejemplo, Incident Management Users, Parallel Testing Slots y Audit Trail.

**Nota**: Para desglosar la facturación de CI Pipeline y Test Optimization por equipo u otras etiquetas organizacionales, consulte [Enriquecimiento de facturación][5] en la documentación de facturación de CI Visibility.

## Primeros pasos {#getting-started}

Para comenzar a recibir datos diarios, un administrador debe elegir etiquetas para el informe.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Introducción a la atribución de uso en Datadog" style="width:100%;" >}}

El elemento emergente {{< ui >}}Edit Tags{{< /ui >}} permite lo siguiente:

- Ingresar hasta tres claves de etiqueta desde un menú desplegable. El menú desplegable está precargado con etiquetas existentes tanto en la cuenta raíz como en cualquier organización secundaria bajo la cuenta.
- Eliminar y editar etiquetas existentes.

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="Editar etiquetas en la atribución de uso" style="width:80%;" >}}

- Una vez configuradas las etiquetas, el primer informe tarda 24 horas en generarse.
- Los informes se generan de forma continua.
- Si se cambian las etiquetas, el nuevo informe refleja las nuevas etiquetas. Sin embargo, los informes anteriores conservan las etiquetas antiguas.
- Los informes mensuales reflejan el conjunto más reciente de etiquetas. Si las etiquetas se cambian a mitad de mes, se crean informes parciales del mes para cada período de informe.

## Uso total {#total-usage}

### Atribución de uso mensual {#monthly-usage-attribution}

Los informes mensuales se actualizan diariamente y proporcionan una agregación de los datos de uso hasta la fecha.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Etiquetas aplicadas en Datadog" style="width:100%;" >}}

- Los datos de productos, etiquetas y organizaciones específicos se pueden seleccionar utilizando el selector de facetas.
- Los datos se pueden agrupar y desagrupar por las claves de etiqueta seleccionadas.
- Las opciones de Valor y Porcentaje están disponibles para la visualización en tabla. 
- Los datos mostrados en la tabla se pueden editar para incluir productos seleccionados. 
- Si la opción de múltiples organizaciones está habilitada, el uso se resume en todas las organizaciones de Datadog en la cuenta principal.
- Los informes de meses anteriores son accesibles a través del selector de tiempo.
- Los informes se pueden descargar en formato CSV. Estos informes CSV incluyen tanto números de uso como porcentajes, lo que permite asignaciones y cargos simplificados. Los porcentajes se calculan por organización.

Los datos mensuales también se pueden obtener mediante la API. Para obtener más información, consulte la [documentación del punto de conexión de la API][1].

### Atribución de uso por hora {#hourly-usage-attribution}

Los datos por hora se pueden obtener mediante la API. Para obtener más información, consulte la [documentación del punto de conexión de la API][2].

### Interpretación de los datos {#interpreting-the-data}

La siguiente tabla muestra un informe diario de muestra del uso de Infra por dos etiquetas: `app` y `service`.

| public_id | hora                | app          | servicio                  | uso_total |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | servicio1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- Un valor `<empty>` significa que el recurso estaba etiquetado con la etiqueta respectiva pero no tenía un valor.
- Sin valor significa que el recurso no estaba etiquetado con esa etiqueta en particular.
- `|` (canalización) los valores separados (por ejemplo, `service1 | service2`) significan que se aplicó una etiqueta en particular varias veces en el recurso.
- Un valor de etiqueta válido (consulte la [documentación de Definición de etiquetas][3]) se refiere al valor real de la etiqueta respectiva.

#### Análisis de datos adicional {#further-data-analysis}

Al usar varias etiquetas, tanto los informes de Atribución de uso por hora como los mensuales contienen datos para todas las combinaciones posibles de esas etiquetas, y son adecuados para usarse como conjuntos de datos base para tareas de análisis de datos adicionales. Por ejemplo, puede usar la agrupación o la tabla dinámica para generar vistas centradas en un subconjunto de las etiquetas, o para realizar agregaciones en rangos de fechas personalizados.

## Seguimiento del uso {#tracking-usage}

Se puede ver una representación en series temporales de los datos de Atribución de uso haciendo clic en "Track Usage"
- Los datos de productos, organizaciones o claves de etiqueta específicos se pueden seleccionar mediante el selector de facetas.
- Los datos se pueden graficar por día, semana o mes usando el selector de tiempo sobre los gráficos.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="Gráficos de hosts de Infra separados por etiquetas" style="width:100%;" >}}


## Atribución de costos {#cost-attribution}

Para clientes de facturación directa, los informes de atribución de costos de fin de mes se generan al final de cada ciclo de facturación para permitir los procesos mensuales de contracargo y asignación de costos. 
- Los datos de costos del mes anterior están disponibles a más tardar el día 19 del mes actual.
- Para clientes de GovCloud, se debe aprobar un aviso legal antes de habilitar la función.
- Los datos de Cost Attribution mensual están [disponibles con la API][4]

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Informe de Cost Attribution" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/es/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/es/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/es/api/latest/usage-metering/#get-monthly-cost-attribution
[5]: /es/account_management/billing/ci_visibility/#billing-enrichment