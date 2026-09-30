---
title: Automatiser les instantanés de comptes cloud via l'API Cloudcraft
---

## Présentation

La fonctionnalité **Auto Layout** de Cloudcraft, accessible via l'application Web, est un outil puissant pour générer automatiquement des diagrammes de votre environnement AWS. Cette fonctionnalité peut considérablement rationaliser les processus de documentation et faciliter l'intégration de nouveaux membres de l'équipe.

Ce guide fournit une approche étape par étape pour utiliser cette fonctionnalité via des utilitaires de ligne de commande courants et l'API de développement Cloudcraft.

<div class="alert alert-info">La possibilité d'ajouter et d'analyser des comptes AWS et Azure, ainsi que d'utiliser l'API de développement de Cloudcraft, n'est disponible que pour les abonnés Pro. Consultez <a href="https://www.cloudcraft.co/pricing">la page de tarification de Cloudcraft</a> pour plus d'informations.</div>

## Prérequis

- Un [abonnement Cloudcraft Pro][1] actif.
- Une clé API avec des autorisations de lecture-écriture.
- L'ID du compte AWS ou Azure que vous souhaitez analyser.
- Accès à un environnement de type Unix (Linux, macOS ou Windows Subsystem for Linux).
- Familiarité avec les opérations en ligne de commande.
- Connaissance de base de l'utilisation des API.

## Prendre un instantané du compte

Commencez par créer un instantané de votre compte AWS ou Azure en utilisant les endpoints [Snapshot AWS account][2] ou [Snapshot Azure account][3]. Ce processus reflète la fonctionnalité du bouton **Scan Now** dans l'interface utilisateur Cloudcraft et produit l'instantané au format JSON.

Exécutez la commande suivante dans votre terminal :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY"
{{< /code-block >}}

Remplacez `PROVIDER` par le fournisseur de cloud, par exemple `azure` ou `aws`, `ACCOUNT_ID` par l'ID de votre compte AWS ou Azure dans Cloudcraft, `REGION` par votre région d'analyse souhaitée et `API_KEY` par votre clé API Cloudcraft.

Après avoir exécuté la commande, la représentation JSON de l'instantané de votre compte AWS s'affiche. Pour enregistrer cette sortie directement dans un fichier, utilisez la commande suivante :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY" > '/tmp/account-infra.json'
{{< /code-block >}}

L'instantané est enregistré avec le nom de fichier `account-infra.json` dans votre répertoire temporaire.

## Générer un nouveau blueprint

Ensuite, créez un nouveau plan dans votre compte Cloudcraft en utilisant le endpoint d'API [Create blueprint][4]. Les données d'instantané enregistrées servent de charge utile pour cette requête.

Exécutez la commande suivante dans votre terminal :

{{< code-block lang="shell" >}}
curl \
  --request 'POST' \
  --url 'https://api.cloudcraft.co/blueprint' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer API_KEY" \
  --data '@/tmp/account-infra.json'
{{< /code-block >}}

N'oubliez pas de remplacer `API_KEY` par votre clé API Cloudcraft réelle.

Une fois terminé, un nouveau plan reflétant votre infrastructure cloud est créé dans votre compte Cloudcraft, reproduisant l'effet de l'utilisation manuelle des boutons **Scan Now** et **Auto Layout**.

Si vous avez des questions ou des difficultés avec le processus, [contactez l'équipe d'assistance de Cloudcraft][5].

[1]: https://www.cloudcraft.co/pricing
[2]: /fr/cloudcraft/api/aws-accounts/#snapshot-aws-account
[3]: /fr/cloudcraft/api/azure-accounts/#snapshot-an-azure-account
[4]: /fr/cloudcraft/api/blueprints/#create-a-blueprint
[5]: https://app.cloudcraft.co/app/support