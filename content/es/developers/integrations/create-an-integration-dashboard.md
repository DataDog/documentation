---
description: Aprende a crear un dashboard de integración.
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Más información en dashboards
title: Crear un dashboard de integración
---
## Información general

[Los dashboards de Datadog][1] te permiten monitorizar de manera eficiente tu infraestructura e integraciones mediante la visualización y el seguimiento de métricas clave. Datadog proporciona un conjunto de dashboards listos para usar para muchas funciones y integraciones. Puedes acceder a ellas consultando tu [lista de dashboards][12].

Si has [creado una integración de Datadog][2], debes crear un dashboard para ayudar a que los usuarios de tu integración encuentren valor más rápidamente en ella. Esta guía proporciona los pasos para crear un dashboard de integración y las prácticas recomendadas a seguir durante el proceso de creación.

Para crear una integración de Datadog, consulta [Creación de una integración de Datadog][2].

## Crea un dashboard de integración

### Crear un dashboard

En Datadog, en [**Dashboard List**][12] (Lista de dashboard), haz clic en **New Dashboard** (+ Nuevo dashboard).

{{< img src="dashboards/create_dashboard.png" alt="Crear un dashboard para tu integración" width="80%">}}

[Sigue las prácticas recomendadas de esta guía](#follow-dashboard-best-practices) cuando añadas elementos a tu dashboard.

### Exporta tu dashboard

{{< tabs >}}
{{% tab "UI" %}}

Exporta tu dashboard a JSON haciendo clic en el icono **Share** (Compartir) o **Configure** (Configurar) y seleccionando **Export dashboard JSON** (Exportar dashboard JSON).

{{< img src="developers/create-an-integration-dashboard/share-dashboard.png" alt="Haz clic en el ícono Compartir y Exportar dashboard JSON para exportar tu dashboard como un archivo JSON" width="100%">}}

Nombra el archivo según el título de tu dashboard: por ejemplo, `your_integration_name_overview.json`.

Guarda este archivo en la carpeta `assets/dashboards` de tu integración. Añade el activo a tu archivo `manifest.json`. Consulta la [Referencia de activos de integraciones][101] para obtener más información sobre la estructura de archivos y el archivo de manifiesto de la integración.

[101]: /es/developers/integrations/check_references/#manifest-file

{{% /tab %}}
{{% tab "Programmatically" %}}

- Asegúrate de tener instalada la [Herramienta para desarrolladores de la integración de Datadog Agent][103] (`ddev`).
- Asegúrare de que has establecido una `api_key` y `app_key` para la organización que contiene tu dashboard en el [archivo de configuración `ddev`][101].

Ejecute el [comando `ddev meta dash export`][102] con el indicador `--extras` or `-e` para exportar la definición del dashboard:

```shell
ddev meta dash export <URL_OF_DASHBOARD> <INTEGRATION> --extras
```

Nombra el archivo de acuerdo con tu título de dashboard.

Este comando añade la definición del dashboard al archivo `manifest.json` de tu integración. Encontrarás el archivo JSON del dashboard en la carpeta `assets/dashboards` de tu integración.

**Nota:** El dashboard está disponible en la siguiente dirección `/dash/integration/<DASHBOARD_KEY>` en cada región. La `<DASHBOARD_KEY>` coincide con lo que hay en el archivo `manifest.json` de tu dashboard. Puedes intercambiar este valor cuando quieras añadir un enlace a otro dashboard dentro de tu dashboard.

[101]: https://datadoghq.dev/integrations-core/ddev/cli/#ddev-config
[102]: https://datadoghq.dev/integrations-core/ddev/cli/#ddev-meta-dash-export
[103]: /es/developers/integrations/python/

{{% /tab %}}
{{< /tabs >}}

### Abrir una solicitud pull

Para el [repositorio `integrations-extras` de GitHub][13], abra una solicitud pull (PR) para añadir tu archivo JSON del dashboard y el archivo de manifiesto actualizado a la carpeta de integración correspondiente. Datadog revisa todas las solicitudes pull `integration-extras`. Una vez aprobada, Datadog fusiona la solicitud pull y tu dashboard de integración se pasa a producción.

### Verifica tu dashboard en producción

Asegúrate de que el cuadro de integración correspondiente está `Installed` en Datadog. Debes instalar una integración para ver tus dashboards predeterminados asociados.

Encuentra tu dashboard en la [página Lista de dashboard][12]. Asegúrate de que los logotipos se muestran correctamente y dentro del dashboard preestablecido.

## Sigue las prácticas recomendadas de dashboard

{{< img src="developers/create-an-integration-dashboard/dashboard_best_practices_example.png" alt="Un ejemplo de un dashboard" width="100%">}}

Un dashboard de integración debe seguir las siguientes directrices de estilo visual:

- Un grupo **About** (Acerca de) que llame la atención, con una imagen de cabecera, un texto conciso, enlaces útiles y una buena jerarquía tipográfica.
- Un breve grupo de **Overview** (Visión general) con las estadísticas más importantes en la parte superior.
- Títulos de gráficos sencillos y nombres de grupos en mayúsculas
- Simetría en modo de alta densidad
- Notas bien formateadas y concisas
- Coordinación de colores entre grupos relacionados, notas dentro de los grupos y gráficos dentro de los grupos.

### Directrices generales

-  Al crear un nuevo dashboard, selecciona el tipo de dashboard por defecto.

-  Pon el nombre de integración en tu título de dashboard. Algunos ejemplos de un buen título de dashboard son `Scylla` o `Cilium Overview`. **Nota**: Evita utilizar `-` (guiones) en el título del dashboard, ya que la URL de dashboard se genera a partir del título.

-  Añade un logotipo al encabezado del dashboard. El logotipo de la integración aparece automáticamente en el encabezado si el icono existe y el `integration_id` coincide con el nombre del ícono.

-  Incluye un grupo About (Acerca de) para la integración que contenga una breve descripción y enlaces útiles. La sección About (Acerca de) debe incluir contenido, no datos. Evita que la sección "About" (Acerca de) ocupe todo el ancho del sitio. Considera la posibilidad de copiar el contenido de la sección About (Acerca de) en la tarjeta emergente que aparece al pasar el ratón por encima del título del dashboard.

- Edita la sección About (Acerca de) y selecciona la opción de visualización del banner. A continuación, puedes enlazar a una imagen de banner de acuerdo con la siguiente localización de archivo: `/static/images/integration_dashboard/your-image.png`.

- Incluye un grupo de **Overview (Visión general) que contenga alguna de las métricas más importantes; checks de servicio, como checks de activación o preparación; y un resumen de monitor si dispones de monitores preexistentes para esta integración. Coloca el grupo de resumen en la parte superior del dashboard. El grupo puede contener datos.

  {{< img src="developers/create-an-integration-dashboard/about-and-overview-groups.png" alt="Un ejemplo de sección About (Acerca de) y sección Overview (Descripción general) en un dashboard" width="100%">}}

- Si la recopilación de log está activada para la integración, incluye un grupo de logs que contenga un widget de serie temporal que muestre un gráfico de barras de logs por estado a lo largo del tiempo y un flujo (stream) de logs con el estado `Error` o `Critical`. **Nota:** Considera convertir los grupos en [powerpacks][14] si aparecen repetidamente en dashboards independientemente del tipo de integración, para poder insertar todo el grupo con el formato correcto con unos pocos clics en lugar de añadir los mismos widgets desde cero cada vez.

-  Comprueba cómo se ve tu dashboard a 1280px de ancho y 2560px de ancho. Así es como aparece el dashboard en un portátil más pequeño y en un monitor más grande, respectivamente. Los anchos de pantalla más comunes para dashboards son 1920, 1680, 1440, 2560 y 1280px. Si tu monitor no es lo suficientemente grande para el modo de alta densidad, utiliza los controles de zoom del navegador para alejar la imagen.

   {{< tabs >}}
   {{% tab "1280 pixels" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-widths.png" alt="Un ejemplo de un dashboard a 1280 píxeles" width="80%">}}

   {{% /tab %}}
   {{% tab "2560 pixels" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-large-widths.png" alt="Un ejemplo de un dashboard a 2560 píxeles" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

### Widgets y agrupación

-  Investiga las métricas admitidas por la integración y considera agruparlas en categorías relevantes. Las métricas importantes que son clave para el funcionamiento y la visión general de la integración deben estar en la parte superior.

   Pasar de los niveles macro a los micro dentro del sistema
   : para un dashboard de integración de una base de datos, por ejemplo, puedes agrupar las métricas de nodo en un grupo, las métricas de índice en el siguiente grupo, y las métricas de partición en el tercer grupo.

   Ir de las secciones anteriores a las posteriores dentro del sistema
   : para un dashboard de integración del flujo de datos, por ejemplo, puedes agrupar las métricas del productor en un grupo, métricas del intermediario en el siguiente y métricas de consumidor en el tercero.

   Agrupar métricas que conducen a la misma información procesable
   : puedes agrupar las métricas de indexación que revelan qué índices o particiones deben optimizarse en un grupo, y agrupar las métricas de utilización de recursos como el espacio en disco o el uso de memoria que informan las decisiones de asignación y redistribución en un grupo separado.

-  Utiliza widgets de grupo para titular y agrupar secciones, en lugar de los widgets de nota. Utiliza grupos de un ancho parcial para mostrar los grupos uno al lado del otro. La mayoría de los dashboard deberían mostrar cada widget dentro de un grupo.

    {{< img src="developers/create-an-integration-dashboard/full-width-grouped-logs.png" alt="Un ejemplo de widgets de grupo" width="100%">}}

-  Los widgets de series temporales deben tener al menos cuatro columnas de ancho para que no aparezcan aplastadas en las pantallas más pequeñas.

-  Los widgets de flujo deben tener al menos seis columnas de ancho, o la mitad del ancho del dashboard, para facilitar la lectura. Colócalos al final de un dashboard para que no se pasen por el desplazamiento. Es útil colocar widgets de flujo en un grupo para que se puedan contraer. Añade un flujo de eventos solo si el monitor de servicio por el dashboard está informando eventos. Utiliza `sources:service_name`.

   {{< img src="developers/create-an-integration-dashboard/stream-widgets.png" alt="Un ejemplo de un widget de flujo en un dashboard" width="100%">}}

-  Prueba utilizar una combinación de tipos y tamaños de widget. Explora visualizaciones y opciones de formato hasta que estés seguro de que tu dashboard es lo más claro posible. A veces, un dashboard entero de series temporales está bien, pero otras veces la variedad puede mejorar la legibilidad. Los formatos más utilizados en los widgets de métrica son [series temporales][4], [valores de consulta][5] y [tablas][6]. Asegúrate de que widgets de valores de consulta tengan un fondo de serie temporal (por ejemplo, "barras") en lugar de estar en blanco. Para obtener más información sobre los tipos de widget disponibles, consulta la página [lista de widgets de dashboard compatibles][7].

-  Intenta que las mitades izquierda y derecha de tu dashboard sean simétricas en el modo de alta densidad. Los usuarios con monitores grandes ven tu dashboard en modo de alta densidad por defecto, por lo que es importante que las relaciones de grupo tengan sentido, y que el dashboard se vea bien. Para ello, puedes ajustar la altura de los grupos y desplazarlos entre las mitades izquierda y derecha.

   {{< tabs >}}
   {{% tab "Perfectly symmetrical" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical-dashboard.png" alt="Un ejemplo de un dashboard simétrico" width="100%">}}

   {{% /tab %}}
   {{% tab "Close enough" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical_example_2.png" alt="Un ejemplo de dashboard simétrico" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

-  [Las variables de plantilla][8] permiten filtrar dinámicamente uno o varios widgets en un dashboard. Las variables de plantilla deben ser universales, personalizadas en función del tipo en la tecnología de integración, y accesibles por cualquier usuario o cuenta que utilice el servicio monitorizado.

   | Tipo de tecnología de la integración | Variable de plantilla típica |
   | - | - |
   | Base de datos | Particiones |
   | Transmisión de datos | Consumidor
   | Servicio del modelo de ML | Modelo |

   Asegúrate de que todos los gráficos relevantes están escuchando a los filtros de variables de plantilla pertinentes. **Nota**: Añadir `*=scope` como una variable de plantilla es útil, ya que los usuarios pueden acceder a todas sus propias etiquetas.

### Copia

-  Utiliza títulos de gráficos concisos que empiecen por la información más importante. Evita frases comunes como "número de" y no incluyas el título de integración (por ejemplo, "Memcached Load").

    | Título conciso (bueno) | Título ampuloso (malo) | 
    | - | - |
    | Eventos por nodo | Número de eventos de Kubernetes por nodo |
    | Tareas pendientes: [$node_name] | Número total de tareas pendientes en [$node_name] |
    | Operaciones de lectura/escritura | Número de operaciones de lectura/escritura |
    | Conexiones al servidor - tasa | Tasa de conexiones al servidor |
    | Carga | Memcached Load |

-  Evita repetir el título del grupo o el nombre de la integración en cada widget de un grupo, en especial si los widgets son valores de consulta con una unidad personalizada del mismo nombre. En este ejemplo, observa la palabra "particiones" en cada título de widget del grupo denominado "Particiones".

   {{< img src="developers/create-an-integration-dashboard/name-repetition.png" alt="Un ejemplo de términos repetidos en un dashboard" width="100%">}}

-  Para los widgets de series temporales, siempre [fórmulas de alias][9].

-  Los títulos de los grupos deben ir en mayúsculas de título. Los títulos de widget deben ir en mayúsculas solo la primera palabra.

-  Si muestras una leyenda, asegúrate de que los alias sean fáciles de entender.

-  Los títulos de los gráficos deben resumir la métrica consultada. No indiques la unidad en el título del gráfico porque los tipos de unidad se muestran automáticamente a partir de los metadatos. Una excepción a esto es si el cálculo de la consulta representa un tipo diferente de unidad.

### Estilo visual

-  Da formato a las notas para que se adapten a tu caso de uso. Prueba los preajustes "pie de foto", "anotación" o "encabezado", o elige tu propia combinación de estilos. Evita utilizar el tamaño de letra más pequeño en notas largas o que incluyan formatos complejos, como listas con viñetas o bloques de código.

-  Utiliza los colores para resaltar las relaciones importantes y mejorar la legibilidad, no por estilo. Si hay varios grupos relacionados, aplica el mismo color de encabezado a todos ellos. Si has aplicado un color verde al encabezado de un grupo, intenta que sus notas también sean verdes. Si hay dos grupos relacionados, pero uno es más importante, prueba con utilizar el color "vivo" en el grupo importante y el color "claro" en el grupo menos importante. No tengas miedo de dejar los grupos con encabezados blancos y procura no abusar del color. Por ejemplo, no hagas que todos los grupos de dashboard sean de color azul intenso. Evita también los encabezados grises.

    {{< img src="developers/create-an-integration-dashboard/color-related-data.png" alt="Un ejemplo de datos de color relacionado en un dashboard" width="100%">}}

- Las visualizaciones con umbrales o zonas obvias utilizan formato semántico para los gráficos o formato de texto personalizado rojo/amarillo/verde para los valores de consulta.

-  Utiliza leyendas cuando tengan sentido. Las leyendas facilitan la lectura de un gráfico sin tener que pasar por encima de cada serie o maximizar el widget. Asegúrate de utilizar alias de series temporales para que la leyenda sea fácil de leer. El modo automático para las leyendas es una gran opción que oculta las leyendas cuando hay poco espacio y las muestra cuando hay espacio.

    {{< img src="developers/create-an-integration-dashboard/well-named-legends.png" alt="Un ejemplo de leyendas en un dashboard" width="100%">}}

-  Si quieres que los usuarios comparen dos gráficos, asegúrate de que sus ejes X estén alineados. Si un gráfico muestra una leyenda y el otro no, los ejes x no se alinearán. Asegúrate de que ambos muestren una leyenda o de que ambos no la muestren.

   {{< img src="developers/create-an-integration-dashboard/x-axes-alignment.png" alt="Un ejemplo de ejes X no alineados en un dashboard" width="100%">}}

-  Para las series temporales, basa el tipo de visualización en el tipo de métrica.

    | Tipos de métrica | Tipo de pantalla |
    | - | - |
    | Volumen (por ejemplo, número de conexiones) | `area` |
    | Counts (por ejemplo, número de errores) | `bars` |
    | Múltiples grupos o por defecto | `lines` |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/
[2]: /es/developers/integrations/agent_integration/
[3]: /es/dashboards/#new-dashboard
[4]: /es/dashboards/widgets/timeseries/
[5]: /es/dashboards/widgets/query_value/
[6]: /es/dashboards/widgets/table/
[7]: /es/dashboards/widgets/
[8]: /es/dashboards/template_variables/
[9]: /es/dashboards/widgets/timeseries/#metric-aliasing
[10]: /es/dashboards/#copy-import-or-export-dashboard-json
[11]: /es/developers/integrations/check_references/#manifest-file
[12]: https://app.datadoghq.com/dashboard/lists
[13]: https://github.com/DataDog/integrations-extras
[14]: /es/dashboards/widgets/powerpack/