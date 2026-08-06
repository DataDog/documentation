---
algolia:
  tags:
  - agent proxy
aliases:
- /fr/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /fr/agent/proxy
description: Configurez l'Agent Datadog pour envoyer du trafic via des proxies HTTP/HTTPS
  avec des options d'authentification et de contournement.
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Collectez vos traces et profils
- link: /agent/configuration/fips-compliance
  tag: Documentation
  text: Conformité FIPS de Datadog
title: Configuration du proxy de l'Agent Datadog
---
Vous pouvez configurer l'Agent Datadog pour envoyer du trafic via un proxy HTTP/HTTPS. Un proxy est généralement utilisé pour envoyer du trafic depuis un hôte qui n'est pas directement connecté à l’Internet public.

## Configurez l'Agent Datadog {#configure-the-datadog-agent}

Il existe deux options pour configurer l'Agent Datadog afin d'utiliser un proxy.
- Vous pouvez utiliser le fichier de configuration de l'Agent.
- Vous pouvez utiliser des variables d'environnement. Les variables d'environnement remplacent les paramètres du fichier de configuration.

### Fichier de configuration {#configuration-file}

Pour configurer un proxy à l'aide d'un fichier de configuration, modifiez ou ajoutez la section `proxy` au fichier de configuration principal de l'Agent (`datadog.yaml`) puis [redémarrez l'Agent Datadog][1].

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

* Remplacez `<USER>`, `<PASSWORD>`, `<PROXY_HOST>` et `<PROXY_PORT>` par vos identifiants et adresse de proxy.
* Un nom d'utilisateur et un mot de passe sont optionnels.
* Spécifiez `http`, `https` ou les deux, en fonction de votre configuration de proxy et de vos besoins. La plupart du trafic Datadog utilise HTTPS.
* Utilisez `no_proxy` pour spécifier les hôtes auxquels l'Agent doit se connecter directement, contournant le proxy.
* **[Redémarrez l'Agent Datadog][1]** pour que les modifications prennent effet.

Pour plus d'informations sur la localisation du fichier de configuration sur votre système d'exploitation, consultez [Fichiers de Configuration de l'Agent][2].

### Variables d'environnement {#environment-variables}

Alternativement, vous pouvez configurer un proxy en définissant les variables d'environnement suivantes. Lorsque vous avez terminé, [redémarrez l'Agent Datadog][1].

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
DD_NO_PROXY_NONEXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

## Exemples de configuration de serveur proxy {#proxy-server-setup-examples}

Si vous n'avez pas de serveur proxy existant, Datadog recommande d'utiliser un proxy HTTP comme **Squid**.

1. **Squid (Recommandé)** : Un proxy HTTP/HTTPS robuste qui simplifie la configuration en proxyant de manière transparente tout le trafic HTTP/HTTPS sortant de l'Agent. [Utiliser un proxy Squid][3].
2. **HAProxy (Non recommandé)** : Peut transférer le trafic vers Datadog, mais cela nécessite de maintenir une liste à jour des domaines Datadog et est plus complexe à gérer. [Voir l'exemple de configuration HAProxy][4].
3. **NGINX (Non recommandé)** : Semblable à HAProxy, l'utilisation de NGINX pour transférer le trafic vers Datadog est déconseillée en raison de la charge de maintenance liée à la mise à jour des listes de domaines. [Voir l'exemple de configuration NGINX][5].

Datadog déconseille de transférer le trafic en utilisant des logiciels comme HAProxy ou NGINX car cela nécessite de configurer manuellement et de maintenir la liste des points de terminaison spécifiques de Datadog que l'Agent doit atteindre. Cette liste peut changer, ce qui peut entraîner une perte de données si elle n'est pas maintenue à jour. La seule exception est si vous avez besoin de capacités d'inspection approfondie des paquets (DPI), auquel cas vous pourriez envisager d'utiliser HAProxy ou NGINX car ils vous permettent de désactiver TLS ou d'utiliser vos propres certificats TLS et d'inspecter le trafic.

## Vérification {#verification}

Vérifiez la commande d'état de l'Agent et examinez les journaux de l'Agent (`agent.log`, `trace-agent.log`, etc.) pour toute erreur de connexion après le redémarrage.

## Proxy FIPS (US1-FED) {#fips-proxy-us1-fed}

Pour des informations sur la configuration du proxy FIPS de l'Agent Datadog avec l'Agent Datadog, consultez [Conformité FIPS de Datadog][6]. Le proxy FIPS n'est disponible que dans la région US1-FED. Le proxy FIPS de l'Agent Datadog ne peut pas être utilisé avec un proxy régulier.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/#restart-the-agent
[2]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file
[3]: /fr/agent/configuration/proxy_squid/
[4]: /fr/agent/faq/proxy_example_haproxy/
[5]: /fr/agent/faq/proxy_example_nginx/
[6]: /fr/agent/configuration/fips-compliance/