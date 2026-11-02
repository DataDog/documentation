---
description: Cloud SIEM está disponible en Standalone, Add-on with Flex Logs y Legacy.
  Siga esta guía para determinar qué producto está utilizando su organización y compare
  las funciones disponibles en cada uno.
title: Determine el producto de Cloud SIEM que está utilizando su organización
---
## Descripción general {#overview}
Cloud SIEM está disponible como los siguientes productos:
- Standalone
  - 12 meses (365 días, uso medido en GB)
  - 15 meses (450 días, uso medido en millones de eventos)
  <div class="alert alert-info">Las organizaciones que adoptaron Standalone antes de que se introdujera la retención de 12 meses tienen un período de retención de 15 meses. La documentación se refiere a ambos como Standalone, porque proporcionan las mismas funciones.</div>
- Add-on with Flex Logs
- Legacy

Standalone 12 months es el producto predeterminado para las nuevas organizaciones de Cloud SIEM. En Standalone:
- El uso se mide en gigabytes de registros analizados, en lugar de en millones de eventos analizados.
- La ingesta de registros indexados en el índice de Cloud SIEM se incluye en el costo de registros analizados, en lugar de facturarse por separado.
- Los datos se retienen durante 365 días (12 meses), en lugar de 15 meses.

Hay dos formas de ver qué producto de Cloud SIEM está utilizando su organización:
- [Consulte la página de Plan y uso](#plan-usage)
- [Consulte la página de configuración de Cloud SIEM](#settings)

Para comparar lo que incluye cada producto, consulte [Funciones por producto de Cloud SIEM](#features).

## Consulte la página de Plan y uso{#plan-usage}

<div class="alert alert-info">Es posible que no pueda usar esta opción si:
  <ul>
    <li>No tiene acceso a esta página</li>
    <li>Su organización tiene configurada la organización múltiple; la página de Plan y uso es un resumen de todas las suborganizaciones, por lo que es posible que vea varios mosaicos de productos de Cloud SIEM</li>
  </ul>
  En cualquier caso, siga las instrucciones en la sección <a href="#settings">Consulte la página de configuración de Cloud SIEM</a> para determinar qué producto está utilizando su organización.
</div>

1. En Datadog, vaya a la página {{< ui >}}Plan & Usage{{< /ui >}} > [**Usage & Cost**][1].
1. Desplácese a la sección **Usage Summary** y haga clic en la pestaña {{< ui >}}Security{{< /ui >}}.
1. Busque el Tile que indica qué producto de Cloud SIEM está utilizando su organización:
   <table>
     <thead>
       <tr>
         <th style="width:60%">Tile</th>
         <th style="width:40%">Product</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Registros analizados e indexados de Security</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="Mosaico etiquetado como 'Security Analyzed and Indexed Logs', además de una cantidad de uso e indicación de si ese uso fue bajo demanda" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="Mosaico etiquetado como 'Cloud SIEM - Analyzed Logs (Add-On)', además de una cantidad de uso e indicación de si ese uso fue bajo demanda" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="Mosaico etiquetado como 'SIEM - Analyzed Logs', además de una cantidad de uso e indicación de si ese uso fue bajo demanda" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## Consulte la página de configuración de Cloud SIEM{#settings}

En Datadog, vaya a la página de [Cloud SIEM settings][2]. La página muestra una sección {{< ui >}}Core Configuration{{< /ui >}} o {{< ui >}}Settings{{< /ui >}}, lo que indica el producto de Cloud SIEM que utiliza su organización.
<table>
  <thead>
    <tr>
      <th style="width:80%">Settings section</th>
      <th style="width:20%">Product</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      Sección <td><strong>Core Configuration</strong> con <strong>Index Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="La configuración incluye un encabezado de Core Configuration, que contiene una sección de Index Configuration." width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="La configuración incluye un encabezado de Core Configuration, que contiene una sección de Security Filters Configuration." width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="Configuración que incluye una tabla de Sources" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>

## Funciones por producto de Cloud SIEM{#features}

La siguiente tabla enumera las funciones de Cloud SIEM disponibles en cada producto.

| Feature | Standalone | Add-on with Flex Logs | Legacy |
|---------|:----------:|:---------------------:|:------:|
| [Content Packs][4] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Edición de reglas de detección predeterminadas][5] | {{< X >}} | {{< X >}} | {{< X >}} |
| [MITRE ATT&CK Map][6] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Security Filters][7] | | {{< X >}} | {{< X >}} |
| [Log index filters][8] | {{< X >}} | | |
| [MITRE ATT&CK Map compact view][6] | {{< X >}} | {{< X >}} | |
| [Scheduled rules][9] | {{< X >}} | {{< X >}} | |
| [Sequence detections][10] | {{< X >}} | {{< X >}} | |
| [Historical jobs][11] | {{< X >}} | {{< X >}} | |
| [Risk Insights][12] | {{< X >}} | {{< X >}} | |
| [Dynamic Severity][13] | {{< X >}} | {{< X >}} | |
| [Open Cybersecurity Schema Framework (OCSF)][14] | {{< X >}} | {{< X >}} | |
| [Threat intelligence][15] | {{< X >}} | {{< X >}} | |

Para obtener ayuda para identificar su producto, o para usar una función que su producto no incluye, comuníquese con su equipo de cuenta de Datadog o [Datadog support][3].

[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
[3]: /es/help/
[4]: /es/security/cloud_siem/ingest_and_enrich/content_packs/
[5]: /es/security/detection_rules/
[6]: /es/security/cloud_siem/detect_and_monitor/mitre_attack_map/
[7]: /es/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#how-security-filters-work
[8]: /es/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#cloud-siem-standalone-filter-the-cloud-siem-index
[9]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[10]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[11]: /es/security/cloud_siem/detect_and_monitor/historical_jobs/
[12]: /es/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[13]: /es/security/cloud_siem/detect_and_monitor/dynamic_severity/
[14]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[15]: /es/security/cloud_siem/ingest_and_enrich/threat_intelligence/