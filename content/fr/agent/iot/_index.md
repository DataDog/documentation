---
further_reading:
- link: /getting_started/agent/
  tag: Documentation
  text: Débuter avec l'Agent
title: Agent IoT
---

## Présentation

L'Agent IoT Datadog est une version de l'Agent optimisée pour surveiller les périphériques IoT et les applications intégrées. Les clients se servent de l'Agent IoT pour surveiller un grand nombre de périphériques, tels que des écrans numériques ou des appareils de sécurité exécutant des algorithmes de détection d'images.

## Fonctionnalités

L'Agent IoT comprend les checks système suivants. La configuration pour les périphériques IoT est identique à celle pour les autres types de hosts.

- [Système][1] (comprend le processeur, les E/S, la charge, la mémoire, le swap et l'uptime)
- [Disque][2]
- [Réseau][3]
- [Systemd][4]
- [NTP][5]

L'Agent IoT prend également en charge les fonctionnalités suivantes :

- La collecte de métriques custom via un serveur [DogStatsD][6] intégré
- La collecte de logs via le [suivi de fichiers][7], [TCP/UDP][8] et [journald][9]

L'Agent IoT n'inclut pas l'interpréteur Python ni d'autres intégrations packagées avec la version standard de l'Agent. Il ne prend pas non plus en charge le tracing d'APM, la surveillance des live processes ou la surveillance des performances réseau.

## Configuration

### Prérequis

L'Agent IoT est disponible sous la forme de packages DEB et RPM pour les périphériques Linux basés sur une architecture x64, arm64 (ARMv8) ou ARMv7.

#### Ressources

Les ressources des périphériques IoT sont généralement plus limitées que celles des hosts appartenant à une infrastructure cloud. L'Agent IoT a été pensé pour ne pas être gourmand en ressources et en bande passante réseau.

Les besoins exacts en ressources dépendent de l'utilisation faite de l'Agent IoT. Datadog l'a testé en interne (v7.20) et a obtenu les résultats suivants :

- CPU : 0,5 % (sur une machine virtuelle avec deux VCPU Intel Xeon)
- Mémoire : 36 Mo
- Bande passante réseau : 237 bps (montant)/79 bps (descendant)
- Disque : 63 Mo

### Installation

#### Configuration automatique

Pour télécharger et installer automatiquement l'Agent IoT adapté à votre système d'exploitation et à l'architecture de votre chipset, utilisez la commande suivante :

```shell
DD_API_KEY=<VOTRE_CLÉ_API_DATADOG> DD_SITE="{{< region-param key="dd_site" >}}" DD_AGENT_FLAVOR=datadog-iot-agent bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

#### Méthode manuelle

{{< tabs >}}
{{% tab "DEB" %}}

Pour installer manuellement l'Agent IoT sur les systèmes d'exploitation basés sur Debian, exécutez les commandes suivantes :

1. Modifiez `apt`, installez `apt-transport-https` pour les téléchargements via HTTPS et installez `curl` et `gnupg` pour obtenir les clés de signature :
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configurez le référentiel Debian de Datadog sur votre système et importez la clé apt de Datadog :
    ```bash
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si vous utilisez Ubuntu 14 ou une version antérieure, ou Debian 8 ou une version antérieure, copiez le keyring vers `/etc/apt/trusted.gpg.d` :

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Mettez à jour `apt` et installez l'Agent IoT :
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-iot-agent datadog-signing-keys
    ```

5. Copiez l'exemple de configuration et spécifiez votre clé d'API :
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Définissez votre site Datadog sur {{< region-param key="dd_site" code="true" >}}. Valeur par défaut : `datadoghq.com`.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

7. Démarrez l'Agent IoT :
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

{{% /tab %}}
{{% tab "RPM" %}}

Pour installer manuellement l'Agent IoT sur les systèmes d'exploitation basés sur RPM, exécutez les commandes suivantes :

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/<HOST_ARCHITECTURE>
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

    **Remarque** : en raison d'un [bug dans dnf][1], utilisez `repo_gpgcheck=0` au lieu de `repo_gpgcheck=1` pour RHEL/CentOS 8.1.

   `baseurl` dépend du système d'exploitation de votre host :
    - x86_64 : `https://yum.datadoghq.com/stable/7/x86_64/`
    - arm64 : `https://yum.datadoghq.com/stable/7/aarch64/`
    - ARMv7 : `https://yum.datadoghq.com/stable/7/armv7hl/`

2. Mettez à jour votre référentiel yum local et installez l'Agent :
    ```shell
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

3. Copiez l'exemple de configuration et spécifiez votre clé d'API :
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Définissez votre site Datadog sur {{< region-param key="dd_site" code="true" >}}. Valeur par défaut : `datadoghq.com`.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

5. Démarrez l'Agent IoT :
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{< /tabs >}}

## Interface de ligne de commande

L'Agent IoT prend en charge les mêmes [commandes CLI][10] que l'Agent standard.

## Désinstaller

```shell
sudo apt-get remove datadog-iot-agent -y
```

Cette commande supprime l'Agent, mais pas :

* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`

Si vous souhaitez également supprimer ces éléments, utilisez plutôt la commande suivante :

```shell
sudo apt-get remove --purge datadog-iot-agent -y
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/system
[2]: /fr/integrations/disk
[3]: /fr/integrations/network
[4]: /fr/integrations/systemd
[5]: /fr/integrations/ntp
[6]: /fr/developers/dogstatsd
[7]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /fr/agent/logs/?tab=tcpudp#custom-log-collection
[9]: /fr/agent/logs/?tab=journald#custom-log-collection
[10]: /fr/agent/basic_agent_usage/#cli