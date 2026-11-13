---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsando la innovación en las operaciones de seguridad'
- link: logs/processing/pipelines
  tag: Documentación
  text: Canalizaciones de procesamiento de registros
site_support_id: byoti
title: Traiga su propia inteligencia de amenazas
---
Datadog Security admite el enriquecimiento y la búsqueda de [trazas][14] con indicadores de compromiso de [inteligencia de amenazas][1] almacenados en tablas de referencia de Datadog. [Reference Tables][2] le permite combinar metadatos con información que ya está en Datadog.

## Almacenamiento de indicadores de compromiso en tablas de referencia {#storing-indicators-of-compromise-in-reference-tables}

La inteligencia de amenazas es compatible con el formato CSV y requiere las siguientes columnas:

**Estructura de CSV**

| campo            | datos  | descripción| obligatorio | ejemplo|
|------------------|-------|----|-----|--|
| ip_address       | texto | La clave principal de la tabla de referencia en formato de notación decimal con puntos de IPv4. | true | 192.0.2.1  |
| additional_data  | json      | Datos adicionales para enriquecer la traza. | false | `{"ref":"hxxp://example.org"}`
| category         | texto  | La [categoría][7] de inteligencia de amenazas. Algunas reglas de detección preconfiguradas usan esto. | true | `residential_proxy` |
| intention        | texto | La [intención][8] de inteligencia de amenazas. Algunas reglas de detección preconfiguradas usan esto.| true | malicious | |
| source           | json  | Campos que representan el origen de la inteligencia de amenazas, como su equipo y la wiki de su equipo. | true| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



La lista completa de categorías e intenciones admitidas está disponible en [Facetas de inteligencia de amenazas][3].

<div class="alert alert-info">El JSON en un CSV requiere comillas dobles. El siguiente es un ejemplo de CSV.</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

## Carga y habilitación de su propia inteligencia de amenazas {#uploading-and-enabling-your-own-threat-intel}

Datadog admite la creación de tablas de referencia mediante una carga manual o recuperando periódicamente los datos de [Amazon S3, Azure storage o Google Cloud storage][10].

<div class="alert alert-info">
<p><strong>Notas de uso:</strong></p>
<ul>
<li>Si una clave principal está duplicada, se omite y se muestra un mensaje de error sobre la clave.</li>
<li>Las señales no se enriquecen. El enriquecimiento solo se aplica a las trazas.</li>
<li>Datadog no enriquece las IP locales o privadas.</li>
<li>Solo se enriquecen las trazas nuevas (después de habilitar o actualizar la tabla de referencia). Las trazas antiguas no se enriquecen de forma retroactiva.</li>
<li>El enriquecimiento se aplica a las trazas que coinciden con las IP (compatibles con SIEM y App and API Protection) y los dominios (compatibles con SIEM) de la tabla de referencia.</li>
<li>Las cargas manuales de archivos no se actualizan automáticamente. Las actualizaciones ocurren solo desde el almacenamiento en la nube.</li>
</ul>
</div>

En una nueva página de [tablas de referencia][4]:

1. Asigne un nombre a la tabla. El nombre de la tabla se referencia en la configuración de {{< ui >}}Threat Intel{{< /ui >}} de AAP.
2. Cargue un archivo CSV local o importe un CSV desde un bucket de almacenamiento en la nube. El archivo se normaliza y valida.
3. Obtenga una vista previa del esquema de la tabla y elija la dirección IP como Primary Key.
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="Nueva tabla de referencia" style="width:100%;" >}}
4. Guarde la tabla.
5. En [Threat Intel][5], localice la nueva tabla y, a continuación, seleccione el interruptor para habilitarla. 
   
   <!-- {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="Tabla de referencia habilitada" style="width:100%;" >}} -->

### Uso de almacenamiento en la nube {#using-cloud-storage}

Cuando la tabla de referencia se crea a partir del almacenamiento en la nube, se actualiza periódicamente. La tabla completa se *reemplaza*. Los datos no se combinan.

Consulte la documentación correspondiente sobre tablas de referencia para:
- [Amazon S3][11]
- [Azure storage][12]
- [Google Cloud storage][13]

### Solución de problemas de importaciones en la nube {#troubleshooting-cloud-imports}

Si las tablas de referencia no se actualizan, seleccione el enlace {{< ui >}}View Change Events{{< /ui >}} desde la configuración en la página de detalles de la tabla de referencia. 

{{< ui >}}View Change Events{{< /ui >}} abre una página en {{< ui >}}Event Management{{< /ui >}} que muestra posibles eventos de error para la ingesta. También puede filtrar en {{< ui >}}Event Management{{< /ui >}} usando el nombre de la tabla de referencia.

<div class="alert alert-info">En Datadog Event Management, puede parecer que los datos ya se obtuvieron de la nube, pero esos cambios pueden tardar unos minutos más en propagarse a Threat Intelligence.</div>

Otros detalles útiles sobre la importación en la nube que debe recordar:

- La latencia esperada antes de que los enriquecimientos actualizados estén disponibles cuando se carga o actualiza una fuente es de 10 a 30 minutos.
- Cómo saber cuándo se aplican las actualizaciones: Los cambios son visibles en la tabla de referencia o en los spans. Seleccione el enlace {{< ui >}}View Change Events{{< /ui >}} desde la configuración en la página de detalles de la tabla de referencia para ver los eventos relacionados.
- La actualización reemplaza la *tabla completa* con los nuevos datos. 
- En caso de una clave principal duplicada, las filas con la clave duplicada no se escriben y se muestra un error en la página de detalles de la tabla de referencia.

## Filtre trazas uniendo la lista con una Reference Table {#filter-traces-by-joining-the-list-with-a-reference-table}

Puede filtrar trazas de AAP en Datadog uniendo una tabla de trazas con una Reference Table. 

Para unir una Reference Table con una consulta de trazas, combine filas de la tabla de trazas de Datadog y una Reference Table según una columna relacionada entre ellas. La consulta de trazas devuelve solo aquellas trazas donde hay una coincidencia en ambas tablas.

El uso de una unión con una Reference Table le permite evaluar el impacto antes del enriquecimiento mediante la búsqueda de coincidencias históricas con trazas existentes.

Puede usar cualquier campo, no solo direcciones IP. Por ejemplo, al asociar trazas de seguridad con URL específicas de una tabla de referencia, puede identificar qué partes de su aplicación están siendo objeto de ataques. Esto puede ayudar a identificar vulnerabilidades o áreas de alto riesgo dentro de la aplicación.

Ejemplos:

- Investigación y respuesta a incidentes. Puede cargar y unir usando IP u otros campos de ataques y ver el tráfico relacionado con ese incidente.
- Al usar trazas de seguridad con las direcciones IP de una Reference Table, como asociar direcciones IP con ubicaciones geográficas o detalles organizativos, los equipos de seguridad pueden obtener un mejor contexto sobre los intentos de ataque. Esto puede ayudar a comprender el origen y la posible motivación detrás de los ataques.


Para unir una traza con una Reference Table:

1. Cargue la Reference Table que desea usar como se describe en [Carga y habilitación de su propia inteligencia de amenazas](#uploading-and-enabling-your-own-threat-intel).
2. Para unir una traza con una Reference Table, en [Traces][9], seleccione {{< ui >}}Add{{< /ui >}} y luego seleccione {{< ui >}}Join with Reference Table{{< /ui >}}.
3. En {{< ui >}}Inner join with reference table{{< /ui >}}, seleccione la Reference Table que desea utilizar.
4. En {{< ui >}}where field{{< /ui >}}, seleccione el campo de trazas de Datadog que desea utilizar para la unión.
5. En {{< ui >}}column{{< /ui >}}, seleccione el campo de Reference Table que desea utilizar para la unión.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="Descripción de su imagen" style="width:100%;" >}} -->

## Enriquecimiento de trazas para reglas de detección {#enriching-traces-for-detection-rules}

El enriquecimiento de trazas incluye los atributos de inteligencia de amenazas en las trazas de AAP cuando el indicador de compromiso coincide con el valor de la clave `http.client_ip` en la traza de AAP. Esto permite buscar trazas con coincidencias de inteligencia de amenazas utilizando facetas existentes y utilizar la inteligencia de amenazas con reglas de detección.

[1]: /es/security/threat_intelligence
[2]: /es/integrations/guide/reference-tables
[3]: /es/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/configuration/asm/rules/edit/kdb-irk-nua?product=appsec
[7]: /es/security/threat_intelligence#threat-intelligence-categories
[8]: /es/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /es/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /es/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /es/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /es/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: https://app.datadoghq.com/security/appsec/traces