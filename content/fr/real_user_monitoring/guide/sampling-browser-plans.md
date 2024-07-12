---
aliases:
- /fr/real_user_monitoring/guide/sampling-browser-and-browser-premium/
description: Découvrez comment personnaliser votre configuration d'échantillonnage
  de RUM Browser et RUM Browser & Session Replay.
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentation
  text: En savoir plus sur la surveillance Browser RUM
kind: guide
title: Mettre à jour votre configuration pour RUM Browser et l'échantillonnage de
  RUM Browser et Session Replay
---

## Présentation

Lors de l'instrumentation d'une [application RUM Browser][1], définissez la fréquence d'échantillonnage pour le nombre total de sessions utilisateur que vous souhaitez collecter et le pourcentage de sessions utilisateur collectées qui incluent les fonctionnalités [RUM Browser & Session Replay][2].

Ce guide fournit un exemple de personnalisation du nombre de sessions Browser RUM & Session Replay que vous souhaitez collecter à partir du nombre total de sessions utilisateur dans Datadog.

## Configuration

Le paramètre `sessionReplaySampleRate` est un pourcentage de `sessionSampleRate`.

Cette fonctionnalité nécessite le SDK Browser Datadog v3.0.0 ou ultérieur.

<blockquote class="alert alert-info">
Le SDK Browser Datadog v4.20.0 introduit le <code>paramètre d'initialisation sessionReplaySampleRate</code>, supprimant les paramètres d'initialisation <code>premiumSampleRate</code> et <code>replaySampleRate</code>.
</blockquote>
<blockquote class="alert alert-info">
Le SDK Browser Datadog v5.0.0 introduit deux changements de comportement majeurs :

- Seules les sessions qui ont enregistré une rediffusion sont considérées comme étant Browser RUM & Session Replay.
- La valeur par défaut du paramètre d'initialisation <code>sessionReplaySampleRate</code> est `0`. Les versions précédentes du SDK utilisent `100`.
</blockquote>
Lorsqu'une session est créée, la solution RUM la suit comme suit :

- [**RUM Browser**][2] : les sessions, les vues, les actions, les ressources, les tâches longues et les erreurs sont collectées.
- [**RUM Browser & Session Replay**]][2] : tout ce qui provient du RUM Browser est collecté, y compris les enregistrements de rediffusions.

Vous pouvez définir deux paramètres d'initialisation pour contrôler la façon dont les sessions sont surveillées :

- Le paramètre `sessionSampleRate` définit le pourcentage global des sessions surveillées. Par défaut, il prend pour valeur `100%`, afin de surveiller toutes les sessions.
- Le paramètre `sessionReplaySampleRate` est appliqué **après** le taux d'échantillonnage global. Il définit le pourcentage de sessions surveillées en tant que données RUM Browser & Session Replay. Par défaut, il prend pour valeur `0`, afin de ne pas surveiller chaque session en tant que données RUM Browser & Session Replay.

Pour surveiller toutes vos sessions en tant que données RUM Browser :

<details open>
  <summary>Dernière version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>avant<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>avant<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 0
});
```

</details>

<details>
  <summary>avant<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

</details>

Pour surveiller toutes vos sessions en tant que données RUM Browser & Session Replay :

<details open>
  <summary>Dernière version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>avant<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>avant<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 100
});
```

</details>


<details>
  <summary>avant<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

</details>

Utilisez le curseur pour définir le pourcentage de sessions RUM Browser & Session Replay collectées par rapport au pourcentage de sessions utilisateur totales collectées pour votre application.

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="Exemple dʼextrait dʼinitialisation pour une application sur navigateur avec des pourcebtages personnalisés" video="true" width="100%" >}}

Si vous définissez `sessionSampleRate` sur 60 et `sessionReplaySampleRate` sur 50, 40 % des sessions sont abandonnées, 30 % des sessions sont collectées en tant que RUM Browser et 30 % des sessions sont collectées en tant que RUM Browser & Session Replay.

<details open>
  <summary>Dernière version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>avant<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>avant<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    premiumSampleRate: 50
});
```

</details>

<details>
  <summary>avant<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    replaySampleRate: 50
});
```

</details>

À partir de la version 5.0.0, afin de suivre 100 % des sessions qui atteignent un état personnalisé en tant que RUM Browser & Session Replay :

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    startSessionReplayRecordingManually: true,
});

// lorsque lʼétat personnalisé est atteint
datadogRum.startSessionReplayRecording()
```

Avec l'utilisation de `startSessionReplayRecordingManually: true`, les sessions qui n'appellent pas `startSessionReplayRecording()` sont considérées comme des RUM Browser.

Pour en savoir plus sur le tagging et l'exploration des attributs, référez-vous à la section [Survellance Browser][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /fr/real_user_monitoring/browser#tagging