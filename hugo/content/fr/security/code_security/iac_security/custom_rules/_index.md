---
algolia:
  tags:
  - iac security
  - infrastructure as code
  - custom rule
  - rego
description: Créez, testez et publiez des règles de sécurité de l'Infrastructure as
  Code personnalisées avec Rego.
further_reading:
- link: https://www.datadoghq.com/blog/custom-iac-security-rules/
  tag: Blog
  text: Appliquer des règles personnalisées dans l'analyse Datadog IaC Security
- link: /security/mcp_server/
  tag: Documentation
  text: Outils de sécurité du Datadog MCP Server
title: Règles personnalisées IaC
---
Créez des règles de sécurité personnalisées pour appliquer les exigences spécifiques à votre organisation.

Les règles personnalisées utilisent [Rego][1], le langage de politique d'Open Policy Agent (OPA), et s'exécutent parallèlement aux règles Datadog par défaut lors des analyses IaC. La *règle* est l'objet enregistré (métadonnées, exemple, description), tandis que la *politique* est le bloc Rego évalué dans l'éditeur.

Les règles personnalisées sont disponibles pour ces plateformes :

- Ansible
- CI/CD (GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

La création, la modification ou la publication de règles personnalisées nécessite l'autorisation `appsec_vm_write`. Pour plus d'informations, consultez [Contrôle d'accès basé sur les rôles][6]. Pour plus de détails sur le contrat de règle, les entrées analysées et les modèles spécifiques à la plateforme, consultez la [Référence des règles personnalisées IaC][2].

Il existe deux options pour créer des règles personnalisées : cloner une règle existante ou créer une règle à partir de zéro. Vous pouvez également utiliser un agent IA connecté au Datadog MCP Server. Consultez [Créer et gérer des règles avec MCP](#create-and-manage-rules-with-mcp).

## Cloner une règle existante {#clone-an-existing-rule}

Clonez une règle par défaut lorsque vous souhaitez modifier un check existant, évaluer le même type de ressource qu'une règle existante ou utiliser des bibliothèques Rego Datadog partagées pour le parsing spécifique à la plateforme, le nommage des ressources ou les emplacements du code source.

1. Sur la page Règles IaC, recherchez une règle par défaut ou personnalisée pour la même plateforme et le même type de ressource, puis sélectionnez {{< ui >}}Clone{{< /ui >}} dans le menu d'actions de la règle.
1. Mettez à jour les métadonnées, la politique, le fichier exemple et la description copiés.
1. Cliquez sur {{< ui >}}Save as draft{{< /ui >}} pour enregistrer la règle sans la publier, ou cliquez sur {{< ui >}}Save and publish{{< /ui >}} pour publier la règle immédiatement.

   Les règles en brouillon ne s'exécutent pas lors des analyses. Pour publier un brouillon ultérieurement, ouvrez-le depuis la page Règles IaC et publiez-le.

Par défaut, les règles publiées s'exécutent lors des analyses IaC ultérieures où la plateforme spécifiée s'applique. Pour affiner la manière dont les règles sont appliquées, consultez [Configuration d'IaC Security][5].

## Créer une règle à partir de zéro {#create-a-rule-from-scratch}

Créez une règle à partir de zéro lorsque vous avez besoin d'un check ciblé et que vous comprenez la structure analysée pour votre plateforme. L'éditeur fournit une politique de démarrage et un fichier exemple.

Cet exemple crée une règle Terraform qui détecte une ressource `aws_s3_bucket_versioning` dont le statut est explicitement défini sur `Suspended`. La règle signale l'attribut non sécurisé et fournit une remédiation suggérée.

Les étapes s'appliquent à n'importe quelle plateforme. Seuls le fichier exemple et la politique Rego changent.

### Nommez et configurez la règle {#name-and-configure-the-rule}

1. Sur la page Règles IaC, cliquez sur {{< ui >}}Create rule{{< /ui >}}.
1. Saisissez un nom de règle, puis sélectionnez la plateforme, la catégorie et la gravité.

   Vous pouvez éventuellement définir **AWS** comme fournisseur et spécifier un identifiant CWE (Common Weakness Enumeration).

### Ajoutez un fichier exemple {#add-a-sample-file}

Le fichier exemple est l'entrée sur laquelle votre politique s'exécute, il doit donc contenir la mauvaise configuration que vous souhaitez détecter. Pour cette règle, remplacez l'exemple de départ sous {{< ui >}}Test your policy{{< /ui >}} par :

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id

  versioning_configuration {
    status = "Suspended"
  }
}
```

Datadog analyse les ressources Terraform sous `input.document[i].resource`, regroupées par type de ressource et étiquette de ressource. La règle peut sélectionner la ressource de versioning avec :

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

Dans cette expression, `i` identifie le document analysé et `name` est le libellé de la ressource Terraform, `reports`.

### Rédigez la condition de détection {#write-the-detection-condition}

La condition de détection est l'expression qui doit être vraie pour que la règle signale une anomalie. Cette règle produit une anomalie lorsque le statut de versioning est `Suspended` :

```rego
versioning.versioning_configuration.status == "Suspended"
```

Si le champ de statut est manquant, la règle ne signale pas d'anomalie. Voir [Entrée analysée][3] pour plus de détails.

### Construisez l'anomalie {#build-the-finding}

L'anomalie est ce que Datadog signale lorsque la condition de détection correspond. Elle identifie quelle ressource est affectée, où elle se trouve dans la source et comment la corriger. Assemblez les éléments pour former une politique complète.

Cet exemple de politique comporte quatre parties :

- Enveloppe la condition de détection dans une règle `DatadogPolicy`.
- Sélectionne chaque ressource `aws_s3_bucket_versioning`.
- Signale une anomalie uniquement lorsque le statut est `Suspended`.
- Ajoute un objet `result` avec les quatre champs requis, y compris une remédiation suggérée.

Cette politique suit également trois pratiques générales : une bibliothèque partagée pour les noms de ressources, un `searchKey` précis et une remédiation `replacement`.

Sous {{< ui >}}Rego policy{{< /ui >}}, remplacez la politique initiale par :

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status == "Suspended"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": tf_lib.resolve_s3_bucket_name(versioning, name),
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": json.marshal({
			"before": "Suspended",
			"after": "Enabled",
		}),
		"remediationType": "replacement",
	}
}
```

### Testez la règle {#test-the-rule}

1. Cliquez sur {{< ui >}}Run{{< /ui >}}.
1. Confirmez que l'éditeur signale une anomalie sur l'attribut `status`.
1. Modifiez `status` dans l'exemple de `Suspended` à `Enabled`.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} et confirmez que la politique ne signale aucune anomalie.
1. Restaurez `status` à l'état `Suspended` et exécutez à nouveau la politique avant d'enregistrer l'exemple.

Si l'éditeur signale une erreur au lieu d'un résultat d'évaluation, consultez [Validation][4].

### Décrivez la règle {#describe-the-rule}

Utilisez le champ {{< ui >}}Say what's happening{{< /ui >}} pour fournir une description et des conseils de remédiation, par exemple :

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

### Enregistrez la règle {#save-the-rule}

- Cliquez sur {{< ui >}}Save as draft{{< /ui >}} pour enregistrer la règle sans la publier. Les règles en brouillon ne s'exécutent pas lors des analyses. Pour publier un brouillon ultérieurement, ouvrez-le depuis la page Règles IaC et publiez-le.
- Cliquez sur {{< ui >}}Save and publish{{< /ui >}} pour publier la règle immédiatement.

Par défaut, les règles publiées s'exécutent lors des analyses IaC ultérieures où la plateforme spécifiée s'applique. Pour affiner la manière dont les règles sont appliquées, consultez [Configuration d'IaC Security][5].

## Créez et gérez des règles avec MCP {#create-and-manage-rules-with-mcp}

Connectez un agent IA au [Datadog MCP Server][7] pour générer, valider, créer, mettre à jour, publier et supprimer des règles IaC personnalisées à partir d'une description en langage naturel ou de votre propre Rego. Activez l'ensemble d'outils `security` lorsque vous [vous connectez au serveur MCP][8]. Pour obtenir une liste des outils disponibles et les autorisations requises, consultez [Règles personnalisées d'Infrastructure as Code][9] dans la référence des outils de sécurité du Datadog MCP Server.

## Révisions de règle {#rule-revisions}

La modification d'une règle crée une nouvelle révision. Depuis le panneau des détails de la règle, vous pouvez :

- Consulter l'historique des révisions de la règle.
- Comparer deux révisions quelconques pour voir ce qui a changé.
- Restaurer une révision antérieure pour en faire l'état actuel de la règle.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /fr/security/code_security/iac_security/custom_rules/guide/
[3]: /fr/security/code_security/iac_security/custom_rules/guide/#parsed-input
[4]: /fr/security/code_security/iac_security/custom_rules/guide/#validation
[5]: /fr/security/code_security/iac_security/configuration/#rule-configuration
[6]: /fr/account_management/rbac/permissions/#cloud-security-platform
[7]: /fr/mcp_server/
[8]: /fr/security/mcp_server/#quickstart
[9]: /fr/security/mcp_server/#infrastructure-as-code-custom-rules