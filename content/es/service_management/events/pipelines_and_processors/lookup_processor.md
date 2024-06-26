---
kind: Documentación
title: Procesador de búsqueda
---

Utiliza el procesador de búsqueda para definir una correspondencia entre un atributo de evento y un valor legible por el ser humano guardado en una [tabla de referencia][1] o en la tabla de asignación de procesadores.

Por ejemplo, puedes utilizar el procesador de búsqueda para enriquecer tus eventos con información de tu CMDB. De manera alternativa, puedes utilizarlo para verificar si la dirección MAC que acaba de intentar conectarse al entorno de producción pertenece a tu lista de máquinas robadas.

El procesador de búsqueda realiza las siguientes acciones:

* Comprueba si el evento actual contiene el atributo de origen.
* Verifica si el valor del atributo de origen existe en la tabla de asignación.
* Si existe, crea el atributo de destino con el valor correspondiente en la tabla.
* De manera opcional, si no encuentra el valor en la tabla de asignación, crea un atributo de destino con el valor de reserva predeterminado establecido en el campo `fallbackValue`. Puedes ingresar de forma manual una lista de pares `source_key,target_value` o cargar un archivo CSV en la pestaña **Manual Mapping** (Asignación manual). 


**Asignación manual**
    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Procesador de búsqueda" style="width:80%;">}}


**Tabla de referencia**
    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Procesador de búsqueda" 
    style="width:80%;">}}


 El límite de tamaño de la tabla de asignación es de 100 kB. Este límite se aplica a todos los procesadores de búsqueda de la plataforma. Sin embargo, las tablas de referencia admiten archivos de mayor tamaño.



[1]: /es/integrations/guide/reference-tables/