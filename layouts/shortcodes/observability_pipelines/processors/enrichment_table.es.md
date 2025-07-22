Usa este procesador para enriquecer tus logs con información de una tabla de referencia. Esta puede ser un archivo local o una base de datos.

Para configurar el procesador de la tabla de enriquecimiento:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.
2. Ingresa el atributo de origen del log. El valor del atributo de origen es lo que deseas encontrar en la tabla de referencia.
3. Introduce el atributo de destino. El valor del atributo de destino almacena, como un objeto JSON, la información que se encuentra en la tabla de referencia.
4. Selecciona el tipo de tabla de referencia que quieres usar, **Archivo** o **GeoIP**.
   - Para el tipo **Archivo**:
     1. Introduce la ruta del archivo.
     2. Introduce el nombre de la columna. El nombre de la columna en la tabla de enriquecimiento se usa para hacer coincidir el valor del atributo de origen. Consulta el [ejemplo de archivo de enriquecimiento](#enrichment-file-example).
   - Para el tipo **GeoIP**, introduce la ruta de GeoIP.

##### Ejemplo de archivo de enriquecimiento

En este ejemplo, `merchant_id` se usa como el atributo de origen y `merchant_info` como el atributo de destino.

Esta es la tabla de referencia de ejemplo que utiliza el procesador de enriquecimiento:

| id_producto| nombre_comerciante| ciudad| estado|
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id` está configurado como el nombre de columna que usa el procesador para encontrar el valor del atributo de origen. **Nota**: El valor del atributo de origen no tiene que coincidir con el nombre de la columna.

Si el procesador de enriquecimiento recibe un log con `"merchant_id":"536"`:

- El procesador busca el valor `536` en la columna `merch_id` de la tabla de referencia.
- Después de encontrar el valor, añade toda la fila de información de la tabla de referencia al atributo `merchant_info` como un objeto JSON:

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```