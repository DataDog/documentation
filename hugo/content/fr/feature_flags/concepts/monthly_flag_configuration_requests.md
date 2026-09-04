---
description: Comprenez les demandes de configuration de flag mensuelles (MFCR), l'unité
  de facturation des Feature Flags, et comment les SDK côté client et côté serveur
  les génèrent différemment.
further_reading:
- link: /feature_flags/concepts/configuration_sources
  tag: Documentation
  text: Sources de configuration des SDK côté serveur
- link: /feature_flags/guide/estimating_and_managing_costs
  tag: Documentation
  text: Estimer et gérer les coûts des Feature Flags
- link: /account_management/plan_and_usage/usage_details
  tag: Documentation
  text: Utilisation détaillée
- link: /account_management/plan_and_usage/bill_overview
  tag: Documentation
  text: Aperçu de la facturation
title: Demandes de configuration de flag mensuelles (MFCR)
---
## Présentation {#overview}

Datadog facture les Feature Flags sur la base des **demandes de configuration de flag mensuelles (MFCR)**. Une MFCR compte chaque fois qu'un SDK demande le fichier de configuration de flag, c'est-à-dire la charge utile qui contient vos flags, leurs variantes et leurs règles de ciblage. Une MFCR ne compte pas le nombre de fois où le code de l'application évalue un flag.

Les SDK Feature Flags évaluent les flags localement, en mémoire, par rapport à un fichier de configuration qu'ils possèdent déjà. Comme l'évaluation ne nécessite pas d'appel réseau, Datadog ne peut pas mesurer l'utilisation par volume d'évaluation. Au lieu de cela, la facturation des Feature Flags mesure la fréquence à laquelle les SDK demandent le fichier de configuration qui rend l'évaluation locale possible.

## Ce qui génère une MFCR {#what-generates-an-mfcr}

Une MFCR est incrémentée chaque fois que le fichier de configuration de flag est demandé. Une demande de configuration se produit lorsque :

- Un **SDK côté client** s'initialise, ce qui se produit généralement lorsqu'un utilisateur ouvre une application mobile ou charge une page web.
- Un **SDK côté serveur** vérifie la présence d'un fichier de configuration mis à jour, à un intervalle récurrent.

La demande elle-même est envoyée à différents endroits selon le chemin de livraison. Les SDK côté client, et les SDK côté serveur utilisant la livraison sans agent, demandent la configuration directement depuis le CDN de Datadog, qui fonctionne sur Fastly. Les SDK côté serveur utilisant la livraison par Agent ne demandent pas la configuration directement ; le Datadog Agent la demande pour le compte du SDK via Remote Configuration. Consultez [Server SDK Configuration Sources][1] pour savoir comment les SDK côté serveur choisissent entre ces chemins de livraison.

L'installation d'un SDK ne génère pas de requêtes de configuration par elle-même. Les requêtes ne commencent qu'après que le code de l'application initialise le SDK (côté client) ou sélectionne explicitement une source de configuration (côté serveur).

Le nombre de flags dans le fichier de configuration n'affecte pas le nombre. Une seule requête de configuration peut livrer n'importe quel nombre de flags. Voir [Ce qui ne compte pas comme un MFCR](#what-doesnt-count-as-an-mfcr).

## Facturation des SDK côté client vs côté serveur {#client-side-vs-server-side-sdk-billing}

Les SDK côté client et côté serveur génèrent des requêtes de configuration différemment, ils contribuent donc au volume de MFCR de manière différente.

### SDK côté client {#client-side-sdks}

Les [Client-side SDKs][2] demandent la configuration au CDN lors de leur initialisation. Cela se produit généralement lorsqu'un utilisateur ouvre une application mobile ou charge une page web. Le SDK met cette configuration en cache localement sur l'appareil pour le reste de la session.

Comme chaque requête correspond à une ouverture d'application ou à un chargement de page, le volume de MFCR côté client suit de près le trafic des utilisateurs finaux. Les exemples incluent les sessions RUM non échantillonnées, ou les utilisateurs actifs quotidiens ou les sessions sur les propriétés où les flags côté client sont utilisés.

### SDK côté serveur {#server-side-sdks}

Les [Server-side SDKs][3] demandent la configuration à un intervalle récurrent plutôt que par requête d'utilisateur final. Selon le chemin de livraison, cette requête va directement au CDN (livraison sans agent) ou via le Datadog Agent (livraison par agent). Chaque instance en cours d'exécution — par exemple, chaque host, conteneur ou service — génère ses propres requêtes de configuration indépendamment. Par conséquent, le volume de MFCR pour les SDK côté serveur dépend du nombre d'instances en cours d'exécution et de la fréquence à laquelle elles demandent une configuration mise à jour. Il ne dépend pas du volume de trafic des utilisateurs finaux que ces instances traitent.

Une seule requête de configuration côté serveur peut fournir une configuration à une instance qui gère un volume important de trafic d'utilisateurs finaux. Pour cette raison, Datadog facture les requêtes de configuration côté serveur à 10 fois leur nombre brut.

### Utilisation combinée côté client et côté serveur {#combined-client-side-and-server-side-usage}

Si vous utilisez à la fois des SDK côté client et côté serveur, l'utilisation totale des MFCR correspond à la somme des deux. Ajoutez les requêtes de configuration côté client aux requêtes de configuration côté serveur après l'application du multiplicateur côté serveur.

## Ce qui ne compte pas comme un MFCR {#what-doesnt-count-as-an-mfcr}

Les évaluations de flags ne comptent pas comme des MFCR. Une fois qu'un SDK a reçu un fichier de configuration, il évalue les flags localement par rapport à ce fichier mis en cache sans appel réseau supplémentaire. En conséquence :

- Une seule requête de configuration peut inclure n'importe quel nombre de flags.
- L'application peut évaluer chacun de ces flags n'importe quel nombre de fois sans générer de MFCR supplémentaires.

## Afficher l'utilisation et la facturation {#view-usage-and-billing}

Pour consulter l'utilisation des MFCR et leur contribution à la facture des Feature Flags, accédez à [Usage Details][4] et [Bill Overview][5].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/concepts/configuration_sources/
[2]: /fr/feature_flags/client/
[3]: /fr/feature_flags/server/
[4]: /fr/account_management/plan_and_usage/usage_details/
[5]: /fr/account_management/plan_and_usage/bill_overview/