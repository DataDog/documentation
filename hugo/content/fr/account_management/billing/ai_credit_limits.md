---
description: Définissez des limites mensuelles de crédits IA au niveau de l'organisation,
  au niveau de chaque utilisateur, ou les deux, et remplacez les limites pour des
  utilisateurs spécifiques.
further_reading:
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits IA
title: Limites de crédits IA
---
## Présentation {#overview}

Les administrateurs de l'organisation peuvent définir des plafonds mensuels sur l'utilisation des crédits IA au niveau de l'organisation, au niveau de chaque utilisateur, ou les deux. Les administrateurs peuvent également remplacer la limite par utilisateur par défaut pour des utilisateurs individuels. Les crédits IA sont partagés entre [Bits Chat][1], [Bits Investigation][2], [Bits Code][3] et [Bits Agent Builder][4].

## Autorisations {#permissions}

Pour afficher et définir les limites de crédits IA, un utilisateur doit disposer de l'autorisation [`billing_edit`][6].

## Où définir les limites {#where-to-set-limits}

Les limites de crédits IA sont configurées dans [**Bits AI > Gestion des crédits IA**][5].

## Types de limites {#types-of-limits}

Vous pouvez configurer trois types de limites mensuelles :

| Type de limite | Description |
|---|---|
| Limite à l'échelle de l'organisation | Plafonne l'utilisation totale des crédits IA dans l'organisation pour le mois. Aucune limite à l'échelle de l'organisation n'est définie par défaut. |
| Limite par utilisateur par défaut | Plafonne l'utilisation mensuelle des crédits IA pour chaque utilisateur qui ne dispose pas d'une limite individuelle personnalisée. |
| Limite personnalisée par utilisateur | Définit une limite mensuelle personnalisée pour un utilisateur individuel, remplaçant la limite par utilisateur par défaut pour cet utilisateur. |

## Comment les limites sont appliquées {#how-limits-are-applied}

- Lorsqu'une limite d'organisation et une limite d'utilisateur (ou une limite personnalisée) sont configurées, la limite applicable la plus restrictive s'applique à l'utilisateur.
- Si un utilisateur dispose à la fois d'une limite par utilisateur par défaut et d'une limite personnalisée, la plus élevée des deux s'applique, et l'utilisation de l'utilisateur reste soumise à la limite à l'échelle de l'organisation.
- Augmenter une limite débloque les utilisateurs ayant atteint la limite précédente. Réduire une limite bloque les utilisateurs dont l'utilisation dépasse déjà la nouvelle valeur.
- Lorsqu'un utilisateur ou l'organisation atteint une limite, les utilisateurs concernés ne peuvent pas utiliser Bits Chat, Bits Investigation, Bits Code ou Bits Agent Builder, et une bannière affiche la date de réinitialisation.

### Exemples {#examples}

| Limite de l'organisation | Limite par utilisateur | Utilisateurs | Utilisation hypothétique maximale | Crédits IA facturables maximum | Résultat |
|---|---|---|---|---|---|
| 2 000 crédits IA | 50 crédits IA par utilisateur | 20 | 50 × 20 = 1 000 crédits IA | 1 000 crédits IA | Chaque utilisateur peut utiliser jusqu'à 50 crédits IA sans autre restriction. |
| 2 000 crédits IA | 200 crédits IA par utilisateur | 20 | 200 × 20 = 4 000 crédits IA<sup>*</sup> | 2 000 crédits IA | Chaque utilisateur peut utiliser jusqu'à 200 crédits IA jusqu'à ce que la limite à l'échelle de l'organisation de 2 000 crédits IA soit atteinte. |
| Non défini | 200 crédits IA par utilisateur | 20 | 200 × 20 = 4 000 crédits IA | 4 000 crédits IA | Chaque utilisateur peut utiliser jusqu'à 200 crédits IA sans autre restriction. |

<sup>*</sup> Une limite d'organisation configurée sert de plafond pour l'organisation, indépendamment de la somme des limites hypothétiques par utilisateur.

## Attribution de l'utilisation {#usage-attribution}

L'attribution détermine à qui s'applique la limite pour une unité d'utilisation de l'IA donnée, et à qui la dépense de crédits IA est imputée.

| Produit | Attribution |
|---|---|
| [Bits Chat][1] | Toute l'utilisation de Bits Chat est comptabilisée sous l'adresse e-mail de l'utilisateur interagissant avec Bits Chat. |
| [Bits Investigation][2] | Les investigations lancées manuellement sont comptabilisées sous l'adresse e-mail de l'utilisateur ayant initié l'action.<br>Les investigations déclenchées automatiquement (par exemple, à partir du déclenchement d'un monitor) sont comptabilisées sous **Agents autonomes**. |
| [Bits Code][3] | Toute l'utilisation de Bits Code est comptabilisée sous l'adresse e-mail de l'utilisateur interagissant avec Bits Code. |
| [Bits Agent Builder][4] | Les exécutions d'agent pour les workflows sont comptabilisées sous l'adresse e-mail de l'utilisateur ayant créé le workflow.<br>Les exécutions d'agent pour les workflows créés par des comptes de service sont comptabilisées sous **Agents autonomes**. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/
[2]: /fr/bits_ai/bits_investigation/
[3]: /fr/bits_ai/bits_code/
[4]: /fr/actions/agents/
[5]: https://app.datadoghq.com/bits-ai/ai-credits-management
[6]: /fr/account_management/rbac/permissions/#billing-and-usage