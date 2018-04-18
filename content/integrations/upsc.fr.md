---
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/upsc/
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
has_logo: true
integration_title: UPSC
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: upsc
public_title: Intégration Datadog-UPSC
short_description: Collecteur de métriques UPSC pour batteries UPS
support: contrib
supported_os:
- linux
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service UPSD via upsc en temps réel pour:

* Visualiser et surveiller les états de UPS battery health
* Être informé des failovers et des événements UPS.

## Implémentation
### Configuration

Modifiez le fichier `upsc.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

Lorsque vous exécutez `info datadog-agent`, vous devriez voir quelque chose comme ceci:

    Checks
    ======

        upsc
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check UPSC est compatible avec les plateformes Linux.

## Données collectées
### Métriques
{{< get-metrics-from-git "upsc" >}}


### Evénements
Envoyez vos failovers et événements UPS dans votre [flux d'événements Datadog](https://docs.datadoghq.com/graphing/event_stream/) 

### Checks de Service
Le check UPSD n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
