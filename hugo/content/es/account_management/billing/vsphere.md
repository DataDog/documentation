---
title: Integración de la facturación de vSphere
---

## Información general

Las facturas de Datadog para cada Agent instalado en un servidor vCenter y cada máquina virtual y host de ESXi monitorizado.

## Exclusión de máquinas virtuales de vSphere

Utiliza el archivo `vsphere.yaml` para filtrar tus máquinas virtuales monitorizadas por Datadog utilizando expresiones regulares. Consulta el [vsphere.d/conf.yaml de ejemplo][1] para ver un ejemplo.

Al añadir límites a las máquinas virtuales existentes, las máquinas virtuales previamente detectadas podrían permanecer en la [lista de infraestructura][2] hasta 24 horas. Durante el periodo de transición, las máquinas virtuales muestran un estado de `???`. Esto no cuenta para tu facturación.

## Solucionar problemas

Si tienes preguntas técnicas, ponte en contacto con el [soporte de Datadog][3].

Si tienes preguntas sobre la facturación, ponte en contacto con tu [asesor de clientes][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /es/infrastructure/
[3]: /es/help/
[4]: mailto:success@datadoghq.com