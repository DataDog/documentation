---
aliases:
- /es/security/cloud_siem/open_cybersecurity_schema_framework
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normaliza tus datos con el Modelo de datos comunes del OCSF  en Cloud SIEM
    de Datadog
title: Modelo de datos comunes del Open Cybersecurity Schema Framework (OCSF) en Datadog
---

## Información general

Cloud SIEM recopila y analiza datos de una amplia gama de fuentes, como servicios en la nube, cortafuegos, redes, aplicaciones y sistemas TI. Dado que estos servicios emiten datos en diferentes formatos, a menudo se requiere un esfuerzo considerable para normalizar y preparar los logs antes de poder realizar un análisis significativo de las amenazas.

El Open Cybersecurity Schema Framework (OCSF) es un estándar de código abierto e independiente del proveedor para organizar y clasificar los datos de eventos de seguridad. Está diseñado para simplificar y unificar la forma en que se estructuran los logs de seguridad en todas las plataformas y productos, lo que permite una detección de amenazas continua y una investigación más rápida.

En Datadog, la compatibilidad con OCSF se integra directamente en Datadog Cloud SIEM para que puedas obtener datos de logs estandarizados y normalizados sin necesidad de configuración manual. Los logs de seguridad entrantes se enriquecen automáticamente con atributos compatibles con OCSF en el momento de la ingesta a través de pipelines predefinidos. Todos los valores de OCSF están contenidos en el atributo exclusivo `OCSF` y se suman a los demás procesos que transforman y enriquecen los logs. Consulta [Pipelines OCSF compatibles predefinidos](#supported-out-of-the-box-ocsf-pipelines) para ver una lista de integraciones de Log Management compatibles con OCSF. 

La integración de OCSF en Cloud SIEM de Datadog permite:

* **Reglas de detección simplificadas**: Una estructura de atributos unificada significa que la lógica de detección puede escribirse una vez y aplicarse a múltiples fuentes.
* **Investigaciones simplificadas**: Los analistas ya no tienen que recordar los formatos específicos de fuente, ya que un solo esquema permite realizar una única consulta a todos los proveedores.
* **Correlación de fuentes cruzadas**: La lógica de detección puede correlacionar eventos a través de servicios dispares (por ejemplo, phishing y escalada de privilegios).
* **Mantenimiento escalable de la integración**: OCSF permite expectativas de esquema continuas, incluso cuando se añaden nuevas fuentes de datos.

## Modelo OCSF

Para normalizar tus datos de seguridad, OCSF reasigna tus datos basándose en los siguientes componentes:

1. [Tipos de datos, atributos, objetos y matrices](#data-types-attributes-objects-and-arrays)
1. [Clases y categorías de eventos](#event-categories-and-classes)
1. [Perfiles](#perfiles)
1. [Extensiones](#extensions)

### Tipos de datos, atributos, objetos y matrices

Tipos de datos, atributos, objetos y matrices son los principales componentes del modelo OCSF.

| Nombre | Descripción |
| ---- | ----------- |
| Tipos de datos | Los tipos de datos definen elementos de datos como enteros, cadenas, números con coma flotante y valores booleanos.  |
| Atributos | Los atributos son los componentes básicos del marco de trabajo. Se utilizan para proporcionar el lenguaje común de tus datos, independientemente de la fuente. Consulta el [diccionario de atributos][1] para obtener una lista de todos los atributos.  |
| Objetos | Los objetos son colecciones de atributos relacionados que representan las entidades, como un proceso, dispositivo, usuario, malware o archivo.  |
| Matrices | Las matrices admiten cualquiera de los tipos de datos, incluidos los tipos complejos.  |

### Categorías y clases de actos

Los eventos de seguridad dentro del modelo OCSF están organizados en categorías, que son agrupaciones claras que clasifican los eventos basados en su tipo de datos. Consulta [Categorías OCSF][2] para obtener más información y ver una lista de categorías disponibles. Las categorías se dividen a su vez en clases de eventos. Por ejemplo, hay [seis clases][3] para la categoría Identity & Access Management. Consulta [Clases de Eventos OCSF][4] para obtener más información.

### Perfiles

Los perfiles son una clase de atributos que se pueden superponer opcionalmente a las clases de eventos y a los objetos que hacen referencia a ellos. Añaden información adicional a una clase de evento existente y son independientes de las categorías de eventos. Consulta [Perfiles OCSF][5] para ver una lista de perfiles y la documentación [Perfiles OCSF][6] para obtener más información.

### Extensiones

Opcionalmente puedes añadir extensiones, como nuevos atributos, objetos, categorías, perfiles y clases de eventos, a los esquemas OCSF. Consulta [Extensiones OCSF][7] para obtener más información.

## Pipelines OCSF predefinidos compatibles

Las siguientes integraciones de Log Management son compatibles con los pipelines OCSF predefinidos:

{{% cloud-siem-supported-ocsf %}}

## Consulta Pipelines seguridad \- OCSF

Cloud SIEM OCSF reasigna datos de logs en [pipelines de integración][8] de Log Management. Consulta [Pipelines OCSF predefinidos compatibles](#supported-out-of-the-box-ocsf-pipelines) para obtener más detalles.

Para ver la biblioteca de pipelines de integración de una fuente:

1. Ve a [Pipelines de logs][9]. 
1. Haz clic en **Browse Pipeline Library** (Buscar en la biblioteca de pipelines).
1. Busca la integración que te interesa (por ejemplo, Okta) y haz clic en ella.
1. Para ver los pipelines OCSF de Okta, desplázate hasta el final de la lista de procesadores para ver la integración Okta.

Para ver el pipeline OCSF de solo lectura de una integración fuente:
1. Ve a [Pipelines de logs][9]. 
1. Selecciona tu pipeline.
1. Desplázate hasta los pipelines OCSF al final de los procesadores del pipeline.
1. Haz clic en el pipeline OCSF para ver los procesadores de reasignación asociados.
1. Haz clic en el icono del ojo en el pipeline OCSF para ver información como la siguiente:
    - Versión del esquema OCSF
    - Clase
    - Perfil

**Nota**: La clonación del pipeline principal convierte los pipelines OCSF en pipelines de logs, en lugar de pipelines de seguridad.

## Ver datos de OCSF en logs

Para ver los datos de OCSF en logs:
1. Ve al [Explorador de logs][10].
1. Introduce una búsqueda para tus logs.
1. Haz clic en un log.
1. En el panel lateral, desplázate hasta los atributos \`ocsf\` JSON para ver datos de OCSF.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/ocsf/ocsf-schema/blob/4a8ad2fa4a1908f1cad2cbf331a1b49efd5001c2/dictionary.json
[2]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#categories
[3]: https://schema.ocsf.io/1.4.0/categories/iam?extensions=
[4]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#event-classes
[5]: https://schema.ocsf.io/1.4.0/profiles
[6]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#profiles
[7]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#extensions
[8]: /es/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://app.datadoghq.com/logs