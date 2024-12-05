---
title: Procesador de generación de cadenas
---

Utiliza el procesador de generación de cadenas para añadir un atributo nuevo (sin espacios ni caracteres especiales) a un evento con el resultado de la plantilla proporcionada. Esto permite agregar diferentes atributos o cadenas sin formato en un solo atributo.

La plantilla se define tanto por texto sin formato como por bloques con la sintaxis `%{attribute_path}`.

**Notas**:

* Este procesador solo acepta atributos con valores o una matriz de valores en el bloque (consulta los ejemplos de la sección de Interfaz de usuario más abajo).
* Si no se puede utilizar un atributo (objeto o matriz de objetos), se sustituye por una cadena vacía o se omite toda la operación en función de tu selección.
* Si ya existe un atributo de destino, se sobrescribe con el resultado de la plantilla.
* Los resultados de una plantilla no pueden superar los 256 caracteres.

**Generador de cadenas de ejemplo**

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Procesador de generación de cadenas" style="width:80%;">}}