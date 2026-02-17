---
algolia:
  tags:
  - agent proxy
description: Configurez Squid en tant que proxy forward pour acheminer le trafic de
  l'Agent Datadog via un serveur proxy HTTP/HTTPS lorsque l'accès direct à Internet
  est limité.
further_reading:
- link: /agent/configuration/proxy/
  tag: Documentation
  text: Configuration de l'Agent pour un proxy
title: Utiliser un proxy Squid
---

[Squid][2] est un proxy forward pour le web prenant en charge HTTP, HTTPS, FTP et plus encore. Il fonctionne sur la plupart des systèmes d'exploitation disponibles, y compris Windows, et est sous licence GNU GPL. Squid est une option simple si vous ne disposez pas déjà d'un proxy web en cours d'exécution dans votre réseau. **Si vous avez déjà un serveur proxy existant, vous n'avez pas besoin d'utiliser Squid.** Suivez plutôt les instructions de la [Configuration du proxy de l'Agent][5].

## Transfert de proxy avec Squid

Pour configurer Squid pour envoyer le trafic vers Datadog, suivez les instructions ci-dessous pour configurer Squid, démarrer le service squid, puis configurer et redémarrer l'Agent Datadog.

### Configurer Squid pour envoyer uniquement le trafic vers Datadog

Installez Squid sur un host qui dispose d'une connectivité à la fois vers vos Agents internes et vers Datadog. Utilisez le gestionnaire de packages de votre système d'exploitation ou installez le logiciel directement depuis la [page du projet Squid][2].

Pour configurer Squid, modifiez le fichier de configuration. Ce fichier se trouve généralement à `/etc/squid/squid.conf` sur Linux ou `C:\squid\etc\squid.conf` sous Windows. Pour les autres systèmes d'exploitation, consultez la section [Répertoire de configuration de l'Agent][6].

Modifiez votre fichier de configuration `squid.conf` afin que Squid puisse accepter le trafic local et le transférer vers les points d'ingestion Datadog nécessaires :

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

### Démarrer Squid

Démarrez (ou redémarrez) Squid afin que vos nouvelles configurations puissent être appliquées.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Si Squid est déjà en cours d'exécution, redémarrez plutôt Squid avec la commande suivante :

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Si vous configurez Squid sous Windows, vous devez d'abord [configurer Squid en tant que service système][4]. Vous pouvez ensuite exécuter la commande suivante dans une invite de commandes administrateur :

```bash
net start squid
```

Si Squid est déjà en cours d'exécution, redémarrez plutôt Squid avec les commandes suivantes :

```bash
net stop squid
net start squid
```

{{% /tab %}}
{{< /tabs >}}

### Configurer l'Agent Datadog

Modifiez le fichier de configuration de l'Agent (`datadog.yaml`) afin d'ajouter les lignes suivantes :

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

Après avoir enregistré ces modifications, [redémarrez l'Agent][1].

Vérifiez que Datadog est en mesure de recevoir les données de votre ou vos Agents en consultant votre [vue d'ensemble de l'infrastructure][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/
[2]: http://www.squid-cache.org/
[3]: https://app.datadoghq.com/infrastructure
[4]: https://wiki.squid-cache.org/KnowledgeBase/Windows
[5]: /fr/agent/configuration/proxy/
[6]: /fr/agent/configuration/agent-configuration-files#agent-configuration-directory