---
aliases:
- /fr/security/application_security/software_composition_analysis/setup/
- /fr/security/application_security/software_composition_analysis/
- /fr/code_analysis/software_composition_analysis/
- /fr/security/application_security/vulnerability_management/
disable_toc: false
further_reading:
- link: /security/code_security/software_composition_analysis/setup_static/
  tag: Documentation
  text: Configurer l'analyse SCA statique
- link: /security/code_security/software_composition_analysis/setup_runtime/
  tag: Documentation
  text: Configurer l'analyse SCA au moment de l'exécution
- link: /security/code_security/software_composition_analysis/library_inventory
  tag: Documentation
  text: Inventaire des bibliothèques
- link: /security/code_security/software_composition_analysis/cve_explorer
  tag: Documentation
  text: CVE Explorer
- link: /pr_gates/
  tag: Documentation
  text: PR Gates
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: Blog
  text: Adoptez une approche plus intelligente de la remédiation des vulnérabilités
    avec Datadog
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: Blog
  text: Corrigez plus rapidement les vulnérabilités transitives avec Datadog Software
    Composition Analysis
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: Blog
  text: Principaux enseignements de l'étude 2026 sur l'état du DevSecOps
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Sécurité CI/CD : comment sécuriser votre écosystème GitHub'
title: Software Composition Analysis
---
## Présentation {#overview}

Software Composition Analysis (SCA) détecte les bibliothèques open source à la fois dans vos dépôts et dans vos services en cours d'exécution, offrant une visibilité de bout en bout sur les vulnérabilités des bibliothèques et la gestion des licences, du développement à la production.

L'utilisation de Software Composition Analysis offre aux organisations les avantages suivants :
- Identification des vulnérabilités émergentes et connues affectant les bibliothèques open source
- Priorisation et remédiation basées sur les risques grâce à la détection des vulnérabilités au moment de l'exécution
- Identification des paquets malveillants, des bibliothèques en fin de vie et des risques liés aux bibliothèques selon les normes OpenSSF
- Exportation d'une nomenclature logicielle (SBOM) des bibliothèques détectées au format CycloneDX 1.6 ou SPDX 2.3

## Fonctionnement {#how-it-works}

Le SCA prend en charge deux modes de détection complémentaires :
- **La détection statique** analyse les dépôts en examinant les fichiers de dépendances (fichiers de verrouillage et manifestes). Par défaut, les analyses s'exécutent lorsqu'un commit met à jour un manifeste ou un fichier de verrouillage de dépendance pris en charge dans un dépôt activé. Vous pouvez également exécuter le SCA dans votre pipeline CI/CD (les jobs CI sont pris en charge pour les événements `push`). Consultez [Configurer l'analyse SCA statique][1] pour commencer.
- **La détection au moment de l'exécution** identifie les bibliothèques chargées et utilisées par vos services lors de l'exécution à l'aide de l'instrumentation de Datadog APM. Consultez [Configurer l'analyse SCA au moment de l'exécution][2] pour commencer.

Lorsque Datadog ingère un nouvel avis, il est comparé à votre dernier inventaire de bibliothèques connu et apparaît dans le Vulnerabilities Explorer même si vous n'avez pas relancé l'analyse du dépôt. Le Repositories Explorer est limité au commit et reflète ce qui était connu au moment de l'exécution de l'analyse ; ainsi, une analyse exécutée avant que Datadog n'ingère l'avis n'affichera pas cet avis nouvellement publié dans le Repositories Explorer pour ce commit. Consultez [Comprendre les vues SCA](#understanding-sca-views) pour plus de détails.

## Base de données des vulnérabilités {#vulnerability-database}

Datadog SCA s'appuie sur de multiples sources publiques et privées pour constituer une base de données propriétaire organisée. Ces sources incluent la [National Vulnerability Database (NVD)][21], la [GitHub Advisory Database][22], [osv.dev][23], des avis spécifiques aux écosystèmes tels que la [PyPA's Advisory Database][24] et la [Global Security Database][25], [Datadog GuardDog][26], ainsi que la recherche en sécurité de Datadog.

Datadog utilise ces sources pour identifier les vulnérabilités connues, les paquets malveillants et les menaces émergentes sur la chaîne d'approvisionnement dans les écosystèmes pris en charge. Il y a un délai maximum d'une heure entre la publication d'une nouvelle vulnérabilité et son apparition dans Datadog, les vulnérabilités émergentes apparaissant généralement dans Datadog en quelques minutes. Les paquets malveillants sont signalés dans Datadog sous 6 heures.

## Sources d'exploits publics {#public-exploit-sources}

Datadog identifie si une vulnérabilité possède un exploit public connu en agrégeant des données provenant de multiples sources publiques, notamment CISA (Known Exploited Vulnerabilities Catalog), Exploit-DB, NIST (National Vulnerability Database) et GitHub (références d'exploits publics).

Lorsque Datadog identifie un exploit public pour une vulnérabilité provenant de l'une de ces sources, il marque la découverte pour vous aider à prioriser la remédiation.

## Fonctionnalités clés {#key-capabilities}

### Examiner et hiérarchiser les vulnérabilités {#review-and-prioritize-vulnerabilities}

Le [Vulnerabilities Explorer][11] fournit une vue centrée sur les vulnérabilités des bibliothèques détectées par SCA, parallèlement aux vulnérabilités détectées par d'autres capacités de Code Security (SAST, IAST, Secrets Scanning et IaC). Toutes les vulnérabilités présentes dans l'Explorer sont soit détectées sur la branche par défaut lors du dernier commit d'un dépôt analysé, soit affectent un service en cours d'exécution.

#### Datadog Severity Score {#datadog-severity-score}

Pour aider à prioriser la remédiation, Datadog modifie le score CVSS de base en **Datadog Severity Score** en intégrant le contexte d'exécution et les signaux d'exploitabilité. Ces facteurs aident à distinguer le risque théorique des vulnérabilités les plus susceptibles d'être exploitées dans des environnements réels. Le tableau ci-dessous décrit comment chaque facteur influence le score final.

| Facteur de risque                       | Comment il est évalué                                                  | Impact sur le score                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| Score CVSS de base                   | Score CVSS publié pour la vulnérabilité.                          | Point de départ pour le score de gravité.                 |
| Accessibilité                      | Indique si la fonction vulnérable est référencée dans le code source (détectée statiquement au niveau du dépôt). | Augmenté lorsque la fonction vulnérable est trouvée comme étant accessible dans le code. |
| Contexte d'exécution en production        | Indique si le service affecté s'exécute dans un environnement de production. | Diminué si le service n'est pas exécuté en production. |
| Sous attaque                      | Preuve d'une activité d'attaque active ciblant le service.            | Diminué si aucune activité d'attaque n'est observée.     |
| Disponibilité d'exploits              | Disponibilité d'exploits publics pour la vulnérabilité.               | Diminué si aucun exploit n'est disponible.                  |
| Probabilité d'exploitation (EPSS) | Probabilité d'exploitation réelle basée sur les données EPSS.            | Diminué lorsque la probabilité d'exploitation est faible. |

#### Afficher les détails de la vulnérabilité {#view-vulnerability-details}

Cliquez sur une vulnérabilité dans le Vulnerabilities Explorer pour ouvrir son panneau latéral.

##### Dépôts {#repositories}

La section {{< ui >}}Repositories{{< /ui >}} répertorie les fichiers et les dépôts où Static SCA a détecté la vulnérabilité de la bibliothèque. Pour chaque découverte, elle affiche les services et équipes associés, le statut de la découverte et les actions de tri. Développez une ligne pour voir sa répartition par gravité et, lorsqu'ils sont disponibles, les emplacements accessibles.

##### Services impactés {#impacted-services}

La section {{< ui >}}Impacted services{{< /ui >}} répertorie les services où Runtime SCA a détecté la vulnérabilité de la bibliothèque. Pour chaque service, il affiche les environnements, les détails des dépendances, l'accessibilité, les équipes associées, le statut de la découverte et la date de la dernière détection par Datadog.

##### Infrastructure impactée {#impacted-infrastructure}

Lorsque Runtime SCA détecte des services impactés, la section {{< ui >}}Impacted Infrastructure{{< /ui >}} répertorie les hosts où la version de la bibliothèque affectée est exécutée. Elle affiche également les services associés, les environnements et l'heure du dernier déploiement.

Pour examiner l'infrastructure affectée :

1. Examinez les hosts, services, environnements et l'heure du dernier déploiement affectés.
1. Sélectionnez {{< ui >}}View Host{{< /ui >}} pour examiner un host.
1. Sélectionnez {{< ui >}}View Vulnerabilities in Cloud Security{{< /ui >}} pour examiner les vulnérabilités ouvertes du host.

### Afficher les découvertes par dépôt {#view-findings-by-repository}

Le [Repositories Explorer][12] fournit une vue centrée sur les dépôts de tous les résultats d'analyse pour Static Code Analysis (SAST), Software Composition Analysis (SCA), Secrets Scanning et Infrastructure as Code (IaC). Cliquez sur un dépôt pour analyser les résultats {{< ui >}}Library Vulnerabilities{{< /ui >}} et {{< ui >}}Library Catalog{{< /ui >}} de SCA limités à la branche et au commit que vous avez choisis.
* L'onglet {{< ui >}}Library Vulnerabilities{{< /ui >}} contient les versions de bibliothèques vulnérables trouvées par Datadog SCA
* L'onglet {{< ui >}}Library Catalog{{< /ui >}} contient toutes les bibliothèques (vulnérables ou non) trouvées par Datadog SCA.

Les étapes recommandées pour remédier aux vulnérabilités détectées se trouvent dans le panneau latéral de chaque vulnérabilité dans SCA. Des étapes sont fournies pour mettre à niveau la bibliothèque vers la version la plus sûre (non vulnérable), ainsi que vers la version la plus proche.

Pour filtrer vos résultats, utilisez les facettes à gauche de la liste ou la barre de recherche en haut. Les résultats peuvent être filtrés par facettes de service ou d'équipe. Pour plus d'informations sur la façon dont les résultats sont liés aux services et aux équipes Datadog, consultez [Lier les résultats aux services et aux équipes Datadog][18].

Chaque ligne représente une combinaison unique de bibliothèque et de version. Chaque combinaison est associée au commit et à la branche spécifiques sélectionnés dans les filtres en haut de la page (par défaut, le dernier commit sur la branche par défaut du dépôt que vous avez sélectionné).

Cliquez sur une bibliothèque présentant une vulnérabilité pour ouvrir un panneau latéral contenant des informations sur les étapes de remédiation.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Panneau latéral pour une violation SCA" style="width:80%;">}} -->

### Remédiation {#remediation}

Datadog SCA prend en charge l'utilisation d'agents de codage et de [Bits Code][31] pour appliquer des correctifs aux bibliothèques vulnérables. Vous pouvez également utiliser [Bits Code Automation][32] pour générer automatiquement des correctifs pour les vulnérabilités au fur et à mesure qu'elles sont détectées ou selon un planning.

<div class="alert alert-info">Les remédiations SCA dans Bits Code nécessitent un accès à Internet pour appliquer les mises à niveau des bibliothèques. Pour configurer l'accès à Internet, consultez <a href="/bits_ai/bits_code/setup/#configure-internet-access">Configurer l'accès à Internet</a>.</div>

Pour afficher et remédier aux vulnérabilités :

1. Dans Datadog, accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}][11], puis sélectionnez {{< ui >}}Libraries (SCA){{< /ui >}}.
2. Sélectionnez une vulnérabilité pour ouvrir un panneau latéral affichant des détails sur le résultat et sur la bibliothèque affectée.
3. Dans la section {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}}, cliquez sur {{< ui >}}Remediate with AI{{< /ui >}}
4. Sélectionnez Bits Code ou un autre agent de codage. Avec Bits Code, vous pouvez choisir entre :
   - [{{< ui >}}Single fix{{< /ui >}}](#single-fix) : Génère un correctif pour cette bibliothèque vulnérable
     - Si un correctif a déjà été généré, sélectionnez {{< ui >}}View fix and create PR{{< /ui >}} pour afficher la [session de remédiation](#remediation-session-details) existante.
   - [{{< ui >}}Create automation{{< /ui >}}](#create-automation) : Ouvre une fenêtre modale où vous pouvez créer une [Bits Code automation][32]

#### Single fix {#single-fix}

Utilisez **Single fix** pour ouvrir une session Bits Code afin de corriger cette vulnérabilité unique. Vous pouvez examiner le diff proposé, poser des questions complémentaires, modifier le correctif et créer une pull request pour appliquer la remédiation à votre dépôt de code source.

Affichez toutes les sessions Bits Code sur {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][33].

#### Create automation {#create-automation}

Utilisez **Create automation** pour créer une [Bits Code automation][32] afin de générer automatiquement des correctifs pour les vulnérabilités SCA, soit au moment de leur détection, soit selon un planning.

La sélection de cette option ouvre une fenêtre modale {{< ui >}}Automate with Bits{{< /ui >}} avec l'action {{< ui >}}Remediate SCA vulnerabilities{{< /ui >}} pré-remplie. Remplissez le formulaire, notamment en spécifiant un déclencheur et une sortie, puis cliquez sur {{< ui >}}Create Automation{{< /ui >}}. Consultez [Automations][32] pour en savoir plus sur les actions, les déclencheurs et les sorties.

Affichez toutes les automatisations Bits Code sur {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][34].

#### Détails de la session de remédiation {#remediation-session-details}

Chaque session Bits Code montre le cycle de vie d'un correctif généré par IA afin que vous puissiez examiner et valider les modifications avant la fusion. Elle inclut :

- La découverte de sécurité originale et la modification de code proposée
- Une explication de comment et pourquoi Bits Code a généré le correctif
- Les résultats CI (si activés) pour valider que le correctif est sûr à déployer
- Options pour affiner le correctif ou {{< ui >}}Create PR{{< /ui >}} pour appliquer les modifications à votre dépôt de code source

Vous pouvez également afficher toutes les sessions de remédiation sur [**Sessions**][33].

#### Fix with Cursor {#fix-with-cursor}
Au lieu de Bits Code, vous pouvez générer un correctif avec un agent de codage IA tel que Cursor :

1. Dans la boîte de dialogue {{< ui >}}Remediate with AI{{< /ui >}}, sélectionnez l'onglet {{< ui >}}Coding agent{{< /ui >}}.
2. Sous {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, cliquez sur {{< ui >}}Open{{< /ui >}} à côté de {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog ouvre Cursor avec une invite personnalisée qui inclut la mise à niveau de bibliothèque recommandée pour la vulnérabilité.

Pour utiliser un agent différent, cliquez sur {{< ui >}}Copy{{< /ui >}} à côté de {{< ui >}}Copy fix prompt{{< /ui >}} et collez l'invite dans l'agent de votre choix.

Vous pouvez démarrer ce flux depuis la section {{< ui >}}Remediation{{< /ui >}} du panneau latéral d'une vulnérabilité, ou depuis le tableau {{< ui >}}Repositories{{< /ui >}}. Chaque ligne du tableau représente un dépôt ou un fichier contenant la bibliothèque vulnérable.

Pour gérer le lien profond Cursor, installez l'extension [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/software_composition_analysis/fix-with-cursor.png" alt="La boîte de dialogue Remediate with AI avec l'onglet Coding agent sélectionné, affichant les options Fix with Cursor et Copy fix prompt" style="width:100%;" >}}

### Bloquez automatiquement les modifications risquées avec PR Gates {#automatically-block-risky-changes-with-pr-gates}

Utilisez [PR Gates][16] pour appliquer des normes de sécurité aux bibliothèques open source avant que les modifications ne soient fusionnées. Datadog analyse les dépendances introduites dans chaque pull request, identifie les vulnérabilités ou les violations de licence qui dépassent votre seuil de gravité configuré, et signale un statut de réussite ou d'échec à GitHub ou Azure DevOps.

Vous pouvez configurer PR Gates pour bloquer sur :
- **Vulnérabilités de sécurité** : bibliothèques avec des CVE connus au-dessus d'un seuil de gravité configuré.
- **Violations de licence** : bibliothèques utilisant des licences non conformes à la politique de votre organisation.

PR Gates marque un check de PR comme échoué uniquement si le développeur introduit une nouvelle violation dans cette PR. Les violations qui existaient déjà dans la base de code avant la création de la branche de PR ne provoquent pas l'échec du check. Par défaut, les checks échoués sont informatifs et ne bloquent pas la fusion, mais vous pouvez les configurer comme bloquants dans GitHub ou Azure DevOps pour empêcher les fusions lorsque des problèmes critiques sont détectés. Pour les instructions de configuration, consultez [Set up PR Gate Rules][17].

### Gérez l'inventaire des bibliothèques {#manage-your-library-inventory}

Le [Library Inventory][8] offre une visibilité sur les bibliothèques tierces détectées dans votre base de code. Datadog collecte ces informations à partir de :

* **SCA statique**, qui identifie toutes les bibliothèques référencées dans vos dépôts, et
* **SCA dynamique**, qui détecte les bibliothèques réellement chargées et utilisées par vos services lors de l'exécution.

Utilisez l'inventaire des bibliothèques pour identifier les dépendances que vous utilisez, déterminer où elles sont employées et vérifier si elles présentent des vulnérabilités connues ou des risques liés aux licences.

Pour en savoir plus sur la façon dont l'inventaire est généré, sur la différence entre les données statiques et d'exécution, et sur la façon d'interpréter les détails de la bibliothèque (utilisation, vulnérabilités, licences, versions et score OpenSSF), consultez [Library Inventory][14].

### Exporter une nomenclature logicielle (SBOM) {#export-a-software-bill-of-materials}

Exportez une SBOM de vos bibliothèques tierces directement depuis le [Library Inventory][8]. La SBOM exportée inclut les bibliothèques détectées à la fois statiquement (avec Static SCA) et lors de l'exécution (avec Runtime SCA), vous offrant une vue unique et complète de votre chaîne d'approvisionnement logicielle.

Datadog prend en charge les formats SBOM suivants :

- **CycloneDX 1.6**
- **SPDX 2.3**

Utilisez la SBOM exportée pour partager des données de dépendance avec les consommateurs en aval, satisfaire aux exigences de conformité et réglementaires, ou alimenter d'autres outils de chaîne d'approvisionnement.

Pour plus de détails sur la façon de générer et de télécharger une SBOM, consultez [Library Inventory][29].

### Explorer le catalogue complet des CVE {#explore-the-full-cve-catalog}

Utilisez l'[CVE Explorer][15] pour rechercher toutes les CVE et tous les avis de sécurité suivis par Datadog, y compris ceux qui n'affectent pas votre environnement. Cela vous aide à évaluer l'exposition aux vulnérabilités nouvellement publiées avant qu'elles n'apparaissent dans vos résultats.

Pour les CVE qui affectent les paquets détectés dans vos dépôts et services analysés, Datadog les marque automatiquement comme impactés. Les ressources qui n'ont pas été analysées n'affichent pas de statut impacté.

Pour chaque CVE, vous pouvez consulter le score de gravité, la disponibilité de l'exploit, le score EPSS, le statut CISA KEV, les paquets impactés et les versions de correctif. Consultez [CVE Explorer][27] pour plus de détails.

### Créer des tickets à partir des découvertes {#create-tickets-from-findings}

Vous pouvez créer un ticket bidirectionnel dans Jira ou ServiceNow directement depuis n'importe quel résultat pour suivre et corriger les problèmes dans vos workflows existants. Le statut du ticket reste synchronisé entre Datadog et votre outil de gestion de tickets. Pour plus d'informations, consultez [Ticketing integrations][19].

<div class="alert alert-info">La création de tickets est uniquement disponible pour les résultats de vulnérabilités de bibliothèques détectés dans les dépôts (SCA statique). Les résultats détectés exclusivement dans les services en cours d'exécution ne prennent pas en charge la création de tickets.</div>

### Masquer les résultats {#mute-findings}

Pour masquer un constat, cliquez sur {{< ui >}}Mute{{< /ui >}} dans le panneau de détails du constat. Cela ouvre un workflow où vous pouvez [créer une règle d'automatisation][20] pour un filtrage contextuel par valeurs de tag (par exemple, par `repository`). Mettre un constat en mode mute le masque et l'exclut des rapports.

<div class="alert alert-info">La mise en sourdine est uniquement disponible pour les résultats de vulnérabilités de bibliothèques détectés dans les dépôts (SCA statique). Les résultats détectés exclusivement dans les services en cours d'exécution ne peuvent pas être mis en sourdine.</div>

Pour restaurer un constat en mode mute, cliquez sur {{< ui >}}Unmute{{< /ui >}} dans le panneau de détails. Vous pouvez également utiliser le filtre {{< ui >}}Status{{< /ui >}} dans l'[Vulnerabilities Explorer][11] pour examiner les résultats mis en sourdine.

### Contexte de vulnérabilité de bibliothèque dans APM {#library-vulnerability-context-in-apm}

Le SCA enrichit les informations que l'Application Performance Monitoring (APM) collecte déjà en signalant les bibliothèques qui correspondent aux avis de vulnérabilité actuels. Les services potentiellement vulnérables sont mis en évidence directement dans la vue Security du [APM Catalog][10].

## Comprendre les vues SCA {#understanding-sca-views}

The Repositories Explorer et the Vulnerabilities Explorer ont des objectifs complémentaires mais distincts.

Le Repositories Explorer reflète un instantané des bibliothèques et des vulnérabilités détectées au moment de l'analyse. Il indique quelles bibliothèques étaient présentes dans un dépôt donné à un commit spécifique, ainsi que toutes les vulnérabilités connues au moment de l'analyse. Cette vue ne se met pas à jour rétroactivement si de nouveaux avis sont publiés après l'exécution de l'analyse.

Le Vulnerabilities Explorer fournit une vue en temps réel qui est continuellement comparée à la dernière base de données d'avis. Si un nouvel avis de vulnérabilité est publié après une analyse de dépôt, il apparaît automatiquement dans le Vulnerabilities Explorer, même si le dépôt n'a pas été réanalysé ou si votre dernière analyse portait sur un commit plus ancien. Cela garantit que votre exposition aux vulnérabilités est toujours à jour.

<div class="alert alert-info"><b>Exemple</b> : si une analyse est effectuée à 10h00 et qu'un avis CVE pour une bibliothèque de votre dépôt est publié à 16h00, le Repositories Explorer pour ce commit n'affichera pas la CVE, mais le Vulnerabilities Explorer la reflétera dès que l'avis sera disponible dans la base de données de Datadog.</div>

### Correspondance rétroactive des avis : {#retroactive-advisory-matching}

Datadog fait continuellement correspondre les avis nouvellement publiés avec l'inventaire de bibliothèques stocké à partir des analyses précédentes. Ceci met à jour les enregistrements de vulnérabilités dans le Vulnerabilities Explorer sans modifier les instantanés originaux du Repositories Explorer. Cela signifie :

- Vous n'avez pas besoin de déclencher une nouvelle analyse pour qu'une CVE nouvellement publiée apparaisse dans le Vulnerabilities Explorer.
- Le Vulnerabilities Explorer reflète le risque le plus actuel basé sur votre dernier inventaire de bibliothèques connu, même pour les commits plus anciens.
- Le Repositories Explorer reste un enregistrement fixe, représentatif de ce qui était connu au moment de l'analyse, et ne se met pas à jour lorsque de nouveaux avis sont publiés.

### Cycle de vie des vulnérabilités : {#vulnerability-lifecycle}

Datadog suit les vulnérabilités SCA différemment selon l'endroit où elles sont détectées. **SCA statique** les résultats sont limités à un **dépôt** et sont basés sur des analyses de dépôt. **SCA d'exécution** les résultats sont limités à un **service** et sont basés sur des bibliothèques chargées et utilisées par des services en cours d'exécution.

Une vulnérabilité est ouverte lorsque Datadog détecte une bibliothèque vulnérable dans le périmètre pertinent. Une vulnérabilité est fermée lorsque Datadog ne la détecte plus conformément aux règles de cycle de vie de ce produit.

| Produit | Périmètre | Scénario | Lorsqu'une vulnérabilité est ouverte | Lorsqu'une vulnérabilité est fermée |
|---|---|---|---|---|
| SCA statique : | Dépôt : | Analyse de dépôt : | Datadog détecte une bibliothèque vulnérable dans un dépôt analysé. | La vulnérabilité n'a pas été détectée dans le dernier commit analysé. |
| SCA d'exécution : | Service : | Service à exécution longue : | Datadog détecte une bibliothèque vulnérable dans un service en cours d'exécution. | Après un jour, si la vulnérabilité n'est plus détectée et que le service est en cours d'exécution dans tous les environnements où la vulnérabilité a été détectée. |
| SCA d'exécution : | Service : | Bibliothèque chargée plus tard dans le cycle de vie du service : | Datadog détecte une bibliothèque vulnérable dans un service en cours d'exécution. | Après cinq jours, si la vulnérabilité n'est plus détectée au cours de cette période. |
| SCA d'exécution | Service | Service ou job à courte durée de vie | Datadog détecte une bibliothèque vulnérable dans un service en cours d'exécution. | Après cinq jours, si la vulnérabilité n'est plus détectée au cours de cette période. |

## Prise en charge des langages SCA {#sca-language-support}

Software Composition Analysis (SCA) prend en charge les langages suivants :

{{< card-grid image_width="80" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/python_avatar.svg" alt="python" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/javascript_large.png" alt="javascript" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/java_avatar.svg" alt="java" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/golang-avatar.png" alt="go" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/rust.png" alt="rust" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/cpp.png" alt="c++" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/dart.svg" alt="dart" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/swift_avatar.svg" alt="swift" image_width="50" >}}
{{< /card-grid >}}

## Personnalisez votre configuration {#customize-your-configuration}

Vous pouvez exclure des chemins de l'analyse SCA statique en configurant `ignore-paths` dans Datadog ou dans un fichier `code-security.datadog.yaml`. Pour obtenir la référence complète de configuration SCA, consultez [Configuration de Software Composition Analysis (SCA)][30]. Pour plus d'informations sur les emplacements de configuration, la priorité et la fusion, consultez la [Référence de la configuration de Code Security][28].

## Étapes suivantes {#next-steps}

1. [Configurez l'analyse SCA statique][1] pour analyser vos dépôts.
2. [Configurez l'analyse SCA d'exécution][2] pour détecter les bibliothèques chargées par vos services en cours d'exécution.
3. Examinez et triez les résultats dans le [Vulnerabilities Explorer][11].
4. Configurez les [portes de PR][16] pour bloquer les changements risqués avant qu'ils ne soient fusionnés.
5. Utilisez le [CVE Explorer][15] pour évaluer de manière proactive l'exposition aux vulnérabilités récemment publiées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/security/code_security/software_composition_analysis/setup_static/
[2]: /fr/security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /fr/account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /fr/security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /fr/security/code_security/software_composition_analysis/library_inventory
[15]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[16]: /fr/pr_gates/
[17]: /fr/pr_gates/setup
[18]: /fr/security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
[19]: /fr/security/ticketing_integrations
[20]: /fr/security/automation_pipelines/mute
[21]: https://nvd.nist.gov/
[22]: https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/about-the-github-advisory-database
[23]: https://google.github.io/osv.dev/data/
[24]: https://github.com/pypa/advisory-database
[25]: https://github.com/cloudsecurityalliance/gsd-database
[26]: https://github.com/DataDog/guarddog
[27]: /fr/security/code_security/software_composition_analysis/cve_explorer/
[28]: /fr/security/code_security/guides/configuration/
[29]: /fr/security/code_security/software_composition_analysis/library_inventory/#export-a-software-bill-of-materials-sbom
[30]: /fr/security/code_security/software_composition_analysis/configuration/
[31]: /fr/bits_ai/bits_code
[32]: /fr/bits_ai/bits_code/automations
[33]: https://app.datadoghq.com/code
[34]: https://app.datadoghq.com/code/automations