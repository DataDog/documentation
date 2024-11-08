---
algolia:
  tags:
  - metrics without limits
aliases:
- /es/metrics/faq/metrics-without-limits/
- /es/metrics/guide/metrics-without-limits-getting-started/
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

Metrics without LimitsTM te permite configurar etiquetas en todos los tipos de métricas de la aplicación. También puedes personalizar las agregaciones en counts, tasas y medidores sin tener que volver a desplegar o cambiar código. Con Metrics without LimitsTM, puedes configurar una lista de etiquetas permitidas en la aplicación para que se puedan consultar en toda la plataforma de Datadog; esto elimina de manera automática las etiquetas que no son esenciales asociadas a métricas de nivel de aplicación o empresariales (por ejemplo, `host`). De manera alternativa, puedes configurar una lista de etiquetas bloqueadas en la aplicación para eliminar y excluir con rapidez las etiquetas; esto conserva de manera automática las etiquetas esenciales restantes que brindan valor empresarial a tus equipos. Estas funcionalidades de configuración se encuentran en la página de [Resumen de métricas][1].

En esta página se identifican los componentes clave de Metrics without LimitsTM que pueden ayudarte a gestionar los volúmenes de métricas personalizadas dentro de tu presupuesto de observabilidad.

### Configuración de etiquetas

#### Lista de etiquetas permitidas
1. Haz clic en el nombre de cualquier métrica para abrir su panel lateral de detalles. 
2. Haz clic en **Manage Tags** (Gestionar etiquetas) -> **«Include Tags...»** (Incluir etiquetas...) para configurar las etiquetas que quieras que se puedan consultar en dashboards, notebooks, monitores y otros productos de Datadog.
3. Define tu lista de etiquetas permitidas. 
De manera predeterminada, el modal de configuración de etiquetas se completa previamente con una lista de etiquetas permitidas recomendadas por Datadog que se consultaron de manera activa en dashboards, notebooks, monitores o a través de la API en los últimos 30 días. Las etiquetas recomendadas se distinguen con un icono de línea de gráfica. 
4. Revisa el *Estimated New Volume* (Nuevo volumen estimado) de métricas personalizadas indexadas que resultan de esta posible configuración de etiquetas.
5. Haz clic en **Guardar**.

{{< img src="metrics/mwl_example_include_tags-compressed.mp4" alt="Configuración de etiquetas con la lista de permitidas" video=true style="width:100%" >}}

Puedes [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de la configuración de tu etiqueta a través de las APIs de Metrics.

#### Lista de etiquetas bloqueadas 
1. Haz clic en el nombre de cualquier métrica para abrir su panel lateral de detalles.
2. Haz clic en **Manage Tags** (Gestionar etiquetas) -> **«Exclude Tags...»** (Excluir etiquetas...) para eliminar las etiquetas que no quieres consultar. 
3. Define tu lista de etiquetas bloqueadas. Las etiquetas que se definan en la lista de bloqueadas **no** se pueden consultar en dashboards ni monitores. Las etiquetas que se han consultado de manera activa en dashboards, notebooks, monitores y a través de la API en los últimos 30 días se distinguen con un icono de línea de gráfica.
5. Revisa el *Estimated New Volume* (Nuevo volumen estimado) de métricas personalizadas indexadas que resultan de esta posible configuración de etiquetas.
6. Haz clic en **Guardar**.

{{< img src="metrics/mwl-example-tag-exclusion-compressed.mp4" alt="Configuración de etiquetas con exclusión de etiquetas" video=true style="width:100%" >}}

Establece el parámetro `exclude_tags_mode: true` en la API de Metrics para [crear][2] y [editar][3] una lista de etiquetas bloqueadas.

Al configurar etiquetas para counts, tasas y medidores, la combinación de agregación de tiempo/espacio consultada con mayor frecuencia se encuentra disponible para consultar de manera predeterminada.

### Configurar varias métricas a la vez

Optimiza los volúmenes de métricas personalizadas mediante la [función de configuración masiva de etiquetas de métricas][7]. A fin de especificar un espacio de nombres para tus métricas, haz clic en **Configure Tags*** (Configurar etiquetas) en Resumen de métricas. Puedes configurar todas las métricas que coincidan con ese prefijo de espacio de nombres con la misma lista de etiquetas permitidas en ***Include tags...*** (Incluir tags...) o la misma lista de etiquetas bloqueadas en ***Exclude tags...*** (Excluir etiquetas...).

Puedes [configurar][13] y [eliminar][14] etiquetas para varias métricas a través de la API. A fin de [configurar una lista de etiquetas bloqueadas][13] para varias métricas, establece el parámetro `exclude_tags_mode: true` en la API.

### Refinar y optimizar las agregaciones

Puedes ajustar aún más tus filtros de métricas personalizadas si optas por más [agregaciones de métricas][6] en tus métricas de medidor, count o tasa. A fin de preservar la precisión matemática de tus consultas, Datadog solo almacena la combinación de agregación de tiempo/espacio consultada con mayor frecuencia para un tipo de métrica determinado: 

- Los counts y tasas configurados se pueden consultar en tiempo/espacio con SUM
- Los medidores configurados se pueden consultar en tiempo/espacio con AVG

Puedes añadir o eliminar agregaciones en cualquier momento sin necesidad de realizar cambios en el nivel de código o Agent. 

El modal de configuración de etiquetas se completa previamente con una lista de agregaciones permitidas que se han consultado de manera activa en dashboards, notebooks, monitores y a través de la API en los últimos 30 días (de color azul con un icono). También puedes incluir tus propias agregaciones adicionales.

## Facturación de Metrics without LimitsTM

La configuración de las etiquetas y agregaciones te permite controlar qué métricas personalizadas se pueden consultar, lo que en última instancia reduce la cantidad facturable de métricas personalizadas. Metrics without LimitsTM desvincula los costes de ingesta de los costes de indexación. Puedes continuar enviando a Datadog todos los datos (se ingiere todo) y puedes especificar una lista de etiquetas permitidas que quieras que se puedan consultar en la plataforma de Datadog. Si el volumen de datos que Datadog ingiere para las métricas configuradas difiere del volumen restante más pequeño que indexas, puedes ver dos volúmenes distintos en la página de Uso, así como en la página de Resumen de métricas. 

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

- Los eventos de auditoría te permiten realizar un seguimiento de las configuraciones de etiquetas o las agregaciones de percentiles que se hayan realizado y que puedan correlacionarse con picos de métricas personalizadas. Busca «tags:audit» y «configuración de etiquetas consultable» o «agregaciones de percentiles» en tu [Flujo de eventos][12]

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