---
title: Campos de propiedad
---

## Información general

Los campos de propiedad personalizados te permiten capturar importantes atributos exclusivos de tu organización, como modelos de producto específicos en la industria del automóvil o códigos únicos en un despliegue de software. Estos atributos te ayudan a clasificar de forma eficaz los incidentes.

## Página de información del incidente

Los campos de propiedad están organizados en tres tablas que se corresponden con el lugar donde aparecen los campos en la pestaña [Información general][1] de la página Información del incidente:

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Puedes mover cualquier campo de propiedad a una tabla diferente o reordenarlos en la misma tabla arrastrando y soltando el campo con el icono de arrastrar. Previsualiza el aspecto de tus campos de propiedad haciendo clic en el botón **Previsualizar** de la parte superior derecha.

## Campos

{{< img src="/service_management/incidents/incident_settings/settings_property_fields.png" alt="Parámetros de los campos de propiedad" style="width:100%;">}}

Los campos de propiedades son piezas clave de los metadatos con que puedes etiquetar tus incidentes. Esto facilita la búsqueda de subconjuntos específicos de incidentes en la [página de inicio][2] y la realización de consultas más sólidas en [Análisis de gestión de incidentes][3]. Hay cinco campos predeterminados:

| Campos                   | Descripción |
| ----------------------   | ----------- | 
|**Método de detección** | Añade contexto sobre cómo se declaró este incidente.||
|**Resumen**               | Proporciona detalles de lo que ocurrió y terminó causando este incidente.||
|**Causa raíz**       | Enumera posibles causas raíz o áreas de investigación.||
|**Servicios**              | Si tienes configurado [Datadog APM][4], el campo de propiedad `Services` utiliza automáticamente tus nombres de servicio APM. Para editar los valores de `Services`, carga un CSV con los valores que quieres asociar a cada campo. Tu archivo CSV debe comenzar con el nombre de tu campo en la fila superior, con los valores deseados enumerados inmediatamente debajo. | 
|**Equipos**                 | El campo de propiedad `Teams` se rellena automáticamente a partir de los [equipos][5] definidos en tu organización. | 

Puedes añadir más campos de propiedad a tu configuración seleccionando una de las [etiquetas (tags) de métricas][6] del par `key:value`. Al hacer esto, la clave de tu campo de propiedad es el caso inicial de tu clave de etiquetas de métricas (por ejemplo, la etiqueta `scope_name` se convierte en el campo `Scope Name`) y los valores del campo de propiedad son iguales a los valores informados por la etiqueta de métricas.

### Tipos de campo

Además de los cinco campos predeterminados y los campos basados en etiquetas de métricas, también puedes crear campos de propiedad personalizados y marcarlos como obligatorios al crear un incidente. Hay cinco tipos de campos personalizados que puedes crear:

**Selección única**
: Campo desplegable al que sólo se puede asignar un valor por incidente. Los valores disponibles se configuran al definir el campo.

**Selección múltiple**
: Campo desplegable que puede tener varios valores asignados por incidente. Los valores disponibles se configuran al definir el campo.

**Matriz de texto**
: Campo de forma libre que puede tener varios valores asignados por incidente. Los responsables de incidentes definen valores arbitrarios al actualizar el campo en un incidente.

**Área de texto**
: Cuadro de texto libre. Los valores son introducidos por el responsable en cada incidente.

**Número**
: Área de texto que sólo acepta dígitos y un punto. Los valores son introducidos por un responsable en cada incidente.

Los campos personalizados Selección única, Selección múltiple y Número son facetas de búsqueda en la [página principal de incidentes][2] y en [Análisis de gestión de incidentes][3] para filtrar fácilmente los incidentes. Los campos de número son medidas de Análisis de gestión de incidentes que se pueden representar gráficamente y visualizar en [dashboards][7] y [notebooks][8].

[1]: /es/service_management/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /es/service_management/incident_management/analytics
[4]: /es/tracing/
[5]: /es/account_management/teams/
[6]: /es/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /es/dashboards/
[8]: /es/notebooks/