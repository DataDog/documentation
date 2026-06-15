---
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Planificación y ajustes de uso
title: Migración a las APIs de atribución de uso por horas y meses
---

## Resumen

Esta guía contiene instrucciones para migrar de la v1 de las APIs de atribución de uso a la v2. Las APIs v1 quedan
obsoletas y hay dos tipos: La
API mensual ([Obtener atribución de uso][1]) y las
APIs basadas en archivos ([Obtener lista de informes personalizados diarios][2], [Obtener informes personalizados diarios especificados][3],
[Obtener lista de informes personalizados mensuales disponibles][4] y
[Obtener informes personalizados mensuales especificados][5]). Para usar esta guía, busca las APIs v1 que estás usando actualmente en la sección siguiente y sigue las instrucciones para migrar a las API v2 correspondientes.

**Nota**: Cualquier mención de v1 y v2 en este documento no se refiere a la versión en la ruta URL. Todas las APIs de esta documentación son las primeras versiones con sus respectivas rutas, por lo que utilizan `v1` en la ruta URL.

## API mensual

### [Obtener atribución de uso][6]

Esta API muestra la atribución de uso mensual.

La API v2 de atribución de uso mensual [Obtener atribución de uso mensual][7] también muestra la atribución de uso mensual y ofrece la posibilidad de hacer consultas según combinaciones de etiquetas.

Consulte las secciones a continuación para ver las diferencias entre la API v1 y v2 y recomendaciones para migrar a la API v2.

#### Paginación

En la API v1 API puedes configurar la paginación mediante los parámetros de consulta `offset` y `limit`. El valor en
`metadata.pagination.total_number_of_records` muestra el número total de registros en todas las páginas.

En la API v2 puedes configurar la paginación mediante el parámetro de consulta `next_record_id`. El valor inicial de la página siguiente se muestra
en `metadata.pagination.next_record_id`. La respuesta no incluye el número total de registros.

Para migrar a la API v2, usa `next_record_id` para cambiar de página como se explica en la página de documentación de la API.

#### Desglose por etiquetas

En la API v1, los datos de uso se desglosan por separado para cada etiqueta en la misma respuesta. Esto da lugar a datos aparentemente duplicados, en los que se cuenta el mismo recurso en varias etiquetas, como por ejemplo `a`, `b` y `c` por separado.

En la API v2 puedes seleccionar el desglose por etiquetas introduciendo una configuración de etiquetas en el parámetro `tag_breakdown_keys`. Puedes introducir las etiquetas una por una o varias etiquetas en una lista separada por comas. Si introduces varias etiquetas, se mostrará el uso filtrado por la combinación de dichas etiquetas.

Para migrar a la API v2, especifica las etiquetas a usar en el parámetro `tag_breakdown_keys`. Para obtener
los mismos desgloses que en la API v1, haz consultas distintas para cada etiqueta.

#### Agregación

En la API v1, la sección `aggregates` contiene las sumas de todos los registros posibles, lo que da un resultado tres veces mayor al número real, ya que los datos se triplican en tres etiquetas distintas. Por ejemplo:

```json
{
  "field": "infra_host_usage",
  "value": 293880,
  "agg_type": "sum"
},
```

En la API v2, la sección `aggregates` solo contiene las sumas de los registros para la combinación de etiquetas introducida. Por ejemplo:

```
{
"field": "infra_host_usage",
"value": 97960,
"agg_type": "sum"
},
```

Para migrar a la API v2, usa las agregaciones, ya que sus valores representan el uso total para la organización durante los meses consultados.

#### Valores decimales

En la API v1, algunos valores de uso se muestran con decimales. Por ejemplo:
`"cws_containers_usage": 1105642.92`

En la API v2. los valores de uso se muestran como números enteros. Por ejemplo:
`"cws_containers_usage": 1105643`

No es posible convertir los valores enteros a valores con decimales. Los valores enteros son los valores con decimales redondeados.

#### Familias de productos

En la API v1, el uso de la monitorización serverless se encuentra en:

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

En la API v2, el uso de la monitorización serverless se encuentra en:

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

Estos tipos de uso son equivalentes funcionalmente. La única diferencia es el nuevo nombre del campo.

## API basadas en archivos

Este conjunto de APIs incluye enlaces para descargar archivos .zip con los datos de atribución de uso, en distribución diaria y semanal.

### [Obtener la lista de informes personalizados diarios disponibles][2]

Esta API proporciona una lista de descargas disponibles. Dado que las descargas de archivos están obsoletas, no hay un sustituto para
esta API.

### [Obtener los informes personalizados diarios especificados][3]

Esta API proporciona un enlace para descargar un archivo .zip con los datos de atribución de uso para todos los productos en un día concreto. El archivo .zip
contiene un archivo TSV (tab separated value, valores separados por tabuladores) para cada producto.

La API [Obtener atribución de uso horaria][8]
proporciona los mismos datos.

Consulta las secciones a continuación para ver las diferencias entre las API v1 y V2 y recomendaciones para migrar a la API v2.

#### Formato de respuesta

En la API v1, la respuesta contiene un enlace a un archivo ZIP que contiene un archivo TSV para cada producto.

En la API v2, la respuesta contiene los datos de atribución de uso en formato JSON.

Para migrar a la API v2, tus procesos tienen que gestionar los datos en formato JSON. Puedes aplicar las conversiones necesarias a los datos JSON para crear el formato que mejor se adapte a tus necesidades.

#### Desglose por etiquetas

En la API v1, los datos de uso se desglosan según las etiquetas elegidas.

En la API v2, puedes seleccionar el desglose de etiquetas introduciendo una configuración de etiquetas en `tag_breakdown_keys`, en formato de lista separada por comas.

Para migrar a la API v2, especifica todas las etiquetas seleccionadas en el parámetro de consulta `tag_breakdown_keys` .

#### Claves de etiqueta

En la API v1, las claves de etiqueta seleccionadas se presentan como cabeceras en el archivo TSV. Por ejemplo:

```
public_id       formatted_timestamp     env     service total_usage
abc123          2022-01-01 00:00:00     prod    web     100
...
```

En la API v2, las etiquetas seleccionadas en el objeto `tags` de cada elemento en la matriz de uso de la respuesta. Por ejemplo:

```
...
  "tags": {
    "service": [
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

Para migrar a la API v2, recupera del objeto `tags` en cada fila de respuesta.

#### Valores de etiquetas

En la API v1, si un recurso tiene varios casos de la misma etiqueta, aparece como una cadena separada por barras verticales (`|`) en la columna de la etiqueta.

Ejemplo:

```
public_id       formatted_timestamp     env     service               total_usage
abc123          2022-01-01 00:00:00     prod    authentication|web    100
...
```

En la API v2, el valor correspondiente a cada clave de etiqueta en el objeto `tags` es una matriz. Si hay varias instancias de la misma etiqueta en un recurso,
esto indica que la lista contiene varios elementos.

Ejemplo:

```
...
  "tags": {
    "service": [
      "authentication",
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

Para migrar a la API v2, tus procesos deben gestionar recursos con la misma etiqueta aplicada varias veces.
Los valores de etiquetas en la matriz de respuesta v2 aparecen en el mismo orden que en la cadena separada por barras verticales en la respuesta v1,
así que puedes unir la matriz con barras verticales para generar los mismos valores de etiquetas que en la respuesta v1.

#### Uso total

En la API v1, el nombre del uso total es `total_usage` en la cabecera CSV.

En la API v2, el nombre del uso total es `total_usage_sum` y es una clave en cada objeto en la matriz de uso.

Para migrar a la API v2, usa la clave `total_usage_sum` para extraer el valor de uso.

#### Tipo de dato de uso total

La API v1 usa CSV, que no tiene la capacidad de especificar el tipo de datos (aunque el uso total siempre es un número).

En la API v2, el uso total es un número entero.

Para migrar a la API v2, gestiona el uso total como un número entero.

#### Formato de fecha y hora

En la API v1, el formato de fecha y hora es `YYYY-MM-DD hh:mm:ss`.

En la API v2, el formato de fecha y hora es `YYYY-MM-DDThh`.

Los datos en el formato v1 siempre usan el valor `0` para minutos y segundos (los datos son horarios). Los datos en el formato v2 pueden ser parseados y tratados como equivalentes a la hora parseada del formato v1.

#### Organizaciones secundarias

En la API v1, el archivo solo contiene datos para la configuración de etiquetas definida en la organización principal. Esto incluye todas las organizaciones secundarias de la principal, porque las configuraciones de etiquetas también se aplican a las organizaciones secundarias.

En la API v1, si se provee el parámetro `include_descendants=true` (esto es el valor por defecto), la respuesta contiene datos para la organización principal y todas sus organizaciones secundarias. Esto incluye todos los datos de las configuraciones de etiquetas heredadas de la organización principal por las secundarias y también incluye configuraciones de etiquetas definidas directamente para dichas organizaciones secundarias. Se puede ver el origen de una configuración de etiquetas específica en el campo `tag_config_source`.

Para migrar a la API v2, pasa el parámetro `include_descendants=true`. Para obtener los mismos valores que en la respuesta v1, filtra todos los registros en la respuesta que no coincidan con `tag_config_source` en la configuración de etiquetas
de la organización principal.

#### Rango de datos

En la API v1, se devuelven los datos para un solo día. La fecha se especifica en el parámetro `record_id` de la
solicitud.

En la API v2, puedes recuperar los datos para periodos de tiempo arbitrarios, hasta 24 horas en una solicitud, usando los parámetros `start_hr`
y `end_hr`.

Para migrar a la API v2, solicita datos con `start_hr` como media noche (`00` horas) del día deseado
y `end_hr` como media noche del día siguiente.

#### Paginación

En la API v1, los datos no están paginados. Esto puede dar lugar a archivos muy grandes.

En la API v2, los datos están paginados. Si una respuesta ocupa más de una página, la ID para obtener la página siguiente se
muestra en el campo `metadata.pagination.next_record_id`. Puedes introducir este valor en el parámetro de consulta `next_record_id`
para obtener la página siguiente.

Para migrar a la API v2, recupera todas las páginas para el día concreto.

#### Cardinalidad  de datos

En la API v1, los datos se desglosan según las tres etiquetas.

En la API v2, los datos se desglosan de la forma especificada en el parámetro de consulta `tag_breakdown_keys`.

Para migrar a la API v2, introduce todas las etiquetas elegidas en el parámetro `tag_breakdown_keys`,

#### Nombres de tipos de uso

En la API v1, los archivos se llaman `daily_<product>_<date>.tsv`.

En la API v2, los archivos siempre tienen el sufijo `_usage`.

Para migrar a la API v2, introduce el sufijo `_usage` a todos los tipos de uso.

#### Tipos de uso renombrados

La API v1 contiene archivos para:

* `apm`
* `infra`
* `lambda_invocations`
* `lambda_functions`
* `profiled_containers`
* `npm`
* `profiled_hosts`

En la API v2, los tipos de uso correspondientes son:

* `apm_host_usage`
* `infra_host_usage`
* `invocations_usage`
* `functions_usage`
* `profiled_container_usage`
* `npm_host_usage`
* `profiled_host_usage`

Para migrar a la API v2, mapea los tipos de uso especificados con los nombres actualizados.

#### Tipo de uso cronologías

En la API v2, el archivo de cronologías contiene el uso de cronologías tanto estándar como personalizadas.

En la API v2, hay un tipo de uso `custom_timeseries_usage`.

Datadog solo factura por el uso de cronologías personalizadas, así que el uso de cronologías estándar no es necesario.

#### Tipo de uso Synthetics

En la API v1, el archivo Synthetics contiene el uso de pruebas tanto de API como de navegador.

En la API v2, hay dos tipos de uso de Synthetics, `api_usage` y `browser_usage`.

Para migrar a la API v2, usa los nuevos tipos de uso para recuperar el uso de Synthetics.

### [Obtener lista de informes personalizados mensuales disponibles](https://docs.datadoghq.com/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports)

La API genera una lista de descargas disponibles. Dado que las descargas de archivos están obsoletas, no hay un sustituto para esta API.

### [Obtener los informes personalizados mensuales especificados][5]

Esta API devuelve un enlace para descargar un archivo ZIP con los datos de atribución de uso para todos los productos durante un mes concreto. El archivo ZIP
contiene un archivo TSV para cada producto y un archivo resumen para cada etiqueta. Los métodos para replicar ambos tipos de archivos se explican a continuación.

### Datos horarios por archivos de producto

Los archivos de datos horarios usan el formato de nombre `monthly_<product>_<date>.tsv`. Cada archivo de producto es una versión concatenada
de los archivos ZIP diarios disponibles
en [Obtener los informes personalizados diarios especificados][3]
.

La API [Obtener atribución de uso horaria][8]
proporciona los mismos datos.

Dado que los archivos de datos horarios son muy similares a los archivos disponibles
en [Obtener los informes personalizados diarios especificados][3]
, la misma guía es aplicable excepto la recomendación para rangos de tiempo. Para migrar desde los archivos mensuales v1,
solicita todas las páginas para cada día del mes. Las solicitudes tienen un límite de 24 horas por solicitud en la API v2.

### Resumen mensual por archivos de etiquetas

Los archivos de resumen mensuales usan el formato de nombre`summary_<tag>_<date>.tsv`. Proporcionan rollup para todo el uso durante
el mes para cada etiqueta. La API [Obtener atribución de uso mensual][7]
proporciona los mismos datos.

Consulta las secciones siguientes para ver las diferencias entre la API v1 y la API v2 junto con recomendaciones para migrar a la API v2.

#### Formato de respuesta

La respuesta de la API v1 contiene un enlace a un archivo ZIP, que contiene un archivo TSV para cada etiqueta seleccionada.

La respuesta de la API v2 devuelve los datos de atribución de uso en formato JSON.

Para migrar a la API v2, tus procesos tienen que gestionar los datos en formato JSON. Puedes aplicar las conversiones necesarias a los datos JSON para crear el formato que mejor se adapte a tus necesidades.

#### Desglose por etiquetas

En la API v1, hay un archivo TSV distinto para cada etiqueta elegida.

En la API v2, puedes seleccionar el desglose por etiquetas introduciendo una configuración de etiquetas en `tag_breakdown_keys` como una lista separada por comas.

Para migrar a la API v2, haz solicitudes con cada etiqueta especificada de forma individual en `tag_breakdown_keys`.

#### Valores de etiquetas

En la API v1, si un recurso está etiquetado con la misma etiqueta varias veces, se muestra como una cadena separada por barras verticales (`|`)
en la columna de la etiqueta.

Ejemplo:

```
month   public_id       team        infra_host_usage ....
2022-01 abc123          billing|sre 100
...
```

En la API v2, el valor correspondiente a cada clave de etiqueta en el objeto `tags` es una matriz. Si un recurso está etiquetado varias veces con la misma etiqueta, la lista contiene varios elementos.

Ejemplo:

```
...
  "tags": {
    "team": [
      "billing",
      "sre"
    ]
  },
...
```

Para migrar a la API v2, tus procesos deben gestionar recursos con la misma etiqueta aplicada varias veces.
Los valores de etiquetas en la matriz de respuesta v2 aparecen en el mismo orden que en la cadena separada por barras verticales en la respuesta v1,
así que puedes unir la matriz con barras verticales para generar los mismos valores de etiquetas que en la respuesta v1.

#### Uso total

En la API v1, la segunda fila del archivo contiene el uso agregado para todas las etiquetas.

En la API v2, la sección `metadata.aggregates` de la respuesta contiene el uso agregado para todas las etiquetas.

Para migrar a la API v2, recupera el uso total de la sección `metadata.aggregates`.-

#### Tipo de datos de uso

En la API v1, algunos valores de uso se muestran como números con decimales. Por ejemplo:

```
container_usage
55.4
```

En la API v2, el uso se muestra como números enteros. Por ejemplo:
`"container_usage": 55`

No es posible convertir los valores enteros a valores con decimales. Los valores enteros son los valores con decimales redondeados.

#### Organizaciones secundarias

En la API v1, el archivo solo contiene datos para la configuración de etiquetas definida en la organización principal. Esto incluye todas las organizaciones secundarias
de la principal, porque las configuraciones de etiquetas también se aplican a las organizaciones secundarias.

En la API v1, si se provee el parámetro `include_descendants=true` (esto es el valor por defecto), la respuesta contiene datos para la organización principal y todas sus organizaciones secundarias.
Esto incluye todos los datos de las configuraciones de etiquetas heredadas de la organización principal por las secundarias y también incluye configuraciones de etiquetas definidas directamente para dichas organizaciones secundarias. Se puede ver el origen de una configuración de etiquetas específica en el campo `tag_config_source`.


#### Uso de monitorización serverless:

En la API v1, el uso de la monitorización serverless usa los siguientes nombres:

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

En la API v2, el uso de la monitorización serverless usa los siguientes nombres:

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

Para migrar a la API v2, consulta el uso de monitorización serverless bajo los nombres actualizados de los campos. Estos tipos de uso son equivalentes funcionalmente. La única diferencia es el nuevo nombre del campo.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/usage-metering/#get-usage-attribution
[2]: /es/api/latest/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: /es/api/latest/usage-metering/#get-specified-daily-custom-reports
[4]: /es/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports
[5]: /es/api/latest/usage-metering/#get-specified-monthly-custom-reports
[6]: /es/api/latest/usage-metering/#get-usage-attribution
[7]: /es/api/latest/usage-metering/#get-monthly-usage-attribution
[8]: /es/api/latest/usage-metering/#get-hourly-usage-attribution