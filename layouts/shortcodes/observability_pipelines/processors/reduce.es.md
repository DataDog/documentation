El procesador de reducción agrupa múltiples eventos de logs en uno solo, basándose en los campos especificados y las estrategias de fusión seleccionadas. Los logs se agrupan en intervalos de 10 segundos. Después de que haya transcurrido el intervalo para el grupo, el log reducido de ese grupo se envía al siguiente paso del pipeline.

Para configurar el procesador de reducción:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Los logs reducidos y los que no coinciden con la consulta del filtro se envían al siguiente paso del pipeline.
2. En la sección **Group By (Agrupar por)**, introduce el campo por el que quieres agrupar los logs.
3. Haz clic en **Add Group by Field (Añadir grupo por campo)** para añadir campos adicionales.
4. En la sección **Merge Strategy (Estrategia de fusión)**:
   - En **En campo**, introduce el nombre del campo en el que quieres fusionar los logs.
   - Selecciona la estrategia de fusión en el menú desplegable **Apply (Aplicar)**. Esta es la estrategia que se usa para combinar eventos. Consulta la sección [Estrategias de fusión](#merge-strategies) a continuación para obtener descripciones de las estrategias disponibles.
   - Haz clic en **Add Merge Strategy (Añadir estrategia de fusión)** para agregar estrategias adicionales.

##### Estrategias de fusión

Estas son las estrategias de fusión disponibles para combinar eventos de log.


| Nombre| Descripción|
|----------|----------|
| Matriz| Añade cada valor a una matriz.|
| Concatenar| Concatena cada valor de cadena, delimitado por un espacio.|
| Concatenar línea nueva| Concatena cada valor de cadena, delimitado por una línea nueva.|
| Concatenar sin procesar| Concatena cada valor de cadena, sin un delimitador.|
| Descartar| Descarta todos los valores excepto el primer valor recibido.|
| Plano único| Crea una matriz aplanada de todos los valores únicos recibidos.|
| Matriz más larga| Mantiene la matriz más larga recibida.|
| Máx.| Mantiene el valor numérico máximo recibido.|
| Mín.| Mantiene el valor numérico mínimo recibido.|
| Conservar| Descarta todos los valores excepto el último valor recibido. Funciona como una forma de fusionar sin retener \`null\`.|
| Matriz más corta| Mantiene la matriz más corta recibida.|
| Suma| Suma todos los valores numéricos recibidos.|
