---
aliases:
- /fr/mobile_testing/mobile_app_tests/steps
description: Découvrez comment enregistrer automatiquement et ajouter manuellement
  des étapes dans un enregistrement de test mobile.
further_reading:
- link: /mobile_app_testing/mobile_app_tests/
  tag: Documentation
  text: En savoir plus sur les tests mobiles Synthetic
- link: /mobile_app_testing/mobile_app_tests/advanced_options
  tag: Documentation
  text: En savoir plus sur les options avancées des tests mobiles
kind: documentation
title: Étapes des tests d'application mobile
---

{{< site-region region="us3,us5,gov,eu,ap1" >}}
<div class="alert alert-warning">La solution Mobile Application Testing n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

{{< site-region region="us" >}}
<div class="alert alert-info">L'accès à la solution Mobile Application Testing est actuellement limité ; elle est disponible uniquement sur le site Datadog US1.</div>
{{< /site-region >}}


## Présentation

Les étapes représentent des interactions ou assertions enregistrées individuellement à exécuter dans votre test. Pour définir une étape, cliquez sur **Start Recording** et interagissez avec l'appareil comme vous le feriez en temps normal. Vous pouvez également créer manuellement une étape en cliquant sur **Assertions** ou sur **Special Actions**. 

## Lancer un appareil

Pour commencer à enregistrer des étapes et à les ajouter, sélectionnez un appareil sur lequel lancer un test d'application mobile dans le menu déroulant, puis cliquez sur **Launch Device**.

{{< img src="mobile_app_testing/launch_device.png" alt="Sélectionner un appareil sur lequel un test mobile doit s'exécuter" style="width:60%" >}}

Sélectionnez **Show only available devices. Available devices load faster** pour afficher les appareils avec la meilleure disponibilité, afin de raccourci le délai d'attente du test.

### Notifications

Cliquez sur le bouton vert **Device Connection Notification** dans la fenêtre **Launch a device to start recording** pour recevoir une notification lorsque votre appareil est disponible ou lorsque la connexion est sur le point d'expirer pour cause d'inactivité.

## Étapes enregistrées automatiquement

Une fois que vous avez cliqué sur **Start Recording**, Datadog enregistre automatiquement vos interactions avec l'appareil et les affiche dans la liste des étapes à gauche.

Pour arrêter l'enregistrement, cliquez sur **Stop Recording**.

## Étapes ajoutées manuellement

Il est non seulement possible de créer automatiquement des étapes en interagissant directement avec votre appareil, mais également d'ajouter manuellement des étapes à l'aide d'[assertions](#assertion) et d'[actions spéciales](#actions-speciales). Vous pouvez cliquer sur une étape précédemment enregistrée pour la modifier, ou faire glisser une étape vers le haut ou vers le bas dans la liste des étapes pour [modifier l'ordre des étapes](#gerer-l-ordre-des-etapes).

### Assertion

Les assertions vous permettent de valider le contenu affiché (ou dissimulé) au sein d'une section spécifique de votre flux de test.


{{< img src="mobile_app_testing/assertions.png" alt="Options relatives aux assertions dans un test mobile" style="width:60%;" >}}


Pour créer une étape, sélectionnez un type d'assertion :

{{< tabs >}}
{{% tab "Tester un élément sur l'écran actif" %}}

#### Test an element's content

Créez cette étape d'assertion pour que votre test d'application mobile sélectionne un élément de page et vérifie s'il contient ou non une certaine valeur.

{{% /tab %}}
{{% tab "Tester le contenu de l'écran actif" %}}

#### Test that some text is present on the active screen

Créez cette étape d'assertion pour que votre test d'application mobile vérifie si le texte indiqué dans le champ `Value` se trouve sur la page active de l'enregistrement.

#### Test that some text is not present on the active screen

Créez cette étape d'assertion pour que votre test d'application mobile vérifie si le texte indiqué dans le champ `Value` ne se trouve **pas** sur la page active de l'enregistrement.

{{% /tab %}}
{{< /tabs >}}

### Actions spéciales

En plus de l'enregistrement automatique d'étapes basées sur les interactions avec votre appareil, vous pouvez également créer manuellement des étapes en cliquant sur **Special Actions**.

{{< img src="mobile_app_testing/special_actions.png" alt="Choisir un type d'action pour ajouter une étape d'assertion" style="width:60%;" >}}

#### Action Tap

Interagissez avec des éléments d'une simple pression sur votre application mobile pour enregistrer une étape.

{{< img src="mobile_app_testing/tap.mp4" alt="Enregistrer une étape Tap dans un test mobile" video=true >}}

#### Action Double Tap

Interagissez avec des éléments à l'aide d'une double pression sur votre application mobile pour enregistrer une étape.

{{< img src="mobile_app_testing/double_tap.mp4" alt="Enregistrer une étape Double Tap dans un test mobile" video=true >}}

#### Action Type Text

Interagissez avec un champ de saisie de texte sur votre application mobile, ajoutez un nom et définissez une valeur pour enregistrer une étape.

{{< img src="mobile_app_testing/type_text.mp4" alt="Enregistrer une étape Type Text dans un test mobile" video=true >}}

Pour afficher toutes les variables disponibles pour des étapes ajoutées manuellement, tapez `{{` dans le champ de saisie.

{{< img src="mobile_app_testing/injecting_variable.png" alt="Ajouter une étape Type Text pour utiliser des variables dans des tests mobiles" style="width:25%" >}}

Pour utiliser une variable dans des étapes enregistrées automatiquement, ajoutez le nom d'une étape et spécifiez la valeur de la variable pour la saisir pendant l'enregistrement.

#### Action Scroll

Les tests d'application mobile font automatiquement défiler la page jusqu'aux éléments avec lesquels ils doivent interagir. Dans la plupart des cas, il n'est pas nécessaire d'ajouter manuellement une étape de défilement. L'étape Scroll doit être ajoutée uniquement lorsque celle-ci est nécessaire pour déclencher une interaction supplémentaire, par exemple pour un défilement infini.

Indiquez le nombre de pixels que votre test d'application mobile doit faire défiler dans le sens horizontal et vertical.

{{< img src="mobile_app_testing/scroll_step.png" alt="Étape Scroll dans un enregistrement de test mobile" style="width:60%;" >}}

Par défaut, l'étape **Scroll** fait défiler la page entière. Si vous souhaitez faire défiler un élément spécifique (tel qu'une certaine `<div>`), cliquez sur **Starting Element** et sélectionnez l'élément que votre test d'application mobile doit faire défiler.

#### Action Press Back

Interagissez avec le bouton **Retour** sous l'application mobile pour enregistrer une étape.

{{< img src="mobile_app_testing/press_back.mp4" alt="Enregistrer une étape Press Back dans un test mobile" video=true >}}

#### Action Wait

Si vous savez que le chargement d'une page ou d'un élément de page dure plus de 60 secondes, vous pouvez ajouter une étape Wait d'une durée maximale de 300 secondes.

{{< img src="mobile_app_testing/wait_step.png" alt="Enregistrer une étape Wait dans un test mobile" style="width:60%;" >}}

Par défaut, les tests d'application mobile attendent le chargement complet d'une page, tant que celui-ci ne dépasse pas 60 secondes, avant d'exécuter une étape ou la prochaine étape. La durée supplémentaire est ajoutée systématiquement à **chaque exécution** de l'enregistrement de votre test d'application mobile.

#### Action Rotate Device

Ajoutez un nom à l'étape, puis sélectionnez le mode **Portrait** ou **Landscape**.

{{< img src="mobile_app_testing/rotate_device.png" alt="Enregistrer une étape Rotate Device dans un test mobile" style="width:60%" >}}

#### Action Open Deep Link

Ajoutez un nom à l'étape, puis saisissez une URL de lien profond.

{{< img src="mobile_app_testing/open_deep_link.png" alt="Enregistrer une étape Open Deep Link dans un test mobile" style="width:60%" >}}

Pour en savoir plus sur les options de configuration supplémentaires relatives aux étapes de test, consultez la section [Options avancées pour les étapes des tests d'application mobile][4].

### Sous-tests

Vous pouvez exécuter des tests d'application mobile au sein d'autres tests d'application mobile afin de réutiliser des workflows existants. Vous pouvez configurer jusqu'à deux niveaux d'imbrication.

Pour ajouter un sous-test basé sur un test d'application mobile existant, cliquez sur **Subtest**, sélectionnez un test d'application mobile depuis le menu déroulant, puis cliquez sur **Add Subtest**.

{{< img src="mobile_app_testing/example_subtest.png" alt="Sélectionner un test mobile à ajouter comme sous-test" style="width:60%" >}}

Pour ignorer les variables des sous-tests dans des tests parent, vérifiez que les variables créées au niveau des tests parent possèdent les mêmes noms que les variables des sous-tests. Une variable utilise toujours la première valeur qui lui a été attribuée.

Pour en savoir plus sur les options avancées des sous-tests, consultez la section [Options avancées pour les étapes des tests d'application mobile][5].

S'il n'est pas pertinent d'exécuter votre sous-test de façon indépendante, vous pouvez l'interrompre. Le test continue à être appelé lors du test parent, mais il n'est pas exécuté individuellement. Pour en savoir plus, consultez la section [Réutiliser des parcours de test Browser pour toute votre collection de tests][6].

## Gérer l'ordre des étapes

Au lieu de faire glisser chaque nouvelle étape pour modifier manuellement son ordre, vous pouvez définir à n'importe quel moment de l'enregistrement un curseur pour une étape de votre test, puis insérer des étapes supplémentaires.

1. Survolez une étape du test enregistré, puis cliquez sur l'icône **Set Cursor**. Une ligne bleue s'affiche alors au-dessus de votre étape de test.
2. Enregistrez des [étapes de test](#etapes-enregistrees-automatiquement) supplémentaires ou [ajoutez manuellement des étapes](#etapes-ajoutees-manuellement).
3. Après avoir ajouté des étapes supplémentaires au-dessus de votre étape de test, cliquez sur **Clear Cursor** pour quitter le curseur.

{{< img src="mobile_app_testing/recording_cursor_step.mp4" alt="Définir un curseur sur une étape de test afin d'ajouter des étapes supplémentaires avant l'étape en question" video=true >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mobile_app_testing/mobile_app_tests/#variables
[2]: /fr/synthetics/settings/#global-variables
[3]: /fr/synthetics/guide/browser-tests-totp/
[4]: /fr/mobile_app_testing/mobile_app_tests/advanced_options
[5]: /fr/mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /fr/synthetics/guide/reusing-browser-test-journeys/