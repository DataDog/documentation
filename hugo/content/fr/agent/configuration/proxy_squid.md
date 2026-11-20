---
algolia:
  tags:
  - agent proxy
description: Configurez Squid en tant que proxy direct pour acheminer le trafic du
  Datadog Agent via un serveur proxy HTTP/HTTPS lorsque l'accès direct à Internet
  est limité.
further_reading:
- link: /agent/configuration/proxy/
  tag: Documentation
  text: Configuration de l'Agent pour un proxy
title: Utilisation d'un proxy Squid
---
[Squid][2] est un proxy direct pour le Web prenant en charge HTTP, HTTPS, FTP et plus encore. Il fonctionne sur la plupart des systèmes d'exploitation disponibles, y compris Windows, et est distribué sous licence GNU GPL. Squid est une option simple si vous ne disposez pas déjà d'un proxy Web opérationnel sur votre réseau. **Si vous disposez déjà d'un serveur proxy, vous n'avez pas besoin d'utiliser Squid.** Suivez plutôt les instructions de [Configuration du proxy de l'Agent][5].

## Acheminement du trafic via Squid {#proxy-forwarding-with-squid}

Pour configurer Squid afin d'envoyer du trafic vers Datadog, suivez les instructions ci-dessous pour configurer Squid, démarrer le service squid, puis configurer et redémarrer le Datadog Agent.

### Configurer Squid pour envoyer uniquement le trafic destiné à Datadog {#configure-squid-to-only-send-traffic-to-datadog}

Installez Squid sur un hôte disposant d'une connectivité à la fois avec vos Agents internes et avec Datadog. Utilisez le gestionnaire de paquets de votre système d'exploitation ou installez le logiciel directement depuis la [page du projet Squid][2].

Pour configurer Squid, modifiez le fichier de configuration. Ce fichier se trouve généralement à `/etc/squid/squid.conf` sous Linux ou `C:\squid\etc\squid.conf` sous Windows. Pour les autres systèmes d'exploitation, consultez le [répertoire de configuration de l'agent][6].

Modifiez votre fichier de configuration `squid.conf` afin que Squid puisse accepter le trafic local et le transférer vers les points de collecte Datadog nécessaires.

L'approche la plus simple utilise un caractère générique pour autoriser tous les sous-domaines de votre site Datadog :

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

Alternativement, si vous avez besoin d'un contrôle plus granulaire, vous pouvez lister explicitement chaque point de terminaison Datadog au lieu d'utiliser un caractère générique. Pour obtenir la liste complète des domaines et des plages d'adresses IP que l'Agent doit atteindre, consultez [Trafic réseau][7]. Par exemple :

<div class="alert alert-danger">
L'exemple ci-dessous n'inclut qu'un sous-ensemble des points de terminaison Datadog. Assurez-vous d'inclure tous les domaines requis par les fonctionnalités Datadog que vous utilisez. Consultez <a href="/agent/configuration/network/#overview">Trafic réseau</a> pour obtenir la liste complète.
</div>

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain agent.{{< region-param key="dd_site" >}}
acl Datadog dstdomain process.{{< region-param key="dd_site" >}}
acl Datadog dstdomain logs.{{< region-param key="dd_site" >}}
acl Datadog dstdomain api.{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

### Démarrez Squid {#start-squid}

Démarrez (ou redémarrez) Squid afin que vos nouvelles configurations puissent être appliquées.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Si Squid est déjà en cours d'exécution, redémarrez plutôt Squid avec la commande suivante :

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Si vous configurez Squid sur Windows, vous devez d'abord [configurer Squid en tant que service système][4]. Vous pouvez ensuite exécuter la commande suivante dans une invite de commandes en tant qu’administrateur :

```bash
net start squid
```

Si Squid est déjà en cours d'exécution, redémarrez plutôt Squid avec les commandes suivantes :

```bash
net stop squid
net start squid
```

{{% /tab %}}
{{< /tabs >}}

### Configurez Datadog Agent{#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Host" %}}

Modifiez le fichier de configuration de l'Agent (`datadog.yaml`) pour inclure ce qui suit :

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

Après avoir enregistré ces modifications, [redémarrez l'Agent][1].

{{% /tab %}}
{{% tab "Opérateur" %}}

Modifiez la CR DatadogAgent pour inclure ce qui suit :

```yaml
spec:
  global:
    proxy:
      http: http://squid-proxy.proxy-namespace.svc.cluster.local:3128
      https: http://squid-proxy.proxy-namespace.svc.cluster.local:3128
```

{{% /tab %}}
{{% tab "Helm" %}}

Modifiez votre `values.yaml` pour inclure ce qui suit :

```yaml
datadog:
  env:
    - name: DD_PROXY_HTTP
      value: http://squid-proxy.proxy-namespace.svc.cluster.local:3128
    - name: DD_PROXY_HTTPS
      value: http://squid-proxy.proxy-namespace.svc.cluster.local:3128
```

{{% /tab %}}
{{< /tabs >}}

Vérifiez que Datadog reçoit bien les données de votre ou vos Agents en consultant [Infrastructure Overview][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/
[2]: http://www.squid-cache.org/
[3]: https://app.datadoghq.com/infrastructure
[4]: https://wiki.squid-cache.org/KnowledgeBase/Windows
[5]: /fr/agent/configuration/proxy/
[6]: /fr/agent/configuration/agent-configuration-files#agent-configuration-directory
[7]: /fr/agent/configuration/network/#overview