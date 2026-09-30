Este procesador añade un campo con el nombre del host que envió el log. Por ejemplo, `hostname: 613e197f3526`. **Nota**: Si el `hostname` ya existe, el worker lanza un error y no sobrescribe el `hostname` existente.

Para configurar este procesador:
- Define una **consulta de filtro**. Sólo se procesan los logs que coinciden con la [consulta de filtro] especificada (#filter-query-syntax). Todos los logs, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso del proceso.
