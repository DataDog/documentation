---
further_reading:
- link: /security/cloud_security_management/guide/frontier_group/
  tag: Documentation
  text: Groupe Sécurité Cloud Frontier
- link: /integrations/guide/reference-tables/
  tag: Documentation
  text: Tables de référence
title: Configurez les préférences de propriété
---
## Aperçu {#overview}

L'agent de propriété sélectionne un sous-ensemble de ressources cloud avec des résultats de sécurité et infère un propriétaire pour chacune d'elles. Par défaut, il utilise les balises de ressources cloud, les données du catalogue de services et d'autres sources de données pour inférer la propriété.

**Les préférences de propriété** vous permettent de personnaliser ce processus en fournissant vos propres règles. Vous les stockez dans une [table de référence Datadog][1], et l'agent de propriété les lit automatiquement pour améliorer ses résultats.

## Créez un fichier de préférence de propriété {#create-an-ownership-preference-file}

1. Créez un fichier CSV suivant le format décrit ci-dessous. En option, utilisez la [compétence AI de l'agent de propriété][5] avec votre assistant de codage AI pour générer le CSV de manière interactive.
2. [Téléchargez](#upload-your-ownership-preferences)-le en tant que table de référence nommée `k9_ownership_preferences`. Les préférences prennent effet dans les 24 heures.

### Types de préférences {#preference-types}

Chaque ligne de votre table de référence est une préférence. La colonne `preference_type` détermine ce que fait la ligne.

| Type          | Ce qu'il fait                                                   |
|---------------|----------------------------------------------------------------|
| `tag_mapping` | Lorsqu'une ressource a une balise correspondante, attribuez le propriétaire spécifié |
| `exclusion`   | Empêchez un identifiant spécifique d'être jamais attribué comme propriétaire    |
| `prompt_text` | Fournissez des conseils personnalisés au moteur d'inférence AI             |

### Mappages de tags {#tag-mappings}

Un mappage de tag dit : _"Lorsqu'une ressource a le tag `X:Y`, elle appartient à ce propriétaire."_

L'agent de propriété vérifie les balises des ressources cloud par rapport à vos mappages. Lorsqu'il trouve une correspondance, il ajoute le propriétaire spécifié comme candidat. Plusieurs mappages peuvent correspondre à la même ressource, produisant plusieurs candidats que l'agent de propriété classe aux côtés d'autres sources de données.

Les mappages de tags complètent les sources de données de propriété existantes. Ils ne remplacent pas un tag de propriété directe (comme `dd-team`) déjà présent sur la ressource.

#### Colonnes {#columns}

| Colonne                 | Description                                                                |
|------------------------|----------------------------------------------------------------------------|
| `preference_type`      | Doit être `tag_mapping`                                                      |
| `tag_key`              | Clé de tag à faire correspondre (par exemple, `cost-center`, `project`)                   |
| `tag_value` (optionnel) | Valeur de tag à faire correspondre. Laissez vide pour faire correspondre à n'importe quelle valeur pour cette clé (caractère générique) |
| `owner`                | Propriétaire à assigner (par exemple, `team-platform`, `alice@example.com`)        |
| `owner_type`           | Type de propriétaire : `team`, `user` ou `service`                                |
| `confidence`           | À quel point ce mappage indique fortement la propriété : `high`, `medium` ou `low`  |

#### Type de propriétaire {#owner-type}

Le champ `owner_type` indique à l'agent de propriété quel type d'entité est le propriétaire. Cela aide le moteur d'IA à prendre de meilleures décisions lors du classement des candidats.

| Valeur | Quand utiliser |
| --- | --- |
| `team` | Le propriétaire est un gestionnaire d'équipe (par exemple, `team-platform`, `sre-team`) |
| `user` | Le propriétaire est un individu (par exemple, `alice@example.com`) |
| `service` | Le propriétaire est un compte de service ou d'automatisation (par exemple, `payment-svc`) |

#### Comportement de correspondance {#matching-behavior}

- La correspondance des clés et des valeurs des tags est **insensible à la casse**. `Cost-Center` correspond à `cost-center`.
- Un `tag_value` vide correspond à **n'importe quelle valeur** pour cette clé de tag (caractère générique).
- Si plusieurs correspondances sont trouvées, toutes produisent des candidats. L'agent de propriété les classe par confiance.

#### Niveaux de confiance {#confidence-levels}

| Niveau | Quand utiliser |
| --- | --- |
| `high` | Le tag identifie de manière fiable le propriétaire. Exemple : un tag `cost-center` qui correspond 1:1 à une équipe |
| `medium` | Le tag est un bon indicateur mais peut ne pas toujours être correct. Exemple : un tag `project` partagé entre plusieurs équipes |
| `low` | Le tag fournit un indice mais nécessite une corroboration. Exemple : un tag `env` qui présente une corrélation faible avec une équipe |

#### Exemple : Associez les centres de coûts aux équipes {#example-map-cost-centers-to-teams}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

#### Exemple : Associez les projets aux propriétaires {#example-map-projects-to-owners}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
2,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
3,tag_mapping,project,payments,team-fintech,team,high,,,,,
```

#### Exemple : Correspondance joker pour toute ressource avec un tag `managed-by` {#example-wildcard-match-any-resource-with-a-managed-by-tag}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,managed-by,,team-infra,team,low,,,,,
```

Cela correspond à toute valeur du tag `managed-by` et l'assigne à `team-infra` avec une faible confiance. Parce que la confiance est faible, des sources de données plus solides prennent la priorité.

### Exclusions {#exclusions}

Une exclusion indique à l'agent de propriété : "N'attribuez jamais ce gestionnaire comme propriétaire de ressource."

Les comptes de bot, les exécuteurs CI et les comptes de service partagés apparaissent souvent dans les métadonnées des ressources cloud (par exemple, en tant que créateur ou dernier modificateur). Les exclusions les retirent des résultats de propriété afin qu'ils ne montrent que de véritables propriétaires.

#### Colonnes {#columns-1}

| Colonne                               | Description                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `preference_type`                    | Doit être `exclusion`                                                                                                          |
| `handle`                             | Gestionnaire de propriétaire à exclure (par exemple, `deploy-bot`, `ci-runner`)                                                             |
| `exclusion_type` (optionnel)          | Limiter l'exclusion à un type de propriétaire spécifique : `team`, `user` ou `service`. Laissez vide pour exclure pour tous les types d'exclusion       |
| `exclusion_resource_type` (optionnel) | Limiter l'exclusion à un type de ressource spécifique (par exemple, `aws_ec2_instance`). Laissez vide pour exclure pour tous les types de ressources |

#### Comportement de correspondance {#matching-behavior-1}

- Le `handle` est comparé **sans tenir compte de la casse**.
- Les filtres optionnels utilisent la logique **ET**. Tous les champs non vides doivent correspondre pour que l'exclusion s'applique.
- Laissez `exclusion_type` et `exclusion_resource_type` vides pour exclure le gestionnaire de tous les résultats (le plus courant).

#### Exemple : Exclure les comptes de bot communs de tous les résultats {#example-exclude-common-bot-accounts-from-all-results}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,deploy-bot,,,,
2,exclusion,,,,,,ci-runner,,,,
3,exclusion,,,,,,github-actions,,,,
4,exclusion,,,,,,terraform-automation,,,,
```

#### Exemple : Exclure un compte de service uniquement pour des types de ressources spécifiques {#example-exclude-a-service-account-only-for-specific-resource-types}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
2,exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

Ces exclusions ne s'appliquent qu'aux instances EC2. Les mêmes gestionnaires restent éligibles en tant que propriétaires pour d'autres types de ressources.

#### Exemple : Exclure un gestionnaire d'équipe pour un type de ressource spécifique {#example-exclude-a-team-handle-for-a-specific-resource-type}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

Cela exclut `legacy-ops` uniquement lorsqu'il apparaît comme candidat d'équipe pour les instances EC2. Il est toujours pris en compte pour les compartiments S3 ou d'autres types de ressources.

### Texte d'invite personnalisé {#custom-prompt-text}

Le texte d'invite personnalisé fournit des conseils en libre format au moteur d'inférence de l'IA. Utilisez-le pour partager le contexte organisationnel qui aide l'IA à prendre de meilleures décisions de propriété, telles que les conventions de nommage, les structures d'équipe ou les sources de données à prioriser.

Vous pouvez fournir jusqu'à **trois** entrées de texte d'invite, une pour chaque niveau de priorité (`high`, `medium`, `low`). Les entrées avec la même priorité sont concaténées. Utilisez la priorité pour contrôler quel conseil le moteur d'IA considère en premier.

#### Colonnes {#columns-2}

| Colonne                | Description                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `preference_type`     | Doit être `prompt_text`                                                                             |
| `prompt_text`         | Votre texte de conseil (jusqu'à 4 096 octets par entrée)                                                  |
| `priority` (facultatif) | Contrôle l'ordre : `high` les entrées sont considérées en premier, puis `medium`, puis `low`. Par défaut : `low` |

#### Conseils pour rédiger des conseils efficaces {#tips-for-writing-effective-guidance}

- Soyez spécifique et actionnable. « Le tag `cost-center` est notre signal de propriété le plus fiable » est préférable à « Utilisez des tags ».
- Expliquez les conventions de votre organisation : modèles de nommage d'équipe, comment interpréter des tags spécifiques, etc.
- Identifiez les comptes qui ne devraient pas être propriétaires (ajoutez également ceux-ci en tant que lignes d'exclusion pour l'application).
- Utilisez une entrée par niveau de priorité pour organiser vos conseils par importance.

#### Exemple : contexte spécifique à l'organisation divisé par priorité {#example-organization-specific-context-split-by-priority}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
2,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
3,prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

### Format de tableau de référence {#reference-table-format}

#### Schéma de colonne {#column-schema}

Votre tableau de référence doit être nommé `k9_ownership_preferences` et contenir ces 12 colonnes :

| Colonne                    | Type   | Description                                                                         |
|---------------------------|--------|-------------------------------------------------------------------------------------|
| `id`                      | Chaîne | **Requis pour toutes les lignes.** Identifiant unique pour la ligne. Utilisé comme clé primaire   |
| `preference_type`         | Chaîne | **Requis pour toutes les lignes.** Type de ligne : `tag_mapping`, `exclusion` ou `prompt_text`   |
| `tag_key`                 | Chaîne | Clé de tag à faire correspondre (mappages de tags uniquement)                                                |
| `tag_value`               | Chaîne | Valeur de tag à faire correspondre ; laissez vide comme un caractère générique (mappages de tags uniquement)                   |
| `owner`                   | Chaîne | Gestionnaire de propriétaire à attribuer (mappages de tags uniquement)                                          |
| `owner_type`              | | Type de propriétaire : `team`, `user` ou `service` (mappages de tags uniquement)                        |
| `confidence`              | | Niveau de confiance : `high`, `medium` ou `low` (mappages de tags uniquement)                    |
| `handle`                  | Chaîne | Identifiant de propriétaire à exclure (exclusions uniquement)                                           |
| `exclusion_type`          | Chaîne | Filtre de type de propriétaire pour exclusion ; laissez vide pour exclure tous les types (exclusions uniquement) |
| `exclusion_resource_type` | | Filtre de type de ressource pour exclusion ; laissez vide pour exclure tout (exclusions uniquement) |
| `prompt_text`             | Chaîne | Texte d'orientation (texte d'invite uniquement) |
| `priority`                | | Priorité de commande : `high`, `medium` ou `low` (texte d'invite uniquement) |

Chaque ligne utilise un sous-ensemble de colonnes en fonction de `preference_type`. Laissez les colonnes inutilisées vides.

#### Utilisation des colonnes par type de préférence : {#column-usage-by-preference-type}

| Colonne | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
| `id` | obligatoire | obligatoire | obligatoire |
| `preference_type` | `"tag_mapping"` | `"exclusion"` | `"prompt_text"` |
| `tag_key` | obligatoire | — | — |
| `tag_value` | optionnel (vide signifie joker) | — | — |
| `owner` | obligatoire | — | — |
| `owner_type` | obligatoire | — | — |
| `confidence` | obligatoire | — | — |
| `handle` | — | obligatoire | — |
| `exclusion_type` | — | optionnel | — |
| `exclusion_resource_type` | — | optionnel | — |
| `prompt_text` | — | — | obligatoire |
| `priority` | — | — | optionnel |

### Exemple complet {#complete-example}

Un CSV prêt à l'emploi avec les trois types de préférences :

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
4,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
5,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
6,tag_mapping,env,production,sre-team,team,low,,,,,
7,tag_mapping,managed-by,,team-infra,team,low,,,,,
8,exclusion,,,,,,deploy-bot,,,,
9,exclusion,,,,,,ci-runner,service,,,
10,exclusion,,,,,,github-actions,service,,,
11,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
12,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
13,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
14,prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## Règles de validation {#validation-rules}

Toutes les données de préférence sont validées lorsque l'Agent de Propriété lit votre tableau de référence. **La validation est tout ou rien** : si une ligne échoue à la validation, l'Agent de Propriété rejette l'ensemble de préférences **entier** pour ce cycle de synchronisation. Lorsque cela se produit, les préférences restent vides jusqu'à ce qu'un ensemble valide soit téléchargé.

Cette approche stricte aide à garantir que vous travaillez avec un ensemble de préférences cohérent et entièrement valide.

### Caractères autorisés {#allowed-characters}

Différents champs acceptent différents ensembles de caractères :

| Type de champ | Caractères autorisés | S'applique à |
| --- | --- | --- |
| Champs structurés | Lettres, chiffres, `-` `_` `.` `:` `/` `@` | `tag_key`, `owner`, `handle`, `exclusion_type`, `exclusion_resource_type`, `owner_type`, `confidence`, `priority` |
| Valeurs de balise | Identiques aux champs structurés, plus des espaces | `tag_value` |
| Texte d'invite | Lettres, chiffres, `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` espaces, tabulations, nouvelles lignes | `prompt_text` |

#### Restrictions notables {#notable-restrictions}

- **Les chevrons** (`<`, `>`) ne sont **pas autorisés** dans aucun champ, y compris le texte d'invite.
- **Les accolades** (`{`, `}`) ne sont **pas autorisées** dans aucun champ.
- **Les caractères pipe** (`|`) ne sont **pas autorisés** dans aucun champ.

Ces restrictions empêchent les artefacts de formatage et aident à garantir un traitement propre par le moteur d'IA.

### Limites de taille {#size-limits}

| Limite                               | Valeur                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------|
| Mappages de balises maximum                | 50 lignes                                                                            |
| Exclusions maximales                  | 20 lignes                                                                            |
| Entrées de texte maximales pour l'invite         | Trois lignes (une par niveau de priorité)                                                |
| Octets maximaux par champ             | 1 024 octets (s'applique aux clés de balise, valeurs de balise, propriétaires, identifiants et champs similaires) |
| Octets maximaux par entrée de texte d'invite | 4 096 octets                                                                        |

### Détection des doublons {#duplicate-detection}

L'Agent de propriété rejette l'ensemble des préférences s'il contient des entrées conflictuelles ou des doublons :

- **Mappages de balises** : Deux lignes avec le même `tag_key` et `tag_value` mais des valeurs `owner` différentes constituent un conflit. Deux lignes avec le même `tag_key`, `tag_value` et `owner` mais des niveaux `confidence` différents constituent également un conflit. Les doublons exacts (tous les champs identiques) sont autorisés.
- **Exclusions** : Deux lignes avec le même `handle`, `exclusion_type` et `exclusion_resource_type` sont un doublon. Les comparaisons ne tiennent pas compte de la casse.

Si l'Agent de propriété détecte un conflit ou un doublon, il rejette l'ensemble des préférences.

### Directives de contenu pour le texte d'invite {#content-guidelines-for-prompt-text}

Le moteur d'IA traite le texte d'invite comme un contexte organisationnel. Pour aider à garantir que vos conseils sont efficaces :

- **Utilisez des phrases simples et déclaratives** : Décrivez des faits sur votre organisation.
- **Évitez le formatage spécial** : Les titres Markdown, les balises HTML et les balises de type XML sont supprimés lors du traitement.
- **Concentrez-vous sur les sources de données de propriété** : Décrivez quelles balises, conventions de nommage ou structures d'équipe indiquent la propriété.

#### Exemples {#examples}

- "La balise de centre de coût est notre signal de propriété le plus fiable pour toutes les ressources cloud."
- Les identifiants d'équipe utilisent toujours le préfixe team- (par exemple, team-platform, team-data-eng).
- "Les ressources dans le compte us-east-1/prod sont gérées par l'équipe-sre."

## Téléchargez vos préférences de propriété {#upload-your-ownership-preferences}

Datadog stocke vos préférences sous forme de [table de référence][1]. La table doit être nommée `k9_ownership_preferences` et contenir tous les 12 en-têtes de colonne, même si certaines lignes les laissent vides.

Il existe plusieurs façons de créer et de mettre à jour la table :

### Option 1 : Téléchargement manuel de CSV (interface Datadog) {#option-1-manual-csv-upload-datadog-ui}

Cette approche est la meilleure pour commencer ou pour effectuer des mises à jour occasionnelles.

1. Préparez votre fichier CSV (voir [Exemple complet](#complete-example)).
2. Dans Datadog, allez à **Intégrations** > [**Tables de référence**][6].
3. Cliquez sur **Nouvelle table de référence**.
4. Téléchargez votre fichier CSV.
5. Définissez le nom de la table sur `k9_ownership_preferences`.
6. Choisissez `id` comme clé primaire.
7. Cliquez sur **Enregistrer**.

Pour mettre à jour votre table de référence, téléchargez un nouveau CSV dans la même table pour remplacer complètement son contenu.

Les téléchargements manuels prennent en charge des fichiers allant jusqu'à 4 Mo.

### Option 2 : Synchronisation de stockage cloud (S3, Azure Blob, GCS) {#option-2-cloud-storage-sync-s3-azure-blob-gcs}

Cette approche est la meilleure pour des mises à jour automatisées et récurrentes. Stockez votre CSV dans un bucket de stockage cloud afin que Datadog puisse l'importer périodiquement.

1. Téléchargez votre fichier CSV dans un **bucket Amazon S3**, **un conteneur Azure Blob Storage** ou **un bucket Google Cloud Storage**.
2. Dans Datadog, allez à **Intégrations** > [**Tables de référence**][6].
3. Cliquez sur **Nouvelle table de référence** et sélectionnez **Stockage Cloud** comme source.
4. Fournissez le chemin de stockage et les identifiants (rôle IAM pour S3, chaîne de connexion pour Azure, compte de service pour GCS).
5. Définissez le nom de la table sur `k9_ownership_preferences`.
6. Choisissez `id` comme clé primaire.
7. Cliquez sur **Enregistrer**.

Datadog réimporte périodiquement le fichier, il prend donc automatiquement en compte les mises à jour du CSV dans votre bucket.

Les téléchargements de stockage cloud prennent en charge des fichiers allant jusqu'à 200 Mo.

Consultez la [documentation des tables de référence][1] pour des instructions de configuration détaillées par fournisseur de cloud.

### Option 3 : Terraform {#option-3-terraform}

Cette approche est la meilleure pour gérer les préférences en tant qu'infrastructure en tant que code aux côtés de vos autres ressources Datadog.

Le [fournisseur Terraform Datadog][2] prend en charge les tables de référence. Utilisez-le pour créer et mettre à jour la table de manière déclarative.

Pour plus d'informations, consultez [datadog_reference_table (Ressource)][7] dans la documentation du fournisseur Terraform Datadog.

### API {#api}

Vous pouvez également gérer les tables de référence de manière programmatique via l'[API des tables de référence][3]. Consultez la documentation de l'API pour les points de terminaison disponibles.

Remplacez `api.datadoghq.com` par votre [URL de site Datadog][4] si applicable (par exemple, `api.datadoghq.eu`, `api.us3.datadoghq.com`).

## Lorsque les préférences prennent effet {#when-preferences-take-effect}

1. Vous téléchargez ou mettez à jour votre table de référence.
2. The Ownership Agent lit la table périodiquement (environ une fois par jour par organisation).
3. The Ownership Agent valide les préférences dans votre table. Si la validation réussit, les nouvelles préférences remplacent l'ensemble précédent.
4. Lors de la prochaine exécution d'inférence de propriété pour chaque ressource :
   - **Les mappages de balises** ajoutent des ownership candidates en fonction de vos règles de balisage.
   - **Les exclusions** suppriment les handles indésirables des résultats.
   - **Le texte d'invite personnalisé** guide le moteur d'inférence de l'IA.
5. Les résultats mis à jour apparaissent dans l'UI Cloud Security posture management.

Les modifications apportées à votre table de référence prennent effet dans un délai de **24 heures**.

<div class="alert alert-info">Si vous supprimez toutes les lignes de la table (la laissant vide), The Ownership Agent efface activement vos préférences précédentes. La suppression complète de la table a le même effet : les préférences mises en cache expirent et restent vides.</div>

## Dépannage {#troubleshooting}

La validation est tout ou rien. Si une ligne présente un problème, The Ownership Agent rejette l'ensemble des préférences et laisse toutes les préférences vides jusqu'à ce que vous téléchargiez un ensemble valide.

| Problème                                  | Cause probable                      | Solution                                                                                                                                                                                                                     |
|------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Préférences non effectives après 24 heures | Le nom du tableau est incorrect               | Doit être exactement `k9_ownership_preferences`                                                                                                                                                                              |
| Préférences non effectives après 24 heures | En-têtes de colonnes manquants            | Les 12 colonnes doivent exister en tant qu'en-têtes CSV, même si les lignes les laissent vides                                                                                                                                                 |
| Préférences non effectives après 24 heures | Fonction non activée pour votre organisation  | Contactez [le support Datadog][8] pour activer les ownership preferences |
| Toutes les préférences rejetées                 | Caractères invalides dans un champ   | Voir [Caractères autorisés](#allowed-characters). Les chevrons, les accolades et les caractères de barre verticale ne sont pas autorisés|
| Toutes les préférences rejetées. Champ requis manquant dans une ligne. Vérifiez que `tag_key`, `owner`, `owner_type` et `confidence` sont remplis pour les mappages de balises ; `handle` pour les exclusions ; `prompt_text` pour les entrées de texte d'invite.|
| Toutes les préférences rejetées. Lignes en double ou conflictuelles. Deux mappages de balises avec le même `tag_key`+`tag_value` mais des valeurs `owner` ou `confidence` différentes entraînent un rejet. Les doublons exacts d'exclusions entraînent également un rejet. [Voir Détection des doublons](#duplicate-detection) |
| Toutes les préférences rejetées. Valeur `confidence` invalide. Doit être exactement `high`, `medium` ou `low`                                                                                                                                                                              |.
| Toutes les préférences rejetées. Valeur `owner_type` invalide. Doit être `team`, `user` ou `service` (insensible à la casse).|
| Toutes les préférences rejetées. Limite de taille dépassée. Vérifiez le nombre de lignes (50 mappages de balises, 20 exclusions, trois entrées de texte d'invite) et les longueurs de champ (1 024 octets par champ, 4 096 par entrée d'invite).|
| Toutes les préférences rejetées. Formatage du texte d'invite. Les titres Markdown et les balises HTML/XML sont supprimés lors du traitement. Utilisez uniquement du texte brut|
| Mappage de balise ne correspondant pas à une ressource. Erreur d'orthographe. La correspondance est insensible à la casse, mais vérifiez la clé et la valeur de balise exactes sur votre ressource.|
| Exclusion non appliquée. Filtres de portée trop étroits. Tous les champs non vides doivent correspondre (logique ET). Laissez `exclusion_type` et `exclusion_resource_type` vides pour des exclusions larges.|
| Préférences effacées de manière inattendue. La table a été vidée ou supprimée. Une table vide et une table supprimée entraînent l'expiration des préférences mises en cache. Téléchargez un CSV valide pour restaurer les préférences.|

## Lectures complémentaires{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /fr/api/latest/reference-tables/
[4]: /fr/getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
[6]: https://app.datadoghq.com/reference-tables
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table
[8]: /fr/help