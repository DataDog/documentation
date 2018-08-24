---
categories:
- notification
- monitoring
ddtype: crawler
dependencies: []
description: Utiliser VictorOps comme canal de notification pour les alertes et les événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/victorops/
git_integration_title: victorops
has_logo: true
integration_title: VictorOps
is_public: true
kind: integration
manifest_version: '1.0'
name: victorops
public_title: Intégration Datadog-VictorOps
short_description: Utiliser VictorOps comme canal de notification pour les alertes et les événements Datadog.
version: '1.0'
---


## Présentation
Envoyez les alertes Datadog à VictorOps et bénéficiez d'un contrôle précis du routage et des processus d'escalation.
Obtenez plus rapidement l'information de l'apparition d'un problème et réduisez son temps de résolution.
Créer des alertes en utilisant **@victorops**
* De votre flux d'événements
* En prenant un snapshot
* Lorsque une alerte sur une métrique est déclanchée

## Implémentation
### Installation

1. Sur votre page de paramètres VictorOps, cliquez sur "Integrations"
2. Cliquez sur "Datadog", puis sur "Enable Integration"
3. Copiez votre clef
4. De retour sur Datadog, collez la clé API dans la section suivante:

## Données collectées
### Métriques

L'intégration VictorOps n'inclut aucune métrique pour le moment.

### Événements
L'intégration VictorOps n'inclut aucun événement pour le moment.

### Checks de service
L'intégration VictorOps n'inclut aucun check de service pour le moment.

## Dépannage
Besoin d'aide ? Contactez  [l'équipe support de Datadog][1].

## Pour aller plus loin
### Base de connaissances
#### Clés de routage VictorOps

Alertez directement certains utilisateurs de VictorOps
Veuillez lister toutes les clés de routage à utiliser sur Datadog (si aucune n'est définie ici, VictorOps enverra l'alerte au groupe par défaut).

Vous serez alors en mesure de choisir sur quel endpoint VictorOps reçoit l'alerte en utilisant @victorops

Les caractères spéciaux ne sont pas autorisés dans les noms. Les lettres majuscules / minuscules, les chiffres, '_' et '-' sont autorisés.

### Choisissez un endpoint personnalisé

Si ce champ est vide, l'endpoint par défaut sera 'https://alert.victorops.com/integrations/datadog/20140523/alert'


[1]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}
