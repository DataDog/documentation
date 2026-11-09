---
description: Información en tiempo real de toda su flota de GPU para un mejor aprovisionamiento
  y optimización de costos
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de infraestructura de IA con Datadog GPU Monitoring
- link: /gpu_monitoring/explorer
  tag: Documentación
  text: Explorador de GPU Monitoring
title: Página de resumen de GPU Monitoring
---
## Descripción general {#overview}

La [página GPU Monitoring Summary][0] analiza toda su flota de GPU y destaca información unificada en sus dispositivos locales y en la nube para el período de tiempo seleccionado. Esta página responde a preguntas clave como:
- ¿Qué parte de su flota se está utilizando de manera efectiva o está completamente inactiva?
- ¿Qué equipos, servicios o clústeres son los que más desperdician recursos según las horas de inactividad?
- ¿Cómo puede aprovisionar mejor estos dispositivos para ajustarse a la demanda de las cargas de trabajo y mejorar la eficiencia en el uso de las cuotas?
- ¿Qué acciones de optimización puede tomar para obtener más valor de su flota de GPU existente?

Haga clic en los títulos de las secciones a continuación para acceder a la sección correspondiente:
- [Usage Across Fleet](#usage-across-fleet)
- [Cost & Utilization](#cost--utilization)
- [Allocation and Provisioning](#allocation-and-provisioning)
- [Workload Optimization Opportunities](#workload-optimization-opportunities)

## Usage across Fleet {#usage-across-fleet}

La eficiencia operativa es un factor clave del costo general. Comprender la utilización de su flota de GPU puede ayudar a evitar el aprovisionamiento excesivo y reducir el gasto en GPU inactivas.

### Visualización del embudo de la flota de GPU {#gpu-fleet-funnel-visualization}

Datadog GPU Monitoring proporciona observabilidad que permite visualizar tanto los dispositivos locales como los de la nube de forma unificada.

Esta visualización proporciona un desglose de toda su flota de GPU, ya sea en un proveedor importante de nube (AWS, GCP, Azure, Oracle Cloud), en instalaciones locales o en un proveedor de GPUaaS como Coreweave o Lambda Labs -- y muestra todos sus clústeres de Kubernetes, hosts y dispositivos GPU.

El embudo también destaca cualquier problema de rendimiento o ineficiencia de aprovisionamiento en los esfuerzos de utilización de recursos de sus equipos, como dispositivos inactivos, núcleos de GPU subutilizados o falta de recursos que requiera un reequilibrio.

{{< img src="gpu_monitoring/funnel-5.jpg" alt="Visualización de embudo titulada 'Su flota de GPU de un vistazo'. Muestra la cantidad de dispositivos totales, activos y efectivos, la asignación de Kubernetes y la asignación de dispositivos a lo largo del tiempo, con un pronóstico de una semana." style="width:90%;" >}}

Los pasos del embudo se definen de la siguiente manera:
- {{< ui >}}Total Devices{{< /ui >}}: Recuento de dispositivos GPU con GPU Monitoring configurado correctamente y que reportan métricas
- {{< ui >}}Active Devices{{< /ui >}}: Recuento de dispositivos GPU que se utilizan activamente para una carga de trabajo y que proporcionan valor
- {{< ui >}}Effective Devices{{< /ui >}}: Recuento de dispositivos GPU que funcionan durante más del 50 % del período seleccionado

Si utiliza Kubernetes y ha habilitado la integración de Kubernetes, verá información adicional sobre Kubernetes Allocation que le permite determinar cuántos de sus dispositivos GPU están {{< ui >}}Allocated{{< /ui >}} a cargas de trabajo de Kubernetes.

### Asignación de dispositivos a lo largo del tiempo {#device-allocation-over-time}

Las cargas de trabajo de IA pueden experimentar picos impredecibles en el uso de recursos. Como resultado, es importante alinear las GPU disponibles con las cargas de trabajo entrantes. Esta sección le ayuda a identificar si está asignando demasiadas GPU que terminan inactivas o si está aprovisionando recursos insuficientes que paralizan trabajos críticos.

Por ejemplo, si ve un pico en los valores pronosticados para la cantidad de dispositivos asignados, es posible que sus futuras cargas de trabajo requieran dispositivos GPU adicionales.

## Cost & Utilization {#cost-utilization}

{{< img src="gpu_monitoring/cost-and-utilization2.jpg" alt="Página Cost & Utilization que muestra el total de horas de GPU y el costo estimado a lo largo del tiempo agrupados por clúster, y un desglose de GPU inactivas con los principales clústeres por horas de inactividad y costo estimado de inactividad." style="width:90%;" >}}

Utilice esta sección para realizar un seguimiento y atribuir su gasto total en GPU en la nube y la eficiencia de utilización a los clústeres, equipos o servicios que más desperdician recursos.

**Nota**: Para ver el gasto total en GPU en la nube, debe habilitar las integraciones de nube de [AWS][3], [Google Cloud][4], [Azure][5] o [Oracle][6] en su interfaz de usuario de Datadog.

Haga clic en el total de sus horas de GPU o en el gasto estimado de GPU en la nube para ver cómo evolucionan a lo largo del tiempo. También puede desglosarlos por etiquetas clave como servicio o clúster en marcos de tiempo de 1 semana, 1 mes o 3 meses. En {{< ui >}}Idle GPU Breakdown{{< /ui >}}, puede identificar los equipos, servicios o clústeres que más desperdician recursos y que tienen dispositivos completamente inactivos. Haga clic en cualquier entidad para abrirla en el [explorador][1] y realizar más optimizaciones. Por ejemplo, si un clúster en particular es costoso, puede visualizar el uso a nivel de pod en la página del [explorador][1] para apagar pods o cambiar el tamaño de su clúster.

## Allocation and Provisioning {#allocation-and-provisioning}

Utilice esta sección para obtener información sobre la asignación y la capacidad de GPU. Esto le ayuda a solucionar problemas de cargas de trabajo fallidas debido a las limitaciones de GPU y a mejorar la eficiencia operativa de su flota.

### Desglose de instancias del proveedor de nube {#cloud-provider-instance-breakdown}

Si depende de GPU implementadas a través de los principales proveedores de nube, este widget desglosa el tipo de instancia de nube dentro de su flota.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="El widget de desglose de instancias del proveedor de nube" style="width:90%;" >}}

### Desglose por tipo de dispositivo {#device-type-breakdown}

Cuando las cargas de trabajo de IA fallan, puede deberse a la cantidad de dispositivos GPU disponibles en lugar del rendimiento del código. Este widget muestra la disponibilidad de dispositivos de todos sus tipos de dispositivos GPU y resalta los grupos de dispositivos de cada tipo que estén completamente saturados (lo que indica que podrían necesitarse dispositivos adicionales).

Para comprender si algún grupo de tipos de dispositivos necesita aprovisionamiento adicional, verifique estos datos con el widget {{< ui >}}Unmet GPU requests{{< /ui >}} debajo de él.

**Nota**: Si la cantidad de dispositivos disponibles para cualquier tipo de dispositivo es inferior al 5 % del número total de dispositivos, ese tipo de dispositivo se resalta en rojo.

{{< img src="gpu_monitoring/device_type.png" alt="Disponibilidad por tipo de dispositivo GPU" style="width:90%;" >}}

### Identifique áreas con recursos de GPU insuficientes para guiar las decisiones de aprovisionamiento (se requiere Kubernetes) {#pinpoint-areas-with-insufficient-gpu-resources-to-guide-provisioning-decisions-kubernetes-required}

**Nota**: Esta sección solo está disponible para usuarios de Kubernetes. 

Utilice esta sección para identificar la cantidad de solicitudes de GPU no satisfechas para sus clústeres de Kubernetes.

{{< img src="gpu_monitoring/unmet-requests-2.png" alt="Lista de los principales clústeres de Kubernetes por número de solicitudes de GPU no satisfechas." style="width:90%;" >}}

Si tiene clústeres de Kubernetes con una gran cantidad de solicitudes de GPU no satisfechas, también puede consultar su widget {{< ui >}}Device Type Breakdown{{< /ui >}} para comprender de qué tipo de dispositivo depende el servicio en particular, y el widget {{< ui >}}Device Allocation over time{{< /ui >}} para realizar un seguimiento de las demandas históricas. Esto le ayuda a confirmar si estos clústeres y tipos de dispositivos están constantemente subaprovisionados.

**Nota**: Si no hay servicios o clústeres enumerados y está emitiendo las etiquetas adecuadas, esto indica que todos sus servicios y clústeres tienen suficientes recursos de GPU durante el período de tiempo seleccionado.

## Oportunidades de optimización del flujo de trabajo {#workload-optimization-opportunities}

La optimización de costos de sus cargas de trabajo de GPU es crucial, ya que las GPU suelen ser los elementos más costosos en el presupuesto de infraestructura de un equipo. Esta sección identifica cargas de trabajo con un uso ineficiente de la GPU y vincula los costos derivados del desperdicio con cargas de trabajo específicas y su uso de recursos.

### Pods ineficaces (se requiere Kubernetes) {#ineffective-pods-kubernetes-required}

**Nota**: Esta sección solo está disponible para usuarios de Kubernetes. 

Para maximizar el valor de su gasto en infraestructura de GPU, es importante mantener sus dispositivos GPU ocupados de manera constante. Este widget revela qué pods están utilizando de manera ineficaz sus dispositivos GPU asociados. La tabla está ordenada por {{< ui >}}SM activity{{< /ui >}} de forma predeterminada.

{{< img src="gpu_monitoring/inefficient_pods.png" alt="Tabla de pods ineficientes ordenados por nivel de SM Engine Activity." style="width:90%;" >}}

Al hacer clic en cualquier pod ineficaz se abre un menú con la opción de visualizarlo en la página del Explorador de Kubernetes. En la página del Explorador de Kubernetes, puede acceder a la vista detallada del pod y hacer clic en la pestaña {{< ui >}}GPU{{< /ui >}} para ver sus dispositivos GPU relacionados.

Por ejemplo, puede notar que el gráfico de series temporales de la actividad de SM cae por debajo del 50 %. Luego puede verificar si los valores de {{< ui >}}Memory Utilization{{< /ui >}} y {{< ui >}}Graphics Activity{{< /ui >}} de sus dispositivos han aumentado durante ese período de tiempo en particular; si es así, esa es la razón del valor bajo de SM Engine Activity (dispositivos inactivos). Para solucionar esto, puede comunicarse con el propietario del pod para consolidar la carga de trabajo en una menor cantidad de dispositivos, usar una GPU más pequeña u optimizar su código para obtener una mayor capacidad de procesamiento con la GPU existente.

Este widget también le ayuda a identificar "vecinos ruidosos" (cuando uno o más pods consumen una cantidad desproporcionadamente grande de recursos compartidos en un servidor). Por ejemplo, otro pod puede estar usando toda la CPU de un servidor determinado, dejando a los demás pods del servidor sin recursos.

### Procesos zombi (se requiere Live Processes) {#zombie-processes-live-processes-required}

**Nota**: Esta sección solo está disponible para clientes que hayan instalado el producto [Live Processes][2]. 

Los procesos zombi suelen ser la fuente principal de gasto innecesario en GPU, ya que reservan capacidad de GPU de manera inapropiada. Este widget enumera todos los procesos zombi que deben terminarse para liberar esta capacidad de GPU para otras cargas de trabajo.

{{< img src="gpu_monitoring/zombie_processes.png" alt="Tabla de procesos zombi ordenada por SM Engine Activity que deben finalizarse para liberar capacidad de GPU." style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: /es/infrastructure/process/?tab=linuxwindows
[3]: /es/getting_started/integrations/aws/
[4]: /es/getting_started/integrations/google_cloud/?tab=orglevel
[5]: /es/getting_started/integrations/azure/?tab=createanappregistration
[6]: /es/getting_started/integrations/oci/