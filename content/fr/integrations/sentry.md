---
"categories":
- "issue tracking"
- "Collaboration"
- "exceptions"
"ddtype": "crawler"
"dependencies": []
"description": "Visualisez des exceptions Sentry dans votre flux d'événements Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/sentry/"
"draft": false
"git_integration_title": "sentry"
"has_logo": true
"integration_id": "sentry"
"integration_title": "Sentry"
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "sentry"
"public_title": "Intégration Datadog/Sentry"
"short_description": "Visualisez des exceptions Sentry dans votre flux d'événements Datadog."
"version": "1.0"
---

{{< img src="integrations/sentry/sentry.png" alt="événement sentry" popup="true">}}

## Présentation

Associez Sentry à Datadog pour :

- Visualiser des exceptions en temps réel dans le flux d'événements
- Rechercher des exceptions sur vos graphiques
- Discuter des exceptions avec votre équipe

## Configuration

### Installation

Implémentation de l'intégration Sentry :

1. Connectez-vous à Sentry.
2. Accédez à **Settings > Integrations**.
3. Trouvez l'intégration Webhooks, cliquez sur **Add to Project**, et sélectionnez le projet dans lequel vous souhaitez configurer l'intégration.
4. Sous **Callback URLs'**, saisissez `https://app.datadoghq.com/intake/webhook/sentry?api_key=<VOTRE_CLÉ_API_DATADOG>`.
5. Cliquez sur **Save changes**.
6. Activez l'intégration si nécessaire en cliquant sur **Enable Plugin**.

Par défaut, Sentry ping le Webhook avec les données d'événement chaque fois qu'une nouvelle exception se produit (contrairement à une nouvelle instance d'une exception déjà loguée). Si vous souhaitez utiliser des déclencheurs différents (ou supplémentaires), vous pouvez les configurer dans la section Alerts des paramètres de votre projet.

### Ajouter un hostname aux erreurs Sentry (facultatif)

Il arrive parfois que le nom de serveur envoyé par Sentry ne corresponde pas au hostname reconnu par Datadog. Pour résoudre ce problème, définissez une valeur personnalisée pour le tag `nom_serveur` associé à chaque événement.

Pour utiliser un hostname différent tout en conservant la valeur `nom_nom` par défaut de Sentry, vous pouvez également définir un tag `hostname` sur vos événements. Consultez la [documentation relative aux événements de tagging Sentry][1] pour découvrir comment le faire dans votre langage.

## Dépannage

### Pourquoi mes erreurs Sentry n'apparaissent-elles pas dans Datadog ?

Votre Webhook Sentry ne se déclenche probablement pas. Raisons possibles :

**Les alertes sont uniquement envoyées lorsqu'une règle est déclenchée** :<br>
Par exemple, si la condition de règle est « lorsqu'un événement se produit pour la première fois », aucune alerte ne se déclenchera tant qu'un nouveau problème n'aura pas été créé. L'envoi d'une alerte peut donc prendre un certain temps, en fonction du nombre de problèmes uniques que votre projet reçoit.


**L'intégration de notification est désactivée** :<br>
Assurez-vous que l'intégration de notification est bien activée dans les actions de règle, soit en tant que service spécifique, soit dans la section « All enabled services ».

[1]: https://docs.sentry.io/enriching-error-data/context/?platform=javascript#tagging-events

