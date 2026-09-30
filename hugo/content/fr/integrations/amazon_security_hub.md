---
categories:
  - cloud
  - aws
  - log collection
dependencies: []
description: "Ingérez des événements Amazon\_Security\_Hub sous la forme de logs."
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: "Amazon\_Security\_Hub"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_security_hub
public_title: "Intégration Datadog/Amazon\_Security\_Hub"
short_description: "Ingérez des événements Amazon\_Security\_Hub sous la forme de logs."
version: '1.0'
---
## Présentation

AWS Security Hub fournit une vue complète de l’état de sécurité de vos ressources AWS et vous aide à vérifier si votre environnement respecte les normes et meilleures pratiques de l'industrie en matière de sécurité.

Cette intégration vous permet de consulter tous vos logs Security Hub dans Datadog.

## Configuration

Datadog utilise AWS EventBridge pour transmettre les événements Security Hub à Datadog sous la forme de logs.

1. Accédez à [Amazon EventBridge][1].
2. Dans le volet Create a new rule, cliquez sur **Create rule**.
3. Dans le volet Name and description, saisissez un nom pour votre règle dans le champ Name et, si vous le souhaitez, une description de la règle dans le champ Description.
4. Dans le volet Define pattern, sélectionnez **Event pattern**, puis sélectionnez **Pre-defined pattern by service** pour créer un pattern d'événement.
5. Dans la liste des fournisseurs de services, sélectionnez **AWS**.
6. Dans la liste des noms de services, sélectionnez **SecurityHub**.
7. Dans la liste des types d'événements, sélectionnez **All Events**.
8. Dans le volet Select event bus, sélectionnez **AWS default event bus**.
9. Dans la liste Target du volet Select targets, sélectionnez **Lambda function**.
10. Sélectionnez le [Forwarder Datadog][2] pour envoyer des logs à Datadog.
11. Cliquez sur **Créer**.


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://aws.amazon.com/eventbridge/
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/forwarder/
[3]: https://docs.datadoghq.com/fr/help/