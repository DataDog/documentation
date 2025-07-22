Este procesador filtra los logs que coinciden con la consulta de filtro especificada y descarta todos los logs que no coinciden. Si un log se descarta en este procesador, entonces ninguno de los procesadores siguientes recibe ese log. Este procesador puede filtrar los logs innecesarios, como los de depuración o advertencia.

Para configurar el procesador de filtros:
- Define una **consulta de filtro**. La [consulta](#filter-query-syntax) que especifiques filtra y transmite solo los logs que coinciden con ella, descartando todos los demás.