// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.

import {
    LitElement,
    html,
    css,
    svg,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'

export class CustomButton extends LitElement {
    static styles = css`
        .button,
        .button > div {
            /* Layout */
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;
        }

        .button {
            /* Spacing */
            padding-block: var(--_py, 0.5rem);
            padding-inline: var(--_px, 0.5rem);
            /* Typography */
            font-size: var(--_fs, 1rem);
            font-weight: 500;
            /* Colors */
            color: var(--_color, var(--white));
            background-color: var(--_bg-color, var(--neutral-900));
            /* Others */
            border-radius: 0.25rem;
            border: transparent;
            cursor: pointer;

            &:focus-visible {
                outline: 4px solid rgba(68, 76, 231, 0.12);
            }

            &:disabled {
                --_bg-color: var(--bg-disabled) !important;
                --_color: var(--text-disabled) !important;
                box-shadow: none !important;
                cursor: not-allowed;
            }

            /***********/
            /*   Size  */
            /***********/
            &[data-size='sm'] {
                --_px: 0.5rem;
                --_py: 0.5rem;
                --_fs: var(--text-sm);
            }

            &[data-size='md'] {
                --_px: 0.875rem;
                --_py: 0.625rem;
                --_fs: var(--text-sm);
                line-height: 1.25rem;
            }

            &[data-size='lg'] {
                --_px: 1.125rem;
                --_py: 0.625rem;
                --_fs: var(--text-base);
                line-height: 1.5rem;
            }

            &[data-size='xl'] {
                --_px: 1.25rem;
                --_py: 0.75rem;
                --_fs: var(--text-base);
                line-height: 1.5rem;
            }

            &[data-size='2xl'] {
                --_px: 1.625rem;
                --_py: 1rem;
                --_fs: var(--text-lg);
                line-height: 1.75rem;
            }

            /***********/
            /* variant */
            /***********/
            &[data-variant='primary'] {
                --_bg-color: var(--brand-primary);
                --_color: var(--text-primary-invert);

                &:active {
                    --_bg-color: var(--brand-primary-focus);
                }
            }

            &[data-variant='secondary'] {
                --_bg-color: var(--white);
                --_color: var(--text-primary);
                outline: var(--_border-size, 1px) solid var(--neutral-200);
                box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);

                &:hover {
                    --_color: var(--text-primary-hover);
                }

                &:active {
                    --_bg-color: var(--brand-secondary-focus);
                }
            }

            &[data-variant='tertiary'] {
                --_bg-color: transparent;
                --_color: var(--text-tertiary);

                &:active {
                    --_bg-color: var(--bg-primary-hover);
                }

                &:disabled {
                    --_bg-color: transparent !important;
                }
            }

            &[data-variant='link-color'] {
                --_px: 0rem;
                --_py: 0rem;
                --_bg-color: transparent;
                --_color: var(--text-tertiary);

                &:hover {
                    --_color: var(--brand-primary-emphasize);
                }

                &:focus-visible {
                    --_bg-color: var(--bg-primary-hover);
                }

                &:active {
                    --_bg-color: var(--bg-link-focus);
                }

                &:disabled {
                    --_bg-color: transparent !important;
                }
            }

            &[data-variant='link-gray'] {
                --_px: 0rem;
                --_py: 0rem;
                --_bg-color: transparent;
                --_color: var(--text-secondary);

                &:hover {
                    --_color: var(--text-primary);
                }

                &:active {
                    --_bg-color: var(--bg-link-focus);
                }

                &:disabled {
                    --_bg-color: transparent !important;
                }
            }

            &[data-variant='destructive'] {
                --_bg-color: var(--bg-error);
                --_color: var(--text-primary-invert);

                &:focus-visible {
                    outline: 4px solid rgba(217, 45, 32, 0.12);
                }

                &:active {
                    --_bg-color: var(--bg-error-emphasize);
                }
            }
        }

        .button[data-full] {
            width: 100%;

            & > * {
                margin-inline: auto;
            }
        }

        .button[data-icon-only] {
            display: grid;
            place-items: center;
            aspect-ratio: 1;
        }
    `

    static properties = {
        buttonText: { type: String },
        variant: { type: String },
        size: { type: String },
        full: { type: Boolean },
        disabled: { type: Boolean },
        iconOnly: { type: Boolean },
        iconType: { type: String },
        iconLeft: { type: Boolean },
        iconRight: { type: Boolean },
    }

    constructor() {
        super()
        this.buttonText = 'Button CTA'
        this.variant = 'primary'
        this.size = 'sm'
        this.full = false
        this.iconOnly = false
        this.iconType = 'love'
        this.iconLeft = false
        this.iconRight = false
        this.disabled = false
    }

    render() {
        let iconContext

        const STAR_ICON = svg`
         <path
              d="M8.00042 12.3472L3.10219 15.089L4.19617 9.58326L0.0749245 5.77208L5.64926 5.11115L8.00042 0.0138855L10.3515 5.11115L15.9258 5.77208L11.8047 9.58326L12.8986 15.089L8.00042 12.3472ZM8.00042 10.7556L10.9495 12.4063L10.2908 9.09145L12.7722 6.7968L9.41597 6.39884L8.00042 3.32987L6.58482 6.39884L3.22862 6.7968L5.70994 9.09145L5.05127 12.4063L8.00042 10.7556Z"
              fill="currentColor"
          />
      `

        const GITHUB_ICON = svg`
         <path d="M10.0008 1.66666C5.39665 1.66666 1.66748 5.39583 1.66748 10C1.66748 13.6875 4.0529 16.8021 7.3654 17.9062C7.78206 17.9792 7.93831 17.7292 7.93831 17.5104C7.93831 17.3125 7.9279 16.6562 7.9279 15.9583C5.83415 16.3437 5.29248 15.4479 5.12581 14.9792C5.03206 14.7396 4.62581 14 4.27165 13.8021C3.97998 13.6458 3.56331 13.2604 4.26123 13.25C4.91748 13.2396 5.38623 13.8542 5.54248 14.1042C6.29248 15.3646 7.4904 15.0104 7.96956 14.7917C8.04248 14.25 8.26123 13.8854 8.50083 13.6771C6.64665 13.4687 4.70915 12.75 4.70915 9.5625C4.70915 8.65625 5.03206 7.90625 5.56331 7.32291C5.47998 7.11458 5.18831 6.26041 5.64665 5.11458C5.64665 5.11458 6.34456 4.89583 7.93831 5.96875C8.605 5.78125 9.31333 5.6875 10.0217 5.6875C10.73 5.6875 11.4383 5.78125 12.105 5.96875C13.6987 4.88541 14.3967 5.11458 14.3967 5.11458C14.855 6.26041 14.5633 7.11458 14.48 7.32291C15.0112 7.90625 15.3342 8.64583 15.3342 9.5625C15.3342 12.7604 13.3862 13.4687 11.5321 13.6771C11.8342 13.9375 12.0946 14.4375 12.0946 15.2187C12.0946 16.3333 12.0842 17.2292 12.0842 17.5104C12.0842 17.7292 12.2404 17.9896 12.6571 17.9062C16.0492 16.7611 18.3332 13.5802 18.3342 10C18.3342 5.39583 14.605 1.66666 10.0008 1.66666Z" fill="currentColor"
        />
      `

        const INSTAGRAM_ICON = svg`
          <path
            d="M10.8567 1.66748C11.7946 1.66903 12.2698 1.67399 12.6805 1.68621L12.8422 1.69151C13.0291 1.69815 13.2134 1.70648 13.4357 1.7169C14.3224 1.75786 14.9273 1.89815 15.4586 2.1044C16.0078 2.3162 16.4717 2.60231 16.9349 3.06551C17.3974 3.5287 17.6836 3.99398 17.8961 4.5419C18.1016 5.07245 18.2419 5.67801 18.2836 6.56481C18.2935 6.78703 18.3015 6.97136 18.3081 7.15824L18.3133 7.31997C18.3255 7.7306 18.3311 8.20591 18.3328 9.14375L18.3335 9.76516C18.3336 9.84108 18.3336 9.91942 18.3336 10.0002L18.3335 10.2353L18.333 10.8567C18.3314 11.7946 18.3265 12.2698 18.3142 12.6805L18.3089 12.8422C18.3023 13.0291 18.294 13.2134 18.2836 13.4357C18.2426 14.3224 18.1016 14.9273 17.8961 15.4586C17.6842 16.0078 17.3974 16.4717 16.9349 16.9349C16.4717 17.3974 16.0057 17.6836 15.4586 17.8961C14.9273 18.1016 14.3224 18.2419 13.4357 18.2836C13.2134 18.2935 13.0291 18.3015 12.8422 18.3081L12.6805 18.3133C12.2698 18.3255 11.7946 18.3311 10.8567 18.3328L10.2353 18.3335C10.1594 18.3336 10.0811 18.3336 10.0002 18.3336L9.76516 18.3335L9.14375 18.333C8.20591 18.3314 7.7306 18.3265 7.31997 18.3142L7.15824 18.3089C6.97136 18.3023 6.78703 18.294 6.56481 18.2836C5.67801 18.2426 5.07384 18.1016 4.5419 17.8961C3.99328 17.6842 3.5287 17.3974 3.06551 16.9349C2.60231 16.4717 2.3169 16.0057 2.1044 15.4586C1.89815 14.9273 1.75856 14.3224 1.7169 13.4357C1.707 13.2134 1.69892 13.0291 1.69238 12.8422L1.68714 12.6805C1.67495 12.2698 1.66939 11.7946 1.66759 10.8567L1.66748 9.14375C1.66903 8.20591 1.67399 7.7306 1.68621 7.31997L1.69151 7.15824C1.69815 6.97136 1.70648 6.78703 1.7169 6.56481C1.75786 5.67731 1.89815 5.07315 2.1044 4.5419C2.3162 3.99328 2.60231 3.5287 3.06551 3.06551C3.5287 2.60231 3.99398 2.3169 4.5419 2.1044C5.07315 1.89815 5.67731 1.75856 6.56481 1.7169C6.78703 1.707 6.97136 1.69892 7.15824 1.69238L7.31997 1.68714C7.7306 1.67495 8.20591 1.66939 9.14375 1.66759L10.8567 1.66748ZM10.0002 5.83356C7.69781 5.83356 5.83356 7.69984 5.83356 10.0002C5.83356 12.3027 7.69984 14.1669 10.0002 14.1669C12.3027 14.1669 14.1669 12.3006 14.1669 10.0002C14.1669 7.69781 12.3006 5.83356 10.0002 5.83356ZM10.0002 7.50023C11.381 7.50023 12.5002 8.61908 12.5002 10.0002C12.5002 11.381 11.3813 12.5002 10.0002 12.5002C8.6195 12.5002 7.50023 11.3813 7.50023 10.0002C7.50023 8.6195 8.61908 7.50023 10.0002 7.50023ZM14.3752 4.58356C13.8008 4.58356 13.3336 5.05015 13.3336 5.62452C13.3336 6.19889 13.8002 6.6662 14.3752 6.6662C14.9496 6.6662 15.4169 6.19961 15.4169 5.62452C15.4169 5.05015 14.9488 4.58284 14.3752 4.58356Z"
            fill="currentColor" 
          />
      `

        const LINKEDIN_ICON = svg`
        <path
          d="M15.2802 15.2825H13.0589V11.8018C13.0589 10.9718 13.0421 9.90375 11.9014 9.90375C10.7433 9.90375 10.5664 10.8069 10.5664 11.7406V15.2825H8.34517V8.125H10.4789V9.10058H10.5077C10.8058 8.53808 11.5308 7.94437 12.6139 7.94437C14.8646 7.94437 15.2808 9.42567 15.2808 11.3538L15.2802 15.2825ZM5.83645 7.14562C5.12145 7.14562 4.54707 6.56687 4.54707 5.855C4.54707 5.14375 5.12207 4.56563 5.83645 4.56563C6.54895 4.56563 7.12645 5.14375 7.12645 5.855C7.12645 6.56687 6.54832 7.14562 5.83645 7.14562ZM6.9502 15.2825H4.7227V8.125H6.9502V15.2825ZM16.3914 2.5H3.6077C2.99582 2.5 2.50082 2.98375 2.50082 3.58063V16.4194C2.50082 17.0168 2.99582 17.5 3.6077 17.5H16.3896C17.0008 17.5 17.5008 17.0168 17.5008 16.4194V3.58063C17.5008 2.98375 17.0008 2.5 16.3896 2.5H16.3914Z"
          fill="currentColor" 
        />
      `

        const TWITTER_ICON = svg`
        <path
          d="M15.1707 1.875H17.9273L11.9048 8.75833L18.9898 18.125H13.4423L9.09733 12.4442L4.12569 18.125H1.36736L7.80903 10.7625L1.01236 1.875H6.70069L10.6282 7.0675L15.1707 1.875ZM14.2032 16.475H15.7307L5.87069 3.43833H4.23153L14.2032 16.475Z"
          fill="currentColor" 
        />
      `

        switch (this.iconType) {
            case 'github':
                iconContext = GITHUB_ICON
                break
            case 'instagram':
                iconContext = INSTAGRAM_ICON
                break
            case 'linkedin':
                iconContext = LINKEDIN_ICON
                break
            case 'twitter':
                iconContext = TWITTER_ICON
                break
            default:
                iconContext = STAR_ICON
        }

        const iconOnlyTemplate = html`<svg
            class="button__icon"
            style="width:var(--_svg-w, 1rem); height:var(--_svg-h, 1rem);"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            ${iconContext}
        </svg>`

        const buttonTemplate = html`
            <div>
                ${this.iconLeft
                    ? html`
                          <svg
                              class="button__icon-left"
                              style="width:var(--_svg-w, 1rem); height:var(--_svg-h, 1rem);"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                          >
                              ${iconContext}
                          </svg>
                      `
                    : ''}

                <span class="button__text">${this.buttonText}</span>

                ${this.iconRight
                    ? html`<svg
                          class="button__icon-left"
                          style="width:var(--_svg-w, 1rem); height:var(--_svg-h, 1rem);"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                      >
                          ${iconContext}
                      </svg>`
                    : ''}
            </div>
        `

        return html`
            <button
                class="button"
                data-variant=${this.variant}
                data-size=${this.size}
                ?data-full=${this.full}
                ?data-icon-left=${this.iconLeft}
                ?data-icon-right=${this.iconRight}
                ?data-icon-only=${this.iconOnly}
                ?disabled=${this.disabled}
            >
                ${this.iconOnly ? iconOnlyTemplate : buttonTemplate}
            </button>
        `
    }
}
customElements.define('custom-button', CustomButton)
