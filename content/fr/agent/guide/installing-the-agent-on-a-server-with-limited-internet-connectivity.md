---
algolia:
  tags:
  - airgap
  - airgapped
  - air gap
  - air gapped
  - air-gap
  - air-gapped
aliases:
- /fr/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
description: Installez l'Agent Datadog sur des serveurs avec un accès Internet restreint
  à l'aide de méthodes alternatives, notamment avec une configuration de proxy et
  des packages hors ligne.
further_reading:
- link: /agent/
  tag: Documentation
  text: En savoir plus sur l'Agent Datadog
- link: /agent/configuration/proxy/
  tag: Documentation
  text: En savoir plus sur le proxy
title: Installer l'Agent sur un serveur avec une connectivité Internet limitée
---

Pour que la commande d'installation en une ligne fournie dans les [instructions d'installation de l'Agent][1] fonctionne correctement, il est nécessaire d'avoir un accès HTTPS sortant vers quelques endpoints. Il est possible que cette méthode ne fonctionne pas pour les serveurs suivants avec un accès Internet limité :

* Pour l'installation des systèmes Debian/Ubuntu ::
  * https://keys.datadoghq.com - Stockage des clés de signature publiques Datadog
  * https://apt.datadoghq.com - Référentiel des packages APT Datadog
* Pour l'installation des systèmes basés sur RedHat et SUSE :
  * https://keys.datadoghq.com - Stockage des clés de signature publiques Datadog
  * https://yum.datadoghq.com - Référentiel des packages RPM Datadog

Pour les serveurs sans accès direct à Internet, l'Agent peut être configuré de façon à passer par un proxy (voir la section [Configuration du proxy pour l'Agent Datadog][2]). Pour les serveurs avec une connectivité Internet sortante limitée, l'Agent peut être installé à l'aide du package correspondant au système d'exploitation du serveur. Les [instructions d'installation de l'Agent][1] décrivent les étapes à suivre sous les commandes d'installation en une ligne.

Si le système cible ne peut pas accéder directement au référentiel des packages, téléchargez le package à partir du référentiel en utilisant un autre serveur, puis transférez-le sur le système cible pour effectuer une installation locale.

Les packages RPM pour la version 6 de l'Agent sont disponibles à l'adresse [https://yum.datadoghq.com/stable/6/][3]. Pour la version 7 de l'Agent, ils sont disponibles à l'adresse [https://yum.datadoghq.com/stable/7/][4]. Les packages DEN sont accessibles à l'adresse [https://apt.datadoghq.com/pool/d/da/][5].

**Remarque** : le package comprend toutes les ressources requises pour exécuter l'Agent et les checks (que l'intégration soit activée ou non). Il est nécessaire d'utiliser la version 2.7 ou une version ultérieure de Python, ainsi que sysstat. D'autres dépendances peuvent être requises selon les checks activés.

Une fois que le package a été transféré sur le système cible, il peut être installé localement en exécutant la commande appropriée du gestionnaire de package. Pour yum, la commande respecte le format suivant :

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Utilisez la commande suivante afin d'installer un fichier deb dans le répertoire actuel pour les distributions basées sur Debian :

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

Une fois le fichier installé, ajoutez un fichier `datadog.yaml` en copiant `datadog.yaml.example`. Mettez ensuite à jour `datadog.yaml` en ajoutant la [clé d'API][6] de votre organisation. Cette opération peut être effectuée à l'aide d'une seule commande :

```bash
sudo sh -c "sed 's/api_key :.*/api_key : <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

[Lancez ensuite l'Agent][7] à l'aide de la commande appropriée pour votre système.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/agent/configuration/agent-commands/#start-the-agent