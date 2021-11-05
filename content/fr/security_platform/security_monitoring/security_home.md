---
title: Page Security Home
kind: documentation
further_reading:
  - link: security_monitoring/default_rules
    tag: Documentation
    text: Explorer les règles de détection de logs par défaut
  - link: /security_platform/security_monitoring/log_detection_rules
    tag: Documentation
    text: Suivez le guide de création de nouvelles règles Security Monitoring
---
## Présentation

La page [Security Home][1] rassemble différentes informations utiles sur votre environnement de surveillance de la sécurité. Accédez facilement aux logs analysés pour détecter les menaces, aux signaux générés par les règles de détection de logs [par défaut][2] ou [personnalisées][3] ainsi qu'aux menaces qui nécessitent votre attention et face auxquelles vous devez réagir. Consultez le statut des sources de journalisation et configurez de nouvelles sources depuis une interface unique.

{{< img src="security_platform/security_monitoring/security_home/overview.png" alt="Security Home" width="75%">}}

## Logs analysés

Accédez à une vue d'ensemble des logs analysés depuis toutes les sources afin d'effectuer des contrôles rapides, ou sélectionnez **Logs Analyzed** pour afficher la liste de vos logs analysés dans le [Log Explorer][2], afin d'étudier des données plus granulaires. Le Log Explorer vous permet d'appliquer des filtres en fonction de [facettes de log][3] ou d'[agréger vos logs][4] afin d'examiner plus en détail vos logs analysés.

## Signaux générés

Analysez le nombre de signaux générés ainsi que la quantité de règles les déclenchant, ou sélectionnez **Signals Generated** pour appliquer un filtre basé sur des règles de détection de logs dans le [Signals Explorer][5].

Depuis le Signals Explorer, cliquez sur une règle ayant généré un signal pour étudier davantage ce signal. Accédez à l'onglet **Message** pour découvrir comment [trier le signal généré et prendre des mesures][6], ou cliquez sur l'un des attributs d'événement répertoriés en haut du volet ou dans l'onglet **Event Attributs** pour [filtrer les signaux en fonction d'attributs][6].

## Détection des menaces

Grâce à la [détection des menaces en temps réel][7], si les critères d'une règle sont satisfaits, Datadog évalue la gravité de la menace et décide si une personne doit en être informée. Découvrez le nombre de menaces détectées dans l'ensemble des entités de votre environnement depuis la page Security Home. Sélectionnez **Threats Detected** pour afficher les entités malveillantes dans le Signals Explorer. Choisissez une entité pour découvrir le signal généré, afin d'obtenir plus d'informations et de prendre des mesures correctives.

## Analyse des sources

À tout moment, si une source commence à générer plus de signaux ou à analyser plus fréquemment des logs, Datadog signale automatiquement ce pic dans le graphique de la source du tableau Sources Analyzed, afin de vous permettre d'identifier les menaces potentielles et les tendances.

Cliquez sur une barre du graphique ou sur des données du tableau et sélectionnez **View generated signals** ou **View generated logs** pour afficher plus de détails.

Vous pouvez également configurer de nouvelles sources depuis ce tableau. Cliquez sur le bouton **Configure Source** pour configurer la collecte de logs pour une nouvelle source.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/homepage
[2]: /fr/security_platform/default_rules/
[3]: /fr/security_platform/security_monitoring/log_detection_rules
[3]: /fr/logs/explorer/
[3]: /fr/logs/explorer/facets/#overview
[4]: /fr/logs/explorer/#aggregate-and-measure
[5]: /fr/security_platform/explorer
[6]: /fr/security_platform/explorer#inspect-a-security-signal
[7]: https://www.datadoghq.com/blog/announcing-security-monitoring/#real-time-threat-detection