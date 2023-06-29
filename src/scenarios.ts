import { Scenario } from "backstopjs";
import { ScenarioModel } from "./types";

export const createScenario = ({
  url,
  index,
  total,
  delay,
  hideSelectors,
  removeSelectors,
  useCssOverride,
  cssOverridePath,
  referenceUrl,
  cookiePath,
  jsOnReadyPath,
  label
}: ScenarioModel): Scenario => {
  const parsedUrl = new URL(url);

  return {
    label: label ?? `${index + 1} of ${total}: ${parsedUrl.pathname}`,
    cookiePath: cookiePath ?? 'data/_cookies.yaml',
    cssOverridePath: cssOverridePath ?? 'data/_override.css',
    jsOnReadyPath: jsOnReadyPath ?? 'data/_on-ready.js',
    useCssOverride,
    url,
    referenceUrl: referenceUrl ?? '',
    readyEvent: '',
    delay,
    hideSelectors: hideSelectors ?? [],
    removeSelectors: removeSelectors ?? [],
    hoverSelector: '',
    clickSelector: '',
    postInteractionWait: 0,
    selectors: [],
    selectorExpansion: true,
    expect: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true
  }
}