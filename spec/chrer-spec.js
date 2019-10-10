'use babel';

import Chrer from '../lib/chrer';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Chrer', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('chrer');
  });

  describe('when the chrer:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.chrer')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'chrer:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.chrer')).toExist();

        let chrerElement = workspaceElement.querySelector('.chrer');
        expect(chrerElement).toExist();

        let chrerPanel = atom.workspace.panelForItem(chrerElement);
        expect(chrerPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'chrer:toggle');
        expect(chrerPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.chrer')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'chrer:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let chrerElement = workspaceElement.querySelector('.chrer');
        expect(chrerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'chrer:toggle');
        expect(chrerElement).not.toBeVisible();
      });
    });
  });
});
