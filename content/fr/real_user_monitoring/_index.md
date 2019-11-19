---
title: Real User Monitoring
kind: documentation
description: 'Visualisez et analysez les performances de vos applications frontend, telles qu''elles sont perçues par vos utilisateurs.'
beta: true
disable_toc: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring'
    tag: Blog
    text: Real User Monitoring
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standards Datadog
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta. Inscrivez-vous via <a href="https://app.datadoghq.com/rum/2019signup">le site américain de Datadog</a> ou le <a href="https://app.datadoghq.eu/rum/2019signup">site européen de Datadog</a> pour activer Real User Monitoring/Datadog sur votre compte.
</div>

## Qu'est-ce que le Real User Monitoring ?

Le Real User Monitoring de Datadog vous permet de visualiser et d'analyser les performances de vos applications frontend tel que vos utilisateurs en font l'expérience. Il suit la latence du frontend jusqu'au backend à l'aide de visualisations avancées.

{{< img src="real_user_monitoring/real_user_monitering_overview.png" alt="Description de l’image" responsive="true" style="width:100%;">}}

## Implémentation

1. Sur la [page Real User Monitoring][1], cliquez sur le bouton **New Application**.
2. Ajoutez-la dans Application Details et cliquez sur **Generate Client Token**. Cette option permet de créer automatiquement un `clientToken` et un `applicationId` de votre application.
3. Collez l’[extrait de code généré](#extrait-de-code-genere) dans le tag d'en-tête (avant tous les autres tags de script) de toutes les pages HTML que vous souhaitez surveiller dans votre application.
4. Déployez les modifications sur votre application. Une fois votre déploiement actif, Datadog commence à recueillir les événements depuis les navigateurs de vos utilisateurs.

**Remarque** : votre application apparaît sur la page listant les applications comme étant « en attente » jusqu'à ce que Datadog reçoive les données.

### Extrait de code généré

Collez l'extrait de code généré dans le tag d'en-tête (avant tous les autres tags de script) de toutes les pages HTML que vous souhaitez surveiller dans votre application.

{{< tabs >}}
{{% tab "États-Unis" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM.init({
    clientToken: '<TOKEN_CLIENT>',
    applicationId: '<ID_APPLICATION>',
  });
</script>
```

{{% /tab %}}
{{% tab "États-Unis" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-eu.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM.init({
    clientToken: '<TOKEN_CLIENT>',
    applicationId: '<ID_APPLICATION>',
  });
</script>
```

{{% /tab %}}
{{< /tabs >}}

### Tokens client

Pour des raisons de sécurité, les [clés d'API][2] ne peuvent pas être utilisées pour configurer le script afin qu'il envoie des données depuis les navigateurs, car elles seront exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un [token client][3]. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation relative aux tokens client][3].

### Navigateurs pris en charge

La bibliothèque `datadog-rum` prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles. La collecte de ressources est limité sur IE10 et IE11.

## Données collectées

Le script Real User Monitoring/Datadog envoie trois types d'événements principaux à Datadog :

- Les événements relatifs au chargement des pages :
    - DOM interactive time
    - First paint time
    - First contentful paint time
- Les événements relatifs au chargement des ressources
- [Événements et mesures personnalisés][4].

Les contextes qui suivent la logique des [attributs standards Datadog][5] sont ensuite joints automatiquement à tous les événements envoyés à Datadog :

* [Requêtes HTTP][6]
* [Détails de l'URL][7]
* [Géolocalisation][8]
* [User-Agent][9]
* `sessionId`   L'ID correspondant à la session de votre utilisateur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: /fr/account_management/api-app-keys/#client-tokens
[4]: /fr/logs/log_collection/javascript/?tab=us#send-a-custom-log-entry
[5]: /fr/logs/processing/attributes_naming_convention
[6]: /fr/logs/processing/attributes_naming_convention/#http-requests
[7]: /fr/logs/processing/attributes_naming_convention/#url-details-attributes
[8]: /fr/logs/processing/attributes_naming_convention/#geolocation
[9]: /fr/logs/processing/attributes_naming_convention/#user-agent-attributes