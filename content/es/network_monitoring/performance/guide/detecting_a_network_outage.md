---
aliases:
- /es/network_performance_monitoring/guide/detecting_a_network_outage/
title: Detección de una interrupción red
---
A menudo, las interrupciones de red se disfrazan de problemas de infraestructura, aplicaciones o contenedor, lo que dificulta su detección. Sin visibilidad del rendimiento de tu red regional o el de los endpoints de terceros en los que confía, pueden pasar horas hasta que se detecten las interrupciones regionales de terceros o de la nube, que en última instancia podrían afectar a tus clientes. 

Con Network Performance Monitorng (NPM), puedes detectar interrupciones de red en cuestión de minutos. Mediante el análisis de los datos del flujo de la red junto con las métricas, trazas (traces), logs y la infraestructura del proceso, puedes evitar hacer suposiciones sobre la raíz de un problema y, en su lugar, utilizar el proceso de eliminación (consulta los pasos siguientes) para determinar si estás experimentando una interrupción de red.

## Sobrecarga de tráfico en la infraestructura subyacente 

Utiliza NPM métricas para ver si tu endpoint de origen puede estar enviando una enorme cantidad de tráfico o realizando un gran número de conexiones abiertas al endpoint de destino. Al seleccionar una dependencia defectuosa (por ejemplo, una con alta latencia), puedes utilizar los gráficos del panel lateral para detectar estos picos de tráfico. Estos picos pueden sobrecargar la aplicación receptora hasta el punto de que no pueda (en el caso de TCP) responder a todas las conexiones, lo que provoca un aumento de la pérdida de paquetes y, por tanto, de la latencia de TCP. 

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/npm-metrics.png" alt="Sobrecarga de tráfico en la infraestructura subyacente">}}

## Consumo excesivo de la CPU de la infraestructura subyacente

Por otro lado, el consumo excesivo de recursos del endpoint cliente o servidor podría ser el culpable de una comunicación deficiente entre ambos. En la pestaña **Procesos** del panel lateral, delimita el ámbito que ves a procesos que se ejecutan en los endpoints de origen o de destino para detectar cualquier software pesado que pueda estar degradando el rendimiento de tus hosts o contenedores subyacentes, lo que reduce tu capacidad para responder a las llamadas de red. En este caso, además de saber _si_ un host subyacente se está ejecutando en caliente y causando latencia en la aplicación, querrás saber _por qué_ se está ejecutando en caliente. Agrupar tu métricas del proceso por comando te da esta granularidad, ya que puedes identificar la carga de trabajo concreta que están consumiendo tus recursos de CPU y memoria. 

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/processes.png" alt="Consumo excesivo de la CPU de la infraestructura subyacente">}}

## Errores de la aplicación en el código

Los errores y la latencia de la red también pueden deberse a errores de la aplicación del lado del cliente. Por ejemplo, si tu aplicación está generando conexiones en bucle innecesariamente, podría estar saturando los endpoints que dependen de ella, lo que provocaría problemas en la aplicación y en la red. Para determinar si este es el caso, busca errores de solicitud de la aplicación en la pestaña **Trazas (traces)** de un servicio específico en [NPM > DNS][1], o en la pestaña **Red** de una traza específica en APM Traces.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/traces_2.png" alt="Errores de la aplicación en el código">}}

Si ninguno de estos pasos conduce a una causa raíz y estás viendo errores y latencia para sus dependencias delimitadas a una región, zona de disponibilidad o endpoint de dominio de terceros específica, entonces estás experimentando una interrupción de red. En este caso, puedes ponerte en contacto con los proveedores correspondientes para informar y resolver el problema.

[1]: https://app.datadoghq.com/network/dns