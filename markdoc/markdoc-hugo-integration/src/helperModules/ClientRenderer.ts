import { RenderableTreeNodes } from 'markdoc-static-compiler';
import { rerenderChooser } from './HtmlBuilder/components/chooser';
import { SharedRenderer } from './SharedRenderer';
import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { PagePrefsConfig } from '../schemas/yaml/frontMatter';
import MarkdocStaticCompiler from 'markdoc-static-compiler';

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

  private renderableTree?: RenderableTreeNodes;
  private prefOptionsConfig?: PrefOptionsConfig;
  private pagePrefsConfig?: PagePrefsConfig;
  private chooserElement?: Element;
  private contentElement?: Element;
  private selectedValsByPrefId: Record<string, string> = {};
  private prefPills: Array<Element> = [];

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
    this.rerender();
  }

  addChooserEventListeners(chooserNode?: HTMLElement) {
    let prefPills;
    if (!chooserNode) {
      prefPills = document.getElementsByClassName('markdoc-pref__pill');
    } else {
      prefPills = chooserNode.getElementsByClassName('markdoc-pref__pill');
    }
    for (let i = 0; i < prefPills.length; i++) {
      if (this.prefPills.includes(prefPills[i])) {
        continue;
      } else {
        this.prefPills.push(prefPills[i]);
        prefPills[i].addEventListener('click', (e) => this.handlePrefSelectionChange(e));
      }
    }
  }

  initialize(p: {
    prefOptionsConfig: PrefOptionsConfig;
    pagePrefsConfig: PagePrefsConfig;
    chooserElement: Element;
    contentElement: Element;
    selectedValsByPrefId?: Record<string, string>;
    renderableTree?: RenderableTreeNodes;
  }) {
    this.prefOptionsConfig = p.prefOptionsConfig;
    this.pagePrefsConfig = p.pagePrefsConfig;
    this.chooserElement = p.chooserElement;
    this.selectedValsByPrefId = p.selectedValsByPrefId || {};
    this.contentElement = p.contentElement;
    this.renderableTree = p.renderableTree;
    this.prefPills = [];

    const contentElement = document.getElementById('markdoc-content');
    if (!contentElement) {
      throw new Error('Cannot find content element with id "markdoc-content"');
    } else {
      this.contentElement = contentElement;
    }

    const chooserElement = document.getElementById('markdoc-chooser');
    if (!chooserElement) {
      throw new Error('Cannot find chooser element with id "markdoc-chooser"');
    } else {
      this.chooserElement = chooserElement;
    }

    this.addChooserEventListeners();
  }

  rerender() {
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
    const resolvedPagePrefs = SharedRenderer.resolvePagePrefs({
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

    const newChooserNode = rerenderChooser({
      resolvedPagePrefs,
      elementToPatch: this.chooserElement
    });
    this.addChooserEventListeners(newChooserNode as HTMLElement);

    MarkdocStaticCompiler.renderers.incremental(
      this.renderableTree,
      this.contentElement,
      { variables: this.selectedValsByPrefId }
    );
  }
}
