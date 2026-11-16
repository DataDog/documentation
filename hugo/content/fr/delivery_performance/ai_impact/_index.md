---
aliases:
- /fr/dora_metrics/ai-impact/
- /fr/dora_metrics/ai_impact/
description: Mesurez l'impact des assistants de codage IA sur vos performances de
  livraison de logiciels.
further_reading:
- link: /delivery_performance/ai_impact/setup
  tag: Documentation
  text: Configurez AI Impact
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: En savoir plus sur DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentation
  text: Configurer DORA Metrics
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentation
  text: Apprenez comment les métriques DORA sont calculées
- link: https://www.datadoghq.com/blog/devex-measurement-pitfalls-ai-era/
  tag: Blog
  text: 5 pièges à éviter lors de la mesure de l'expérience développeur à l'ère de
    l'IA
- link: https://www.datadoghq.com/blog/ai-impact/
  tag: Blog
  text: Mesurez l'impact réel des outils de codage IA sur la livraison de logiciels
    avec Datadog AI Impact
- link: https://www.datadoghq.com/blog/how-to-measure-developer-experience-in-the-ai-era/
  tag: Blog
  text: Comment mesurer l'expérience développeur à l'ère de l'IA
title: Impact de l'IA
---
{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !" >}}
AI Impact est disponible pour tous les clients Datadog en version Preview.
{{< /callout >}}

## Présentation {#overview}

AI Impact mesure comment les outils de codage IA — y compris les assistants de codage, les agents de revue et les agents autonomes — affectent vos performances de livraison de logiciels. Datadog détecte la contribution de l'IA à partir de plusieurs types de sources. Les sources incluent les modèles de co-auteur dans les métadonnées de commit, les intégrations de fournisseurs, les étiquettes de pull request et les données que vous envoyez vous-même.

## Mise en route {#getting-started}

Datadog détecte automatiquement certaines activités d'IA une fois que les [DORA Metrics][1] sont configurées avec les données de déploiement, de commit et de pull request. Les outils d'IA peuvent être identifiés grâce aux signatures de co-auteur, aux commentaires de revue et à d'autres informations d'auteur dans les commits qui indiquent généralement une implication de l'IA. Pour capturer plus complètement l'activité de l'IA dans votre organisation, consultez [Set Up AI Impact][2] pour configurer les sources et les règles de mappage qui identifient vos outils d'IA spécifiques et leurs contributions.

## Métriques d'impact {#impact-metrics}

| Métrique | Définition |
|--------|------------|
| PR assistées par IA | PR contenant au moins un commit assisté par IA, divisées par le nombre total de PR. |
| Débit de PR | Nombre de PR déployées par utilisateur et par jour pour les auteurs assistés par IA par rapport aux auteurs non assistés. |
| Temps de cycle des PR | Temps médian entre le premier commit d'une PR et sa fusion pour les PR assistées par IA par rapport aux PR non assistées. |
| Taux d'échec des changements | Taux d'échec pondéré par la proportion de commits assistés par IA dans chaque déploiement, par rapport au taux pondéré pour les commits non assistés. Par exemple, si un déploiement ayant échoué comporte 3 commits sur 10 assistés par l'IA, seulement 30 % de cet échec est attribué à l'IA. |
| Temps de récupération | Temps de récupération médian des déploiements ayant échoué contenant des commits assistés par IA par rapport aux déploiements sans. |

<div class="alert alert-info">Le taux d'échec des changements inclut uniquement les déploiements liés à des modifications de code. Les déploiements de configuration ou d'infrastructure uniquement sont exclus afin que la comparaison reflète l'impact de l'IA sur les échecs liés au code. Ceci diffère du taux d'échec des changements DORA standard, qui comptabilise tous les types de déploiement.</div>

<div class="alert alert-info">Pour GitHub uniquement, les métriques au niveau des PR excluent les PR dont les commits sont entièrement rédigés par des bots. Cela permet d'exclure l'activité automatisée de la base de référence sans IA.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/delivery_performance/dora_metrics/setup/
[2]: /fr/delivery_performance/ai_impact/setup/