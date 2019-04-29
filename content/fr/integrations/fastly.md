---
categories:
  - web
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

L'endpoint Syslog peut être utilisé pour transmettre des logs Fastly à votre application Datadog. 

##### Sélectionner l'endpoint de journalisation

* Connectez-vous à l'interface Web de Fastly et cliquez sur **Configure link**.
* Depuis le menu **Service**, sélectionnez le service approprié.
* Cliquez sur le bouton **Configuration**, puis sélectionnez **Clone active**. La page Domains s'affiche.
* Cliquez sur le lien **Logging**. La page des endpoints de journalisation s'affiche. Sélectionnez l'endpoint **Syslog**.

##### Configurer l'endpoint Syslog

* Attribuez un nom au endpoint, p. ex. `Datadog`.
* Pour tirer le meilleur parti de votre application Datadog, **utilisez [le format de logs Fastly conseillé][2]** en précisant d'abord [votre `<CLÉ_API>`][3] :

```
<CLÉ_API> <FORMAT_À_TÉLÉCHARGER_FASTLY>
```

Découvrez plus de détails sur les variables de log dans la [documentation Fastly][4].

* Définissez **Syslog Address** sur `intake.logs.datadoghq.com`.
* Définissez **Port** sur `10516`.
* Définissez **TLS** sur `yes`.
* Définissez **TLS Hostname** sur `intake.logs.datadoghq.com`.
* Copiez le [certificat TLS][5] dans la case **TLS CA Certificate**.
* Dans la section des options avancées, sélectionnez le **log line format** `Blank`.

Enfin, enregistrez l'endpoint et déployez le service. Patientez quelques secondes pour que [votre compte Datadog][6] reçoivent les premiers logs.

## Données collectées

### Métriques
{{< get-metrics-from-git "fastly" >}}


### Événements

L'intégration Fastly n'inclut aucun événement.

### Checks de service

L'intégration Fastly n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://docs.datadoghq.com/resources/json/fastly_format.json
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://docs.datadoghq.com/resources/crt/intake.logs.datadoghq.com.crt
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}