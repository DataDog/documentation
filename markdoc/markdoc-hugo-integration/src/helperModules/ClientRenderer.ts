import { getChooserHtml } from './PageBuilder/components/Chooser';
import { MinifiedPrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { MinifiedPagePrefsConfig } from '../schemas/yaml/frontMatter';
import { reresolveFunctionNode, ClientFunction } from 'markdoc-static-compiler';
import { resolveMinifiedPagePrefs } from './sharedRendering';

/**
 * A class containing functions for rendering on the client.
 * When a new page loads, it should call ClientRenderer.initialize()
 * in order to set up the client renderer with the necessary data
 * for re-rendering in response to user selection changes.
 *
 * The ClientRenderer is a Singleton class -- there should only be
 * one instance of it in the application, with the configuration
 * updating as various pages are loaded.
 */
export class ClientRenderer {
  static #instance: ClientRenderer;

  private prefOptionsConfig?: MinifiedPrefOptionsConfig;
  private pagePrefsConfig?: MinifiedPagePrefsConfig;
  private chooserElement?: Element;
  private selectedValsByPrefId: Record<string, string> = {};
  private prefPills: Array<Element> = [];
  private ifFunctionsByRef: Record<string, ClientFunction> = {};

  private constructor() {}

  public static get instance(): ClientRenderer {
    if (!ClientRenderer.#instance) {
      ClientRenderer.#instance = new ClientRenderer();
    }

    return ClientRenderer.#instance;
  }

  /**
   * When the user changes a preference value,
   * update the selected values data,
   * and rerender the chooser and page content.
   */
  handlePrefSelectionChange(e: Event) {
    const node = e.target;
    if (!(node instanceof Element)) {
      console.log('From handleValueChange: Node is not an Element');
      return;
    }
    const prefId = node.getAttribute('data-pref-id');
    if (!prefId) {
      console.log('From handleValueChange: No prefId found');
      return;
    }
    const optionId = node.getAttribute('data-option-id');
    if (!optionId) {
      console.log('From handleValueChange: No optionId found');
      return;
    }
    this.selectedValsByPrefId[prefId] = optionId;
    this.rerenderChooser();
    this.rerenderPageContent();
  }

  rerenderPageContent() {
    const newDisplayStatusByRef: Record<string, boolean> = {};

    // Update the resolved function values,
    // and make a list of refs that require a display status change
    Object.keys(this.ifFunctionsByRef).forEach((ref) => {
      const clientFunction = this.ifFunctionsByRef[ref];
      const oldValue = clientFunction.value;
      const resolvedFunction = reresolveFunctionNode(clientFunction, {
        variables: this.selectedValsByPrefId
      });
      this.ifFunctionsByRef[ref] = resolvedFunction;
      if (oldValue !== resolvedFunction.value) {
        newDisplayStatusByRef[ref] = resolvedFunction.value;
      }
    });

    const toggleables = document.getElementsByClassName('markdoc__toggleable');
    for (let i = 0; i < toggleables.length; i++) {
      const toggleable = toggleables[i];

      const ref = toggleable.getAttribute('data-if');

      if (!ref) {
        throw new Error('No ref found on toggleable element');
      }
      if (newDisplayStatusByRef[ref] === undefined) {
        continue;
      }

      if (newDisplayStatusByRef[ref]) {
        toggleable.classList.remove('markdoc__hidden');
      } else {
        toggleable.classList.add('markdoc__hidden');
      }
    }
  }

  addChooserEventListeners() {
    const prefPills = document.getElementsByClassName('markdoc-pref__pill');
    for (let i = 0; i < prefPills.length; i++) {
      if (this.prefPills.includes(prefPills[i])) {
        continue;
      } else {
        this.prefPills.push(prefPills[i]);
        prefPills[i].addEventListener('click', (e) => this.handlePrefSelectionChange(e));
      }
    }
    /*
    for (let i = 0; i < prefPills.length; i++) {
      if (this.prefPills.includes(prefPills[i])) {
        continue;
      } else {
        this.prefPills.push(prefPills[i]);
        prefPills[i].addEventListener('click', (e) => this.handlePrefSelectionChange(e));
      }
    }
    */
  }

  initialize(p: {
    prefOptionsConfig: MinifiedPrefOptionsConfig;
    pagePrefsConfig: MinifiedPagePrefsConfig;
    chooserElement: Element;
    contentElement: Element;
    selectedValsByPrefId?: Record<string, string>;
    ifFunctionsByRef: Record<string, ClientFunction>;
  }) {
    this.prefOptionsConfig = p.prefOptionsConfig;
    this.pagePrefsConfig = p.pagePrefsConfig;
    this.chooserElement = p.chooserElement;
    this.selectedValsByPrefId = p.selectedValsByPrefId || {};
    this.ifFunctionsByRef = p.ifFunctionsByRef;
    this.prefPills = [];

    const chooserElement = document.getElementById('markdoc-chooser');
    if (!chooserElement) {
      throw new Error('Cannot find chooser element with id "markdoc-chooser"');
    } else {
      this.chooserElement = chooserElement;
    }

    this.addChooserEventListeners();
  }

  rerenderChooser() {
    if (!this.pagePrefsConfig || !this.prefOptionsConfig || !this.chooserElement) {
      throw new Error(
        'Cannot rerender chooser without pagePrefsConfig, prefOptionsConfig, and chooserElement'
      );
    }

    /**
     * Re-resolve the page prefs, since a newly selected value
     * can have a cascading impact on the interpolated placeholder values,
     * and thus the valid options for each preference.
     */
    const resolvedPagePrefs = resolveMinifiedPagePrefs({
      pagePrefsConfig: this.pagePrefsConfig,
      prefOptionsConfig: this.prefOptionsConfig!,
      valsByPrefId: this.selectedValsByPrefId
    });

    /**
     * Update the selected values to align with the resolved prefs,
     * in case any previously selected values
     * have become invalid and been overridden by defaults.
     */
    Object.keys(resolvedPagePrefs).forEach((resolvedPrefId) => {
      const resolvedPref = resolvedPagePrefs[resolvedPrefId];
      this.selectedValsByPrefId[resolvedPref.identifier] = resolvedPref.currentValue;
    });

    const newChooserHtml = getChooserHtml(resolvedPagePrefs);
    this.chooserElement.innerHTML = newChooserHtml;
    this.addChooserEventListeners();
  }
}
