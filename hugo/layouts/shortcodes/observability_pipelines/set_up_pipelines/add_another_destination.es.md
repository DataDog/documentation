Si desea agregar un destino adicional a un grupo de procesadores, haga clic en el signo más (**+**) a la derecha del grupo de procesadores.

Para eliminar un destino, haga clic en el icono de papelera en la parte superior derecha del destino.
- Si elimina un destino de un grupo de procesadores que tiene varios destinos, solo se eliminará el destino eliminado.
- Si elimina un destino de un grupo de procesadores que solo tiene un destino, se eliminarán tanto el destino como el grupo de procesadores.

**Notas**:

- Un pipeline debe tener al menos un destino. Si un grupo de procesadores solo tiene un destino, ese destino no se puede eliminar.
- Puede agregar un total de 20 destinos para un pipeline.
- Si agrega varios destinos del mismo tipo a un pipeline, debe usar [Secrets Management][101]. Por ejemplo, si agrega dos destinos HTTP Client para dos HTTP Client diferentes, debe usar identificadores secretos para las HTTP Client URIs. No puede usar el `DESTINATION_HTTP_CLIENT_URI` predeterminado para almacenar las dos diferentes HTTP Client URIs.

[101]: /es/observability_pipelines/configuration/secrets_management/