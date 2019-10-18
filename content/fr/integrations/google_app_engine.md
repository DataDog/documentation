---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: Recueillez des métriques pour votre projet et comparez-les entre les différentes versions de votre projet.
doc_link: 'https://docs.datadoghq.com/integrations/google_app_engine/'
git_integration_title: google_app_engine
has_logo: true
integration_title: Google App Engine
is_public: true
kind: integration
manifest_version: '1.0'
name: google_app_engine
public_title: Intégration Datadog/Google App Engine
short_description: Recueillez des métriques pour votre projet et comparez-les entre les différentes versions de versions.
version: '1.0'
---
## Présentation

Installez l'intégration Google App Engine dans votre projet Python pour :

* Consulter les métriques de vos services Google App Engine (memcache, files d'attente de tâches, banques de données, etc.)
* Consulter des métriques sur les requêtes (pourcentages, latence, coût, etc.)
* Appliquer des tags aux métriques de Google App Engine en fonction de leur version pour comparer les performances des différentes versions

Vous pouvez également envoyer des métriques custom à Datadog.

## Implémentation
### Installation

Assurez-vous d'avoir activé Billing pour votre projet Google App Engine afin de recueillir toutes les métriques.

1. Remplacez le répertoire par celui de l'application de votre projet.
2. Dupliquez le module Google App Engine de Datadog.

        git clone https://github.com/DataDog/gae_datadog

3. Modifiez le fichier `app.yaml` de votre projet.

    a. Ajoutez le gestionnaire Datadog à votre fichier app.yaml :

        handlers:
          # Il est conseillé de le placer au début de la liste
          # afin de ne pas l'écraser avec un itinéraire catchall                           - url: /datadog
            script: gae_datadog.datadog.app


    b. Configurez votre clé d'API. Cette partie doit se trouver au niveau supérieur du fichier, et non dans la section du gestionnaire.

        env_variables:
          DATADOG_API_KEY: '<VOTRE_CLÉ_API_DATADOG>'

    c. Puisque le module dogapi envoie des métriques et des événements par le biais d'une connexion TLS sécurisée, ajoutez le module ssl dans le fichier app.yaml :

        libraries:
          - name: ssl
            version: "latest"

4. Ajoutez ```dogapi``` dans le fichier requirements.txt.

        echo dogapi >> requirements.txt

5. Assurez-vous que les éléments exigés sont installés.

        pip install -r requirements.txt -t lib/

6. Déployez votre application. Consultez la [documentation de Google App Engine][1] pour consulter les commandes de déploiement de chaque langage.
Pour les applications Python, utilisez la commande suivante :

        appcfg.py -A <ID projet> update app.yaml

7. Saisissez l'URL de votre application dans la première zone de texte de l'écran de configuration de l'intégration. Si vous utilisez des files d'attente de tâches dans la console de développement Google, vous pouvez également les ajouter ici.

À ce stade, vous devriez recevoir un certain nombre de métriques pour votre environnement. Vous pouvez également choisir d'instrumenter davantage votre application à l'aide de la bibliothèque du langage de votre application.

Consultez la [page Bibliothèques][2] pour découvrir la liste de l'ensemble des bibliothèques client de Datadog et sa communauté pour DogstatsD et les API.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_app_engine" >}}


### Événements
L'intégration Google App Engine n'inclut aucun événement.

### Checks de service
L'intégration Google App Engine n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://cloud.google.com/appengine/kb
[2]: https://docs.datadoghq.com/fr/libraries
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[4]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}