---
title: Marketplace
type: documentation
further_reading:
  - link: https://www.datadoghq.com/partner/
    tag: Page des partenaires
    text: Réseau partenaire Datadog
  - link: https://www.datadoghq.com/blog/datadog-marketplace/
    tag: blog
    text: Élargissez votre audience pour votre solution de surveillance avec le Marketplace Datadog
---
Le Marketplace numérique Datadog permet aux partenaires technologiques de Datadog de présenter leurs intégrations, logiciels et services aux utilisateurs Datadog. 

## Rejoindre le réseau partenaire Datadog
Pour accéder au Marketplace Datadog, vous devez d'abord rejoindre le parcours Technologie du [réseau partenaire Datadog][1]. En tant que partenaire technologique de Datadog, vous pouvez développer une intégration ou créer une offre avec uniquement un carré comprenant votre SaaS ou vos services.

Les clients Datadog ont alors accès à votre carré via le site Datadog, soit sur notre page [Integrations][2], soit sur le [Marketplace Datadog][3]. La page Integrations inclut les intégrations conçues par Datadog et par ses partenaires technologiques, qui sont proposées gratuitement aux clients. Le Marketplace est une plate-forme commerciale dédiée aux clients et aux partenaires technologiques Datadog leur permettant d'acheter et de vendre différentes solutions, notamment des intégrations, des logiciels et des services.

Pour développer et publier votre page d'intégration ou votre offre sur le Marketplace, procédez comme suit :

## Demander l'ouverture d'un compte sandbox

Tous les partenaires technologiques peuvent demander un compte Datadog sandbox dédié pour faciliter leur développement. Pour demander un compte sandbox, procédez comme suit :

1. Créez un [compte d'essai][4] Datadog gratuit en utilisant la même adresse e-mail que celle utilisée pour votre profil de partenaire technologique.
2. Connectez-vous au [portail des partenaires Datadog][5].
3. Sur votre page d'accueil personnelle, cliquez sur le bouton Learn More sous Sandbox Access.
4. Sélectionnez Request Sandbox Upgrade.

L'activation du mode sandbox pour votre compte peut prendre un à deux jours ouvrables. Si vous avez des questions, contactez [l'assistance Datadog][6].

## Développer votre intégration ou créer une offre avec uniquement un carré sur le Marketplace

### Ressources

Pour compléter cette documentation, vous pouvez vous informer sur le développement d'intégrations Datadog de différentes façons :

* Suivez la formation à la demande sur les [intégrations Datadog][7] (en anglais) disponible dans le [centre d'apprentissage Datadog][8].
* Consultez l'exemple de pull request dans le [référentiel Marketplace][9]. Vous y trouverez des annotations ainsi que des conseils. Veuillez noter que ce lien est disponible uniquement pour les partenaires technologiques qui ont rempli le contrat d'inscription au Marketplace sur le portail des partenaires Datadog.
* Explorez les intégrations existantes conçues par d'autres partenaires technologiques dans le [référentiel integrations-extras][10].
* Participez à nos heures de permanence dédiées au développement pour le Marketplace via le [Slack public de Datadog][11].

### Processus de développement

1. [Choisir le type d'offre Marketplace que vous souhaitez proposer](#choisir-un-type-d-integration-ou-une-offre-avec-uniquement-un-carre)
2. [Concevoir une intégration bi-directionnelle](#concevoir-une-integration-bi-directionnnelle)
3. [Dupliquer le référentiel Marketplace ou faire un fork du référentiel integrations-extras](#dupliquer-le-referentiel-marketplace-ou-faire-un-fork-du-referentiel-integrations-extras)
4. [Installer le kit de développement Datadog](#installer-et-executer-le-kit-de-developpement-datadog)
5. [Renseigner les informations de l'architecture du carré avec des métadonnées et des ressources prêtes à l'emploi (comme des dashboards et des monitors)](#renseigner-les-informations-de-l-architecture-du-carre)
6. [Envoyer une pull request](#envoyer-une-pull-request)
7. [Approuver la publication du carré](#approuver-la-publication-du-carre)

### Choisir un type d'intégration ou une offre avec uniquement un carré

Il existe plusieurs façons différentes d'ajouter sa solution aux intégrations Datadog ou aux pages du Marketplace. En fonction du cas d'utilisation, choisissez l'approche qui convient le mieux à votre offre.

#### [Intégration basée sur l'Agent Datadog][12]

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

#### [Intégration d'API REST Datadog][16]

Une intégration d'API est idéale pour enrichir et transmettre des données à partir de votre backend, ou pour extraire des données directement depuis Datadog. Les intégrations d'API permettent également de créer un connecteur entre Datadog et une autre plate-forme SaaS. 

**Remarque :** une clé d'API Datadog est requise pour transmettre des données à un endpoint d'API Datadog. À l'inverse, vous devez fournir une clé d'application pour interroger des données à partir de Datadog, ou pour créer des ressources dans le site Datadog.

#### Offre avec uniquement un carré

Pour les partenaires qui cherchent uniquement à proposer sur le Marketplace des services ou un SaaS autonome, sans échange de données, seul un carré est nécessaire. Avec le kit de développement, vous pouvez utiliser la commande suivante pour créer une infrastructure composée uniquement d'un carré : `ddev create -t tile "<Nom de l'offre>"`.

### Concevoir une intégration bi-directionnelle

Bien qu'il soit utile de récupérer des informations à partir de Datadog, une intégration doit être bi-directionnelle. En d'autres termes, elle doit également transmettre des données à Datadog.

Les intégrations peuvent envoyer les données suivantes à Datadog :

1. [Métriques][17]
2. [Logs][16]
3. [Événements][18]
4. [Checks de service][19]
5. [Traces][20]
6. [Incidents][21]
7. [Événements de sécurité][22]

**Remarque :** vous n'avez pas besoin de proposer une intégration bi-directionnelle pour les offres avec uniquement un carré sur le Marketplace, comme les licenses SaaS autonomes et les services professionnels.

### Dupliquer le référentiel Marketplace ou faire un fork du référentiel integrations-extras

Les intégrations Datadog peuvent être développées pour le [référentiel Marketplace][9] privé ou le [référentiel integrations-extras][10] open source.

Le processus de conception d'intégration est identique pour chaque référentiel. Les offres du Marketplace nécessitent néanmoins quelques fichiers et champs supplémentaires (pour la tarification, par exemple). N'oubliez pas de pointer vers le référentiel de votre choix lorsque vous procédez à la duplication et à l'envoi de votre pull request.

Les partenaires technologiques peuvent demander l'accès au référentiel Marketplace privé en envoyant un e-mail à l'adresse marketplace@datadog.com.

### Installer et exécuter le kit de développement Datadog

La commande du kit de développement Datadog (`ddev`) permet de créer une architecture lors des premières étapes du développement de votre intégration. Elle génère un squelette de l'ensemble des ressources et des métadonnées pour votre carré.

Veillez à installer [Python 3.8 ou une version ultérieure][23].    

Pour éviter tout conflit éventuel dans l'environnement, dans le répertoire où vous avez dupliqué le référentiel, créez un environnement virtuel en exécutant ce qui suit :

```
python3 -m pip install virtualenv --user
```

Installez la dernière version du kit de développement Datadog depuis [PyPI][24] en exécutant ce qui suit :

```
python -m pip install --upgrade "datadog-checks-dev[cli]"
```

**Remarque :** si vous utilisez le Z shell, vous aurez peut-être besoin d'ajouter des caractères d'échappement : 

```
python -m pip install --upgrade datadog-checks-dev\[cli\]
``` 

Définissez l'emplacement du référentiel cloné :

#### Marketplace

```
ddev config set marketplace /chemin/vers/répertoire_marketplace
ddev config set repo marketplace
```

#### `integrations-extras`

```
ddev config set extras /chemin/vers/répertoire_integrations-extras
ddev config set repo extras
```

#### Offre avec uniquement un carré

Pour les services et logiciels autonomes, ou si votre intégration utilise l'API Datadog et ne contient pas de code Python, le kit de développement prend en charge une commande réservée aux offres uniquement composées d'un carré.

Dans le répertoire `marketplace` ou `integrations-extras` que vous avez spécifié ci-dessus, exécutez ce qui suit : 

```
ddev create -t tile "<Nom de l'offre>"
```

#### Intégration complète

Pour générer une architecture d'intégration complète, à partir du répertoire `marketplace` ou `integrations-extras` spécifié ci-dessus, exécutez ce qui suit : 

```
ddev create "<Nom de l'offre>"
```

### Renseigner les informations de l'architecture du carré

Les commandes ddev de la section précédente génèrent un squelette des dossiers et fichiers qui composent les ressources de votre carré :

#### README

* Ajoutez les sections Overview, Setup et Support avec les titres H2 (## au format markdown).
* Le titre Overview doit décrire précisément l'utilité de votre offre pour les utilisateurs, et expliquer comment son utilisation avec Datadog permet de bénéficier d'une visibilité plus importante. Il est recommandé d'ajouter des images de votre logiciel ou de vos dashboards en cours d'utilisation. Cette section s'affiche dans l'onglet Overview de votre carré.
* Le titre Setup doit indiquer clairement aux utilisateurs les étapes de configuration à suivre pour installer ou utiliser votre offre. Cette section s'affiche dans l'onglet Configuration de votre carré.
* Le titre Support doit préciser la personne à contacter pour toute demande d'assistance, et éventuellement une option permettant d'envoyer des commentaires sur le produit. Cette section s'affiche dans l'onglet Support de votre carré. 

#### Images

* Stockez toutes les images utilisées dans votre fichier `README.md` dans le dossier `images`.
* **Remarque :** n'incluez pas d'espace dans le nom des fichiers d'image.

#### Manifeste

* Objet JSON incluant des éléments pour `display_name`, `public_title`, `author`, etc.
* Vous trouverez plus d'informations sur les champs de `manifest.json` dans les [références pour les ressources d'intégration][25].
* Le [fichier README du référentiel Marketplace][26] privé contient des informations détaillées sur l'objet de tarification.

#### Métadonnées

* Contient la liste des métriques prêtes à l'emploi incluses dans une intégration, y compris le nom, le type, l'intervalle et l'unité de la métrique. 
* Vous trouverez plus d'informations sur les champs de `metadata.csv` dans les [références pour les ressources d'intégration][25].
* **Remarque :** toutes les métriques Marketplace sont considérées comme des métriques custom.

#### Dashboards et monitors

* Contient les dashboards et les monitors prêts à l'emploi (alertes) pour votre intégration. 
* Vous pouvez créer des dashboards et des monitors directement sur votre compte sandbox et les exporter en tant que fichiers JSON.
* Pour en savoir plus, consultez les [meilleures pratiques pour la création de dashboards][27] (en anglais).

#### Logos

* Contient au moins un SVG, que l'équipe DesignOps Datadog ajoute sur le site Datadog pour les modes sombre et clair. Les fichiers SVG du logo peuvent être ajoutés au répertoire `assets`. Sinon, vous pouvez les placer dans un sous-répertoire `logos` dans `assets`.
* **Remarque :** les partenaires technologiques sont responsables de l'obtention d'une licence pour les logos qu'ils soumettent.

#### Changelog

* Contient les notes et les informations de version. Celles-ci sont affichées dans l'onglet Release Notes de votre carré. Ajoutez les notes de version dans l'ordre décroissant (dernière version en haut de la liste).

#### Propriétaires du code

* Se trouve dans le répertoire `.github` et définit les individus ou les équipes responsables du code dans le répertoire. Pour en savoir plus sur la syntaxe, consultez la section [À propos des propriétaires de code][28] (en anglais) de la documentation GitHub.

#### Fichiers supplémentaires pour le Marketplace

* Les partenaires technologiques doivent fournir leur propre contrat de licence d'utilisateur final (CLUF) pour toutes leurs offres sur le Marketplace.

### Envoyer une pull request

Envoyez une pull request contenant les ressources de votre intégration sur le [référentiel Marketplace][9] ou [Integrations Extras][10]. 

Chaque référentiel exécute des tests automatiques pour vérifier que votre pull request est adéquate. Vous pouvez exécuter ces tests localement avec la commande `ddev validate all`. Une fois que la PR a passé tous les checks, l'équipe d'ingénierie Datadog commence à l'étudier, afin d'identifier d'éventuels éléments susceptibles d'empêcher sa publication, et émet quelques suggestions et conseils.

Si vous avez besoin d'accéder à Azure DevOps pour le référentiel Marketplace, laissez un commentaire dans la PR pour demander un tel accès.

### Approuver la publication du carré

Une fois votre pull request approuvée par les équipes d'ingénierie et de conception produit Datadog, le carré est activé pour votre compte sandbox. Cela vous permet de l'afficher et de vérifier son contenu dans le Marketplace Datadog, afin d'y apporter d'éventuelles modifications avant sa publication.

## Gérer les opportunités de mise sur le marché

Une fois qu'un carré du Marketplace est publié, les partenaires technologiques ont la possibilité de rencontrer l'équipe marketing dédiée aux partenaires Datadog pour établir une stratégie de mise sur le marché conjointe. Cette solution permet notamment de prévoir ce qui suit :

* L'ajout d'une citation de Datadog pour les communiqués de presse du partenaire
* La publication d'un article sur le [blog de Datadog][29]
* La participation d'un intervenant Datadog lors d'un webinaire du partenaire
* Le relais des publications sur les réseaux sociaux

## Contact

Si vous avez des questions, envoyez un e-mail à l'adresse techpartners@datadoghq.com.

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
[13]: /fr/developers/custom_checks/prometheus/
[14]: /fr/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[15]: /fr/developers/dogstatsd/?tab=hostagent
[16]: /fr/api/latest/logs/
[17]: /fr/api/latest/metrics/
[18]: /fr/api/latest/events/
[19]: /fr/api/latest/service-checks/
[20]: /fr/api/latest/tracing/
[21]: /fr/api/latest/incidents/
[22]: /fr/api/latest/security-monitoring/
[23]: https://www.python.org/downloads/
[24]: https://pypi.org/project/datadog-checks-dev/
[25]: /fr/developers/integrations/check_references/#manifest-file
[26]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[27]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[28]: https://help.github.com/articles/about-codeowners/
[29]: https://www.datadoghq.com/blog/