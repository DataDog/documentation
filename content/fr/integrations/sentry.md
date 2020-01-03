---
categories:
- issue tracking
- Collaboration
- exceptions
ddtype: crawler
dependencies: []
description: Visualisez des exceptions Sentry dans votre flux d'événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/sentry/
git_integration_title: sentry
has_logo: true
integration_title: Sentry
is_public: true
kind: integration
manifest_version: '1.0'
name: sentry
public_title: Intégration Datadog/Sentry
short_description: Visualisez des exceptions Sentry dans votre flux d'événements Datadog.
version: '1.0'
---

{{< img src="integrations/sentry/sentry.png" alt="événement sentry"  >}}

## Présentation

Associez Sentry à Datadog pour :

* Visualiser des exceptions en temps réel dans le flux d'événements
* Rechercher des exceptions sur vos graphiques
* Discuter des exceptions avec votre équipe

## Implémentation
### Installation

Implémentation de l'intégration Sentry :

1. Connectez vous à Sentry.
2. Accédez à un projet.
3. Accédez à la page des paramètres du projet.
4. À gauche de la page, cliquez sur *Legacy Integrations*
5. Faites défiler l'écran vers le bas jusqu'à l'intégration *Webhooks*, cliquez sur le bouton coulissant pour l'activer, puis cliquez sur Configure Plugin
7. Sous **Callback URLs'**, saisissez `https://app.datadoghq.com/intake/webhook/sentry?api_key=<VOTRE_CLÉ_API_DATADOG>`
8. Cliquez sur **Save changes**

Par défaut, Sentry ping le Webhook avec les données d'événement chaque fois qu'une nouvelle exception se produit (contrairement à une nouvelle instance d'une exception déjà loguée). Si vous souhaitez utiliser des déclencheurs différents (ou supplémentaires), vous pouvez les configurer dans la section Alerts des paramètres de votre projet.

### Ajouter un hostname aux erreurs Sentry (facultatif)

Il arrive parfois que le nom de serveur envoyé par Sentry ne corresponde pas au hostname reconnu par Datadog. Pour résoudre ce problème, définissez une valeur personnalisée pour le tag `nom_serveur` associé à chaque événement.

Pour utiliser un hostname différent tout en conservant la valeur `nom_nom` par défaut de Sentry, vous pouvez également définir un tag `hostname` sur vos événements. Consultez la [documentation relative aux événements de tagging Sentry][1] pour découvrir comment le faire dans votre langue.

## Dépannage
### Pourquoi mes erreurs Sentry n'apparaissent-elles pas dans Datadog ?

Votre Webhook Sentry ne se déclenche probablement pas. Raisons possibles :

* **Les alertes sont uniquement envoyées lorsqu'une règle est déclenchée** :<br>
Par exemple, si la condition de règle est « lorsqu'un événement se produit pour la première fois », aucune alerte ne se déclenchera tant qu'un nouveau problème n'aura pas été créé. (En fonction du nombre de problèmes uniques que votre projet reçoit, cela peut prendre du temps.)

* **L'intégration de notification est désactivée** :<br>
Assurez-vous que l'intégration de notification est bien activée dans les actions de règle, soit en tant que service spécifique, soit dans la section « tous les services activés ».

[1]: https://docs.sentry.io/enriching-error-data/context/?platform=javascript#tagging-events


{{< get-dependencies >}}
