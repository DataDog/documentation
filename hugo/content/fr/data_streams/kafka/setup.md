---
description: Configurez la console Kafka, y compris les prérequis, la configuration
  de l'Agent et les étapes supplémentaires nécessaires pour inspecter les messages
  Kafka.
title: Configuration de la console Kafka
---
Cette page couvre les prérequis et les étapes de configuration de la console Kafka.

## Prérequis {#prerequisites}

### Version du Datadog Agent {#datadog-agent-version}

La version 7.78 ou ultérieure du Datadog Agent est requise.

### Autorisations ACL {#acl-permissions}

Si votre cluster Kafka utilise des ACL, l'utilisateur du Datadog Agent nécessite les autorisations minimales suivantes :

| Nom de la ressource | Type de ressource | Opération |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

## Configuration {#setup}

Accédez à la [page de configuration de la console Kafka][1] et cliquez sur {{< ui >}}Get Started{{< / ui >}}. Choisissez ensuite votre environnement et suivez les instructions. Pour demander de l'aide, choisissez {{< ui >}}Request a pairing session{{< /ui >}}.

{{< img src="data_streams/kafka_setup-2.png" alt="La boîte de dialogue de configuration de la console Kafka affichant la sélection de l'environnement, le protocole de sécurité, les options du registre de schémas et les instructions de configuration Kubernetes" >}}

La page de configuration fournit des instructions de configuration spécifiques à l'environnement. Vous pouvez copier les instructions directement vers un agent IA avec {{< ui >}}Copy for AI{{< /ui >}}.

## Activer l'inspection des messages {#enable-message-inspection}

Cette section s'applique uniquement si vous souhaitez afficher les charges utiles des messages Kafka dans la section {{< ui >}}Messages{{< /ui >}}. Ignorez-la si vous ne prévoyez pas d'utiliser l'inspection des messages.

### Autorisation ACL supplémentaire {#additional-acl-permission}

En plus des autorisations ACL listées dans [Prérequis](#acl-permissions), l'utilisateur du Datadog Agent nécessite l'autorisation `READ` pour les topics :

| Nom de la ressource | Type de ressource | Opération |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

Le nom de la ressource `*` accorde `Read` l'accès à tous les topics. Pour limiter l'Agent à des topics spécifiques, remplacez `*` par ces noms de topics.

### Configuration à distance {#remote-configuration}

[Configuration à distance][3] doit être activée à trois niveaux :

1. Au [niveau de l'organisation][5].
2. Au [niveau de l'Agent][10].
3. Au [niveau de la clé d'API][11].

### Autorisation utilisateur {#user-permission}

Pour afficher les messages Kafka, un utilisateur doit disposer de l'autorisation `Data Streams Monitoring Capture Messages`.

Vous pouvez vérifier vos autorisations actuelles sur votre [{{< ui >}}Profile{{< /ui >}} page][7]. Pour activer les autorisations, modifiez un rôle existant ou créez un rôle sur la [{{< ui >}}Roles{{< /ui >}} page][8]. Si vous n'avez pas l'autorisation de modifier les rôles, contactez l'administrateur de votre organisation.

{{% collapse-content title="Créez un rôle et attribuez-le aux utilisateurs" level="h4" expanded=false %}}

#### 1. Créez un rôle {#1-create-a-role}

1. Accédez à la [{{< ui >}}Roles{{< /ui >}} page][8] dans Datadog.
2. Cliquez sur {{< ui >}}+ New Role{{< /ui >}} dans le coin supérieur droit.
   <div class="alert alert-info">
   Si vous voyez « Lecture seule » au lieu du bouton « + Nouveau rôle », vous n'avez pas l'autorisation de créer des rôles. Contactez votre administrateur Datadog pour obtenir de l'aide.
   </div>
3. Saisissez un nom descriptif pour votre rôle (par exemple : « Data Streams Messages Access »).
4. Dans le champ {{< ui >}}Search Permissions{{< /ui >}}, saisissez `Data Streams Monitoring Capture Messages`.
5. Sélectionnez l'autorisation dans les résultats de recherche pour l'activer pour ce rôle.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.
7. Confirmez que votre rôle a été créé avec succès en le recherchant dans la liste des rôles.

#### 2. Attribuez le rôle aux utilisateurs {#2-assign-the-role-to-users}

1. Accédez à la [{{< ui >}}Users{{< /ui >}} page][9] dans Datadog.
2. Recherchez et cliquez sur l'utilisateur auquel vous souhaitez attribuer le rôle.
3. Dans le panneau des détails de l'utilisateur, cliquez sur {{< ui >}}Edit{{< /ui >}} à côté de son nom.
   <div class="alert alert-info">
   Si vous ne voyez pas de bouton {{< ui >}}Edit{{< /ui >}}, vous avez besoin de privilèges d'administrateur pour modifier les rôles des utilisateurs. Contactez votre administrateur Datadog.
   </div>
4. Dans la fenêtre modale qui s'ouvre, localisez la section {{< ui >}}Roles{{< /ui >}}.
5. Ajoutez votre rôle nouvellement créé à l'utilisateur.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.
7. Recherchez un message de confirmation {{< ui >}}User updated{{< /ui >}} pour vérifier que la modification a bien été effectuée.

{{% /collapse-content %}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /fr/remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /fr/remote_configuration/#enable-remote-configuration
[11]: /fr/account_management/api-app-keys/