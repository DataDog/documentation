/**
 * A custom tag that renders a checkmark,
 * usually used inside a table cell.
 */
import { CustomHtmlComponent } from '../renderer';

export const xDefinition = {
  render: 'X'
};

export class X extends CustomHtmlComponent {
  render() {
    return `<i class="icon-check-bold"></i>`;
  }
}
