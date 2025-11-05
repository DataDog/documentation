---
aliases:
- /es/dynamic_instrumentation/symdb
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Más información sobre Dynamic Instrumentation
is_beta: true
private: false
site_support_id: autocomplete_search
title: Autocompletar y buscar
---

{{< beta-callout url="#" btn_hidden="true" >}}
Autocompletar y buscar están en Vista previa para Python y .NET.
{{< /beta-callout >}}

## Información general

La función Autocompletar y buscar mejora la experiencia de usuario de [Dynamic Instrumentation][1] añadiendo funciones similares a las de IDE, como buscar y autocompletar clases y métodos para el [Lenguaje de expresión de Dynamic Instrumentation][5].

Para el autocompletado y la búsqueda, los símbolos y metadatos no sensibles se cargan desde tu aplicación a Datadog. Los datos cargados incluyen los nombres de clases, los métodos, los argumentos, los campos y las variables locales, junto con los metadatos relacionados, como los números de línea.

## Empezando

### Requisitos previos

La función Autocompletar y buscar requiere lo siguiente:

- [Dynamic Instrumentation][1] está activado para tu servicio.
- [Datadog Agent][2] v7.49.0 o superior instalado junto a tu servicio.
- [Configuración remota][3] activada en el Agent.
- Las etiquetas (tags) `service` , `env` y `version` del [Etiquetado unificado de servicios][4] se aplican a tu despliegue.

### Habilitar la función Autocompletar y buscar para tu servicio

Selecciona tu tiempo de ejecución a continuación:

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## Explorar la función Autocompletar y buscar

Con la función Autocompletar y buscar se mejora la experiencia de usuario de Dynamic Instrumentation para que se comporte más como un IDE.

Dynamic Instrumentation proporciona la búsqueda de nombres de clases y métodos:
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="Buscar métodos al crear una sonda de log de Dynamic Instrumentation" style="width:60%;" >}}

Al seleccionar un método en la configuración de Dynamic Instrumentation, se muestra el código del método:
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Autocompletar y buscar resalta el método seleccionado" >}}

Dynamic Instrumentation también proporciona el autocompletado de las plantillas de logs y otras plantillas que utilizan el [Lenguaje de expresión de Dynamic Instrumentation][5]:
{{< img src="dynamic_instrumentation/symdb_completion.png" alt="Sugerencias de autocompletado de plantillas de logs" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dynamic_instrumentation/
[2]: /es/agent/
[3]: /es/agent/remote_config/
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/dynamic_instrumentation/expression-language
