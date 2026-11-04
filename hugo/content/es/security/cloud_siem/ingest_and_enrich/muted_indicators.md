---
description: Silencie los indicadores de compromiso que sean benignos para su organización
  para que Cloud SIEM los clasifique como benignos. Cubre cómo el silenciamiento cambia
  el enriquecimiento de registros, los indicadores silenciados gestionados por Datadog
  y cómo silenciar indicadores, revisarlos y dejar de silenciarlos.
disable_toc: false
further_reading:
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentación
  text: Investigue indicadores con el explorador de IOC
- link: /security/threat_intelligence/
  tag: Documentación
  text: Inteligencia de amenazas en Datadog Security
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: Documentación
  text: Traiga su propia inteligencia de amenazas a Cloud SIEM
title: Indicadores silenciados
---
## Descripción general {#overview}

Las fuentes de inteligencia de amenazas pueden marcar un indicador que es inofensivo para su organización, como la dirección IP de salida de su VPN corporativa, un grupo de criptominería autorizado o el dominio de una herramienta interna. Silenciar un indicador le indica a Cloud SIEM que lo clasifique como `benign` para su organización, para que su equipo deje de realizar el triaje de los mismos falsos positivos.

El silenciamiento no elimina la inteligencia de amenazas. Los indicadores silenciados mantienen su enriquecimiento y permanecen visibles en el [IOC Explorer][1], por lo que aún puede buscarlos y ver por qué fueron marcados.

Los indicadores se pueden silenciar de dos maneras:

- **Gestionados por Datadog**: Datadog mantiene una lista de indicadores conocidos como benignos, como dominios ampliamente utilizados, y los silencia para todas las organizaciones. Esta lista es de solo lectura.
- **Silenciados por su organización**: Indicadores que su equipo silencia. Estos silenciamientos se aplican solo a su organización y puede dejar de silenciar los indicadores en cualquier momento.

## Cómo funciona el silenciamiento {#how-muting-works}

Cuando se silencia un indicador, Cloud SIEM cambia la forma en que enriquece los nuevos registros que coinciden con el indicador:

- La [intención][2] de cada resultado de inteligencia de amenazas elegible cambia a `benign`.
- El registro mantiene el resto de su enriquecimiento de inteligencia de amenazas, como la fuente y la categoría, y se marca con `has_been_muted: true`.
- La puntuación de IOC del indicador permanece igual.

El silenciamiento se aplica a los registros que Cloud SIEM procesa después de que el silenciamiento entra en vigor. Los registros que ya fueron procesados mantienen su enriquecimiento original.

### Cuándo entra en vigor un silenciamiento o cuándo se deja de silenciar un indicador {#when-a-mute-or-unmute-takes-effect}

- **IOC Explorer**: Muestra el nuevo estado de silenciamiento inmediatamente.
- **Enriquecimiento de registros**: Puede tardar hasta una hora en aplicarse. Durante ese tiempo, los nuevos registros y las detecciones basadas en ellos pueden seguir utilizando la calificación original.

### Inteligencia de amenazas que el silenciamiento no cambia {#threat-intelligence-that-muting-does-not-change}

Silenciar los indicadores de su organización no cambia las calificaciones de:

- Inteligencia de amenazas que usted mismo aporta a través de [tablas de referencia][3]
- Integraciones de Plataforma de Inteligencia de Amenazas (TIP): MISP, OpenCTI y Anomali ThreatStream

## Requisitos previos {#prerequisites}

- Su organización debe estar suscrita a Cloud SIEM
- Necesita los siguientes [permisos][4]:
  - Para visualizar indicadores silenciados: `security_monitoring_signals_read`
  - Para silenciar o dejar de silenciar indicadores: `security_monitoring_signals_write`

## Límites {#limits}

| Límite | Valor |
|---|---|
| Silenciamientos activos por organización | 10,000 |
| Indicadores por acción de silenciar o dejar de silenciar | 100 |
| Longitud del motivo | 100 caracteres |
| Tipos de indicadores admitidos | Dirección IP, dominio, hash de archivo SHA-256 |

Cuando su organización alcance los 10,000 silenciamientos activos, deje de silenciar los indicadores que ya no necesite antes de silenciar otros nuevos.

## Silenciar indicadores {#mute-indicators}

Puede silenciar direcciones IP, dominios y hashes de archivo SHA-256. Silencie solo valores individuales. Los rangos CIDR no se pueden silenciar, así que silencie direcciones IP individuales en su lugar.

### Silenciar un indicador {#mute-an-indicator}

1. Vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5].
1. Haga clic en un indicador para abrir su panel lateral.
1. Haga clic en {{< ui >}}Mute This IoC{{< /ui >}}.
1. Opcionalmente, ingrese un motivo para silenciar, como `Corporate VPN egress`. El motivo puede tener hasta 100 caracteres y aparece en la página Muted Indicators.
1. Haga clic en {{< ui >}}Mute{{< /ui >}}.

### Silenciar varios indicadores {#mute-multiple-indicators}

1. Vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5].
1. Seleccione las casillas de verificación junto a los indicadores que desea silenciar. Puede silenciar hasta 100 indicadores a la vez.
1. En el menú de acciones masivas, haga clic en {{< ui >}}Mute{{< /ui >}}.
1. Opcionalmente, ingrese un motivo para silenciar. El motivo se aplica a cada indicador seleccionado.
1. Confirme la acción.

Los indicadores seleccionados que ya están silenciados, por su organización o por Datadog, no cambian como resultado de una segunda acción de silenciar.

## Revisar indicadores silenciados {#review-muted-indicators}

La página Muted Indicators lista todos los silenciamientos activos, tanto los de Datadog como los de su organización. Para abrirla, realice una de las siguientes acciones:

- Vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Muted Indicators{{< /ui >}}][6].
- En el [IOC Explorer][5], haga clic en {{< ui >}}Muted Indicators{{< /ui >}}. La lista se abre en un panel lateral. Haga clic en {{< ui >}}Open full page{{< /ui >}} para ir a la página de configuración.

Para cada indicador, la lista muestra el tipo de indicador, el contexto y el motivo. Las filas gestionadas por Datadog muestran la fuente de origen. Las filas silenciadas por su organización muestran quién silenció el indicador y cuándo. Use la barra de búsqueda para filtrar por indicador, tipo de indicador, contexto (su organización o gestionado por Datadog), fuente o motivo.

### Encontrar indicadores silenciados en IOC Explorer {#find-muted-indicators-in-the-ioc-explorer}

En el [IOC Explorer][5], la columna {{< ui >}}Custom mute{{< /ui >}} muestra {{< ui >}}Muted{{< /ui >}} para los indicadores que su organización silenció. Para mostrar solo esos indicadores, filtre con la faceta {{< ui >}}Muted{{< /ui >}}.

La columna y la faceta reflejan solo los silenciamientos de su organización. Los indicadores silenciados solo por Datadog no aparecen como silenciados en esta columna o faceta. Para ver todos los silenciamientos, use la página [Muted Indicators](#review-muted-indicators).

### Visualizar el historial de silenciamientos {#view-mute-history}

La pestaña {{< ui >}}Conversation{{< /ui >}} del panel lateral de un indicador lista todos los eventos de silenciamiento y de reactivación, quién realizó cada acción y cuándo. Estos eventos aparecen junto a los comentarios y los cambios de triaje del indicador.

## Dejar de silenciar indicadores {#unmute-indicators}

Puede dejar de silenciar los indicadores que su organización silenció. Los silenciamientos gestionados por Datadog son de solo lectura.

Para dejar de silenciar indicadores, realice una de las siguientes acciones:

- En el [IOC Explorer][5], abra el panel lateral del indicador y haga clic en {{< ui >}}Un-mute This IoC{{< /ui >}}.
- En la [página Muted Indicators][6], haga clic en {{< ui >}}Un-mute{{< /ui >}} en la fila del indicador.
- En la página Muted Indicators, seleccione hasta 100 indicadores y haga clic en {{< ui >}}Un-mute{{< /ui >}}.

Si Datadog también silencia el indicador, dejar de silenciarlo solo elimina el silenciamiento aplicado por su organización. El indicador permanece clasificado como `benign`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/triage_and_investigate/ioc_explorer/
[2]: /es/security/threat_intelligence/#threat-intelligence-intents
[3]: /es/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[4]: /es/account_management/rbac/permissions/#cloud-security-platform
[5]: https://app.datadoghq.com/security/siem/ioc-explorer
[6]: https://app.datadoghq.com/security/configuration/siem/muted-indicators