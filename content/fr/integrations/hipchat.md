---
categories:
- Collaboration
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog à la room HipChat de votre
  équipe.
doc_link: https://docs.datadoghq.com/integrations/hipchat/
draft: false
git_integration_title: hipchat
has_logo: true
integration_id: ''
integration_title: HipChat
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: hipchat
public_title: Intégration Datadog/HipChat
short_description: Envoyez des alertes et des graphiques Datadog à la room HipChat
  de votre équipe.
version: '1.0'
---

{{< img src="integrations/hipchat/hipchat_graph.png" alt="Graphique HipChat" popup="true">}}

## Présentation

L'intégration HipChat permet à Datadog d'envoyer des notifications à votre room HipChat ou à votre handle, notamment :

- des messages et des graphiques lors du déclenchement de vos monitors Datadog ;
- des messages concernant l'activité du flux d'événements (à savoir, les commentaires de vos collègues).

## Configuration

### Configuration

1. [Créez un token d'accès][1] pour Datadog. Seul un accès aux notifications est requis.
2. Copiez votre clé et saisissez-la dans le [carré d'intégration HipChat][2].
3. Saisissez le nom des rooms sur lesquelles vous souhaitez que Datadog puisse envoyer des messages.
   Cochez la case si vous souhaitez recevoir une notification pour chaque commentaire dans toutes les rooms configurées. Si vous ne la cochez pas, les personnes publiant des commentaires doivent ajouter `@hipchat-<NOM_CONVERSATION>` pour tous les messages qu'ils souhaitent envoyer sur HipChat.

4. Enregistrez votre configuration.

Vous pouvez également partager des graphiques ou envoyer des alertes de monitor à des rooms HipChat en précisant `@hipchat-<NOM_CONVERSATION>`.

<div class="alert alert-warning">
Si vous utilisez un token HipChat API V1 et que votre handle de conversation contient des caractères spéciaux, comme des virgules, des parenthèses ou des crochets, vous n'avez pas besoin de les échapper lorsque vous saisissez le handle ; la zone de saisie automatique s'en charge pour vous.
</div>

#### Serveur HipChat

Si vous hébergez votre propre serveur HipChat, saisissez le hostname du serveur dans le [carré Datadog/Hipchat][2]. Le serveur doit être accessible à partir d'Internet.

Cochez la case **Ignore SSL** UNIQUEMENT si le certificat de votre serveur HipChat est auto-signé.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hostname Hipchat" popup="true">}}

## Données collectées

### Métriques

L'intégration HipChat n'inclut aucune métrique.

### Événements

L'intégration HipChat n'inclut aucun événement.

### Checks de service

L'intégration HipChat n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://www.hipchat.com/admin/api
[2]: https://app.datadoghq.com/account/settings#integrations/hipchat
[3]: https://docs.datadoghq.com/fr/help/