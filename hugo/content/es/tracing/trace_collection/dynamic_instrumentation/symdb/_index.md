---
aliases:
- /es/dynamic_instrumentation/symdb
- /es/tracing/dynamic_instrumentation/symdb
description: Habilite la funcionalidad de autocompletado y búsqueda similar a la de
  un IDE para Dynamic Instrumentation a fin de mejorar la experiencia del desarrollador.
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Obtenga más información sobre Dynamic Instrumentation
is_beta: true
private: false
site_support_id: autocomplete_search
title: Autocompletado y búsqueda
---
{{< callout url="#" btn_hidden="true" >}}
El autocompletado y la búsqueda están en vista previa para Python y .NET.
{{< /callout >}}

## Descripción general {#overview}

El autocompletado y la búsqueda mejoran la experiencia del usuario de [Dynamic Instrumentation][1] al agregar funciones similares a las de un IDE, como la búsqueda de clases y métodos, y el autocompletado para [Dynamic Instrumentation Expression Language][5].

Para proporcionar autocompletado y búsqueda, los símbolos y metadatos no confidenciales se cargan desde su aplicación a Datadog. Los datos cargados incluyen los nombres de clases, métodos, argumentos, campos y variables locales, junto con metadatos relacionados, como números de línea.

## Primeros pasos {#getting-started}

### Requisitos previos {#prerequisites}

El autocompletado y la búsqueda requieren lo siguiente:

- [Dynamic Instrumentation][1] está habilitado para su servicio.
- [Datadog Agent][2] 7.49.0 o superior está instalado junto con su servicio.
- [Remote Configuration][3] está habilitado en el Agent.
- Las etiquetas de Unified Service Tagging `service`, `env` y `version` se aplican a su despliegue.

### Habilite el autocompletado y la búsqueda para su servicio {#enable-autocomplete-and-search-for-your-service}

Seleccione su entorno de ejecución a continuación:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
{{< /card-grid >}}

## Explore el autocompletado y la búsqueda {#explore-autocomplete-and-search}

El autocompletado y la búsqueda hacen que Dynamic Instrumentation se comporte más como un IDE:

- **Búsqueda de clases y métodos**: encuentre dónde agregar la instrumentación.
- **Visualización de código**: cuando selecciona un método en la configuración de Dynamic Instrumentation, Datadog muestra el código de ese método.
- **Autocompletado de expresiones**: obtenga sugerencias para plantillas de expresiones que utilizan el [Dynamic Instrumentation Expression Language][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dynamic_instrumentation/
[2]: /es/agent/
[3]: /es/tracing/guide/remote_config
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/dynamic_instrumentation/expression-language