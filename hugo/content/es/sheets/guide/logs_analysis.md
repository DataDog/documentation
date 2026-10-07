---
further_reading:
- link: /sheets/
  tag: Documentación
  text: Más información sobre Datadog Sheets
- link: /sheets/functions_operators/
  tag: Documentación
  text: Funciones y operadores de Sheets
title: Analizar logs de errores mediante Sheets
---

## Información general

Datadog Sheets es una herramienta de hojas de cálculo que puedes completar con datos de Datadog para realizar análisis complejos y generar informes sin necesidad de conocimientos técnicos. 

En esta guía se explica cómo crear una tabla de logs de errores, añadir columnas calculadas para extraer detalles de errores específicos de los mensajes de error y usar tablas dinámicas con el fin de resumir los datos e identificar patrones. También se ofrece un [caso de uso de ejemplo](#example-use-case-analyzing-retail-application-error-logs) de este flujo de trabajo.

## Creación de una tabla en Sheets

1. Comienza desde una página de producto compatible, como Log Explorer.
2. Crea la consulta de datos que quieras analizar. Por ejemplo, para filtrar los logs y solo mostrar aquellos con `status:error` que contengan la palabra «returns» (devoluciones) en el mensaje de log:
   ```
   status:error service:shopist-returns-prod returns
   ```
3. Haz clic en **Open in Sheets** (Abrir en Sheets).
4. Elige crear una **New Spreadsheet** (Hoja de cálculo nueva) o añadir la tabla a una **Existing Spreadsheet** (Hoja de cálculo existente).
5. Haz clic en **Save and Open** (Guardar y abrir).

## Adición de columnas calculadas

Para obtener más información sobre los errores de devolución, es posible que quieras extraer partes específicas de los mensajes de error. Puedes lograrlo al añadir columnas calculadas en Sheets.

1. En el encabezado de la columna del extremo derecho de tu tabla, haz clic en el icono del signo **más** para añadir una columna calculada.
2. Usa la función `REGEXEXTRACT` para extraer el problema real con la devolución. Por ejemplo, para extraer la siguiente palabra después de «Failed» (Error al) o «Failed to» (No se pudo):
   ```plaintext
   =REGEXEXTRACT(#'Message', "Failed (?:to )?(\w+)")
   ```
   Esta función te ayuda a identificar si el error se encuentra en la *obtención*, *cálculo* o *gestión* de las devoluciones.

## Uso de tablas dinámicas para el análisis

Las tablas dinámicas te ayudan a resumir y organizar grandes conjuntos de datos para encontrar patrones y tendencias.

1. En una hoja de cálculo existente que ya tenga una tabla de datos, haz clic en **Add Pivot Table** (Añadir tabla dinámica).
2. En la sección **Rows** (Filas), selecciona las dimensiones que quieres analizar, como el estado de los logs.
3. En la sección **Calculations** (Cálculos), elige las dimensiones para los cálculos, como suma, media, recuento, mínimo y máximo.

## Caso de uso de ejemplo: Análisis de logs de errores de una aplicación para comercio minorista

Tienes una aplicación web para comercio minorista que genera una serie de logs de errores relacionados con `returns` (devoluciones). Quieres analizar qué tipos de errores causan estos problemas. Sigue estos pasos para analizar tus logs de errores, identificar patrones y obtener información sobre los problemas subyacentes que causan errores en tu aplicación para comercio minorista. Aplica este ejemplo a tus logs para comprenderlos mejor y tomar decisiones basadas en datos.

### Logs de ejemplo

- `Failed getting returns for the customer!` (¡No se pudieron obtener devoluciones para el cliente!)
- `Failed to calculate returns for the customer!` (¡No se pudo calcular las devoluciones para el cliente!)
- `Failed to handle returns for the customer!` (¡No se pudo gestionar las devoluciones para el cliente!)

### Analizar logs de errores

1. En [Logs Explorer][1], crea una consulta de logs que filtre los logs de errores de tu aplicación para comercio minorista con `returns` (devoluciones) en el mensaje de log. Por ejemplo:
      ```
      status:error service:shopist-returns-prod returns
      ```
      {{< img src="/sheets/guide/logs_analysis/error_logs_returns.png" alt="En Logs Explorer se muestra una consulta de logs de errores de una aplicación para comercio minorista de ejemplo que contiene «devoluciones» en el mensaje de log" style="width:100%;" >}}
1. Haz clic en **Open in Sheets** (Abrir en Sheets) para crear una tabla nueva a fin de analizar estos logs.
      {{< img src="/sheets/guide/logs_analysis/open_in_sheets.png" alt="Modal para añadir un título a tu hoja de cálculo nueva en Logs, como «Devuelve un análisis de errores»" style="width:100%;" >}}

### Extraer datos de errores específicos
Añade una columna calculada en Sheets para extraer el problema específico con la devolución mediante la función `REGEXEXTRACT`:
     ```
     =REGEXEXTRACT(#'Message', "Failed (?:to )?(\w+)")
     ```

### Analizar tipos de errores
1. Crea una tabla dinámica para contar la cantidad de errores por tipo de error (`getting` [obtención], `calculating` [cálculo] y `handling` [gestión]).
1. Resume los datos para comprender la distribución y el impacto total de cada tipo de error.
      {{< img src="/sheets/guide/logs_analysis/calculated_column_pivot_table.mp4" alt="Video tutorial de los pasos para analizar logs de errores" video=true >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs