---
description: Référez-vous au contrat Rego, aux entrées analysées, aux bibliothèques
  partagées, aux champs de résultats et aux pratiques de test pour les règles IaC
  personnalisées.
title: Référence des règles IaC personnalisées
---
Cette référence pour les règles personnalisées IaC décrit le contrat de règle, les entrées analysées et les modèles spécifiques à la plateforme.

Pour obtenir des conseils sur la création de règles personnalisées et un exemple de création de règle à partir de zéro, consultez [Règles personnalisées IaC][2].

## Contrat de règle {#rule-contract}

Datadog évalue les règles personnalisées en tant que [Rego][1] v1. Chaque règle personnalisée doit :

- Déclarer `package datadog`.
- Définir au moins une règle d'ensemble partiel nommée `DatadogPolicy`.

   Vous pouvez définir plusieurs `DatadogPolicy` règles dans la même politique. Chaque évaluation réussie produit un résultat distinct.

- Ajoutez un `result` objet à `DatadogPolicy` pour chaque violation.
- Définissez chaque [champ de résultat requis](#result-fields).

Cette règle Terraform satisfait au contrat :

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	resource := input.document[i].resource.aws_s3_bucket[name]
	resource.acl == "public-read"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket",
		"resourceName": tf_lib.resolve_s3_bucket_name(resource, name),
		"searchKey": sprintf("aws_s3_bucket[%s].acl", [name]),
	}
}
```

## Entrée analysée {#parsed-input}

Datadog analyse le fichier exemple et l'expose à Rego sous `input.document`. Chaque élément contient un `id` et des champs spécifiques à la plateforme. Exemple :

```rego
some i, document in input.document
```

Pour chaque plateforme, définissez `documentId` sur le `id` du document analysé qui a produit le résultat. La plateforme détermine comment parcourir le reste du document, et non comment dériver `documentId`.

Rego traite une référence à un champ manquant comme indéfinie. Une expression d'égalité sur un champ indéfini ne produit pas de résultat. Utilisez `object.get`, `not` ou des assistants tels que `data.generic.common.valid_key` lorsqu'une règle doit distinguer les attributs manquants des valeurs explicites.

## Champs de résultat {#result-fields}

| Champ | Requis | Description |
| ----- | -------- | ----------- |
| `documentId` | Oui | La `id` du document analysé qui contient la violation. |
| `resourceType` | Oui | Le type réel de ressource signalé, tel que `aws_s3_bucket`, `Pod` ou `AWS::S3::Bucket`. |
| `resourceName` | Oui | Un nom utile pour la ressource, tel qu'une étiquette de ressource Terraform, un nom de métadonnées Kubernetes ou un ID logique CloudFormation. |
| `searchKey` | Oui | Un localisateur spécifique à la plateforme pour le contenu source à mettre en évidence. |
| `remediation` | Non | Une modification de la source applicable par machine. Définissez-le avec `remediationType`. |
| `remediationType` | Non | L'opération appliquée par la remédiation. Définissez-le avec `remediation`. |

La section `## Remediation` dans la description de la règle est un guide lisible par l'humain. Les champs de résultat optionnels `remediation` et `remediationType` décrivent une modification automatique de la source.

### Formats de remédiation {#remediation-formats}

Utilisez `addition` pour insérer un attribut ou un bloc manquant. Définissez `remediation` sur le texte source à insérer :

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

Utilisez `replacement` pour modifier une valeur existante. Encodez la valeur actuelle acceptée et son remplacement :

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

Utilisez `removal` pour supprimer le contenu identifié par l'emplacement du résultat. Définissez `remediation` sur une brève explication de ce qui est supprimé :

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

Si une règle ne permet pas de fournir une modification automatisée fiable, omettez les deux champs de remédiation et expliquez la correction manuelle dans la description de la règle.

### Emplacements de résultat {#finding-locations}

`searchKey` est un localisateur de source spécifique au scanner, et non un chemin Rego. Son format dépend de la plateforme.

Sur plusieurs plateformes, les règles par défaut enveloppent les valeurs insérées dans des doubles accolades à l'intérieur de la chaîne de format, par exemple <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>. Cela produit des localisateurs tels que `run="{{checkout}}`. The platform input patterns include equivalent `concat` or nested `sprintf` des constructions que vous pouvez coller dans l'éditeur.

Utilisez l'emplacement stable le plus précis disponible :

- Pointez vers l'attribut non sécurisé exact lorsqu'il existe.
- Pour un attribut manquant, pointez vers la ressource ou le bloc de propriétés contenant.
- Incluez les valeurs d'identification avec `={{...}}` lorsqu'un fichier peut contenir des clés répétées.
- Incluez l'identité de la charge de travail, de la tâche, de la phase, du job ou du conteneur lors du signalement d'un objet imbriqué.

Des localisateurs imprécis tels que `"tasks"` ou `"metadata.name"` peuvent mettre en surbrillance la mauvaise ligne lorsqu'un fichier contient plusieurs ressources ou conteneurs. Utilisez le marqueur de l'éditeur pour vérifier l'emplacement par rapport à un échantillon représentatif.

## Bibliothèques partagées {#shared-libraries}

Les règles personnalisées peuvent importer des bibliothèques Datadog communes et spécifiques à la plateforme :

```rego
import data.generic.common as common_lib
import data.generic.terraform as tf_lib
```

Ces paquets de plateforme sont disponibles :

- `data.generic.ansible`
- `data.generic.cicd`
- `data.generic.cloudformation`
- `data.generic.dockerfile`
- `data.generic.k8s`
- `data.generic.terraform`

Les bibliothèques partagées gèrent un comportement difficile à reproduire avec un accès direct aux champs. Les exemples incluent les alias de module Ansible, les formulaires de déclenchement GitHub Actions, les spécifications de pod de charge de travail Kubernetes, les noms de ressources Terraform et les références CloudFormation.

## Modèles d'entrée de plateforme {#platform-input-patterns}

Les exemples de cette section présentent des modèles orientés production issus de règles par défaut. Les politiques de démarrage dans l'éditeur sont volontairement plus petites et peuvent ne traiter que l'exemple fourni. Lorsqu'une règle par défaut évalue une ressource similaire, clonez-la pour préserver ses helpers de plateforme, son emplacement source et ses contraintes de corrélation de ressources.

### Ansible {#ansible}

Les modules Ansible peuvent apparaître sous des noms courts, des noms de collection entièrement qualifiés et d'autres alias. Utilisez la bibliothèque Ansible pour itérer sur les tâches et les variantes de module :

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

Utilisez le nom de module canonique comme `resourceType`, `ans_lib.resource_name` pour le nom de la ressource, et incluez la tâche et la variante de module dans `searchKey`. Les règles par défaut utilisent souvent une chaîne de format unique telle que <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>. La construction équivalente est :

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD {#cicd}

Les règles personnalisées CI/CD évaluent les workflows GitHub Actions. Les déclencheurs de workflow peuvent être des chaînes, des tableaux ou des objets ; utilisez donc la bibliothèque CI/CD plutôt que de supposer une forme YAML unique :

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

Les règles par défaut utilisent des types de ressources tels que `github_action`, `github_workflow`, `github_job` et `github_step`. Pour les valeurs d'étape, un localisateur littéral tel que <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> identifie la ligne source exacte.

### AWS CloudFormation {#aws-cloudformation}

Les ressources CloudFormation sont indexées par ID logique sous `Resources` :

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

Utilisez `resource.Type` comme type de ressource et `cf_lib.resource_name(resource, logical_id)` pour le nom. Une propriété manquante peut être ancrée à son bloc conteneur :

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile {#dockerfile}

Les instructions Dockerfile sont regroupées sous `document.command` par phase de construction :

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

Incluez la phase de construction et l'instruction originale dans le localisateur. Les règles par défaut utilisent souvent <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>:

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes {#kubernetes}

Les vérifications Kubernetes s'appliquent souvent aux Pods et aux spécifications de pod imbriquées dans des charges de travail telles que les Deployments. Utilisez `spec_info` pour localiser la spécification de pod effective :

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

Incluez le nom de la charge de travail, le chemin de la spécification du pod, le nom du conteneur et le champ non sécurisé dans `searchKey`. Les règles par défaut utilisent souvent <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>:

```rego
"searchKey": sprintf(
	"metadata.name=%s.%s.containers.name=%s.securityContext.privileged",
	[
		concat("", ["{{", document.metadata.name, "}}"]),
		spec_info.path,
		concat("", ["{{", container.name, "}}"]),
	],
)
```

Vérifiez `initContainers` séparément lorsque la même exigence s'applique aux conteneurs d'initialisation.

### Terraform {#terraform}

Les ressources Terraform sont regroupées par type de ressource et par étiquette :

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

Utilisez le type de ressource du fournisseur comme `resourceType`. Les helpers de plateforme peuvent résoudre les noms des ressources qui utilisent des champs tels que `bucket`, `cluster_id` ou `name`:

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Les valeurs `searchKey` de Terraform commencent généralement par le type de ressource et l'étiquette :

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

Les versions des fournisseurs peuvent déplacer la configuration dans des ressources distinctes. Utilisez une règle par défaut équivalente comme point de départ lorsque le check doit couvrir plusieurs versions de fournisseur, modules, ressources associées ou JSON de plan Terraform. Une règle qui vérifie uniquement une valeur d'attribut explicite, telle que le statut de versionnage `Suspended`, ne détecte pas les ressources manquantes.

## Corrélation des ressources {#resource-correlation}

Certaines vérifications comparent plusieurs ressources, modules, jobs ou charges de travail. Évitez les jointures sans contrainte dans `input.document`, car elles peuvent associer des ressources non liées et produire des résultats en double.

Préservez les contraintes de document, d'espace de noms, de workflow, de phase de construction et de référence de ressource lors de l'adaptation d'une règle existante.

## Couverture de test {#test-coverage}

Testez au moins les éléments suivants :

- Une configuration qui doit produire un résultat.
- Une configuration conforme qui ne doit pas produire de résultat.
- Valeurs manquantes et explicites lorsque les valeurs par défaut sont importantes.
- Ressources multiples dans un seul fichier.
- Syntaxe alternative prise en charge par la plateforme, telle que les alias de module Ansible ou les formulaires de déclenchement GitHub Actions.
- Ressources associées dans des portées distinctes lorsque la règle effectue une corrélation.

## Validation {#validation}

L'éditeur vérifie plus que la syntaxe Rego. Avant d'évaluer un échantillon, Datadog vérifie que la politique répond aux exigences de la section [Contrat de règle](#rule-contract), et en outre qu'elle :

- Utilise le nombre correct d'arguments dans les appels `sprintf`.
- Compile avec les bibliothèques communes et celles de la plateforme sélectionnée.
- N'appelle pas de fonctions intégrées restreintes telles que `http.send` ou `opa.runtime`.

Corrigez toutes les erreurs signalées avant d'interpréter une évaluation sans résultat. Les erreurs de validation signifient que la politique n'a pas été exécutée avec succès.

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /fr/security/code_security/iac_security/custom_rules/