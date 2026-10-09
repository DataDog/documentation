---
aliases:
- /fr/product_analytics/experimentation/global_lift/
- /fr/experiments/global_lift
- /fr/experiments/global_lift/
description: Comprenez comment une expérience affecte vos totaux de métriques sur
  l'ensemble de votre population d'utilisateurs.
further_reading:
- link: /experiments/reading_results/
  tag: Documentation
  text: Lecture des résultats d'expérience
- link: /experiments/defining_metrics/
  tag: Documentation
  text: Créer des métriques d'expérience
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Prenez des décisions de conception basées sur les données avec Product Analytics
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Comment nous avons construit Datadog Experiments
title: Lift global
---
## Présentation {#overview}

Les expériences n'enrôlent généralement qu'un sous-ensemble de vos utilisateurs. Le lift global répond à la question : si vous déployiez ce changement auprès de tous les utilisateurs éligibles, comment vos totaux de métriques globaux changeraient-ils ?

Par exemple, si une expérience montre un lift de 10 % du revenu par utilisateur, mais que la population éligible de l'expérience ne représente que 20 % de votre revenu total, l'impact estimé sur le revenu global est d'environ 2 %. Ceci est utile pour décider s'il faut déployer un changement : un traitement qui semble impressionnant au sein d'une expérience peut avoir un impact plus faible sur les totaux au niveau de l'entreprise s'il s'applique à une audience restreinte.

Datadog rapporte le lift global parallèlement à _couverture_, un facteur qui quantifie quelle part de la valeur globale de votre métrique provient de la population éligible. Le lift global est le produit de la couverture et du lift local observé de l'expérience.

## Populations d'utilisateurs {#user-populations}

Chaque expérience divise votre base d'utilisateurs en trois groupes :

| Population | Description |
|---|---|
| **Non éligibles** | Utilisateurs qui n'ont jamais été éligibles (mauvaise page, critères de ciblage non remplis ou autres conditions d'éligibilité). Leur comportement n'est affecté par aucune décision de déploiement. |
| **Éligibles, non inscrits** | Utilisateurs qui remplissaient les critères d'éligibilité mais ont été exclus en raison des paramètres d'exposition au trafic. |
| **Inscrits** | Utilisateurs assignés à la variante de traitement ou de contrôle. |

La progression globale se concentre sur la population éligible — les utilisateurs inscrits plus les utilisateurs qui étaient éligibles mais non inscrits — et estime l'impact sur la métrique si cette population était entièrement basculée du contrôle vers le traitement. Si le traitement était entièrement déployé, la population éligible inclurait tous les utilisateurs qui interagiraient avec lui.

## Couverture {#coverage}

La couverture est la proportion estimée de votre total de métrique global qui proviendrait de la population éligible si l'expérience de contrôle était déployée auprès de tous les utilisateurs éligibles. La formule est :

```
Coverage = FER_C / TM_C
```

| Symbole | Définition |
|---|---|
| `FER_C` | Total de la métrique estimé pour la population éligible complète dans le cadre d'un déploiement uniquement de contrôle |
| `TM_C` | Total de la métrique global estimé dans le cadre d'un déploiement uniquement de contrôle |

Ces valeurs sont estimées à partir des données d'expérience observées :

```
FER_C = X_C / (p_C × t_exp)

TM_C  = TM − TEM + (X_C / p_C)
```

| Symbole | Définition |
|---|---|
| `X_C` | Total de la métrique observé dans la variante de contrôle |
| `X_T` | Total de la métrique observé dans la variante de traitement |
| `TEM` | Total de la métrique d'expérience observé : `X_T + X_C` |
| `TM` | Total de la métrique observé pour tous les utilisateurs (inscrits et non inscrits) |
| `t_exp` | Fraction d'utilisateurs éligibles inscrits à l'expérience |
| `p_C` | Fraction d'utilisateurs inscrits assignés à la variante de contrôle |

**Intuition pour `FER_C` :** La variante de contrôle est un échantillon représentatif de la population éligible. La fraction d'utilisateurs éligibles qui se sont retrouvés dans le groupe de contrôle est `p_C × t_exp`, donc diviser `X_C` par cette fraction permet d'extrapoler le total de la métrique du groupe de contrôle à l'ensemble de la population éligible.

**Intuition pour `TM_C` :** Partez du total global observé (`TM`), retirez la contribution observée des utilisateurs inscrits (`TEM`) et remplacez-la par ce que ces utilisateurs auraient généré sous un contrôle total (`X_C / p_C`). La contribution des utilisateurs non éligibles reste inchangée.

## Lift global {#global-lift}

Le lift global est le produit de la couverture et du lift local de l'expérience :

```
Global lift = Coverage × Local lift
```

Le lift local est le lift relatif par sujet mesuré au sein de l'expérience :

```
                (Average metric value per treatment subject) − (Average metric value per control subject)
Local lift =  ──────────────────────────────────────────────────────────────────────────────────────────
                                  (Average metric value per control subject)
```

### Exemple {#example}

Considérez une expérience avec les valeurs observées suivantes :

- Répartition du trafic 50/50 (p_C = 0,5)
- Tous les utilisateurs éligibles sont inscrits (t_exp = 1,0)
- Revenu du groupe témoin : 100 $ (`X_C`)
- Revenu du groupe de traitement : 110 $ (`X_T`)
- Revenu total pour tous les utilisateurs : 1 010 $ (`TM`)

Le calcul du lift global s'effectue comme suit :

| Étape | Calcul | Valeur |
|---|---|---|
| `TEM` | 100 $ + 110 $ | 210 $ |
| `FER_C` | 100 $ / (0,5 × 1,0) | 200 $ |
| `TM_C` | 1 010 $ − 210 $ + (100 $ / 0,5) | 1 000 $ |
| Couverture | 200 $ / 1 000 $ | 20 % |
| Lift local | (110 $ − 100 $) / 100 $ | 10 % |
| **Lift global** | 20 % × 10 % | **2 %** |

En d'autres termes, le déploiement de ce traitement auprès de tous les utilisateurs éligibles augmenterait le revenu total de 2 %, passant de 1 000 $ (le contrefactuel contrôle uniquement) à 1 020 $.

## Métriques prises en charge {#supported-metrics}

Le lift global est calculé pour ces types d'agrégation : `count` et `sum`.

**Remarque** : Les métriques fermées (fenêtrées) — celles qui limitent les valeurs de fait à une fenêtre temporelle relative à l'attribution — ne sont pas prises en charge pour le lift global.

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}