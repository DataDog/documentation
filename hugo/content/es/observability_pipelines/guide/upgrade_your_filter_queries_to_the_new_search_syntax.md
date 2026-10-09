---
aliases:
- /es/observability_pipelines/guide/upgrade_to_the_new_search_syntax/
description: Aprenda a actualizar las consultas de filtro de sus Observability Pipelines
  para usar la nueva sintaxis de búsqueda.
disable_toc: false
further_reading:
- link: /observability_pipelines/search_syntax/logs/
  tag: Documentación
  text: Obtenga más información sobre la sintaxis de búsqueda de Observability Pipelines
title: Actualice sus consultas de filtro a la nueva sintaxis de búsqueda
---
## Descripción general {#overview}

Las versiones 2.11 y posteriores de Worker usan una sintaxis de búsqueda actualizada. Las Pipelines actualizadas de Worker 2.10 o anteriores a la versión 2.11 o posteriores continúan usando la sintaxis antigua para las consultas existentes. Para migrar esas consultas existentes a una Pipelines creada con Worker 2.11 o posterior, complete los siguientes pasos:

- [Actualice las consultas existentes a la nueva sintaxis](#upgrade-queries-to-the-new-search-syntax)
- Revise [las novedades en la sintaxis de búsqueda actualizada](#whats-new-in-the-updated-search-syntax)

## Actualice las consultas a la nueva sintaxis de búsqueda {#upgrade-queries-to-the-new-search-syntax}

Consulte los pasos según si usted:

- [Creó la Pipelines en la interfaz de usuario](#created-the-pipeline-in-the-ui)
- [Creó la Pipelines usando la API o Terraform](#created-the-pipeline-using-the-api-or-terraform)

### Creó la Pipelines en la interfaz de usuario {#created-the-pipeline-in-the-ui}

Si creó su Pipelines en la interfaz de usuario:

1. [Actualice a Observability Pipelines Worker][1] a la versión 2.11 o posterior. Después de actualizar, la Pipelines usa automáticamente la nueva sintaxis de búsqueda.
1. Navegue a [Observability Pipelines][2]. Seleccione la Pipelines y actualice las consultas de filtro a la nueva sintaxis. Consulte la sección [Novedades en la sintaxis de búsqueda actualizada](#whats-new-in-the-updated-search-syntax) para obtener más información.
1. Implemente su Pipelines.

### Creó la Pipelines usando la API o Terraform {#created-the-pipeline-using-the-api-or-terraform}

Si su Pipelines se creó utilizando la API pública o Terraform:
- Dentro de la misma solicitud que realiza para actualizar sus consultas de Pipelines a la nueva sintaxis de búsqueda, establezca `use_legacy_search_syntax` en `false`.

<div class="alert alert-warning">Usted <b>debe</b> establecer <code>use_legacy_search_syntax</code> a <code>false</code> cuando actualice sus consultas. Si <code>use_legacy_search_syntax</code> no está poblado, se establece de forma predeterminada en <code>true</code> en el Worker.</div>

## Novedades en la sintaxis de búsqueda actualizada {#whats-new-in-the-updated-search-syntax}

La siguiente tabla enumera las diferencias entre la sintaxis de búsqueda heredada y la nueva:

| Sintaxis heredada | Sintaxis nueva                        |
| ------------- | ------------------------------- |
| Requiere el símbolo `@` para la búsqueda de atributos, excepto cuando se hace referencia a [campos reservados](#legacy-syntax-reserved-fields). | No requiere el símbolo `@` para la búsqueda de atributos. |
| Dado que `@` indica una búsqueda de atributos, las búsquedas de etiquetas no incluyen un `@`, y se comparan bajo los atributos `tags` y `ddtags`.<br><br>Las consultas de búsqueda de atributos sin un símbolo `@` se comparan con la matriz `tags` o `ddtags`.<br><br>Ejemplo de sintaxis de búsqueda de atributos: `env:prod` | La sintaxis de etiquetas debe ingresarse explícitamente.<br><br>Inspeccione sus datos con [Live capture][5] para determinar qué campos coinciden.<br><br>Ejemplo de sintaxis de búsqueda de atributos: `tags:"env:prod" OR ddtags:"env:prod"`  |
| [Los campos reservados](#legacy-syntax-reserved-fields) no requieren el símbolo `@`. | Los campos reservados no requieren el símbolo `@`. |

**Nota**: La sintaxis de búsqueda actualizada no requiere el símbolo `@` para las búsquedas de atributos. No necesita eliminar el símbolo `@` de las consultas de filtro existentes, pero Datadog recomienda que elimine el símbolo `@` de sus consultas.

Los siguientes ejemplos muestran los registros coincidentes, junto con la sintaxis heredada y la nueva sintaxis que coincide con los registros.

`{"user": \"firstname.lastname\"}`
: **Sintaxis heredada**: `@user:firstname.lastname`
: **Nueva sintaxis**: `user:firstname.lastname`
: **Diferencia**: La nueva sintaxis no requiere el símbolo `@` para la búsqueda de atributos.

`{"message": {\"log_level\": \"ERROR\"}}`
: **Sintaxis heredada**: `@message.log_level:ERROR`
: **Nueva sintaxis**: `message.log_level:ERROR`
: **Diferencia**: La nueva sintaxis no requiere el símbolo `@` para la búsqueda de atributos.

`{"status": \"INFO\"}`
: **Sintaxis heredada**: `status:INFO`
: **Nueva sintaxis**: `status:INFO`
: **Diferencia**: No hay cambios porque `status` era anteriormente un [campo reservado](#legacy-syntax-reserved-fields) que podía filtrarse sin usar el símbolo `@`. La nueva sintaxis no utiliza el símbolo `@` para las búsquedas de atributos.

`{"message": \"Hello, world\" }`<br>`{\"message: \"hello world\"}`<br>`{\"message\": \"Hello-world\"}`
: **Sintaxis heredada**: `message:"hello world"`
: **Nueva sintaxis**: `message:"hello world"`
: **Diferencia**: No hay cambios entre la sintaxis heredada y la nueva porque `message` era un campo reservado en la sintaxis de búsqueda heredada y no requería el símbolo `@`. La nueva sintaxis no utiliza el símbolo `@` para las búsquedas de atributos.

`{"message": "hEllo world"}`
: **Sintaxis heredada**: `HELLO OR hello OR Hello`
: **Nueva sintaxis**: `hello`
: **Diferencia**: Con la nueva sintaxis, la [búsqueda de texto libre][6] no distingue entre mayúsculas y minúsculas.

`{"user": "name"}`
: **Sintaxis heredada**: `@user:(name OR Name OR nAme)`
: **Nueva sintaxis**: `user:(name OR Name OR nAme)`
: **Diferencia**: Con la nueva sintaxis, la [búsqueda de atributos][4] distingue entre mayúsculas y minúsculas y el símbolo `@` no es necesario para la búsqueda de atributos.

`{"tags": ["env:prod"] }`<br>`{"ddtags": ["env:prod"] }`
: **Sintaxis heredada**: `env:prod`
: **Nueva sintaxis**: `tags:"env:prod" OR ddtags:"env:prod"`
: **Diferencia**: Con la sintaxis heredada, cuando la sintaxis no contiene el símbolo `@` y no está buscando un campo reservado, todos los términos coinciden con el campo `tags` o `ddtags`. Con la nueva sintaxis de búsqueda, no hay campos reservados, por lo que todas las búsquedas deben ingresarse explícitamente.

`{"tags": ["message.log_level:INFO"] }`<br>`{"ddtags": ["message.log_level:INFO"]}}`
: **Sintaxis heredada**: `message.log_level:INFO`
: **Nueva sintaxis**: `tags:"message.log_level:INFO" OR ddtags:"message.log_level:INFO"`
: **Diferencia**: La misma razón que la consulta anterior para la consulta `env:prod`.

`{"source": "postgres" }`<br>`{"ddsource":"postgres" }`
: **Sintaxis heredada**: `source:postgres`
: **Nueva sintaxis**: `source:postgres OR ddsource:postgres`
: **Diferencia**: Con la sintaxis heredada, la búsqueda de atributos con el campo `source` coincide con los campos `source` y `ddsource`. La nueva sintaxis ya no hace esto, por lo que debe ingresar `source` o `ddsource` explícitamente.

**Nota**: El uso de comodines para nombres de campos en la búsqueda de atributos no es compatible ni con la sintaxis heredada ni con la nueva. Por ejemplo, el siguiente uso de comodines no funciona:

- Sintaxis heredada: `*:something`
- Sintaxis nueva: `*:something`

### Campos reservados de la sintaxis heredada {#legacy-syntax-reserved-fields}

Para la sintaxis heredada, estos son los campos reservados:

* Servidor
* fuente
* status
* servicio
* traza_id
* mensaje
* timestamp
* Etiquetas

Consulte [Atributos reservados][3] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/install_the_worker/?tab=docker#upgrade-the-worker
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /es/observability_pipelines/search_syntax/logs/#attribute-search
[5]: /es/observability_pipelines/live_capture/
[6]: /es/observability_pipelines/search_syntax/logs/#free-text-search