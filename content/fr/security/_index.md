---
title: Catégories de données
kind: documentation
further_reading:
  - link: /security/tracing/
    tag: Documentation
    text: Sécurité de l'APM
  - link: /security/logs/
    tag: Documentation
    text: Sécurité des logs
  - link: /security/agent/
    tag: Documentation
    text: Sécurité de l'Agent
  - link: /security/other/
    tag: Documentation
    text: Considérations de sécurité supplémentaires
---
<div class="alert alert-info">Cette page est consacrée à la sécurité de Datadog ; si vous recherchez le produit Security Monitoring, consultez la section <a href="/security_monitoring" target="_blank">Security Monitoring</a>.</div>

Datadog permet aux clients d'envoyer des données de différentes façons, par exemple, via l'[Agent][1], l'[API publique][2] et les [intégrations][3]. Cet article décrit les principales catégories de données que les clients peuvent transmettre à Datadog pour l'utilisation prévue de ce produit, et met en avant des scénarios dans lesquels les données transmises peuvent contenir des données personnelles. Consultez notre [page relative à la sécurité][4] et notre [politique de confidentialité][5] pour en savoir plus.

## Métadonnées

Les métadonnées regroupent principalement les [tags][6], qui respectent généralement le format `key:value` (par exemple, `env:prod`). Les métadonnées permettent de filtrer et de regrouper des données client comme les métriques d'infrastructures, l'APM et les logs. Les métadonnées ne doivent pas contenir de données personnelles pour l'utilisation prévue du service.

## Métriques d'infrastructures

Les métriques d'infrastructures sont des séries temporelles représentant des noms de métriques donnés. Associées aux métadonnées, elles permettent de remplir des graphiques. Les noms de métriques et les séries temporelles ne doivent pas contenir de données personnelles pour l'utilisation prévue du service.

## APM

Les données de l'APM se divisent en quatre niveaux de granularité : les services, les ressources, les traces et les spans. Consultez la section [Débuter avec l'APM][7] pour en savoir plus sur chaque niveau. Les services et les ressources ne doivent pas contenir de données personnelles pour l'utilisation prévue du service. Si besoin, les clients doivent tirer parti de certaines fonctionnalités de l'Agent pour restreindre les données personnelles avant de transmettre les traces et les spans à Datadog. Consultez la page [Sécurité de l'APM][8] pour en savoir plus.

## Logs

Les logs sont des messages recueillis [par l'Agent ou par des intégrations][9] et associés à des métadonnées facultatives. Les fichiers de log sont des enregistrements immuables d'événements informatiques concernant un système d'exploitation, une application ou des activités utilisateur, qui constituent une piste d'audit. Ces enregistrements peuvent être utilisés pour aider à détecter les violations de sécurité, les problèmes de performance et les défauts d'une application. Si besoin, les clients peuvent tirer parti de certaines fonctionnalités de l'Agent pour retirer les données personnelles avant de transmettre les logs à Datadog. Consultez la page [Sécurité des logs][10] pour en savoir plus.

## Processus

Les [processus][11] sont des métriques et des données du système de fichiers `proc`, qui agit en tant qu'interface sur les structures de données internes dans le kernel. Les données de processus peuvent contenir la commande du processus (y compris son chemin et ses arguments), le nom d'utilisateur associé, l'ID du processus et son parent, l'état du processus et le répertoire actif. Elles peuvent également être associées à des métadonnées facultatives. Les processus ne doivent pas contenir de données personnelles pour l'utilisation prévue du service. Consultez la page [Considérations de sécurité supplémentaires][12] pour en savoir plus.

## Monitors et alertes

Les [monitors et les alertes][13] sont définis par les clients dans le but de surveiller l'état de leur infrastructure et de leurs applications à partir des données transmises à Datadog. Ils sont associés à des métadonnées facultatives. Un monitor peut déclencher une alerte sous certaines conditions, comme lorsqu'une métrique atteint un certain seuil, afin d'effectuer un suivi des modifications critiques et d'informer les membres de l'équipe comme il se doit. Les monitors ne doivent pas contenir de données personnelles pour l'utilisation prévue du service.

## Événements et commentaires

Les [événements][14] sont regroupés à partir de plusieurs sources au sein d'un flux d'événements consolidé notamment les monitors déclenchés, les événements transmis par des intégrations, les événements transmis par l'application, les commentaires et annotations d'utilisateur ainsi que les événements et commentaires transmis via l'API. Les événements et les commentaires sont associés à des métadonnées facultatives. Ils ne doivent pas contenir de données personnelles pour l'utilisation prévue du service.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/api/
[3]: /fr/integrations/
[4]: https://www.datadoghq.com/security
[5]: https://www.datadoghq.com/legal/privacy
[6]: /fr/getting_started/tagging/
[7]: /fr/tracing/visualization/
[8]: /fr/security/tracing/
[9]: /fr/logs/log_collection/
[10]: /fr/security/logs/
[11]: /fr/infrastructure/process/
[12]: /fr/security/other/
[13]: /fr/monitors/
[14]: /fr/events/