---
aliases:
- /es/security/cloud_siem/detection_rules/attack_map
- /es/security/cloud_siem/detection_rules/mitre_attack_map
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: Documentación
  text: Crear reglas de detección personalizadas
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifique brechas para fortalecer la cobertura de detección con Datadog
    Cloud SIEM MITRE ATT&CK Map
title: Mapa de MITRE ATT&CK
---
## Descripción general {#overview}

<div class="alert alert-danger">El Mapa de MITRE ATT&CK solo cubre <a href="https://attack.mitre.org/matrices/enterprise/">MITRE ATT&CK Enterprise.</a></div>

El marco de trabajo MITRE ATT&CK es una base de conocimientos utilizada para desarrollar modelos y metodologías de amenazas específicas. Utilice el Mapa de MITRE ATT&CK de Cloud SIEM para explorar y visualizar el marco de trabajo MITRE ATT&CK frente a las reglas listas para usar de Datadog y sus reglas de detección personalizadas. El Mapa de MITRE ATT&CK muestra la densidad de las reglas de detección como un mapa de calor para proporcionar visibilidad sobre las técnicas de los atacantes. Sus equipos de seguridad pueden utilizar el mapa de calor para evaluar las brechas en la cobertura que es relevante para su organización o equipo y priorizar las mejoras en sus defensas de reglas de detección.

## Visualizar reglas de detección en el Mapa de MITRE ATT&CK {#view-detection-rules-in-the-mitre-attck-map}

Para visualizar las reglas de detección frente al marco de trabajo MITRE ATT&CK:
1. Navegue a la página de [Reglas de detección][1].
1. Haga clic en el botón {{< ui >}}MITRE ATT&CK Map{{< /ui >}} ubicado junto a {{< ui >}}Rules List{{< /ui >}}.
1. Active el botón de cambio de tamaño en la parte inferior izquierda de la página para alternar entre una vista expandida y una vista condensada.

La vista predeterminada del mapa muestra todas las reglas personalizadas y listas para usar de Datadog para fuentes activas, desglosadas en diferentes técnicas de ataque. Las fuentes activas son las fuentes de registros encontrados y analizados en el índice de Cloud SIEM.

**Nota**: Para [Cloud SIEM Legacy][5], todos los registros ingeridos son analizados por Cloud SIEM a menos que se hayan configurado [Security Filters][2].

Para visualizar el mapa de todas las fuentes, en el menú desplegable {{< ui >}}Visualize{{< /ui >}}, seleccione {{< ui >}}All Sources{{< /ui >}}. Esto muestra todas las reglas listas para usar, incluidas aquellas que no se utilizan actualmente para detectar amenazas de sus registros.

Haga clic en los botones de densidad de reglas para visualizar el mapa para un número específico de reglas. Por ejemplo, si hace clic en {{< ui >}}High 7+{{< /ui >}}, solo se muestran en el mapa los mosaicos que tienen más de siete reglas habilitadas.

### Ver la información de una técnica de ataque y las reglas relacionadas {#view-an-attacker-techniques-information-and-related-rules}

Para ver más información sobre una técnica y las reglas que monitorean la técnica:

1. En la página [MITRE ATT&CK Map][3], haga clic en un mosaico de técnica.
1. Haga clic en {{< ui >}}Create Custom Rule{{< /ui >}} si desea crear una regla personalizada para esta técnica. Consulte [Crear una regla personalizada][4] para obtener más información sobre cómo crear reglas personalizadas. **Nota**: Para que la regla personalizada se muestre dentro de las fuentes activas, se debe definir la etiqueta de fuente adecuada en la regla de detección.
1. En la sección {{< ui >}}Rules monitoring this Technique{{< /ui >}}, puede:
	1. Ingrese una consulta de búsqueda para filtrar reglas específicas.
  1. Ordene por fecha de creación, tipo de regla, nombre de regla, fuente o mayor gravedad.
  1. Active {{< ui >}}Show deprecated rules{{< /ui >}} para ver las reglas obsoletas para esta técnica.

### Agregue etiquetas de técnica y táctica de atacante a las reglas personalizadas {#add-attacker-technique-and-tactic-tags-to-custom-rules}

Las reglas personalizadas solo aparecen en el mapa si están etiquetadas en el editor de reglas tanto con la táctica como con la técnica de MITRE correctas. La táctica y la técnica también deben estar emparejadas correctamente. Si no se utiliza el formato y el emparejamiento correctos, la regla no aparece en el mapa cuando utiliza la barra de búsqueda para filtrar esa regla.

Este es un ejemplo del formato que necesita usar para etiquetar reglas personalizadas y el emparejamiento correcto de las etiquetas de táctica y técnica:

- `tactic:<tactic number>-<tactic name>`
    - Por ejemplo: `tactic:TA0001-Initial-Access`
- `technique:<technique number>-<technique name>`
    - Por ejemplo: `technique:T1566-Phishing`

Tenga en cuenta los siguientes detalles de formato:
- El prefijo de la etiqueta (`tactic` o `technique`) **debe estar en minúsculas**
- El número de técnica no distingue entre mayúsculas y minúsculas
    - Por ejemplo: `TA0001` o `ta0001`
- Los guiones y los guiones bajos son intercambiables
    - Por ejemplo: `technique:T1566-Phishing` o `technique:T1566_Phishing`

**Nota**: La táctica y la técnica deben basarse en la versión de MITRE ATT&CK indicada en la página [MITRE ATT&CK Map][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules
[2]: /es/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/
[3]: https://app.datadoghq.com/security/siem/rules?query=product=siem&sort=date&viz=attck-map
[4]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
[5]: /es/security/cloud_siem/guide/determine-cloud-siem-product/