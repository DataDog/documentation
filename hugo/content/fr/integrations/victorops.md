---
categories:
- alerting
- notifications
dependencies: []
description: Utilisez VictorOps comme canal de notification pour les alertes et les
  événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/victorops/
draft: false
git_integration_title: victorops
has_logo: true
integration_id: victorops
integration_title: VictorOps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: victorops
public_title: Intégration Datadog/VictorOps
short_description: Utilisez VictorOps comme canal de notification pour les alertes
  et les événements Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Utilisez l'intégration Datadog/VictorOps pour envoyer des alertes Datadog à VictorOps et bénéficier d'un contrôle précis des processus d'acheminement et de réaffectation. Accédez plus rapidement aux détails des problèmes et réduisez leur délai de résolution en créant des alertes contenant **@victorops** :

- Depuis votre flux d'événements
- En prenant un snapshot
- Lorsqu'une alerte de métrique est déclenchée

## Formule et utilisation

### Liste des infrastructures

1. Sur votre page de paramètres VictorOps, cliquez sur Integrations.
2. Cliquez sur Datadog, puis sur Enable Integration.
3. Copiez votre clé.
4. Sur Datadog, collez la clé d'API dans la section suivante :

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration VictorOps n'inclut aucune métrique.

### Aide

L'intégration VictorOps n'inclut aucun événement.

### Aide

L'intégration VictorOps n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][1].

## Pour aller plus loin

### Base de connaissances

#### Clés d'acheminement

Pour envoyer des alertes à des utilisateurs VictorOps spécifiques, ajoutez toutes vos clés d'acheminement dans Datadog. Si aucune clé n'est configurée, VictorOps envoie les alertes au groupe par défaut. Utilisez ensuite la syntaxe `@victorops` pour choisir l'endpoint VictorOps qui recevra les alertes.

Les caractères spéciaux ne sont pas autorisés dans les noms. Les lettres majuscules/minuscules, les chiffres et les caractères '\_' and '-' sont autorisés.

### Choisir un endpoint personnalisé

Si ce champ est vide, l'endpoint est défini par défaut sur 'https://alert.victorops.com/integrations/datadog/20140523/alert'.

[1]: https://docs.datadoghq.com/fr/help/