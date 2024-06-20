---
app_id: trek10-coverage-advisor
app_uuid: 2faacd70-a192-4a28-8b36-e55298d7b3b4
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: trek10.coverage.aws_metric_count
      metadata_path: metadata.csv
      prefix: trek10.coverage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: AWS Coverage Advisor par Trek10
  monitors:
    Trek10 AWS Coverage Advisor - New Unmonited Metric Available: assets/monitors/monitor_new.json
    Trek10 AWS Coverage Advisor - New Unmonitored Metric Discovered: assets/monitors/monitor_existing.json
author:
  homepage: https://www.trek10.com
  name: Trek10
  sales_email: signup-trek10-coverage-advisor@trek10.com
  support_email: trek10-coverage-advisor@trek10.com
  vendor_id: trek10
categories:
- marketplace
- aws
classifier_tags:
- Supported OS::Linux
- Supported OS::Mac OS
- Supported OS::Windows
- Category::Marketplace
- Category::AWS
- Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: trek10_coverage_advisor
integration_id: trek10-coverage-advisor
integration_title: AWS Coverage Advisor par Trek10
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: trek10_coverage_advisor
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: coverage-advisor
  short_description: Tarif fixe pour AWS Coverage Advisor par Trek10
  unit_price: 100
public_title: AWS Coverage Advisor par Trek10
short_description: Vérifie que vous surveillez les métriques AWS clés parmi plus de
  120 métriques différentes
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Vérifie que vous surveillez les métriques AWS clés parmi plus de 120 métriques
    différentes
  media:
  - caption: Dashboard Trek10
    image_url: images/1600px-900px_maindashview_trek10_DDG_image.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Coverage Advisor par Trek10
---



## Présentation
Coverage Advisor permet de surveiller les métriques AWS CloudWatch critiques dans votre compte Datadog. La solution s'appuie sur les nombreuses années d'expérience de Trek10 en matière d'opérations cloud avec Datadog et AWS pour mettre à jour en continu notre base de données de recommandations de surveillance. Grâce au rapport de couverture de la surveillance, au dashboard et aux alertes en cas de nouvelle recommandation, vous aurez l'assurance de toujours surveiller les métriques clés à mesure que votre infrastructure AWS évolue.

Une fois configurée, l'intégration copie un dashboard dans votre compte Datadog et affiche deux monitors d'événements sur la page des monitors recommandés de Datadog.

Le dashboard affiche un compte-rendu de la surveillance de votre compte Datadog et vous permet de générer un rapport énumérant les métriques surveillées et non surveillées. Le premier monitor d'événements vous avertit lorsque Trek10 détecte de nouvelles métriques AWS CloudWatch importantes sans monitors correspondants. Le deuxième monitor d'événements vous informe lorsqu'une nouvelle métrique CloudWatch pour un service AWS que vous utilisez est ajoutée à notre liste de recommandations.



*Vous avez une demande particulière concernant cet outil Datadog, vous recherchez des services gérés 24/7 pour AWS avec une plateforme basée sur Datadog, ou vous souhaitez faire appel à notre expertise relative à AWS ou Datadog ? Contactez notre [service commercial](https://trek10.com/contact) et laissez-nous vous proposer une solution adaptée à vos besoins*

### Métriques
* Toutes les 24 h, Trek10 transmet la métrique trek10.coverage.aws_metric_count, qui peut être utilisée pour vérifier le nombre de métriques qui sont actuellement ingérées dans votre compte Datadog mais qui n'ont pas de monitor correspondant. La métrique aura le tag `metric_type`, qui peut être filtré en fonction des valeurs `all_metrics`, `metrics_monitored` et `monitoring_recommendations`. 


### Événements
* Trek10 transmet également des événements lorsqu'un service non surveillé est détecté. L'événement renvoie au dashboard principal pour vous permettre de consulter les recommandations récentes et de générer un rapport.


### Monitors
* Trek10 fournit deux monitors pour recevoir une alerte en cas de service non surveillé.

### Dashboards
* Trek10 fournit un dashboard centralisé de haut niveau qui vous permet de consulter le nombre de métriques non surveillées et les recommandations récentes, de générer un rapport au format PDF énumérant toutes les recommandations, et de contrôler si l'intégration doit vérifier la présence de nouvelles recommandations pour votre compte toutes les 24 h.

### Utilisation
Cette intégration est principalement utilisée pour identifier rapidement les métriques AWS qui n'ont pas de monitor correspondant dans votre compte. Vous pouvez consulter le dashboard toutes les semaines et générer un rapport, ou configurer les monitors pour recevoir une alerte quotidienne si vous préférez.

### À propos du développeur
* Trek10 
* Portrait : Nous sommes de véritables gourous de la technologie et des créateurs dans l'âme. Utilisateurs de longue date d'AWS et de Datadog, nous avons aidé de nombreuses entreprises à adopter ces solutions en proposant des services professionnels et des formations. Nous faisons principalement appel à Datadog dans le cadre de nos services gérés pour AWS. Nous nous sommes basés sur un outil interne qui nous prévient lorsque nous devons ajouter des monitors aux comptes d'un de nos clients, puis nous l'avons modifié afin de le proposer au plus grand nombre.
* Site Web : trek10.com

## Assistance
* Une fois l'intégration configurée, le dashboard et les monitors seront clonés dans votre compte en utilisant la clé d'API spécifiée. Si vous renouvelez votre clé d'API, contactez-nous à l'adresse trek10-coverage-advisor@trek10.com. De même, en cas de problème ou de question à propos de l'intégration, ouvrez un ticket en envoyant un e-mail à l'adresse trek10-coverage-advisor@trek10.com (et en suivant les instructions indiquées).
* Pour toute question concernant les opérations, la surveillance et le développement pour AWS, n'hésitez pas à nous contacter aux coordonnées suivantes :
    * E-mail (support) : trek10-coverage-advisor@trek10.com
    * E-mail (autres questions) : info@trek10.com
    * Site Web : https://www.trek10.com/contact

---
 Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor/pricing) pour l'acheter.