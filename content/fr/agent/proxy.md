---
title: Configuration de l'Agent pour un proxy
kind: documentation
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
## Pourquoi utiliser un proxy

Si votre configuration réseau restreint le trafic sortant, transférez tout le trafic de l'Agent vers un ou plusieurs hosts dotés de stratégies de connexion sortante plus souples.

Il existe plusieurs options pour envoyer du trafic vers Datadog via SSL/TLS pour des hosts qui ne sont pas directement connectés à Internet.

1. Utilisation d'un proxy Web (p. ex., Squid ou Microsoft Web Proxy) déjà déployé sur votre réseau
2. Utilisation de HAProxy (si vous souhaitez appliquer le même proxy à **plus de 16 à 20 Agents**)
3. Utilisation de l'Agent en tant que proxy (**jusqu'à 16 Agents** par proxy, **seulement sur la version 5 de l'Agent**)

## Utilisation d'un proxy Web en tant que proxy

Les proxys Web traditionnels sont pris en charge de manière native par l'Agent. Si vous devez vous connecter à Internet via un proxy, modifiez le fichier de configuration de l'Agent.

{{< tabs >}}
{{% tab "Agent v6" %}}

Définissez différents serveurs de proxy pour les requêtes `https` et `http` dans le fichier de configuration `datadog.yaml` de votre Agent.
L'Agent utilise `https` pour envoyer des données à Datadog, mais les intégrations peuvent utiliser le protocole `http` pour recueillir des métriques. Quelles que soient les requêtes à faire passer par un proxy, vous pouvez activer le SSL sur votre serveur proxy. Vous trouverez ci-dessous des exemples de configuration pour votre fichier `datadog.yaml`.

<div class="alert alert-warning">
Le <code>&ltHOST&gt;:&ltPORT&gt;</code> utilisé pour le proxy des métriques ne doit PAS être utilisé pour le proxy des logs. Consultez la section <a href="/agent/logs/proxy">Utilisation d'un proxy pour les logs</a>.
</div>

Définir un proxy HTTP pour toutes les requêtes `https` :

```
proxy:
    https: http://<SERVEUR_PROXY_SSL_POUR_HTTPS>:<PORT>
```

Remarque : lorsque vous configurez un proxy HTTP pour des requêtes `https`, la communication entre l'Agent et Datadog est chiffrée de bout en bout avec TLS et ne peut pas être déchiffrée par le proxy. La seule communication non chiffrée est la requête `HTTP CONNECT` qui se fait entre l'Agent et le proxy pour établir la connexion TCP initiale entre l'Agent et Datadog. Ainsi, lorsque vous utilisez un proxy pour les requêtes `https`, il n'est pas nécessaire d'utiliser un proxy HTTPS pour chiffrer les communications entre l'Agent et Datadog.

Définir un proxy HTTPS pour les requêtes `https` et `http` :

```
proxy:
    https: https://<SERVEUR_PROXY_SSL_POUR_HTTPS>:<PORT>
    http: https://<SERVEUR_PROXY_SSL_POUR_HTTP>:<PORT>
```

Définir un `<NOMUTILISATEUR>` et un `<MOTDEPASSE>` pour contacter le serveur proxy pour les requêtes `https` et `http` :

```
proxy:
    https: http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>
    http: http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>
```

Utiliser la liste `no_proxy` pour spécifier les hosts qui doivent ignorer le proxy :

```
proxy:
    https: http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>
    http: http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>
    no_proxy:
      - host1
      - host2
```

**Proxy avec variables d'environnement** :

À partir de l'Agent v6.4, vous pouvez définir vos paramètres de proxy via des variables d'environnement :

* `DD_PROXY_HTTPS` : définit un serveur proxy pour les requêtes `https`.
* `DD_PROXY_HTTP` : définit un serveur proxy pour les requêtes `http`.
* `DD_PROXY_NO_PROXY` : définit une liste de hosts qui doivent ignorer le proxy. La liste est séparée par des espaces.

Les variables d'environnement sont prioritaires sur les valeurs dans le fichier `datadog.yaml`. Si les variables d'environnement sont présentes avec une valeur vide (par exemple, ``DD_PROXY_HTTP=""``), l'Agent utilise ces valeurs vides à la place des options dont la priorité est plus faible.

Sur les hosts Unix, un proxy sur l'ensemble du système peut être défini avec des variables d'environnement standard, comme `HTTPS_PROXY`, `HTTP_PROXY` et `NO_PROXY`. L'Agent les utilise si elles sont présentes. Attention : ces variables ont également un impact sur l'ensemble des requêtes provenant des intégrations, y compris les services d'orchestration comme Docker, ECS et Kubernetes.

L'Agent utilise les valeurs suivantes par ordre de priorité :

1. Les variables d'environnement `DD_PROXY_HTTPS`, `DD_PROXY_HTTP` et `DD_PROXY_NO_PROXY`
2. Les variables d'environnement `HTTPS_PROXY`, `HTTP_PROXY` et `NO_PROXY`
3. Les valeurs spécifiées dans `datadog.yaml`

{{% /tab %}}
{{% tab "Agent v5" %}}

<div class="alert alert-warning">
Le <code>&ltHOST&gt;:&ltPORT&gt;</code> utilisé pour le proxy des métriques ne doit PAS être utilisé pour le proxy des logs. Consultez la section <a href="/agent/logs/proxy">Utilisation d'un proxy pour les logs</a>.
</div>

Modifiez le fichier `datadog.conf` en ajoutant les informations de votre proxy :

```
# Si vous avez besoin d'un proxy pour vous connecter à Internet, indiquez les paramètres ci-dessous
proxy_host: mon-proxy.exemple.com
proxy_port: 3128
proxy_user: mon_utilisateur
proxy_password: mon_mdp
```

N'oubliez pas de [redémarrer l'Agent][1] pour que les nouveaux paramètres soient appliqués.


[1]: /fr/agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

## Utiliser HAProxy en tant que proxy

[HAProxy][1] est une solution gratuite, rapide et fiable pouvant être utilisée comme proxy TCP ou HTTP. Même si HAProxy est généralement utilisé en tant que répartiteur de charge pour distribuer les requêtes entrantes vers les serveurs de pools, vous pouvez également l'utiliser pour appliquer un proxy au trafic de l'Agent vers Datadog à partir des hosts qui ne présentent aucune connectivité externe.

Il s'agit de la meilleure option si vous ne disposez pas d'un proxy web facilement disponible sur votre réseau et que vous souhaitez appliquer un proxy à un grand nombre d'Agents. Dans certains cas, une seule instance HAProxy suffit à gérer le trafic local de l'Agent sur votre réseau. Chaque proxy peut prendre en charge jusqu'à 1 000 Agents. (À noter qu'il s'agit d'une estimation modeste basée sur les performances d'instances m3.xl. Plusieurs variables liées au réseau peuvent influencer la charge sur les proxys. Comme toujours, effectuez le déploiement avec prudence. Consultez la [documentation relative à HAProxy][2] pour en savoir plus.)

`agent ---> haproxy ---> Datadog`

### Redirection de métriques de proxy avec HAProxy
#### Configuration de HAProxy

HAProxy doit être installé sur un host connecté à Datadog. Utilisez le fichier de configuration suivant si vous ne l'avez pas déjà configuré.

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```
# Configuration de base
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Quelques paramètres par défaut
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# Ceci déclare un accès aux statistiques HAProxy, sur le port 3833
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# la désactiver une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des métriques (par exemple, la valeur de « dd_url »).
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des traces (par exemple, la valeur de l'endpoint dans la
# section de configuration de l'APM).
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des processus (par exemple, la valeur de « url » dans
# la section de configuration du processus).
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des logs (par exemple, la valeur de « logs.config.logs_dd_url »)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# Il s'agit du serveur Datadog. Toutes les requêtes TCP provenant
# des front-ends du redirecteur définis ci-dessus sont transmises via proxy vers
# les endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.com:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.com:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.com:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

Une fois la configuration HAProxy effectuée, vous pouvez la recharger ou redémarrer HAProxy.

**Il est recommandé de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec le commande `service haproxy reload`) pour forcer une actualisation du cache DNS de HAProxy si `app.datadoghq.com` bascule vers une autre IP.

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```
# Configuration de base
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Quelques paramètres par défaut
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# Ceci déclare un accès aux statistiques HAProxy, sur le port 3833
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# la désactiver une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des métriques (par exemple, la valeur de « dd_url »).
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des traces (par exemple, la valeur de l'endpoint dans la
# section de configuration de l'APM).
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des processus (par exemple, la valeur de « url » dans
# la section de configuration du processus).
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# Ceci déclare l'endpoint où vos Agents se connectent pour
# envoyer des logs (par exemple, la valeur de « logs.config.logs_dd_url »)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# Il s'agit du serveur Datadog. Les requêtes TCP provenant
# des front-ends du redirecteur définis ci-dessus sont transmises via proxy vers
# les endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.eu:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.eu:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.eu:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 443
```

Une fois la configuration HAProxy effectuée, vous pouvez la recharger ou redémarrer HAProxy.

**Il est recommandé de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec le commande `service haproxy reload`) pour forcer une actualisation du cache DNS de HAProxy si `app.datadoghq.eu` bascule vers une autre IP.

{{% /tab %}}
{{< /tabs >}}

#### Configuration de l'Agent Datadog

{{< tabs >}}
{{% tab "Agent v6" %}}

Connectez chaque Agent à HAProxy en définissant son `dd_url` sur l'adresse de HAProxy (par exemple, `haproxy.exemple.com`).
Le paramètre `dd_url` se trouve dans le fichier `datadog.yaml`.

`dd_url: https://haproxy.exemple.com:3834`

Pour envoyer des traces ou des processus en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.yaml` :

```
apm_config:
    apm_dd_url: https://haproxy.exemple.com:3835

process_config:
    process_dd_url: https://haproxy.exemple.com:3836
```

Ensuite, modifiez le fichier de configuration de l'Agent `datadog.yaml` et définissez `skip_ssl_validation` sur `true`. Ceci est nécessaire pour faire en sorte que l'Agent ignore la différence entre le hostname du certificat SSL (`app.datadoghq.com` ou `app.datadoghq.eu`) et le hostname de votre HAProxy :

```
skip_ssl_validation: true
```

Pour terminer, [redémarrez l'Agent][1].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy sur `http://haproxy.exemple.com:3833` ainsi que l'[aperçu de l'infrastructure][2].

[1]: /fr/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "Agent v5" %}}

Connectez chaque Agent à HAProxy en définissant son `dd_url` sur l'adresse de HAProxy (par exemple, `haproxy.exemple.com`).
Le paramètre `dd_url` se trouve dans le fichier `datadog.conf`.

`dd_url: https://haproxy.exemple.com:3834`

Pour envoyer des traces ou des processus en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.conf` :

```
[trace.api]
endpoint = https://haproxy.exemple.com:3835

[process.api]
endpoint = https://haproxy.exemple.com:3836
```

Modifiez la configuration de votre superviseur pour désactiver la vérification du certificat SSL. Ceci est nécessaire pour forcer Python à ignorer la différence entre le hostname du certificat SSL (`app.datadoghq.com`) et le hostname de votre HAProxy. Le fichier de configuration du superviseur se trouve à l'emplacement suivant :

* `/etc/dd-agent/supervisor_ddagent.conf` sur les systèmes basés sur Debian
* `/etc/dd-agent/supervisor.conf` sur les systèmes basés sur Red Hat
* `/opt/local/datadog/supervisord/supervisord.conf` sur SmartOS
* `/usr/local/etc/datadog/supervisord/supervisord.conf` sur FreeBSD
* `~/.datadog-agent/supervisord/supervisord.conf` sur macOS

Si on part du principe que le fichier de supervision se nomme `<FICHIER_SUP>` :

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <FICHIER_SUP>
```

Pour l'Agent Windows, modifiez votre fichier de configuration `datadog.conf` et ajoutez cette option :

```
skip_ssl_validation: yes
```

Pour terminer, [redémarrez l'Agent][1].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy sur `http://haproxy.exemple.com:3833` ainsi que l'[aperçu de l'infrastructure][2].


[1]: /fr/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## Utiliser NGINX en tant que proxy

[NGINX][3] est un serveur web qui peut également être utilisé comme reverse proxy, répartiteur de charge, proxy de messagerie ou cache HTTP. Vous pouvez utiliser NGINX comme proxy pour envoyer les logs à Datadog :

`agent ---> nginx ---> Datadog`

### Redirection vers un proxy avec NGINX
#### Configuration NGINX

Cet exemple de fichier `nginx.conf` peut être utilisé pour transmettre des logs à Datadog en passant par un proxy. Le protocole TLS est appliqué pour garantir le chiffrement de vos logs internes en texte brut entre votre proxy et l'endpoint de l'API Datadog vers lequel les logs sont envoyés :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
# proxy TCP pour les logs Datadog
stream {
    server {
        listen 10514; # port d'écoute du proxy
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
# proxy TCP pour les logs Datadog
stream {
    server {
        listen 10514; # port d'écoute du proxy
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Configuration de l'Agent Datadog

Pour utiliser l'Agent Datadog v6 comme collecteur de logs, demandez à l'Agent d'utiliser le proxy que vous venez de configurer plutôt que de se connecter directement à l'endpoint d'admission des logs en mettant à jour `datadog.yaml` :

```yaml
logs_config:
  logs_dd_url: monServeurProxy.monDomaine:10514
  logs_no_ssl: true
```

Le paramètre `logs_no_ssl` est défini sur `true` car la connexion SSL/TLS est gérée par l'option `proxy_ssl on` de NGINX. **Remarque** : définissez cette option sur `false` si vous n'avez pas l'intention d'utiliser un proxy capable de chiffrer la connexion vers l'endpoint d'admission des logs.

## Utiliser l'Agent comme proxy

**Cette fonction est uniquement disponible avec l'Agent v5**

Nous vous conseillons d'utiliser un vrai proxy (un proxy web ou HAProxy) pour transférer votre trafic vers Datadog. Toutefois, si ce n'est pas possible, vous pouvez configurer une instance de l'Agent v5 pour vous en servir en tant que proxy.

1. Désignez un nœud **running datadog-agent** comme proxy.
   Dans cet exemple, on part du principe que le nom du proxy est `proxy-node`. Ce nœud **doit** pouvoir atteindre `https://app.datadoghq.com`.

2. Vérifiez la connectivité SSL sur `proxy-node`
    ```
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. Autorisez le trafic non local sur `proxy-node` en modifiant la ligne suivante dans `datadog.conf`.
     `# non_local_traffic: no` doit être remplacé par `non_local_traffic: yes`.

4. Assurez-vous que `proxy-node` peut être atteint à partir des autres nœuds sur le port 17123. Démarrez l'Agent sur le `proxy-node` et exécutez-le sur les autres nœuds :

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. Mettez à jour les nœuds non-proxy afin de rediriger vers `proxy-node`. Modifiez la ligne suivante dans `datadog.conf` en remplaçant :

    `dd_url: https://app.datadoghq.com`
par
    `dd_url: http://proxy-node:17123`

6. Accédez à la [page relative à l'infrastructure][4] pour vérifier que tous les nœuds envoient des données à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://haproxy.1wt.eu
[2]: http://www.haproxy.org/#perf
[3]: https://www.nginx.com
[4]: https://app.datadoghq.com/infrastructure#overview
