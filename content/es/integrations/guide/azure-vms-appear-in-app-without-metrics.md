---
aliases:
- /es/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
title: Las máquinas virtuales Azure aparecen en la aplicación sin métricas
---

Después de instalar correctamente la integración Azure en Datadog, las métricas desde tus máquinas virtuales Azure y otrOs servicios deberían empezar a fluir en unos 15 minutos.

Si después de este tiempo ves máquinas virtuales Azure en tu lista de infraestructuras pero no se informan métricas, pueden estar ocurriendo un par de cosas.

1. Asegúrate de que buscas las métricas correctas.
   Las **clásicas** métricas de máquinas virtuales comienzan con el espacio de nombres azure.vm y las métricas de máquinas virtuales desplegadas en ARM comienzan con el  espacio de nombres `azure.compute_virtualmachines`.

2. Si ninguno de estos espacios de nombres devuelve métricas, asegúrate de que **Diagnósticos** esté activado para las máquinas virtuales en el portal Azure. NOTA, sólo se requieren diagnósticos de arranque y métricas básicas.
    * Para máquinas virtuales **clásicas**:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Portal Azure que muestra la vista de los diagnósticos de una máquina virtual clásica con el estado activado" >}}

    * Para máquinas virtuales desplegadas en ARM:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Portal Azure que muestra la vista de configuración de los diagnósticos de una máquina virtual clásica con el estado activado" >}}

3. Asegúrate de que la máquina virtual se esté ejecutando.
   La integración no recopila métricas del rendimiento de máquinas detenidas/no asignadas. Sin embargo, `azure.vm.status metric` devuelve `1` si la máquina está en ejecución o detenida (lo que hace que las máquinas virtuales detenidas aparezcan en la lista de infraestructuras). La etiqueta (tag) de estado asociada permite diferenciar entre hosts en ejecución y no en ejecución. Asegúrate de que el host en cuestión tiene `status:running` y se está ejecutando en el portal Azure.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running.png" alt="Par de gráficos de series temporales en la aplicación Datadog, donde uno muestra la suma de azure.vm.status con estado:en ejecución y el otro muestra la suma de azure.vm.status con estado: no en ejecución" >}}