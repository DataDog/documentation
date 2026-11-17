---
description: Résolvez les problèmes courants de Synthetic Monitoring.
further_reading:
- link: /synthetics/
  tag: Documentation
  text: Gérez vos tests Synthetic
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurez un test de navigateur
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurez un test API
- link: /synthetics/private_locations/
  tag: Documentation
  text: Créez un emplacement privé
title: Dépannage de Synthetic Monitoring
---
## Présentation {#overview}

Utilisez cette page pour résoudre les problèmes courants liés à la configuration et au paramétrage de Datadog Synthetic Monitoring. Pour obtenir de l'aide supplémentaire, contactez [Datadog Support][1].

## Messages d'erreur courants {#common-error-messages}

Utilisez ce tableau pour trouver les étapes de dépannage pour les erreurs courantes.

| Message d'erreur                                  | Voir la section |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [Emplacements privés → Certificats](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [Tests API et de navigateur → Non autorisé](#api-and-browser-tests) |
| `Element not found`                            | [Exécution de test → Problèmes de sélection d'élément](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [Emplacements privés → Compatibilité du navigateur](?tab=common#requirements-for-browser-tests-running-on-private-location) |
| `Failed to load resource: ERR_INVALID_ARGUMENT` | [Emplacements privés → Problème Chrome 149](?tab=common#chrome-149-issue-on-private-locations) |


## Tests API {#api-tests}

### Les durées réseau varient {#network-timings-are-varied}

Si vous constatez un pic soudain ou une augmentation globale des [métriques de durée][2] de votre test API, cela indique généralement un goulot d'étranglement ou un retard dans la requête. Pour plus d'informations, consultez [Durées et variations des tests API][3].

## Tests de navigateur {#browser-tests}

### Enregistrement {#recording}

#### Le site web ne se charge pas dans l'iframe {#the-website-is-not-loading-in-the-iframe}

Si votre site web n'apparaît pas dans l'iframe de l'enregistreur de tests de navigateur après l'installation de l'[extension Datadog][4], vous pourriez voir le message `Your website does not support being loaded through an iframe`. Cela indique que les paramètres de sécurité de votre application, tels que la politique de sécurité du contenu (CSP) ou des en-têtes de sécurité associés comme `X-Frame-Options`, empêchent le chargement de l'iframe.

De même, si les tentatives de connexion échouent pendant l'enregistrement dans l'iframe, votre application peut bloquer certaines requêtes en raison de règles CSP ou d'autres configurations de sécurité. Dans certains cas, les échecs de connexion peuvent également être dus à un problème de jeton CSRF lorsque le flux de connexion provient d'une application web chargée dans une iframe, ce qui peut entraîner la perte du jeton CSRF.

**Solution** : Cliquez sur {{< ui >}}Open in Popup{{< /ui >}} pour enregistrer votre parcours utilisateur dans une fenêtre séparée au lieu de l'iframe.  

#### Seules certaines applications se chargent dans l'iframe {#only-certain-applications-load-in-the-iframe}

Différentes applications et environnements ont des configurations CSP et d'autres restrictions de sécurité variables. Certains permettent le chargement dans une iframe, tandis que d'autres le bloquent pour des raisons de sécurité.

**Solution** : Cliquez sur {{< ui >}}Open in Popup{{< /ui >}} pour enregistrer votre parcours utilisateur dans une fenêtre séparée au lieu de l'iframe.

#### Une bannière d'avertissement concernant les requêtes HTTP s'affiche dans l'iframe {#http-requests-warning-banner-appears-in-iframe}

Cet avertissement s'affiche lors d'une tentative d'enregistrement sur une page `http`. L'iframe de l'enregistreur ne prend en charge que les pages `https`.

**Solution** : Ouvrez votre page dans une fenêtre contextuelle ou modifiez votre URL pour utiliser `https`. 

#### Le site web ne se charge pas et l'enregistrement ne fonctionne pas dans l'iframe ou la fenêtre contextuelle {#website-fails-to-load-and-recording-doesnt-work-in-iframe-or-pop-up}

Si votre site web n'apparaît pas dans l'iframe de l'enregistreur de tests de navigateur après l'installation de l'[extension Datadog][4], et que l'enregistrement échoue aussi bien en mode iframe qu'en mode fenêtre contextuelle :

   {{< img src="synthetics/recording_iframe.mp4" alt="Problèmes lors de l'enregistrement des étapes d'un test de navigateur" video="true" width="100%" >}}

   **Solution** : Vérifiez que l'[extension Datadog][5] dispose des autorisations appropriées en spécifiant votre site web dans la section `On specific sites` ou en activant `On all sites` :

   {{< img src="synthetics/extension.mp4" alt="Autoriser l'extension à lire les données sur tous les sites" video="true" width="100%" >}}

#### L'enregistrement des étapes échoue sur l'application {#recording-steps-fails-on-application}

Les politiques du navigateur Chrome peuvent empêcher l'extension d'enregistrer correctement.

**Solution** : Vérifiez dans `chrome://policy` les paramètres liés à l'extension, tels que [`ExtensionSettings`][6], qui pourraient bloquer l'enregistreur.

#### Page de connexion non visible dans l'enregistreur {#login-page-not-visible-in-recorder}

L'iframe ou la fenêtre contextuelle de l'enregistreur utilise par défaut votre session de navigateur actuelle. Si vous êtes déjà connecté à votre application, la page de connexion peut être ignorée et vous pouvez accéder directement à la vue après connexion, ce qui vous empêche d'enregistrer les étapes d'authentification.

**Solution** : Utilisez {{< ui >}}incognito mode{{< /ui >}} de l'enregistreur pour enregistrer les étapes de connexion sans vous déconnecter de votre session actuelle :

{{< img src="synthetics/incognito_mode.mp4" alt="Utilisation des tests de navigateur en mode navigation privée" video="true" width="100%" >}}

{{< ui >}}Incognito mode{{< /ui >}} crée une session isolée qui ignore l'historique de votre navigateur, vos cookies et vos données de connexion. Cela vous permet d'enregistrer les étapes de connexion à partir de zéro, comme si vous visitiez votre site web pour la première fois.

### Résultats des tests {#test-results}

#### Les tests de navigateur sur mobile et tablette échouent systématiquement {#mobile-and-tablet-browser-tests-consistently-fail}

Les sites web **responsive** peuvent avoir des structures DOM très différentes selon les appareils. Le DOM d'un site web sur {{< ui >}}Laptop Large{{< /ui >}} peut différer considérablement des fenêtres d'affichage {{< ui >}}Tablet{{< /ui >}} ou {{< ui >}}Mobile Small{{< /ui >}}.

Les étapes enregistrées sur {{< ui >}}Laptop Large{{< /ui >}} peuvent ne pas fonctionner sur des fenêtres d'affichage plus petites, provoquant l'échec des tests sur mobile et tablette :

{{< img src="synthetics/device_failures.png" alt="Échec sur appareil mobile ou tablette" style="width:100%;" >}}

**Solution** : Créez des tests spécifiques à l'appareil où les étapes enregistrées correspondent à la fenêtre d'affichage cible.

Pour enregistrer pour des fenêtres d'affichage mobile ou tablette, sélectionnez {{< ui >}}Mobile Small{{< /ui >}} ou {{< ui >}}Tablet{{< /ui >}} dans le menu déroulant de l'enregistreur avant de cliquer sur {{< ui >}}Start Recording{{< /ui >}}.

{{< img src="synthetics/record_device.png" alt="Enregistrement des étapes sur mobile ou tablette" style="width:100%;" >}}

**Remarque** : Les tests de navigateur s'exécutent en mode **headless** et ne prennent pas en charge certaines fonctionnalités comme les événements `touch` permettant de détecter une conception adaptée aux mobiles.

#### Avertissement de détection d'élément dans les étapes de test de navigateur {#element-detection-warning-in-browser-test-steps}

Les étapes de test de navigateur peuvent afficher un avertissement `None or multiple elements detected` :

{{< img src="synthetics/step_warning.png" alt="Avertissement d'étape de localisateur utilisateur" style="width:100%;" >}}

Cela indique que le localisateur utilisateur cible plusieurs éléments ou aucun, empêchant le test de savoir avec quel élément interagir.

**Solution** : Modifiez votre enregistrement, ouvrez les options avancées de l'étape problématique, accédez à la page de test et cliquez sur {{< ui >}}Test{{< /ui >}}. Cela met en surbrillance l'élément localisé ou affiche une erreur. Ajustez votre localisateur utilisateur pour cibler un seul élément unique :

{{< img src="synthetics/fix_user_locator.mp4" alt="Correction de l'erreur du localisateur utilisateur" video="true" width="100%" >}}

#### Limitations de la propriété de pointeur CSS {#css-pointer-property-limitations}

Les navigateurs automatisés ne peuvent pas émuler la fonctionnalité média CSS `pointer`. Tous les tests de navigateur utilisent `pointer: none` quel que soit le type d'appareil (ordinateur portable, tablette ou mobile).

### Durée de la ressource {#resource-duration}

#### La durée de la ressource dépasse la durée de l'étape {#resource-duration-exceeds-step-duration}

Les ressources avec des temps de chargement longs peuvent s'étendre sur plusieurs étapes de test. Datadog renvoie toutes les ressources initiées au cours d'une étape spécifique, mais accorde environ 20 secondes aux appels réseau critiques pour se terminer avant de passer à l'étape suivante.

Le worker de tests synthétiques utilise des délais d'attente hiérarchiques pour équilibrer la vitesse et la fiabilité. Par conséquent, [la durée de l'étape][14] ne doit pas être utilisée pour mesurer les performances d'une application web : elle reflète le temps nécessaire à une exécution fiable du test.

## Tests d'API et de navigateur {#api-and-browser-tests}

### Erreurs « Unauthorized » {#unauthorized-errors}

Une erreur 401 dans les tests de Synthetic Monitoring indique généralement un échec d'authentification. Utilisez la même méthode d'authentification (en dehors de Datadog) que celle que vous utilisez habituellement pour l'endpoint et reproduisez-la dans la configuration de votre test Synthetic.

* Votre endpoint utilise-t-il une **authentification basée sur les en-têtes** ?
  * **Authentification de base** : spécifiez les identifiants associés dans le {{< ui >}}Advanced options{{< /ui >}} de votre [test HTTP][7] ou [test de navigateur][8].
  * **Authentification basée sur un jeton** : extrayez votre jeton avec un premier [test HTTP][7], créez une [variable globale][9] en effectuant le parsing de la réponse de ce premier test, et réinjectez cette variable dans un second [test HTTP][7] ou [test de navigateur][10] nécessitant le jeton d'authentification.
  * **Authentification basée sur une session** : ajoutez les en-têtes ou cookies requis dans le {{< ui >}}Advanced options{{< /ui >}} de votre [test HTTP][7] ou [test de navigateur][8].
  
* Votre endpoint utilise-t-il une **authentification par paramètre de requête** (comme l'ajout d'une clé d'API aux paramètres d'URL) ?

* Votre endpoint utilise-t-il une **authentification basée sur l'adresse IP** ? Si tel est le cas, autorisez les [plages d'adresses IP de Synthetic Monitoring][11] dans votre pare-feu ou vos paramètres de sécurité.

### Erreurs d'accès refusé {#forbidden-errors}

Une erreur `403 Forbidden` provenant d'un test Synthetic Monitoring signifie généralement que votre serveur Web ou votre pare-feu bloque le trafic Synthetic. Autorisez les [plages d'adresses IP de Synthetic Monitoring][11] et identifiez les requêtes Synthetic grâce à leur en-tête `user-agent` : `Datadog/Synthetics` pour les tests d'API, ou une valeur se terminant par `DatadogSynthetics` pour les tests de navigateur. Les tests Synthetic n'envoient plus l'en-tête `Sec-Datadog`, mettez donc à jour toute liste d'autorisation qui s'y fie. Pour d'autres identifiants, consultez [Identifier les bots Synthetic][18].

### Notifications manquantes {#missing-notifications}

Les tests Synthetic ne [renvoient pas de notification][12] par défaut. Si vous ajoutez des destinataires de notification (adresses e-mail ou identifiants Slack) après qu'une transition d'état s'est produite (comme un test passant en alerte ou se rétablissant), aucune notification n'est envoyée pour cette transition. Les notifications ne sont envoyées que pour les transitions ultérieures.

## Tests mobiles {#mobile-tests}

### Impossible de lancer un enregistrement sur appareil {#unable-to-launch-a-device-recording}

Les applications avec des contrôles de sécurité au démarrage (tels que la vérification du débogage USB) peuvent empêcher l'enregistrement. Téléversez une version de votre application sans ces contrôles de sécurité pour un enregistrement de test optimal. 

### Problèmes de fonctionnalité de l'application pendant l'enregistrement et l'exécution {#app-functionality-issues-during-recording-and-execution}

Les fonctionnalités de l'application iOS peuvent ne pas fonctionner correctement pendant l'enregistrement ou l'exécution en raison du processus de re-signature de l'application. Ce processus, nécessaire pour que l'appareil soit considéré comme fiable, peut supprimer des autorisations iOS essentielles (Contacts, Camera, Keychain, Photos, Health Kit, Home Kit, etc.).

**Solution** : utilisez des profils de provisionnement Ad Hoc ou Development lors de la distribution de votre application iOS pour limiter les problèmes liés aux autorisations et améliorer la compatibilité.

## Tests Network Path {#network-path-tests}

### Le Datadog Agent n'est pas répertorié comme option dans Locations & Agents {#datadog-agent-not-listed-as-an-option-in-locations-agents}

Si vous ne voyez pas le Datadog Agent répertorié comme option sélectionnable lors de la création d'un test, vérifiez que vous remplissez tous les prérequis et que vous avez terminé les étapes de configuration. Consultez [Configuration de l'Agent][16] pour plus d'informations.

### Les tests planifiés depuis le Datadog Agent ne s'exécutent pas selon le planning prévu {#scheduled-tests-from-the-datadog-agent-is-not-running-at-the-expected-schedule}

Dans les environnements volumineux ou à fort trafic, les tests planifiés peuvent ne pas s'exécuter aux intervalles prévus si le Datadog Agent ne dispose pas de suffisamment de workers pour gérer les exécutions simultanées. Pour optimiser les performances et maintenir un planning cohérent, [augmentez le nombre de workers][17] pour atteindre ou dépasser le nombre total de tests assignés à l'Agent.

### Résultats manquants des tests exécutés depuis le Datadog Agent {#missing-test-results-executed-from-the-datadog-agent}

Si vous ne voyez pas les résultats de test dans l'interface utilisateur Datadog, le Datadog Agent n'envoie pas les résultats au point de collecte Synthetics (https://http-synthetics.datadoghq.com), qui les traite. Vérifiez que le trafic réseau sortant du Datadog Agent vers ce point de collecte est autorisé.

Si le Datadog Agent s'exécute derrière un proxy, assurez-vous que le forwarder Synthetics est configuré pour envoyer le trafic via le proxy, par exemple :

```
synthetics: 
  collector: 
    enabled: true
synthetics.forwarder.dd_url: http://my-proxy.com:<proxy-port>
```
De plus, assurez-vous que le proxy lui-même est configuré pour autoriser le trafic réseau sortant vers le point de collecte Synthetics.

## Emplacements privés {#private-locations}

{{< tabs >}}
{{% tab "Commun" %}}

### La Private Location ne parvient pas à récupérer les tests en raison d'une erreur 403 {#private-location-unable-to-fetch-tests-due-to-403-error}

Une Private Location affiche cette erreur lorsqu'elle tente de récupérer des tests depuis Datadog :

```
Queue error - onFetchMessagesLongPolling - Got 403 in request - {"errors":["Expired/not yet valid signature"]}
Error: Got 403 in request - {"errors":["Expired/not yet valid signature"]}
    at Function.QueueError.fromHTTPError (dist/build/index.js:259354:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:258914:48)
```

**Cause** : le journal indique que la Private Location a réussi à atteindre le point de collecte Synthetics pour récupérer les tests, mais que la requête a échoué avec une réponse 403 de Datadog en raison d'un problème d'authentification. Plus précisément, la signature de la requête a été considérée comme expirée ou pas encore valide. La communication entre la Private Location et Datadog est sécurisée à l'aide de Datadog Signature v1 (basée sur le même processus de signature qu'[AWS Signature v4][105]), qui inclut un horodatage dans chaque requête afin de garantir l'authentification et l'intégrité. Si l'horloge système du serveur hébergeant la Private Location n'est pas synchronisée, l'horodatage peut se trouver en dehors de la fenêtre autorisée et la validation de la signature échoue.

**Solution** : assurez-vous que l'horloge du serveur hébergeant la Private Location est correctement synchronisée. Si des services NTP (Network Time Protocol) sont utilisés, vérifiez qu'ils sont correctement configurés et fonctionnent correctement, et corrigez toute mauvaise configuration susceptible d'empêcher l'horloge système de se synchroniser avec ses sources horaires.

### Les tests de navigateur affichent des erreurs `Page crashed` {#browser-tests-show-page-crashed-errors}

Les plantages de page indiquent généralement un épuisement des ressources sur les workers de l'emplacement privé. Assurez-vous que vos workers d'emplacement privé disposent de [ressources mémoire suffisantes][101].

### L'exécution des tests est plus lente que prévu {#test-execution-is-slower-than-expected}

Une exécution lente des tests indique généralement un épuisement des ressources sur les workers de l'emplacement privé. Assurez-vous que vos workers d'emplacement privé disposent de [ressources CPU suffisantes][103].

### Mes tests de navigateur prennent trop de temps à s'exécuter {#my-browser-tests-are-taking-too-long-to-run}

Vérifiez que vos déploiements d'emplacement privé ne présentent pas de [problèmes de mémoire insuffisante][102]. Si vous avez déjà essayé de mettre à l'échelle vos instances de workers en suivant les [directives de dimensionnement][101], contactez le [support Datadog][104].

### Exigences pour les tests de navigateur s'exécutant sur un emplacement privé {#requirements-for-browser-tests-running-on-private-location}

Les tests de navigateur nécessitent des privilèges élevés pour lancer (au démarrage de l'exécution du test) et arrêter (à la fin de l'exécution du test) le processus du navigateur. Si votre emplacement privé est configuré avec un contexte de sécurité qui restreint les privilèges élevés, l'emplacement privé émet des journaux d'erreur lorsque le test de navigateur est exécuté. Les journaux signalés varient en fonction du navigateur sélectionné pour l'exécution du test. Les tests exécutés sur Chrome/Edge signalent l'erreur suivante :

```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

**Erreur Firefox :**

```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### Configuration requise pour les tests ICMP exécutés sur l'emplacement privé {#requirements-for-icmp-tests-running-on-private-location}

Les tests ICMP utilisent la commande `ping` pour évaluer les routes réseau et la connectivité des hosts. La commande `ping` ouvre des sockets bruts pour envoyer des paquets ICMP et nécessite la capacité `NET_RAW`. Si le contexte de sécurité de votre conteneur supprime cette capacité, les tests ICMP ne fonctionnent pas correctement sur l'emplacement privé.

De plus, `ping` nécessite des privilèges élevés pour créer le socket brut. L'emplacement privé ne peut pas exécuter de tests ICMP si l'emplacement privé est configuré avec un contexte de sécurité qui restreint les privilèges élevés.

### `TIMEOUT` erreurs dans les tests d'API depuis des emplacements privés {#timeout-errors-in-api-tests-from-private-locations}

Les erreurs `TIMEOUT` indiquent généralement que votre emplacement privé ne peut pas atteindre l'endpoint du test. Vérifiez que l'emplacement privé est installé sur le même réseau que votre endpoint cible. Testez différents endpoints pour déterminer si le problème est spécifique à un endpoint ou s'il concerne l'ensemble du réseau.

{{< img src="synthetics/timeout.png" alt="Délai d'attente dépassé pour le test d'API sur l'emplacement privé" style="width:70%;" >}}

### Problème Chrome 149 sur les emplacements privés {#chrome-149-issue-on-private-locations}

La version 149 de Chrome a introduit une validation plus stricte des en-têtes de requête, ce qui peut entraîner l'échec des requêtes de sous-ressources avec `net::ERR_INVALID_ARGUMENT`. Les versions précédentes de Chrome étaient plus permissives.

**Solution** : mettez à niveau votre emplacement privé vers la [version 1.69.1 ou ultérieure][106] pour résoudre ce problème.

[101]: /fr/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /fr/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /fr/help/
[105]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[106]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "Docker" %}}

### Résolution des problèmes de transfert IPv4 pour les conteneurs d'emplacement privé {#resolving-ipv4-forwarding-issues-for-private-location-containers}

Les emplacements privés nécessitent un accès aux [endpoints d'ingestion de Synthetic Monitoring de Datadog][103] pour extraire les configurations de test et envoyer les résultats de test. Si le transfert IPv4 est désactivé sur un serveur Linux, l'emplacement privé peut perdre l'accès à Internet et, par conséquent, ne plus pouvoir se connecter aux endpoints d'ingestion. Docker tente généralement d'activer le transfert IP au démarrage d'un conteneur, mais si celui-ci reste désactivé, le conteneur ne peut pas accéder à des services externes tels que les endpoints d'ingestion. 

Si tel est le cas, l'emplacement privé signale ce qui suit :

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
et

```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**Solution** : Assurez-vous que `net.ipv4.ip_forward` est activé sur le host. 

### Exigences relatives au système de fichiers racine en lecture seule pour les conteneurs d'emplacement privé {#read-only-root-file-system-requirements-for-private-location-containers}

Les conteneurs d'emplacement privé ont besoin d'un accès en lecture-écriture à des dossiers et fichiers spécifiques pour un fonctionnement correct. Les systèmes de fichiers racine en lecture seule empêchent le démarrage en raison d'opérations critiques nécessitant un accès en écriture.

Au démarrage, les conteneurs attribuent des capacités Linux aux binaires dont les métadonnées ont été supprimées pendant le processus de build pour des raisons de sécurité. Cela restreint l'exécution à l'utilisateur `root` par défaut. Comme les emplacements privés s'exécutent en tant qu'utilisateur `dog`, les conteneurs doivent réappliquer les autorisations pour une exécution correcte. Les systèmes de fichiers en lecture seule empêchent ces mises à jour d'autorisations, provoquant des échecs de démarrage.

### Conteneurs d'emplacement privé arrêtés de force à la suite d'erreurs `OOM` {#private-location-containers-killed-by-oom-errors}

Les conteneurs d'emplacement privé arrêtés de force à la suite d'erreurs `Out Of Memory` indiquent un épuisement des ressources sur les workers. Assurez-vous que vos conteneurs d'emplacement privé disposent de [ressources mémoire suffisantes][101].

### `Invalid mount config` erreur lors de l'exécution d'emplacements privés {#invalid-mount-config-error-when-running-private-locations}

Cette erreur se produit lors de la tentative de montage d'un seul fichier dans des conteneurs basés sur Windows, ce qui n'est pas pris en charge. **Solution** : Assurez-vous que la source du montage de liaison est un répertoire local. Pour plus d'informations, consultez la documentation [Docker sur le montage de volumes][102].

[101]: /fr/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/fr/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Redémarrage du service Synthetics Private Location Worker {#restarting-synthetics-private-location-worker-service}

Assurez-vous que l'emplacement privé a été installé avec une configuration spécifiée lors de l'installation. Redémarrez le service à l'aide de la GUI ou de PowerShell.

#### Méthode GUI {#gui-method}

1. Recherchez {{< ui >}}Services{{< /ui >}} dans le menu {{< ui >}}Start{{< /ui >}}.
1. Ouvrez {{< ui >}}Services{{< /ui >}} (fonctionne sur n'importe quel compte utilisateur).
1. Trouvez `Datadog Synthetics Private Location` dans {{< ui >}}Services (Local){{< /ui >}}.
1. Faites un clic droit sur le service et sélectionnez {{< ui >}}Restart{{< /ui >}}.

Le worker s'exécute sous le compte {{< ui >}}Local Service{{< /ui >}}. Vérifiez-le en recherchant le processus `synthetics-pl-worker` dans l'onglet {{< ui >}}Details{{< /ui >}} de Task Manager.

#### Méthode PowerShell {#powershell-method}

1. Ouvrez {{< ui >}}Windows PowerShell{{< /ui >}} avec des droits d'exécution de script.
1. Exécutez : `Restart-Service -Name "Datadog Synthetics Private Location"`

### Maintien de la disponibilité de Synthetics Private Location Worker {#maintaining-synthetics-private-location-worker-uptime}

**Prérequis** : Connectez-vous à la machine avec les autorisations nécessaires pour créer des tâches planifiées.

**Récupération après plantage** : Créez une tâche planifiée Windows qui exécute un script PowerShell pour redémarrer le worker s'il cesse de fonctionner. Cela garantit une récupération automatique après les plantages.

**Démarrage automatique** : Si vous avez fourni un fichier de configuration lors de l'installation, le service Windows `Datadog Synthetics Private Location` démarre automatiquement. Vérifiez que le service est en cours d'exécution dans l'outil {{< ui >}}Services{{< /ui >}} — ce service gère les redémarrages automatiques.

### Erreurs de certificat auto-signé {#self-signed-certificate-errors}

Les emplacements privés Windows peuvent afficher cette erreur immédiatement après le démarrage :

```
Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain
    at Function.QueueError.fromHTTPError (dist/build/index.js:272629:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:272186:48)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at Worker.fetchMessagesLongPolling (dist/build/index.js:26244:24)
    at Worker.doOneLoop (dist/build/index.js:25810:45)
```

**Symptômes** :
- Les messages d'erreur se répètent continuellement dans les journaux.
- Les chaînes de certificats semblent modifiées lors de la navigation depuis le host Windows (par exemple, les sites Datadog affichent des intermédiaires auto-signés au lieu d'autorités de certification de confiance).

**Cause** : Cette erreur se produit lorsque votre trafic réseau fait l'objet d'une **inspection approfondie des paquets (DPI)** ou d'une inspection TLS. Le DPI intercepte, déchiffre et rechiffre le trafic SSL/TLS. Au cours de ce processus, l'emplacement privé reçoit une chaîne de certificats qui inclut un certificat auto-signé.  

**Solution** :

- Téléversez vos [certificats racine][101] auto-signés personnalisés vers votre emplacement privé.
- Vérifiez que les journaux de votre emplacement privé Windows ne signalent plus l'erreur.

```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

Sans contournement de l'inspection TLS, l'emplacement privé Windows ne peut pas récupérer les messages de test et reste dans un état d'erreur.

[101]: /fr/synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### Invites de mot de passe pour l'utilisateur sudo ou dog {#password-prompts-for-sudo-or-dog-user}

L'utilisateur de l'emplacement privé (`dog`) nécessite un accès `sudo` pour un fonctionnement correct. Cet utilisateur reçoit généralement des autorisations lors du lancement du conteneur. Vérifiez qu'aucune politique ne restreint l'accès `sudo` de l'utilisateur `dog` ou n'empêche le conteneur de s'exécuter en tant qu'utilisateur `dog` (UID 501).

De plus, les versions de Private Location `>v1.27` dépendent de l'appel système `clone3`. Les anciens environnements d'exécution de conteneurs (versions Docker <20.10.10) peuvent ne pas prendre en charge `clone3` dans leur politique `seccomp` par défaut. 

**Solution** : Assurez-vous que la politique `seccomp` de votre environnement d'exécution inclut `clone3` en mettant à jour la version de cet environnement, en ajoutant manuellement `clone3` à votre politique ou en utilisant une politique seccomp `unconfined`. Consultez la [documentation `seccomp` de Docker][13] pour plus de détails.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/synthetics/metrics/#api-tests
[3]: /fr/synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /fr/synthetics/api_tests/?tab=httptest#make-a-request
[8]: /fr/synthetics/browser_tests/#test-details
[9]: /fr/synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /fr/synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /fr/synthetics/api_tests/http_tests/?tab=requestoptions#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/
[14]: /fr/synthetics/guide/step-duration
[16]: /fr/synthetics/network_path_tests/#agent-configuration
[17]: /fr/network_monitoring/network_path/setup/?tab=linux#increase-the-number-of-workers
[18]: /fr/synthetics/guide/identify_synthetics_bots/