---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/log-workspaces/
  tag: Blog
  text: Mayor control de tus datos de logs con Datadog Log Workspaces
title: Log Workspaces
---

## Información general
Durante la investigación de un incidente, es posible que necesites ejecutar consultas complejas, como combinar atributos de varias fuentes de logs o transformar datos de logs para analizar tus logs. Utiliza Log Workspaces para ejecutar consultas:

- Correlacionar múltiples fuentes de datos
- Agregar varios niveles de datos
- Unir datos de varias fuentes de logs y otros conjuntos de datos
- Extraer datos o añadir un campo calculado en el momento de la consulta
- Añadir visualizaciones a tus conjuntos de datos transformados

## Crear un espacio de trabajo y añadir una fuente de datos

Puedes crear un espacio de trabajo desde la página de Workspaces o desde el Explorador de logs.

En la página de [Log Workspaces][1]:

1. Haz clic en **New Workspace** (Nuevo espacio de trabajo).
1. Haz clic en el cuadro **Data source** (Fuente de datos).
1. Introduce una consulta. Los atributos reservados de los logs filtrados se añaden como columnas.

En el [Explorador de logs][2]:

1. Introduce una consulta.
1. Haz clic en **Open in New Workspace** (Abrir en nuevo espacio de trabajo).
1. El espacio de trabajo añade la consulta del log a una celda de origen de datos. Por defecto, las columnas del Explorador de logs se añaden a la celda de origen de datos.

### Añadir una columna a tu espacio de trabajo

{{< img src="/logs/workspace/workspaces_add_column_to_dataset.png" alt="Ejemplo de celda de un espacio de trabajo, con un panel lateral de información abierto donde se resalta la opción para añadir un atributo como columna" style="width:100%;" >}}

Además de las columnas predeterminadas, puedes añadir tus propias columnas a tu espacio de trabajo:
1. En la celda de tu espacio de trabajo, haz clic en un log para abrir el panel lateral de información.
1. Haz clic en el atributo que quieres añadir como columna.
1. En la opción emergente, selecciona **Añadir "@tu_columna" al conjunto de datos de "tu espacio de trabajo"**.

### Consultas de campos calculados 

Puedes tomar consultas existentes del Log Explorer con [Calculated Fields][4] y abrirlas directamente en Workspaces. Para transferir estas consultas desde el Log Explorer, haz clic en **Open in New Workspace** (Abrir nuevo espacio de trabajo). Los Calculated Fields se convertirán automáticamente en una celda de transformación.

También puedes crear Calculated Fields directamente dentro de un Workspace para definir un campo calculado a partir de fuentes de datos existentes. Estos campos pueden reutilizarse en análisis posteriores:
1. Abre un Workspace con una fuente de datos.
1. Añade una [Celda de transformación](#transformation-cell).
1. Haz clic en **More operations** (Más operaciones).
1. Selecciona **Calculate** (Calcular).

{{< img src="/logs/workspace/calculated_fields_transformation_cell.png" alt="Captura de pantalla de una interfaz de espacio de trabajo de ejemplo con la opción 'Calcular' seleccionada en el menú desplegable 'Más', que demuestra cómo añadir Campos calculados a una consulta." style="width:100%;" >}}

## Analizar, transformar y visualizar tus logs
Puedes añadir las siguientes celdas para:
- Incluir fuentes de datos adicionales, como tablas de referencia
- Utiliza [DDSQL][5] para unir datos
- Transformar, correlacionar y visualizar los datos

Las celdas que dependen de otras se actualizan automáticamente cuando se modifica una de las celdas de las que dependen.

En la parte inferior de tu espacio de trabajo, haz clic en cualquiera de los cuadros de celdas para añadirlas a tu espacio de trabajo. Después de añadir una celda, puedes hacer clic en el conjunto de datos en el lado izquierdo de la página de tu espacio de trabajo para ir directamente a esa celda.

### Celda de origen de datos

Puedes añadir una consulta de logs o una tabla de referencia como fuente de datos.

1. Haz clic en el cuadro **Data source** (Fuente de datos).
    - Para añadir una tabla de referencia:
        1. Selecciona **Tabla de referencia** en el desplegable **Fuente de datos**.
        1. Seleccione la tabla de referencia que quieres utilizar.
    - Para añadir una fuente de datos de logs:
        1. Introduce una consulta. Los atributos reservados de los logs filtrados se añaden como columnas.
        1. Haz clic en **datasource_x** (fuente_de_datos_x) en la parte superior de la celda para cambiar el nombre de la fuente de datos.
        1. Haz clic en **Columns** (Columnas) para ver las columnas disponibles. Haz clic en **as** (como) en una columna para añadir un alias.
        1. Para añadir columnas adicionales al conjunto de datos:  
            a. Haga clic en un log. 
            b. Haz clic en el engranaje situado junto a la faceta que quieres añadir como columna.  
            c. Selecciona **Añadir... a....conjunto de datos**.  
1. Haz clic en el icono de descarga para exportar el conjunto de datos como CSV.

### Célula de análisis

1. Haz clic en el cuadro **Analysis** (Análisis) para añadir una celda y utilizar SQL para consultar los datos de cualquiera de las fuentes de datos. Consulta la documentación [Características de sintaxis SQL][6]. También puedes utilizar el lenguaje natural o SQL para consultar los datos. Ejemplo de uso del lenguaje natural: `select only timestamp, customer id, transaction id from the transaction logs`.
1. Si utilizas SQL, haz clic en **Run** (Ejecutar) para ejecutar los comandos SQL.
1. Haz clic en el icono de descarga para exportar el conjunto de datos como CSV.

### Célula de visualización
Añade la celda **Visualización** para mostrar tus datos como:
- Tabla
- Lista principal
- Series temporales
- Mapa de árbol
- Gráfico circular
- Gráfico de dispersión

1. Haz clic en el cuadro **Visualization** (Visualización).
1. Selecciona la fuente de datos que quieres visualizar en el menú desplegable **Conjunto de datos fuente**.
1. Selecciona tu método de visualización en el menú desplegable **Visualizar como**.
1. Introduce un filtro si quieres filtrar por un subconjunto de datos. Por ejemplo, `status:error`. Si utilizas una celda de análisis como fuente de datos, también puedes filtrar primero los datos en SQL.
1. Si quieres agrupar tus datos, haz clic en **Add Aggregation** (Añadir agregación) y selecciona la información por la que quieres agruparlos.
1. Haz clic en el botón de descarga para exportar los datos como CSV (sólo para visualizaciones de tablas).

### Célula de transformación

Haz clic en el cuadro **Transformation** (Transformación) para añadir una celda para filtrar, agregar y extraer datos.

1. Haz clic en el cuadro **Transformation** (Transformación).
1. Selecciona la fuente de datos que quieres transformar en el menú desplegable **Conjunto de datos fuente**.
1. Elige una operación como **Parse**, **Group** o **Filter** (Analizar, Agrupar, Filtrar).
    - Para **Analizar**, introduce la [sintaxis grok][3] para extraer los datos en una columna separada. En el menú desplegable **desde**, selecciona la columna de la que se extraerán los datos. Consulta el [ejemplo de extracción de columnas](#column-extraction-example).
    - En **Group** (Agrupar), selecciona por qué desea agrupar los datos en el menú desplegable.
    - Para **Join** (Unir), especifica el tipo de unión, el conjunto de datos y el campo fuente, y el conjunto de datos y el campo de destino.
    - Para **Filtrar**, añade una consulta de filtro para el conjunto de datos.
    - En  **More Operations** (Más operaciones):
        - Para **Calculate** (Calcular), especifica un nuevo nombre de campo calculado y una fórmula.
        - En **Límite**, introduce el número de filas del conjunto de datos que quieres visualizar.
        - Para **Sort** (Ordenar), elige un campo y una ordenación.
        - Para **Convert** (Convertir), elige un campo y escribe las conversiones.
1. Haz clic en el icono de descarga para exportar el conjunto de datos a un CSV.

#### Ejemplo de extracción en columna

A continuación se muestra un conjunto de datos de ejemplo:

| marca de tiempo           | host             | message                            |
| ------------------- | ---------------- | ---------------------------------- |
| 29 de mayo 11:09:28.000 | shopist.internal | Pedido enviado para el cliente 21392 |
| 29 de mayo 10:59:29.000 | shopist.internal | Pedido enviado para el cliente 38554 |
| 29 de mayo 10:58:54.000 | shopist.internal | Pedido enviado para el cliente 32200 |

Utiliza la siguiente [sintaxis grok][3] para extraer el ID de cliente del mensaje y añadirlo a una nueva columna llamada `customer_id`:

```
Submitted order for customer %{notSpace:customer_id}`
```

Luego de la extracción, este es el conjunto de datos resultante en la celda de transformación:

| marca de tiempo           | host             | message                            | id_cliente |
| ------------------- | ---------------- | ---------------------------------- | ----------- |
| 29 de mayo 11:09:28.000 | shopist.internal | Pedido enviado para el cliente 21392 | 21392       |
| 29 de mayo 10:59:29.000 | shopist.internal | Pedido enviado para el cliente 38554 | 38554       |
| 29 de mayo 10:58:54.000 | shopist.internal | Pedido enviado para el cliente 32200 | 32200       |

### Celda de texto

Haz clic en la celda **Text** (Texto) para añadir una celda de markdown y poder añadir información y notas.

## Ejemplo de espacio de trabajo

{{< img src="logs/workspace/datasets_example.png" alt="Conjuntos de datos del espacio de trabajo" style="width:100%;" >}}

Este ejemplo de espacio de trabajo tiene:
-  Tres fuentes de datos:
    - `trade_start_logs`
    - `trade_execution_logs`
    - `trading_platform_users`
- Tres conjuntos de datos derivados, que son los resultados de los datos que se transformaron a partir del filtrado, la agrupación o la consulta mediante SQL:
    - `parsed_execution_logs`
    - `transaction_record`
    - `transaction_record_with_names`

- Una visualización del mapa de árbol.

Este diagrama muestra las distintas celdas de transformación y análisis por las que pasan las fuentes de datos.

{{< img src="logs/workspace/workspace_flowchart.png" alt="Gráfico de dispersión que muestra los pasos que siguen las fuentes de datos" style="width:80%;"  >}}

### Ejemplo de recorrido

El ejemplo comienza con dos fuentes de datos de logs:
- `trade_start_logs`
- `trade_execution_logs`

La siguiente celda del área de trabajo es la celda de transformación `parsed_execution_logs`. Utiliza la siguiente [sintaxis de análisis grok][3] para extraer el ID de transacción de la columna `message` del conjunto de datos `trade_execution_logs` y añade el ID de transacción a una nueva columna llamada `transaction_id`.

```
transaction %{notSpace:transaction_id}
```

Ejemplo de conjunto de datos resultante `parsed_execution_logs`:

| marca de tiempo           | host             | message                            | id_transacción |
| ------------------- | ---------------- | ---------------------------------- | ----------- |
| 29 de mayo 11:09:28.000 | shopist.internal | Ejecutando intercambio para transacción 56519 | 56519       |
| 29 de mayo 10:59:29.000 | shopist.internal | Ejecutando intercambio para transacción 23269 | 23269       |
| 29 de mayo 10:58:54.000 | shopist.internal | Ejecutando intercambio para transacción 96870 | 96870       |
| 31 de mayo 12:20:01.152 | shopist.internal | Ejecutando intercambio para transacción 80207 | 80207       |

La celda de análisis `transaction_record` utiliza el siguiente comando SQL para seleccionar columnas específicas del conjunto de datos `trade_start_logs` y el `trade_execution_logs` cambia el nombre del estado `INFO` a `OK` y, a continuación, conecta los dos conjuntos de datos.

```sql
SELECT
    start_logs.timestamp,
    start_logs.customer_id,
    start_logs.transaction_id,
    start_logs.dollar_value,
    CASE
        WHEN executed_logs.status = 'INFO' THEN 'OK'
        ELSE executed_logs.status
    END AS status
FROM
    trade_start_logs AS start_logs
JOIN
    trade_execution_logs AS executed_logs
ON
    start_logs.transaction_id = executed_logs.transaction_id;
```

Ejemplo de conjunto de datos resultante `transaction_record`:

| marca de tiempo           | id_cliente | id_transacción | valor_dolar | status |
| ------------------- | ----------- | -------------- | ------------ | ------ |
| 29 de mayo 11:09:28.000 | 92446       | 085cc56c-a54f  | 838.32       | OK     |
| 29 de mayo 10:59:29.000 | 78037       | b1fad476-fd4f  | 479.96       | OK     |
| 29 de mayo 10:58:54.000 | 47694       | cb23d1a7-c0cb  | 703.71       | OK     |
| 31 de mayo 12:20:01.152 | 80207       | 2c75b835-4194  | 386.21       | ERROR  |

A continuación, se añade la tabla de referencia `trading_platform_users` como fuente de datos:

| nombre_cliente  | id_cliente | estado_cuenta |
| -------------- | ----------- | -------------- |
| Meghan Key     | 92446       | verificado       |
| Anthony Gill   | 78037       | verificado       |
| Tanya Mejía    | 47694       | verificado       |
| Michael Kaiser | 80207       | fraudulento     |

La celda de análisis `transaction_record_with_names` ejecuta el siguiente comando SQL para tomar el nombre del cliente y el estado de la cuenta de `trading_platform_users`, añadirlos como columna y luego conectarlos con el conjunto de datos `transaction_records`:

```sql
SELECT tr.timestamp, tr.customer_id, tpu.customer_name, tpu.account_status, tr.transaction_id, tr.dollar_value, tr.status
FROM transaction_record AS tr
LEFT JOIN trading_platform_users AS tpu ON tr.customer_id = tpu.customer_id;
```

Ejemplo de conjunto de datos resultante `transaction_record_with_names`:

| marca de tiempo           | id_cliente | nombre_cliente  | estado_cuenta | id_transacción | valor_dolar | status |
| ------------------- | ----------- | -------------- | -------------- | -------------- | ------------ | ------ |
| 29 de mayo 11:09:28.000 | 92446       | Meghan Key     | verificado       | 085cc56c-a54f  | 838.32       | OK     |
| 29 de mayo 10:59:29.000 | 78037       | Anthony Gill   | verificado       | b1fad476-fd4f  | 479.96       | OK     |
| 29 de mayo 10:58:54.000 | 47694       | Tanya Mejía    | verificado       | cb23d1a7-c0cb  | 703.71       | OK     |
| 31 de mayo 12:20:01.152 | 80207       | Michael Kaiser | fraudulento     | 2c75b835-4194  | 386.21       | ERROR  |

Por último, se crea una celda de visualización de mapa de árbol con el conjunto de datos `transaction_record_with_names` filtrado para logs `status:error` y agrupado por `dollar_value`, `account_status` y `customer_name`.

{{< img src="logs/workspace/treemap.png" alt="Conjuntos de datos del espacio de trabajo" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/analysis-workspace/list
[2]: https://app.datadoghq.com/logs
[3]: /es/logs/log_configuration/parsing/
[4]: /es/logs/explorer/calculated_fields/
[5]: /es/ddsql_reference/
[6]: /es/ddsql_reference/ddsql_default/