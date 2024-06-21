---
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
title: Agent avec un proxy TCP pour l'envoi de logs
---

## Présentation

La collecte de logs nécessite la version >= 6.0 de l'Agent Datadog. Les versions antérieures de l'Agent n'incluent pas l'interface `Log collection`.

Depuis les versions 6.14 et 7.14 de l'Agent, il est conseillé d'utiliser et d'imposer l'utilisation du transport **HTTPS** (voir la section [Transport de l'Agent pour les logs][1]).
Si vous utilisez le transport HTTPS pour les logs, consultez la [documentation relative à la configuration de l'Agent pour un proxy][2] et utilisez les mêmes réglages de proxy que les autres types de données.

{{< tabs >}}
{{% tab "TCP" %}}

Si vous utilisez un proxy pour les transmissions TCP, configurez l'Agent Datadog de façon à envoyer les logs à votre proxy via TCP en utilisant les paramètres suivants dans le fichier de configuration `datadog.yaml` :

```yaml
logs_config:
  logs_dd_url: "<ENDPOINT_PROXY>:<PORT_PROXY>"
  logs_no_ssl: true
```

Les paramètres ci-dessus peuvent également être configurés avec les variables d'environnement suivantes :

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Remarque** : le paramètre `logs_no_ssl` est requis pour que l'Agent ignore la différence entre le hostname du certificat SSL ({{< region-param key="tcp_endpoint" code="true" >}}) et le hostname de votre proxy. Nous vous conseillons d'utiliser une connexion chiffrée SSL entre votre proxy et l'endpoint d'admission de Datadog.

* Configurez ensuite votre proxy afin d'écouter le port `<PROXY_PORT>` et de transmettre les logs reçus. Pour {{< region-param key="dd_site" code="true" >}}, utilisez {{< region-param key="tcp_endpoint" code="true" >}} sur le port {{< region-param key="tcp_endpoint_port" code="true" >}} et activez le chiffrement SSL.

* Téléchargez les `CA certificates` de chiffrement TLS pour le chiffrement SSL via la commande suivante :
  - `sudo apt-get install ca-certificates` (Debian, Ubuntu)
  - `yum install ca-certificates` (CentOS, Redhat)

  Ensuite, utilisez le fichier certificat situé dans `/etc/ssl/certs/ca-certificates.crt` (Debian, Ubuntu) ou `/etc/ssl/certs/ca-bundle.crt` (CentOS, Redhat)

{{% /tab %}}
{{% tab "SOCKS5" %}}

Pour envoyer vos logs à votre compte Datadog avec un serveur proxy SOCKS5, utilisez les paramètres suivants dans votre fichier de configuration `datadog.yaml` :

```yaml
logs_config:
  socks5_proxy_address: "<URL_DU_PROXY_SOCKS5>:<PORT_DU_PROXY_SOCKS5>"
```

Le paramètre ci-dessus peut également être configuré avec la variable d'environnement suivante :

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## Exemples de proxy TCP

{{< tabs >}}
{{% tab "HAProxy" %}}
### Utiliser HAProxy en tant que proxy TCP pour les logs

Cet exemple vous explique comment configurer l'Agent Datadog afin d'envoyer des logs à un serveur via le protocole TCP. Pour ce faire, vous devez installer HAProxy et effectuer une écoute sur le port `10514`, puis transmettre les logs à Datadog.

`Agent ---> haproxy ---> Datadog`

Le chiffrement est désactivé entre l'Agent et HAProxy. Ce service est ensuite configuré de façon à chiffrer les données avant qu'elles ne soient envoyées à Datadog.

#### Configuration de l'Agent

Modifiez le fichier de configuration de l'Agent `datadog.yaml` et définissez `logs_no_ssl` sur `true`. Cette opération est requise. En effet, HAProxy ne transmet pas le trafic et ne fait pas partie du backend Datadog. Vous ne pouvez donc pas utiliser le même certificat.

**Remarque** : `logs_no_ssl` peut être défini sur true, car HAProxy est configuré de façon à chiffrer les données. Ne définissez pas ce paramètre sur `true` si ce n'est pas le cas.

```
logs_config:
  force_use_tcp: true
  logs_dd_url: "<DOMAINE_SERVEUR_PROXY>:10514"
  logs_no_ssl: true
```

#### Configuration de HAProxy

HAProxy doit être installé sur un host connecté à Datadog. Utilisez le fichier de configuration suivant si vous ne l'avez pas déjà configuré.

{{% site-region region="us" %}}

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
# Cela déclare un accès aux statistiques HAProxy sur le port 3833.
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# Cette section recharge les entrées du DNS.
# Remplacer <IP_SERVEUR_DNS> et <IP_SECONDAIRE_SERVEUR_DNS> par les adresses IP du serveur DNS.
# Pour HAProxy 1.8 et ultérieur
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SECONDAIRE_SERVEUR_DNS>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# Cela déclare l'endpoint auquel vos Agents se connectent pour
# envoyer les logs (p. ex., la valeur de logs.config.logs_dd_url)
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# Le serveur Datadog. Toutes les requêtes TCP reçues par
# les frontends du Forwarder définis ci-dessus sont transmises par proxy
# aux endpoints publics de Datadog.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**Remarque** : téléchargez le certificat avec la commande suivante :

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

Si le téléchargement fonctionne, le fichier est stocké à l'emplacement suivant pour CentOS et Redhat : `/etc/ssl/certs/ca-bundle.crt`.

Une fois la configuration de HAProxy effectuée, vous pouvez recharger ou redémarrer le service. **Nous vous conseillons de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec la commande `service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy si `app.datadoghq.com` bascule vers une autre IP.

{{% /site-region %}}
{{% site-region region="eu" %}}

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
# Cela déclare un accès aux statistiques HAProxy sur le port 3833.
# Vous n'avez pas besoin d'identifiants pour afficher cette page et vous pouvez
# désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# Cette section recharge les entrées du DNS.
# Remplacer <IP_SERVEUR_DNS> et <IP_SECONDAIRE_SERVEUR_DNS> par les adresses IP du serveur DNS.
# Pour HAProxy 1.8 et ultérieur
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SECONDAIRE_SERVEUR_DNS>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# Cela déclare l'endpoint auquel vos Agents se connectent pour
# envoyer les logs (p. ex., la valeur de logs.config.logs_dd_url)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
# Le serveur Datadog. Toutes les requêtes TCP reçues par
# les frontends du Forwarder définis ci-dessus sont transmises par proxy
# aux endpoints publics de Datadog.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

Téléchargez le certificat avec la commande suivante :

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

Si le téléchargement fonctionne, le fichier est stocké à l'emplacement suivant pour CentOS et Redhat : `/etc/ssl/certs/ca-bundle.crt`.

Une fois la configuration de HAProxy effectuée, vous pouvez recharger ou redémarrer le service. **Nous vous conseillons de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple avec la commande `service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy si `app.datadoghq.eu` bascule vers une autre IP.

{{< /site-region >}}

{{% /tab %}}

{{% tab "NGINX" %}}
### Utiliser NGINX en tant que proxy TCP pour les logs

#### Configuration de l'Agent

Modifiez le fichier de configuration de l'Agent `datadog.yaml` et définissez `logs_config.logs_dd_url` de façon à utiliser le nouveau proxy, au lieu d'établir une connexion directe avec Datadog :

```yaml
logs_config:
  force_use_tcp: true
  logs_dd_url: monServeurProxy.monDomaine:10514
```

**Remarque** : ne modifiez pas le paramètre `logs_no_ssl`. En effet, NGINX transmet le trafic à Datadog sans le chiffrer ni le déchiffrer.

#### Configuration de NGINX

Dans cet exemple, le fichier `nginx.conf` peut être utilisé pour transmettre le trafic à Datadog en passant par un proxy. Avec cette configuration, le dernier bloc du serveur incorpore le protocole TLS pour garantir le chiffrement des logs internes en texte brut entre votre proxy et l'endpoint de l'API Datadog vers lequel les logs sont envoyés :

{{% site-region region="us" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Proxy TCP pour l'Agent Datadog
stream {
    server {
        listen 10514; #écoute des logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Proxy TCP pour l'Agent Datadog
stream {
    server {
        listen 10514; #écoute des logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /site-region %}}
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/log_transport?tab=https
[2]: /fr/agent/configuration/proxy/
