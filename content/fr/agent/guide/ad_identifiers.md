---
title: Identificateurs de conteneur Autodiscovery
kind: documentation
aliases:
  - /fr/agent/autodiscovery/ad_identifiers
further_reading:
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
---
Les identificateurs de conteneur Autodiscovery, ou `ad_identifiers`, vous permettent d'appliquer un modèle de fichier de configuration Autodiscovery à un conteneur donné, soit en utilisant [le nom raccourci de l'image du conteneur](#identificateurs-de-conteneur-sous-forme-de-nom-d-image-raccourci), soit en utilisant un [identificateur de conteneur Autodiscovery personnalisé](#identificateurs-de-conteneur-autodiscovery-personnalises).

**Remarque** : concernant les autres types de configuration (stockages clé/valeur, étiquettes Docker ou annotations de pod Kubernetes), la mise en correspondance d'un modèle de configuration d'intégration avec le conteneur associé se fait via l'`<IDENTIFICATEUR_CONTENEUR>` inclus dans la configuration des stockages clé/valeur, des étiquettes ou des annotations.

## Identificateurs de conteneur sous forme de nom d'image raccourci

Pour appliquer le modèle de configuration Autodiscovery suivant à un conteneur donné, utilisez le **nom raccourci de l'image du conteneur** comme `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>` :

```text
ad_identifiers:
  <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>

init_config:
  <CONFIG_INIT>

instances:
  <CONFIG_INSTANCES>
```

Par exemple, le modèle de configuration Autodiscovery Apache suivant peut être utilisé par l'Agent :

```yaml
ad_identifiers:
  - httpd
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

Cet identificateur renvoie **l'ensemble** des images de conteneur `httpd` sur votre host. Imaginons que vous avez un conteneur qui exécute `library/httpd:latest` et un autre qui exécute `<EXEMPLE>/httpd:v2`. L'Agent applique le modèle ci-dessus aux deux conteneurs, car vous devez spécifier les noms raccourcis des images de conteneur, comme `httpd`, et non `library/httpd:latest` :

Lorsque vous utilisez un nom d'image raccourci comme identificateur de conteneur Autodiscovery, **l'Agent n'est pas en mesure de faire la distinction entre des images ayant le même nom mais provenant de sources différentes ou ayant des tags différents**.

## Ajouter des tags à partir des étiquettes standard

Même si la configuration Autodiscovery est définie dans un fichier de configuration personnalisé, les étiquettes standard peuvent être utilisées en parallèle pour appliquer les tags `env`, `service` et `version`.

Consultez la section [Tagging de service unifié][1] pour découvrir comment configurer ces étiquettes sur vos conteneurs.

### Identificateurs multiples

Indiquez plusieurs noms d'image en ajoutant des éléments à la liste `ad_identifiers`, par exemple :

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## Identificateurs de conteneur Autodiscovery personnalisés

Pour appliquer des modèles de configuration Autodiscovery différents à des conteneurs qui exécutent la même image, utilisez une valeur personnalisée `<IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>` et appliquez-la avec l'étiquette `com.datadoghq.ad.check.id` pour identifier votre conteneur. À l'aide du fichier de configuration suivant :

```text
ad_identifiers:
  <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>

init_config:
  <CONFIG_INIT>

instances:
  <CONFIG_INSTANCES>
```

Ajoutez l'étiquette suivante pour appliquer ce modèle de configuration Audiodiscovery à un conteneur spécifique.

```text
com.datadoghq.ad.check.id: <IDENTIFICATEUR_INTÉGRATION_AUTODISCOVERY>
```

**Remarque** : l'étiquette `com.datadoghq.ad.check.id` a la priorité sur l'image ou le nom.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging