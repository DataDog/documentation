---
disable_toc: false
private: true
title: Configuration du proxy de l'Agent 5
---

## Section Overview

Cette page couvre la configuration du proxy pour l'Agent 5. Pour obtenir des informations sur la dernière version de l'Agent, consultez la section [Configuration du proxy de l'Agent][1].

Si votre configuration réseau restreint le trafic sortant, vous pouvez utiliser un proxy pour transférer la totalité du trafic de l'Agent vers un ou plusieurs hosts dotés de stratégies de connexion sortante plus souples.

Quelques options sont disponibles pour envoyer du trafic à Datadog via SSL/TLS pour les hosts qui ne sont pas directement connectés à Internet.

1. Utiliser un proxy Web, tel que Squid ou Microsoft Web Proxy, qui est déjà déployé sur votre réseau. 
2. Utiliser HAProxy (si vous souhaitez proxyfier **plus de 16 à 20 Agents** via le même proxy).
3. Utiliser l'Agent comme proxy pour un maximum de 16 Agents par proxy. **L'utilisation de l'Agent comme proxy n'est prise en charge que sur l'Agent 5**.

## Conformité FIPS

Pour obtenir des informations sur la configuration du proxy FIPS de l'Agent Datadog avec l'Agent Datadog, consultez la section [Conformité FIPS de Datadog][1]. Le proxy FIPS n'est disponible que dans la région US1-FED. Le proxy FIPS de l'Agent Datadog ne peut pas être utilisé avec un proxy standard.

## Proxy Web

Pour obtenir des informations spécifiques concernant Squid, consultez la section [Squid][#squid] de cette page.

Les proxies Web traditionnels sont pris en charge de manière native par l'Agent. Si vous devez vous connecter à Internet via un proxy, modifiez le fichier de configuration de l'Agent.

<div class="alert alert-danger">
Le <code>&amp;ltHOST&gt;:&amp;ltPORT&gt;</code> utilisé pour le proxy des métriques ne peut PAS être utilisé pour le proxy des journaux. Voir la section <a href="/agent/logs/proxy">Proxy pour les journaux</a> Page (page).
</div>

Modifiez le fichier `datadog.conf` en ajoutant les informations de votre proxy :

```text
# Si vous avez besoin d'un proxy pour vous connecter à Internet, indiquez les paramètres ci-dessous
proxy_host: mon-proxy.exemple.com
proxy_port: 3128
proxy_user: mon_utilisateur
proxy_password: mon_mdp
```

N'oubliez pas de redémarrer l'Agent[2] pour que les nouveaux paramètres prennent effet.

### Squid

[Squid][3] est un proxy de transfert pour le Web prenant en charge HTTP, HTTPS, FTP et bien plus encore. Il fonctionne sur la plupart des systèmes d'exploitation disponibles, y compris Windows, et est distribué sous licence GNU GPL. Squid est une option simple si vous n'avez pas déjà un proxy Web en cours d'exécution dans votre réseau.

#### Redirection vers un proxy avec Squid

##### Configurer Squid pour envoyer uniquement du trafic vers Datadog

Installez Squid sur un host qui dispose d'une connectivité à la fois avec vos Agents internes et Datadog. Utilisez le gestionnaire de packages de votre système d'exploitation ou installez le logiciel directement depuis la [page du projet Squid][3].

Pour configurer Squid, modifiez le fichier de configuration. Ce fichier se trouve généralement dans `/etc/squid/squid.conf` sous Linux ou `C:\squid\etc\squid.conf` sous Windows.

Modifiez votre fichier de configuration `squid.conf` afin que Squid puisse accepter le trafic local et le transférer vers les intakes Datadog nécessaires :

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

##### Démarrer Squid

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

Si vous configurez Squid sous Windows, vous devez d'abord [configurer Squid en tant que service système][1]. Vous pouvez ensuite exécuter la commande suivante dans une invite de commandes Administrateur :

```bash
net start squid
```

Si Squid est déjà en cours d'exécution, redémarrez plutôt Squid avec les commandes suivantes :

```bash
net stop squid
net start squid
```

[1]: https://wiki.squid-cache.org/KnowledgeBase/Windows
{{% /tab %}}
{{< /tabs >}}

##### Configuration de l'Agent Datadog

Modifiez le fichier de configuration de l'Agent (`datadog.conf`) pour inclure les éléments suivants :

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

Après avoir enregistré ces modifications, [redémarrez l'Agent][2].

Vérifiez que Datadog est capable de recevoir les données de vos Agents en consultant votre [Infrastructure Overview][4].

## HAProxy

[HAProxy][5] est une solution gratuite, rapide et fiable qui peut être utilisée comme proxy TCP ou HTTP. Même si HAProxy est généralement utilisé en tant que répartiteur de charge pour distribuer les requêtes entrantes vers un pool de serveurs, vous pouvez également l'utiliser pour faire transiter par un proxy le trafic de l'Agent vers Datadog à partir des hosts qui ne présentent aucune connectivité externe :

`agent ---> haproxy ---> Datadog`

Il s'agit d'une autre bonne option si vous n'avez pas de proxy Web facilement disponible dans votre réseau et que vous souhaitez proxyfier un grand nombre d'Agents. Dans certains cas, une seule instance HAProxy suffit à gérer le trafic de l'Agent local dans votre réseau, car chaque proxy peut accueillir plus de 1 000 Agents.

**Remarque** : ce chiffre est une estimation prudente basée sur les performances des instances `m3.xl` spécifiquement. De nombreuses variables liées au réseau et à l'host peuvent influencer le débit de HAProxy, vous devez donc surveiller votre déploiement de proxy à la fois avant et après sa mise en service. Consultez la [documentation HAProxy][5] pour obtenir des informations supplémentaires.

La communication entre HAProxy et Datadog est toujours chiffrée avec TLS. La communication entre l'host de l'Agent et l'host HAProxy n'est pas chiffrée par défaut, car le proxy et l'Agent sont supposés être sur le même host. Cependant, il est recommandé de sécuriser cette communication avec le chiffrement TLS si l'host HAproxy et l'host de l'Agent ne sont pas situés sur le même réseau local isolé.
Pour chiffrer les données entre l'Agent et HAProxy, vous devez créer un certificat x509 avec l'extension Subject Alternative Name (SAN) pour l'host HAProxy. Ce bundle de certificats (*.pem) doit contenir à la fois le certificat public et la clé privée. Consultez cet [article de blog HAProxy][6] pour obtenir plus d'informations.


**Remarque** : Téléchargez le certificat Datadog avec l'une des commandes suivantes :

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Le chemin vers le certificat est `/etc/ssl/certs/ca-certificates.crt` pour Debian et Ubuntu, ou `/etc/ssl/certs/ca-bundle.crt` pour CentOS et Red Hat.

### Redirection vers un proxy avec HAProxy

#### Configuration de HAProxy

HAProxy doit être installé sur un host qui dispose d'une connectivité vers Datadog. Vous pouvez utiliser l'un des fichiers de configuration suivants si vous ne l'avez pas déjà configuré. La configuration dépend du service Datadog et du site. Pour consulter les configurations en fonction de votre [site Datadog][7], utilisez le sélecteur `DATADOG SITE` sur la droite.

**Remarque** : il est recommandé d'utiliser le fichier de configuration `HTTPS` si l'Agent et HAProxy ne font pas partie du même réseau local isolé.

##### HTTP

```conf
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

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connects for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connects for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connects for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your agents connects for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with force_use_http: true
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with force_use_tcp: true
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connects for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connects for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connects for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connects for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.forwarder.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This declares the endpoint where your Agents connects for
# receiving Remote Configurations (for example, the value of "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# This declares the endpoint where your Agents connect for
# sending Network Path data (for example, the value of "network_path.forwarder.dd_url")
frontend network_path_frontend
    bind *:3847
    mode http
    option tcplog
    default_backend datadog-network-path

# This is the Datadog server. In effect, any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-path
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

##### HTTPS

Cette configuration ajoute le chiffrement SSL/TLS sur la communication entre l'Agent et HAProxy. Remplacez la variable `<PATH_TO_PROXY_CERTIFICATE_PEM>` par le chemin vers le bundle de certificats du proxy (*.pem).

```conf
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

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connect for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connect for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connect for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your Agents connect for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connect for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with force_use_http: true
frontend logs_http_frontend
    bind *:3838 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with force_use_tcp: true
# frontend logs_frontend
#    bind *:10514 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connect for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connect for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connect for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.forwarder.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This declares the endpoint where your Agents connects for
# receiving Remote Configurations (for example, the value of "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# This declares the endpoint where your Agents connect for
# sending Network Path data (for example, the value of "network_path.forwarder.dd_url")
frontend network_path_frontend
    bind *:3847 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-path

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-path
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 netpath-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>
```

**Remarque** : vous pouvez utiliser `verify none` au lieu de `verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>` si vous ne parvenez pas à obtenir les certificats sur l'host du proxy, mais sachez que HAProxy ne pourra pas vérifier le certificat d'intake de Datadog dans ce cas.

HAProxy 1.8 et les versions plus récentes permettent la découverte de services DNS pour détecter les changements de serveur et les appliquer automatiquement à votre configuration.
Si vous utilisez une version plus ancienne de HAProxy, vous devez recharger ou redémarrer HAProxy. **Il est recommandé d'avoir une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (tel que `service haproxy reload`) pour forcer une actualisation du cache DNS de HAProxy, au cas où {{< region-param key="dd_full_site" code="true" >}} basculerait vers une autre adresse IP.

#### Configuration de l'Agent Datadog

Lors de l'utilisation du chiffrement entre l'Agent et HAProxy, si l'Agent n'a pas accès au certificat du proxy, est incapable de le valider ou si la validation n'est pas nécessaire, vous pouvez modifier le fichier de configuration `datadog.yaml` de l'Agent et définir `skip_ssl_validation` sur `true`.
Avec cette option définie sur `true`, l'Agent ignore l'étape de validation du certificat et ne vérifie pas l'identité du proxy, mais la communication est toujours chiffrée avec SSL/TLS.

```yaml
skip_ssl_validation: true
```

Enfin, [redémarrez l'Agent][2].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy à l'adresse `http://haproxy.example.com:3833` ainsi que l'[Infrastructure Overview][4]. 

Modifiez chaque Agent pour qu'il pointe vers HAProxy en définissant son `dd_url` sur l'adresse de HAProxy, par exemple : `haproxy.example.com`.
Ce paramètre `dd_url` se trouve dans le fichier `datadog.conf`.

`dd_url: http://haproxy.example.com:3834`

Pour envoyer des traces ou des processus en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.conf` :

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3837
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

Enfin, [redémarrez l'Agent][2].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy à l'adresse `http://haproxy.example.com:3833` ainsi que l'[Infrastructure Overview][4].

## NGINX

[NGINX][8] est un serveur Web qui peut également être utilisé comme reverse proxy, répartiteur de charge, proxy de messagerie ou cache HTTP. Vous pouvez également utiliser NGINX comme proxy pour vos Agents Datadog :

`agent ---> nginx ---> Datadog`

La communication entre NGINX et Datadog est toujours chiffrée avec TLS. La communication entre l'host de l'Agent et l'host NGINX n'est pas chiffrée par défaut, car le proxy et l'Agent sont supposés être sur le même host. Cependant, il est recommandé de sécuriser cette communication avec le chiffrement TLS s'ils ne sont pas situés sur le même réseau local isolé.
Afin de chiffrer les données entre l'Agent et NGINX, vous devez créer un certificat x509 avec l'extension Subject Alternative Name (SAN) pour l'host NGINX.

**Remarque** : téléchargez le certificat Datadog avec l'une des commandes suivantes : 

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Le chemin vers le certificat est `/etc/ssl/certs/ca-certificates.crt` pour Debian et Ubuntu ou `/etc/ssl/certs/ca-bundle.crt` pour CentOS et Red Hat.

### Redirection vers un proxy avec NGINX

#### Configuration de NGINX

NGINX doit être installé sur un host qui dispose d'une connectivité vers Datadog. Vous pouvez utiliser l'un des fichiers de configuration suivants si vous ne l'avez pas déjà configuré. La configuration dépend du service Datadog et du site. Pour consulter les configurations en fonction de votre [site Datadog][7], utilisez le sélecteur `DATADOG SITE` sur la droite.

**Remarque** : il est recommandé d'utiliser le fichier de configuration `HTTPS` si l'Agent et NGINX ne font pas partie du même réseau local isolé.

##### HTTP

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847; #listen for network path
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS

Cette configuration ajoute le chiffrement SSL/TLS sur la communication entre l'Agent et NGINX. Remplacez `<PATH_TO_PROXY_CERTIFICATE>` par le chemin vers le certificat public du proxy et `<PATH_TO_PROXY_CERTIFICATE_KEY>` par le chemin vers la clé privée.

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847 ssl; #listen for network path
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

**Remarque** : vous pouvez supprimer `proxy_ssl_verify on` si vous ne parvenez pas à obtenir les certificats sur l'host du proxy, mais sachez que NGINX ne pourra pas vérifier le certificat d'intake de Datadog dans ce cas.

#### Configuration de l'Agent Datadog

Modifiez chaque fichier de configuration de l'Agent pour qu'il pointe vers Nginx en définissant son `dd_url` sur l'adresse de Nginx, par exemple : `nginx.example.com`.
Ce paramètre `dd_url` se trouve dans le fichier `datadog.yaml`.

`dd_url: "<SCHEME>://nginx.example.com:3834"`

Remplacez `<SCHEME>` par `https` si vous avez précédemment choisi la configuration HAProxy HTTPS, ou par `http` si vous n'avez pas choisi HTTPS.

Pour envoyer des traces, des profils, des processus et des logs via le proxy, configurez les éléments suivants dans le fichier `datadog.yaml` :

```yaml
apm_config:
    apm_dd_url: <SCHEME>://nginx.example.com:3835
    profiling_dd_url: <SCHEME>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHEME>://nginx.example.com:3837

logs_config:
    force_use_http: true
    logs_dd_url: nginx.example.com:3838
    # Comment the line below to use encryption between the Agent and NGINX
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # Comment the line below to use encryption between the Agent and NGINX
    no_tls: true
```


Lors de l'utilisation du chiffrement entre l'Agent et NGINX, si l'Agent n'a pas accès au certificat du proxy, est incapable de le valider ou si la validation n'est pas nécessaire, vous pouvez modifier le fichier de configuration `datadog.yaml` de l'Agent et définir `skip_ssl_validation` sur `true`.
Avec cette option définie sur `true`, l'Agent ignore l'étape de validation du certificat et ne vérifie pas l'identité du proxy, mais la communication est toujours chiffrée avec SSL/TLS.

```yaml
skip_ssl_validation: true
```

Lors de l'envoi de logs via TCP, consultez la section [Proxy TCP pour les logs][9].

## Agent Datadog

Il est recommandé d'utiliser un proxy réel (un proxy Web ou HAProxy) pour transférer votre trafic vers Datadog, cependant si ces options ne vous sont pas disponibles, il est possible de configurer une instance de l'**Agent v5** pour servir de proxy.

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

6. Vérifiez sur la [page Infrastructure][1] que tous les nœuds rapportent des données à Datadog.


[1]: https://app.datadoghq.com/infrastructure#overview

[1]: /fr/agent/configuration/fips-compliance
[2]: /fr/agent/guide/agent-5-commands
[3]: http://www.squid-cache.org/
[4]: https://app.datadoghq.com/infrastructure
[5]: http://haproxy.1wt.eu
[6]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[7]: /fr/getting_started/site/
[8]: https://www.nginx.com
[9]: /fr/agent/logs/proxy