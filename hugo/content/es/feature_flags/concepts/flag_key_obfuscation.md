---
description: Comprenda cómo la ofuscación de claves de flag reduce los nombres de
  flag legibles en las cargas útiles de asignación del cliente y qué permanece visible.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /feature_flags/concepts/distribution_channels/
  tag: Documentación
  text: Canales de distribución
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: Documentación
  text: Variantes y tipos de marcadores
title: Ofuscación de clave de flag
---
## Descripción general {#overview}

La ofuscación de claves de flag reemplaza las claves de flag legibles con hashes en las respuestas de asignación precalculadas. Esto hace que los nombres de los flags sean menos reconocibles para alguien que inspeccione la respuesta. No hace que los feature flags del lado del cliente sean secretos ni evita la manipulación de la respuesta.

Su aplicación continúa evaluando los flags con sus claves originales. La ofuscación no cambia la segmentación, los valores asignados, los valores predeterminados ni las claves de flag en la telemetría.

## Compatibilidad y despliegue {#compatibility-and-rollout}

La ofuscación de claves de flag requiere el SDK de JavaScript, `@datadog/openfeature-browser`, versión `2.1.0` o posterior. Datadog controla el despliegue a los SDK compatibles. El SDK maneja la codificación automáticamente. Usted no configura una opción de proveedor, genera hashes ni cambia las llamadas de evaluación.

Durante el despliegue, Datadog envía respuestas ofuscadas solo a los SDK que informan compatibilidad con la codificación. Otras versiones del SDK continúan recibiendo claves legibles. Actualizar una aplicación no cambia el comportamiento de otras aplicaciones que aún ejecutan una versión anterior del SDK.

Esta función se aplica a las asignaciones precalculadas. No ofusca las reglas de segmentación descargadas para la evaluación local.

## Cómo funciona la ofuscación de claves de flag {#how-flag-key-obfuscation-works}

1. Datadog evalúa los flags para el sujeto y el contexto proporcionados por el SDK.
2. Datadog reemplaza cada clave de flag en la respuesta de asignación con un hash SHA-256 con sal.
3. El SDK aplica hash a la clave de la llamada de evaluación con esa sal, encuentra la asignación y devuelve su valor.

La sal cambia entre respuestas. Es información pública, no una clave secreta. El SDK conserva la sal con las asignaciones en caché.

Por ejemplo, la siguiente llamada de evaluación de JavaScript permanece igual, ya sea que la respuesta contenga claves legibles o con hash:

{{< code-block lang="javascript" >}}
const enabled = client.getBooleanValue('new-route-planner', false);
{{< /code-block >}}

La clave original permanece sin cambios en Datadog y en el código de la aplicación. Los valores de variante, los identificadores de variante y los identificadores de asignación también permanecen sin cambios.

## Proteja la información sensible de los flags {#protect-sensitive-feature-information}

La ofuscación reduce el descubrimiento casual de los nombres de los flags en las respuestas de asignación. No proporciona cifrado, autorización ni verificación de firma. Alguien que conozca una posible clave de flag puede usar la sal pública para verificar su hash.

- Mantenga los secretos y la lógica de negocio sensible en el servidor. Restrinja los flags exclusivos del servidor al **Servidor** [canal de distribución][1].
- No coloque información sensible en valores orientados al cliente. Las cadenas y los objetos JSON permanecen legibles. Los valores booleanos también pueden revelar el comportamiento.
- Si los nombres de los flags en el código de la aplicación son una preocupación, elija claves de flag no descriptivas. La ofuscación de la carga útil no elimina las cadenas del código del navegador.
- Trate los valores visibles para el cliente, los identificadores, la telemetría y el comportamiento de la aplicación como inspeccionables. El hashing de las claves de flag no oculta estas otras fuentes de información.
- Aplique las decisiones de acceso sensible en el servidor. La ofuscación no impide que un cliente modificado cambie su comportamiento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/concepts/distribution_channels/