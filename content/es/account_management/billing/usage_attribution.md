---
algolia:
  tags:
  - atribución de uso
  - atribución de costes
aliases:
- /es/account_management/billing/advanced_usage_reporting/
- /es/account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Parámetros de plan y uso
title: Atribución de uso
---

## Información general

<div class="alert alert-warning">
La atribución de uso es una función avanzada del plan Enterprise. Si quieres usarla en otros planes, ponte en contacto con la persona encargada de tu cuenta o escribe a <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> para solicitarla.
</div>

Los administradores o usuarios con permiso de Lectura de uso pueden acceder a la Atribución de uso pestaña desde la sección Plan y uso en Datadog. La página de Atribución de uso proporciona la siguiente información y funcionalidad:

- Acceder a listas del reparto de uso en función de las diferentes claves de etiquetas, y añadir o modificar claves nuevas (hasta un máximo de tres).
- Resume el uso al final de cada mes y visualiza el uso a lo largo del tiempo desglosado por etiquetas (tags).
- Genera archivos CSV del mes hasta la fecha y por horas.

Esta función no es compatible con el uso de productos que no se pueden etiquetar durante la instrumentación. Por ejemplo, Usuarios de gestión de incidencias, Usuarios de pruebas y CI Pipeline, Espacio de pruebas paralelas y Audit Trail. 

## Primeros pasos

Para empezar a recibir datos diarios, el administrador debe elegir etiquetas para el informe.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Primeros pasos con Usage Attribution en Datadog" style="width:100%;" >}}

La ventana emergente **Editar etiquetas** permite:

- Seleccionar hasta tres claves de etiquetas de un desplegable que se rellena con etiquetas de la cuenta raíz y de las organizaciones secundarias de la cuenta.
- Borrar y editar etiquetas existentes

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="Editar etiquetas en la Atribución de uso" style="width:80%;" >}}

- Una vez configuradas las etiquetas, el primer informe tarda 24 horas en generarse.
- Los informes se generan de forma regular.
- Si las etiquetas cambian, el nuevo informe las refleja. Sin embargo, los informes anteriores mantienen las antiguas.
- Los informes mensuales reflejan el último conjunto de etiquetas. Si se modifican las etiquetas a mediados de un mes, se crean informes parciales del mes para cada período del informe.

## Uso total

### Atribución de uso mensual

Los informes mensuales se actualizan diariamente y proporcionan una agregación de los datos de uso del mes hasta la fecha.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Etiquetas aplicadas en Datadog" style="width:100%;" >}}

- Los datos de productos específicos, etiquetas y organizaciones pueden seleccionarse con el selector de casillas.
- Los datos pueden agruparse y desagruparse mediante las claves de etiqueta seleccionadas.
- Las opciones Value (valor) y Percentage (porcentaje) pueden incluirse en la tabla.
- Los datos que aparecen en la tabla pueden editarse para incluir determinados productos.
- Si se ha activado la opción multi-org (varias organizaciones), se hace un resumen del uso para todas las organizaciones de Datadog de la cuenta principal.
- Puedes acceder a los informes de los meses anteriores con el selector de fechas.
- Los informes pueden descargarse en formato CSV. Estos informes CSV incluyen tanto las cifras de uso como los porcentajes, lo que permite simplificar las asignaciones y las devoluciones de cargos. Los porcentajes se calculan por organización.

Los datos mensuales también pueden extraerse mediante la API. Para más información, consulta la [documentación del endpoint de la API][1].

### Atribución de uso por horas

Los datos horarios pueden extraerse mediante la API. Para más información, consulta la [documentación del endpoint de la API][2].

### Interpretar los datos

La tabla a continuación presenta un ejemplo de informe diario para el uso Infra con dos etiquetas: `app` y `service`.

| Id_público | Hora                | App          | Servicio                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- El valor `<empty>` indica que el recurso se etiquetó con la etiqueta respectiva, pero sin valor.
- Si no aparece ningún valor, significa que el recurso no incluye esa etiqueta particular.
- Los valores separados por `|` (barra vertical) (por ejemplo, `service1 | service2`) indican que esa etiqueta determinada se aplicó varias veces en el recurso.
- Un valor válido de etiqueta (consulta la [documentación sobre definición de etiquetas][3]) hace referencia al valor real de la etiqueta respectiva.

#### Analizar los datos en profundidad

Cuando usas varias etiquetas, tanto los informes de atribución de uso mensual como por horas contienen datos para todas las combinaciones posibles de esas etiquetas, y se pueden utilizar como conjuntos de datos de base para analizar la información en profundidad. Por ejemplo, puedes reagrupar o cambiar de sitio las etiquetas para estudiar de forma más precisa un subconjunto de ellas o para llevar a cabo agregaciones en rangos personalizados de fechas.

## Seguimiento del uso

Se puede ver una serie temporal de los datos de Atribución de uso al hacer clic en "Rastrear uso".
- Mediante el selector de casillas pueden seleccionarse datos para productos específicos, una organización o claves de etiqueta.
- Los datos pueden representarse gráficamente para un día, una semana o un mes utilizando el selector de tiempo situado encima de los gráficos.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="Gráficos de Infra Hosts separados por etiquetas" style="width:100%;" >}}


## Atribución de costes

Para los clientes de facturación directa, los informes de atribución de costes de fin de mes se generan al final de cada ciclo de facturación para permitir la devolución mensual de gastos y los procesos de atribución de costes.
- Los datos de costes del mes anterior están disponibles a más tardar el día 19 del mes en curso.
- Los datos de atribución de costes no están disponibles actualmente en los centros de datos de GovCloud
- Los datos mensuales de Atribución de costes están [disponibles con la API][4]

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Informe de Atribución de costes" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/es/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/es/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/es/api/latest/usage-metering/#get-monthly-cost-attribution