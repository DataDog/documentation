1. Opcionalmente, active el interruptor para habilitar las **Opciones de almacenamiento en búfer**. Habilite un búfer configurable en su destino para asegurar que la latencia intermitente o una interrupción en el destino no creen contrapresión inmediata, y permita que los eventos continúen siendo ingeridos desde su fuente. Los búferes de disco también pueden aumentar la durabilidad de la canalización al escribir registros en el disco, asegurando que los registros almacenados en búfer persistan tras un reinicio de Worker. Consulte [Búferes de destino][100] para obtener más información.
	- Si se deja sin configurar, su destino utiliza un búfer de memoria con una capacidad de 500 eventos.
	- Para configurar un búfer en su destino:
		1. Seleccione el tipo de búfer que desea establecer (**Memoria** o **Disco**).
		1. Ingrese el tamaño del búfer y seleccione la unidad.
			1. El tamaño máximo del búfer de memoria es de 128 GB.
			1. El tamaño máximo del búfer de disco es de 5 TB.
				- **Nota**: Para las versiones 2.20.x y anteriores de Worker, el tamaño máximo del búfer de disco es de 500 GB.
		1. En el menú desplegable **Comportamiento con búfer lleno**, seleccione si desea **bloquear** los eventos o **descartar nuevos eventos** cuando el búfer esté lleno.

[100]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers