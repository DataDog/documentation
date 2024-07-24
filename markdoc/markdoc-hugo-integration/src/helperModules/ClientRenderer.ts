import { RenderableTreeNodes } from 'markdoc-static-compiler';
import { rerenderChooser } from './HtmlBuilder/components/chooser';
import { SharedRenderer } from './SharedRenderer';
import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { PagePrefsConfig } from '../schemas/yaml/frontMatter';
import MarkdocStaticCompiler from 'markdoc-static-compiler';

/**
 * A class containing functions for rendering on the client.
 * When a new page loads, it should call ClientRenderer.configure()
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

  private constructor() {}

  public static get instance(): ClientRenderer {
    if (!ClientRenderer.#instance) {
      ClientRenderer.#instance = new ClientRenderer();
    }

    return ClientRenderer.#instance;
  }

  handleValueChange(e: Event) {
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
    const prefPills = document.getElementsByClassName('markdoc-pref__pill');
    for (let i = 0; i < prefPills.length; i++) {
      prefPills[i].removeEventListener('click', this.handleValueChange.bind(this));
      if (!chooserNode) {
        prefPills[i].addEventListener('click', this.handleValueChange.bind(this));
      }
    }
    if (!chooserNode) {
      return;
    }
    const newPrefPills = chooserNode.getElementsByClassName('markdoc-pref__pill');
    for (let i = 0; i < newPrefPills.length; i++) {
      newPrefPills[i].addEventListener('click', this.handleValueChange.bind(this));
    }
  }

  configure(p: {
    // renderableTree: RenderableTreeNodes;
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
    this.addChooserEventListeners();
  }

  rerender() {
    if (!this.pagePrefsConfig || !this.prefOptionsConfig || !this.chooserElement) {
      throw new Error(
        'Cannot rerender chooser without pagePrefsConfig, prefOptionsConfig, and chooserElement'
      );
    }

    const resolvedPagePrefs = SharedRenderer.resolvePagePrefs({
      pagePrefsConfig: this.pagePrefsConfig,
      prefOptionsConfig: this.prefOptionsConfig!,
      valsByPrefId: this.selectedValsByPrefId
    });

    Object.keys(resolvedPagePrefs).forEach((resolvedPrefId) => {
      const resolvedPref = resolvedPagePrefs[resolvedPrefId];
      this.selectedValsByPrefId[resolvedPref.identifier] = resolvedPref.currentValue;
    });

    const newChooserNode = rerenderChooser({
      resolvedPagePrefs,
      elementToPatch: this.chooserElement
    });

    MarkdocStaticCompiler.renderers.incremental(
      this.renderableTree,
      this.contentElement,
      { variables: this.selectedValsByPrefId }
    );
    this.addChooserEventListeners(newChooserNode as HTMLElement);
  }
}
