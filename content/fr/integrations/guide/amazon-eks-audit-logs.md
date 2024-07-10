---

title: Collecte de logs d'audit Amazon EKS
---

## Présentation

Les logs d'audit Amazon EKS fournissent aux administrateurs de cluster des informations exploitables sur les opérations d'un cluster EKS. Après avoir activé la collecte de logs d'audit Amazon EKS, vous pouvez configurer et utiliser la solution [Cloud SIEM de Datadog][1] afin de surveiller en temps réel les actions non justifiées ou les menaces immédiates dans votre cluster EKS.

## Configuration

### Logs d'audit Amazon EKS

#### Nouveau cluster

1. Si vous ne disposez pas d'un cluster Amazon EKS, suivez les instructions de la section [Création d'un cluster Amazon EKS][2] pour créer votre cluster.
1. Lors de la configuration, sur la page dédiée aux logs, activez **Audit logs**.

#### Cluster existant

1. Si vous avez déjà configuré un cluster Amazon EKS, accédez-y depuis la [console Amazon EKS][2].
1. Cliquez sur votre cluster EKS.
1. Cliquez sur l'onglet **Logging**.
1. Cliquez sur le bouton **Manage logging**.
1. Définissez l'option **Audit** sur **Enabled** et cliquez sur le bouton **Save changes**.

### Intégration Datadog/AWS

Configurez ensuite l'intégration AWS en vous référant à la [documentation dédiée][3].

### Forwarder Datadog

Une fois la configuration de l'intégration AWS terminée, installez et configurez le Forwarder Datadog en vous référant à la section [Forwarder Datadog][4].

**Remarque** : vous devez fournir un ARN Lambda lors de la [configuration des déclencheurs][5]. Pour consulter votre ARN Lambda, accédez à [Lambda > Functions > `Nom_Fonction`][6] dans la console AWS. L'ARN de la fonction est indiqué dans la vue d'ensemble de la fonction.

## Log Explorer

Une fois la configuration des logs d'audit Amazon EKS, de l'intégration Datadog/AWS et du Forwarder Datadog terminée, vous pouvez visualiser vos logs d'audit depuis le [Log Explorer Datadog][7].

**Remarque** : quelques secondes peuvent s'écouler avant que les logs apparaissent dans le Log Explorer.

Pour afficher uniquement dans le Log Explorer les logs d'audit EKS, utilisez la requête de recherche `source:kubernetes.aduit`. Vous pouvez également sélectionner la facette `kubernetes.audit` depuis la section **Source** du volet des facettes pour appliquer un filtre basé sur les logs d'audit EKS.

## Cloud SIEM

La solution Cloud SIEM de Datadog vous permet de détecter les problèmes de configuration potentiels et les attaques ciblant vos clusters EKS.

Pour commencer à surveiller vos logs d'audit Amazon EKS avec Cloud SIEM, commencez par configurer Cloud SIEM. Créez ensuite une [règle de détection des logs][8] personnalisée qui génère un [signal de sécurité][9] dans le [Security Signals Explorer][10] chaque fois que la solution détecte un problème de configuration ou une menace.

### Configuration

Pour configurer Cloud SIEM, suivez les [instructions dans l'application][1].

Vous pouvez ensuite créer de toute pièce une règle Cloud SIEM ou exporter une requête du Log Explorer afin de l'utiliser pour une règle.

### Consulter les règles Security Monitoring

Consultez les [règles de détection Cloud SIEM][11] prêtes à l'emploi vous permettant de détecter les menaces dans votre environnement. Pour découvrir comment rechercher, modifier et dupliquer ces règles, consultez la rubrique [Créer et gérer des règles][12].

### Créer une règle Cloud SIEM

Pour créer une règle, accédez à la page [Rule Setup and Configuration][13] dans l'application. Vous pouvez vous référer à la section [Règles de détection des logs][14] pour en savoir plus sur la configuration des règles.

### Exporter une requête du Log Explorer afin de créer une règle

1. Accédez au Log Explorer, puis saisissez une requête dans la barre de recherche. Par exemple, vous pouvez appliquer un filtre basé sur `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`.
1. Cliquez sur le bouton **Export**, puis sélectionnez **Export to detection rule**.
1. Cette fonctionnalité exporte votre requête et l'utilise durant la deuxième étape de configuration de votre règle de détection des logs. Choisissez une méthode de détection (pour cet exemple, **New Value**). Sélectionnez l'attribut `@usr.name` dans la liste déroulante Detect new value. Cette règle génère une alerte lorsqu'un utilisateur exécute pour la première fois la commande exec dans un pod. Si cet utilisateur exécute une nouvelle fois cette commande, aucune alerte n'est envoyée. Si vous souhaitez plutôt être informé lorsque ces événements dépassent un seuil de votre choix, utilisez la méthode de détection **Threshold**.
1. Consultez la section [Règles de détection des logs][14] pour découvrir comment terminer la configuration de votre règle.

[1]: /fr/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /fr/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /fr/logs/guide/forwarder/
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /fr/security/cloud_siem/log_detection_rules/
[9]: /fr/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /fr/security/default_rules/#cat-cloud-siem
[12]: /fr/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /fr/security/cloud_siem/log_detection_rules/?tab=threshold#choose-a-detection-method