---
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentación
  text: Crear una regla personalizada
title: Historial de versiones
---
## Descripción general {#overview}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="El historial de versiones de un token de acceso OAuth de GitHub comprometido, mostrando" style="width:80%;" >}}

Utilice el Historial de versiones de reglas para:

- Vea versiones anteriores de una regla de detección y comprenda los cambios a lo largo del tiempo.
- Vea quién realizó los cambios para mejorar la colaboración.
- Compare las versiones con diferencias para analizar las modificaciones y el impacto de los cambios.

## Ver el historial de versiones de una regla {#see-version-history-of-a-rule}

Para ver el historial de versiones de una regla:
1. Vaya a [Detection Rules][1].
1. Haga clic en la regla que le interesa.
1. En el editor de reglas, haga clic en {{< ui >}}Version History{{< /ui >}} para ver los cambios anteriores.
1. Haga clic en una versión específica para ver qué cambios se realizaron.
1. Haga clic en {{< ui >}}Open Version Comparison{{< /ui >}} para ver qué cambió entre las versiones.
1. Seleccione las dos versiones que desea comparar.
    - Los datos resaltados en rojo indican datos que se modificaron o eliminaron.
    - Los datos resaltados en verde indican datos que se agregaron.
1. Haga clic en {{< ui >}}Unified{{< /ui >}} si desea ver la comparación en el mismo panel.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules