---
algolia:
  tags:
  - advanced log filter
description: Utiliser l'Agent Datadog pour détecter et agréger automatiquement les
  logs à lignes multiples (obsolète)
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentation
  text: Prise en main de la solution Logging without Limits™
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentation
  text: Utiliser l'Agent Datadog pour la collecte de logs uniquement
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Découvrir comment traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/live_tail/
  tag: Documentation
  text: Fonctionnalité Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail » (suivi)
title: Détection et agrégation automatiques des lignes multiples (obsolète)
---

<div class="alert alert-danger">Ce document s'applique aux versions de l'Agent antérieures à la <strong>v7.65.0</strong>, ou lorsque la méthode obsolète de détection automatique des lignes multiples est explicitement activée. Pour les versions plus récentes de l'Agent, veuillez consulter la section <a href="/agent/logs/auto_multiline_detection">Détection et agrégation automatiques des lignes multiples</a>.</div>

## Agrégation automatique et globale des lignes multiples
Depuis la version 7.37 de l'Agent, vous pouvez activer `auto_multi_line_detection` afin de détecter automatiquement les [principaux patterns à lignes multiples][1] dans l'**ensemble** des intégrations de log configurées.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}
Activez globalement `auto_multi_line_detection` dans le fichier `datadog.yaml` :

```yaml
logs_config:
  auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
Utilisez la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION` dans le conteneur de l'Agent Datadog pour configurer une règle globale d'agrégation automatique des lignes multiples. Exemple :

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
#### Operator
Utilisez le paramètre `spec.override.nodeAgent.env` dans le manifeste de votre Operator Datadog pour définir la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION`, afin de configurer une règle globale d'agrégation automatique des lignes multiples. Exemple :

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION
          value: "true"
```

#### Helm
Utilisez l'option `datadog.logs.autoMultiLineDetection` dans le chart Helm pour configurer une règle globale d'agrégation automatique des lignes multiples. Exemple :

```yaml
datadog:
  logs:
    enabled: true
    autoMultiLineDetection: true
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info"> Depuis la version 7.65 de l'Agent, vous pouvez activer l'ancien comportement en définissant la valeur <strong>true</strong> pour ce qui suit :<br> <strong>- logs_config.force_auto_multi_line_detection_v1</strong> dans votre fichier datadog.yaml <br>OU <br> <strong>- LOGS_CONFIG_FORCE_AUTO_MULTI_LINE_DETECTION_V1</strong> dans votre variable d'environnement.</div>

## Activer l'agrégation des lignes multiples pour des intégrations spécifiques
Vous avez également la possibilité d'activer ou de désactiver l'agrégation des lignes multiples pour la collecte de logs d'une intégration spécifique. Lorsque ce réglage est modifié, la configuration globale est ignorée.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}
Dans un environnement de host, activez `auto_multi_line_detection` avec la méthode de [collecte de logs personnalisée][2]. Exemple :

[2]: https://docs.datadoghq.com/fr/agent/logs/?tab=tailfiles#custom-log-collection

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```
{{% /tab %}}

{{% tab "Docker" %}}
Dans un environnement Docker, utilisez l'étiquette `com.datadoghq.ad.logs` sur votre conteneur pour spécifier la configuration de log. Exemple :

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
Dans un environnement Kubernetes, utilisez l'annotation `ad.datadoghq.com/<CONTAINER_NAME>.logs` sur votre pod pour spécifier la configuration de log. Exemple :

```yaml
apiVersion: apps/v1
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: testApp:latest
```
{{% /tab %}}
{{< /tabs >}}

## Personnaliser la configuration de l'agrégation des lignes multiples

La détection automatique des lignes multiples se base sur une liste d'[expressions régulières courantes][1] pour essayer de trouver des correspondances avec les logs. Si la liste intégrée ne contient pas assez d'expressions, vous pouvez ajouter des patterns et des seuils personnalisés afin d'améliorer la détection.

### Patterns personnalisés
{{< tabs >}}
{{% tab "Fichier de configuration" %}}
Dans un fichier de configuration, ajoutez les patterns `auto_multi_line_extra_patterns` à `datadog.yaml` :

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

### Seuil personnalisé
Le paramètre `auto_multi_line_default_match_threshold` détermine le degré de correspondance requis entre les logs et les patterns pour que l’agrégation automatique des lignes multiples fonctionne.

Si vos logs à lignes multiples ne sont pas agrégés comme prévu, vous pouvez modifier le degré de correspondance en définissant le paramètre `auto_multi_line_default_match_threshold`. Ajoutez le paramètre `auto_multi_line_default_match_threshold` à votre fichier de configuration en le définissant sur une valeur plus basse (pour obtenir plus de correspondances) ou plus haute (pour obtenir moins de correspondances) par rapport à la valeur actuelle du seuil.

Redémarrez l'Agent Datadog pour appliquer la nouvelle valeur de seuil aux prochains logs ingérés. Pour vérifier la valeur actuelle du seuil, exécutez la [commande `status` de l'Agent][3].

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
  auto_multi_line_default_match_threshold: 0.1
```
[3]: https://docs.datadoghq.com/fr/agent/configuration/agent-commands/#agent-information

{{% /tab %}}

{{% tab "Docker" %}}
Dans un Agent conteneurisé, ajoutez la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` :

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Remarque** : l'Agent Datadog interprète les espaces de la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` comme des séparateurs entre plusieurs patterns. Dans l'exemple suivant, les deux patterns d'expression régulière sont séparés par une espace, et `\s` dans le deuxième pattern correspond aux espaces.

### Seuil personnalisé
Le paramètre `auto_multi_line_default_match_threshold` détermine le degré de correspondance requis entre les logs et les patterns pour que l’agrégation automatique des lignes multiples fonctionne.

Si vos logs à lignes multiples ne sont pas agrégés comme prévu, vous pouvez modifier le degré de correspondance en définissant le paramètre `auto_multi_line_default_match_threshold`.

Ajoutez le paramètre `auto_multi_line_default_match_threshold` à votre fichier de configuration en le définissant sur une valeur plus basse (pour obtenir plus de correspondances) ou plus haute (pour obtenir moins de correspondances) par rapport à la valeur actuelle du seuil.

Pour vérifier la valeur actuelle du seuil, exécutez la [commande `status` de l'Agent][4].

```yaml
    environment:
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS=\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
      - DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD=0.1
```
[4]: https://docs.datadoghq.com/fr/agent/configuration/agent-commands/#agent-information]

{{% /tab %}}

{{% tab "Kubernetes" %}}
Dans Kubernetes, ajoutez la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` :

#### Operator
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```

#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
```
**Remarque** : l'Agent Datadog interprète les espaces de la variable d'environnement `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS` comme des séparateurs entre plusieurs patterns. Dans l'exemple suivant, les deux patterns d'expression régulière sont séparés par une espace, et `\s` dans le deuxième pattern correspondant aux espaces.

### Seuil personnalisé
Le paramètre `auto_multi_line_default_match_threshold` détermine le degré de correspondance requis entre les logs et les patterns pour que l’agrégation automatique des lignes multiples fonctionne.

Si vos logs à lignes multiples ne sont pas agrégés comme prévu, vous pouvez modifier le degré de correspondance en définissant le paramètre `auto_multi_line_default_match_threshold`. Ajoutez le paramètre `auto_multi_line_default_match_threshold` à votre fichier de configuration en le définissant sur une valeur plus basse (pour obtenir plus de correspondances) ou plus haute (pour obtenir moins de correspondances) par rapport à la valeur actuelle du seuil. Pour vérifier la valeur actuelle du seuil, exécutez la [commande `status` de l'Agent][1].

[1]: https://docs.datadoghq.com/fr/agent/configuration/agent-commands/#agent-information

#### Operator
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
          value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
        - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
          value: "0.1"
```
#### Helm
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS
      value: \d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) [A-Za-z_]+\s\d+,\s\d+\s\d+:\d+:\d+\s(AM|PM)
    - name: DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD
      value: "0.1"
```

{{% /tab %}}
{{< /tabs >}}

## Processus de détection
La détection automatique des lignes multiples identifie les logs qui commencent par les formats de date/heure suivants et les respectent : 
- ANSIC
- RFC822
- RFC822Z
- RFC850
- RFC1123
- RFC1123Z
- RFC3339
- RFC3339Nano
- Format de date Ruby
- Format de date Unix
- Format de date SimpleFormatter par défaut pour les logs Java

Lorsque l'agrégation des lignes multiples est activée, l'Agent tente d'abord de détecter un pattern dans chaque nouveau fichier de log. Ce processus de détection s'arrête après 30 secondes ou après les 500 premiers logs, selon la première occurrence. Lors du processus de détection initial, les logs sont envoyés sous forme de lignes uniques.

Une fois le seuil de détection atteint, tous les logs ultérieurs provenant de cette source sont agrégés avec le meilleur pattern détecté, ou transmis sous forme de lignes uniques si aucun pattern n'est détecté.

**Remarque** : si vous pouvez modifier le pattern utilisé pour nommer le log renouvelé, vérifiez que le fichier renouvelé remplace le fichier précédemment actif du même nom. L'Agent réutilise un pattern qui a été détecté sur le nouveau fichier, afin d'éviter d'effectuer une nouvelle fois la détection.



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187