---
categories:
  - web
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez des métriques liées au cache, les requêtes d''origine, les codes de réponse, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/fastly/'
git_integration_title: fastly
has_logo: true
integration_title: Fastly
is_public: true
kind: integration
manifest_version: '1.0'
name: fastly
public_title: Intégration Datadog/Fastly
short_description: 'Surveillez des métriques liées au cache, les requêtes d''origine, les codes de réponse, et plus encore. more.'
version: '1.0'
---
{{< img src="integrations/fastly/fastlygraph.png" alt="Graphique Fastly" responsive="true" popup="true">}}

## Présentation

Connectez-vous à Fastly pour consulter les principales métriques Fastly (telles que la taille de l'en-tête et la couverture de cache) en contexte avec le reste de vos métriques Datadog.

## Implémentation
### Installation

Aucune étape d'installation requise.

### Configuration

#### Collecte de métriques

Créez un token d'API avec un accès en lecture seule sur la page de gestion des tokens de Fastly. Obtenez votre Service ID depuis le dashboard et saisissez-le dans le [carré d'intégration Fastly][1].

<div class="alert alert-info">
Le Service ID est un code alphanumérique, comme 5VqE6MOOy1QFJbgmCK41pY (cet exemple provient <a href="https://docs.fastly.com/api/auth">de ce site Web</a>).
</div>

Si vous utilisez plusieurs Service ID provenant d'un compte unique, saisissez un token d'API sur chaque ligne.

#### Collecte de logs

Configurez l'endpoint Syslog de façon à transmettre des logs Fastly à votre application Datadog.

##### Sélectionner l'endpoint de journalisation

1. Connectez-vous à l'interface Web de Fastly et cliquez sur **Configure link**.
2. Depuis le menu **Service**, sélectionnez le service approprié.
3. Cliquez sur le bouton **Configuration**, puis sélectionnez **Clone active**. La page Domains s'affiche.
4. Cliquez sur le lien **Logging**. La page des endpoints de journalisation s'affiche. Sélectionnez l'endpoint **Syslog**.

##### Configurer l'endpoint Syslog

1. Attribuez un nom au endpoint, p. ex. `Datadog`.
2. Configurez le format de log de façon à inclure **[le format de log Datadog/Fastly conseillé][2]** en précisant d'abord [votre clé d'API Datadog][3].

    ```
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

    Remarque : si vous ne placez pas la clé d'API Datadog avant le format de log Datadog/Fastly, vos logs n'apparaîtront pas dans Datadog. Consultez la [documentation Fastly][4] (en anglais) pour en savoir plus sur les variables de log.

3. Définissez **Syslog Address** sur `intake.logs.datadoghq.com`.
4. Définissez **Port** sur `10516`.
5. Définissez **TLS** sur `yes`.
6. Définissez **TLS Hostname** sur `intake.logs.datadoghq.com`.
7. Dans la section des options avancées, sélectionnez le **log line format** `Blank`.
8. Enfin, enregistrez l'endpoint et déployez le service. Patientez quelques secondes pour que [votre compte Datadog][5] reçoive les premiers logs.

## Données collectées

### Métriques
{{< get-metrics-from-git "fastly" >}}


### Événements

L'intégration Fastly n'inclut aucun événement.

### Checks de service

L'intégration Fastly n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://docs.datadoghq.com/resources/json/fastly_format.json
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}