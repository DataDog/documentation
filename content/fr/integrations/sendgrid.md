---
categories:
- web
dependencies: []
description: Surveillez les statistiques SendGrid relatives à l'envoi et à l'engagement
  de vos e-mails avec Datadog.
doc_link: https://docs.datadoghq.com/integrations/sendgrid/
draft: false
git_integration_title: sendgrid
has_logo: true
integration_id: ''
integration_title: SendGrid
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: sendgrid
public_title: Datadog/SendGrid
short_description: Recueillez des métriques SendGrid.
team: web-integrations
version: '1.0'
---

## Présentation

Recueillez des métriques et des logs SendGrid relatifs à l'envoi et à l'engagement de vos e-mails.

## Configuration

### Générer une clé d'API SendGrid

1. Connectez-vous à votre [compte SendGrid][1].
2. Ouvrez le menu déroulant **Settings**.
3. Cliquez sur **API Keys**.
4. Cliquez sur **Create API Key** en haut à droite.
5. Indiquez dans le champ _API Key Name_ le nom de la clé d'API. Sélectionnez **Full Access** ou, pour restreindre l'accès, **Stats** - **Read Access** et **User Account** - **Read Access**.
6. Enregistrez la clé d'API dans un emplacement sécurisé. Vous aurez besoin de la clé d'API pour configurer l'intégration SendGrid dans l'interface Datadog.

### Configuration

#### Métriques
{{< get-metrics-from-git "sendgrid" >}}


### Logs

Les événements SendGrid relatifs à l'envoi et à l'engagement s'affichent sous la forme de logs provenant de la source `sendgrid`.

### Événements

L'intégration SendGrid n'inclut aucun événement.

### Checks de service

L'intégration SendGrid n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.sendgrid.com/
[2]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/sendgrid/sendgrid_metadata.csv
[4]: https://docs.datadoghq.com/fr/help