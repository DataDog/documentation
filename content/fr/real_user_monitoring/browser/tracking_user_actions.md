---
title: Suivi des actions utilisateur
kind: documentation
further_reading:
  - link: /real_user_monitoring/guide/send-rum-custom-actions/
    tag: Guide
    text: Envoyer des actions RUM personnalisées à partir du code
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: Générer des analyses à partir de vos événements
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Dashboards RUM
---
Le SDK Real User Monitoring (RUM) détecte les interactions effectuées par un utilisateur durant son parcours. Pour activer cette fonctionnalité, définissez le [paramètre de lancement][1] `trackInteractions` sur `true`.

**Remarque** : le paramètre d'initialisation `trackInteractions` active la collecte des clics utilisateur dans votre application. **Des données sensibles et privées** présentes sur vos pages sont susceptibles d'être recueillies pour identifier les éléments ayant fait l'objet d'une interaction.

Lorsqu'une interaction est détectée, tous les nouveaux événements RUM sont associés à l'action en cours jusqu'à ce qu'elle soit considérée comme terminée. L'action dispose également des attributs de la vue parent : informations sur le navigateur, données de géolocalisation ou encore [contexte global][2].

## Métriques de durée des actions

Pour en savoir plus sur les attributs par défaut de tous les types d'événements RUM, consultez la section relative à la [collecte de données RUM][3]. Pour obtenir des instructions afin de configurer l'échantillonnage ou le contexte global, consultez la section [Configuration avancée du RUM][4].

| Métrique    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action.  |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

### Méthode de calcul de la durée de chargement d'une action

Lorsqu'une interaction est détectée, le SDK RUM surveille les requêtes réseau et les mutations DOM. L'action utilisateur est considérée comme terminée lorsqu'aucune activité n'est effectuée sur la page pendant plus de 100 ms (une activité étant définie comme des requêtes réseau actives ou une mutation DOM).

## Attributs d'action

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les actions utilisateur personnalisées, cet attribut est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les actions utilisateur personnalisées, il s'agit du nom d'action indiqué dans l'appel de l'API. |

## Déclarer un nom pour les actions de clic

La bibliothèque RUM utilise diverses stratégies pour nommer les actions de clic. Si vous souhaitez contrôler davantage les noms utilisés, définissez un attribut `data-dd-action-name` sur les éléments cliquables (ou l'un de leurs parents) afin de nommer l'action. Exemple :

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Bouton de connexion">Essayer</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Ignorer l'alerte">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Saisissez une adresse e-mail valide
</div>
```
## Actions utilisateur personnalisées

Les actions utilisateur personnalisées sont des actions déclarées et envoyées manuellement via l'API `addAction`. Elles permettent d'envoyer des informations relatives à un événement qui a lieu au cours d'un parcours utilisateur (telles qu'un délai personnalisé ou des informations sur le panier client).

Une fois la fonctionnalité RUM initialisée, générez des actions utilisateur pour surveiller des interactions spécifiques sur les pages de votre application ou mesurer des délais personnalisés avec l'appel d'API `addAction(name: string, context: Context)`. Dans l'exemple ci-dessus, le SDK RUM recueille le nombre d'articles d'un panier, la nature de ces articles, ainsi que le montant total du panier.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NOM>', '<OBJET_JSON>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /fr/real_user_monitoring/browser/data_collected/#default-attributes
[4]: /fr/real_user_monitoring/browser/advanced_configuration/