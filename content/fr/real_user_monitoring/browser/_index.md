---
aliases:
- /fr/real_user_monitoring/setup
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Découvrir comment utiliser le SDK Browser Datadog pour les logs
kind: documentation
title: Surveillance Browser avec RUM
---

## Présentation

La solution Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application. Pour recueillir des événements, ajoutez le SDK Browser RUM à votre application Browser et définissez des paramètres d'initialisation pour configurer les données recueillies. 

## Implémentation

Le SDK Browser RUM prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles, y compris IE11. Pour en savoir plus, consultez le [tableau des navigateurs pris en charge][8].

Pour configurer la surveillance Browser RUM, créez une application RUM :

1. Dans Datadog, accédez à la [page **RUM Applications**][1] et cliquez sur le bouton **New Application**.
  - Saisissez un nom pour votre application et cliquez sur **Generate Client Token**. Cette option permet de générer un `clientToken` et un `applicationId` pour votre application.
  - Choisissez un type d'installation pour le SDK Browser RUM : [npm](#npm) ou une version hébergée ([CDN asynchrone](#cdn-asynchrone) ou [CDN synchrone](#cdn-synchrone)).
  - Définissez le nom de l'environnement et du service de votre application, afin de pouvoir exploiter le tagging de service unifié pour [RUM et Session Replay][19]. Définissez un numéro de version pour l'application déployée dans le code d'initialisation. Pour en savoir plus, consultez la rubrique [Tags](#tags).
  - Définissez le taux d'échantillonnage pour les sessions utilisateur recueillies. Utilisez le curseur pour choisir le pourcentage de sessions [Browser RUM et Session Replay][11] recueillies. Ces sessions incluent les ressources, tâches longues et enregistrements. Pour en savoir plus sur la configuration du pourcentage de sessions Browser RUM et Session Replay recueillies à partir de l'ensemble des sessions utilisateur, consultez la rubrique [Mettre à jour votre configuration pour Browser RUM et l'échantillonnage de Browser RUM et Session Replay][21].
  - Cliquez sur le bouton **Session Replay Enabled** pour accéder aux enregistrements dans [Session Replay][17].
  - Sélectionnez dans le menu déroulant un [paramètre de confidentialité][18] pour Session Replay.
2. Déployez les modifications sur votre application. Une fois votre déploiement actif, Datadog recueille les événements depuis les navigateurs de vos utilisateurs.
3. Visualisez les [données recueillies][2] dans des [dashboards][3] ou créez une requête de recherche dans le [RUM Explorer][16].

Tant que Datadog ne reçoit pas de données, votre application possède le statut `pending` sur la page **RUM Applications**.

### Choisir la bonne méthode d'installation

npm (node package manager)
: Cette méthode est recommandée pour les applications Web modernes. Le SDK Browser RUM est inclus avec le reste de votre code JavaScript frontend. Les performances de chargement des pages ne sont pas affectées. Le SDK peut toutefois omettre des erreurs, ressources et actions utilisateur déclenchées avant l'initialisation du SDK. Datadog recommande d'utiliser une version correspondant à celle du SDK Browser Logs.

CDN asynchrone
: Cette méthode est recommandée pour les applications Web devant satisfaire des objectifs de performance. Le SDK Browser RUM est chargé à partir de notre CDN de façon asynchrone : ainsi, le téléchargement du SDK n'affecte pas les performances de chargement des pages. Le SDK peut toutefois omettre des erreurs, ressources et actions utilisateur déclenchées avant l'initialisation du SDK.

CDN synchrone
: Cette méthode est recommandée pour recueillir tous les événements RUM. Le SDK Browser RUM est chargé à partir de notre CDN de façon synchrone : ainsi, le SDK est chargé en premier et recueille toutes les erreurs, ressources et actions utilisateur. Cette méthode peut avoir un impact sur les performances de chargement des pages.

### npm

Ajoutez [`@datadog/browser-rum`][4] à votre fichier `package.json`, puis lancez-le avec :

<details open>
  <summary>Dernière version</summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

<details>
  <summary>avant la version <code>v4.30.0</code></summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

<details>
  <summary>avant la version <code>v4.20.0</code></summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
  trackInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

<details>
  <summary>avant la version <code>v4.10.2</code></summary>

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
  trackInteractions: true,
  });
datadogRum.startSessionReplayRecording();

```

</details>

Les paramètres `trackUserInteractions` et `trackFrustrations` configurent la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** figurant sur vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

### CDN asynchrone

Ajoutez l'extrait de code généré dans le tag head de toutes les pages HTML que vous souhaitez surveiller dans votre application. Pour le site **{{<region-param key="dd_site_name">}}** :

<details open>
  <summary>Dernière version</summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
     });
    window.DD_RUM.startSessionReplayRecording();
   })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.30.0</code></summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.20.0</code></summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.10.2</code></summary>

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

</details>

Les paramètres `trackUserInteractions` et `trackFrustrations` configurent la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** figurant sur vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

Les premiers appels de l'API RUM doivent être wrappés dans le callback `window.DD_RUM.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

### CDN synchrone

Ajoutez l'extrait de code généré dans le tag head (avant tous les autres tags du script) de toutes les pages HTML que vous souhaitez surveiller dans votre application. Lorsque le tag script est placé tout en haut du code et synchronisé, la solution RUM de Datadog peut recueillir toutes les données de performance et toutes les erreurs. Pour le site **{{<region-param key="dd_site_name">}}** :

<details open>
  <summary>Dernière version</summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.30.0</code></summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.20.0</code></summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

<details>
  <summary>avant la version <code>v4.10.2</code></summary>

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si le taux n'est pas inclus, il est définit par défaut sur 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

</details>

Les paramètres `trackUserInteractions` et `trackFrustrations` configurent la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** figurant sur vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

Le check `window.DD_RUM` est utilisé pour éviter tout problème si le chargement du SDK Browser RUM échoue.

### TypeScript

Les types sont compatibles avec TypeScript >= 3.8.2. Pour les versions antérieures, importez les sources JavaScript et utilisez des variables globales pour éviter tout problème de compilation :

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // si le taux n'est pas inclus, il est défini par défaut sur 100
  trackResources: true,
  trackLongTasks: true,
})
```

## Configuration

### Paramètres de lancement

Appelez la commande d'initialisation pour commencer le suivi. Vous pouvez configurer les paramètres suivants :

`applicationId`
: Obligatoire<br/>
**Type** : chaîne<br/>
L'ID de l'application RUM.

`clientToken`
: Obligatoire<br/>
**Type** : chaîne<br/>
Un [token client Datadog][5].

`site`
: Obligatoire<br/>
**Type** : chaîne<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
[Le paramètre du site Datadog de votre organisation][14].

`service`
: Facultatif<br/>
**Type** : chaîne<br/>
Le nom de service de votre application. Respectez les [exigences de la syntaxe des tags][15].

`env`
: Facultatif<br/>
**Type** : chaîne<br/>
L'environnement de l'application, par exemple prod, pre-prod, staging, etc. Respectez les [exigences de la syntaxe des tags][15].

`version`
: Facultatif<br/>
**Type** : chaîne<br/>
La version de l'application, par exemple 1.2.3, 6c44da20 ou 2020.02.13. Respectez les [exigences de la syntaxe des tags][15].

`trackViewsManually`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Vous permet de contrôler la création des vues RUM. Consultez la rubrique [Remplacer les noms de vue RUM par défaut][10].

`trackInteractions`
: Facultatif ; **obsolète**<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Voir `trackUserInteractions`.

`trackUserInteractions`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Active la [collecte automatique des actions utilisateur][6].

`trackFrustrations`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Active la [collecte automatique des frustrations utilisateur][20]. Nécessite la configuration `trackUserInteractions: true`.

`trackResources`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Active la collecte des événements de ressource.

`trackLongTasks`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false` <br/>
Active la collecte des événements de tâche longue.

`defaultPrivacyLevel`
: Facultatif<br/>
**Type** : chaîne<br/>
**Valeur par défaut** : `mask-user-input` <br/>
Consultez la section [Options de confidentialité Session Replay][13].

`actionNameAttribute`
: Facultatif<br/>
**Type** : chaîne<br/>
Indiquez votre propre attribut à utiliser pour [nommer des actions][9].

`sampleRate`
: Facultatif ; **obsolète**<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Voir ``sessionSampleRate`.

`sessionSampleRate`
: Facultatif<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Le pourcentage de sessions à surveiller : `100` pour toutes les sessions, `0` pour aucune. Seules les sessions surveillées envoient des événements RUM. Pour en savoir plus sur le paramètre `sessionSampleRate`, consultez la documentation relative à la [configuration de l'échantillonnage][21].

`replaySampleRate`
: Facultatif ; **obsolète**<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Voir `sessionReplaySampleRate`.

`premiumSampleRate`
: Facultatif ; **obsolète**<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Voir `sessionReplaySampleRate`.

`sessionReplaySampleRate`
: Facultatif<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Le pourcentage de sessions surveillées avec les fonctionnalités liées aux [tarifs Browser RUM et Session Replay][11] : `100` pour toutes les sessions, `0` pour aucune. Pour en savoir plus sur le paramètre `sessionReplaySampleRate`, consultez la documentation relative à la [configuration de l'échantillonnage][21].

`silentMultipleInit`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false`<br/>
L'initialisation échoue sans envoyer d'alerte si le SDK Browser RUM est déjà initialisé sur la page.

`proxyUrl`
: Facultatif<br/>
**Type** : chaîne<br/>
URL de proxy facultative. Exemple : https://www.proxy.com/path. Pour en savoir plus, consultez le [guide de configuration des proxies][7].

`allowedTracingOrigins`
: Facultatif ; **obsolète**<br/>
**Type** : liste<br/>
La liste des origines de requête utilisées pour injecter les en-têtes de tracing. Pour en savoir plus, consultez la section [Associer RUM à vos traces][12].

`allowedTracingUrls`
: Facultatif<br/>
**Type** : liste<br/>
La liste des URL de requête utilisées pour injecter les en-têtes de tracing. Pour en savoir plus, consultez la section [Associer RUM à vos traces][12].

`tracingSampleRate`
: Facultatif ; **obsolète**<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Voir `traceSampleRate`.

`traceSampleRate`
: Facultatif<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `100`<br/>
Le pourcentage de requêtes à tracer : `100` pour toutes les requêtes, `0` pour aucune. Pour en savoir plus, consultez la section [Associer RUM à vos traces][12].

`telemetrySampleRate`
: Facultatif<br/>
**Type** : nombre<br/>
**Valeur par défaut** : `20`<br/>
Les données de télémétrie (comme les erreurs et logs de debugging) à propos de l'exécution du SDK sont envoyées à Datadog afin de détecter et de résoudre les problèmes potentiels. Définissez ce paramètre sur `0` pour désactiver la collecte de télémétrie.

`excludedActivityUrls`
: Facultatif<br/>
**Type** : liste<br/>
La liste des origines de requête ignorées lors du calcul de l'activité d'une page. Consultez la rubrique [Méthode de calcul de l'activité des pages][16].

Les paramètres suivants doivent avoir une configuration correspondante lors de l'utilisation du SDK Logs Browser :

`trackSessionAcrossSubdomains`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false`<br/>
Préserve la session pour tous les sous-domaines d'un même site.

`useSecureSessionCookie`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false`<br/>
Permet d'utiliser un cookie de session sécurisé. Ce paramètre désactive les événements RUM envoyés via des connexions non sécurisées (connexions non HTTPS).

`useCrossSiteSessionCookie`
: Facultatif<br/>
**Type** : booléen<br/>
**Valeur par défaut** : `false`<br/>
Permet d'utiliser un cookie de session intersite sécurisé. Vous pouvez ainsi exécuter le SDK Browser RUM lorsque le site est chargé à partir d'un autre site (iframe). Implique l'utilisation de `useSecureSessionCookie`.

### Tags

Un service est un référentiel de code indépendant et déployable mappé à un ensemble de pages.

- Si votre application a été conçue sur un modèle monolithique, votre application RUM possède un nom de service pour l'application.
- Si votre application Browser possède un certain nombre de référentiels distincts pour plusieurs pages, modifiez les noms de service par défaut utilisés durant le cycle de vie de l'application.

### Accéder au contexte interne

Une fois le SDK Browser RUM Datadog initialisé, vous pouvez accéder au contexte interne du SDK.

Vous pouvez analyser les attributs suivants :

| Attribut      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | L'ID de l'application.                                            |
| session_id     | L'ID de la session.                                                |
| user_action    | Un objet contenant l'ID de l'action (ou non défini si aucune action n'a été trouvée). |
| vue           | Un objet contenant les détails de l'événement de la vue active.           |

Pour en savoir plus, consultez la section [Données RUM recueillies (Browser)][2].

#### Exemple

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

Vous pouvez utiliser le paramètre `startTime` pour obtenir le contexte d'un moment précis. Si ce paramètre n'est pas fourni, le contexte actuel est renvoyé.

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /fr/real_user_monitoring/data_collected/
[3]: /fr/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /fr/account_management/api-app-keys/#client-tokens
[6]: /fr/real_user_monitoring/browser/tracking_user_actions
[7]: /fr/real_user_monitoring/guide/proxy-rum-data/
[8]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[9]: /fr/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[10]: /fr/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[12]: /fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[13]: /fr/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[14]: /fr/getting_started/site/
[15]: /fr/getting_started/tagging/#defining-tags
[16]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[17]: /fr/real_user_monitoring/session_replay/
[18]: /fr/real_user_monitoring/session_replay/privacy_options
[19]: /fr/getting_started/tagging/using_tags
[20]: /fr/real_user_monitoring/frustration_signals/
[21]: /fr/real_user_monitoring/guide/sampling-browser-plans/