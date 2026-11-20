---
further_reading:
- link: /sheets/
  tag: Documentación
  text: Más información sobre Datadog Sheets
- link: /integrations/guide/reference-tables/?tab=manualupload
  tag: Documentación
  text: Añadir metadatos personalizados con tablas de referencia
title: Analizar sesiones de RUM utilizando Sheets
---

## Información general

Datadog Sheets es una herramienta de hoja de cálculo que se puede rellenar con datos de Datadog y analizar sin necesidad de conocimientos técnicos. Esta guía proporciona un recorrido para analizar sesiones de usuario de Real User Monitoring (RUM) utilizando Sheets. Esta guía explica cómo:

- Crear y manipular tablas en Sheets.
- Enriquecer los datos de tu sesión de RUM con metadatos adicionales mediante tablas de referencia.
- Realizar análisis detallados para identificar las sesiones con muchos errores y comprender su impacto en los usuarios Premium.

## Crear una tabla en Sheets

Para comenzar tu análisis, crea una tabla de sesiones de RUM en Datadog Sheets:

1. Comienza desde el Explorador de sesiones de RUM.
1. Crea una consulta para filtrar sesiones con características específicas. Por ejemplo, para centrarte en las sesiones de usuario que encontraron dos o más errores, utiliza la siguiente consulta:
     ```
     @session.error.count:>=2 @session.type:user
     ```
1. Haz clic en **Open in Sheets** (Abrir en Sheets) para crear una nueva tabla con los datos filtrados de las sesiones de RUM.

## Cargar datos en las tablas de referencia

Para enriquecer los datos de tus sesiones de RUM con metadatos adicionales, como la identificación de usuarios Premium o la asociación de usuarios con equipos específicos, utiliza las tablas de referencia. Carga datos externos con los siguientes pasos:

1. Prepara un archivo CSV que contenga metadatos adicionales. Por ejemplo, el archivo puede incluir columnas para los ID de usuario, el estado Premium y la información del equipo.
1. Ve a [Tablas de referencia][1] y haz clic en **New Reference Table +** (Nueva tabla de referencia +).
1. Carga el archivo CSV y define la clave primaria de la tabla.

Para obtener más información, consulta la documentación [Tablas de referencia][2].

## Enriquecer los datos RUM con búsquedas

1. En la interfaz de hojas de Sheets, haz clic en **Add Lookup** (Añadir búsqueda) en la parte superior de la página.
1. Selecciona la tabla de referencia que cargaste y especifica la columna común, como la de ID de usuario, para hacer coincidir los registros.
1. La función de búsqueda añade los metadatos relevantes de la tabla de referencia a tu tabla de sesiones de RUM.

## Uso de tablas dinámicas para el análisis

Las tablas dinámicas te ayudan a resumir y organizar grandes conjuntos de datos para encontrar patrones y tendencias.

1. En una hoja de cálculo existente que ya tenga una tabla de datos, haz clic en **Add Pivot Table** (Añadir tabla dinámica).
2. En la sección **Filas**, selecciona las dimensiones que quieres analizar, como el Nombre de usuario.
3. En la sección **Cálculos**, elige las dimensiones para los cálculos, como suma, media, recuento, mín. y máx.

## Ejemplo de uso: Analizar los errores de los usuarios Premium

Tienes una aplicación web y quieres comprender cómo los errores están afectando a los usuarios Premium de tu aplicación. Sigue estos pasos para analizar las sesiones de RUM, enriquece tus datos con información adicional sobre los usuarios y obtén información sobre el impacto de los errores en los usuarios Premium. Utiliza Sheets para tomar decisiones basadas en datos con el fin de mejorar la experiencia del usuario y abordar los problemas con mayor eficacia.


### Filtrar sesiones de RUM
1. Comienza desde el [Explorador de sesiones de RUM][3] y crea una consulta para filtrar las sesiones con dos o más errores. Por ejemplo:

     ```
     @session.error.count:>=2 @session.type:user
     ```
     {{< img src="/sheets/guide/rum_analysis/rum_sessions_explorer.png" alt="Explorador de sesiones de RUM que muestra un filtrado de consulta @session.error.count:>=2 y @session.type:user" style="width:100%;" >}}
1. Haz clic en **Open in Sheets** (Abrir en Sheets) para crear una nueva tabla con las sesiones filtradas.

### Enriquecer datos
1. [Carga un archivo CSV en una tabla de referencia](#uploading-data-to-reference-tables) con metadatos adicionales del usuario (como estado Premium o equipo).
1. Utiliza la función `Lookup` en Sheets para añadir los metadatos del usuario sobre el estado Premium a tu tabla de sesiones de RUM.
   {{< img src="/sheets/guide/rum_analysis/lookup_function.png" alt="Configurar una búsqueda con el conjunto de datos externo y los metadatos adicionales que quieres extraer de ese conjunto de datos"style="width:100%;" >}}

### Analizar con tablas dinámicas
1. Crea una tabla dinámica para contar el número de errores por usuario Premium.
1. Resume los datos para comprender la distribución de errores entre usuarios Premium y no Premium.
   {{< img src="/sheets/guide/rum_analysis/add_lookup_pivot_table.mp4" alt="Recorrido que muestra cómo añadir una búsqueda y crear una tabla dinámica en Sheets" video=true >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/reference-tables?order=desc&p=1&sort=updated_at
[2]: https://docs.datadoghq.com/es/integrations/guide/reference-tables/?tab=manualupload
[3]: https://app.datadoghq.com/rum/sessions