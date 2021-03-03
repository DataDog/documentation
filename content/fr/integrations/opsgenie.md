---
categories:
  - monitoring
  - notification
ddtype: crawler
dependencies: []
description: Utilisez OpsGenie comme canal de notification pour les alertes et les événements Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/opsgenie/'
draft: false
git_integration_title: opsgenie
has_logo: true
integration_title: OpsGenie
is_public: true
kind: integration
manifest_version: '1.0'
name: opsgenie
public_title: Intégration Datadog/OpsGenie
short_description: Utilisez OpsGenie comme canal de notification pour les alertes et les événements Datadog.
version: '1.0'
---
## Présentation

Utilisez `@opsgenie` pour créer des alertes :

- Depuis votre flux d'événements
- En prenant un snapshot
- Lorsqu'une alerte de métrique est déclenchée

## Configuration

### Configuration

#### Créer une intégration Datadog dans OpsGenie

1. Connectez-vous à votre compte OpsGenie et accédez à la page des [intégrations OpsGenie][1].
2. Recherchez Datadog (voir l'image ci-dessous) et cliquez sur le carré.
   {{< img src="integrations/opsgenie/opsgenie-int-index.png" alt="Index des intégrations OpsGenie" popup="true">}}

3. Obtenez votre clé d'API Datadog depuis la page [Integrations > APIs][2], puis saisissez-la dans le champ dédié.
4. Choisissez les destinataires souhaités dans OpsGenie, puis configurez vos filtres.
5. Modifiez le nom de l'intégration si vous le souhaitez.
6. Enregistrez la configuration.
7. Copiez la clé et le nom en vue de les utiliser dans Datadog.
   {{< img src="integrations/opsgenie/opsgenie-add-api-key.png" alt="Ajouter la clé d'API dans OpsGenie" popup="true">}}
8. Pour ajouter d'autres intégrations Datadog sur OpsGenie, accédez à la page des [intégrations OpsGenie][1] et répétez les étapes ci-dessus.

#### Afficher les intégrations créées avec OpsGenie dans Datadog

1. Dans Datadog, sélectionnez le carré OpsGenie depuis la [page Integrations de votre compte][3].
2. Cliquez sur l'onglet Configuration de la boîte de dialogue qui apparaît.
3. Collez la clé associée à chaque intégration Datadog (créée dans OpsGenie) dans le champ **Datadog Integration Key**, puis saisissez le nom de l'intégration dans le champ **Datadog Integration Name**.
   {{< img src="integrations/opsgenie/datadog-add-opsgenie-key.png" alt="Ajouter une clé OpsGenie dans Datadog" popup="true">}}

## Données collectées

### Métriques

L'intégration OpsGenie n'inclut aucune métrique.

### Événements

L'intégration OpsGenie n'inclut aucun événement.

### Checks de service

L'intégration OpsGenie n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

### Base de connaissances

#### Comment utiliser Datadog et OpsGenie conjointement

##### Créer des alertes OpsGenie, les acknowledge et les fermer depuis Datadog

Pour créer une alerte OpsGenie, ajoutez @opsgenie-nom_service ou @opsgenie dans le champ _Say What's Happening_, à la section 5 de la page de modification d'une alerte de métrique. Lorsque cette alerte se déclenchera dans Datadog, un message sera envoyé aux destinataires de votre service OpsGenie.

Pour acknowledge une alerte OpsGenie ou la fermer depuis Datadog, utilisez les mentions @opsgenie-acknowledge et @opsgenie-close dans le champ Comments d'un événement OpsGenie dans Datadog.
{{< img src="integrations/opsgenie/dd_ack_og_alert.png" alt="Confirmer la réception d'une alerte OG depuis Datadog" popup="true">}}

##### Recevoir des alertes Datadog créées par OpsGenie, les acknowledge et les fermer

Configurez une alerte dans OpsGenie. Lorsque cette alerte se déclenchera, un événement sera créé dans Datadog. Les champs Tags et Description de l'alerte OpsGenie seront transmis à Datadog.

{{< img src="integrations/opsgenie/og_create_alert_dd_updated.png" alt="Créer une alerte OG et mettre à jour DD" popup="true">}}

Acknowledge vos alertes OpsGenie et fermez-les depuis OpsGenie. L'événement associé sera alors mis à jour dans Datadog avec le nom d'utilisateur de la personne ayant fermé l'alerte.

{{< img src="integrations/opsgenie/og_closed_dd_updated.png" alt="Fermer une alerte OG et mettre à jour DD" >}}

[1]: https://www.opsgenie.com/integrations
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.com/account/settings
[4]: https://docs.datadoghq.com/fr/help/