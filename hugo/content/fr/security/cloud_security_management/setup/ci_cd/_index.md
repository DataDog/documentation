---
disable_toc: false
further_reading:
- link: /security/cloud_security_management/vulnerabilities
  tag: Documentation
  text: Cloud Security Vulnerabilities
- link: /infrastructure/containers/container_images
  tag: Documentation
  text: Visualiser Container Images
- link: /security/cloud_security_management/setup/agent
  tag: Documentation
  text: Configuration de Datadog Agent pour la sécurité cloud
title: Analyse d'images de conteneurs dans la CI/CD
---
## Présentation {#overview}

La sécurité cloud vous permet d'analyser les images de conteneur à la recherche de vulnérabilités pendant la CI/CD, avant que les images ne soient déployées en production. En intégrant l'analyse des vulnérabilités directement dans vos pipelines, vous pouvez détecter et corriger les problèmes de sécurité tôt dans le cycle de vie du développement.

Pour prendre en charge l'analyse d'images de conteneurs basée sur la CI/CD, Datadog fournit le **Datadog Security CLI**. La CLI est conçue pour être exécutée directement dans vos jobs CI, vous donnant un contrôle total sur le moment et la manière dont les analyses sont effectuées dans le cadre de vos pipelines.

**Remarque** : Pour la gestion des vulnérabilités dans les environnements de production, consultez [Cloud Security Vulnerabilities][1].

## Démarrez {#get-started}

Pour commencer avec l'analyse d'images de conteneurs dans la CI/CD :

1. [Configurez les identifiants Datadog](#configure-datadog-credentials)
2. [Installez le Datadog Security CLI](#install-the-datadog-security-cli) dans votre pipeline CI/CD.
3. [Consultez les résultats d'analyse](#view-scan-results) sur la page [Cloud Security Vulnerabilities][3]
4. Optionnellement, [exécutez des analyses locales pendant le développement](#run-local-scans-during-development) pour une itération plus rapide

### Configurez les identifiants Datadog {#configure-datadog-credentials}

Pour télécharger les résultats d'analyse vers Datadog, configurez les variables d'environnement suivantes dans votre pipeline CI :

| Nom         | Description                                                                                                                | Requis | Par défaut         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Votre clé Datadog API. Cette clé est créée par votre [organisation Datadog][4] et doit être stockée en tant que secret.            | Oui      |                 |
| `DD_APP_KEY` | Votre clé d'application Datadog. Cette clé, créée par votre [organisation Datadog][5], doit inclure la portée `appsec_vm_read` et être stockée en tant que secret.    | Oui      |                 |
| `DD_SITE`    | Le [site Datadog][6] vers lequel envoyer les informations. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.       | Non       | `datadoghq.com` |

<div class="alert alert-info">
Stockez vos clés d'API et d'application en tant que secrets dans votre plateforme CI/CD pour protéger les identifiants sensibles.
</div>


### Install the Datadog Security CLI {#install-the-datadog-security-cli}

Le Datadog Security CLI est disponible à l'installation depuis les dépôts de paquets Datadog. Vous pouvez installer le Datadog Security CLI sur les systèmes Debian/Ubuntu, Red Hat/CentOS et macOS. L'analyse d'images de conteneurs fonctionne avec toutes les principales plateformes CI/CD, notamment :
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- Autres fournisseurs CI capables d'exécuter des scripts shell

L'approche par script personnalisable vous donne un contrôle total sur le moment et la manière dont les analyses sont exécutées dans vos pipelines. Choisissez votre méthode d'installation ci-dessous.


{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

#### Installer depuis le dépôt de paquets {#install-from-package-repository}

```bash
# Import Datadog APT signing key
DD_APT_KEY_URL="https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public"
curl -fsSL "$DD_APT_KEY_URL" | sudo gpg --dearmor -o /usr/share/keyrings/datadog-archive-keyring.gpg

# Add Datadog repository
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable datadog-security-cli" \
| sudo tee /etc/apt/sources.list.d/datadog-security-cli.list

# Update package list and install
sudo apt update
sudo apt install datadog-security-cli
```

{{% /tab %}}
{{% tab "Red Hat/CentOS" %}}

#### Installer depuis le dépôt de paquets {#install-from-package-repository-1}

```bash
# Import Datadog RPM signing key
sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public

# Add Datadog repository
sudo tee /etc/yum.repos.d/datadog-security-cli.repo > /dev/null <<'EOF'
[datadog-security-cli]
name=Datadog Security CLI
baseurl=https://yum.datadoghq.com/stable/datadog-security-cli/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
repo_gpgcheck=1
EOF

# Install the CLI
sudo yum install datadog-security-cli
```

{{% /tab %}}
{{% tab "macOS" %}}

#### Installer avec Homebrew {#install-with-homebrew}

```bash
# Install via Homebrew
brew install --cask datadog-security-cli
```

{{% /tab %}}
{{< /tabs >}}

#### Exécuter votre première analyse {#run-your-first-scan}

Après avoir installé le Datadog Security CLI, configurez vos identifiants Datadog et analysez une image de conteneur :

```bash
# Configure Datadog credentials
export DD_API_KEY=<your_api_key>
export DD_APP_KEY=<your_app_key>
export DD_SITE={{< region-param key="dd_site" >}}

# Scan your container image
datadog-security-cli image myimage:tag
```

Le Datadog Security CLI affiche les résultats d'analyse directement dans votre terminal, en indiquant :
- Image information (nom, digest, système d'exploitation)
- Nombre total de vulnérabilités trouvées
- Severity breakdown (Critique, Haute, Moyenne, Faible)
- Tableau détaillé des vulnérabilités avec les identifiants CVE, les paquets affectés et les correctifs disponibles

{{< img src="security/vulnerabilities/csm-vm-cli-output.png" alt="Sortie du Datadog Security CLI montrant les résultats de l'analyse de vulnérabilité pour une image de conteneur" style="width:100%;" >}}

### Afficher les résultats d'analyse {#view-scan-results}

Après avoir exécuté votre première analyse, les résultats apparaissent sur la page [Cloud Security Vulnerabilities][3] en quelques minutes. Vous pouvez effectuer les opérations suivantes :

- **Filtrer par type de ressource** : Voir les vulnérabilités spécifiques aux images de conteneur analysées dans l'intégration continue/le déploiement continu
- **Prioriser par gravité** : Concentrez-vous d'abord sur les vulnérabilités critiques et de haute gravité
- **Suivre la remédiation** : Attribuez les vulnérabilités aux membres de l'équipe et suivez la résolution
- **Configurer les notifications** : Soyez alerté lorsque de nouvelles vulnérabilités critiques sont détectées

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La page Cloud Security Vulnerabilities Findings" width="100%">}}

### Exécuter des analyses locales pendant le développement {#run-local-scans-during-development}

Pour une itération plus rapide avant de valider en CI, installez le Datadog Security CLI localement en utilisant les mêmes méthodes d'installation décrites dans la [section d'installation](#install-the-datadog-security-cli) ci-dessus.

#### Effectuer une analyse locale sans résultats permanents {#scan-locally-without-persisting-results}

Lors de tests locaux, analysez les images sans télécharger les résultats vers Datadog en utilisant l'indicateur `--no-persist` :

```bash
# Scan locally without sending results to Datadog
datadog-security-cli image myapp:latest --no-persist
```

Ceci est utile pour :
- Tester la fonctionnalité de l'interface de ligne de commande sans affecter vos données Datadog
- Valider les images de conteneur pendant le développement local
- Itérer rapidement sur les builds d'image avant de valider dans l'intégration continue

## Scan options {#scan-options}

La CLI Datadog Security prend en charge diverses options pour personnaliser vos analyses d'images de conteneur :

### Configurer des seuils de gravité{#configure-severity-thresholds}

```bash
# Fail the build if critical vulnerabilities are found
datadog-security-cli image myapp:latest --fail-on critical

# Fail on high or critical vulnerabilities
datadog-security-cli image myapp:latest --fail-on high
```

### Formats de sortie {#output-formats}

```bash
# Output results in JSON format
datadog-security-cli image myapp:latest --output json
```

## Lier un Dockerfile à des vulnérabilités {#link-dockerfile-to-vulnerabilities}

<div class="alert alert-info">
La liaison d'un Dockerfile aux vulnérabilités n'est prise en charge que lors d'une analyse avec le Datadog Security CLI dans un pipeline CI/CD. Cette fonctionnalité n'est pas disponible pour les images analysées par Datadog Agent ou via une analyse sans agent.
</div>

Pour permettre à Datadog de lier les vulnérabilités détectées au code source (Dockerfile), vous devez inclure des **annotations d'image OCI** spécifiques lors de la construction de votre image de conteneur.

Cela permet à Datadog de :
- Afficher un **aperçu du Dockerfile** directement dans le panneau des vulnérabilités des images de conteneur
- Activer la **remédiation basée sur la source**, vous aidant à identifier et à corriger les problèmes dans leur contexte

Ces annotations fournissent les métadonnées nécessaires pour associer une image analysée à son dépôt, son commit et son chemin de Dockerfile correspondants.

### Annotations requises {#required-annotations}

Ajoutez les annotations suivantes à votre image au moment de la construction :

- `org.opencontainers.image.source`
  L'URL du dépôt (par exemple, `https://github.com/org/repo`)

- `org.opencontainers.image.revision`
  Le SHA du commit utilisé pour construire l'image

- `com.datadoghq.image.source_path`
  Le chemin vers le Dockerfile dans le dépôt (par exemple, `Dockerfile` ou `docker/Dockerfile`)

### Annotations facultatives {#optional-annotations}

Ces annotations aident Datadog à améliorer les suggestions de remédiation pour les images de base :

- `org.opencontainers.image.base.name`
  Le nom de l'image de base (par exemple, `ubuntu:22.04`)

- `org.opencontainers.image.base.digest`
  Le digest de l'image de base

Pour plus de détails, consultez la [documentation sur les annotations de la spécification d'image OCI][14].

### Exemple {#example}

#### Using docker build {#using-docker-build}

Les annotations sont la méthode privilégiée. Les étiquettes sont également prises en charge en tant que solution de secours.

```bash
docker build \
  --annotation org.opencontainers.image.source="https://github.com/org/repo" \
  --annotation org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --annotation com.datadoghq.image.source_path="Dockerfile" \
  -t myapp:latest .
```

#### Using the Datadog Security CLI {#using-the-datadog-security-cli}

Comme alternative à l'ajout manuel d'annotations, le Datadog Security CLI peut injecter les métadonnées requises directement lors de l'analyse, en utilisant le flag `--dockerfile` :

```bash
datadog-security-cli image myapp:latest --dockerfile ./Dockerfile
```

## Dépannage {#troubleshooting}

### Erreurs d'authentification {#authentication-errors}

Si vous rencontrez des erreurs d'authentification :
1. Vérifiez que vos `DD_API_KEY` et `DD_APP_KEY` sont correctement définis.
2. Assurez-vous que la clé d'application dispose de la portée `appsec_vm_read`.
3. Vérifiez que votre `DD_SITE` correspond au site de votre organisation Datadog.

### Erreurs d'image introuvable {#image-not-found-errors}

Si le Datadog Security CLI ne parvient pas à trouver votre image :
1. Vérifiez que l'image existe localement : `docker images`.
2. Utilisez le nom complet de l'image, y compris le registre (le cas échéant).
3. Assurez-vous que l'image est construite avant l'analyse.

### Problèmes de connectivité réseau {#network-connectivity-issues}

Si les analyses échouent en raison de problèmes réseau :
1. Vérifiez que votre environnement CI peut atteindre le site Datadog.
2. Vérifiez les restrictions de proxy ou de pare-feu.
3. Assurez-vous que les connexions HTTPS sortantes sont autorisées.

Pour obtenir de l'aide supplémentaire, consultez le [Cloud Security troubleshooting guide][12] ou contactez le [support Datadog][13].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/vulnerabilities
[2]: /fr/security/code_security/software_composition_analysis/
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /fr/account_management/api-app-keys/#api-keys
[5]: /fr/account_management/api-app-keys/#application-keys
[6]: /fr/getting_started/site/
[7]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /fr/integrations/guide/source-code-integration
[9]: /fr/security/code_security/dev_tool_int/github_pull_requests
[10]: /fr/integrations/gitlab-source-code/#setup
[11]: /fr/integrations/azure-devops-source-code/#setup
[12]: /fr/security/cloud_security_management/troubleshooting/vulnerabilities/
[13]: /fr/help/
[14]: https://specs.opencontainers.org/image-spec/annotations/