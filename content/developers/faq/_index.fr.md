---
title: FAQ Développeur
kind: faq
private: true
---

## Général

* [Comment supprimer le tag `host` lors de la soumission de métriques via dogstatsD][1]
* [Que font les notifications @ dans Datadog?][2]
* [Quelles sont les meilleures pratiques recommandées pour nommer les métriques et les tags?][3]

## Métriques

* [Pourquoi ma métrique de type counter affiche-t-elle des valeurs décimales?][4]
* [Caractéristiques des histogrammes de Datadog.][5]
* [4]Envoyer de métriques via PowerShell.][6]
* [Exemples Powershell pour l'API][7]

## DogStatsD

* [Comment puis-je soumettre un check de status custom?][8]
* [Explication du paramètre (dog)statsd sample_rate.][9]

* [Réduire la fréquence de soumission][10]

## API, bibliothèques et contributions de la communauté

### API

* [Requêter la liste d'infrastructure avec l'API][11]
* [Utiliser l'intégration Webhook pour créer une carte trello][12]
* [Utilisation de Postman avec les APIs Datadog][13]
* [Utiliser l'API de Datadog avec l'intégration Webhooks][14]
* [Dogshell: utiliser l'API de Datadog à partir du Terminal/Shell][15]
* [Requêter les données dans un fichier texte, étape par étape][16]
* [Comment publier des événements AppDynamics sur Datadog][17]
* [Je reçois un code d'état 202 mais je ne vois pas les données][18]
* [Data aggregation with DogStatsD/Threadstats][19]
* [Existe-t-il une alternative à DogStatsD et à l'API pour soumettre des métriques? Threadstats][20]
* [Je veux que mon application soit déployée dans un conteneur via ElasticBeanstalk pour parler à DogStatsD][21]
* [Puis-je appeler des scripts et générer des événements à partir de leurs résultats?][22]

### Bibliothèques et contributions de la communauté

* [OmniOS (et éventuellement OpenIndiana / Nexenta): installez à partir de la source en modifiant le script d'installation de l'Agent][23]
* [Est-il possible de s'intégrer avec ThousandEyes?][24]
* [Déployer l'agent sur RaspberryPI][25]
* [Comment monitorer des logs avec Loggly Live Tail et Datadog][26]
* [Monitoring Akka][27]
* [Script Hubot - Demander des snapshots dans le chat en utilisant l'API Datadog][28]
* [Comment puis-je collecter des métriques depuis Heroku avec Datadog?][29]

[1]: /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd
[2]: /developers/faq/what-do-notifications-do-in-datadog
[3]: /developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
[4]: /developers/faq/why-is-my-counter-metric-showing-decimal-values
[5]: /developers/faq/characteristics-of-datadog-histograms
[6]: /developers/faq/submitting-metrics-via-powershell
[7]: /developers/faq/powershell-api-examples
[8]: /developers/faq/how-can-i-submit-a-custom-status-check
[9]: /developers/faq/dog-statsd-sample-rate-parameter-explained
[10]: /developers/faq/reduce-submission-rate
[11]: /developers/faq/query-the-infrastructure-list-via-the-api
[12]: /developers/faq/use-our-webhook-integration-to-create-a-trello-card
[13]: /developers/faq/using-postman-with-datadog-apis
[14]: /developers/faq/calling-on-datadog-s-api-with-the-webhooks-integration
[15]: /developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
[16]: /developers/faq/query-data-to-a-text-file-step-by-step
[17]: /developers/faq/how-to-post-appdynamics-events-to-datadog
[18]: /developers/faq/i-m-receiving-a-202-but-not-seeing-data
[19]: /developers/faq/data-aggregation-with-dogstatsd-threadstats
[20]: /developers/faq/is-there-an-alternative-to-dogstatsd-and-the-api-to-submit-metrics-threadstats
[21]: /developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd
[22]: /developers/faq/can-i-call-scripts-and-generate-events-from-their-results
[23]: /developers/faq/omnios-and-possibly-smartos-openindiana-nexenta-install-from-source-by-tweaking-the-agent-install-script
[24]: /developers/faq/is-it-possible-to-integrate-with-thousandeyes
[25]: /developers/faq/deploying-the-agent-on-raspberrypi
[26]: /developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
[27]: /developers/faq/monitoring-akka
[28]: /developers/faq/hubot-script-request-snapshots-in-chat-using-the-datadog-api
[29]: /developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
