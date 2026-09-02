---
aliases:
- /fr/tracing/security
- /fr/tracing/guide/security
- /fr/tracing/guide/agent_obfuscation
- /fr/tracing/guide/agent-obfuscation
- /fr/tracing/custom_instrumentation/agent_customization
- /fr/tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
- /fr/tracing/setup_overview/configure_data_security/
description: Configurez la bibliothèque de tracing ou l'Agent pour contrôler la collecte
  de données sensibles dans les traces.
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Conformité PCI DSS
title: Sécurité des données
---
## Section Overview

Les bibliothèques de tracing Datadog collectent des données à partir d'une application instrumentée. Ces données sont envoyées à Datadog sous forme de traces et peuvent contenir des données sensibles telles que des informations personnelles identifiables (PII). Si vous ingérez des données sensibles sous forme de traces dans Datadog, des corrections peuvent être ajoutées lors de l'ingestion avec [Sensitive Data Scanner][12]. Vous pouvez également configurer l'Agent Datadog ou la bibliothèque de tracing pour corriger les données sensibles lors de la collecte, avant que les traces ne soient envoyées à Datadog. Les outils et politiques de Datadog sont conformes à PCI v4.0. Pour en savoir plus, consultez la section [Conformité PCI DSS][14].

Si les configurations décrites ici ne couvrent pas vos exigences de conformité, contactez [l'équipe d'assistance Datadog][1].

### Informations personnelles dans les données de trace

Les bibliothèques de tracing Datadog APM collectent des données d'observabilité pertinentes sur vos applications. Ces bibliothèques collectant des centaines d'attributs uniques dans les données de trace, cette page décrit les catégories de données, en mettant l'accent sur les attributs susceptibles de contenir des informations personnelles sur vos employés et utilisateurs finaux.

Le tableau ci-dessous décrit les catégories de données personnelles collectées par l'instrumentation automatique fournie par les bibliothèques de tracing, avec quelques exemples courants.

| Catégorie            | Rôle                                                                                                            |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------|
| Nom                | Le nom complet d'un utilisateur interne (votre employé) ou d'un utilisateur final.                                                         |
| E-mail               | L'adresse e-mail d'un utilisateur interne (votre employé) ou d'un utilisateur final.                                                     |
| IP client           | L'adresse IP de votre utilisateur final associée à une requête entrante ou l'adresse IP externe d'une requête sortante. |
| Numéros de carte bancaire | Un numéro de compte principal (PAN) utilisé pour les transactions financières.                                                        |
| Instructions de base de données | Le littéral, la séquence de littéraux ou les variables de liaison utilisés dans une instruction de base de données exécutée.                           |
| Localisation géographique | Les coordonnées de longitude et de latitude pouvant être utilisées pour identifier un individu ou un foyer.                            |
| Paramètres URI      | Les valeurs des paramètres dans la partie variable du chemin URI ou de la requête URI.                                            |
| Informations utilisateur URI        | Le sous-composant userinfo de l'URI pouvant contenir le nom d'utilisateur.                                                   |
| Identifiant de connexion            | Peut inclure un ID de compte/utilisateur, un nom ou une adresse e-mail.                                                                |

Le tableau ci-dessous décrit le comportement par défaut de chaque bibliothèque de tracing par langage concernant la collecte et l'obscurcissement par défaut d'une catégorie de données.

{{% tabs %}}

{{% tab ".NET" %}}

**Remarque** : les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie            | Collectée                       | Obscurcie                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localisation géographique |                                 |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> |                                 |
| Informations utilisateur URI        |                                 |                                 |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Java" %}}

**Remarque** : les instructions de base de données ne sont pas collectées par défaut et doivent être activées. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie            | Collectée                       | Obscurcie                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> |                                 |
| Localisation géographique |                                 |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Informations utilisateur URI        |                                 |                                 |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Node.js" %}}

**Remarque** : les paramètres URI ne sont pas collectés par défaut et doivent être activés. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie            | Collectée                       | Obscurcie                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> |                                 |
| Localisation géographique |                                 |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Informations utilisateur URI        |                                 |                                 |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "PHP" %}}

**Remarque** : les paramètres URI ne sont pas collectés par défaut et doivent être activés. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie            |            Collectée            |           Obscurcie            |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localisation géographique |                                 |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Informations utilisateur URI        | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Python" %}}

**Remarque** : l'IP client, la localisation géographique et les paramètres URI ne sont pas collectés par défaut et doivent être activés. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie            | Collectée                       | Obscurcie                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localisation géographique | <i class="icon-check-bold"></i> |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Informations utilisateur URI        |                                 |                                 |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

[1]: /fr/tracing/trace_collection/compatibility/python/#datastore-compatibility
{{% /tab %}}

{{% tab "Ruby" %}}

**Remarque** : les IP clients ne sont pas collectées par défaut et doivent être activées. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut. 

| Catégorie            | Collectée                       | Obscurcie                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nom                | <i class="icon-check-bold"></i> |                                 |
| E-mail               | <i class="icon-check-bold"></i> |                                 |
| IP client           | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données | <i class="icon-check-bold"></i> |                                 |
| Localisation géographique |                                 |                                 |
| Paramètres URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Informations utilisateur URI        |                                 |                                 |
| Identifiant de connexion            | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Go" %}}

**Remarque** : les IP clients ne sont pas collectées par défaut et doivent être activées. Les instructions de base de données sont obscurcies par l'Agent Datadog. Les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie                |            Collectée            |           Obscurcie            |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Nom                    |                                 |                                 |
| E-mail                   |                                 |                                 |
| IP client               | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire     | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données     | <i class="icon-check-bold"></i> |                                 |
| Localisation géographique     |                                 |                                 |
| Chemin URI client         | <i class="icon-check-bold"></i> |                                 |
| Chaîne de requête URI client | <i class="icon-check-bold"></i> |                                 |
| Chemin URI serveur         | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Chaîne de requête URI serveur | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Corps HTTP               | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Cookies HTTP            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| En-têtes HTTP            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Identifiant de connexion                | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Nginx" %}}

**Remarque** : les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie                |            Collectée            |           Obscurcie            |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Nom                    |                                 |                                 |
| E-mail                   |                                 |                                 |
| IP client               | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire     | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données     |                                 |                                 |
| Localisation géographique     |                                 |                                 |
| Chemin URI client         | <i class="icon-check-bold"></i> |                                 |
| Chaîne de requête URI client | <i class="icon-check-bold"></i> |                                 |
| Chemin URI serveur         |                                 |                                 |
| Chaîne de requête URI serveur |                                 |                                 |
| Corps HTTP               |                                 |                                 |
| Cookies HTTP            |                                 |                                 |
| En-têtes HTTP            |                                 |                                 |
| Identifiant de connexion                | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Kong" %}}

**Remarque** : les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie                |            Collectée            |           Obscurcie            |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Nom                    |                                 |                                 |
| E-mail                   |                                 |                                 |
| IP client               | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire     | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données     |                                 |                                 |
| Localisation géographique     |                                 |                                 |
| Chemin URI client         | <i class="icon-check-bold"></i> |                                 |
| Chaîne de requête URI client |                                 |                                 |
| Chemin URI serveur         |                                 |                                 |
| Chaîne de requête URI serveur |                                 |                                 |
| Corps HTTP               |                                 |                                 |
| Cookies HTTP            |                                 |                                 |
| En-têtes HTTP            |                                 |                                 |
| Identifiant de connexion                | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% tab "Envoy" %}}

**Remarque** : les numéros de carte de crédit sont obscurcis par l'Agent Datadog par défaut.

| Catégorie                |            Collectée            |           Obscurcie            |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Nom                    |                                 |                                 |
| E-mail                   |                                 |                                 |
| IP client               | <i class="icon-check-bold"></i> |                                 |
| Numéros de carte bancaire     | <i class="icon-check-bold"></i> |                                 |
| Instructions de base de données     |                                 |                                 |
| Localisation géographique     |                                 |                                 |
| Chemin URI client         |                                 |                                 |
| Chaîne de requête URI client |                                 |                                 |
| Chemin URI serveur         |                                 |                                 |
| Chaîne de requête URI serveur |                                 |                                 |
| Corps HTTP               |                                 |                                 |
| Cookies HTTP            |                                 |                                 |
| En-têtes HTTP            |                                 |                                 |
| Identifiant de connexion                | <i class="icon-check-bold"></i> |                                 |

{{% /tab %}}

{{% /tabs %}}

Si vous utilisez Datadog App and API Protection (AAP), les bibliothèques de tracing collectent des données de requêtes HTTP pour vous aider à comprendre la nature d'une trace de sécurité. Datadog AAP masque automatiquement certaines données, et vous pouvez configurer vos propres règles de détection. Pour en savoir plus sur ces comportements par défaut et les options de configuration, consultez la documentation [confidentialité des données][13] de Datadog AAP.

## Agent

### Noms de ressources

Les spans Datadog incluent un attribut de nom de ressource pouvant contenir des données sensibles. L'Agent Datadog implémente l'obscurcissement des noms de ressources pour plusieurs cas connus :

* **Les littéraux numériques SQL et les variables de liaison sont obscurcis** : par exemple, la requête suivante `SELECT data FROM table WHERE key=123 LIMIT 10` est obscurcie en `SELECT data FROM table WHERE key = ? LIMIT ?` avant de définir le nom de ressource pour le span de requête.
* **Les chaînes littérales SQL sont identifiées à l'aide des guillemets ANSI SQL standard** : cela signifie que les chaînes doivent être entourées de guillemets simples (`'`). Certaines variantes SQL prennent en charge optionnellement les guillemets doubles (`"`) pour les chaînes, mais la plupart traitent les éléments entre guillemets doubles comme des identifiants. L'outil d'obscurcissement Datadog les traite comme des identifiants plutôt que comme des chaînes et ne les obscurcit pas.
* **Les requêtes Redis sont quantifiées en sélectionnant uniquement les tokens de commande** : par exemple, la requête suivante `MULTI\nSET k1 v1\nSET k2 v2` est quantifiée en `MULTI SET SET`.

### Obscurcissement des traces

L'Agent Datadog obscurcit également les données de [trace][2] sensibles qui ne figurent pas dans le nom de ressource. Vous pouvez configurer les règles d'obscurcissement à l'aide de variables d'environnement ou du fichier de configuration `datadog.yaml`.

Les métadonnées suivantes peuvent être obscurcies :

* Requêtes MongoDB
* Corps des requêtes ElasticSearch
* Commandes Redis
* Commandes MemCached
* URL HTTP
* Stack traces
* Numéros de carte bancaire

**Remarque** : l'obscurcissement peut avoir un impact sur les performances de votre système ou masquer des informations importantes qui ne sont pas sensibles. Réfléchissez à l'obscurcissement dont vous avez besoin pour votre configuration et personnalisez votre configuration en conséquence.

**Remarque** : vous pouvez utiliser le nettoyage automatique pour plusieurs types de services simultanément. Configurez chacun dans la section `obfuscation` de votre fichier `datadog.yaml`.
{{< tabs >}}

{{% tab "MongoDB" %}}

Les requêtes MongoDB dans un [span][1] de type `mongodb` sont obscurcies par défaut.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      ## Configures obfuscation rules for spans of type "mongodb". Enabled by default.
      enabled: true
      keep_values:
        - document_id
        - template_id
      obfuscate_sql_values:
        - val1
```

Cela peut également être désactivé avec la variable d'environnement `DD_APM_OBFUSCATION_MONGODB_ENABLED=false`.

* `keep_values` ou la variable d'environnement `DD_APM_OBFUSCATION_MONGODB_KEEP_VALUES` - définit un ensemble de clés à exclure de l'obscurcissement des traces de l'Agent Datadog. Si non défini, toutes les clés sont obscurcies.
* `obfuscate_sql_values` ou la variable d'environnement `DD_APM_OBFUSCATION_MONGODB_OBFUSCATE_SQL_VALUES` - définit un ensemble de clés à inclure dans l'obscurcissement des traces de l'Agent Datadog. Si non défini, toutes les clés sont obscurcies.

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

Les corps de requêtes ElasticSearch dans un [span][1] de type `elasticsearch` sont obscurcis par défaut.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    elasticsearch:
      ## Configures obfuscation rules for spans of type "elasticsearch". Enabled by default.
      enabled: true
      keep_values:
        - client_id
        - product_id
      obfuscate_sql_values:
        - val1
```

Cela peut également être désactivé avec la variable d'environnement `DD_APM_OBFUSCATION_ELASTICSEARCH_ENABLED=false`.

* `keep_values` ou la variable d'environnement `DD_APM_OBFUSCATION_ELASTICSEARCH_KEEP_VALUES` - définit un ensemble de clés à exclure de l'obscurcissement des traces de l'Agent Datadog. Si non défini, toutes les clés sont obscurcies.
* `obfuscate_sql_values` ou la variable d'environnement `DD_APM_OBFUSCATION_ELASTICSEARCH_OBFUSCATE_SQL_VALUES` - définit un ensemble de clés à inclure dans l'obscurcissement des traces de l'Agent Datadog. Si non défini, toutes les clés sont obscurcies.

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Redis" %}}

Les commandes Redis dans un [span][1] de type `redis` sont obscurcies par défaut.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Configures obfuscation rules for spans of type "redis". Enabled by default.
    redis:
      enabled: true
      remove_all_args: true
```

Cela peut également être désactivé avec la variable d'environnement `DD_APM_OBFUSCATION_REDIS_ENABLED=false`.

* `remove_all_args` ou la variable d'environnement `DD_APM_OBFUSCATION_REDIS_REMOVE_ALL_ARGS` - remplace tous les arguments d'une commande Redis par un seul "?" si true. Désactivé par défaut.

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

Les commandes MemCached dans un [span][1] de type `memcached` sont obscurcies par défaut.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      ## Configures obfuscation rules for spans of type "memcached". Enabled by default.
      enabled: true
```

Cette option peut également être désactivée avec la variable d'environnement `DD_APM_OBFUSCATION_MEMCACHED_ENABLED=false`.

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Http" %}}

Les URL HTTP dans un [span][1] de type `http` ou `web` ne sont pas obscurcies par défaut.

**Remarque** : les mots de passe dans les informations utilisateur d'une URL ne sont pas collectés par Datadog.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      ## Enables obfuscation of query strings in URLs. Disabled by default.
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` ou la variable d'environnement `DD_APM_OBFUSCATION_HTTP_REMOVE_QUERY_STRING` : si true, obscurcit les chaînes de requête dans les URL (`http.url`).
* `remove_paths_with_digits` ou la variable d'environnement `DD_APM_OBFUSCATION_HTTP_REMOVE_PATHS_WITH_DIGITS` : si true, les segments de chemin dans les URL (`http.url`) contenant un ou plusieurs chiffres sont remplacés par "?".

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Stack Traces" %}}

Désactivé par défaut.

Définissez le paramètre `remove_stack_traces` sur true pour supprimer les stack traces et les remplacer par `?`.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Enables removing stack traces to replace them with "?". Disabled by default.
    remove_stack_traces: true # default false
```

Cette option peut également être activée avec la variable d'environnement `DD_APM_OBFUSCATION_REMOVE_STACK_TRACES=true`.

{{% /tab %}}
{{% tab "Credit Card" %}}

Analyse toutes les métadonnées des spans à la recherche de nombres ressemblant à des numéros de carte de crédit. Toute valeur correspondante est remplacée par `?`. Cette vérification s'applique à tous les types de spans et est activée par défaut. Cette analyse initiale étant basée sur des modèles, elle peut parfois générer des faux positifs en masquant d'autres longs nombres. Pour améliorer la précision, vous pouvez activer l'option `credit_cards.luhn` décrite ci-dessous.

**Remarque** : l'analyse recherche des valeurs qui sont exactement des numéros de carte de crédit (autorisant les espaces internes). Si une métavaleur contient des données de chaîne supplémentaires, cet outil d'obscurcissement détermine que la valeur n'est pas un numéro de carte de crédit. Par exemple :

- Une métavaleur de `4111 1111 1111 1111` est masquée en `?`.
- Une métavaleur de `CC-4111 1111 1111 1111` n'est **pas** masquée.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    credit_cards:
      ## Enable obfuscation of suspected credit card values in meta fields.
      ## Enabled by default.
      enabled: true
      ## Enables a Luhn checksum check to reduce false positives.
      ## This option increases CPU usage.
      luhn: false
      ## A list of known safe keys to skip obfuscation.
      keep_values:
       - some_key_to_keep
```
- `credit_cards.enabled` : définissez sur false pour désactiver cet outil d'obscurcissement.
  - Variable d'environnement : `DD_APM_OBFUSCATION_CREDIT_CARDS_ENABLED`
- `credit_cards.luhn` : définissez sur true pour activer une vérification de la somme de contrôle Luhn qui valide les nombres afin d'éliminer les faux positifs. Cela augmente l'utilisation du CPU et le coût en performances de cette vérification.
  - Variable d'environnement : `DD_APM_OBFUSCATION_CREDIT_CARDS_LUHN`
- `credit_cards.keep_values` : définissez sur une liste de clés sûres connues pour ignorer l'obscurcissement des cartes de crédit.
  - Variable d'environnement : `DD_APM_OBFUSCATION_CREDIT_CARDS_KEEP_VALUES`

{{% /tab %}}
{{< /tabs >}}

### Remplacer les tags

Pour nettoyer les données sensibles des tags de votre [span][4], utilisez le paramètre `replace_tags` [dans votre fichier de configuration datadog.yaml][5] ou la variable d'environnement `DD_APM_REPLACE_TAGS`. La valeur du paramètre ou de la variable d'environnement est une liste d'un ou plusieurs groupes de paramètres spécifiant comment remplacer les données sensibles dans vos tags. Ces paramètres sont :

* `name` : la clé du tag à remplacer. Pour inclure tous les tags, utilisez le caractère `*`. Pour inclure la ressource, utilisez `nom.ressource`.
* `pattern` : l'expression régulière à utiliser.
* `repl`: la chaîne de remplacement.

Exemple :

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # Replace all characters starting at the `token/` string in the tag "http.url" with "?"
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Remove trailing "/" character in resource names
    - name: "resource.name"
      pattern: "(.*)\/$"
      repl: "$1"
    # Replace all the occurrences of "foo" in any tag with "bar"
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remove all "error.stack" tag's value
    - name: "error.stack"
      pattern: "(?s).*"
    # Replace series of numbers in error messages
    - name: "error.message"
      pattern: "[0-9]{10}"
      repl: "[REDACTED]"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```json
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "resource.name",
        "pattern": "(.*)\/$",
        "repl": "$1"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      },
      {
        "name": "error.message",
        "pattern": "[0-9]{10}",
        "repl": "[REDACTED]"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Définissez la variable d'environnement `DD_APM_REPLACE_TAGS` :
- Pour l'opérateur Datadog, dans `override.nodeAgent.env` de votre `datadog-agent.yaml`
- Pour Helm, dans `agents.containers.traceAgent.env` de votre `datadog-values.yaml`
- Pour une configuration manuelle, dans la section du conteneur `trace-agent` de votre manifeste

```yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "resource.name",
              "pattern": "(.*)\/$",
              "repl": "$1"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            },
            {
              "name": "error.message",
              "pattern": "[0-9]{10}",
              "repl": "[REDACTED]"
            }
          ]'
```

#### Exemples

Opérateur Datadog :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

Helm :

```yaml
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

[1]: /fr/containers/kubernetes/installation/?tab=daemonset
[2]: /fr/containers/kubernetes/installation/?tab=helm
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"resource.name","pattern":"(.*)\/$","repl":"$1"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"},{"name":"error.message","pattern":"[0-9]{10}","repl":"[REDACTED]"}]
```

{{% /tab %}}
{{< /tabs >}}

### Ignorer les ressources

Pour un aperçu approfondi des options permettant d'éviter de tracer des ressources spécifiques, consultez la section [Ignorer les ressources indésirables][6].

Si vos services incluent du trafic simulé comme des checks de santé, il peut être préférable de ne pas collecter ces traces afin que les métriques de vos services correspondent au trafic de production.

L'Agent peut être configuré pour exclure une ressource spécifique des traces envoyées par l'Agent à Datadog. Pour empêcher la soumission de ressources spécifiques, utilisez le paramètre `ignore_resources` dans le fichier `datadog.yaml`. Créez ensuite une liste d'une ou plusieurs expressions régulières spécifiant les ressources que l'Agent filtre en fonction de leur nom de ressource.

Si vous exécutez dans un environnement conteneurisé, définissez `DD_APM_IGNORE_RESOURCES` sur le conteneur avec l'Agent Datadog à la place. Consultez la section [Variables d'environnement de l'Agent APM Docker][7] pour en savoir plus.

```text
###### @param ignore_resources - list of strings - optional

###### A list of regular expressions can be provided to exclude certain traces based on their resource name.

###### All entries must be surrounded by double quotes and separated by commas.

###### ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]

```

## Bibliothèque

### HTTP

Datadog standardise la [sémantique des tags de span][3] dans les bibliothèques de tracing. Les informations des requêtes HTTP sont ajoutées en tant que tags de span avec le préfixe `http.`. Les bibliothèques disposent des options de configuration suivantes pour contrôler les données sensibles collectées dans les spans HTTP.

#### Masquer les chaînes de requête

Le tag `http.url` reçoit la valeur complète de l'URL, y compris la chaîne de requête. La chaîne de requête pouvant contenir des données sensibles, Datadog l'analyse par défaut et masque les valeurs suspectes. Ce processus de masquage est configurable. Pour modifier l'expression régulière utilisée pour le masquage, définissez la variable d'environnement `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` sur une regex valide de votre choix. La regex valide est spécifique à la plateforme. Lorsque la regex détecte une paire clé-valeur suspecte, elle la remplace par `<redacted>`.

Si vous ne souhaitez pas collecter la chaîne de requête, définissez la variable d'environnement `DD_HTTP_SERVER_TAG_QUERY_STRING` sur `false`. La valeur par défaut est `true`.

#### Collecter les en-têtes

Pour collecter les tags d'en-têtes de trace, définissez la variable d'environnement `DD_TRACE_HEADER_TAGS` avec un mappage de clés d'en-tête insensibles à la casse vers des noms de tags. La bibliothèque applique les valeurs d'en-tête correspondantes en tant que tags sur les spans racines. Le paramètre accepte également des entrées sans nom de tag spécifié, par exemple :

```
DD_TRACE_HEADER_TAGS=CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name
```

### Traitement

Certaines bibliothèques de tracing fournissent une interface pour le traitement des spans afin de modifier manuellement ou de supprimer les données sensibles collectées dans les traces :

* Java : [Interface TraceInterceptor][9]
* Ruby : [Pipeline de traitement][10]
* Python : [Filtrage des traces][11]

## Collecte de données de télémétrie

{{< site-region region="gov" >}}

<div class="alert alert-danger">
Les données de télémétrie d'instrumentation ne sont pas disponibles pour le site {{< region-param key="dd_site_name" >}}, mais sont activées par défaut. Pour éviter les erreurs, les utilisateurs de {{< region-param key="dd_site_name" >}} doivent désactiver cette fonctionnalité en définissant <code>DD_INSTRUMENTATION_TELEMETRY_ENABLED=false</code> sur leur application et <code>DD_APM_TELEMETRY_ENABLED=false</code> sur leur Agent.
</div>

{{< /site-region >}}

Datadog peut collecter des informations environnementales et de diagnostic sur vos bibliothèques de tracing à des fins de traitement ; ces informations peuvent inclure des données sur le host exécutant une application, le système d'exploitation, le langage de programmation et le runtime, les intégrations APM utilisées et les dépendances de l'application. De plus, Datadog peut collecter des informations telles que des logs de diagnostic, des rapports de plantage avec des stack traces obscurcies et diverses métriques de performances système.

Vous pouvez désactiver cette collecte de données de télémétrie à l'aide de l'un de ces paramètres :

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  telemetry:
    enabled: false
```

{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
export DD_APM_TELEMETRY_ENABLED=false
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/tracing/glossary/#trace
[3]: /fr/tracing/trace_collection/tracing_naming_convention/#http-requests
[4]: /fr/tracing/glossary/#spans
[5]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /fr/tracing/guide/ignoring_apm_resources/
[7]: /fr/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[8]: /fr/tracing/guide/send_traces_to_agent_by_api/
[9]: /fr/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[10]: /fr/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[11]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[12]: /fr/security/sensitive_data_scanner/
[13]: /fr/security/application_security/how-it-works/#data-privacy
[14]: /fr/data_security/pci_compliance/