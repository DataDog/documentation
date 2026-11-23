---
algolia:
  tags:
  - ci visibility
  - ci visibility billing
  - ci visibility billing questions
  - ci visibility pricing
  - test optimization billing
  - test optimization pricing
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Obtenga más información sobre Pipeline Visibility
- link: /continuous_integration/guides/ingestion_control
  tag: Documentación
  text: Obtenga más información sobre los controles de ingesta para CI Visibility
- link: /tests/
  tag: Documentación
  text: Aprenda sobre Test Optimization
title: Facturación de CI/CD Optimization
---
## Descripción general {#overview}

Esta guía proporciona una lista no exhaustiva de consideraciones de facturación para CI/CD Optimization, que incluye [CI Visibility][1] y [Test Optimization][7].

## Recuento de autores de commits {#counting-committers}

Un autor de commits es un colaborador activo de Git, identificado por su dirección de correo electrónico de autor de Git. Para fines de facturación, se incluye a un autor de commits si realiza al menos tres commits en un mes determinado.

## Facturación de commits realizados por bots o acciones ejecutadas en la interfaz de usuario de GitHub {#billing-for-commits-made-by-bots-or-actions-performed-in-the-github-ui}

Datadog no factura los commits realizados por bots verificados ni los generados mediante acciones ejecutadas directamente en la interfaz de usuario de GitHub. Estos se excluyen automáticamente de los cálculos de facturación. Solo los bots verificados se excluyen de la facturación.

## Exclusión de commits de personas específicas {#excluding-commits-from-specific-people}

Sí, puede excluir commits de personas específicas mediante [filtros de exclusión][2].

## Enriquecimiento de facturación {#billing-enrichment}

El enriquecimiento de facturación correlaciona sus métricas de autores de commits facturables con los datos de una [tabla de referencia][5], usando la dirección de correo electrónico del autor de commits como clave de unión. Esto agrega etiquetas como `vp_name` o `director_name` a sus datos de facturación, para que pueda desglosar los datos de facturación por estructura organizacional.

Para configurar el enriquecimiento de facturación:

1. Cree una [tabla de referencia][5] que contenga una columna con las direcciones de correo electrónico de los autores de commits, junto con cualquier columna adicional que desee exponer como etiquetas (como `vp_name`).
2. En Datadog, vaya a [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Billing & Committers{{< /ui >}}][6].
3. Active {{< ui >}}Enrich billing metrics{{< /ui >}}.
4. Seleccione el {{< ui >}}Reference table{{< /ui >}} que desea utilizar.
5. Seleccione el {{< ui >}}Email key column{{< /ui >}}: la columna de la tabla de referencia que contiene la dirección de correo electrónico del autor de commits. Datadog utiliza esta columna para unir los datos de facturación con la tabla de referencia.
6. Seleccione el {{< ui >}}Enrichment columns{{< /ui >}}: las columnas de la tabla de referencia que se expondrán como etiquetas en las métricas de facturación. Déjelo vacío para incluir todas las columnas.

Una vez configurado el enriquecimiento de facturación, las etiquetas adicionales de la tabla de referencia aparecen junto a sus métricas existentes de autores de commits facturables.

## Deduplicación de autores de commits entre direcciones de correo electrónico {#deduplicating-committers-across-email-addresses}

En algunos casos, las confirmaciones de un solo desarrollador pueden dividirse en varios correos electrónicos de autor de Git. Por ejemplo, un desarrollador podría configurar un correo electrónico diferente con `git config user.email` en diferentes repositorios. Si más de uno de esos correos electrónicos supera el umbral de facturación de tres commits descrito anteriormente, cada uno cuenta como un autor de commits distinto.

Para los repositorios alojados en GitHub, Datadog puede asignar cada correo electrónico de autor de Git al usuario de GitHub subyacente para que el desarrollador se cuente una vez, incluso cuando envíe cambios bajo diferentes correos electrónicos. Esto requiere una [GitHub App][3] de Datadog instalada en los repositorios afectados con el permiso `Contents: Read`.

Esta asignación está disponible solo para repositorios de GitHub. Los repositorios alojados en GitLab, Azure DevOps o Bitbucket no se desduplican.

Si su recuento de autores de confirmaciones parece más alto de lo esperado para los repositorios de GitHub, verifique que la aplicación de GitHub de Datadog esté instalada en esos repositorios con el permiso `Contents: Read`. Puede revisar su instalación desde el [mosaico de integración de GitHub][4].

## Conteo de spans de prueba {#counting-test-spans}

En Test Optimization, cada ejecución de prueba individual cuenta como un span de prueba, excepto los spans de prueba que generan las funciones de Test Optimization. Los spans de prueba afectan su factura solo cuando su uso supera la asignación de spans de prueba incluida para cada autor de commits en su plan.

### Spans de prueba generados por las funciones de Test Optimization {#test-spans-generated-by-test-optimization-features}

Algunas funciones de Test Optimization ejecutan o reportan pruebas en su nombre. Los spans de prueba que generan estas funciones no cuentan como spans de prueba facturables:

- Reintentos de [Auto Test Retries][8], [Early Flake Detection][9] y el flujo de remediación de [Attempt to Fix][10]. La primera ejecución de la prueba se factura, pero los reintentos que añade la función no.
- Pruebas omitidas por [Test Impact Analysis][11].

Estos spans de prueba se siguen ingiriendo e indexando. Puede buscarlos y analizarlos en el [Test Optimization Explorer][12] como cualquier otro span de prueba.

Se facturan los siguientes spans de prueba:

- Reintentos configurados en su marco de pruebas.
- Pruebas que omite en su código o en la configuración del marco de pruebas.

Estas excepciones no cambian la forma en que se cuentan los autores de commits.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/pipelines
[2]: /es/continuous_integration/guides/ingestion_control
[3]: /es/integrations/github/
[4]: https://app.datadoghq.com/integrations/github/
[5]: /es/reference_tables/
[6]: https://app.datadoghq.com/ci/settings/ci-cd/billing-committers
[7]: /es/tests/
[8]: /es/tests/flaky_tests/auto_test_retries/
[9]: /es/tests/flaky_tests/early_flake_detection/
[10]: /es/tests/flaky_management/#confirm-fixes-for-flaky-tests
[11]: /es/tests/test_impact_analysis/
[12]: /es/tests/explorer/