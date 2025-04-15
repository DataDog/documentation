---
aliases:
- /es/security/cloud_siem/detection_rules/attack_map
disable_toc: false
further_reading:
- link: /security/cloud_siem/detection_rules/
  tag: Documentación
  text: Crear reglas de detección personalizadas
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifica lagunas para reforzar la cobertura de detección con el mapa de
    Datadog Cloud SIEM MITRE ATT&CK
title: Mapa de MITRE ATT&CK
---

## Información general

<div class="alert alert-warning">El mapa de MITRE ATT&CK sólo cubre <a href="https://attack.mitre.org/matrices/enterprise/">MTRE ATT&CK Enterprise.</a></div>

El marco de MTRE ATT&CK es una base de conocimientos utilizada para desarrollar modelos y metodologías de amenazas específicas. Utiliza el mapa de Cloud SIEM MITRE ATT&CK para explorar y visualizar el marco de MITRE ATT&CK en comparación con las reglas predefinidas de Datadog y tus reglas de detección personalizadas. El mapa de MITRE ATT&CK muestra la densidad de las reglas de detección como un mapa de calor para proporcionar visibilidad de las técnicas de ataque. Tus equipos de seguridad pueden utilizar el mapa de calor para evaluar las lagunas en la cobertura que son pertinentes para tu organización o equipo y priorizar las mejoras en sus defensas de reglas de detección.

## Ver reglas de detección en el mapa de MTRE ATT&CK

Para ver las reglas de detección según el marco de MTRE ATT&CK:
1. Ve a la página [Reglas de detección][1].
1. Haz clic en el botón **Mapa de MITRE ATT&CK** situado junto a **Lista de reglas**.

La vista predeterminada del mapa muestra todas las reglas predefinidas y personalizadas de Datadog para fuentes activas, desglosadas en diferentes técnicas de ataque. Las fuentes activas son las fuentes de logs encontradas y analizadas en el índice de Cloud SIEM.

**Nota**: Para la SKU legacy, todos los logs ingeridos se analizan con Cloud SIEM, a menos que se hayan configurado [filtros de seguridad][2].

Para ver el mapa de todas las fuentes, en el menú desplegable **Visualizar**, selecciona **Todas las fuentes**. Esto muestra todas las reglas predefinidas, incluidas las que no se utilizan actualmente para detectar amenazas de tus logs.

Haz clic en los botones de densidad de reglas para visualizar el mapa y buscar un número específico de reglas. Por ejemplo, si haces clic en **Alto \+7**, sólo se mostrarán en el mapa los íconos que tengan más de siete reglas activadas.

### Ver la información de una técnica de ataque y las reglas relacionadas

Para ver más información sobre una técnica y las reglas de monitorización de la técnica:

1. En la página [Mapa de MITRE ATT&CK][3], haz clic en un ícono de una técnica.
1. Haz clic en **Crear regla personalizada** si deseas crear una regla personalizada para esta técnica. Consulta [Reglas de detección][4] para obtener más información sobre la creación de reglas personalizadas.
1. En la sección **Reglas de monitorización de esta técnica**, puedes:
    1. Introducir una consulta de búsqueda para filtrar a reglas específicas.
  1. Ordenar por fecha de creación, tipo de regla, nombre de la regla, fuente o gravedad máxima.
  1. Alternar **Mostrar reglas obsoletas** para ver las reglas obsoletas para esta técnica.

### Añadir etiquetas (tags) de técnicas y tácticas de ataque a las reglas personalizadas

Las reglas personalizadas sólo aparecen en el mapa si están etiquetadas en el editor de reglas con la táctica y la técnica de MITRE correctas. La táctica y la técnica también deben emparejarse correctamente. Si no se utilizan el formato y el emparejamiento correctos, la regla no aparece en el mapa cuando se utiliza la barra de búsqueda para filtrar esa regla.

Este es un ejemplo del formato que debes utilizar para el etiquetado de reglas personalizadas y el emparejamiento correcto de etiquetas (tags) de táctica y técnica:

- `tactic: <tactic number>-<tactic name>`
    - Por ejemplo: `tactic:TA0001-Initial-Access`
- `technique: <technique number>-<technique name>`
    - Por ejemplo: `technique:T1566-Phishing`

**Nota**: La táctica y la técnica deben basarse en la versión de MITRE ATT&CK indicada en la página [Mapa de MITRE ATT&CK][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/rules
[2]: https://docs.datadoghq.com/es/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[3]: https://app.datadoghq.com/security/rules?query=product=siem&sort=date&viz=attck-map
[4]: https://docs.datadoghq.com/es/security/cloud_siem/detection_rules/?tab=threshold