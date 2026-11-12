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
description: Installez le Datadog Agent sur des serveurs ayant un accès restreint
  à Internet en utilisant des méthodes alternatives, notamment la configuration d'un
  proxy et les paquets hors ligne.
further_reading:
- link: /agent/
  tag: Documentation
  text: En savoir plus sur le Datadog Agent
- link: /agent/configuration/proxy/
  tag: Documentation
  text: En savoir plus sur Proxy
title: Installation de l'Agent sur un serveur avec une connectivité internet limitée
---
La commande d'installation en une ligne fournie dans les [instructions d'installation de l'Agent][1] nécessite un accès HTTPS sortant vers quelques points de terminaison différents pour fonctionner correctement et pourrait ne pas fonctionner avec des serveurs ayant un accès limité à Internet. Plus précisément, il s'agit de :

* Pour l'installation sur les systèmes Debian/Ubuntu :
  * https://keys.datadoghq.com - Stockage des clés de signature publiques de Datadog.
  * https://apt.datadoghq.com - Dépôt de paquets APT Datadog.
* Pour l'installation sur les systèmes basés sur RedHat et SUSE :
  * https://keys.datadoghq.com - Stockage des clés de signature publiques de Datadog.
  * https://yum.datadoghq.com - Dépôt de paquets RPM Datadog.
* Pour l'installation sur les systèmes AIX :
  * https://dd-agent-aix.s3.amazonaws.com - Dépôt de paquets AIX Datadog.

Pour les serveurs sans accès direct à Internet, l'Agent peut être configuré pour passer par un proxy ; consultez la [configuration de proxy de l'Agent][2]. Pour les serveurs ayant une connectivité Internet sortante limitée, l'Agent peut être installé en utilisant le paquet correspondant au système d'exploitation du serveur. Les [instructions d'installation de l'Agent][1] contiennent des instructions étape par étape sous les commandes d'installation en une ligne.

Si le système cible ne peut pas accéder directement au dépôt de paquets, téléchargez le paquet depuis le dépôt en utilisant un autre serveur, puis transférez-le sur le système cible pour une installation locale.

Les paquets RPM pour l'Agent 6 sont disponibles sur [https://yum.datadoghq.com/stable/6/][3], pour l'Agent 7 sur [https://yum.datadoghq.com/stable/7/][4], et les paquets DEB sont disponibles sur [https://apt.datadoghq.com/pool/d/da/][5].

**Remarque** : Le paquet regroupe toutes les ressources nécessaires pour exécuter l'Agent et les checks (que l'intégration soit activée ou non). En ce qui concerne les prérequis impératifs, Python 2.7+ et sysstat sont requis ; d'autres dépendances sont obligatoires selon les checks activés.

Pour les systèmes AIX, l'Agent 7 est distribué sous forme de paquets BFF, disponibles sur [https://dd-agent-aix.s3.amazonaws.com/stable/][8] (par exemple, `datadog-agent-7-latest.aix.ppc64.bff`). Le paquet BFF regroupe l'environnement d'exécution Python intégré, OpenSSL et d'autres dépendances ; aucun Python système ni bibliothèque supplémentaire n'est donc requis sur le host cible.

Une fois le paquet transféré sur le système cible, il peut être installé localement en utilisant la commande du gestionnaire de paquets appropriée. Pour yum, la commande suivrait le modèle :

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Pour installer un fichier deb dans le répertoire actuel pour les distributions basées sur Debian :

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

Pour installer un fichier BFF dans le répertoire actuel pour AIX :

```bash
sudo installp -acXYd datadog-agent-7-latest.aix.ppc64.bff datadog-agent
```

Une fois installé, ajoutez un fichier `datadog.yaml` en copiant `datadog.yaml.example`. Mettez ensuite à jour `datadog.yaml` avec la [clé d'API][6] de votre organisation. Cela peut être effectué avec une seule commande :

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

Ensuite, [démarrez l'Agent][7] en utilisant la commande appropriée pour votre système.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/agent/configuration/agent-commands/#start-the-agent
[8]: https://dd-agent-aix.s3.amazonaws.com/stable/