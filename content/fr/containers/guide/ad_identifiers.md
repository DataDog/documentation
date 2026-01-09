---
aliases:
- /fr/agent/autodiscovery/ad_identifiers
- /fr/agent/guide/ad_identifiers
description: Configurer des modèles Autodiscovery pour cibler des containers spécifiques
  à l'aide d'identifiants de conteneurs et de noms d'image
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurer des intégrations avec Autodiscovery sur Docker
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
title: Identificateurs de conteneur Autodiscovery
---

Ce document explique comment appliquer un modèle de configuration [Autodiscovery][1] à un conteneur spécifique. Le paramètre `ad_identifiers` peut correspondre à un nom d'image de conteneur ou à un identifiant personnalisé.

## Nom d'image de conteneur

Pour appliquer le modèle de configuration Autodiscovery suivant à un conteneur donné, remplacez `<AUTODISCOVERY_IDENTIFIER>` par le nom d'image de conteneur [court][2] :

```yaml
ad_identifiers:
  <AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**Exemple** : le modèle de configuration Autodiscovery Apache suivant s'applique à une image de conteneur nommée `httpd` :

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

Cela correspond à **toutes** les images de conteneur `httpd` sur votre host. Si vous avez un conteneur exécutant `foo/httpd:latest` et un autre exécutant `bar/httpd:v2`, l'Agent applique le modèle ci-dessus aux deux conteneurs.

Lorsque vous utilisez des noms d'image courts comme identifiants de conteneur Autodiscovery, l'Agent ne peut pas faire la distinction entre des images portant le même nom provenant de sources différentes ou avec des tags différents.

### Identificateurs multiples

Indiquez plusieurs noms d'image en ajoutant des éléments à la liste `ad_identifiers`, par exemple :

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

Cela correspond à **toutes** les images de conteneur sur votre host qui correspondent à `httpd` **ou** `my-custom-httpd-image`.

## Identificateurs de conteneur Autodiscovery personnalisés

Si vous souhaitez appliquer différents modèles de configuration à des conteneurs exécutant la même image, utilisez des identifiants de conteneur personnalisés.

1. Fournissez un identifiant de conteneur personnalisé à votre conteneur à l'aide d'un label Docker ou d'une annotation Kubernetes.

   **Exemple** :
   Appliquez un label Docker ou une annotation Kubernetes pour identifier votre conteneur comme `foo` :

   {{< tabs >}}
   {{% tab "Étiquette Docker" %}}

   ```yaml
   LABEL com.datadoghq.ad.check.id="foo"
   ```

   **Remarque** **Remarque** : l'étiquette `com.datadoghq.ad.check.id` est prioritaire sur le nom d'image.

   {{% /tab %}}
   {{% tab "Annotation Kubernetes" %}}

   ```text
   ad.datadoghq.com/<CONTAINER_NAME>.check.id: 'foo'
   ```

   Remplacez `<CONTAINER_NAME>` par le nom du conteneur dans le pod.

   **Remarque** : pris en charge dans l'Agent Datadog v6.25+ et v7.25. L'étiquette `ad.datadoghq.com/<CONTAINER_NAME>.check.id` est prioritaire sur le nom d'image.
   {{% /tab %}}
   {{< /tabs >}}

2. Référencez cette valeur personnalisée dans votre modèle de configuration Autodiscovery.

   **Exemple** :
   Le modèle de configuration Autodiscovery Apache suivant désigne une image de conteneur avec le nom personnalisé `foo` :

   ```yaml
   ad_identifiers:
     - foo
   init_config:
   instances:
     - apache_status_url: http://%%host%%/server-status?auto
   logs:
     source: apache
     service: webapp
   ```

## Identifiants de conteneur avancés

Pour les cas d'utilisation nécessitant une granularité supplémentaire sur l'Agent v7.73.0+, vous pouvez utiliser l'option de configuration de check `cel_selector` pour cibler des conteneurs spécifiques en fonction d'attributs de conteneur supplémentaires. Ces règles sont basées sur la syntaxe [Common Expression Language][3].

Remarque : pour être une configuration Autodiscovery valide, la configuration de check doit inclure soit un `ad_identifier`, soit une règle de conteneur `cel_selector` avec le paramètre `container.image.reference`.

**Exemple** :
Le modèle de configuration Autodiscovery NGINX suivant désigne une image de conteneur avec le nom `nginx` sur deux espaces de nommage sélectionnés. Les conditions répertoriées séparément sont jointes par une opération **OR**.

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.pod.namespace == "target-ns-1"
    - container.pod.namespace == "target-ns-2"
```

| Attribut                    | Description                                                |
|------------------------------|------------------------------------------------------------|
| `container.name`             | Nom du conteneur.                                 |
| `container.image.reference`  | Référence complète de l'image de conteneur (registre, référentiel, tag/digest).  |
| `container.pod.name`         | Nom du pod exécutant le conteneur.                 |
| `container.pod.namespace`    | Espace de nommage Kubernetes du pod.                       |
| `container.pod.annotations`  | Annotations appliquées au pod (mappage clé-valeur).        |

Ces attributs peuvent être utilisés avec la [syntaxe CEL][4] pour définir des règles permettant de sélectionner des conteneurs spécifiques pour la planification de checks. Voici une liste d'exemples de règles pouvant être définies :

### Exemples

Pour sélectionner le conteneur exécutant l'image `nginx` avec une annotation de pod spécifique :

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.pod.annotations["monitoring"] == "true"
```

Pour sélectionner le conteneur exécutant l'image `nginx` dans des espaces de nommage sans la sous-chaîne `-dev` :

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - !container.pod.namespace.matches("-dev")
```

Pour sélectionner le conteneur exécutant l'image `nginx` avec le nom de conteneur `nginx-server` uniquement dans l'espace de nommage `prod` :

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.name == "nginx-server" && container.pod.namespace == "prod"
```

Pour sélectionner le conteneur exécutant une image avec la sous-chaîne `nginx` :

```yaml
cel_selector:
  containers:
    - container.image.reference.matches("nginx")
```

Pour sélectionner des conteneurs à l'aide d'une logique groupée (par exemple, un nom de conteneur spécifique dans l'un des deux espaces de nommage) :

```yaml
ad_identifiers:
  - nginx
cel_selector:
  containers:
    - container.name == "my-app" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

<div class="alert alert-danger">

Des conditions larges peuvent cibler involontairement des conteneurs sur votre host. Par exemple, l'utilisation d'un `cel_selector` de conteneurs comme `!container.image.reference.matches("nginx")` sélectionne **tous** les conteneurs du host à l'exception de nginx, y compris les composants système et probablement des applications non liées. Cela peut entraîner une collecte de données de télémétrie supplémentaire pouvant avoir un impact sur la facturation.
</div>

Pour exclure globalement des charges de travail particulières de la collecte, quelle que soit l'intégration de check, consultez la section [Gestion de la découverte de conteneurs][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/autodiscovery
[2]: /fr/glossary/#short-image
[3]: https://cel.dev/
[4]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[5]: /fr/containers/guide/container-discovery-management