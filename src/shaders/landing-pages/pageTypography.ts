export type LandingPageCustomization = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string | number;
  bodyWeight?: string | number;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export type PageTypographyProps = LandingPageCustomization;

export const COMPLETE_SHELF_TYPOGRAPHY: LandingPageCustomization = {
  headingFont: "iowan-old-style",
  bodyFont: "inter",
  headingWeight: 400,
  bodyWeight: 400,
  headingSize: 60,
  bodySize: 12,
  headingLetterSpacing: -0.055,
  primaryColor: "#c87046",
};

export function splitTypographyProps<T extends PageTypographyProps>(
  props: T
): [LandingPageCustomization, Omit<T, keyof PageTypographyProps>] {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    ...rest
  } = props;

  return [
    {
      headingFont,
      bodyFont,
      headingWeight,
      bodyWeight,
      primaryColor,
      headingSize,
      bodySize,
      headingLetterSpacing,
    },
    rest as Omit<T, keyof PageTypographyProps>,
  ];
}

export function usePageTypography(
  defaultTypo: LandingPageCustomization,
  overrides?: LandingPageCustomization
): LandingPageCustomization {
  return { ...defaultTypo, ...overrides };
}

export function applyPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame?.contentDocument || !customization) return;
  const doc = frame.contentDocument;
  let styleEl = doc.getElementById("threeui-typography-overrides");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.id = "threeui-typography-overrides";
    doc.head.appendChild(styleEl);
  }
  let css = "";
  if (customization.primaryColor) {
    css += `:root { --accent: ${customization.primaryColor} !important; }`;
  }
  if (customization.headingFont) {
    css += `:root { --serif: "${customization.headingFont}", serif !important; }`;
  }
  styleEl.textContent = css;
}

export function postPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization
) {
  if (!frame?.contentWindow || !customization) return;
  try {
    frame.contentWindow.postMessage(
      { type: "threeui-customization", customization },
      "*"
    );
  } catch {}
}
