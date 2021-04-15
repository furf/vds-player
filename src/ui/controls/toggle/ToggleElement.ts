import {
  CSSResultArray,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
} from 'lit-element';

import { getSlottedChildren, setAttribute } from '../../../utils/dom';
import { isNil } from '../../../utils/unit';
import { toggleElementStyles } from './toggle.css';
import { ToggleElementProps } from './toggle.types';

/**
 * A toggle component to render different state depending on whether it's pressed or not. This
 * component will always render both the `pressed` and `not-pressed` slots regardless of the current
 * state so you can perform CSS animations. A `hidden` attribute will be applied to the slot
 * that's currently not active.
 *
 * @tagname vds-toggle
 *
 * @slot pressed - The content to show when the toggle is pressed.
 * @slot not-pressed - The content to show when the toggle is not pressed.
 *
 * @example
 * ```html
 * <vds-toggle pressed>
 *   <!-- Showing -->
 *   <div slot="pressed"></div>
 *   <!-- Hidden - `hidden` attribute will automatically be applied/removed -->
 *   <div slot="not-pressed" hidden></div>
 * </vds-toggle>
 * ```
 */
export class ToggleElement extends LitElement implements ToggleElementProps {
  static get styles(): CSSResultArray {
    return [toggleElementStyles];
  }

  protected currentPressedSlotElement?: HTMLElement;
  protected currentNotPressedSlotElement?: HTMLElement;

  @property({ type: Boolean, reflect: true })
  pressed = false;

  disconnectedCallback(): void {
    this.currentPressedSlotElement = undefined;
    this.currentNotPressedSlotElement = undefined;
  }

  update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (changedProperties.has('pressed')) {
      this.toggle();
    }
  }

  render(): TemplateResult {
    return this.renderToggle();
  }

  protected renderToggle(): TemplateResult {
    return html`${this.renderPressedSlot()} ${this.renderNotPressedSlot()}`;
  }

  // -------------------------------------------------------------------------------------------
  // Pressed
  // -------------------------------------------------------------------------------------------

  protected getPressedSlotName(): string {
    return 'pressed';
  }

  protected renderPressedSlot(): TemplateResult {
    return html`<slot
      name=${this.getPressedSlotName()}
      @slotchange="${this.handlePressedSlotChange}"
    ></slot>`;
  }

  protected handlePressedSlotChange(): void {
    this.currentPressedSlotElement = getSlottedChildren(
      this,
      this.getPressedSlotName(),
    )[0] as HTMLElement;

    this.toggle();
  }

  // -------------------------------------------------------------------------------------------
  // Not Pressed
  // -------------------------------------------------------------------------------------------

  protected getNotPressedSlotName(): string {
    return 'not-pressed';
  }

  protected renderNotPressedSlot(): TemplateResult {
    return html`<slot
      name=${this.getNotPressedSlotName()}
      @slotchange="${this.handleNotPressedSlotChange}"
    ></slot>`;
  }

  protected handleNotPressedSlotChange(): void {
    this.currentNotPressedSlotElement = getSlottedChildren(
      this,
      this.getNotPressedSlotName(),
    )[0] as HTMLElement;

    this.toggle();
  }

  // -------------------------------------------------------------------------------------------
  // Toggle
  // -------------------------------------------------------------------------------------------

  protected toggle(): void {
    this.toggleHiddenAttr(this.currentPressedSlotElement, !this.pressed);
    this.toggleHiddenAttr(this.currentNotPressedSlotElement, this.pressed);
  }

  protected toggleHiddenAttr(el?: HTMLElement, isHidden?: boolean): void {
    if (!isNil(el)) {
      setAttribute(el, 'hidden', isHidden ? '' : undefined);
    }
  }
}