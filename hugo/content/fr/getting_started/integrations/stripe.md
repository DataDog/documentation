---
description: Provisionnez et gérez une organisation Datadog depuis le Stripe CLI à
  l'aide de Stripe Projects.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-stripe-projects/
  tag: Blog
  text: Provisionnez Datadog sur Stripe Projects
- link: https://docs.stripe.com/projects
  tag: Documentation
  text: Documentation de la Stripe Projects CLI.
site_support_id: stripe_projects
title: Commencez avec Datadog sur Stripe Projects.
---
## Présentation {#overview}

Utilisez [Stripe Projects][1] pour provisionner et gérer Datadog depuis le Stripe CLI. Ce flux crée une organisation Datadog et ajoute sa clé d'API, son site et le nom de l'organisation au fichier `.env` de votre application.

## Prérequis {#prerequisites}

- Un compte Stripe avec une adresse e-mail qui n'est pas associée à un compte Datadog existant

## Configuration {#setup}

### Installez le Stripe CLI et le plugin Projects {#install-the-stripe-cli-and-projects-plugin}

1. Installez le [Stripe CLI][2] version 1.43.3 ou ultérieure :

   ```shell
   npm install -g @stripe/cli
   ```

   Pour d'autres méthodes d'installation, consultez [Installer le Stripe CLI][2].

1. Installez le plugin Stripe Projects :

   ```shell
   stripe plugin install projects
   ```

### Provisionnez Datadog {#provision-datadog}

1. Initialisez Stripe Projects. Exécutez cette commande dans le répertoire que vous souhaitez utiliser pour votre projet, comme la racine du dépôt de votre application :

   ```shell
   stripe projects init
   ```

1. Ajoutez l'observabilité Datadog :

   ```shell
   stripe projects add datadog/observability
   ```

1. Confirmez que le fichier `.env` dans le répertoire de votre projet contient votre clé d'API Datadog, votre site et le nom de votre organisation.

### Mettez à niveau votre forfait {#upgrade-your-plan}

Pour conserver l'accès à Datadog après la fin de votre essai gratuit, passez à un paiement à l'utilisation. Si votre compte Stripe dispose d'un moyen de paiement enregistré, une seule commande suffit :

```shell
stripe projects upgrade datadog-observability
```

## Accédez à Datadog {#access-datadog}

1. Accédez à la [page de connexion Datadog](https://app.datadoghq.com/account/login).
1. Sélectionnez **Se connecter avec Google** si vous utilisez un compte Google pour vous connecter à Stripe. Sinon, sélectionnez **Mot de passe oublié ?** et saisissez l'adresse e-mail de votre compte Stripe pour définir un mot de passe Datadog.

## Supprimez Datadog de Stripe Projects {#remove-datadog-from-stripe-projects}

La suppression de Datadog révoque votre clé d'API et retire l'intégration de votre projet Stripe. Votre organisation Datadog et ses données ne sont pas supprimées et restent disponibles dans l'interface utilisateur de Datadog.

```shell
stripe projects remove datadog-observability
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.stripe.com/projects
[2]: https://docs.stripe.com/cli/install