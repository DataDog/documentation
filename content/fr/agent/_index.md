---
title: Agent
kind: documentation
description: Installer et configurer l'Agent pour recueillir des données
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
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
<div class="alert alert-info">
L'Agent v6 est disponible. <a href="/agent/faq/upgrade-to-agent-v6">Passez à la dernière version</a> pour profiter des nouvelles fonctionnalités.
</div>

## Présentation

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques des hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance. L'Agent Datadog est open source et son code source est disponible sur GitHub dans [DataDog/datadog-agent][1].

{{< partial name="platforms/platforms.html" links="platforms" >}}

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
  {{< nextlink href="/agent/basic_agent_usage">}}<u>Utilisation de base de l'Agent</u> : en savoir plus sur l'Agent Datadog, y compris les détails d'architecture, l'interface de ligne de commande, le traitement et les outils de gestion de configuration.{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}<u>Docker</u> : installez et configurez l'Agent Datadog sur Docker. {{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u> : installez et configurez l'Agent Datadog sur Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/autodiscovery">}}<u>Autodiscovery</u> : Autodiscovery vous permet de suivre automatiquement quels services s'exécutent où.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Collecte de logs</u> : activez et configurez la collecte de logs dans l'Agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/proxy">}}<u>Proxy</u> : si votre configuration réseau limite le trafic sortant, utilisez un proxy pour le trafic de l'Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/faq/upgrade-to-agent-v6">}}<u>Mise à niveau vers l'Agent v6</u> : l'Agent 6 est la dernière version majeure de l'Agent Datadog. Découvrez comment mettre à niveau.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Dépannage</u> : trouvez des informations de dépannage pour l'Agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guides</u> : des tutoriels avancés, étape par étape, pour utiliser l'Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Sécurité</u> : des informations sur les fonctionnalités de sécurité disponibles aux clients pour s'assurer que leur environnement soit sécurisé.{{< /nextlink >}}
{{< /whatsnext >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent