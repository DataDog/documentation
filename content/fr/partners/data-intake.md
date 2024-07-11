---
description: Commencez à transmettre vos données à Datadog et découvrez les exigences
  que doivent respecter vos environnements et ceux de vos clients.
private: true
title: Ingestion de données
---

Maintenant que vous avez tout préparé, il est temps de commencer à transmettre vos données à Datadog.

L'objectif initial de cette phase est de rassembler suffisamment de données pour générer immédiatement de la valeur ajoutée, aussi bien pour vous que pour vos clients. Ce processus doit toutefois s'inscrire sur le long terme afin de tenir compte en permanence des évolutions de votre environnement. Posez-vous régulièrement les questions suivantes :
- Une nouvelle technologie a-t-elle été déployée dans votre environnement ou celui de vos clients ?
- Un nouveau processus a-t-il été mis en place ?
- La plateforme Datadog propose-t-elle une nouvelle fonctionnalité dont vous pouvez tirer parti ?

En répondant régulièrement à ces questions, vous vous assurerez que toutes les données de télémétrie nécessaires sont ingérées dans Datadog.

## Intégrations

Les intégrations sont idéales pour offrir immédiatement de la valeur ajoutée à vos clients. Datadog propose {{< translate key="integration_count" >}} intégrations qui permettent de recueillir des métriques et des logs depuis un large éventail de technologies.

Il existe trois grandes catégories d'intégrations :
- Intégrations de services cloud
- Agent Datadog et intégrations basées sur l'Agent
- Intégrations basées sur des API/bibliothèques et checks custom

Pour en savoir plus sur les différents types d'intégrations, consultez [Présentation des intégrations][1].

## Intégrations de services cloud

Les intégrations basées sur un service cloud ou un « crawler » utilisent une connexion authentifiée pour récupérer des informations sur l'infrastructure, des métriques, des logs et des événements depuis un service cloud via une API.

La configuration d'une intégration de service cloud ne prend généralement que quelques minutes, et les métriques et événements ingérés par Datadog génèrent immédiatement de la valeur ajoutée.

**Remarque** : les intégrations de services cloud peuvent générer de vastes quantités de données, ce qui peut affecter votre facture Datadog et celle du fournisseur de cloud.

Il convient de noter que dans la plupart des cas, l'utilisation d'une intégration de service cloud n'est pas suffisante pour bénéficier d'une visibilité complète sur l'infrastructure et notamment sur les applications qui s'exécutent dans ces environnements. Datadog vous recommande de tirer parti de l'ensemble des méthodes de collecte de données, et pas seulement des intégrations de services cloud.

Pour en savoir plus sur la surveillance des environnements cloud, consultez les ressources suivantes :
- [Surveillance du cloud][2] (eBook)
- [Présentation de la surveillance du cloud AWS][3] (Blog)
- [Présentation de la surveillance du cloud Google][4] (Blog)
- [Présentation de la surveillance du cloud Azure][3] (Blog)

## Agent Datadog et intégrations basées sur l'Agent

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts et recueille des événements et des métriques pour ensuite les envoyer à Datadog. L'Agent est disponible pour toutes les plateformes couramment utilisées. Bien que le logiciel par défaut soit en mesure de recueillir diverses métriques à propos du host sur lequel il est exécuté (notamment des métriques relatives au processeur, à la mémoire, au disque et au réseau), la véritable force de l'Agent réside dans ses intégrations.

Les intégrations basées sur l'Agent permettent au logiciel de recueillir des métriques, des logs, des traces et des événements à partir des applications et des technologies exécutées soit directement sur le host, soit au sein des conteneurs exécutés sur le host.

Pour en savoir plus sur les intégrations et l'Agent Datadog, consultez les ressources suivantes :
- [Liste des intégrations Datadog][6]
- [L'Agent Datadog][7]
- [Débuter avec l'Agent][8]

## Intégrations basées sur des API/bibliothèques et checks custom

Datadog est une plateforme scalable et évolutive qui offre plusieurs API et SDK pour étendre ses capacités dans les situations où :
- L'Agent ne peut pas être installé en raison de restrictions de sécurité ou autres, par exemple sur les appareils IoT
- L'Agent Datadog ou ses intégrations ne sont pas en mesure de couvrir une technologie ou une exigence spécifique

Dans ces cas de figure, vous avez la possibilité d'utiliser des API pour capturer les données de télémétrie qui vous intéressent et les transférer vers la plateforme d'observabilité pour vos clients.

En tant que fournisseur de service, il existe trois catégories d'API susceptibles de vous intéresser :
- API publiques pour l'ingestion de données
- Checks custom
- API locales pour l'ingestion de données sur l'Agent

### API publiques pour l'ingestion de données

Lorsqu'il n'est pas possible ou pas souhaitable d'utiliser l'Agent ou les intégrations de service cloud, l'ingestion des données peut être effectuée à l'aide des API suivantes :

- Les logs peuvent être transmis directement à l'[endpoint d'ingestion des logs][9] de Datadog.
- Les métriques peuvent être transmises directement à l'[API des métriques][10] de Datadog.
- Les événements peuvent être transmis directement à l'[API des événements][11] de Datadog.
- Les traces peuvent être transmises directement à l'[API des traces/spans][10] de Datadog.

### Checks custom

Bien que Datadog offre {{< translate key="integration_count" >}} intégrations, il est possible que votre client exécute une application personnalisée qui n'est couverte par aucune des intégrations existantes. Pour surveiller une telle application, votre client peut utiliser l'Agent pour exécuter des checks custom.

Pour en savoir plus, consultez la section [Checks custom][13].

### API locales pour l'ingestion de données sur l'Agent

L'Agent Datadog est fourni avec DogStatsD, un service d'agrégation de métriques, qui accepte les données via UDP. DogStatsD est une excellente alternative aux checks custom si ces derniers ne répondent pas à vos besoins et qu'il n'existe aucune intégration pour l'application. Par exemple, vous pouvez utiliser DogStatsD pour recueillir des événements et des métriques à partir d'une tâche cron, pour laquelle il n'existe probablement aucun fichier de log.

Vous pouvez utiliser les endpoints DogStatsD ou tirer parti d'une bibliothèque client Datadog pour envoyer vos métriques et événements via DogStatsD.

Pour en savoir plus, consultez les ressources suivantes :
- [Envoyer des événements][14]
- [Envoyer des métriques custom][15]
- [Bibliothèques][16]
- [Références sur les API][17]

## Stratégie de tagging

Il est essentiel d'adopter une bonne stratégie de tagging pour exploiter tout le potentiel des fonctionnalités de Datadog.

Les tags sont des étiquettes associées à vos données qui vous permettent de filtrer, regrouper et mettre en corrélation vos données dans Datadog. En appliquant des tags en fonction des différents types de données de télémétrie dans Datadog, vous pourrez mettre en corrélation vos métriques, traces et logs et effectuer des actions sur ces derniers. Diverses clés de tag réservées sont proposées à cette fin.

Pour tirer le meilleur parti de Datadog et optimiser la valeur ajoutée proposée à vos clients, il convient de mettre en place une bonne stratégie de tagging dès le départ.

Lorsque vous réfléchissez aux tags à appliquer, assurez-vous de tenir compte des facteurs suivants :
- **Technologie** : permet de comparer l'utilisation d'une même technologie d'une équipe ou d'un client à l'autre.
- **Environnement** : permet de comparer les performances de vos environnements de test, de production, etc.
- **Emplacement** : permet d'analyser les problèmes qui concernent un centre de données ou une zone de disponibilité d'un fournisseur de services cloud spécifique.
- **Service métier** : permet de filtrer les composants clés d'un service métier, quelle que soit la technologie utilisée.
- **Rôle** : permet de comprendre le rôle que joue une entité dans un service métier.
- **Responsabilité** : permet à l'équipe responsable de filtrer ses propres ressources, et permet aux autres utilisateurs d'identifier l'équipe en charge d'un certain service.

Pour optimiser votre stratégie et mettre tous les chances de votre côté, consultez [Débuter avec les tags][18].

Pour en savoir plus sur les tags et la stratégie de tagging, consultez les ressources suivantes :
- [Bonnes pratiques en matière de tagging pour votre infrastructure et vos applications][19] (Blog)
- [Recommandations relatives aux tags][20] (Training)
- [Tagging de service unifié][21]
- [Extraction de tags dans Kubernetes][22]
- [Gérer les tags dans AWS][23] (documentation AWS)
- [Tagging de fonctions sans serveur][24]
- [Tagging de live containers][25]

## Déploiement de l'Agent

Voici les phases clés de déploiement de l'Agent :
- Prérequis avant le déploiement de l'Agent
- Déploiement initial de l'Agent dans une infrastructure existante
- Provisionnement d'une nouvelle infrastructure
- Surveillance des processus de provisionnement continu

### Prérequis avant le déploiement de l'Agent

Les prérequis à respecter pour l'Agent dépendent de la plateforme et du système d'exploitation utilisés. Consultez la [documentation officielle de l'Agent][7] pour prendre connaissance de ces exigences.

Quelle que soit la plateforme utilisée, le principal prérequis pour utiliser l'Agent est la présence d'une connectivité réseau. Le trafic est toujours généré par l'Agent et envoyé vers Datadog. Aucune session n'est jamais initiée par Datadog vers l'Agent. Sauf dans de rares cas, la connectivité entrante (limitée par les pare-feu locaux) n'est pas un élément à prendre en compte pour le déploiement de l'Agent.

Pour fonctionner correctement, l'Agent doit pouvoir envoyer du trafic au service Datadog via SSL sur le port 443/tcp. Pour connaître la liste complète des ports utilisés par l'Agent, consultez [Trafic réseau][26].

Il arrive que certains endpoints propres à une version spécifique de l'Agent entraînent des problèmes de maintenance ; dans ce cas, Datadog peut mettre à disposition un endpoint compatible avec n'importe quelle version. Si vous avez besoin d'un tel endpoint, contactez l'assistance Datadog.

#### Utiliser un proxy pour l'Agent

Il est souvent impossible ou déconseillé d'ouvrir une connexion directe entre l'Agent et Datadog. Pour assurer la connectivité entre les deux, Datadog propose différents moyens de faire passer le trafic de l'Agent par un proxy.

Pour en savoir plus, consultez [Configuration de l'Agent pour un proxy][27].

### Déploiement, mise à jour et configuration de l'Agent

Il existe plusieurs façons de déployer l'Agent Datadog sur votre infrastructure et celle de votre client. Étant donné que la plupart des fournisseurs de services proposent déjà un outil de gestion des configurations, il est recommandé d'utiliser cet outil pour déployer l'Agent.

Voici quelques exemples de guides pour gérer votre Agent Datadog avec différents outils de gestion des configurations :
- [Déployer des Agents Datadog avec Chef][28] (Blog)
- [Puppet + Datadog : Automatisez et surveillez vos systèmes][7] (Blog)
- [Déployer et configurer Datadog avec CloudFormation][29] (Blog)
- [Comment utiliser Ansible pour automatiser la configuration de Datadog][30] (Vidéo)
- [Comment déployer l'Agent Datadog sur des hosts AWS avec les inventaires dynamiques Ansible][31] (Blog)

Si vous ne comptez pas utiliser les référentiels de Datadog, sachez que les dernières versions de l'Agent sont disponibles en permanence sur le [référentiel GitHub public][32]. Nous vous conseillons de [vérifier le canal de distribution][33] des packages de l'Agent avant de procéder à son déploiement.

### Surveillance des processus de provisionnement continu

S'il est conseillé d'utiliser des outils de gestion des configurations pour déployer Datadog, vous pouvez également utiliser Datadog pour contrôler le bon fonctionnement de ces outils. Voici quelques exemples :
- [Demandez à vos systèmes ce qui se passe : surveiller Chef avec Datadog][34] (Blog)
- [Ansible + Datadog : surveillez votre automatisation, automatisez votre surveillance][35] (Blog)

## Et ensuite ?

Maintenant que vos données sont ingérées par Datadog, il est temps de [générer de la valeur ajoutée][36] pour vos clients.


[1]: /fr/getting_started/integrations/
[2]: https://www.datadoghq.com/pdf/monitoring-in-the-cloud-ebook.pdf
[3]: https://www.datadoghq.com/solutions/aws/
[4]: https://www.datadoghq.com/solutions/gcp/
[5]: https://www.datadoghq.com/solutions/azure/
[6]: /fr/integrations/
[7]: /fr/agent/
[8]: /fr/getting_started/agent/
[9]: /fr/getting_started/logs
[10]: /fr/api/latest/metrics
[11]: /fr/api/latest/events
[12]: /fr/api/latest/tracing/
[13]: /fr/developers/custom_checks/
[14]: /fr/events/guides/dogstatsd/
[15]: /fr/metrics/custom_metrics/
[16]: /fr/developers/community/libraries/#api-and-dogstatsd-client-libraries
[17]: /fr/api/latest/
[18]: /fr/getting_started/tagging/
[19]: https://www.datadoghq.com/blog/tagging-best-practices/
[20]: https://learn.datadoghq.com/courses/tagging-best-practices
[21]: /fr/getting_started/tagging/unified_service_tagging?tab=kubernetes
[22]: /fr/agent/kubernetes/tag/
[23]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[24]: /fr/serverless/serverless_tagging/?tab=serverlessframework#overview
[25]: /fr/infrastructure/livecontainers
[26]: /fr/agent/guide/network/
[27]: /fr/agent/proxy/
[28]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[29]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[30]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[31]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /fr/data_security/agent/#agent-distribution
[34]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[35]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[36]: /fr/partners/delivering-value/