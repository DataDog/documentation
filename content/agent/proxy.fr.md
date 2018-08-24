---
title: Configuration de Agent pour proxy
kind: documentation
aliases:
  - /fr/agent/proxy
further_reading:
  - link: logs/
    tag: Documentation
    text: Collectez vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Collectez vos processus
  - link: tracing
    tag: Documentation
    text: Collectez vos traces
---
## Pourquoi utiliser un Proxy

Si votre configuration réseau restreint le trafic sortant, proxy tout le trafic d'Agent] via un ou plusieurs host qui ont des stratégies sortantes plus permissives.

Quelques options sont disponibles pour envoyer du trafic vers Datadog via SSL/TLS pour des hosts qui ne sont pas directement connectés à Internet.

1. Utilisation de l'agent comme proxy (pour **jusqu'à 16 agents** par proxy)
2. Utilisation d'un proxy Web (par exemple, Squid, Microsoft Web Proxy) déjà déployé sur votre réseau
3. En utilisant HAProxy (si vous voulez proxy **plus de 16-20 Agents** via le
le même proxy)

## Utiliser l'Agent comme un proxy

**Cette fonctionnalité n'est pas encore disponible pour l'Agent v6**

1. Désignez un noeud **exécutant l'agent datadog** comme proxy.
   Dans cet exemple, supposons que le nom du proxy est `proxy-node`. Ce noeud **doit** pouvoir atteindre `https://app.datadoghq.com`.

2. Vérifier la connectivité SSL sur `proxy-node`
    ```
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. Autorise le trafic non local sur `proxy-node` en changeant la ligne suivante dans` datadog.conf`.
     `# non_local_traffic: no` devrait être  `non_local_traffic: yes`.

4. Assurez-vous que `proxy-node` peut être atteint à partir des autres noeuds sur le port 17123. Démarrez l'Agent sur le  `proxy-node` et exécutez sur les autres noeuds:

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. Mettez à jour les nœuds non-proxy pour transmettre à `proxy-node`. Changez la ligne suivante dans `datadog.conf` depuis:

    `dd_url: https://app.datadoghq.com`
to
    `dd_url: http://proxy-node:17123`

6. Vérifiez sur la [page Infrastructure][1] que tous les nœuds rapportent des données à Datadog.

## Utilisation d'un proxy Web en tant que proxy

Les proxys Web traditionnels sont pris en charge de manière native par l'agent. Si vous devez vous connecter à Internet via un proxy, modifiez le fichier de configuration de l'Agent.

### Agent v6

Modifiez le fichier `datadog.yaml` avec vos informations de proxy. Utilisez la liste `no_proxy` pour spécifier les hôtes qui doivent ignorer le proxy.

```
proxy:
    http: http(s)://user:password@proxy_for_http:port
    https: http(s)://user:password@proxy_for_https:port
#   no_proxy:
#     - host1
#     - host2
```

### Agent v5

Editez le fichier `datadog.conf` avec vos informations de proxy:

```
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

N'oubliez pas de [Redémarrer l'Agent][2] pour prendre en compte le changement de configuration.

## Utiliser HAProxy comme proxy

[HAProxy][3] est une solution gratuite, rapide et fiable offrant un proxying pour les applications TCP et HTTP. Tandis que HAProxy est généralement utilisé comme un équilibreur de charge pour distribuer les requêtes entrantes sur des pools de serveurs, vous pouvez également l'utiliser pour proxy le trafic de l'agent vers Datadog à partir d'host qui ne sont pas relié à internet.

C'est la meilleure option si vous n'avez pas de proxy web disponible dans votre réseau et que vous souhaitez utiliser un grand nombre d'agents. Dans certains cas, une seule instance HAProxy est suffisante pour gérer le trafic d'agent local sur votre réseau - chaque proxy peut héberger jusqu'à 1000 agents (sachez que ce chiffre est une estimation prudente basée sur les performances des instances m3.xl en particulier. les variables liées peuvent influencer la charge sur les proxies. Comme toujours, pensez à déployer prudemment .Visitez [HAProxy documentation][6] pour plus d'informations).

`agent ---> haproxy ---> Datadog`

Nous supposons que HAProxy est installé sur un host qui est connecté à Datadog.
Utilisez le fichier de configuration suivant si vous ne l'avez pas déjà configuré.

```
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3835
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This declares the endpoint where your Agents connects for
# sending metrics (e.g. the value of "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# This declares the endpoint where your Agents connects for
# sending traces (e.g. the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# This declares the endpoint where your agents connects for
# sending processes (e.g. the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.com:443 check port 80

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.com:443 check port 80

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.agent.datadoghq.com:443 check port 80
```

Une fois la configuration HAProxy en place, vous pouvez la reload ou redémarrer HAProxy.

**Nous recommandons d'avoir un job `cron` qui reloads HAProxy toutes les 10 minutes** (en faisant quelque chose comme` service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy, dans le cas où `app.datadoghq.com` changerait d'adresse IP.

Ensuite, éditez chaque Agent pour qu'il pointe sur HAProxy en définissant leur paramètre `dd_url` sur l'adresse de HAProxy (par exemple haproxy.example.com). Ce paramètre `dd_url` peut être trouvé dans` datadog.conf` pour l'Agent v5 et `datadog.yaml` pour l'Agent v6.

`dd_url: https://haproxy.example.com:3834`

Si vous voulez envoyer des traces ou des processus à travers le proxy, vous devez implémenter le code suivant dans votre `datadog.conf` pour l'Agent v5:

```
[trace.api]
endpoint = https://haproxy.example.com:3835

[process.api]
url = https://haproxy.example.com:3836
 ```

Pour l'Agent v6, ajoutez la configuration suivante dans `datadog.yaml`:

```
apm_config:
    endpoint: https://haproxy.example.com:3836

process_config:
    url: https://haproxy.example.com:3835
```

Avant de [redémarrer l'agent][2], modifiez la configuration de votre supervisor pour désactiver la vérification du certificat SSL. Ceci est nécessaire pour empêcher python de se plaindre de l'écart entre le nom d'host sur le certificat SSL (app.datadoghq.com) et votre nom d'host HAProxy.

####  Sur GNU/Linux, macOS, FreeBSD, SmartOS:
Vous devez modifier la configuration du supervisor trouvée sur:

* `/etc/dd-agent/supervisor_ddagent.conf` on debian-based systems
* `/etc/dd-agent/supervisor.conf` on redhat-based systems
* `/opt/local/datadog/supervisord/supervisord.conf` on SmartOS
* `/usr/local/etc/datadog/supervisord/supervisord.conf` on FreeBSD
* `~/.datadog-agent/supervisord/supervisord.conf` on macOS

En supposant que ce fichier est trouvé à `SUP_FILE`
```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' SUP_FILE
```

#### Sous Windows (à partir de l'Agent 3.9.2):

Editez votre fichier de configuration `datadog.conf` et ajoutez cette option:
```
skip_ssl_validation: yes
```

[Redémarez votre Agent][4]

Pour vérifier que tout fonctionne correctement, examinez les statistiques HAProxy à `http://haproxy.example.com:3835` ainsi que la [Présentation de l'infrastructure][5].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure#overview
[2]: /agent/faq/agent-commands
[3]: http://haproxy.1wt.eu
[4]: /agent/#start-stop-restart-the-agent/#windows
[5]: https://app.datadoghq.com/infrastructure
[6]: http://www.haproxy.org/#perf
