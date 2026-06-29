---
disable_toc: false
title: Commits sospechosos
---
## Información general

Error Tracking puede identificar commits sospechosos, ayudándote a identificar la causa raíz de tus errores y acelerar su resolución. Esta función se activa automáticamente en los incidentes cuando se cumplen los [requisitos de configuración](#setup).

{{< img src="logs/error_tracking/suspect_commit.png" alt="Commit sospechoso, tal como se muestra en la interfaz de usuario Datadog" style="width:100%" >}}

Una vez identificado un commit sospechoso, este aparece en el panel de incidentes, como se muestra en la zona resaltada de la siguiente imagen.

{{< img src="logs/error_tracking/suspect_commit_in_context.png" alt="Commit sospechoso que se muestra en el contexto del panel de incidentes" style="width:90%" >}}

Para ver un commit sospechoso en GitHub, haz clic en el botón **View Commit** (Ver commit).

### Criterios para clasificar un commit como sospechoso
Un commit se convierte en sospechoso si:
- Modifica una de las líneas de la traza (trace) del stack tecnológico.
- Se creó antes de que se produjera el primer error.
- Se redactó como máximo 90 días antes de que se produjera el primer error.
- Es el commit más reciente que cumple los criterios anteriores.

Para que se muestre un commit sospechoso en un incidente, debe haberse encontrado al menos un commit candidato.

## Configuración

Una vez cumplidos los requisitos de configuración, los commits sospechosos aparecen automáticamente en incidentes, cuando estén disponibles. Los commits realizados antes de cumplir los requisitos de configuración no se muestran.

### Habilitar la integración de código fuente

La función Commits sospechosos requiere la [integración del código fuente][1]. Para activar la integración del código fuente:

1. En la página [**Integraciones**][3] de Datadog, selecciona **Vincular código fuente** en la barra de navegación superior.
2. Sigue los pasos para asociar un commit a tu telemetría y configurar tu repositorio de GitHub.

### Instalar la integración GitHub
Instala la [integración GitHub][2], habilitando permisos de lectura para solicitudes de extracción y contenidos.

[1]: /es/integrations/guide/source-code-integration
[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations