---
title: Débuter avec les tags
kind: documentation
aliases:
  - /fr/getting_started/getting_started_with_tags
  - /fr/guides/tagging/
  - /fr/developers/tagging/
further_reading:
  - link: getting_started/tagging/assigning_tags
    tag: Documentation
    text: Apprendre à attribuer des tags
  - link: getting_started/tagging/using_tags
    tag: Documentation
    text: Apprendre à utiliser les tags dans Datadog
---
## Introduction

Les tags sont un moyen d'ajouter des dimensions aux métriques, de sorte qu'elles peuvent être projetées, agrégées et comparées. [L'utilisation des tags](/getting_started/tagging/using_tags) vous permet d'observer les performances globales sur un certain nombre d'hosts  puis de restreindre (éventuellement) l'ensemble observé en fonction d'éléments spécifiques. En un mot, les tags et leur utilisation permettent de modifier votre contexte d'observation des séries temporelles.

## Pourquoi ça compte

Généralement, il est utile d'examiner globalement les conteneurs, les machines virtuelles et l'infrastructure de cloud au niveau du «service». Par exemple, il est plus utile de regarder le processeur sur une collection d'hosts qui représente un service, plutôt que le CPU pour le serveur A ou le serveur B séparément.

Les conteneurs et les environnements cloud renouvellent régulièrement leurs hosts, il est donc essentiel de les tagger pour permettre l'agrégation des métriques obtenues.

## Application de tags

Les tags doivent **commencer par une lettre**, et après peuvent contenir:

* Alphanumerics
* Underscores
* Moins
* Virgules
* Points
* Slashes

Les autres caractères seront convertis en underscores. Les tags peuvent contenir jusqu'à 200 caractères et supportent le format unicode. Les tags seront convertis en minuscules.

**Pour une fonctionnalité optimale, nous recommandons de construire des tags qui utilisent la syntaxe `key: value`.**
Des exemples de clés de tag de métrique couramment utilisées sont env, instance, name et role. Notez que le device, l'host et la source sont des clés de tag "réservées" et ne peuvent pas être spécifiés de façon standard.

Les tags peuvent être ajoutés en utilisant n'importe laquelle des méthodes suivantes:

* Tags de l'Agent (`datadog.yaml`)
* Tags [DogStatsD](/developers/dogstatsd)
* Intégration / Check Tags (chaque check sur l'host local prend en charge les tags en modifiant le yaml)
* Tags générés par d'autres services tels que  [AWS](/integrations/amazon_web_services), [Azure](/integrations/azure), [GCE](/integrations/google_app_engine), etc.
* Tags dans l '[API](/api) - notez que beaucoup d'endpoints supportent les tags, comme les événements et les métriques.
* [Chef Roles](/integrations/chef) et [Puppet](/integrations/puppet) Tags (Chef and Puppet use the API - this may obviously be extended to other configuration management tools by you or Datadog)
* Ajout manuel de tags en utilisant [Infrastructure List](/graphing/infrastructure) (survolez l'host-> sélectionnez "Inspect" -> "EditTags")

## Limitations

Nous stockons une série temporelle par combinaison host + metric + tag sur notre backend, donc nous ne pouvons pas supporter une quantité de tags infini.
N'incluez pas de tags qui ne cessent de croître dans vos métriques, comme les timestamp ou les identifiants d'utilisateur. Généralement, essayez de **Limiter chaque métrique à 1000 tags**.

[En savoir plus sur les limitations des métriques](/getting_started/custom_metrics)

## Exemples

Voici un exemple de tags utilisant l'éditeur de graphique pour les séries temporelles. Pour la première capture d'écran, aucun tag n'a été appliqué, et nous observons le CPU moyen sur tous les hosts:

{{< img src="getting_started/tags/Tags_1.png" alt="Tags_1" responsive="true" popup="true" style="width:75%;">}}

Dans l'exemple suivant, nous avons appliqué un tag (region:eastus) qui nous permet d'examiner le processeur dans la région Est des États-Unis. Nous avons utilisé la région comme exemple, mais vous pouvez utiliser n'importe quelle tag, y compris l'application, le service, l'environnement, etc.

{{< img src="getting_started/tags/Tags_2.png" alt="Tags_2" responsive="true" popup="true" style="width:75%;">}}

Dans ce dernier exemple, nous avons utilisé le second champ vide étiqueté "everything" par option pour afficher une ligne d'une seule série temporelle pour chaque host. Nous voyons maintenant le processeur du serveur pour chaque host qui s'exécute dans la région Est des États-Unis.

{{< img src="getting_started/tags/Tags_3.png" alt="Tags_3" responsive="true" popup="true" style="width:75%;">}}

Nous pouvons également ajouter des tags supplémentaires pour affiner davantage notre contexte - par exemple, les hosts dans `region:eastus` et` env:production`. Les tags sont extrêmement puissants et omniprésents dans Datadog. Ils peuvent être appliqués à tous les éléments de base, y compris les alertes et la host map.

### En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}