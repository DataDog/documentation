---
categories:
- web
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques liées au cache, les requêtes d'origine, les
  codes de réponse, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/fastly/
draft: false
git_integration_title: fastly
has_logo: true
integration_id: fastly
integration_title: Fastly
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  '[Fastly] 5xx Errors higher than usual for service: {{service.name}}': assets/monitors/rec_monitor_5xx_errors.json
  '[Fastly] Abnormal bandwidth being sent for service: {{service.name}}': assets/monitors/rec_monitor_bandwidth.json
  '[Fastly] High volume of requests triggering a Web Application Firewall rule on service: {{service.name}}': assets/monitors/waf_rules.json
  '[Fastly] Low Hit Ratio for service: {{service.name}}': assets/monitors/rec_monitor_hit_ratio.json
name: fastly
public_title: Intégration Datadog/Fastly
short_description: Surveillez des métriques liées au cache, les requêtes d'origine,
  les codes de réponse, et plus encore.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/fastly/fastlygraph.png" alt="Graphique Fastly" popup="true">}}

## Présentation

Connectez-vous à Fastly pour consulter les principales métriques Fastly (telles que la taille de l'en-tête et la couverture de cache) en contexte avec le reste de vos métriques Datadog.

## Configuration

### Installation

Aucune étape d'installation requise.

### Configuration

#### Collecte de métriques

Créez un token d'API avec un accès en lecture seule sur la page de gestion des tokens de Fastly. Obtenez votre Service ID depuis le dashboard et saisissez-le dans le [carré d'intégration Fastly][1].

<div class="alert alert-info">
Le Service ID est un code alphanumérique, comme <code>5VqE6MOOy1QFJbgmCK41pY</code> (cet exemple provient de la <a href="https://docs.fastly.com/api/auth">documentation sur l'API Fastly</a>, disponible en anglais).
</div>

Si vous utilisez plusieurs Service ID provenant d'un compte unique, saisissez un token d'API sur chaque ligne.

#### Collecte de logs

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Configurez l'endpoint Datadog de façon à transmettre les logs Fastly à Datadog. Vous pouvez choisir l'endpoint `Datadog` ou `Datadog (via Syslog)`. Il est conseillé d'utiliser l'endpoint `Datadog` pour une transmission plus fiable des logs via Syslog.

##### Sélectionner l'endpoint de journalisation

1. Connectez-vous à l'interface Web de Fastly et cliquez sur **Configure link**.
2. Depuis le menu **Service**, sélectionnez le service approprié.
3. Cliquez sur le bouton **Configuration**, puis sélectionnez **Clone active**. La page Domains s'affiche.
4. Cliquez sur le lien **Logging**. La page des endpoints de journalisation s'affiche. Cliquez sur **Create Endpoint** sous **Datadog** ou sous les options **Datadog (via Syslog)**.

##### Configurer l'endpoint Datadog (recommandé)

1. Attribuez un nom à l'endpoint, par exemple `Datadog`.
2. Configurez le format de log. Par défaut, le [format de log Datadog/Fastly][2] recommandé est déjà fourni et peut être personnalisé.
3. Sélectionnez la même région que celle de votre compte Datadog : {{< region-param key="dd_site_name" code="true" >}}.
4. Ajoutez votre [clé d'API Datadog][3].
5. Cliquez sur **Create** en bas.
6. Cliquez sur **Activate** en haut à droite pour activer la nouvelle configuration. Patientez quelques minutes pour que votre compte commence à recevoir des logs.

##### Configurer l'endpoint Syslog

1. Attribuez un nom à l'endpoint, par exemple `Datadog`.
2. Configurez le format de log de façon à inclure [le format de log Datadog/Fastly][2] recommandé, en précisant d'abord [votre clé d'API Datadog][3].

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

    **Remarque** : votre clé d'API Datadog DOIT être placée avant le format de log Datadog/Fastly, sans quoi vos logs ne s'afficheront pas dans Datadog. Consultez la section [Variables utiles à enregistrer][4] (en anglais) pour en savoir plus.

3. Définissez **Syslog Address** sur {{< region-param key="web_integrations_endpoint" code="true" >}}.
4. Définissez **Port** sur {{< region-param key="web_integrations_port" code="true" >}}.
5. Définissez **TLS** sur `yes`.
6. Définissez **TLS Hostname** sur {{< region-param key="web_integrations_endpoint" code="true" >}}.
7. Dans la section des options avancées, sélectionnez le **log line format** `Blank`.
8. Enfin, enregistrez l'endpoint et déployez le service. Consultez ensuite les logs dans le [Log Explorer Datadog][5].

[2]: https://docs.datadoghq.com/resources/json/fastly_format.json
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs

{{< /site-region >}}

## Données collectées

### Métriques
{{< get-metrics-from-git "fastly" >}}


### Événements

L'intégration Fastly n'inclut aucun événement.

### Checks de service

L'intégration Fastly n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/