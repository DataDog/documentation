---
description: Aprende a configurar los widgets en los dashboards de Datadog, incluidas
  las opciones de pantalla completa, enlaces personalizados, información sobre métricas
  y anulaciones de unidades.
further_reading:
- link: /dashboards/widgets/
  tag: Documentación
  text: Información general del widget
- link: /dashboards/widgets/types
  tag: Documentación
  text: Tipos de widgets
title: Configuración del widget
---

## Información general

La configuración de widgets es esencial para crear dashboards eficaces que proporcionen información significativa sobre tu infraestructura y aplicaciones. En esta guía se describen las principales opciones de configuración y las consideraciones que debes tener en cuenta a la hora de configurar los widgets.


## Pantalla completa

El modo de pantalla completa ofrece funciones mejoradas de visualización y análisis de tus widgets. Puedes ver la mayoría de los widgets en modo de pantalla completa y hacer lo siguiente:

* Cambiar los períodos
* Retroceder o avanzar en función del período de tiempo seleccionado
* Pausar la gráfica en el momento actual o visualizar la gráfica en directo
* Restablecer el período de tiempo
* Exportar la gráfica a un dashboard o notebook, o copiar la consulta
* Descargar los datos que producen la gráfica en formato CSV

Para acceder directamente a la vista general del widget, haz clic en el botón de pantalla completa en la esquina superior derecha del widget.

Hay opciones adicionales disponibles para los [widgets de serie temporal][1].

## Vista previa de datos

Puedes unir varias fuentes de datos en el editor de gráficos para enriquecer tus visualizaciones con contexto y metadatos adicionales. Con la vista previa de datos, puedes ver qué datos estás uniendo o si la consulta está funcionando como se esperaba. Esta función te ayuda a:

- Confirmar estructura de datos y nombres de columnas
- Identificar las claves coincidentes
- Validar los resultados antes de ejecutar la consulta completa

{{% collapse-content title="Ejemplo" level="h4" expanded=false %}}
Podrías unir tus logs de pago con una tabla de referencia (tabla de búsqueda) que contenga detalles del producto para mostrar el precio de venta o la fecha de lanzamiento junto con los datos de la transacción. O bien, podrías enriquecer los datos de sesión de RUM uniéndolos a la información de cliente de una fuente externa, como Salesforce o Snowflake, para segmentar a los usuarios por nivel de cliente.

Las fuentes de datos compatibles para las uniones incluyen (entre otras):

- Logs
- Métricas
- RUM
- Recomendaciones de costes en la nube
- Netflow
- Tramos de APM
- Trazas de APM
- Perfiles
- Lotes de CI de Synthetic Monitoring
- Ejecución de Synthetic Monitoring
- Análisis estático
- Tests CI
- Conclusiones sobre el cumplimiento
- Product Analytics
- Tablas de referencia

El uso de uniones y previsualizaciones de datos facilita la selección de los campos adecuados y enriquece tus gráficos con detalles relevantes, mejorando la calidad y utilidad de tus dashboards.


{{% /collapse-content %}}

## Enlaces personalizados

Los enlaces personalizados mejoran la interacción con los datos conectando los valores de los datos del widget a URL relevantes, como las páginas de Datadog o tu consola de AWS.

Para personalizar las interacciones con datos en línea de tus widgets genéricos, consulta [Enlaces contextuales][2].

## Información de las métricas

En el gráfico de una métrica, haz clic en el menú contextual (tres puntos verticales) para encontrar la opción **Metrics info** (Información de la métrica). Esto abre un panel con una descripción de la métrica. Al hacer clic en el nombre de la métrica en este panel, se abre la métrica en la página del resumen de métricas para su posterior análisis o edición.

## Anulación de unidad

Las modificaciones de unidad son una opción de visualización clave que te permiten personalizar la forma en que se presentan los valores de los datos en los widgets, añadiendo un contexto significativo a tus datos. Para obtener más información y casos de uso, consulta [Personaliza tus visualizaciones con modificaciones de unidad][3].
- **Anulación de unidad**: elige mostrar unidades en la familia de la «memoria» y haz que Datadog se encargue de mostrar la escala adecuada en función de los datos (como megabytes o gigabytes).
- **Anulación de unidad y escala**: fija las unidades en una sola escala (muestra los datos en megabytes independientemente del valor).
- **Definir unidades personalizadas**: define unidades completamente personalizadas (como «pruebas» en lugar de un recuento genérico).

Esta no es una alternativa para asignar unidades a tus datos.
{{< whatsnext desc="Establece unidades a nivel de la organización: ">}}
    {{< nextlink href="/metrics/units/">}} Establecer unidades de métricas{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Establecer unidades para consultas basadas en eventos{{< /nextlink >}}
{{< /whatsnext >}}

## Selector de hora global

El selector de hora global es una opción de configuración horaria fundamental que sincroniza todos los widgets de un dashboard para que utilicen el mismo marco temporal. Para utilizar el selector de hora global, al menos un widget basado en la hora debe estar configurado para utilizar `Global Time`. Haz la selección en el editor de widgets en **Set display preferences** (Configurar preferencias de visualización), o añade un widget (la hora global es la configuración horaria por defecto).

El selector de tiempo global establece el mismo marco temporal para todos los widgets que utilicen la opción `Global Time` en el mismo dashboard. Selecciona un intervalo móvil en el pasado (por ejemplo, `Past 1 Hour` o `Past 1 Day`) o un periodo fijo con la opción `Select from calendar...` o [introduce un marco temporal personalizado][8]. Si se elige un intervalo móvil, los widgets se actualizan para moverse junto con el intervalo.

Los widgets no vinculados a la hora global muestran los datos de su periodo de tiempo local aplicados a la ventana global. Por ejemplo, si el selector de hora global está configurado del 1 de enero de 2019 al 2 de enero de 2019, un widget configurado con el marco de hora local para `Past 1 Minute` muestra el último minuto del 2 de enero de 2019 a partir de las 23:59.

## Copiar y pegar widgets

Copiar y pegar es una función clave para compartir y colaborar que permite reutilizar widgets en distintos contextos de Datadog y herramientas externas.

<div class="alert alert-danger">Activa <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Uso compartido de datos públicos estáticos</strong></a> en la Configuración de la organización para utilizar esta función.</div>

Los widgets pueden copiarse en [Dashboards][4], [Notebooks][5], [APM Service][6] y la page (página) del [recurso de APM][7] utilizando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> o seleccionando el ícono de compartir y seleccionando "Copiar".

Los widgets copiados pueden pegarse en Datadog utilizando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>:

* **Dashboards**: añade un widget nuevo ubicado debajo del cursor del mouse.
* **Notebooks**: añade una celda nueva al final del notebook.

También puedes pegar el widget en tu programa de chat favorito que muestre previsualizaciones de enlaces (como Slack o Microsoft Teams). Esto muestra una imagen snapshot de tu gráfica junto con un enlace directo al widget.

Para obtener más información, consulta el [Portapapeles de Datadog][9].

## Grupos de widgets

Copia los widgets de grupos de timeboard pasando el ratón sobre el área del widget de grupo y utilizando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> o seleccionando el ícono de compartir y seleccionando "Copy" (Copiar).

**Nota**: Al pegar gráficos en screenboard o notebook, Datadog pega cada widget del grupo individualmente.

Para copiar varios widgets de screenboard (sólo en modo de edición), pulsa <kbd>Mayúsculas</kbd> + clic en los widgets y utiliza <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>.

**Nota**: Esto solo funciona cuando se comparte dentro de Datadog. No genera una imagen de vista previa.

## Widget de menús gráficos

Los menús de gráficos del widget proporcionan opciones esenciales para la interacción con los datos. Pasa el cursor sobre un gráfico para acceder a las siguientes opciones de menú.

### View in full screen (Ver en pantalla completa)

Ve el gráfico en [modo pantalla completa](#full-screen).

### Exportar

Haz clic en el icono de exportación de cualquier gráfico del dashboard para abrir un menú de opciones:

| Opción                 | Descripción                                                        |
|------------------------|--------------------------------------------------------------------|
| Copia                   | Crea una copia del gráfico del dashboard.                              |
| Compartir snapshot         | Crea y envía un snapshot de tu gráfico.                          |

#### Utilización en Datadog

| Opción                 | Descripción                                                        |
|------------------------|--------------------------------------------------------------------|
| Declarar incidente       | Declara un incidente del gráfico.                                |
| Añadir al incidente        | Añade el gráfico a una página existente del incidente.                             |
| Crear incidencia            | Crea una incidencia a partir del gráfico.                                      |
| Guardar en notebook       | Guarda el gráfico en un notebook.                                      |
| Enlace al widget         | Obtén un enlace al widget copiado en el portapapeles.                 |

#### Compartir externamente

| Formato | Descripción            |
| -----  | ----------------------- |
| Descargar como PNG    | Descarga el widget en formato PNG. |
| Descargar como SVG    | Descarga el widget en formato SVG. |
| Descargar como CSV    | Descarga el widget en formato CSV. |

### Editar

Haz clic en el icono del lápiz de cualquier gráfico del dashboard para realizar modificaciones.

### Opciones adicionales

Haz clic en el menú contextual (tres puntos verticales) de cualquier gráfico del dashboard para abrir un menú de opciones:

| Opción                 | Descripción                                                        |
|------------------------|--------------------------------------------------------------------|
| Editar                              | Edita el gráfico.                                         |
| Clonar                             | Crea una copia adyacente del gráfico.                   |
| Gráfica dividida                       | Crea un [gráfico dividido][10].                             |
| Crear enlaces personalizados               | Crea [enlaces personalizados](#custom-links).                   |
| Crear monitor                    | Crea un monitor preconfigurado con la consulta del gráfico.  |
| Información de la métrica (solo gráficos de métrica) | Obtén una descripción de las métricas en este gráfico. Puedes hacer clic en los nombres de las métricas para abrirlas en la página Resumen de métricas.            |
| Borrar                            | Borra el gráfico.                                       |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/timeseries/#full-screen
[2]: /es/dashboards/guide/context-links/
[3]: /es/dashboards/guide/unit-override
[4]: /es/dashboards/
[5]: /es/notebooks/
[6]: /es/tracing/services/service_page/
[7]: /es/tracing/services/resource_page/
[8]: /es/dashboards/guide/custom_time_frames/
[9]: /es/service_management/incident_management/datadog_clipboard/
[10]: /es/dashboards/widgets/split_graph/