---
aliases:
- /es/security/cloud_siem/open_cybersecurity_schema_framework
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Canalizaciones de procesamiento de registros
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: Blog
  text: Normalice cualquier registro para Cloud SIEM con el procesador OCSF de Datadog
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsando la innovación en las operaciones de seguridad'
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalice sus datos con el Modelo de Datos Común OCSF en Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-claude-compliance-api-integration/
  tag: Blog
  text: Haga un seguimiento de la actividad de Claude Enterprise con Datadog Cloud
    SIEM
title: Modelo de Datos Común del Open Cybersecurity Schema Framework (OCSF) en Datadog
---
## Descripción general {#overview}

Cloud SIEM recopila y analiza datos de una amplia gama de fuentes, como servicios en la nube, firewalls, redes, aplicaciones y sistemas de TI. Dado que estos servicios emiten datos en diferentes formatos, a menudo se requiere un esfuerzo significativo para normalizar y preparar los registros antes de que pueda ocurrir un análisis de amenazas significativo.

El Open Cybersecurity Schema Framework (OCSF) es un estándar de código abierto y neutral respecto al proveedor para organizar y clasificar datos de eventos de seguridad. Está diseñado para simplificar y unificar cómo se estructuran los registros de seguridad en todas las plataformas y productos, lo que permite una detección de amenazas consistente y una investigación más rápida.

En Datadog, el soporte para OCSF está integrado directamente en Datadog Cloud SIEM para que obtenga datos de registro normalizados y estandarizados sin configuración manual. Los registros de seguridad entrantes se enriquecen automáticamente con atributos compatibles con OCSF en el momento de la ingesta a través de canalizaciones listas para usar (OOTB). Todos los valores de OCSF están contenidos en el atributo `OCSF` y se suman a los otros procesos que transforman y enriquecen los registros. Consulte [Canalizaciones OCSF listas para usar compatibles](#supported-out-of-the-box-ocsf-pipelines) para ver la lista de integraciones de Log Management que admiten OCSF. 

La integración de OCSF en Cloud SIEM de Datadog permite:

* **Reglas de detección simplificadas**: una estructura de atributos unificada significa que la lógica de detección se puede escribir una vez y aplicar en múltiples fuentes.
* **Investigaciones optimizadas**: los analistas ya no necesitan recordar formatos específicos de la fuente porque un esquema permite una clasificación de consulta única entre proveedores.
* **Correlación entre fuentes**: La lógica de detección puede correlacionar eventos entre servicios dispares (por ejemplo, phishing y escalada de privilegios).
* **Mantenimiento de integración escalable**: OCSF permite expectativas de esquema consistentes, incluso a medida que se agregan nuevas fuentes de datos.

## Modelo OCSF {#ocsf-model}

Para normalizar sus datos de seguridad, OCSF reasigna sus datos basándose en los siguientes componentes:

1. [Tipos de datos, atributos, objetos y arreglos](#data-types-attributes-objects-and-arrays)
1. [Clases y categorías de eventos](#event-categories-and-classes)
1. [Perfiles](#profiles)
1. [Extensiones](#extensions)

### Tipos de datos, atributos, objetos y arreglos {#data-types-attributes-objects-and-arrays}

Los tipos de datos, atributos, objetos y arreglos son los componentes principales del modelo OCSF.

| Nombre | Descripción |
| ---- | ----------- |
| Tipos de datos | Los tipos de datos definen los elementos de datos como enteros, cadenas, números de punto flotante y valores booleanos.  |
| Atributos | Los atributos son los bloques de construcción del marco de trabajo. Se utilizan para proporcionar el lenguaje común para sus datos, independientemente de la fuente. Consulte el [diccionario de atributos][1] para obtener una lista de todos los atributos.  |
| Objetos | Los objetos son colecciones de atributos relacionados que representan las entidades, tales como un proceso, dispositivo, usuario, malware o archivo.  |
| Arreglos | Los arreglos admiten cualquiera de los tipos de datos, incluidos los tipos complejos.  |

### Categorías y clases de eventos {#event-categories-and-classes}

Los eventos de seguridad dentro del modelo OCSF se organizan en categorías, que son agrupaciones de alto nivel que clasifican los eventos según su tipo de datos. Consulte [Categorías OCSF][2] para obtener más información y una lista de las categorías disponibles. Las categorías se dividen a su vez en clases de eventos. Por ejemplo, existen [seis clases][3] para la categoría de Gestión de identidad y acceso. Consulte [Clases de eventos OCSF][4] para obtener más información.

### Perfiles {#profiles}

Los perfiles son una clase de atributos que puede superponer opcionalmente a las clases de eventos y a los objetos que hacen referencia a ellos. Añaden información adicional a una clase de evento existente y son independientes de las categorías de eventos. Consulte [Perfiles OCSF][5] para obtener una lista de perfiles y la [documentación de Perfiles OCSF][6] para obtener más información.

### Extensiones {#extensions}

Puede añadir opcionalmente extensiones, como nuevos atributos, objetos, categorías, perfiles y clases de eventos, a los esquemas de OCSF. Consulte [Extensiones OCSF][7] para obtener más información.

## Canalizaciones OCSF compatibles listas para usar {#supported-out-of-the-box-ocsf-pipelines}

Las siguientes integraciones de Log Management admiten canalizaciones OCSF listas para usar:

{{% cloud-siem-supported-ocsf %}}

## Ver pipelines de seguridad - OCSF {#view-security-pipelines-ocsf}

Cloud SIEM OCSF reasigna los datos de registro en las [canalizaciones de integración][8] de Log Management. Consulte [Canalizaciones OCSF compatibles listas para usar](#supported-out-of-the-box-ocsf-pipelines) para obtener más detalles.

Para ver la Biblioteca de canalizaciones de integración de una fuente:

1. Navegue a [Logs Pipelines][9].
1. Haga clic en {{< ui >}}Browse Pipeline Library{{< /ui >}}.
1. Busque y haga clic en la integración que le interesa (por ejemplo, Okta).
1. Para ver las canalizaciones OCSF para Okta, desplácese hasta el final de la lista de procesadores para la integración de Okta.

Para ver la canalización OCSF de solo lectura para una integración de fuente:
1. Navegue a [Logs Pipelines][9].
1. Seleccione su canalización.
1. Desplácese hasta las canalizaciones OCSF al final de los procesadores de la canalización.
1. Haga clic en la canalización OCSF para ver los procesadores de reasignación asociados.
1. Haga clic en el icono de ojo en la canalización OCSF para ver información como la siguiente:
    - Versión del esquema OCSF
    - Clase
    - Perfil

**Nota**: Clonar la canalización principal convierte las canalizaciones OCSF en canalizaciones de registro en lugar de Security pipelines.

## Ver datos OCSF en registros {#view-ocsf-data-in-logs}

Para ver datos OCSF en registros:
1. Navegue a [Logs Explorer][10].
1. Ingrese una búsqueda para sus registros.
1. Haga clic en un registro.
1. En el panel lateral, desplácese hacia abajo hasta los atributos JSON `ocsf` para ver los datos de OCSF.

## Lecturas adicionales {#further-reading}

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