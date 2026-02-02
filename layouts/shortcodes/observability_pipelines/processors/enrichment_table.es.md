Utiliza este procesador para enriquecer tus logs con información de una tabla de referencia, que puede ser un archivo local o una base de datos.

Para configurar el procesador de la tabla de enriquecimiento:
1. Define una **filter query**. Solo se procesan los registros que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso en la tubería.
2. Ingrese el atributo de origen del registro. El valor del atributo de origen es lo que desea encontrar en la tabla de referencia.
3. Ingrese el atributo de destino. El valor del atributo de destino almacena, como un objeto JSON, la información encontrada en la tabla de referencia.
4. Selecciona el tipo de tabla de referencia que deseas utilizar, \*\*File** (Archivo) o \*\*GeoIP**.
   - Para el tipo \*\*File** (Archivo):
        1. Introduce la ruta del archivo.<br>\*\*NOTA:** Todas las rutas de archivo son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Vea [Configuraciones Avanzadas del Trabajador][10172] para más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos ser legible por el grupo o usuario.
        1. Ingrese el nombre de la columna. El nombre de la columna en la tabla de enriquecimiento se utiliza para hacer coincidir el valor del atributo de origen. Vea el [ejemplo de archivo de enriquecimiento](#enrichment-file-example).
   - Para el tipo \*\*GeoIP**, introduce la ruta GeoIP.

##### Ejemplo de archivo de enriquecimiento

Para este ejemplo, `merchant_id` se utiliza como el atributo de origen y `merchant_info` como el atributo de destino.

Esta es la tabla de referencia de ejemplo que utiliza el procesador de enriquecimiento:

| merch_id | merchant_name   | ciudad      | estado    |
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id` se establece como el nombre de la columna que el procesador utiliza para encontrar el valor del atributo de origen. \*\*NOTA:** El valor del atributo de origen no tiene que coincidir con el nombre de la columna.

Si el procesador de enriquecimiento recibe un registro con `"merchant_id":"536"`:

- El procesador busca el valor `536` en la columna `merch_id` de la tabla de referencia.
- Después de encontrar el valor, agrega toda la fila de información de la tabla de referencia al atributo `merchant_info` como un objeto JSON:

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->