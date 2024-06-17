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
- link: /agent/configuration/agent-fips-proxy
  tag: Documentation
  text: Conformité de Datadog à la norme FIPS
kind: documentation
title: Configuration de l'Agent pour un proxy
---

## Présentation

Si votre configuration réseau restreint le trafic sortant, vous pouvez utiliser un proxy pour transférer la totalité du trafic de l'Agent vers un ou plusieurs hosts dotés de stratégies de connexion sortante plus souples.

Il existe plusieurs façons d'envoyer du trafic vers Datadog via SSL/TLS pour les hosts qui ne sont pas directement connectés à Internet.

1. Utilisation d'un proxy Web (tel que Squid ou Microsoft Web Proxy) déjà déployé sur votre réseau
2. Utilisation de HAProxy (si vous souhaitez utiliser le même proxy pour **plus de 16 à 20 Agents**)
3. Utilisation de l'Agent en tant que proxy (**jusqu'à 16 Agents** par proxy, **seulement sur la version 5 de l'Agent**)

## Conformité à la norme FIPS

Pour en savoir plus sur la configuration du proxy FIPS de l'Agent Datadog avec l'Agent Datadog, consultez la section [Conformité de Datadog à la norme FIPS][1]. Le proxy FIPS est uniquement disponible pour la région US1-FED. Il ne peut pas être utilisé en même temps qu'un proxy standard.

## Proxy Web

Pour consulter les informations relatives à Squid, accédez à la section [Squid](#squid) de cette page.

Les proxies Web traditionnels sont pris en charge de manière native par l'Agent. Si vous devez vous connecter à Internet via un proxy, modifiez le fichier de configuration de l'Agent.

**Agents v6 et v7**

Définissez différents serveurs de proxy pour les requêtes `https` et `http` dans le fichier de configuration `datadog.yaml` de votre Agent. L'Agent utilise `https` pour envoyer des données à Datadog, mais les intégrations peuvent utiliser le protocole `http` pour recueillir des métriques. Quelles que soient les requêtes à faire passer par un proxy, vous pouvez activer le SSL sur votre serveur proxy. Vous trouverez ci-dessous des exemples de configuration pour votre fichier `datadog.yaml`.

<div class="alert alert-warning">
Si la collecte de logs est activée, assurez-vous qu'un transport spécifique est <a href="/agent/logs/log_transport?tab=https#imposer-un-transport-specifique">appliqué</a>.
Il est conseillé d'utiliser le transport HTTPS. Dans ce cas, le <code>&ltHOST&gt;:&ltPORT&gt;</code> utilisé pour transmettre les métriques via proxy est également utilisé pour transmettre les logs via proxy.
Si vous utilisez le transport TCP, consultez la page <a href="/agent/logs/proxy">Proxy TCP pour les logs</a>.
</div>

Définir un proxy HTTP pour toutes les requêtes `https` :

```yaml
proxy:
    https: "http://<SERVEUR_PROXY_SSL_POUR_HTTPS>:<PORT>"
```

Remarque : lorsque vous configurez un proxy HTTP pour les requêtes `https`, la communication entre l'Agent et Datadog est chiffrée de bout en bout avec TLS et ne peut pas être déchiffrée par le proxy. La seule communication non chiffrée est la requête `HTTP CONNECT` qui se fait entre l'Agent et le proxy pour établir la connexion TCP initiale entre l'Agent et Datadog. Ainsi, lorsque vous utilisez un proxy pour les requêtes `https`, il n'est pas nécessaire d'utiliser un proxy HTTPS pour chiffrer les communications entre l'Agent et Datadog.

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

**Remarque** : toutes les intégrations qui envoient des requêtes HTTP(S) utilisent les paramètres de proxy définis dans le fichier de configuration `datadog.yaml` si aucun paramètre n'est spécifié au niveau de l'intégration. Pour modifier ce comportement, définissez `skip_proxy` sur true ou `use_agent_proxy` sur false dans la configuration de chaque instance ou dans la configuration de secours `init_config` de votre intégration.

##### Valeurs acceptées pour NO_PROXY

Par défaut, `no_proxy`/`NO_PROXY` doit correspondre exactement aux endpoints des requêtes HTTP(S) de l'Agent (à l'exception des requêtes effectuées par les intégrations de l'Agent). Nous vous conseillons d'activer `no_proxy_nonexact_match` pour autoriser l'Agent à appliquer aux valeurs `NO_PROXY` les mêmes règles que celles utilisées pour les intégrations (voir ci-dessous).

```yaml
no_proxy_nonexact_match: true
```

Les règles suivantes s'appliquent aux intégrations de l'Agent (et à l'ensemble de l'Agent lorsque le paramètre `no_proxy_nonexact_match` est activé) :
* Un nom de domaine englobe le nom et tous les sous-domaines. Par exemple :
  - `datadoghq.com` englobe `app.agent.datadoghq.com`, `www.datadoghq.com`, `datadoghq.com`, mais **pas** `www.notdatadoghq.com`
  - `datadoghq` englobe `frontend.datadoghq`, `backend.datadoghq`, mais **pas** `www.datadoghq.com` ou `www.datadoghq.eu`
* Un nom de domaine qui commence par un « . » englobe uniquement les sous-domaines. Par exemple :
  - `.datadoghq.com` englobe `app.agent.datadoghq.com`, `www.datadoghq.com`, mais **pas** `datadoghq.com`
* Une plage CIDR englobe les adresses IP au sein du sous-réseau. Par exemple :
  - `192.168.1.0/24` englobe la plage d'IP comprise entre `192.168.1.1` et `192.168.1.254`
* Une adresse IP exacte, par exemple :
  - `169.254.169.254`
* Un hostname, par exemple :
  - `webserver1`

#### Variables d'environnement

À partir de l'Agent v6.4, vous pouvez définir vos paramètres de proxy via des variables d'environnement :

* `DD_PROXY_HTTPS` : définit un serveur proxy pour les requêtes `https`.
* `DD_PROXY_HTTP` : définit un serveur proxy pour les requêtes `http`.
* `DD_PROXY_NO_PROXY` : définit une liste de hosts qui doivent ignorer le proxy. La liste est séparée par des espaces.

Les variables d'environnement sont prioritaires sur les valeurs dans le fichier `datadog.yaml`. Si les variables d'environnement sont présentes avec une valeur vide (par exemple, ``DD_PROXY_HTTP=""``), l'Agent utilise ces valeurs vides à la place des options dont la priorité est plus faible.

Sur les hosts Unix, un proxy peut être appliqué à l'ensemble du système via les variables d'environnement standard, comme `HTTPS_PROXY`, `HTTP_PROXY` et `NO_PROXY`. L'Agent les utilise si elles sont présentes. Attention : ces variables ont également un impact sur l'ensemble des requêtes provenant des intégrations, y compris les services d'orchestration comme Docker, ECS et Kubernetes.

L'Agent utilise les valeurs suivantes par ordre de priorité :

1. Les variables d'environnement `DD_PROXY_HTTPS`, `DD_PROXY_HTTP` et `DD_PROXY_NO_PROXY`
2. Les variables d'environnement `HTTPS_PROXY`, `HTTP_PROXY` et `NO_PROXY`
3. Les valeurs spécifiées dans `datadog.yaml`

**Agent v5**

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

N'oubliez pas de [redémarrer l'Agent][2] pour que les nouveaux paramètres soient appliqués.

### Squid

[Squid][3] est un forward proxy pour le Web qui prend en charge les protocoles HTTP, HTTPS, FTP, et plus encore. Il est compatible avec la plupart des systèmes d'exploitation sur le marché, y compris Windows, et est distribué sous la licence publique générale GNU. Squid est une solution pratique si vous n'utilisez pas déjà un proxy Web au sein de votre réseau.

#### Redirection vers un proxy avec Squid

##### Configurer Squid pour que le trafic soit uniquement envoyé à Datadog

Installez Squid sur un host capable de communiquer avec vos Agents internes et Datadog. Vous pouvez utiliser le gestionnaire de packages de votre système d'exploitation ou installer le logiciel directement depuis la [page du projet Squid][3].

Pour configurer Squid, modifiez le fichier de configuration. Ce fichier est généralement situé à l'emplacement `/etc/squid/squid.conf` sous Linux ou `C:\squid\etc\squid.conf` sous Windows.

Modifiez votre fichier de configuration `squid.conf` afin que Squid puisse accepter le trafic local et le transférer vers les entrées Datadog adéquates :

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

##### Démarrer Squid

Démarrez (ou redémarrez) Squid afin d'appliquer vos nouvelles configurations.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Si Squid est déjà en cours d'exécution, redémarrez-le à l'aide de la commande suivante :

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Si vous configurez Squid sous Windows, vous devez d'abord [configurer Squid en tant que service système][1]. Vous pourrez ensuite exécuter la commande suivante dans une invite de commandes en tant qu'administrateur :

```bash
net start squid
```

Si Squid est déjà en cours d'exécution, redémarrez-le à l'aide des commandes suivantes :

```bash
net stop squid
net start squid
```

[1]: https://wiki.squid-cache.org/KnowledgeBase/Windows
{{% /tab %}}
{{< /tabs >}}

##### Configuration de l'Agent Datadog

**Agents v6 et v7**

Modifiez le fichier de configuration de l'Agent (`datadog.yaml`) afin d'ajouter les lignes suivantes :

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

Une fois ces modifications enregistrées, [redémarrez l'Agent][2].

Vérifiez que Datadog est en mesure de recevoir les données de votre ou vos Agents en consultant la page [Infrastructure Overview][4].

**Agent v5**

Modifiez le fichier de configuration de l'Agent (`datadog.conf`) afin d'ajouter les lignes suivantes :

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

Une fois ces modifications enregistrées, [redémarrez l'Agent][2].

Vérifiez que Datadog est en mesure de recevoir les données de votre ou vos Agents en consultant la page [Infrastructure Overview][4].

## HAProxy

[HAProxy][5] est une solution gratuite, rapide et fiable qui peut être utilisée comme proxy TCP ou HTTP. Même si HAProxy est généralement utilisé en tant que répartiteur de charge pour distribuer les requêtes entrantes vers un pool de serveurs, vous pouvez également l'utiliser pour faire transiter par un proxy le trafic de l'Agent vers Datadog à partir des hosts qui ne présentent aucune connectivité externe :

`agent ---> haproxy ---> Datadog`

Il s'agit d'une excellente solution si vous ne disposez pas d'un proxy Web facilement accessible sur votre réseau et que vous souhaitez appliquer un proxy à un grand nombre d'Agents. Dans certains cas, une seule instance HAProxy suffit pour gérer le trafic local de l'Agent sur votre réseau. Chaque proxy peut prendre en charge jusqu'à 1 000 Agents.

**Remarque** : il s'agit d'une estimation modeste basée sur les performances d'instances `m3.xl`. Plusieurs variables liées au réseau et au host peuvent influencer la charge sur HAProxy. Gardez toujours un œil sur le déploiement de votre proxy avant et après sa mise en place. Consultez la [documentation dédiée à HAProxy][5] pour en savoir plus.

Les communications entre HAProxy et Datadog sont toujours chiffrées via TLS. Les communications entre le host de l'Agent et le host HAProxy ne sont pas chiffrées par défaut, car le proxy et l'Agent sont censés être sur le même host. Toutefois, nous vous conseillons de sécuriser ces communications via un chiffrement TLS si le host HAProxy et le host de l'Agent ne sont pas situés sur le même réseau local isolé.
Pour chiffrer les données entre l'Agent et HAProxy, vous devez créer un certificat x509 avec l'extension Subject Alternative Name (SAN) pour le host HAProxy. Ce paquet de certificats (*.pem) doit contenir le certificat public et la clé privée. Consultez cet [article de blog sur HAProxy][6] pour en savoir plus.


**Remarque** : téléchargez le certificat Datadog avec l'une des commandes suivantes :

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Le chemin vers le certificat est `/etc/ssl/certs/ca-certificates.crt` pour Debian et Ubuntu, ou `/etc/ssl/certs/ca-bundle.crt` pour CentOS et Red Hat.

### Redirection vers un proxy avec HAProxy

#### Configuration de HAProxy

HAProxy doit être installé sur un host capable de communiquer avec Datadog. Vous pouvez utiliser l'un des fichiers de configuration suivants si vous ne l'avez pas déjà configuré. La configuration dépend du service et du site Datadog. Pour consulter les configurations propres à votre [site Datadog][7], utilisez le menu `DATADOG SITE` sur la droite.

**Remarque** : nous vous conseillons d'utiliser le fichier de configuration `HTTPS` si l'Agent et HAProxy ne font pas partie du même réseau local isolé.

##### HTTP

```conf
# Configuration de base
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Quelques valeurs par défaut raisonnables
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# Déclarer un accès aux statistiques HAProxy sur le port 3833.
# Vous n'avez pas besoin d'identifiants pour afficher cette page.
# Vous pouvez désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Cette section permet de remplacer les entrées DNS
# Remplacez <IP_SERVEUR_DNS> et <IP_SECONDAIRE_SERVEUR_DNS> par les adresses IP du serveur DNS.
# Pour HAProxy 1.8 et versions ultérieures
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SECONDAIRE_SERVEUR_DNS>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métriques (par exemple, la valeur de "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des traces (par exemple, la valeur de "endpoint" dans la section
# de configuration d'APM).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des profils (par exemple, la valeur de "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des processus (par exemple, la valeur de "url" dans la section
# de configuration des processus).
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des logs (par exemple, la valeur de "logs.config.logs_dd_url")
# Si les logs sont envoyés avec use_http: true
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# Si les logs sont envoyés avec force_use_tcp: true
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métriques et de l'activité Database Monitoring (par exemple, la valeur de "database_monitoring.metrics.dd_url" et de "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des échantillons Database Monitoring (par exemple, la valeur de "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métadonnées Network Devices Monitoring (par exemple, la valeur de "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des données Traps SNMP pour Network Devices (par exemple, la valeur de "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des données de télémétrie pour l'instrumentation (par exemple, la valeur de "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des flux NetFlow pour Network Devices (par exemple, la valeur de "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# la réception des configurations à distance (par exemple, la valeur de "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# Le serveur Datadog. En pratique, toutes les requêtes TCP
# reçues par les frontends de transmission définis ci-dessus passent par les
# endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-api
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-flare
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-traces
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-processes
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-logs-http
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CERTIFICATS>
```

##### HTTPS

Cette configuration applique un chiffrement SSL/TLS aux communications entre l'Agent et HAProxy. Remplacez la variable `<CHEMIN_VERS_PEM_CERTIFICATS>` par le chemin vers le paquet de certificats du proxy (*.pem).

```conf
# Configuration de base
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Quelques valeurs par défaut
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# Déclarer un accès aux statistiques HAProxy sur le port 3833.
# Vous n'avez pas besoin d'identifiants pour afficher cette page.
# Vous pouvez désactiver l'accès une fois la configuration terminée.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Cette section permet de remplacer les entrées DNS.
# Remplacez <IP_SERVEUR_DNS> et <IP_SECONDAIRE_SERVEUR_DNS> par les adresses IP du serveur DNS.
# Pour HAProxy 1.8 et versions ultérieures
resolvers my-dns
    nameserver dns1 <IP_SERVEUR_DNS>:53
    nameserver dns2 <IP_SECONDAIRE_SERVEUR_DNS>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métriques (par exemple, la valeur de "dd_url").
frontend metrics-forwarder
    bind *:3834 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des traces (par exemple, la valeur de "endpoint" dans la section
# de configuration d'APM).
frontend traces-forwarder
    bind *:3835 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode tcp
    option tcplog
    default_backend datadog-traces

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des profils (par exemple, la valeur de "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des processus (par exemple, la valeur de "url" dans la section
# de configuration des processus).
frontend processes-forwarder
    bind *:3837 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode tcp
    option tcplog
    default_backend datadog-processes

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des logs (par exemple, la valeur de "logs.config.logs_dd_url")
# Si les logs sont envoyés avec use_http: true
frontend logs_http_frontend
    bind *:3838 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-logs-http

# Si les logs sont envoyés avec force_use_tcp: true
# frontend logs_frontend
#    bind *:10514 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métriques et de l'activité Database Monitoring (par exemple, la valeur de "database_monitoring.metrics.dd_url" et de "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des échantillons Database Monitoring (par exemple, la valeur de "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des métadonnées Network Devices Monitoring (par exemple, la valeur de "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des données Traps SNMP pour Network Devices (par exemple, la valeur de "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des données de télémétrie pour l'instrumentation (par exemple, la valeur de "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# l'envoi des flux NetFlow pour Network Devices (par exemple, la valeur de "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# Déclarer l'endpoint auquel vos Agents doivent se connecter pour
# la réception des configurations à distance (par exemple, la valeur de "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846 ssl crt <CHEMIN_VERS_PEM_CERTIFICATS_PROXY>
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# Le serveur Datadog. En pratique, toutes les requêtes TCP
# reçues par les frontends de transmission définis ci-dessus passent par les
# endpoints publics de Datadog.
backend datadog-metrics
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-api
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-flare
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-traces
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-processes
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-logs-http
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # La configuration suivante est valable pour HAProxy 1.8 et versions ultérieures
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Décommenter la configuration suivante pour les anciennes versions de HAProxy
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>

```

**Remarque** : vous pouvez utiliser `verify none` au lieu de `verify required ca-file <CHEMIN_VERS_CRT_CERTIFICATS_DATADOG>` si vous ne pouvez pas récupérer les certificats sur le host proxy, mais sachez que HAProxy ne sera alors pas en mesure de vérifier le certificat d'admission de Datadog.

À partir de la version 1.8, HAProxy permet au système de découverte des services DNS de détecter les modifications de serveur et de les appliquer automatiquement à votre configuration.
Si vous utilisez une version antérieure de HAProxy, vous devrez recharger ou redémarrer HAProxy. **Nous vous conseillons de configurer une tâche `cron` qui recharge HAProxy toutes les 10 minutes** (par exemple, `service haproxy reload`) pour forcer l'actualisation du cache DNS de HAProxy si {{< region-param key="dd_full_site" code="true" >}} bascule vers une autre IP.

#### Configuration de l'Agent Datadog

**Agents v6 et v7**

Pointez chaque Agent vers HAProxy en définissant son `dd_url` sur l'adresse de HAProxy (par exemple, `haproxy.exemple.com`).
Le paramètre `dd_url` se trouve dans le fichier `datadog.yaml`.

`dd_url: <SCHÉMA>://haproxy.example.com:3834`

Remplacez `<SCHÉMA>` par `https` si vous avez choisi la configuration HTTPS pour HAProxy, ou par `http` si vous n'avez pas choisi HTTPS.

Pour envoyer des traces, des profils, des processus et des logs en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.yaml` :

```yaml
apm_config:
    apm_dd_url: <SCHÉMA>://haproxy.example.com:3835
    profiling_dd_url: <SCHÉMA>://haproxy.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHÉMA>://haproxy.example.com:3843

process_config:
    process_dd_url: <SCHÉMA>://haproxy.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: haproxy.example.com:3838
    # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: haproxy.example.com:3839
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
        logs_no_ssl: true
    activity:
        logs_dd_url: haproxy.example.com:3839
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
        logs_no_ssl: true
    samples:
        logs_dd_url: haproxy.example.com:3840
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: haproxy.example.com:3841
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: haproxy.example.com:3842
            # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: haproxy.example.com:3845
            # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: haproxy.example.com:3846
    # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et HAProxy
    no_tls: true
```

Lorsque vous utilisez le chiffrement entre l'Agent et HAProxy, si l'Agent n'a pas accès au certificat du proxy, s'il n'est pas en mesure de le valider ou si la validation n'est pas nécessaire, vous pouvez modifier le fichier de configuration de l'Agent `datadog.yaml` et définir `skip_ssl_validation` sur `true`.
Lorsque cette option est définie sur `true`, l'Agent ignore l'étape de validation du certificat et ne vérifie pas l'identité du proxy, mais la communication reste chiffrée via SSL/TLS.

```yaml
skip_ssl_validation: true
```

Pour terminer, [redémarrez l'Agent][2].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy sur `http://haproxy.example.com:3833` ainsi que l'[aperçu de l'infrastructure][4].

**Agent v5**

Pointez chaque Agent vers HAProxy en définissant son `dd_url` sur l'adresse de HAProxy (par exemple, `haproxy.exemple.com`).
Le paramètre `dd_url` se trouve dans le fichier `datadog.conf`.

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

Pour terminer, [redémarrez l'Agent][2].

Pour vérifier que tout fonctionne correctement, consultez les statistiques HAProxy sur `http://haproxy.example.com:3833` ainsi que l'[aperçu de l'infrastructure][4].

## NGINX

[NGINX][8] est un serveur Web qui peut être utilisé comme reverse proxy, répartiteur de charge, proxy de messagerie ou cache HTTP. Vous pouvez également utiliser NGINX comme proxy pour vos Agents Datadog :

`agent ---> nginx ---> Datadog`

Les communications entre NGINX et Datadog sont toujours chiffrées via TLS. Les communications entre le host de l'Agent et le host NGINX ne sont pas chiffrées par défaut, car le proxy et l'Agent sont censés être sur le même host. Toutefois, nous vous conseillons de sécuriser ces communications via un chiffrement TLS si le host NGINX et le host de l'Agent ne sont pas situés sur le même réseau local isolé.
Pour chiffrer les données entre l'Agent et NGINX, vous devez créer un certificat x509 avec l'extension Subject Alternative Name (SAN) pour le host NGINX.

**Remarque** : téléchargez le certificat Datadog avec l'une des commandes suivantes :

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Le chemin vers le certificat est `/etc/ssl/certs/ca-certificates.crt` pour Debian et Ubuntu, ou `/etc/ssl/certs/ca-bundle.crt` pour CentOS et Red Hat.

### Redirection vers un proxy avec NGINX

#### Configuration de NGINX

NGINX doit être installé sur un host capable de communiquer avec Datadog. Vous pouvez utiliser l'un des fichiers de configuration suivants si vous ne l'avez pas déjà configuré. La configuration dépend du service et du site Datadog. Pour consulter les configurations propres à votre [site Datadog][7], utilisez le menu `DATADOG SITE` sur la droite.

**Remarque** : nous vous conseillons d'utiliser le fichier de configuration `HTTPS` si l'Agent et NGINX ne font pas partie du même réseau local isolé.

##### Résultats de test

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

    proxy_ssl_trusted_certificate <CHEMIN_VERS_CERTIFICATS>;

    server {
        listen 3834; # écoute des métriques
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
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Proxy TCP pour l'Agent Datadog
stream {

    proxy_ssl_trusted_certificate <CHEMIN_VERS_CERTIFICATS>;

    server {
        listen 3835; # écoute des traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; # écoute des profils
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; # écoute des processus
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; # écoute des logs avec use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; # écoute des métriques Database Monitoring
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; # écoute des échantillons Database Monitoring
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; # écoute des métadonnées Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; # écoute des traps Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; # écoute des données de télémétrie des instrumentations
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; # écoute des netflows Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; # écoute des demandes de configuration à distance
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS


Cette configuration applique un chiffrement SSL/TLS aux communications entre l'Agent et NGINX. Remplacez `<CHEMIN_VERS_CERTIFICAT_PROXY>` par le chemin vers le certificat public du proxy et `<CHEMIN_VERS_CLÉ_CERTIFICAT_PROXY>` par le chemin vers la clé privée.

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

    proxy_ssl_trusted_certificate <CHEMIN_VERS_CERTIFICATS>;

    ssl_certificate     <CHEMIN_VERS_CERTIFICAT_PROXY>;
    ssl_certificate_key <CHEMIN_VERS_CLÉ_CERTIFICAT_PROXY>;

    server {
        listen 3834 ssl; # écoute des métriques
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
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Proxy TCP pour l'Agent Datadog
stream {

    proxy_ssl_trusted_certificate <CHEMIN_VERS_CERTIFICATS>;

    ssl_certificate     <CHEMIN_VERS_CERTIFICAT_PROXY>;
    ssl_certificate_key <CHEMIN_VERS_CLÉ_CERTIFICAT_PROXY>;

    server {
        listen 3835 ssl; # écoute des traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; # écoute des profils
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; # écoute des processus
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; # écoute des logs avec use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; # écoute des métriques Database Monitoring
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; # écoute des échantillons Database Monitoring
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; # écoute des métadonnées Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; # écoute des traps Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; # écoute des données de télémétrie des instrumentations
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; # écoute des netflows Network Devices
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; # écoute des demandes de configuration à distance
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
}
```

**Remarque** : vous pouvez supprimer `proxy_ssl_verify on` si vous ne pouvez pas récupérer les certificats sur le host proxy, mais sachez que NGINX ne sera alors pas en mesure de vérifier le certificat d'admission de Datadog.

#### Configuration de l'Agent Datadog

Pointez chaque Agent vers NGINX en définissant son `dd_url` sur l'adresse de NGINX (par exemple, `nginx.example.com`) dans son fichier de configuration.
Le paramètre `dd_url` se trouve dans le fichier `datadog.yaml`.

`dd_url: "<SCHÉMA>://nginx.example.com:3834"`

Remplacez `<SCHÉMA>` par `https` si vous avez choisi la configuration HTTPS pour HAProxy, ou par `http` si vous n'avez pas choisi HTTPS.

Pour envoyer des traces, des profils, des processus et des logs en passant par le proxy, définissez les paramètres suivants dans le fichier `datadog.yaml` :

```yaml
apm_config:
    apm_dd_url: <SCHÉMA>://nginx.example.com:3835
    profiling_dd_url: <SCHÉMA>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHÉMA>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHÉMA>://nginx.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: nginx.example.com:3838
    # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # Mettez en commentaire la ligne ci-dessous pour utiliser le chiffrement entre l'Agent et NGINX
    no_tls: true
```


Lorsque vous utilisez le chiffrement entre l'Agent et NGINX, si l'Agent n'a pas accès au certificat du proxy, s'il n'est pas en mesure de le valider ou si la validation n'est pas nécessaire, vous pouvez modifier le fichier de configuration de l'Agent `datadog.yaml` et définir `skip_ssl_validation` sur `true`.
Lorsque cette option est définie sur `true`, l'Agent ignore l'étape de validation du certificat et ne vérifie pas l'identité du proxy, mais la communication reste chiffrée via SSL/TLS.

```yaml
skip_ssl_validation: true
```

Pour l'envoi de logs via TCP, consultez la section [Proxy TCP pour les logs][9].

## Agent Datadog

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

**Cette fonction est uniquement disponible avec l'Agent v5**.

{{% /tab %}}
{{% tab "Agent v5" %}}

Nous vous conseillons d'utiliser un vrai proxy (un proxy Web ou HAProxy) pour transférer votre trafic vers Datadog. Toutefois, si ce n'est pas possible, vous pouvez configurer une instance de l'**Agent v5** pour vous en servir en tant que proxy.

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

6. Accédez à la [page Infrastructure][1] pour vérifier que tous les nœuds envoient des données à Datadog.


[1]: https://app.datadoghq.com/infrastructure#overview
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent/configuration/agent-fips-proxy
[2]: /fr/agent/configuration/agent-commands/
[3]: http://www.squid-cache.org/
[4]: https://app.datadoghq.com/infrastructure
[5]: http://haproxy.1wt.eu
[6]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[7]: /fr/getting_started/site/
[8]: https://www.nginx.com
[9]: /fr/agent/logs/proxy
