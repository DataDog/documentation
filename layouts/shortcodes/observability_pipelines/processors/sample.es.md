Este procesador toma muestras de tu tráfico de log para obtener un subconjunto representativo a la tasa que definas, descartando los logs restantes. Por ejemplo, puedes utilizar este procesador para muestrear el 20 % de los logs de un servicio no crítico y ruidoso.

El muestreo se aplica únicamente a los logs que coinciden con tu consulta de filtro y no afecta a otros logs. Si un log se descarta en este procesador, ninguno de los procesadores de abajo recibe ese log.

Para configurar el procesador de muestras:
1.  Define una **consulta de filtro**. Solo los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada se muestrean a la tasa de retención indicada a continuación. Los logs muestreados y los que no coinciden con la consulta del filtro se envían al siguiente paso del pipeline.
1. Configura el campo **Retain (Conservar)** con la tasa de muestreo deseada expresada como un porcentaje. Por ejemplo, al introducir `2`, se retiene el 2 % de los logs de todos los que coinciden con la consulta del filtro.