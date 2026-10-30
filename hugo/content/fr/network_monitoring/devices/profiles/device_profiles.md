---
aliases:
- /fr/network_monitoring/devices/guide/device_profiles/
further_reading:
- link: /network_monitoring/devices/profiles/build-ndm-profile/
  tag: Documentation
  text: Créer un profil NDM (avancé)
- link: /network_monitoring/devices/profiles
  tag: Documentation
  text: En savoir plus sur les profils NDM
site_support_id: snmp_profile_manager
title: Prise en main des profils de périphérique
---
## Présentation {#overview}

Les profils de périphérique définissent les métriques SNMP que Datadog collecte pour un groupe de périphériques réseau. Le gestionnaire de profils SNMP offre une expérience guidée pour activer et gérer ces métriques. En commençant par un seul périphérique, vous pouvez :

- Parcourir les métriques disponibles regroupées par catégorie et les activer en un clic.
- Gérer les périphériques couverts par un profil et activer ou désactiver les métriques disponibles.
- Utiliser des packs de métriques pour des recommandations de métriques en masse guidées par l'IA.
- Enregistrez et déployez les modifications de profil directement sur vos Agents, avec une vue d'audit intégrée et un check de l'état de santé des Agents.

Pour une configuration de profil avancée, consultez [Créer un profil NDM][3].

## Prérequis {#prerequisites}

- Agent version `7.77.0` ou ultérieure.
- [Remote Configuration][14] activé pour votre organisation.
- Autorisations requises :
  - [Vue des profils de périphérique NDM][20] : Fournit un accès en lecture seule à la page de profil. (Inclus dans le rôle standard Datadog).
  - [Modification des profils de périphérique NDM][20] : Permet de modifier les profils de périphérique. (Inclus dans le rôle Datadog Admin).

## Configuration {#setup}

1. Activez l'analyse des périphériques en définissant `network_devices.default_scan.enabled: true` dans votre `datadog.yaml` :

   ```yaml
   network_devices:
       default_scan:
         enabled: true
   ```

2. Définissez `use_remote_config_profiles: true` dans votre configuration :

   Pour SNMP Autodiscovery, ajoutez ce qui suit à votre fichier `datadog.yaml` sous `network_devices.autodiscovery` :

    ```yaml
    network_devices:
        autodiscovery:
          use_remote_config_profiles: true
    ```

   Pour les checks SNMP manuels, ajoutez ce qui suit à votre fichier `conf.d/snmp.d/conf.yaml` sous `init_config` :

    ```yaml
    init_config:
      use_remote_config_profiles: true
    ```

  **Remarque** : les périphériques EXOS 33.1.1 peuvent planter lorsque l'analyse des périphériques est activée en raison d'un bug du firmware. Comme solution de contournement, désactivez l'analyse des périphériques globalement (`network_devices.default_scan.enabled: false`) ou mettez à jour le firmware du périphérique. Si vous êtes concerné par ce problème, contactez le [support Datadog][21] pour obtenir de l'aide.

3. Si vous avez des profils personnalisés sur l'Agent, téléchargez-les dans l'interface utilisateur en suivant les instructions [Télécharger des profils personnalisés](#upload-custom-profiles).

## Configurer les métriques {#configure-metrics}

Le point d'entrée recommandé pour le gestionnaire de profils SNMP s'effectue via un périphérique SNMP dans NDM. Chaque périphérique SNMP correspond à un profil, qu'il soit personnalisé ou générique fourni par Datadog. La modification d'un profil à partir d'un périphérique crée automatiquement une version personnalisée, ce qui vous évite d'avoir à créer un profil à partir de zéro.

1. Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}}][15].
2. Cliquez sur un périphérique surveillé via SNMP pour ouvrir le panneau latéral du périphérique.
3. Cliquez sur {{< ui >}}View all metrics{{< /ui >}} pour afficher la liste des métriques collectées automatiquement pour le périphérique.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="Le panneau latéral du périphérique NDM affichant la section Métriques avec le bouton Afficher toutes les métriques mis en surbrillance." style="width:90%;">}}

4. L'onglet {{< ui >}}Metrics{{< /ui >}} s'ouvre, affichant toutes les métriques collectées pour le périphérique. Utilisez la barre latérale gauche pour parcourir par catégorie : {{< ui >}}Alerting Metrics{{< /ui >}}, {{< ui >}}Starred Metrics{{< /ui >}}, {{< ui >}}Key Metrics{{< /ui >}} et {{< ui >}}Additional Metrics{{< /ui >}}. 

   {{< img src="/network_device_monitoring/profile_onboarding/profile_manager_metrics_tab.png" alt="L'onglet Métriques du périphérique NDM affiche des graphiques de métriques et présente, dans la barre latérale gauche, les catégories Alerting Metrics, Starred Metrics, Key Metrics et Additional Metrics." style="width:90%;">}}

5. Pour ouvrir l'éditeur de profil et gérer les métriques collectées, cliquez sur {{< ui >}}Configure metrics{{< /ui >}} dans la barre latérale gauche.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_configure_metrics_2026_10.png" alt="L'onglet Métriques du périphérique NDM avec Configurer les métriques mis en surbrillance dans la barre latérale gauche." style="width:90%;">}}

   Cela ouvre l'éditeur de profil dans l'onglet {{< ui >}}Metrics{{< /ui >}}, contenant la liste de toutes les métriques disponibles pour les périphériques couverts par le profil, organisées par nom, MIB, OID, catégorie et compatibilité. Il s'agit de la vue principale pour contrôler les données que Datadog collecte depuis vos périphériques. Vous pouvez filtrer la liste des métriques par catégorie ou utiliser la barre de recherche pour trouver des métriques spécifiques par nom ou OID.

6. Pour activer une métrique, cliquez sur le bouton {{< ui >}}Enable{{< /ui >}} à côté du nom de la métrique. Pour désactiver une métrique, cliquez à nouveau sur le bouton. Les modifications ne sont pas appliquées tant que vous n'avez pas enregistré et déployé le profil.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="L'éditeur de profil du gestionnaire de profils SNMP affichant l'onglet Métriques avec toutes les métriques disponibles listées par nom, MIB, OID, catégorie et compatibilité" style="width:90%;">}}

### Couverture des périphériques {#device-coverage}

L'onglet {{< ui >}}Device Coverage{{< /ui >}} montre quels périphériques réseau sont associés à un profil et comment le profil est appliqué. Utilisez cette vue pour vérifier les associations d'appareils, filtrer les appareils par attributs et identifier les problèmes de collecte SNMP.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_device_coverage.png" alt="L'onglet Couverture des appareils affichant une liste d'appareils avec leurs adresses IP, SysObjectID, tags et le statut de la dernière exploration SNMP" style="width:90%;">}}


Utilisez les filtres en haut du tableau pour restreindre les résultats par SysObjectID, SysType, fournisseur, modèle, type de périphérique ou nom de périphérique.

Pour mettre à jour les périphériques associés au profil, cliquez sur {{< ui >}}Manage Devices{{< /ui >}}. À partir de là, vous pouvez :

- Rechercher des périphériques à ajouter ou sélectionner des ID d'objet à supprimer. La suppression d'un ID d'objet supprime tous les périphériques correspondants de la couverture du profil.
- Filtrer la liste des périphériques par type, nom ou autres attributs.

#### Statut de l'exploration SNMP {#snmp-walk-status}

La colonne {{< ui >}}Last SNMP walk{{< /ui >}} indique si Datadog a réussi à interroger le périphérique :

- **Échec** : L'exploration SNMP ne s'est pas terminée avec succès. Les métriques peuvent être manquantes ou incomplètes.
- **Horodatage** : Indique la date et l'heure de la dernière exploration SNMP réussie.

Si les explorations SNMP échouent, vérifiez que :

- SNMP est correctement configuré sur le périphérique.
- La connectivité réseau permet l'interrogation SNMP.
- Les identifiants et les ports sont corrects.

### Options avancées {#advanced-options}

Cliquez sur {{< ui >}}Advanced Options{{< /ui >}} pour accéder aux métadonnées du périphérique et à la configuration globale des tags. Ces paramètres ne sont pas requis pour la plupart des cas d'utilisation.

#### Métadonnées du périphérique {#device-metadata}

La section {{< ui >}}Device metadata{{< /ui >}} définit la manière dont Datadog mappe les OID SNMP aux attributs du périphérique. Chaque champ de métadonnées correspond à une propriété standard du périphérique, telle que :

- Nom du périphérique
- Fournisseur
- Modèle
- Version du système d'exploitation
- Emplacement

Les valeurs sont définies à l'aide d'OID SNMP. Lors de la collecte, Datadog interroge ces OID pour remplir les métadonnées du périphérique. Exemple :

- `1.3.6.1.2.1.1.5.0` correspond au nom du périphérique.
- `1.3.6.1.2.1.1.1.0` correspond à la description du périphérique.

Ces métadonnées enrichissent les détails des périphériques dans l'interface utilisateur, permettent le filtrage et le regroupement, et assurent un tagging cohérent sur tous les périphériques.

Cliquez sur l'icône en forme de crayon pour modifier un champ de métadonnées. Les métadonnées sont affichées sur la page [Network Device Monitoring][15] sous forme de facettes interrogeables et dans le panneau latéral du périphérique.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_advanced_options_edit.png" alt="L'onglet Options avancées avec Métadonnées du périphérique sélectionné affiche un tableau des noms de champs de métadonnées tels que Nom du périphérique, Fournisseur et Emplacement, ainsi que leurs valeurs OID SNMP mappées." style="width:90%;">}}

Le tableau suivant décrit les différentes options de modification pour un champ de métadonnées :
| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| {{< ui >}}No Modification{{< /ui >}} | La valeur renvoyée par le périphérique est utilisée directement comme valeur de tag.                                 |
| {{< ui >}}Format{{< /ui >}}          | Il peut s'agir de [mac_address][5] ou de [ip_address][6].                                                    |
| {{< ui >}}Extract Value{{< /ui >}}   | Une expression régulière utilisée pour [extraire][7] la valeur du tag à partir de la valeur SNMP fournie par le périphérique. |
| {{< ui >}}Mapping{{< /ui >}}         | Consultez la [référence du format de profil][8].                                                              |

#### Tags globaux {#global-tags}

Utilisez {{< ui >}}Global tags{{< /ui >}} pour appliquer des tags à toutes les métriques et aux métadonnées du périphérique pour les périphériques associés au profil. Les tags globaux aident à normaliser le tagging sur des périphériques similaires et ajoutent du contexte tel que l'environnement, l'emplacement ou la propriété.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_global_tags.png" alt="L'onglet Advanced Options avec Global tags sélectionné, affichant un tableau des noms de tags et de leurs valeurs OID avec un bouton Add global tag" style="width:90%;">}}


### Explorer les packs de métriques {#explore-metric-packs}

Les packs de métriques sont des ensembles de métriques sélectionnés que vous pouvez activer en masse. Ils sont accessibles depuis l'onglet {{< ui >}}Metrics{{< /ui >}} et fournissent des recommandations guidées par l'IA basées sur vos périphériques.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metric_packs.png" alt="L'onglet Métriques affichant la bannière Démarrer avec des packs de métriques en haut et le bouton Packs de métriques mis en évidence dans le coin supérieur droit" style="width:90%;">}}

Pour ajouter un pack de métriques :

1. Depuis l'onglet {{< ui >}}Metrics{{< /ui >}}, cliquez sur {{< ui >}}Metric packs{{< /ui >}} dans le coin supérieur droit, ou cliquez sur {{< ui >}}View All{{< /ui >}} dans la bannière {{< ui >}}Start with metric packs{{< /ui >}}.
2. Dans la modale {{< ui >}}Add metric pack{{< /ui >}}, parcourez tous les packs disponibles ou cliquez sur {{< ui >}}Suggested packs{{< /ui >}} pour voir les recommandations guidées par l'IA.
3. Cliquez sur un pack pour afficher un aperçu de ses métriques incluses, de ses tags globaux et de ses métadonnées.
4. Cliquez sur {{< ui >}}Add metric pack{{< /ui >}} pour activer toutes les métriques du pack en une seule fois.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_add_metric_pack.png" alt="La modale Ajouter un pack de métriques affichant la liste des packs à gauche et un aperçu des métriques, tags globaux et métadonnées du pack sélectionné à droite" style="width:90%;">}}

## Page d'inventaire {#inventory-page}

Pour voir tous les profils au même endroit, accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] et cliquez sur {{< ui >}}SNMP Profile Manager{{< /ui >}} dans la barre latérale gauche. Cette page répertorie tous les profils, à la fois les profils Datadog prêts à l'emploi et tous les profils personnalisés que vous avez créés.

{{< img src="/network_device_monitoring/profile_onboarding/snmp_profile_manager.png" alt="La page Gestionnaire de profils SNMP affichant une liste de profils avec leurs colonnes nom, fournisseur, couverture de l'appareil et dernière mise à jour" style="width:90%;">}}

Utilisez le filtre {{< ui >}}Device vendor{{< /ui >}} ou la barre de recherche pour restreindre la liste par nom de profil, fournisseur ou nom d'appareil. Activez **Afficher uniquement les profils avec des appareils correspondants** pour masquer les profils sans appareils associés.

Si les agents sont mal configurés pour la configuration à distance, une bannière d'avertissement apparaît en haut de la page. Cliquez sur {{< ui >}}Fix Agents{{< /ui >}} pour résoudre le problème.

Pour ouvrir l'éditeur de profil, cliquez sur n'importe quel profil. Pour les profils fournis par Datadog, la modification crée une version personnalisée pour vous.

Cliquez sur le menu à trois points à droite d'une ligne de profil pour :

- {{< ui >}}Edit profile{{< /ui >}} : Ouvrir l'éditeur de profil pour ce profil.
- {{< ui >}}Delete profile{{< /ui >}} : Supprimer définitivement un profil personnalisé.
- {{< ui >}}Review related devices{{< /ui >}} : Accéder à NDM filtré sur les appareils correspondant à ce profil.

### Download profiles {#download-profiles}

Pour télécharger des profils sous forme de fichiers YAML, cliquez sur {{< ui >}}Download Profiles{{< /ui >}} dans le coin supérieur droit de la page. Cela génère un bundle `.zip` contenant les fichiers `yaml` pour vos profils personnalisés. Pour appliquer manuellement des profils aux Agents :

1. Placez les fichiers `yaml` dans le [répertoire de profil][13] sur chaque Agent installé concerné.
2. Redémarrez le Datadog Agent.
3. Confirmez que NDM reçoit bien les métriques des appareils correspondants.

### Téléversez des profils personnalisés {#upload-custom-profiles}

Pour téléverser des profils SNMP existants vers le gestionnaire de profils :

1. Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] et cliquez sur {{< ui >}}SNMP Profile Manager{{< /ui >}} dans la barre latérale gauche.
2. Cliquez sur {{< ui >}}Upload Profiles{{< /ui >}} dans le coin supérieur droit de la page.
3. Dans la fenêtre modale de téléchargement, faites glisser et déposez un fichier `.zip` ou cliquez sur {{< ui >}}browse files{{< /ui >}} pour en sélectionner un. Le fichier `.zip` doit contenir un ou plusieurs profils SNMP au format `.yaml`.

   {{< img src="/network_device_monitoring/profile_onboarding/upload_custom_profile_2.png" alt="La fenêtre modale de téléchargement de profil SNMP personnalisé avec une zone de glisser-déposer pour télécharger un fichier .zip contenant des profils SNMP au format .yaml" style="width:60%;">}}

4. Cliquez sur {{< ui >}}Upload profiles{{< /ui >}}.

Une fois le téléchargement terminé, les profils sont disponibles dans l'éditeur de profil. Vous pouvez ensuite gérer les métriques, la couverture des appareils et les options avancées pour les profils téléchargés de la même manière que pour tout autre profil personnalisé.

## Héritage de profil{#profile-inheritance}

L'héritage de profil se produit automatiquement en arrière-plan. Lorsque vous modifiez un profil, Datadog crée une extension personnalisée du profil correspondant. Vous n'avez pas besoin de configurer l'héritage manuellement. Datadog inclut automatiquement les profils hérités de base (`_base.yaml`, `_generic-if.yaml`, `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml` et `_generic-udp.yaml`).

Pour une configuration d'héritage avancée, consultez la [Référence du format de profil][3].

## Dépannage {#troubleshooting}

### Qu'est-ce qu'un profil ? {#what-is-a-profile}
* Un profil est un fichier de configuration qui définit les métadonnées, les métriques et les tags à collecter depuis un appareil. Consultez la [définition des métadonnées][17] pour plus d'informations.

### Qu'est-ce qu'une analyse d'appareil ? {#what-is-a-device-scan}
* Une analyse d'appareil effectue un SNMP walk complet de l'appareil, collectant toutes les données disponibles et les transmettant à Datadog pour affichage dans l'interface utilisateur. Ce processus identifie les OIDs disponibles sur l'appareil et renseigne la liste des métriques disponibles dans l'éditeur de profil.

### Pourquoi n'y a-t-il aucun appareil correspondant ? {#why-are-there-no-matching-devices}
Si aucun appareil correspondant n'est trouvé, cela peut être dû aux raisons suivantes :
  * **Le profil est appliqué mais ne correspond à aucun appareil** :
    * Les profils sont mis en correspondance avec les appareils en utilisant leur SysObjectID. Confirmez que le SysObjectID dans le profil correspond à un ou plusieurs de vos appareils surveillés.
  * **Plusieurs profils ont le(s) même(s) SysObjectID** :
    * Si plusieurs profils partagent le même SysObjectID, cela peut provoquer des conflits de correspondance au niveau de l'Agent. Confirmez que chaque SysObjectID est assigné à un seul profil.

### Pourquoi un appareil ne serait-il pas analysé ? {#why-would-a-device-not-be-scanned}

L'analyse de l'appareil peut prendre jusqu'à 10 minutes. Vous pouvez surveiller la progression de l'analyse dans l'interface utilisateur.

Si un appareil n'est pas analysé, cela peut être dû aux raisons suivantes :

- **L'analyse par défaut de l'appareil est désactivée** : L'analyse de l'appareil est désactivée par défaut. Définissez `network_devices.default_scan.enabled: true` dans `datadog.yaml`.
- **Boucle infinie détectée** : L'analyse a détecté une boucle infinie et a été interrompue. Vérifiez les logs de l'Agent pour `next OID 'X' is not after last OID 'Y'`. Cela peut se produire avec le micrologiciel de certains appareils.
- **Micrologiciel de l'appareil** : Avant d'activer l'analyse de l'appareil, consultez l'avertissement relatif au micrologiciel dans [Configuration](#setup).

{{< site-region region="gov,gov2" >}}
- **GovCloud** : Les analyses d'appareils ne peuvent pas être déclenchées depuis l'interface utilisateur. Activez l'analyse par défaut de l'appareil (`network_devices.default_scan.enabled: true`) et déclenchez les analyses manuellement depuis l'Agent pour des appareils spécifiques.
{{< /site-region >}}

### Remote Configuration n'est pas activé sur les collecteurs {#remote-configuration-is-not-enabled-on-collectors}

Le gestionnaire de profils nécessite :

- Agent version `7.77.0` ou ultérieure
- [Remote Configuration][14] activé
- `use_remote_config_profiles: true` dans votre configuration SNMP
- `network_devices.default_scan.enabled: true` pour l'analyse de l'appareil

Si Remote Configuration n'est pas activé, vous ne pouvez pas déclencher d'analyses d'appareils ni synchroniser les profils vers les Agents via l'interface utilisateur. Pour appliquer les profils manuellement, consultez [Download profiles](#download-profiles).

Datadog recommande d'activer Remote Configuration pour profiter de l'expérience complète basée sur l'interface utilisateur et minimiser les interactions manuelles avec l'Agent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /fr/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[14]: /fr/agent/remote_config
[15]: https://app.datadoghq.com/devices
[17]: /fr/network_monitoring/devices/profiles/#metadata-definition-by-profile
[20]: /fr/account_management/rbac/permissions/#network-device-monitoring
[21]: /fr/help/