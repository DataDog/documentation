---
algolia:
  tags:
  - agent proxy
aliases:
- /fr/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /fr/agent/proxy
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces et profils
- link: /agent/configuration/fips-compliance
  tag: Documentation
  text: Conformité de Datadog à la norme FIPS
title: Configuration du proxy pour l'Agent Datadog
---

Vous pouvez configurer l'Agent Datadog pour qu'il envoie le trafic via un proxy HTTP/HTTPS. Un proxy est généralement utilisé pour transmettre le trafic depuis un hôte qui n'est pas directement connecté à Internet.

## Configurer l'Agent Datadog

Il existe deux méthodes pour configurer l'Agent Datadog afin qu'il utilise un proxy :
- Utiliser le fichier de configuration de l'Agent 
- Utiliser des variables d'environnement. Les variables d'environnement remplacent les paramètres définis dans le fichier de configuration.

### Fichier de configuration

Pour configurer un proxy à l'aide d'un fichier de configuration, modifiez ou ajoutez la section `proxy` dans le fichier principal de configuration de l'Agent (`datadog.yaml`), puis [redémarrez l'Agent Datadog][1].
```yaml
proxy:
  # Required: Proxy endpoint for HTTP connections
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  # Required: Proxy endpoint for HTTPS connections (most Datadog traffic)
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>

  # Optional: List of hosts or CIDR ranges to bypass the proxy
  # Example:
  # no_proxy:
  #   - 192.168.0.0/24
  #   - localhost
  #   - .myinternaldomain.com
  no_proxy:
    - <HOST_TO_BYPASS_1>
    - <HOST_TO_BYPASS_2>

# Recommended: Set to true to ensure no_proxy behaves in a standard way
no_proxy_nonexact_match: true

# Recommended: Force the Agent to use HTTP to send logs (if logs is enabled)
logs_config:
  force_use_http: true
```

* Remplacez `<USER>`, `<PASSWORD>`, `<PROXY_HOST>` et `<PROXY_PORT>` par vos identifiants et l'adresse de votre proxy. 
* Le nom d'utilisateur et le mot de passe sont facultatifs.
* Indiquez `http`, `https` ou les deux, selon la configuration de votre proxy et vos besoins. La plupart du trafic Datadog utilise HTTPS.
* Utilisez `no_proxy` pour indiquer les hôtes auxquels l'Agent doit se connecter directement, sans passer par le proxy.
* **[Redémarrez l'Agent Datadog][1]** pour appliquer les modifications.

Pour savoir où se trouve le fichier de configuration selon votre système d'exploitation, consultez la page [Fichiers de configuration de l'Agent][2].

### Variables d'environnement

Vous pouvez également configurer un proxy en définissant les variables d'environnement suivantes. Une fois la configuration terminée, [redémarrez l'Agent Datadog][1].

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
DD_NO_PROXY_NONEXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

## Exemples de configuration de serveur proxy

Si vous n'avez pas encore de serveur proxy, Datadog recommande d'utiliser un proxy HTTP tel que **Squid**.

1. - **Squid (recommandé)** : proxy HTTP/HTTPS robuste qui simplifie la configuration en gérant de manière transparente tout le trafic HTTP/HTTPS sortant de l'Agent. [Utiliser un proxy Squid][3]
2. **HAProxy (non recommandé)** : peut rediriger le trafic vers Datadog, mais nécessite de maintenir une liste à jour des domaines Datadog, ce qui complique la gestion. [Voir l'exemple de configuration HAProxy][4]
3. **NGINX (non recommandé)** : similaire à HAProxy, l'utilisation de NGINX pour rediriger le trafic vers Datadog est déconseillée en raison de la surcharge liée à la maintenance de la liste de domaines. [Voir l'exemple de configuration NGINX][5]

Datadog déconseille l'utilisation de logiciels tels que HAProxy ou NGINX pour rediriger le trafic, car cela vous oblige à maintenir manuellement la liste des endpoints spécifiques que l'Agent doit atteindre. Cette liste peut évoluer, ce qui peut entraîner des pertes de données si elle n'est pas à jour. La seule exception concerne les cas où vous avez besoin de fonctionnalités d'inspection approfondie des paquets (DPI), auquel cas vous pouvez envisager HAProxy ou NGINX, car ils permettent de désactiver TLS ou d'utiliser vos propres certificats TLS pour inspecter le trafic.

## Vérification

Après le redémarrage, utilisez la commande Agent status et consultez les logs de l'Agent (`agent.log`, `trace-agent.log`, etc.) pour détecter d'éventuelles erreurs de connexion.

## Proxy FIPS (US1-FED)

Pour plus d'informations sur la configuration du proxy FIPS de l'Agent Datadog, consultez la page [Conformité FIPS de Datadog][6]. Le proxy FIPS n'est disponible que dans la région US1-FED. Le proxy FIPS de l'Agent Datadog ne peut pas être utilisé en même temps qu'un proxy standard.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/#restart-the-agent
[2]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file
[3]: /fr/agent/configuration/proxy_squid/
[4]: /fr/agent/faq/proxy_example_haproxy/
[5]: /fr/agent/faq/proxy_example_nginx/
[6]: /fr/agent/configuration/fips-compliance/