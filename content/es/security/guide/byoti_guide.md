---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsar la innovación en las operaciones de seguridad'
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
title: Para aportar tu propia inteligencia sobre amenazas
---

Datadog Security permite enriquecer y buscar [trazas (traces)][14] con indicadores de riesgo de [inteligencia sobre amenazas][1] almacenados en las tablas de referencia de Datadog. Las [tablas de referencia][2] permiten combinar metadatos con información ya existente en Datadog.

## Almacenamiento de indicadores de peligro en tablas de referencia

La inteligencia sobre amenazas se admite en formato CSV y requiere las siguientes columnas:

**Estructura CSV**

| campo            | datos  | descripción| obligatorio | ejemplo|
|------------------|-------|----|-----|--|
| dirección_ip       | texto | La clave primaria para la tabla de referencia en el formato de notación de puntos IPv4. | verdadero | 192.0.2.1  |
| datos_adicionales  | json      | Datos adicionales para mejorar la traza. | falso | `{"ref":"hxxp://example.org"}`
| categoría         | texto  | La [categoría][7] de información sobre amenazas. Esto es utilizado por algunas reglas de detección predefinidas. | verdadero | `residential_proxy` |
| intención        | texto | La [intención][8] de la amenaza. Esto es utilizado por algunas reglas de detección.| verdadero | malicioso | |
| source           | json  | Campos que representan dónde se origina la inteligencia sobre amenazas, como tu equipo y la wiki de tu equipo. | verdadero| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



En las [Facetas de información sobre amenazas][3] se puede consultar la lista completa de categorías e intenciones admitidas.

<div class="alert alert-info">JSON en un CSV requiere comillas dobles. A continuación, se muestra un ejemplo de CSV.</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

## Cargar y activar tu propia información sobre amenazas

Datadog admite la creación de tablas de referencia mediante una carga manual o recuperando periódicamente los datos de [Amazon S3, Azure Storage o Google Cloud Storage][10].

<div class="alert alert-info">
<p>**Notas de uso</p>
<ul>
<li>Si una clave primaria está duplicada, se omite y se muestra un mensaje de error sobre la clave.</li>
<li>Las señales no se enriquecen. El enriquecimiento solo se aplica a las trazas.</li>
<li>Datadog no enriquece las IP locales o privadas.</li>
<li>Solo se enriquecen las trazas nuevas (después de activar o actualizar la tabla de referencia). Las trazas antiguas no se enriquecen retroactivamente.</li>
<li>El enriquecimiento se produce para las trazas que coinciden con las IP (admitidas en SIEM y App and API Protection) y los dominios (admitidos en SIEM) en la tabla de referencia.</li>
<li>Las cargas manuales de archivos no se actualizan automáticamente. Las actualizaciones solo se producen desde el almacenamiento en la nube.</li>
</ul>
</div>

En una nueva página de [tabla de referencias][4]:

1. Asigna un nombre a la tabla. Se hace referencia al nombre de la tabla en la configuración de **Información de amenazas** de AAP.
2. Carga un CSV local o importa un CSV desde un bucket de almacenamiento en la nube. El archivo se normaliza y valida.
3. Previsualiza el esquema de la tabla y elige la dirección IP como clave primaria.

   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="Nueva tabla de referencia" style="width:100%;" >}}
4. Guarda la tabla.
5. En [Información sobre amenazas][5], localiza la nueva tabla y, a continuación, selecciona el conmutador para activarla. 

   <!-- {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="Enabled reference table" style="width:100%;" >}} -->

### Uso del almacenamiento en la nube

Cuando la tabla de referencia se crea desde el almacenamiento en la nube, se actualiza periódicamente. Toda la tabla se *sustituye*. Los datos no se fusionan.

Consulta la documentación de la tabla de referencia relacionada para:
- [Amazon S3][11]
- [Azure Storage][12]
- [Google Cloud Storage][13]

### Solucionar problemas importación a la nube

Si las tablas de referencia no se actualizan, selecciona el enlace **Ver eventos de cambios** en la configuración de la página de detalles de la tabla de referencia. 

La opción **Ver eventos de cambios** abre una página en **Gestión de eventos** que muestra posibles eventos de error de ingestión. También puedes filtrar en **Gestión de eventos**, utilizando el nombre de la tabla de referencia.

<div class="alert alert-info">En Datadog Event Management, puede parecer que los datos se obtienen de la nube, pero puede llevar unos minutos más propagar esos cambios a Threat Intellegence.</div>

Otros detalles útiles sobre la importación a la nube que debes recordar:

- La latencia esperada antes de que los enriquecimientos actualizados estén disponibles cuando se carga o actualiza una fuente es de 10 a 30 minutos.
- Cómo saber cuándo se aplican las actualizaciones: Los cambios son visibles en la tabla de referencia o en tramos (spans). Selecciona el enlace **Ver eventos de cambios** en la página de detalles de la tabla de referencia para ver los eventos asociados.
- La actualización sustituye la *tabla completa* por los nuevos datos. 
- En caso de clave primaria duplicada, las filas con la clave duplicada no se escriben y se muestra un error en la página de detalles de la tabla de referencia.

## Filtra trazas uniendo la lista con una tabla de referencia

Puedes filtrar trazas de AAP en Datadog uniendo una tabla de traza con una Tabla de referencia.

Para unir una Tabla de referencia con una consulta de traza, se combinan filas de la tabla de trazas de Datadog y una Tabla de referencia basándose en una columna relacionada entre ellas. La consulta de trazas devuelve solo aquellas trazas en las que hay una coincidencia en ambas tablas.

El uso de una unión con una tabla de referencia permite evaluar el impacto antes de la mejora mediante la búsqueda de coincidencias históricas con trazas existentes.

Puedes utilizar cualquier campo, no solo direcciones IP. Por ejemplo, al asociar las trazas de seguridad con URL específicas de una tabla de referencia, puedes identificar qué partes de tu aplicación son blanco de ataques. Esto puede ayudar a señalar vulnerabilidades o áreas de alto riesgo dentro de la aplicación.

Ejemplos:

- Investigación y respuesta a incidencias. Puedes cargar y unirte utilizando IPs u otros campos de ataques y ver el tráfico relacionado con esa incidencia.
- Al utilizar las trazas de seguridad con las direcciones IP de una tabla de referencia, como la asociación de direcciones IP con localizaciones geográficas o detalles organizativos, los equipos de seguridad pueden obtener un mejor contexto en torno a los intentos de ataque. Esto puede ayudar a comprender el origen y la posible motivación de los ataques.


Para unir una traza con una Tabla de referencia:

1. Carga la tabla de referencia que deseas utilizar tal y como se describe en [Cargar y habilitar tu propia información sobre amenazas](#uploading-and-enabling-your-own-threat-intel).
2. Para unir una traza con una Tabla de referencia, en [trazas][9], selecciona **Add** (Añadir), y luego selecciona **Join with Reference Table** (Unir con la Tabla de referencia).
3. En **Inner join with reference table** (Unión interna con la tabla de referencia), selecciona la Tabla de referencia a utilizar.
4. En **where field** (campo where), selecciona el campo de trazas de Datadog que deseas utilizar para la unión.
5. En **column** (columna), selecciona el campo Tabla de referencia que se utilizará para la unión.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="Your image description" style="width:100%;" >}} -->

## Mejora de trazas para las reglas de detección

Mejorar las trazas incluye los atributos de información sobre amenazas en trazas de AAP cuando el indicador de amenaza coincide con el valor de la clave `http.client_ip` en la traza de AAP. Esto permite buscar trazas con coincidencias de información de amenazas utilizando las facetas existentes y la información de amenazas con reglas de detección.

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