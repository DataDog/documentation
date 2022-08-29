---
further_reading:
- link: cloud_siem/default_rules
  tag: Documentation
  text: Explorer les règles de détection de logs par défaut
- link: /security_platform/cloud_siem/log_detection_rules
  tag: Documentation
  text: Suivez le guide de création de nouvelles règles Cloud SIEM
kind: documentation
title: Page Security Home
---

## Présentation

La page [Security Home][1] rassemble différentes informations utiles sur votre environnement Cloud SIEM. Accédez facilement aux logs analysés pour détecter les menaces, aux signaux générés par les règles de détection de logs [par défaut][2] ou [personnalisées][3] ainsi qu'aux menaces qui nécessitent votre attention et face auxquelles vous devez réagir. Consultez le statut des sources de journalisation et configurez de nouvelles sources depuis une interface unique.

{{< img src="security_platform/security_monitoring/security_home/cloud_siem_home.png" alt="La page d'accueil de Cloud SIEM avec le nombre de logs analysés, de signaux et de signaux importants/cruciaux, avec les sources de logs AWS et Azure" >}}

## Logs analysés

Accédez à une vue d'ensemble des logs analysés depuis toutes les sources afin d'effectuer des contrôles rapides, ou sélectionnez **Logs Analyzed** pour afficher la liste de vos logs analysés dans le [Log Explorer][4], afin d'étudier des données plus granulaires. Le Log Explorer vous permet d'appliquer des filtres en fonction de [facettes de log][5] ou d'[agréger vos logs][6] afin d'examiner plus en détail vos logs analysés.

## Signaux

Analysez le nombre de signaux générés ainsi que le nombre de règles les déclenchant, ou sélectionnez **Signals** pour appliquer un filtre basé sur des règles de détection de logs dans le [Signals Explorer][7].

## Détection des menaces

Grâce à la [détection des menaces en temps réel][8], si les critères d'une règle sont satisfaits, Datadog évalue la gravité de la menace et décide si une personne doit en être informée. Découvrez le nombre de menaces détectées dans l'ensemble des entités de votre environnement depuis la page Security Home. Sélectionnez **High/Critical Signals** pour afficher les entités malveillantes dans le Signals Explorer. Choisissez une entité pour analyser le signal généré, afin d'obtenir plus d'informations et de prendre des mesures correctives.

## Analyse des sources

À tout moment, si une source commence à générer plus de signaux ou à analyser plus fréquemment des logs, Datadog signale automatiquement ce pic dans le graphique de la source du tableau Sources Analyzed, afin de vous permettre d'identifier les menaces potentielles et les tendances.

Cliquez sur une source, puis sélectionnez **View generated signals** ou **View related logs** pour afficher plus de détails. Si le dashboard d'une intégration prête à l'emploi a été défini comme source, sélectionnez **View integration's dashboard** pour baser vos enquêtes sur ces informations.

Vous pouvez également configurer de nouvelles sources depuis ce tableau. Cliquez sur le bouton **Configure Source** pour configurer la collecte de logs pour une nouvelle source.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/homepage
[2]: /fr/security_platform/default_rules/#cat-cloud-siem
[3]: /fr/security_platform/cloud_siem/log_detection_rules
[4]: /fr/logs/explorer/
[5]: /fr/logs/explorer/facets/#overview
[6]: /fr/logs/explorer/group/
[7]: /fr/security_platform/explorer
[8]: https://www.datadoghq.com/blog/announcing-security-monitoring/#real-time-threat-detection