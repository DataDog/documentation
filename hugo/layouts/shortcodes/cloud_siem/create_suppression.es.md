(Opcional) Crea una supresión o añade la regla a una supresión existente para evitar que una señal se genere en casos específicos. Por ejemplo, si un usuario `john.doe` está activando una señal, pero sus acciones son benignas y no deseas que se activen señales de este usuario, añade la siguiente consulta en el campo **Add a suppression query** (Añadir una consulta de supresión): `@user.username:john.doe`.

#### Crear una nueva supresión

1. Introduce un nombre para la regla de supresión.
1. (Opcional) Añade una descripción.
1. Introduce una consulta de supresión.
1. (Opcional) Añade una consulta de exclusión de log para excluir logs del análisis. Estas consultas se basan en **atributos de log**.
    - **Nota**: La supresión heredada se basaba en consultas de exclusión de log, pero ahora se incluye en el paso **Añadir una consulta de supresión** de la regla de supresión.

#### Añadir a la supresión existente

1. Haz clic en **Add to Existing Suppression** (Añadir a la supresión existente).
1. Selecciona una supresión existente en el menú desplegable.


