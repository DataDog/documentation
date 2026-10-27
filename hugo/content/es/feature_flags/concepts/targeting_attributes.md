---
description: Defina atributos de segmentación reutilizables para obtener sugerencias
  de autocompletado y operadores compatibles con el tipo al crear reglas de segmentación.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas y filtros de segmentación
- link: /feature_flags/concepts/environments
  tag: Documentación
  text: Entornos
title: Atributos de segmentación
---
## Descripción general {#overview}

Un **atributo de segmentación** es una definición reutilizable para un valor que su aplicación envía en su contexto de evaluación, como `country` o `user_role`. Definir un atributo una vez le permite reutilizarlo en las reglas de segmentación con sugerencias de autocompletado y operadores compatibles con el tipo, en lugar de volver a escribir el nombre del atributo y seleccionar manualmente un operador compatible cada vez.

Cada atributo de segmentación incluye lo siguiente:

- **Clave de atributo**: El identificador al que hace referencia en las reglas de segmentación, por ejemplo `country` o `user.plan`. Las claves son únicas dentro de su organización y distinguen entre mayúsculas y minúsculas.
- **Tipo de datos**: `Boolean`, `String`, `Number` o `Semver`. El tipo de datos determina qué operadores están disponibles cuando utiliza el atributo en una regla de segmentación.
- **Canal de distribución**: Qué SDK informan este atributo en su contexto de evaluación: **Cliente y servidor**, **Solo cliente** o **Solo servidor**. Los atributos Semver solo están disponibles para los SDK de cliente.
- **Descripción** (opcional): Notas para otros usuarios sobre lo que representa el atributo.

Los atributos de segmentación son para toda la organización: una vez definidos, un atributo está disponible para las reglas de segmentación en todos los Feature Flags y entornos.

## Administrar atributos de segmentación {#manage-targeting-attributes}

Para visualizar y administrar los atributos de segmentación de su organización:

1. Vaya a **Feature Flags** > **Configuración** > **Atributos de segmentación**.
2. Haga clic en **Crear atributo** para definir uno nuevo, o seleccione un atributo existente para editarlo.

Para cada atributo, configure:

- **Clave de atributo**: Un identificador breve y descriptivo. Datadog elimina automáticamente los caracteres no admitidos al guardar.
- **Tipo de datos**: Elija booleano, cadena, número o Semver.
- **Canal de distribución (¿qué SDK incluyen este atributo en su contexto de evaluación?)**: Elija Cliente y servidor, Solo cliente o Solo servidor.
- **Descripción** (opcional): Agregue contexto para que otros usuarios sepan qué representa el atributo y cómo se puebla.

No puede crear dos atributos con la misma clave en su organización. Archivar un atributo (en lugar de eliminarlo) lo elimina de futuras sugerencias de autocompletado, pero no cambia ninguna regla de segmentación que ya lo referencie.

## Autocompletado de atributos en reglas de segmentación {#attribute-autocomplete-in-targeting-rules}

Cuando crea un filtro en una regla de segmentación y comienza a escribir en el campo de atributo, Datadog sugiere atributos de tres fuentes:

- **Atributos de segmentación guardados** del catálogo de su organización, que se muestran con su tipo de datos y descripción.
- **Atributos observados en los datos de evaluación**: atributos que sus SDK realmente han enviado en los últimos 7 días y que aún no se han guardado en el catálogo. Estos aparecen sin un tipo de datos.
- **Crear un nuevo atributo**: si escribe un nombre que no coincide con un atributo existente u observado, puede seleccionar **Crear nuevo atributo** para definirlo sin salir del editor de reglas de segmentación.

{{< img src="feature_flags/concepts/targeting-attributes-autocomplete.png" alt="Campo de atributo en una regla de segmentación que muestra sugerencias de autocompletado y una opción para crear un nuevo atributo." style="width:70%;" >}}

Crear un atributo de esta manera lo guarda en el catálogo de su organización con el canal de distribución **Cliente y servidor** y sin tipo de datos. Puede dejar el tipo de datos sin establecer o editar el atributo desde **Configuración** > **Atributos de segmentación** para establecer uno más tarde.

Haga clic en **Visualizar todos los atributos** sobre el filtro para ir a la página de configuración de Atributos de segmentación.

## Cómo afecta el tipo de datos a los operadores {#how-data-type-affects-operators}

Después de seleccionar un atributo en una regla de segmentación, los operadores ofrecidos se filtran para coincidir con su tipo de datos:

| Tipo de datos | Operadores disponibles |
|-----------|---------------------|
| **Booleano** | es, es nulo |
| **Cadena** | es, coincide con, no coincide con, es uno de, no es uno de, es nulo |
| **Número** | es, es uno de, no es uno de, menor que, menor o igual que, mayor que, mayor o igual que, es nulo |
| **Semver** | es, es uno de, no es uno de, es nulo, semver igual a, semver no igual a, semver menor que, semver menor o igual que, semver mayor que, semver mayor o igual que |

Las comparaciones de Semver admiten valores de [Semantic Versioning 2.0.0][1]. Aunque la especificación requiere tres componentes numéricos (por ejemplo, `1.2.3`), Datadog también acepta valores con uno o más componentes numéricos. Los componentes faltantes se comparan como cero (`18`, `18.0` y `18.0.0` son equivalentes), mientras que los componentes adicionales distintos de cero afectan el orden (`18.0.0.1` es mayor que `18.0.0`). Se aplica la precedencia de versión preliminar estándar y los metadatos de compilación no afectan las comparaciones.

Si cambia el atributo de una condición por uno con un tipo de datos incompatible, Datadog restablece el operador y el valor a los valores predeterminados para el nuevo tipo. Los atributos que aún no se han guardado en el catálogo (solo observados en los datos de evaluación) no restringen los operadores disponibles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/spec/v2.0.0.html