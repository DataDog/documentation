---
aliases: null
description: Configura opciones de privacidad de Session Replay en móviles.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentación
  text: Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentación
  text: Cómo afecta Session Replay en móviles al rendimiento de las aplicaciones
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentación
  text: Configuración de Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Session Replay en móviles
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
title: Opciones de privacidad de Session Replay en móviles
---

## Información general

Session Replay proporciona controles de privacidad para garantizar que las organizaciones de cualquier escala no expongan datos confidenciales o personales. Los datos se almacenan en instancias en la nube gestionadas por Datadog y se cifran en reposo.

Las opciones de privacidad predeterminadas de Session Replay protegen la privacidad del usuario final y evitan que se recopile información confidencial de la organización.

Al habilitar Session Replay para móviles puedes enmascarar automáticamente los elementos confidenciales para que no se registren a través del SDK RUM para móviles. Cuando se enmascaran los datos, los SDK de Datadog no los recopilan en su formato original y, por lo tanto, no se envían al backend.

## Configuración de los modos de enmascaramiento

Con los modos de enmascaramiento que se indican a continuación, puedes anular la configuración predeterminada para cada aplicación.

### Enmascarar todos los elementos de texto

Por defecto, el parámetro `mask` está habilitado para todos los datos. Con esta configuración habilitada se enmascara todo el contenido de texto en pantalla, como se muestra a continuación.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="Apariencia que puede tener la pantalla de tu aplicación cuando se habilita `mask`." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // enmascarar todos los elementos de texto
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    // enmascarar todos los elementos de texto
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .mask
        )
    )

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Enmascarar sólo los elementos de entrada

Con la opción `mask user input` habilitada, cualquier campo de entrada se sustituye por texto anónimo.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-user-input-2.png" alt="Apariencia que puede tener la pantalla de tu aplicación cuando se enmascaran los campos de entrada del usuario." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // enmascarar sólo los elementos de entrada
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK_USER_INPUT)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

   // enmascarar sólo los elementos de entrada
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .maskUserInput
        )
    )

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Permitir (sin enmascarar)

Con la opción `allow` habilitada, se muestra todo el texto.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all-2.png" alt="Apariencia que puede tener la pantalla de tu aplicación cuando se habilita `allow`." style="width:50%;">}}

**Nota**: Incluso cuando esta opción está habilitada, cualquier campo de texto confidencial, como contraseñas, correos electrónicos, números de teléfono y direcciones siguen enmascarados. Para obtener más información, consulta [Definiciones de enmascaramiento de texto](#text-masking-definitions).

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // sin enmascaramiento; se muestra todo el texto
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      .setPrivacy(SessionReplayPrivacy.ALLOW)
      .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   // sin enmascaramiento; se muestra todo el texto
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .allow
        )
    )

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Qué datos se enmascaran y de qué forma

Esta sección describe cómo el grabador de Datadog gestiona el enmascaramiento según el tipo de datos y cómo se definen dichos datos. 
### Estrategias de enmascaramiento de texto

Dependiendo de cómo hayas configurado tus parámetros de privacidad, el tipo de texto y la confidencialidad de los datos, las reglas de enmascaramiento de Datadog aplican diferentes estrategias a los distintos tipos de campos de texto.

| Estrategia de enmascaramiento de texto | Descripción | Ejemplo |
|-----------------------|-------------|---------|
| Sin enmascarar | El texto se muestra en la repetición de la sesión | `"Hello world"` → `"Hello world"` |
| Enmascaramiento con conservación del espacio | Cada carácter visible se sustituye por una "x" minúscula | `"Hello world"` → `"xxxxx xxxxx"` |
| Enmascaramiento de longitud fija | Todo el campo de texto se sustituye por una constante de tres asteriscos (***) | `"Hello world"` → `"***"`

Teniendo en cuenta las estrategias de texto anteriores, tienes algunas opciones diferentes si quieres anular la regla de privacidad predeterminada de `mask` en tu configuración.

El siguiente gráfico muestra cómo Datadog aplica diferentes estrategias de enmascaramiento de texto, utilizando las reglas que defines en tu configuración, a los siguientes tipos de texto.

| Tipo | Permitir todo | Enmascarar todo | Enmascarar la entrada del usuario |
|------|-------------|------------|-------------------|
| [Texto confidencial](#sensitive-text) | Enmascaramiento de longitud fija | Enmascaramiento de longitud fija | Enmascaramiento de longitud fija |
| [Texto de entrada y de opción](#input-and-option-text) | Sin enmascarar | Enmascaramiento de longitud fija | Enmascaramiento de longitud fija |
| [Texto estático](#static-text) | Sin enmascarar | Enmascaramiento con conservación del espacio | Sin enmascarar |
| [Texto de sugerencia](#hint-text) | Sin enmascarar | Enmascaramiento de longitud fija | Sin enmascarar |

### Definiciones de enmascaramiento de texto

A continuación encontrarás una descripción de cómo el grabador de Datadog trata cada tipo de texto.

#### Texto confidencial
El texto confidencial incluye contraseñas, correos electrónicos y números de teléfono marcados de forma específica para cada plataforma,
y otras formas de confidencialidad en el texto disponibles para cada plataforma.

Esto incluye contraseñas, correos electrónicos y números de teléfono:

- Campo de texto (iOS)
- Vista de texto (iOS)
- Editar texto (Android)
- Información sobre direcciones (iOS + Android)
- Números de tarjeta de crédito (iOS)
- Códigos de un solo uso (iOS)

#### Texto de entrada y de opción

El texto de entrada y de opción es el texto introducido por el usuario con un teclado u otro dispositivo de entrada de texto, o un valor personalizado (no genérico) en elementos de selecciones.

Esto incluye lo siguiente.

- Texto introducido por el usuario en:
  - Campo de texto (iOS)
  - Vista de texto (iOS)
  - Editar texto (Android)
- Opciones seleccionadas por el usuario en:
  - Selector de valores (iOS + Android)
  - Segmento (iOS)
  - Lista desplegable (Android)
- Exclusiones notables:
  - Textos de parámetros (sugerencias) en Campo de texto, Vista de texto y Editar texto (no introducidos por el usuario)
  - Textos no editables en Vista de texto (iOS).
  - Etiquetas (labels) de mes, día y año en el selector de fecha (valores genéricos)

#### Texto estático
Texto estático es cualquier texto que no es introducido directamente por el usuario. Esto incluye lo siguiente.

Todos los textos en:

- Títulos de casillas de verificación y botones de opción (Android)
- Textos en Vista de texto no editable (iOS)
- Etiquetas de mes, día y año en el selector de fecha y hora
- Valores actualizados en respuesta a la interacción gestual con los elementos de entrada, como el valor actual del deslizador
- Otros controles, no considerados como "elementos de entrada del usuario", como etiquetas, barras de pestañas y de navegación (iOS) o pestañas (Android).

#### Texto de sugerencia
El texto de sugerencia es texto estático en elementos de texto editables o selectores de opción que se muestra cuando no se proporciona ningún valor. Esto incluye:

- Marcadores de posición en Campo de texto (iOS), Vista de texto (iOS)
- Sugerencias en Editar texto (Android)
- Avisos en listas desplegables (Android)

### Enmascaramiento del aspecto

El siguiente gráfico muestra cómo aplicamos diferentes estrategias de enmascaramiento de apariencia, utilizando las reglas que defines en tu configuración, a los siguientes tipos de texto.

| Tipo | Permitir todo | Enmascarar todo | Enmascarar la entrada del usuario |
|------|-------------|------------|-------------------|
| [Mostrar atributos](#revealing-attributes) |  | {{< X >}} | {{< X >}} |
| [Otros atributos](#other-attributes) |  |  |  |

#### Atributos reveladores
Los atributos reveladores son atributos que pueden mostrar o sugerir el valor de los elementos de entrada y pueden utilizarse para inferir la entrada o selección de un usuario.

Esto incluye:

**Formas**
- Segundo plano de la opción seleccionada en un segmento (iOS)
- Círculo alrededor de la fecha seleccionada en un selector de fecha (iOS)
- Marca de selección en una casilla de verificación (Android)
- Pulgar de un deslizador (iOS y Android)

**Atributos de texto**
- El color de una etiqueta que muestra la fecha seleccionada en el selector de fecha (iOS)
- La posición de la primera y última opción en el selector de valores (iOS y Android)

### Interacciones táctiles

El siguiente gráfico muestra cómo aplicamos diferentes estrategias de interacción táctil, utilizando las reglas que defines en tu configuración, a los siguientes tipos de texto. Si bien todas las interacciones que ocurren en un teclado en pantalla están enmascaradas, las interacciones con otros elementos no lo están.

| Tipo | Permitir todo | Enmascarar todo | Enmascarar la entrada del usuario |
|------|-------------|------------|-------------------|
| [Otros atributos](#other-attributes) |  |  |  |
| [Teclado en pantalla](#on-screen-keyboard) | {{< X >}} | {{< X >}} | {{< X >}} |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}