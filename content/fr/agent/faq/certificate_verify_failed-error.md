---
kind: faq
title: Erreur CERTIFICATE_VERIFY_FAILED
---

### Que s'est-il passé ?

Samedi 30 mai 2020 à 10 h 48 UTC, un certificat racine SSL utilisé pour effectuer la signature croisée de certains certificats Datadog a expiré, entraînant alors une perte de connectivité de certains de vos Agents avec les endpoints Datadog. Ce certificat racine étant intégré à certaines versions de l'Agent, une action de votre part est nécessaire pour rétablir la connectivité.

### Quelles sont les versions de l'Agent concernées ?

Les versions de l'Agent concernées sont celles comprises entre la 3.6.x et la 5.32.6, car elles intègrent le certificat qui a expiré.

Les versions 6.x et 7.x de l'Agent ne sont pas affectées et ne nécessitent aucune mise à jour.

### Résoudre le problème en installant l'Agent 5.32.7

Si vous utilisez l'Agent 5.x sur un host 64 bits, Datadog vous conseille de passer à l'Agent 5.32.7+. L'Agent continuera ainsi à fonctionner dans un vaste nombre de scénarios sans modification majeure.

Centos/Red Hat : `sudo yum check-update && sudo yum install datadog-agent`
Debian/Ubuntu : `sudo apt-get update && sudo apt-get install datadog-agent`
Windows (à partir des versions 5.12.0+) : téléchargez le [programme d'installation de l'Agent][1] Datadog avec `start /wait msiexec /qn /i ddagent-cli-latest.msi`
D'autres plateformes et options de gestion de la configuration sont détaillées [sur la page d'installation de l'Agent][2].

Le dernier Agent compatible avec les systèmes 32 bits est la version 5.10.1. Suivez les instructions `Résoudre le problème sans mettre à jour l'Agent` pour les hosts 32 bits.

### Résoudre le problème sans mettre à jour l'Agent

#### Linux

```shell
sudo rm -f /opt/datadog-agent/agent/datadog-cert.pem && sudo /etc/init.d/datadog-agent restart
```

#### Windows

Si votre Agent est configuré pour utiliser un proxy, suivez plutôt la [section dédiée ci-dessous](#Agent-Windows-5x-configure-pour-utiliser-un-proxy-ou-le-client-curl-http).

*Utiliser l'interface de ligne de commande*

Dans PowerShell, exécutez les commandes suivantes pour l'Agent `>= 5.12.0` :

```shell
rm "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

**Remarque** : l'emplacement est différent pour les versions de l'Agent `<= 5.11`.
Pour les utilisateurs de l'Agent 32 bits `<= 5.11` sous Windows 64 bits, les commandes sont les suivantes :

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

Pour tous les autres utilisateurs de l'Agent `<= 5.11`, les commandes sont :

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*Utiliser l'interface graphique Windows*

Supprimez `datadog-cert.pem`. Ce fichier se trouve à l'emplacement suivant :

* Agent `>=5.12.0` :
  * Windows 64 bits : `C:\Program Files\Datadog\Datadog Agent\agent\`
  * Windows 32 bits : l'Agent Datadog n'est pas disponible pour les systèmes Windows 32 bits à partir de la version 5.12
* Agent `<= 5.11.x` :
  * Windows 64 bits : `C:\Program Files (x86)\Datadog\Datadog Agent\files\`
  * Windows 32 bits : `C:\Program Files\Datadog\Datadog Agent\files\`

Après la suppression du fichier, redémarrez le service Datadog à partir du gestionnaire de services Windows.

### Résoudre le problème en installant l'Agent 6 ou 7

Vous pouvez passer à l'[Agent 7][3] ou l'[Agent 6][4] pour résoudre ce problème. Assurez-vous toutefois de *consulter le CHANGELOG de l'Agent afin d'obtenir la liste des changements non rétrocompatibles pour l'Agent 6 ou 7.*

### Mettre à niveau l'Agent après la suppression du certificat

Datadog vous conseille d'installer la dernière version de l'Agent. Les déploiements avec mise à jour automatique sont activés avec la version 5.32.7.

### Chiffrer le trafic via SSL

Chiffrez le trafic via SSL même si vous supprimez le certificat. Ce dernier constitue uniquement un préréglage destiné au client ; il n'est pas utilisé pour la connexion via SSL. Les endpoints de l'Agent Datadog n'acceptent que le trafic SSL.

### Agent Windows 5.x configuré pour utiliser un proxy ou le client curl http

Cette section concerne l'Agent Windows 5.x (`<= 5.32.6`), si l'Agent est configuré pour :

* utiliser un proxy avec l'option de configuration `proxy_host` dans `datadog.conf` ou la variable d'environnement `HTTPS_PROXY`
* utiliser le client curl HTTP avec l'option de configuration `use_curl_http_client: yes` dans `datadog.conf`

Remarque : `datadog.conf` se trouve dans `C:\ProgramData\Datadog\datadog.conf`.

Dans ce cas, la suppression de `datadog-cert.pem` ne permet pas à l'Agent de se reconnecter à Datadog. Effectuez l'opération suivante :

* Agent Windows v5 `>= 5.12.0` : remplacez le fichier `datadog-cert.pem` par la version fournie dans 5.32.7. Utilisez l'interface de ligne de commande Powershell :

```shell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/5.32.7/datadog-cert.pem" -OutFile "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

* Agent Windows v5 `<= 5.11.x` : définissez l'option suivante dans `datadog.conf` à l'aide du programme `Datadog Agent Manager` fourni par l'Agent ou en modifiant directement le fichier `datadog.conf` :
  * Windows 64 bits : `ca_certs: C:\Program Files (x86)\Datadog\Datadog Agent\files\ca-certificates.crt`
  * Windows 32 bits : `ca_certs: C:\Program Files\Datadog\Datadog Agent\files\ca-certificates.crt`

  Après la mise à jour de `datadog.conf`, redémarrez le service Datadog à partir du gestionnaire de services Windows.


[1]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[2]: https://app.datadoghq.com/account/settings?agent_version=5#agent
[3]: /fr/agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[4]: /fr/agent/versions/upgrade_to_agent_v6/?tab=linux