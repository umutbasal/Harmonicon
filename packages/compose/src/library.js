import {
  LibraryModel,
} from '@composer/core';

import { BaseComposer } from './base';
import { ComposerError } from './errors';
import { SnippetComposer } from './snippet';
import { TemplateComposer } from './template';
import { DemoComposer } from './demo';

/**
 * The library composer creates objects that can be exported and reused by other sessions.
 * 
 * ##### Examples
 *
 * Create a reusable instrument:
 * ```javascript
 * // my-library.js
 * library('my-library', async ({ library }) => {
 *   library.instrument('bass', async () => {
 *     return 'instance of audio node';
 *   })
 * });
 * ```
 * 
 * Then, `my-song.js` can pull it in via `use()`:
 * ```
 * // my-song.js
 * session('my-song', async ({ session }) => {
 *   session.use.instrument('bass').from.library('my-library');
 * })
 * 
 * @ignore
 * @hideconstructor
 * @sort 7
 * @category Composers
 * @label Library
 */
export class LibraryComposer extends BaseComposer {
  static composerContextName = 'library';
  static model = LibraryModel;

  /**
   * Create an instrument.
   * 
   * @param {String} name - Unique name of instrument
   * @param {Function} fn - Function to build instrument
   */
  instrument(name, fn) {
    this.model.instruments.add({
      name, fn
    });
  }

  /**
   * Create an effect.
   * 
   * @param {String} name - Unique name of effect
   * @param {Function} fn - Function to build effect
   */
  effect(name, fn) {
    this.model.effects.add({
      name, fn
    });
  }

  /**
   * Create a track.
   * 
   * @param {String} name - Unique name of track
   * @param {Function} fn - Function to build track
   */
  track(name, fn) {
    throw new ComposerError('not implemented');
  }

  /**
   * Create a phrase.
   * 
   * @param {String} name - Unique name of phrase
   * @param {Function|Array} fn - Function to build phrase, or an array of notes
   */
  phrase(name, fn) {
    throw new ComposerError('not implemented');
  }

  /**
   * Create a snippet.
   * 
   * @param {String} name - Unique name of snippet
   * @param {Function} fn - Function to build snippet
   */
  async snippet(name, fn) {
    return this.collectionRecordComposer({
      composer: SnippetComposer,
      collection: 'snippets',
      name,
      fn,
    });
  }

  /**
   * Create a template.
   * 
   * @param {String} name - Unique name of template
   * @param {Function} fn - Function to build template
   */
   async template(name, fn) {
    return this.collectionRecordComposer({
      composer: TemplateComposer,
      collection: 'templates',
      name,
      fn,
    });
  }

  /**
   * Create a demo.
   * 
   * @param {String} name - Unique name of demo
   * @param {Function} fn - Function to build demo
   */
   async demo(name, fn) {
    return this.collectionRecordComposer({
      composer: DemoComposer,
      collection: 'demos',
      name,
      fn,
    });
  }

  /**
   * Compose a collection record.
   * 
   * @ignore
   */
  async collectionRecordComposer({
    composer = null,
    collection = null,
    fn = async () => {},
    name = null,
  }) {
    const modelComposer = await composer.compose(name, fn);
    this.model[collection].add(modelComposer.model);
    return modelComposer;
  }

}

export const library = LibraryComposer.composer();
