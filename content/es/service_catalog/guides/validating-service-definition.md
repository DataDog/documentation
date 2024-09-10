---
aliases:
- /es/tracing/service_catalog/guides/validating-service-definition
further_reading:
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios de Datadog
- link: /api/latest/service-definition/
  tag: Documentación
  text: API de Definición de servicios
- link: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
  tag: Código fuente
  text: Esquema de definición de servicios
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gestiona las entradas del Catálogo de servicios con el esquema JSON de la
    definición de servicios
title: Validación de los YAMLs de definición de servicios
---

## Información general

El Catálogo de servicios utiliza esquemas de definición de servicios para almacenar y mostrar metadatos sobre tus servicios. Estos esquemas siguen la especificación del esquema JSON, por lo que puedes validar tus metadatos a medida que los editas. Esta validación es importante, ya que un error en un archivo de definición de servicio podría provocar la creación de un archivo de servicio 
con datos no válidos, o podría introducir un error en los metadatos de un servicio existente.

Para evitarlo, existen dos formas de validar los archivos de definición de servicio:

## Crear la definición de servicio dentro de la aplicación

Para validar tu archivo de definición de servicio en la aplicación:

1. Navega a la [página Service Catalog Setup & Config][1] (Configuración y ajustes del Catálogo de servicios).
2. Haz clic en **Create a New Entry** (Crear una nueva entrada).
3. Selecciona la pestaña **Code** (Código).
4. Pega el contenido del esquema.

Los mecanismos de validación integrados evitan que envíes metadatos incorrectos al Catálogo de servicios.

{{< img src="tracing/service_catalog/service_catalog_definition_yaml.png" alt="Editor de metadatos del servicio que muestra una definición de servicio de ejemplo." >}}

## Validar con una extensión del entorno de desarrollo integrado

El esquema de definición del servicio de Datadog está disponible en el [Almacén de esquemas JSON][2] de código abierto, donde [muchos entornos de desarrollo integrados][3] pueden recuperarlo automáticamente. 
Con él, tu entorno de desarrollo integrado valida los datos a medida que editas el archivo, siempre que el nombre del archivo sea `service.datadog.yaml`. 
Los mensajes de validación te permiten corregir los problemas antes de enviar los datos al Catálogo de servicios.

{{< img src="tracing/service_catalog/service-definition-data-validation.mp4" alt="Entorno de desarrollo integrado que muestra los mensajes de validación en tiempo real para archivos de definición de servicio." video="true" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://www.schemastore.org/
[3]: https://www.schemastore.org/json/#editors