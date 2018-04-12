---
categories:
- Collaboration
ddtype: crawler
description: Envoyer des alertes et des graphiques Datadog aux flux de votre équipe.
doc_link: https://docs.datadoghq.com/integrations/flowdock/
git_integration_title: flowdock
has_logo: true
integration_title: Flowdock
is_public: true
kind: integration
manifest_version: '1.0'
name: flowdock
public_title: Intégration Datadog-Flowdock
short_description: Envoyer des alertes et des graphiques Datadog aux flux de votre équipe.
version: '1.0'
---

{{< img src="integrations/flowdock/flowdock_overview.png" alt="Flowdock overview" responsive="true" popup="true">}}

## Aperçu

Intégrer FlowDock pour:

* être averti quand quelqu'un publie sur votre flux
* obtenir des alertes de monitor, des changements d'état d'intégration (et bien plus encore) directement dans vos flux

Datadog tire parti des threads de Flowdock pour éviter de polluer vos flux avec des notifications: pour un flux donné, chaque notification ira dans son propre thread, d'autres notifications connexes iront dans ce même thread (par exemple si une alerte de monitor donnée est déclenchée puis résolue, les notifications correspondantes seront regroupées dans Flowdock).

## Implémentation
### Installation

L'intégration de flowdock est vraiment simple. Vous devez simplement vous connecter à Flowdock dans l'onglet Configuration. Il va chercher tous vos flux ouverts. Si vous ne souhaitez pas publier sur tous les flux, vous pouvez supprimer ceux que vous ne souhaitez pas afficher dans la liste de saisie semi-automatique. Vous pouvez ensuite utiliser @flowdock dans n'importe quel message ou monitor pour envoyer des messages à vos flux.

Les messages utilisateur et les snapshot iront dans le fil principal de votre flux tandis que chaque alerte sera publiée dans son propre thread Flowdock. Cela évite que le thread principal soit surpeuplé avec des alertes et garde votre discussion d'équipe propre et organisée. D'un autre côté, vous avez toujours un coup d'œil sur les statuts des moniteurs qui ont été rapportés récemment dans votre Inbox.

## Données collectées
### Métriques

L'intégration Flowdock n'inclut aucune métrique pour le moment.

### Evénements
L'intégration Flowdock n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Flowdock n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
<<<<<<< HEAD
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][2]

[1]: http://docs.datadoghq.com/help/
[2]: https://www.datadoghq.com/blog/
=======
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
>>>>>>> master
