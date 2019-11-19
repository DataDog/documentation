---
categories:
  - notification
  - monitoring
ddtype: crawler
dependencies: []
description: Utilisez VictorOps comme canal de notification pour les alertes et les événements Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/victorops/'
git_integration_title: victorops
has_logo: true
integration_title: VictorOps
is_public: true
kind: integration
manifest_version: '1.0'
name: victorops
public_title: Intégration Datadog/VictorOps
short_description: Utilisez VictorOps comme canal de notification pour les alertes et les événements Datadog.
version: '1.0'
---
## Présentation

Utilisez l'intégration Datadog/VictorOps pour envoyer des alertes Datadog à VictorOps et bénéficier d'un contrôle précis des processus d'acheminement et de réaffectation. Accédez plus rapidement aux détails des problèmes et réduisez leur délai de résolution en créant des alertes contenant **@victorops** :

* Depuis votre flux d'événements
* En prenant un snapshot
* Lorsqu'une alerte sur une métrique est déclenchée

## Implémentation
### Installation

1. Sur votre page de paramètres VictorOps, cliquez sur Integrations.
2. Cliquez sur Datadog, puis sur Enable Integration.
3. Copiez votre clé.
4. Sur Datadog, collez la clé d'API dans la section suivante :

## Données collectées
### Métriques

L'intégration VictorOps n'inclut aucune métrique.

### Événements
L'intégration VictorOps n'inclut aucun événement.

### Checks de service
L'intégration VictorOps n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][1].

## Pour aller plus loin
### Base de connaissances
#### Clés d'acheminement VictorOps

Envoyez directement des alertes à certains utilisateurs de VictorOps.
Répertoriez toutes les clés d'acheminement à utiliser sur Datadog. Si aucune n'est définie, VictorOps enverra l'alerte au groupe par défaut.

Vous serez alors en mesure de choisir l'endpoint VictorOps qui recevra l'alerte à l'aide de @victorops.

Les caractères spéciaux ne sont pas autorisés dans les noms. Les lettres majuscules/minuscules, les chiffres et les caractères '_' et '-' sont autorisés.

### Choisir un endpoint personnalisé

Si ce champ est vide, l'endpoint par défaut sera 'https://alert.victorops.com/integrations/datadog/20140523/alert'.


[1]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}