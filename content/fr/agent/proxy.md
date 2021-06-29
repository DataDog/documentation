---
title: Configuration de l'Agent pour un proxy
kind: documentation
aliases:
  - /fr/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
further_reading:
  - link: /logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process/
    tag: Documentation
    text: Recueillir vos processus
  - link: /tracing/
    tag: Documentation
    text: Recueillir vos traces
---
## Présentation

Si votre configuration réseau restreint le trafic sortant, transférez tout le trafic de l'Agent vers un ou plusieurs hosts dotés de stratégies de connexion sortante plus souples.

Il existe plusieurs options pour envoyer du trafic vers Datadog via SSL/TLS pour des hosts qui ne sont pas directement connectés à Internet.

1. Utilisation d'un proxy Web (p. ex., Squid ou Microsoft Web Proxy) déjà déployé sur votre réseau
2. Utilisation de HAProxy (si vous souhaitez appliquer le même proxy à **plus de 16 à 20 Agents**)
3. Utilisation de l'Agent en tant que proxy (**jusqu'à 16 Agents** par proxy, **seulement sur la version 5 de l'Agent**)

## Proxy Web

Les proxies Web traditionnels sont pris en charge de manière native par l'Agent. Si vous devez vous connecter à Internet via un proxy, modifiez le fichier de configuration de l'Agent.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Définissez différents serveurs de proxy pour les requêtes `https` et `http` dans le fichier de configuration `datadog.yaml` de votre Agent. L'Agent utilise `https` pour envoyer des données à Datadog, mais les intégrations peuvent utiliser le protocole `http` pour recueillir des métriques. Quelles que soient les requêtes à faire passer par un proxy, vous pouvez activer le SSL sur votre serveur proxy. Vous trouverez ci-dessous des exemples de configuration pour votre fichier `datadog.yaml`.

<div class="alert alert-warning">
Si la collecte de logs est activée, assurez-vous qu'un transport spécifique est <a href="/agent/logs/log_transport?tab=https#imposer-un-transport-specifique">imposé</a>.
Il est conseillé d'utiliser le transport HTTPS. Dans ce cas, le <code>&ltHOST&gt;:&ltPORT&gt;</code> utilisé pour transmettre via proxy des métriques est également utilisé pour transmettre via proxy des logs.
Si vous utilisez le transport TCP, consultez la page relative au <a href="/agent/logs/proxy">proxy TCP pour les logs</a>.
</div>

Définir un proxy HTTP pour toutes les requêtes `https` :

```yaml
proxy:
    https: "http://<SERVEUR_PROXY_SSL_POUR_HTTPS>:<PORT>"
```

Remarque : lorsque vous configurez un proxy HTTP pour des requêtes `https`, la communication entre l'Agent et Datadog est chiffrée de bout en bout avec TLS et ne peut pas être déchiffrée par le proxy. La seule communication non chiffrée est la requête `HTTP CONNECT` qui se fait entre l'Agent et le proxy pour établir la connexion TCP initiale entre l'Agent et Datadog. Ainsi, lorsque vous utilisez un proxy pour les requêtes `https`, il n'est pas nécessaire d'utiliser un proxy HTTPS pour chiffrer les communications entre l'Agent et Datadog.

Définir un proxy HTTPS pour les requêtes `https` et `http` :

```yaml
proxy:
    https: "https://<SERVEUR_PROXY_SSL_POUR_HTTPS>:<PORT>"
    http: "https://<SERVEUR_PROXY_SSL_POUR_HTTP>:<PORT>"
```

Définir un `<NOMUTILISATEUR>` et un `<MOTDEPASSE>` pour contacter le serveur proxy pour les requêtes `https` et `http` :

```yaml
proxy:
    https: "http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>"
    http: "http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTP>:<PORT>"
```

Utiliser la liste `no_proxy` pour spécifier les hosts qui doivent ignorer le proxy :

```yaml
proxy:
    https: "http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTPS>:<PORT>"
    http: "http://<NOMUTILISATEUR>:<MOTDEPASSE>@<SERVEUR_PROXY_POUR_HTTP>:<PORT>"
    no_proxy:
      - host1
      - host2
```

**Remarque** : toutes les intégrations qui envoient des requêtes HTTP(S) utilisent les paramètres de proxy définis dans le fichier de configuration `datadog.yaml` si aucun paramètre n'est spécifié au niveau de l'intégration. Pour modifier ce comportement, définissez `skip_proxy` sur true dans la configuration de chaque instance ou dans la configuration de secours `init_config` de votre intégration.

##### Valeurs acceptées pour NO_PROXY

* Un nom de domaine englobe ce nom et tous les sous-domaines.
  - Par ex, `datadoghq.com` englobe `app.agent.datadoghq.com`, `www.datadoghq.com`, `datadoghq.com`, mais **pas** `www.notdatadoghq.com`
  - Par ex., `datadoghq` englobe `frontend.datadoghq`, `backend.datadoghq`, mais **pas** `www.datadoghq.com` ou `www.datadoghq.eu`
* Un nom de domaine qui commence par un « . » englobe uniquement les sous-domaines.
  - Par ex., `.datadoghq.com` englobe `app.agent.datadoghq.com`, `www.datadoghq.com`, mais **pas** `datadoghq.com`
* Une plage CIDR englobe les adresses IP au sein du sous-réseau.
  - Par ex., `192.168.1.0/24` englobe la plage d'IP comprise entre `192.168.1.1` et `192.168.1.254`
* Une adresse IP exacte
  - Par ex., `169.254.169.254`
* Un hostname
  - Par ex., `webserver1`

`NO_PROXY` doit correspondre exactement aux endpoints des requêtes HTTP(S) de l'Agent. Activez `no_proxy_nonexact_match` pour autoriser l'Agent à appliquer aux valeurs `NO_PROXY` les mêmes règles (ci-dessus) utilisées pour les intégrations.

```yaml
no_proxy_nonexact_match: true
```

#### Avec des variables d'environnement

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
{{% tab "Agent v5" %}}

<div class="alert alert-warning">
Le <code>&ltHOST&gt;:&ltPORT&gt;</code> utilisé pour le proxy des métriques ne doit PAS être utilisé pour le proxy des logs. Consultez la section <a href="/agent/logs/proxy">Utilisation d'un proxy pour les logs</a>.
</div>

Modifiez le fichier `datadog.conf` en ajoutant les informations de votre proxy :

```text
# Si vous avez besoin d'un proxy pour vous connecter à Internet, indiquez les paramètres ci-dessous
proxy_host: mon-proxy.exemple.com
proxy_port: 3128
proxy_user: mon_utilisateur
proxy_password: mon_mdp
```

N'oubliez pas de [redémarrer l'Agent][1] pour que les nouveaux paramètres soient appliqués.

[1]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## HAProxy

[HAProxy][1] est une solution gratuite, rapide et fiable pouvant être utilisée comme proxy TCP ou HTTP. Même si HAProxy est généralement utilisé en tant que répartiteur de charge pour distribuer les requêtes entrantes vers les serveurs de pools, vous pouvez également l'utiliser pour appliquer un proxy au trafic de l'Agent vers Datadog à partir des hosts qui ne présentent aucune connectivité externe.

Il s'agit de la meilleure option si vous ne disposez pas d'un proxy web facilement disponible sur votre réseau et que vous souhaitez appliquer un proxy à un grand nombre d'Agents. Dans certains cas, une seule instance HAProxy suffit à gérer le trafic local de l'Agent sur votre réseau. Chaque proxy peut prendre en charge jusqu'à 1 000 Agents. (À noter qu'il s'agit d'une estimation modeste basée sur les performances d'instances m3.xl. Plusieurs variables liées au réseau peuvent influencer la charge sur les proxies. Comme toujours, effectuez le déploiement avec prudence. Consultez la [documentation relative à HAProxy][2] pour en savoir plus.)

`Agent ---> haproxy ---> Datadog`

### Redirection vers un proxy avec HAProxy

#### Configuration de HAProxy

HAProxy doit être installé sur un host connecté à Datadog. Utilisez le fichier de configuration suivant si vous ne l'avez pas déjà configuré.

{{< site-region region="us" >}}

```conf
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
# Ceci déclare un accès aux statistiques HAProxy sur le port 3833
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Cette section sert à recharger les enregistrements DNS
# Remplacez <IP_SERVEUR_DNS> et <IP_SERVEUR_DNS_SECONDAIRE> par les adresses IP de votre serveur DNS.
# Pour HAProxy 1.8 et versions ultérieures
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SERVEUR_DNS_SECONDAIRE>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des métriques (par exemple, la valeur pour « dd_url »).
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des traces (par exemple, la valeur pour « endpoint » dans la
# section de configuration de l'APM).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des processus (par exemple, la valeur pour « url » dans la
# section de configuration des processus).
frontend processes-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-processes

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des logs (par exemple, la valeur pour « logs.config.logs_dd_url »)
# En cas d'envoi de logs avec use_http: true
frontend logs_http_frontend
    bind *:3837
    mode http
    option tcplog
    default_backend datadog-logs-http

# En cas d'envoi de logs avec use_tcp: true
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs


# Le serveur Datadog. Toutes les requêtes TCP reçues par
# les frontends du Forwarder définis ci-dessus sont transmises par proxy
# aux endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    mode http
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 haproxy-app.agent.datadoghq.com:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership haproxy-app.agent.datadoghq.com:443 check port 443 ssl verify none

backend datadog-api
    mode http
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 api.datadoghq.com:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership api.datadoghq.com:443 check port 443 ssl verify none

backend datadog-flare
    mode http
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 flare.datadoghq.com:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership flare.datadoghq.com:443 check port 443 ssl verify none

backend datadog-traces
    balance roundrobin
    mode tcp
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 trace.agent.datadoghq.com:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership trace.agent.datadoghq.com:443 check port 443 ssl verify none

backend datadog-processes
    balance roundrobin
    mode tcp
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 process.datadoghq.com:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership process.datadoghq.com:443 check port 443 ssl verify none

backend datadog-logs-http
    balance roundrobin
    mode http
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 agent-http-intake.logs.datadoghq.com:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server datadog agent-http-intake.logs.datadoghq.com:443 check port 443 ssl verify none

```

**Remarque** : téléchargez le certificat avec la commande suivante :
        * `sudo apt-get install ca-certificates` (Debian, Ubuntu)
        * `yum install ca-certificates` (CentOS, Redhat)
Il est possible que le fichier se situe à l'emplacement `/etc/ssl/certs/ca-bundle.crt` sous CentOS et Redhat.

HAProxy 1.8 et versions ultérieures permettent au système de découverte des services DNS de détecter les modifications de serveur et de les appliquer automatiquement à votre configuration.
Si vous utilisez une version antérieure de HAProxy, vous devrez recharger ou redémarrer HAProxy. **Nous vous conseillons de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec la commande `service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy si `app.datadoghq.com` bascule vers une autre IP.

{{< /site-region >}}
{{< site-region region="eu" >}}

```conf
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

# Ceci déclare un accès aux statistiques HAProxy sur le port 3833
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Cette section sert à recharger les enregistrements DNS
# Remplacez <IP_SERVEUR_DNS> et <IP_SERVEUR_DNS_SECONDAIRE> par les adresses IP de votre serveur DNS.
# Pour HAProxy 1.8 et versions ultérieures
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SERVEUR_DNS_SECONDAIRE>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des métriques (par exemple, la valeur pour « dd_url »).
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des traces (par exemple, la valeur pour « endpoint » dans la
# section de configuration de l'APM).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des processus (par exemple, la valeur pour « url » dans la
# section de configuration des processus).
frontend processes-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-processes

# Ceci déclare l'endpoint auquel vos Agents se connectent pour
# envoyer des logs (par exemple, la valeur pour « logs.config.logs_dd_url »)
# En cas d'envoi de logs avec use_http: true
frontend logs_http_frontend
    bind *:3837
    mode http
    option tcplog
    default_backend datadog-logs-http

# Le serveur Datadog. Toutes les requêtes TCP reçues par
# les frontends du Forwarder définis ci-dessus sont transmises par proxy
# aux endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 haproxy-app.agent.datadoghq.eu:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership haproxy-app.agent.datadoghq.eu:443 check port 443 ssl verify none

backend datadog-api
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 api.datadoghq.eu:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership api.datadoghq.eu:443 check port 443 ssl verify none

backend datadog-flare
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 flare.datadoghq.eu:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership flare.datadoghq.eu:443 check port 443 ssl verify none

backend datadog-traces
    balance roundrobin
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 trace.agent.datadoghq.eu:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership trace.agent.datadoghq.eu:443 check port 443 ssl verify none

backend datadog-processes
    balance roundrobin
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 process.datadoghq.eu:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server mothership process.datadoghq.eu:443 check port 443 ssl verify none

backend datadog-logs-http
    balance roundrobin
    # La configuration suivante est pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 agent-http-intake.logs.datadoghq.eu:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # Supprimez la mise en commentaire de la configuration suivante pour les versions antérieures de HAProxy
    # server datadog agent-http-intake.logs.datadoghq.eu:443 check port 443 ssl verify none

```

**Remarque** : téléchargez le certificat avec la commande suivante :

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

Il est possible que le fichier se situe à l'emplacement `/etc/ssl/certs/ca-bundle.crt` sous CentOS et Redhat.

HAProxy 1.8 et versions ultérieures permettent au système de découverte des services DNS de détecter les modifications de serveur et de les appliquer automatiquement à votre configuration.
Si vous utilisez une version antérieure de HAProxy, vous devez recharger ou redémarrer HAProxy. **Nous vous conseillons de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec la commande `service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy si `app.datadoghq.com` bascule vers une autre IP.

{{< /site-region >}}

#### Configuration de l'Agent Datadog

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Connectez chaque Agent à HAProxy en définissant son `dd_url` sur l'adresse de HAProxy (par exemple, `haproxy.exemple.com`).
Le paramètre `dd_url` se trouve dans le fichier `datadog.yaml`.

`dd_url: http://haproxy.example.com:3834`

Pour envoyer des traces, des processus et des logs en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.yaml` :

```yaml
apm_config:
    apm_dd_url: http://haproxy.example.com:3835

process_config:
    process_dd_url: http://haproxy.example.com:3836

logs_config:
    use_http: true
    logs_dd_url: haproxy.example.com:3837
    logs_no_ssl: true
```

Ensuite, modifiez le fichier de configuration de l'Agent `datadog.yaml` et définissez `skip_ssl_validation` sur `true`. Ceci est nécessaire pour faire en sorte que l'Agent ignore la différence entre le hostname du certificat SSL (`app.datadoghq.com` ou `app.datadoghq.eu`) et le hostname de votre HAProxy :

```yaml
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

`dd_url: http://haproxy.example.com:3834`

Pour envoyer des traces ou des processus en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.conf` :

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3836
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

Si vous utilisez l'Agent Windows, modifiez votre fichier de configuration `datadog.conf` et ajoutez cette option :

```conf
skip_ssl_validation: yes
```

Pour terminer, [redémarrez l'Agent][1].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy sur `http://haproxy.exemple.com:3833` ainsi que l'[aperçu de l'infrastructure][2].

[1]: /fr/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## NGINX

[NGINX][3] est un serveur Web qui peut également être utilisé comme reverse proxy, répartiteur de charge, proxy de messagerie ou cache HTTP. Vous pouvez également utiliser NGINX comme proxy pour vos Agents Datadog :

`agent ---> nginx ---> Datadog`

### Redirection vers un proxy avec NGINX

#### Configuration de NGINX

Cet exemple de fichier `nginx.conf` peut être utilisé pour appliquer un proxy au trafic de l'Agent vers Datadog. Le dernier bloc de serveur dans cette configuration applique le protocole TLS pour garantir le chiffrement des logs internes en texte brut entre votre proxy et l'endpoint de l'API Datadog vers lequel les logs sont envoyés :

{{< site-region region="us" >}}


```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# Proxy HTTP pour l'Agent Datadog
http {
    server {
        listen 3834; #écouter les métriques
        access_log off;

        location /api/v1/validate {
            proxy_pass https://api.datadoghq.com:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_pass https://flare.datadoghq.com:443/support/flare/;
        }
        location / {
            proxy_pass https://haproxy-app.agent.datadoghq.com:443/;
        }
    }
}
# Proxy TCP pour l'Agent Datadog
stream {
    server {
        listen 3835; #écouter les traces
        proxy_ssl on;
        proxy_pass trace.agent.datadoghq.com:443;
    }
    server {
        listen 3836; #écouter les processus
        proxy_ssl on;
        proxy_pass process.datadoghq.com:443;
    }
    server {
        listen 3837; #écouter les logs avec use_http: true
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.datadoghq.com:443;
    }
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}


```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# Proxy HTTP pour l'Agent Datadog
http {
    server {
        listen 3834; #écouter les métriques
        access_log off;

        location /api/v1/validate {
            proxy_pass https://api.datadoghq.eu:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_pass https://flare.datadoghq.eu:443/support/flare/;
        }
        location / {
            proxy_pass https://haproxy-app.agent.datadoghq.eu:443/;
        }
    }
}
# Proxy TCP pour l'Agent Datadog
stream {
    server {
        listen 3835; #écouter les traces
        proxy_ssl on;
        proxy_pass trace.agent.datadoghq.eu:443;
    }
    server {
        listen 3836; #écouter les processus
        proxy_ssl on;
        proxy_pass process.datadoghq.eu:443;
    }
    server {
        listen 3837; #écouter les logs avec use_http: true
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.datadoghq.eu:443;
    }
}
```

{{< /site-region >}}

#### Configuration de l'Agent Datadog

Pour utiliser l'Agent Datadog v6/7.16 ou une version ultérieure comme collecteur de logs, demandez à l'Agent d'utiliser le proxy que vous venez de configurer plutôt que de se connecter directement à l'endpoint d'admission des logs en mettant à jour `datadog.yaml` :

```yaml
logs_config:
  use_http: true
  logs_dd_url: "<DOMAINE_SERVEUR_PROXY>:3837"
  logs_no_ssl: true
```

Pour envoyer logs via TCP, consultez la page relative au <a href="/agent/logs/proxy">proxy TCP pour les logs</a>.


## Agent Datadog

**Cette fonction est uniquement disponible avec l'Agent v5**

Nous vous conseillons d'utiliser un vrai proxy (un proxy web ou HAProxy) pour transférer votre trafic vers Datadog. Toutefois, si ce n'est pas possible, vous pouvez configurer une instance de l'Agent v5 pour vous en servir en tant que proxy.

1. Désignez un nœud **sur lequel est exécuté datadog-agent** comme proxy.
   Dans cet exemple, on part du principe que le nom du proxy est `proxy-node`. Ce nœud **doit** pouvoir atteindre `https://app.datadoghq.com`.

2. Vérifiez la connectivité SSL sur `proxy-node` :

    ```shell
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