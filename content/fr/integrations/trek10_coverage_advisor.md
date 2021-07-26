---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Trek10 AWS Coverage Advisor - New Unmonited Metric Available": assets/monitors/monitor_new.json
    "Trek10 AWS Coverage Advisor - New Unmonitored Metric Discovered": assets/monitors/monitor_existing.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.trek10.com"
  "name": Trek10
"categories":
- marketplace
- aws
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"description": "Coverage Advisor vous offre l'assurance que toutes vos métriques AWS CloudWatch critiques sont surveillées dans votre compte Datadog. Vous recevez une alerte dès que la solution détecte un nouveau service AWS à surveiller au fil des évolutions de votre infrastructure. À tout moment, vous avez la possibilité de générer un rapport énumérant les métriques dont la surveillance est recommandée, avec des explications ainsi que des informations sur leur utilisation. Ces services s'appuient sur les nombreuses années d'expérience de Trek10 en matière de surveillance des infrastructures cloud."
"display_name": "AWS Coverage Advisor par Trek10"
"draft": false
"git_integration_title": "trek10_coverage_advisor"
"guid": "785bbfd8-e95c-44ce-863f-29b0e092c6b0"
"integration_id": "trek10-coverage-advisor"
"integration_title": "AWS Coverage Advisor par Trek10"
"is_public": true
"kind": "integration"
"maintainer": "trek10-coverage-advisor@trek10.com"
"manifest_version": "1.0.0"
"metric_prefix": "trek10.coverage"
"metric_to_check": "trek10.coverage.aws_metric_count"
"name": "trek10_coverage_advisor"
"pricing":
- "billing_type": flat_fee
  "unit_price": !!int "100"
"public_title": "AWS Coverage Advisor par Trek10"
"short_description": "Vérifie que vous surveillez les métriques AWS clés parmi plus de 120 métriques différentes."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": signup-trek10-coverage-advisor@trek10.com
---



## Présentation
Coverage Advisor permet de surveiller les métriques AWS CloudWatch critiques dans votre compte Datadog. La solution s'appuie sur les nombreuses années d'expérience de Trek10 en matière d'opérations cloud avec Datadog et AWS pour mettre à jour en continu notre base de données de recommandations de surveillance. Grâce au rapport de couverture de la surveillance, au dashboard et aux alertes en cas de nouvelle recommandation, vous aurez l'assurance de toujours surveiller les métriques clés à mesure que votre infrastructure AWS évolue.

Une fois configurée, l'intégration copie un dashboard dans votre compte Datadog et affiche deux monitors d'événements sur la page des monitors recommandés de Datadog.

Le dashboard affiche un compte-rendu de la surveillance de votre compte Datadog et vous permet de générer un rapport énumérant les métriques surveillées et non surveillées. Le premier monitor d'événements vous avertit lorsque Trek10 détecte de nouvelles métriques AWS CloudWatch importantes sans monitors correspondants. Le deuxième monitor d'événements vous informe lorsqu'une nouvelle métrique CloudWatch pour un service AWS que vous utilisez est ajoutée à notre liste de recommandations.

{{< img src="marketplace/trek10_coverage_advisor/images/maindashview.png" alt="" >}}


*Vous avez une demande particulière concernant cet outil Datadog, vous recherchez des services gérés 24/7 pour AWS avec une plateforme basée sur Datadog, ou vous souhaitez faire appel à notre expertise relative à AWS ou Datadog ? Contactez notre [service commercial](trek10.com/contact) et laissez-nous vous proposer une solution adaptée à vos besoins*

### Métriques
* Toutes les 24 h, Trek10 transmet la métrique trek10.coverage.aws_metric_count, qui peut être utilisée pour vérifier le nombre de métriques qui sont actuellement ingérées dans votre compte Datadog mais qui n'ont pas de monitor correspondant. La métrique aura le tag `metric_type`, qui peut être filtré en fonction des valeurs `all_metrics`, `metrics_monitored` et `monitoring_recommendations`. 
{{< img src="marketplace/trek10_coverage_advisor/images/metric_image.png" alt="" >}}

### Événements
* Trek10 transmet également des événements lorsqu'un service non surveillé est détecté. L'événement renvoie au dashboard principal pour vous permettre de consulter les recommandations récentes et de générer un rapport.
{{< img src="marketplace/trek10_coverage_advisor/images/event_image.png" alt="" >}}

### Monitors
* Trek10 fournit deux monitors pour recevoir une alerte en cas de service non surveillé.

### Dashboards
* Trek10 fournit un dashboard centralisé de haut niveau qui vous permet de consulter le nombre de métriques non surveillées et les recommandations récentes, de générer un rapport au format PDF énumérant toutes les recommandations, et de contrôler si l'intégration doit vérifier la présence de nouvelles recommandations pour votre compte toutes les 24 h.


## Assistance
* Une fois l'intégration configurée, le dashboard et les monitors seront clonés dans votre compte en utilisant la clé d'API spécifiée. Si vous renouvelez votre clé d'API, contactez-nous à l'adresse trek10-coverage-advisor@trek10.com. De même, en cas de problème ou de question à propos de l'intégration, ouvrez un ticket en envoyant un e-mail à l'adresse trek10-coverage-advisor@trek10.com (et en suivant les instructions indiquées).
* Pour toute question concernant les opérations, la surveillance et le développement pour AWS, n'hésitez pas à nous contacter aux coordonnées suivantes :
    * E-mail (support) : trek10-coverage-advisor@trek10.com
    * E-mail (autres questions) : info@trek10.com
    * Site Web : https://www.trek10.com/contact

---
 Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor/pricing) pour l'acheter.






## Utilisation
Cette intégration est principalement utilisée pour identifier rapidement les métriques AWS qui n'ont pas de monitor correspondant dans votre compte. Vous pouvez consulter le dashboard toutes les semaines et générer un rapport, ou configurer les monitors pour recevoir une alerte quotidienne si vous préférez.

## À propos du développeur
* Trek10 
* Portrait : Nous sommes de véritables gourous de la technologie et des créateurs dans l'âme. Utilisateurs de longue date d'AWS et de Datadog, nous avons aidé de nombreuses entreprises à adopter ces solutions en proposant des services professionnels et des formations. Nous faisons principalement appel à Datadog dans le cadre de nos services gérés pour AWS. Nous nous sommes basés sur un outil interne qui nous prévient lorsque nous devons ajouter des monitors aux comptes d'un de nos clients, puis nous l'avons modifié afin de le proposer au plus grand nombre.
* Site Web : trek10.com

