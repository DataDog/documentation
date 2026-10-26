---
aliases:
- /fr/security/cloud_siem/threat_intelligence
disable_toc: false
further_reading:
- link: security/cloud_siem/detection_rules
  tag: Documentation
  text: Créer des règles de détection personnalisées
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentation
  text: IOC Explorer
- link: /security/cloud_siem/guide/ingest-stix-threat-intelligence/
  tag: Documentation
  text: Ingérez des renseignements sur les menaces STIX
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: Blog
  text: Intégrer les renseignements sur les menaces Recorded Future avec Datadog Cloud
    SIEM
site_support_id: byoti
title: Apportez votre propre renseignement sur les menaces
---
## Présentation {#overview}

Datadog fournit des [renseignements sur les menaces][1] intégrés pour les logs Cloud SIEM. Cet article explique comment étendre cette fonctionnalité en enrichissant les logs avec vos propres flux de renseignements sur les menaces personnalisés.

Cloud SIEM prend en charge l'enrichissement et la recherche de logs à l'aide d'indicateurs de compromission (IOC) de renseignements sur les menaces stockés dans les tableaux de référence Datadog. Les [tableaux de référence][7] vous permettent de combiner des métadonnées avec des informations déjà présentes dans Datadog.

<div class="alert alert-info">Vous pouvez également envoyer des indicateurs par programmation sous forme de bundles STIX 2.1 au lieu de télécharger des fichiers CSV. Voir <a href="/security/cloud_siem/guide/ingest-stix-threat-intelligence/">Ingestion de renseignements sur les menaces STIX</a>.</div>

### Comment fonctionne l'intégration de vos propres renseignements sur les menaces {#how-bring-your-own-threat-intelligence-works}

Lorsqu'un log est traité par Cloud SIEM, les attributs IP, domaine, hash, ID de compte AWS, conteneur, SSH et agent utilisateur du log sont évalués par rapport aux tableaux de référence que vous avez activées pour Cloud SIEM. Le processus est le suivant :

1. Pour chaque log, Datadog extrait les attributs pertinents :
    - **IPs** : adresses IPv4 et IPv6 trouvées n'importe où dans le log.
    - **Domaines et noms d'hôtes** : les valeurs dans les attributs suivants (lorsqu'ils sont présents) :
      - `DNS_QUESTION_NAME`
      - `DNS_ANSWER_NAME`
      - `HTTP_URL`
      - `HTTP_URL_DETAILS_DOMAIN`
      - `HOSTNAME`
    - **Hachages de fichier** : hachages SHA1, SHA256 et ssdeep trouvés dans les attributs de log liés aux fichiers et aux processus.
    - **ID de compte AWS** : valeurs provenant des attributs de log liés à AWS (par exemple, `userIdentity.accountId`).
    - **Noms d'image de conteneur** : valeurs provenant des journaux d'exécution de conteneur.
    - **Noms de compte de registre de conteneur** : valeurs provenant des journaux de registre de conteneur.
    - **Clés publiques SSH** : valeurs provenant des journaux d'authentification SSH.
    - **Agents utilisateur** : valeurs provenant des attributs d'en-tête de requête HTTP.
2. Évaluer les valeurs extraites par rapport aux tableaux de référence.
    - Les valeurs extraites sont comparées à la clé primaire dans les tableaux de référence correspondants. Chaque type d'indicateur possède son propre tableau de référence avec une clé primaire spécifique (par exemple, `ip_address` pour les IPs, `sha256` pour les hachages SHA256).
3. Enrichir en cas de correspondance.
    - Si une correspondance est trouvée, Datadog enrichit le log avec les métadonnées de renseignement sur les menaces provenant du tableau (par exemple, `category`, `source`, `first_seen`, `last_seen`, `confidence`). Les champs enrichis sont ensuite disponibles pour la recherche, l'analyse et les règles de détection.

**Remarques** :
- Cloud SIEM évalue les journaux en temps réel et utilise à la fois les [renseignements sur les menaces sélectionnés par Datadog][10] et vos propres tableaux de référence.
- Les tableaux de référence sont le mécanisme permettant de stocker et de joindre vos IoC personnalisés avec les journaux et les détections.

### Stocker les indicateurs de compromission dans des tableaux de référence {#store-indicators-of-compromise-in-reference-tables}

Le renseignement sur les menaces est pris en charge au format CSV. Il nécessite un tableau pour chaque type d'indicateur (par exemple, adresse IP, domaine, hachage SHA256, ID de compte AWS, nom d'image de conteneur) et requiert les colonnes suivantes :

#### Structure CSV pour les adresses IP {#csv-structure-for-ip-addresses}

| Champ           | Données | Description                                                                              | Requis | Exemple                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| ip_address      | text | Clé primaire du tableau de référence au format notation décimale pointée IPv4.                 | true     | 192.0.2.1                                                                 |
| additional_data | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | text | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | Malware                                                                   |
| intention       | text | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | malicious                                                                 |
| source          | text | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici un exemple de CSV :

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### Structure CSV pour les domaines {#csv-structure-for-domains}

| Champ           | Données | Description                                                                              | Requis | Exemple                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| domain          | text | Clé primaire du tableau de référence.                                                 | true     | mal-domain.com                                                            |
| additional_data | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | text | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | Hameçonnage                                                                  |
| intention       | text | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | malicious                                                                 |
| source          | text | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

#### Structure CSV pour les hachages de fichiers {#csv-structure-for-file-hashes}

Les indicateurs de hachage de fichier nécessitent un tableau de référence distincte pour chaque type de hachage : SHA1, SHA256 ou ssdeep. Le nom de la colonne de clé primaire varie en fonction du type de hachage.

| Champ                    | Données | Description                                                                              | Requis | Exemple                                                                   |
|--------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `sha1`/`sha256`/`ssdeep` | text | Clé primaire du tableau de référence.                                                 | true     | `5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8`        |
| `additional_data`        | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`               | text | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | `malware`                                                                 |
| `intention`              | text | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | `malicious`                                                               |
| `source`                 | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici des exemples de fichiers CSV pour chaque type de hash :
{{< tabs >}}
{{% tab "SHA256" %}}

```
sha256,additional_data,category,intention,source
5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "SHA1" %}}

```
sha1,additional_data,category,intention,source
a1b2c3d4e5f6789012345678901234567890abcd,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
5e884898da28047151d0e56f8dc6292773603d0d,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "ssdeep" %}}

```
ssdeep,additional_data,category,intention,source
3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
96:C7Q4LPmPWJwF7qLQd6C8vjF8ULQd6vhLQd6C8vjF:C7Q4LSjKdD8eKdhD8e,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192:4gHHP2ZJwF0gHHrFqxXgHH8RZJwF:4gHtZy0gHMsxQH,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{< /tabs >}}
</div>

#### Structure CSV pour les identifiants de compte AWS {#csv-structure-for-aws-account-ids}

Les flux d'identifiants de compte AWS sont utiles pour suivre les comptes AWS compromis ou suspects.

| Champ             | Données | Description                                                                              | Requis | Exemple                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `aws_account_id`  | texte | Clé primaire du tableau de référence au format identifiant de compte AWS (nombre à 12 chiffres).      | true     | `123456789012`                                                            |
| `additional_data` | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | texte | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | `scanner`                                                                 |
| `intention`       | texte | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | `suspicious`                                                              |
| `source`          | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici un exemple de CSV :

```
aws_account_id,additional_data,category,intention,source
123456789012,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
987654321098,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
555666777888,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### Structure CSV pour les noms d'images de conteneur {#csv-structure-for-container-image-names}

Les flux d'images de conteneur sont utiles pour suivre les images de conteneur malveillantes connues.

| Champ                  | Données | Description                                                                              | Requis | Exemple                                                                   |
|------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_image_name` | texte | Clé primaire du tableau de référence. Peut inclure le registre, le dépôt et le tag.      | true     | `malicious-registry.com/suspicious/image:latest`                          |
| `additional_data`      | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`             | texte | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | `malware`                                                                 |
| `intention`            | texte | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | `malicious`                                                               |
| `source`               | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici un exemple de CSV :

```
container_image_name,additional_data,category,intention,source
malicious-registry.com/suspicious/image:latest,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
bad-repo.io/malware/cryptominer:v2,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
suspicious-hub.com/backdoor/payload:1.0,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### Structure CSV pour les noms de compte de registre de conteneurs {#csv-structure-for-container-registry-account-names}

Les flux de noms de compte de registre de conteneurs sont utiles pour identifier les comptes de registre de conteneurs compromis ou malveillants.

| Champ                             | Données | Description                                                                                        | Requis | Exemple                                                                   |
|-----------------------------------|------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_registry_account_name` | texte | Clé primaire du tableau de référence. Le nom du compte ou de l'organisation dans un registre de conteneurs. | true     | `suspicious-publisher`                                                    |
| `additional_data`                 | json | Données supplémentaires pour enrichir les journaux.                                                                | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`                        | texte | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.               | true     | `malware`                                                                 |
| `intention`                       | texte | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.                 | true     | `malicious`                                                               |
| `source`                          | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe.           | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici un exemple de CSV :

```
container_registry_account_name,additional_data,category,intention,source
suspicious-publisher,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
compromised-org,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
malicious-vendor,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### Structure CSV pour les clés publiques SSH {#csv-structure-for-ssh-public-keys}

Les flux de clés publiques SSH sont utiles pour suivre les clés SSH non autorisées ou compromises.

| Champ             | Données | Description                                                                                                        | Requis | Exemple                                                                   |
|-------------------|------|--------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `ssh_public_key`  | texte | Clé primaire du tableau de référence. Clé publique SSH au format standard (généralement ssh-rsa, ssh-ed25519, etc.). | true     | `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...`                              |
| `additional_data` | json | Données supplémentaires pour enrichir les journaux.                                                                                | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | texte | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.                               | true     | `scanner`                                                                 |
| `intention`       | texte | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.                                 | true     | `suspicious`                                                              |
| `source`          | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe.                           | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Supprimez les sauts de ligne des clés multilignes avant de les ajouter au CSV. Voici un exemple de CSV :

```
ssh_public_key,additional_data,category,intention,source
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3F6tyPEFEzV0LX3X8BsXdMsQ,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDGZfNyAXqPdvZ0qqIWFVxH5z2k,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### Structure CSV pour les agents utilisateurs {#csv-structure-for-user-agents}

Les flux d'agents utilisateurs sont utiles pour identifier les bots et les scanners malveillants.

| Champ             | Données | Description                                                                              | Requis | Exemple                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `user_agent`      | texte | Clé primaire du tableau de référence. Chaîne HTTP User-Agent.                         | true     | `Mozilla/5.0 (compatible; MaliciousBot/1.0)`                              |
| `additional_data` | json | Données supplémentaires pour enrichir les journaux.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | texte | [Catégorie][8] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.     | true     | `scanner`                                                                 |
| `intention`       | texte | [Intent][9] de renseignement sur les menaces. Ceci est utilisé par certaines règles de détection prêtes à l'emploi.       | true     | `suspicious`                                                              |
| `source`          | json | Nom de la source et le lien vers son site, comme votre équipe et le wiki de votre équipe. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">Le JSON dans un CSV nécessite des guillemets doubles. Voici un exemple de CSV :

```
user_agent,additional_data,category,intention,source
Mozilla/5.0 (compatible; MaliciousBot/1.0),"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
BadCrawler/2.0,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
SuspiciousScanner/3.5,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

### Téléchargez et activez votre propre renseignement sur les menaces {#upload-and-enable-your-own-threat-intelligence}

Datadog prend en charge la création de tableaux de référence soit par un téléchargement manuel, soit en récupérant périodiquement les données depuis Amazon S3, le stockage Azure ou le stockage Google Cloud.

**Remarques** :
- Il peut s'écouler de 10 à 30 minutes avant que l'enrichissement des journaux ne commence après la création d'un tableau.
- Si une clé primaire est dupliquée, elle est ignorée et un message d'erreur concernant la clé est affiché.

Sur une nouvelle page [reference table][2] :

1. Nommez le tableau. Le nom du tableau est référencé dans le paramètre de renseignements sur les menaces.
1. Téléchargez un fichier CSV local ou importez un fichier CSV depuis un compartiment de stockage cloud. Le fichier est normalisé et validé.
1. Prévisualisez le schéma du tableau et choisissez la colonne IOC appropriée comme clé primaire (par exemple, `ip_address` pour les indicateurs IP, `sha256` pour les indicateurs de hachage SHA256).
1. Enregistrez le tableau.
1. Dans [Threat Intel][3], localisez le nouveau tableau et activez-la pour l'utiliser.

#### Utilisation du stockage cloud {#using-cloud-storage}

Lorsque le tableau de référence est créée à partir du stockage cloud, elle est actualisée périodiquement. Le tableau entière est remplacée. Les données ne sont pas fusionnées.

Consultez la documentation relatif au tableau de référence pour :

- [Amazon S3][4]
- [Azure storage][5]
- [Google Cloud storage][6]

#### Dépannage des importations cloud {#troubleshooting-cloud-imports}

Si un tableau de référence ne s'actualise pas, ouvrez le menu des paramètres du tableau de référence et sélectionnez {{< ui >}}View Change Events{{< /ui >}}.

{{< ui >}}View Change Events{{< /ui >}} ouvre une page dans {{< ui >}}Event Management{{< /ui >}} affichant les événements d'erreur potentiels pour l'ingestion. Vous pouvez également filtrer dans {{< ui >}}Event Management{{< /ui >}} en utilisant le nom du tableau de référence.

Dans Datadog Event Management, il peut sembler que les données ont été récupérées depuis le cloud, mais quelques minutes supplémentaires peuvent être nécessaires pour que ces changements se propagent aux renseignements sur les menaces. Autres détails utiles sur l'importation cloud à retenir :

- La latence prévue avant que les enrichissements mis à jour ne soient disponibles lorsqu'une source est téléchargée ou mise à jour est de 10 à 30 minutes.
- Comment savoir quand les mises à jour sont appliquées : les modifications sont visibles dans le tableau de référence ou dans les journaux. Sélectionnez le lien {{< ui >}}View Change Events{{< /ui >}} dans les paramètres sur la page de détails du tableau de référence pour voir les événements associés.
- La mise à jour remplace le tableau entier par les nouvelles données.
En cas de clé primaire dupliquée, les lignes avec la clé dupliquée ne sont pas écrites et une erreur est affichée sur la page de détails du tableau de référence.

## Afficher les données de renseignements sur les menaces dans Datadog {#view-threat-intelligence-data-in-datadog}

Pour activer les données de renseignements sur les menaces de Cloud SIEM pour les tableaux de référence :
1. Accédez à [Threat Intelligence][3].
1. Pour le tableau pour laquelle vous souhaitez voir les données de renseignements sur les menaces de Cloud SIEM, cliquez sur le menu déroulant dans la colonne {{< ui >}}Enabled{{< /ui >}} et sélectionnez {{< ui >}}Cloud SIEM{{< /ui >}}.

Après l'application d'un tableau de référence à Cloud SIEM, tous les journaux entrants sont évalués par rapport au tableau à l'aide d'une clé d'indicateur de compromission (IoC) spécifique, telle qu'une adresse IP ou un domaine. Si une correspondance est trouvée, le log est enrichi avec les attributs de renseignements sur les menaces pertinents provenant du tableau, ce qui améliore la détection, l'investigation et la réponse. Un tableau de référence de renseignements sur les menaces peut être partagée entre plusieurs produits de sécurité.

Vous pouvez consulter vos données de renseignements sur les menaces dans l'[IOC Explorer][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/threat_intelligence/#threat-intelligence-sources
[2]: https://app.datadoghq.com/reference-tables/create
[3]: https://app.datadoghq.com/security/configuration/threat-intel
[4]: /fr/reference_tables/?tab=amazons3#create-a-reference-table
[5]: /fr/reference_tables/?tab=azurestorage#create-a-reference-table
[6]: /fr/reference_tables/?tab=googlecloudstorage#create-a-reference-table
[7]: /fr/reference_tables/
[8]: /fr/security/threat_intelligence/#threat-intelligence-categories
[9]: /fr/security/threat_intelligence/#threat-intelligence-intents
[10]: /fr/security/threat_intelligence#threat-intelligence-sources
[11]: /fr/security/cloud_siem/triage_and_investigate/ioc_explorer/