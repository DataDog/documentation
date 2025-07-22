Este procesador convierte el campo especificado en objetos JSON.

Para configurar este procesador:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.
2. Introduce el nombre del campo en el que deseas analizar JSON.<br>**Nota**: El JSON analizado sobrescribe lo que originalmente estaba contenido en el campo.