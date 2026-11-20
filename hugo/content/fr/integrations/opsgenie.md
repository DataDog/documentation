---
categories:
- monitoring
- notification
dependencies: []
description: Utilisez OpsGenie comme canal de notification pour les alertes et les
  événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/opsgenie/
draft: false
further_reading:
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#opsgenie-integration
  tag: Blog
  text: Utiliser les intégrations avec le Service Catalog
git_integration_title: opsgenie
has_logo: true
integration_id: ''
integration_title: OpsGenie
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: opsgenie
public_title: Intégration Datadog/OpsGenie
short_description: Utilisez OpsGenie comme canal de notification pour les alertes
  et les événements Datadog.
version: '1.0'
---

## Présentation

Utilisez `@opsgenie` pour créer des alertes :

- En prenant un snapshot
- Lorsqu'une alerte de métrique est déclenchée

## Configuration

### Configuration

#### Créer une intégration Datadog dans OpsGenie

1. Connectez-vous à votre compte OpsGenie et accédez à la page des [intégrations OpsGenie][1].
2. Recherchez Datadog et cliquez sur le carré.
3. Choose the recipients of Datadog alerts in Opsgenie using the **Responders** field.
4. Obtenez votre clé d'API Datadog depuis la page [Integrations > APIs][2], puis saisissez-la.
5. Si vous utilisez le site européen de Datadog, cochez la case `Send to Datadog EU`.
6. Modifiez le nom de l'intégration si vous le souhaitez.
7. Enregistrez la configuration.
8. Copiez la clé et le nom en vue de les utiliser dans Datadog.
9. Pour ajouter d'autres intégrations Datadog sur OpsGenie, accédez à la page des [intégrations OpsGenie][1] et répétez les étapes ci-dessus.

#### Afficher les intégrations créées avec OpsGenie dans Datadog

1. Dans Datadog, sélectionnez le carré OpsGenie depuis la [page Integrations de votre compte][3].
2. Cliquez sur l'onglet Configuration de la boîte de dialogue qui apparaît.
3. Collez la clé associée à chaque intégration Datadog (créée dans OpsGenie) dans le champ **OpsGenie Integration Key**, puis saisissez le nom du service dans le champ **Service Name**.
   {{< img src="integrations/opsgenie/datadog-add-opsgenie-api-key.png" alt="Ajouter une clé OpsGenie dans Datadog" popup="true">}}

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

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.opsgenie.com/settings/integration/integration-list
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings
[4]: https://docs.datadoghq.com/fr/help/