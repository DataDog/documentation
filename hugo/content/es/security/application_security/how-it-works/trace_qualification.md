---
aliases:
- /es/security/application_security/threats/trace_qualification
title: Calificación de traza
---
## Descripción general {#overview}

App and API Protection (AAP) proporciona observabilidad sobre ataques a nivel de aplicación y evalúa las condiciones en las que se generó cada traza. La calificación de traza de AAP etiqueta entonces cada ataque como dañino o seguro para ayudarle a tomar medidas sobre los ataques de mayor impacto.

Filtre por la faceta **Calificación** en el [Explorador de trazas][1] de AAP para visualizar los posibles resultados de calificación:


## Resultados de calificación {#qualification-outcomes}

AAP ejecuta reglas de calificación (de código cerrado) en cada traza. Existen cuatro posibles resultados de calificación, como se enumera en el menú de faceta:

| Resultado de calificación | Descripción |
|------|-------------|
| Desconocido | AAP tiene reglas de calificación para este ataque, pero no tuvo suficiente información para tomar una decisión de calificación. |
| Ninguno exitoso | AAP determinó que los ataques en esta traza no fueron dañinos. |
| Dañino | Al menos un ataque en la traza fue exitoso. |
| Sin valor | AAP no tiene reglas de calificación para este tipo de ataque. |

### Panel lateral de traza {#trace-sidepanel}

El resultado de la calificación también se puede ver al visualizar los detalles de una traza individual.


[1]: https://app.datadoghq.com/security/appsec/traces