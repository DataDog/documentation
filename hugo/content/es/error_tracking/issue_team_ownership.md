---
description: Asigna automáticamente las incidencias a equipos basándose en los archivos
  Git CODEOWNERS.
further_reading:
- link: /error_tracking/auto_assign/
  tag: Documentación
  text: Auto Assign
- link: /error_tracking/suspected_causes/
  tag: Documentación
  text: Causas sospechosas
title: Propiedad del equipo de incidencias
---

## Información general

La propiedad del equipo de incidencias automatiza el trabajo de clasificación asignando las incidencias al equipo adecuado. Tu equipo es propietario de una incidencia si:
- es propietario del marco del stack tecnológico de nivel superior de la incidencia según GitHub `CODEOWNERS`.
- es propietario del servicio en el que se produce la incidencia.

**Nota**: No se tienen en cuenta los marcos de stack tecnológico de archivos de terceros. Solo se tiene en cuenta el marco de stack tecnológico superior relacionado con un archivo presente en tu repositorio.

## Aprovechar la propiedad del equipo

La información sobre la propiedad del equipo aparece en el panel de detalles de la emisión cuando está disponible:

{{< img src="error_tracking/ownership-details-2.png" alt="Información de la propiedad del equipo en los detalles de la incidencia" style="width:80%;" >}}

También puedes utilizar la propiedad del equipo de incidencias para filtrar las incidencias por equipo en el Error Tracking Explorer.

{{< img src="error_tracking/ownership-search-bar.png" alt="Filtrado por Propietario del equipo en la barra de búsqueda" style="width:80%;" >}}

### Gestionar la propiedad de las incidencia por parte del equipo

Además de la propiedad automática de equipos, puedes añadir o eliminar manualmente equipos de las incidencias.

#### Añadir un equipo

Para añadir un equipo a una incidencia:

1. Abre el panel de detalles de la incidencia.
2. Haz clic en **Add team** (Añadir equipo).
3. Selecciona el equipo que deseas añadir.

#### Eliminar un equipo

Para eliminar un equipo de una incidencia:

1. Abre el panel de detalles de la incidencia.
2. Haz clic en el equipo que quieras eliminar.
3. Haz clic en **Unlink team from issue** (Desvincular equipo de la incidencia).

**Nota**: Los equipos añadidos a través de la propiedad del servicio no pueden ser eliminado. Datadog actualiza estos equipos automáticamente basándose en la propiedad del servicio actual.

## Instalación

### Configura la integración del código fuente

1. Asegúrate de que la [integración del código fuente][1] está configurada.
2. Instala [la integración de GitHub][2].
3. Asegúrate de que se conceden todos los permisos solicitados (Contenidos, Miembros) para la integración de GitHub.

### Configurar un archivo CODEOWNERS
Crea un archivo `CODEOWNERS` válido en tu repositorio siguiendo [las normas para CODEOWNERS de GitHub][3].

### Conectar equipos de GitHub a equipos de Datadog

En Datadog, ve a [**Teams**](https://app.datadoghq.com/teams) > Select your team > **Settings** > **GitHub Connection** (Equipos > Selecciona tu equipos > Ajustes > Conexión de GitHub) para asignar tus equipos de Datadog a los equipos de GitHub correspondientes definidos en tu archivo `CODEOWNERS`.

{{< img src="error_tracking/team-github-connection.jpg" alt="Conectar equipos de GitHub con equipos de Datadog" style="width:80%;" >}}

**Nota**: La propiedad del equipo de incidencias solo es compatible con GitHub.

## Configuración

La Propiedad del equipo de incidencias está habilitada por defecto para todos los servicios una vez que se cumplen los requisitos de configuración. Puedes controlar esta característica tanto a nivel global como de servicio a través de la [página de configuración de Error Tracking](https://app.datadoghq.com/error-tracking/settings/issues/ownership).

{{< img src="error_tracking/ownership-config.png" alt="Configuración de la Propiedad del equipo de incidencia" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/source-code-integration
[2]: /es/integrations/github/
[3]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners