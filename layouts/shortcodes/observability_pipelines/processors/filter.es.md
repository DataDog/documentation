Este procesador filtra los logs que coinciden con la consulta de filtro especificada y descarta todos los logs que no coinciden con ella. Si un log se descarta en este procesador, ninguno de los procesadores situados por debajo de éste recibe ese log. Este procesador puede filtrar los logs innecesarios, como los de depuración o advertencia.

Para configurar el procesador de filtros:
- Define un **filtro de consulta**. La [consulta](#filter-query-syntax) que especificas filtra y pasa sólo los logs que coinciden con ella, y descarta todos los demás logs.