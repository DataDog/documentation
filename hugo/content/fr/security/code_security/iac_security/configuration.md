---
aliases:
- /fr/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
- /fr/security/code_security/iac_security/exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Empêchez les erreurs de configuration cloud d'atteindre la production avec
    Datadog IaC Security.
- link: /security/code_security/iac_security
  tag: Documentation
  text: IaC Security
- link: /security/code_security/iac_security/setup
  tag: Documentation
  text: Configurer IaC Security pour Code Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentation
  text: Règles de IaC Security
title: Configuration d'Infrastructure as Code (IaC) Security
---
Infrastructure as Code (IaC) Security détecte les mauvaises configurations IaC. Par défaut, IaC Security analyse les dépôts avec [toutes les règles supportées][3]. Vous pouvez personnaliser les règles à exécuter et sur quels chemins, ainsi que leurs gravités et types de règles. Configurez ces paramètres sous la clé `iac` dans la configuration Code Security, soit dans Datadog, soit dans un fichier `code-security.datadog.yaml`.

Pour plus d'informations sur les emplacements de configuration, la priorité et la fusion, consultez la [Code Security Configuration Reference][1].

## Méthodes de configuration {#configuration-methods}

Vous pouvez configurer IaC Security en utilisant :

- Datadog ou un fichier `code-security.datadog.yaml` pour les paramètres de règle, de gravité, de type de règle et de chemin à l'échelle du dépôt. Utilisez cette méthode lorsque vous souhaitez que la même configuration s'applique à l'ensemble d'un dépôt ou d'une organisation.
- Commentaires en ligne pour les exclusions locales et spécifiques aux fichiers qui doivent rester avec le fichier IaC. Utilisez cette méthode lorsqu'une exception s'applique à une ligne, un bloc ou un fichier spécifique.

## Format de configuration {#configuration-format}

Le format de configuration suivant s'applique à tous les emplacements de configuration : au niveau de l'organisation, au niveau du dépôt et au niveau du dépôt (fichier).

Le fichier de configuration doit commencer par `schema-version: v1.4`, suivi d'une clé `iac` contenant la configuration de l'analyse.

La structure complète est la suivante :

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  # Do not run these rules.
  ignore-rules:
    - A
    - B
  # Run only these rules. If this field is set, all other rules are ignored.
  use-rules:
    - A
  global-config:
    # Only analyze the following paths/files.
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files.
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    # Do not report findings with these severities.
    ignore-severities:
      - low
      - info
    # Report only findings with these severities.
    only-severities:
      - high
      - critical
    # Do not report findings with these rule types.
    ignore-categories:
      - "Best Practices"
    # Report only findings with these rule types.
    only-categories:
      - "Encryption"
    # Do not run rules from these platforms.
    ignore-platforms:
      - Dockerfile
    # Only run rules from these platforms.
    only-platforms:
      - Terraform
      - Kubernetes
      - CICD
  # Per-rule configurations.
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      ignore-paths:
        - "test/"
      severity: low
    kubernetes-deployment-without-resource-limits:
      only-paths:
        - "k8s/production/"
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

La clé `iac` prend en charge les champs suivants :

| **Propriété** | **Type** | **Description** |
| --- | --- | --- |
| `ignore-rules` | Tableau | Une liste d'identifiants de règle à ignorer. |
| `use-rules` | Tableau | Une liste d'identifiants de règle à exécuter. Si spécifié, _seules_ ces règles sont exécutées. `ignore-rules` a priorité sur `use-rules` : une règle présente dans les deux tableaux est ignorée. |
| `global-config` | Objet | Paramètres globaux pour le scanner IaC. |
| `rule-configs` | Objet | Configurations par règle. Les clés sont des identifiants de règle. |

## Configuration de la règle {#rule-configuration}

Pour modifier les règles exécutées :

- **Exécuter uniquement des règles spécifiques** : Listez-les sous `use-rules`
- **Désactiver des règles spécifiques** : Listez-les sous `ignore-rules`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  use-rules:
    - A
{{< /code-block >}}

Remplacez les espaces réservés tels que `A` et `B` par des identifiants de règle Code Security. Les identifiants de règle hérités sont également pris en charge pour la compatibilité ascendante.

## Configuration globale {#global-configuration}

L'objet `global-config` contrôle les paramètres à l'échelle du dépôt:

| **Propriété** | **Type** | **Description** |
| --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. Seuls les fichiers correspondants sont analysés. |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure. Les fichiers correspondants ne sont pas analysés. |
| `only-severities` | Tableau | Niveaux de gravité à signaler. Les résultats ayant d'autres niveaux de gravité ne sont pas signalés. |
| `ignore-severities` | Tableau | Niveaux de gravité à ignorer. |
| `only-categories` | Tableau | Types de règles à signaler. Les résultats ayant d'autres types de règles ne sont pas signalés. |
| `ignore-categories` | Tableau | Types de règles à ignorer. |
| `ignore-platforms` | Tableau | Plateformes à ignorer. Les règles issues de ces plateformes ne sont pas appliquées. |
| `only-platforms` | Tableau | Plateformes à analyser. Les règles provenant d'autres plateformes ne sont pas appliquées. |

### Gravités {#severities}

Utilisez `ignore-severities` pour ignorer les résultats en fonction du niveau de gravité. Utilisez `only-severities` pour signaler uniquement des niveaux de gravité spécifiques.

**Valeurs possibles :**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### Chemins {#paths}

Utilisez `ignore-paths` pour exclure des fichiers ou répertoires spécifiques de l'analyse. Utilisez `only-paths` pour analyser uniquement des fichiers ou répertoires spécifiques. Ces options prennent en charge les modèles glob.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
{{< /code-block >}}

### Types de règles {#rule-types}

Utilisez `ignore-categories` pour ignorer les résultats avec des types de règles spécifiques. Utilisez `only-categories` pour signaler uniquement des types de règles spécifiques.

**Valeurs possibles :**

- `Access Control`
- `Availability`
- `Backup`
- `Best Practices`
- `Bill Of Materials`
- `Build Process`
- `Encryption`
- `Insecure Configurations`
- `Insecure Defaults`
- `Least Privilege`
- `Networking and Firewall`
- `Observability`
- `Resource Management`
- `Secret Management`
- `Structure and Semantics`
- `Supply-Chain`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

### Plateformes {#platforms}

Utilisez `ignore-platforms` pour ignorer des plateformes spécifiques. Utilisez `only-platforms` pour limiter l'analyse à des plateformes spécifiques.

**Valeurs possibles :**

- `Ansible`
- `CICD`
- `CloudFormation`
- `Dockerfile`
- `Kubernetes`
- `Terraform`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    only-platforms:
      - Terraform
      - Kubernetes
{{< /code-block >}}

## Configuration par règle {#per-rule-configuration}

Utilisez `rule-configs` pour configurer des règles individuelles.

Chaque clé sous `rule-configs` est un identifiant de règle. Les propriétés suivantes sont prises en charge par règle :

| **Propriété** | **Type** | **Description** |
| --- | --- | --- |
| `only-paths` | Tableau | Chemins de fichiers ou modèles glob. La règle est appliquée uniquement aux fichiers correspondant à ces modèles. |
| `ignore-paths` | Tableau | Chemins de fichiers ou modèles glob à exclure. La règle n'est pas appliquée aux fichiers correspondant à ces modèles. |
| `arguments` | Objet | Paramètres spécifiques à la règle qui ajustent le comportement de la règle. Les noms d'arguments et les types de valeurs pris en charge dépendent de la règle. |
| `severity` | Chaîne | Remplace la gravité des résultats générés par cette règle. Valeurs acceptées : `critical`, `high`, `medium`, `low`, `info`. |

### Délimitation du chemin par règle {#per-rule-path-scoping}

Excluez une règle de certains chemins, ou restreignez-la à des chemins spécifiques :

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      # Do not apply this rule in test directories.
      ignore-paths:
        - "test/"
        - "**/testdata/"
    kubernetes-deployment-without-resource-limits:
      # Apply this rule only in production manifests.
      only-paths:
        - "k8s/production/"
{{< /code-block >}}

Les modèles de chemin prennent en charge la syntaxe glob (`*`, `**`, `?`). Les chemins sont relatifs à la racine du dépôt.

### Remplacement de la gravité par règle {#per-rule-severity-override}

Modifiez la gravité des résultats générés par une règle spécifique :

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      severity: low
{{< /code-block >}}

Cette gravité s'applique à tous les résultats générés par cette règle.

### Arguments par règle {#per-rule-arguments}

Utilisez `arguments` pour définir des paramètres pour une règle spécifique. Les noms d'arguments et les types de valeurs pris en charge dépendent de la règle. Définissez les arguments sous l'ID de règle dans `rule-configs`.

L'exemple suivant configure la règle `cicd-github-unpinned-actions-full-length-commit-sha` et autorise l'action `libbpf/ci/run-qemu` :

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

## Configuration héritée {#legacy-configuration}

IaC Security utilisait précédemment un fichier de configuration (`dd-iac-scan.config`) et un schéma différents. Ce schéma est obsolète et ne reçoit plus de mises à jour, mais il est [documenté][2] dans le dépôt `datadog-iac-scanner`.

Un fichier `code-security.datadog.yaml` avec une section `iac` prévaut sur `dd-iac-scan.config` si les deux sont présents.

## Configurer des exclusions avec un commentaire en ligne {#configure-exclusions-with-an-inline-comment}

Pour contrôler quelles parties d'un fichier sont analysées, ajoutez un commentaire contenant `dd-iac-scan`, suivi d'une commande et de toutes les valeurs requises. Faites précéder `dd-iac-scan` de la syntaxe de commentaire pour le format de fichier. Les exclusions en ligne ne s'appliquent qu'au sein du fichier où elles sont utilisées.

### Commandes prises en charge {#supported-commands}

| **Commentaire**                      | **Description**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignore le fichier entier.        |
| `dd-iac-scan disable=<rule_id>`  | Ignore des règles spécifiques.         |
| `dd-iac-scan enable=<rule_id>`   | Inclut uniquement des règles spécifiques.   |
| `dd-iac-scan ignore-line`        | Ignore une seule ligne.          |
| `dd-iac-scan ignore-block`       | Ignore un bloc entier.        |

#### dd-iac-scan ignore {#dd-iac-scan-ignore}

Exclut le fichier entier de l'analyse. Ce commentaire doit être placé au début du fichier pour prendre effet.

{{< code-block lang="yaml" >}}
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

#### dd-iac-scan disable=rule_id {#dd-iac-scan-disablerule-id}

Exclut les résultats d'analyse pour les règles spécifiées dans ce fichier. Ce commentaire doit être placé au début du fichier pour prendre effet.

{{< code-block lang="yaml" >}}
# dd-iac-scan disable=A,B

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Les résultats des règles spécifiées sont ignorés pour ce fichier. Les identifiants de règle hérités sont également pris en charge pour la compatibilité ascendante.

#### dd-iac-scan enable=rule_id {#dd-iac-scan-enablerule-id}

Limite les résultats d'analyse dans ce fichier aux seules règles spécifiées. Ce commentaire doit être placé au début du fichier pour prendre effet.

{{< code-block lang="yaml" >}}
# dd-iac-scan enable=A

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Seuls les résultats des règles spécifiées sont inclus dans les résultats d'analyse pour ce fichier. Les identifiants de règle hérités sont également pris en charge pour la compatibilité ascendante.

#### dd-iac-scan ignore-line {#dd-iac-scan-ignore-line}

Empêche les résultats d'analyse de signaler la ligne située immédiatement après ce commentaire. Ce commentaire peut être placé n'importe où dans le fichier.

{{< highlight yaml "hl_lines=3" >}}
resource "google_storage_bucket" "example" {
  # dd-iac-scan ignore-line
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

Dans l'exemple précédent, les résultats sur la ligne en surbrillance sont ignorés.

#### dd-iac-scan ignore-block {#dd-iac-scan-ignore-block}

Empêche les résultats d'analyse de signaler un bloc de ressources entier ainsi que toutes ses paires clé-valeur. Ce commentaire peut être placé n'importe où dans le fichier.

{{< highlight yaml "hl_lines=2-6" >}}
# dd-iac-scan ignore-block
resource "google_storage_bucket" "example" {
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

Dans l'exemple précédent, les résultats sur le bloc en surbrillance sont ignorés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/guides/configuration/
[2]: https://github.com/DataDog/datadog-iac-scanner/blob/main/legacy_config.md
[3]: /fr/security/code_security/iac_security/iac_rules/