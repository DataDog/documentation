---
title: Integración de la facturación de vSphere
---

## Información general

Datadog cobra por cada Agent instalado en un servidor vCenter y cada máquina virtual monitorizada.

## Exclusión de máquinas virtuales de vSphere

Usa el archivo `vsphere.yaml` para filtrar tus máquinas virtuales monitorizadas por Datadog mediante regex. Consulta [sample vsphere.d/conf.yaml][1] para ver un ejemplo.

Al añadir límites a máquinas virtuales ya existentes, las máquinas virtuales previamente detectadas podrían permanecer en la [lista de infraestructuras][2] durante un máximo de 24 horas. Durante el periodo de transición, las máquinas virtuales muestran un estado de `???`. Esto no cuenta a efectos de facturación.

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][3].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /es/infrastructure/
[3]: /es/help/
[4]: mailto:success@datadoghq.com