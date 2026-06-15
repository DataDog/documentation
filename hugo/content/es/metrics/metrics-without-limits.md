---
algolia:
  tags:
  - metrics without limits
aliases:
- /es/metrics/faq/metrics-without-limits/
- /es/metrics/guide/metrics-without-limits-getting-started/
- /es/metrics/faq/why-is-my-save-button-disabled/
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Controlar de manera dinámica el volumen de métricas personalizadas con Metrics
    without LimitsTM
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participar en una sesión interactiva para descubrir todo el potencial de las
    métricas
title: Metrics without LimitsTM
---

## Información general

Metrics without LimitsTM proporciona flexibilidad y control sobre tus volúmenes de métricas personalizadas al desvincular la ingesta e indexación de métricas personalizadas. Solo pagas por las etiquetas (tags) de las métricas personalizadas que son valiosas para tu organización.

Metrics without LimitsTM te permite configurar las etiquetas de todos los tipos de métricas en la aplicación seleccionando una lista de etiquetas permitidas que se pueden consultar en Datadog; de este modo, se eliminan automáticamente las etiquetas no esenciales asociadas a métricas empresariales o de nivel de aplicación (por ejemplo, `host`). Como alternativa, puedes configurar una lista de bloqueo de etiquetas en la aplicación para eliminar y excluir etiquetas; de este modo, se conservan automáticamente las etiquetas esenciales restantes que aportan valor empresarial a tus equipos. Estas funciones de configuración se encuentran en la página [Resumen de métricas][1].

En esta página se identifican los componentes clave de Metrics without LimitsTM que pueden ayudarte a gestionar los volúmenes de métricas personalizadas dentro de tu presupuesto de observabilidad.

### Configuración de etiquetas para una única métrica

#### Lista de etiquetas permitidas

1. Haz clic en el nombre de cualquier métrica para abrir su panel lateral de detalles. 
2. Haz clic en **Manage Tags** (Gestionar etiquetas), luego en **Include tags** (Incluir etiquetas) para configurar las etiquetas que quieras que se puedan consultar en dashboards, notebooks, monitores y otros productos de Datadog.
3. Define tu lista de etiquetas permitidas. 
De manera predeterminada, el modal de configuración de etiquetas se completa previamente con una lista de etiquetas permitidas recomendadas por Datadog que se consultaron de manera activa en dashboards, notebooks, monitores o a través de la API en los últimos 30 días. Las etiquetas recomendadas se distinguen con un icono de gráficos de línea.
   a. Además, incluye las etiquetas que se utilizan en los activos (dashboards, monitores, notebooks y SLOs). Estas etiquetas se utilizan en los activos, pero no se consultan activamente y están marcadas con un icono de objetivo. Si las añades, te asegurarás de no perder visibilidad de tus activos críticos. 
4. Revisa el *Estimated New Volume* (Nuevo volumen estimado) de métricas personalizadas indexadas que resultan de esta posible configuración de etiquetas.
5. Haz clic en **Save** (Guardar).

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuración de etiquetas con la lista de permitidos" video="true" style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Mostrar a los clientes que pueden añadir etiquetas utilizadas en activos en su configuración de MWL" style="width:100%" >}}

Puedes [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de la configuración de tu etiqueta a través de las APIs de Metrics.

#### Lista de etiquetas bloqueadas 

1. Haz clic en el nombre de cualquier métrica para abrir su panel lateral de detalles.
2. Haz clic en **Manage Tags** (Administrar etiquetas), luego, en **Exclude Tags** (Excluir etiquetas).
3. Define tu lista de etiquetas bloqueadas. Las etiquetas que se definan en la lista de bloqueadas **no** se pueden consultar en dashboards ni monitores. Las etiquetas que se han consultado de manera activa en dashboards, notebooks, monitores y a través de la API en los últimos 30 días se distinguen con un icono del gráfico de líneas.
4. Revisa el *Estimated New Volume* (Nuevo volumen estimado) de métricas personalizadas indexadas que resultan de esta posible configuración de etiquetas.
5. Haz clic en **Save** (Guardar).

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuración de etiquetas con exclusión de etiquetas" video="true" style="width:100%" >}}

Establece el parámetro `exclude_tags_mode: true` en la API de Metrics para [crear][2] y [editar][3] una lista de etiquetas bloqueadas.

**Nota:** Para que las etiquetas se gestionen en una métrica, ésta debe tener un tipo declarado. Esto se hace normalmente cuando se envía una métrica, pero también puede hacerse manualmente utilizando el botón `Edit` para una métrica en Resumen de métricas.

#### En la API

Puedes [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de la configuración de tu etiqueta a través de las APIs de Metrics.

### Configurar varias métricas a la vez

Optimiza tus volúmenes de métricas personalizadas utilizando la [función de configuración en bloque de etiquetas de métricas][7]. Para especificar las métricas que deseas configurar, haz clic en **Configure Metrics** (Configurar métricas) y, a continuación, en **Manage Tags*** (Gestionar etiquetas) en la página de resumen de métricas. Selecciona la métrica o el espacio de nombres de métricas que desees configurar y, a continuación, elige una de las siguientes opciones:
   - [Permitir todas las etiquetas](#allow-all-tags) para anular cualquier configuración de etiquetas anterior y hacer que todas las etiquetas se puedan consultar.
   - [Incluir o excluir etiquetas](#include-or-exclude-tags) para definir etiquetas consultables y no consultables, respectivamente.

#### Permitir todas las etiquetas

{{< img src="metrics/bulk_allow_all_tags.png" alt="La opción Administrar etiquetas con Permitir todas las etiquetas seleccionada en la sección Configurar etiquetas" style="width:100%" >}}

Esta opción está seleccionada por defecto y anula las configuraciones de etiquetas establecidas previamente para que todas las etiquetas sean consultables.

#### Incluir o excluir etiquetas

Cuando selecciones etiquetas para incluir o excluir, elige entre [anular las configuraciones de etiquetas existentes](#override-existing-tag-configurations) o [mantener las configuraciones de etiquetas existentes](#keep-existing-tag-configurations).

##### Anular configuraciones de etiquetas existentes

{{< img src="metrics/bulk_include_tags.png" alt="La opción Administrar etiquetas con Incluir etiquetas y Anular seleccionada en la sección Configurar etiquetas. Las opciones para incluir etiquetas consultadas de forma activa en dashboards y monitores en los últimos 90 días y Etiquetas específicas están seleccionadas" style="width:100%" >}}

Se anulan todas las configuraciones de etiquetas existentes para las métricas seleccionadas y se define una nueva configuración de etiquetas. Esto te permite hacer que todas las etiquetas se puedan consultar en todos los nombres de métricas. Si eliges **incluir etiquetas**, puedes incluir una o ambas de las siguientes opciones:
   - Etiquetas consultadas activamente en Datadog en los últimos 30, 60 o 90 días.
   - Un conjunto específico de etiquetas que defines.

##### Mantener las configuraciones de etiquetas existentes

{{< img src="metrics/bulk_exclude_tags.png" alt="La opción Administrar etiquetas con Excluir etiquetas y Mantener seleccionadas en la sección Configurar etiquetas" style="width:100%" >}}

Se conservan las configuraciones de etiquetas existentes y se definen las nuevas etiquetas que se añadirán a la configuración.

#### En la API

Puedes [configurar][13] y [eliminar][14] etiquetas para múltiples métricas a través de la API.

**Nota**: Utiliza el atributo `include_actively_queried_tags_window` para incluir sólo las etiquetas consultadas activamente en un periodo determinado.

## Facturación de Metrics without LimitsTM

La configuración de tus etiquetas te permite controlar qué métricas personalizadas pueden consultarse, lo que reduce el número de métricas personalizadas facturables. Metrics without LimitsTM desvincula los costes de ingesta de los costes de indexación. Puedes seguir enviando a Datadog todos tus datos (todo se ingiere) y puedes especificar una lista de etiquetas permitidas que deseas que sigan siendo consultables en la plataforma de Datadog. Si el volumen de datos que Datadog está ingiriendo para tus métricas configuradas difiere del volumen restante más pequeño que indexas, puedes ver dos volúmenes distintos en tu pagina de Uso, así como en la página Resumen de métricas.

- **Métricas personalizadas ingeridas**: el volumen original de métricas personalizadas basadas en todas las etiquetas ingeridas.
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de las configuraciones de Metrics without LimitsTM) 

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no se ha configurado con Metrics without LimitsTM, solo se te factura por su volumen de métricas personalizadas indexadas.

Obtén más información sobre la [Facturación de métricas personalizadas][8].

## Empezando con Metrics without LimitsTM

1. Configura tus 20 métricas principales en la [página de Plan y uso][9] desde la página de Resumen de métricas o mediante la [API][2].
   Puedes usar la configuración de métricas masiva (sintaxis `*`) para configurar etiquetas en varias métricas con rapidez. Datadog te notifica cuando se completa el trabajo de configuración masiva.

**Nota:** Si usas la [API de Crear configuración de etiquetas][2], usa primero la [API del estimador de cardinalidad de la configuración de etiquetas][5] para validar el posible impacto de tus configuraciones de etiquetas antes de crearlas. Si la interfaz de usuario o la API del estimador devuelven una cantidad resultante de valores indexados mayor que la ingerida, no guardes la configuración de etiquetas.

2. Configura las métricas sin consultar con configuraciones de etiquetas vacías.

   A medida que tus equipos continúen limpiando métricas ruidosas que nunca se consultan en la plataforma de Datadog, puedes minimizar de manera instantánea los costes de estas métricas sin consultar al configurarlas con una lista de etiquetas permitidas vacía. 

3. Revisa tu uso y facturación. Tras configurar las métricas, el impacto de tus cambios se puede validar de tres maneras:

   - Antes de guardar tu configuración, el estimador de cardinalidad de la configuración de etiquetas devuelve el número resultante estimado de métricas personalizadas indexadas, que debe ser menor que los volúmenes de métricas personalizadas ingeridas.
   - Después de guardar tu configuración, el panel lateral de detalles del Resumen de métricas debería mostrar que tus métricas personalizadas indexadas son inferiores al volumen de métricas personalizadas ingeridas.
   - 24 horas después de haber guardado la configuración, también puedes ver el impacto en la tabla de **Top Custom Metrics** (Métricas personalizadas principales) en la página de Plan y uso. Debería haber una reducción en el volumen de métricas personalizadas entre la pestaña **Month-to-Date** (Mes hasta la fecha) y la pestaña **Most Recent Day** (Día más reciente) de esta tabla.

## Prácticas recomendadas

- Puedes configurar alertas en tu métrica de [uso estimado de métricas personalizadas][10] en tiempo real para poder correlacionar picos en las métricas personalizadas con las configuraciones.

- El [control de acceso basado en roles][11] para Metrics without LimitsTM también se encuentra disponible a fin de controlar qué usuarios tienen permisos para usar esta función que tiene implicaciones de facturación.

- Los eventos de auditoría te permiten realizar un seguimiento de las configuraciones de etiquetas o las agregaciones de percentiles que se hayan realizado y que puedan correlacionarse con picos de métricas personalizadas. Busca "tags:audit" y "configuración de etiquetas consultable" o "agregaciones de percentiles" en tu [Flujo de eventos][12].

\*Metrics without Limits es una marca registrada de Datadog, Inc.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /es/api/latest/metrics/#create-a-tag-configuration
[3]: /es/api/latest/metrics/#update-a-tag-configuration
[4]: /es/api/latest/metrics/#delete-a-tag-configuration
[5]: /es/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /es/metrics/#time-and-space-aggregation
[7]: /es/metrics/summary/#configuration-of-multiple-metrics
[8]: /es/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /es/account_management/billing/usage_metrics/
[11]: /es/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /es/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /es/api/latest/metrics/#delete-tags-for-multiple-metrics