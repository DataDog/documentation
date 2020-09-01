---
title: Agent IoT
kind: documentation
beta: true
further_reading:
  - link: /getting_started/agent/
    tag: Documentation
    text: Débuter avec l'Agent
---
## Présentation

L'Agent IoT Datadog est une version de l'Agent optimisée pour surveiller les périphériques IoT et les applications intégrées. Les clients se servent de l'Agent IoT pour surveiller un grand nombre de périphériques, tels que des écrans numériques ou des appareils de sécurité exécutant des algorithmes de détection d'images.

<div class="alert alert-warning">L'Agent IoT est actuellement accessible sous la forme d'une bêta privée. Demandez l'accès en remplissant ce <a href="https://docs.google.com/forms/d/e/1FAIpQLSfaoqr9Pgievq7f2WE6wcQMF1YjsOwiXHbmO2FehUlQwmNu0A/viewform?usp=sf_link">formulaire</a>.
</div>

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

#### Méthode automatique

Pour télécharger et installer automatiquement l'Agent IoT adapté à votre système d'exploitation et à l'architecture de votre chipset, utilisez la commande suivante :

```shell
DD_API_KEY=<VOTRE_CLÉ_API_DD> DD_SITE="{{< region-param key="dd_site" code="true" >}}" DD_AGENT_MAJOR_VERSION=7 DD_AGENT_FLAVOR=datadog-iot-agent bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

#### Méthode manuelle

{{< tabs >}}
{{% tab "DEB" %}}

Pour installer manuellement l'Agent IoT sur les systèmes d'exploitation basés sur Debian, exécutez les commandes suivantes :

1. Mettez à jour `apt` et installez `apt-transport-https` pour procéder au téléchargement par HTTPS :
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le référentiel deb de Datadog sur votre système et importez la clé apt de Datadog :
    ```bash
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

3. Mettez à jour `apt` et installez l'Agent IoT :
    ```bash
    sudo apt-get update
    sudo apt-get install datadog-iot-agent
    ```

{{< site-region region="us" >}}

<ol start="4">
  <li><p>Copiez l'exemple de configuration et rajoutez votre clé API :</p>
  <pre><code>DD_API_KEY=&lt;VOTRE_CLÉ_API_DD&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Lancez l'Agent IoT :</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}
{{< site-region region="eu" >}}

<ol start="4">
  <li><p>Copiez l'exemple de configuration et rajoutez votre clé API :</p>
  <pre><code>DD_API_KEY=&lt;VOTRE_CLÉ_API_DD&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Définissez votre site Datadog :</p>
  <pre><code>sudo sh -c "sed 's/# site:.*/site: datadoghq.eu/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml</code></pre>
  </li>
  <li><p>Lancez l'Agent IoT :</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}

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
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   `baseurl` dépend du système d'exploitation de votre host :
    - x86_64 - `https://yum.datadoghq.com/stable/7/x86_64/`
    - arm64 - `https://yum.datadoghq.com/stable/7/aarch64/`
    - ARMv7 - `https://yum.datadoghq.com/stable/7/armv7hl/`

2. Mettez à jour votre référentiel yum et installez l'Agent :
    ```
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

{{< site-region region="us" >}}

<ol start="3">
  <li>Copiez l'exemple de configuration et rajoutez votre clé API :</p>
  <pre><code>DD_API_KEY=&lt;VOTRE_CLÉ_API_DD&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Lancez l'Agent IoT :</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}
{{< site-region region="eu" >}}

<ol start="3">
  <li><p>Copiez l'exemple de configuration et rajoutez votre clé API :</p>
  <pre><code>DD_API_KEY=&lt;VOTRE_CLÉ_API_DD&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Définissez votre site Datadog :</p>
  <pre><code>sudo sh -c "sed 's/# site:.*/site: datadoghq.eu/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml</code></pre>
  </li>
  <li><p>Lancez l'Agent IoT :</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}

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