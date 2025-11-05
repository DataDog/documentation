---
further_reading:
- link: https://docs.datadoghq.com/account_management/billing/
  tag: Documentación
  text: Facturación
- link: https://docs.datadoghq.com/account_management/billing/usage_details/
  tag: Documentación
  text: Detalles de uso
- link: https://docs.datadoghq.com/account_management/multi_organization/
  tag: Documentación
  text: Gestión de cuentas de varias organizaciones
title: Detalles de costes
---

## Información general

El resumen de costes y las devoluciones de costes te ayudan a entender tus costes estimados del mes hasta la fecha, aquellos previstos para final de mes y los costes históricos de Datadog. Están disponibles los datos de los costes de los últimos 15 meses.

Puedes desglosar tus costes por suborganización y por producto para:
- Asignar los costes en función de su origen
- Obtener información sobre el seguimiento de los costes

### Permisos

Los usuarios con los [permisos][1] de lectura de facturación (`billing_read`) y lectura de uso (`usage_read`) pueden ver los datos de resumen de costes y devoluciones de costes. Los usuarios con el rol de administrador de Datadog tienen estos permisos por defecto.


## Resumen de costes

Utiliza el resumen de costes para:
- Ver los costes estimados del mes hasta la fecha y aquellos previstos para final de mes
- Ver los costes históricos
- Filtrar y agrupar costes por producto o suborganización
- Ver las variaciones intermensuales en % y $ de los costes
- Ver las tendencias de los costes durante el mes
- Ver los costes acumulados día a día

### Costes previstos (organización principal)

Los costes previstos para final de mes se calculan aplicando a las tarifas contratadas los datos de uso previstos del mes anterior y del mes actual. Los costes previstos para final de mes se actualizan diariamente y pueden cambiar con el tiempo, dependiendo de tu consumo a lo largo de ese mes. Dado que los costes son una predicción, el importe puede diferir de tu coste mensual final. 

### Resumen de costes (organización principal)

La función de resumen de costes varía en función de si utilizas Datadog como organización única o como organización múltiple. Como organización múltiple, puedes ver los costes estimados, previstos e históricos de la organización principal y de cada suborganización. 

{{< img src="account_management/plan_and_usage/multiorg-current-month-historical-costs.png" alt="Captura de pantalla de resumen de costes del mes actual de una organización principal, que muestra el coste total del mes hasta la fecha, el coste previsto, un gráfico con desgloses de costes acumulados y una tabla de resumen que incluye las variaciones de costes intermensuales." >}}

Consulta los costes históricos volviendo a los meses anteriores o utiliza el desplegable de fechas para ver los costes de 1, 3, 6 o 12 meses.

{{< img src="account_management/plan_and_usage/parent-org-multi-month-cost-changes.png" alt="Captura de pantalla de los costes históricos de una organización principal durante un periodo de tres meses, que muestra el coste total del mes, un gráfico con desgloses de costes acumulados y una tabla de resumen que incluye las variaciones de costes intermensuales." >}}

1. Una vez iniciada la sesión en la organización principal, ve a [Plan y uso][2].
1. Haz clic en la pestaña **Uso**.
1. En el caso de una organización múltiple, asegúrate de que está seleccionada la pestaña **Total**.

#### Ver y filtrar

Utiliza las facetas de búsqueda de la izquierda para filtrar los costes por **Productos**, **Suborganizaciones** o **Desglose de costes**. Utiliza la pestaña **Coste diario** para ver cómo cambiaron los costes acumulados día a día en el mes actual. 


#### Descargar

Para descargar los datos como archivo de valores separados por comas, haz clic en **Download as CSV** (Descargar como CSV). Los datos están disponibles para el mes actual y los meses anteriores definidos previamente. Utiliza el campo `Cost Type` para distinguir los registros:
- **Proyectado**: Los datos están disponibles para el mes actual.
- **Estimado del mes hasta la fecha**: Los datos están disponibles desde el primer día del mes hasta la fecha actual. Si aún no se dispone de los datos de costes históricos del mes anterior, también se muestran los datos de costes estimados del mes anterior.
- **Histórico**: Los datos están disponibles después del cierre del mes, que es aproximadamente 16 días después del final del mes.

Para consultar datos de costes estimados a través de la API, consulta [Obtener costes estimados en tu cuenta][3]. Para consultar datos de costes previstos a través de la API, consulta [Obtener costes previstos en tu cuenta][6].

### Resumen de costes (suborganización)

<div class="alert alert-danger">Esta función tiene una disponibilidad limitada. Para solicitar acceso y confirmar que tu organización cumple los criterios de la función, ponte en contacto con tu representante de cuenta o con el <a href="https://docs.datadoghq.com/help/">servicio de atención al cliente</a>.</div>

Como suborganización, sólo puedes ver los costes de tu organización. Esta restricción permite una propiedad más distribuida y elimina la necesidad de conceder permisos de administrador más amplios a la organización principal.

{{< img src="account_management/plan_and_usage/suborg-cost-trends.png" alt="Captura de pantalla de resumen de costes del mes actual de una suborganización, que muestra el coste total del mes hasta la fecha, el coste previsto, un gráfico con desgloses de costes acumulados y una tabla de resumen que incluye las variaciones de costes intermensuales.">}}

Consulta los costes históricos volviendo a los meses anteriores o utiliza el desplegable de fechas para ver los costes de 1, 3, 6 o 12 meses.

{{< img src="account_management/plan_and_usage/suborg-multi-month-cost-changes.png" alt="Captura de pantalla de los costes históricos de una suborganización durante un periodo de seis meses, que muestra el coste total del mes, un gráfico con desgloses de costes acumulados y una tabla de resumen que incluye las variaciones de costes intermensuales." >}}

1. Una vez iniciada la sesión en la suborganización, ve a [Plan y uso][2].
1. Haz clic en la pestaña **Uso**.
1. Asegúrate de que está seleccionada la pestaña **Total**.

#### Ver y filtrar

Utiliza las facetas de búsqueda de la izquierda para filtrar los costes por **Productos** o **Desglose de costes**. Utiliza la pestaña **Coste diario** para ver cómo cambiaron los costes acumulados día a día en el mes actual. 

#### Descargar

Para descargar los datos como archivo de valores separados por comas, haz clic en **Download as CSV** (Descargar como CSV).

## Devolución de costes

Utiliza las devoluciones de costes para:
- Ver los costes estimados del mes hasta la fecha y los costes históricos de organizaciones múltiples
- Atribuir costes a cada suborganización

Las devoluciones de costes se derivan de:
- Cálculo de la tasa de uso de la suborganización. Esto se hace dividiendo el uso por suborganización por el uso total de la organización principal.
- Aplicando la tasa de uso de la suborganización a los costes de la organización principal, aplicando las devoluciones de costes por suborganización.

### Devoluciones de costes históricos

Desde una organización principal, visualiza los costes históricos finalizados, agregados por producto y suborganización.

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="Captura de pantalla de una tabla denominada 'Resumen de uso y costes', que muestra el uso total en dólares estadounidenses de cuatro suborganizaciones y el coste total." >}}

1. Una vez iniciada la sesión en la organización principal, ve a [Plan y uso][2].
1. Selecciona la pestaña **Uso**.
1. Haz clic en **Individual Organizations** (Organizaciones individuales).
1. Asegúrate de que los conmutadores **Facturable** y **Coste** están seleccionados.
1. Utiliza el selector de fechas para ver un mes anterior para el que se haya completado la facturación.

**Nota**: Los datos están disponibles tras el cierre del mes, que es aproximadamente 16 días después del final del mes.

### Estimación de las devoluciones de costes

Desde una organización principal, visualiza los costes estimados, agregados por producto y suborganización.

Los datos de costes estimados están disponibles para el mes actual. Si aún no se dispone de los datos de costes históricos del mes anterior, también se mostrarán los datos de costes estimados del mes anterior.

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="Captura de pantalla de una tabla denominada 'Resumen de uso y costes', que muestra el uso total en dólares estadounidenses de cuatro suborganizaciones y el coste total." >}}

1. Una vez iniciada la sesión en la organización principal, ve a [Plan y uso][2].
1. Selecciona la pestaña **Uso**.
1. Haz clic en **Individual Organizations** (Organizaciones individuales).
1. Asegúrate de que los conmutadores **Facturable** y **Coste** están seleccionados.
1. Asegúrate de que el selector de fechas muestra el mes actual o el anterior.

### Descargar

- Para descargar datos históricos o estimados de devoluciones de costes como archivo de valores separados por comas, haz clic en **Download as CSV** (Descargar como CSV).
- Para consultar los datos históricos de devoluciones de costes a través de la API, consulta [Obtener costes históricos en tu cuenta][4].
- Para consultar los datos estimados de devoluciones de costes a través de la API, consulta [Obtener costes estimados en tu cuenta][3].

## Cómo afectan las agregaciones de facturación a las variaciones de costes

Tu factura estimada del mes hasta la fecha de Datadog varía a lo largo del mes. El tipo de agregación utilizada para facturar cada producto determina cómo se ven afectados los costes. Para una mejor visualización, consulta el gráfico de características del [resumen de costes][5]. Cada filtro **Productos** incluye el método de agregación de facturación correspondiente, junto al nombre del producto.

### Facturación por porcentaje y uso medio

Los productos facturados por el recuento máximo (marca de agua alta) del 99% inferior de uso del mes incluyen hosts de infraestructura y hosts APM. Los productos facturados por la media del mes incluyen métricas personalizadas y tareas de Fargate. Para estos dos tipos de productos, cabe esperar que sus costes se mantengan relativamente estables a lo largo del mes. Sin embargo, están sujetos a cambios de coste si se produce un pico o un descenso significativo en el uso.

### Facturación por suma de uso

Los productos facturados por la suma del uso a lo largo del mes incluyen logs indexados y logs ingeridos. Para este tipo de productos, cabe esperar que sus costes aumenten o disminuyan en función de los cambios en el volumen de uso.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /es/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /es/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /es/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /es/api/latest/usage-metering/#get-projected-cost-across-your-account