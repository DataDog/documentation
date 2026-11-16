---
description: Découvrez comment utiliser Datadog Flag Migration CLI pour migrer des
  feature flags d'autres fournisseurs vers Datadog Feature Flags.
further_reading:
- link: /feature_flags/
  tag: Documentation
  text: Présentation des Feature Flags
- link: /feature_flags/guide/migrate_from_launchdarkly
  tag: Guide
  text: Migrer vos Feature Flags depuis LaunchDarkly
title: Migrer les Feature Flags avec la Flag Migration CLI
---
## Présentation {#overview}

[Datadog Flag Migration CLI][1] est un outil en ligne de commande qui vous aide à migrer des feature flags d'autres fournisseurs vers [Datadog Feature Flags][2]. La CLI lit les définitions de feature flags auprès d'un fournisseur source et les recrée dans Datadog, en préservant les règles de ciblage, les variations et les configurations de rollout lorsque cela est possible.

<div class="alert alert-info">Si vous migrez des feature flags depuis Eppo, ils conservent le bucketing compatible avec Eppo. Les sujets existants continuent de recevoir les mêmes variantes après le basculement de l'évaluation des feature flags vers Datadog.</div>

## Prérequis {#prerequisites}

Avant d'exécuter la CLI, assurez-vous que votre organisation Datadog est configurée :

- **Users and Teams** : votre organisation Datadog doit disposer des utilisateurs et des équipes nécessaires pour gérer les feature flags. La CLI ne crée ni utilisateurs ni équipes pour vous.
- **Feature Flag Environments** : les [environnements de feature flags][3] vers lesquels vous prévoyez de migrer doivent être créés avant l'exécution de la CLI. La CLI ne crée pas d'environnements pour vous.

Pour plus de détails sur le fonctionnement de la migration et les fournisseurs pris en charge, consultez le [dépôt GitHub][1].

## Exécutez la CLI {#run-the-cli}

Exécutez la migration avec `npx` :

```bash
npx @datadog/dd-flag-migration migrate
```

Pour obtenir toutes les options de configuration, les fournisseurs sources pris en charge, la configuration de l'authentification et le dépannage, consultez le [`dd-flag-migration` fichier README sur GitHub][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-flag-migration
[2]: /fr/feature_flags/
[3]: /fr/feature_flags/concepts/environments/