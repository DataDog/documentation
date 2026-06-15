---
aliases:
- /es/real_user_monitoring/guide/sampling-browser-and-browser-premium/
description: Aprende a personalizar tu configuración de muestreo de RUM de navegador
  y de RUM de navegador y Session Replay.
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentación
  text: Más información sobre la monitorización de RUM de navegador
title: Configuración de tus parámetros de muestreo de RUM de navegador y de RUM de
  navegador y Session Replay
---

## Información general

Al instrumentar una [aplicación RUM de navegador][1], define la frecuencia de muestreo para la cantidad total de sesiones de usuario que quieres recopilar y el porcentaje de sesiones de usuario recopiladas que incluyan funciones [RUM de navegador y Session Replay][2].

Esta guía proporciona un ejemplo de cómo personalizar la cantidad de sesiones RUM de navegador y Session Replay que quieres recopilar a partir de la cantidad total de sesiones de usuario en Datadog.

## Configuración

El parámetro `sessionReplaySampleRate` es un porcentaje de `sessionSampleRate`.

Esta función requiere el SDK del navegador Datadog v3.0.0 o posterior.

<blockquote class="alert alert-info">
El SDK del navegador Datadog v4.20.0 introduce el parámetro de inicialización <code>sessionReplaySampleRate</code>, lo que deja obsoletos los parámetros de inicialización <code>premiumSampleRate</code> y <code>replaySampleRate</code>.
</blockquote>
<blockquote class="alert alert-info">
El SDK del navegador Datadog v5.0.0 introduce dos importantes cambios de comportamiento:

- Sólo las sesiones que han grabado una repetición se consideran como RUM de navegador y Session Replay
- El valor por defecto del parámetro de inicialización <code>sessionReplaySampleRate</code> es `0`. Las versiones anteriores del SDK utilizan `100`.
</blockquote>
Cuando se crea una sesión, RUM la rastrea como:

- [**RUM de navegador**][2]: Se recopilan sesiones, vistas, acciones, recursos, tareas prolongadas y errores.
- [**RUM de navegador y Session Replay**][2]: Se recopila todo lo del RUM del navegador, incluidas las grabaciones de repeticiones.

Existen dos parámetros de inicialización para controlar el seguimiento de la sesión:

- `sessionSampleRate` controla el porcentaje total de sesiones que se rastrean. El valor predeterminado es `100%`, por lo que, por defecto, se realiza un seguimiento de todas las sesiones.
- `sessionReplaySampleRate` se aplica **después** de la frecuencia de muestreo total y controla el porcentaje de sesiones rastreadas como de RUM de navegador y Session Replay. A partir del SDK del navegador v5.0.0, el valor predeterminado es `0`, por lo que, por defecto, no se realiza el seguimiento de ninguna sesión como de RUM de navegador y Session Replay.

Para realizar un seguimiento del 100% de tus sesiones como de RUM de navegador:

<details open>
  <summary>Última versión</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>antes de<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>antes de<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 0
});
```

</details>

<details>
  <summary>antes de<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

</details>

Para realizar un seguimiento del 100% de tus sesiones como de RUM de navegador y Session Replay:

<details open>
  <summary>Última versión</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>antes de<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>antes de<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 100
});
```

</details>


<details>
  <summary>antes de<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

</details>

Utiliza el control deslizante para definir el porcentaje de sesiones de RUM de navegador y Session Replay recopiladas a partir del porcentaje de sesiones de usuario totales recopiladas para tu aplicación.

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="Ejemplo de fragmento de inicialización para una aplicación de navegador con porcentajes personalizados" video="true" width="100%" >}}

Si defines `sessionSampleRate` en 60 y `sessionReplaySampleRate` en 50, el 40% de las sesiones se eliminan, el 30% de las sesiones se recopilan como de RUM de navegador y el 30% de las sesiones se recopilan como de RUM de navegador y Session Replay.

<details open>
  <summary>Última versión</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>antes de<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>antes de<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    premiumSampleRate: 50
});
```

</details>

<details>
  <summary>antes de<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    replaySampleRate: 50
});
```

</details>

A partir de v5.0.0, para realizar un seguimiento del 100% de las sesiones que alcanzan un estado personalizado como RUM de navegador y Session Replay:

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    startSessionReplayRecordingManually: true,
});

// when the custom state is reached
datadogRum.startSessionReplayRecording()
```

Con el uso de `startSessionReplayRecordingManually: true`, las sesiones que no llaman a `startSessionReplayRecording()` se consideran como de RUM de navegador.

Para obtener más información sobre el etiquetado y la exploración de atributos, consulta la [monitorización del navegador][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /es/real_user_monitoring/browser#tagging