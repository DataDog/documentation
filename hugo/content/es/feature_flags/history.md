---
description: Rastrea y gestiona el historial de tus indicadores de características
further_reading:
- link: /getting_started/feature_flags/
  tag: Documentación
  text: Empezando con los Feature Flags
- link: /feature_flags/
  tag: Documentación
  text: Más información sobre indicadores de características
title: Historial de indicador de características
---

## Información general

El historial de indicadores permite realizar un seguimiento de los cambios y mantener un registro de auditoría de los indicadores de características de Datadog a lo largo del tiempo. Saber quién ha cambiado qué puede ser útil para la gobernanza y solucionar problemas de comportamiento inesperado en tu aplicación. Puedes ver el historial de indicadores individuales o acceder a una vista global de todos los cambios de indicadores en tu organización.

## Historial de indicadores individuales

Cuando se visualiza un indicador de característica individual, la sección de la barra lateral **Version history** (Historial de versiones) muestra todos los cambios realizados en ese indicador específico.

- Selecciona una pestaña **Environment** (Entorno) para ver los cambios en un entorno concreto.
- Selecciona **View diff** (Ver diferencia) para mostrar una vista de diferencias de un cambio específico.

{{< img src="/feature_flags/flag_history.png" alt="Panel de historial para un indicador de característica individual" style="width:100%;" >}}

## Historia global de indicadores

Ve a **Feature Flags > [Global Flag History][1]** (Indicadores de características > Historial global de indicadores) para ver todos los cambios de indicadores de tu organización en una única vista.

- Utiliza el filtro **Environment** (Entorno) para ver los cambios en un entorno concreto o en todos los entornos.
- Utiliza el filtro **Feature Flag** (Indicador de características) para ver los cambios de un indicador específico.
- Utiliza el filtro de intervalo de fechas para limitar los resultados a un periodo específico.
- Selecciona **See Changes** (Ver cambios) para visualizar una vista de diferencias de un cambio específico.

{{< img src="/feature_flags/flag_history_global.png" alt="Vista del historial global de indicadores" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/global-history