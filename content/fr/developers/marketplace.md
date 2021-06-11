---
title: Marketplace
type: documentation
further_reading:
  - link: 'https://www.datadoghq.com/partner/'
    tag: Page des partenaires
    text: Réseau partenaire Datadog
  - link: 'https://www.datadoghq.com/blog/datadog-marketplace/'
    tag: blog
    text: Élargissez votre audience pour votre solution de surveillance avec le marketplace Datadog
---
Le marketplace numérique Datadog permet aux partenaires technologiques de Datadog de présenter leurs intégrations, logiciels et services aux utilisateurs Datadog. 

Pour accéder au Datadog Marketplace, vous devez d'abord rejoindre le parcours Technologie [du réseau partenaire Datadog][1]. En tant que partenaire de Datadog, vous pouvez développer une intégration et créer un carré répertoriant votre offre.

Les clients Datadog ont alors accès à votre carré via l'application Datadog, soit sur notre page [Integrations][2] soit sur le [marketplace Datadog][3]. La page Integrations inclut les intégrations conçues par Datadog et par ses partenaires technologiques, qui sont proposées gratuitement aux clients. À l'inverse, le marketplace est une plate-forme commerciale dédiée aux clients et aux partenaires Datadog leur permettant d'acheter et de vendre différentes solutions, notamment des intégrations, des logiciels et des services.

Pour développer et publier votre solution sur le marketplace, procédez comme suit : 

## Demander l'ouverture d'un compte sandbox

Tous les partenaires peuvent demander un compte Datadog sandbox dédié pour faciliter leur développement. Pour demander un compte sandbox, procédez comme suit :

1. Créez un [compte d'essai][4] Datadog gratuit en utilisant la même adresse e-mail que celle utilisée pour votre profil de partenaire technologique.
2. Connectez-vous au [portail des partenaires Datadog][5].
3. Sur votre page d'accueil personnelle, cliquez sur le bouton Learn More sous Sandbox Access.
4. Sélectionnez Request Sandbox Upgrade.

L'activation du mode sandbox pour votre compte peut prendre un à deux jours ouvrables. Si vous avez des questions, contactez [l'assistance Datadog][6].

## Développer votre intégration

### Ressources

Pour compléter cette documentation, vous pouvez vous informer sur le développement d'intégrations Datadog de différentes façons :

* Suivez notre formation à la demande sur les [intégrations Datadog][7] (en anglais) disponible dans le [centre d'apprentissage Datadog][8].
* Consultez notre exemple de pull request dans le [référentiel Marketplace][9]. Vous y trouverez des annotations ainsi que des conseils. Veuillez noter que ce lien est disponible uniquement pour les partenaires qui ont rempli le contrat d'inscription au marketplace sur le portail des partenaires Datadog.
* Explorez les intégrations existantes conçues par d'autres partenaires technologiques dans notre [référentiel Integrations Extras][10].
* Participez à nos heures de permanence dédiées au développement pour le marketplace via le [Slack public de Datadog][11].

### Processus de développement

1. [Choisissez le type d'offre marketplace que vous souhaitez proposer.](#1-choose-an-integration-type)
2. [Concevez une intégration bi-directionnelle.](#2-build-a-bi-directional-integration)
3. [Dupliquez le référentiel Integrations Extras ou Marketplace.](#3-clone-either-the-marketplace-or-the-integrations-extras-repository)
4. [Installez le kit de développement Datadog.](#4-install-and-run-the-datadog-development-toolkit)
5. [Ajoutez à l'architecture du carré des métadonnées et des ressources prêtes à l'emploi (comme des dashboards et des moniteurs).](#5-populate-the-tile-scaffolding)
6. [Envoyez une pull request.](#6-submit-a-pull-request)
7. [Approuvez la publication du carré.](#7-approve-tile-for-release)

### 1. Choisir un type d'intégration

Il existe plusieurs façons différentes de créer des intégrations Datadog. En fonction du cas d'utilisation et du type d'intégration, choisissez l'approche qui convient le mieux à votre offre.

#### [1. Intégration basée sur l'Agent Datadog][12]

##### [Check OpenMetrics][13]

* Un check OpenMetrics permet de recueillir des données de télémétrie à partir de données d'applications existantes qui exposent les métriques à l'aide de la norme OpenMetrics.

##### [Check Python][14]

* Un check Python permet de surveiller des services ou des produits qui n'exposent pas de métrique au format standard. Il sert à collecter des données de télémétrie à partir de divers outils de ligne de commande ou API.

##### [DogStatsD][15]

* DogStatsD peut être utilisé avec des applications qui émettent déjà des données de télémétrie à l'aide du protocole StatsD. Datadog ajoute des extensions Datadog supplémentaires au protocole StatsD, afin d'inclure notamment les éléments suivants :
    * Type de métrique histogram
    * Checks de service
    * Événements
    * Tags

#### [2. Intégration d'API REST Datadog][16]

Une intégration d'API est idéale pour enrichir et transmettre des données à partir de votre backend, ou pour extraire des données directement depuis Datadog. Les intégrations d'API permettent également de créer un connecteur entre Datadog et une autre plate-forme SaaS. 

**Remarque :** une clé d'API Datadog est requise pour transmettre des données à un endpoint d'API Datadog. À l'inverse, vous devez fournir une clé d'application pour interroger des données à partir de Datadog, ou pour créer des ressources dans l'application Datadog.

#### 3. Offre avec uniquement un carré

Pour les partenaires qui cherchent uniquement à proposer sur le marketplace des services ou un SaaS autonome, sans échange de données, seul un carré est nécessaire. Avec le kit de développement, vous pouvez utiliser la commande suivante pour créer une infrastructure composée uniquement d'un carré : `ddev create -t tile "<Nom de l'offre>"`.

### 2. Concevoir une intégration bi-directionnelle

Bien qu'il soit utile de récupérer des informations à partir de Datadog, pour être répertoriée sur la page des intégrations Datadog ou sur le marketplace, une intégration doit être bi-directionnelle. En d'autres termes, elle doit également transmettre des données à Datadog.

Les intégrations peuvent envoyer les données suivantes à Datadog :

1. [Métriques][17]
2. [Logs][16]
3. [Événements][18]
4. [Checks de service][19]
5. [Traces][20]
6. [Incidents][21]
7. [Événements de sécurité][22]

### 3. Dupliquer le référentiel Integrations Extras ou Marketplace

Les intégrations Datadog peuvent être développées pour notre [référentiel Marketplace][9] privé ou notre [référentiel Integrations Extras][10] open source. 

Le processus de conception d'intégration est identique pour chaque référentiel. Les offres du marketplace nécessitent néanmoins quelques fichiers et champs supplémentaires (pour la tarification, par exemple). N'oubliez pas de pointer vers le référentiel de votre choix lorsque vous procédez à la duplication et à l'envoi de votre pull request.

Les partenaires technologiques peuvent demander l'accès au référentiel Marketplace privé en envoyant un e-mail à l'adresse marketplace@datadog.com.

### 4. Installer et exécuter le kit de développement Datadog

La commande du kit de développement Datadog (`ddev`) permet de créer une architecture lors des premières étapes du développement de votre intégration. Elle génère un squelette de l'ensemble des ressources et des métadonnées pour votre carré.

Veillez à installer Python 3.8 ou une version ultérieure.  

Vous pouvez installer la dernière version publiée à partir du site [PyPI][23] :

`python -m pip install --upgrade "datadog-checks-dev[cli]`

Définissez l'emplacement du référentiel cloné :

#### Marketplace :

`ddev config set marketplace /chemin/vers/marketplace`

`ddev config set repo marketplace`

#### Integrations-Extras :

`ddev config set extras /chemin/vers/integrations-extras`

`ddev config set repo extras`

#### Offre avec uniquement un carré

Pour les services et logiciels autonomes, ou si votre intégration utilise l'API Datadog et ne contient pas de code Python, le kit de développement prend en charge une commande réservée aux offres uniquement composées d'un carré. 
`ddev create -t` 

#### Intégration complète

Pour créer l'architecture d'intégration complète, exécutez la commande ci-dessous : 

`ddev create <Nom de l'offre>`

### 5. Renseigner les informations de l'architecture du carré

Les commandes ddev de la section précédente génèrent un squelette des dossiers et fichiers qui composent les ressources de votre carré :

#### README.md

* Ajoutez les sections Overview, Setup et Support avec les titres H2 (## au format markdown).
* Le titre Overview doit décrire précisément l'utilité de votre offre pour les utilisateurs, et expliquer comment son utilisation avec Datadog permet de bénéficier d'une visibilité plus importante. Nous vous recommandons d'ajouter des images de votre logiciel ou de vos dashboards en action. Cette section s'affichera dans l'onglet Overview de votre carré.
* Le titre Setup doit indiquer clairement aux utilisateurs les étapes de configuration à suivre pour installer ou utiliser votre offre. Cette section s'affichera dans l'onglet Configuration de votre carré.
* Le titre Support doit préciser la personne à contacter pour toute demande d'assistance, et éventuellement une option permettant d'envoyer des commentaires sur le produit. Cette section s'affichera dans l'onglet Support de votre carré. 

#### images

* Stockez toutes les images utilisées dans votre fichier `README.md` dans le dossier `images`.

#### Manifest.json

* Objet JSON incluant des éléments pour `display_name`, `public_title`, `author`, etc.
* Vous trouverez plus d'informations sur les champs de `manifest.json` dans nos [références pour les ressources d'intégration][24].
* Le [fichier README du référentiel Marketplace][25] privé contient des informations détaillées sur l'objet de tarification.

#### Metadata.csv

* Contient la liste des métriques prêtes à l'emploi incluses dans une intégration, y compris le nom, le type, l'intervalle et l'unité de la métrique.
* Vous trouverez plus d'informations sur les champs de `metadata.csv` dans nos [références pour les ressources d'intégration][24].
* **Remarque :** toutes les métriques Marketplace sont considérées comme des métriques custom.

#### Dashboards et monitors

* Contient les dashboards et les monitors prêts à l'emploi (alertes) pour votre intégration. 
* Vous pouvez créer des dashboards et des monitors directement sur votre compte sandbox et les exporter en tant que fichiers JSON.
* Pour en savoir plus, consultez nos [meilleures pratiques pour la création de dashboards][26] (en anglais).

#### Logo

* Contient un SVG, que notre équipe DesignOps ajoute dans l'application Datadog pour les modes sombre et clair.
* **Remarque :** les partenaires technologiques sont responsables de l'obtention d'une licence pour les logos qu'ils soumettent.

#### Changelog.md

* Capture les notes et les informations de version, puis les affiche dans l'onglet Release Notes de votre carré. Ajoutez les notes de version dans l'ordre décroissant (dernière version en haut de la liste).

#### Fichiers supplémentaires pour le marketplace

* Les partenaires technologiques doivent fournir leur propre contrat de licence d'utilisateur final (CLUF) pour toutes leurs offres sur le marketplace.

### 6. Envoyer une pull request

Envoyez une pull request contenant les ressources de votre intégration sur le [référentiel Marketplace][9] ou [Integrations Extras][10]. 

Chaque référentiel exécute des tests automatiques pour vérifier que votre pull request convient. Vous pouvez exécuter ces tests localement avec la commande `ddev validate all`. Une fois que la PR a passé tous les checks, notre équipe d'ingénierie commencera à l'étudier, afin d'identifier ce qui empêche sa publication et d'émettre quelques suggestions et conseils.

Si vous avez besoin d'accéder à Azure DevOps pour le référentiel Marketplace, laissez un commentaire dans la PR pour que notre équipe d'ingénierie vous octroie l'accès. 

### 7. Approuver la publication du carré

Une fois le carré de la pull request approuvé par nos équipes d'ingénierie et de conception produit, il est activé pour votre compte sandbox. Cela vous permet de l'afficher et de vérifier son contenu dans le marketplace Datadog, afin d'y apporter d'éventuelles modifications avant son activation.

## Gérer les opportunités de mise sur le marché

Une fois qu'une intégration bi-directionnelle officielle est activée, les partenaires technologiques ont la possibilité de rencontrer l'équipe marketing dédiée aux partenaires Datadog pour établir une stratégie de mise sur le marché conjointe. Cette solution permet notamment de prévoir ce qui suit :

* L'ajout d'une citation de Datadog pour les communiqués de presse du partenaire
* La publication d'un article dans le [blog Monitor de Datadog][27]
* La participation d'un intervenant Datadog lors d'un webinaire du partenaire
* Le relais des publications sur les réseaux sociaux

## Contact

Si vous avez des questions, veuillez nous contacter à l'adresse techpartners@datadoghq.com.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/partner/
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/marketplace
[4]: https://www.datadoghq.com/free-datadog-trial/
[5]: https://partners.datadoghq.com/English/
[6]: /fr/help/
[7]: https://learn.datadoghq.com/course/view.php?id=38
[8]: https://learn.datadoghq.com/
[9]: https://github.com/DataDog/marketplace
[10]: https://github.com/DataDog/integrations-extras
[11]: https://chat.datadoghq.com/
[12]: /fr/developers/integrations/
[13]: /fr/developers/prometheus/
[14]: /fr/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[15]: /fr/developers/dogstatsd/?tab=hostagent
[16]: /fr/api/
[17]: /fr/api/latest/metrics/
[18]: /fr/api/latest/events/
[19]: /fr/api/latest/service-checks/
[20]: /fr/api/latest/tracing/
[21]: /fr/api/latest/incidents/
[22]: /fr/api/latest/security-monitoring/
[23]: https://pypi.org/project/datadog-checks-dev/
[24]: /fr/developers/integrations/check_references/#manifest-file
[25]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[26]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[27]: https://www.datadoghq.com/blog/