Este procesador añade un campo con el nombre del host que envió el log. Por ejemplo, `hostname: 613e197f3526`. **Nota**: Si el `hostname` ya existe, el Worker lanza un error y no sobrescribe el `hostname` existente.

Para configurar este procesador:
- Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.