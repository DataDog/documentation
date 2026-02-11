---
categories:
- log collection
- Security
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md
description: Importer et traiter vos logs Alcide
doc_link: https://docs.datadoghq.com/integrations/alcide/
has_logo: true
integration_id: alcide
integration_title: Alcide
is_public: true
name: alcide
public_title: Intégration Datadog/Alcide
short_description: Importer et traiter vos logs Alcide
version: '1.0'
---

## Présentation

Alcide fournit des services de surveillance des audits et des anomalies Kubernetes. Cette intégration permet à Datadog d'ingérer et de traiter les journaux d'Alcide.

## Implémentation

### Installation

Datadog active automatiquement un pipeline de traitement des journaux lorsque des journaux Alcide sont détectés. Aucune étape d'installation n'est requise.

### Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.

Dans Alcide, sélectionnez l'onglet _Integrations_ et accédez à la section _Detections Integrations Configuration_, qui vous permet de configurer des intégrations pour les logs comportant des informations sur les menaces.

1. Sélectionnez la cible **HTTP API**.

2. Dans la case URL, entrez `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Remplacez la valeur de remplacement `<DATADOG_SITE>` par `datadoghq.com` pour le site américain, ou par `datadoghq.eu` pour le site européen. Remplacez la valeur de remplacement `<DATADOG_API_KEY>` par votre [clé API Datadog][1].

3. Sous _Types d'entités_, sélectionnez les types pour lesquels vous souhaitez transmettre des renseignements sur les menaces. Datadog recommande de sélectionner tous ces types.

4. Sous _Catégories de détection_, sélectionnez les catégories que vous souhaitez transmettre. Datadog recommande de sélectionner à la fois _incidents_ et _anomalies_.

5. Sous _Confiance de Détection_, sélectionnez vos niveaux de confiance souhaités. Datadog recommande de sélectionner au moins _élevé_ et _moyen_.

6. Vous pouvez également créer des filtres d'inclusion et d'exclusion pour les entités, à l'aide des cases _Entities Matching_ et _Entities Not Matching_.

Ensuite, allez à la section _Configuration d'Intégration des Entrées d'Audit Sélectionnées_, située sous la section précédente. Cette section est utilisée pour configurer les intégrations pour les journaux d'audit.

1. Sélectionnez la cible **HTTP API**.

2. Dans la case URL, entrez `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Remplacez la valeur de remplacement `<DATADOG_SITE>` par `datadoghq.com` pour le site américain, ou par `datadoghq.eu` pour le site européen. Remplacez la valeur de remplacement `<DATADOG_API_KEY>` par votre [clé API Datadog][1].

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog][38].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/help/