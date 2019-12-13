---
title: Configuration du Real User Monitoring
kind: documentation
description: ''
beta: true
further_reading:
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/rum_analytics
    tag: Documentation
    text: Générez des analyses à partir de vos événements
---
Pour configurer la solution Real User Monitoring (RUM) de Datadog :

1. Sur la [page Real User Monitoring][1], cliquez sur le bouton **New Application**.
2. Renseignez les informations sur votre application et cliquez sur **Generate Client Token**. Cette option permet de créer automatiquement un `clientToken` et un `applicationId` pour votre application.
3. Collez l’[extrait de code généré](#extrait-de-code-genere) dans le tag d'en-tête (avant tous les autres tags du script) de toutes les pages HTML que vous souhaitez surveiller dans votre application.
4. Déployez les modifications sur votre application. Une fois votre déploiement actif, Datadog commence à recueillir les événements depuis les navigateurs de vos utilisateurs.

**Remarque** : votre application affiche le statut « Pending » (en attente) sur la liste des applications tant que Datadog n'a pas encore reçu de données.

### Extrait de code généré

Collez l'extrait de code généré dans le tag d'en-tête (avant tous les autres tags du script) de toutes les pages HTML que vous souhaitez surveiller dans votre application.

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<TOKEN_CLIENT>',
    applicationId: '<ID_APPLICATION>',
  });
</script>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-eu.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<TOKEN_CLIENT>',
    applicationId: '<ID_APPLICATION>',
  });
</script>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : le check `window.DD_RUM` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

## Configuration avancée

### Ajouter des métadonnées globales

Une fois le Real User Monitoring (RUM) lancé, ajoutez des métadonnées supplémentaires à l'ensemble des événements RUM recueillis à partir de votre application avec l'API `addRumGlobalContext` :

```js
// Ajouter un attribut de métadonnées global. Un seul attribut peut être ajouté à la fois.
window.DD_RUM && DD_RUM.addRumGlobalContext('<CLÉ_MÉTA>', <VALEUR_MÉTA>);
```

### Remplacer le contexte par défaut

Une fois le Real User Monitoring (RUM) lancé, vous pouvez remplacer le contexte par défaut de tous vos événements RUM avec l'API `setRumGlobalContext` :

```js
// Remplacer entièrement le contexte par défaut pour toutes vos vues
window.DD_RUM && DD_RUM.setRumGlobalContext({"<CLÉ_CONTEXTE>":"<VALEUR_CONTEXTE>"});
```

### Tokens client

Pour des raisons de sécurité, les [clés d'API][2] ne peuvent pas être utilisées pour demander au script d'envoyer des données depuis les navigateurs, car elles seront exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un [token client][3]. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation relative aux tokens client][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: /fr/account_management/api-app-keys/#client-tokens