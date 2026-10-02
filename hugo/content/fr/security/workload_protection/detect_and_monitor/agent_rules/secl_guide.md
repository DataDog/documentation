---
aliases:
- /fr/security/workload_protection/agent_expressions
- /fr/security/threats/agent_expressions
- /fr/security/workload_protection/secl_auth_guide
- /fr/security/workload_protection/guide/custom-rules-guidelines
description: Rédigez des expressions de règle pour le Workload Protection Agent avec
  le Datadog Security Language (SECL).
disable_toc: false
title: Guide SECL
---
Datadog SECL est un langage spécifique à un domaine personnalisé utilisé pour créer des expressions d'Agent et des politiques au sein de Datadog Workload Protection. SECL permet aux équipes de sécurité de définir des règles de détection des menaces en temps réel en spécifiant des conditions, des opérateurs et des modèles que les Agents de sécurité peuvent surveiller sur les hôtes, les conteneurs, les applications et l'infrastructure cloud.

## Comment les règles SECL s'articulent {#how-secl-rules-fit-together}

Considérez SECL comme un filtre local : il s'exécute à l'intérieur de l'Agent sur chaque host, surveillant les événements du noyau et du système d'exploitation. Lorsqu'un événement correspond à votre expression SECL, l'Agent déclenche une détection.

Les règles de détection des menaces de Datadog agissent comme une logique backend : elles combinent une ou plusieurs règles d'Agent (en utilisant `@agent.rule_id`), ajoutent des seuils, suppriment le bruit et décident de la manière dont les alertes sont acheminées.

En résumé, la règle d'Agent détecte un comportement brut et la règle de détection le transforme en scénarios d'attaque de bout en bout.

<div class="alert alert-info">Ce guide décrit comment créer manuellement des expressions de règle, mais Workload Protection fournit également l'assistant <b>Assisted rule creator</b> pour vous guider dans la création conjointe des règles d'Agent et de détection. Consultez <a href="/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together">Créer ensemble les règles personnalisées d'Agent et de détection</a>.</div>

## Syntaxe des expressions SECL {#secl-expression-syntax}

Le format standard d'une expression SECL est le suivant :

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

En utilisant ce format, un exemple de règle pour un système Linux ressemble à ceci :

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]
{{< /code-block >}}

### Opérateurs {#operators}

Les opérateurs SECL sont utilisés pour combiner des attributs d'événement en une expression complète. Les opérateurs suivants sont disponibles :

| Opérateur SECL         |  Définition                              | Version de l'Agent |
|-----------------------|------------------------------------------|---------------|
| `==`                  | Égal                                    | 7.27          |
| `!=`                  | Différent de                                | 7.27          |
| `>`                   | Supérieur à                                  | 7.27          |
| `>=`                  | Supérieur ou égal à                         | 7.27          |
| `<`                   | Inférieur                                   | 7.27          |
| `<=`                  | Inférieur ou égal                          | 7.27          |
| `!` ou `not`          | Non                                      | 7.27          |
| `^`                   | Non binaire                               | 7.27          |
| `in [elem1, ...]`     | L'élément est contenu dans la liste             | 7.27          |
| `not in [elem1, ...]` | L'élément n'est pas contenu dans la liste         | 7.27          |
| `=~`                  | Correspondance de chaîne                          | 7.27          |
| `!~`                  | Non correspondance de chaîne                      | 7.27          |
| `&`                   | Et binaire                               | 7.27          |
| `\|`                  | Ou binaire                                | 7.27          |
| `&&` ou `and`         | Et logique                              | 7.27          |
| `\|\|` ou `or`        | Ou logique                               | 7.27          |
| `in CIDR`             | L'élément est dans la plage IP               | 7.37          |
| `not in CIDR`         | L'élément n'est pas dans la plage IP           | 7.37          |
| `allin CIDR`          | Tous les éléments sont dans la plage IP     | 7.37          |
| `in [CIDR1, ...]`     | L'élément est dans les plages IP              | 7.37          |
| `not in [CIDR1, ...]` | L'élément n'est pas dans les plages IP          | 7.37          |
| `allin [CIDR1, ...]`  | Tous les éléments sont dans les plages IP    | 7.37          |

### Modèles et expressions régulières {#patterns-and-regular-expressions}

Des modèles ou des expressions régulières peuvent être utilisés dans les expressions SECL. Ils peuvent être utilisés avec les opérateurs `in`, `not in`, `=~` et `!~`.

| Format           |  Exemple             | Champs pris en charge   | Version de l'agent |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | Tous                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | Tous sauf `.path` | 7.27          |

Les modèles sur les champs `.path` sont utilisés comme Glob. `*` correspond aux fichiers et dossiers au même niveau. `**`, introduit dans la version 7.34, peut être utilisé à la fin d'un chemin pour correspondre à tous les fichiers et sous-dossiers.

### Durées {#durations}

Vous pouvez utiliser SECL pour écrire des règles basées sur des durées, qui se déclenchent sur des événements survenant pendant une période spécifique. Par exemple, déclenchez sur un événement où un fichier secret est accédé plus d'une certaine durée après la création d'un processus.
Une telle règle pourrait être rédigée comme suit :

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s
{{< /code-block >}}

Les durées sont des nombres avec un suffixe d'unité. Les suffixes pris en charge sont « s », « m », « h ».

### Syntaxe spécifique à la plateforme {#platform-specific-syntax}

Les expressions SECL prennent en charge plusieurs plateformes. Vous pouvez utiliser la documentation ci-dessous pour voir quels attributs et assistants sont disponibles pour chacun.

- [Linux][1]
- [Windows][2]

## Conseils pour la création de règles {#rule-authoring-tips}

- Définissez toujours le système d'exploitation (OS).
- Ancrez sur l'ascendance pour réduire le bruit. Utilisez `process.ancestors.file.name`.
- Utilisez des durées (par exemple, `> 5s`, `10m`, `2h`) pour cibler des fenêtres d'exécution étroites.
- Utilisez la correspondance exacte (`==`) dans la mesure du possible, car elle génère le moins de bruit.
- L'appartenance à une liste (`in [...]`) est idéale pour les listes d'autorisation ou les ensembles de valeurs contrôlés.
- Utilisez une correspondance glob (`~"/path/*"`) pour les familles de chemins, car elle est plus sûre et plus rapide que les regex.
- Utilisez les regex (`=~`) uniquement lorsque les globs/listes ne peuvent pas être utilisés. Gardez l'expression regex aussi étroite que possible. En règle générale, commencez par `==` ou `in [...]`. N'utilisez les regex qu'en dernier recours.
- Utilisez la négation (`not in [...]`, `!~`) pour définir explicitement des exceptions (par exemple, des outils approuvés).
- Utilisez les opérateurs CIDR (`in CIDR`, `not in CIDR`) pour les limites réseau.
- Nommez les règles selon leur comportement, avec un format qui suit *Quoi + Qui + Contexte*.
- Taggez généreusement : `team`, `app`, `env`, `MITRE`, `severity`.

### Évitez les erreurs courantes {#avoid-common-mistakes}

| Modèle                   | Explication                                 |
| ------------------------- | -------------------------------------------- |
| `open.file.path == "/etc/passwd"`, `exec.comm != ""` | Trop large. Correspond à de nombreux cas d'utilisation valides.  |
| `container.id != ""`      | Utile uniquement s'il est limité par un champ plus spécifique. |

## Bibliothèque d'exemples {#example-library}

<div class="alert alert-info">Vous trouverez des exemples plus détaillés dans la politique par défaut fournie prête à l'emploi avec l'Agent. Voir la <a href="https://github.com/DataDog/security-agent-policies/blob/master/runtime/default.policy">politique par défaut de Workload Protection.</a></div>

Dans les fichiers de politique de l'Agent, chaque règle inclut une `id` et une `expression`. Vous pouvez également ajouter des `actions` facultatives. Voir [Variables et actions][3] pour en savoir plus.

### Linux {#linux}

#### Accès aux fichiers sensibles (outils sûrs de la liste d'autorisation) {#access-to-sensitive-files-allowlist-safe-tools}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: access_sensitive_files
    expression: >-
      open.file.path in ["/etc/shadow", "/etc/sudoers"] &&
      process.file.path not in ["/usr/sbin/vipw", "/usr/sbin/visudo"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### NGINX ou PHP lançant bash {#nginx-or-php-spawning-bash}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: nginx_php_spawn_bash
    expression: >-
      exec.file.path == "/usr/bin/bash" &&
      (
        process.ancestors.file.name == "nginx" ||
        process.ancestors.file.name =~ "php*"
      )
    filters:
      - os == "linux"
{{< /code-block >}}

#### Accès suspect à l'IMDS depuis un conteneur {#suspicious-imds-access-from-container}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: suspicious_imds_access
    expression: >-
      connect &&
      network.destination.ip in ["169.254.169.254"] &&
      container.id != ""
    filters:
      - os == "linux"
{{< /code-block >}}

#### Chargements de modules noyau en dehors de la fenêtre de maintenance {#kernel-module-loads-outside-maintenance-window}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: kernel_module_load
    expression: >-
      load_module &&
      process.user != "root" &&
      process.ancestors.file.name not in ["modprobe", "insmod"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### Lecture de fichier sensible peu après le démarrage {#sensitive-file-read-shortly-after-start}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: sensitive_file_read_after_start
    expression: >-
      open.file.path == "/etc/secret" &&
      process.file.name == "java" &&
      process.created_at > 5s
    filters:
      - os == "linux"
{{< /code-block >}}

#### Sortant vers des adresses IP n'appartenant pas à l'entreprise (CIDR allowlist) {#outbound-to-non-corporate-ips-cidr-allowlist}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: outbound_non_corporate_ips
    expression: >-
      connect &&
      network.destination.ip not in [10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12]
    filters:
      - os == "linux"
{{< /code-block >}}

### Windows {#windows}

#### Persistance du registre via une clé d'exécution {#registry-persistence-through-a-run-key}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: registry_run_key_persistence
    expression: >-
      set_key_value &&
      open_key.registry.key_path =~ "*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*"
    filters:
      - os == "windows"
{{< /code-block >}}

#### Binaire non signé lançant PowerShell {#unsigned-binary-launching-powershell}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: unsigned_binary_powershell
    expression: >-
      exec.file.path =~ "*\\WindowsPowerShell\\v1.0\\powershell.exe" &&
      process.parent.file.path !~ "*\\Program Files*" &&
      process.user_sid != "S-1-5-18"
    filters:
      - os == "windows"
{{< /code-block >}}

### Multiplateforme {#cross-platform}

#### Indicateurs de crypto-mineurs {#crypto-miner-indicators}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: crypto_miner_indicators
    expression: >-
      exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
      exec.args in [~"*stratum+tcp*", ~"*nicehash*", ~"*yespower*"]
{{< /code-block >}}

[1]: /fr/security/workload_protection/linux_expressions
[2]: /fr/security/workload_protection/windows_expressions
[3]: /fr/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions