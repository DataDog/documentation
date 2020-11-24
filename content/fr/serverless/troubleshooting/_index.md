---
title: Dépannage de la surveillance sans serveur
kind: documentation
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Installer la surveillance sans serveur Node.js
  - link: serverless/installation/ruby
    tag: Documentation
    text: Installer la surveillance sans serveur Ruby
---
Si vous n'avez pas encore configuré la surveillance sans serveur, accédez à la page des [instructions d'installation][1]. Si vous venez d'installer l'intégration Lambda, vous devrez peut-être patienter quelques minutes avant de pouvoir consulter vos premières métriques.

Consultez les étapes de configuration et la configuration avancée du [Forwarder Datadog][2] et de la [couche Lambda Datadog][3].

Utilisez le tableau suivant pour dépanner les éventuels problèmes que vous pourriez rencontrer dans le cadre de la surveillance sans serveur :


| Fonctionnalité                       | Description |
| ----------------------------- |--------------------------------------------------|
| [Métriques Lambda][4]           | Métriques Lambda AWS extraites d'Amazon CloudWatch|
| [Métriques optimisées][5]         | Métriques Lambda améliorées en temps réel générées par Datadog|
| [Logs Lambda][6]              | Gestion et ingestion de logs à partir de vos fonctions Lambda|
| [Métriques custom Lambda][7]    | Ingestion de métriques custom à partir de vos fonctions Lambda|
| [APM Datadog][8]              | Tracing distribué via le traceur Datadog ou AWS X-Ray|

Si vous n'avez toujours pas résolu votre problème, vous pouvez contacter l'[équipe d'assistance Datadog][9].

[1]: /fr/serverless/#getting-started
[2]: /fr/serverless/forwarder
[3]: /fr/serverless/installation/
[4]: /fr/integrations/amazon_lambda/#metric-collection
[5]: /fr/integrations/amazon_lambda/#real-time-enhanced-lambda-metrics
[6]: /fr/integrations/amazon_lambda/#log-collection
[7]: /fr/integrations/amazon_lambda/#custom-metrics
[8]: /fr/tracing/serverless_functions/
[9]: /fr/help/