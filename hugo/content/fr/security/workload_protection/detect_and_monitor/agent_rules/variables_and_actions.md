---
description: Utilisez les variables SECL et les actions de règle d'Agent pour enrichir
  les événements, répondre aux menaces et créer une logique de détection avec état.
disable_toc: false
title: Variables et actions
---
Les actions de règle étendent les règles de Workload Protection (Runtime Security) au-delà de la détection. Lorsqu'une règle correspond à un événement, l'Agent peut exécuter une ou plusieurs actions pour enrichir l'événement, répondre à une menace ou piloter une logique de détection en plusieurs étapes.

Les actions sont définies dans les fichiers de politique d'Agent (`.policy`) sous le champ `actions` d'une règle.
<div class="alert alert-info">Toutes les actions peuvent être configurées dans les fichiers de politique d'Agent (YAML) sur l'Agent mais <code>log</code>, <code>coredump</code>, et <code>network_filter</code> ne peuvent pas être configurées depuis l'interface utilisateur lors de la création d'une règle.
Lorsque vous créez une règle d'Agent dans Datadog, vous pouvez configurer <code>hash</code>, <code>kill</code> (<a href="/security/workload_protection/respond_and_report/#automated-response">réponse automatisée</a>), et <code>set</code> actions. À partir d'un signal de sécurité, vous pouvez appliquer manuellement <code>kill</code> ou <code>network_filter</code> à une menace ciblée avec une <a href="/security/workload_protection/respond_and_report/#response">réponse manuelle</a>.
</div>

| Action           | Objectif                                               | Plateforme       | Nécessite une application |
| ---------------- | ----------------------------------------------------- | -------------- | -------------------- |
| `set`            | Stocker l'état dans une variable pour une utilisation par d'autres règles      | Linux, Windows | Non                   |
| `kill`           | Terminer un processus                                   | Linux, Windows | Oui                  |
| `hash`           | Calculer les hachages d'un fichier                              | Linux          | Non                   |
| `log`            | Écrire un message dans le log de l'Agent                      | Linux, Windows | Non                   |
| `coredump`       | Capturer l'état forensique (processus, montage, dentry)       | Linux          | Non                   |
| `network_filter` | Surveillez ou rejetez le trafic réseau correspondant à un filtre BPF | Linux          | Oui                  |


## Syntaxe {#syntax}

Chaque règle peut définir plusieurs actions sous forme de liste YAML. Chaque élément de liste doit contenir exactement un type d'action.

{{< code-block lang="yaml" >}}
rules:
  - id: my_rule
    expression: exec.file.name == "suspicious_binary"
    actions:
      - set:
          name: flagged_process
          value: true
          ttl: 5m
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

### Filtres d'action {#action-filters}

Chaque action prend en charge un champ `filter` optionnel : une expression SECL évaluée au moment de l'action. L'action ne s'exécute que lorsque l'expression de la règle et le filtre d'action correspondent.


| Champ    | Requis | Par défaut                                | Description                               |
| -------- | -------- | -------------------------------------- | ----------------------------------------- |
| `filter` | Non       | Aucun (l'action s'exécute à chaque correspondance de règle) | Expression SECL évaluée au moment de l'action. |


{{< code-block lang="yaml" >}}
rules:
  - id: kill_container_process
    expression: exec.file.name == "malware"
    actions:
      - filter: process.container.id != ""
        kill:
          signal: SIGTERM
          scope: container

{{< /code-block >}}

## `set` : stocker des variables {#set-store-variables}

Utilisez `set` pour stocker un état qui persiste entre les règles au sein de la même politique. Une fois définie, une variable peut être référencée depuis n'importe quelle autre règle de cette politique.

### Quand l'utiliser {#when-to-use-it}

Les variables sont l'une des fonctionnalités les plus puissantes de la création de règles d'Agent. Elles sont essentielles pour créer des détections avec état en plusieurs étapes qui vont au-delà de ce qu'une seule expression SECL peut exprimer par elle-même.

- Enchaînez les règles au sein d'une politique en enregistrant le contexte dans une règle et en faisant correspondre une règle de suivi qui référence cette variable.
- Créez des listes roulantes de noms de processus, de chemins ou d'activité DNS.

### Paramètres {#parameters}


| Champ           | Requis                                 | Par défaut                         | Description                                                                                      |
| --------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `name`          | Oui                                      | —                               | Nom de la variable. Référencé dans les expressions sous la forme `${name}` ou `${scope.name}`.                        |
| `value`         | L'un des `value`, `field` ou `expression` | —                               | Valeur statique (chaîne, entier, booléen ou tableau).                                               |
| `field`         | L'un des `value`, `field` ou `expression` | —                               | Copier une valeur de l'événement déclencheur (par exemple, `process.file.name`).                       |
| `expression`    | L'un des `value`, `field` ou `expression` | —                               | Expression SECL dont le résultat est stocké. Nécessite `default_value` si le type ne peut pas être déduit.     |
| `default_value` | Non                                       | —                               | Par défaut lors de l'utilisation de `expression`. Doit correspondre au type de `value`.                                 |
| `scope`         | Non                                       | Global (aucun préfixe de périmètre)        | `process`, `container` ou `cgroup`. Préfixe le nom de la variable (par exemple, `process.my_var`). |
| `scope_field`   | Non                                       | PID du processus déclencheur          | Clé de périmètre personnalisée (périmètre `process` uniquement).                                                         |
| `append`        | Non                                       | `false`                         | Ajouter à une variable de liste au lieu d'écraser.                                                |
| `size`          | Non                                       | `100` (lorsque `append` est `true`) | Longueur maximale de la liste lorsque `append` est `true`.                                                     |
| `ttl`           | Non                                       | Aucune expiration                   | Durée de vie (par exemple, `10s`, `5m`). La variable expire après cette durée.                   |
| `inherited`     | Non                                       | `false`                         | La variable est héritée par les processus enfants (périmètre `process` uniquement).                                 |
| `private`       | Non                                       | `false`                         | La variable n'est pas exposée dans les événements de sécurité.                                                      |


### Exemples {#examples}

Définissez un indicateur booléen :

{{< code-block lang="yaml" >}}
rules:
  - id: flag_suspicious_exec
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: suspicious
          value: true
          ttl: 10m
  - id: detect_follow_up
    expression: open.file.path == "/etc/shadow" && ${suspicious}
{{< /code-block >}}

Collectez les requêtes DNS dans une liste roulante :

{{< code-block lang="yaml" >}}
rules:
  - id: collect_dns_queries
    expression: dns.question.name != ""
    actions:
      - set:
          name: queried_domains
          field: dns.question.name
          append: true
          size: 10
          ttl: 10s
          scope: process

{{< /code-block >}}

Créez une règle de corrélation :

Utilisez `private` pour garder l'état interne hors des événements de sécurité , et `scope_field` pour lier une variable à un processus autre que celui qui a déclenché l'événement (par exemple, la cible d'un événement `cgroup_write`) :

{{< code-block lang="yaml" >}}
rules:
  - id: init_correlation_key
    expression: cgroup_write.file.path != "" && ${process.correlation_key} == ""
    actions:
      - set:
          name: correlation_key
          default_value: ""
          expression: '"attack_${builtins.uuid4}"'
          scope: process
          scope_field: cgroup_write.pid
          inherited: true
          private: true
  - id: detect_correlated_file_access
    expression: open.file.path == "/etc/shadow" && ${process.correlation_key} != ""
{{< /code-block >}}

Calculez une valeur à partir d'une expression :
Utilisez `expression` avec `default_value` pour définir le type de variable et stocker un résultat calculé :

{{< code-block lang="yaml" >}}
rules:
  - id: record_exec_context
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: exec_context
          default_value: ""
          expression: '"cmd_${process.pid}_${exec.file.name}"'
          scope: process
          ttl: 5m
{{< /code-block >}}

## `kill` : terminer un processus {#kill-terminate-a-process}

Utilisez `kill` pour arrêter activement une activité malveillante : L'Agent envoie un signal POSIX au processus, au conteneur ou au cgroup cible.

### Configurer dans Datadog {#configure-in-datadog}

En plus de définir des actions `kill` dans les fichiers de politique de l'Agent, vous pouvez configurer la terminaison de processus dans Datadog :

- **Automatique :** Ajoutez des actions `kill` aux règles d'Agent dans une politique, comme décrit dans cette section, ou utilisez une [réponse automatisée][1].
- **Manuel :** À partir d'un signal de sécurité, utilisez [Kill containers or processes][2] sous {{< ui >}}Respond{{< /ui >}} dans le panneau latéral du signal.

Les deux approches nécessitent [Agent enforcement][3], qui est activé par défaut. Consultez [Respond to Threats][4] pour un aperçu des actions d'application et de réponse.

### Quand l'utiliser {#when-to-use-it-1}

- Bloquez le cryptominage, les reverse shells ou les logiciels malveillants connus lors de l'exécution.
- Arrêtez un processus en douceur (`SIGTERM`) ou forcez son arrêt (`SIGKILL`).

### Prérequis {#requirements}

- Application doit être activée dans la configuration de l'Agent (`runtime_security_config.enforcement.enabled`). Consultez [Configuration avancée][5].
- Les actions de kill sont rejetées lors du chargement de la politique si Application est désactivée globalement.
- Les signaux pris en charge incluent `SIGKILL`, `SIGTERM`, `SIGHUP`, `SIGINT` et d'autres noms de signaux POSIX standard.

### Paramètres {#parameters-1}


| Champ                         | Requis | Par défaut   | Description                                                                         |
| ----------------------------- | -------- | --------- | ----------------------------------------------------------------------------------- |
| `signal`                      | Oui      | —         | Nom du signal (par exemple, `SIGKILL`, `SIGTERM`).                                    |
| `scope`                       | Non       | `process` | `process`, `container` ou `cgroup`. Détermine quels processus reçoivent le signal. |
| `disable_container_disarmer`  | Non       | `false`   | Désactiver la protection de désarmement automatique des conteneurs.                                 |
| `disable_executable_disarmer` | Non       | `false`   | Désactiver la protection de désarmement automatique des exécutables.                                |


### Mesures de protection {#safeguards}

L'Agent inclut des désarmeurs pour empêcher les boucles de terminaison incontrôlées lors d'une réponse automatisée. Si trop d'actions de terminaison sont déclenchées contre le même conteneur ou exécutable au cours d'une période configurée, les terminaisons ultérieures pour cette cible sont supprimées jusqu'à l'expiration de la période.

Certains binaires peuvent également être exclus de l'application via `runtime_security_config.enforcement.exclude_binaries`.

### Exemple {#example}

{{< code-block lang="yaml" >}}
rules:
  - id: block_ping_process
    expression: >-
      exec.file.name == "ping"
    actions:
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

#### Rapport d'action de kill {#kill-action-report}

Lorsqu'une action `kill` s'exécute, l'Agent joint un rapport d'action à l'événement de l'Agent déclencheur dans `agent.rule_actions`. Il ne s'agit pas d'un événement personnalisé distinct : le rapport est sérialisé avec l'événement de sécurité qui a satisfait la règle. Pour `SIGKILL`, l'Agent peut retarder l'envoi de l'événement jusqu'à ce que le processus cible se termine afin que les champs temporels soient précis.

| Champ | Description |
| ----- | ----------- |
| `type` | Toujours `kill` |
| `signal` | Signal POSIX envoyé (par exemple, `SIGKILL`, `SIGTERM`) |
| `scope` | `process`, `container` ou `cgroup` |
| `status` | Résultat de l'exécution : `performed`, `partially_performed`, `error`, `kill_queued`, `kill_aborted`, `rule_disarmed` ou `rule_dismantled` |
| `disarmer_type` | Garde-fou ayant bloqué ou modifié le kill: `container` ou `executable` (le cas échéant) |
| `created_at` | Heure à laquelle le processus cible a été créé |
| `detected_at` | Heure à laquelle la règle a correspondu |
| `killed_at` | Heure à laquelle le signal a été envoyé (le cas échéant) |
| `exited_at` | Heure à laquelle le processus cible s'est arrêté (le cas échéant) |
| `ttr` | Temps écoulé entre la création et l'arrêt du processus |

Pour compter combien de fois une action `kill` a été exécutée après une correspondance de règle, utilisez la métrique `datadog.runtime_security_config.rules.action_performed` avec les tags `rule_id:<rule_id>` et `action_name:kill`.

## `network_filter`: surveiller ou bloquer le trafic réseau {#network-filter-monitor-or-block-network-traffic}

Utilisez `network_filter` pour abandonner les paquets correspondant à une expression de filtre BPF pour le processus ou le cgroup incriminé. Il s'agit d'une isolation réseau au niveau du host.

### Configurer dans Datadog {#configure-in-datadog-1}

En plus de définir des actions `network_filter` dans les fichiers de politique de l'Agent, vous pouvez isoler une charge de travail compromise dans Datadog :

- **Automatique:** Ajoutez des actions `network_filter` aux règles de l'Agent dans une politique, comme décrit dans cette section. Lorsqu'une règle correspond, l'Agent abandonne automatiquement le trafic correspondant.
- **Manuel:** À partir d'un signal de sécurité, utilisez [Isolation réseau][6] sous {{< ui >}}Respond{{< /ui >}} dans le panneau latéral du signal.

### Quand l'utiliser {#when-to-use-it-2}

- Coupez la communication C2 après avoir détecté un processus malveillant.
- Bloquez le trafic DNS ou le trafic sur un port spécifique provenant d'un conteneur compromis.

### Prérequis {#requirements-1}

- L'application doit être activée.
- Le type d'événement `raw_packet` doit être activé dans la configuration de l'Agent.
- Linux uniquement (filtrage de paquets basé sur eBPF).

### Paramètres {#parameters-2}


| Champ    | Requis | Par défaut   | Description                                                    |
| -------- | -------- | --------- | -------------------------------------------------------------- |
| `filter` | Oui      | —         | Expression de filtre BPF (par exemple, `port 53`, `tcp port 80`). |
| `policy` | Non       | `allow`   | `drop` ou `allow`. Seul `drop` impose l'abandon de paquets.       |
| `scope`  | Non       | `process` | `process` ou `cgroup`.                                         |


### Exemple {#example-1}

{{< code-block lang="yaml" >}}
rules:
  - id: block_malicious_container_network
    expression: exec.container.id == "046f6a38c8b404a78fb9be56672d554ed5a326f4c568ffb137e16cf3e7e6be43"
    actions:
      - network_filter:
          filter: "dst net 10.0.0.0/8 or dst net 172.16.0.0/12 or dst net 192.168.0.0/16 or dst net 169.254.0.0/16 or dst net 127.0.0.0/8"
          policy: drop
          scope: cgroup

{{< /code-block >}}

### Action et métriques de paquet brut {#raw-packet-action-and-metrics}

#### Événement d'action de paquet brut {#raw-packet-action-event}

Lorsque le noyau abandonne un paquet qui correspond à un filtre actif, l'Agent peut émettre un `rawpacket_action` événement personnalisé (`@agent.rule_id:rawpacket_action`). Ces événements sont limités en débit en cas de volume d'abandon élevé, car l'Agent ne peut pas envoyer un événement pour chaque paquet abandonné. La charge utile de l'événement comprend :


| Champ            | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `packet.dropped` | `true` pour les paquets abandonnés                                           |
| `packet.layers`  | Couches réseau décodées (Ethernet, IP, TCP/UDP, etc.)            |
| `packet.tls`     | Contexte TLS lorsqu'il est disponible                                           |
| `network`        | Contexte réseau pour le paquet abandonné (périphérique, source, destination) |


#### Métriques {#metrics}

Pour suivre les nombres d'abandons de manière fiable, utilisez la métrique `datadog.runtime_security_config.network.raw_packet.dropped`.

## `hash` : calculer les hachages de fichier {#hash-compute-file-hashes}

Utilisez `hash` pour enrichir un événement avec des hachages cryptographiques d'un fichier référencé dans l'événement déclencheur. Ceci est utile pour la correspondance de renseignements sur les menaces et l'analyse forensique.

### Quand l'utiliser {#when-to-use-it-3}

- Hacher un binaire au moment de l'exécution avant qu'il ne soit supprimé ou modifié.
- Hacher un fichier ouvert en écriture pour le corréler avec des signatures de logiciels malveillants connues.

### Paramètres {#parameters-3}


| Champ | Requis | Par défaut | Description |
| --------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `field`         | Non | `exec.file` pour les règles `exec` ; `open.file` pour les règles `open` | Champ d'événement de fichier à hacher (par exemple, `exec.file`, `open.file`). Requis pour les autres types d'événements. |
| `max_file_size` | Non | `5242880` (5 Mo), à partir de `runtime_security_config.hash_resolver.max_file_size` | Taille maximale de fichier (octets) à hacher. Les fichiers plus volumineux sont ignorés.                                      |


### Algorithmes pris en charge {#supported-algorithms}

Les hachages sont calculés par le résolveur de hachage de l'Agent et peuvent inclure `MD5`, `SHA1`, `SHA256` et `SSDEEP`, selon la configuration de l'Agent. Les résultats apparaissent dans le champ `*.hashes` de l'événement de fichier (par exemple, `exec.file.hashes`). Pour modifier les algorithmes utilisés, mettez à jour `runtime_security_config.hash_resolver.hash_algorithms` dans `system-probe.yaml` ou définissez `DD_RUNTIME_SECURITY_CONFIG_HASH_RESOLVER_HASH_ALGORITHMS`. Consultez [Workload Protection Agent configuration][5] pour tous les paramètres du résolveur de hachage.

### Exemple {#example-2}

{{< code-block lang="yaml" >}}
rules:
  - id: hash_dropped_binary
    expression: exec.file.path startswith "/tmp/" && exec.file.name not in ["systemd"]
    actions:
      - hash:
          field: exec.file
          max_file_size: 10485760  # 10 MB

{{< /code-block >}}

## `log` : écrire dans les logs de l'Agent {#log-write-to-agent-logs}

Utilisez `log` pour émettre un message structuré vers le log du Runtime Security Agent lorsqu'une règle se déclenche. Ceci est utile pour déboguer des règles personnalisées ou auditer les déclenchements de règles sans générer un signal de sécurité complet.

### Quand l'utiliser {#when-to-use-it-4}

- Déboguer la logique de règle pendant le développement.

### Paramètres {#parameters-4}


| Champ     | Requis | Par défaut                    | Description                                        |
| --------- | -------- | -------------------------- | -------------------------------------------------- |
| `level`   | Oui      | —                          | Niveau de log : `debug`, `info`, `warning` ou `error`. |
| `message` | Non       | `Rule <rule_id> triggered` | Message personnalisé.                                    |


### Exemple {#example-3}

{{< code-block lang="yaml" >}}
rules:
  - id: log_sensitive_file_access
    expression: open.file.path startswith "/etc/"
    actions:
      - log:
          level: warning
          message: "Suspicious file access detected on sensitive path"

{{< /code-block >}}

## `coredump` : capturer l'état forensique {#coredump-capture-forensic-state}

Utilisez `coredump` pour prendre un instantané de l'état interne de l'Agent au moment d'une correspondance de règle. Le dump est compressé avec gzip (sauf désactivation) et joint à l'événement de sécurité.

### Quand l'utiliser {#when-to-use-it-5}

- Principalement utilisé à des fins de débogage.
- Capturer les caches de contexte internes tels que l'arborescence des processus, le tableau de montage ou l'état du cache dentry parallèlement à l'événement déclencheur.

### Plateforme {#platform}

Linux uniquement.

### Paramètres {#parameters-5}

Au moins l'un des éléments `process`, `mount` ou `dentry` doit être défini sur `true`.


| Champ            | Requis     | Par défaut                            | Description                                   |
| ---------------- | ------------ | ---------------------------------- | --------------------------------------------- |
| `process`        | Au moins un | `false`                            | Inclure l'instantané du résolveur de processus.        |
| `mount`          | Au moins un | `false`                            | Inclure l'instantané du résolveur de montage.          |
| `dentry`         | Au moins un | `false`                            | Inclure l'instantané du résolveur dentry.         |
| `no_compression` | Non           | `false` (compression gzip activée) | Désactiver la compression gzip de la charge utile du dump. |


### Exemple {#example-4}

{{< code-block lang="yaml" >}}
rules:
  - id: capture_forensic_state
    expression: exec.file.path startswith "/tmp/" && process.container.id != ""
    actions:
      - coredump:
          process: true
          mount: true
          dentry: true
          no_compression: false

{{< /code-block >}}

## Combinaison d'actions {#combining-actions}

Une seule règle peut enchaîner plusieurs actions. Elles s'exécutent dans l'ordre de la liste lorsque la règle correspond :

{{< code-block lang="yaml" >}}
rules:
  - id: detect_and_respond
    expression: exec.file.path == "/tmp/payload"
    actions:
      - set:
          name: payload_seen
          value: true
      - hash:
          field: exec.file
      - log:
          level: info
          message: "Payload executed, hashing and killing"
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

Modèles typiques :


| Modèle | Actions |
| ----------------------- | --------------------------------------------- |
| Détecter → enrichir → alerter | `hash` uniquement (signal envoyé automatiquement) |
| Détecter → répondre | `kill` ou `network_filter`                    |
| Détection en plusieurs étapes | `set` dans la règle A, référence `${var}` dans la règle B |
| Déboguer des règles personnalisées | `log`                                         |


## Résumé de la plateforme {#platform-summary}


| Action | Linux | Windows |
| ---------------- | ----- | ------- |
| `set`            | ✅ | ✅ |
| `kill`           | ✅ | ✅ |
| `hash`           | ✅ | ❌ |
| `log`            | ✅ | ✅ |
| `coredump`       | ✅ | ❌ |
| `network_filter` | ✅ | ❌ |


## Règles de validation {#validation-rules}

L'Agent valide les actions au moment du chargement de la politique :

- **Un type d'action par élément de liste** : `set` et `kill` ne peuvent pas apparaître dans le même bloc d'action.
- **Champs obligatoires** : par exemple, `kill.signal`, `log.level`, `network_filter.filter`.
- **Porte d'application** : `kill` et `network_filter` nécessitent que l'application soit activée.
- **Compatibilité du type d'événement** : `network_filter` nécessite le type d'événement `raw_packet` ; `hash.field` doit être compatible avec le type d'événement de la règle.

[1]: /fr/security/workload_protection/respond_and_report/#automated-response
[2]: /fr/security/workload_protection/investigate_and_triage/security_signals/actions#kill-containers-or-processes
[3]: /fr/security/workload_protection/respond_and_report/#configure-agent-enforcement
[4]: /fr/security/workload_protection/respond_and_report/
[5]: /fr/security/workload_protection/setup/advanced_configuration
[6]: /fr/security/workload_protection/investigate_and_triage/security_signals/actions#network-isolation