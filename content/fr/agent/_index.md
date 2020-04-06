---
title: Agent
kind: documentation
description: Installer et configurer l'Agent pour recueillir des données
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing/
    tag: Documentation
    text: Recueillir vos traces
  - link: agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
    tag: Documentation
    text: "Pourquoi installer l'Agent sur des instances dans le cloud\_?"
  - link: 'https://www.datadoghq.com/blog/dont-fear-the-agent/'
    tag: Blog
    text: Tout ce que vous devez savoir sur l'Agent
aliases:
  - /fr/agent/faq/agent-check-directory-structure
  - /fr/agent/faq/install-core-extra
  - /fr/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
  - /fr/agent/faq/the-datadog-agent-for-logs-or-traces-only
---
L'Agent v7 est disponible. Passez à la dernière version pour profiter des nouvelles fonctionnalités.


## Présentation

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques des hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance. L'Agent Datadog est open source et son code source est disponible sur GitHub dans [DataDog/datadog-agent][1].

**Nous vous recommandons de procéder à l'installation complète de l'Agent**. Néanmoins, il est également possible de télécharger un package DogStatsD autonome pour Amazon, Linux, CentOS, Debian, Fedora, Red Hat, SUSE et Ubuntu. Ce package est utilisé dans les environnements conteneurisés pour lesquels DogStatsD est exécuté en tant que sidecar, ou pour les environnements exécutant un serveur DogStatsD sans l'intégralité des fonctionnalités de l'Agent.

Le package DogStatsD autonome est installé avec la [commande d'installation d'une ligne][2] de l'Agent. **Attention** : chaque occurrence de `datadog-agent` doit être remplacée par `datadog-dogstatsd`. Une image Docker est disponible sur le [référentiel DogStatsD6 docker image][3].

Les paquets sont également disponibles en versions pour architectures x86 64 bits et Arm v8. Pour toute autre architecture, utilisez l'installation depuis les sources.

{{< partial name="platforms/platforms.html" links="platforms" >}}

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
  {{< nextlink href="/agent/basic_agent_usage">}}Utilisation de base de l'Agent : apprenez-en plus sur l'Agent Datadog, y compris les détails d'architecture, l'interface de ligne de commande, le traitement et les outils de gestion de configuration.{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}Docker : installez et configurez l'Agent Datadog sur Docker. {{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}Kubernetes : installez et configurez l'Agent Datadog sur Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/autodiscovery">}}Autodiscovery : surveillez automatiquement où s'exécutent vos différents services.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}Collecte de logs : activez et configurez la collecte de logs dans l'Agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/proxy">}}Proxy : si votre configuration réseau limite le trafic sortant, utilisez un proxy pour le trafic de l'Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/upgrade_to_agent_v7">}}Mise à niveau vers l'Agent v7 : l'Agent 7 est la dernière version majeure de l'Agent Datadog. Découvrez comment mettre l'Agent à niveau.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}Dépannage : trouvez des informations de dépannage pour l'Agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}Guides : consultez des tutoriels détaillés et avancés concernant l'utilisation de l'Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}Sécurité : parcourez des informations sur les principales fonctionnalités de sécurité proposées aux clients afin de vous assurer que leur environnement est sécurisé.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://app.datadoghq.com/account/settings#agent/aws
[3]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/dogstatsd/alpine