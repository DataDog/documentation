---
description: Comprenez comment l'obfuscation des clés de flag réduit la lisibilité
  des noms de flag dans les charges utiles d'assignation client et ce qui reste visible.
further_reading:
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /feature_flags/concepts/distribution_channels/
  tag: Documentation
  text: Canaux de distribution
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: Documentation
  text: Variantes et types de Feature Flags
title: Obfuscation de clé de flag
---
## Présentation {#overview}

L'obfuscation des clés de flag remplace les clés de flag lisibles par des hachages dans les réponses d'assignation précalculées. Cela rend les noms de flag moins reconnaissables pour quelqu'un inspectant la réponse. Cela ne rend pas secrets les feature flags côté client et n'empêche pas la falsification des réponses.

Votre application continue d'évaluer les flags avec leurs clés d'origine. L'obfuscation ne modifie pas le ciblage, les valeurs attribuées, les valeurs par défaut ou les clés de flag dans la télémétrie.

## Compatibilité et déploiement {#compatibility-and-rollout}

L'obfuscation des clés de flag nécessite le SDK JavaScript, `@datadog/openfeature-browser`, version `2.1.0` ou ultérieure. Datadog contrôle le déploiement vers les SDK compatibles. Le SDK gère l'encodage automatiquement. Vous ne définissez aucune option de fournisseur, ne générez aucun hash et ne modifiez aucun appel d'évaluation.

Pendant le déploiement, Datadog envoie des réponses obfusquées uniquement aux SDK qui signalent la prise en charge de l'encodage. Les autres versions du SDK continuent de recevoir des clés lisibles. La mise à jour d'une application ne modifie pas le comportement des autres applications exécutant toujours une ancienne version du SDK.

Cette fonctionnalité s'applique aux assignations précalculées. Elle n'obfusque pas les règles de ciblage téléchargées pour une évaluation locale.

## Comment fonctionne l'obfuscation des clés de flag {#how-flag-key-obfuscation-works}

1. Datadog évalue les flags pour le sujet et le contexte fournis par le SDK.
2. Datadog remplace chaque clé de flag dans la réponse d'assignation par un hash SHA-256 salé.
3. Le SDK hache la clé provenant de l'appel d'évaluation avec ce sel, trouve l'assignation et renvoie sa valeur.

Le sel change entre les réponses. Il s'agit d'une information publique, pas d'une clé secrète. Le SDK conserve le sel avec les assignations mises en cache.

Par exemple, l'appel d'évaluation JavaScript suivant reste le même, que la réponse contienne des clés lisibles ou hachées :

{{< code-block lang="javascript" >}}
const enabled = client.getBooleanValue('new-route-planner', false);
{{< /code-block >}}

La clé d'origine reste inchangée dans Datadog et dans le code de l'application. Les valeurs de variante, les identifiants de variante et les identifiants d'allocation restent également inchangés.

## Protégez les informations sensibles sur les fonctionnalités {#protect-sensitive-feature-information}

L'obfuscation réduit la découverte fortuite des noms de flags dans les réponses d'assignation. Elle ne fournit pas de chiffrement, d'autorisation ou de vérification de signature. Quiconque connaît une clé de flag possible peut utiliser le sel public pour vérifier son hash.

- Gardez les secrets et la logique métier sensible sur le serveur. Restreignez les flags réservés au serveur au **Server** [canal de distribution][1].
- Ne mettez pas d'informations sensibles dans les valeurs exposées au client. Les chaînes de caractères et les objets JSON restent lisibles. Les valeurs booléennes peuvent également révéler le comportement.
- Si les noms de flags dans le code de l'application sont une préoccupation, choisissez des clés de flag non descriptives. L'obfuscation de la charge utile ne supprime pas les chaînes de caractères du code du navigateur.
- Considérez les valeurs visibles par le client, les identifiants, la télémétrie et le comportement de l'application comme inspectables. Le hachage des clés de flag ne dissimule pas ces autres sources d'informations.
- Appliquez les décisions d'accès sensibles sur le serveur. L'obfuscation n'empêche pas un client modifié de changer son comportement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/concepts/distribution_channels/