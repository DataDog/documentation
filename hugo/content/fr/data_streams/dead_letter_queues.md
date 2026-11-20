---
further_reading:
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Surveillance des pipelines de données : notions de base – suivi de l''état
    et des performances dans la pile de données'
title: Files d'attente de lettres mortes (DLQ)
---
Data Streams Monitoring (DSM) offre une visibilité sur vos files d'attente de lettres mortes (DLQs) non vides, vous permettant de surveiller et d'inspecter les échecs de traitement des messages. DSM vous permet également de remédier à ces échecs de traitement des messages directement dans Datadog.

<div class="alert alert-info">La surveillance des files d'attente de lettres mortes est disponible pour les files d'attente Amazon SQS.</div>

## Surveiller les DLQ {#monitor-dlqs}

### Configuration {#setup}
* Activez [Data Streams Monitoring][1] pour vos services de messagerie.
* Installez l'[Datadog-AWS integration][2]. Utilisez cette intégration pour gérer les autorisations.
* Pour remédier aux échecs de traitement des messages dans Datadog, une configuration supplémentaire est requise. Consultez la section [Remédier aux problèmes de DLQ](#remediate-dlq-issues).

### Utilisation {#usage}

#### Créer un monitor pour une file d'attente de lettres mortes {#create-a-monitor-for-a-dead-letter-queue}

Pour savoir si votre file d'attente redirige des messages vers sa DLQ, vous pouvez créer un [metric monitors][8] qui alerte sur la métrique [`data_streams.sqs.dead_letter_queue.messages`][8].

Pour créer un monitor pour la DLQ d'une file d'attente :

1. Dans Datadog, accédez à [Data Streams Monitoring][4].
2. Sélectionnez l'onglet {{< ui >}}Explore{{< /ui >}} (par défaut).
3. Cliquez sur une file d'attente prise en charge pour ouvrir son panneau latéral.
4. Sélectionnez l'onglet {{< ui >}}Dead Letter Queue{{< /ui >}}.
5. Cliquez sur {{< ui >}}Create Monitor{{< /ui >}} pour ouvrir une page de configuration de monitor. Les entrées par défaut sont suffisantes pour créer un monitor qui vous alerte lorsque votre DLQ n'est pas vide, mais vous pouvez également effectuer des configurations supplémentaires sur cette page si vous le souhaitez.
6. Cliquez sur {{< ui >}}Create{{< /ui >}} en bas de la page.

#### Détecter les problèmes de traitement des messages {#detect-message-processing-issues}

Data Streams Monitoring vous aide à détecter où les messages n'ont pas pu être traités et quels services en aval pourraient être affectés :

* Le DSM [{{< ui >}}Service Map{{< /ui >}}][6] met en évidence les files d'attente contenant des messages dans leurs DLQs, vous aidant à identifier visuellement où les échecs se produisent.

* La page DSM [{{< ui >}}Issues{{< /ui >}}][7] répertorie toutes les files d'attente qui rencontrent des problèmes de traitement des messages 

## Remédier aux problèmes de DLQ {#remediate-dlq-issues}
Vous pouvez inspecter et résoudre les DLQ non vides directement dans Datadog en utilisant [Datadog Actions][5].

### Configuration {#setup-1}
Dans Datadog, créez une [connexion][9]. Vous avez besoin d'une entité IAM pour effectuer les actions. Cette entité IAM peut être un utilisateur IAM (avec une clé d'accès secrète) ou un rôle IAM (assumé en utilisant `sts:AssumeRole`) et doit disposer des autorisations suivantes :
  * `sqs:ReceiveMessage` (pour _peek_)
  * `sqs:StartMessageMoveTask` (pour _redrive_)
  * `sqs:PurgeQueue` (pour _purge_)

Ces autorisations peuvent être appliquées globalement à toutes les files d'attente SQS, ou restreintes à des files d'attente spécifiques.

### Utilisation {#usage-1}

Une fois la connexion configurée, vous pouvez cliquer sur une file d'attente prise en charge pour ouvrir son panneau latéral, où vous pouvez utiliser les actions suivantes :

* {{< ui >}}Peek{{< /ui >}} pour inspecter le contenu des messages ayant échoué et identifier la cause première
* {{< ui >}}Redrive{{< /ui >}} pour remettre les messages en file d'attente pour une autre tentative de traitement
* {{< ui >}}Purge{{< /ui >}} pour effacer les messages qui n'ont plus besoin d'être traités

## Dépannage {#troubleshooting}
Si vous ne parvenez pas à voir les informations de la file d'attente de lettres mortes :
* Confirmez que vous avez installé la [Datadog-AWS integration][2]
* Confirmez que votre rôle AWS utilise l'AWS-managed `AmazonSQSReadOnlyAccess` policy
* Confirmez que votre rôle dispose des autorisations `sqs:ListQueues` et `sqs:GetQueueAttributes`

[1]: /fr/data_streams/setup
[2]: /fr/integrations/amazon-web-services/
[3]: /fr/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /fr/monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}