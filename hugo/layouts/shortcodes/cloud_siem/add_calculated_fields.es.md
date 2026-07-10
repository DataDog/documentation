1. (Opcional) Para crear campos calculados que transformen tus logs durante la consulta:
    1. Haz clic en **Add** (Añadir) y selecciona **Calculated fields** (Campos calculados).
    1. En **Name your field** (Nombrar tu campo), introduce un nombre descriptivo que indique la finalidad del campo calculado.
        - Por ejemplo, si deseas combinar el nombre y los apellidos de los usuarios en un solo campo, puedes llamar al campo calculado `fullName`.
    1. En el campo **Define your formula** (Define tu fórmula), introduce una fórmula o expresión que determine el resultado que debe calcularse y almacenarse como valor del campo calculado para cada evento de log.
        - Consulta [Lenguaje de expresiones de campos calculados][701] para obtener información sobre la sintaxis y las construcciones del lenguaje.

    [701]: /logs/explorer/calculated_fields/expression_language/